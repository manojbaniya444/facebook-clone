import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, provider } from "../firebaseConfig";
import { database } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  provider.addScope("profile");
  provider.addScope("openid");
  provider.addScope("email");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signIn = () => {
    return signInWithPopup(auth, provider);
  };
  const signout = () => {
    signOut(auth);
  };
  const submitPost = (data) => {
    const postRef = collection(database,"posts");
    addDoc(postRef,{
      caption: data,
    })
  };
  const object = { signIn, user, signout, setUser, loading, submitPost };

  return <authContext.Provider value={object}>{children}</authContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(authContext);
};
