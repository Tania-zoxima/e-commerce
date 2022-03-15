import React from 'react'
import { Text, View, TouchableOpacity, Dimensions} from 'react-native'
import Style from './ProductInfoStyles'
import { Icon, Input, Button } from 'native-base'
import { AREA, PREV_ORDER_VAL, VISIT_THIS_WEEK, MAIN_COMPETETOR } from 'App/Constants'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import NavigationService from 'App/Services/NavigationService'
import {HelperService} from 'App/Services/Utils/HelperService';
import Ratings from 'App/Components/Ratings';
import WhiteButton from 'App/Components/WhiteButton'
import BlueButton from 'App/Components/BlueButton'
import GenericIcon from 'App/Components/GenericIcon'
import EditQuantity from 'App/Components/EditQuantity'




const ProductInfoCard = ({data}) => (
    <View style={Style.box}>
        <View style={Style.tuple}>
          <View style={Style.userDtl}>
            <Text style={Style.title}>{data.product_name__c}</Text>
           <Text style={Style.desc}>{data.description__c}</Text>
          </View>
        </View>
        
        
        <View style={Style.btmBox}>
        	<View style={Style.strip}>
	           	<Text style={Style.detail}>{data.item_code__c}</Text>
	            <Text style={Style.ttl}>
	            	
	            	{'Item Code'}
	            </Text>
          	</View>
          	<View style={Style.strip}>
	            <Text style={Style.detail}>{data.business__c}</Text>
	            <Text style={Style.ttl}>
	            	{'Business'}
	            </Text>
          	</View>
        </View>
         
    </View>
)

export default ProductInfoCard
