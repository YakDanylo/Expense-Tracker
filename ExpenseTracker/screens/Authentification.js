import {View ,Text,StyleSheet,Image, TextInput, KeyboardAvoidingView} from 'react-native'
import { useState,useEffect,useContext } from 'react'
import CustomButton from '../UI/CustomButton'
import AuthSaveButton from '../UI/AuthCustomButton'
import { COLORS } from '../constants/COLORS'
import { AuthContext } from '../context/AuthContext'
import {MY_IP,API_URL} from '@env'
const Authentification = ({auth}) => {
    const [isRegistered,setIsRegistered] = useState(true)
    const [userInfo,setUserInfo] = useState({email:"",password:""})
    const {setUser,user} = useContext(AuthContext)
    function handleClick()
    {
        if(userInfo.email==""||userInfo.password=="")
        {
            alert("Заповніть всі поля")
            return
        }

        if(!isRegistered)
        {

            // User registration
            if(userInfo.password.length<6)
            {
                alert("Пароль повинен містити не менше 6 символів")
                return
            }
            if(userInfo.email.indexOf("@")==-1)
            {
                alert("Невірний формат електронної пошти")
                return
            }
            fetch(`${API_URL}/register`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(userInfo)
            })
            fetch(`${API_URL}/login?email=${userInfo.email}&password=${userInfo.password}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json(); 
                })
                .then((resp) => {
                    if(resp)
                    {
                        console.log(resp)
                        setUser(resp)  
                    }
                    else 
                    {
                        alert("Невірний логін або пароль")
                    }
                })
        }
        else 
        {
            // User authorisation
            fetch(`${API_URL}/login?email=${userInfo.email}&password=${userInfo.password}`)
            .then((response) => {
                if (!response.ok) {
                    
                    throw new Error("Network response was not ok");
                    
                }
                return response.json(); 
                })
                .then((resp) => {
                    if(resp)
                    {
                        setUser(resp)
                    }
                    else 
                    {
                        alert("Невірний логін або пароль")
                    }
                })
        }

        setUserInfo({email:"",password:""})
    }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''} style={styles.outerWrapper}>
    <View style={styles.outerWrapper}>
        <View style={styles.imageContainer}>
        <Image
            source={require("../images/user-286-512.png")}
            style={styles.image} />
        </View>
        <View style={styles.form}>
           
           <View style={styles.emailContainer}>
            <Text style={styles.titleText}>{isRegistered?"Увійти":"Зареєструватись"}</Text>
            <TextInput placeholder="Email" value={userInfo.email} style={styles.input} onChangeText={(value)=>setUserInfo({...userInfo,email:value})}></TextInput>
           </View>
           <View style={styles.passwordContainer}>
            <TextInput placeholder="Пароль" value={userInfo.password} style={styles.input} onChangeText={(value)=>setUserInfo({...userInfo,password:value})}></TextInput>
           </View>
           <View style={{marginTop:10,}}>
            <AuthSaveButton onPress={handleClick}>{isRegistered?"Увійти":"Зареєструватись"}</AuthSaveButton>
           </View>
            <View style={{flexDirection:'row',marginTop:20}}>
                <Text style={{marginRight:15, fontSize:18}}>{isRegistered?"Перший раз у додатку?":"Вже маєте акаунт?"}</Text>
                <CustomButton size={18} color={COLORS.accent100} onPress={()=>setIsRegistered(!isRegistered)}>{isRegistered?"Зареєструватись":"Увійти"}</CustomButton>
            </View>
        </View>
    </View>
    </KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
    outerWrapper:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    form:{
        alignItems:'center',
    },
    image:{
        width:300,
        height:300,
    },
    titleText:{
        fontSize:24,
        fontWeight:'bold',
        marginVertical:10,
    },
    emailContainer:{
        alignItems:'center',
    },
    input:{
        borderBottomColor:'black',
        borderBottomWidth:0.5,
        width:300,
        marginVertical:10,
        padding:10,
        fontSize:20,
    },
})
export default Authentification