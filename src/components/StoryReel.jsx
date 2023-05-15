import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import StoryComponent from "./StoryComponent";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Avatar, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAuthContext } from "../context/AuthContext";
import { collection, onSnapshot } from "firebase/firestore";
import { database } from "../firebaseConfig";
import CircularProgress from "@mui/material/CircularProgress";

const StoryReel = () => {
  const [storyImg, setStoryImg] = useState(null);
  const [stories, setStories] = useState([]);
  const [storyLoading, setStoryLoading] = useState(false);

  const { user, postStory } = useAuthContext();

  //JS

  const slide = document.getElementById("slider");

  const slideLeftHandler = () => {
    slide.scrollLeft -= 400;
  };

  const slideRightHandler = () => {
    slide.scrollLeft += 400;
  };

  const inputRef = useRef();

  const inputChangeHandler = (e) => {
    e.preventDefault();
    setStoryImg(inputRef.current.files[0]);
  };

  // console.log(storyImg);

  //Functions

  const postStoryHandler = async () => {
    if (storyImg === null) {
      alert("Please select image to post");
    } else {
      setStoryLoading(true);
      await postStory(storyImg);
      setStoryImg(null);
      setStoryLoading(false);
    }
  };

  // Fetch stories

  useEffect(() => {
    const unsubscribe = async () => {
      const storyRef = collection(database, "stories");
      onSnapshot(storyRef, (data) => {
        setStories(data.docs.map((item) => ({ ...item.data(), id: item.id })));
      });
    };
    return unsubscribe;
  }, []);

  // console.log(stories);

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

      {/* // Create Story Component */}

      <div className="story-component" id="slider">
        <div className="create">
          {/* Conditional Loading for story post */}

          {!storyLoading ? (
            <>
              <div className="select-photo">
                <input
                  type="file"
                  id="story-file"
                  ref={inputRef}
                  onChange={inputChangeHandler}
                />
                <label htmlFor="story-file">
                  <AddIcon />
                </label>
                <h3>Share your story</h3>
                {storyImg !== null && <p>Ready to post</p>}
                <button onClick={postStoryHandler}>post</button>
              </div>
            </>
          ) : (
            <>
              <div className="loading">
                <CircularProgress />
              </div>
            </>
          )}

          <div className="image-div">
            <Avatar src={user?.photoURL} sx={{ height: 60, width: 60 }} />
          </div>
        </div>

        {/* Story COmponent */}

        {stories.map((item) => {
          return (
            <StoryComponent
              key={item.id}
              username={item.author}
              imagesrc={item.imageURL}
              profilesrc={item.profileURL}
            />
          );
        })}
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
  .create {
    width: 120px;
    height: 200px;
    margin: 15px 9px 15px 40px;
    border-radius: 9px;
    background-color: black;
    .loading {
      padding: 20px;
      background-color: ${({ theme }) => theme.colors.gray};
      border-top-right-radius: 8px;
      border-top-left-radius: 8px;
      display: flex;
      justify-content: center;
    }
    p {
      margin-bottom: 5px;
      color: #056e97;
    }
    .image-div {
      display: flex;
      justify-content: center;
      margin-top: 15px;
    }
    .select-photo {
      background-color: #eceaea;
      display: flex;
      flex-direction: column;
      border-top-left-radius: 9px;
      align-items: center;
      border-top-right-radius: 9px;
      h3 {
        font-weight: 400;
        font-size: 0.9rem;
        margin-bottom: 5px;
      }
      input {
        display: none;
      }
      button {
        background-color: ${({ theme }) => theme.colors.blue};
        color: white;
        border: none;
        border-radius: 5px;
        padding: 5px 10px;
        cursor: pointer;
        margin-bottom: 5px;
      }
      .MuiSvgIcon-root {
        font-size: 40px;
        cursor: pointer;
      }
    }
    @media (max-width: ${({ theme }) => theme.responsive.mobile}) {
      width: 110px;
      height: 180px;
    }
  }
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
      cursor: pointer;
      background-color: white;
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
