import React, { useState } from 'react';
import {Link} from 'react-router-dom';




const LoanAccordion = () => {

   const [activeItem, setActiveItem] = useState(null);

  const handleToggle = (itemId) => {
    setActiveItem(activeItem === itemId ? null : itemId);
  };

  const accordionData = [
  {
    id: 1,
    question: ' Who can apply for a loan on YeilvaSTORE?',
    answer:
      "To be eligible for a loan, users must meet certain criteria, including paid previous loan application if any, age, income, and residency requirements. Specific eligibility details can be found within the app during the application process.",
  },
  {
    id: 2,
    question: 'How do I apply for a loan?',
    answer:
      " Applying for a loan is easy. Visit https:// yeilvastore.com, create an account, and complete the application by providing required details and supporting documents. Our user-friendly interface guides you through each step of the process.",
  },
   {
    id: 3,
    question: 'How long does it take to receive a loan decision?',
    answer:
      "Loan decisions are typically made promptly. Upon completing your application, we will review your information. You will be notified of the decision within a short timeframe via text or email.",
  },
   {
    id: 4,
    question: ' Can I repay my loan early?',
    answer:
      " Yes, we allow early repayment. Be sure to check your loan agreement or contact us directly for information on any potential prepayment fees or penalties.",
  },
 {
  id: 5,
  question: 'How is my personal information handled?',
  answer: (
    <>
     YeilvaSTORE adheres to strict privacy standards. We use advanced security measures to protect your personal information. For more details, Please visit our{' '}
          <Link to="/privacypolicy">Privacy Policy Page</Link> for details. 
    </>
  ),
},

  {
    id: 6,
    question: 'What if I encounter issues or have questions?',
    answer:
      "Our customer support team is here to help. You can reach us through the app's support feature or contact us via [email/phone]. We strive to provide timely and effective assistance to ensure a positive user experience.",
  },
  
];

 

  return (
    <div className="accordion" id="accordionExample">
      {accordionData.map(({ id, question, answer }) => (
        <div className="accordion-item" key={id}>
          <h2 className="accordion-header">
            <button
              className={`accordion-button ${activeItem === id ? '' : 'collapsed'}`}
              type="button"
              onClick={() => handleToggle(id)}
            >
              {question}
            </button>
          </h2>
          <div
            id={`collapse${id}`} 
            className={`accordion-collapse collapse ${activeItem === id ? 'show' : ''}`}
          >
            <div className="accordion-body">{answer}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoanAccordion;
