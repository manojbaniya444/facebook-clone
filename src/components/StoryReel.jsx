import React from "react";
import styled from "styled-components";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import StoryComponent from "./StoryComponent";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IconButton } from "@mui/material";

const StoryReel = () => {
  const slide = document.getElementById("slider");

  const slideLeftHandler = () => {
    slide.scrollLeft -= 400;
  };

  const slideRightHandler = () => {
    slide.scrollLeft += 400;
  };

  return (
    <SRWrapper>
      <div className="SR-top">
        <div className="stories active">
          <AutoStoriesIcon />
          <h4>Stories</h4>
        </div>
        <div className="reels">
          <MovieCreationIcon />
          <h4>Reels</h4>
        </div>
      </div>
      <hr />

      {/* TODO:create more reels */}
      <div className="start-icon" onClick={slideLeftHandler} id="left-slide">
        <ArrowBackIosIcon />
      </div>
      <div className="story-component" id="slider">
        <StoryComponent />
        <StoryComponent />
        <StoryComponent />
        <StoryComponent />
        <StoryComponent />
        <StoryComponent />
        <StoryComponent />
        <StoryComponent />
        <StoryComponent />
        <StoryComponent />
      </div>
      <div className="end-icon" id="right-slide" onClick={slideRightHandler}>
        <ArrowForwardIosIcon />
      </div>
    </SRWrapper>
  );
};

const SRWrapper = styled.section`
  /* max-width: 500px; */
  width: 100%;
  background-color: white;
  border-radius: 9px;
  position: relative;
  /* height: 300px; */
  .start-icon {
    position: absolute;
    top: 140px;
    left: 10px;
    z-index: 3;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    border-radius: 999px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    .MuiSvgIcon-root {
      color: black;
    }
  }
  .end-icon {
    position: absolute;
    top: 140px;
    right: 10px;
    z-index: 3;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    border-radius: 999px;
    &:hover {
      opacity: 0.8;
    }
    cursor: pointer;
    .MuiSvgIcon-root {
      color: black;
    }
  }
  .story-component {
    position: relative;
    scroll-behavior: smooth;

    display: flex;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
  }
  .SR-top {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;

    h4 {
      margin-left: 8px;
      font-weight: 600;
    }
    .stories {
      display: flex;
      /* padding: 10px 50px; */
      position: relative;
      width: 270px;
      height: 50px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 9px;
      &:hover {
        background-color: ${({ theme }) => theme.colors.gray};
      }
    }
    .active {
      &:hover {
        background-color: white;
      }
    }

    .active::after {
      content: "";
      position: absolute;
      background-color: white;
      width: 100%;
      height: 3px;
      background-color: ${({ theme }) => theme.colors.blue};
      /* bottom: -5px; */
      left: 0;
      bottom: -5px;
    }
    .active .MuiSvgIcon-root {
      color: ${({ theme }) => theme.colors.blue};
    }

    .reels {
      display: flex;
      /* padding: 10px 50px; */
      width: 270px;
      height: 50px;
      border-radius: 9px;

      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        background-color: ${({ theme }) => theme.colors.gray};
      }
    }
  }
`;

export default StoryReel;
