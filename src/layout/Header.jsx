import React from "react";
import { IconButton, Typography, Toolbar, AppBar, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Colors } from "../components/Colors";

const Header = ({ handleDrawerToggle, drawerWidth }) => {
  return (
    <div className="appbar">
      <AppBar
        position="fixed"
        sx={{
          width: { md: `100%` },
          ml: { md: `${drawerWidth}` },
          height: "68px",
          background: Colors.primary,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              className="header_word"
            >
              <span style={{ textTransform: "capitalize" }}>
                My Expense Tracker
              </span>
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
