export default function Sidebar({ activeTab, setActiveTab, role }) {
  const studentLinks = [
    { name: "My Projects", icon: "📁" },
    { name: "Create Project", icon: "➕" },
    { name: "Profile", icon: "👤" },
  ];
  const facultyLinks = [
    { name: "All Projects", icon: "📊" },
    { name: "Profile", icon: "👤" },
  ];
  const links = role === "faculty" ? facultyLinks : studentLinks;

  return (
    <aside className="w-56 glass border-r border-white/5 fixed top-14 left-0 bottom-0 px-3 py-5">
      <div className="mb-4 px-3">
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Navigation</p>
      </div>
      <nav className="space-y-1">
        {links.map((link, i) => (
          <button
            key={link.name}
            onClick={() => setActiveTab(link.name)}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-3 animate-slide-in-left ${
              activeTab === link.name
                ? "bg-gradient-to-r from-indigo-500/15 to-purple-500/10 text-indigo-300 border border-indigo-500/20 shadow-lg shadow-indigo-500/5"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
            }`}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <span className="text-base">{link.icon}</span>
            {link.name}
          </button>
        ))}
      </nav>

      {/* Bottom info */}
      <div className="absolute bottom-5 left-3 right-3">
        <div className="glass-light rounded-xl px-3 py-3">
          <p className="text-[10px] text-slate-500 font-medium">AcademiTrack v1.0</p>
          <p className="text-[10px] text-slate-600 mt-0.5">© 2026 Academic System</p>
        </div>
      </div>
    </aside>
  );
}
