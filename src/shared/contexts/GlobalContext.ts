import { createContext } from "react";
import locales from "../constants/locales";

const GlobalContext = createContext({
    currentLocale: locales.EN,
})

export default GlobalContext; 