const Feedback = require("../models/Feedback");

// POST /api/feedback/create
const createFeedback = async (req, res) => {
  const { projectId, comment } = req.body;
  try {
    const feedback = await Feedback.create({
      projectId,
      facultyId: req.user.id,
      comment,
    });
    const populated = await feedback.populate("facultyId", "name email");
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/feedback/:projectId
const getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({ projectId: req.params.projectId })
      .populate("facultyId", "name email")
      .sort({ createdAt: -1 });
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createFeedback, getFeedback };
