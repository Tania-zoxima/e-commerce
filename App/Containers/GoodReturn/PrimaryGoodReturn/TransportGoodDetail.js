import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors, ApplicationStyles } from "App/Theme";
import Modal from "react-native-modal";
import TransportGoodData from "./TransportGoodData";
import OrdersActions from "App/Stores/Orders/Actions";
import { connect } from "react-redux";
import GenericIcon from "App/Components/GenericIcon";

function TransportGoodDetail(props) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const { cartItem } = props;
  return (
    <View>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: Colors.darkRedPink,
                width: wp(95),
                left: wp(2.5),
                height: hp(6),
                marginBottom: hp(1),
                // margin: 4,
                marginTop: hp(5),
                paddingLeft: wp("2%"),
                paddingRight: wp("2%"),
              }}
            >
              <Text
                style={{
                  textAlignVertical: "center",
                  width: wp("12%"),
                  borderColor: Colors.white,
                  borderRightWidth: 2,
                  color: Colors.white,
                }}
              >
                S.No.
              </Text>
              <Text
                style={{
                  textAlignVertical: "center",
                  right: wp("4%"),
                  width: wp("24%"),
                  borderColor: Colors.white,
                  borderRightWidth: 2,
                  color: Colors.white,
                  textAlign: "center",
                }}
              >
                Location
              </Text>
              <Text
                style={{
                  textAlignVertical: "center",
                  // left: wp("2%"),
                  width: wp("32%"),
                  borderColor: Colors.white,
                  borderRightWidth: 2,
                  color: Colors.white,
                }}
              >
                Transport Name
              </Text>
              <Text
                style={{ textAlignVertical: "center", color: Colors.white }}
              >
                Action
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "white",
                width: wp(95),
                left: wp(2.5),
                height: hp(5),
                marginBottom: hp(1),
                // margin: 4,
                marginTop: hp(1),
                paddingLeft: wp("2%"),
                paddingRight: wp("2%"),
                borderColor: Colors.darkRedPink,
                elevation: 5,
                borderWidth: 0.5,
                shadowColor: Colors.darkRedPink,
              }}
            >
              <Text
                style={{
                  textAlignVertical: "center",
                  width: wp("9%"),
                  borderColor: Colors.darkRedPink,
                  borderRightWidth: 2,
                  color: Colors.black,
                  right: wp("-3%"),
                }}
              >
                {"1"}
              </Text>
              <TextInput
                style={props.selectedTransport.zx_transportername?{
                  textAlignVertical: "center",
                  // width: wp("30%"),
                  // borderColor: Colors.darkRedPink,
                  // borderRightWidth: 2,
                  color: Colors.black,
                  //  right:wp("19%")
                }:{
                    textAlignVertical: "center",
                    // width: wp("30%"),
                    // borderColor: Colors.darkRedPink,
                    // borderRightWidth: 2,
                    color: Colors.black,
                    right:wp("9%") 
                }}
                value={cartItem && cartItem.length ?cartItem[0].location:""}
              ></TextInput>
              <TextInput
                style={{
                  textAlignVertical: "center",
                  // width: wp("30%"),
                  // borderColor: Colors.darkRedPink,
                  // borderRightWidth: 2,
                  color: Colors.black,
                  // right:wp("3%")
                }}
                value={props.selectedTransport.zx_transportername}
              ></TextInput>

              <TouchableOpacity
                onPress={toggleModal}
                // onPress={() => NavigationService.navigate("VariableDiscount")}
                // onPress={() => NavigationService.navigate("OrderLayout")}
              >
                <GenericIcon
                  name={"add-circle"}
                  style={{
                    marginRight: wp("2%"),
                    marginTop: hp("0.5%"),
                    fontSize: 25,
                    color: Colors.darkRedPink,
                  }}
                />
                {/* <Image
              style={{
                width: wp("5%"),
                height: hp("3%"),
                marginRight: wp("2%"),
                marginTop: hp("1%"),
              }}
              source={require("../../Assets/Images/right-movement.png")}
            /> */}
              </TouchableOpacity>
            </View>
          </View>
        

      <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <TouchableOpacity onPress={toggleModal}>
            <Text
              style={{
                fontSize: 20,
                marginLeft: hp("42%"),
                fontWeight: "bold",
              }}
            >
              X
            </Text>
          </TouchableOpacity>
          <TransportGoodData setModalVisible={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
    // </View>
  );
}

const mapStateToProps = (state) => {
  return {
    selectedTransport: state.orders.selectedTransport,
    cartItem: state.orders.cart.cartItem,
    data: state.orders.headerValue,
  };
};

const mapDispatchToProps = (dispatch) => ({
  selectTransport: (params) => dispatch(OrdersActions.selectTransport(params)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransportGoodDetail);

const Styles = StyleSheet.create({
  placeholder: {
    borderColor: "transparent",
    left: wp("0%"),
    fontFamily: "Segoe UI",
    // color:Colors.black,
    fontSize: 14,
    top: hp("3.5%"),
    fontWeight: "bold",
  },

  outerView: {
    flexDirection: "row",
    flexWrap: "wrap",
    left: "2%",
    right: "5%",
    top: "2%",
  },
  textView: {
    width: wp("38%"),
    borderBottomWidth: 1,
    borderColor: Colors.lightGrey,
    marginTop: hp("1.5%"),
    height: hp("10%"),
    margin: 15,
    // padding:10
  },

  textStyle: {
    fontFamily: "Segoe UI",
    color: Colors.lightGrey,
    top: hp("2.5%"),
    fontSize: 14,
    fontWeight: "bold",
  },
});
