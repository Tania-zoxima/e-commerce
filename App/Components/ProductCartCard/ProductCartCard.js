import React from 'react'
import { Text, View, TouchableOpacity, Dimensions} from 'react-native'
import Style from './ProductCartCardStyles'
import { Icon, Input, Button ,Spinner } from 'native-base'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import NavigationService from 'App/Services/NavigationService'
import {HelperService} from 'App/Services/Utils/HelperService';
import Ratings from 'App/Components/Ratings';
import WhiteButton from 'App/Components/WhiteButton'
import BlueButton from 'App/Components/BlueButton'
import GenericIcon from 'App/Components/GenericIcon'
import EditQuantity from 'App/Components/EditQuantity'
import Price from 'App/Components/ProductCard/Price'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import _ from 'lodash'
import GenericDisplayCardStrip from 'App/Components/GenericDisplayCard/GenericDisplayCardStrip'
import InputNumber from 'App/Components/FormInput/InputNumber'


const ProductCartCard = ({data, onRemoveClick, onChangeQuantity, quantity, name,weigthData,dealerDiscount, openDealerDiscountEdit, closeDealerDiscountEdit, changeDealerDiscount, editDealerDiscount,executeVisitData,selectedRetailer,editLoader,deleteLoader,show}) => (
  <View style={{backgroundColor: Colors.lightGrey, marginBottom: '3%', paddingBottom: '3%', borderRadius: 10}}>
    <View style={Style.box}>
          <View style={{...Style.titleContainer, width:wp('30%')}}>
            <Text style={Style.title}>{name}</Text>
          </View>
       
        <View style={Style.quantityContainer}>
		{ editLoader&&editLoader==data.pg_id__c ||editLoader&&editLoader==data.sfid 	?	<Spinner color={Colors.white}/> :
             <EditQuantity  value={quantity} onChange={(value) => onChangeQuantity(value)} key={quantity} />}
       	</View>
       	 <View style={Style.removeContainer}>
			{ deleteLoader&&deleteLoader==data.pg_id__c||deleteLoader&&deleteLoader==data.sfid   	?	<Spinner color={Colors.white}/> : 		<WhiteButton 
	            selected={false} 
	            disabled={false}  
	            style={Style.actionButton}
	            onPress={onRemoveClick} 
	            textStyle={Style.actionButtonText}>
	              <GenericIcon 
	                name="trash-can" 
					style={Style.actionButtonIcon}
					show={true}
	              />
          	</WhiteButton>}
       	</View>
        
    </View>
      <View style={{paddingHorizontal: wp('3%')}}>
	 <GenericDisplayCardStrip label={'Price(Rs)'} value={data.total_price__c*quantity}  /> 
	 <View style={Style.strip}>
		      	<View style={{flexDirection: 'row'}}>
			      		<Text 
			      			style={{...Style.ttl, ...Style.labelStyle}}>{'Discount Per Unit'}
			      		</Text> 
						{ 
						 show	? []:	<TouchableOpacity 
			      			onPress={() => {editDealerDiscount ? closeDealerDiscountEdit() : openDealerDiscountEdit()}}>
							  <GenericIcon 
							  //show={true}
			      				name={editDealerDiscount ? 'save' : 'edit'} 
			      				style={Style.editIcon}
			      			/>
			      		</TouchableOpacity>
						  }
			      	</View>
			      	{
			      		editDealerDiscount ?
				            <View style={Style.editInputFieldContainer}>
				              <View style={Style.editInputFieldChildContainer}>
				              	<InputNumber
			                 		styles={Style.editInputField} 
			                 		value={dealerDiscount} 
			                 		onChange={(value) => changeDealerDiscount({additional_discount: value, sfid: data.product_item__c})}
				            	/>
				            	</View>
			      			</View>:
		      				<Text style={{...Style.detail, ...Style.valueStyle}}>{dealerDiscount ?HelperService.currencyValue(HelperService.numberWithCommas(dealerDiscount)):''}</Text>
		      		}
    		</View>
			{ 
			dealerDiscount? <GenericDisplayCardStrip label={' Total  Discount'} value={HelperService.currencyValue(HelperService.numberWithCommas(Number(dealerDiscount)*Number(quantity)))}  /> :[]
		}
	 { data.packaging? <GenericDisplayCardStrip label={'Packaging'} value={data.packaging}  /> :[]}
	 { data.size? <GenericDisplayCardStrip label={'Size'} value={data.size}  /> :[]}
	 <GenericDisplayCardStrip label={'Number of Reams / Box'} value={data.number_of_reams__c}  />
	 <GenericDisplayCardStrip label={'Number of  Sheets'} value={data.number_of_sheets||data.number_of_sheets__c}  />
	 <GenericDisplayCardStrip label={'Ream Weight(Kg)'} value={data.ream_weight__c}  />


      </View>
    </View>
)

export default ProductCartCard
