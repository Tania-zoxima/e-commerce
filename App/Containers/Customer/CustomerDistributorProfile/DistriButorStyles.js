import { StyleSheet } from "react-native";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default StyleSheet.create({
  header: {
    backgroundColor: Colors.white,
    borderColor: "white",
    // height: hp("6.5%"),
    // alignItems: "center",
    // justifyContent: "flex-start",
    // flexDirection: "column",
    // top:hp("-6%")
    // position:"absolute"
    // marginTop: hp("2%"),
    // elevation: 2,
  },
  headerText: {
    fontSize: 20,
    padding: 20,
  },
  headView: {
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    borderBottomColor: Colors.lightGrey,

    height: hp("8.5%"),
  },

  titleText: {
    fontFamily: "Segoe UI",
    fontSize: 19,
    fontWeight: "bold",
    // padding:18,
    width: wp("60%"),
    marginTop: hp("2%"),
    marginLeft: hp("2%"),
  },
  titleText1: {
    fontFamily: "Segoe UI",
    fontSize: 12,
    padding: 18,
    left: wp("60%"),
    bottom: hp("4%"),
    color: Colors.background,
  },
  icon: {
    marginLeft: wp("19%"),
    backgroundColor: Colors.phoneClr,
    color: Colors.white,
    borderRadius: 100,
    height: hp("4%"),
    width: wp("8%"),
    padding: "1.5%",
    fontSize: 18,
    // fontWeight: "bold",
    top: hp("2.5%"),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  icon1: {
    marginLeft: wp("-20%"),
    backgroundColor: Colors.cardblue,
    color: Colors.white,
    borderRadius: 100,
    height: hp("4%"),
    width: wp("8%"),
    padding: "1.4%",
    fontSize: 20,
    fontWeight: "bold",
    top: hp("2.5%"),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  icon2: {
    marginLeft: wp("-15%"),
    color: Colors.black,

    height: hp("3%"),
    width: wp("7%"),

    fontSize: 22,
    fontWeight: "bold",
    top: hp("2.2%"),
    backgroundColor: "black",
  },
  award: {
    left: wp("29%"),
    color: Colors.mustard,
    fontSize: 28,
    fontWeight: "bold",
    bottom: hp("0%"),
  },
  textClr: {
    color: Colors.headerClr,
  },
  button: {
    borderRadius: 20,
    height: hp("5.5%"),
    backgroundColor: Colors.background,
    left: wp("4.5%"),
    width: wp("45%"),
    bottom: hp("0%"),
  },
  buttonBlue: {
    borderRadius: 20,
    height: hp("5.5%"),
    backgroundColor: Colors.bluebackground,
    left: wp("4.5%"),
    width: wp("45%"),
    bottom: hp("0%"),
  },

  buttontext: {
    fontFamily: "Lato",
    fontSize: 14,
    color: Colors.white,
    left: hp("3.2%"),
    bottom: hp("1.2%"),
  },
  backBtn: {
    color: Colors.background,
    paddingLeft: 3,
    paddingTop: 22,
    fontSize: wp("6%"),
  },
  numStyle: {
    left: wp("30%"),
    fontSize: 25,
    top: hp("-1%"),
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
  psmPickerStyles: {
    marginTop: -5,
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: "8%",
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 25,
    elevation: 5,
    marginLeft: "5%",
  },
  actionButton: {
    borderWidth: 1.5,
    width: wp("20%"),
    height: 35,
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: Colors.clrF1F9FF,
    marginHorizontal: wp("1.2%"),
  },
  actionButtonText: {
    fontSize: wp("3%"),
    fontFamily: ApplicationStyles.textMediumFont,
  },
  selectedActionButton: {
    borderWidth: 1.5,
    width: wp("20%"),
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: Colors.clrF1F9FF,
    marginHorizontal: wp("1.2%"),
    height: 35,
  },
  refreshIcon: {
    color: Colors.primary,
    fontSize: wp("5%"),
    alignSelf: "center",
    padding: hp("1%"),
    paddingBottom: 0,
    position: "absolute",
    right: wp("3.3%"),
    marginTop: hp("16.5%"),
    zIndex: 2,
  },
  loadingIcon: {
    color: Colors.primary,
    fontSize: wp("6.9%"),
    alignSelf: "center",
    position: "absolute",
    right: wp("5.3%"),
    marginTop: hp("13.2%"),
    zIndex: 2,
  },
});
