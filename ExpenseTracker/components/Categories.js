import { View,Text,StyleSheet } from "react-native"
import CategoryButton from "../UI/CategoryButton"

const Categories = ({month}) => {

  return (
        <View style={styles.wrapper}>
            <View style={styles.row}>
            <CategoryButton choosedMonth={month} value={"Food"} icon="fast-food" name={"Їжа"}/> 
            <CategoryButton choosedMonth={month} value={"Transport"} icon="car" name={"Транспорт"}/> 
            <CategoryButton choosedMonth={month} value={"Clothes"} icon="shirt" name={"Одяг"}/> 
            <CategoryButton choosedMonth={month} value={"Health"} icon="heart" name={"Здоров'я"}/> 
            </View>
            <View style={styles.row}>
            <CategoryButton choosedMonth={month} value={"Gifts"} icon="gift" name={"Подарунки"}/> 
            <CategoryButton choosedMonth={month} value={"entertainment"} icon="american-football" name={"Розваги"}/> 
            <CategoryButton choosedMonth={month} value={"Education"} icon="book" name={"Освіта"}/> 
            <CategoryButton choosedMonth={month} value={"Other"} icon="ellipsis-horizontal" name={"Інше"}/>
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