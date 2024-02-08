const fs = require("fs");
const getTodos = () => {
  const todos = JSON.parse(fs.readFileSync("././todos.json", "utf8"));
  return todos;
};
const manipulateTodos = (manipulatedToDosArray) => {
  fs.writeFileSync("././todos.json", JSON.stringify(manipulatedToDosArray));
};
module.exports = { getTodos, manipulateTodos };
