import { StyleSheet } from "react-native";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default StyleSheet.create({
  heading: {
    fontFamily: ApplicationStyles.textFont,
    color: Colors.lightGrey,
    fontSize: 13,
  },
  value: {
    paddingTop: 10,
    paddingBottom: 3,
    fontWeight: "bold",
    fontSize: 13,
    top: "8%",
  },
  container: {
    paddingTop:30,
    width: wp("30%"),
    left: "25%",
    margin: "5%",
    borderBottomWidth: 2,
    height:"18%",
    justifyContent: "center",
    borderColor: Colors.tabBorder,
  },
  container1: {
    paddingTop:11,
    left: "10%",
    width: wp("68%"),
    margin: "5%",
    borderBottomWidth: 2,
    height: "18%",
    justifyContent: "center",
    borderColor: Colors.tabBorder,
  },
  
  
  
 
  
});
