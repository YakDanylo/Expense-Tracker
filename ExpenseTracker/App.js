import { View,Text } from "react-native";
import AppNav from "./components/AppNav"
import { useState,useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Authentification from "./screens/Authentification";
import { AuthProvider} from "./context/AuthContext";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "./context/ThemeContext";
import { ThemeContext } from "./context/ThemeContext";
export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppNav />
      </ThemeProvider>
    </AuthProvider>
  );
}
