import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FacebookSideLeft from "../components/FacebookSideLeft";
import FacebookMiddle from "../components/FacebookMiddle";
import FacebookSideRight from "../components/FacebookSideRight";
import FacebookTop from "../components/FacebookTop";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <FacebookTop />
      {isVisible && (
        <Button onClick={scrollToTop}>
          <ArrowUpwardIcon />
        </Button>
      )}
      <MainContentWrapper>
        <FacebookSideLeft />
        <FacebookMiddle />
        <FacebookSideRight />
      </MainContentWrapper>
    </>
  );
};
const Button = styled.div`
  position: fixed;
  bottom: 30px;
  right: 20px;
  background-color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const MainContentWrapper = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-top: 20px;
  @media (max-width: ${({ theme }) => theme.responsive.mobile}) {
    display: flex;
    justify-content: center;
  }

  @media (min-width: ${({ theme }) => theme.responsive.mobile}) {
    display: flex;
    justify-content: center;
  }

  @media (min-width: ${({ theme }) => theme.responsive.tablet}) {
    display: flex;
    justify-content: space-between;
  }
`;

export default Home;
