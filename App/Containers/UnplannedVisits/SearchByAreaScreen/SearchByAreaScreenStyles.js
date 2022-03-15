import { StyleSheet, Dimensions } from "react-native";
import { Colors, ApplicationStyles, Metrics } from "App/Theme";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default StyleSheet.create({
  darkCard: {
    ...Metrics.normalPadding,
    alignSelf: "stretch",
    backgroundColor: Colors.label,
    borderRadius: 10,
    margin: 5,
    elevation: 3,
  },
  darkDetail: {
    fontSize: 15,
    color: Colors.clrF1F9FF,
    fontFamily: ApplicationStyles.textMsgFont,
  },
  darkTitle: {
    color: Colors.white,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: 18,
    marginBottom: 5,
    textTransform: "capitalize",
  },
  darkTtl: {
    color: Colors.clrF1F9FF,
    fontSize: 15,
    fontFamily: ApplicationStyles.textFont,
  },
  detail: {
    color: Colors.clr66,
    fontSize: 15,
    fontFamily: ApplicationStyles.textMsgFont,
  },
  strip: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    color: Colors.clr0094FF,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: 18,
    marginBottom: 5,
    textTransform: "capitalize",
  },
  // ttl: {
  //   color: Colors.clr66,
  //   fontSize: 15,
  //   fontFamily: ApplicationStyles.textFont,
  // },

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
    // overflow: 'visible',
    // paddingLeft: wp('4%'),
    // paddingRight: wp('4%'),
    // marginBottom: hp('1%'),
    // marginTop: hp('2.5%'),
    // marginRight: wp('2%'),
    // marginLeft: wp('0%'),
    // height: hp('5.0%'),
    // elevation:10,
    // width: wp('50%'),
    // borderWidth:4,
    // borderColor:Colors.white,
  },
  customSelectedTextStyle: {
    fontSize: wp("3.5%"),
    // fontSize: wp('2.8%'),
    fontFamily: ApplicationStyles.textMsgFont,
    color: Colors.black,
  },
  selected: {
    backgroundColor: Colors.white,
    textAlignVertical: "center",
    borderBottomWidth: 3,
    borderColor: Colors.darkRedPink,
  },
  selectedBlue: {
    backgroundColor: Colors.white,
    textAlignVertical: "center",
    borderBottomWidth: 3,
    borderColor: Colors.bluebackground,
  },
  customSelectedStyleCorpBlue: {
    // backgroundColor: Colors.white,
    // width: wp('50%'),
    backgroundColor: Colors.white,
    backgroundColor: Colors.white,
    color: Colors.lightGrey,
    borderColor: Colors.white,
    //  width: wp('22%'),
    //  textAlignVertical:"center",borderBottomWidth:3,
    //  borderColor:Colors.darkRedPink,
  },
  actionButtonText: {
    fontSize: wp("3.5%"),
    fontWeight: "700",
    fontFamily: ApplicationStyles.textMsgFont,
    color: Colors.lightGrey,
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
    width: wp("65%"),
    // marginBottom: hp("3%"),
  },
  headBlue: {
    color: Colors.bluebackground,
    fontFamily: "Segoe UI",
    fontSize: 17,
    fontWeight: "bold",
    width: wp("65%"),
    // marginBottom: hp("3%"),
  },
  head1: {
    color: Colors.black,
    fontFamily: "Segoe UI",
    fontSize: 13,
    fontWeight: "bold",
    width: wp("65%"),
  },

  checkicon: {
    // left: wp("76%"),
    // top: hp("-7%"),
    backgroundColor: Colors.phoneClr,
    color: Colors.white,
    borderRadius: 100,
    height: hp("4%"),
    width: wp("8%"),
    // padding:5,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
  },

  checkicon1: {
    // left: wp("65%"),
    // top: hp("-11.1%"),
    backgroundColor: Colors.cardblue,
    color: Colors.white,
    borderRadius: 100,
    height: hp("4%"),
    width: wp("8%"),
    // paddingLeft: ('1.9%'),
    // paddingRight:('1%'),
    // paddingTop:("1.5%"),
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