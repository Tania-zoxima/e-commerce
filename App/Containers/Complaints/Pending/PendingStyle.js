import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import {ApplicationStyles, Colors} from 'App/Theme';
export default StyleSheet.create({


//     Screen:{
//         width:'97%',
//         paddingBottom:30,
//         backgroundColor:'#fff',
//         marginTop:30,
//        alignSelf:'center',
//         marginHorizontal:3,
    
//         shadowOffset: {
//                 width: 0,
//                 height: 2,
//             },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//         shadowColor: "#000",
//         elevation:6,borderRadius:2,borderWidth:1,borderColor:'#fff'
// },
date: {
    fontSize: 18,
    fontFamily: "Rubik",
    color: Colors.background,
    // left: hp("3%"),
    top: hp("8%"),
    textAlign: "center",
    alignSelf:"center",
    fontWeight:"bold"
  },
  month: {
    fontSize: 12,
    fontFamily: "Rubik",
    color: Colors.background,
    left: hp("0%"),
    top: hp("1%"),
  },
  head: {
    fontSize: 18,
    fontFamily: "Rubik",
    left: hp("0%"),
    fontWeight: "bold",
    color: Colors.background,
    position:"absolute"
  },
  head1: {
    fontSize: 13,
    fontFamily: "Rubik",
    // left:hp('-0.4%'),
    textAlign: "center",
    top: hp("2.5%"),
  },
  head2: {
    fontSize: 13,
    fontFamily: "Rubik",
    // left:hp('-0.4%'),
    top: hp("2.5%"),
    color: Colors.lightGrey,
    textAlign: "center",
    fontWeight: "bold",
  },

  ttl: {
    color: Colors.lightGrey,
    fontSize: wp("3%"),
    fontFamily: "Rubik",
    fontWeight: "bold",
    bottom: hp("1%"),
    top: hp("4%"),
    left: wp("7%"),
    // width:wp("25%")
  },
  detail: {
    color: Colors.black,
    fontSize: wp("3%"),
    fontFamily: "Rubik",
    fontWeight: "bold",
    bottom: hp("1%"),
    left: wp("12%"),
    top: hp("4%"),
    width:wp("20%")
  },
})