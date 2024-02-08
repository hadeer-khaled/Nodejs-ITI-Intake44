const router = require("express").Router();
const todosControllers = require("../controllers/todos");
const fs = require("fs");
const { title } = require("process");

let todos = todosControllers.getTodos();

router.get("/", (req, res) => {
  if (!req.query.status) {
    res.render("todos", { todosArray: todos });
  } else {
    const filteredTodos = todos.filter(
      (todo) => todo.status === req.query.status
    );
    res.render("todos", { todosArray: filteredTodos });
  }
});

router.get("/:id", (req, res) => {
  const requestedToDo = todos.find((todo) => todo.id == req.params.id);
  if (!requestedToDo) return res.status(404).send("Cannot find this Id.");
  res.status(200).render("todos", { todosArray: [requestedToDo] });
});

router.delete("/:id", (req, res) => {
  filteredToDosArray = todos.filter((todo) => todo.id != req.params.id);
  if (todos.length === filteredToDosArray.length)
    return res.status(404).send("This To-do doesn't exist");
  todosControllers.manipulateTodos(filteredToDosArray);
  res.status(200).json(filteredToDosArray);
  // res.status(200).render("todos", { todosArray: filteredToDosArray });
});

router.patch("/:id", (req, res) => {
  const selectedToDo = todos.find((todo) => todo.id == req.params.id);
  if (!selectedToDo) return res.status(404).send("Cannot find this Id.");

  const validQuery = Object.keys(req.query).every((key) => {
    return key == "title" || key == "status";
  });
  if (!validQuery) {
    return res
      .status(400)
      .send(`the todo doesn't have ${Object.keys(req.query)}`);
  }
  selectedToDo.title = req.query.title || selectedToDo.title;
  selectedToDo.status = req.query.status || selectedToDo.status;
  todosControllers.manipulateTodos(todos);
  console.log(todos);
  res.status(200).json(todos);
});

router.post("/", (req, res) => {
  const validQuery = Object.keys(req.body).every((key) => {
    return key == "title" || key == "status";
  });
  if (!validQuery) {
    return res.status(400).send(`Invalid todo keys.`);
  }
  const id = generateIncrementalID();
  const { title, status } = req.body;
  const newTodo = {};
  newTodo.id = id;
  newTodo.title = req.body.title || "No Tilte";
  newTodo.status = req.body.status || "to-do";
  console.log(req.body);
  todos.push(newTodo);
  todosControllers.manipulateTodos(todos);
  res.status(200).json(todos);
});
function generateIncrementalID() {
  if (todos.length === 0) {
    return 1;
  } else {
    return todos[todos.length - 1].id + 1;
  }
}

module.exports = router;
