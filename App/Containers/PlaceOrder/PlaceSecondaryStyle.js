import { StyleSheet, Dimensions } from "react-native";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import { Row } from "native-base";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default StyleSheet.create({
  card: {
    flexDirection: "column",

    paddingBottom: 5,
    width: wp("100%"),
    paddingLeft: 10,
    paddingRight: 10,
    elevation: 10,
    backgroundColor: Colors.background,
    height: hp("20%"),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "8%",
    borderBottomLeftRadius: 65,
    borderBottomRightRadius: 65,
    position: "absolute",
  },
  cardBlue: {
    flexDirection: "column",

    paddingBottom: 5,
    width: wp("100%"),
    paddingLeft: 10,
    paddingRight: 10,
    elevation: 10,
    backgroundColor: Colors.bluebackground,
    height: hp("20%"),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "8%",
    borderBottomLeftRadius: 65,
    borderBottomRightRadius: 65,
    position: "absolute",
  },
  titleText: {
    color: Colors.white,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 18,
    fontWeight: "bold",
    // left: "28%",
    bottom: hp("2%"),
    position:"absolute"
  },
  textClr: {
    color: Colors.headerClr,
  },
  searchContainer: {
    // paddingVertical: 8,
    width: "45%",
    borderRadius: 10,
    // paddingHorizontal: 3,
    paddingTop: 2,
    // elevation: 10,
    // backgroundColor: "white",
    // fontSize: wp("4.8%"),
    // fontWeight: "700",
    // color: Colors.blue,
    left: "5%",
    marginTop: "-1%",
    // bottom:hp("2%"),
    //     alignSelf: "center",
  },

  backarrow: {
    color: Colors.white,
    fontSize: 32,
    paddingLeft: 15,
    paddingTop: 2,
  },
  selectPickerStyle: {
    width: wp("40%"),
    height: hp("5.7%"),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    marginTop: hp("-0.5%"),
    backgroundColor: "white",
    marginLeft: "11%"
  },
});
