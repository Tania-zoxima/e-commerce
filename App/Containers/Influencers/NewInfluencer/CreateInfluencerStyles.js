import { StyleSheet } from "react-native";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default StyleSheet.create({
  mainContainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: hp("0%"),
  },
  cardstyle1: {
    backgroundColor: Colors.darkRedPink,
    width: wp("100%"),
    top: hp("0%"),
    height: hp("11%"),
    borderBottomLeftRadius: 55,
    borderBottomRightRadius: 55,
  },
  cardstyleBlue1: {
    backgroundColor: Colors.bluebackground,
    width: wp("100%"),
    top: hp("0%"),
    height: hp("11%"),
    borderBottomLeftRadius: 55,
    borderBottomRightRadius: 55,
  },
  backarrow: {
    color: Colors.white,
    fontSize: 32,
    paddingRight: wp("90%"),
    // backgroundColor:"black",
    zIndex:1000
    
  },
 
  title: {
    color: Colors.white,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 28,
    fontWeight: "bold",
    // left: wp("10%"),
    top: hp("-1%"),
    alignSelf:"center"
  },
  titleText: {
    color: Colors.black,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 28,
    fontWeight: "bold",
  },
  checkicon: {
    left: wp("75%"),
    top: hp("-2.5%"),
    backgroundColor: Colors.phoneClr,
    color: Colors.white,
    borderRadius: 50,
    height: hp(4),
    width: wp(8),
    padding: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
 
  searchContainer: {
    width: wp("88%"),
    borderRadius: 10,
    paddingHorizontal: 3,
    paddingTop: 0,
    elevation: 10,
    backgroundColor: "white",
    fontSize: wp("4.8%"),
    fontWeight: "700",
    color: Colors.blue,
    height: hp("5%"),
    alignSelf: "center",
  },
  status: {
    color: Colors.white,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: 10,
    backgroundColor: Colors.cardblue,
    width: wp(15),
    borderRadius: 4,
    top: hp("1%"),
    left: wp("3%"),
    height: hp("2%"),
    textAlign: "center",
  },
  container: {
    flex: 1,
  },
  plusIcon: {
    borderRadius: 50,
    // bottom: 100,
    // position: "absolute",
    left:wp("25%"),
    top:hp("65%"),
    borderRadius: 50,
    height: 45,
    width: 45,
    backgroundColor: Colors.button,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex:500
  },
  date: {
    fontSize: 16,
    fontFamily: "Rubik",
    color: Colors.background,
    // left: hp("3%"),
    top: hp("2%"),
    textAlign: "center",
    fontWeight:"bold"
  },
  month: {
    fontSize: 12,
    fontFamily: "Rubik",
    color: Colors.background,
    left: hp("0%"),
    top: hp("1%"),
    fontWeight: "bold",
  },
  head: {
    fontSize: 18,
    fontFamily: "Rubik",
    left: hp("0%"),
    fontWeight: "bold",
    color: Colors.black,
  },
  head1: {
    fontSize: 13,
    fontFamily: "Rubik",
    left: hp("-0.4%"),
    top: hp("1.5%"),
  },
  head2: {
    fontSize: 13,
    fontFamily: "Rubik",
    left: hp("-0.4%"),
    top: hp("1.5%"),
    color: Colors.lightGrey,
  },

  ttl: {
    color: Colors.lightGrey,
    fontSize: wp("3%"),
    fontFamily: "Rubik",
    fontWeight: "bold",
    // bottom: hp("1%"),
    top: hp("3%"),
    left: wp("6%"),
  },
  detail: {
    color: Colors.black,
    fontSize: wp("3%"),
    fontFamily: "Rubik",
    fontWeight: "bold",
    // bottom: hp("1%"),
    left: wp("15%"),
    top: hp("3%"),
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
    left: "1%",
    right: "5%",
    top: "15%",
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
    marginTop: hp("3%"),
    marginBottom:hp("3%")
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
    borderRadius: 3,
  },
  buttonBlue: {
    width: wp("29%"),
    height: hp("5%"),
    borderRadius: 3,
    backgroundColor: Colors.bluebackground
  },
  textViewdate: {
    width: wp("40%"),
    height:hp("12%"),
    borderBottomWidth: 1,
    borderColor: Colors.lightGrey,
    marginTop: hp("1.5%"),
  },

  recurringActionButton1: {
    borderColor: Colors.firozi,
    borderStyle: 'dashed',
    borderWidth: 1,
    overflow: 'hidden',
    borderRadius: 100,
    borderWidth: 2, 
    alignSelf: 'center', 
    backgroundColor: Colors.black,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: wp('4%'),
    paddingRight: wp('4%'),
     marginRight: wp('50%')

  },
  recurringActionButtonText1: {
    color: Colors.primary,
    fontSize: wp('4%'),
    textTransform: 'capitalize',
    fontFamily: ApplicationStyles.textMediumFont
  },
  recurringActionButtonIcon1: {
    color: Colors.primary, 
    fontSize: wp('0%'),
  },
  bottomMargin: {
    // marginBottom: hp('2%'),
     width: '75%',
     marginLeft:wp('20%'),
     marginTop:hp('2%'),
  },
});