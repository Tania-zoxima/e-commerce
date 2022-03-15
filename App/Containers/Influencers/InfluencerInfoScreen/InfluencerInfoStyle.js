import { ApplicationStyles, Colors } from 'App/Theme';
import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    parentContainer: {
        flex: 1
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: wp('1%'),
        paddingRight: wp('1%'),
        alignItems: 'center',
        height: hp('12%')
    },
    actionButton: {
        borderWidth: 1.5,
        alignSelf: 'center',
        height: hp('6%')
    },
    actionButtonText: {
        fontSize: wp('3.1%'),
        fontFamily: ApplicationStyles.textMediumFont
    },
    actionButtonIcon: {
        color: Colors.button,
        fontSize: 20,
        marginRight: 0,
        marginLeft: 12
    },
    callAction: {
        width: wp('20%')
    },
    locationAction: {
        width: wp('38%')
    },
    directionAction: {
        width: wp('45%')
    }
});
