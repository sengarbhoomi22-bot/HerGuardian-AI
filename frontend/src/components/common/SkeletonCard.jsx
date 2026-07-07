function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="h-4 w-24 rounded-full bg-slate-200" />
      <div className="mt-4 h-6 w-3/4 rounded-full bg-slate-200" />
      <div className="mt-3 h-4 w-full rounded-full bg-slate-100" />
      <div className="mt-2 h-4 w-5/6 rounded-full bg-slate-100" />
      <div className="mt-6 flex justify-between">
        <div className="h-10 w-24 rounded-full bg-slate-200" />
        <div className="h-10 w-10 rounded-full bg-slate-200" />
      </div>
    </div>
  );
}

export default SkeletonCard;
