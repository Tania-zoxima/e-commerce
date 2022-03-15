import { StyleSheet } from 'react-native'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import { Left } from 'native-base'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  action: {
    // marginTop: 80,
    width: wp('88%'),
  },
  button: {
    ...Metrics.smallBottomMargin,
    width: 120
  },
  container: {
    ...Metrics.tinyHorizontalPadding,
    ...Metrics.tinyVerticalPadding,
    ...Helpers.center,
    backgroundColor: Colors.white,
    flex: 1,
  },
  heading: {
    alignSelf: 'center',
    color: Colors.clr0094FF,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: 24,
    marginBottom: 15
  },
  link: {
    color: Colors.label,
    flexDirection: 'row',
    height: 30,
    justifyContent: 'flex-end',
  },
  linkText: {
    ...Fonts.input,
    color: Colors.label,
  },
  mb10: {
    marginBottom: hp('2%'),
    height: hp('5.5%'),
    fontSize: wp('3.7%'),
    justifyContent: 'center',
    padding: 0
  },
  text: {
    color: Colors.white,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 18,
  },

  selectPickerStyle: {
    borderRadius: 100,
    width: wp('88%'),
    height: hp('5.5%'),
    marginTop: 5,
    marginBottom: hp('2%'),
    fontSize: wp('2%'),
    justifyContent: 'center',
    paddingHorizontal: 12
  },
  picker: {
    borderRadius: 100,
    width: wp('88%'),
    // height: hp('5.7%'),
    marginBottom: hp('2%'),
    paddingHorizontal: 8
  },
  pickerLabel: {
    color: Colors.placeHolder,
    fontFamily: ApplicationStyles.textFont,
    textAlign: "left",
    width: "99%",
    padding: 10,
    flexDirection: "row"
  },
  mainContainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: hp("0%"),
  },
  cardstyle: {
    flexDirection: "column",
    paddingTop: hp("2%"),
    paddingBottom: hp("1%"),
    width: wp("100%"),
    paddingLeft: wp("2%"),
    paddingRight: wp("2%"),
    elevation: 10,
    backgroundColor: Colors.background,
    height: hp("12%"),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "8%",
    borderBottomLeftRadius: 65,
    borderBottomRightRadius: 65,
  },
  backarrow: {
    color: Colors.white,
    fontSize: 32,
    paddingRight: wp("90%"),
  },
 
  title: {
    color: Colors.white,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 28,
    fontWeight: "bold",
    left: wp("8%"),
    top: hp("-2%"),
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
    bottom: 75,
    position: "absolute",
    left: 100,
    borderRadius: 50,
    height: 45,
    width: 45,
    backgroundColor: Colors.button,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  date: {
    fontSize: 25,
    fontFamily: "Rubik",
    color: Colors.background,
    left: hp("2%"),
    top: hp("1.5%"),
    fontWeight: "bold",
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
    bottom: hp("1%"),
    top: hp("4%"),
    left: wp("-5%"),
  },
  detail: {
    color: Colors.black,
    fontSize: wp("3%"),
    fontFamily: "Rubik",
    fontWeight: "bold",
    bottom: hp("1%"),
    left: wp("2%"),
    top: hp("4%"),
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
    left: "2%",
    right: "5%",
    top: "0%",
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
    marginTop: hp("2%"),
    marginBottom:hp("3%"),
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
    width: wp("58%"),
    height: hp("5%"),
    top: hp("5%"),
    left: wp("14%"),
    // paddingBottom: 4,
    borderRadius: 3,
  },
  titleText: {
    color: Colors.white,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 30,
    fontWeight: "bold",
     top:hp('-2.5%'),
    marginLeft:wp('17%')
  },
  backarrow:{
    paddingTop: hp("-3%"),
            paddingBottom: hp("1%"),
            marginRight: wp("90%"),
            fontSize:25,
            color:Colors.white
  },
  textClr: {
    color: Colors.headerClr,
  },

})
