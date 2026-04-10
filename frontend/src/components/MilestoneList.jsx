import { useState, useEffect } from "react";
import API from "../api/axios";
import UploadSubmissionForm from "./UploadSubmissionForm";
import SubmissionList from "./SubmissionList";

export default function MilestoneList({ milestones, setMilestones, canEdit, projectId, role }) {
  const [expandedMilestone, setExpandedMilestone] = useState(null);
  const [milestoneSubmissions, setMilestoneSubmissions] = useState({});
  const [loadingSubs, setLoadingSubs] = useState({});

  const handleStatusChange = async (id, currentStatus) => {
    const newStatus = currentStatus === "Pending" ? "Completed" : "Pending";
    try {
      const { data } = await API.put(`/milestones/${id}`, { status: newStatus });
      setMilestones((prev) => prev.map((m) => (m._id === id ? data : m)));
    } catch (err) {
      alert("Failed to update milestone");
    }
  };

  const toggleExpand = async (milestoneId) => {
    if (expandedMilestone === milestoneId) {
      setExpandedMilestone(null);
      return;
    }
    setExpandedMilestone(milestoneId);
    // Fetch submissions for this milestone
    if (!milestoneSubmissions[milestoneId]) {
      setLoadingSubs((prev) => ({ ...prev, [milestoneId]: true }));
      try {
        const { data } = await API.get(`/submissions/milestone/${milestoneId}`);
        setMilestoneSubmissions((prev) => ({ ...prev, [milestoneId]: data }));
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingSubs((prev) => ({ ...prev, [milestoneId]: false }));
      }
    }
  };

  const handleSubmissionUploaded = (milestoneId, newSub) => {
    setMilestoneSubmissions((prev) => ({
      ...prev,
      [milestoneId]: [...(prev[milestoneId] || []), newSub],
    }));
  };

  if (!milestones.length)
    return (
      <div className="text-center py-4">
        <p className="text-xs text-slate-500">No milestones yet</p>
      </div>
    );

  return (
    <ul className="space-y-2">
      {milestones.map((m, i) => {
        const subs = milestoneSubmissions[m._id] || [];
        const isExpanded = expandedMilestone === m._id;
        const hasSubmissions = subs.length > 0;
        const isPastDeadline = new Date(m.deadline).setHours(23, 59, 59, 999) < new Date().getTime();
        const timeDiff = new Date(m.deadline).getTime() - new Date().getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        const isDueSoon = daysDiff >= 0 && daysDiff <= 3;
        const canUpload = m.status !== "Completed" && !isPastDeadline;

        return (
          <li
            key={m._id}
            className="glass-light rounded-xl overflow-hidden animate-fade-in"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            {/* Milestone Header */}
            <div
              className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-white/5 transition"
              onClick={() => toggleExpand(m._id)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${m.status === "Completed" ? "bg-emerald-400 shadow-lg shadow-emerald-400/30" : "bg-amber-400 shadow-lg shadow-amber-400/30"}`} />
                <div>
                  <p className="text-sm font-medium text-slate-200">{m.name}</p>
                  <p className="text-[11px] text-slate-500">
                    Due: {new Date(m.deadline).toLocaleDateString()}
                    {hasSubmissions && (
                      <span className="ml-2 text-indigo-400">• {subs.length} submission{subs.length > 1 ? "s" : ""}</span>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {role === "student" && m.status === "Pending" && isDueSoon && !isPastDeadline && (
                  <span className="badge bg-red-500/10 text-red-400 border border-red-500/20 shadow-[0_0_8px_rgba(239,68,68,0.25)] animate-pulse">
                    ⚠️ Due Soon
                  </span>
                )}
                <span className={`badge ${m.status === "Completed" ? "badge-green" : "badge-yellow"}`}>
                  {m.status}
                </span>
                <span className={`text-slate-500 text-[10px] transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}>▼</span>
              </div>
            </div>

            {/* Expanded: Submissions + Upload */}
            {isExpanded && (
              <div className="border-t border-white/5 px-4 py-3 animate-slide-down">
                {loadingSubs[m._id] ? (
                  <div className="flex items-center justify-center py-3">
                    <svg className="animate-spin h-4 w-4 text-indigo-400" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  </div>
                ) : (
                  <>
                    {/* Submissions for this milestone */}
                    <div className="mb-2">
                      <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-2">Submissions</p>
                      {subs.length === 0 ? (
                        <p className="text-xs text-slate-500 italic">No submissions yet for this milestone</p>
                      ) : (
                        <SubmissionList submissions={subs} />
                      )}
                    </div>

                    {/* Student: Upload for this milestone */}
                    {role === "student" && canUpload && (
                      <div className="mt-2">
                        <UploadSubmissionForm
                          projectId={projectId}
                          milestoneId={m._id}
                          onUploaded={(s) => handleSubmissionUploaded(m._id, s)}
                        />
                      </div>
                    )}
                    {role === "student" && !canUpload && (
                      <div className="mt-3 p-3 glass-light rounded-xl border border-white/5 bg-red-500/5">
                        <p className="text-[11px] text-red-300/80 italic text-center">
                          {m.status === "Completed" 
                            ? "🔒 This milestone is marked completed. Submissions are closed." 
                            : "⏰ The deadline has passed. Submissions are closed."}
                        </p>
                      </div>
                    )}

                    {/* Faculty: Review & toggle status */}
                    {canEdit && (
                      <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                        <p className="text-[11px] text-slate-500">
                          {subs.length > 0
                            ? `✅ ${subs.length} file${subs.length > 1 ? "s" : ""} submitted — review above`
                            : "⏳ Waiting for student submission"}
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange(m._id, m.status);
                          }}
                          className={`btn-ghost text-[11px] ${m.status === "Pending" ? "hover:!bg-emerald-500/10 hover:!text-emerald-400 hover:!border-emerald-500/30" : ""}`}
                        >
                          {m.status === "Pending" ? "✓ Mark Complete" : "↩ Mark Pending"}
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
