import { StyleSheet, Dimensions } from 'react-native'
import { Colors, ApplicationStyles, Metrics } from 'App/Theme'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  card: {
    ...Metrics.normalPadding,
    backgroundColor: Colors.clrF1F9FF,
    borderRadius: 10,
    margin: 7,
    width: Dimensions.get('window').width - 30,
    elevation: 3,
    alignSelf: 'center'
  },
  leftcard:{
    display:"flex",
    flexDirection:"row"
  },
  strip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('.4%'),
    textAlignVertical:"center"
  },
  darkDetail: {
    fontSize: wp('3.5%'),
    color: Colors.clrF1F9FF,
    fontFamily: ApplicationStyles.textMsgFont
  },
  darkTtl: {
    color: Colors.clrF1F9FF,
    fontSize: wp('3.5%'),
    fontFamily: ApplicationStyles.textFont
  },
  darkCard: {
    ...Metrics.normalPadding,
    width: wp('92%'),
    backgroundColor: Colors.label,
    borderRadius: 10,
    margin: 5,
    elevation: 3,
    alignSelf: 'center'
  },
  darkTitle: {
    color: Colors.white,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: wp('4.5%'),
    marginBottom: 5,
    textTransform: 'capitalize',
  },
  
})