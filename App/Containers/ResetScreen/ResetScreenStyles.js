import React from "react";
import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "App/Theme";


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#ed1b24",
    // width:"90%",
    // maxHeight:"40%",
    // alignSelf:"center",
    // elevation:5,
    // borderRadius:15,
    // marginVertical:"40%",

    borderRadius:15,
    // left:"3%",
    flexDirection: "column",
    elevation: 15,
    backgroundColor: "#ed1b24",
    height: hp("35%"),
    justifyContent: "center",
    // alignItems: "center",
    alignSelf:"center",
    marginTop:"30%",
     width:"90%",
    

  },
    backarrow: {
        color:"#ed1b24" ,
        fontSize: 28,
        paddingLeft: 7,
        paddingTop: 15,
      },
  image: {
    width: wp("75%"),
    height: hp("8%"),
    marginTop: hp("3%"),
    alignSelf: "center",
  },
  text: {
    width: wp("85%"),
    height: hp("6%"),
    borderColor: "#00000040",
    borderWidth: 2,
    marginTop: hp("3%"),
    marginLeft: wp("8%"),
    borderRadius: 4,
    fontSize: 17,
    color: "#9A9A9A",
    paddingHorizontal: wp("5%"),
  },
  outer: {
    marginTop: hp("2%"),
    justifyContent: "center",
    width: wp('85%'),
    alignSelf:"center"

  },

  button: {
    width: wp("85%"),
    height: hp("6%"),
    backgroundColor: "#9a0000",
    marginTop: hp("4%"),
    // marginLeft: wp("5%"),
    alignSelf:"center",
    borderRadius: 3,
    textAlign: "center",
    textTransform:"uppercase",
    shadowColor: Colors.darkRedPink,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,
    elevation: 10,
  },

  buttonText: {
    color: "white",
    textAlign:"center",
    top:hp("1%"),
    fontSize: 18,
    justifyContent: "center",
    
  },
  otpContainer: {
    marginHorizontal: 20,
    // marginBottom: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop:hp("5%")
  },
  otpBox: {
    borderRadius: 5,
    borderColor: "#F0F0F0E3",
    backgroundColor:"#F0F0F0E3",
    borderWidth: 0.5,
    color:"black"

  },
  otpText: {
    fontSize: 25,
    color: Colors.DEFAULT_BLACK,
    padding: 0,
    textAlign: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  borderStyleBase: {
    width: 30,
    height: 45
  },
 
  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },
 
  // underlineStyleBase: {
  //   width: 30,
  //   height: 45,
  //   borderWidth: 0,
  //   borderBottomWidth: 1,
  // },
 
  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
    color:"black"
  },
  
});

export default styles;
