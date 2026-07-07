import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";

function WellnessCard({
  title,
  description,
  category,
  image,
  isFavorite,
  onToggleFavorite,
  onReadMore,
  themeColor,
  buttonClass,
  badgeClass,
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="rounded-[24px] border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]"
    >
      {image && (
        <div className="overflow-hidden rounded-t-[24px]">
          <img src={image} alt={title} className="h-48 w-full object-cover" />
        </div>
      )}
      <div className="p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <h2 className={`text-xl font-bold ${themeColor}`}>{title}</h2>
          <span className={`rounded-full px-3 py-1 text-sm font-medium ${badgeClass}`}>
            {category}
          </span>
        </div>

        <p className="text-sm leading-6 text-slate-600">{description}</p>

        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            onClick={onReadMore}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 ${buttonClass}`}
          >
            Read More
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            onClick={onToggleFavorite}
            className="rounded-full border border-slate-200 p-2.5 text-slate-500 transition hover:bg-slate-50"
            aria-label={`Favorite ${title}`}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-rose-500 text-rose-500" : "text-slate-400"}`} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default WellnessCard;
