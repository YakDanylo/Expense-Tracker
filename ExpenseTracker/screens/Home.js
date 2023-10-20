import { Ionicons } from '@expo/vector-icons'
import {View,Text,StyleSheet,Image} from 'react-native'
import CircleComponents from '../UI/CircleComponents'
import Categories from '../components/Categories'
import TodayExpenses from '../components/TodayExpenses'
const Home = () => {
  return (
    <View>
        <View style={styles.userGreetingContainer}>
            <Image style={styles.userImage} source={require("../assets/UserImage.png")} />
            <View style={styles.greetingContainer}>
            <Text>Welcome back </Text>
            <Text>UserName</Text>
            </View>
            <Ionicons name='barbell' size={24}/>
        </View>
        <View style={styles.currentBalanceContainer}>
            <View style={styles.balanceTextContainer}>
                <Text style={{color:'white'}}>Available</Text>
                <Text style={{color:'white', fontSize:32,}}>$25.000</Text>
                <View style={{flexDirection:'row', backgroundColor:'#6653e7',padding:1,borderRadius:8,}}>
                    <View style={styles.moneyContainer}>
                    <Text style={{color:'white'}}>Earned</Text>
                    <Text style={{color:'white'}}>$100.000</Text>
                    </View>
                    <View style={styles.moneyContainer}>
                    <Text style={{color:'white'}}>Spent</Text>
                    <Text style={{color:'white'}}>$75.000</Text>
                    </View>
                </View>
            </View>
            <View style={styles.circleContainer}>
                <CircleComponents earned={100000} expensed={75000} />
                <Text style={{color:'white', fontSize:16,}}>September</Text>
            </View>
        </View>
        <View>
            <Categories/>
        </View>
        <View>
            <TodayExpenses/>
        </View>
    </View>
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
        justifyContent:'center',
        alignItems:'center',
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