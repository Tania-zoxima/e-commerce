import React from 'react'
import { View, Text } from 'react-native'
import { Item, Input, InputGroup,  Container} from 'native-base'
import Style from './ItemDetailStyles';
import { Colors, ApplicationStyles } from 'App/Theme'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ItemDetail = ({ style, label, value, highlight,showEdit,showDelete}) => (
	<View style={{...Style.container}}>
		<View style={{...Style.textContainerLabel}}><Text style={{...Style.label}}>{label}</Text></View>
		<View style={{...Style.textContainerValue}}><Text style={{...Style.value}}>{value}</Text></View>
		{showEdit ? <Icon name={'pencil'} style={{...Style.listItemIcon}} /> : []}
		{showDelete ? <Icon name={'delete'} style={{...Style.listItemIcon}} /> : []}
	</View>
)

export default ItemDetail