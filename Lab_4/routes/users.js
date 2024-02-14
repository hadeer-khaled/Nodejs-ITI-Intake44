const router = require("express").Router();
const { TodosController, UsersController } = require("../controllers");
const asyncWrapper = require("../lib/async-wrapper");
const Users = require("../models/users");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res, next) => {
  const [err, user] = await asyncWrapper(UsersController.create(req.body));
  if (!err) {
    console.log("USER", user);
    return res.json(user);
  }
  return next(err);
});

router.get("/", async (req, res) => {
  const users = await UsersController.find();
  res.json(users);
});

router.get("/:userId/todos", async (req, res) => {
  const userId = req.params.userId;
  const todos = await TodosController.find({ userId });
  res.json(todos);
});

router.get("/:id", async (req, res, next) => {
  const [err, user] = await asyncWrapper(
    UsersController.findById(req.params.id)
  );
  if (!err) {
    return res.json(user);
  }
  return next(err);
});

router.delete("/", async (req, res, next) => {
  const [err, deletedCount] = await asyncWrapper(
    UsersController.deleteAllUsers()
  );
  if (!err) {
    console.log("All documents deleted successfully.", deletedCount);
    return res.json(deletedCount);
  }
  return next(err);
});

router.delete("/:id", async (req, res, next) => {
  const [err, deletedCount] = await asyncWrapper(
    UsersController.deleteOne(req.params.id)
  );
  if (!err) {
    return res.json(`Deleted Count: ${deletedCount}`);
  }
  return next(err);
});

router.patch("/:id", async (req, res) => {
  const [err, selectdUser] = await asyncWrapper(
    UsersController.findById(req.params.id)
  );
  if (!err) {
    if (!selectdUser) {
      return res.status(404).json({ error: "User not found" });
    }
    const username = req.query.username || selectdUser.username;
    const firstName = req.query.firstName || selectdUser.firstName;
    const lastName = req.query.lastName || selectdUser.lastName;
    const dob = req.query.dob || selectdUser.dob;

    // create a controller for updateOne
    const updateResult = await Users.updateOne(
      { _id: req.params.id },
      { username, firstName, lastName, dob }
    );
    console.log(
      `User updated: ${username}, ${firstName} , ${lastName} , ${dob}`
    );
    return res.json(updateResult);
  }
  return next(err);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const token = await UsersController.login({ username, password });
  return res.json({ token: token });
});
module.exports = router;
