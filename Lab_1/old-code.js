// function listToDo(todosArray) {
//   todosArray.forEach((todo) => {
//     console.log(`ID: ${todo.id} Title: ${todo.title} Status: ${todo.status}`);
//   });
// }

// -------------------------------------------------

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

// -----------------------------------------------
// function editToDo(idToUpdate, updatedText, todosArray) {
//   const foundTodo = todosArray.find((todo) => todo.id == idToUpdate);
//   if (foundTodo) {
//     foundTodo.title = updatedText;
//     fs.writeFileSync(todosFullPath, JSON.stringify(todosArray));
//   } else {
//     console.log("This Id doesn't exist");
//   }
// }
// --------------------------------------------------------
// function parseCommandLineArgs() {
//     const args = process.argv.slice(2);

//     const options = {
//       title: undefined,
//       status: null,
//       id: null,
//     };
//     const flagMapping = {
//       "-t": "title",
//       "-s": "status",
//       "-id": "id",
//     };
//     for (let i = 0; i < args.length; i++) {
//       const arg = args[i];
//       const propertyName = flagMapping[arg];

//       if (propertyName) {
//         options[propertyName] = getNextArgValue(args, i);
//       }
//     }
//     return options;
//   }
//   function getNextArgValue(args, index) {
//     return args[index + 1] || null;
//   }
