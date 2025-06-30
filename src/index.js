require("dotenv").config();
require("express-async-errors");

const cors = require("cors");
const express = require("express");
const app = express();

// Middleware Functions
const connectDB = require("./db/connectDB");
const notFound = require("./middlewares/notFound");
const errorHandlerMiddleware = require("./middlewares/errorHandlerMiddleware");
const authenticateUser = require("./middlewares/authenticateUser");

// Routers
const userRouter = require("./routes/userRouter");
const weatherRouter = require("./routes/weatherRouter");

// Apply Cross Origin Resource Sharing
app.use(cors());
// Parse the JSON Request Body for it to not be undefined
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("This is Charles <3");
});

// Main API Routes
app.use("/api/auth", userRouter); // public
app.use("/api/weather", authenticateUser, weatherRouter); // protected by simple authentication using JWT

// Middleware for Errors or Non-Existent Routes
app.use(notFound);
app.use(errorHandlerMiddleware);


// HTTP Connection Start Function
const start = async () => {
  try {
    const mongoUri = process.env.NODE_ENV === "production" ?
      process.env.MONGO_URI : process.env.MONGO_LOCAL;

    await connectDB(mongoUri);

    console.log(process.env.NODE_ENV);
    console.log("Database Connected!");
  } catch (error) {
    console.log("Database connection error:", error);
  }

}

// Process Logic For Checking which PORT to connect
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;

  start().then(() => {
    // Start server
    app.listen(PORT, () => {
      console.log(`Backend is running on http://localhost:${PORT}`);
    });
  })
} else {
  // Still try to connect when it fails
  start();
}

module.exports = app;
