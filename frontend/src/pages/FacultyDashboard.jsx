import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProjectCard from "../components/ProjectCard";
import API from "../api/axios";
import Profile from "./Profile";

export default function FacultyDashboard() {
  const [activeTab, setActiveTab] = useState("All Projects");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/projects");
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleStatusUpdate = (updated) => {
    setProjects((prev) => prev.map((p) => (p._id === updated._id ? { ...p, ...updated } : p)));
  };

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.studentId?.name?.toLowerCase().includes(search.toLowerCase())
  );

  // Stats
  const totalProjects = projects.length;
  const uniqueStudents = [...new Set(projects.map((p) => p.studentId?._id))].length;
  const inProgress = projects.filter((p) => p.status === "In Progress").length;
  const approved = projects.filter((p) => p.status === "Approved").length;

  const stats = [
    { label: "Total Students", value: uniqueStudents, icon: "🎓", color: "from-blue-500/20 to-blue-600/5 border-blue-500/20" },
    { label: "Total Projects", value: totalProjects, icon: "📊", color: "from-indigo-500/20 to-indigo-600/5 border-indigo-500/20" },
    { label: "Projects In Progress", value: inProgress, icon: "⚡", color: "from-amber-500/20 to-amber-600/5 border-amber-500/20" },
    { label: "Approved Projects", value: approved, icon: "✅", color: "from-emerald-500/20 to-emerald-600/5 border-emerald-500/20" },
  ];

  return (
    <div className="min-h-screen bg-mesh">
      <Navbar />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} role="faculty" />

      <main className="ml-56 pt-14 p-6">
        {activeTab === "All Projects" && (
          <div className="animate-fade-in-up">
            {/* Header */}
            <div className="mb-6 flex items-start justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">All Student Projects</h2>
                <p className="text-sm text-slate-400 mt-1">Monitor progress, review milestones and submissions</p>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">🔍</span>
                <input
                  type="text"
                  placeholder="Search projects or students..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input-dark pl-9 w-72"
                />
              </div>
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
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 animate-fade-in">
                <div className="text-5xl mb-4">🔍</div>
                <p className="text-slate-400 text-sm">
                  {search ? "No projects match your search." : "No student projects yet."}
                </p>
              </div>
            ) : (
              <div className="max-w-3xl">
                {Object.values(
                  filtered.reduce((acc, p) => {
                    if (!p.studentId) return acc;
                    const sid = p.studentId._id;
                    if (!acc[sid]) acc[sid] = { student: p.studentId, projects: [] };
                    acc[sid].projects.push(p);
                    return acc;
                  }, {})
                ).map((group, groupIdx) => (
                  <div key={group.student._id} className="mb-10 animate-fade-in-up" style={{ animationDelay: `${groupIdx * 0.1}s` }}>
                    <div className="flex items-center gap-3 mb-4 px-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
                        {group.student.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{group.student.name}</h3>
                        <p className="text-[11px] text-slate-400 font-mono">{group.student.email}</p>
                      </div>
                      <div className="ml-auto">
                         <span className="text-xs font-semibold text-indigo-300 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                            {group.projects.length} Project{group.projects.length > 1 ? "s" : ""}
                         </span>
                      </div>
                    </div>
                    <div className="space-y-4 ml-5 border-l-2 border-indigo-500/20 pl-6 relative">
                      {/* Decorative timeline dot */}
                      <div className="absolute w-2 h-2 rounded-full bg-indigo-500/50 -left-[5px] top-0" />
                      <div className="absolute w-2 h-2 rounded-full bg-indigo-500/50 -left-[5px] bottom-0" />
                      
                      {group.projects.map((p) => (
                        <ProjectCard
                          key={p._id}
                          project={p}
                          role="faculty"
                          onStatusUpdate={handleStatusUpdate}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "Profile" && (
          <Profile />
        )}
      </main>
    </div>
  );
}
