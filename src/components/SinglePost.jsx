import { Avatar, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";

export const SinglePost = ({ src, desc }) => {
  return (
    <SWrapper>
      <div className="Feed-top">
        <Avatar />
        <div className="title">
          <h4>Manoj Baniya</h4>
          <p>5h .&#x1F310;</p>
        </div>
      </div>
      <div className="description">
        <Typography variant="body1">{desc}</Typography>
      </div>
      <div className="image">
        <img src={src} alt="/" />
      </div>
      <div className="Feed-bottom">
        <h4>1 like</h4>
        <div className="like">
          <button>Like</button>
        </div>
      </div>
    </SWrapper>
  );
};

const SWrapper = styled.article`
  width: 100%;
  background-color: white;
  margin-top: 15px;
  border-radius: 9px;
  .Feed-bottom {
    padding: 15px;
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
    .title {
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }
  }
  .description {
    padding: 7px 15px;
  }
  .image {
    width: 100%;
    margin-top: 15px;
    img {
      width: 100%;
      object-fit: cover;
      position: center center;
    }
  }
`;