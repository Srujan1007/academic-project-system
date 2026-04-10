import { useState } from "react";
import API from "../api/axios";

export default function AddMilestoneForm({ projectId, onAdded }) {
  const [form, setForm] = useState({ name: "", deadline: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post("/milestones/create", { ...form, projectId });
      onAdded(data);
      setForm({ name: "", deadline: "" });
    } catch (err) {
      alert("Failed to add milestone");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 flex-wrap mt-3">
      <input
        type="text"
        placeholder="Milestone name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
        className="input-dark flex-1 min-w-[140px] text-sm"
      />
      <input
        type="date"
        value={form.deadline}
        onChange={(e) => setForm({ ...form, deadline: e.target.value })}
        required
        className="input-dark text-sm w-auto"
      />
      <button type="submit" disabled={loading} className="btn-primary text-sm px-4">
        {loading ? "Adding..." : "➕ Add"}
      </button>
    </form>
  );
}
