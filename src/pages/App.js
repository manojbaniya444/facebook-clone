import React, { useRef } from "react";
import styled from "styled-components";
import FacebookTop from "../components/FacebookTop";
import { ThemeProvider } from "styled-components";
import { AppContextProvider } from "../context/context";
import FacebookSideLeft from "../components/FacebookSideLeft";
import FacebookMiddle from "../components/FacebookMiddle";
import FacebookSideRight from "../components/FacebookSideRight";

const theme = {
  colors: {
    gray: "#f0f2f5",
    blue: "#1876f2 ",
    darkgray: "#dbdee2",
  },
  responsive: {
    mobile: "767px",
    tablet: "1023px",
  },
};

const App = () => {
  return (
    <AppContextProvider>
      <ThemeProvider theme={theme}>
        <AppWrapper>
          {/* //full */}
          <FacebookTop />
          {/* //middle */}
          <MainContentWrapper>
            <FacebookSideLeft />
            <FacebookMiddle />
            <FacebookSideRight />
          </MainContentWrapper>
          {/* //middle end */}
        </AppWrapper>
        {/* //end full */}
      </ThemeProvider>
    </AppContextProvider>
  );
};

const AppWrapper = styled.main`
  /* height: 999px; */
`;

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

  @media (min-width: ${({theme})=> theme.responsive.mobile}){
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: ${({theme})=> theme.responsive.tablet}){
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export default App;
