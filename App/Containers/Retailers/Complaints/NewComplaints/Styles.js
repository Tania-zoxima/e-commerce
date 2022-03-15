import { StyleSheet } from 'react-native'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import { Left } from 'native-base'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  action: {
    // marginTop: 80,
    width: wp('88%'),
   
  },
  label: {
    color: Colors.button,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: wp('4.5%'),
    ...Metrics.tinyVerticalMargin
  },
  button: {
    ...Metrics.smallBottomMargin,
    width: 120,
    alignSelf:'center', 
    marginTop:'5%'
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
  pickerStyle: {
    borderRadius: 100,
    width: wp('88%'),
    height: hp('5.5%'),
    marginTop: 5,
    paddingHorizontal: 10,
    marginBottom: hp('2%'),
    fontSize: wp('2%'),
    justifyContent: 'center'
  },
  picker: {
    borderRadius: 100,
    width: wp('88%'),
    height: hp('5.5%'),
    marginTop: 5,
    marginBottom: hp('2%'),
    fontSize: wp('2%'),
    paddingHorizontal: 5,
    justifyContent: 'center'
  },

  bottomMargin: {
    marginBottom: hp('2%'),
    width: '100%'
  },

  inputText: {
    borderRadius: 10,
    fontSize: wp('3.5%')
  },
  pickerLabel: {
    color: Colors.placeHolder,
    fontFamily: ApplicationStyles.textFont,
    textAlign: "left",
    width: "99%",
    padding: 10,
    flexDirection: "row"
  }
})
