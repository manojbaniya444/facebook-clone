import Resizer from "react-image-file-resizer";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, provider } from "../firebaseConfig";
import { database } from "../firebaseConfig";
import { collection, addDoc, Firestore, setDoc, doc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebaseConfig";
import { serverTimestamp } from "firebase/firestore";
export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // provider.addScope("profile");
  // provider.addScope("openid");
  // provider.addScope("email");

  //Auth
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

  const signIn = async () => {
    const res = await signInWithPopup(auth, provider);

    const usersRef = collection(database, "users");
    addDoc(usersRef, {
      username: res?.user.displayName,
      userid: res?.user.uid,
      profileURL: res?.user.photoURL,
      timestamp: serverTimestamp(),
    });
    return true;
  };
  const signout = () => {
    signOut(auth);
  };

  // Add all users

  const saveUser = (users) => {};

  // Compress File

  // const ResizeFile = (file) =>
  //   new Promise((resolve) => {
  //     Resizer.imageFileResizer(
  //       file,
  //       300,
  //       300,
  //       "JPEG",
  //       100,
  //       0,
  //       (uri) => {
  //         resolve(uri);
  //         console.log(uri)
  //       },
  //       "base64"
  //     );
  //   });

  //Feeds
  const submitPost = async (data, image) => {
    if (image == null) {
      let url = "";
      const postRef = collection(database, "posts");
      addDoc(postRef, {
        caption: data,
        author: user?.displayName,
        userId: user?.uid,
        imageURL: url,
        timestamp: serverTimestamp(),
        profileURL: user?.photoURL,
        comments: [],
        likes: [],
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
            timestamp: serverTimestamp(),
            profileURL: user?.photoURL,
            comments: [],
            likes: [],
          });
        });
      });
    }
    return true;
  };

  //Story
  const postStory = (image) => {
    const imageRef = ref(storage, `storyImages/${image.name}`);
    uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        const storyRef = collection(database, "stories");
        addDoc(storyRef, {
          author: user?.displayName,
          userId: user?.uid,
          imageURL: url,
          profileURL: user?.photoURL,
        });
      });
    });
    return true;
  };

  //Pass
  const object = {
    signIn,
    user,
    signout,
    setUser,
    loading,
    submitPost,
    postStory,
  };

  return <authContext.Provider value={object}>{children}</authContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(authContext);
};
