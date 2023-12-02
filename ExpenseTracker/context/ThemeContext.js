import React,{createContext,useState,useEffect} from 'react';
import { darkThemeColors } from '../constants/darkThemeColors';
import { whiteThemeColors } from '../constants/whiteThemeColors';
export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
    const [theme,setTheme] = useState(whiteThemeColors)
    function changeTheme()
    {
        if(theme === darkThemeColors)
        {
            setTheme(whiteThemeColors)
        }
        else
        {
            setTheme(darkThemeColors)
        }
    }
    return (
    <ThemeContext.Provider value={{theme,changeTheme}}>
        {children}
    </ThemeContext.Provider>
    )
}