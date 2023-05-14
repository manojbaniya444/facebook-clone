import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, provider } from "../firebaseConfig";
import { database } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebaseConfig";

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
  const submitPost = async (data, image) => {
    if (image == null) {
      let url = "";
      const postRef = collection(database, "posts");
      addDoc(postRef, {
        caption: data,
        author: user?.displayName,
        userId: user?.uid,
        imageURL: url,
        timestamp: "2023",
        profileURL: user?.photoURL,
      });
    } else {
      const imageRef = ref(storage, `images/${image.name}`);
      uploadBytes(imageRef, image).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          const postRef = collection(database, "posts");
          addDoc(postRef, {
            caption: data,
            author: user?.displayName,
            userId: user?.uid,
            imageURL: url,
            timestamp: "2023",
            profileURL: user?.photoURL,
          });
        });
      });
    }
    return true;
  };
  const object = {
    signIn,
    user,
    signout,
    setUser,
    loading,
    submitPost,
  };

  return <authContext.Provider value={object}>{children}</authContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(authContext);
};
