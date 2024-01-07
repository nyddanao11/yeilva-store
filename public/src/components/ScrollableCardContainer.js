import React from 'react';
import ScrollableCard from './ScrollableCards';
import {wellnessProductData} from '../data/wellnessProductData';

const ScrollableCardContainer = () => {
 return (
<div className="container">
 		<div className="row flex-nowrap overflow-auto">
 			{wellnessProductData.map((product) => (
		  	<ScrollableCard key={product.id} url={product.url} name={product.name} price={product.price}/>
 		    ))}
 	   </div>
 </div>
 );
};

export default ScrollableCardContainer;
