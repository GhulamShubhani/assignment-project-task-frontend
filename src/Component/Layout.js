import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Box, CssBaseline } from "@mui/material";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const Layout = ({ children,isName=false,name='' }) => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");



  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Title</title>
        <style>
          {`body {
            background: #F8FCFF;

          }`}
        </style>
      </Helmet>
      <CssBaseline />
      <Header isName={isName} name={name} />
      <Box sx={{px:2,}}>
        {children}
      </Box>
    </>
  );
};

export default Layout;
