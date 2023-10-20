import { Ionicons } from '@expo/vector-icons'
import {View,Pressable,Text,StyleSheet} from 'react-native'

const CustomIconButton = ({icon,size,color, onPress}) => {
  return (
    <Pressable onPress={onPress}>
        <Ionicons name={icon} size={size} color={color}/>
    </Pressable>
  )
}

export default CustomIconButton