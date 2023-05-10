import React from "react";
import styled from "styled-components";
import { SinglePost } from "./SinglePost";

const Feeds = () => {
  return (
    <FWrapper>
      <SinglePost
        src={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP4E5oFbIEm2LnOYNFFPrbLiba8Nlfe36lSw&usqp=CAU"
        }
        desc={"I admire all the upper moons eyes its a unique aesthetic :)"}
      />
      <SinglePost
        src={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLXJE26UEsOXJT4kkrOYTq4Vq-jxJiSjcr9Q&usqp=CAU"
        }
        desc={"Nezuko blood demon art is something else ..."}
      />
      <SinglePost
        src={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRl3ljGZbIiF_fjkcYiyrWPS5rg4wQwgxaEg&usqp=CAU"
        }
        desc={"yall check this out this is going to be epic"}
      />
      <SinglePost
        src={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6T0ChLfNrA7n9EQ_iycFMvBR-avaSzrILyA&usqp=CAU"
        }
        desc={"Hantengu's clone"}
      />
    </FWrapper>
  );
};
const FWrapper = styled.section``;

export default Feeds;
