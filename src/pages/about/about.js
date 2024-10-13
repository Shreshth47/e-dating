import React, { useState } from "react";
import {
  auth,
  db,
  googleProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "../../firebase/firebase";
import { sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {
  createBrowserRouter,
  Link,
  Navigate,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import "./about.css";

export const About = () => {
  const navigate = useNavigate();

  const [aboutData, setAboutData] = useState({
    aboutYourself: "",
    interests: "",
    partnerExpectations: "",
  });


  const handleChange = (e) => {
    setAboutData({ ...aboutData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userEmail = auth.currentUser.email; // Get current user's email

    try {
      await setDoc(doc(db, "users", userEmail), { aboutData }, { merge: true }); // Save about data in Firestore
      alert("About data saved successfully!");
      navigate("/interest")
    } catch (error) {
      console.error("Error saving about data:", error);
      alert("Error saving about data. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h1>About You</h1>
      <form onSubmit={handleSubmit}>
      <label>Tell us about yourself</label>
      <textarea
        name="aboutYourself"
        value={aboutData.aboutYourself}
        onChange={handleChange}
        placeholder="Write a brief description about yourself..."
        rows="4"
        required
      />

      <label>What are your interests?</label>
      <textarea
        name="interests"
        value={aboutData.interests}
        onChange={handleChange}
        placeholder="List your interests and hobbies..."
        rows="4"
        required
      />

      <label>What are you looking for in a partner?</label>
      <textarea
        name="partnerExpectations"
        value={aboutData.partnerExpectations}
        onChange={handleChange}
        placeholder="Describe your ideal partner..."
        rows="4"
        required
      />

      <button type="submit">Save About Information</button>
    </form>
    </div>
  );
};
