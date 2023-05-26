import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { AppContextProvider } from "../context/context";
import Home from "./Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Protected from "../Protected";
import { ToastContainer } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";
import { DarkMode } from "@mui/icons-material";
import { darken } from "@mui/material";

const light = {
  colors: {
    gray: "#f0eef6", // background specific
    blue: "#6b4de6 ", // maincolor
    base: "#fff", //background
    darkgray: "#dbdee2", // hover
    icon: "#8b79d2", // icon color
    text: "black",
    invert: "white",
  },
  responsive: {
    mobile: "767px",
    tablet: "1023px",
  },
};
// theme
const white = {
  colors: {
    gray: "#f0f2f5", // background specific
    blue: " #0084ff ", // maincolor
    base: "#fff", //background
    darkgray: "#dbdee2", // hover
    icon: "black", // icon color
    text: "black",
  },
  responsive: {
    mobile: "767px",
    tablet: "1023px",
  },
};

const dark = {
  colors: {
    gray: "black", // background specific
    blue: "#6b4de6", // maincolor
    base: "#151221 ", //background
    darkgray: "white", // hover
    icon: "white", // icon color
    text: "white",
    invert: "black",
  },
  responsive: {
    mobile: "767px",
    tablet: "1023px",
  },
};

const dim = {
  colors: {
    gray: "#1f1b32", // background specific
    blue: "#6b4de6", // maincolor
    base: "#2a2442 ", //background
    darkgray: "white", // hover
    icon: "white", // icon color
    text: "white",
    invert: "black",
  },
  responsive: {
    mobile: "767px",
    tablet: "1023px",
  },
};

let isDark = false;

const App = () => {
  const { darkMode } = useAuthContext();

  return (
    <AppContextProvider>
      {/* <AuthProvider> */}
      <ThemeProvider theme={darkMode ? dark : light}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/home"
              element={
                <Protected>
                  <ToastContainer
                    position="top-center"
                    autoClose={500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                  />
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
