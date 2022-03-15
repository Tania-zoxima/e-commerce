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
import Styles from "../GetPrimaryOrder/OrderDetailsStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import InputNumber from "App/Components/FormInput/InputNumber";
import { HelperService } from "App/Services/Utils/HelperService";
import OrdersActions from "App/Stores/Orders/Actions";

class OrderSecondaryInfoScreen extends Component {
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

    const { allOrders } = this.props;

    return (
      <ScrollView style={{ marginBottom: hp("2%") }}>
        <View style={{ ...Styles.outerView, left: "1%" }}>
          <View style={Styles.textView}>
            <Text style={Styles.textStyle}>Order No.</Text>
            <Text style={Styles.placeholder}>{"SOR-" + order.zx_recordid}</Text>
          </View>

          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Order From</Text>
            <Text style={Styles.placeholder}>{order.zx_orderfrom_name}</Text>
          </View>

          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Order To</Text>
            <Text style={Styles.placeholder}>{order.zx_orderto_name}</Text>
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

          <View style={{ ...Styles.textView }}>
            <Text style={Styles.textStyle}>Refrence No.</Text>
            <Text style={Styles.placeholder}>{order.zx_referenceno}</Text>
          </View>

          <View style={{ ...Styles.textView, left: wp("10%") }}>
            <Text style={Styles.textStyle}>Item Class</Text>
            <Text style={Styles.placeholder}>{order.zx_itemclasscode}</Text>
          </View>

          <View style={{ ...Styles.textView1 }}>
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
            <Text style={Styles.placeholder}>{order.zx_totalamountexctax}
            </Text>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderSecondaryInfoScreen);
