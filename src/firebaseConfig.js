import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAyZwHf9c2luFuyfpGUiti4oZ54R8UfdNM",
  authDomain: "facebook-clone-4c42b.firebaseapp.com",
  projectId: "facebook-clone-4c42b",
  storageBucket: "facebook-clone-4c42b.appspot.com",
  messagingSenderId: "816971841196",
  appId: "1:816971841196:web:efa03b209d1076ad206909",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
