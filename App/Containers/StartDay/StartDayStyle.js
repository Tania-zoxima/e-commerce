import { StyleSheet, Dimensions } from "react-native";
import { Helpers, Metrics, Fonts, Colors, ApplicationStyles } from "App/Theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Left } from "native-base";

export default StyleSheet.create({
  box: {
    display: "flex",
    flex: 1,
    padding: Metrics.tiny,
    fontFamily: ApplicationStyles.textMsgFont,
    backgroundColor: Colors.background,
  },
  boxBlue: {
    display: "flex",
    flex: 1,
    padding: Metrics.tiny,
    fontFamily: ApplicationStyles.textMsgFont,
    backgroundColor: Colors.bluebackground,
  },

  box1: {
    display: "flex",
    flex: 1,
    padding: Metrics.tiny,
    fontFamily: ApplicationStyles.textMsgFont,
    backgroundColor: Colors.background,
  },
  boxBlue1: {
    display: "flex",
    flex: 1,
    padding: Metrics.tiny,
    fontFamily: ApplicationStyles.textMsgFont,
    backgroundColor: Colors.bluebackground,
  },

  header: {
    fontSize: 32,
    fontFamily: "Ubuntu",
    color: Colors.white,
    alignSelf: "auto",
    alignSelf: "center",
    fontWeight: "bold",
  },
  textClr: {
    color: Colors.headerClr,
  },
  dottedLine: {
    color: Colors.white,
    alignSelf: "center",
    letterSpacing: 1,
  },
  buttons: {
    // marginHorizontal: '60%',
    marginTop: "12%",
    width: wp("60%"),
    borderRadius: 28,
    height: hp("7%"),
    alignSelf: "center",
  },

  buttons1: {
    marginTop: hp("4%"),
    width: wp("70%"),
    borderRadius: 7,
    height: hp("6%"),
    borderColor: Colors.buttonClr,
    alignSelf: "center",
  },
  buttontextStyle: {
    textTransform: "uppercase",
  },
  input: {
    backgroundColor: Colors.error,
    borderRadius: 5,
    color: Colors.error,
    padding: 10,
    fontFamily: ApplicationStyles.textMsgFont,
  },
  mb13: {
    marginBottom: "13%",
  },
  ml52: {
    marginLeft: 52,
  },
  mt23: {
    marginTop: "23%",
  },
  title: {
    // margin: 'auto',
    ...Fonts.regular,
    color: Colors.primary,
    fontFamily: ApplicationStyles.textMsgFont,
  },
  wish: {
    color: Colors.white,
    fontSize: 26,
    fontFamily: ApplicationStyles.textMsgFont,
    textTransform: "capitalize",
    marginLeft: "5%",
  },
  line: {
    marginLeft: "5%",
    marginTop: "-2%",
    borderBottomWidth: 3,
    width: wp("44%"),
  },
  titleText: {
    fontSize: 26,
    marginLeft: "16%",
  },
  // svgCurve:{
  //   width: Dimensions.get('window').width,
  //   // top:hp("-7%"),
  //   bottom:hp("5%")

  // },
  // waveBox: {
  //     backgroundColor:Colors.background,
  //     width: '100%',
  //     height:'44%',
  //     bottom:hp('19%'),

  //   }
});
