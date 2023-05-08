import React from "react";
import styled from "styled-components";
import FacebookTop from "../components/FacebookTop";
import { ThemeProvider } from "styled-components";
import { AppContextProvider } from "../context/context";
import FacebookSideLeft from "../components/FacebookSideLeft";

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

          {/* sidebar--left */}
          <FacebookSideLeft />

          {/* middle--bar */}
          {/* Reels and stories */}
          {/* create--post */}
          {/* feeds */}

          {/* sidebar--right */}
        </AppWrapper>
      </ThemeProvider>
    </AppContextProvider>
  );
};

const AppWrapper = styled.main`
  height: 999px;
`;

export default App;
