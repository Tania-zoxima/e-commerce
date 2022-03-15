import { StyleSheet, Dimensions } from "react-native";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default StyleSheet.create({
  action: {
    // marginTop: 80,
    width: 360,
  },
  actionButton: {
    overflow: "visible",
    paddingLeft: wp("0.5%"),
    paddingRight: wp("4%"),
    // marginBottom: hp('1%'),
    marginTop: hp("1%"),
    marginRight: wp("2%"),
    marginLeft: wp("0.5%"),
    height: hp("7.2%"),
    elevation: 10,
    width: wp("40%"),
    // borderWidth:4,
    // borderColor:Colors.white,
  },
  customSelectedTextStyle: {
    fontSize: wp("3.5%"),
    fontFamily: ApplicationStyles.textMsgFont,
    color: Colors.black,
  },

  selected: {
    backgroundColor: Colors.white,
    //  width: wp('22%'),
    textAlignVertical: "center",
    borderBottomWidth: 3,
    borderColor: Colors.darkRedPink,
    //  height:hp("8%")
  },
  selectedBlue: {
    backgroundColor: Colors.white,
    //  width: wp('22%'),
    textAlignVertical: "center",
    borderBottomWidth: 3,
    borderColor: Colors.bluebackground,
    //  height:hp("8%")
  },
  customSelectedStyleCorpBlue: {
    //  borderWidth: 1,
    backgroundColor: Colors.white,
    color: Colors.lightGrey,
    borderColor: Colors.white,
  },
  actionButtonText: {
    fontSize: wp("3.5%"),
    fontWeight: "700",
    fontFamily: ApplicationStyles.textMsgFont,
    color: Colors.lightGrey,
  },
  button: {
    ...Metrics.mediumVerticalMargin,
    ...Metrics.smallBottomMargin,
    backgroundColor: Colors.button,
    borderColor: Colors.border,
    borderStyle: "solid",
    borderWidth: 1,
  },
  container: {
    backgroundColor: Colors.white,
    flex: 1,
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
    marginBottom: 10,
  },
  plus: {
    backgroundColor: Colors.white,
    borderRadius: 50,
    height: 50,
    width: 50,
  },
  plusIcon: {
    borderRadius: 50,
    bottom: 75,
    position: "absolute",
    right: 25,
    borderRadius: 50,
    height: 45,
    width: 45,
    // backgroundColor: Colors.button,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: Colors.white,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 18,
  },
  heading: {
    alignSelf: "center",
    color: Colors.primary,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: wp("4.2%"),
    marginBottom: 0,
    fontWeight: "bold",
    marginRight: "5%",
  },
  head: {
    color: Colors.background,
    fontFamily: "Segoe UI",
    fontSize: 17,
    fontWeight: "bold",
    // marginBottom: hp("3%"),
    width: wp("65%"),
  },
  headBlue: {
    color: Colors.bluebackground,
    fontFamily: "Segoe UI",
    fontSize: 17,
    fontWeight: "bold",
    // marginBottom: hp("3%"),
    width: wp("65%"),
  },
  head1: {
    color: Colors.black,
    fontFamily: "Segoe UI",
    fontSize: 13,
    fontWeight: "bold",
    width: wp("65%"),
  },

  checkicon: {
    backgroundColor: Colors.phoneClr,
    color: Colors.white,
    borderRadius: 50,
    height: 30,
    width: 30,

    padding: "1.8%",

    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
  },
  checkicon1: {
    // marginLeft:wp('65%'),

    backgroundColor: Colors.cardblue,
    color: Colors.white,
    borderRadius: 50,
    height: 30,
    width: 30,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
  },
  ttl: {
    color: Colors.lightGrey,
    fontSize: wp("3%"),
    fontFamily: ApplicationStyles.textFont,
    left: wp("10%"),
    fontWeight: "bold",
    top: hp("1.5%"),
  },
  detail: {
    color: Colors.black,
    fontSize: wp("3%"),
    fontFamily: ApplicationStyles.textMsgFont,
    right: wp("10%"),
    fontWeight: "bold",
    top: hp("1.5%"),
  },
});
