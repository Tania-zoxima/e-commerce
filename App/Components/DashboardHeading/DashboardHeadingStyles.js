import { StyleSheet } from 'react-native'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  heading: {
  	fontSize: wp('4.2%'),
  	fontFamily: ApplicationStyles.textFont,
  	color: Colors.clr66
  }
})
