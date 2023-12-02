import { View,Text,StyleSheet, Pressable } from "react-native"
import { useContext, useEffect,useState } from "react"
import { AuthContext } from "../context/AuthContext"
import CustomButton from "../UI/CustomButton"
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import {MY_IP, API_URL} from "@env" 
import { ThemeContext } from "../context/ThemeContext";
const screenWidth = Dimensions.get("window").width;
const Profile = () => {
    const {user,setUser} = useContext(AuthContext)
    const {theme} = useContext(ThemeContext)
    const [yearData,setYearData] = useState([[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0]])
    const expenseData= {
        labels: ["Січ", "Лют", "Бер", "Кві", "Тра", "Черв","Лип","Серп","Вер","Жов","Лис","Гру"],
        datasets: [
          {
            data: yearData[0],
          }
        ],
        legend: ["Річна статистика витрат"] // optional
      }
      const incomeData= {
        labels: ["Січ", "Лют", "Бер", "Кві", "Тра", "Черв","Лип","Серп","Вер","Жов","Лис","Гру"],
        datasets: [
          {
            data: yearData[1],
          }
        ],
        legend: ["Річна статистика заробітку"] // optional
      }

    useEffect(()=>{
        fetch(`${API_URL}/gettotalinfo?userId=${user._id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); 
        })
        .then((resp) => {
            setYearData(resp)
        })
    },[])
    function logOut(){
        setUser({id:null,email:'',password:''})
    }

  return (
    <View style={{flex:1,backgroundColor:theme.primary}}>
        <View style={{alignItems:'center', marginTop:20}}>
        <LineChart
            data={expenseData}
            width={screenWidth-20}
            height={220}
            chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#3b4bc7",
                backgroundGradientTo: "#00edff",
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 30,
                },
                propsForDots: {
                  r: "4",
                  strokeWidth: "0",
                  stroke: "#ffa726"
                },
                propsForBackgroundLines:{
                    strokeWidth: 0.7,
                },
                strokeWidth: 2,
                propsForHorizontalLabels:{
                    fontSize: 15,
                    fontWeight: 'bold',
                },
                propsForVerticalLabels:{
                    fontSize: 12,
                },
              }}
              style={styles.expenseChart}
        />
        </View>
        <View style={{alignItems:'center', marginTop:20}}>
        <LineChart
            data={incomeData}
            width={screenWidth-20}
            height={220}
            chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#3b4bc7",
                backgroundGradientTo: "#00edff",
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 30,
                },
                propsForDots: {
                  r: "4",
                  strokeWidth: "0",
                  stroke: "#ffa726"
                },
                propsForBackgroundLines:{
                    strokeWidth: 0.7,
                },
                strokeWidth: 2,
                propsForHorizontalLabels:{
                    fontSize: 13,
                    fontWeight: 'bold',
                },
                propsForVerticalLabels:{
                    fontSize: 12,
                },
              }}
              style={styles.expenseChart}
        />
        </View>
        <View style={{alignItems:'center',marginTop:10,}}>
            <Pressable onPress={logOut} >
                <View style={styles.buttonWrapper}>
                    <Text style={{color:'red',fontSize:20}}>Вийти з аккаунту</Text>
                </View>
            </Pressable>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    userInfocontainer:{
        marginTop: 10,
        margin: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: "#000",
            shadowOffset: {
                width: 0, 
                height: 3,
                },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,
            elevation: 6,
    }, 
    buttonWrapper:{
        color:'red',
        width: 200,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: "#000",
            shadowOffset: {
                width: 0, 
                height: 3,
                },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,
            elevation: 6,
            justifyContent:'center',
            alignItems:'center'
    },
    expenseChart:{
        borderRadius: 10,
        overflow:'hidden',
    }
})

export default Profile