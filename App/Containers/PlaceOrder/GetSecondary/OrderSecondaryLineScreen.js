import React, { Component } from "react";
import {
  Platform,
  View,
  ActivityIndicator,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { connect } from "react-redux";
import DistributorActions from "App/Stores/Distributor/Actions";
import LinesOrderCard from "../GetPrimaryOrder/LinesOrderCard";
import OrdersActions from "App/Stores/Orders/Actions";
import Loading from "App/Components/Loading";
class OrderSecondaryLineScreen extends Component {
  componentDidMount() {
    const { token } = this.props;
    let order = this.props.detail;
    this.props.getOrderLine({
      token,
      order_id:order.Id
    })
  }

  getLocation() {
    const { location } = this.props;
    let loc = [];
    if (location && location.length) {
      location.map((obj) => {
        if ({ id: obj.name, name: obj.name }) {
          loc.push({
            id: obj.name,
            name: obj.name,
          });
        }
      });
    }
    return loc;
  }

  render() {
    const {data } = this.props;

    return (
      <View>
        <FlatList
          style={{ height: hp("77%") }}
          contentContainerStyle={{ paddingBottom: hp("5%"), paddingTop: 10 }}
          data={data}
          keyExtractor={(item) => item.Id}
          //    initialNumToRender={7}
          renderItem={({ item }) => (
            <View>
              <LinesOrderCard
                order_no={item.zx_recordid}
                primary={false}
                bags={item.zx_noofbagspcs}
                discount={item.zx_totaldiscount}
                value={item.zx_totalamount}
                value1={item.zx_totalamountwithoutdiscount}
                amount={item.zx_qty}
                focus={item.zx_focused == "Yes" ? true : false}
                maketoorder={item.zx_maketoorder}
                name={item.zx_productname}
                location={item.name}
                data={item.zx_unitprice}
                amount1={item.zx_unitofmeasurecode}
                price={item.zx_upp}
                p_id={item.zx_itemcode}
              />
            </View>
          )}
        />
        {this.props.loader == true ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: 210,
              height: hp("5%"),
              width: "100%",
            }}
          >
            <Loading />
          </View>
        ) : null}
      </View>
      // <LinesOrderCard
      // />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    agentid: state.user.id,
    distributorForm: state.distributor.distributorForm,
    validation: state.distributor.distributorFormValidation,
    submitValidation: state.distributor.submitDistributorFormValidation,
    primaryOrderForm: state.orders.primaryOrderForm,
    allOrders: state.orders.allOrders,
    list: state.retailers.retailersList.list,
    location: state.orders.orderLocation,
    data:state.orders.orderLine,
    loader:state.orders.orderLineLoader
    // validation: state.retailers.retailerFormValidation,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeDistributorForm: (params) =>
    dispatch(DistributorActions.changeDistributorForm(params)),
  submitSelectedDistributorForm: (params) =>
    dispatch(DistributorActions.submitSelectedDistributorForm(params)),
  fetchAllOrders: (params) => dispatch(OrdersActions.fetchAllOrders(params)),
  getOrderLine: (params) => dispatch(OrdersActions.getOrderLine(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderSecondaryLineScreen);
