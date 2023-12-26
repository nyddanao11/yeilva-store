import React from 'react';
import {Link} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';


const LockoutPage =()=>{

	return(
		<Container>
		<Row>
		<Col >
		<h3> Account locked. Please try again after 15 mins</h3>
		<p>OR </p>
		 <Link to='/forgotpassword'>Click Forgot Password</Link>
		</Col>
		</Row>
		</Container>
		)
};

export default LockoutPage;