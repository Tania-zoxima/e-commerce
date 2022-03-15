import React from 'react'
import { Text, View, Image, TouchableWithoutFeedback,Pressable  } from 'react-native'
import styles from './RetailerTupleStyle'
import moment from "moment";
import { Icon, Input, Button } from 'native-base'
import { AREA, PREV_ORDER_VAL, VISIT_THIS_WEEK, MAIN_COMPETETOR } from 'App/Constants'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles,StyleSheet, } from 'App/Theme'
import NavigationService from 'App/Services/NavigationService'
import {HelperService} from 'App/Services/Utils/HelperService';

const RetailerTuple = ({ onPress, id, item, areas, competitors }) => {
  return(
    <TouchableWithoutFeedback onPress={onPress}>
  <View style={{...styles.surface , }}>
  
    <View style={styles.row}>
      <Text style={styles.head}>{item?.name}</Text>
    </View>
    
  
    <View style={[styles.keyvalue]}>
      <Text style={styles.key}>Last Order Date</Text>
      <Text style={styles.value}>
        {item.last_order_date__c !== null
          ? moment(item.last_order_date__c).format("DD/MM/YYYY")
          : "NA"}
      </Text>
    </View>
    <View style={[styles.keyvalue]}>
      <Text style={styles.key}>Total Order Value</Text>
      <Text style={styles.value}>NA</Text>
    </View>
    <View style={[styles.keyvalue]}>
      <Text style={styles.key}>Last Visit Date</Text>
      <Text style={styles.value}>
        {item.last_visit_date__c !== null
          ? item.last_visit_date__c
          : "NA"}
      </Text>
    </View>
 
</View>
</TouchableWithoutFeedback>
);};

export default RetailerTuple


