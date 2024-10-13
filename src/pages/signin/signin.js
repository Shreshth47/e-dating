import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword, signInWithPopup, googleProvider } from "../../firebase/firebase";
import './signin.css'


export const SignIn = () => {

const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate("/profilecreation"); // Redirect to / on success
    } catch (error) {
      console.error("Error logging in:", error);
      alert(error.message); 
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Google login successful!");
      navigate("/"); // Redirect to /home on success
    } catch (error) {
      console.error("Error with Google login:", error);
      alert(error.message);
    }
  };


    return <div className="container">
      <div class="left-section">
      <img src="Coupleprofile.jpg" alt="Heart Image" class="heart-image" />
      <h2>Find meaningful connections on</h2>
      <p>Discover love and connections with ease</p>
    </div>
    <div class="right-section">
    <h2>Login</h2>
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    Don't have an account? <Link to='/signup'>Sign Up</Link>
    </form>
    
    
    </div>
  </div>
}