import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Pressable } from 'react-native'
import { View,Text, StyleSheet} from 'react-native'

const Expense = ({expense}) => {
  return (
    <Pressable>
    <View style={styles.wrapper}>
        <View style = {styles.titleContainer}>
        <Text style={styles.titleText}>{expense.expenseTitle}</Text>
        <Text style={styles.dateText}>{expense.date}</Text>
        </View>
        <Text style={styles.expenseText}>${expense.expenseCost}</Text>
    </View>
    </Pressable>
  )
}

export default Expense

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
    expenseText:{
        fontSize:20,
        color:'#e02d45'
    }
})