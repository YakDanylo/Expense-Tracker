import { useState,useContext } from "react"
import { Pressable, Text,View,StyleSheet, TextInput, Button,Platform, TouchableOpacity, ScrollView,Keyboard,TouchableWithoutFeedback } from "react-native"
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import CustomSaveButton from "../components/UI/CustomSaveButton";
import { AuthContext } from "../context/AuthContext";
const AddExpense = () => {
    const [typeOfInput,setTypeOfInput] = useState('expense')
    const [date, setDate] = useState(new Date());
    const[dateOfTransaction,setDateOfTransaction] = useState(new Date().toISOString().slice(0,10))
    const [showPicker, setShowPicker] = useState(false);
    const [transaction, setTransaction] = useState({transType:'expense',title:'',category:'',amount:'', date:new Date()})
    const [isFocus, setIsFocus] = useState(false);
    const {user} = useContext(AuthContext)
    const categoriesOfExpense = [
        { label: "Їжа", value: 'Food' },
        { label: "Транспорт", value: 'Transport' },
        { label: "Одяг", value: 'Clothes' },
        { label:'Подарунки',value:'Gifts'},
        { label: "Розваги", value: 'Clothes' },
        { label: "Здоров'я", value: 'Health' },
        { label: "Освіта", value: 'Health' },

        { label: "Інше", value: 'Other' }
    ];
    const categoriesOfIncone = [
        { label: "Зарплата", value: 'Зарплата' },
        { label: "Подарунок", value: 'Подарунок' },
        {label:"Кишенькові",value:'Кишенькові'},
        {label:"Допомога",value:'Допомога'},
        {label:"Бонуси",value:'Бонуси'},
        { label: "Інше", value: 'Інше' },
    ]
    function toggleDatePicker()
    {
        setShowPicker(!showPicker)
    }

    

    const onChange = ({type}, selectedDate) => {
        if(type==='set')
        {
            const currentDate = selectedDate
            setDate(currentDate);

            if(Platform.OS==='android')
            {
                toggleDatePicker()
                setDateOfTransaction(currentDate.toDateString());
            }
            setTransaction({...transaction,date:currentDate})
        }
        else 
        {
            toggleDatePicker()
        }
      }

      function confirmISODate(){
        setDateOfTransaction(date.toISOString().slice(0,10))
        setDate(date)
        setShowPicker(false)
      }
      
      async function handleTransaction() {
        setTransaction((prev)=>
         {return  {...prev, transType:typeOfInput}});
        if(transaction.title===''||transaction.category===''||transaction.amount==='')
        {
            alert('Заповніть всі поля!')
            return
        }
        fetch(`http://192.168.1.2:3000/add?userId=${user._id}`,{
            method:'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body:JSON.stringify(transaction)
        })
        .then((response) => {
            console.log("Success")
            
        })
        .catch((error) => {
            console.error(error);
        });
        setTransaction({ ...transaction, title: '', category: '', amount: '', date: new Date() });
      }
  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()} accessible={false}>
    <View style={{flex:1}}>
    <View style = {styles.wrapper}>
        <View style={styles.controlButton}>
            <Pressable onPress={()=>
                {setTransaction({...transaction,transType:'income'} )
                setTypeOfInput('income')
                }
            } 
            style={[styles.incomeButton,typeOfInput=='income'&&styles.incomeActive]}>
                <Text style={[styles.incomeText,typeOfInput=='income'&&styles.incomeActiveText]}>Дохід</Text>
            </Pressable>
            <Pressable onPress={()=>
                {setTransaction({...transaction,transType:'expense'} )
                setTypeOfInput('expense')
                }
            }
             style={[styles.expenseButton,typeOfInput=='expense'&&styles.expenseActive]}>
                <Text style={[styles.expenseText,typeOfInput=='expense'&&styles.expenseActiveText]}>Витрати</Text>
            </Pressable>
        </View>
        
            <View style={styles.inputWrapper}>
                <View style={[styles.inputContainer, Platform.OS=='ios' &&showPicker &&{flexDirection:'column'}]}> 
                    <Text style={styles.label} >Дата: </Text>       
                    {showPicker ? 
                    <DateTimePicker mode="date" display="spinner" value={date} onChange={onChange} style={styles.datePicker}/>
                    :
                    <Pressable style={{flex:1}} onPress={toggleDatePicker}>
                     <TextInput style={styles.input} value={dateOfTransaction} editable={false} onPressIn={toggleDatePicker}/>
                     </Pressable>
                    }
                    {showPicker && Platform.OS === 'ios' &&
                      <View>
                            <TouchableOpacity style={[styles.button,{flexDirection:'row'}]} onPress={toggleDatePicker}>
                                <Text style={{marginHorizontal:20, fontSize:24, }}>Cancel</Text>
                                <Pressable onPress={confirmISODate}>
                                <Text style={{marginHorizontal:20, fontSize:24, }}>Done</Text>
                                </Pressable>
                            </TouchableOpacity>
                      </View> }
                    </View>
                    <View style={styles.inputContainer}> 
                    <Text style={styles.label}>Назва: </Text>
                    <TextInput style={styles.input} value={transaction.title} onChangeText={value=>setTransaction({...transaction,title:value})}/>
                    </View>
                    <View style={styles.inputContainer}> 
                    <Text style={styles.label}>Категорія: </Text>
                    {typeOfInput==='expense'?
                     <Dropdown
                     style={styles.dropdown}
                     selectedTextStyle={styles.dropdownSelectedText}
                     data={categoriesOfExpense}
                     labelField={"label"}
                     valueField={"value"}
                     searchField={"label"}
                     onChange={(value) => setTransaction({...transaction,category:value.value})}
                     value={transaction.category}
                     placeholder={!isFocus ? 'Виберіть категорію' : '...'}
                     onFocus={() => setIsFocus(true)}
                     onBlur={() => setIsFocus(false)}
                     placeholderStyle={{color: 'black', fontSize: 24}}
                     />
                     :
                     <Dropdown
                     style={styles.dropdown}
                     selectedTextStyle={styles.dropdownSelectedText}
                     data={categoriesOfIncone}
                     labelField={"label"}
                     valueField={"value"}
                     searchField={"label"}
                     onChange={(value) => setTransaction({...transaction,category:value})}
                     value={transaction.category}
                     placeholder={!isFocus ? 'Виберіть категорію' : '...'}
                     onFocus={() => setIsFocus(true)}
                     onBlur={() => setIsFocus(false)}
                     placeholderStyle={{color: 'black', fontSize: 24}}
                     />}
                   
                    </View>
                    
                    <View style={styles.inputContainer}> 
                    <Text style={styles.label}>Сума: </Text>
                    
                        <View style={styles.inputView}>
                            <TextInput style={styles.input} inputMode="numeric" value={transaction.amount} onChangeText={value=>setTransaction({...transaction,amount:value})}/>
                        </View>
                    
                    
                    </View>
                    <View style={styles.button} >
                        <CustomSaveButton title="Зберегти" onPress={handleTransaction}/>
                    </View>
            </View>
    </View>

    </View>
    </TouchableWithoutFeedback>
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
        flexDirection:"row",
        backgroundColor:'white',
        paddingHorizontal:40,
        paddingVertical:10,
        borderRadius:8,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0, 
	        height: 2,
            },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 7,
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
        width:'96%',
        alignItems:'center',
        justifyContent:'center',
        marginTop:20,
        backgroundColor:'white',
        padding:20,
        borderRadius:8,
        backgroundColor:'white',
      shadowColor: "#000",
        shadowOffset: {
	        width: 0, 
	        height: 2,
            },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 7,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10, // Додавання відступу між кожним input
        width: '100%',
      },
      label: {
        marginTop:10,
        marginLeft: 5,
        fontSize: 20, // Розмір тексту для мітки
      },
      button:{
        marginTop:10,
        
      },
      datePicker:{
        height:120,
        marginTop:-10,
      },
      dropdown:{
            width:250,
            height:50,
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            fontSize: 34,
      },
      dropdownSelectedText:{
        fontSize: 24,
      },
      inputView:{
        flex:1,
        height:50,
      }
})