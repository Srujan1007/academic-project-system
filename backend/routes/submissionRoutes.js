const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { uploadSubmission, getSubmissions, getMilestoneSubmissions } = require("../controllers/submissionController");
const { protect } = require("../middleware/authMiddleware");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = [".pdf", ".doc", ".docx"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.includes(ext)) cb(null, true);
  else cb(new Error("Only PDF and DOC files allowed"), false);
};

const upload = multer({ storage, fileFilter });

router.post("/upload", protect, upload.single("file"), uploadSubmission);
router.get("/milestone/:milestoneId", protect, getMilestoneSubmissions);
router.get("/:projectId", protect, getSubmissions);

module.exports = router;
