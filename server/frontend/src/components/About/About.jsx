import React from 'react';
import Header from '../Header/Header';
import { FaEnvelope, FaCar } from 'react-icons/fa';
import './About.css';

const team = [
  { name: 'Jane Doe',    role: 'CEO',              email: 'jane@bestcars.com',  bio: 'Jane has over 15 years of experience in automotive sales and loves helping customers find the perfect car.' },
  { name: 'John Smith',  role: 'Sales Manager',    email: 'john@bestcars.com',  bio: 'John specializes in both domestic and imported cars and ensures our customers get the best deals.' },
  { name: 'Emily Clark', role: 'Customer Support', email: 'emily@bestcars.com', bio: 'Emily helps our clients with inquiries and ensures an excellent buying experience from start to finish.' },
];

const About = () => (
  <div>
    <Header />
    <div className="about-page">

      <section className="about-hero">
        <div className="about-hero-icon"><FaCar /></div>
        <h1>About AutoReview</h1>
        <p>Welcome to Best Cars dealership — home to the best cars in North America. We deal in selling domestic and imported cars at reasonable prices. Our mission is to provide high-quality vehicles with excellent customer service.</p>
      </section>

      <section className="team-section container">
        <h2 className="section-title">Meet Our Team</h2>
        <p className="section-sub">The people behind AutoReview</p>
        <div className="team-grid">
          {team.map((member, i) => (
            <div key={i} className="team-card card">
              <div className="team-avatar">{member.name.charAt(0)}</div>
              <h3>{member.name}</h3>
              <span className="team-role">{member.role}</span>
              <p className="team-bio">{member.bio}</p>
              <a href={`mailto:${member.email}`} className="team-email">
                <FaEnvelope /> {member.email}
              </a>
            </div>
          ))}
        </div>
      </section>

    </div>
  </div>
);

export default About;
