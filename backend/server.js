const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/milestones", require("./routes/milestoneRoutes"));
app.use("/api/submissions", require("./routes/submissionRoutes"));
app.use("/api/feedback", require("./routes/feedbackRoutes"));

// Serve frontend statically
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) =>
  res.sendFile(
    path.resolve(__dirname, "../", "frontend", "dist", "index.html")
  )
);

// START SERVER FIRST, then connect to MongoDB in background
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
  // Connect to MongoDB AFTER server is already listening
  connectDB();
});
