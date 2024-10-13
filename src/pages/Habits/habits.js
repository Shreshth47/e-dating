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
import "./habits.css";

export const Habits = () => {
  const navigate = useNavigate();

  const [habitsData, setHabitsData] = useState({
    drink: "",
    smoke: "",
    party: "",
  });

  const handleChange = (e) => {
    setHabitsData({ ...habitsData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userEmail = auth.currentUser.email; // Get current user's email

    try {
      await setDoc(doc(db, "users", userEmail), { habitsData }, { merge: true }); // Save habits data in Firestore
      alert("Habits data saved successfully!");
      navigate("/about")
    } catch (error) {
      console.error("Error saving habits data:", error);
      alert("Error saving habits data. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h1>Enter Your Habits</h1>
      <form onSubmit={handleSubmit}>
      <label>Do you like to drink?</label>
      <select name="drink" value={habitsData.drink} onChange={handleChange} required>
        <option value="" disabled>Select Option</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
        <option value="Occasionally">Occasionally</option>
      </select>

      <label>Do you smoke?</label>
      <select name="smoke" value={habitsData.smoke} onChange={handleChange} required>
        <option value="" disabled>Select Option</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
        <option value="Occasionally">Occasionally</option>
      </select>

      <label>Do you party?</label>
      <select name="party" value={habitsData.party} onChange={handleChange} required>
        <option value="" disabled>Select Option</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
        <option value="Sometimes">Sometimes</option>
      </select>

      <button type="submit">Save Habits</button>
    </form>
    </div>
  );
};
