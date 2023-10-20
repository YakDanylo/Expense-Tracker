import { useEffect, useState } from "react"
import { Text,View,Button } from "react-native"
import axios from 'axios'
const Settings = () => {
  const [message,setMessage] = useState({})
  useEffect(()=>
  {
    fetch("http://192.168.1.3:5000/add-transaction")
    .then((res)=>console.log(res))
    .then((data)=>setMessage(data))
    .catch((error)=>console.log(error))
  },[])
  return (
    <View style={{marginTop:100}}>
      {/* <Text>{message.id}</Text>
      <Text>{message.name}</Text>
      <Text>{message.surname}</Text> */}
    </View>
    
  )
}

export default Settings