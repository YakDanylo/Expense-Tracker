import React,{createContext,useState,useEffect} from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({children}) => {
    const [language,setLanguage] = useState("ua")
    return (
    <LanguageContext.Provider value={{language,setLanguage}}>
        {children}
    </LanguageContext.Provider>
    )
}