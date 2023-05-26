import { Avatar } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { useAuthContext } from "../context/AuthContext";

const StoryComponent = ({ username, profilesrc, imagesrc }) => {
  return (
    <SCWrapper>
      <div
        className="wrapper"
        style={{
          backgroundImage: `url(${imagesrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Avatar className="avatar" src={profilesrc} />
        <h4>{username}</h4>
      </div>
    </SCWrapper>
  );
};

const SCWrapper = styled.article`
  padding: 15px 9px;
  cursor: pointer;
  .wrapper {
    width: 120px;
    height: 200px;
    background-color: ${({ theme }) => theme.colors.gray};
    position: relative;
    border-radius: 13px;
    transition: 0.3s ease;
    &:hover {
      transform: scale(1.01);
    }
    .avatar {
      position: absolute;
      top: 10px;
      left: 10px;
      z-index: 3;
      border: 3px solid ${({ theme }) => theme.colors.blue};
    }
    h4 {
      position: relative;
      top: 78%;
      text-align: center;
      color: white;
      font-weight: 600;
      font-size: 1rem;
    }
    @media (max-width: ${({ theme }) => theme.responsive.mobile}) {
      width: 110px;
      height: 180px;
    }
  }
`;

export default StoryComponent;
