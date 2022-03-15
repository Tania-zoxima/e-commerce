import { StyleSheet, Dimensions } from 'react-native'
import { Colors, ApplicationStyles, Metrics } from 'App/Theme'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  card: {
    ...Metrics.normalPadding,
    backgroundColor: Colors.clrF1F9FF,
    borderRadius: 10,
    width: wp('100%'),
    elevation: 3,
    alignSelf: 'center'
  },
  darkCard: {
    ...Metrics.normalPadding,
    alignSelf: 'stretch',
    backgroundColor: Colors.label,
    borderRadius: 10,
    margin: hp('.6%'),
    elevation: 3
  },
  darkDetail: {
    fontSize: wp('3.5%'),
    color: Colors.clrF1F9FF,
    fontFamily: ApplicationStyles.textMsgFont
  },
  darkTitle: {
    color: Colors.white,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: wp('4.5%'),
    marginBottom: 5,
    textTransform: 'capitalize',
  },
  darkTtl: {
    color: Colors.clrF1F9FF,
     fontSize: wp('3.5%'),
    fontFamily: ApplicationStyles.textFont
  },
  detail: {
    color: Colors.clr66,
    fontSize: 15,
    fontFamily: ApplicationStyles.textMsgFont
  },
  strip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: Colors.clr0094FF,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: wp('4.5%'),
    marginBottom: 5,
    textTransform: 'capitalize',
  },
  ttl: {
    color: Colors.clr66,
    fontSize: 15,
    fontFamily: ApplicationStyles.textFont
  },
})
