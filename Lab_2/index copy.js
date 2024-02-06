const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
  console.log(req.url);
  if (req.method === "GET") {
    console.log(req.url.split("/")[1]);
    if (req.url.split("/")[1] === "todos") {
      // res.setHeader("Content-Type", "text/html");
      // fs.createReadStream("./todos.json").pipe(res);

      const readStream = fs.createReadStream("./todos.json");

      readStream.on("open", () => {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(`<h2> To-do </h2>`);
        // const cssPath = path.join(__dirname, "styles.css");
        // res.writeHead(200, { "Content-Type": "text/css" });
      });
      readStream.on("data", (chunk) => {
        fs.createReadStream("./styles.css").pipe(res);
        const todos = JSON.parse(chunk);
        todos.forEach((todo) => {
          res.write(`<li>${todo.title}</li>`);
        });
      });
      readStream.on("end", () => {
        res.end();
      });
    }

    // const cssPath = path.join(__dirname, "styles.css");
    // res.writeHead(200, { "Content-Type": "text/css" });
    // fs.createReadStream(cssPath).pipe(res);

    // ----------------------------------------------------------------------------------------
    if (req.url.split("/")[1] === "astronomy") {
      return res.end(`<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
        </head>
        <body>
         <img src="./astron.jpg" >
        </body>
      </html>
      `);
    }
  }
});

server.listen(3000, () => {
  console.log("server is running");
});
// css file
// local image
