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

// const htmlOutput = `
//   <!DOCTYPE html>
//   <html lang="en">
//     <head>
//       <meta charset="UTF-8" />
//       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//       <title>To-do List</title>
//       <style>
//       div{
//         width:50%;
//         margin: auto;
//       }
//         ul {
//           list-style-type: none;
//           padding: 10px;
//         }
//         li {
//           background-color: #03a9f45e;                ;
//           margin: 5px;
//           padding: 10px;
//           border-radius: 10px;
//           box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
//         }
//         h1{
//           text-align : center;
//         }
//       </style>
//     </head>
//     <body>
//       <h1 >Todo List</h1>
//       <div>
//       <ul>
//         ${todos.map(
//           (todo) => `<li>Title: ${todo.title} Status: ${todo.status}</li>`
//         )}
//       </ul>
//       </div>
//     </body>
//   </html>
// `;
// res.end(htmlOutput);
