import { Avatar, IconButton, Typography } from "@mui/material";
import { collection, deleteDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import styled from "styled-components";
import { database } from "../firebaseConfig";
import { useAuthContext } from "../context/AuthContext";
import PublicIcon from "@mui/icons-material/Public";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SinglePost = ({
  src,
  desc,
  profilesrc,
  username,
  time,
  id,
  userID,
  timeSpecial,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  console.log(time);

  const { user } = useAuthContext();

  const deletePostHandler = () => {
    setModalOpen(true);
  };

  const deleteHandler = async () => {
    const postRef = doc(database, "posts", id);
    await deleteDoc(postRef);
    setModalOpen(false);
    toast.info("Post deleted", {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };

  return (
    <SWrapper>
      {/* Modal for delete */}
      {modalOpen && (
        <Modal>
          <p>Confirm to delete your post</p>
          <div className="btns">
            <button className="btn1" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button className="btn2" onClick={deleteHandler}>
              Delete
            </button>
          </div>
        </Modal>
      )}
      {/* Toast */}

      <ToastContainer
        position="top-right"
        autoClose={300}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Feed Component */}
      <div className="Feed-top">
        <Avatar src={profilesrc} />
        <div className="title">
          <h4>{username}</h4>
          {timeSpecial === "Midnight" && (
            <p>
              Midnight
              <span>
                <PublicIcon />
              </span>
            </p>
          )}
          {timeSpecial !== "Midnight" && (
            <p>
              {new Date(time?.toDate()).toUTCString()}
              <span>
                <PublicIcon />
              </span>
            </p>
          )}
        </div>
        {/* // Delete button for logged in user an his posts */}
        {userID === user?.uid && (
          <button onClick={deletePostHandler}>Delete post</button>
        )}
      </div>
      <div className="description">
        <Typography variant="body1">{desc}</Typography>
      </div>
      <div className="image">{src !== "" && <img src={src} alt="/" />}</div>
      <div className="Feed-bottom">
        {/* <h4>1 like</h4>
        <div className="like">
          <button>Like</button>
        </div> */}
      </div>
    </SWrapper>
  );
};
const Modal = styled.div`
  position: fixed;
  z-index: 10;
  background-color: ${({ theme }) => theme.colors.darkgray};
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  padding: 30px;
  border-radius: 9px;
  p {
    font-size: 1.2rem;
  }
  .btns {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    .btn1 {
      padding: 5px 10px;
      cursor: pointer;
      border: none;
      border-radius: 3px;
      font-size: 1.2rem;
    }

    .btn2 {
      padding: 5px 10px;
      border: none;
      background-color: ${({ theme }) => theme.colors.blue};
      color: white;
      border-radius: 2px;
      font-size: 1.2rem;
    }
  }
`;

const SWrapper = styled.article`
  width: 100%;
  background-color: white;
  margin-top: 15px;
  border-radius: 9px;
  .Feed-bottom {
    padding: 15px 15px 5px 15px;
    h4 {
      font-weight: 600;
      font-size: 1.1rem;
    }
    button {
      width: 100%;
      margin-top: 15px;
      padding: 0.5rem;
      cursor: pointer;
      background-color: ${({ theme }) => theme.colors.blue};
      outline: none;
      border-radius: 9px;
      border: none;
      color: white;
      font-size: 1.3rem;
      &:hover {
        background-color: #1262b3;
      }
    }
  }
  .Feed-top {
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      align-self: flex-start;
      cursor: pointer;
      border: none;
      padding: 5px 10px;
      border-radius: 5px;
      background-color: ${({ theme }) => theme.colors.blue};
      color: white;
      outline: none;
      &:hover {
        background-color: #0d56a4;
      }
    }
    .title {
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      flex: 1;
      gap: 0.2rem;
      p {
        color: gray;
        display: flex;
        align-items: center;
        span {
          margin-left: 7px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .description {
    padding: 7px 15px;
  }
  .image {
    width: 100%;
    height: 400px;
    margin-top: 15px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: center center;
    }
  }
`;
