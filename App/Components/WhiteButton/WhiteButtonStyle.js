import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'

export default StyleSheet.create({
  button: {
    backgroundColor: Colors.white,
    borderColor: Colors.lightGrey,
    overflow: 'visible',
    ...ApplicationStyles.buttonShadow,
    borderRadius: 2,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'space-around'
  },
  text: {
    color: Colors.black,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: wp('5%'),
    // textTransform: 'uppercase',
    textAlign: 'center'
  },
  selectedButton: {
    backgroundColor: Colors.primary,
    elevation: 0
  },
  selectedText: {
    color: Colors.white,
    fontFamily: ApplicationStyles.textMsgFont,
    // textTransform: 'uppercase',
    textAlign: 'center'
  },
})
