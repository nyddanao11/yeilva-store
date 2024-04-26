import React, {useState}from 'react';
import{Form, Container, Row, Col, Button, Spinner} from'react-bootstrap';
import Footer from'../components/Footer';

const NeedHelp =()=>{
  const[email, setEmail] = useState('');
  const[message, setMessage] = useState('');
  const[loading, setLoading] = useState(false);

  const handleSubmit=async(e)=>{
		e.preventDefault()
		try{
			setLoading(true);
		}
		catch(error){

		} finally{
			setLoading(false);
			}
		}

	return(
			<>
			<Container className='mt-3'>
				<Row className="justify-content-center">
					<Col sm={12} md={6} >
					<div style={{textAlign:"center"}}>
					<h2  >Need Help?</h2>
					</div>
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

						 <Form.Group controlId="message">
						  <Form.Label>message</Form.Label>
					    	<Form.Control 
					    	as="textarea"
						     type="message"
							placeholder="Enter your message"
							value={message}
							onChange={(e) => setMessage(e.target.value)} required 
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