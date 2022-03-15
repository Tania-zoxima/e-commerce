import { StyleSheet, Dimensions } from 'react-native'
import { Colors, ApplicationStyles, Fonts } from 'App/Theme'

export default StyleSheet.create({
  label: {
  	color: Colors.clr66,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 10
  },
  value: {
  	color: Colors.clr66,
    fontFamily: ApplicationStyles.textMediumFont,
    fontSize: 14
  }
});
