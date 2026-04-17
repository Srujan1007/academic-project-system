const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

dotenv.config();

// Connect to MongoDB
connectDB();

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

// For local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel serverless
module.exports = app;
