import React, { useState } from 'react';
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const faqs = [
    {
      question: "What is your return policy?",
      answer: "Our return policy lasts 30 days. No refunds after 30 days from the purchase date.",
    },
    {
      question: "How do I track my order?",
      answer: "You can track your order by logging into your account and checking the order status.",
    },
    {
      question: "Can I purchase items in bulk?",
      answer: "Yes, you can purchase items in bulk. Please contact our sales team for more information.",
    },
    // Add more FAQs as needed
  ];
  return (
    <main className='faq-main'>
      <div className="faq-page">
        <h1>Frequently Asked Questions</h1>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <div className="faq-question" onClick={() => toggleAnswer(index)}>
                <h2>{faq.question}</h2>
                <span>{openIndex === index ? '-' : '+'}</span>
              </div>
              <div className={`faq-answer ${openIndex === index ? 'open' : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default FAQ;