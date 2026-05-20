import React from 'react';
import { Card, Row, Col, Button, Badge } from 'react-bootstrap';
import { FaTrashAlt, FaCloudDownloadAlt } from 'react-icons/fa';
import { useCart } from './CartContextGuest';

export default function CartItem({ item }) {
  const { removeFromCart } = useCart();

  // Defensive fallback parsing for zero-fault rendering
  const effectivePrice = item.final_price ?? item.price ?? 0;

  return (
    <Card className="border-0 shadow-sm mb-3 overflow-hidden bg-white" style={{ borderRadius: '16px' }}>
      <Card.Body className="p-3">
        <Row className="align-items-center g-3">
          
          {/* Digital Thumbnail Visual Wrapper */}
          <Col xs={3} sm={2} className="d-flex align-items-center justify-content-center">
            <div 
              className="position-relative bg-light rounded-3 overflow-hidden d-flex align-items-center justify-content-center border border-light-subtle"
              style={{ width: '100%', aspectRatio: '1/1', minWidth: '60px', maxWidth: '85px' }}
            >
              <img
                src={item.url}
                alt={item.name}
                className="img-fluid w-100 h-100"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </Col>

          {/* Core Descriptive Context */}
          <Col xs={9} sm={7} className="d-flex flex-column justify-content-center">
            <div className="d-flex flex-wrap align-items-center gap-1.5 mb-1">
              <Badge 
                bg="primary-subtle" 
                className="text-primary border border-primary-subtle rounded-pill fw-bold" 
                style={{ fontSize: '0.65rem', padding: '0.25em 0.6em' }}
              >
                Instant Access
              </Badge>
              {item.category && (
                <span className="text-uppercase text-muted fw-semibold tracking-wider" style={{ fontSize: '0.65rem' }}>
                  • {item.category}
                </span>
              )}
            </div>
            
            <h6 className="text-dark fw-bold mb-1 text-truncate" title={item.name} style={{ fontSize: '0.95rem', lineHeight: '1.3' }}>
              {item.name}
            </h6>
            
            <div className="d-flex align-items-center gap-2 text-muted" style={{ fontSize: '0.75rem' }}>
              <FaCloudDownloadAlt className="text-success" />
              <span>Includes files (PDF/EPUB) & updates</span>
            </div>
          </Col>

          {/* Pricing Action Stack */}
          <Col xs={12} sm={3} className="d-flex flex-row flex-sm-column align-items-center align-items-sm-end justify-content-between justify-content-sm-center border-top border-sm-top-0 pt-2 pt-sm-0 mt-2 mt-sm-0 gap-2">
            <div className="text-sm-end">
              <span className="text-muted d-block d-sm-none small">Price:</span>
              <span className="fw-extrabold text-primary h5 mb-0">
                ₱{Number(effectivePrice).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>

            <Button
              variant="link"
              className="text-danger p-1 d-flex align-items-center gap-1.5 text-decoration-none shadow-none hover-opacity small border-0 bg-transparent ms-auto ms-sm-0"
              onClick={() => removeFromCart(item.id)}
              aria-label={`Remove ${item.name} from cart`}
            >
              <FaTrashAlt size={13} />
              <span className="d-none d-sm-inline font-semibold">Remove</span>
            </Button>
          </Col>

        </Row>
      </Card.Body>
    </Card>
  );
}