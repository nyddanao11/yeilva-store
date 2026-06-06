import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// Optional: Install bootstrap-icons for clean bullet points
// npm install bootstrap-icons

export default function FacelessProfitForGlobalIncome () {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Connect your backend, Gumroad redirect, or newsletter service here
    console.log('Submitted email:', email);
    alert('Thank you! Redirecting to secure checkout...');
  };

  return (
    <div className="bg-light text-dark min-vh-100 font-sans">
      
      {/* --- HERO SECTION --- */}
      <header className="bg-dark text-white py-5 border-bottom border-warning">
        <div className="container py-4">
          <div className="row align-items-center g-5">
            
            {/* Left Column: The Hook & Video/Image */}
            <div className="col-lg-7 text-center text-lg-start">
              <span className="badge bg-warning text-dark mb-3 fw-bold uppercase tracking-wider px-3 py-2">
                Exclusive YouTube Offer
              </span>
              <h1 className="display-4 fw-black mb-3 lh-sm">
                Build a Global Income Stream <br />
                <span className="text-warning">Without Ever Showing Your Face</span>
              </h1>
              <p className="lead text-gray-300 mb-4 fs-4">
                Discover the 21 proven, anonymous frameworks to generate consistent revenue worldwide. No camera, no personal branding, pure profit.
              </p>
              
              {/* YouTube Video Embed / Placeholder */}
              <div className="ratio ratio-16x9 rounded shadow-lg overflow-hidden border border-secondary">
                <iframe
                  src="https://www.youtube.com/embed/YOUR_VIDEO_ID_HERE"
                  title="The 21 Faceless Profit Model"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Right Column: The High-Conversion Form Box */}
            <div className="col-lg-5">
              <div className="card shadow-lg border-0 p-4 p-md-5 bg-white rounded-4">
                <div className="text-center mb-4">
                  <h3 className="fw-bold text-dark mb-1">Get Instant Access</h3>
                  <p className="text-muted small">Start reading the blueprint in the next 2 minutes</p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold text-secondary small">
                      Enter your best email address
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-lg border-2"
                      id="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-warning btn-lg w-100 fw-bold py-3 text-uppercase shadow-sm hover-scale"
                  >
                    Claim Your Copy Now &rarr;
                  </button>
                </form>

                <div className="mt-4 text-center">
                  <div className="d-flex justify-content-center gap-3 text-muted small">
                    <span>🔒 Secure Delivery</span>
                    <span>•</span>
                    <span>100% Privacy</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* --- BENEFIT SECTIONS / WHAT'S INSIDE --- */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="text-center max-w-2xl mx-auto mb-5">
            <h2 className="fw-bold display-6 mb-3">Inside "The 21 Faceless Profit Model"</h2>
            <p className="text-muted lead">Skip the fluff. Here is exactly what you are getting to build your global digital asset portfolio store:</p>
          </div>

          <div className="row g-4 justify-content-center">
            {/* Benefit 1 */}
            <div className="col-md-4">
              <div className="p-4 border rounded-3 h-100 shadow-sm">
                <div className="text-warning mb-3 fs-3">🌐</div>
                <h4 className="fw-bold mb-2">Borderless Scalability</h4>
                <p className="text-muted">Learn how to configure systems that source revenue from tier-1 countries completely on autopilot, regardless of where you live.</p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="col-md-4">
              <div className="p-4 border rounded-3 h-100 shadow-sm">
                <div className="text-warning mb-3 fs-3">⏳</div>
                <h4 className="fw-bold mb-2">Zero-Presence Architecture</h4>
                <p className="text-muted">Complete tactical breakdown of operating businesses through digital assets, automated stores, and ghost production lines.</p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="col-md-4">
              <div className="p-4 border rounded-3 h-100 shadow-sm">
                <div className="text-warning mb-3 fs-3">🚀</div>
                <h4 className="fw-bold mb-2">21 Setup Blueprints</h4>
                <p className="text-muted">Step-by-step checklists for each of the 21 unique models, allowing you to choose, launch, and optimize your first stream this weekend.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SOCIAL PROOF & TRUST SECTION --- */}
      <section className="bg-light py-5 border-top">
        <div className="container text-center">
          <p className="text-uppercase text-muted fw-bold tracking-wider small mb-4">
            Trusted by Creators & Digital Entrepreneurs Worldwide
          </p>
         
        </div>
      </section>

    </div>
  );
}