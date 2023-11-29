
import Transactions from '../screens/Transactions';
import AddExpense from '../screens/AddExpense';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/COLORS';
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CategoryScreen from '../screens/CategoryScreen';
import {createStackNavigator} from '@react-navigation/stack'
import BottomNav from './BottomNav';
const Bottom = createBottomTabNavigator()
const Stack = createStackNavigator();
const NavigatorBottom = () => {
  return (
    <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={BottomNav} />
      <Stack.Screen name="CategoryScreen" 
      component={CategoryScreen} 
      options={{ 
        title: "Категорія",
        headerShown:true,
         }} />
  </Stack.Navigator>
  )
}

export default NavigatorBottom