const fs = require("fs");
const path = require("path");
let [, , command] = process.argv;

const todosFullPath = path.join(__dirname, "todos.json");

const options = parseEditCommand();

function readTodosFromFile(todosFullPath) {
  if (fs.existsSync(todosFullPath)) {
    const todosData = fs.readFileSync(todosFullPath, "utf8");
    return JSON.parse(todosData);
  }
  return null;
}
function loadTodos() {
  try {
    const todos = readTodosFromFile(todosFullPath);
    return todos || [];
  } catch (error) {
    console.warn("Error reading todos file:", error.message);
    return [];
  }
}
let todosArray = loadTodos();
switch (command) {
  case "add":
    let [, , , toDoText] = process.argv;
    addToDo(toDoText, todosArray);
    break;
  case "edit":
    editToDo(options, todosArray);
    break;
  case "list":
    listToDo(todosArray);
    break;
  case "delete":
    let [, , , idToDelete] = process.argv;
    deleteToDo(idToDelete, todosArray);
    break;
  default:
    console.log("Invalid command");
}
function addToDo(toDoText, todosArray) {
  const ID = generateIncrementalID(todosArray);
  const newToDo = { id: ID, title: toDoText, status: "to-do" };
  fs.writeFileSync(todosFullPath, JSON.stringify(todosArray.concat(newToDo)));
}
function generateIncrementalID() {
  if (todosArray.length === 0) {
    return 1;
  } else {
    return todosArray[todosArray.length - 1].id + 1;
  }
}
function listToDo(todosArray) {
  const [, , , option, todoStatus] = process.argv;
  const allowedStatusValues = ["to-do", "done", "in-progress"];

  if (option === "-s" && allowedStatusValues.includes(todoStatus)) {
    const filteredToDosArray = todosArray
      .filter((todo) => todo.status === todoStatus)
      .map(
        (todo) => `ID: ${todo.id} Title: ${todo.title} Status: ${todo.status}`
      )
      .join("\n");
    return console.log(filteredToDosArray);
  }
  console.log("Invalid Option or Todo Status");
}

function deleteToDo(idToRemove, todosArray) {
  let filteredToDosArray = todosArray.filter((todo) => todo.id != idToRemove);
  if (todosArray.length === filteredToDosArray.length) {
    console.log("This To-do doesn't exist");
  } else {
    fs.writeFileSync(todosFullPath, JSON.stringify(filteredToDosArray));
  }
}
function editToDo(options, todosArray) {
  const { id, title, status } = options;

  if (id === undefined) return console.log("Missing id in options");

  const foundTodo = todosArray.find((todo) => todo.id == id);

  if (!foundTodo) return console.log("This ID doesn't exist");

  foundTodo.title = title !== undefined ? title : foundTodo.title;
  foundTodo.status = status !== undefined ? status : foundTodo.status;

  fs.writeFileSync(todosFullPath, JSON.stringify(todosArray));
}
function parseEditCommand() {
  const args = process.argv.slice(2);

  const options = { title: undefined, status: undefined, id: undefined };
  const flagMapping = { "-t": "title", "-s": "status", "-id": "id" };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg in flagMapping) {
      options[flagMapping[arg]] = args[i + 1] || null;
    }
  }

  return options;
}
