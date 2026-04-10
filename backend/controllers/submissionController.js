const Submission = require("../models/Submission");
const path = require("path");

// POST /api/submissions/upload
const uploadSubmission = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  const { projectId, milestoneId } = req.body;
  try {
    const submission = await Submission.create({
      projectId,
      milestoneId: milestoneId || null,
      file: req.file.originalname,
      filePath: req.file.filename,
    });
    res.status(201).json(submission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/submissions/:projectId
const getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ projectId: req.params.projectId });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/submissions/milestone/:milestoneId
const getMilestoneSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ milestoneId: req.params.milestoneId });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { uploadSubmission, getSubmissions, getMilestoneSubmissions };
