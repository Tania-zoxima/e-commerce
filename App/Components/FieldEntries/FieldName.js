import React from 'react'
import { View, Text } from 'react-native'
import { Item, Input, InputGroup, Icon, Container} from 'native-base'
import Style from './FieldEntriesStyles';
import { Colors, ApplicationStyles } from 'App/Theme'

const FieldName = ({ style, value}) => (
	<Text style={{...Style.label}}>
		{value}
	</Text>
)

export default FieldName