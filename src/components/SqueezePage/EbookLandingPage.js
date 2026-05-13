import React from 'react';
import { Container, Row, Col, Button, Card, Accordion, Badge } from 'react-bootstrap';
import { Bot, CheckCircle, Cpu, Clock, ShieldCheck, Zap, Sparkles, BrainCircuit } from 'lucide-react'; 
import { Link } from 'react-router-dom';

export default function AIPromptLandingPage() {
  const price = "659.00";
  const productID = "119"; // Your specific product ID

  return (
    <div className="ebook-landing bg-white">
      {/* 1. HERO SECTION: High-Tech Authority */}
      <section className="bg-dark text-white py-5 position-relative overflow-hidden" style={{ background: 'linear-gradient(145deg, #0f172a 0%, #1e293b 100%)' }}>
        <Container className="py-5">
          <Row className="align-items-center">
            <Col lg={7} className="text-center text-lg-start">
              <Badge bg="primary" className="mb-3 px-3 py-2 text-uppercase fw-bold shadow">Limited 2026 Edition</Badge>
              <h1 className="display-3 fw-extrabold mb-3" style={{ letterSpacing: '-1px' }}>
                Don't Just Chat. <span className="text-primary">Engineer.</span>
              </h1>
              <p className="lead mb-4 opacity-90" style={{ maxWidth: '600px' }}>
                Stop getting generic results from AI. Learn the exact framework to craft 
                high-performance prompts that automate your work and 10x your output.
              </p>
              <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-lg-start">
                <Button 
                  as={Link} 
                  to={`/clickproductpage/${productID}`} 
                  variant="primary" 
                  size="lg" 
                  className="px-5 py-3 fw-bold shadow-lg rounded-pill"
                >
                  Get the Guide — ₱{price}
                </Button>
              </div>
              <div className="mt-4 d-flex justify-content-center justify-content-lg-start gap-4 opacity-75 small">
                <span><Zap size={16} className="text-warning" /> Instant PDF Access</span>
                <span><ShieldCheck size={16} className="text-info" /> Secure Checkout</span>
              </div>
            </Col>
            
            <Col lg={5} className="mt-5 mt-lg-0 text-center">
               <div className="position-relative d-inline-block">
                 {/* This represents your cover page image */}
                 <img 
                    src={`${process.env.PUBLIC_URL}/digital/aiprompt.jpg`} 
                    alt="AI Prompt Engineering Ebook Cover" 
                    className="img-fluid rounded-4 shadow-2xl transition-hover"
                    style={{ maxHeight: '550px', border: '8px solid rgba(255,255,255,0.05)' }}
                 />
                 <div className="position-absolute bottom-0 end-0 bg-primary p-3 rounded-circle shadow-lg m-3">
                    <Sparkles className="text-white" size={32} />
                 </div>
               </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* 2. THE CORE ADVANTAGE: Specific to AI */}
      <Container className="py-5 my-5">
        <Row className="text-center mb-5">
          <Col lg={8} className="mx-auto">
            <h6 className="text-primary fw-bold text-uppercase mb-2">Why This Guide?</h6>
            <h2 className="fw-bold display-5">From Basic User to Power User</h2>
            <p className="text-muted lead">90% of people use AI incorrectly. We show you the 10% that yields professional results.</p>
          </Col>
        </Row>
        <Row className="g-4">
          {[
            { icon: <BrainCircuit size={40} />, title: "The Logic Framework", desc: "Understand how LLMs think so you can predict and control their output." },
            { icon: <Cpu size={40} />, title: "Workflow Automation", desc: "Ready-to-use formulas for coding, content creation, and data analysis." },
            { icon: <Bot size={40} />, title: "The Persona Method", desc: "How to give AI the context of a world-class expert for every task." }
          ].map((item, i) => (
            <Col md={4} key={i}>
              <Card className="h-100 border-0 shadow-sm p-4 text-center rounded-4 transition-hover">
                <div className="text-primary mb-3 bg-light d-inline-flex p-3 rounded-circle mx-auto">{item.icon}</div>
                <Card.Title className="fw-bold h4">{item.title}</Card.Title>
                <Card.Text className="text-muted">{item.desc}</Card.Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* 3. CURRICULUM: Deep Dive */}
      <section className="bg-light py-5">
        <Container className="py-4">
          <Row className="align-items-center">
            <Col lg={6} className="order-2 order-lg-1">
              <h2 className="fw-bold mb-4 display-6">What’s Inside the <span className="text-primary">Vault?</span></h2>
              <ul className="list-unstyled">
                {[
                  "The 5-Step Structure of a Professional Prompt",
                  "Overcoming 'Hallucinations' and Fact-Checking AI",
                  "Advanced Chain-of-Thought Prompting Blueprints",
                  "Automating Social Media & Email with Zero Fluff",
                  "Exclusive Library of 50+ Ready-to-Use Formulas"
                ].map((text, i) => (
                  <li key={i} className="mb-4 d-flex align-items-start">
                    <div className="bg-white shadow-sm p-1 rounded-circle me-3">
                       <CheckCircle className="text-success" size={24} />
                    </div>
                    <div>
                      <span className="fw-bold d-block h5 mb-0">{text}</span>
                      <small className="text-muted">Master this in Chapter {i + 1}</small>
                    </div>
                  </li>
                ))}
              </ul>
            </Col>
            <Col lg={6} className="order-1 order-lg-2 mb-5 mb-lg-0 text-center">
                <div className="p-4 bg-white rounded-5 shadow-lg mx-auto" style={{ maxWidth: '400px' }}>
                    <div className="bg-dark p-5 rounded-4 text-white mb-4">
                        <Clock size={48} className="mb-3 text-primary" />
                        <h4 className="fw-bold">Read in 2 Hours</h4>
                        <p className="small opacity-75 mb-0">Designed for the busy professional.</p>
                    </div>
                    <h5 className="fw-bold">Format: Digital PDF</h5>
                    <p className="text-muted small">Access on iPhone, Android, & Laptop</p>
                </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* 4. FAQ: Specific to Digital Concerns */}
      <Container className="py-5 my-5">
        <Row className="justify-content-center">
          <Col lg={8}>
            <h2 className="text-center fw-bold mb-5">Common Questions</h2>
            <Accordion flush className="shadow-sm border rounded-4 overflow-hidden">
              <Accordion.Item eventKey="0">
                <Accordion.Header className="fw-bold">Will this work for Midjourney/Claude as well?</Accordion.Header>
                <Accordion.Body>
                  Yes. While we use ChatGPT for many examples, the **logic of prompt engineering** is universal across all Large Language Models (LLMs).
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header className="fw-bold">How do I receive the e-book?</Accordion.Header>
                <Accordion.Body>
                  Immediately after your ₱659.00 payment is confirmed via PayPal or GCash, you will receive an automated email with your personal download link.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>

      {/* 5. FINAL CTA: The "Future-Proof" Close */}
      <section className="py-5" style={{ backgroundColor: '#0f172a' }}>
        <Container className="text-center py-5 text-white">
          <h2 className="display-5 fw-bold mb-3">Future-Proof Your Career</h2>
          <p className="lead mb-4 opacity-75">AI won't replace you, but someone who uses AI better than you might.</p>
          <div className="bg-white d-inline-block p-4 rounded-5 shadow-2xl mb-4">
             <span className="text-dark h2 fw-extrabold mb-0">₱{price}</span>
             <span className="text-muted ms-2 text-decoration-line-through">₱1,299</span>
          </div>
          <br />
          <Button 
            as={Link} 
            to={`/clickproductpage/${productID}`}
            variant="primary" 
            size="lg" 
            className="px-5 py-3 fw-bold shadow rounded-pill"
          >
            Download Now & Start Learning
          </Button>
        </Container>
      </section>
    </div>
  );
}