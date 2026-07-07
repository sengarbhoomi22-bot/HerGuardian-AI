import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageSquareHeart, Star, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../services/api";
import LoadingSpinner from "../../components/common/LoadingSpinner";

function Feedback() {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hoverRating, setHoverRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await api.get("/feedback");
      setReviews(res.data.feedback || []);
    } catch (err) {
      console.error(err);
      setError("Unable to load reviews.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchReviews();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    try {
      setSubmitting(true);
      await api.post("/feedback", { rating, comment });
      toast.success("Thank you for your feedback! 🌸");
      setComment("");
      setRating(5);
      fetchReviews();
    } catch {
      toast.error("Failed to submit feedback");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(253,244,245,0.7),_transparent_40%),linear-gradient(135deg,_#fffafb_0%,_#fff1f3_100%)] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mb-8 rounded-[28px] border border-pink-100 bg-white/80 p-6 shadow-[0_20px_60px_rgba(244,63,94,0.08)] backdrop-blur sm:p-8"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-pink-100 px-3 py-1 text-sm font-semibold text-pink-700">
                <MessageSquareHeart className="h-4 w-4" />
                Community Feedback
              </div>
              <h1 className="text-3xl font-bold text-pink-600 sm:text-4xl">Share Your Experience</h1>
              <p className="mt-2 text-sm text-gray-600 sm:text-base">Help us grow and improve HerGuardian AI. Your review empowers others.</p>
            </div>
            <div className="rounded-2xl bg-pink-50 p-3 text-pink-600">
              <Sparkles className="h-6 w-6" />
            </div>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          {/* Submit Review Card */}
          <div className="rounded-[28px] border border-pink-100 bg-white p-6 shadow-sm self-start">
            <h2 className="text-xl font-bold text-pink-700">Submit a Review</h2>
            <p className="text-sm text-gray-500 mt-1">Prefilled as: <span className="font-semibold text-gray-700">{user.name}</span></p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 transition hover:scale-110"
                    >
                      <Star
                        className={`h-7 w-7 ${
                          (hoverRating || rating) >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Review</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us what you like, or what we can improve..."
                  rows="5"
                  className="w-full rounded-2xl border border-pink-100 p-4 text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
                  disabled={submitting}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-pink-600 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-pink-700 disabled:bg-gray-400"
              >
                {submitting ? "Submitting..." : "Submit Feedback"}
              </button>
            </form>
          </div>

          {/* Testimonial Feed */}
          <div className="rounded-[28px] border border-pink-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-pink-700">What Our Members Say</h2>

            {loading ? (
              <LoadingSpinner label="Fetching community feedback..." className="min-h-[300px]" />
            ) : error ? (
              <p className="mt-6 text-sm text-red-500">{error}</p>
            ) : reviews.length === 0 ? (
              <div className="mt-8 text-center text-gray-500 min-h-[300px] flex flex-col items-center justify-center">
                <MessageSquareHeart className="h-10 w-10 text-pink-300 mb-2" />
                <p>No reviews yet. Be the first to share your thoughts!</p>
              </div>
            ) : (
              <div className="mt-6 space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {reviews.map((rev) => (
                  <div key={rev._id} className="rounded-2xl border border-pink-50 bg-pink-50/10 p-4 shadow-sm">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">{rev.userName}</h4>
                        <p className="text-[10px] text-gray-400">{new Date(rev.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4.5 w-4.5 ${
                              rev.rating >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2 leading-relaxed">"{rev.comment}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
