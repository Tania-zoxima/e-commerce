import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  CheckBox,
  ImageBackground,
  TextInput,
  Alert,
  FlatList,
  StyleSheet,
} from "react-native";
import BackArrow from "App/Components/BackArrowButton/BackArrowButton";
import { ScrollView } from "react-native";
import { Badge } from "native-base";
import NoDataFound from "App/Components/NoDataFound";
import { connect } from "react-redux";
import { HelperService } from "App/Services/Utils/HelperService";

import { Colors, ApplicationStyles } from "App/Theme";

import { Picker } from "native-base";
import GenericIcon from "App/Components/GenericIcon";
import NavigationService from "App/Services/NavigationService";
import PrimaryItemCard from "./PrimaryItemCard";
import BlueButton from "App/Components/BlueButton";

import TextArea from "App/Components/FormInput/TextArea";
import ProductActions from "App/Stores/Products/Actions";

import WhiteButton from "App/Components/WhiteButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import InputText from "App/Components/FormInput/InputText";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import OrdersActions from "App/Stores/Orders/Actions";

class GoodItemDetail extends Component {
  onChangeQuantity(params) {
    // console.log("paramssqty",params)
    const { addPrimaryGoodToCart, deletePrimaryGoodToCart } = this.props;

    addPrimaryGoodToCart(params);
  }

  getCard() {
    const { cartItem } = this.props;
    // console.log("iteemssss", cartItem);
    return (
      <FlatList
        style={{ top: "3%", marginBottom: hp("10%") }}
        data={cartItem}
        // contentContainerStyle={{ paddingBottom: 90,paddingTop:10}}
        keyExtractor={(item) => item.zx_recordid}
        renderItem={({ item }) => (
          <PrimaryItemCard
            onRemoveClick={() =>
              this.onRemoveClick({
                name: item.zx_productname,
                product_id: item.zx_productcode,
              })
            }
            p_id={item.zx_productcode}
            name={item.zx_productname}
            data={item.location}
            data_qty={item.zx_returnquantity}
            amount={item.zx_returnquantity}
            onChangeQuantity={(quantity) =>
              this.onChangeQuantity({
                quantity: quantity,
                name: item.zx_productname,
                id: item.zx_productcode,
              })
            }
          />
        )}
      />
    );
  }

  onRemoveClick(params) {
    // console.log("kkkkparamsss",params)
    const { deletePrimaryGoodToCart } = this.props;

    Alert.alert(
      "Delete order",
      "Do you want to delete this order?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => deletePrimaryGoodToCart({ id: params }),
        },
      ],
      { cancelable: false }
    );
  }

  render() {
    const {
      cartItem,
      cart,
      data,
      placeOrderLoader,
      editCartOrder,
    } = this.props;
    return <ScrollView>{this.getCard()}</ScrollView>;
  }
}

const mapStateToProps = (state) => ({
  cartItem: state.orders.cart.cartItem,
});

const mapDispatchToProps = (dispatch) => ({
  deletePrimaryGoodToCart: (params) =>
    dispatch(OrdersActions.deletePrimaryGoodToCart(params)),
  clearVariableDiscount: (params) =>
    dispatch(OrdersActions.clearVariableDiscount(params)),
  addPrimaryGoodToCart: (params) =>
    dispatch(OrdersActions.addPrimaryGoodToCart(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoodItemDetail);
const Styles = StyleSheet.create({
  placeholder: {
    borderColor: "transparent",
    left: wp("0%"),
    fontFamily: "Segoe UI",
    // color:Colors.black,
    fontSize: 14,
    top: hp("5.5%"),
    fontWeight: "bold",
  },
  placeholder1: {
    borderColor: "transparent",
    left: wp("0%"),
    fontFamily: "Segoe UI",
    // color:Colors.black,
    fontSize: 14,
    top: hp("3%"),
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
    height: hp("12%"),
    margin: 15,
    // padding:10
  },
  textView1: {
    width: wp("38%"),
    borderBottomWidth: 1,
    borderColor: Colors.lightGrey,
    // marginTop: hp("1%"),
    height: hp("11.5%"),
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
  textStyle1: {
    fontFamily: "Segoe UI",
    color: Colors.lightGrey,
    // top: hp("2.5%"),
    fontSize: 14,
    fontWeight: "bold",
  },
});
