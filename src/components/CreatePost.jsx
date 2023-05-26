import { Avatar } from "@mui/material";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useAuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePost = () => {
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const { user, submitPost, guestUser } = useAuthContext();
  const inputFileRef = useRef();

  // Functions

  const fileChooseHandler = () => {
    document.getElementById("submit-file").click();
  };

  const fileChangeHandler = async (e) => {
    e.preventDefault();
    const file = inputFileRef.current.files[0];
    // const compressedFile = await ResizeFile(file);
    setImage(file);
  };

  const submitPostHandler = async (e) => {
    e.preventDefault();
    if (guestUser) {
      alert("Login to post");
      setInput("");
    } else if (!guestUser && input === "" && image === null) {
      toast.warn("Field cannot be empty", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      if (guestUser) {
        alert("Login to post");
        setInput("");
      } else {
        await submitPost(input, image);
        setInput("");
        setImage(null);
        toast.success("Posted successfully", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  };

  return (
    <CPWrapper>
      <div className="CP-top">
        {!guestUser && <Avatar src={user?.photoURL} />}

        <form className="form">
          <input
            placeholder={
              guestUser
                ? "Login to post"
                : `Whats on your mind, ${user?.displayName}?`
            }
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button onClick={(e) => submitPostHandler(e)}>Post</button>
        </form>
      </div>
      {image !== null && (
        <p className="selected-image">Image selected: {image.name}</p>
      )}
      <hr />
      {/* // Photos videos and feelings */}
      <div className="CP-bottom">
        <div className="box1">
          <LiveTvIcon style={{ color: "red" }} />
          <h4>Live Video</h4>
        </div>
        <div className="box1 file-box" onClick={fileChooseHandler}>
          <PhotoSizeSelectActualIcon style={{ color: "green" }} />
          <input
            id="submit-file"
            type="file"
            accept="image/*"
            ref={inputFileRef}
            onChange={fileChangeHandler}
          />
          <h4>
            {/* <label htmlFor="submit-file">Photo</label> */}
            Photo
          </h4>
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
  background-color: ${({ theme }) => theme.colors.base};
  margin-top: 15px;
  border-radius: 20px;
  padding: 15px;
  .selected-image {
    text-align: center;
    margin: 5px 0px;
  }

  .CP-bottom {
    display: flex;
    padding: 0.3rem;
    gap: 0.3rem;
    @media (max-width: ${({ theme }) => theme.responsive.mobile}) {
      margin-top: 5px;
    }

    .file-box {
      input {
        display: none;
      }
      /* label {
        cursor: pointer;
      } */
    }
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
      color: ${({ theme }) => theme.colors.text};
      &:hover {
        background-color: ${({ theme }) => theme.colors.gray};
      }
      @media (max-width: ${({ theme }) => theme.responsive.mobile}) {
        max-width: 30%;
        padding: 5px 10px;
        h4 {
          font-size: 12px;
        }
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
        border-radius: 12px;
        outline: none;
        border: none;
        font-size: 1rem;
        color: ${({ theme }) => theme.colors.text};
        background-color: ${({ theme }) => theme.colors.gray};
        @media (max-width: ${({ theme }) => theme.responsive.mobile}) {
          padding: 0.71rem 1.3rem;
          font-size: large.9rem;
        }
      }
      button {
        margin-right: 5px;
        margin-left: 5px;
        padding: 0.8rem 1.3rem;
        border-radius: 13px;
        border: none;
        outline: none;
        background-color: ${({ theme }) => theme.colors.blue};
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        transition: 0.3s ease;
        &:hover {
          background-color: ${(props) => props.theme.colors.gray};
        }
        @media (max-width: ${({ theme }) => theme.responsive.mobile}) {
          padding: 0.71rem 1.3rem;
          font-size: 0.9rem;
        }
      }
    }
  }
`;

export default CreatePost;
