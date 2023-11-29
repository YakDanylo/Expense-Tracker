import { Text,View,FlatList, ScrollView } from "react-native"
import MonthTotalData from "../components/MonthTotalData"
import Expense from "../components/Expense"
import Income from "../components/Income"
import DayTransactionsInfo from "../UI/DayTransactionsInfo"
import { StyleSheet} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import CustomIconButton from "../UI/CustomIconButton"
import { useEffect,useState,useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { COLORS } from "../constants/COLORS"
import { useIsFocused } from "@react-navigation/native"

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

const Transactions = ({navigation}) => {
    const [choosedMonth,setChoosedMonth] = useState(new Date().getMonth())
    const [data,setData] = useState([]) 
    const {user} = useContext(AuthContext)
    const isFocused = useIsFocused()
    useEffect(() => {
        fetch(`http://192.168.1.2:3000/get?month=${choosedMonth}&userId=${user._id}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json(); 
          })
          .then((resp) => {
              const arr = groupByDayOfMonth(resp)
              setData(arr)
          })
          .catch((error) => {
            console.error(error);
          });
      }, [choosedMonth,isFocused]);

      function nextMonth(){
        if(choosedMonth==11)
        {
          setChoosedMonth(0)
        }
        else 
        {
          setChoosedMonth(choosedMonth+1)
        }
        
      }
      function previousMonth(){
        
        if(choosedMonth==0)
        {
            setChoosedMonth(11)
        }
        else
        {
            setChoosedMonth(choosedMonth-1)
        }
      }

      function count()
      {
        let income = 0
        let expense = 0
        for(let i=0;i<data.length;i++)
        {
          for(let j=0;j<data[i].length;j++)
          {
            if(data[i][j].transType==='income')
            {
              income+=data[i][j].amount
            }
            else if(data[i][j].transType==='expense')
            {
              expense+=data[i][j].amount
            }
          }
        }
        return [income,expense]
      }
  return (
    <View style={{marginTop:60,marginBottom:30}}>
        <View style={styles.monthPickerContainer}>
            <CustomIconButton icon="chevron-back" size={32} onPress={previousMonth}  />
            <Text style={{fontSize:24, fontWeight:'bold'}}>{Months[choosedMonth]}</Text>
            <CustomIconButton icon="chevron-forward" size={32} onPress={nextMonth} />
        </View>
        <View style={styles.monthInfo}>
          <View style={styles.balanceWrapper}>
          <Text style={{color:'green'}}>{count()[0]}₴</Text>
          <Text>Дохід</Text>
          </View>
          <View style={styles.balanceWrapper}>
          <Text style={{color:'red'}}>{count()[1]}₴</Text>
          <Text>Витрати</Text>
          </View>
          <View style={styles.balanceWrapper}>
          <Text style={{color:COLORS.accent100}}>{count()[0]-count()[1]}₴</Text>
          <Text>Баланс</Text>
          </View>
        </View>
          <ScrollView>
            {data.map((item,index)=>{
            return <DayTransactionsInfo data={item} key={index}></DayTransactionsInfo>
              })}
          </ScrollView>
    </View>
  )
}

export default Transactions

const styles = StyleSheet.create({
    monthPickerContainer:{
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        marginHorizontal:15,
    },
    monthInfo:{
      flexDirection:'row',
      justifyContent:'space-around',
      padding:5,
      marginHorizontal:15,
      borderRadius:10,
      marginTop:10,
      backgroundColor:'white',
      shadowColor: "#000",
        shadowOffset: {
	        width: 0, 
	        height: 3,
            },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 7,
    },
    balanceWrapper:{
      alignItems:'center',
      justifyContent:'center',
      padding:5,
    }
})