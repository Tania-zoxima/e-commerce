import { StyleSheet, Dimensions } from "react-native";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default StyleSheet.create({
  placeholder: {
        borderColor: "transparent",
        right: wp("1.5%"),
        fontFamily: "Segoe UI",
        // color:Colors.black,
        fontSize: 13,
        top: hp("2%"),
        fontWeight: "bold",
      },
    
      outerView: {
        flexDirection: "row",
        flexWrap: "wrap",
        left: "4%",
        right: "5%",
        top: "-5%",
        // marginBottom: "20%",
      },
      textView: {
        width: wp("30%"),
        borderBottomWidth: 1,
        borderColor: Colors.lightGrey,
        marginTop: hp("1.5%"),
      },
    
      textView1: {
        width: wp("75%"),
        borderBottomWidth: 1,
        borderColor: Colors.lightGrey,
        marginTop: hp("1.5%"),
      },
      textStyle: {
        fontFamily: "Segoe UI",
        color: Colors.black,
        top: hp("2.5%"),
        fontSize: 13,
        fontWeight: "bold",
      },
});