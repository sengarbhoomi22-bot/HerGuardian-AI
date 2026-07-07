import faqData from "../../data/faqData";

function FAQ() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto">

        <h2 className="text-4xl font-bold text-center text-pink-600">
          Frequently Asked Questions
        </h2>

        <p className="text-center text-gray-600 mt-4">
          Everything you need to know before getting started.
        </p>

        <div className="mt-12 space-y-6">

          {faqData.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl border border-pink-200 p-6 shadow-sm bg-pink-50"
            >
              <h3 className="text-xl font-semibold text-pink-600">
                {faq.question}
              </h3>

              <p className="mt-3 text-gray-700">
                {faq.answer}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default FAQ;