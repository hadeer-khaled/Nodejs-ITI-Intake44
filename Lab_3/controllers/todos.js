const todosModel = require("../models/todos");

const getTodos = () => {
  const todos = todosModel.getTodos();
  return todos;
};

const manipulateTodos = (manipulatedToDosArray) => {
  todosModel.manipulateTodos(manipulatedToDosArray);
};
module.exports = { getTodos, manipulateTodos };
