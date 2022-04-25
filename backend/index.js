require("dotenv").config();
const express = require("express"),
  app = express(),
  port = process.env.APP_PORT || 80,
  host = process.env.APP_HOST || "localhost",
  cors = require("cors");

const auth = require("./auth");
const user = require("./user");
const account = require("./account");
require("./passport.js");

const router = require("express").Router();

app.use("/api", router);
app.use("/api", auth);
app.use("/api", user);
app.use("/api", account);
router.use(
  cors({
    origin: [
      `http://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`,
      `http://localhost:${process.env.CLIENT_PORT}`,
    ],
    credentials: true,
  })
);
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
  res.send("Respond without authentication");
});

// Error Handler
app.use((err, req, res, next) => {
  let statusCode = err.status || 500;
  res.status(statusCode);
  res.json({
    error: {
      status: statusCode,
      message: err.message,
    },
  });
});

// Start Server
app.listen(port, () =>
  console.log(`Server is running on port http://${host}:${port}`)
);
