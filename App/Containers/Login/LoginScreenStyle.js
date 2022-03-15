import { StyleSheet } from 'react-native'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  action: {
    marginTop: hp('5%'),
    width: wp('80%'),
    justifyContent: 'center'
  },
  
  button: {
    ...ApplicationStyles.formButton,
    alignSelf: 'center',
    marginTop: hp('3%'),
    maxHeight: hp('6%')
  },
  buttonBox: {
    ...Helpers.textCenter,
  },
  container: {
    ...Metrics.mediumHorizontalPadding,
    ...Metrics.mediumVerticalPadding,
    ...Helpers.center,
   
    flex: 1,
   
    shadowColor: Colors.white
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
  text: {
    color: Colors.white,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 18,
  },
  mb10: {
    marginBottom: 10
  },
  logoContainer:{
    width: 250, 
    height: 150, 
    resizeMode: 'contain'
  }
});
