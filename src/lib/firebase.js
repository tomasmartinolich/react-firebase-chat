import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-61143.firebaseapp.com",
  projectId: "reactchat-61143",
  storageBucket: "reactchat-61143.appspot.com",
  messagingSenderId: "584142779744",
  appId: "1:584142779744:web:756d3054eef68fe3065a05"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();