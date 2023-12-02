import {View,Text,StyleSheet, TextInput, Pressable} from 'react-native'
import { useContext,useState,useRef } from 'react'
import { ThemeContext } from '../context/ThemeContext';
import { COLORS } from '../constants/COLORS';
import CustomSaveButton from '../components/UI/CustomSaveButton';
import {Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import CustomDeleteButton from '../components/UI/CustomDeleteButton'
import { TouchableWithoutFeedback,Keyboard } from 'react-native'
import {MY_IP,API_URL} from '@env'
import { useNavigation } from '@react-navigation/native'
const TransactionDetails = ({route}) => {
    const navigation = useNavigation()
    const itemData = route.params.item
    const {theme} = useContext(ThemeContext)
    const monthNames = ["Січня", "Лютого", "Березня", "Квітня", "Травня", "Червня","Липня", "Серпня", "Вересня", "Жовтня", "Листопада", "Грудня"];
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    
    const [isEditingTitle,setIsEditingTitle] = useState(false)
    const [isEditingAmount,setIsEditingAmount] = useState(false)
    const [valueOfInput,setValueOfInput] = useState(itemData.title)
    const [valueOfAmountInput,setValueOfAmountInput] = useState(itemData.amount)
    const styles = StyleSheet.create({
        wrapper:{
            flex:1,
            backgroundColor:theme.primary
        },
        mainData:{
            marginTop:20,
            marginHorizontal:20,
        },
        buttonContainer:{
            position:'absolute',
            bottom:windowWidth/12,
            left:windowHeight/28,
            flexDirection:'row',
            justifyContent:'space-between',
        }, 
        titleContainer:{
            marginTop:30,
            marginHorizontal:20,
            flexDirection:'row',
            alignItems:'center',
            borderRadius:8,
            borderWidth:0.5,
            padding:10,
        }
    })


    function formatDate()
    {
        const date = new Date(itemData.date)
        const day = date.getDate()
        const month = date.getMonth()+1
        const year = date.getFullYear()
        return `${day} ${monthNames[month-1]} ${year}`
    }

    function changeTransaction()
    {
        if(valueOfInput==='' || valueOfAmountInput==='')
        {
            alert('Заповніть всі поля')
        }
        fetch(`${API_URL}/edittransaction`, {
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:itemData._id,
                title:valueOfInput,
                amount:valueOfAmountInput
            })
        })
        .then(()=>
        {
            navigation.goBack()
        })
        navigation.goBack()
    }

    function deleteTransaction()
    {
        fetch(`${API_URL}/deletetransaction`, {
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:itemData._id,
            })
        })
        .then(()=>
        {
        })
        navigation.goBack()
    }

    function handleSwitch(field) {
        if(field==='title')
        {
            setIsEditingTitle(true)
        }
        else
        {
            setIsEditingAmount(true)
        }
    }

  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()} accessible={false}>


    <View style={styles.wrapper}>
        <View style={styles.mainData}>
            {isEditingAmount
            ?   <View>
                    <TextInput inputMode='numeric' autoFocus={true} value={valueOfAmountInput} style={{color:itemData.transType==="expense"?"#ed3b3b":"green",fontSize:48, marginLeft:15,fontWeight:'bold'}} onChangeText={(value)=>setValueOfAmountInput(value)} onBlur={()=>setIsEditingAmount(false)}/>
                </View>
            :
            <Pressable onPress={()=>handleSwitch("amount")}>
                <Text style={{color:theme.opposite, fontSize:48,fontWeight:'bold', color:itemData.transType==="expense"?"#ed3b3b":"green"}}>{valueOfAmountInput} ₴</Text>
            </Pressable>
            }
            <Text style={{color:theme.opposite, fontSize:18, marginTop:20, color:COLORS.primary100}}>{itemData.category}</Text>
            <Text style={{color:theme.opposite, fontSize:18, marginTop:20}}>{formatDate()}</Text>
        </View>
        <View style={styles.titleContainer}>
            <Ionicons name="pencil" size={28} color={theme.opposite} />
            {isEditingTitle ? 
            <View>
                <TextInput value={valueOfInput} autoFocus={true}  style={{color:theme.opposite,fontSize:32, marginLeft:15}} onChangeText={(value)=>setValueOfInput(value)} onBlur={()=>setIsEditingTitle(false)}/>
            </View>
            : 
            <Pressable onPress={()=>handleSwitch("title")}>
                <Text style={{color:theme.opposite, fontSize:32, marginLeft:15}}>{valueOfInput}</Text>
            </Pressable>
                }
            
        </View>
        <View style={styles.buttonContainer}>
            <CustomSaveButton title="Зберегти" onPress={changeTransaction}/>
            <CustomDeleteButton title="Видалити" onPress={deleteTransaction}/>
        </View>
    </View>
    </TouchableWithoutFeedback>
  )
}

export default TransactionDetails