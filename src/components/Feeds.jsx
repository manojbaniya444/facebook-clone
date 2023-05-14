import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SinglePost } from "./SinglePost";
import { database } from "../firebaseConfig";
import { collection, getDoc, getDocs, onSnapshot } from "firebase/firestore";
import { useAuthContext } from "../context/AuthContext";

const Feeds = () => {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   const postRef = collection(database, "posts");
  //   onSnapshot(postRef, (doc) => {
  //     console.log(doc);
  //   });
  // }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const postRef = collection(database, "posts");
      const receivedData = await getDocs(postRef);
      setData(
        receivedData.docs.map((curItem) => ({
          ...curItem.data(),
          id: curItem.id,
        }))
      );
    };
    fetchPosts();
  }, [data]);

  console.log(data);

  return (
    <FWrapper>
      <SinglePost
        time={"Midnight"}
        username={"From Dev"}
        src={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgpjbOJpcUPP8b2XtS9Ga2MBJ7mgPojaw0kQ&usqp=CAU"
        }
        desc={
          "MESSAGE FROM ME: Hey if you are here make sure to post before you leave."
        }
        profilesrc={
          "https://scontent.fbir1-1.fna.fbcdn.net/v/t39.30808-6/285655908_3373164079578086_2980410443097564711_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=McLZbpI9enwAX_Y0U9J&_nc_ht=scontent.fbir1-1.fna&oh=00_AfALsFT4Gq1sFs8sWrIpESgE42Z-9za4hffkVmWzg0mvZw&oe=646531F1"
        }
      />
      {data.map((item) => {
        return (
          <SinglePost
            src={item.imageURL}
            profilesrc={item.profileURL}
            desc={item.caption}
            username={item.author}
            time={item.timestamp}
          />
        );
      })}
    </FWrapper>
  );
};
const FWrapper = styled.section``;

export default Feeds;
