import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SinglePost } from "./SinglePost";
import { database } from "../firebaseConfig";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import CommentSection from "./CommentSection";

const Feeds = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const postRef = collection(database, "posts");
    const qur = query(postRef, orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(qur, (item) => {
      setData(item.docs.map((item) => ({ ...item.data(), id: item.id })));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <FWrapper>
      <SinglePost
        timeSpecial={"Midnight"}
        username={"From Dev"}
        src=""
        desc={
          "Hey, while you're here, don't forget to leave your mark! Share your thoughts, pictures, or anything you'd like to express before you go."
        }
        profilesrc={"dev.jpg"}
      />
      {data?.map((item) => {
        return (
          <SinglePost
            key={item?.id}
            src={item?.imageURL}
            profilesrc={item?.profileURL}
            desc={item?.caption}
            username={item?.author}
            time={item?.timestamp}
            id={item?.id}
            userID={item?.userId}
            comments={item?.comments}
            likes={item?.likes}
          />
        );
      })}
    </FWrapper>
  );
};
const FWrapper = styled.section`
  .toast {
    position: absolute;
    top: 20px;
  }
`;

export default Feeds;
