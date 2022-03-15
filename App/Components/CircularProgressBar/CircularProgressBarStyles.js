import { StyleSheet } from 'react-native'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  select: {
    borderColor: Colors.border,
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    color: Colors.border,
    // height: 33,
    // textAlignVertical: 'center',
    width: 100,
  },
  targetText: {
  	fontSize: wp('5%'),
  	fontFamily: ApplicationStyles.textMediumFont,
  	color: Colors.clr66
  },
  targetTextIndicator: {
  	fontSize: wp('4.5%'),
  	fontFamily: ApplicationStyles.textMediumFont,
    color: Colors.button,
    width:wp('20%')
  }
})
