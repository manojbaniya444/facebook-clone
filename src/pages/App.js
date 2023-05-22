import React from "react";
import { ThemeProvider } from "styled-components";
import { AppContextProvider } from "../context/context";
import Home from "./Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Protected from "../Protected";
import { ToastContainer } from "react-toastify";

const theme = {
  colors: {
    gray: "#f0f2f5",
    blue: " #2C82C9 ",
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
      {/* <AuthProvider> */}
      <ThemeProvider theme={theme}>
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
