import React from 'react';
import Header from '../Header/Header';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import './Contact.css';

const Contact = () => (
  <div>
    <Header />
    <div className="contact-page">

      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Reach out anytime.</p>
      </section>

      <div className="contact-content container">
        <div className="contact-cards">

          <div className="contact-card card">
            <div className="contact-icon"><FaPhone /></div>
            <h3>Phone</h3>
            <p>+1 (555) 123-4567</p>
          </div>

          <div className="contact-card card">
            <div className="contact-icon"><FaEnvelope /></div>
            <h3>Email</h3>
            <p>info@bestcars.com</p>
          </div>

          <div className="contact-card card">
            <div className="contact-icon"><FaMapMarkerAlt /></div>
            <h3>Address</h3>
            <p>123 Main Street, North America City, NA 12345</p>
          </div>

          <div className="contact-card card">
            <div className="contact-icon"><FaClock /></div>
            <h3>Business Hours</h3>
            <p>Mon–Fri: 9 AM – 6 PM</p>
            <p>Sat: 10 AM – 4 PM</p>
            <p>Sun: Closed</p>
          </div>

        </div>

        <div className="contact-form-wrap card">
          <h2>Send us a message</h2>
          <form className="contact-form" onSubmit={e => { e.preventDefault(); alert('Message sent! We will get back to you soon.'); }}>
            <input className="input-field" type="text"  placeholder="Your Name"    required />
            <input className="input-field" type="email" placeholder="Your Email"   required />
            <input className="input-field" type="text"  placeholder="Subject"      required />
            <textarea className="input-field contact-textarea" placeholder="Your message..." rows={5} required />
            <button type="submit" className="btn btn-primary" style={{width:'100%', justifyContent:'center'}}>Send Message</button>
          </form>
        </div>
      </div>

    </div>
  </div>
);

export default Contact;
