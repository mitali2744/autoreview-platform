import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaSearch, FaPen, FaBuilding } from 'react-icons/fa';
import Header from '../Header/Header';
import './Dealers.css';

const Dealers = () => {
  const [allDealers, setAllDealers] = useState([]);
  const [filtered, setFiltered]     = useState([]);
  const [states, setStates]         = useState([]);
  const [search, setSearch]         = useState('');
  const [state, setState]           = useState('All');
  const [loading, setLoading]       = useState(true);
  const isLoggedIn = !!sessionStorage.getItem('username');

  const fetchDealers = async (st = 'All') => {
    setLoading(true);
    const url = st === 'All' ? '/djangoapp/get_dealers' : `/djangoapp/get_dealers/${st}`;
    try {
      const res  = await fetch(url);
      const data = await res.json();
      if (data.status === 200) {
        setAllDealers(data.dealers);
        setFiltered(data.dealers);
        const uniqueStates = [...new Set(data.dealers.map(d => d.state))].sort();
        setStates(uniqueStates);
      }
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { fetchDealers(); }, []);

  useEffect(() => {
    let list = allDealers;
    if (state !== 'All') list = list.filter(d => d.state === state);
    if (search.trim())   list = list.filter(d => d.full_name.toLowerCase().includes(search.toLowerCase()));
    setFiltered(list);
  }, [search, state, allDealers]);

  const handleState = (e) => {
    setState(e.target.value);
    fetchDealers(e.target.value);
  };

  return (
    <div>
      <Header />
      <div className="dealers-page container">
        <h1 className="page-title">Car Dealerships</h1>
        <p className="page-sub">Browse and find the best dealerships near you</p>

        <div className="dealers-filters">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              className="input-field"
              placeholder="Search dealerships..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select className="input-field state-select" value={state} onChange={handleState}>
            <option value="All">All States</option>
            {states.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {loading ? (
          <div className="spinner" />
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <FaBuilding style={{fontSize:'3rem', opacity:0.3, display:'block', margin:'0 auto 12px'}} />
            <p>No dealerships found.</p>
          </div>
        ) : (
          <div className="dealers-grid">
            {filtered.map(dealer => (
              <div key={dealer.id} className="dealer-card card">
                <div className="dealer-card-header">
                  <div className="dealer-avatar">{dealer.full_name.charAt(0)}</div>
                  <div>
                    <h3 className="dealer-name">{dealer.full_name}</h3>
                    <span className="dealer-state-badge">{dealer.state}</span>
                  </div>
                </div>
                <div className="dealer-info">
                  <p><FaMapMarkerAlt className="info-icon" />{dealer.city}, {dealer.state}</p>
                  <p className="dealer-address">{dealer.address}, {dealer.zip}</p>
                </div>
                <div className="dealer-card-actions">
                  <Link to={`/dealer/${dealer.id}`} className="btn btn-primary">View Reviews</Link>
                  {isLoggedIn && (
                    <Link to={`/postreview/${dealer.id}`} className="btn btn-outline">
                      <FaPen /> Review
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dealers;
