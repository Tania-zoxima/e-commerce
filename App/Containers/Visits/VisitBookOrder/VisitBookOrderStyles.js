import { StyleSheet } from "react-native";
import { Helpers, Metrics, Fonts, Colors, ApplicationStyles } from "App/Theme";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  container1: {
    ...Metrics.tinyHorizontalPadding,
    ...Metrics.tinyVerticalPadding,
    ...Helpers.center,
    backgroundColor: Colors.lightgrey,
    flex: 1,
  },

  picker: {
    borderRadius: 100,
    borderColor:'#515C6F',
    width: wp('88%'),
    borderWidth:0,
    elevation:5,
    backgroundColor:'white',
    // height: hp('5.5%'),
    marginTop: 5,
    marginBottom: hp('2%'),
    fontSize: wp('2%'),
    justifyContent: 'center'
},

  selectPickerStyle: {
    width: wp("25%"),
    height: hp("3.4%"),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    marginTop: hp("1%"),
    marginTop: 10,
    marginLeft: "4%",
    marginRight: "4%",
    backgroundColor: Colors.white,
  },
  plusIcon: {
    borderRadius: 50,
    bottom: 75,
    position: "absolute",
    right: 25,
    borderRadius: 50,
    height: 45,
    width: 45,
    backgroundColor: Colors.button,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    ...Metrics.smallBottomMargin,
    width: 120,
    alignSelf: "center",
    height: hp("5%"),
  },
  box: {
    alignItems: "center",
    backgroundColor: Colors.white,
    color: Colors.error,
    display: "flex",
    flex: 1,
    justifyContent: "center",
    padding: Metrics.tiny,
    textAlign: "center",
    fontFamily: ApplicationStyles.textMsgFont,
  },
  buttons: {
    marginHorizontal: 60,
    marginTop: 30,
  },
  input: {
    backgroundColor: Colors.error,
    borderRadius: 5,
    color: Colors.error,
    padding: 10,
    fontFamily: ApplicationStyles.textMsgFont,
  },
  mb10: {
    marginBottom: 10,
  },
  ml52: {
    marginLeft: 52,
  },
  mt30: {
    marginTop: 30,
  },
  title: {
    ...Fonts.regular,
    color: Colors.primary,
    fontFamily: ApplicationStyles.textMsgFont,
  },
  wish: {
    alignSelf: "center",
    color: Colors.label,
    fontSize: 34,
    fontFamily: ApplicationStyles.textMsgFont,
    textTransform: "uppercase",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    bottom: 75,
    position: "absolute",
    right: 90,
  },
  iconMessage: {
    fontSize: 14,
    padding: 2,
  },
  actionButton: {
    overflow: "visible",
    paddingLeft: wp("5%"),
    paddingRight: wp("4%"),
    marginBottom: hp("1%"),
    marginTop: hp("0%"),
    marginRight: wp("2%"),
    marginLeft: wp("1%"),
    height: hp("4.0%"),
    elevation: 10,
    minWidth: wp("20%"),
    borderWidth: 4,
    borderColor: Colors.white,
  },

  customSelectedTextStyle: {
    fontSize: wp("3.2%"),
    fontFamily: ApplicationStyles.textMsgFont,
    color: Colors.white,
  },
  selected: {
    borderWidth: 1,
    borderColor: Colors.firozi,
    backgroundColor: Colors.firozi,
  },
  customSelectedStyleCorpBlue: {
    backgroundColor: Colors.white,
    width: wp("28%"),
  },
  actionButtonText: {
    fontSize: wp("3.2%"),
    fontWeight: "bold",
    fontFamily: ApplicationStyles.textMsgFont,
    color: Colors.firozi,
  },

  picker: {
    borderRadius: hp("1%"),
    width: wp("90%"),
    minHeight: hp("5.7%"),
    marginBottom: hp("2%"),
    marginLeft: "2%",
  },
  pickerLabel: {
    color: Colors.placeHolder,
    fontFamily: ApplicationStyles.textFont,
    textAlign: "left",
    width: "99%",
    padding: 10,
    flexDirection: "row",
  },
  button1: {
    width: wp("30%"),
    borderRadius: 10,
    height: hp("5%"),
  },

  action: {
    // marginTop: 80,
    // width: wp('90%'),
    //justifyContent:'center'
  },
  action1: {
    flexDirection: "row",
    justifyContent: "space-around",
    //width: 300,
    marginTop: hp("5%"),
    marginBottom: hp("5%"),
  },
  mb10: {
    marginBottom: hp("2%"),
    height: hp("5.5%"),
    fontSize: wp("3.7%"),
    justifyContent: "center",
    padding: 0,
  },

  heading: {
    alignSelf: "center",
    color: "#0720C4",
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: 24,
    marginBottom: 15,
  },

  heading1: {
    alignSelf: "center",
    color: Colors.primary,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: wp("4.2%"),
    marginBottom: 0,
    fontWeight: "bold",
    marginRight: "5%",
  },
  dropDown1: {
    width: wp("10%"),
    marginTop: hp("1.5%"),
    left: wp("7%"),
    marginBottom: hp("2%"),
  },
  picker1: {
    // borderRadius: 10,
    width: wp("30%"),
    marginLeft: 0,
    flex: 1,
    // height: hp('6%'),
    marginBottom: hp("2%"),
  },
  pickerLabel: {
    color: Colors.black,
    flexDirection: "row",
    fontFamily: ApplicationStyles.textFont,
    fontSize: 15,
    padding: 5,
    // textAlign: "left",
    width: "99%",
  },
});
