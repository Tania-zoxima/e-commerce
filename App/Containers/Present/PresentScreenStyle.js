import { StyleSheet, Dimensions } from "react-native";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Row } from "native-base";

export default StyleSheet.create({
  box1: {
    display: "flex",
    flex: 1,
    padding: Metrics.tiny,
    fontFamily: ApplicationStyles.textMsgFont,
    backgroundColor: Colors.white,
    top: hp("1%"),
  },
  action: {
    alignSelf: "center",
    bottom: "2%",
  },
  area: {
    flexDirection: "row",
    justifyContent: "center",
    fontFamily: ApplicationStyles.textFont,
  },
  button: {
    marginTop: "7%",
    width: wp("70%"),
    borderRadius: 7,
    height: hp("6%"),
    alignItems: "center",
  },
  button1: {

   
    
    width: wp('32%'),
    borderRadius:5,
    height:hp('6%'),
    

  },
  buttonBox: {
    ...Metrics.bottomMargin,
    textAlign: "center",
  },
  action1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    alignSelf:'center'
  },
  buttontextStyle: {
    fontFamily: ApplicationStyles.textMsgFont,

    paddingBottom: 13,
    fontSize: 18,
  },
  container: {
    display: "flex",
    flex: 1,
    padding: Metrics.tiny,
    fontFamily: ApplicationStyles.textMsgFont,
    backgroundColor: Colors.white,
    top: hp("1%"),
  },
  title: {
    fontSize: 32,
    ...Metrics.mediumBottomMargin,
    color: Colors.headerClr,
    marginTop: "16%",
    fontFamily: ApplicationStyles.textFont,
    marginLeft: "12%",
    marginRight: "12%",
    fontWeight: "bold",
    textAlign: "center",
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

  waveStyle1: {
    marginTop: "42%",
    backgroundColor: Colors.background,
    height: "56%",
    width: "117%",
  },
  mWave10: {
    marginTop: "60%",
  },
  svgCurve: {
    width: Dimensions.get("window").width,
  },
  header: {
    fontSize: 30,
    fontFamily: ApplicationStyles.textMsgFont,
    color: Colors.white,
    marginLeft: "15.5%",
  },
  textClr: {
    color: Colors.headerClr,
  },
  imageText: {
    fontFamily: 'Segoe UI',
    color: Colors.lightGrey,
    textAlign: "center",
    fontSize: 12,
    bottom: "7%",
    fontWeight:"bold"
    
  },
});
