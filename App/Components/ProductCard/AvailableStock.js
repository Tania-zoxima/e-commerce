import React from 'react'
import { Text, View, TouchableOpacity, Dimensions} from 'react-native'
import Style from './ProductCardStyles'
import { Icon, Input, Button } from 'native-base'
import { AREA, PREV_ORDER_VAL, VISIT_THIS_WEEK, MAIN_COMPETETOR } from 'App/Constants'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import NavigationService from 'App/Services/NavigationService'
import {HelperService} from 'App/Services/Utils/HelperService';
import _ from 'lodash'




const AvailableStock = ({stock}) => (
    <View style={Style.priceContainer}>
    		<Text style={Style.availableStock}>{`${stock} available in stock`}</Text>    		
  	</View>
)

export default AvailableStock
