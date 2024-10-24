import express, { Application, Request, Response } from "express";
import jwt from "jsonwebtoken";

const app: Application = express();
const port = 4000;
const JWT_SECRET = "PzIM10uFrDm0qOlvbEY";
let accessToken = "";
let refreshToken = "";

app.use(express.json());

app.post("/login", (req, res) => {
  accessToken = jwt.sign(req.body, JWT_SECRET, { expiresIn: '2s' });
  refreshToken = jwt.sign(req.body, JWT_SECRET, { expiresIn: '7d' });
  res.json({ accessToken, refreshToken });
});

const authenticateToken = (req: Request, res: Response, next: () => void) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log('AuthenticateToken-SERVER...\n');
  jwt.verify(token, JWT_SECRET, (err: jwt.VerifyErrors | null) => {
    if (err) {
      console.log('Token expired at:', err.expiredAt);
      return res.status(401).json({ error: "Token expired" });
    } else {
      next();
    }
  });
};

app.post("/refresh", (req, res) => {
  console.log('RefreshToken-SERVER...\n');
  try {
    // console.log("Received refresh token-SERVER:", req.body);
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: "Refresh token is required" });
    }

    jwt.verify(refreshToken, JWT_SECRET, (err: jwt.VerifyErrors | null, decoded: jwt.JwtPayload) => {
      const { iat, exp, ...payload } = decoded;
      if (err) {
        return res.status(403).json({ error: "Invalid refresh token" });
      }
      accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
      res.json({ accessToken });
    });
  } catch (error) {
    console.error("Error processing refresh token-SERVER:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/protected", authenticateToken, (req, res) => {
  console.log('Middleware passed-SERVER\n');
  res.json({ message: "DATA from server with success token" });
});


let retryCount = 0;

app.get("/retry-test", (req, res) => {
  console.log(`Retry attempt: ${retryCount + 1}`);
  if (retryCount == 0) {
    retryCount++;
    return res
      .status(500)
      .json({ error: "Simulated server error with status 500" });
  } else if (retryCount == 1) {
    retryCount++;
    return res
      .status(504)
      .json({ error: "Simulated server error with status 504" });
  }
  retryCount = 0;
  return res.status(200).json({ message: "Success after retry" });
});

app.listen(port, () => {
  console.log(`Server is Fire at http://locahost:${port}`);
});
