import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FacebookSideLeft from "../components/FacebookSideLeft";
import FacebookMiddle from "../components/FacebookMiddle";
import FacebookTop from "../components/FacebookTop";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import FacebookSideRight from "../components/FacebookSideRight";

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
      {isVisible && (
        <Button onClick={scrollToTop}>
          <ArrowUpwardIcon />
        </Button>
      )}
      <FacebookTop />
      <MainContentWrapper>
        <FacebookSideLeft />
        <FacebookMiddle />
        <FacebookSideRight />
      </MainContentWrapper>
    </>
  );
};
const Button = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #d9d5d5;
  /* background-color: black; */
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 9999;
`;

const MainContentWrapper = styled.main`
  padding-top: 20px;
  min-height: (calc(100vh - 51px));
  display: flex;
  align-items: start;
  gap: 1rem;
  background-color: ${({ theme }) => theme.colors.gray};
  transition: all 0.3s ease;
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
