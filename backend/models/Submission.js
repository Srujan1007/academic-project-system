const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  milestoneId: { type: mongoose.Schema.Types.ObjectId, ref: "Milestone", default: null },
  file: { type: String, required: true },
  filePath: { type: String, required: true },
  submissionDate: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("Submission", submissionSchema);
