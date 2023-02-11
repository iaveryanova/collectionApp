import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, useNavigate } from "react-router-dom";
import SwitchModeButton from "./SwitchModeButton";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            onClick={() => navigate("")}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Home page
          </Typography>

          <Button color="inherit" onClick={() => navigate("auth")}>
            Login
          </Button>
          <Button color="inherit" onClick={() => navigate("personal")}>
            Personal Page
          </Button>
          <Button color="inherit" onClick={() => navigate("collectionpage")}>
            My collections
          </Button>
          <Button color="inherit" onClick={() => navigate("")}>
            Logout
          </Button>
          <SwitchModeButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;


