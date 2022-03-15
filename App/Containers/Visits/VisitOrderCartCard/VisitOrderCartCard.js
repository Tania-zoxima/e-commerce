import React from 'react'
import { Text, View, TouchableWithoutFeedback } from 'react-native'
import Style from './VisitOrderCartCardStyles'
import {HelperService} from 'App/Services/Utils/HelperService';
import NavigationService from 'App/Services/NavigationService'

const VisitOrderCartCard = ({
  orderDate,
  customerName,
  quantity,
  items,
  orderValue,
  orderValueWithoutDis,
  totalTax,
  totalDiscount,
  dark=false
}) => {
	return (
    <View style={dark ? Style.darkCard : Style.card}>
      <View>
        <Text style={dark ? Style.darkTitle : Style.title}>{customerName}</Text>
      </View>
      <View>
        <View style={Style.strip}>
          <Text style={dark ? Style.darkTtl : Style.ttl}>{'Order date'}</Text>
          <Text style={dark ? Style.darkDetail : Style.detail}>{HelperService.dateReadableFormat(orderDate)}</Text>
        </View>
        <View style={Style.strip}>
          <Text style={dark ? Style.darkTtl : Style.ttl}>{'Items'}</Text>
          <Text style={dark ? Style.darkDetail : Style.detail}>{items}</Text>
        </View>
        <View style={Style.strip}>
          <Text style={dark ? Style.darkTtl : Style.ttl}>{'Total Quantity'}</Text>
          <Text style={dark ? Style.darkDetail : Style.detail}>{quantity}</Text>
        </View>
        <View style={Style.strip}>
          <Text style={dark ? Style.darkTtl : Style.ttl}>{'Total Additional Discount'}</Text>
          <Text style={dark ? Style.darkDetail : Style.detail}>{ totalDiscount?HelperService.FixedcurrencyValue(totalDiscount):0}</Text>
        </View>
        <View style={Style.strip}>
          <Text style={dark ? Style.darkTtl : Style.ttl}>{'Order Value (Without discount)'}</Text>
          <Text style={dark ? Style.darkDetail : Style.detail}>{HelperService.FixedcurrencyValue(orderValueWithoutDis)}</Text>
        </View>
       {
       // <View style={Style.strip}>
         // <Text style={dark ? Style.darkTtl : Style.ttl}>{'GST'}</Text>
          //<Text style={dark ? Style.darkDetail : Style.detail}>{HelperService.FixedcurrencyValue(totalTax)}</Text>
        //</View>

       }
        <View style={Style.strip}>
          <Text style={dark ? Style.darkTtl : Style.ttl}>{'Total Order Value'}</Text>
          <Text style={dark ? Style.darkDetail : Style.detail}>{HelperService.FixedcurrencyValue(orderValue)}</Text>
        </View>
      </View>
    </View>
)}

export default VisitOrderCartCard
