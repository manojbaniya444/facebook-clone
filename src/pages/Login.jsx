import { Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { useAuthContext } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const { signIn } = useAuthContext();
  const navigate = useNavigate();

  const signInHandler = async () => {
    try {
      await signIn();
      navigate("/home");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <LWrapper>
      <Typography variant="h3">Facebook</Typography>
      <button onClick={signInHandler}>Continue with google</button>
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
  height: 100vh;
  button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #1876f2;
    border: none;
    border-radius: 3px;
    color: white;
    font-size: 1.3rem;
    cursor: pointer;
    &:hover {
      background-color: #073255;
    }
  }
`;
export default Login;
