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

import { Picker, Input } from "native-base";
import GenericIcon from "App/Components/GenericIcon";
import NavigationService from "App/Services/NavigationService";
import ItemCard from "./ItemCard";
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

class ItemDetailScreen extends Component {
  getTotalQuantity(items) {
    let quantity = 0;
    items.map((obj) => {
      quantity += Number(obj.total_qty);
    });
    return quantity;
  }

  getOrderValue(items) {
    let value = 0;
    items.map((obj) => {
      value += Number(obj.total_price);
    });
    return value;
  }

  getBags(items) {
    let value = 0;
    items.map((obj) => {
      value += Number(obj.quantity);
    });
    return value;
  }

  getTax(items) {
    let value = 0;
    items.map((obj) => {
      value += Number(obj.zx_totaltax);
    });
    return value;
  }

  getTotalDiscount(items) {
    let value = 0;
    items.map((obj) => {
      // console.log("hhhhhhhhhhhh",obj)
      value += Number(obj.discount / 100) * Number(obj.total_price);
    });
    return value;
  }

  onChangeQuantity(params) {
    // console.log("paramssqty",params)
    const { addSecondaryOrderToCart, deleteSecondaryOrderToCart } = this.props;

    if (params.quantity == 0) {
      deleteSecondaryOrderToCart({ id: params });
    } else {
      addSecondaryOrderToCart(params);
    }
  }

  onChangeDiscount(params) {
    console.log("paramssqty", params);
    const {
      addSecondaryOrderToCart,
      deleteSecondaryOrderToCart,
      changeOrderDiscount,
    } = this.props;

    if (params.discount !== 0) {
      changeOrderDiscount(params);
    } else {
      changeOrderDiscount({ discount: "", show: "empty", name: params.name });
    }
  }

  getDiscount(item) {
    const { cartItem, variableDiscount } = this.props;
    let discount = "";
    if (variableDiscount && variableDiscount.length) {
      variableDiscount.map((obj) => {
        if (obj.productname == item) {
          discount = obj.discount;
        }
      });
    }
    return discount;
  }

