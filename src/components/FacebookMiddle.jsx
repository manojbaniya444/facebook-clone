import React from "react";
import styled from "styled-components";
import StoryReel from "./StoryReel";
import CreatePost from "./CreatePost";
import Feeds from "./Feeds";

const FacebookMiddle = () => {
  return (
    <FMWrapper>
      <StoryReel />
      <CreatePost />
      <Feeds />
    </FMWrapper>
  );
};

const FMWrapper = styled.div`
  max-width: 600px;
  width: 100%;
  padding: 0 10px;

  @media (min-width: ${({ theme }) => theme.responsive.tablet}) {
    /* margin-left: 290px; */
  }
`;

export default FacebookMiddle;
