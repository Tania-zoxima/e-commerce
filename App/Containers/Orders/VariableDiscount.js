import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors, ApplicationStyles } from "App/Theme";
import VariableCard from "./VariableCard";
import RetailersActions from "App/Stores/Retailers/Actions";
import ProductActions from "App/Stores/Products/Actions";
import OrdersActions from "App/Stores/Orders/Actions";
import { connect } from "react-redux";
import { HelperService } from "App/Services/Utils/HelperService";
import NoDataFound from "App/Components/NoDataFound";

class VariableDiscount extends Component {
  getCard() {
    const { cartItem, variableDiscount, variableLoader } = this.props;
    let visibleNode = [];
    if (variableDiscount && variableDiscount.length) {
      visibleNode = (
        <FlatList
          style={{ top: "3%", marginBottom: hp("10%") }}
          data={variableDiscount}
          refreshing={variableLoader}
          // contentContainerStyle={{ paddingBottom: 90,paddingTop:10}}
          keyExtractor={(item, index) => item.productname + index.toString()}
          renderItem={({ item, index }) => (
            <VariableCard
              Number={String(index + 1)}
              productName={item.productcode}
              productCode={item.productname}
              discount={String(item.discount)}
            />
          )}
        />
      );
    } else {
      visibleNode = <NoDataFound text={"No Data Found"} />;
    }
    return visibleNode;
  }
  render() {
    return (
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
            S. No.
          </Text>
          <Text
            style={{
              textAlignVertical: "center",
              right: wp("2.5%"),
              width: wp("25%"),
              borderColor: Colors.white,
              borderRightWidth: 2,
              color: Colors.white,
            }}
          >
            Product Code
          </Text>
          <Text
            style={{
              textAlignVertical: "center",
              right: wp("1%"),
              width: wp("30%"),
              borderColor: Colors.white,
              borderRightWidth: 2,
              color: Colors.white,
            }}
          >
            Product Name
          </Text>
          <Text style={{ textAlignVertical: "center", color: Colors.white }}>
            Discount
          </Text>
        </View>
        {this.getCard()}
        {/* {this.getCard1()} */}
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    agentid: state.user.id,
    products: state.products.ProductList && state.products.ProductList,
    brands: state.products.BrandList && state.products.BrandList,
    productClass: state.products.ItemList && state.products.ItemList,
    selectedBrand: state.products.selectProduct.selectedBrand,
    selectedClass: state.products.selectProduct.selectedClass,
    cartItem: state.products.cart.cartItem,
    showmodal: state.orders.showModal,
    searchFilters: state.orders.searchFilters,
    loading: state.competitor.getAllProductsLoader,
    list: state.retailers.retailersList.list,
    primaryOrderForm: state.orders.primaryOrderForm,
    variableDiscount: state.orders.variableDiscount,

    orderForm: state.orders.placeOrderForm,
    location: state.orders.orderLocation,
    loader: state.orders.orderLocationLoader,
    variableLoader: state.orders.getVariableDiscountLoader,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getAllProducts: (params) => dispatch(ProductActions.getAllProducts(params)),
  getAllProductsBrands: (params) =>
    dispatch(ProductActions.getAllProductsBrands(params)),
  getAllProductsClass: (params) =>
    dispatch(ProductActions.getAllProductsClass(params)),
  changeProductBrand: (params) =>
    dispatch(ProductActions.changeProductBrand(params)),
  changeProductClass: (params) =>
    dispatch(ProductActions.changeProductClass(params)),
  addOrderToCart: (params) => dispatch(ProductActions.addOrderToCart(params)),
  showModal: () => dispatch(OrdersActions.showModal()),
  closeModal: () => dispatch(OrdersActions.closeModal()),
  changeBrandSearchFilters: (params) =>
    dispatch(OrdersActions.changeBrandSearchFilters(params)),
  changePrimaryOrderForm: (params) =>
    dispatch(OrdersActions.changePrimaryOrderForm(params)),
  getVariableDiscount: (params) =>
    dispatch(OrdersActions.getVariableDiscount(params)),
  fetchRetailers: (params) => dispatch(RetailersActions.fetchRetailers(params)),
  fetchRetailers: (params) => dispatch(RetailersActions.fetchRetailers(params)),
  changeOrderForm: (params) => dispatch(OrdersActions.changeOrderForm(params)),
  clearPlaceOrderForm: (params) =>
    dispatch(OrdersActions.clearPlaceOrderForm(params)),
  getOrderLocation: (params) =>
    dispatch(OrdersActions.getOrderLocation(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(VariableDiscount);

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
