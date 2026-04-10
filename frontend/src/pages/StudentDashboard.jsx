import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProjectCard from "../components/ProjectCard";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Profile from "./Profile";

export default function StudentDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("My Projects");
  const [projects, setProjects] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", facultyId: "" });
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [projRes, facRes] = await Promise.all([
        API.get("/projects"),
        API.get("/auth/faculty")
      ]);
      setProjects(projRes.data);
      setFaculties(facRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      const { data } = await API.post("/projects/create", form);
      setProjects((prev) => [data, ...prev]);
      setForm({ title: "", description: "", facultyId: "" });
      setActiveTab("My Projects");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create project");
    } finally {
      setCreating(false);
    }
  };

  // Stats
  const totalProjects = projects.length;
  const inProgress = projects.filter((p) => p.status === "In Progress" || p.status === "Approved").length;
  const completed = projects.filter((p) => p.status === "Completed").length;
  const graded = projects.filter((p) => p.grade).length;

  const stats = [
    { label: "Total Projects", value: totalProjects, icon: "📁", color: "from-blue-500/20 to-blue-600/5 border-blue-500/20" },
    { label: "In Progress", value: inProgress, icon: "⚡", color: "from-amber-500/20 to-amber-600/5 border-amber-500/20" },
    { label: "Completed Projects", value: completed, icon: "✅", color: "from-emerald-500/20 to-emerald-600/5 border-emerald-500/20" },
    { label: "Graded Projects", value: graded, icon: "⭐", color: "from-purple-500/20 to-purple-600/5 border-purple-500/20" },
  ];

  return (
    <div className="min-h-screen bg-mesh">
      <Navbar />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} role="student" />

      <main className="ml-56 pt-14 p-6">
        {activeTab === "My Projects" && (
          <div className="animate-fade-in-up">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white">My Projects</h2>
              <p className="text-sm text-slate-400 mt-1">Track your academic projects and milestones</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`stat-card bg-gradient-to-br ${s.color} animate-fade-in-up`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">{s.label}</p>
                      <p className="text-2xl font-bold text-white mt-1">{s.value}</p>
                    </div>
                    <span className="text-2xl opacity-60">{s.icon}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Project List */}
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <svg className="animate-spin h-6 w-6 text-indigo-400" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-20 animate-fade-in">
                <div className="text-5xl mb-4 animate-float">📁</div>
                <p className="text-slate-400 text-sm">No projects yet.</p>
                <button
                  onClick={() => setActiveTab("Create Project")}
                  className="btn-primary mt-4"
                >
                  Create Your First Project
                </button>
              </div>
            ) : (
              <div className="space-y-4 max-w-3xl">
                {projects.map((p, i) => (
                  <div key={p._id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                    <ProjectCard project={p} role="student" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "Create Project" && (
          <div className="max-w-lg animate-fade-in-up">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white">Create New Project</h2>
              <p className="text-sm text-slate-400 mt-1">Fill in the details to start a new project</p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <form onSubmit={handleCreate} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                    placeholder="e.g. Machine Learning Classifier"
                    className="input-dark"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Brief description of the project..."
                    className="input-dark resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Assign Faculty Advisor
                  </label>
                  <select
                    value={form.facultyId}
                    onChange={(e) => setForm({ ...form, facultyId: e.target.value })}
                    required
                    className="select-dark w-full"
                  >
                    <option value="" disabled>Select a faculty member...</option>
                    {faculties.map(f => (
                      <option key={f._id} value={f._id}>{f.name}</option>
                    ))}
                  </select>
                </div>
                <button type="submit" disabled={creating} className="btn-primary w-full py-3">
                  {creating ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Creating...
                    </span>
                  ) : "🚀 Create Project"}
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === "Profile" && (
          <Profile />
        )}
      </main>
    </div>
  );
}
