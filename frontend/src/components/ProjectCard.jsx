import { useState, useEffect } from "react";
import API from "../api/axios";
import MilestoneList from "./MilestoneList";
import AddMilestoneForm from "./AddMilestoneForm";
import FeedbackSection from "./FeedbackSection";

export default function ProjectCard({ project, role, onStatusUpdate }) {
  const [expanded, setExpanded] = useState(false);
  const [milestones, setMilestones] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [activeSection, setActiveSection] = useState("milestones");

  useEffect(() => {
    if (!expanded) return;
    const fetchData = async () => {
      setLoadingData(true);
      try {
        const [mRes, fRes] = await Promise.all([
          API.get(`/milestones/${project._id}`),
          API.get(`/feedback/${project._id}`),
        ]);
        setMilestones(mRes.data);
        setFeedback(fRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingData(false);
      }
    };
    fetchData();
  }, [expanded, project._id]);

  const completedMilestones = milestones.filter((m) => m.status === "Completed").length;
  const totalMilestones = milestones.length;
  const progress = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;

  const statusConfig = {
    "In Progress": { badge: "badge-blue", dot: "bg-blue-400" },
    Completed: { badge: "badge-green", dot: "bg-emerald-400" },
    Approved: { badge: "badge-purple", dot: "bg-purple-400" },
  };

  const gradeColors = {
    "A+": "text-emerald-400", A: "text-emerald-400", "A-": "text-emerald-400",
    "B+": "text-blue-400", B: "text-blue-400", "B-": "text-blue-400",
    "C+": "text-amber-400", C: "text-amber-400", "C-": "text-amber-400",
    D: "text-orange-400", F: "text-red-400",
  };

  const sections = [
    { id: "milestones", label: "Milestones", icon: "🎯", count: totalMilestones },
    { id: "feedback", label: "Feedback", icon: "💬", count: feedback.length },
  ];

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      {/* Header */}
      <div
        className="px-5 py-4 flex items-start justify-between cursor-pointer group"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-white text-sm truncate">{project.title}</h3>
            {project.grade && (
              <span className={`text-sm font-bold ${gradeColors[project.grade] || "text-slate-400"}`}>
                {project.grade}
              </span>
            )}
          </div>
          {role === "faculty" && (
            <p className="text-[11px] text-slate-500 mt-0.5">
              🎓 {project.studentId?.name} · {project.studentId?.email}
            </p>
          )}
          <p className="text-xs text-slate-400 mt-1 line-clamp-2">{project.description}</p>

          {/* Mini progress bar */}
          {expanded && totalMilestones > 0 && (
            <div className="mt-3 animate-fade-in">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] text-slate-500 font-medium">Milestone Progress</span>
                <span className="text-[10px] text-indigo-400 font-semibold">{completedMilestones}/{totalMilestones} ({progress}%)</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 ml-4 shrink-0">
          <span className={`badge ${statusConfig[project.status]?.badge || "badge-blue"}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[project.status]?.dot || "bg-slate-400"}`} />
            {project.status}
          </span>
          <span className={`text-slate-500 text-xs transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}>
            ▼
          </span>
        </div>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div className="border-t border-white/5 animate-slide-down">
          {/* Section Tabs */}
          <div className="flex border-b border-white/5 px-5">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`flex items-center gap-1.5 px-4 py-3 text-xs font-medium transition-all border-b-2 ${
                  activeSection === s.id
                    ? "border-indigo-500 text-indigo-300"
                    : "border-transparent text-slate-500 hover:text-slate-300"
                }`}
              >
                <span>{s.icon}</span>
                {s.label}
                {s.count > 0 && (
                  <span className="bg-white/5 rounded-full px-1.5 py-0.5 text-[10px]">{s.count}</span>
                )}
              </button>
            ))}
          </div>

          <div className="px-5 py-4">
            {loadingData ? (
              <div className="flex items-center justify-center py-8">
                <svg className="animate-spin h-5 w-5 text-indigo-400" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              </div>
            ) : (
              <>
                {/* Milestones Tab — now includes submissions per milestone */}
                {activeSection === "milestones" && (
                  <div className="animate-fade-in">
                    <MilestoneList
                      milestones={milestones}
                      setMilestones={setMilestones}
                      canEdit={role === "faculty"}
                      projectId={project._id}
                      role={role}
                    />
                    {role === "student" && (
                      <AddMilestoneForm projectId={project._id} onAdded={(m) => setMilestones((prev) => [...prev, m])} />
                    )}
                  </div>
                )}

                {/* Feedback Tab */}
                {activeSection === "feedback" && (
                  <div className="animate-fade-in">
                    <FeedbackSection
                      projectId={project._id}
                      feedback={feedback}
                      setFeedback={setFeedback}
                      role={role}
                    />
                  </div>
                )}
              </>
            )}

            {/* Faculty Controls */}
            {role === "faculty" && !loadingData && (
              <div className="mt-5 pt-4 border-t border-white/5 flex flex-wrap gap-4">
                {/* Status Update */}
                <div>
                  <label className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block mb-1.5">
                    Status
                  </label>
                  <select
                    defaultValue={project.status}
                    onChange={async (e) => {
                      try {
                        const { data } = await API.put(`/projects/${project._id}/status`, { status: e.target.value });
                        onStatusUpdate && onStatusUpdate(data);
                      } catch {
                        alert("Failed to update status");
                      }
                    }}
                    className="select-dark text-sm"
                  >
                    <option>In Progress</option>
                    <option>Completed</option>
                    <option>Approved</option>
                  </select>
                </div>

                {/* Grade */}
                <div>
                  <label className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block mb-1.5">
                    Grade
                  </label>
                  <select
                    defaultValue={project.grade || ""}
                    onChange={async (e) => {
                      try {
                        const { data } = await API.put(`/projects/${project._id}/grade`, { grade: e.target.value });
                        onStatusUpdate && onStatusUpdate(data);
                      } catch {
                        alert("Failed to update grade");
                      }
                    }}
                    className="select-dark text-sm"
                  >
                    <option value="">No Grade</option>
                    {["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F"].map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Student: Show grade if assigned */}
            {role === "student" && project.grade && (
              <div className="mt-4 pt-4 border-t border-white/5 animate-fade-in">
                <div className="glass-light rounded-xl px-4 py-3 flex items-center gap-4">
                  <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Grade</span>
                  <span className={`text-lg font-bold ${gradeColors[project.grade] || "text-slate-300"}`}>
                    {project.grade}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
