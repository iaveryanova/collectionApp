import React, { useEffect, useState } from "react";
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
import Cookies from 'js-cookie';




interface UserContextType {
  token: string;
  setToken: (token: string) => void;
}

export const UserContext = React.createContext<UserContextType | null>(null);

export const App: React.FC = () => {

  const initToken = Cookies.get('token');
  const [token, setToken] = useState(initToken ? initToken : '');

  useEffect(()=>{
    const initToken = Cookies.get('token');
    setToken(initToken ? initToken : '');
})


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
    <UserContext.Provider value={ {token:token, setToken:setToken} }>
    <ColorContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <BrowserRouter>
          <NavBar />
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </ColorContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
