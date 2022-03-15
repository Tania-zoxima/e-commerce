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
    alignSelf: 'center',
    
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
    color: Colors.black,
    fontSize: wp('3.7%'),
    fontFamily: ApplicationStyles.textMsgFont,
    right:wp("18%"),
    fontWeight:"bold"
  },
  strip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('.4%')
  },

 
  title: {
    color: Colors.black,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: 18,
    marginBottom: 5,
    textTransform: 'capitalize',
  },
  status: {
    color: Colors.white,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: 8,
    // marginBottom: 3,
    backgroundColor:Colors.cardblue,
    width:wp(24),
    padding:wp(0.5),
    borderRadius:8,
    top:hp("1%"),
    left:wp("3%"),
    height:hp("2%"),
    textAlign:"center"
  },
  ttl: {
    color: Colors.lightGrey,
    fontSize: wp('3.5%'),
    fontFamily: ApplicationStyles.textFont,
    left:wp("18%"),
    fontWeight:"bold"
  },

 
})
