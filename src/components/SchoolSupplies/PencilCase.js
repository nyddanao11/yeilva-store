import React from 'react';
import { Container, Row, Col, Card} from 'react-bootstrap';


const PencilCase= ({ cartItems}) => {
  
  const pencilcase = [
    { id: 1, name: 'short', price: 5,  weight:12, url:`${process.env.PUBLIC_URL}/schoolsupplies/notebook01.png`, category: 'School Supplies', description:'Flavored Barbecue Corn Chips 200g ', stock:10, page:1, 
        thumbnails:
      [`${process.env.PUBLIC_URL}/schoolsupplies/notebook01.png`,
        `${process.env.PUBLIC_URL}/schoolsupplies/notebook01.png`,
      ],},
    { id: 2, name: 'Long', price: 7, weight:12, url:`${process.env.PUBLIC_URL}/schoolsupplies/paper01.png`, category: 'School Supplies', description:'Flavored Barbecue Corn Chips 200g', stock:0, page:1, 
         thumbnails:
      [`${process.env.PUBLIC_URL}/schoolsupplies/paper01.png`,
        `${process.env.PUBLIC_URL}/schoolsupplies/paper01.png`,
      ],},
     { id:3, name: 'A4', price: 6, weight:12, url:`${process.env.PUBLIC_URL}/schoolsupplies/eraser01.png`, category: 'School Supplies', description:'Flavored Barbecue Corn Chips 200g', stock:0, page:1, 
           thumbnails:
      [`${process.env.PUBLIC_URL}/schoolsupplies/eraser01.png`,
        `${process.env.PUBLIC_URL}/schoolsupplies/beraser01.png`,
      ],},
    { id: 4, name: 'short', price: 8, weight:12, url:`${process.env.PUBLIC_URL}/schoolsupplies/notebook01.png`, category: 'School Supplies', description:'Flavored Barbecue Corn Chips 200g' , stock:10, page:1, 
       thumbnails:
      [`${process.env.PUBLIC_URL}/schoolsupplies/notebook01.png`,
        `${process.env.PUBLIC_URL}/schoolsupplies/notebook01.png`,
      ],},
    
    // Add more canned goods as needed
  ];

  
  return (
     <Container fluid>
        <Row>
        {/* Main Content Area for Grocery Items */}
        <Col sm={10}>
          <Row className="mt-4">
          <div className="d-flex justify-content-center align-items-center mb-2">
           <h6>Pencil Case</h6>
           </div>
            {/* Display Grocery Items */}
            {pencilcase.map((item) => (
              <Col sm={3} xs={6} key={item.id}>
                <Card className="mb-4">
                  <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                   <img src={item.url} alt={item.name} style={{ maxHeight:"75px", objectFit:"cover"}}/>
                    <Card.Title style={{fontSize:"14px"}}>{item.name}</Card.Title>
                    <Card.Text style={{margin:"0px"}}> ₱{item.price}</Card.Text>
                   
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default PencilCase;
