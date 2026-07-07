import toast from 'react-hot-toast';

function ShareButton({ title, text, url, className = '' }) {
  const handleShare = async () => {
    const shareData = { title, text, url };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success('Shared successfully');
        return;
      } catch (error) {
        if (error.name !== 'AbortError') {
          toast.error('Unable to share right now');
        }
      }
    }

    try {
      const shareText = `${title ? `${title}\n` : ''}${text}${url ? `\n${url}` : ''}`;
      await navigator.clipboard.writeText(shareText);
      toast.success('Copied share text to clipboard');
    } catch (err) {
      toast.error('Share failed. Please try again.');
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className={`inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 ${className}`}
    >
      Share
    </button>
  );
}

export default ShareButton;
