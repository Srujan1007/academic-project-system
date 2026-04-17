export default function SubmissionList({ submissions }) {
  if (!submissions.length)
    return (
      <div className="text-center py-4">
        <p className="text-xs text-slate-500">No submissions yet</p>
      </div>
    );

  const handleDownload = (s) => {
    try {
      // filePath is a base64 data URI — convert to blob and download
      const [header, base64] = s.filePath.split(",");
      const mimeMatch = header.match(/:(.*?);/);
      const mime = mimeMatch ? mimeMatch[1] : "application/octet-stream";
      const byteChars = atob(base64);
      const byteArray = new Uint8Array(byteChars.length);
      for (let i = 0; i < byteChars.length; i++) {
        byteArray[i] = byteChars.charCodeAt(i);
      }
      const blob = new Blob([byteArray], { type: mime });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = s.file;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert("Download failed: " + err.message);
    }
  };

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
          <button
            onClick={() => handleDownload(s)}
            className="btn-ghost flex items-center gap-1.5"
          >
            <span>⬇️</span> Download
          </button>
        </li>
      ))}
    </ul>
  );
}
