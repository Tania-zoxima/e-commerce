import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Picker } from 'native-base'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Helpers, Metrics, Fonts, Colors, ApplicationStyles } from 'App/Theme'

const Separator = () => (
  <View style={Styles.view}></View>
)

export default Separator;

const Styles = StyleSheet.create({
	view: {
		width: '100%', 
		borderBottomWidth: .5,
		borderBottomColor: Colors.user,
		marginVertical: hp('1.5%')
	}
});
