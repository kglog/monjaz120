// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCuRaMQEqLhzneltkLtm_nXsfEOheoTckk",
  authDomain: "monjaz120.firebaseapp.com",
  projectId: "monjaz120",
  storageBucket: "monjaz120.appspot.com",
  messagingSenderId: "1097286641677",
  appId: "1:1097286641677:web:58e4f8dc9a45831475cd44"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
