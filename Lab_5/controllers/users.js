const Users = require("../models/users");
const jwt = require("jsonwebtoken");

class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

const create = async (user) => {
  const newUser = await Users.create(user).catch((err) => {
    console.log("ERROR: When New User Created");
    throw new CustomError(err.message, 422);
  });
  return newUser;
};

const find = async (findCond) => {
  const users = await Users.find().select({ username: 1, _id: 0 }).exec();
  return users;
};

const findById = (id) => Users.findById(id);
const findOne = (query) => Users.findOne(query);

const deleteAllUsers = async () => {
  const deletedCount = await Users.deleteMany({}).catch((err) => {
    throw new CustomError(err.message, 422);
  });
  return deletedCount.deletedCount;
};
const deleteOne = async (id) => {
  const deletedCount = await Users.deleteOne({ _id: id }).catch((err) => {
    throw new CustomError(err.message, 422);
  });
  return deletedCount.deletedCount;
};

const login = async ({ username, password }) => {
  const user = await Users.findOne({ username });
  const isValid = await user.verifyPassword(password);
  if (!isValid) {
    throw new CustomError("Un_Authenticated", 401);
  }
  const token = jwt.sign({ username, id: user._id }, "jkdhfl", {
    expiresIn: "7d",
  });
  return token;
};

module.exports = {
  create,
  findById,
  findOne,
  find,
  deleteAllUsers,
  deleteOne,
  login,
};
