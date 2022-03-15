import React from 'react'
import { View, Text } from 'react-native'
import { Item, Input, InputGroup, Icon, Container} from 'native-base'
import Style from './NameStyles';
import { Colors, ApplicationStyles } from 'App/Theme'

const Name = ({ style, value}) => (
	<Text style={{...Style.name, ...style}}>
		{value}
	</Text>
)

export default Name