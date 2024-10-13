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
import "./institute.css";

export const Institute = () => {
  const navigate = useNavigate();

  const [academicData, setAcademicData] = useState({
    program: "",
    year: "",
    branch: "",
  });

  const handleChange = (e) => {
    setAcademicData({ ...academicData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userEmail = auth.currentUser.email; // Get current user's email

    try {
      await setDoc(
        doc(db, "users", userEmail),
        { academicData },
        { merge: true }
      ); // Save data in Firestore
      alert("Academic details saved successfully!");
      navigate("/habits")
    } catch (error) {
      console.error("Error saving academic details:", error);
      alert("Error saving academic details. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h1>Enter Your Academic Details</h1>
      <form onSubmit={handleSubmit}>
        <select
          name="program"
          value={academicData.program}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select Program
          </option>
          <option value="BTech">B.Tech</option>
          <option value="MTech">M.Tech</option>
          <option value="BTech">B.Sc</option>
          <option value="MTech">M.Sc</option>
          <option value="MTech">PHD</option>
        </select>

        <select
          name="year"
          value={academicData.year}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select Year
          </option>
          <option value="1st">1st</option>
          <option value="2nd">2nd</option>
          <option value="1st">3rd</option>
          <option value="2nd">4th</option>
        </select>

        <select
          name="branch"
          value={academicData.branch}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select Branch
          </option>
          <option value="CSE">Computer Science</option>
          <option value="EE">Artificial intelligence</option>
          <option value="CSE">Mathematics and computing</option>
          <option value="EE">Electrical</option>
          <option value="CSE">Mechanical</option>
          <option value="EE">Chemical</option>
          <option value="CSE">Engineering Physics</option>
          <option value="EE">Civil</option>
          <option value="EE">Matellurgy</option>
        </select>

        <button type="submit">Save Academic Details</button>
      </form>
    </div>
  );
};
