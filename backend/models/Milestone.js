const mongoose = require("mongoose");

const milestoneSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  name: { type: String, required: true },
  deadline: { type: Date, required: true },
  status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
}, { timestamps: true });

module.exports = mongoose.model("Milestone", milestoneSchema);
