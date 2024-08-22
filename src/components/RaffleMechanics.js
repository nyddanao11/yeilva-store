import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const RaffleOpenMechanics = () => {
    return (
        <Container fluid className="d-flex justify-content-center align-items-center my-5">
            <Row className="w-100">
                <Col lg={8} md={10} xs={12} className="mx-auto">
                    <Card className="p-4 shadow">
                        <Card.Body>
                            <h3 className="text-center mb-4">Raffle Mechanics</h3>
                            
                            <h5>1. Eligibility</h5>
                            <p>
                                The raffle is open to all visitors of the website who register by providing their full name, email address. Each participant is allowed one entry. Multiple entries using different emails from the same individual will be disqualified.
                            </p>

                            <h5>2. Entry Period</h5>
                            <p>
                                The raffle registration opens on <strong>August 20, 2024</strong> and closes on <strong> October 30, 2024, at 11:59 PM</strong>. Only entries submitted within this period will be eligible for the raffle.
                            </p>

                            <h5>3. How to Enter</h5>
                            <ul>
                                <li>Participants must visit the raffle registration page on the website.</li>
                                <li>To enter, participants must:
                                    <ul>
                                        <li>Provide their full name and a valid email address.</li>
                                       
                                        <li>Submit the form to register their entry.</li>
                                    </ul>
                                </li>
                             
                            </ul>

                          

                            <h5>4. Determination of Winner</h5>
                            <p>
                                The raffle will be held on <strong>October 31, 2024</strong>. A winning ticket will be randomly selected from all the valid entries. The draw will be conducted using a fair and random process via the website’s automated selection tool.
                            </p>

                            <h5>5. Announcement of Winner</h5>
                            <p>
                                The winner will be announced on the website and will also receive a notification via the email address provided during registration. The announcement will include the winning ticket number and the winner’s initials for privacy purposes.
                            </p>

                            <h5>6. Prize</h5>
                            <p>
                                The winner will receive <strong>3 boxes of Barley for the First prize and 3 boxes of Mangosteen Coffee for the Second prize</strong>. The prize is non-transferable and cannot be exchanged for cash or other items.
                            </p>

                            <h5>7. Claiming the Prize</h5>
                            <p>
                                The winner must respond to the notification email within <strong>7 days</strong> to claim the prize. Failure to respond within the specified time may result in forfeiture of the prize, and an alternate winner may be selected.
                            </p>

                            <h5>8. General Conditions</h5>
                            <p>
                                By entering the raffle, participants agree to the terms and conditions of the raffle. The organizers reserve the right to disqualify any participant who does not comply with these rules or attempts to tamper with the raffle process.
                            </p>

                            <h5>9. Privacy</h5>
                            <p>
                                The personal information collected for the raffle (e.g., name, email address) will only be used for the purpose of administering the raffle and notifying the winner. Participant information will not be shared with third parties without consent, except as required by law.
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default RaffleOpenMechanics;
