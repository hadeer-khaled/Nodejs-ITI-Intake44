const router = require("express").Router();
const { UsersController } = require("../controllers");
const asyncWrapper = require("../lib/async-wrapper");

router.get("/", async (req, res) => {
  const users = await UsersController.find();
  res.json(users);
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

router.post("/", async (req, res, next) => {
  const [err, user] = await asyncWrapper(UsersController.create(req.body));
  if (!err) {
    console.log("USER", user);
    return res.json(user);
  }
  return next(err);
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UsersController.findOne({ email });
  const valid = await user.verifyPassword(password);
  return res.json({ valid });
});
module.exports = router;
