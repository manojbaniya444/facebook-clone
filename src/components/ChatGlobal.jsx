import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { Avatar } from "@mui/material";
import {
  addDoc,
  collection,
  deleteDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  doc,
} from "firebase/firestore";
import { database } from "../firebaseConfig";
import { useAuthContext } from "../context/AuthContext";

//Component

const ChatGlobal = ({ setOpenChatModal }) => {
  const [messageInput, setMessageInput] = useState("");
  const [messageList, setMessageList] = useState();

  const inputRef = useRef(null);
  const chatRef = useRef(null);

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
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
    setMessageInput("");
  };

  // getting the message list from the firebase database

  useEffect(() => {
    //focus input
    if (!guestUser) {
      inputRef.current.focus();
    }
    const messageRef = collection(database, "globalchat");
    const q = query(messageRef, orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let messageSize = snapshot.size;
      // Deleting old messages
      if (messageSize > 30) {
        const numToDelete = messageSize - 30;
        const oldestMessages = snapshot.docs.slice(0, numToDelete);
        oldestMessages.forEach((document) => {
          const deleteRef = doc(database, "globalchat", `${document.id}`);
          deleteDoc(deleteRef);
        });
      }
      setMessageList(
        snapshot.docs.map((item) => ({ ...item.data(), id: item.id }))
      );
    });
    // Clean up function
    return () => {
      unsubscribe();
    };
  }, []);

  // Component

  return (
    <CGWrapper>
      <div className="container">
        <div className="top">
          <p className="title">
            Global Chat <br />
          </p>
          <div className="close-btn" onClick={() => setOpenChatModal(false)}>
            <CloseIcon />
          </div>
        </div>
        <p className="chat-notice">
          Attention! This global chat has a message limit of 30 chats. Any
          messages beyond this limit will be automatically deleted or rendered
          unavailable. Please keep this in mind when engaging in conversations
          and avoid spamming.
        </p>
        <hr />
        <div className="messages" ref={chatRef}>
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
                {user?.uid !== item?.userId && (
                  <Avatar
                    sx={{
                      width: 30,
                      height: 30,
                    }}
                    src={item?.photoURL}
                  />
                )}

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
    height: 70vh;
    padding: 10px;
    max-width: 500px;
    width: 75%;
    /* height: 70%; */
    background-color: red;
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 3;
    gap: 5px;
    top: 60px;
    /* left: 20px; */
    right: 20px;
    border-radius: 6px;
    background: #ffffff;
    box-shadow: 5px 5px 10px #666666, -5px -5px 10px #ffffff;
    .chat-notice {
      font-size: 0.7rem;
    }
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
        /* align-items: flex-end; */
        gap: 9px;
        margin-right: 5px;
        max-width: 50%;
        

        .name {
          font-size: 11px;
          font-weight: 800;
          margin-left: 5px;
        }
        .desc {
          word-spacing: 1px;
          font-size: 12px;
          background-color: ${({ theme }) => theme.colors.gray};
          padding: 9px;
          border-radius: 9px;
        }
      }
      .user-message {
        align-self: flex-end;
        text-align: center;
        .desc {
          background-color: ${({ theme }) => theme.colors.blue};
          color: white;
        }
      }
    }
    .top {
      padding: 5px;
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
        @media (min-width: ${({ theme }) => theme.responsive.tablet}) {
          display: none;
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
        font-size: 0.8rem;
        padding: 8px;
        /* margin-top: 5px; */
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
    @media (min-width: ${({ theme }) => theme.responsive.tablet}) {
      position: static;
      /* flex: 25%; */
      width: auto;
      height: 90vh;
      font-size: 10px;
    }
  }
`;

export default ChatGlobal;
