import React, { useState } from "react";
import {auth, db, googleProvider, signInWithPopup, createUserWithEmailAndPassword} from '../../firebase/firebase';
import { sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { createBrowserRouter, Link, Navigate, RouterProvider, useNavigate } from "react-router-dom";
import './signup.css'

export const SignUp = () => {
const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");

  const validDomain = "@iitrpr.ac.in";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const generateOtp = () => {
  //   const otp = Math.floor(100000 + Math.random() * 900000).toString();
  //   setGeneratedOtp(otp);
  //   alert(`Your OTP is: ${otp}`); // In production, replace with email OTP.
  // };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, phone, password, confirmPassword } = formData;

    if (!validateEmailDomain(email)) {
      alert(`Please use an email with the ${validDomain} domain.`);
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);
      alert("Email verification sent. Please verify your email.");

      // Save user data in Firestore
      await setDoc(doc(db, "users", email), { name, email, phone });

      // generateOtp(); // Generate OTP
      setOtpSent(true);
      navigate('/signin')
    } catch (error) {
      console.error("Error signing up:", error);
      alert(error.message);
    }
  };

  const validateEmailDomain = (email) => {
    return email.endsWith(validDomain);
  };

  // const verifyOtp = () => {
  //   if (formData.otp === generatedOtp) {
  //     alert("OTP verified successfully!");
  //     setOtpVerified(true);
  //   } else {
  //     alert("Invalid OTP. Please try again.");
  //   }
  // };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      if (!validateEmailDomain(user.email)) {
        alert(`Please use a ${validDomain} email for signup.`);
        return;
      }

      // Save user data in Firestore
      const userDoc = doc(db, "users", user.email);
      const userExists = (await userDoc.get()).exists();

      if (!userExists) {
        await setDoc(userDoc, {
          name: user.displayName,
          email: user.email,
          phone: "", // Optional: Ask user to update phone later
        });
      }

      alert("Google sign-in successful!");
      navigate("/signin")
    } catch (error) {
      console.error("Error with Google sign-in:", error);
      alert(error.message);
    }
  };


  return (
    <div>
      <div className="container">
      <div class="left-section">
      <img src="Coupleprofile.jpg" alt="Heart Image" class="heart-image" />
      <h2>Find meaningful connections on</h2>
      <p>Discover love and connections with ease</p>
    </div>
    { (
      <div className="right-section">
      <form onSubmit={handleSignup}>
        <h2>Signup</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email (Student ID)"
          value={formData.email}
          onChange={handleChange}
          required
        />  
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
        <button type="button" onClick={handleGoogleSignup}>
          Sign Up with Google
        </button>
        Already have an account? <Link to="/signin">Sign In</Link>
      </form>
      </div>
    )}
    </div>
  </div>
  );
}

