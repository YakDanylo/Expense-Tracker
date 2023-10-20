import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Pressable } from 'react-native'
import { View,Text, StyleSheet} from 'react-native'

const Income = ({income}) => {
  return (
    <Pressable>
    <View style={styles.wrapper}>
        <View style = {styles.titleContainer}>
        <Text style={styles.titleText}>{income.title}</Text>
        <Text style={styles.dateText}>{income.date}</Text>
        </View>
        <Text style={styles.incomeText}>${income.amount}</Text>
    </View>
    </Pressable>
  )
}

export default Income

const styles = StyleSheet.create({
    wrapper:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginHorizontal:20,
        marginVertical:10,
        color:'white',
    },
    titleText:{
        fontSize:24,
    },
    dateText:{
        fontSize:12,
    },
    incomeText:{
        fontSize:20,
        color:'#21b032'
    }
})