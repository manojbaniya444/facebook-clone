import React from "react";
import styled from "styled-components";
import FacebookSideLeft from "../components/FacebookSideLeft";
import FacebookMiddle from "../components/FacebookMiddle";
import FacebookSideRight from "../components/FacebookSideRight";
import FacebookTop from "../components/FacebookTop";

const Home = () => {
  return (
    <>
      <FacebookTop />
      <MainContentWrapper>
        <FacebookSideLeft />
        <FacebookMiddle />
        <FacebookSideRight />
      </MainContentWrapper>
    </>
  );
};

const MainContentWrapper = styled.main`
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: space-between; */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-top: 20px;
  @media (max-width: ${({ theme }) => theme.responsive.mobile}) {
    display: flex;
    justify-content: center;
  }

  @media (min-width: ${({ theme }) => theme.responsive.mobile}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: ${({ theme }) => theme.responsive.tablet}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export default Home;
