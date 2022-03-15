import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
export default StyleSheet.create({


    mb10: {
        marginBottom: hp('2%'),
        height: hp('5.5%'),
        fontSize: wp('3.5%'),
        borderWidth: 0,
        elevation: 4,
        marginHorizontal:2,
        backgroundColor: 'white',
        borderRadius: 10

    },
    mb11: {
        marginBottom: hp('2%'),
        height: hp('14.5%'),
        width:wp('87%'),
        fontSize: wp('3.5%'),
        borderWidth: 0,
        marginHorizontal:2,
        elevation: 4,
        backgroundColor: 'white',
        borderRadius: 10

    },
      
    picker: {
        borderRadius: 100,
        borderColor:'#515C6F',
        width: wp('88%'),
        borderWidth:0,
        elevation:5,
        backgroundColor:'white',
        // height: hp('5.5%'),
        marginTop: 5,
        marginBottom: hp('2%'),
        fontSize: wp('2%'),
        justifyContent: 'center'
    },
      backIcon: {
        color: Colors.button,
        padding: 15,
        fontSize: wp('6%')
      }, 
       pickerLabel: {
        color: Colors.placeHolder,
        fontSize: 16,
        fontFamily: ApplicationStyles.textFont,
        textAlign: "left",
        width: "97%",
        padding: 10,
        marginLeft: 15,
        flexDirection: "row"
    },action: {
        // marginTop: 80,
        width: wp('90%'),
        marginHorizontal:0
    }, 
    container: {
        ...Metrics.tinyHorizontalPadding,
        ...Metrics.tinyVerticalPadding,
       
        backgroundColor: Colors.white,
        flex: 1,
        marginBottom:hp("-35%")
    }, 
    heading: {
        alignSelf: 'center',
        color: '#0720C4',
        fontFamily: ApplicationStyles.textMsgFont,
        fontSize: 24,
        marginBottom: 15
    }, 
     buttonContainer: {
        flexDirection: 'row',
        marginTop: hp('3%'),marginBottom:hp('4%')
    },
    // button: {
    //     backgroundColor:'#2FDFD2',
    //     width: 100,
    //     marginRight: 8,
    //     marginLeft:120
    // },
       bottomMargin: {
        marginBottom: hp('2%'),
        width: '100%'
      },   recurringActionButtonText: {
        color: Colors.button,
        fontSize: wp('4%'),
        textTransform: 'capitalize',
        fontFamily: ApplicationStyles.textMediumFont
      }, recurringActionButtonIcon: {
        color: Colors.primary, 
        fontSize: wp('4%')
      },

      placeholder: {
        borderColor: "transparent",
        right: wp("1.5%"),
        fontFamily: "Segoe UI",
        // color:Colors.black,
        fontSize: 13,
        top: hp("2%"),
        fontWeight: "bold",
      },
      placeholder1: {
        borderColor: "transparent",
        right: wp("1.5%"),
        fontFamily: "Segoe UI",
        // color:Colors.black,
        fontSize: 13,
        top: hp("2%"),
        fontWeight: "bold",
        height:hp("8%")
      },
    
      outerView: {
        flexDirection: "row",
        flexWrap: "wrap",
        left: "-1%",
        top: "0%",
        //  marginBottom: "10%",
      },
      textView: {
        width: wp("40%"),
        borderBottomWidth: 1,
        borderColor: Colors.lightGrey,
        marginTop: hp("1.5%"),
      },
      textViewdate: {
        width: wp("40%"),
        height:hp("12%"),
        borderBottomWidth: 1,
        borderColor: Colors.lightGrey,
        marginTop: hp("1.5%"),
      },
      textView1: {
        width: wp("90%"),
        borderBottomWidth: 1,
        borderColor: Colors.lightGrey,
        marginTop: hp("1.5%"),
      },
      textStyle: {
        fontFamily: "Segoe UI",
        color: Colors.black,
        top: hp("2.5%"),
        fontSize: 13,
        fontWeight: "bold",
      },
      dropDown: {
        width: wp("45%"),
        marginTop: hp("1.5%"),
        flexDirection:"column"

      },
      dropDownInner: {
        left: wp("10%"),
        top: hp("3.5%"),
        flexDirection:"column"

      },
      radoiBtnOuter: {
        flexDirection: "row",
        flexWrap: "wrap",
      },
      radioBtnInner: {
        flexDirection: 'row',
        width: wp("30%"),
        marginTop: hp("5%"),
      },
      radioText: {
        fontFamily: "Segoe UI",
        fontSize: 13,
        color: Colors.black,
        fontWeight: "bold",
      },
      radioBtn: {
        borderColor: "black",
        marginLeft: "10%",
      },
      titleText: {
        fontFamily: "Open Sans",
        color: Colors.lightGrey,
        top: hp("4.5%"),
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.background,
        marginBottom: hp("4.5%"),
        width:wp(90)
      },
      checkBox: {
        // fontFamily:'Open Sans',
        // color:Colors.lightGrey,
        // top:hp('3.5%'),
        // fontSize:16,
        // fontWeight:'bold',
        // color:Colors.background,
        // marginBottom:hp('3.5%')
      },
      button: {
        width: wp("29%"),
        height: hp("5%"),
        marginTop: hp("0%"),
        left: wp("0%"),
        // paddingBottom: 14,
        borderRadius: 3,
        // marginBottom:hp("50%")
      },
      tabs: {
        backgroundColor: Colors.user,
        color: Colors.white,
        marginBottom: hp("10%"),
        borderBottomWidth: 0,
        paddingHorizontal: 10,
        borderRadius: 5,
      },
      tabText: {
        color: "black",
        fontFamily: "Open Sans",
        fontSize: wp("3%"),
        fontWeight: "bold",
      },
      tabHeading: {
        backgroundColor: Colors.white,
        paddingHorizontal: 0,
      },
      tabUnderLine: {
        backgroundColor: Colors.background,
      },
      mainTabs: {
        backgroundColor: Colors.user,
      },
      picker: {
        // borderRadius: 100,
        borderColor:'#515C6F',
        width: wp('40%'),
        borderWidth:0,
        // elevation:5,
        backgroundColor:'white',
        height:hp("5%"),
        // height: hp('5.5%'),
        marginTop:hp("3.5%"),
        // marginBottom: hp('2%'),
        fontSize: wp('2%'),
        justifyContent: 'center'
    },
    textViewdate: {
      width: wp("40%"),
      height:hp("12%"),
      borderBottomWidth: 1,
      borderColor: Colors.lightGrey,
      marginTop: hp("1.5%"),
    },
    cardstyle: {
      flexDirection: "column",
      paddingTop: hp("2%"),
      paddingBottom: hp("1%"),
      width: wp("100%"),
      paddingLeft: wp("2%"),
      paddingRight: wp("2%"),
      elevation: 10,
      backgroundColor: Colors.background,
      height: hp("23%"),
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: "8%",
      borderBottomLeftRadius: 65,
      borderBottomRightRadius: 65,
    },
    backarrow: {
      color: Colors.white,
      fontSize: 32,
      paddingRight: wp("90%"),
    },
    title: {
      color: Colors.white,
      fontFamily: ApplicationStyles.textFont,
      fontSize: 28,
      fontWeight: "bold",
      left: wp("25%"),
      top: hp("-2%"),
    },
    titleText: {
      color: Colors.black,
      fontFamily: ApplicationStyles.textFont,
      fontSize: 28,
      fontWeight: "bold",
    },
    pickerLabel1: {
      color: Colors.black,
      flexDirection: "row",
      fontFamily: ApplicationStyles.textFont,
      fontSize: 15,
      padding: 5,
      // textAlign: "left",
      width: "99%",
    },


})