import { StyleSheet } from 'react-native'
import { Colors, ApplicationStyles } from 'App/Theme'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
  labelStyle: {
    color: 'black',
    fontFamily: ApplicationStyles.textMsgFont,
    marginBottom: 2,
    // marginLeft:wp("21%"),
    fontSize: wp("2.5%")
  }
})
