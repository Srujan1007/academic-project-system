const express = require("express");
const router = express.Router();
const {
  createMilestone,
  getMilestones,
  updateMilestone,
} = require("../controllers/milestoneController");
const { protect } = require("../middleware/authMiddleware");

router.post("/create", protect, createMilestone);
router.get("/:projectId", protect, getMilestones);
router.put("/:id", protect, updateMilestone);

module.exports = router;
