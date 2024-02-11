const Users = require("../models/users");

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

const find = async () => {
  const users = await Users.find().exec();
  return users;
};

const findById = (id) => Users.findById(id);
const findOne = (query) => Users.findOne(query);

module.exports = {
  create,
  findById,
  findOne,
  find,
};
