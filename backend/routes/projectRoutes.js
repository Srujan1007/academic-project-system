const express = require("express");
const router = express.Router();
const {
  createProject,
  getProjects,
  getProjectById,
  updateProjectStatus,
  gradeProject,
} = require("../controllers/projectController");
const { protect, isFaculty } = require("../middleware/authMiddleware");

router.post("/create", protect, createProject);
router.get("/", protect, getProjects);
router.get("/:id", protect, getProjectById);
router.put("/:id/status", protect, isFaculty, updateProjectStatus);
router.put("/:id/grade", protect, isFaculty, gradeProject);

module.exports = router;
