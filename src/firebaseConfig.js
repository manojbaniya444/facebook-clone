import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyA8jZAr5519lJ936YLtyAl98lldnRWMk5o",
//   authDomain: "facebookclone-5704e.firebaseapp.com",
//   projectId: "facebookclone-5704e",
//   storageBucket: "facebookclone-5704e.appspot.com",
//   messagingSenderId: "321065020477",
//   appId: "1:321065020477:web:36c7423a2260240cc38e54",
// };

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
