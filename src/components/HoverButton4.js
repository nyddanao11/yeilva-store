import React,{useState} from'react';
import {Link} from'react-router-dom';
import NewsLetterForm from'./Newsletter';


const HoverButton4 =() =>{
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter =() =>{
		setIsHovered(true);
	};

	const handleMouseLeave =()=>{
		setIsHovered(false);
	};

	const buttonStyle = {
		background: isHovered? '#0D6EFD' : 'white',	
		padding:'5px 20px',
		borderRadius:'5px',
		transition:'background 0.3s',
		cursor:'pointer',
		border:"1px solid  #d3d4d5",
		 maxWidth:"250px"
	};


	return(
		<button
		style={buttonStyle}
		onMouseEnter={handleMouseEnter}
		onMouseLeave={handleMouseLeave}>
		  <Link to='/newsletterform' style={{ textDecoration:"none", color: isHovered? 'white':'black'}}> Subscribe to our Newsletter</Link>
		 </button>
		)
}
export default HoverButton4;