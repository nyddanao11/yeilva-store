import React from 'react';
import FreebiesEbook from './FreebiesEbook';
import NewUserDiscount from './NewUserDiscount';
import YouMayLike from'./YouMayLike';

const Freebies = ({addToCart}) => {
    return (
        <div className="App">
          <NewUserDiscount />
        
            <YouMayLike addToCart={addToCart}/>

        </div>
    );
};

export default Freebies;
