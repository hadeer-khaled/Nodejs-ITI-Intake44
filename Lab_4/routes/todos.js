const router = require("express").Router();
const { TodosController, UsersController } = require("../controllers");
const asyncWrapper = require("../lib/async-wrapper");
const Todos = require("../models/todos");

router.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit) || 5;
  const skip = parseInt(req.query.skip) || 0;
  const status = req.query.status || null;
  const todos = status
    ? await Todos.find({ status: status }).limit(limit).skip(skip)
    : await Todos.find().limit(limit).skip(skip);
  res.json(todos);
});

router.post("/", async (req, res, next) => {
  const [err, todo] = await asyncWrapper(TodosController.create(req.body));
  if (!err) {
    return res.json(todo);
  }
  return next(err);
});

router.delete("/", async (req, res, next) => {
  const [err, deletedCount] = await asyncWrapper(
    TodosController.deleteAllTodos()
  );
  if (!err) {
    console.log("All documents deleted successfully.", deletedCount);
    return res.json(`Deleted Count: ${deletedCount}`);
  }
  return next(err);
});

router.delete("/:id", async (req, res) => {
  const [err, deletedCount] = await asyncWrapper(
    TodosController.deleteOne(req.params.id)
  );
  if (!err) {
    console.log("All documents deleted successfully.", deletedCount);
    return res.json(`Deleted Count: ${deletedCount}`);
  }
  return next(err);
});

router.patch("/:id", async (req, res) => {
  const [err, selectdTodo] = await asyncWrapper(
    TodosController.findById(req.params.id)
  );
  if (!err) {
    if (!selectdTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    const title = req.query.title || selectdTodo.title;
    const todoStatus = req.query.status || selectdTodo.status;

    // create a controller for updateOne
    const updateResult = await Todos.updateOne(
      { _id: req.params.id },
      { title, status: todoStatus }
    );
    console.log(`Todo updated: ${title}, ${todoStatus}`);
    return res.json(updateResult);
  }
  return next(err);
});

module.exports = router;
