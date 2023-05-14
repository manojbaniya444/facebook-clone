import React, { useRef } from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { AppContextProvider } from "../context/context";
import Home from "./Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Protected from "../Protected";
import { AuthProvider } from "../context/AuthContext";
import { useAuthContext } from "../context/AuthContext";

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
  const { user } = useAuthContext();
  return (
    <AppContextProvider>
      {/* <AuthProvider> */}
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/home"
              element={
                <Protected>
                  <Home />
                </Protected>
              }
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
      {/* </AuthProvider> */}
    </AppContextProvider>
  );
};

export default App;
