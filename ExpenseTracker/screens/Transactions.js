import { Text,View,FlatList } from "react-native"
import MonthTotalData from "../components/MonthTotalData"
import Expense from "../components/Expense"
import Income from "../components/Income"
import DayTransactionsInfo from "../UI/DayTransactionsInfo"
import { StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import CustomIconButton from "../UI/CustomIconButton"
const DUMMY_DATA = [
    [
        {
            id: '01-01kdfgk',
            type:'expense',
            title: 'Coffee Machine',
            amount: '199.99',
            category: 'Food',
            date: new Date('2023-10-07')
        },
        {
            id: '03-03uhgfd',
            type:'income',
            title: 'Investment Dividends',
            amount: 300.00,
            category: 'Investment',
            date:  new Date('2023-10-07')
        },
    ],


     [{
        id: '02-02sdfg',
        type:'expense',
        title: 'Groceries',
        amount: 50.00,
        category: 'Food',
        date:  new Date('2023-10-06')
    },
    {
        id: '03-03tyh',
        type:'expense',
        title: 'Electric Bill',
        amount: 120.00,
        category: 'Presents',
        date:  new Date('2023-10-06')
    }],
    [{
        id: '02-02sdwer',
        type:'income',
        title: 'Freelance Income',
        amount: 500.00,
        category: 'Freelance',
        date:  new Date('2023-10-02')
    }],
    [{
        id: '04-04ghj',
        type:'expense',
        title: 'Dinner with Friends',
        amount: '60.00',
        category: 'Entertainment',
        date:  new Date('2023-10-04')
    }],
    [{
        id: '05-05dfgh',
        type:'expense',
        title: 'Gasoline',
        amount: '40.00',
        category: 'Transport',
        date:  new Date('2023-10-03')
    }],
    [{
        id: '01-01fkjgk',
        type:'income',
        title: 'Salary',
        amount: 1000.00,
        category: 'Work',
        date:  new Date('2023-10-10')
    },
    ]
]


function renderItem(itemData)
{
    return <DayTransactionsInfo data={itemData.item}></DayTransactionsInfo>
    
}
const Transactions = () => {
  return (
    <View style={{marginTop:60}}>
        <View style={styles.monthPickerContainer}>
            <CustomIconButton icon="chevron-back" size={32}/>
            <Text style={{fontSize:24, fontWeight:'bold'}}>September</Text>
            <CustomIconButton icon="chevron-forward" size={32}/>
        </View>
        <FlatList 
        data={DUMMY_DATA}
        renderItem={renderItem}
        keyExtractor={(item)=>item.id}/>
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
    }
})