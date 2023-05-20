import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SinglePost } from "./SinglePost";
import { database } from "../firebaseConfig";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import CommentSection from "./CommentSection";

const Feeds = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = async () => {
      const postRef = collection(database, "posts");
      const qur = query(postRef, orderBy("timestamp", "desc"));
      onSnapshot(qur, (item) => {
        setData(item.docs.map((item) => ({ ...item.data(), id: item.id })));
      });
    };
    return unsubscribe;
  }, []);

  return (
    <FWrapper>
      <SinglePost
        timeSpecial={"Midnight"}
        username={"From Dev"}
        src="./reactimg.png"
        desc={"Hey if you are here make sure to post before you leave."}
        profilesrc={
          "https://scontent.fbir1-1.fna.fbcdn.net/v/t39.30808-6/285655908_3373164079578086_2980410443097564711_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=McLZbpI9enwAX_Y0U9J&_nc_ht=scontent.fbir1-1.fna&oh=00_AfALsFT4Gq1sFs8sWrIpESgE42Z-9za4hffkVmWzg0mvZw&oe=646531F1"
        }
      />
      {data.map((item) => {
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
