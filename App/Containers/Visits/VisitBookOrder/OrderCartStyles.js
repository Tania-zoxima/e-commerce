import { StyleSheet } from "react-native";
import { Helpers, Metrics, Fonts, Colors, ApplicationStyles } from "App/Theme";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default StyleSheet.create({
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
        height:hp("10%"),
        margin:15,
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
