import { View,Text,Pressable } from "react-native"
const CustomButton = ({children, color, onPress,size=14}) => {
  return (
    <Pressable onPress={onPress}>
        <Text style={{color:color,fontSize:size}}>{children}</Text>
    </Pressable>
  )
}

export default CustomButton