  getCard() {
    const { cartItem, variable } = this.props;
    // console.log("iteemssss", cartItem);
    return (
      <FlatList
        style={{ top: "3%", marginBottom: hp("10%") }}
        data={cartItem}
        // contentContainerStyle={{ paddingBottom: 90,paddingTop:10}}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItemCard
            onRemoveClick={() =>
              this.onRemoveClick({
                name: item.name,
                product_id: item.product_id,
              })
            }
            p_id={item.code}
            discount={item.discount}
            name={item.name}
            price={this.getDiscount(item.discount)}
            amount1={item.upp}
            tax={item.zx_totaltax}
            data={item.location}
            unit_price={item.zx_unitprice}
            data_qty={item.quantity}
            amount={item.total_qty}
            uom={item.uom}
            value={item.total_price}
            onChangeQuantity={(quantity) =>
              this.onChangeQuantity({
                quantity: quantity,
                name: item.name,
                id: item.product_id,
                upp: item.upp,
                unitprice: item.zx_unitprice,
                totalqty: item.total_qty,
                totalprice: item.total_price,
                discount: this.getDiscount(item.discount),
                zx_cgst: item.zx_cgst,
                zx_igst: item.zx_igst,
                zx_sgst: item.zx_sgst,
                old_cgst: item.old_cgst,
                old_igst: item.old_igst,
                old_sgst: item.old_sgst,
              })
            }
            onChangeDiscount={(discount) =>
              this.onChangeDiscount({
                quantity: item.quantity,
                name: item.name,
                id: item.product_id,
                upp: item.upp,
                unitprice: item.zx_unitprice,
                totalqty: item.total_qty,
                totalprice: item.total_price,
                discount: discount,
                show: false,
              })
            }
          />
        )}
      />
    );
  }

  onRemoveClick(params) {
    // console.log("kkkkparamsss",params)
    const { deleteSecondaryOrderToCart } = this.props;

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
          onPress: () => deleteSecondaryOrderToCart({ id: params }),
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
      variable,
    } = this.props;
    this.props.data.totalDiscount = this.getTotalDiscount(cartItem);
    this.props.data.totalqty = this.getTotalQuantity(cartItem);
    this.props.data.ordervalue = this.getOrderValue(cartItem);
    this.props.data.ordervaluexd =
      this.getOrderValue(cartItem) - this.getTotalDiscount(cartItem);
    this.props.data.bags = this.getBags(cartItem);
    // console.log("cartitemmmm", cartItem);
    return (
      <ScrollView>
        {/* <View style={{ width: "100%", height: 30 }}>
          <TouchableOpacity>
            <BackArrow
              style={{
                marginLeft: 20,
                marginTop: 20,
                fontSize: 30,
                color: Colors.darkRedPink,
              }}
            />
          </TouchableOpacity>
        </View> */}
        <View style={Styles.outerView}>
          <View style={Styles.textView}>
            <Text style={Styles.textStyle}>Total Bags</Text>
            <Text style={Styles.placeholder}>{this.getBags(cartItem)}</Text>
          </View>
          <View style={Styles.textView}>
            <Text style={Styles.textStyle}>Total Qty</Text>
            <Text style={Styles.placeholder}>
              {this.getTotalQuantity(cartItem)}
            </Text>
          </View>

          <View style={Styles.textView}>
            <Text style={Styles.textStyle}>Order Value</Text>
            <Text style={Styles.placeholder}>
              {HelperService.FixedDecimalValue(this.getOrderValue(cartItem))}
            </Text>
          </View>

          {/* <View style={Styles.textView1}>
            <Text style={Styles.textStyle1}>
              Total Discount{"\n"}Value
            </Text>
            <Text style={Styles.placeholder1}>
              {this.getTotalDiscount(cartItem)}
            </Text>
          </View> */}

          {/* <View style={Styles.textView1}>
            <Text style={Styles.textStyle1}>
              Order Value{"\n"}(with Discount)
            </Text>
            <Text style={Styles.placeholder1}>
              {this.getOrderValue(cartItem) - this.getTotalDiscount(cartItem)}
            </Text>
          </View> */}
          <View style={Styles.textView}>
            <Text style={Styles.textStyle}>Total Tax</Text>
            <Text style={Styles.placeholder}>{HelperService.FixedDecimalValue(this.getTax(cartItem))}</Text>
          </View>
          <View style={Styles.textView1}>
            <Text style={Styles.textStyle1}>Order Value{"\n"}(inc. tax)</Text>
            <Text style={Styles.placeholder1}>
              {HelperService.FixedDecimalValue(
                this.getOrderValue(cartItem) -
                  this.getTotalDiscount(cartItem) +
                  this.getTax(cartItem)
              )}
            </Text>
          </View>
        </View>
        {/* <View style={{ flexDirection: "row", left: hp("6%"), top: hp("2.5%") }}>
          <Text
            style={{
              textAlignVertical: "center",
              top: hp("0.5%"),
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Variable Discount
          </Text>
          <View style={{ width: "100%", flex: 1, right: wp("20%") }}>
            <Input
              // value={variable && variable.discount}
              style={{
                color: Colors.clr66,
                fontFamily: ApplicationStyles.textMediumFont,
                fontSize: wp("3.4%"),
                paddingLeft: 0,
                paddingRight: 0,
                paddingTop: 0,
                paddingBottom: 0,
                height: hp("4%"),
                borderBottomWidth: 2.5,
                borderColor: Colors.darkRedPink,
                borderRadius: 3,
                alignSelf: "center",
                textAlign: "center",
                width: wp("15%"),
              }}
              onChangeText={(value) => {
                this.props.changeOrderDiscount({ discount: value, show: true }),
                  this.props.changeVariable({
                    edited_field: "discount",
                    edited_value: value,
                  });
              }}
              keyboardType={"phone-pad"}
            />
          </View>
        </View> */}
        {this.getCard()}
        {/* {this.getDataNode1()} */}
      </ScrollView>
    );
  }
}
const mapStateToProps = (state) => ({
  cartItem: state.products.cartSecondary.cartItem,
  data: state.orders.headerSecondaryValue,
  variable: state.products.variable,
});

const mapDispatchToProps = (dispatch) => ({
  deleteSecondaryOrderToCart: (params) =>
    dispatch(ProductActions.deleteSecondaryOrderToCart(params)),
  addSecondaryOrderToCart: (params) =>
    dispatch(ProductActions.addSecondaryOrderToCart(params)),
  changeOrderDiscount: (params) =>
    dispatch(ProductActions.changeOrderDiscount(params)),
  changeVariable: (params) => dispatch(ProductActions.changeVariable(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetailScreen);
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
