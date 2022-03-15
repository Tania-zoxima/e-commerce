import React from 'react'
import { Text, View, TouchableOpacity, Dimensions} from 'react-native'
import Style from './ProductCardStyles'
import { Icon, Input, Button } from 'native-base'
import { AREA, PREV_ORDER_VAL, VISIT_THIS_WEEK, MAIN_COMPETETOR } from 'App/Constants'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import NavigationService from 'App/Services/NavigationService'
import {HelperService} from 'App/Services/Utils/HelperService';
import _ from 'lodash'




const Price = ({price, discountPrice}) => (
    <View style={Style.priceContainer}>
    	{discountPrice ? <Text style={Style.price}>{HelperService.currencyValue(discountPrice)}</Text> : [] }


    	{price ? <Text style={Style.discountedPrice}>{price}</Text> : [] }


   		{discountPrice && price ? <Text style={Style.discountedPriceOff}>{Math.floor(100 - (discountPrice/price)*100) + '% off'}</Text> : [] }
  	</View>
)

export default Price
