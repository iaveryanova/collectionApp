
import { Box, IconButton, useTheme } from "@mui/material";
import DarkIcon from "@mui/icons-material/Brightness4";
import LightIcon from "@mui/icons-material/Brightness7";
import React from "react";
import { ColorContext } from "../ColorContext";


const SwitchModeButton: React.FC = () => {
    const theme = useTheme();
  const colorMode = React.useContext(ColorContext);
  return (
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? <LightIcon /> : <DarkIcon />}
      </IconButton>
    // </Box>
  )
}

export default SwitchModeButton