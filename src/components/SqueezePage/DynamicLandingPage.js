import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DynamicLandingPage.css';
import { Zap, ShieldCheck, DownloadCloud, FileText, Globe } from 'lucide-react'; // Premium UI icons
import { Button } from 'react-bootstrap';
import SEO from '../SEO';

export default function DynamicLandingPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!slug) return;

    fetch(`${process.env.REACT_APP_SERVER_URL}/api/landingproduct/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then((data) => {
        if (data) {
          setProduct(data);
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, [slug]);

 

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading blueprint...</span>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center p-4 card shadow-sm max-w-md border-0 rounded-4">
          <h3 className="text-danger fw-bold mb-2">Blueprint Unavailable</h3>
          <p className="text-muted small">We couldn't find the requested digital asset offer, or it has limit-expired.</p>
          <a href="/" className="btn btn-dark w-100 rounded-3 py-2">Return to Catalog</a>
        </div>
      </div>
    );
  }

// 1. Destructure your product data safely
const {
  name,
  description,
  price,
  discount,
  url,
  video_url,
  benefit_1_title, benefit_1_desc,
  benefit_2_title, benefit_2_desc,
  benefit_3_title, benefit_3_desc
} = product;

// 2. CLEAN UP THE URL STRING (Your Snippet)
const cleanProductUrl = product.url?.replace(/\$\{process\.env\.PUBLIC_URL\}/g, process.env.PUBLIC_URL || '') || '';
// 2. Clear, Centralized Conversion Calculations
const originalPrice = parseFloat(price || 0);
const discountPercentage = parseFloat(discount || 0);

// Single source of truth for the calculated final price
const finalPrice = discountPercentage > 0 
  ? originalPrice * (1 - discountPercentage / 100) 
  : originalPrice;

// 3. Clean and Safe Checkout Handler
const handleCheckoutClick = () => {
  const productToCheckout = {
    ...product,
    url: cleanProductUrl,
    price: finalPrice,                     // Pass down clean numeric values
    final_price: finalPrice,               // Crucial matching identifier for checkout page math
    originalPrice: originalPrice,          
    discountApplied: discountPercentage,   
    displayPrice: finalPrice.toFixed(2),   
    quantity: 1,
    isSelected: true,
  };

  navigate('/checkout', { state: { selectedItems: [productToCheckout] } });
};

  return (
    <>
        <SEO 
      title={product?.name || "Premium Digital Blueprint"} 
      description={product?.description || "Get instant access to this exclusive digital guide."} 
      type="product" 
      />
    <div className="bg-light text-dark min-vh-100 font-sans antialiased">
      
      {/* --- SCARCITY BANNER --- */}
      <div className="bg-warning text-dark text-center py-2 px-3 small fw-bold uppercase tracking-wider shadow-sm">
        ⚡ LIMITED TIME RUN: Secure immediate access to database resources.
      </div>

      {/* --- HERO / CONVERSION SECTION --- */}
      <header className="bg-dark text-white py-5 position-relative overflow-hidden">
        <div className="position-absolute top-0 start-50 translate-middle bg-warning opacity-10 rounded-circle" style={{ width: '600px', height: '600px', filter: 'blur(120px)' }}></div>
        
        <div className="container py-4 position-relative z-index-1">
          <div className="row align-items-center g-5">
            
      {/* Value Proposition Presentation */}
    <div className="col-lg-7 text-center text-lg-start">
      <span className="badge bg-warning text-dark mb-3 fw-bold text-uppercase px-3 py-2 rounded-pill shadow-sm">
        🔥 Hot Digital Guide
      </span>
      <h1 className="display-4 fw-extrabold mb-3 lh-sm tracking-tight text-white">
        {name || "Build a Global Income Stream"}
      </h1>
      <p className="lead text-light opacity-75 mb-4 fs-4 fw-normal">
        {description || "Discover the proven, anonymous frameworks to generate consistent revenue worldwide without personal branding."}
      </p>
      
      {/* SWAPPED: High-Converting Video Thumbnail Placeholder */}
      <div 
        className="ratio ratio-16x9 rounded-4 shadow-2xl overflow-hidden border border-secondary border-opacity-50 bg-black position-relative user-select-none group cursor-pointer"
        style={{ cursor: 'pointer' }}
        onClick={handleCheckoutClick} 
      >
       <div className="dflex">
        <img 
          src={cleanProductUrl || `${process.env.PUBLIC_URL}/images/acaiberry.jpg`} 
          alt={name || "Product Blueprint Preview"} 
          className="w-50 h-100 object-fit-cover opacity-75 transition-all hover-scale"
          style={{ filter: 'brightness(0.85)' }}
        />
          <img 
          src={`${process.env.PUBLIC_URL}/digital/businessblueprint1.png`} 
          alt={name || "Product Blueprint Preview"} 
          className="w-50 h-100 object-fit-cover opacity-75 transition-all hover-scale"
          style={{ filter: 'brightness(0.85)' }}
        />
          </div>

        {/* Floating Play Button Overlay */}
        <div className="position-absolute top-50 start-50 translate-middle d-flex align-items-center justify-content-center">
          <div 
            className="bg-warning text-dark rounded-circle d-flex align-items-center justify-content-center shadow-lg transition-all"
            style={{ 
              width: '76px', 
              height: '76px', 
              backgroundColor: '#ffc107',
              boxShadow: '0 0 30px rgba(255, 193, 7, 0.5)'
            }}
          >
            {/* SVG Play Icon Triangle */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              style={{ width: '28px', height: '28px', marginLeft: '4px' }}
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Optional: Quick contextual visual badge over the image mock */}
        <div className="position-absolute bottom-0 start-0 w-100 p-3 bg-gradient text-start" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
          <span className="badge bg-dark bg-opacity-75 text-warning small border border-warning border-opacity-25">
            ⚡ Instant Access Guide Preview
          </span>
        </div>
      </div>
    </div>

<div className="col-lg-5">
  <div className="card shadow-2xl border-0 p-4 p-md-5 bg-white rounded-4 position-relative">
    
    <div className="text-center mb-4">
      {/* Dynamic Tagging based on product discount presence */}
      {discountPercentage > 0 && (
        <span className="badge bg-danger text-white mb-2 fw-bold text-uppercase px-3 py-1 rounded-pill animate-pulse">
          🔥 Save {discountPercentage}% Today
        </span>
      )}
      <span className="text-uppercase text-muted fw-bold tracking-widest d-block mb-1 small">Instant Digital Access</span>
      
{/* --- HIGH-CONVERSION PRODUCT CARD BLOCK --- */}
<div className="card shadow-2xl border-0 p-4 p-md-5 bg-white rounded-4 position-relative">
  
  {/* Header & Pricing Area */}
  <div className="text-center mb-4">
   
    
    <div className="d-flex align-items-baseline justify-content-center my-2">
      {/* Calculated Final Price */}
      <span className="display-5 fw-black text-dark">
        ₱{finalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </span>
      
      {/* Consistent Cross-out Price */}
      {discountPercentage > 0 && (
        <span className="text-muted ms-2 text-decoration-line-through fs-5">
          ₱{originalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      )}
    </div>
    
    <p className="text-muted small px-2 mb-0">
      Secure your lifetime access to <strong>{name || "this blueprint"}</strong>.
    </p>
  </div>

  {/* DIGITAL TRUST ASSURANCE CARD */}
  <div className="mb-4 p-3 rounded-4 border border-info-subtle" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
    <p className="fw-bold fs-6 d-flex align-items-center mb-1" style={{ color: '#0369a1' }}>
      <Zap size={18} className="me-2 text-warning" fill="currentColor" /> Instant Digital Delivery
    </p>
    <p className="text-muted small mb-0 lh-sm">
      No waiting and zero shipping fees. Your complete access links are dispatched directly to your email immediately upon completing your secure payment.
    </p>
  </div>

  {/* OPTIMIZED FULL-WIDTH CTA BUTTON */}
  <Button
    variant="warning" 
    onClick={handleCheckoutClick}
    className="w-100 py-3 rounded-3 fw-black text-uppercase shadow-md d-flex align-items-center justify-content-center transition-all hover-scale border-0 text-dark"
    style={{ fontSize: '1.1rem', letterSpacing: '0.5px' }}
  >
    Get {name || "Instant Access"} Now &rarr;
  </Button>

  {/* Subtle security signals under the button */}
  <div className="text-center mt-3">
    <small className="text-muted" style={{ fontSize: '11px' }}>
      🔒 Secure 256-Bit SSL Encrypted Checkout
    </small>
  </div>

</div>
</div>
   
      
    </div> {/* Closes <div className="card... */}
  </div> {/* Closes <div className="col-lg-5"> */}

</div> {/* Closes <div className="row... */}
</div> {/* ADDED THIS: This safely closes your <div className="container... */}
</header>

      {/* --- BENEFITS & CORE SPECS --- */}
      <section className="py-5 bg-white border-bottom">
        <div className="container py-4">
          <div className="text-center max-w-2xl mx-auto mb-5">
            <h2 className="fw-bold display-6 mb-3 text-dark">What's Waiting For You Inside</h2>
            <p className="text-muted lead fs-6">Pure operational framework blueprints constructed for modern digital scaling.</p>
          </div>

          <div className="row g-4 justify-content-center">
            <div className="col-md-4">
              <div className="p-4 border border-light-subtle rounded-4 h-100 shadow-sm bg-light bg-opacity-50">
                <div className="text-warning mb-3 fs-2">🌐</div>
                <h4 className="fw-bold text-dark mb-2">{benefit_1_title || "Borderless Scalability"}</h4>
                <p className="text-muted small mb-0">{benefit_1_desc || "Learn how to configure systems that source revenue from tier-1 countries completely on autopilot."}</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-4 border border-light-subtle rounded-4 h-100 shadow-sm bg-light bg-opacity-50">
                <div className="text-warning mb-3 fs-2">⏳</div>
                <h4 className="fw-bold text-dark mb-2">{benefit_2_title || "Zero-Presence Architecture"}</h4>
                <p className="text-muted small mb-0">{benefit_2_desc || "Complete tactical breakdown of operating businesses through digital assets and automation."}</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-4 border border-light-subtle rounded-4 h-100 shadow-sm bg-light bg-opacity-50">
                <div className="text-warning mb-3 fs-2">🚀</div>
                <h4 className="fw-bold text-dark mb-2">{benefit_3_title || "Proven Blueprints"}</h4>
                <p className="text-muted small mb-0">{benefit_3_desc || "Step-by-step checklists allowing you to choose, launch, and optimize your first stream this weekend."}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SOCIAL PROOF --- */}
      <section className="py-5 bg-light">
        <div className="container py-3">
          <p className="text-uppercase text-muted text-center fw-bold tracking-wider small mb-4">
            Real Results From Unlocked Blueprints
          </p>
          <div className="row g-4 justify-content-center max-w-4xl mx-auto">
            <div className="col-md-6">
              <div className="card border-0 shadow-sm p-4 rounded-3 bg-white">
                <p className="text-muted italic mb-3">"I was skeptical because I hate being on video. Launched my first faceless store using model #4, and pulled my first international sale inside 72 hours."</p>
                <div className="d-flex align-items-center gap-2">
                  <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center fw-bold text-dark small" style={{width:'32px', height:'32px'}}>M</div>
                  <span className="fw-bold small text-dark">Marcus V. — Digital Asset Builder</span>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card border-0 shadow-sm p-4 rounded-3 bg-white">
                <p className="text-muted italic mb-3">"The breakdown on operating automated workflows saved me weeks of technical research. Worth tenfold the asking price."</p>
                <div className="d-flex align-items-center gap-2">
                  <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center fw-bold text-dark small" style={{width:'32px', height:'32px'}}>S</div>
                  <span className="fw-bold small text-dark">Sarah T. — Ghost Publisher</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
    </>
  );
}