import { useState } from "react"
import { Pressable, Text,View,StyleSheet, TextInput, Button } from "react-native"

const AddExpense = () => {
    const [typeOfInput,setTypeOfInput] = useState('')
  return (
    <View style = {styles.wrapper}>
        <View style={styles.controlButton}>
            <Pressable onPress={()=>setTypeOfInput('income')} style={[styles.incomeButton,typeOfInput=='income'&&styles.incomeActive]}>
                <Text style={[styles.incomeText,typeOfInput=='income'&&styles.incomeActiveText]}>Income</Text>
            </Pressable>
            <Pressable onPress={()=>setTypeOfInput('expense')} style={[styles.expenseButton,typeOfInput=='expense'&&styles.expenseActive]}>
                <Text style={[styles.expenseText,typeOfInput=='expense'&&styles.expenseActiveText]}>Expense</Text>
            </Pressable>
        </View>
        
            <View style={styles.inputWrapper}>
                <View style={styles.inputContainer}> 
                    <Text style={styles.label} >Date: </Text>
                    <TextInput style={styles.input}/>
                    </View>
                    <View style={styles.inputContainer}> 
                    <Text style={styles.label}>Title: </Text>
                    <TextInput style={styles.input}/>
                    </View>
                    <View style={styles.inputContainer}> 
                    <Text style={styles.label}>Category: </Text>
                    <TextInput style={styles.input}/>
                    </View>
                    <View style={styles.inputContainer}> 
                    <Text style={styles.label}>Amount: </Text>
                    <TextInput style={styles.input}/>
                    </View>
                    <View style={styles.button} >
                    <Button title="Save"/>
                    </View>
            </View>
    </View>
  )
}

export default AddExpense

const styles = StyleSheet.create({
    wrapper:{
        marginTop:60,
        alignItems:'center',
        justifyContent:'center',
    },
    controlButton:{
        flexDirection:"row"
    },
    incomeButton:{
        borderWidth:2,
        borderColor:'#21b032',
        padding:8,
        marginHorizontal:20,
        borderRadius:8,
    },
    expenseButton:{
        borderWidth:2,
        borderColor:'#e02d45',
        padding:8,
        marginHorizontal:20,
        borderRadius:8,
    },
    incomeText:{
        fontSize:24,
    },
    expenseText:{
        fontSize:24,
    },
    incomeActive:{
        backgroundColor:'#21b032',
    },
    incomeActiveText:{
        color:'white'
    },
    expenseActive:{
        backgroundColor:'#e02d45',
    },
    expenseActiveText:{
        color:'white'
    },
    input: {
        flex: 1, // Використовуйте flex: 1, щоб input розширювався на залишок доступного простору
        height: 50,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        fontSize: 24,
      },
    inputWrapper:{
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        marginTop:20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10, // Додавання відступу між кожним input
        width: '90%'
      },
      label: {
        marginLeft: 5,
        fontSize: 20, // Розмір тексту для мітки
      },
      button:{
        marginTop:10,
        
      }
})