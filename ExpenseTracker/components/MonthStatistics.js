import { Button } from "react-native"
import { View,Text,StyleSheet,FlatList } from "react-native"
import CustomButton from "../UI/CustomButton";
import PieChart from 'react-native-pie-chart'
import { useEffect } from "react";
import { useState,useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useIsFocused } from '@react-navigation/native'
import {MY_IP} from '@env'
import { ThemeContext } from "../context/ThemeContext";

const widthAndHeight = 200
const sliceColor = [
    '#2a9ecf',
    '#5e4cfa',
    '#116efa',
    '#c3d6f7',
    '#8c43e6',
    '#4cd05e',
    '#e74c3c',
    '#f39c12',
]
const MonthStatistics = ({month}) => {
    const {user} = useContext(AuthContext)
    const {theme} = useContext(ThemeContext)
    const [transactionsValues,setTransactionsValues] = useState([1,1])
    const [categories,setCategories] = useState([])
    const isFocused = useIsFocused()
    useEffect(() => {
        fetch(`http://${MY_IP}:3000/getcategoriesvalues?month=${month}&userId=${user._id}`)
            .then((response) => {
                if (!response.ok) {
                throw new Error("Network response was not ok");
                }
                return response.json(); 
            })
            .then((resp) => {
                if (resp.length==0||resp[0].value==0)
                {
                    return
                }
                let values = resp.map(item=>item.value)
                values = values.filter(item=>item!==0)
                let keys = resp.map(item=>Object.values(item)[0])
                keys  =keys.filter(item=>item!==0)
                setCategories(keys)
                setTransactionsValues(values)
            })
            .catch((error) => {
                console.error(error);
            });
    },[isFocused])


    const styles = StyleSheet.create({
        wrapper: {
            margin: 20,
            borderRadius: 8,
            overflow: "hidden",
            backgroundColor:theme.secondary,
            flexDirection:'row'
        },
        pie:{
            justifyContent:'center',
            alignItems:'center',
            marginHorizontal:20,
            marginVertical:20,
        },
        legend:{
            justifyContent:'space-around',
            marginVertical:20,
        }
        
    });

    return (
        <View style={styles.wrapper}>
            <View style={styles.pie}>
                <PieChart
                widthAndHeight={widthAndHeight}
                series={transactionsValues}
                sliceColor={sliceColor.slice(0,transactionsValues.length)}
                coverRadius={0.45}
                coverFill={theme.secondary}
                />
            </View>
            <View style={styles.legend}>
                {categories.map((item,index)=>{
                    return <View style={{flexDirection:'row',alignItems:'center'}} key={index}>
                        <View style={{width:10,height:10,backgroundColor:sliceColor[index],marginRight:10,borderRadius:10}}></View>
                        <Text style={{color:theme.opposite}}>{item}</Text>
                    </View>

                })}
            </View>
        </View>
    );
};

export default MonthStatistics;

