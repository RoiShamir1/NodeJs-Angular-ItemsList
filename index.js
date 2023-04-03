const express = require("express");

const fs = require("fs").promises;
const path = require("path");
let bodyParser = require("body-parser");
let cors = require("cors");

// create app
let app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// add routes
let animalRoutes = require("./routes/animals");
app.use("/animals", animalRoutes);

const file = "./db/db.json";
const filePath = path.join(__dirname, file);

// handle requests
app.get("/", async (req, res) => {
  const home = "./public/home.html";
  const homePath = path.join(__dirname, home);

  let htmlFile = await fs.readFile(homePath);

  let dbJson = JSON.parse(await fs.readFile(filePath));
  let animals = dbJson.map(
    (item) => `<div>
            <h1>${item.name} (${item.id})</h1>
            <p>${item.type}</p>
    </div>`
  );

  htmlFile = htmlFile.toString().replace("{{animals}}", animals.join(""));

  res.send(htmlFile);
  res.end();
});

let server = app.listen(8080, () => {
  let host = server.address().address;
  let port = server.address().port;

  console.log("Express is running on port ", port);
});