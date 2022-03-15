import { StyleSheet, Dimensions } from "react-native";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: hp("0%"),
  },
  cardstyle: {
    backgroundColor: Colors.darkRedPink,
    width: wp("100%"),
    top: hp("-1%"),
    height: hp("25%"),
    borderBottomLeftRadius: 55,
    borderBottomRightRadius: 55,
  },
  backarrow: {
    color: Colors.white,
    fontSize: 32,
    paddingLeft: 7,
    paddingTop: 20,
  },
  title: {
    fontFamily: "Rubik",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    // bottom: hp("2%"),
    top:hp("-2%"),
    color: Colors.white,
  },

  head: {
    fontSize: 25,
    fontFamily: "Rubik",
    left: hp("0%"),
    fontWeight: "bold",
    color: Colors.black,
    top:hp("-1.5%")
  },

  ttl: {
    color: Colors.lightGrey,
    fontSize: wp("3.5%"),
    fontFamily: ApplicationStyles.textFont,
    left: wp("8%"),
    fontWeight: "bold",
  },
  detail: {
    color: Colors.black,
    fontSize: wp("3.7%"),
    fontFamily: ApplicationStyles.textMsgFont,
    right: wp("8%"),
    fontWeight: "bold",
  },
  plusIcon: {
    borderRadius: 50,
    bottom: hp("10%"),
    position: "absolute",
    right: wp("4.5%"),
    borderRadius: 50,
    height: hp("6%"),
    width: wp("12%"),
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10000,
    elevation: 6,
  },
  checkicon: {
    left: wp("75%"),
    top: hp("-4%"),
    backgroundColor: Colors.darkRedPink,
    color: Colors.white,
    borderRadius: 50,
    height: hp(4),
    width: wp(8),
    padding: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  titleText: {
    color: Colors.black,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 28,
    fontWeight: "bold",
  },
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
    left: "2%",
    right: "5%",
    top: "0%",
    marginBottom: "20%",
  },
  textView: {
    width: wp("38%"),
    borderBottomWidth: 1,
    borderColor: Colors.lightGrey,
    marginTop: hp("1.5%"),
  },

  textView1: {
    width: wp("85%"),
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
  dropDown: {
    width: wp("85%"),
    marginTop: hp("2%"),
    marginBottom:hp("3%"),
    marginLeft:wp("6%")
  },
  dropDownInner: {
    left: wp("5%"),
    top: hp("3.5%"),
  },
  picker: {
    // borderRadius: 100,
    width: wp('85%'),
    // height: hp('5.7%'),
    marginBottom: hp('2%'),
    paddingHorizontal: 8
  },
  button: {
    width: wp("29%"),
    height: hp("5%"),
    top: hp("5%"),
    left: wp("29%"),
    // paddingBottom: 4,
    borderRadius: 3,
  },
  searchContainer: {
    // paddingVertical: 8,
    width: "88%",
    borderRadius: 10,
    // paddingHorizontal: 3,
    // paddingTop:2,
    elevation: 10,
    backgroundColor: "white",
    fontSize: wp("4.8%"),
    fontWeight: "700",
    color: Colors.blue,
    height: "18%",
    margin: "1%",
    // top:'3%',
    alignSelf: "center",
  },
});
