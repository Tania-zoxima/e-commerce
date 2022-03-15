import { StyleSheet, Dimensions } from "react-native";
import { Colors, ApplicationStyles, Metrics } from "App/Theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default StyleSheet.create({
  card: {
    ...Metrics.normalPadding,
    backgroundColor: Colors.clrF1F9FF,
    borderRadius: 10,
    margin: 7,
    width: Dimensions.get("window").width - 30,
    elevation: 3,
    alignSelf: "center",
  },
  darkCard: {
    ...Metrics.normalPadding,
    width: wp("92%"),
    backgroundColor: Colors.label,
    borderRadius: 10,
    margin: 5,
    elevation: 3,
    alignSelf: "center",
  },
  darkDetail: {
    fontSize: wp("3.5%"),
    color: Colors.clrF1F9FF,
    fontFamily: ApplicationStyles.textMsgFont,
  },
  darkTitle: {
    color: Colors.white,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: wp("4.5%"),
    marginBottom: 5,
    textTransform: "capitalize",
  },
  darkTtl: {
    color: Colors.clrF1F9FF,
    fontSize: wp("3.5%"),
    fontFamily: ApplicationStyles.textFont,
  },
  detail: {
    color: Colors.black,
    fontSize: wp("3%"),
    fontFamily: ApplicationStyles.textMsgFont,
    marginLeft: wp("2%"),
    fontWeight: "bold",
  },
  strip: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp("2%"),
  },
  head: {
    color: Colors.black,
    fontSize: wp("3.5%"),
    fontFamily: ApplicationStyles.textMsgFont,

    fontWeight: "bold",
  },

  title: {
    color: Colors.darkRedPink,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: 18,
    marginBottom: 5,
  },
  titleBlue: {
    color: Colors.bluebackground,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: 18,
    marginBottom: 5,
  },
  circle: {
    color: "#38E80C8A",
    fontSize: 13,
    marginTop: hp("0.8%"),
    marginLeft: wp("1%"),
  },
  add: {
    color: "#38E80C8A",
    // backgroundColor:Colors.green,
    // borderRadius:50,
    fontSize: 25,
    marginTop: hp("0%"),
    marginLeft: wp("22%"),
  },

  ttl: {
    color: Colors.lightGrey,
    fontSize: wp("3%"),
    fontFamily: ApplicationStyles.textFont,

    fontWeight: "bold",
  },

  title1: {
    marginLeft: wp("30%"),
    marginTop: hp("1%"),
    color: "grey",
  },
});
