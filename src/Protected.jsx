import React from "react";
import { useAuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { Audio } from "react-loader-spinner";

const Protected = ({ children }) => {
  const { user, loading } = useAuthContext();
  if (loading) {
    return (
      <Loading>
        <h3>Loading page please wait...</h3>
        <Audio
          height="80"
          width="80"
          radius="9"
          color="#1876f2"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
      </Loading>
    );
  }
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 100px;
  h3 {
    text-align: center;
    margin-top: 20px;
    color: ${({ theme }) => theme.colors.blue};
    font-weight: 600;
    font-size: 1.4rem;
  }
`;

export default Protected;
