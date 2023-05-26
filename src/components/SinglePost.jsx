import { Avatar, Typography } from "@mui/material";
import {
  arrayUnion,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { database } from "../firebaseConfig";
import { useAuthContext } from "../context/AuthContext";
import PublicIcon from "@mui/icons-material/Public";
import "react-toastify/dist/ReactToastify.css";
import CommentSection from "./CommentSection";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CircularProgress from "@mui/material/CircularProgress";

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
  likes,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showOptionModal, setShowOptionModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editvalue, setEditvalue] = useState(desc);
  const [isUpdating, setIsUpdating] = useState(false);
  const { user, guestUser } = useAuthContext();

  const Description = () => {
    const renderStyledText = () => {
      const regex = /(#\w+)/g;
      return desc.split(regex).map((part, index) => {
        if (part.startsWith("#")) {
          return (
            <span key={index} className="highlighted">
              {part}
            </span>
          );
        } else {
          return part;
        }
      });
    };
    return <div>{renderStyledText()}</div>;
  };

  // TODO:New like feature code

  useEffect(() => {
    // Checking if the user has liked the post or not
    const ref = doc(database, "posts", `${id}`);
    onSnapshot(ref, (doc) => {
      let data = doc.data()?.likes;
      if (data) {
        data.map((item) => {
          if (item.userID === user?.uid) {
            setLiked(true);
            return;
          }
        });
      }
    });
  }, []);
  // Like button handler

  const likeHandler = async () => {
    if (liked) {
      const ref = doc(database, "posts", `${id}`);
      let newLikeList = likes.filter((item) => item.userID != user?.uid);
      await updateDoc(ref, {
        likes: newLikeList,
      });
      setLiked(false);
    } else {
      setLiked(true);
      const likesRef = doc(database, "posts", `${id}`);
      await updateDoc(likesRef, {
        likes: arrayUnion({
          userID: user?.uid,
          username: user?.displayName,
        }),
      });
    }
  };

  // console.log(liked);
  // console.log(totalLikes);

  //New Feature end

  const deletePostHandler = () => {
    setModalOpen(true);
  };
  const editPostHandler = (e) => {
    e.preventDefault();
    setEditModalOpen(true);
    setShowOptionModal(false);
  };

  const deleteHandler = async () => {
    const postRef = doc(database, "posts", id);
    await deleteDoc(postRef);
    setModalOpen(false);
  };
  const editHandler = async (e) => {
    e.preventDefault();
    const docRef = doc(database, "posts", `${id}`);
    if (editvalue === "" || editvalue === desc) {
      setEditModalOpen(false);
      return;
    }
    setIsUpdating(true);
    await updateDoc(docRef, {
      caption: editvalue,
    });
    setIsUpdating(false);
    setEditModalOpen(false);
  };
  const discardHandler = () => {
    setEditModalOpen(false);
    setEditvalue(desc);
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
        {editModalOpen && (
          <EditModal>
            {isUpdating ? (
              <CircularProgress />
            ) : (
              <>
                <input
                  value={editvalue}
                  onChange={(e) => setEditvalue(e.target.value)}
                />
                <div className="btn-container">
                  <button className="discard-btn" onClick={discardHandler}>
                    Discard
                  </button>
                  <button className="edit-btn" onClick={editHandler}>
                    Confirm
                  </button>
                </div>
              </>
            )}
          </EditModal>
        )}

        {/* Post Modal */}

        <Avatar src={profilesrc} />
        <div className="title">
          <h4 className="username">{username}</h4>
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

        {!guestUser && userID === user?.uid && (
          <>
            <div
              className="options-bar"
              onClick={() => setShowOptionModal(!showOptionModal)}
            >
              <MoreVertIcon />
            </div>
            {showOptionModal && (
              <div className="modalbar">
                <div onClick={deletePostHandler}>
                  <DeleteIcon />
                  Delete post
                </div>
                <div onClick={editPostHandler}>
                  <EditIcon />
                  Edit post
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <div className="description">
        {/* <Typography variant="body1">{desc}</Typography> */}
        <Typography variant="body1" component="div">
          <Description />
        </Typography>
      </div>
      {/* <div className="image">{src !== "" && <img src={src} alt="/" />}</div> */}
      {src !== "" && (
        <div className="image">
          <img src={src} alt="" />
        </div>
      )}

      {/* // Display total numbers of likes and comments */}
      {!timeSpecial && (
        <div className="display-like-comment-count">
          <p>
            {likes?.length} likes and {comments?.length} comments
          </p>
        </div>
      )}
      {/* Comment Section */}
      {!timeSpecial && <hr />}

      <div className="Feed-bottom">
        {/* This timespecial is for the special post from the dev at the top of the feed where comment is disabled */}

        {/* //Like button */}
        {!timeSpecial && guestUser === null && (
          <button
            className={`${liked ? "active-like-btn" : "like-btn"}`}
            onClick={likeHandler}
          >
            <ThumbUpIcon />
            Like
          </button>
        )}

        {/* // Comment button */}
        {!timeSpecial && guestUser === null && (
          <button onClick={() => setShowComment(!showComment)}>
            <ChatBubbleIcon />
            {showComment ? "Hide Comment" : "Comment"}
          </button>
        )}
        {/* //Share button */}
        {!timeSpecial && guestUser === null && (
          <button className="share-btn">
            <ShareIcon />
            Share
          </button>
        )}
      </div>
      {!timeSpecial && showComment && (
        <CommentSection id={id} commentList={comments} />
      )}
    </SWrapper>
  );
};

const EditModal = styled.div`
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.base};
  /* TODO: dark mode elevation */
  box-shadow: 18px -18px 35px #e0e0e0, -18px 18px 35px #ffffff;
  position: absolute;
  width: 300px;
  z-index: 3;
  top: 0;
  padding: 15px;
  input {
    outline: none;
    border: none;
    width: 100%;
    border-radius: 9px;
    height: 35px;
    background-color: ${({ theme }) => theme.colors.gray};
    padding: 0.5rem;
  }

  .btn-container {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    gap: 1rem;
    button {
      border: none;
      border-radius: 5px;
      padding: 5px 10px;
      flex: 30%;
      background-color: white;
      cursor: pointer;
      &:hover {
        background-color: ${({ theme }) => theme.colors.gray};
      }
    }
    .edit-btn {
      background-color: ${({ theme }) => theme.colors.blue};
      color: white;
      &:hover {
        background-color: #086390;
      }
    }
  }
`;
const Modal = styled.div`
  position: absolute;
  z-index: 10;
  background-color: ${({ theme }) => theme.colors.gray};
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
      border-radius: 5px;
      font-size: 1.2rem;
      &:hover {
        background-color: ${({ theme }) => theme.colors.base};
      }
    }

    .btn2 {
      padding: 5px 10px;
      border: none;
      background-color: ${({ theme }) => theme.colors.blue};
      color: white;
      border-radius: 5px;
      font-size: 1.2rem;
      cursor: pointer;
    }
  }
`;

const SWrapper = styled.article`
  color: ${({ theme }) => theme.colors.text};
  width: 100%;
  background-color: ${({ theme }) => theme.colors.base};
  margin-top: 15px;
  border-radius: 20px;
  position: relative;
  padding-bottom: 10px;
  .modalbar {
    position: absolute;
    background-color: white;
    top: 20px;
    right: 40px;
    display: flex;
    flex-direction: column;
    z-index: 2;
    border-radius: 0px;
    background: ${({ theme }) => theme.colors.base};
    box-shadow: 11px -11px 22px #ebebeb, -11px 11px 22px #ffffff;
    div {
      padding: 5px 10px;
      width: 140px;
      cursor: pointer;
      display: flex;
      gap: 5px;
      &:hover {
        background-color: ${({ theme }) => theme.colors.gray};
      }
    }
  }
  .options-bar {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 3px;
    border-radius: 5px;
    position: relative;
    .MuiSvgIcon-root {
      color: ${({ theme }) => theme.colors.icon};
    }
    &:hover {
      background-color: ${({ theme }) => theme.colors.gray};
    }
  }

  .toast {
    position: absolute;
    top: 0;
  }
  .display-like-comment-count {
    p {
      margin-left: 20px;
      padding: 5px 0;
      font-weight: 400;
      font-size: 1rem;
    }
  }
  .Feed-bottom {
    /* TODO: Code */
    display: flex;
    margin-top: 5px;
    justify-content: center;
    gap: 0.3rem;
    padding: 10px 0;
    .active-like-btn {
      color: ${({ theme }) => theme.colors.blue};
    }
    button {
      padding: 0.7rem 1rem;
      border: none;
      flex-basis: 31%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: gray;
      gap: 0.3rem;
      background-color: ${({ theme }) => theme.colors.base};
      cursor: pointer;
      border-radius: 5px;
      font-size: 1.1rem;
      font-weight: 400;
      &:hover {
        background-color: ${({ theme }) => theme.colors.gray};
      }
    }
  }
  .Feed-top {
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    .title {
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      flex: 1;
      gap: 0.2rem;
      font-family: "Noto Sans", sans-serif;
      .username {
        font-weight: 900;
      }
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

  // Uploaded image styling

  .description {
    padding: 7px 15px;
    color: ${({ theme }) => theme.colors.text};
    .highlighted {
      color: ${({ theme }) => theme.colors.blue};
      font-weight: 700;
    }
  }
  .image {
    width: 100%;
    height: 400px;
    padding: 0 20px;
    margin-top: 15px;
    img {
      border-radius: 20px;
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: center center;
    }
  }
`;
