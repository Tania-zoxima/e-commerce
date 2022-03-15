import { StyleSheet, Dimensions } from 'react-native'
import { Colors, ApplicationStyles } from 'App/Theme'

export default StyleSheet.create({
    loader: {
        color: Colors.primary
    },
    label: {
        fontFamily: ApplicationStyles.textMediumFont,
        color: Colors.clr66,
        fontSize: 16,
        textAlign: 'left'
    },
    value: {
        fontFamily: ApplicationStyles.textFont,
        color: Colors.clr66,
        fontSize: 16,
        textAlign: 'left',
    },
    container: {
        alignItems: 'center',
        paddingLeft: 10
    },
    textContainerLabel: {
        height: 20,
        width: Dimensions.get('window').width / 2
    },
    textContainerValue: {
        height: 20,
        width: Dimensions.get('window').width / 2,
        overflow: 'hidden'
    }
})
