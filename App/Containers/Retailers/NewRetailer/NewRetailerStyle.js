import { StyleSheet } from "react-native";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import { Left } from "native-base";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default StyleSheet.create({
  action: {
    // marginTop: 80,
    width: wp("90%"),
  },
  button: {
    width: 120,
    alignSelf: "center",
    height: hp("5%"),
    // marginTop: hp('-40%')
  },
  container: {
    ...Metrics.tinyHorizontalPadding,
    ...Metrics.tinyVerticalPadding,
    ...Helpers.center,
    backgroundColor: Colors.lightgrey,
    flex: 1,
  },
  heading: {
    alignSelf: "center",
    color: "#0720C4",
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: 24,
    marginBottom: 15,
  },
  link: {
    color: Colors.label,
    flexDirection: "row",
    height: 30,
    justifyContent: "flex-end",
  },
  linkText: {
    ...Fonts.input,
    color: Colors.label,
  },
  mb10: {
    marginBottom: hp("2%"),
    height: hp("5.5%"),
    fontSize: wp("3.7%"),
    justifyContent: "center",
    padding: 0,
  },
  text: {
    color: Colors.white,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 18,
  },
  picker: {
    borderRadius: hp("1%"),
    width: wp("88%"),
    minHeight: hp("5.7%"),
    marginBottom: hp("2%"),
    marginLeft: "6.5%",
  },
  pickerLabel: {
    color: Colors.placeHolder,
    fontFamily: ApplicationStyles.textFont,
    textAlign: "left",
    width: "99%",
    padding: 10,
    flexDirection: "row",
  },
  heading1: {
    alignSelf: "center",
    color: Colors.primary,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: wp("4.2%"),
    marginBottom: 0,
    fontWeight: "bold",
    marginRight: "5%",
  },
  outerView: {
    flexDirection: "row",
    flexWrap: "wrap",
    left: "0.5%",
    top: "0%",
    marginBottom: "2%",
  },
  textView1: {
    width: wp("90%"),
    borderBottomWidth: 1,
    borderColor: Colors.lightGrey,
    marginTop: hp("1.5%"),
  },

  textView2: {
    width: wp("90%"),
    marginTop: hp("1.5%"),
  },
  textStyle: {
    fontFamily: "Segoe UI",
    color: Colors.black,
    top: hp("2.5%"),
    fontSize: 13,
    fontWeight: "bold",
  },
  card: {
    flexDirection: "column",
    paddingTop: 20,
    paddingBottom: 5,

    paddingLeft: 10,
    paddingRight: 10,
    elevation: 10,
    backgroundColor: Colors.background,
    height: hp("10%"),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "8%",
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
    width: wp("100%"),
    right: "0.5%",
    top: "0%",
  },
  cardBlue: {
    flexDirection: "column",
    paddingTop: 20,
    paddingBottom: 5,

    paddingLeft: 10,
    paddingRight: 10,
    elevation: 10,
    backgroundColor: Colors.bluebackground,
    height: hp("10%"),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "8%",
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
    width: wp("100%"),
    right: "0.5%",
    top: "0%",
  },
  titleText: {
    color: Colors.white,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 26,
    fontWeight: "bold",
    left: "10%",
    bottom: hp("3%"),
  },
  textClr: {
    color: Colors.headerClr,
  },
  placeholder: {
    borderColor: "transparent",
    right: wp("1.5%"),
    fontFamily: "Segoe UI",
    color: Colors.black,
    fontSize: 13,
    top: hp("2%"),
    fontWeight: "bold",
  },

  // // dropDown: {
  // //   width: wp("45%"),
  // //   marginTop: hp("1.5%"),

  // // },
  dropDownInner: {
    top: hp("2%"),
    marginBottom: hp("3.5%"),
    height: hp("8%"),
  },
  button: {
    width: wp("52%"),
    height: hp("6.5%"),
    // right: wp("5%"),
    // marginTop:hp('65%'),
    //   // paddingBottom: 14,
    borderRadius: 3,
    textTransform: "uppercase",
    padding: 10,
    backgroundColor:Colors.darkRedPink
  },
  buttonBlue: {
    width: wp("52%"),
    height: hp("6.5%"),
    // right: wp("5%"),
    // marginTop:hp('65%'),
    //   // paddingBottom: 14,
    borderRadius: 3,
    textTransform: "uppercase",
    padding: 10,
    backgroundColor:Colors.bluebackground
  },
  // btnText:{
  //   textTransform:"uppercase",
  // },
  // dropDown: {
  //   // width: wp("85%"),
  //   // marginTop: hp("2%"),
  //   marginBottom:hp("3%"),
  //   height:40
  // },
  // dropDownInner: {
  //   // left: wp("5%"),
  //   // top: hp("3.5%"),
  // },
  // picker: {
  //   // borderRadius: 100,
  //   width: wp('85%'),
  //   // height: hp('5.7%'),
  //   marginBottom: hp('2%'),
  //   paddingHorizontal: 8
  // },
  backarrow: {
    paddingTop: hp("-1%"),
    paddingBottom: hp("1%"),
    marginRight: wp("90%"),
    fontSize: 25,
    color: Colors.white,
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
  recurringActionButton1: {
    borderColor: Colors.firozi,
    borderStyle: "dashed",
    borderWidth: 1,
    overflow: "hidden",
    borderRadius: 100,
    borderWidth: 2,
    alignSelf: "center",
    backgroundColor: Colors.black,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: wp("4%"),
    paddingRight: wp("4%"),
    marginRight: wp("50%"),
  },
  recurringActionButtonText1: {
    color: Colors.primary,
    fontSize: wp("4%"),
    textTransform: "capitalize",
    fontFamily: ApplicationStyles.textMediumFont,
  },
  recurringActionButtonIcon1: {
    color: Colors.primary,
    fontSize: wp("0%"),
  },
  bottomMargin: {
    // marginBottom: hp('2%'),
    width: "60%",
    marginLeft: wp("25%"),
    // marginTop:hp('4%'),
  },
});
