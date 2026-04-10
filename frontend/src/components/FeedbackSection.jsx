import { useState } from "react";
import API from "../api/axios";

export default function FeedbackSection({ projectId, feedback, setFeedback, role }) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setLoading(true);
    try {
      const { data } = await API.post("/feedback/create", { projectId, comment });
      setFeedback((prev) => [data, ...prev]);
      setComment("");
    } catch (err) {
      alert("Failed to add feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {role === "faculty" && (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-3">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write feedback or comment..."
            className="input-dark flex-1 text-sm"
            required
          />
          <button type="submit" disabled={loading} className="btn-primary text-sm px-4">
            {loading ? "..." : "💬 Send"}
          </button>
        </form>
      )}

      {feedback.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-xs text-slate-500">No feedback yet</p>
        </div>
      ) : (
        <ul className="space-y-2 max-h-48 overflow-y-auto">
          {feedback.map((fb, i) => (
            <li
              key={fb._id}
              className="glass-light rounded-xl px-4 py-3 animate-fade-in"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[8px] font-bold text-white">
                  {fb.facultyId?.name?.[0] || "F"}
                </div>
                <span className="text-xs font-medium text-indigo-300">{fb.facultyId?.name || "Faculty"}</span>
                <span className="text-[10px] text-slate-600 ml-auto">
                  {new Date(fb.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-slate-300 pl-7">{fb.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
