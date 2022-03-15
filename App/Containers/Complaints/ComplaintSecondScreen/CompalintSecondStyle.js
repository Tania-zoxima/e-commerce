import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import {ApplicationStyles, Colors} from 'App/Theme';
export default StyleSheet.create({



    container2: {
        flex: 1,
        backgroundColor: '#fff',
        marginBottom:40
    },   backIcon: {
        color: Colors.button,
        padding: 15,
        fontSize: wp('6%')
      },
      heading: {
        alignSelf: 'center',
        color: '#0720C4',
        fontFamily: ApplicationStyles.textMsgFont,
        fontSize: 24,
        marginBottom: 15
    }, 
    label:{marginLeft:20,marginTop:10,color:Colors.primary,fontSize:16},
    textContainer2:{marginHorizontal:20,borderWidth:1,marginTop:10,padding:10,borderColor: Colors.grey,borderRadius:2},
     textContainer:{height:'15%',marginHorizontal:20,borderWidth:1,marginTop:10,padding:10,borderColor: Colors.grey,borderRadius:2}, 
})