const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { uploadSubmission, getSubmissions, getMilestoneSubmissions } = require("../controllers/submissionController");
const { protect } = require("../middleware/authMiddleware");

// Use memory storage — works on Vercel serverless (no disk access)
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowed = [".pdf", ".doc", ".docx"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.includes(ext)) cb(null, true);
  else cb(new Error("Only PDF and DOC files allowed"), false);
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit

router.post("/upload", protect, upload.single("file"), uploadSubmission);
router.get("/milestone/:milestoneId", protect, getMilestoneSubmissions);
router.get("/:projectId", protect, getSubmissions);

module.exports = router;
