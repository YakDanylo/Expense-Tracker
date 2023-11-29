import React,{createContext,useState,useEffect} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState({id:null,email:'',password:''})
    return (
    <AuthContext.Provider value={{user,setUser}}>
        {children}
    </AuthContext.Provider>
    )
}