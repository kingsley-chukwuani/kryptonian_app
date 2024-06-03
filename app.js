require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config");

const authRoutes = require("./routes/authRoutes");
const fileRoutes = require("./routes/fileRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(config.dbUri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Use routes
app.use("/auth", authRoutes);
app.use("/files", fileRoutes);

// Error handling middleware
app.use(errorHandler);

const port = 6000;
app.listen(port, () => {
  console.log(`KryptoniteApp listening on port ${port}`);
});
