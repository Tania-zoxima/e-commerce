import React, { useState } from "react";
import { Platform, Text, View, StyleSheet,TextInput,TouchableHighlight, TouchableOpacity } from "react-native";
import ToggleSwitch from "rn-toggle-switch";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { ApplicationStyles, Helpers, Images, Metrics, Colors } from "App/Theme";
import InputText from "App/Components/FormInput/InputText";
import Modal from "react-native-modal";
import AddressDetailScreen from "./AddressDetailScreen";
import OrdersActions from "App/Stores/Orders/Actions";
import { connect } from "react-redux";

function ShippingScreen(props) {
  const [switchValue, setSwitchValue] = useState(true);
  const toggleSwitch = (value) => {
    //To handle switch toggle
    setSwitchValue(value);
    //State changes according to switch
  };
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            textAlignVertical: "center",
          }}
        >
          Shipping Same As Billing Address
        </Text>
        <ToggleSwitch
          text={{
            on: "Yes",
            off: "No",
            activeTextColor: "white",
            inactiveTextColor: "black",
          }}
          textStyle={{ fontWeight: "bold" }}
          color={{
            indicator: "white",
            active: "#ed1b24",
            inactive: "#F6AEAC",
            activeBorder: "#ed1b24",
            inactiveBorder: "#F6AEAC",
          }}
          active={switchValue}
          disabled={false}
          width={40}
          radius={15}
          onValueChange={toggleSwitch}
        />
      </View>
      {switchValue ? (
        []
      ) : (
        <View style={{ flexDirection: "column" }}>
          <TouchableOpacity style={{backgroundColor:Colors.cardblue,width:wp("40%"),height:hp("5%"),margin:"5%",borderRadius:10}}
          onPress={toggleModal}>
            <Text style={{color:"white",alignSelf:"center",marginTop:hp("1%"),fontSize:16}}>Select from existing</Text>
          </TouchableOpacity>
          <View>
              <View style={{flexDirection:"row",flexWrap:"wrap"}}>
            <View style={{flexDirection:"column",borderColor:Colors.lightGrey,borderBottomWidth:1,width:wp("40%"),margin:"4%"}}>
                <Text style={{fontWeight:"bold",fontSize:14}}>Ship to Code</Text>
              <TextInput
                style={{ height: 40 }}
                placeholder="Enter here!"
                value={props.shipDetail.order}
              />
            </View>
            <View style={{flexDirection:"column",borderColor:Colors.lightGrey,borderBottomWidth:1,width:wp("40%"),margin:"4%"}}>
                <Text style={{fontWeight:"bold",fontSize:14}}>Ship to Name</Text>
              <TextInput
                style={{ height: 40 }}
                placeholder="Enter here!"
                value={props.shipDetail.name}
              />
            </View>
            <View style={{flexDirection:"column",borderColor:Colors.lightGrey,borderBottomWidth:1,width:wp("40%"),margin:"4%"}}>
                <Text style={{fontWeight:"bold",fontSize:14}}>City</Text>
              <TextInput
                style={{ height: 40 }}
                placeholder="Enter here!"
              />
            </View>
            <View style={{flexDirection:"column",borderColor:Colors.lightGrey,borderBottomWidth:1,width:wp("40%"),margin:"4%"}}>
                <Text style={{fontWeight:"bold",fontSize:14}}>Shipping Address</Text>
              <TextInput
                style={{ height: 40 }}
                placeholder="Enter here!"
              />
            </View>
            <View style={{flexDirection:"column",borderColor:Colors.lightGrey,borderBottomWidth:1,width:wp("40%"),margin:"4%"}}>
                <Text style={{fontWeight:"bold",fontSize:14}}>Contact</Text>
              <TextInput
                style={{ height: 40 }}
                placeholder="Enter here!"
              />
            </View>
            </View>
          </View>
        </View>
      )}
      <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <TouchableOpacity onPress={toggleModal} >
            <Text style={{fontSize:20,marginLeft:hp("42%"),fontWeight:"bold"}}>X</Text>
          </TouchableOpacity>
          <AddressDetailScreen setModalVisible={()=>setModalVisible(false)}/>
        </View>
      </Modal>
    </View>
  );
}
const mapStateToProps = (state) => {
  return {
    shipDetail: state.orders.shipDetail,
  };
};

const mapDispatchToProps = (dispatch) => ({
    selectDetail: (params) =>
    dispatch(OrdersActions.selectDetail(params)),
});
export default connect(mapStateToProps, mapDispatchToProps) (ShippingScreen);
