import React from 'react'
import { View, Text } from 'react-native'
import { Item, Input, InputGroup, Icon, Container} from 'native-base'
import Style from './AddressStyles';
import { Colors, ApplicationStyles } from 'App/Theme'
import GenericIcon from 'App/Components/GenericIcon'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Address = ({ style, value}) => (
	<View style={{flexDirection: 'row', width:'95%'}}>
		<GenericIcon name={"location-on"} style={{color: Colors.primary, fontSize: wp('5%'), ...style}}/>
		<Text style={{...Style.address, ...style}}>
			{`  ${value}`}
		</Text>
	</View>
)

export default Address