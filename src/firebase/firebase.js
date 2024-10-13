import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc,collection, addDoc,getDocs } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyByTPPzl9-m39rEXfjbKMVuB9daHaLhWF4",
  authDomain: "e-dating-app.firebaseapp.com",
  projectId: "e-dating-app",
  storageBucket: "e-dating-app.appspot.com",
  messagingSenderId: "505710828320",
  appId: "1:505710828320:web:2f7bdaa88d870fd0de5545",
  measurementId: "G-91HRYY0822"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

export {auth, db,storage, googleProvider,getDocs, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, ref, uploadBytes, getDownloadURL, collection, addDoc}