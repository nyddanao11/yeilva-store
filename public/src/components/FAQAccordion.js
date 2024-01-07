import React, { useState } from 'react';
import {Link} from 'react-router-dom';




const Accordion = () => {

   const [activeItem, setActiveItem] = useState(null);

  const handleToggle = (itemId) => {
    setActiveItem(activeItem === itemId ? null : itemId);
  };

  const accordionData = [
  {
    id: 1,
    question: 'How can I place an order on your online store?',
    answer:
      "To place an order, simply browse our product catalog, select the items you wish to purchase, and add them to your cart. Follow the checkout process to enter your shipping information, select a payment method, and confirm your order.",
  },
  {
    id: 2,
    question: 'Can I modify or cancel my order after it has been placed?',
    answer:
      "Once an order is confirmed, it is processed promptly to ensure quick shipping. Therefore, modifications or cancellations may not be possible. Please contact our customer support team as soon as possible for assistance.",
  },
   {
    id: 3,
    question: 'What payment methods do you accept?',
    answer:
      "We accept a variety of payment methods, including E-wallets, credit/debit cards,  and other secure online payment options. You can choose your preferred payment method during the checkout ",
  },
   {
    id: 4,
    question: 'Are there any promotions or discounts available?',
    answer:
      "Yes, we frequently run promotions and offer discounts. Subscribe to our newsletter to receive updates on the latest promotions, or check our website for ongoing sales and special offers.",
  },
 {
  id: 5,
  question: 'What is your return policy?',
  answer: (
    <>
     Our return policy allows you to return items within 30 days of purchase for a refund or exchange. Please visit our{' '}
          <Link to="/returnpolicy">Return Policy Page</Link> for detailed instructions on how to initiate a return.
    </>
  ),
},

  {
    id: 6,
    question: 'Are my personal and payment details secure when shopping on your site?',
    answer:
      "Yes, your security is our priority. We use industry-standard encryption protocols to ensure that your personal and payment information is secure. Our website is also regularly monitored for security vulnerabilities.",
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

export default Accordion;
