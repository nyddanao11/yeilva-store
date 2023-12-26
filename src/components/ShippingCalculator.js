import React, { useState } from 'react';

const ShippingCalculator = () => {
  const [weight, setWeight] = useState(0);
  const [destination, setDestination] = useState('domestic');
  const [shippingCost, setShippingCost] = useState(0);

  const handleWeightChange = (e) => {
    setWeight(parseFloat(e.target.value));
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const calculateShippingCost = () => {
    // Rate table based on weight and destination
    const rateTable = {
      domestic: {
        upTo1kg: 5,
        upTo5kg: 10,
        over5kg: 15,
      },
      international: {
        upTo1kg: 15,
        upTo5kg: 20,
        over5kg: 25,
      },
    };

    // Determine the applicable rate based on weight and destination
    let rate;
    if (weight <= 1) {
      rate = rateTable[destination].upTo1kg;
    } else if (weight <= 5) {
      rate = rateTable[destination].upTo5kg;
    } else {
      rate = rateTable[destination].over5kg;
    }

    // Update the shipping cost state
    setShippingCost(rate);
  };

  return (
    <div>
      <h2>Shipping Calculator</h2>
      <label>
        Weight (kg):
        <input type="number" value={weight} onChange={handleWeightChange} />
      </label>
      <br />
      <label>
        Destination:
        <select value={destination} onChange={handleDestinationChange}>
          <option value="domestic">Domestic</option>
          <option value="international">International</option>
        </select>
      </label>
      <br />
      <button onClick={calculateShippingCost}>Calculate Shipping Cost</button>
      <br />
      <h3>Shipping Cost: ${shippingCost}</h3>
    </div>
  );
};

export default ShippingCalculator;
