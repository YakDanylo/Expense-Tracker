import { View,Text,Pressable } from "react-native"
const CustomButton = ({children, color, onPress}) => {
  return (
    <Pressable onPress={onPress}>
        <Text style={{color:color}}>{children}</Text>
    </Pressable>
  )
}

export default CustomButton