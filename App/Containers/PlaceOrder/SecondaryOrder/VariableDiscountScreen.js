import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors, ApplicationStyles } from "App/Theme";

function VariableDiscountScreen() {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: Colors.darkRedPink,
          width: wp(95),
          left: wp(2.5),
          height: hp(6),
          marginBottom: hp(1),
          // margin: 4,
          marginTop: hp(5),
          paddingLeft: wp("2%"),
          paddingRight: wp("2%"),
        }}
      >
        <Text
          style={{
            textAlignVertical: "center",
            width: wp("12%"),
            borderColor: Colors.white,
            borderRightWidth: 2,
            color: Colors.white,
          }}
        >
          S.No.
        </Text>
        <Text
          style={{
            textAlignVertical: "center",
            right: wp("2.5%"),
            width: wp("24%"),
            borderColor: Colors.white,
            borderRightWidth: 2,
            color: Colors.white,
          }}
        >
          Product Code
        </Text>
        <Text
          style={{
            textAlignVertical: "center",
            right: wp("1%"),
            width: wp("30%"),
            borderColor: Colors.white,
            borderRightWidth: 2,
            color: Colors.white,
          }}
        >
          Product Name
        </Text>
        <Text style={{ textAlignVertical: "center", color: Colors.white }}>
          Discount
        </Text>
      </View>
    </View>
  );
}

export default VariableDiscountScreen;
const Styles = StyleSheet.create({
  placeholder: {
    borderColor: "transparent",
    left: wp("0%"),
    fontFamily: "Segoe UI",
    // color:Colors.black,
    fontSize: 14,
    top: hp("3.5%"),
    fontWeight: "bold",
  },

  outerView: {
    flexDirection: "row",
    flexWrap: "wrap",
    left: "2%",
    right: "5%",
    top: "2%",
  },
  textView: {
    width: wp("38%"),
    borderBottomWidth: 1,
    borderColor: Colors.lightGrey,
    marginTop: hp("1.5%"),
    height: hp("10%"),
    margin: 15,
    // padding:10
  },

  textStyle: {
    fontFamily: "Segoe UI",
    color: Colors.lightGrey,
    top: hp("2.5%"),
    fontSize: 14,
    fontWeight: "bold",
  },
});
