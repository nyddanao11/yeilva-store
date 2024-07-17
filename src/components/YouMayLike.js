  import React from'react';
  import FeaturedProduct from './FeaturedProduct';
  import { Container, Row, Col} from 'react-bootstrap';

const YouMayLike =()=>{
return (
  <Container>
   <Row className="d-flex justify-content-center aligned-items-center" style={{marginTop:"40px"}} >

      <div className="line" style={{marginBottom:'30px'}}>
      <h4 className="text">You May also Like</h4>
      </div>
  <Col lg={10} md={10} sm={12} style={{ padding:'5px 0px', marginBottom:'15px'}}>
            <FeaturedProduct  />
          </Col> 
      </Row>
      </Container>
      );
  };
  export default YouMayLike;