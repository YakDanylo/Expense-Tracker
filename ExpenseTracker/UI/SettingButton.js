import {Text,View,StyleSheet,Pressable} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { COLORS } from "../constants/COLORS"
import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
const SettingButton = ({children,icon,onPress}) => {
  const {theme} = useContext(ThemeContext)


  const styles = StyleSheet.create({
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
        fontSize: 25,
        marginLeft: 15,
        color:theme.opposite
      }
})

  return (
    <Pressable onPress={onPress}>
    <View >
        <View style={styles.buttonWrapper}>
                <Ionicons name={icon} size={24} color={COLORS.primary100}/>
                <Text style={styles.button}>{children}</Text>
        </View>
    </View>
    </Pressable>
  )
}

export default SettingButton