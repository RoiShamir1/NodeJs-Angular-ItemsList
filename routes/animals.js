let express = require("express");

const fs = require("fs").promises;
const path = require("path");

// create controller
const router = express.Router();

const file = "./db/db.json";
const filePath = path.join(__dirname, "..", file);

// create actions
router.get("/", async (req, res) => {
  let dbJson = await fs.readFile(filePath);
  res.send(JSON.parse(dbJson));
  res.end();
});

router.post("/", async (req, res) => {
  let data = req.body;

  let dbJson = JSON.parse(await fs.readFile(filePath));

  data.id = Math.round(Math.random() * 1000);
  dbJson.push(data);
  await fs.writeFile(filePath, JSON.stringify(dbJson));

  res.redirect("/");
  res.end();
});

router.delete("/:id", async (req, res) => {
  let id = Number(req.params.id);

  let dbJson = JSON.parse(await fs.readFile(filePath));
  dbJson = dbJson.filter((i) => i.id != id);
  await fs.writeFile(filePath, JSON.stringify(dbJson));

  // res.status(200);
  res.send(dbJson);
  res.end();
});

router.put("/:id", async (req, res) => {
  let id = Number(req.params.id);

  let dbJson = JSON.parse(await fs.readFile(filePath));
  let item = dbJson.find((i) => i.id == id);

  item.name = req.body.name;
  item.type = req.body.type;

  await fs.writeFile(filePath, JSON.stringify(dbJson));

  res.send(item);
  res.end();
});

// export file
module.exports = router;
