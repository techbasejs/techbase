import express, { Application, NextFunction, Request, Response } from "express";
const formidable = require("express-formidable");
const jwt = require("jsonwebtoken");

const app: Application = express();
const port = 4000;
app.use(formidable());

app.get("/user", (req, res) => {
  res.json(200);
});
let count = 0;

const JWT_SECRET = "qwertyuiopasdfghjklzxcvbnm123456";
function verifyjwt(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];
  if (!token)
    return res.status(401).send({
      message: "Unauthorize user!",
    });

  try {
    jwt.verify(token.split(" ")[1], JWT_SECRET);
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Token not valid!",
    });
  }
}

app.get("/retry", verifyjwt, (req, res) => {
  console.log("server count :", count);
  if (count < 5) {
    res.status(550).send({
      message: "This is an error!",
    });
    count++;
  } else {
    count = 0;
    res.status(200).send({
      message: "This is an success!",
    });
  }
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
