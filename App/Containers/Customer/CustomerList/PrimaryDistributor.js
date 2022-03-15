import React, { useState } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import BackArrowButton from "App/Components/BackArrowButton";
import { ApplicationStyles, Colors } from "App/Theme";
import { Card } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import NavigationService from "App/Services/NavigationService";

import DisplayCard from "../../../Components/DisplayCard/DisplayCard";
import DisplayCardStrip from "../../../Components/DisplayCard/DisplayCardStrip";
import SearchBar from "App/Components/SearchBar";

export default function PrimaryDistributor() {
  const [data, setdata] = useState([
    {
      name: "AK Pipes & Fittings",
      address:"Mayur Vihar, New Delhi",
    
      id: "1",
      lastOrderDate: "28/06/2021",
      lastVisitDate: "28/06/2021",
    },
    {
        name: "MK Pipes & Fittings",
        address:"Mayur Vihar, New Delhi",
      
        id: "1",
        lastOrderDate: "28/06/2021",
        lastVisitDate: "28/06/2021",
      },
      {
        name: "SK Pipes & Fittings",
        address:"Mayur Vihar, New Delhi",
      
        id: "1",
        lastOrderDate: "28/06/2021",
        lastVisitDate: "28/06/2021",
      },
  ]);
  return (
    <View style={Styles.mainContainer}>
        

      <FlatList style={{top:hp('1%')}}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DisplayCard
            dark={false}
            onPress={() => NavigationService.navigate("DistributorProfile")}

            style={{
              backgroundColor: Colors.white,
              borderColor: '#F66A676B',
              borderWidth: 1,
              height:hp('18.4%')

            }}
            heading={item.name}
            Styletitle={Styles.head}

            heading1={item.address}
            headingStyle={Styles.head1}

            icon={"call"}
            icon1={'location-on'}

            iconStyle={Styles.checkicon1}
            Stylestatus={Styles.status}
            iconstyle={Styles.checkicon}
            content={[
              <DisplayCardStrip
                stylettl={Styles.ttl}
                styledetail={Styles.detail}
                label={"Last Order Date"}
                value={item.lastOrderDate}
              />,
              <DisplayCardStrip
                stylettl={{...Styles.ttl, top:hp('-11%')}}
                styledetail={{...Styles.detail, top:hp('-11%')}}
                label={"Last Visit Date"}
                value={item.lastVisitDate}
              />,
             
            ]}
          />
        )}
      />
    </View>
  );
}
const Styles = StyleSheet.create({

  head:{
    color: Colors.background,
    fontFamily: 'Segoe UI',
    fontSize: 17,
    fontWeight:'bold',
    marginBottom: hp('3%'),


  },
  head1:{
    color: Colors.black,
    fontFamily: 'Segoe UI',
    fontSize: 13,
    fontWeight:'bold',
    top: hp("-2%"),


   

  },

  checkicon: {
    left: wp("76%"),
    top: hp("-8.5%"),
    backgroundColor: Colors.phoneClr,
    color: Colors.white,
    borderRadius: 50,
    height: hp('4%'),
    width: wp('8%'),
    padding: ('1.8%'),
    fontSize: 20,
    fontWeight: "bold",
  },
  checkicon1: {
    left: wp("65%"),
    top: hp("-12.5%"),
    backgroundColor: Colors.cardblue,
    color: Colors.white,
    borderRadius: 50,
    height: hp('4%'),
    width: wp('8%'),
    padding: ('1.7%'),
    fontSize: 20,
    fontWeight: "bold",
  },
  ttl: {
    color: Colors.lightGrey,
    fontSize: wp("3%"),
    fontFamily: ApplicationStyles.textFont,
    left: wp("10%"),
    fontWeight: "bold",
    top:hp('-5.5%')
  },
  detail: {
    color: Colors.black,
    fontSize: wp("3%"),
    fontFamily: ApplicationStyles.textMsgFont,
    right: wp("10%"),
    fontWeight: "bold",
    top:hp('-5.5%')

  },

});
