import { StyleSheet, Dimensions } from "react-native";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
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
    flexDirection: "column",
    left: "1.5%",
    top: "0%",
    marginBottom: "15%",
  },
  textView1: {
    width: wp("80%"),
    borderBottomWidth: 1,
    borderColor: Colors.lightGrey,
    marginTop: hp("1.5%"),
    left:wp("7%"),
  },
  textView: {
    width: wp("80%"),
    marginTop: hp("1.5%"),
    display:"flex",
    flexDirection:"row",
    height:hp(15)
  },
  textView2: {
    width: wp("40%"),
    borderBottomWidth: 1,
    borderColor: Colors.lightGrey,
    marginTop: hp("1.5%"),
    left:wp("7%"),
    height:hp(11)
  },
  textStyle: {
    fontFamily: "Segoe UI",
    color: Colors.black,
    top: hp("2.5%"),
    fontSize: 13,
    fontWeight: "bold",
  },
  dropDown: {
    width: wp("80%"),
    marginTop: hp("1.5%"),
    left:wp("7%"),
    marginBottom:hp("2%")
  },
  dropDownInner: {
    right: wp("2%"),
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
    width:wp(90)
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
    top: hp("5%"),
    left: wp("29%"),
    paddingBottom: 14,
    borderRadius: 3,
  },
  tabs: {
    backgroundColor: Colors.white,
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
    backgroundColor: Colors.white,
  },
});
