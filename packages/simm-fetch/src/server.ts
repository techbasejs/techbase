import express, { Application, Request, Response } from "express";
//const formidable = require("express-formidable");
let accessToken = "initial_access_token";
let refreshToken = "initial_refresh_token";
const app: Application = express();
const port = 4000;
//app.use(formidable());
app.use(express.json());



app.post("/login", (req, res) => {
  // Simulate login and token generation
  accessToken = `access_${Date.now()}`;
  refreshToken = `refresh_${Date.now()}`;
  res.json({ accessToken, refreshToken });
});
const authenticateToken = (req: Request, res: Response, next: () => void) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token !== accessToken) {
    return res.sendStatus(401);
  }
  next();
};
app.post("/refresh", (req, res) => {
  try {
    console.log("Received refresh token request:", req.body);
    const { refreshToken: sentRefreshToken } = req.body;

    if (sentRefreshToken !== refreshToken) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }

    // Generate new access token
    accessToken = `access_${Date.now()}`;
    res.json({ accessToken });
  } catch (error) {
    console.error("Error processing refresh token:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "This is protected data" });
});
// app.get("/user", (req, res) => {
//   res.json(200);
// });
// let count = 0;

let retryCount = 0;

app.get('/retry-test', (req, res) => {
  console.log(`Retry attempt: ${retryCount + 1}`);
  if (retryCount == 0) {
    retryCount++;
    return res.status(500).json({ error: 'Simulated server error with status 500' });
  } else if (retryCount == 1) {
    retryCount++;
    return res.status(504).json({ error: 'Simulated server error with status 504' });
  }
  retryCount = 0;
  return res.status(200).json({ message: 'Success after retry' });
});

// app.post("/send", (req, res) => {
//   res.send({
//     requestBody: {
//       ...req.fields,
//       file: req.files,
//     },
//   });
// });

// app.post("/upload", (req, res) => {
//   res.send({ requestBody: { ...req.fields, file: req.files } });
// });

app.listen(port, () => {
  console.log(`Server is Fire at http://locahost:${port}`);
});
