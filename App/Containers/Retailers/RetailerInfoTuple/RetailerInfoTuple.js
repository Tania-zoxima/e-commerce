import React from 'react'
import {View, Text, ScrollView, StyleSheet,TouchableOpacity} from 'react-native';
import { Icon } from 'native-base'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import styles from './RetailerInfoTupleStyle'
import { AREA, PREV_ORDER_VAL, VISIT_THIS_WEEK, MAIN_COMPETETOR } from 'App/Constants'
import {HelperService} from 'App/Services/Utils/HelperService';
import NavigationService from 'App/Services/NavigationService'
import GenericIcon from 'App/Components/GenericIcon'
import moment from 'moment';

const RetailerInfoTuple = ({ onPress, areas, item, id, dealer, beat, businessChannel }) => (
  
  <ScrollView style={{...styles.card, flex:1}}>
      <View style={styles.row}>
      
     
     <View style={{width:'100%', marginLeft:'2%'}}>
     <Text style={styles.grey}>Email</Text>
      <View style={styles.textContainer}>
       <Text style={{fontWeight:'bold'}}>{item.e_mail__c ? item.e_mail__c : ''}</Text>
     </View>
       </View>
   </View>
    <View style={styles.row}>
     
      <View style={{width:'40%' ,marginLeft:'3%'}}>
        <Text style={styles.grey}>Mobile No.</Text>
          <View style={styles.textContainer}>
            <Text style={{fontWeight:'bold'}}>{item.phone? item.phone : ''}</Text>
          </View>
      </View>
      <View style={{width:'40%', marginLeft:'0%'}}>

    <Text style={styles.grey}>{'SAP Code'}</Text>
    <View style={styles.textContainer}><Text style={{fontWeight:'bold'}}>{item.sap_code__c ? item.sap_code__c : ''}</Text> 
   </View>
  </View>
    
    </View>
    <View style={styles.row}>
      <View  style={{width:'90%' ,marginLeft:'3%'}}>
        <View style={{flexDirection:'row'}}>
        <Text style={{...styles.grey}}>Billing Address</Text>
        <TouchableOpacity 
                                   onPress={onPress}
                                     >
                                     <GenericIcon 
                                         name={'edit'} 
                                         //show={true}
                                         style={styles.editIcon}
                                     />
                                 </TouchableOpacity>
                                 </View>
        <View style={styles.textContainer}>
        <Text style={{fontWeight:'bold'}}>
        {item.billingstreet ? item.billingstreet : 'NA'},
        {item.billingcity ? item.billingcity : 'NA'},
        {item.billingstate ? item.billingstate : 'NA'}
        </Text>
        </View>
      </View>
     
    
      
     
    </View>

    <View  style={{width:'50%', marginLeft:'3%'}}>
       
        <Text style={{...styles.grey}}>Postal Code</Text>
       <View style={styles.textContainer}>
        <Text style={{fontWeight:'bold'}}>{item.billingpostalcode ? item.billingpostalcode : ''}</Text>
      </View></View>

    
    <View style={styles.row}>
   
      <View style={{width:'55%', marginLeft:'3%'}}>
      <Text style={styles.grey}>Potential OffTake (No. of boxes)</Text>
      <View style={styles.textContainer}>
        <Text style={{fontWeight:'bold'}}>
          {item.potential_value__c ? item.potential_value__c : ''}
        </Text>
       </View>
      </View>
      
      <View style={ {width:'30%', marginLeft:'0%'}}>
        <Text style={styles.grey}>{'Total Credit Limit'}</Text>
        <View style={styles.textContainer}>
        <Text style={{fontWeight:'bold'}}>{item.total_credit_limit__c ?  item.total_credit_limit__c: ''}</Text>
      </View></View>
      </View>
    
    <View style={styles.row}>
  
      <View style={{width:'40%' ,marginLeft:'3%'}}>
        <Text style={styles.grey}>Last Visit Date</Text>
        <View style={styles.textContainer}>
        <Text style={{fontWeight:'bold'}}>
          {item.last_visit_date__c?
             item.last_visit_date__c
            : ''}
        </Text></View>
      </View>
      <View style={{width:'40%'}}>
        <Text style={styles.grey}>Last Order Date</Text>
        <View style={styles.textContainer}>
        <Text style={{fontWeight:'bold'}}>
          {moment(item.last_order_date__c).isValid()
            ? moment(item.last_order_date__c).format('DD/MM/YYYY')
            : ''}
        </Text>
      </View></View>
    
     
     
    </View>

    <View style={{width:'90%',marginLeft:"3%"}}>
        <Text style={styles.grey}>GST IN</Text>
         <View style={styles.textContainer}>
        <Text style={{fontWeight:'bold'}}>{ item.gst_in__c||''}</Text>
      </View>
      </View>
    

   
   {  (item.account_type__c=='Retailer'||item.account_type__c=='CRM Customer'||item.account_type__c=='Customer') ?    
 <View style={styles.row}>
 <View style={{width:'50%'}}>
   <Text style={styles.grey}>{businessChannel=='Wholesale'?'WholeSaler':'Distributor'}</Text>
   <View style={styles.textContainer}>
   <Text style={{fontWeight:'bold'}}>{ item.parentid? HelperService.getNameFromSFID(dealer,item.parentid):''}</Text>
 </View>
 </View>
 <View style={{width:'50%',marginLeft:'2%'}}>
   <Text style={styles.grey}>{businessChannel=='Wholesale'?'Reseller Type':'Retailer Type'}</Text>
   <View style={styles.textContainer}>
   <Text style={{fontWeight:'bold'}}>{item.dealer_type__c?item.dealer_type__c:''}</Text>
 </View></View>
 </View>
 :[] }

{  (item.account_type__c=='Retailer'||item.account_type__c=='CRM Customer') ?    
 <View style={styles.row}>
 <View style={{width:'50%'}}>
   <Text style={styles.grey}>{businessChannel=='Wholesale'? 'Potential OffTake(MT)':'Potential OffTake(No. of boxes)'} </Text>
   <View style={styles.textContainer}>
   <Text style={{fontWeight:'bold'}}>{ item.potential_value__c? item.potential_value__c :''}</Text>
 </View>
 </View>
 
 </View>
 :[] }

 
  </ScrollView>

)

export default RetailerInfoTuple
