const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const PORT = process.env.PORT || 4000;
const hostname = "127.0.0.1";

const app = express();
mongoose.connect("mongodb://localhost:27017/Todos").then((con) => {
  console.log(`DB Connected Successfully !!`);
});

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
});
