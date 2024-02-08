const express = require("express");
const router = require("./routes/todos");

const app = express();

const PORT = process.env.PORT || 3000;
const hostname = "127.0.0.1";

app.use(express.json());

app.use((req, res, next) => {
  console.log("Request received");
  next();
});

app.set("view engine", "pug");
app.use(express.static("public"));
app.use("/todos", router);

app.use((req, res, next) => {
  // res.status(404).json("Page Not Found");
  res.status(404).send("Page Not Found.");
});
app.listen(PORT, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
});
