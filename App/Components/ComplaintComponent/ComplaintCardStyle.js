import { StyleSheet } from 'react-native'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({


    Screen:{
        width:'97%',
        paddingBottom:30,
        backgroundColor:'#fff',
        marginTop:30,
       
        marginHorizontal:3,
    
        shadowOffset: {
                width: 0,
                height: 2,
            },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        shadowColor: "#000",
        elevation:6,borderRadius:2,borderWidth:1,borderColor:'#fff'
},

})