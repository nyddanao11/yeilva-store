import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Footer from './Footer';
import{Link} from 'react-router-dom';

const Brochure = () => {
  return (
    <div className="brochure">
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
                   <li><strong>Bills Payment:</strong> In the fast-paced rhythm of modern life, the chore of managing bills can be a relentless tide. But with our revolutionary bills payment service, the mundane becomes effortless. Imagine a world where you effortlessly settle your utility bills, credit card statements, and subscriptions with a few clicks. Say goodbye to missed due dates and late fees, and embrace the freedom to manage your finances seamlessly. Welcome to a future where your financial obligations are handled with ease.</li>
                   <li><strong>Ticketing:</strong> Imagine the excitement of embarking on a journey to your dream destination or witnessing a world-class performance. Our ticketing service is your gateway to adventure and entertainment. Whether you seek the thrill of live concerts, the wonder of theater, or the thrill of a plane taking off to your next vacation, our platform ensures you're just a few clicks away from making these dreams a reality. Dive into a world of endless possibilities and let us be your ticket to unforgettable experiences.</li>
                    <li><strong>Hotel Booking:</strong> Picture yourself in a world of luxury and comfort, where every detail of your accommodation is meticulously curated to exceed your expectations. With our hotel booking service, you're not just reserving a room; you're securing a haven of relaxation, an oasis of serenity. Whether you crave the opulence of a five-star resort or the charm of a boutique inn, our platform offers a handpicked selection of accommodations that cater to your every desire. Immerse yourself in the art of hospitality and discover a world where your comfort is paramount.</li>
                     <li><strong>Insurance:</strong> In the unpredictable journey of life, having a safety net is invaluable. Our insurance service is more than just a policy; it's your shield against life's uncertainties. Picture a world where your loved ones are protected, your assets secure, and your peace of mind untarnished. We offer a range of insurance solutions that cater to your unique needs, ensuring that you're prepared for whatever life may throw your way. Trust us to safeguard your future, allowing you to live in the present with confidence.</li>
                      <li><strong>Travel & Tours:</strong> Envision a world where your travel dreams become a seamless reality. Our travel and tours service is your passport to exploring the wonders of the world. From the awe-inspiring landscapes of exotic destinations to the vibrant tapestry of cultures waiting to be discovered, we offer meticulously crafted itineraries that promise adventure, relaxation, and unforgettable memories. Let us be your guide to unlocking the hidden treasures of the planet, one journey at a time.</li>

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
                <Link to='/contactus'>
                <Button variant="primary">Contact Us</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Footer Section */}
      <section className=" mb-4 d-flex flex-column align-items-center justify-content-center " >
      <Footer />
      </section>
        
      </Container>
    </div>
  );
};

export default Brochure;

