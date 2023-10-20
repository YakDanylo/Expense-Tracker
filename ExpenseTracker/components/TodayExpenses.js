import { Button } from "react-native"
import { View,Text,StyleSheet,FlatList } from "react-native"
import CustomButton from "../UI/CustomButton";
const DUMMY_DATA = [
    { title: "Amazon", value: 1000, time: "12.25 PM" },
    { title: "Google", value: 2500, time: "2.45 PM" },
    { title: "Apple", value: 1500, time: "3.30 PM" },
    { title: "Microsoft", value: 1200, time: "4.15 PM" },
    { title: "Facebook", value: 800, time: "4.45 PM" },
    { title: "Tesla", value: 1800, time: "5.00 PM" }
];

function renderItem(itemData) {
    return (
        <View style={styles.itemWrapper}>
            <View style={{ flexDirection: "column", justifyContent: "center" }}>
                <Text style={{ fontSize: 24 }}>{itemData.item.title}</Text>
                <Text>{itemData.item.time}</Text>
                <CustomButton color="blue" onPress={()=>console.log("flkgflkg")}>View Details</CustomButton>
            </View>
            <View>
                <Text style={{ fontSize: 24 }}>{itemData.item.value}</Text>
            </View>
        </View>
    );
}

const TodayExpenses = () => {
    return (
        <View style={styles.wrapper}>
            <FlatList
                data={DUMMY_DATA}
                renderItem={renderItem}
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    );
};

export default TodayExpenses;

const styles = StyleSheet.create({
    itemWrapper: {
        backgroundColor: "lightgray",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
    },
    wrapper: {
        margin: 20,
        borderRadius: 8,
        overflow: "hidden",
    },
    
});