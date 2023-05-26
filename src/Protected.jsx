import React from "react";
import { useAuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { Audio } from "react-loader-spinner";

const Protected = ({ children }) => {
  const { user, loading, guestUser } = useAuthContext();

  if (loading) {
    return (
      <Loading>
        <h3>Loading page please wait...</h3>
        <Audio
          height="80"
          width="80"
          radius="9"
          color="#6b4de6"
          ariaLabel="loading"
        />
      </Loading>
    );
  }
  if (guestUser) {
    return children;
  }
  if (!user) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

const Loading = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  padding-top: 4rem;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.gray};
  h3 {
    text-align: center;
    margin-top: 20px;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
    font-size: 1.4rem;
  }
`;

export default Protected;
