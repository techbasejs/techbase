import express, { Application } from "express";
const formidable = require("express-formidable");

const app: Application = express();
const port = 4000;
app.use(formidable());

app.get("/user", (req, res) => {
  res.json(200);
});
let count = 0;

app.get("/retry", (req, res) => {
  console.log("server count :", count++);
  res.status(400).send({
    message: "This is an error!",
  });
});

app.post("/send", (req, res) => {
  res.send({
    requestBody: {
      ...req.fields,
      file: req.files,
    },
  });
});

app.post("/upload", (req, res) => {
  res.send({ requestBody: { ...req.fields, file: req.files } });
});

app.listen(port, () => {
  console.log(`Server is Fire at http://locahost:${port}`);
});
