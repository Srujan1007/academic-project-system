const express = require("express");
const router = express.Router();
const { createFeedback, getFeedback } = require("../controllers/feedbackController");
const { protect, isFaculty } = require("../middleware/authMiddleware");

router.post("/create", protect, isFaculty, createFeedback);
router.get("/:projectId", protect, getFeedback);

module.exports = router;
