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
  /* flex-basis: 45%; */

  //new
  flex: 40%;
  position: sticky;
  @media (max-width: ${({ theme }) => theme.responsive.tablet}) {
    padding: 0px;
  }
`;

export default FacebookMiddle;
