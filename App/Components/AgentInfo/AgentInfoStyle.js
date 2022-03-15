import { StyleSheet } from "react-native";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default StyleSheet.create({
  heading: {
    fontSize: 13,
    fontFamily: ApplicationStyles.textFont,
    color: Colors.lightGrey,
    //   fontWeight:'bold'
  },
  value: {
    paddingTop: 10,
    paddingBottom: 3,
    fontWeight: "bold",
    fontSize: 13,
    top: "8%",
    fontFamily: ApplicationStyles.textMsgFont,
  },
  container: {
    paddingTop: 30,
    width: wp("35%"),
    left: "8%",
    margin: "5%",
    borderBottomWidth: 2,
    borderColor: Colors.tabBorder,
    height: "16.5%",
    justifyContent: "center",
  },
  areacontainer: {
    width: wp("35%"),
    left: "8%",
    margin: "5%",
  },
  valuecontainer: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 13,
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  value1: {
    fontWeight: "bold",
    fontSize: 13,
    marginBottom: 10,
    marginRight: 10,
    marginTop: "2%",
    padding: 10,
    justifyContent: "center",
    fontSize: 13,
    top: "8%",
    borderWidth: 2,
    borderColor: Colors.tabBorder,
    borderRadius: 25,
    marginLeft:5,
    alignSelf:"center"
  },
  // value2: {
  //   width: 110,
  //   fontWeight: "bold",
  //   fontSize: 13,
  //   marginBottom: 10,
  //   marginRight: 10,
  //   marginTop: "2%",
  //   padding: 10,
  //   justifyContent: "center",
  //   fontSize: 13,
  //   top: "8%",
  //   borderWidth: 2,
  //   borderColor: Colors.tabBorder,
  //   borderRadius: 25,
  //   marginLeft:20
  // },
});
