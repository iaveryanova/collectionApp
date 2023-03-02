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
import ruMessages from "./shared/localizations/ru.json";
import enMessages from "./shared/localizations/en.json";
import { IntlProvider } from "react-intl";
import locales from "./shared/constants/locales"
import GlobalContext from "./shared/contexts/GlobalContext";
import localStorageKeys from "./shared/constants/localStorageKeys";


interface UserContextType {
  token: string;
  is_admin: boolean,
  setIsAdmin: (is_admin: boolean) => void;
  setToken: (token: string) => void;
}

export const UserContext = React.createContext<UserContextType | null>(null);

const messages = {
  [locales.EN]: enMessages,
  [locales.RU]: ruMessages,
}

export const App: React.FC = () => {

  const initToken = Cookies.get('token');
  const [token, setToken] = useState(initToken ? initToken : '');
  const isAdmin = localStorage.getItem('is_admin') ? true : false;
  const [is_admin, setIsAdmin] = useState(isAdmin);
  const [currentLocale, setCurrentLocale] = useState(
    localStorage.getItem(localStorageKeys.LOCALE || locales.EN)
  )

  let initColorMode = localStorage.getItem('colorMode') ?? 'light';


  useEffect(()=>{
    const initToken = Cookies.get('token');
    setToken(initToken ? initToken : '');
})


   // @ts-ignore
   const [mode, setMode] = React.useState<PaletteMode>(initColorMode);
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => {
          const newMode = prevMode === "light" ? "dark" : "light";
          localStorage.setItem('colorMode', newMode);
          return newMode;
        }
        );
      },
    }),
    []
  );

  const theme = React.useMemo(
    () => createTheme(mode === "light" ? lightTheme : darkTheme),
    [mode]
  );

  const setLocale = (value: string) => {
    setCurrentLocale(value);
    localStorage.setItem(localStorageKeys.LOCALE, value);

  }

  return (
    <GlobalContext.Provider value={ {
      //@ts-ignore
      currentLocale:currentLocale,
      setCurrentLocale: setLocale,
    } }>
      
      <IntlProvider 
      //@ts-ignore
      locale={currentLocale} 
      //@ts-ignore
      messages={messages[currentLocale]}>
      <UserContext.Provider value={ {token:token, is_admin:is_admin, setIsAdmin:setIsAdmin, setToken:setToken} }>
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
    </IntlProvider>
    </GlobalContext.Provider>
    
    
  );
}

export default App;
