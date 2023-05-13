import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQxPgKdWbRdhWHzbiafhUDQapzEE092AA",
  authDomain: "facebook-clone-c49f2.firebaseapp.com",
  projectId: "facebook-clone-c49f2",
  storageBucket: "facebook-clone-c49f2.appspot.com",
  messagingSenderId: "338148041000",
  appId: "1:338148041000:web:0fafa1d2608f784560701d",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);
export const provider = new GoogleAuthProvider();
