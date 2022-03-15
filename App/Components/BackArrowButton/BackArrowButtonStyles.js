import { StyleSheet } from 'react-native'
import { Colors, ApplicationStyles } from 'App/Theme'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  button: {
   color: Colors.white,
   paddingRight: 10,
   paddingLeft: 5,
   fontSize: wp('8%')
  }
})
