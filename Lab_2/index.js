const http = require("http");
const fs = require("fs");
const path = require("path");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    console.log(req.url);

    // routing
    // if (req.url == "/") {
    //   res.statusCode = 200;
    //   res.setHeader("Content-Type", "text/html");
    //   const readStream = fs.createReadStream("./todos.json");
    //   let data = "";
    //   // readStream.on("open", () => {
    //   //   // res.writeHead(200, { "Content-Type": "text/html" });
    //   //   // res.write(`<h2> To-do </h2>`);
    //   // }); // end open

    //   readStream.on("data", (chunk) => {
    //     data += chunk;
    //   });

    //   readStream.on("end", () => {
    //     console.log("End Stream");
    //     const todos = JSON.parse(data);

    //     res.write(`
    //       <!DOCTYPE html>
    //       <html lang="en">
    //         <head>
    //           <meta charset="UTF-8" />
    //           <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    //           <title>Todo List</title>
    //           <link rel="stylesheet" href="style.css" />
    //         </head>
    //         <body>
    //           <h1> To-do </h1>
    //           <div>
    //           <ul>
    //     `);

    //     todos.forEach((todo) => {
    //       res.write(`<li>${todo.title}</li>`);
    //     });
    //     res.end(`
    //             </ul>
    //           </div>
    //         </body>
    //       </html>
    //     `);
    //   });

    //   return;
    // } //end todos

    if (req.url == "/") {
      res.setHeader("Content-Type", "text/html");
      const readStream = fs.createReadStream("./todos.json");
      let data = "";

      readStream.on("data", (chunk) => {
        data += chunk;
      });
      readStream.on("end", () => {
        const todos = JSON.parse(data);
        const pageContent = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Todo List</title>
            <link rel="stylesheet" href="style.css" />
          </head>
          <body>
            <h1> To-do </h1>
            <div>
            <ul>
            ${todos.map((todo) => `<li> ${todo.title}</li>`)}
            </ul>
            </div>
          </body>
        </html>
        `;

        res.end(pageContent);
      });
      return;
    } //end todos

    // ----------------------------------------------------------------------------------------
    if (req.url.split("/")[1] === "style.css") {
      res.setHeader("Content-Type", "text/css");
      fs.createReadStream("./style.css").pipe(res);
      return;
    } //end css

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
        <h3>Wadi ALhetan</h3>
         <img src="/astron.jpg " width="50%" >
        </body>
      </html>
      `);
    } //end astronomy

    if (req.url.split("/")[1] === "astron.jpg") {
      const imagePath = path.join(__dirname, "astron.jpg");

      res.setHeader("Content-Type", "image/jpeg");

      const imageStream = fs.createReadStream(imagePath).pipe(res);
      return;
    } //end astron.jpg

    // if (req.url === "/astronomy/download") {
    //   const imagePath = path.join(__dirname, "astron.jpg");
    //   res.setHeader("Content-Type", "application/octet-stream");
    //   res.setHeader("Content-Disposition", 'attachment; filename="astron.jpg"');
    //   const imageStream = fs.createReadStream(imagePath).pipe(res);
    //   imageStream.on("end", () => {
    //     res.end();
    //   });

    //   return;
    // }

    res.statusCode = 404;
    res.end(`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
          <h1>Page Not Found</h1>
      </body>
    </html>`);
  } // end GET
}); //end server

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
// local image
