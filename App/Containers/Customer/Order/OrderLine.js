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
import GenericIcon from "App/Components/GenericIcon";

import { ScrollableTab, TabHeading, Tab, Tabs } from "native-base";
import { ApplicationStyles, Helpers, Images, Metrics, Colors } from "App/Theme";

import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Body,
  Text,
  Input,
  Item,
  Right,
  Segment,
} from "native-base";
import NavigationService from "App/Services/NavigationService";
import SearchBar from "App/Components/SearchBar";
// import Card from '../../Components/Card/Card'
import WhiteButton from "App/Components/WhiteButton";
import { HelperService } from "App/Services/Utils/HelperService";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Card } from "react-native-paper";
import BackArrowButton from "App/Components/BackArrowButton";

import { connect } from "react-redux";
import DistributorActions from "App/Stores/Distributor/Actions";

import OrderLineCard from "./OrderLineCard";
// import Pending from "./Pending";
// import Approved from "./Approved";
// import Rejected from "./Rejected"
import OrdersActions from "App/Stores/Orders/Actions";
import Loading from "App/Components/Loading";
class OrderLine extends Component {
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
    // let order = this.props.detail;
    // console.log("pooooppsssssssss", order);

    // let data = [];

    // data.push(order);
    // console.log("tareeee", data);

    // let brandsNode = [];
    const {data } = this.props;
    // if (data.length) {
    //   data.map((obj) => {
    //     if (obj.orderlines && obj.orderlines.length) {
    //       obj.orderlines.map((obj1) => {
    //         brandsNode.push(obj1);
    //       });
    //     }
    //   });
    // }

    return (
      <View>
        <FlatList
          style={{ height: hp("83%") }}
          contentContainerStyle={{ paddingBottom: hp("5%"), paddingTop: 10 }}
          data={data}
          keyExtractor={(item) => item.Id}
          //    initialNumToRender={7}
          renderItem={({ item }) => (
            <View>
              <OrderLineCard
                order_no={item.zx_salesorderlineno}
                primary={true}
                bags={item.zx_noofbagspcs}
                discount={item.zx_totaldiscount}
                value={item.zx_totalamount}
                value1={item.zx_totalamountwithoutdiscount}
                amount={item.zx_qty}
                focus={item.zx_focused == "Yes" ? true : false}
                maketoorder={item.zx_maketoorder}
                name={item.zx_productname}
                location={item.locationName}
                data={item.zx_unitprice}
                amount1={item.zx_unitofmeasurecode}
                price={item.zx_upp}
                p_id={item.zx_itemcode}
                pending={item.zx_pendingqty}
                shipping={item.zx_shippedqty}
                nav={item.zx_navreference}
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderLine);
