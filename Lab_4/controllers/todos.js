const Todos = require("../models/todos");

class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

const create = async (todo) => {
  const newTodo = await Todos.create(todo).catch((err) => {
    console.log("ERROR: When New Todo Created");
    throw new CustomError(err.message, 422);
  });
  return newTodo;
};

const find = async () => {
  const todos = await Todos.find().exec();
  return todos;
};

const findById = (id) => Todos.findById(id);

const deleteOne = async (id) => {
  const deletedCount = await Todos.deleteOne({ _id: id }).catch((err) => {
    throw new CustomError(err.message, 422);
  });
  return deletedCount.deletedCount;
};

const deleteAllTodos = async () => {
  const deletedCount = await Todos.deleteMany({}).catch((err) => {
    throw new CustomError(err.message, 422);
  });
  return deletedCount.deletedCount;
};

module.exports = {
  create,
  find,
  findById,
  deleteOne,
  deleteAllTodos,
};
