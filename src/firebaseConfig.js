import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "social-site-3c14c.firebaseapp.com",
  projectId: "social-site-3c14c",
  storageBucket: "social-site-3c14c.appspot.com",
  messagingSenderId: "168587733681",
  appId: "1:168587733681:web:2eda65b096bc975a9ed090",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
