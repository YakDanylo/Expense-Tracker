import { View,Text } from "react-native";
import AppNav from "./components/AppNav"
import { useState,useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Authentification from "./screens/Authentification";
import { AuthProvider} from "./context/AuthContext";
import { StatusBar } from "expo-status-bar";
export default function App() {

  return (
    <AuthProvider>
      <StatusBar/>
      <AppNav/>
  </AuthProvider>
  );
}
