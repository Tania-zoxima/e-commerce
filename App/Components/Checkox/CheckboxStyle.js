import { StyleSheet } from 'react-native'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 10,
        justifyContent: 'flex-start',
        position: 'relative',
        flexDirection: 'row'
    },
    labelText: {
        fontSize: wp('4%'),
        fontFamily: ApplicationStyles.textFont,
        color:Colors.grey,
        marginLeft: 40
    }
})
