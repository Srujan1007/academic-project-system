export default function SubmissionList({ submissions }) {
  if (!submissions.length)
    return (
      <div className="text-center py-4">
        <p className="text-xs text-slate-500">No submissions yet</p>
      </div>
    );

  return (
    <ul className="space-y-2">
      {submissions.map((s, i) => (
        <li
          key={s._id}
          className="flex items-center justify-between glass-light rounded-xl px-4 py-3 animate-fade-in"
          style={{ animationDelay: `${i * 0.05}s` }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <span className="text-xs">📄</span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-200 truncate max-w-[200px]">{s.file}</p>
              <p className="text-[11px] text-slate-500">{new Date(s.submissionDate).toLocaleString()}</p>
            </div>
          </div>
          <a
            href={`${import.meta.env.VITE_API_URL.replace("/api", "")}/uploads/${s.filePath}`}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost flex items-center gap-1.5"
          >
            <span>⬇️</span> Download
          </a>
        </li>
      ))}
    </ul>
  );
}
