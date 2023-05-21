import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { Avatar } from "@mui/material";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { database } from "../firebaseConfig";
import { useAuthContext } from "../context/AuthContext";

//Component

const ChatGlobal = ({ setOpenChatModal }) => {
  const [messageInput, setMessageInput] = useState("");
  const [messageList, setMessageList] = useState();

  const inputRef = useRef(null);

  console.log(messageList);

  const { user, guestUser } = useAuthContext();

  // Messing sending button function

  const sendMessageHandler = async () => {
    const messageRef = collection(database, "globalchat");
    if (messageInput === "") {
      return;
    }
    await addDoc(messageRef, {
      userName: user?.displayName,
      userId: user?.uid,
      photoURL: user?.photoURL,
      desc: messageInput,
      timestamp: serverTimestamp(),
    });
    setMessageInput("");
  };

  // getting the message list from the firebase database

  useEffect(() => {
    //focus input
    if (!guestUser) {
      inputRef.current.focus();
    }
    console.log("once");
    const messageRef = collection(database, "globalchat");
    const q = query(messageRef, orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessageList(
        snapshot.docs.map((item) => ({ ...item.data(), id: item.id }))
      );
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Component

  return (
    <CGWrapper>
      <div className="container">
        <div className="top">
          <p className="title">Global Chat</p>
          <div className="close-btn" onClick={() => setOpenChatModal(false)}>
            <CloseIcon />
          </div>
        </div>
        <hr />
        <div className="messages">
          {/* All messages list  */}

          {messageList?.map((item, index) => {
            return (
              <div
                className={`${
                  user?.uid === item.userId
                    ? "single-message user-message"
                    : "single-message"
                }`}
                key={index}
              >
                {user?.uid !== item?.userId && <Avatar src={item?.photoURL} />}

                <div className="mes">
                  {user?.uid !== item?.userId && (
                    <p className="name">{item?.userName}</p>
                  )}

                  <p className="desc">{item?.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
        {/* //Message list div end */}
        {/* // Message send div */}
        <div className="send-message">
          <input
            value={messageInput}
            ref={inputRef}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <button onClick={sendMessageHandler}>
            <SendIcon />
          </button>
        </div>
        {/* // Message send div end */}
      </div>
    </CGWrapper>
  );
};

const CGWrapper = styled.section`
  font-family: "Roboto Condensed", sans-serif;
  .container {
    height: 90vh;
    padding: 10px;
    width: 400px;
    background-color: red;
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 3;
    top: 60px;
    right: 20px;
    border-radius: 6px;
    background: #ffffff;
    box-shadow: 5px 5px 10px #666666, -5px -5px 10px #ffffff;
    .messages {
      overflow-y: scroll;
      margin-top: 10px;
      flex: 80%;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      h3 {
        font-size: 2rem;
      }

      .single-message {
        display: flex;
        align-items: flex-end;
        gap: 9px;
        margin-right: 5px;
        .name {
          font-size: 1rem;
          font-weight: 400;
          margin-left: 5px;
        }
        .desc {
          word-spacing: 1px;
          font-size: 1.1rem;
          background-color: ${({ theme }) => theme.colors.gray};
          padding: 10px;
          border-radius: 9px;
        }
      }
      .user-message {
        align-self: flex-end;
        .desc {
          background-color: ${({ theme }) => theme.colors.blue};
          color: white;
        }
      }
    }
    .top {
      padding: 10px;
      display: flex;
      align-items: center;
      flex: 5%;
      justify-content: space-between;
      .close-btn {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 4px;
        cursor: pointer;
        border-radius: 3px;
        &:hover {
          background-color: ${({ theme }) => theme.colors.gray};
        }
      }
      .title {
        font-size: 1.7rem;
        flex-basis: 90%;
      }
    }
    .send-message {
      display: flex;
      flex: 10%;
      align-items: center;
      gap: 5px;
      input {
        flex: 2;
        border: none;
        outline: none;
        font-size: 1.3rem;
        padding: 5px;
        background-color: ${({ theme }) => theme.colors.gray};
        border-radius: 9px;
      }
      button {
        color: ${({ theme }) => theme.colors.blue};
        border: none;
        border-radius: 5px;
        background-color: white;
        cursor: pointer;
        padding: 5px 10px;
        &:hover {
          background-color: ${({ theme }) => theme.colors.gray};
        }
      }
    }
  }
`;

export default ChatGlobal;
