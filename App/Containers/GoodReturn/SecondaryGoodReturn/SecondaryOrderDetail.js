import React, { Component, useState } from "react";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import ToggleSwitch from "rn-toggle-switch";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { ApplicationStyles, Helpers, Images, Metrics, Colors } from "App/Theme";
import InputText from "App/Components/FormInput/InputText";
import Modal from "react-native-modal";
import OrdersActions from "App/Stores/Orders/Actions";
import { connect } from "react-redux";
import SelectDate from "../../../Components/SelectDate/SelectDate";
import moment from "moment";
import IndicatorInputText from "../../../Components/FormInput/IndicatorInputText";
import ProductActions from "App/Stores/Products/Actions";
import { HelperService } from "../../../Services/Utils/HelperService";
import _ from "lodash";

class OrderDetailScreen extends Component {
  render() {
    const {
      secondaryGoodForm,
      validation,
      token,
      loading,
      cartItem,
      agentid,
    } = this.props;

    let result = _.map(cartItem, (object) => {
      return _.omit(object, [
        "zx_productcode",
        "zx_productname",
        "zx_recordid",
        "location",
      ]);
    });
    let form1 = {
      zx_returndate: HelperService.dateReadableFormatWithHyphen(),
      zx_returnfrom: secondaryGoodForm.zx_orderfrom,
      zx_remarks: secondaryGoodForm.zx_remarks,
      zx_returnordertype: "Secondary Order Return",
      zx_salesperson: agentid,
      zx_location: "2e20df61-211c-4e41-849b-72e061f64b92",
      zx_transporter: "896a0561-616b-4ce8-b5b3-59b5f697c62d",
      zx_goodsreturnlines: result,
      zx_returnto: secondaryGoodForm.zx_orderto,
    };

    return (
      <ScrollView style={{ marginTop: hp("1%") }}>
        <View
          style={{
            flexDirection: "column",
            borderColor: Colors.lightGrey,
            borderBottomWidth: 1,
            width: wp("90%"),
            margin: "4%",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>Remarks*</Text>
          <IndicatorInputText
            style={{ marginTop: "4%" }}
            placeholder={"Enter Remarks"}
            //  maxLength={0}
            value={secondaryGoodForm.zx_remarks}
            multiline={true}
            numberOfLines={1}
            onChange={(value) =>
              this.props.changeSecondaryGoodForm({
                edited_field: "zx_remarks",
                edited_value: value,
              })
            }
          />
        </View>

        <TouchableOpacity
          style={{
            width: wp("34.5%"),
            alignSelf: "center",
            marginTop: hp("8%"),
            height: hp("4.7%"),
          }}
          onPress={() => {
            secondaryGoodForm.zx_remarks
              ? this.props.createSecondaryGood({
                  form1: form1,
                  token,
                })
              : HelperService.showToast({ message: "PLease Fill Remarks" });
          }}
          // disabled={loading}
          // loading={loading}
        >
          <Text
            style={{
              backgroundColor: Colors.background,
              alignSelf: "center",
              width: wp("35%"),
              height: hp("4.7%"),
              borderRadius: 7,
              color: "white",
              fontSize: 17,
              fontWeight: "bold",
              textAlign: "center",
              padding: 5.5,
            }}
          >
            Place Order
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    agentid: state.user.id,
    secondaryGoodForm: state.orders.secondaryGoodForm,
    validation: state.orders.orderValidation,
    loading: state.orders.submitPrimaryOrderLoader,
    body: state.products.cart.body,
    cartItem: state.orders.cartReturn.cartItemReturn,
    variableDiscount: state.orders.variableDiscount,
    data: state.orders.headerValue,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changePrimaryOrderForm: (params) =>
    dispatch(OrdersActions.changePrimaryOrderForm(params)),
  createSecondaryGood: (params) =>
    dispatch(OrdersActions.createSecondaryGood(params)),
  clearSizeForm: (params) => dispatch(OrdersActions.clearSizeForm(params)),
  changeSecondaryGoodForm: (params) =>
    dispatch(OrdersActions.changeSecondaryGoodForm(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailScreen);
