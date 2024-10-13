import React, { useState } from 'react';
import './home.css';

const matches = [
  {
    name: "John Doe",
    age: 28,
    location: "New York",
    image: "path/to/profile-pic-1.jpg",
    description: "Loves hiking and outdoor adventures.",
  },
  {
    name: "Emily Smith",
    age: 25,
    location: "San Francisco",
    image: "path/to/profile-pic-2.jpg",
    description: "Avid reader and coffee enthusiast.",
  },
  // Add more match objects as needed
];

export const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % matches.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + matches.length) % matches.length);
  };

  const currentMatch = matches[currentIndex];

  return (
    <div className="main-page-container">
      {/* Upper Navbar */}
      <div className="upper-navbar">
        <h1>Your LoveConnect</h1>
        <input type="text" placeholder="Search for matches" className="search-bar" />
      </div>

      <div className="content-area">
        {/* Left Sidebar */}
        <div className="sidebar">
          <ul>
            <li>Verify</li>
            <li>Connections</li>
            <li className="active">Matches</li>
            <li>Upload</li>
            <li>Privacy</li>
            <li>Sign out</li>
          </ul>
        </div>

        {/* Profile Section */}
        <div className="profile-section">
          <h2>Matches</h2>
          <div className="profile-header">
            <div className="profile-status">
              <span>Profile Pictures</span>
              <span className="completion">100% complete</span>
            </div>
            <button className="upgrade-plan">Upgrade Plan</button>
          </div>

          {/* Big Square Card */}
          <div className="match-card">
            <button className="nav-button left" onClick={handlePrev}>
              &#10094; {/* Backward Arrow */}
            </button>
            <div className="card-content">
              <img src={currentMatch.image} alt={currentMatch.name} className="match-image" />
              <h3>{currentMatch.name}, {currentMatch.age}</h3>
              <p>{currentMatch.location}</p>
              <p>{currentMatch.description}</p>
            </div>
            <button className="nav-button right" onClick={handleNext}>
              &#10095; {/* Forward Arrow */}
            </button>
          </div>

          {/* Profile Cards Section */}
          <div className="profile-cards">
            {/* Example Profile Card */}
            {[...Array(10)].map((_, index) => (
              <div key={index} className="profile-card">
                <img src={`path/to/profile-pic-${index + 1}.jpg`} alt={`Profile Pic ${index + 1}`} />
                <p>Profile Pic {index + 1}</p>
                <span>Joined WarmHeart Connect</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

