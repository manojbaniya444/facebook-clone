import React from "react";
import styled from "styled-components";
import StoryReel from "./StoryReel";

const FacebookMiddle = () => {
  return <FMWrapper>
    <StoryReel />
  </FMWrapper>
};

const FMWrapper = styled.div`
    
max-width: 600px;
width: 100%;
padding: 0 10px;
`

export default FacebookMiddle;
