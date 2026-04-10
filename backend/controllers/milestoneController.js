const Milestone = require("../models/Milestone");

// POST /api/milestones/create
const createMilestone = async (req, res) => {
  const { projectId, name, deadline } = req.body;
  try {
    const milestone = await Milestone.create({ projectId, name, deadline });
    res.status(201).json(milestone);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/milestones/:projectId
const getMilestones = async (req, res) => {
  try {
    const milestones = await Milestone.find({ projectId: req.params.projectId });
    res.json(milestones);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/milestones/:id
const updateMilestone = async (req, res) => {
  const { status } = req.body;
  try {
    const milestone = await Milestone.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!milestone) return res.status(404).json({ message: "Milestone not found" });
    res.json(milestone);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createMilestone, getMilestones, updateMilestone };
