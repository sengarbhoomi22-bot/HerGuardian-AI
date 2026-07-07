import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import testimonialsData from "../../data/testimonialsData";
import { getFeedback } from "../../services/feedbackService";

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5 mt-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-sm ${rating >= star ? "text-yellow-400" : "text-gray-200"}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function Testimonials() {
  const [dynamicReviews, setDynamicReviews] = useState([]);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const response = await getFeedback();
        // Take up to 3 most recent user reviews to display on the landing page
        setDynamicReviews((response.feedback || []).slice(0, 3));
      } catch {
        // Silently fail — static reviews will still show
      }
    };
    loadReviews();
  }, []);

  // Combine static testimonials with dynamic DB reviews (dynamic shown first)
  const allTestimonials = [
    ...dynamicReviews.map((rev) => ({
      name: rev.userName,
      profession: "HerGuardian AI Member",
      review: rev.comment,
      rating: rev.rating,
      isDynamic: true,
    })),
    ...testimonialsData.map((t) => ({ ...t, isDynamic: false })),
  ];

  return (
    <section id="reviews" className="bg-pink-50 py-20 px-6">
      <h2 className="text-center text-4xl font-bold text-pink-600">
        What Women Say
      </h2>

      <p className="mt-4 text-center text-gray-600 max-w-3xl mx-auto">
        Real voices. Real experiences. Real empowerment.
      </p>

      <div className="mt-14 grid gap-8 md:grid-cols-3 max-w-7xl mx-auto">
        {allTestimonials.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            className="rounded-3xl bg-white p-8 shadow-lg flex flex-col"
          >
            {item.isDynamic && (
              <span className="mb-3 self-start rounded-full bg-pink-100 px-2.5 py-0.5 text-xs font-semibold text-pink-700">
                ✓ Verified Member
              </span>
            )}

            <p className="italic text-gray-700 flex-1">
              &ldquo;{item.review}&rdquo;
            </p>

            <div className="mt-6">
              <h3 className="font-bold text-pink-600">
                {item.name}
              </h3>

              <p className="text-gray-500 text-sm">
                {item.profession}
              </p>

              {item.rating && <StarRating rating={item.rating} />}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
