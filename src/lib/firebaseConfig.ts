import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCuRaMQEqLhzneltkLtm_nXsEfOheoTckk",
  authDomain: "monjaz120.firebaseapp.com",
  projectId: "monjaz120",
  storageBucket: "monjaz120.appspot.com",
  messagingSenderId: "1097286641677",
  appId: "1:1097286641677:web:58e4f8dc9a45831475cd44",
  measurementId: "G-YNQR4H4237"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
