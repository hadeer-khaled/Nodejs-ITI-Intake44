const Todos = require("../models/todos");

class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

const find = async () => {
  const todos = await Todos.find().exec();
  return todos;
};

const create = async (todo) => {
  const newTodo = await Todos.create(todo).catch((err) => {
    console.log("ERROR: When New Todo Created");
    throw new CustomError(err.message, 422);
  });
  return newTodo;
};
const deleteAllTodos = async () => {
  const deletedCount = await Todos.deleteMany({}).catch((err) => {
    throw new CustomError(err.message, 422);
  });
  return deletedCount;
};
module.exports = {
  create,
  find,
  deleteAllTodos,
};
