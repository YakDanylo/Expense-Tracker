import { View,Text } from "react-native";
import { useState,useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import NavigatorBottom from "./NavigatorBottom";
import Authentification from "../screens/Authentification";
function AppNav()
{
    const {user} = useContext(AuthContext)
    return (
        <NavigationContainer>
        {user._id?<NavigatorBottom/>:<Authentification ></Authentification>}
      </NavigationContainer>  
    )
}

export default AppNav