import { StyleSheet, Dimensions } from "react-native";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import { Row } from "native-base";
import InputText from "App/Components/FormInput/InputText";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default StyleSheet.create({
  placeholder: {
    borderColor: "transparent",
    left: wp("0.5%"),
    fontFamily: "Segoe UI",
    color: Colors.grey,
    fontSize: 14,
    top: hp("4%"),
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderColor: Colors.lightGrey,
    paddingBottom:hp("1%")
  },

  outerView: {
    flexDirection: "row",
    flexWrap: "wrap",
    left: "1.5%",
    top: "2%",
    marginBottom: "30%",
  },
  textView: {
    width: wp("40%"),
    // borderBottomWidth: 1,
    // borderColor: Colors.lightGrey,
    marginTop: hp("1.5%"),
    // height:hp("9%"),
  },
  textViewdate: {
    width: wp("40%"),
    height: hp("12%"),
    borderBottomWidth: 1,
    borderColor: Colors.lightGrey,
    marginTop: hp("1.5%"),
  },
  textView1: {
    width: wp("90%"),
    // borderBottomWidth: 1,
    // borderColor: Colors.lightGrey,
    marginTop: hp("1.5%"),
  },
  textStyle: {
    fontFamily: "Segoe UI",
    color: Colors.black,
    top: hp("2.5%"),
    fontSize: 14,
    fontWeight: "bold",
    paddingTop:hp("1%")
  },
  dropDown: {
    width: wp("45%"),
    marginTop: hp("1.5%"),
  },
  dropDownInner: {
    left: wp("20%"),
    top: hp("3.5%"),
  },
  radoiBtnOuter: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  radioBtnInner: {
    flexDirection: "row",
    width: wp("30%"),
    marginTop: hp("5%"),
  },
  radioText: {
    fontFamily: "Segoe UI",
    fontSize: 13,
    color: Colors.grey,
    fontWeight: "bold",
  },
  radioBtn: {
    borderColor: "black",
    marginLeft: "10%",
  },
  titleText: {
    fontFamily: "Open Sans",
    color: Colors.lightGrey,
    top: hp("4.5%"),
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.background,
    marginBottom: hp("4.5%"),
    width: wp(90),
  },
  checkBox: {
    // fontFamily:'Open Sans',
    // color:Colors.lightGrey,
    // top:hp('3.5%'),
    // fontSize:16,
    // fontWeight:'bold',
    // color:Colors.background,
    // marginBottom:hp('3.5%')
  },
  button: {
    width: wp("29%"),
    height: hp("5%"),
    marginTop: hp("9%"),
    left: wp("29%"),
    paddingBottom: 14,
    borderRadius: 3,
  },
  tabs: {
    backgroundColor: Colors.user,
    color: Colors.white,
    marginBottom: hp("10%"),
    borderBottomWidth: 0,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  tabText: {
    color: "black",
    fontFamily: "Open Sans",
    fontSize: wp("3%"),
    fontWeight: "bold",
  },
  tabHeading: {
    backgroundColor: Colors.white,
    paddingHorizontal: 0,
  },
  tabUnderLine: {
    backgroundColor: Colors.background,
  },
  mainTabs: {
    backgroundColor: Colors.user,
  },
  picker: {
    // borderRadius: 100,
    borderColor: "#515C6F",
    width: wp("40%"),
    borderWidth: 0,
    // elevation:5,
    backgroundColor: "white",
    height: hp("5%"),
    // height: hp('5.5%'),
    marginTop: hp("3.5%"),
    // marginBottom: hp('2%'),
    fontSize: wp("2%"),
    justifyContent: "center",
  },
});
