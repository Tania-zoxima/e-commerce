import React from 'react'
import { View, Text } from 'react-native'
import { Item, Input, InputGroup, Icon, Container} from 'native-base'
import Style from './FieldEntriesStyles';
import { Colors, ApplicationStyles } from 'App/Theme'

const FieldValue = ({ style, value}) => (
	<Text style={{...Style.value}}>
		{value}
	</Text>
)

export default FieldValue