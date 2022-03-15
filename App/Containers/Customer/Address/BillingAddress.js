import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  
} from "react-native";

import BackArrowButton from "App/Components/BackArrowButton";
import { ApplicationStyles, Colors } from "App/Theme";
import { Card } from "react-native-paper";
import DatePicker from "App/Components/DatePicker";
// import DatePickerStyles from "App/Components/DatePicker/DatePickerStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { HelperService } from "App/Services/Utils/HelperService";
import GenericIcon from "App/Components/GenericIcon";

import DisplayCard from "../../../Components/DetailCard/DetailCard";
import DisplayCardStrip from "../../../Components/DetailCard/DetailCardStrip";
import NavigationService from "App/Services/NavigationService";

export default function BillingAddress() {
  const [data, setdata] = useState([
    {
      order: "C0210",
      name: "Sanjay Sharma",

      address: "123 Rajouri garden",
      id: "1",
      city: "Delhi",
      contact: "7986755086",
      
    },
    {
        order: "C0210",
        name: "Sanjay Sharma",

        address: "123 Rajouri garden",
        id: "1",
        city: "Delhi",
        contact: "7529792491",
        
      },
  ]);

  
  return (
    <View style={Styles.mainContainer}>
      
     
      <FlatList
        style={{ top: "4%", marginBottom:hp('10%') }}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DisplayCard
            dark={false}
            onPress={() => NavigationService.navigate("VisitApprovalTuple")}
            style={{
              
              backgroundColor: Colors.white,
              borderColor: '#F66A676B',
              borderWidth: 0.5,
              width:wp('89%'),
              height:hp('19%')

            }}
            heading={item.order}
            headstyle={Styles.head}
            heading1={item.name}
            head1style={Styles.head1}
            content={[
              <DisplayCardStrip
                labelStyle={Styles.ttl}
                valueStyle={Styles.detail}
                label={"Address"}
                value={item.address}
              />,
              <DisplayCardStrip
                labelStyle={Styles.ttl}
                valueStyle={Styles.detail}
                label={"City"}
                value={item.city}
              />,
              <DisplayCardStrip
                labelStyle={Styles.ttl}
                valueStyle={Styles.detail}
                label={"Contact"}
                value={item.contact}
              />,
              
            ]}
          />
        )}
      />
    </View>
  );
}
const Styles = StyleSheet.create({
 
  head: {
    fontSize:17,
    fontFamily: 'Rubik',
    left:hp('1%'),
    fontWeight:'bold',
    color:Colors.background,
    top:hp('0%')

   
  },
  head1: {
    fontSize:13.5,
    fontFamily: 'Rubik',
    left:hp('1%'),
    fontWeight:'bold',
    top:hp('0%')

   
  },
  ttl: {
    color: Colors.lightGrey,
    fontSize: wp("3%"),
    fontFamily: "Rubik",
    fontWeight: "bold",
    top: hp("6.5%"),
    left: wp("-23%"),


  },
  detail: {
    color: Colors.black,
    fontSize: wp("3%"),
    fontFamily: "Rubik",
    fontWeight: "bold",
    top: hp("6.5%"),
    left: wp("2.5%"),

  },
});
