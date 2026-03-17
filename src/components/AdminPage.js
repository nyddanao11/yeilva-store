import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Card, Navbar } from 'react-bootstrap';

// Import your components
import DeactivateUser from './DeactivateUser';
import LoanHistory from './Loanhistory';
import InstallmentHistory from './installment';
import CreateVoucher from '../pages/VoucherForm';
import GenerateVouchers from '../pages/MultiVoucher';
import GcashSettlement from '../pages/GcashSettlement';
import UpdateOrder from './OrderStatusUpdate';
import AddProduct from '../pages/ProductUpload';
import ProductDetailsUpdateForm from './ProductDetailsUpdateForm';
import AdminInquiries from './AdminInquiries';
import ProductInventory from './ProductInventory';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('LoanHistory');
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  // 1. Centralized Tab Configuration
  // This makes it easy to add new tabs without writing new functions
  const tabs = [
    { id: 'LoanHistory', label: 'Loan History', component: <LoanHistory /> },
    { id: 'DeactivateUser', label: 'Deactivate User', component: <DeactivateUser /> },
    { id: 'InstallmentHistory', label: 'Installments', component: <InstallmentHistory /> },
    { id: 'CreateVoucher', label: 'Create Voucher', component: <CreateVoucher /> },
    { id: 'GenerateVouchers', label: 'Bulk Vouchers', component: <GenerateVouchers /> },
    { id: 'GcashSettlement', label: 'GCash Settlement', component: <GcashSettlement /> },
    { id: 'UpdateOrder', label: 'Update Order', component: <UpdateOrder /> },
    { id: 'AddProduct', label: 'Add Product', component: <AddProduct /> },
    { id: 'ProductDetails', label: 'Product Details', component: <ProductDetailsUpdateForm /> },
    { id: 'AdminInquiries', label: 'Inquiries', component: <AdminInquiries /> },
    { id: 'ProductInventory', label: 'Product Inventory', component: <ProductInventory /> },

  ];

  const handleTabChange = (tabId) => setActiveTab(tabId);

  // Get current component based on activeTab
  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <Container fluid className="py-4 px-lg-5">
      <header className="mb-4 border-bottom pb-3">
        <h1 className="fw-bold" style={{ color: '#2e7d32' }}>YeilvaStore Admin</h1>
        <p className="text-muted">Manage your store operations, users, and finances.</p>
      </header>

      <Row>
      {/* Sidebar Navigation - Better for responsiveness than top tabs */}
        <Col md={3} lg={2} className="mb-4">
          
          {/* Mobile Hamburger Menu Toggle Button - Visible only on small screens */}
          <Navbar expand="md" className="p-0 mb-3 d-md-none border-0">
            <Container fluid className="px-0">
              <Navbar.Brand href="#">Menu</Navbar.Brand>
              <Navbar.Toggle aria-controls="admin-sidebar-nav" onClick={toggleMobileMenu} />
            </Container>
          </Navbar>

          {/* Sidebar Nav - Collapsible on small screens, fixed on larger screens */}
          <Navbar.Collapse id="admin-sidebar-nav" in={mobileMenuOpen} className="d-md-block">
            <Card className="shadow-sm border-0 w-100"> {/* Ensure Card takes full width */}
              <Nav variant="pills" className="flex-column p-2 w-100"> {/* Ensure Nav takes full width */}
                {tabs.map((tab) => (
                  <Nav.Item key={tab.id}>
                    <Nav.Link
                      // ... (rest of Nav.Link props, including icons from Step 1) ...
                      onClick={() => {
                        handleTabChange(tab.id);
                        if (mobileMenuOpen) toggleMobileMenu(); // Close mobile menu after selection
                      }}
                    >
                      <span className="me-2 d-inline-flex align-items-center">{tab.icon}</span> 
                      {tab.label}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Card>
          </Navbar.Collapse>
        </Col>

        {/* Main Content Area */}
        <Col md={9} lg={10}>
          <Card className="shadow-sm border-0 p-4" style={{ minHeight: '70vh' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="h5 fw-bold mb-0">
                {tabs.find(t => t.id === activeTab)?.label}
              </h3>
              {loading && <div className="spinner-border spinner-border-sm text-success" role="status" />}
            </div>
            
            {/* Render the selected component */}
            <div className="fade-in">
              {ActiveComponent}
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}