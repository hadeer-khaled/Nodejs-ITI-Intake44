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

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  const [err, token] = await asyncWrapper(
    UsersController.login({ username, password })
  );
  if (!err) {
    return res.json({ token: token });
  }
  return next(err);
});

router.get("/", async (req, res) => {
  const users = await UsersController.find();
  res.json(users);
});

router.get("/:userId/todos", async (req, res, next) => {
  const userId = req.params.userId;
  const [err, todos] = await asyncWrapper(TodosController.find({ userId }));
  if (!err) {
    return res.json({ todos });
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
    const username = req.body.username || selectdUser.username;
    const firstName = req.body.firstName || selectdUser.firstName;
    const lastName = req.body.lastName || selectdUser.lastName;
    const dob = req.body.dob || selectdUser.dob;

    const updateResult = await Users.updateOne(
      { _id: req.params.id },
      { username, firstName, lastName, dob }
    );
    return res.json({
      message: "user was edited successfully",
      user: selectdUser,
    });
  }
  return next(err);
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

module.exports = router;
