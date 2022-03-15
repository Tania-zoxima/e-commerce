import React from 'react'
import { Text, View, TouchableWithoutFeedback } from 'react-native'
import Style from './GenericDisplayCardStyles'
import { ORDER_DATE, ORDER_VALUE, ORDER_NUM } from '../../Constants'
import {HelperService} from 'App/Services/Utils/HelperService';
import NavigationService from 'App/Services/NavigationService'

const GenericDisplayCardVerticalStrip = ({
  label,
  value,
  dark
}) => (
    <View style={Style.stripV}>
      	<Text style={dark ? Style.darkTtl : Style.ttl1}>{label}</Text>
      	<Text style={dark ? Style.darkDetail : Style.detail1}>{value}</Text>
    </View>
);

export default GenericDisplayCardVerticalStrip