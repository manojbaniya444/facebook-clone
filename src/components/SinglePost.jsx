import { Avatar, IconButton, Typography } from "@mui/material";
import { collection, deleteDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import styled from "styled-components";
import { database } from "../firebaseConfig";
import { useAuthContext } from "../context/AuthContext";
import PublicIcon from "@mui/icons-material/Public";
import "react-toastify/dist/ReactToastify.css";
import CommentSection from "./CommentSection";

export const SinglePost = ({
  src,
  desc,
  profilesrc,
  username,
  time,
  id,
  userID,
  timeSpecial,
  comments,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [showComment, setShowComment] = useState(false);

  const { user } = useAuthContext();

  const deletePostHandler = () => {
    setModalOpen(true);
  };

  const deleteHandler = async () => {
    const postRef = doc(database, "posts", id);
    await deleteDoc(postRef);
    setModalOpen(false);
  };

  return (
    <SWrapper>
      {/* Modal for delete */}

      {/* Toast */}

      {/* Feed Component */}
      <div className="Feed-top">
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

        {/* Post Modal */}

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

      {/* Comment Section */}
      <hr/>

      <div className="Feed-bottom">
        {/* This timespecial is for the special post from the dev at the top of the feed where comment is disabled */}
        {!timeSpecial && (
          <button onClick={() => setShowComment(!showComment)}>
            {showComment ? "Hide Comment" : "Comment"}
          </button>
        )}
      </div>
      {!timeSpecial && showComment && (
        <CommentSection id={id} commentList={comments} />
      )}
    </SWrapper>
  );
};
const Modal = styled.div`
  position: absolute;
  z-index: 10;
  background-color: ${({ theme }) => theme.colors.darkgray};
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 1.6rem;
  border-radius: 9px;
  p {
    font-size: 1.2rem;
  }
  .btns {
    display: flex;
    justify-content: space-between;
    margin-top: 1.8rem;
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
  position: relative;
  .toast {
    position: absolute;
    top: 0;
  }
  .Feed-bottom {
    /* TODO: Code */
    display: flex;
    margin-top: 5px;
    justify-content: center;
    padding-bottom: 10px;
    button {
      padding: 0.5rem 1rem;
      border: none;
      background-color: ${({ theme }) => theme.colors.gray};
      cursor: pointer;
      border-radius: 5px;
      font-size: 1.1rem;
      font-weight: 400;
      &:hover {
        background-color: ${({ theme }) => theme.colors.darkgray};
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
    /* height: 400px; */
    margin-top: 15px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: center center;
    }
  }
`;
