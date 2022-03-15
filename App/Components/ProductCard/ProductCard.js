import React from 'react'
import { Text, View, TouchableOpacity, Dimensions,Image} from 'react-native'
import Style from './ProductCardStyles'
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
import Price from './Price'
import AvailableStock from './AvailableStock'
import _ from 'lodash'
import InputNumber from 'App/Components/FormInput/InputNumber'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';





const ProductCard = ({data, onPressInfo, quantityInCart, onChangeQuantity, onImageClick, productName,onRemoveClick,productSizeForm,changeSizeForm}) => (
    <View style={Style.box}>
      <View style={{flexDirection: 'row'}}>
    
     <TouchableOpacity onPress={onImageClick}>
  {    data&&data.product_url__c ?  
  <Image
          style={Style.Img}
          source={{
            uri:
               data.product_url__c[0]
          }}
        />
        :
        <Image
                style={{ width: 115, height: 120, resizeMode: 'contain', borderRadius: 3 }}
                source={require('App/Assets/Images/no_image_available.png')}
              />}
      </TouchableOpacity> 
      
    
<View style={Style.tuple}>

<View style={Style.userDtl}>
<Text style={Style.title}>{data.gsm_name}</Text>
          
           <Text style={Style.desc}>{'Packaging: ' + (data.packaging? data.packaging : '')}</Text>
           <Text style={Style.desc}>{'Size: ' + (data.size? data.size : '')}</Text>
           <Text style={Style.desc}>{'Price: ' + ( data.exmill_value__c? HelperService.currencyValue(data.exmill_value__c):'')}</Text>
           
          <View style={{flexDirection:'row', marginLeft:wp('2%'), marginTop:hp('1%')}}>
          <View style={{width: wp('20%')}}>
					<InputNumber
						styles={Style.brandInput}
            placeholder={data.width}
            labelStyles={{...Style.desc,marginLeft:'0%'}}
            value={data.sfid==productSizeForm.id?productSizeForm.width:''}
           editable={data.width.slice(0, 2)=='>='||data.width.slice(0, 2)=='<='}
						onChange={(value) => changeSizeForm({ edited_field: 'width', edited_field1:'id', edited_value: {value,length: data.length,width: data.width, id:data.sfid} })}
						label={'Size1(W)'}
					/>
				</View>
        <View style={{width: wp('20%'), marginLeft:wp('4%'),alignSelf:'center',justifyContent:"center"}}>
					<InputNumber
						styles={Style.brandInput}
            placeholder={data.length}
            labelStyles={{...Style.desc, marginLeft:'0%'}}
            editable={data.length.slice(0, 2)=='>='||data.length.slice(0, 2)=='<='}
						value={data.sfid==productSizeForm.id?productSizeForm.length:''}
						onChange={(value) => changeSizeForm({ edited_field: 'length',  edited_field1:'id',edited_value: {value,length: data.length, width: data.width,id:data.sfid  } })}
						label={'Size2(L)'}
					/>
				</View>
           </View> 

          
            <EditQuantity  value={quantityInCart} onChange={(value) => onChangeQuantity(value)} key={quantityInCart}/>
        

          </View>
       
       {
         /* <Price price={data.basic_price__c} discountPrice={data.discounted_price__c} />
          {data.available_stock__c != null ? <AvailableStock stock={data.available_stock__c}/> : []} */

       }
        </View>
        </View>
        
        
        <View style={Style.actionButtonContainer}>
       {
            <WhiteButton 
            selected={false} 
            title={quantityInCart?'ADDED TO CART':'ADD TO CART'} 
            //disabled={quantityInCart}  
            style={Style.actionButton} 
           onPress={quantityInCart?onRemoveClick:()=>onChangeQuantity(1)}
            textStyle={Style.actionButtonText}>
            
          </WhiteButton> 
    } 
          
          
        </View>
         
    </View>
)

export default ProductCard
