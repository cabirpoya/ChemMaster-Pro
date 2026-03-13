import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAnhCIOn3sbFFaGPNMTBRC-q_98ueDBdVw",
  authDomain: "chemmaster-pro.firebaseapp.com",
  projectId: "chemmaster-pro",
  storageBucket: "chemmaster-pro.firebasestorage.app",
  messagingSenderId: "444033607979",
  appId: "1:444033607979:web:7d095c8de78eb44183bd6e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
