import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Transactions from './screens/Transactions';
import AddExpense from './screens/AddExpense';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from './constants/COLORS';
import Home from './screens/Home';
import Settings from './screens/Settings';
const Bottom = createBottomTabNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <Bottom.Navigator screenOptions={
        {
          headerShown:false
        }
      }>
        <Bottom.Screen name="Home" component={Home} 
        options={
          {
            title:"Home",
            tabBarIcon:({focused})=>
            {
              return <Ionicons name='home' size={focused?25:20} color={focused?COLORS.secondary100:'black'}/>
            }
          }
        } />
        <Bottom.Screen name="AllExpenses" component={Transactions} options={
          {
            title:"Transactions",
            tabBarIcon:({focused})=>
            {
              return <Ionicons name='wallet' size={focused?25:20} color={focused?COLORS.secondary100:'black'}/>
            }
          }
        }/>
        <Bottom.Screen name="AddExpense" component={AddExpense} options={
          {
            title:"Add Expenses",
            tabBarIcon:({focused})=>
            {
              return <Ionicons name='add' size={focused?25:20} color={focused?COLORS.secondary100:'black'}/>
            },
          }
        }/>
        <Bottom.Screen name="Settings" component={Settings} options={
          {
            title:"Settings",
            tabBarIcon:({focused})=>
            {
              return <Ionicons name='settings' size={focused?25:20} color={focused?COLORS.secondary100:'black'}/>
            }
          }
        } />
      </Bottom.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});
