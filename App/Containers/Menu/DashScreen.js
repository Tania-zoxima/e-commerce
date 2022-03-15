import React from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import GenericIcon from "App/Components/GenericIcon";
import NavigationService from "App/Services/NavigationService";

export default function DashScreen() {
  return (
    <ScrollView>
    <View style={styles.container}>
      <GenericIcon
        name={"arrow-back"}
        onPress={NavigationService.goback}
        style={{ color: "#ed1b24", padding: 5, fontSize: 30 }}
      />
      <View style={{ top: hp("4%") }}>
        <View
          style={{
            width: "100%",
            padding: 10,
            backgroundColor: "#ed1b24",
            height: hp("8%"),
            flexDirection: "row",
            borderWidth: 1,
            borderColor: "#333",
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>S.No</Text>
          <Text style={{ color: "white", fontSize: 20, left: wp("13%") }}>
            Reports
          </Text>
        </View>
        <FlatList
        style={{height:hp("70%")}}
          data={[
            { id: "1", name: "One View Dashboard" },
            { id: "2", name: "Performance of Partners Dashboard" },
            { id: "3", name: "Point Expiry - Dashboard" },
            { id: "4", name: "Top 10 Members - Dashboard" },
          ]}
          keyExtractor={(item, index) => item.name + index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => NavigationService.navigate("LoyaltyDash", item)}
            >
              <Text
                style={{
                  alignSelf: "flex-start",
                  justifyContent: "flex-start",
                  textAlign: "left",
                  fontSize:13
                }}
              >
                {item.id}
              </Text>
              <Text style={{ alignSelf: "flex-end", left: wp("16%"),fontSize:13 }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    paddingTop: 10,
  },
  listItem: {
    borderWidth: 1,
    padding: 20,
    flexDirection: "row",
  },
});
