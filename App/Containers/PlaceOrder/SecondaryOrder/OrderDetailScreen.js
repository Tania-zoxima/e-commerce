import React, { Component } from "react";
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
import {
  Icon,
  Input,
  Button,
  ListItem,
  Radio,
  Left,
  Right,
  CheckBox,
  Label,
} from "native-base";
import IndicatorInputText from "../../../Components/FormInput/IndicatorInputText";
import ProductActions from "App/Stores/Products/Actions";
import { HelperService } from "../../../Services/Utils/HelperService";
class OrderDetailScreen extends Component {
  render() {
    const {
      secondaryOrderForm,
      validation,
      token,
      loading,
      cartItem,
      agentid,
    } = this.props;

    let form1 = {
      zx_orderto: secondaryOrderForm.zx_orderto,
      zx_orderfrom: secondaryOrderForm.zx_orderfrom,
      zx_ordertype1: "Secondary Order",
      zx_ordertype2: secondaryOrderForm.zx_ordertype2,
      zx_totaldiscount: this.props.data.totalDiscount,
      zx_ordersource: "SFA",
      zx_ordercreatedby: agentid,
      zx_referenceno: secondaryOrderForm.zx_referenceno
        ? secondaryOrderForm.zx_referenceno
        : null,
      zx_remarks: secondaryOrderForm.zx_remarks,
      zx_itemclass: cartItem[0] && cartItem[0].zx_itemclass,
      zx_totalamountexctax: this.props.data.ordervaluexd,
      zx_ordervaluewithoutdiscount: this.props.data.ordervalue,
      zx_totalqty: this.props.data.totalqty,
      zx_noofbag: this.props.data.bags,
      zx_team: agentid,
      zx_secondarytransportdetails:
        secondaryOrderForm.zx_secondarytransportdetails,
    };

    return (
      <ScrollView style={{ marginTop: hp("1%") }}>
        <View style={{ ...Styles.radoiBtnOuter, margin: "4%" }}>
          <View
            style={{
              flexDirection: "row",
              width: wp("40%"),
              marginTop: hp("5%"),
            }}
          >
            <Text style={Styles.radioText}>Distributor's own vehicle</Text>
            <Radio
              style={Styles.radioBtn}
              onPress={() => {
                this.props.changeSecondaryOrderForm({
                  edited_field: "zx_secondarytransportdetails",
                  edited_value: "Distributor's own vehicle",
                });
              }}
              selected={false}
              selected={
                secondaryOrderForm.zx_secondarytransportdetails ==
                "Distributor's own vehicle"
              }
              // error={
              //   validation.invalid &&
              //   validation.invalid_field == "zx_secondarytransportdetails"
              // }
              selectedColor={Colors.button}
              color={Colors.button}
            />
          </View>
          <View style={{ ...Styles.radioBtnInner, left: wp("10%") }}>
            <Text style={{ ...Styles.radioText, top: hp("0.2%") }}>
              Party's own vehicle
            </Text>
            <Radio
              style={Styles.radioBtn}
              onPress={() => {
                this.props.changeSecondaryOrderForm({
                  edited_field: "zx_secondarytransportdetails",
                  edited_value: "Party's own vehicle",
                });
              }}
              selected={false}
              selected={
                secondaryOrderForm.zx_secondarytransportdetails ==
                "Party's own vehicle"
              }
              // error={
              //   validation.invalid &&
              //   validation.invalid_field == "zx_secondarytransportdetails"
              // }
              selectedColor={Colors.button}
              color={Colors.button}
            />
          </View>
        </View>
        {/* <View
          style={{
            flexDirection: "column",
            borderColor: Colors.lightGrey,
            borderBottomWidth: 1,
            width: wp("90%"),
            margin: "4%",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>
            Refrence Number
          </Text>
          <TextInput
            style={{ height: 40 }}
            placeholder="Enter Refrence no."
            value={secondaryOrderForm.zx_referenceno}
            // editable={distributorForm.zx_overallstatus=="Pending for approval" || distributorForm.zx_overallstatus=="Approved" || distributorForm.zx_overallstatus=="Rejected" ? false:true}
            onChangeText={(value) =>
              this.props.changeSecondaryOrderForm({
                edited_field: "zx_referenceno",
                edited_value: value,
              })
            }
          />
        </View> */}

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
            value={secondaryOrderForm.zx_remarks}
            multiline={true}
            numberOfLines={1}
            onChange={(value) =>
              this.props.changeSecondaryOrderForm({
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
            marginTop: hp("7%"),
            height: hp("4.7%"),
          }}
          onPress={() => {
            secondaryOrderForm.zx_secondarytransportdetails
              ? this.props.submitSecondaryOrderForm({
                  form1: form1,

                  itemarry: this.props.body,
                  // form1:form1,
                  token,
                })
              : HelperService.showToast({
                  message: "Please Select Transport",
                });
          }}
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
    secondaryOrderForm: state.orders.secondaryOrderForm,
    validation: state.orders.secondaryOrderValidation,
    loading: state.orders.submitSecondaryOrderLoader,
    body: state.products.cartSecondary.body,
    cartItem: state.products.cartSecondary.cartItem,
    data: state.orders.headerSecondaryValue,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeSecondaryOrderForm: (params) =>
    dispatch(OrdersActions.changeSecondaryOrderForm(params)),
  submitSecondaryOrderForm: (params) =>
    dispatch(OrdersActions.submitSecondaryOrderForm(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailScreen);
const Styles = StyleSheet.create({
  radoiBtnOuter: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  radioBtnInner: {
    flexDirection: "row",
    width: wp("40%"),
    marginTop: hp("5%"),
  },
  radioText: {
    fontFamily: "Segoe UI",
    fontSize: 13,
    color: Colors.black,
    fontWeight: "bold",
  },
  radioBtn: {
    borderColor: "black",
    marginLeft: "9%",
  },
});
