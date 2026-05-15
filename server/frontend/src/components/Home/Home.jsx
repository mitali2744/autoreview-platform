import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaStar, FaPen, FaCarSide, FaMapMarkerAlt, FaShieldAlt } from 'react-icons/fa';
import Header from '../Header/Header';
import './Home.css';

const Home = () => {
  const features = [
    { icon: <FaSearch />, title: 'Browse Dealers', desc: 'Explore 50+ dealerships across the US, filter by state and find one near you.' },
    { icon: <FaStar />,   title: 'Read Reviews',  desc: 'See real customer reviews with AI-powered sentiment analysis on every dealership.' },
    { icon: <FaPen />,    title: 'Post Reviews',  desc: 'Share your experience and help others make informed decisions.' },
  ];

  const stats = [
    { value: '50+',  label: 'Dealerships' },
    { value: '100+', label: 'Reviews' },
    { value: '5',    label: 'Car Brands' },
    { value: '15+',  label: 'Car Models' },
  ];

  return (
    <div>
      <Header />

      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge"><FaCarSide /> Trusted Car Reviews</div>
          <h1 className="hero-title">Find Your Perfect<br /><span>Dealership</span></h1>
          <p className="hero-sub">Browse dealerships, read verified reviews, and make confident car-buying decisions — all in one place.</p>
          <div className="hero-btns">
            <Link to="/dealers" className="btn btn-primary">Browse Dealerships</Link>
            <Link to="/register" className="btn btn-outline">Join Free</Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card-float card">
            <FaMapMarkerAlt className="hc-icon" />
            <div>
              <div className="hc-title">50+ Locations</div>
              <div className="hc-sub">Across the United States</div>
            </div>
          </div>
          <div className="hero-card-float card" style={{animationDelay:'0.3s'}}>
            <FaShieldAlt className="hc-icon" />
            <div>
              <div className="hc-title">Verified Reviews</div>
              <div className="hc-sub">AI Sentiment Analysis</div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-bar">
        {stats.map((s, i) => (
          <div key={i} className="stat-item">
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </section>

      <section className="features container">
        <h2 className="section-title">Everything You Need</h2>
        <p className="section-sub">A complete platform for car buyers to research dealerships before visiting.</p>
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card card">
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to find your next car?</h2>
        <p>Join thousands of buyers who use AutoReview to make smarter decisions.</p>
        <Link to="/dealers" className="btn btn-accent">View All Dealerships</Link>
      </section>

      <footer className="footer">
        <p>© 2024 AutoReview. Built with React &amp; Django.</p>
      </footer>
    </div>
  );
};

export default Home;
