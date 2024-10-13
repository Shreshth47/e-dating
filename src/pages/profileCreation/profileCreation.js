import React, { useState } from "react";
import {auth, db, googleProvider, signInWithPopup, createUserWithEmailAndPassword} from '../../firebase/firebase';
import { sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { createBrowserRouter, Link, Navigate, RouterProvider, useNavigate } from "react-router-dom";
import './profile.css';


export const ProfileCreation = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        dob: "",
        height: "",
        weight: "",
        gender: "",
      });

      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        const userEmail = auth.currentUser.email; // Get current user's email
    
        try {
          await setDoc(doc(db, "users", userEmail), formData, { merge: true }); // Save user data in Firestore
          alert("User data saved successfully!");
          navigate("/institute")
        } catch (error) {
          console.error("Error saving user data:", error);
          alert("Error saving user data. Please try again.");
        }
      };

    return <div className="form-container">
        <h1>Profile Creation</h1>
        <form onSubmit={handleSubmit}>
        <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="date"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="height"
        placeholder="Height (cm)"
        value={formData.height}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="weight"
        placeholder="Weight (kg)"
        value={formData.weight}
        onChange={handleChange}
        required
      />

      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        required
      >
        <option value="" disabled>Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <button type="submit">Save Data</button>
    </form>
    </div>
}