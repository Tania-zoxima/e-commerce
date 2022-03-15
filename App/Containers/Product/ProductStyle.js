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
  },
  titleText: {
    color: Colors.white,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 28,
    fontWeight: "bold",
    left: "28%",
     bottom: hp("2%"),
  },
  textClr: {
    color: Colors.headerClr,
  },
  searchContainer: {
    paddingVertical: 8,
    width: "88%",
    borderRadius: 10,
    paddingHorizontal: 3,
    paddingTop: 0,
    elevation: 10,
    backgroundColor: "white",
    fontSize: wp("4.8%"),
    fontWeight: "700",
    color: Colors.blue,
    height: "25%",
    margin: "2%",

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
    marginLeft: "15%",
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
    left: wp("75%"),
    top: hp("-4%"),
    backgroundColor: Colors.phoneClr,
    color: Colors.white,
    borderRadius: 50,
    height: hp(4),
    width: wp(8),
    padding: 7,
    fontSize: 18,
  },
  ttl: {
    color: Colors.lightGrey,
    fontSize: wp("3.5%"),
    fontFamily: ApplicationStyles.textFont,
    left: wp("18%"),
    fontWeight: "bold",
  },
  detail: {
    color: Colors.black,
    fontSize: wp("3.7%"),
    fontFamily: ApplicationStyles.textMsgFont,
    right: wp("18%"),
    fontWeight: "bold",
  },
  status: {
    color: Colors.white,

    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: 10,
    // marginBottom: 3,
    backgroundColor: Colors.cardblue,
    width: wp(18),
    // padding: wp(0.5),
    borderRadius: 8,
    top: hp("1%"),
    left: wp("3%"),
    height: hp("2%"),
    textAlign: "center",
  },
  backarrow: {
    color: Colors.white,
    fontSize: 32,
    paddingLeft: 7,
    paddingTop: 2,
  },
  head:{
      fontWeight:"bold",
      fontSize:20
  },
  plusIcon: {
    borderRadius: 50,
    top: hp("75%"),
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
});