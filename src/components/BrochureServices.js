import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import{Link} from 'react-router-dom';

export default function Brochure () {
  return (
    <div className="brochure" style={{paddingTop:"15px"}}>
      <Container>
        <Row>
          <Col md={6} >
            <Card style={{border:"none"}}>
              <Card.Body>
                <Card.Title>Discover Convenience and Affordability</Card.Title>
                <Card.Text>
                  Your One-Stop Hub for All Your Needs
                </Card.Text>
                <Card.Text>
                  Are you looking for a convenient and affordable place to get your essential services done?
                  Look no further! We are here to serve you with a wide range of services designed to make your life easier and more efficient.
                  Our state-of-the-art facility offers a comfortable and welcoming atmosphere where you can get all your tasks completed hassle-free.
                </Card.Text>
                <Card.Text>
                 <h3>Services Offered:</h3>
                  <ol>
                  
                  <li><strong>₱5/hr WiFi Access:</strong> Stay connected with high-speed WiFi that keeps you connected to the world.</li>
                  <li><strong>ID Printing:</strong> Need an ID for school, work, or any other purpose? We offer quick and professional ID printing services.</li>
                  <li><strong>Document Printing:</strong> Print important documents with precision and clarity, ensuring that your paperwork is always on point.</li>
                  <li><strong>Color Printing:</strong> Bring your memories to life with vibrant and high-quality color printing for photos and more.</li>
                  <li><strong>Xerox Services:</strong> Make copies of documents quickly and efficiently with our top-notch xerox machines.</li>
                  <li><strong>Plastic Lamination:</strong> Protect your important documents with our plastic lamination services, keeping them safe and durable.</li>
                  <li><strong>₱12/hr Internet Surfing:</strong> Enjoy uninterrupted internet browsing in a comfortable environment at an unbeatable price.</li>
                  <li><strong>Cellphone Load:</strong> Top up your phone with airtime quickly and conveniently, so you never run out of minutes.</li>
                  <li><strong>Gaming Load:</strong> Gamers, we've got you covered! Get gaming load for your favorite online games and keep the fun going.</li>
                  <li><strong>Bills Payment:</strong> Simplify your life by effortlessly managing utility bills, credit card statements, and subscriptions with our revolutionary service. Say goodbye to missed due dates and late fees, and welcome a future where your financial obligations are handled seamlessly.</li>
                  <li><strong>Ticketing:</strong> Turn your dreams into reality with our ticketing service. Whether it's live concerts, theater performances, or your next vacation, our platform ensures you're just a few clicks away from unforgettable experiences. Dive into a world of endless possibilities and let us be your gateway to adventure and entertainment.</li>
                  <li><strong>Hotel Booking:</strong> Experience luxury and comfort with our hotel booking service. Secure a haven of relaxation, meticulously curated to exceed your expectations. Whether you prefer a five-star resort or a charming boutique inn, our platform offers a handpicked selection catering to your every desire. Immerse yourself in the art of hospitality and discover a world where your comfort is paramount.</li>
                  <li><strong>Insurance:</strong> Safeguard your future with our comprehensive insurance solutions. More than just policies, we provide a shield against life's uncertainties, ensuring your loved ones are protected, your assets secure, and your peace of mind untarnished. Trust us to prepare you for whatever life may throw your way, allowing you to live in the present with confidence.</li>
                  <li><strong>Travel & Tours:</strong> Make your travel dreams a seamless reality with our service. From exotic destinations to vibrant cultures, our meticulously crafted itineraries promise adventure, relaxation, and unforgettable memories. Let us be your guide to unlocking the hidden treasures of the planet, one journey at a time.</li>

                  </ol>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col> 
           <Col md={6}>
            <Card style={{border:"none"}}>
              <Card.Body>
                <Card.Text>
                 <p>Why Choose Us:</p>

                <p>Affordability: We believe that essential services should be accessible to all, and our competitive pricing reflects that commitment.

                Convenience: Our location is easily accessible, and our services are designed for your convenience. No need to go to multiple places for different tasks; we've got it all under one roof.

                Quality: We take pride in delivering high-quality services, ensuring that your printing and internet experience meets your expectations every time.

                Friendly Staff: Our team is dedicated to providing you with the best customer service experience. Feel free to ask for assistance; we're here to help.</p>
                </Card.Text>

                <Card.Text>
                  Visit Us Today!
                </Card.Text>
                <Link to='/needhelp'>
                <Button variant="primary">Contact Us</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};


