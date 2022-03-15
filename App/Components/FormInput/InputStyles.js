import { StyleSheet } from 'react-native'
import { Colors, ApplicationStyles } from 'App/Theme'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  input: {
    borderColor:Colors.grey,
    borderRadius: 0,
    borderWidth: 1,
    color: Colors.inputText,
    fontFamily: ApplicationStyles.textMsgFont,
    padding: 10,
    fontSize: wp('4%'),
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop:hp("3%")
  },
  input1: {
    borderColor: "transparent",
    right: wp("1.5%"),
    fontFamily: "Segoe UI",
    color:Colors.grey,
    fontSize: 13,
    top: hp("2%"),
    fontWeight: "bold",
  },
  inputError: {
    borderColor: Colors.error,
  },
  item: {
    borderBottomWidth: 0,
    marginBottom: 7,
    marginTop: 7,
    
  },
  itemNumber: {
    marginVertical: 10,
  },

  label: {
    color: Colors.primary,
    fontFamily: ApplicationStyles.textMsgFont,
    paddingLeft: 5,
    fontSize: wp('4.4%')
  },
  placeholder: {
    color: Colors.grey,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: wp('2%')
  },
  textArea: {
    borderColor: Colors.border,
    borderRadius: 10,
    borderWidth: 1,
    color: Colors.inputText,
    fontFamily: ApplicationStyles.textMediumFont,
    paddingLeft: 20,
  },
  placeHolderTextStyle: {
    fontFamily: ApplicationStyles.textMsgFont,
    color: Colors.grey
  },
  textStyle: {
    fontFamily: ApplicationStyles.textMsgFont,
    color: Colors.grey
  },
  indicatorView:{width:'100%',backgroundColor:'white',borderColor:Colors.lightGrey,borderWidth:1},
})
