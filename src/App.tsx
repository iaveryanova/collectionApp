import React from "react";
import AppRoutes from "./components/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import {
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
} from "@mui/material";
// import { appTheme } from "./themes/theme";
import { darkTheme } from "./themes/dark";
import { lightTheme } from "./themes/light";
import { ColorContext } from "./ColorContext";
import SwitchModeButton from "./components/SwitchModeButton";

function App() {
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );

  const theme = React.useMemo(
    () => createTheme(mode === "light" ? lightTheme : darkTheme),
    [mode]
  );

  return (
    <ColorContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <BrowserRouter>
          <NavBar />
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </ColorContext.Provider>
  );
}

export default App;
