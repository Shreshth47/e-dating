import React, { useState } from "react";
import {auth, db, googleProvider, signInWithPopup, createUserWithEmailAndPassword} from './firebase/firebase';
import { sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignIn } from "./pages/signin/signin";
import { SignUp } from "./pages/signup/signup";
import { Home } from "./pages/home/home";
import { ProfileCreation } from "./pages/profileCreation/profileCreation";
import { Institute } from "./pages/institute/institute";
import { Habits } from "./pages/Habits/habits";
import { About } from "./pages/about/about";
import { Picture } from "./pages/profilePicture/picture";
import Interests from "./pages/interest/interest";


function App() {

  const router = createBrowserRouter([
    {
      path: "/signup",
      element: <SignUp/>
    },
    {
      path: "/signin",
      element: <SignIn/>
    },
    {
      path: "/",
      element: <Home/>
    },
    {
      path: "/profileCreation",
      element: <ProfileCreation/>
    },
    {
      path: "/institute",
      element: <Institute/>
    },
    {
      path: "/habits",
      element: <Habits/>
    },
    {
      path: "/about",
      element: <About/>
    },
    {
      path: "/profilepicture",
      element: <Picture/>
    },
    {
      path: "/interest",
      element: <Interests/>
    },
  ])

  return (
    <div>
      <RouterProvider router={router} />
  </div>
  );
}

export default App;
