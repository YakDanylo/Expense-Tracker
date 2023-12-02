import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState,useContext } from "react"
import { Text,View,Button, ScrollView,StyleSheet } from "react-native"
import { useNavigation } from '@react-navigation/native';
import SettingButton from "../UI/SettingButton";
import { ThemeContext } from "../context/ThemeContext";
const Settings = () => {
  const [message, setMessage] = useState({});
  const navigation = useNavigation()
  const {theme,changeTheme} = useContext(ThemeContext)
  function handlePress(screen) {
    navigation.navigate(screen)
  }
  
  const styles = StyleSheet.create({
    container: {
      marginTop: 10,
    },
    wrapper:{
  
      margin: 10,
      padding: 10,
      backgroundColor: theme.primary,
      borderRadius: 10,
      shadowColor: "#000",
          shadowOffset: {
            width: 0, 
            height: 3,
              },
          shadowOpacity: 0.3,
          shadowRadius: 1,
          elevation: 7,
          
    },
    buttonWrapper:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'flex-start',
      backgroundColor: theme.secondary,
      margin: 10,
      padding: 10,
      borderRadius: 10,
      shadowColor: "#000",
          shadowOffset: {
            width: 0, 
            height: 3,
              },
          shadowOpacity: 0.3,
          shadowRadius: 0.5,
          elevation: 5,
          
    },
    button:{
      fontSize: 20,
      marginLeft: 10,
      
    }
  });

  return (
    <View style={{flex:1,backgroundColor:theme.primary}}>
      <View style={{marginTop:40,justifyContent:'center',alignItems:'center',}}>
        <Text style={{fontSize:32,fontWeight:'bold', color:theme.opposite}}>Всякі трати</Text>
      </View>

    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View >
          <SettingButton icon={"person"} onPress={()=>handlePress("Profile")}>
            Профіль
          </SettingButton>
        </View>
        <View>
        <SettingButton icon={"earth"} >
            Мова (В розробці)
          </SettingButton>
        </View>
        <View >
        <SettingButton icon={"moon"} onPress={changeTheme}>
            Theme
          </SettingButton>
        </View>
        <View>
        <SettingButton icon={"cash"}>
            Currency (В розробці)
          </SettingButton>
        </View>
      </View>
    </View>
    </View>
  );
}

export default Settings