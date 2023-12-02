import { useEffect,useContext,useState } from 'react'
import {View,Text,StyleSheet} from 'react-native'
import { AuthContext } from '../context/AuthContext'
import { ScrollView } from 'react-native-gesture-handler'
import DayTransactionsInfo from '../UI/DayTransactionsInfo'
import { COLORS } from '../constants/COLORS'
import {MY_IP,API_URL} from '@env'
import { ThemeContext } from '../context/ThemeContext'
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
const CategoryScreen = ({route}) => {
    const {value,choosedMonth,name} = route.params
    const {user} = useContext(AuthContext)
    const [transactions,setTransactions] = useState([])
    const {theme} = useContext(ThemeContext)
    useEffect(() => {
        fetch(`${API_URL}/getbycategory?month=${choosedMonth}&userId=${user._id}&category=${value}`)
        .then((response) => {
            if (!response.ok) {
            throw new Error("Network response was not ok");
            }
            return response.json(); 
        })
        .then((resp) => {
            const temp = groupByDayOfMonth(resp)
            setTransactions(temp)
        })
    },[])

    function count()
      {
        let expense = 0
        for(let i=0;i<transactions.length;i++)
        {
          for(let j=0;j<transactions[i].length;j++)
          {
            if(transactions[i][j].transType==='expense')
            {
              expense+=transactions[i][j].amount
            }
          }
        }
        return expense
      }

      const styles = StyleSheet.create({
        wrapper:{
            flex:1,
            backgroundColor:theme.primary,
            marginTop:0,
        },
        header:{
            justifyContent:'center',
            alignItems:'center',
        },
        totalDayInfo: {
            flexDirection: "row",
            marginHorizontal:5 ,
            marginVertical:5,
            justifyContent: "space-between",
        },
        itemsDayContainer: {
            flex: 1,
            backgroundColor: "white",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
            borderRadius:8,
            alignItems: "center",
        },
        outerWrapper:{
            backgroundColor:'white',
            marginVertical:10,
            marginHorizontal:10,
            borderRadius:10,
            overflow:Platform.OS=='ios'?'':'hidden',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 3,
                },
            shadowOpacity: 0.3,
            shadowRadius: 1,
            elevation: 7,
            },
    
            dayOfMonth:{
                fontSize:16,
                fontWeight:'bold',
                color:'white',
                backgroundColor:COLORS.accent100,
                borderRadius:10,
                padding:3,
                marginLeft:5,
                marginRight:10,
                marginTop:3,
                overflow:'hidden'
            },
            monthInfo:{
                flexDirection:'row',
                justifyContent:'space-around',
                padding:5,
                marginHorizontal:15,
                borderRadius:10,
                marginTop:10,
                backgroundColor:theme.secondary,
                shadowColor: "#000",
                  shadowOffset: {
                      width: 0, 
                      height: 3,
                      },
                  shadowOpacity: 0.3,
                  shadowRadius: 1,
                  elevation: 7,
              },
    })

  return (
    <View style={styles.wrapper}>
        <View style={styles.header}>
        <Text style={{fontSize:24,color:theme.opposite}}>{name}</Text>
        
        </View>
        <View style={styles.monthInfo}>
            <View style={styles.balanceWrapper}>
                <Text style={{color:'red'}}>{count()}₴</Text>
                <Text style={{color:theme.opposite}}>Витрати</Text>
            </View>
        </View>
    <ScrollView>
            {transactions.map((item,index)=>{
            return <DayTransactionsInfo data={item} key={index}></DayTransactionsInfo>
              })}
    </ScrollView>
    </View>
  )
}

export default CategoryScreen