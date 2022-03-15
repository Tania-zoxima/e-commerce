import { StyleSheet } from "react-native";
import { Helpers, Metrics, Fonts, Colors, ApplicationStyles } from "App/Theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default StyleSheet.create({
  tabs: {
    backgroundColor: Colors.user,
    color: Colors.white,
    marginBottom: hp("10%"),
    borderBottomWidth: 0,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  tabText: {
    color: "white",
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: wp("3.5%"),
    fontWeight: "bold",
  },
  tabText1: {
    color: "white",
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: wp("3.5%"),
    fontWeight: "bold",
    textAlign: "center",
  },
  tabHeading: {
    backgroundColor: Colors.darkRedPink,
    paddingHorizontal: 0,
  },
  tabHeadingBlue: {
    backgroundColor: Colors.bluebackground,
    paddingHorizontal: 0,
  },
  tabUnderLine: {
    backgroundColor: "white",
    bottom: hp("0.35%"),
  },
  mainTabs: {
    backgroundColor: Colors.user,
  },
  noDataText: {
    color: Colors.button,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: 16,
    textAlign: "center",
  },
  itemContainer: {
    padding: 10,
    borderRadius: 5,
    // height: hp("22%"),
  },

  itemTitle: {
    fontSize: wp("2.8%"),
    fontWeight: "bold",
    color: Colors.black,
    textAlign: "center",
    alignSelf: "center",
    paddingBottom:10,
    top: hp("1%"),
  },
  itemTitleStart: {
    fontSize: wp("2.5%"),
    fontWeight: "bold",
    color: "#343434",
    textAlign: "center",
    alignSelf: "center",
    position: "absolute",
    // top: hp("1.5%"),
  },
  itemTitle1: {
    fontSize: wp("2.5%"),
    fontWeight: "bold",
    color: "#343434",
    textAlign: "center",
    position:"relative"
    // top: "-38%",
  },
  itemTitle3: {
    fontSize: wp("2.9%"),
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    alignSelf: "center",
    // top: hp("2%"),
  },
  itemTitle2: {
    fontSize: wp("2.9%"),
    fontWeight: "bold",
    color: "white",
    // textAlign: "center",
    alignSelf: "center",
    paddingBottom:7,
    
    // top: hp("2%"),
  },
  itemDetail: {
    fontWeight: "bold",
    // color: Colors.white,
    textAlign: "center",
    
    // marginVertical: 30,
    alignSelf: "center",
    // top: hp("1%"),
  },
  itemDetail1: {
    fontWeight: "bold",
    color: Colors.white,
    textAlign: "center",
    // marginVertical: 30,
    top: hp("-1%"),
  },
  orderValueWrapper: {
    flexDirection: "row",
    marginVertical: 30,
    alignItems: "center",
    alignSelf: "center",
  },
  orderValueTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#08b3a6",
    textAlign: "center",
  },
  visitedAreaHeading: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#343434",
    textAlign: "left",
    marginHorizontal: 10,
    marginTop: 15,
  },
  visitedAreaName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#08b3a6",
    textAlign: "center",
  },
  datePicker: {
    alignSelf: "center",
    backgroundColor: Colors.black,
    borderRadius: 100,
    flexDirection: "row",
    width: wp("43%"),
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
});
