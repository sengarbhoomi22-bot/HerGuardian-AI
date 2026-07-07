import { LoaderCircle } from "lucide-react";

function LoadingSpinner({ label = "Loading...", className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-3 py-6 text-sm font-medium text-slate-600 ${className}`} role="status" aria-live="polite">
      <LoaderCircle className="h-5 w-5 animate-spin" />
      <span>{label}</span>
    </div>
  );
}

export default LoadingSpinner;
