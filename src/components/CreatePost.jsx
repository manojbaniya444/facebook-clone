import { Avatar } from "@mui/material";
import React from "react";
import styled from "styled-components";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

const CreatePost = () => {
  return (
    <CPWrapper>
      <div className="CP-top">
        <Avatar src="https://scontent.fbir1-1.fna.fbcdn.net/v/t39.30808-1/285655908_3373164079578086_2980410443097564711_n.jpg?stp=dst-jpg_s480x480&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_ohc=CsjaHNzkrfcAX9MO7w5&_nc_ht=scontent.fbir1-1.fna&oh=00_AfBJS6qJ7hYvGhQ3yOFz6t5Qej20EWXzDKu-GMuY5IFhRQ&oe=645E5273" />
        <form className="form">
          <input placeholder={`Whats on your mind, Manoj?`} />
          <button>Post</button>
        </form>
      </div>
      <hr />
      <div className="CP-bottom">
        <div className="box1">
          <LiveTvIcon style={{ color: "red" }} />
          <h4>Live Video</h4>
        </div>
        <div className="box1">
          <PhotoSizeSelectActualIcon style={{ color: "green" }} />
          <h4>Photo/video</h4>
        </div>
        <div className="box1">
          <EmojiEmotionsIcon style={{ color: "orange" }} />
          <h4>Feeling/activity</h4>
        </div>
      </div>
    </CPWrapper>
  );
};

const CPWrapper = styled.section`
  width: 100%;
  background-color: white;
  margin-top: 15px;
  border-radius: 9px;
  padding: 15px;

  .CP-bottom {
    display: flex;
    padding: 5px;
    gap: 0.3rem;
    .box1 {
      display: flex;
      align-items: center;
      justify-content: center;
      /* background-color: red; */
      flex: 1;
      padding: 10px 20px;
      border-radius: 9px;
      cursor: pointer;
      transition: 0.1s ease;
      &:hover {
        background-color: ${({ theme }) => theme.colors.gray};
      }
    }
    h4 {
      margin-left: 8px;
      font-weight: 600;
    }
  }

  .CP-top {
    display: flex;
    align-items: center;
    margin-bottom: 9px;
    .form {
      flex: 1;
      margin-left: 5px;
      display: flex;
      align-items: center;
      gap: 0.21rem;
      border-radius: 9px;
      input {
        flex: 1;
        padding: 1rem 1.7rem;
        border-radius: 9px;
        outline: none;
        border: none;
        font-size: 1.3rem;
        background-color: ${({ theme }) => theme.colors.gray};
      }
      button {
        margin-right: 5px;
        padding: 1rem 1.7rem;
        border-radius: 9px;
        border: none;
        outline: none;
        background-color: ${({ theme }) => theme.colors.blue};
        color: white;
        font-size: 1.3rem;
        cursor: pointer;
        transition: 0.3s ease;
        &:hover {
          background-color: #1262b3;
        }
      }
    }
  }
`;

export default CreatePost;
