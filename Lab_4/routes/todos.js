const router = require("express").Router();
const { TodosController, UsersController } = require("../controllers");
const asyncWrapper = require("../lib/async-wrapper");

router.get("/", async (req, res) => {
  const todos = await TodosController.find();
  res.json(todos);
});

router.post("/", async (req, res, next) => {
  const [err, todo] = await asyncWrapper(TodosController.create(req.body));
  if (!err) {
    return res.json(todo);
  }
  return next(err);
});

router.patch("/:id", (req, res) => {
  // call the controller function
});

router.delete("/", async (req, res, next) => {
  const [err, deletedCount] = await asyncWrapper(
    TodosController.deleteAllTodos()
  );
  if (!err) {
    console.log("All documents deleted successfully.", deletedCount);
    return res.json(deletedCount);
  }
  return next(err);
});
router.delete("/:id", (req, res) => {
  // call the controller function
});

module.exports = router;
