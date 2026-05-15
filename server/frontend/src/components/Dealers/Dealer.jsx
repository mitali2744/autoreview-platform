import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPen, FaUser, FaCar, FaCalendarAlt, FaArrowLeft } from 'react-icons/fa';
import Header from '../Header/Header';
import './Dealer.css';

const sentimentClass = s => s === 'positive' ? 'badge-positive' : s === 'negative' ? 'badge-negative' : 'badge-neutral';
const sentimentEmoji = s => s === 'positive' ? '😊' : s === 'negative' ? '😞' : '😐';

const Dealer = () => {
  const { id } = useParams();
  const [dealer, setDealer]   = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [revLoad, setRevLoad] = useState(true);
  const isLoggedIn = !!sessionStorage.getItem('username');

  useEffect(() => {
    const fetchDealer = async () => {
      try {
        const res  = await fetch(`/djangoapp/dealer/${id}`);
        const data = await res.json();
        if (data.status === 200 && data.dealer.length > 0) setDealer(data.dealer[0]);
      } catch (e) { console.error(e); }
      setLoading(false);
    };

    const fetchReviews = async () => {
      try {
        const res  = await fetch(`/djangoapp/reviews/dealer/${id}`);
        const data = await res.json();
        if (data.status === 200) setReviews(data.reviews);
      } catch (e) { console.error(e); }
      setRevLoad(false);
    };

    fetchDealer();
    fetchReviews();
  }, [id]);

  return (
    <div>
      <Header />
      <div className="dealer-detail-page container">
        <Link to="/dealers" className="back-link"><FaArrowLeft /> Back to Dealers</Link>

        {loading ? <div className="spinner" /> : dealer ? (
          <div className="dealer-hero card">
            <div className="dealer-hero-avatar">{dealer.full_name?.charAt(0)}</div>
            <div className="dealer-hero-info">
              <h1>{dealer.full_name}</h1>
              <p><FaMapMarkerAlt /> {dealer.city}, {dealer.state} — {dealer.address}, {dealer.zip}</p>
            </div>
            {isLoggedIn && (
              <Link to={`/postreview/${id}`} className="btn btn-accent">
                <FaPen /> Write a Review
              </Link>
            )}
          </div>
        ) : <p>Dealer not found.</p>}

        <div className="reviews-section">
          <h2 className="reviews-title">Customer Reviews
            <span className="reviews-count">{reviews.length}</span>
          </h2>

          {revLoad ? <div className="spinner" /> :
           reviews.length === 0 ? (
            <div className="empty-state">
              <p style={{fontSize:'2.5rem'}}>💬</p>
              <p>No reviews yet. Be the first to review!</p>
              {isLoggedIn && <Link to={`/postreview/${id}`} className="btn btn-primary" style={{marginTop:'16px'}}>Write Review</Link>}
            </div>
          ) : (
            <div className="reviews-grid">
              {reviews.map((r, i) => (
                <div key={i} className="review-card card">
                  <div className="review-card-top">
                    <div className="reviewer-avatar">{r.name?.charAt(0) || 'U'}</div>
                    <div>
                      <div className="reviewer-name"><FaUser /> {r.name}</div>
                      <div className="review-date"><FaCalendarAlt /> {r.purchase_date}</div>
                    </div>
                    <span className={`badge ${sentimentClass(r.sentiment)} sentiment-badge`}>
                      {sentimentEmoji(r.sentiment)} {r.sentiment}
                    </span>
                  </div>
                  <p className="review-text">"{r.review}"</p>
                  <div className="review-car">
                    <FaCar /> {r.car_make} {r.car_model} ({r.car_year})
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dealer;
