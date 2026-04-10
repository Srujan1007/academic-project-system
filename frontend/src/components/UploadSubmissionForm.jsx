import { useState } from "react";
import API from "../api/axios";

export default function UploadSubmissionForm({ projectId, milestoneId, onUploaded }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("projectId", projectId);
    if (milestoneId) {
      formData.append("milestoneId", milestoneId);
    }
    setLoading(true);
    try {
      const { data } = await API.post("/submissions/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onUploaded(data);
      setFile(null);
      e.target.reset();
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 flex-wrap items-center mt-2">
      <label className="flex-1 min-w-[200px]">
        <div className="input-dark flex items-center gap-2 cursor-pointer text-sm hover:border-indigo-500/30 transition">
          <span>📎</span>
          <span className="text-slate-400 truncate">
            {file ? file.name : "Choose PDF or DOC file..."}
          </span>
        </div>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files[0])}
          required
          className="hidden"
        />
      </label>
      <button type="submit" disabled={loading || !file} className="btn-primary text-sm px-4">
        {loading ? "Uploading..." : "⬆️ Upload"}
      </button>
    </form>
  );
}
