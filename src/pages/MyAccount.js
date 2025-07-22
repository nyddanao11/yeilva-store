import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, FloatingLabel } from 'react-bootstrap';
import { fetchUserData } from '../components/userService';
import { Link } from 'react-router-dom';
import './LoanForm.css';
import HoverButton1 from '../components/HoverButton1';
import HoverButton5 from '../components/HoverButton5';
import YouMayLike from '../components/YouMayLike';
import AddDeliveryAddress from './AddDeliveryAddress'; // Import the new component

export default function MyAccountPage({ addToCart, youMayLikeProducts }) {
    const [userData, setUserData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        // Removed 'address: ""' as it's replaced by delivery_addresses
        joineddate: '',
        delivery_addresses: [], // Initialize as an empty array to avoid errors
    });

    // Move this mapping inside the render logic, or make it a memoized value
    // const formattedDeliveryAddresses = userData.delivery_addresses.map((item) => (
    //     `${item.fullName || ''}, ${item.streetAddress || ''}, ${item.city || ''}, ${item.stateProvince || ''} ${item.postalCode || ''}`
    // ));

    // console.log('Formatted Delivery Addresses:', formattedDeliveryAddresses);

    useEffect(() => {
        const storedUserEmail = localStorage.getItem('email');
        if (storedUserEmail) {
            fetchUserData(storedUserEmail.replace(/"/g, ''))
                .then((user) => {
                    console.log('User data from API:', user); // Check the structure here
                    setUserData({
                        ...user,
                        joineddate: user.joineddate || '', // Ensure it's a string
                        // Make sure delivery_addresses is always an array
                        delivery_addresses: user.delivery_addresses || [],
                    });
                })
                .catch((error) => console.error('Error setting user data:', error));
        } else {
            console.log('Email is missing in local storage');
        }
    }, []);


    return (
        <>
            <Container className="mt-4">
                <div className="d-flex justify-content-center aligned-items-center">
                    <h4 className="text-center mb-4 " style={{ marginBottom: '15px' }}>My Account</h4>
                </div>
                <Row className="justify-content-center">

                    {/* Personal Information Column */}
                    <Col md={4} className="mb-3">
                        <Card className="shadow-lg rounded-lg">
                            <Card.Body>
                                <h5 className="text-gray-800">Personal Information</h5>

                                {userData && (
                                    <Form>
                                        <Form.Group controlId="formBasicFirstName" className="mb-3">
                                            <FloatingLabel controlId="floatingFirstName" label="First name">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Your First name"
                                                    value={userData.firstname}
                                                    readOnly
                                                    className="rounded-md"
                                                />
                                            </FloatingLabel>
                                        </Form.Group>

                                        <Form.Group controlId="formBasicLastName" className="mb-3">
                                            <FloatingLabel controlId="floatingLastName" label="Last name">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Your Last name"
                                                    value={userData.lastname}
                                                    readOnly
                                                    className="rounded-md"
                                                />
                                            </FloatingLabel>
                                        </Form.Group>

                                        <Form.Group controlId="formBasicEmail" className="mb-3">
                                            <FloatingLabel controlId="floatingEmail" label="Email address">
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Your Email"
                                                    value={userData.email}
                                                    readOnly
                                                    className="rounded-md"
                                                />
                                            </FloatingLabel>
                                        </Form.Group>

                                        {/* Displaying Delivery Addresses */}
                                        <h6 className="mt-4 mb-3 text-gray-800">Your Delivery Addresses:</h6>
                                        {userData.delivery_addresses && userData.delivery_addresses.length > 0 ? (
                                            userData.delivery_addresses.map((address, index) => (
                                                <Card key={address.id || index} className="mb-2 p-3 border rounded">
                                                    <p className="mb-1"><strong>{address.fullName}</strong></p>
                                                    <p className="mb-1">{address.streetAddress}{address.apartmentSuite && `, ${address.apartmentSuite}`}</p>
                                                    <p className="mb-1">{address.city}, {address.stateProvince} {address.postalCode}</p>
                                                    <p className="mb-0">Phone: {address.phoneNumber}</p>
                                                    {address.isDefault && <span className="badge bg-info mt-2">Default Address</span>}
                                                </Card>
                                            ))
                                        ) : (
                                            <p>No delivery addresses added yet. Add one below!</p>
                                        )}
                                        {/* End Displaying Delivery Addresses */}

                                        <Form.Group controlId="formBasicJoinedDate" className="mt-3">
                                            <FloatingLabel controlId="floatingJoinedDate" label="Joined Date">
                                                <Form.Control
                                                    type="text"
                                                    value={userData.joineddate}
                                                    readOnly
                                                    className="rounded-md"
                                                />
                                            </FloatingLabel>
                                        </Form.Group>
                                    </Form>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* History Column */}
                    <Col md={4} className="mb-3">
                        <Card className="shadow-lg rounded-lg">
                            <Card.Body>
                                <h5 className="text-gray-800">History</h5>
                                <div className="mt-3">
                                    <Link to="/loanformhistory" style={{ textDecoration: 'none' }} className="text-blue-600 hover:underline">
                                        View Loan Application History
                                    </Link>
                                </div>

                                <div className="mt-3">
                                    <Link to="/installmenthistorypage" style={{ textDecoration: 'none' }} className="text-blue-600 hover:underline">
                                        View Product Installment History
                                    </Link>
                                </div>

                                <div className="mt-3">
                                    {userData.email === 'bonifacioamoren@gmail.com' && (
                                        <Link to="/adminpage" style={{ textDecoration: 'none' }} className="text-blue-600 hover:underline">
                                            YeilvaSTORE-AdminPage
                                        </Link>
                                    )}
                                </div>
                                <div style={{ marginTop: "25px" }}>
                                    <HoverButton5 />
                                </div>
                                <div style={{ marginTop: "25px" }}>
                                    <HoverButton1 />
                                </div>

                            </Card.Body>
                        </Card>
                    </Col>

                    {/* New Delivery Address Column */}
                    <Col md={4} className="mb-3">
                        <AddDeliveryAddress /> {/* Integrate the new component here */}
                    </Col>

                </Row>
            </Container>
            <YouMayLike addToCart={addToCart} youMayLikeProducts={youMayLikeProducts} />
        </>
    );
}