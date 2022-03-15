import { StyleSheet } from "react-native";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default StyleSheet.create({

    mainContainer: {
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: hp("0%"),
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
        height: hp("22%"),
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: "8%",
        borderBottomLeftRadius: 65,
        borderBottomRightRadius: 65,
      },
      cardstyle1: {
        flexDirection: "column",
        paddingTop: hp("2%"),
        paddingBottom: hp("1%"),
        width: wp("100%"),
        paddingLeft: wp("2%"),
        paddingRight: wp("2%"),
        elevation: 10,
        backgroundColor: Colors.background,
        height: hp("12%"),
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
        left: wp("8%"),
        top: hp("-2%"),
      },
      titleText: {
        color: Colors.black,
        fontFamily: ApplicationStyles.textFont,
        fontSize: 28,
        fontWeight: "bold",
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
    
      outerView: {
        flexDirection: "row",
        flexWrap: "wrap",
        left: "1.5%",
        top: "0%",
        marginBottom: "20%",
      },
      textView: {
        width: wp("40%"),
        borderBottomWidth: 1,
        borderColor: Colors.lightGrey,
        marginTop: hp("1.5%"),
      },
      textView1: {
        width: wp("70%"),
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
      button: {
        width: wp("29%"),
        height: hp("5%"),
        marginTop: hp("0%"),
        left: wp("0%"),
        paddingBottom: 14,
        borderRadius: 3,
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
});