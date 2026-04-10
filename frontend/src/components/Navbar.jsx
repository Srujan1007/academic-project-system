import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <header className="h-14 glass border-b border-white/5 flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-50">
      <Link to={user?.role === "faculty" ? "/faculty" : "/student"} className="flex items-center gap-2.5 group">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
          <span className="text-sm">📚</span>
        </div>
        <span className="font-bold text-sm gradient-text tracking-tight">AcademiTrack</span>
      </Link>
      <div className="flex items-center gap-3">
        <Link
          to="/profile"
          className="flex items-center gap-2.5 hover:bg-white/5 rounded-lg px-2.5 py-1.5 transition group"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white shadow-md">
            {initials}
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-medium text-slate-300 group-hover:text-white transition">{user?.name}</p>
            <p className="text-[10px] text-slate-500 capitalize">{user?.role}</p>
          </div>
        </Link>
        <button onClick={handleLogout} className="btn-ghost">
          Logout
        </button>
      </div>
    </header>
  );
}
