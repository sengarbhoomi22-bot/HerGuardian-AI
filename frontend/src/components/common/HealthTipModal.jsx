import { motion } from "framer-motion";
import { X } from "lucide-react";
import ShareButton from "./ShareButton";

function HealthTipModal({ tip, onClose }) {
  if (!tip) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-6" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="flex w-full max-w-[95vw] max-h-[90vh] flex-col overflow-hidden rounded-[28px] bg-white shadow-2xl sm:max-w-3xl"
      >
        <div className="border-b border-slate-200 bg-white px-6 py-5 sm:px-8 sm:py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-pink-500">Wellness insight</p>
              <h2 id="modal-title" className="mt-2 text-2xl font-bold leading-snug text-slate-900 sm:text-3xl">
                {tip.title}
              </h2>
              {tip.category && (
                <span className="mt-3 inline-flex rounded-full bg-pink-100 px-3 py-1 text-sm font-semibold text-pink-700">
                  {tip.category}
                </span>
              )}
            </div>
            <button onClick={onClose} className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50" aria-label="Close modal">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 sm:py-8 space-y-5 text-sm leading-7 text-slate-600 sm:text-base">
          {tip.image && (
            <div className="overflow-hidden rounded-3xl">
              <img src={tip.image} alt={tip.title} className="w-full object-cover" />
            </div>
          )}

          {tip.description && (
            <div>
              <p className="text-sm leading-7 text-slate-700">{tip.description}</p>
            </div>
          )}

          {(tip.details || tip.readMore || tip.description) && (
            <div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">Details</h3>
              <p>{tip.details || tip.readMore || tip.description}</p>
            </div>
          )}

          {(tip.duration || tip.frequency || tip.difficulty || tip.target || tip.equipment || tip.avoid || tip.trainer || tip.caloriesBurned) && (
            <div className="grid gap-4 sm:grid-cols-2">
              {tip.duration && (
                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-sm font-semibold text-slate-900">Duration</p>
                  <p className="mt-1 text-lg font-bold text-slate-700">{tip.duration}</p>
                </div>
              )}
              {tip.frequency && (
                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-sm font-semibold text-slate-900">Frequency</p>
                  <p className="mt-1 text-lg font-bold text-slate-700">{tip.frequency}</p>
                </div>
              )}
              {tip.difficulty && (
                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-sm font-semibold text-slate-900">Difficulty</p>
                  <p className="mt-1 text-lg font-bold text-slate-700">{tip.difficulty}</p>
                </div>
              )}
              {tip.target && (
                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-sm font-semibold text-slate-900">Target body parts</p>
                  <p className="mt-1 text-lg font-bold text-slate-700">{tip.target}</p>
                </div>
              )}
              {tip.equipment && (
                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-sm font-semibold text-slate-900">Equipment</p>
                  <p className="mt-1 text-lg font-bold text-slate-700">{tip.equipment}</p>
                </div>
              )}
              {tip.caloriesBurned && (
                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-sm font-semibold text-slate-900">Calories</p>
                  <p className="mt-1 text-lg font-bold text-slate-700">{tip.caloriesBurned}</p>
                </div>
              )}
              {tip.avoid && (
                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-sm font-semibold text-slate-900">Who should avoid</p>
                  <p className="mt-1 text-lg font-bold text-slate-700">{tip.avoid}</p>
                </div>
              )}
              {tip.trainer && (
                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-sm font-semibold text-slate-900">Certified instructor</p>
                  <p className="mt-1 text-lg font-bold text-slate-700">{tip.trainer}</p>
                </div>
              )}
            </div>
          )}

          {tip.ingredients?.length > 0 && (
            <div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">Ingredients</h3>
              <ul className="list-disc space-y-1 pl-5 text-slate-600">
                {tip.ingredients.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {tip.cookingMethod?.length > 0 && (
            <div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">Method</h3>
              <ol className="list-decimal space-y-1 pl-5 text-slate-600">
                {tip.cookingMethod.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>
          )}

          {tip.nutritionalValues && (
            <div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">Nutrition facts</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {Object.entries(tip.nutritionalValues).map(([key, value]) => (
                  <div key={key} className="rounded-3xl bg-slate-100 p-4">
                    <p className="text-sm font-semibold text-slate-900 capitalize">{key}</p>
                    <p className="mt-1 text-lg font-bold text-slate-700">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tip.benefits?.length > 0 && (
            <div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">Benefits</h3>
              <ul className="list-disc space-y-1 pl-5 text-slate-600">
                {tip.benefits.map((benefit, idx) => (
                  <li key={idx}>{benefit}</li>
                ))}
              </ul>
            </div>
          )}

          {tip.riskFactors?.length > 0 && (
            <div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">Risk factors</h3>
              <ul className="list-disc space-y-1 pl-5 text-slate-600">
                {tip.riskFactors.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {tip.homeRemedies?.length > 0 && (
            <div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">Home remedies</h3>
              <ul className="list-disc space-y-1 pl-5 text-slate-600">
                {tip.homeRemedies.map((remedy, idx) => (
                  <li key={idx}>{remedy}</li>
                ))}
              </ul>
            </div>
          )}

          {tip.consultDoctor && (
            <div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">When to consult a doctor</h3>
              <p>{tip.consultDoctor}</p>
            </div>
          )}

          {tip.tips?.length > 0 && (
            <div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">Lifestyle Tips</h3>
              <ul className="list-disc space-y-1 pl-5 text-slate-600">
                {tip.tips.map((tipItem, idx) => (
                  <li key={idx}>{tipItem}</li>
                ))}
              </ul>
            </div>
          )}

          {tip.faq?.length > 0 && (
            <div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">FAQ</h3>
              <div className="space-y-4">
                {tip.faq.map((item, idx) => (
                  <div key={idx} className="rounded-3xl bg-slate-100 p-4">
                    <p className="font-semibold text-slate-900">{item.question}</p>
                    <p className="mt-2 text-slate-600">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tip.symptoms?.length > 0 && (
            <div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">Symptoms</h3>
              <ul className="list-disc space-y-1 pl-5 text-slate-600">
                {tip.symptoms.map((symptom, idx) => (
                  <li key={idx}>{symptom}</li>
                ))}
              </ul>
            </div>
          )}

          {tip.prevention?.length > 0 && (
            <div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">Prevention</h3>
              <ul className="list-disc space-y-1 pl-5 text-slate-600">
                {tip.prevention.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {tip.lifestyleTips?.length > 0 && (
            <div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">Lifestyle Tips</h3>
              <ul className="list-disc space-y-1 pl-5 text-slate-600">
                {tip.lifestyleTips.map((tipItem, idx) => (
                  <li key={idx}>{tipItem}</li>
                ))}
              </ul>
            </div>
          )}

          {(tip.eatFoods?.length > 0 || tip.avoidFoods?.length > 0) && (
            <div className="grid gap-4 md:grid-cols-2">
              {tip.eatFoods?.length > 0 && (
                <div>
                  <h3 className="mb-2 text-base font-semibold text-slate-900">Foods to Eat</h3>
                  <ul className="list-disc space-y-1 pl-5 text-slate-600">
                    {tip.eatFoods.map((food, idx) => (
                      <li key={idx}>{food}</li>
                    ))}
                  </ul>
                </div>
              )}
              {tip.avoidFoods?.length > 0 && (
                <div>
                  <h3 className="mb-2 text-base font-semibold text-slate-900">Foods to Avoid</h3>
                  <ul className="list-disc space-y-1 pl-5 text-slate-600">
                    {tip.avoidFoods.map((food, idx) => (
                      <li key={idx}>{food}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {tip.youtubeVideo && (
            <div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">Trusted Video</h3>
              <div className="aspect-video overflow-hidden rounded-3xl bg-slate-900">
                <iframe
                  title={tip.title}
                  src={tip.youtubeVideo}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-slate-200 bg-white px-6 py-4 sm:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <ShareButton
              title={tip.title}
              text={tip.description || tip.readMore || ''}
              url={tip.youtubeVideo}
              className="w-full sm:w-auto"
            />
            <button
              onClick={onClose}
              className="rounded-full bg-pink-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-pink-600"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default HealthTipModal;