
export const AboutFAQ = () => {
  const faqs = [
    {
      question: "What makes your t-shirts different from others?",
      answer: "Our t-shirts feature exclusive designs created by fans for fans, printed on premium fabric using high-quality printing techniques that ensure vibrant colors and durability even after multiple washes."
    },
    {
      question: "Are your products officially licensed?",
      answer: "Yes, we partner with official licensors to ensure our products are 100% authentic and legally approved. This guarantees the quality and authenticity of the characters and designs featured on our t-shirts."
    },
    {
      question: "How do your sizes run?",
      answer: "Our sizes generally run true to standard US sizing. We recommend checking our detailed size guide for precise measurements before ordering. If you're between sizes, we typically suggest sizing up for a more comfortable fit."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for unworn items in original packaging. If you're not completely satisfied with your purchase, you can return it for a full refund or exchange. Customized items cannot be returned unless defective."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping within the US typically takes 3-5 business days. International shipping varies by location but generally takes 7-14 business days. Express shipping options are available at checkout for faster delivery."
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-starry-charcoal to-starry-darkPurple">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Frequently Asked Questions</h2>
        <p className="text-starry-neutral text-center max-w-2xl mx-auto mb-12">
          Find answers to common questions about our products, shipping, and company policies.
        </p>
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-starry-darkPurple/40 p-6 rounded-lg border border-starry-purple/10">
              <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
              <p className="text-starry-neutral">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
