const router = require("express").Router();
const { TodosController, UsersController } = require("../controllers");
const asyncWrapper = require("../lib/async-wrapper");
const Todos = require("../models/todos");
const Users = require("../models/users");
const jwt = require("jsonwebtoken");
class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}
router.use(async (req, res, next) => {
  const { authorization } = req.headers;
  const token = jwt.verify(authorization, "jkdhfl");
  const user = await Users.findById(token.id).exec();
  console.log({ token });
  req.user = user;
  next();
});

router.get("/", async (req, res) => {
  const todoStatus = req.query.status || null;
  const todos = todoStatus
    ? await TodosController.find(
        { status: todoStatus, userId: req.user._id },
        req.query.limit,
        req.query.skip
      )
    : await TodosController.find(
        { userId: req.user._id },
        req.query.limit,
        req.query.skip
      );

  res.json(todos);
});

router.post("/", async (req, res, next) => {
  // console.log("Request Body:", req.body);

  const newTodo = { userId: req.user._id, ...req.body };
  const [err, todo] = await asyncWrapper(TodosController.create(newTodo));

  if (!err) {
    return res.json(todo);
  }

  return next(err);
});

router.delete("/:id", async (req, res, next) => {
  const [findErr, requiredTodo] = await asyncWrapper(
    TodosController.findById(req.params.id)
  );

  if (findErr) {
    return next(findErr);
  }

  if (!requiredTodo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  if (!TodosController.validateTodoOwner(requiredTodo.userId, req.user._id)) {
    return next(new CustomError("Un_Authorized", 401));
  }

  const [deleteErr, deletedCount] = await asyncWrapper(
    TodosController.deleteOne(req.params.id)
  );

  if (deleteErr) {
    return next(deleteErr);
  }

  res.json({ "Deleted Count": deletedCount, requiredTodo });
});

router.patch("/:id", async (req, res, next) => {
  const [err, selectdTodo] = await asyncWrapper(
    TodosController.findById(req.params.id)
  );
  if (!err) {
    if (!selectdTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    if (!TodosController.validateTodoOwner(selectdTodo.userId, req.user._id)) {
      return next(new CustomError("Un_Authorized", 401));
    }
    const title = req.body.title || selectdTodo.title;
    const todoStatus = req.body.status || selectdTodo.status;

    const updateResult = await Todos.updateOne(
      { _id: req.params.id },
      { title, status: todoStatus }
    );
    selectdTodo.save();
    return res.json({
      message: "todo was edited successfully",
      todo: selectdTodo,
    });
  }
  return next(err);
});

router.delete("/", async (req, res, next) => {
  const [err, deletedCount] = await asyncWrapper(
    TodosController.deleteAllTodos({ userId: req.user._id })
  );
  if (!err) {
    console.log("All documents deleted successfully.", deletedCount);
    return res.json(`Deleted Count: ${deletedCount}`);
  }
  return next(err);
});

module.exports = router;
