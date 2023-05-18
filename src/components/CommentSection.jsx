import { Avatar, Typography } from "@mui/material";
import {
  addDoc,
  arrayUnion,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuthContext } from "../context/AuthContext";
import { database } from "../firebaseConfig";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// Function

function CommentSection({ id, commentList }) {
  const [comment, setComment] = useState("");

  const { user } = useAuthContext();

  // Set the comment to the database

  const postCommentHandler = async (e) => {
    e.preventDefault();
    const docRef = doc(database, "posts", `${id}`);
    await updateDoc(docRef, {
      comments: arrayUnion({
        commentUser: user?.displayName,
        userID: user?.uid,
        userPhotoURL: user?.photoURL,
        comment: comment,
      }),
    });
    setComment("");
  };

  //Fetch the comments from the database

  //   useEffect(() => {
  //     const unsubscribe = async () => {
  //       const docRef = doc(database, "posts", `${id}`);
  //       onSnapshot(docRef, (snapshot) => {
  //         console.log(snapshot.data()?.comments);
  //       });
  //     };
  //     return () => {
  //       unsubscribe();
  //     };
  //   }, []);

  return (
    <CSWrapper>
      {/* // Post comment */}
      <div className="comment-form">
        <input
          placeholder="Write a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit" onClick={postCommentHandler}>
          comment
        </button>
      </div>
      <hr />
      {/* // Render Comment List */}
      <div className="comment-display">
        {commentList?.map((item, index) => {
          return (
            <div className="each-comment" key={index}>
              <Avatar src={item?.userPhotoURL} sx={{ width: 30, height: 30 }} />
              <div className="content">
                <Typography variant="body1" className="name">
                  {item?.commentUser}
                </Typography>
                <Typography variant="body2" className="comment">
                  {item?.comment}
                </Typography>
              </div>
            </div>
          );
        })}
      </div>
      <div className="more-comments">
        <ArrowDropDownIcon sx={{ fontSize: 30 }} />
      </div>

      <hr />
    </CSWrapper>
  );
}

const CSWrapper = styled.div`
  background-color: white;

  .more-comments {
    display: none;
    @media (min-height: 500px) {
      display: block;
    }
  }
  .comment-form {
    display: flex;
    margin-top: 5px;
    gap: 1rem;
    padding: 10px;
    input {
      flex: 1;
      padding: 0.4rem 0.9rem;
      font-size: 1.1rem;
      border: none;
      outline: none;
      background-color: ${({ theme }) => theme.colors.gray};
      border-radius: 5px;
    }
    button {
      padding: 0.4rem 0.9rem;
      height: 30px;
      font-size: 1rem;
      background-color: ${({ theme }) => theme.colors.blue};
      border: none;
      color: white;
      cursor: pointer;
      border-radius: 5px;
      &:hover {
        background-color: #09499c;
      }
    }
  }

  .comment-display {
    padding: 10px 10px 5px 10px;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 0.7rem;
    max-height: 300px;
    overflow-y: scroll;
    gap: 1rem;
    &::-webkit-scrollbar {
      display: none;
    }
    .each-comment {
      display: flex;
      align-items: start;
      gap: 1rem;
      /* background-color: white; */
      .content {
        background-color: ${({ theme }) => theme.colors.darkgray};
        padding: 5px;
        border-radius: 9px;
      }
      .name {
        font-size: 1rem;
        font-weight: 600;
      }
      .comment {
        margin-top: 5px;
        font-weight: 400;
      }
    }
  }
`;

export default CommentSection;
