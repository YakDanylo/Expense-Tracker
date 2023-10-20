import { View,Text,StyleSheet } from "react-native"
import CategoryButton from "../UI/CategoryButton"


const Categories = () => {
  return (
        <View style={styles.wrapper}>
            <View style={styles.row}>
            <CategoryButton icon="fast-food" name={"Food"}/> 
            <CategoryButton icon="car" name={"Transport"}/> 
            <CategoryButton icon="shirt" name={"Clothes"}/> 
            <CategoryButton icon="heart" name={"Health"}/> 
            </View>
            <View style={styles.row}>
            <CategoryButton icon="gift" name={"Presents"}/> 
            <CategoryButton icon="american-football" name={"Entertaiment"}/> 
            <CategoryButton icon="book" name={"Education"}/> 
            <CategoryButton icon="bicycle" name={"Hobby"}/> 
            </View> 
        </View>
  )
}

export default Categories

const styles = StyleSheet.create({
    wrapper:{
        flexDirection:'column',

    },
    row:{
        flexDirection:'row',
        justifyContent:'center'
    }
})