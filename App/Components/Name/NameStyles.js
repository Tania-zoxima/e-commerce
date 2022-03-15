import { StyleSheet, Dimensions } from 'react-native'
import { Colors, ApplicationStyles, Fonts } from 'App/Theme'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  name: {
  	color: Colors.button,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: wp('4%'),
    marginBottom: 8
  }
})
