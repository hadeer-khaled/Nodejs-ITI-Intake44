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

const find = async (findCond, limit, skip) => {
  limit = limit || 5;
  skip = skip || 0;
  const todos = await Todos.find(findCond)
    .limit(limit)
    .skip(skip)
    .select({ title: 1, status: 1 })
    .populate("userId")
    .exec();
  return todos;
};
// const findOneAndUpdate = async (findCond, updatedPrt) => {
//   const updatedTodo = await Todos.findOneAndUpdate(findCond, updatedPrt).catch(
//     (err) => {
//       console.log("ERROR: When New Update Todo");
//       throw new CustomError(err.message, 422);
//     }
//   );
//   return updatedTodo;
// };

const findById = (id) => Todos.findById(id);

const deleteOne = async (id) => {
  const deletedCount = await Todos.deleteOne({ _id: id }).catch((err) => {
    throw new CustomError(err.message, 422);
  });
  return deletedCount.deletedCount;
};

const validateTodoOwner = (requiredTodoUserId, loggedUserId) => {
  const valid =
    requiredTodoUserId.toString() !== loggedUserId.toString() ? false : true;
  return valid;
};

const deleteAllTodos = async (deleteCond) => {
  const deletedCount = await Todos.deleteMany(deleteCond).catch((err) => {
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
  validateTodoOwner,
  // findOneAndUpdate,
};
