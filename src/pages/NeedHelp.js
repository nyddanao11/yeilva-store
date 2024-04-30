import React, {useState}from 'react';
import{Form, Container, Row, Col, Button, Spinner} from'react-bootstrap';
import Footer from'../components/Footer';
import axios from'axios';
import { useNavigate } from 'react-router-dom';


const NeedHelp =()=>{
  const[email, setEmail] = useState('');
  const[message, setMessage] = useState('');
  const[loading, setLoading] = useState(false);
  const[mainMessage, setMainMessage] = useState('')
  const navigate = useNavigate();

  const handleSubmit=async(e)=>{
		e.preventDefault()
		try{
			  setLoading(true); // Set loading to true during form submission

      // Make a request to your server to handle forgot password logic
      const response = await axios.post('https://yeilva-store-server.up.railway.app/help', {
        email: email,
        mainMessage: mainMessage,

      });

     if (response.data.status === 'success') {
        setMessage('Message sent successfully');
        setLoading(false);  // Reset loading
      } else {
        setMessage(response.data.error);
        setLoading(false);  // Reset loading
      }
    } catch (error) {
      setMessage('Error: Message not sent.');
      setLoading(false);  // Reset loading
    }
  };

	return(
			<>
			<Container className='mt-3'>
				<Row className="justify-content-center">
					<Col sm={12} md={6} >
					<div style={{textAlign:"center"}}>
					<h2  >Need Help?</h2>
					</div>
					  {message && <p className="mt-3" style={{color:"red"}}>{message}</p>}
						<Form onSubmit={handleSubmit}>
						 <Form.Group controlId="email">
						  <Form.Label>Email</Form.Label>
					    	<Form.Control 
						     type="email"
							placeholder="Enter your Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)} required 
						/>
						</Form.Group>

						 <Form.Group controlId="mainMessage">
						  <Form.Label>message</Form.Label>
					    	<Form.Control 
					    	as="textarea"
						     type="mainMessage"
							placeholder="Enter your message"
							value={mainMessage}
							onChange={(e) => setMainMessage(e.target.value)} required 
						/>
						
            <Button variant="primary" type="submit" className="w-100 mt-3" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Submit'}
            </Button>
						</Form.Group>

						</Form>
					</Col>
				</Row>
			</Container>
			<div className="mt-4">
			<Footer />
			</div>
			</>
			)
	}

export default NeedHelp;