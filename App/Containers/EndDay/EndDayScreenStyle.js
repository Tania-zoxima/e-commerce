import { StyleSheet, Dimensions  } from 'react-native'
import { Colors, Metrics, Helpers, Fonts } from 'App/Theme'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
 
  button: {
    ...Metrics.smallBottomMargin,
  },
  buttonBox: {
    ...Metrics.bottomMargin,
    ...Helpers.textCenter,
  },
  clock: {
    ...Helpers.colCenter,
    borderColor: Colors.white,
    borderRadius: 200,
    borderWidth: 2,
    backgroundColor: Colors.white,
    height: hp('25%'),
    marginTop: hp('2%'),
    width:wp('50%'),
    alignSelf:'center'
    
  },
  buttons: {
    width: wp('50%'),
    borderRadius:30,
    height:hp('6%'),
    backgroundColor: Colors.white,
    marginLeft:wp('27.5%'),
    marginTop:hp('1.5%')
  },
  buttontextStyle: {
    textTransform : 'uppercase',
    alignSelf:'center',
    color:Colors.background
  },
  buttontextStyleBlue: {
    textTransform : 'uppercase',
    alignSelf:'center',
    color:Colors.bluebackground
  },
  container: {
    ...Metrics.mediumHorizontalPadding,
    ...Metrics.mediumVerticalPadding,
    ...Helpers.center,
    backgroundColor: Colors.white,
    // borderBottomWidth: 0,
    borderColor: Colors.shadow,
    flex: 1
  },
  card: {
    padding: 40,
    shadowColor: Colors.button,
    shadowOpacity: 1,
    shadowRadius: 25,
    shadowOffset: { width: 5, height: 5 },
    borderRadius: 6,
    elevation: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  time: {
    ...Fonts.h1,
    color: Colors.headerClr,
    fontSize:28,
    
    margin: 'auto',
    fontWeight:'bold',
  },
  waveBox: {
    backgroundColor: Colors.background,
    width: wp("100%"),
    height: hp("37%"),
    bottom: hp("19%"),
  },
  waveBoxBlue: {
    backgroundColor: Colors.bluebackground,
    width: wp("100%"),
    height: hp("37%"),
    bottom: hp("19%"),
  },
  svgCurve: {
    width: Dimensions.get("window").width,
  },
  title: {
    ...Metrics.mediumBottomMargin,
    color: Colors.background,
    alignSelf: "auto",
     top:hp("-2.8%"),
    fontSize: 29,
    fontWeight: "bold",
    left:wp('-14%')
  },
  titleBlue: {
    ...Metrics.mediumBottomMargin,
    color: Colors.bluebackground,
    alignSelf: "auto",
     top:hp("-2.8%"),
    fontSize: 29,
    fontWeight: "bold",
    left:wp('-14%')
  },
  textClr: {
    color: Colors.headerClr,
  },

})
