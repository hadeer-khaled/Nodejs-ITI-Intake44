const mongoose = require("mongoose");

const todosSchema = new mongoose.Schema({
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true
  // },
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
  },
  status: {
    type: String,
    default: "to-do",
    enum: ["to-do", "in progress", "done"],
  },
  tags: {
    type: [String],
    maxlength: 10,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Todos = mongoose.model("Todos", todosSchema);

// Create and save a document of todo model (collection)
// const newTodo = new Todos({
//   title: "Node Lab 3",
// });
// newTodo
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log(`Error: ${err}`);
//   });

module.exports = Todos;
