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
import OrderCard from "../Visits/VisitBookOrder/OrderCard";
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

class ItemDetail extends Component {
  componentDidMount() {
    NavigationService.navigate("ItemDetail");
  }
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

  getTotalDiscount(items) {
    let value = 0;
    items.map((obj) => {
      // console.log("hhhhhhhhhhhh",obj)
      value +=
        Number(this.getDiscount(obj.discount) / 100) * Number(obj.total_price);
    });
    return value;
  }

  // getTotalDiscount(items) {
  //   console.log("dddwwwwwwwwww",items)
  //   let value = 0;
  //   let value1 = 0;
  //   let arr=[]

  //   items.map((obj) => {
  //     arr.push(Number(this.getDiscount(obj.discount)))
  //     value += Number(this.getDiscount(obj.discount));
  //     value1 = arr.reduce((a, b)=> a*b, 1)

  //   });
  //   console.log("ddddddddddertttttt",arr)
  //   return value-(value1/100);
  // }

  onChangeQuantity(params) {
    // console.log("paramssqty",params)
    const { addOrderToCart, deleteOrderToCart } = this.props;

    if (params.quantity == 0) {
      deleteOrderToCart({ id: params });
    } else {
      addOrderToCart(params);
    }
  }

  // changeCartQuantity(item){
  //   const { cartItem,addOrderToCart } = this.props;
  //   cartItem.map((obj)=>{
  //     if(obj.name==item.name ){
  //      obj.quantity=item.quantity
  //     }
  //     console.log("oobjjj",obj)
  //     return obj

  //   })
  //   this.props.addOrderToCart(item)

  // }

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
    const { cartItem } = this.props;
    // console.log("iteemssss", cartItem);
    return (
      <FlatList
        style={{ top: "3%", marginBottom: hp("10%") }}
        data={cartItem}
        // contentContainerStyle={{ paddingBottom: 90,paddingTop:10}}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OrderCard
            onRemoveClick={() =>
              this.onRemoveClick({
                name: item.name,
                product_id: item.product_id,
              })
            }
            p_id={item.code}
            name={item.name}
            price={this.getDiscount(item.discount)}
            amount1={item.upp}
            data={item.location}
            unit_price={item.zx_unitprice}
            data_qty={item.quantity}
            amount={item.total_qty}
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
              })
            }
          />
        )}
      />
    );
  }

  onRemoveClick(params) {
    // console.log("kkkkparamsss",params)
    const { deleteOrderToCart } = this.props;

    Alert.alert(
      "Delete order",
      "Do you want to delete this order?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Confirm", onPress: () => deleteOrderToCart({ id: params }) },
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
    this.props.data.totalDiscount = this.getTotalDiscount(cartItem);
    this.props.data.totalqty = this.getTotalQuantity(cartItem);
    this.props.data.ordervalue = this.getOrderValue(cartItem);
    this.props.data.ordervaluexd =
      this.getOrderValue(cartItem) - this.getTotalDiscount(cartItem);
    this.props.data.bags = this.getBags(cartItem);
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
          <View style={{width:wp("70%")}}>
            <View style={Styles.textView}>
              <Text style={Styles.textStyle}>Order Value</Text>
              <Text style={Styles.placeholder}>
                {HelperService.FixedDecimalValue(this.getOrderValue(cartItem))}
              </Text>
            </View>
          </View>
          <View style={Styles.textView1}>
            <Text style={Styles.textStyle1}>Total Discount{"\n"}Value</Text>
            <Text style={Styles.placeholder1}>
              {this.getTotalDiscount(cartItem)}
            </Text>
          </View>

          <View style={Styles.textView1}>
            <Text style={Styles.textStyle1}>
              Order Value{"\n"}(with Discount)
            </Text>
            <Text style={Styles.placeholder1}>
              {HelperService.FixedDecimalValue(this.getOrderValue(cartItem) - this.getTotalDiscount(cartItem))}
            </Text>
          </View>
        </View>

        {this.getCard()}
        {/* {this.getDataNode1()} */}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  cartItem: state.products.cart.cartItem,
  variableDiscount: state.orders.variableDiscount,
  data: state.orders.headerValue,
});

const mapDispatchToProps = (dispatch) => ({
  deleteOrderToCart: (params) =>
    dispatch(ProductActions.deleteOrderToCart(params)),
  clearVariableDiscount: (params) =>
    dispatch(OrdersActions.clearVariableDiscount(params)),
  addOrderToCart: (params) => dispatch(ProductActions.addOrderToCart(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);
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
  textView2: {
    width: wp("50%"),
    borderBottomWidth: 1,
    borderColor: Colors.lightGrey,
    marginTop: hp("1.5%"),
    height: hp("12%"),
    margin: 15,
    // padding:10
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
    height: hp("12%"),
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
