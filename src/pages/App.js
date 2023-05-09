import React from "react";
import styled from "styled-components";
import FacebookTop from "../components/FacebookTop";
import { ThemeProvider } from "styled-components";
import { AppContextProvider } from "../context/context";
import FacebookSideLeft from "../components/FacebookSideLeft";
import FacebookMiddle from "../components/FacebookMiddle";

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
          {/* Facebook-top */}
          <FacebookTop />

          <MainContentWrapper>
            {/* sidebar--left */}
            {/* <FacebookSideLeft /> */}

            {/* middle--bar */}
            <FacebookMiddle />
            {/* Reels and stories */}
            {/* create--post */}
            {/* feeds */}

            {/* sidebar--right */}
          </MainContentWrapper>
        </AppWrapper>
      </ThemeProvider>
    </AppContextProvider>
  );
};

const AppWrapper = styled.main`
  height: 999px;
`;

const MainContentWrapper = styled.main`

display: flex;
align-items: center;
justify-content: center;
margin-top: 20px;

`;

export default App;
