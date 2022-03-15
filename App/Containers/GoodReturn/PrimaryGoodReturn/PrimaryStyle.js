import { StyleSheet, Dimensions } from "react-native";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import { Row } from "native-base";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default StyleSheet.create({
  mainContainer: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  card: {
    flexDirection: "column",

    // marginTop: hp("21%"),
    width: wp("100%"),
    // paddingLeft: 3,
    // paddingRight: 3,
    elevation: 10,
    backgroundColor: Colors.background,
    height: hp("21%"),
    // justifyContent: "center",
    // alignItems: "center",
    // paddingHorizontal: "8%",
    borderBottomLeftRadius: 65,
    borderBottomRightRadius: 65,
  },
  cardBlue: {
    flexDirection: "column",

    // marginTop: hp("21%"),
    width: wp("100%"),
    // paddingLeft: 3,
    // paddingRight: 3,
    elevation: 10,
    backgroundColor: Colors.bluebackground,
    height: hp("21%"),
    // justifyContent: "center",
    // alignItems: "center",
    // paddingHorizontal: "8%",
    borderBottomLeftRadius: 65,
    borderBottomRightRadius: 65,
  },
  titleText: {
    color: Colors.white,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 17,
    fontWeight: "bold",
    left: "2%",
    bottom: hp("1%"),
    top: hp("-5%"),
  },
  textClr: {
    color: Colors.headerClr,
  },
  searchContainer: {
    paddingVertical: 8,
    width: "88%",
    borderRadius: 10,
    paddingHorizontal: 3,
    paddingTop: 7,
    elevation: 10,
    backgroundColor: "white",
    fontSize: wp("4.8%"),
    fontWeight: "700",
    color: Colors.blue,
    height: "25%",
    top: hp("-3%"),

    alignSelf: "center",
  },
  bodyCard: {
    borderRadius: 6,
    elevation: 5,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: Colors.darkGreyClr,
    shadowOpacity: 0.3,
    borderColor: Colors.darkGreyClr,
    shadowRadius: 2,
    width: "90%",

    height: "30%",
    alignSelf: "center",
    bottom: "15%",
    flexDirection: "column",

    backgroundColor: Colors.white,
  },

  textStyle: {
    marginLeft: "20%",
    color: Colors.lightGrey,
    fontSize: 14,
    fontWeight: "bold",
    // marginBottom:'15%'
    // alignSelf:'center'
  },
  headerStyle: {
    color: Colors.black,
    fontSize: 20,
    fontWeight: "bold",
    right: "98%",
  },
  textStyle1: {
    marginLeft: "15%",
    color: Colors.lightGrey,
    fontSize: 8,
    padding: 1.5,
    color: Colors.white,
    backgroundColor: Colors.cardblue,
    borderRadius: 8,
    fontFamily: "Segoe UI",
    width: "19%",
    height: "55%",
    textAlign: "center",
    right: wp(19),
    top: hp(1.5),
  },
  cardContent: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  iconstyle: {
    // left: wp("75%"),
    // top: hp("-4%"),
    marginLeft: wp("1%"),
    marginTop: hp("-1%"),
    // marginBottom:hp("7%"),
    backgroundColor: Colors.phoneClr,
    color: Colors.white,
    borderRadius: 50,
    height: hp(4),
    width: wp(8),
    padding: 7,
    fontSize: 18,
  },

  status: {
    color: Colors.cardblue,
    position: "relative",
  },
  backarrow: {
    color: Colors.white,
    fontSize: 32,
    // paddingRight: 100,
    paddingTop: 0,
    position: "relative",
  },
  //   head: {
  //     color: Colors.black,
  //     fontFamily: ApplicationStyles.textMsgFont,
  //     fontSize: 20,
  //     textTransform: "capitalize",
  //   },
  container: {
    flex: 1,
  },
  plusIcon: {
    borderRadius: 50,
    // bottom: 40,
    // position: "absolute",
    // left: 10,
    top: hp("55%"),
    left: wp("35%"),
    borderRadius: 50,
    height: 45,
    width: 45,
    backgroundColor: Colors.button,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  buttons: {
    left: wp("2.5%"),
    borderRadius: 6,
    height: hp("5%"),
    top: hp("3%"),
    // bottom: hp("-2%"),
    width: wp("30%"),
    alignSelf: "flex-end",
    top: hp("-2%"),
    zIndex: 10000,
  },
  buttontext: {
    fontFamily: "Lato",
    fontSize: 13,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  ttl: {
    color: Colors.lightGrey,
    fontSize: wp("3.5%"),
    fontFamily: "Rubik",
    fontWeight: "bold",
    bottom: hp("2%"),
    top: hp("4.5%"),
    left: wp("2%"),
    position: "relative",
  },
  detail: {
    color: Colors.black,
    fontSize: wp("3.5%"),
    fontFamily: "Rubik",
    fontWeight: "bold",
    bottom: hp("2%"),
    left: wp("23%"),
    //  right: wp("17%"),
    top: hp("4.5%"),
    width: wp("38%"),
    position: "relative",
  },
  date: {
    fontSize: 35,
    fontFamily: "Rubik",
    color: Colors.background,
    left: hp("1%"),
    top: hp("4%"),
    textAlign: "center",
    fontWeight: "600",
    position: "relative",
  },
  month: {
    fontSize: 18,
    fontFamily: "Rubik",
    color: Colors.background,
    // left: hp("2.8%"),
    fontWeight: "bold",
    left: wp("2.8%"),
    top: hp("2.8%"),
    position: "relative",
  },
  head: {
    fontSize: 20,
    fontFamily: "Rubik",
    // left: hp("1%"),
    fontWeight: "bold",
    color: Colors.background,
    top: hp("-0.8%"),
    position: "absolute",
  },
  dateBlue: {
    fontSize: 35,
    fontFamily: "Rubik",
    color: Colors.background,
    left: hp("1%"),
    top: hp("4%"),
    textAlign: "center",
    fontWeight: "600",
    position: "relative",
  },
  monthBlue: {
    fontSize: 18,
    fontFamily: "Rubik",
    color: Colors.background,
    // left: hp("2.8%"),
    fontWeight: "bold",
    left: wp("2.8%"),
    top: hp("2.8%"),
    position: "relative",
  },
  headBlue: {
    fontSize: 20,
    fontFamily: "Rubik",
    // left: hp("1%"),
    fontWeight: "bold",
    color: Colors.background,
    top: hp("-0.8%"),
    position: "absolute",
  },
  head1: {
    fontSize: 11,
    fontFamily: "Rubik",
    right: hp("5%"),
    textAlign: "center",
    // fontWeight:'bold',
    top: hp("3.5%"),
    color: Colors.cardblue,
  },
  status1: {
    left: wp("60%"),
    zIndex: 1002,
    width: wp("26%"),
    position: "relative",
    // top:hp("-1%")
  },
  datePicker: {
    alignSelf: "center",
    backgroundColor: Colors.button,
    borderRadius: 100,
    flexDirection: "row",
    width: wp("43%"),
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  monthPicker: {
    alignSelf: "center",
    backgroundColor: Colors.button,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    width: wp("25%"),
  },
  dateText: {
    fontFamily: ApplicationStyles.textMediumFont,
    color: Colors.white,
    fontSize: wp("3.3%"),
    textTransform: "capitalize",
  },
  dateIcon: {
    color: Colors.white,
    fontSize: wp("7%"),
    marginLeft: 0,
    marginRight: 0,
    zIndex: 2,
    paddingLeft: wp("3%"),
  },
  dateChangeIcon: {
    color: Colors.button,
    alignSelf: "center",
    paddingHorizontal: wp("3%"),
    fontSize: wp("11%"),
  },
});