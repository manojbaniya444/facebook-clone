import { Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { useAuthContext } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const { signIn, guestSignIn, guestUser } = useAuthContext();
  const navigate = useNavigate();

  const signInHandler = async () => {
    try {
      await signIn();
      navigate("/home");
    } catch (err) {
      console.log(err.message);
    }
  };

  const guestHandler = async () => {
    guestSignIn();
    navigate("/home");
  };
  return (
    <LWrapper>
      <div className="page">
        <div className="img">
          <p className="title">Social Site</p>
        </div>
        <button onClick={signInHandler}>Continue with google</button>
        <button className="guest-user" onClick={guestHandler}>
          Guest
        </button>
      </div>
      <div className="text">
        <Typography>
          <span>"Your Digital Social Hub"</span>
        </Typography>
      </div>
    </LWrapper>
  );
};

const LWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-top: 300px; */
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 9px;
  height: 100vh;
  .text {
    margin-top: 20px;
  }
  .page {
    border-radius: 9px;
    border-radius: 9px;
    border-radius: 9px;
    background: #ffffff;
    box-shadow: 5px 5px 10px #cfcfcf, -5px -5px 10px #ffffff;
    padding: 20px;
    /* height: 200px; */
    display: flex;
    flex-direction: column;
    .img {
      width: 100%;
      .title {
        font-size: 2.5rem;
        font-weight: 600;
        text-align: center;
        margin-bottom: 5px;
        color: #6b4de6;
      }
    }
    .guest-user {
      background-color: #f0eef6;
      margin-top: 15px;
      color: black;
      &:hover {
        background-color: #d7d4e1;
      }
    }
  }
  button {
    padding: 10px 20px;
    background-color: #6b4de6;
    border: none;
    border-radius: 3px;
    color: white;
    font-size: 1.3rem;
    cursor: pointer;
    &:hover {
      background-color: #5837de;
    }
  }
`;
export default Login;
