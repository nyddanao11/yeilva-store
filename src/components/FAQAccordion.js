import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Accordion = () => {
  const [activeItem, setActiveItem] = useState(null);

  const handleToggle = (itemId) => {
    setActiveItem(activeItem === itemId ? null : itemId);
  };

  const accordionData = [
    {
      id: 1,
      question: 'How do I receive my digital purchase?',
      answer:
        "Immediately after checkout, you will receive a download link on the confirmation page. We also send an automated email with your permanent download link so you can access your files anytime.",
    },
    {
      id: 2,
      question: 'What file formats are included?',
      answer:
        "Our digital products are typically delivered as high-quality ZIP files containing industry-standard formats (e.g., PDF, PNG, JPG, or source files depending on the product). Specific formats are listed on each product page.",
    },
    {
      id: 3,
      question: 'Do you offer refunds for digital products?',
      answer: (
        <>
          Due to the nature of digital downloads, we generally do not offer refunds once a file has been accessed. However, if you experience technical issues or are unsatisfied, please check our{' '}
          <Link to="/refundpolicy">Refund Policy</Link> for our satisfaction guarantee details.
        </>
      ),
    },
    {
      id: 4,
      question: 'Can I access my downloads on multiple devices?',
      answer:
        "Yes! Once purchased, the files are yours. You can download and save them to your computer, tablet, or smartphone for personal use.",
    },
    {
      id: 5,
      question: 'What should I do if I didn’t receive my download email?',
      answer:
        "First, check your spam/junk folder. If it’s not there, ensure your payment was processed successfully. You can always contact our support team with your order number for a manual link reset.",
    },
    {
      id: 6,
      question: 'Is my payment information secure?',
      answer:
        "Absolutely. We use SSL encryption and secure payment gateways (like Stripe/PayPal) to ensure your data is never stored on our servers and remains 100% protected.",
    },
  ];

  return (
    <div className="accordion custom-faq" id="accordionExample">
      {accordionData.map(({ id, question, answer }) => (
        <div className="accordion-item mb-2 border-0 shadow-sm" key={id} style={{ borderRadius: '8px' }}>
          <h2 className="accordion-header">
            <button
              className={`accordion-button rounded-3 ${activeItem === id ? '' : 'collapsed'}`}
              type="button"
              onClick={() => handleToggle(id)}
              style={{ fontWeight: '600', backgroundColor: activeItem === id ? '#f8f9fa' : 'white' }}
            >
              {question}
            </button>
          </h2>
          <div
            id={`collapse${id}`}
            className={`accordion-collapse collapse ${activeItem === id ? 'show' : ''}`}
            style={{ transition: 'all 0.3s ease' }}
          >
            <div className="accordion-body text-muted" style={{ lineHeight: '1.6' }}>
              {answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;