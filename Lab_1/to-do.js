const fs = require("fs");
const path = require("path");
let [, , command] = process.argv;

const todosFullPath = path.join(__dirname, "todos.json");
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
function generateIncrementalID() {
  if (todosArray.length === 0) {
    return 1;
  } else {
    return todosArray[todosArray.length - 1].id + 1;
  }
}
function listToDo(todosArray) {
  const todosStrings = todosArray
    .map((todo) => `ID: ${todo.id} Title: ${todo.title} Status: ${todo.status}`)
    .join("\n");
  console.log(todosStrings);
}
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

// function listToDo(todosArray) {
//   todosArray.forEach((todo) => {
//     console.log(`ID: ${todo.id} Title: ${todo.title} Status: ${todo.status}`);
//   });
// }

// if (fs.existsSync(todosFullPath)) {
//   const todos = fs.readFileSync(todosFullPath, "utf8");
//   try {
//     todosArray = JSON.parse(todos);
//   } catch (err) {
//     todosArray = [];
//     console.warn("This file was empty. An empty aray was created.");
//   }
// } else {
//   console.log("The file doesn't exist.");
//   todosArray = [];
// }
