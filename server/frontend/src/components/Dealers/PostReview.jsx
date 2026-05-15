import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaPaperPlane } from 'react-icons/fa';
import Header from '../Header/Header';
import './PostReview.css';

const PostReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dealer, setDealer]       = useState({});
  const [review, setReview]       = useState('');
  const [model, setModel]         = useState('');
  const [year, setYear]           = useState('');
  const [date, setDate]           = useState('');
  const [carmodels, setCarmodels] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchDealer = async () => {
      const res  = await fetch(`/djangoapp/dealer/${id}`);
      const data = await res.json();
      if (data.status === 200 && data.dealer.length > 0) setDealer(data.dealer[0]);
    };
    const fetchCars = async () => {
      const res  = await fetch('/djangoapp/get_cars');
      const data = await res.json();
      setCarmodels(data.CarModels || []);
    };
    fetchDealer();
    fetchCars();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!review.trim() || !model || !year || !date) {
      toast.error('All fields are required.');
      return;
    }
    const [make_chosen, model_chosen] = model.split('|');
    let name = `${sessionStorage.getItem('firstname') || ''} ${sessionStorage.getItem('lastname') || ''}`.trim();
    if (!name || name === 'null null') name = sessionStorage.getItem('username');

    const payload = {
      name, dealership: parseInt(id), review,
      purchase: true, purchase_date: date,
      car_make: make_chosen, car_model: model_chosen, car_year: parseInt(year),
    };

    setSubmitting(true);
    try {
      const res  = await fetch('/djangoapp/add_review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.status === 200) {
        toast.success('Review posted successfully!');
        setTimeout(() => navigate(`/dealer/${id}`), 1500);
      } else {
        toast.error('Failed to post review. Please try again.');
      }
    } catch {
      toast.error('Network error. Please try again.');
    }
    setSubmitting(false);
  };

  return (
    <div>
      <Header />
      <div className="postreview-page container">
        <button className="back-link btn-ghost" onClick={() => navigate(`/dealer/${id}`)}>
          <FaArrowLeft /> Back to {dealer.full_name || 'Dealer'}
        </button>

        <div className="postreview-card card">
          <div className="postreview-header">
            <div className="pr-avatar">{dealer.full_name?.charAt(0) || 'D'}</div>
            <div>
              <h1>Review {dealer.full_name}</h1>
              <p>{dealer.city}, {dealer.state}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="pr-form">
            <div className="form-group">
              <label>Your Review *</label>
              <textarea
                className="input-field pr-textarea"
                placeholder="Share your experience with this dealership..."
                value={review}
                onChange={e => setReview(e.target.value)}
                rows={5}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Car Make &amp; Model *</label>
                <select className="input-field" value={model} onChange={e => setModel(e.target.value)}>
                  <option value="">Select a car...</option>
                  {carmodels.map((c, i) => (
                    <option key={i} value={`${c.CarMake}|${c.CarModel}`}>
                      {c.CarMake} {c.CarModel} ({c.CarType})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Car Year *</label>
                <input
                  type="number" className="input-field"
                  placeholder="e.g. 2022" min={2015} max={2023}
                  value={year} onChange={e => setYear(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Purchase Date *</label>
              <input
                type="date" className="input-field"
                value={date} onChange={e => setDate(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary pr-submit" disabled={submitting}>
              <FaPaperPlane /> {submitting ? 'Posting...' : 'Post Review'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostReview;
