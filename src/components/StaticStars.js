import React from'react';

const StaticStars =({product})=>{
	 // Function to convert rating to stars
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<span key={i}>&#9733;</span>); // Filled star
      } else {
        stars.push(<span key={i}>&#9734;</span>); // Empty star
      }
    }
    return stars;
  };

	return(

 <div className="d-flex  align-items-center justify-content-center">
                <div className="text-warning mb-1 fs-5">
              {renderStars(product.rating)}
                    </div>
                    <span className="text-muted mx-1 ">{product.rating}</span>                 
                </div>
		);
};
export default StaticStars;