
import Transactions from '../screens/Transactions';
import AddExpense from '../screens/AddExpense';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/COLORS';
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CategoryScreen from '../screens/CategoryScreen';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
const Bottom = createBottomTabNavigator()
const BottomNav = () => {
  const {theme} = useContext(ThemeContext)
  return (
    <Bottom.Navigator screenOptions={
        {
          headerShown:false,
          tabBarStyle:{
            backgroundColor:theme.secondary
          }
        }
      }>
        <Bottom.Screen name="Home" component={Home} 
        options={
          {
            title:"Home",
            tabBarIcon:({focused})=>
            {
              return <Ionicons name='home' size={focused?25:20} color={focused?COLORS.secondary100:theme.opposite}/>
            },
          }
        } />
        <Bottom.Screen name="Transactions" component={Transactions} options={
          {
            title:"Transactions",
            tabBarIcon:({focused})=>
            {
              return <Ionicons name='wallet' size={focused?25:20} color={focused?COLORS.secondary100:theme.opposite}/>
            }
          }
        }/>
        <Bottom.Screen name="AddExpense" component={AddExpense} options={
          {
            title:"Add Expenses",
            tabBarIcon:({focused})=>
            {
              return <Ionicons name='add' size={focused?25:20} color={focused?COLORS.secondary100:theme.opposite}/>
            },
          }
        }/>
        <Bottom.Screen name="Settings" component={Settings} options={
          {
            title:"Settings",
            tabBarIcon:({focused})=>
            {
              return <Ionicons name='settings' size={focused?25:20} color={focused?COLORS.secondary100:theme.opposite}/>
            }
          }
        } />
      </Bottom.Navigator>
  )
}

export default BottomNav