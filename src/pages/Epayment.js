import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';


const Epayment =() =>{


	return(

	 <div>
	      <Alert variant="success">
	        <Alert.Heading>404- Page Not Found</Alert.Heading>
	        <p>Service not yet Available.</p>
	      </Alert>

       <Button
              variant="primary"     
              style={{ marginTop: "15px", marginBottom: "10px" }}
            >
               <Link to='/checkout' style={{textDecoration:'none', color:'white'}}>Back to Checkout</Link>
            </Button>
      </div>

		);
};

export default Epayment;