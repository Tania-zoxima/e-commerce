import React, { Component } from "react";
import InputText from "App/Components/FormInput/InputText";
import DistributorActions from "App/Stores/Distributor/Actions";
import { connect } from "react-redux";

import {
  View,
  Text,
  Image,
  Keyboard,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import Styles from "../../PlaceOrder/GetPrimaryOrder/OrderDetailsStyles";
import { Icon, Input, Button, ListItem, Radio, Left, Right } from "native-base";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import InputNumber from "App/Components/FormInput/InputNumber";
import { HelperService } from "App/Services/Utils/HelperService";
import OrdersActions from "App/Stores/Orders/Actions";

class OrderHeader extends Component {
  componentDidMount() {
    // console.log("jshfjsdhfjfkdjdfg",this.props.detail)
  }

  getDistributor() {
    const { list, orderForm } = this.props;
    let distributor = [];
    if (list && list.length) {
      list.map((obj) => {
        if (obj.zx_accounttype == "Primary Distributor") {
          distributor.push({
            id: obj.id,
            name: obj.name,
          });
        }
      });
    }
    return distributor;
  }

  render() {
    let order = this.props.detail;
    // console.log("poooopp",order)

    const { allOrders } = this.props;

    return (
      <ScrollView style={{ marginBottom: hp("2%") }}>
        <View style={{ ...Styles.outerView, left: "1%" }}>
          <View style={Styles.textView}>
            <Text style={Styles.textStyle}>Order No.</Text>
            <Text style={Styles.placeholder}>{"OR-" + order.zx_recordid}</Text>
          </View>

          <View style={{ ...Styles.textView, left: wp("10%") }}>
            <Text style={Styles.textStyle}>Nav Order No.</Text>
            <Text style={Styles.placeholder}>{order.zx_navorderno}</Text>
          </View>

          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Distributor</Text>
            <Text style={Styles.placeholder}>{order.zx_orderfrom_name}</Text>
          </View>
          <View style={Styles.textView}>
            <Text style={Styles.textStyle}>Order Type</Text>
            <Text style={Styles.placeholder}>{order.zx_ordertype2}</Text>
          </View>

          <View style={{ ...Styles.textView, left: wp("10%") }}>
            <Text style={Styles.textStyle}>Order Date</Text>
            <Text style={Styles.placeholder}>
              {HelperService.dateReadableFormat(order.zx_orderdate)}
            </Text>
          </View>

          <View style={Styles.textView}>
            <Text style={Styles.textStyle}>Order Source</Text>
            <Text style={Styles.placeholder}>{order.zx_ordersource}</Text>
          </View>
          <View style={{ ...Styles.textView, left: wp("10%") }}>
            <Text style={Styles.textStyle}>Order Status</Text>
            <Text style={Styles.placeholder}>{order.zx_orderstatus}</Text>
          </View>
          <View style={Styles.textView}>
            <Text style={Styles.textStyle}>Item Class</Text>
            <Text style={Styles.placeholder}>{order.zx_itemclasscode}</Text>
          </View>

          <View style={{ ...Styles.textView, left: wp("10%") }}>
            <Text style={Styles.textStyle}>Schedule Date of Delivery</Text>
            <Text style={Styles.placeholder}>
              {HelperService.dateReadableFormat(
                order.zx_scheduleddateofdelivery
              )}
            </Text>
          </View>
          <View style={Styles.textView}>
            <Text style={Styles.textStyle}>Document No.</Text>
            <Text style={Styles.placeholder}>{order.zx_documentno}</Text>
          </View>

          <View style={{ ...Styles.textView, left: wp("10%") }}>
            <Text style={Styles.textStyle}>Refrence No.</Text>
            <Text style={Styles.placeholder}>{order.zx_referenceno}</Text>
          </View>

          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Remarks</Text>
            <Text style={Styles.placeholder}>{order.zx_remarks}</Text>
          </View>

          <View style={Styles.textView}>
            <Text style={Styles.textStyle}>No. of Bags</Text>
            <Text style={Styles.placeholder}>{order.zx_noofbag}</Text>
          </View>

          <View style={{ ...Styles.textView, left: wp("10%") }}>
            <Text style={Styles.textStyle}>Total Qty</Text>
            <Text style={Styles.placeholder}>{order.zx_totalqty}</Text>
          </View>

          <View style={Styles.textView}>
            <Text style={Styles.textStyle}>Order Value (without Discount)</Text>
            <Text style={Styles.placeholder}>
              {order.zx_ordervaluewithoutdiscount}
            </Text>
          </View>

          <View style={{ ...Styles.textView, left: wp("10%") }}>
            <Text style={Styles.textStyle}>Total Discount</Text>
            <Text style={Styles.placeholder}>{order.zx_totaldiscount}</Text>
          </View>

          <View style={Styles.textView}>
            <Text style={Styles.textStyle}>Order Value (with Discount)</Text>
            <Text style={Styles.placeholder}>{order.zx_totalamountexctax}</Text>
          </View>
        </View>
      </ScrollView>
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

    // validation: state.retailers.retailerFormValidation,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeDistributorForm: (params) =>
    dispatch(DistributorActions.changeDistributorForm(params)),
  submitSelectedDistributorForm: (params) =>
    dispatch(DistributorActions.submitSelectedDistributorForm(params)),
  fetchAllOrders: (params) => dispatch(OrdersActions.fetchAllOrders(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderHeader);
