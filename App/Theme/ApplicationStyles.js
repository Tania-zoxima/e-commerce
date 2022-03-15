import Colors from './Colors';
import Metrics from './Metrics';
import Helpers from './Helpers';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {Platform} from 'react-native';

export default {
  textFont:  Platform.OS === 'ios' ? 'Montserrat-Bold' : 'Roboto',
  textMsgFont:  Platform.OS === 'ios' ? 'Montserrat-Bold' : 'Roboto_bold',
  textMediumFont: Platform.OS === 'ios' ? 'Montserrat-Bold' : 'Roboto_medium',
  button: {
    backgroundColor: Colors.primary
  },
  buttonShadow: {
    elevation: 5,
      shadowColor: "#000",
      shadowOffset: {
      width: 0
    },
      shadowOpacity: 0.3,
      shadowRadius: 4,
  },
  formButton: {
    alignSelf: 'center',
    marginTop: hp('2%'),
    // borderRadius: 10,
    height: hp('6%'),
    zIndex: 3,
    width: wp('80%')
  },
  formHeading: {
      alignSelf: 'center',
      color: Colors.primary,
      fontFamily: Platform.OS === 'ios' ? 'Montserrat-Bold' : 'Roboto_bold',
      fontSize: wp('5.5%'),
      marginBottom: hp('2%'),
      marginTop: hp('1%'),
      textTransform: 'uppercase'
  },
  screenHeading: {
      alignSelf: 'center',
      color: Colors.white,
      fontFamily: Platform.OS === 'ios' ? 'Montserrat-Bold' : 'Roboto_bold',
      fontSize: wp('7%'),
      marginBottom: hp('1%'),
      textTransform: 'capitalize'
  },
  plusIcon: {
        borderRadius: 50,
        bottom: 75,
        position: 'absolute',
        right: 25,
        borderRadius: 50,
        height: 45,
        width: 45,
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    backArrow: {
      color: Colors.primary,
      padding: 5
    },
    // container: {
    //   flex: 1,
    //   // alignItems: 'center',
    //   // justifyContent: 'center'
    // },
    brandInput: {
      fontSize: wp('3.2%'),
      height: hp('4.4%'),
      padding: 0
    },
    nearbyButton: {
      alignSelf: 'flex-start',
      height: hp('5.2%'),
      width: wp('36%')
    }, 
    nearbyButtonIcon: {
      color: Colors.primary, 
      fontSize: wp('5%'),
      marginRight: 0
    },
    container: {
      backgroundColor: Colors.white,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: "center",
      alignItems: 'center',
      flex: 1
    },
    label: {
      color: Colors.primary,
      fontFamily: Platform.OS === 'ios' ? 'Montserrat-Bold' : 'Roboto_bold',
      fontSize: wp('4.5%'),
      paddingLeft: wp('.5%'),
    },
    divider: {
      borderBottomWidth: .5,
        borderColor:Colors.grey,
        marginVertical:10,
        width: '100%',
        alignSelf: 'center'
    },
    verticalContainer: {
      backgroundColor: Colors.white,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1
    },
    horizontalContainer: {
      backgroundColor: Colors.white,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1
    },
     tabs: {
     backgroundColor: Colors.white,
     color: Colors.white,
     marginBottom: 30,
     borderBottomWidth: 0,
     paddingHorizontal: 10,
     borderRadius: 5,
     elevation: 0
  },
  tabText: {
      color: Colors.primary,
      fontFamily: Platform.OS === 'ios' ? 'Montserrat-Bold' : 'Roboto_bold',
      fontSize: wp('4%'),
      elevation: 0
    },
    tabHeading: {
      backgroundColor: Colors.lightGrey,
      fontFamily: Platform.OS === 'ios' ? 'Montserrat-Bold' : 'Roboto_bold',
      paddingHorizontal: 0,
      elevation: 0,
      boxShadow: 'none'

    },
    tabUnderLine: {
      backgroundColor: Colors.primary,
      elevation: 0
    },
    mainTabs: {
      marginTop: hp('1%'),
      backgroundColor: Colors.white,
      elevation: 0
    },
    infoBox: {
    borderWidth: 2,
    width: '95%',
    elevation: 0
  },

  refreshIcon: {
    color: Colors.primary, 
    fontSize: wp('6%'), 
    alignSelf: 'center',
    padding: 10
  },
  mb10: {
      marginBottom: hp('2%'),
      height: hp('5.5%'),
      fontSize: wp('3.7%'),
      justifyContent: 'center',
      padding: 0
    },
    marginBottom10: {
      marginBottom: hp('2%'),
    },
    picker: {
      borderRadius: 10,
      width: wp('88%'),
      height: hp('5.7%'),
      marginBottom: hp('3%'),
      paddingHorizontal: 8
    },
    pickerLabel: {
      color: Colors.grey,
      fontFamily: Platform.OS === 'ios' ? 'Montserrat-Bold' : 'Roboto',
      textAlign: "left",
      width: "99%",
      padding: 10,
      flexDirection: "row"
    },
    action: {
      width: wp('88%'),
    },
    formContainer: {
      ...Metrics.tinyHorizontalPadding,
      ...Metrics.tinyVerticalPadding,
      ...Helpers.center,
      backgroundColor: Colors.white,
      flex: 1
    },
    uppercase: {
      textTransform: 'uppercase'
    }
}
