import { View,Text } from "react-native";
import { useState,useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import NavigatorBottom from "./NavigatorBottom";
import Authentification from "../screens/Authentification";
import { StatusBar } from "expo-status-bar";
import { ThemeContext } from "../context/ThemeContext";
function AppNav()
{
    const {user} = useContext(AuthContext)
    const {theme} = useContext(ThemeContext)
    return (
        <NavigationContainer>
        <StatusBar style={theme.primary=="#F2F2F2"?"dark":'light'}/>
        {user._id?<NavigatorBottom/>:<Authentification ></Authentification>}
      </NavigationContainer>  
    )
}

export default AppNav