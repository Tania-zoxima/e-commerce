import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import BackArrowButton from "App/Components/BackArrowButton";
import { ApplicationStyles, Colors } from "App/Theme";
import { Card } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { HelperService } from "App/Services/Utils/HelperService";
import GenericIcon from "App/Components/GenericIcon";

import DetailCard from "../../Components/DetailCard/DetailCard";
import DetailCardStrip from "../../Components/DetailCard/DetailCardStrip";
import DatePicker from "App/Components/DatePicker";
import { Icon } from "native-base";
import BlueButton from "../../Components/BlueButton/BlueButton";
import NavigationService from "App/Services/NavigationService";
import NewRequisitionScreen from "./NewRequisitionScreen";
import NewRetailerStyle from "../Retailers/NewRetailer/NewRetailerStyle";
import Modal from "react-native-modal";


export default function BrandRequisition() {
  const [data, setdata] = useState([
    {
      order: "MK Traders",
      status: "PENDING",
      date: "2",
      id: "1",
      month: "JAN",
      name: "Requisition Date",

      requisitionNo: "RQ-75896",
      shopBranding: "Shop Board",
      shopBoard: "Glow Sign",
      remarks: "Medium",
    },
    {
      order: "MK Traders",
      status: "APPROVED",

      date: "2",
      id: "1",
      month: "JAN",
      name: "Requisition Date",

      requisitionNo: "RQ-75896",
      shopBranding: "Shop Board",
      shopBoard: "Glow Sign",
      remarks: "Medium",
    },
    {
      order: "MK Traders",
      status: "DISPATCHED",
      date: "2",
      id: "1",
      month: "JAN",
      name: "Requisition Date",

      requisitionNo: "RQ-75896",
      shopBranding: "Shop Board",
      shopBoard: "Glow Sign",
      remarks: "Medium",
    },
  ]);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={Styles.mainContainer}>
      <View
        style={{
          paddingTop: hp("0%"),
          paddingBottom: hp("1%"),
        //   right: "48%",
        }}
      >
        <BackArrowButton style={Styles.backarrow} />
      </View>
      <Text style={{ ...Styles.titleText }}>Brand Requisition</Text>
      <BlueButton style={Styles.button} title={"NEW REQUISITION"} 
              textStyle={{ ...Styles.buttontextStyle}}
                onPress={toggleModal}
              />
      

      <FlatList
        style={{ top: hp("2%%"), marginBottom: "10%" }}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DetailCard
            dark={false}
            style={{
              backgroundColor: Colors.white,
              borderWidth: 0.5,
              width: wp("89%"),
              right: wp("1%"),
              borderColor: "#F66A676B",
            }}
            heading={item.order}
            headstyle={Styles.head}
            status={item.status}
            Stylestatus={
              item.status == "PENDING"
                ? Styles.pending
                : item.status == "APPROVED"
                ? Styles.approved
                : Styles.dispatched
            }
            date={item.date}
            datestyle={Styles.date}
            month={item.month}
            monthstyle={Styles.month}
            heading1={item.name}
            head1style={Styles.head1}
            content={[
              <DetailCardStrip
                labelStyle={Styles.ttl}
                valueStyle={Styles.detail}
                label={"Requisition No."}
                value={item.requisitionNo}
              />,
              <DetailCardStrip
                labelStyle={Styles.ttl}
                valueStyle={Styles.detail}
                label={"Shop Branding"}
                value={item.shopBranding}
              />,
              <DetailCardStrip
                labelStyle={Styles.ttl}
                valueStyle={Styles.detail}
                label={"Shop Board"}
                value={item.shopBoard}
              />,
              <DetailCardStrip
                labelStyle={Styles.ttl}
                valueStyle={Styles.detail}
                label={"Remarks"}
                value={item.remarks}
              />,
            ]}
          />
        )}
      />
      <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <TouchableOpacity onPress={toggleModal}>
          <Text style={{fontSize:15,marginLeft:hp("42.5%"),fontWeight:"bold", padding:5, width:hp('-0.6%')}}>X</Text>
          </TouchableOpacity>
          <NewRequisitionScreen />
        </View>
      </Modal>
      
    </View>
  );
}
const Styles = StyleSheet.create({
   
        
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: hp("0%"),
  },
  cardstyle: {
    backgroundColor: Colors.darkRedPink,
    width: wp("100%"),
    top: hp("-1%"),
    height: hp("15%"),
    borderBottomLeftRadius: 55,
    borderBottomRightRadius: 55,
  },
  backarrow: {
    color: Colors.background,
    fontSize: 34,
    paddingRight: 360,
    paddingTop: 15,
  },
  title: {
    fontFamily: "Rubik",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    bottom: hp("1%"),
  },
  titleText: {
    color: Colors.black,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 27,
    fontWeight: "bold",
  },

  date: {
    fontSize: 24,
    fontFamily: "Rubik",
    color: Colors.background,
    left: hp("2%"),
    top: hp("1.5%"),
  },
  month: {
    fontSize: 12,
    fontFamily: "Rubik",
    color: Colors.background,
    left: hp("1.5%"),
    top: hp("1%"),
  },
  head: {
    fontSize: 18,
    fontFamily: "Rubik",
    left: hp("0%"),
    fontWeight: "bold",
    color: Colors.background,
  },
  head1: {
    fontSize: 10,
    fontFamily: "Rubik",
    left: hp("-0.4%"),
    top: hp("1.5%"),
  },
  head2: {
    fontSize: 13,
    fontFamily: "Rubik",
    left: hp("-0.4%"),
    top: hp("1.5%"),
    color: Colors.lightGrey,
  },

  ttl: {
    color: Colors.lightGrey,
    fontSize: wp("3%"),
    fontFamily: "Rubik",
    fontWeight: "bold",
    bottom: hp("1%"),
    top: hp("4%"),
    left: wp("-29%"),
  },
  detail: {
    color: Colors.black,
    fontSize: wp("3%"),
    fontFamily: "Rubik",
    fontWeight: "bold",
    bottom: hp("1%"),
    left: wp("-23%"),
    top: hp("4%"),
  },
  plusIcon: {
    borderRadius: 50,
    bottom: hp("10%"),
    position: "absolute",
    right: wp("5.5%"),
    height: hp("6%"),
    width: wp("12%"),
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100000,
    elevation: 10,
  },
  pending: {
    color: Colors.white,

    fontFamily: ApplicationStyles.textMsgFont,
    backgroundColor: "#D71E48",
    fontSize: 12,
    width: wp("27%"),
    padding: wp(1.4),
    borderRadius: 2,
    top: hp("-0.2%"),
    left: wp("31%"),
    height: hp("3.7%"),
    textAlign: "center",
    elevation:3

  },
  approved: {
    color: Colors.white,

    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: 12,
    // marginBottom: 3,
    backgroundColor: "#FFC303",
    width: wp("27%"),
    padding: wp(1.4),
    borderRadius: 2,
    top: hp("-0.2%"),
    left: wp("31%"),
    height: hp("3.7%"),
    textAlign: "center",
    elevation:3

  },
  dispatched: {
    color: Colors.white,

    fontFamily: ApplicationStyles.textMsgFont,
    backgroundColor: "#32C71BE3",
    fontSize: 12,
    width: wp("27%"),
    padding: wp(1.4),
    borderRadius: 2,
    top: hp("-0.2%"),
    left: wp("31%"),
    height: hp("3.7%"),
    textAlign: "center",
    elevation:3
  },
  titleText: {
    color: Colors.background,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 22,
    fontWeight: "bold",
    bottom:hp('2%')
  },
  button: {
    // width: wp("40%"),
    height: hp("4%"),
    top: hp("1%"),
    marginLeft: wp("46%"),
    marginBottom:hp('2%'),
    borderRadius: 1.5,
    elevation:3
    
  },
  buttontextStyle:{
      fontSize:14,
      padding:1,
      textTransform:'uppercase'

  },
  
});
