// // ---------------------  Read file
// const todos = fs.readFileSync(todosFullPath, "utf8");
// console.log("Type of todos: ", typeof todos);

// // ---------------------  Convert the string ouput of the todos to Array
// const todosArray = JSON.parse(todos);

const fs = require("fs");
const path = require("path");

let todosArray;
let [, , command] = process.argv;

const todosFullPath = path.join(__dirname, "todos.json");

if (fs.existsSync(todosFullPath)) {
  const todos = fs.readFileSync(todosFullPath, "utf8");
  try {
    todosArray = JSON.parse(todos);
  } catch (err) {
    todosArray = [];
    console.warn("This file was empty. An empty aray was created.");
  }
} else {
  console.log("The file doesn't exist.");
  todosArray = [];
}

switch (command) {
  case "add":
    let [, , , toDoText] = process.argv;
    addToDo(toDoText, todosArray);
    break;
  case "edit":
    let [, , , idToUpdate, UpdateText] = process.argv;
    editToDo(idToUpdate, UpdateText, todosArray);
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

function generateIncrementalID() { return todosArray[todosArray.length - 1].id + 1;}

function listToDo(todosArray) {console.log(todosArray);}

function deleteToDo(idToRemove, todosArray) {
  let filteredToDosArray = todosArray.filter((todo) => todo.id != idToRemove);
  if (todosArray.length === filteredToDosArray.length) {
    console.log("This To-do doesn't exist");
  } else {
    fs.writeFileSync(todosFullPath, JSON.stringify(filteredToDosArray));
  }
}

function editToDo(idToUpdate, updatedText, todosArray) {
  const foundTodo = todosArray.find((todo) => todo.id == idToUpdate);
  if (foundTodo) {
    foundTodo.title = updatedText;
    fs.writeFileSync(todosFullPath, JSON.stringify(todosArray));
  } else {
    console.log("This Id doesn't exist");
  }
}
