import { StyleSheet, Dimensions } from 'react-native'
import { Colors, ApplicationStyles, Fonts } from 'App/Theme'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  icon: {
    color: Colors.grey,
    fontSize: wp('7.3%')
  },
  iconText: {
  	color: Colors.grey,
  	fontFamily: ApplicationStyles.textFont,
  	fontSize: Fonts.iconText.fontSize,
    alignSelf: 'center',
    textAlign: 'center',
    overflow: 'hidden',
    paddingLeft: 0, 
    paddingRight: 0
  },
  iconActive: {
  	color: Colors.primary
  },
  iconBlueActive: {
  	color: Colors.bluebackground
  },
  iconButton: {
  	backgroundColor: Colors.white,
  	borderRadius: 0,
    height: '100%'
  },
  iconActiveButton: {
  	backgroundColor: Colors.white
  }
});
