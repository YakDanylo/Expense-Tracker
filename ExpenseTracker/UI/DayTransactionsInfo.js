import { View,Text,StyleSheet,ScrollView } from "react-native"
import { FlatList,Platform } from "react-native"
import { COLORS } from "../constants/COLORS";
import { useState,useEffect } from "react";

    const days = ['Неділя','Понеділок','Вівторок','Середа','Четвер','П\'ятниця','Субота']


const DayTransactionsInfo = ({ data }) => {
    const [totalIncome,setTotalIncome] = useState(0)
    const [totalExpense,setTotalExpense] = useState(0)

    useEffect(() => {
        let income = 0
        let expense = 0
        data.forEach(element => {
            if(element.transType==='income')
            {
                income+=element.amount
            }
            else
            {
                expense+=element.amount
            }
        });
        setTotalIncome(income)
        setTotalExpense(expense)
    }, [])

    function renderItem(itemData) {
        return (
            <View style={styles.itemsDayContainer} key={itemData._id}>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                <View style={{marginRight:5}}>
                    <Text style={{fontSize:12, color:COLORS.accent100}}>{itemData.category}</Text>
                </View>
                <View style={{marginRight:5}}>
                    <Text style={{fontSize:18,}}>{itemData.title}</Text>
                </View>
                </View>
                <View>
                    <Text style={{color:itemData.transType==='income'?'#20ba53':'#e62c44'}}>₴{itemData.amount}</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.shadow}>
        <View style={styles.outerWrapper}>
            <View style={styles.totalDayInfo}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={styles.dayOfMonth}>{data[0].date.slice(8,10)}</Text>
                <Text style={{fontSize:16}}>{days[new Date(data[0].date).getDay()]}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{color:'#20ba53',marginHorizontal:5,}}>₴{totalIncome}</Text>
                    <Text style={{color:'#e62c44',marginHorizontal:5}}>₴{totalExpense}</Text>
                </View>

            </View>
            <ScrollView>
                {data.map((item)=>{
                    return renderItem(item)
                })}            
            </ScrollView>
        </View>
        </View>
    );
};

export default DayTransactionsInfo;

const styles = StyleSheet.create({
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
});