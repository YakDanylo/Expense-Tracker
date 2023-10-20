import { Ionicons } from "@expo/vector-icons"
import { COLORS } from "../constants/COLORS"
import { StyleSheet,View, Text,Pressable } from "react-native"


const CategoryButton = ({icon,name}) => {
  return (
    <Pressable onPress={e=>console.log(icon)}>
    <View style={styles.wrapper}>
        <View style={styles.icon}>
        <Ionicons name={icon} size={24} color={COLORS.primary100}/>
    </View>
        <Text>{name}</Text>
    </View>
    </Pressable>
    
  )
}

export default CategoryButton

const styles = StyleSheet.create({
    icon:{
        borderWidth:0.2,
        borderColor:'gray',
        borderRadius:1000,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:15,
        paddingHorizontal:15,
        marginHorizontal:20,
        marginVertical:10,
    },
    wrapper:{
        justifyContent:'center',
        alignItems:'center'
    }
})