import { View,Text,StyleSheet } from "react-native"
import { FlatList,Platform } from "react-native"
import { COLORS } from "../constants/COLORS";
function DayOfWeek(day)
{
    const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
    return days[day-1]
}
const DayTransactionsInfo = ({ data }) => {
    function renderItem(itemData) {
        return (
            <View style={styles.itemsDayContainer}>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                <View style={{marginRight:5}}>
                    <Text style={{fontSize:12, color:COLORS.accent100}}>{itemData.item.category}</Text>
                </View>
                <View style={{marginRight:5}}>
                    <Text style={{fontSize:18,}}>{itemData.item.title}</Text>
                </View>
                </View>
                <View>
                    <Text style={{color:itemData.item.type==='income'?'#20ba53':'#e62c44'}}>${itemData.item.amount}</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.shadow}>
        <View style={styles.outerWrapper}>
            <View style={styles.totalDayInfo}>
                <View style={{flexDirection:'row'}}>
                    <Text style={{marginRight:5}}>{data[0].date.getDate()}</Text>
                    <Text>{DayOfWeek(data[0].date.getDay())}</Text>
                </View>
                <Text style={{color:'#20ba53'}}>$ 159</Text>
                <Text style={{color:'#e62c44'}}>$ 238</Text>
            </View>
            <View>
                <FlatList data={data} renderItem={renderItem} keyExtractor={(item)=>item.id} />
            </View>
        </View>
        </View>
    );
};

export default DayTransactionsInfo;

const styles = StyleSheet.create({
    totalDayInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal:5 ,
        padding:5,
        
    },
    itemsDayContainer: {
        flex: 1,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        borderRadius:8,
        alignItems: "center",
    },
    outerWrapper:{
        backgroundColor:'white',
        marginVertical:10,
        marginHorizontal:10,
        borderRadius:10,
        overflow:Platform.OS=='ios'?'':'hidden',
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 3,
            },
        shadowOpacity: 0.3,
        shadowRadius: 1,

        elevation: 7,
        },
});