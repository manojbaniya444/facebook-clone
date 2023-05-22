import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import GroupsIcon from "@mui/icons-material/Groups";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import AppsIcon from "@mui/icons-material/Apps";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Avatar, IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import SearchModal from "./SearchModal";
import { useAppContext } from "../context/context";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ChatGlobal from "./ChatGlobal";

function FacebookTop() {
  const [openChatModal, setOpenChatModal] = useState(false);
  const { showModal, setShowModal } = useAppContext();

  const { user, signout, setGuestUser, guestUser } = useAuthContext();
  let url = user?.photoURL;

  const navigate = useNavigate();

  const logOut = async () => {
    if (guestUser === "Guest") {
      setGuestUser(null);
      navigate("/");
    } else {
      await signout();
      // navigate("/");
    }
  };
  // Chat open handler

  const openChatHandler = () => {
    setOpenChatModal(!openChatModal);
    window.scrollTo({
      top: 0,
    });
  };
  return (
    <>
      <SearchModal />
      <div className="chat-box-mobile">
        {openChatModal && !guestUser && (
          <ChatGlobal setOpenChatModal={setOpenChatModal} />
        )}
      </div>

      <FTWrapper>
        {/* TODO: Search and logo */}
        <div className="FT-left">
          <img src="./logo.jpeg" alt="facebook-logo" />

          <div className="search" onClick={() => setShowModal(true)}>
            <SearchIcon />
            <input placeholder="Search" />
          </div>
        </div>

        {/* TODO:middle four icons */}
        <div className="FT-middle">
          <Tooltip title="Home" placement="bottom">
            <div className="icon-box icon-box-active">
              <HomeIcon />
            </div>
          </Tooltip>

          <Tooltip title="Marketplace" placement="bottom">
            <div className="icon-box">
              <AddBusinessIcon />
            </div>
          </Tooltip>

          <Tooltip title="Groups" placement="bottom">
            <div className="icon-box">
              <GroupsIcon />
            </div>
          </Tooltip>

          <Tooltip title="Gaming" placement="bottom">
            <div className="icon-box">
              <SportsEsportsIcon />
            </div>
          </Tooltip>
        </div>

        {/*TODO: right side 4 options profile messenger notification */}
        <div className="FT-right">
          <Tooltip title="Menu" placement="bottom">
            <div className="option-box">
              <AppsIcon />
            </div>
          </Tooltip>
          <Tooltip title="Chat" placement="bottom">
            <div
              className={`${
                openChatModal
                  ? "option-box active-chat chat-btn"
                  : "option-box chat-btn"
              }`}
            >
              <IconButton onClick={openChatHandler}>
                <ChatBubbleIcon />
              </IconButton>
            </div>
          </Tooltip>

          <Tooltip title="Notifications" placement="bottom">
            <div className="option-box">
              <NotificationsIcon />
            </div>
          </Tooltip>

          <Tooltip title="Logout">
            <div className="option-box" onClick={logOut}>
              {guestUser === "Guest" ? (
                <Avatar />
              ) : (
                <Avatar
                  // src="https://scontent.fbir1-1.fna.fbcdn.net/v/t39.30808-1/285655908_3373164079578086_2980410443097564711_n.jpg?stp=dst-jpg_s480x480&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_ohc=CsjaHNzkrfcAX9MO7w5&_nc_ht=scontent.fbir1-1.fna&oh=00_AfBJS6qJ7hYvGhQ3yOFz6t5Qej20EWXzDKu-GMuY5IFhRQ&oe=645E5273"
                  src={url}
                  sx={{ height: 40, width: 40 }}
                />
              )}
            </div>
          </Tooltip>
        </div>
      </FTWrapper>
    </>
  );
}

const FTWrapper = styled.div`
  //Padding side 20px
  position: sticky;
  top: 0;
  z-index: 9;
  display: flex;
  background-color: white;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
  box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.25);
  /* left part css */
  .FT-left {
    display: flex;
    /* padding: 5px 10px; */

    img {
      height: 40px;
      width: 40px;
      border-radius: 999px;
      cursor: pointer;
      margin-right: 5px;
    }
    //search modal
    .search-modal {
      position: absolute;
      z-index: 99;
      top: 0px;
      left: 0px;
      background-color: white;
      height: 400px;
      padding: 5px 20px;
      border-radius: 9px;
      box-shadow: 1px 1px 21px -9px rgba(0, 0, 0, 0.5);
      .search-box {
        display: flex;
        align-items: center;
        cursor: pointer;
        .icon {
          height: 40px;
          width: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          &:hover {
            background-color: #e4e6eb;
          }
          .MuiSvgIcon-root {
            color: gray;
            font-size: 30px;
          }
        }

        .input {
          display: block;
          outline-width: none;
          border: none;
          background-color: ${({ theme }) => theme.colors.gray};
          font-size: 1.3rem;
          padding: 0.9rem 1rem;
          /* height: 30px; */
          border-radius: 999px;
          margin: 5px;
        }
      }
      @media (min-width: ${({ theme }) => theme.responsive.tablet}) {
        display: none;
      }
    }
    //search Modal finished
    .search {
      background-color: ${({ theme }) => theme.colors.gray};
      display: flex;
      align-items: center;
      border-radius: 999px;
      padding: 5px 10px;
      /* margin-left: 6px; */
      input {
        outline-width: none;
        border: none;
        background-color: ${({ theme }) => theme.colors.gray};
        font-size: 16px;
        padding: 5px 0;
        display: none;
        margin-left: 5px;
      }
      input:focus {
        outline: none;
        border: none;
      }
    }

    @media (min-width: ${({ theme }) => theme.responsive.tablet}) {
      .search {
        input {
          display: block;
        }
      }
    }
  }
  //Middle Div Style
  .FT-middle {
    display: flex;
    flex: 1;
    align-items: center;
    gap: 6px;
    /* margin-left: 110px; */
    justify-content: center;
    padding: 5px 0;
    /* width: 100%;
    max-width: 480px; */
    .icon-box {
      padding: 0.5rem 2.5rem;
      border-radius: 9px;
      /* width: 100%;
      max-width: 3=0px; */
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      &:hover {
        background-color: ${({ theme }) => theme.colors.gray};
      }
      @media (max-width: ${({ theme }) => theme.responsive.tablet}) {
        padding: 0.5rem 1rem;
        .MuiSvgIcon-root {
          /* font-size: 20px; */
        }
      }
    }
    .icon-box-active {
      position: relative;
      &:hover {
        background-color: white;
      }
      .MuiSvgIcon-root {
        color: ${({ theme }) => theme.colors.blue};
      }
    }
    .icon-box-active::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 3px;
      background-color: ${({ theme }) => theme.colors.blue};
      bottom: -5px;
      left: 0;
    }
    .MuiSvgIcon-root {
      font-size: 30px;
      color: gray;
    }
    @media (max-width: ${({ theme }) => theme.responsive.mobile}) {
      display: none;
    }
  }

  //Right div css
  .FT-right {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    gap: 0.4rem;
    padding: 5px 0;
    .active-chat {
      .MuiSvgIcon-root {
        color: ${({ theme }) => theme.colors.blue};
      }
    }
    .option-box {
      height: 40px;
      width: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background-color: ${({ theme }) => theme.colors.gray};
      border-radius: 999px;

      &:hover {
        background-color: #e4e6eb;
      }
    }
    .chat-btn {
      @media (min-width: ${({ theme }) => theme.responsive.tablet}) {
        display: none;
        background-color: ${({ theme }) => theme.colors.blue};
      }
    }
  }
`;

export default FacebookTop;
