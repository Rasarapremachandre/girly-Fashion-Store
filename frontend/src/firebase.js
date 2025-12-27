// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "girly-fashion-store.firebaseapp.com",
  projectId: "girly-fashion-store",
  storageBucket: "girly-fashion-store.firebasestorage.app",
  messagingSenderId: "465109705782",
  appId: "1:465109705782:web:4f2ed07427061ec848a497"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);