import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  box: {
    alignSelf: 'center',
    backgroundColor: Colors.clrF1F9FF,
    width: Dimensions.get('window').width - 30,
    marginVertical: 5,
    padding: 15,
    borderRadius: 10,
    position: 'relative'
  },
  ratingBox: {
  	position: 'absolute',
  	right: 10,
  	top: 24,
  	flexDirection: 'row'
  },
  datePicker: {
    alignSelf: "center",
    backgroundColor: Colors.darkRedPink,
    borderRadius: 4,
    width: wp("50%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    height: hp(4.5),
  },
  dateText: {
    fontFamily: "Segoe UI",

    color: Colors.white,
    fontSize: wp("3.5%"),
    textTransform: "capitalize",
  },
  dateIcon: {
    color: Colors.white,
    fontSize: wp("6%"),
    marginLeft: 0,
    marginRight: 0,
    zIndex: 2,
    paddingLeft: wp("3%"),
  },
  dateChangeIcon: {
    color: Colors.darkRedPink,
    fontSize: wp("13.5%"),

     alignItems: "center",
    paddingHorizontal: 20,
  },
  btmBox: {
      flexDirection: 'column',
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 5
  },
  desc: {
    color: Colors.clr66,
    fontSize: 13,
    fontFamily: ApplicationStyles.textFont,
    lineHeight: 20
  },
  detail: {
    fontFamily: ApplicationStyles.textMsgFont,
    color: Colors.white,
    fontSize: 18,
    textTransform: 'capitalize',
    marginLeft:wp("3%"),
    marginTop:hp("1%"),
  },
  strip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  title: {
    color: Colors.button,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: 20,
    marginBottom: 6,
    width: (Dimensions.get('window').width - 30)/1.5
  },
  ttl: {
    color: Colors.clr66,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 12
  },
  ttlIcon: {
  	color: Colors.clr66,
    fontSize: 16
  },
  tuple: {
    borderBottomColor: Colors.button,
    flexDirection: 'row'
  },
  userCircle: {
    // marginTop: 80,
    alignItems: 'center',
    backgroundColor: Colors.user,
    borderRadius: 50,
    flexDirection: 'row',
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
  userDtl: {
    padding: 10,
    paddingTop: 3
  },
  userIcon: {
    height: 16,
    width: 16,
  },
  pickerStyles: {
    borderRadius: 100, 
    width: wp('85%'),
    alignSelf: 'flex-start'
  }
})
