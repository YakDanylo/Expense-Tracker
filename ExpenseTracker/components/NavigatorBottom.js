import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CategoryScreen from '../screens/CategoryScreen';
import {createStackNavigator} from '@react-navigation/stack'
import BottomNav from './BottomNav';
import Profile from '../screens/Profile';
import Language from '../screens/Language';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import TransactionDetails from '../screens/TransactionDetails'
const Stack = createStackNavigator();
const NavigatorBottom = () => {
  const {theme} = useContext(ThemeContext)
  return (
    <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false, title:"Назад", }}>
      <Stack.Screen name="Main" component={BottomNav} barStyle={{backgroundColor:theme.primary}}/>
      <Stack.Screen name="CategoryScreen" 
      component={CategoryScreen} 
      options={{ 
        title: "Категорія",
        headerShown:true,
        headerStyle:{backgroundColor:theme.secondary,},
        headerTintColor:theme.opposite,
         }} />
      <Stack.Screen name="Profile" component={Profile} options={{headerShown:true, title:"Профіль",  headerStyle:{backgroundColor:theme.secondary,},
        headerTintColor:theme.opposite }}  />
      <Stack.Screen 
      name="Language" 
      component={Language} 
      options={{
        headerShown:true, 
        title:"Мова", 
        headerStyle:{backgroundColor:theme.secondary},
        headerTintColor:theme.opposite, 
     }} />
    <Stack.Screen name="transaction" component={TransactionDetails} 
    options={{
      headerShown:true, 
      title:"Деталі", 
      headerStyle:{backgroundColor:theme.secondary},
      headerTintColor:theme.opposite, 
   }} 
    />
  </Stack.Navigator>
  )
}

export default NavigatorBottom