import { Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        margin: "20vh auto",
      }}
    >
      <h1>404</h1>
      <p>This page does not exist</p>
      <Link to={"/"}>Back to Home</Link>
    </Box>
  );
};

export default Error404;
