import { StyleSheet, Dimensions } from "react-native";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import { Row } from "native-base";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default StyleSheet.create({
  action: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp("3%"),
  },
  area: {
    flexDirection: "row",
    justifyContent: "center",
    fontFamily: ApplicationStyles.textFont,
  },
  actionButton: {
    ...Metrics.smallBottomMargin,
    width: wp("63%"),
    alignSelf: "center",
    height: hp("5.5%"),
    borderRadius: 3,
    top: "4%",
  },
  button: {
    ...Metrics.smallBottomMargin,
    width: 130,
    height: hp("5.5%"),
    borderRadius: 3,
    top:hp("2.5%"),
    alignSelf:'center',
    left:hp('5.5%')
  },
  button1: {
    ...Metrics.smallBottomMargin,
    width: 130,
    height: hp("5.5%"),
    borderRadius: 3,
    top:hp("2.5%"),
    alignSelf:'center',
    left:hp('-6%')
  },

  waveBox: {
    backgroundColor: Colors.background,
    width: "100%",
    height: "44%",
    bottom: hp("19%"),
  },
  waveBoxBlue: {
    backgroundColor: Colors.bluebackground,
    width: "100%",
    height: "44%",
    bottom: hp("19%"),
  },
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  title: {
    ...Metrics.mediumBottomMargin,
    color: Colors.white,
    fontFamily: ApplicationStyles.textFont,

    alignSelf: "auto",
    top: "6%",

    fontSize: 26,

    marginLeft: "20%",
    fontWeight: "bold",
  },
  card: {
    padding: 15,
    elevation: 0,
    height: hp("55%"),
    justifyContent: "center",
    backgroundColor: Colors.greyClr,
  },
  mt30: {
    marginTop: 30,
  },
  mv4: {
    marginTop: "4%",
  },
  selectedAction: {
    color: Colors.white,
    backgroundColor: Colors.greyClr,
  },

  svgCurve: {
    width: Dimensions.get("window").width,
  },
  textClr: {
    color: Colors.headerClr,
  },
});
