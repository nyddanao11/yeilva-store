import React from 'react';
import ImageCard from './ImageCard';
import {homeProducts} from '../data/homeProducts';
import { FaShoppingCart } from 'react-icons/fa';
import { Card, Col, Row, Button } from 'react-bootstrap';
import './FeaturedProduct.css';

const FeaturedProduct = ({addToCart}) => {
 return (

 	<div className="row flex-nowrap overflow-auto">
 			{homeProducts.map((product) => (
		 <ImageCard key={product.id} url={product.url} name={product.name} price={product.price} 
		  	addToCart={addToCart} product={product} />
 		    ))}
 		    
 	   </div>

 );
};

export default FeaturedProduct;
