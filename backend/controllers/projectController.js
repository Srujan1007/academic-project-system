const Project = require("../models/Project");

// POST /api/projects/create  (student only)
const createProject = async (req, res) => {
  const { title, description, facultyId } = req.body;
  if (!facultyId) return res.status(400).json({ message: "Faculty selection is required" });
  try {
    const project = await Project.create({ title, description, studentId: req.user.id, facultyId });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/projects
// student → own projects | faculty → assigned projects
const getProjects = async (req, res) => {
  try {
    // If faculty, strictly only return projects assigned to them
    const filter = req.user.role === "student" ? { studentId: req.user.id } : { facultyId: req.user.id };
    const projects = await Project.find(filter)
      .populate("studentId", "name email")
      .populate("facultyId", "name email");
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/projects/:id
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("studentId", "name email")
      .populate("facultyId", "name email");
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/projects/:id/status  (faculty only)
const updateProjectStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/projects/:id/grade  (faculty only)
const gradeProject = async (req, res) => {
  const { grade } = req.body;
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { grade },
      { new: true }
    ).populate("studentId", "name email").populate("facultyId", "name email");
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createProject, getProjects, getProjectById, updateProjectStatus, gradeProject };
