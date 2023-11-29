import { Ionicons } from '@expo/vector-icons'
import {View,Text,StyleSheet,Image, ScrollView} from 'react-native'
import CircleComponents from '../UI/CircleComponents'
import Categories from '../components/Categories'
import MonthStatistics from '../components/MonthStatistics'
import { AuthContext } from '../context/AuthContext'
import React,{useContext, useEffect,useState} from 'react'
import { useIsFocused } from '@react-navigation/native'
function groupByDayOfMonth(objects) {
    const groups = {};
  
    for (const obj of objects) {
      const date = new Date(obj.date); // Перетворюємо рядок 'date' в об'єкт Date
      const dayOfMonth = date.getDate(); // Отримуємо день місяця
  
      if (dayOfMonth in groups) {
        groups[dayOfMonth].push(obj);
      } else {
        groups[dayOfMonth] = [obj];
      }
    }
  
    const result = Object.values(groups);
  
    return result;
  }
 
  const Months = ["Січень","Лютий","Березень","Квітень","Травень","Червень","Липень","Серпень","Вересень","Жовтень","Листопад","Грудень"]
const Home = () => {
    const {user} = useContext(AuthContext)
    const [transactionsValues,setTransactionsValues] = useState({income:0,expense:0})
    const [choosedMonth,setChoosedMonth] = useState(new Date().getMonth())
    const isFocused = useIsFocused()
    useEffect(() => {
        fetch(`http://192.168.1.2:3000/gettotal?month=${choosedMonth}&userId=${user._id}`)
            .then((response) => {
                if (!response.ok) {
                throw new Error("Network response was not ok");
                }
                return response.json(); 
            })
            .then((resp) => {
                setTransactionsValues(resp)
            })
            .catch((error) => {
                console.error(error);
            });
    }, [isFocused])

  return (
    <ScrollView>
        <View style={styles.userGreetingContainer}>
            <Image style={styles.userImage} source={require("../assets/UserImage.png")} />
            <View style={styles.greetingContainer}>
            <Text>Welcome back </Text>
            <Text>{user.email}</Text>
            </View>
            <Ionicons name='notifications-sharp' size={24}/>
        </View>
        <View style={styles.currentBalanceContainer}>
            <View style={styles.balanceTextContainer}>
                <Text style={{color:'white'}}>Доступно</Text>
                <Text style={{color:'white', fontSize:32,}}>{transactionsValues.income-transactionsValues.expense}₴</Text>
                <View style={{flexDirection:'row', backgroundColor:'#6653e7',padding:1,borderRadius:8,}}>
                    <View style={styles.moneyContainer}>
                    <Text style={{color:'white'}}>Зароблено</Text>
                    <Text style={{color:'white'}}>{transactionsValues.income}₴</Text>
                    </View>
                    <View style={styles.moneyContainer}>
                    <Text style={{color:'white'}}>Потрачено</Text>
                    <Text style={{color:'white'}}>{transactionsValues.expense}₴</Text>
                    </View>
                </View>
            </View>
            <View style={styles.circleContainer}>
                <CircleComponents earned={transactionsValues.income} expensed={transactionsValues.expense} />
                <Text style={{color:'white', fontSize:16}}>{Months[choosedMonth]}</Text>
            </View>
        </View>
        <View>
            <Categories month={choosedMonth}/>
        </View>
        <View>
            <MonthStatistics month = {choosedMonth}/>
        </View>
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
    userGreetingContainer:{
        marginTop:50,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginHorizontal:20,
    },
    greetingContainer:{
        flexDirection:'column'
    },
    userImage:{
        width:30,
        height:30,
    },
    currentBalanceContainer:{
        backgroundColor:"#5844e6",
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:20,
        borderRadius:10,
        marginHorizontal:20,
        padding:40,
    },
    moneyContainer:{
        marginRight:5,
    },
    circle:{
        paddingHorizontal:30,
        paddingVertical:20,
        borderRadius:1000,
        borderTopColor:'yellow',
        borderTopWidth:2,
        backgroundColor:'red'
    },
    circleContainer:{
        justifyContent:'center',
        alignItems:'center'
    }
})