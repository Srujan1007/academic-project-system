const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: {
    type: String,
    enum: ["In Progress", "Completed", "Approved"],
    default: "In Progress",
  },
  grade: {
    type: String,
    enum: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F", ""],
    default: "",
  },
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);
