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
import SelectDate from "../../Components/SelectDate/SelectDate";
import moment from "moment";
import IndicatorInputText from "../../Components/FormInput/IndicatorInputText";
import ProductActions from "App/Stores/Products/Actions";
import SearchableDropdown from "App/Components/SearchableDropdown";
import _ from "lodash";
import ProjectActions from "App/Stores/Project/Actions";
import { HelperService } from "../../Services/Utils/HelperService";
class OrderDetailScreen extends Component {
  componentDidMount() {
    this.fetchCall();
  }
  fetchCall() {
    const { token, project, agentid, searchFilters } = this.props;
    let params = {
      token,
      form: {
        team: agentid,
        projecttype: [],
        projectPipelinestage: [],
        fromDate: null,
        toDate: null,
      },
    };
    this.props.getProject(params);
  }
  CalculateWeekendDays(fromDate) {
    var weekendDayCount = 0;
    var minDate = new Date();
    var toDate = new Date(minDate.setDate(minDate.getDate() + 3));
    while (fromDate < toDate) {
      fromDate.setDate(fromDate.getDate() + 1);
      if (fromDate.getDay() === 0 || fromDate.getDay() == 6) {
        ++weekendDayCount;
      }
    }
    console.log("hhhhhhhh", weekendDayCount);
    return weekendDayCount;
  }

  validateDate(value) {
    var result = new Date(value);
    let error = "";
    if (result) {
      if (result.getDay() == 0 || result.getDay() == 6) {
        error = "*Please Select Week day only";
      }
    } else {
      error = "*Schedule Date of Delivery cannot be on Saturday or Sunday";
    }
    return error;
  }

  getName() {
    const { project } = this.props;
    let Name = [];
    if (project && project.length) {
      project.map((obj) => {
        if ({ id: obj.Id, name: obj.zx_nameofproject }) {
          Name.push({
            id: obj.Id,
            name: obj.zx_nameofproject,
          });
        }
      });
    }
    return Name;
  }

  render() {
    const {
      primaryOrderForm,
      validation,
      token,
      loading,
      cartItem,
      agentid,
    } = this.props;

    // let forms = [
    //   {
    //     zx_salesorderlineno: "abhi",
    //     zx_salesorder: "3b35a598-bc0e-4205-8d08-0ed259d13dab",
    //     zx_itemcode: cartItem.zx_itemclasscode,
    //     zx_product: cartItem.details && cartItem.details.zx_product?cartItem.details.zx_product:"",
    //     zx_hsn: cartItem.details.zx_hsncode,
    //     zx_brand: cartItem.details.zx_brand,
    //     zx_itemclass: cartItem.details.zx_itemclass,
    //     zx_targetgroup: cartItem.details.zx_targetgroup,
    //     zx_itemcategory: cartItem.details.zx_itemcategory,
    //     zx_itemsubcategory: cartItem.details.zx_itemsubcategory,
    //     zx_maketoorder: cartItem.details.zx_maketoorder==true?"Yes":"No",
    //     zx_focused: cartItem.details.zx_focusedproduct,
    //     zx_upp: cartItem.details.zx_unitperparcel,
    //     zx_unitprice: "12.49",
    //     zx_ordereduom: "e27ea442-b410-46b3-9728-f7431946d381",
    //     zx_noofbagspcs: "12",
    //     zx_qty: "2",
    //     zx_location: "22791f23-5fcb-4d2c-9d58-59c0a6d756d4",
    //     zx_totaldiscount: "123.56",
    //     zx_totalamount: "123443.76",
    //     zx_sgst: "12.3",
    //     zx_igst: "12.4",
    //     zx_cgst: "12.5",
    //     zx_totaltax: "213.65",
    //   },
    // ];

    let form1 = {
      zx_orderfrom: primaryOrderForm.zx_orderfrom,
      zx_ordertype1: "Primary Order",
      zx_ordertype2: primaryOrderForm.zx_ordertype2,
      zx_scheduleddateofdelivery: primaryOrderForm.zx_scheduleddateofdelivery,
      zx_totaldiscount: this.props.data.totalDiscount,
      zx_totaltax: "0.0",
      zx_totalamountinctax: this.props.data.ordervaluexd,
      zx_ordersource: "SFA",
      zx_ordercreatedby: agentid,
      zx_documentno: primaryOrderForm.zx_documentno,
      zx_referenceno: primaryOrderForm.zx_referenceno,
      zx_remarks: primaryOrderForm.zx_remarks,
      zx_itemclass: cartItem[0] && cartItem[0].zx_itemclass,
      zx_totalamountexctax: this.props.data.ordervaluexd,
      zx_ordervaluewithoutdiscount: this.props.data.ordervalue,
      zx_totalqty: this.props.data.totalqty,
      zx_noofbag: this.props.data.bags,
      zx_team: agentid,
      zx_project: primaryOrderForm.zx_project
        ? primaryOrderForm.zx_project
        : null,
    };

    // console.log("remakkzzz", new Date().getDay());

    var minDate = new Date();
    // var businessDays = 10;
    // var days = businessDays + Math.floor((Math.min(moment().day(),5)+businessDays)/6)*2;
    // moment.add(days, 'days');

    return (
      <ScrollView style={{ marginTop: hp("1%") }}>
        {primaryOrderForm.zx_ordertype2 == "Retail Orders(Project)" ||
        primaryOrderForm.zx_ordertype2 == "Project" ? (
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 14,
                top: hp("2.5%"),
                left: wp("4%"),
              }}
            >
              Project Order
            </Text>

            <View
              style={{
                top: hp("2%"),
                right: wp("3.5%"),
                marginBottom: hp("2%"),
              }}
            >
              <SearchableDropdown
                dataSource={this.getName()}
                placeHolderText={" Select Project Order"}
                selectedValue={primaryOrderForm.zx_project}
                onChange={(value) =>
                  this.props.changePrimaryOrderForm({
                    edited_field: "zx_project",
                    edited_value: value,
                  })
                }
                placeholder={"Select Project Order"}
                invalid={false}
                customPickerStyles={{
                  width: wp("85%"),
                  // height: hp('5.7%'),
                  marginBottom: hp("2%"),
                  paddingHorizontal: 8,
                  left: wp("0.5%"),
                }}
                labelStyles={{
                  color: Colors.black,
                  fontFamily: ApplicationStyles.textFont,
                  textAlign: "left",
                  //   width: "99%",
                  //  padding:5,
                  fontSize: 13,
                  flexDirection: "row",
                }}
                key={primaryOrderForm.zx_project + _.uniqueId()}
              />
            </View>
          </View>
        ) : null}
        <View
          style={{
            flexDirection: "column",
            borderColor: Colors.lightGrey,
            borderBottomWidth: 1,
            width: wp("90%"),
            margin: "4%",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>
            Document Number
          </Text>
          <TextInput
            style={{ height: 40 }}
            placeholder="Enter Document no."
            value={primaryOrderForm.zx_documentno}
            // editable={distributorForm.zx_overallstatus=="Pending for approval" || distributorForm.zx_overallstatus=="Approved" || distributorForm.zx_overallstatus=="Rejected" ? false:true}
            onChangeText={(value) =>
              this.props.changePrimaryOrderForm({
                edited_field: "zx_documentno",
                edited_value: value,
              })
            }
          />
        </View>

        <View
          style={{
            flexDirection: "column",
            borderColor: Colors.lightGrey,
            borderBottomWidth: 1,
            width: wp("90%"),
            margin: "4%",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>
            Refrence Number*
          </Text>
          <TextInput
            style={{ height: 40 }}
            placeholder="Enter Refrence no."
            value={primaryOrderForm.zx_referenceno}
            // editable={distributorForm.zx_overallstatus=="Pending for approval" || distributorForm.zx_overallstatus=="Approved" || distributorForm.zx_overallstatus=="Rejected" ? false:true}
            onChangeText={(value) =>
              this.props.changePrimaryOrderForm({
                edited_field: "zx_referenceno",
                edited_value: value,
              })
            }
          />
        </View>

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
            value={primaryOrderForm.zx_remarks}
            multiline={true}
            numberOfLines={1}
            onChange={(value) =>
              this.props.changePrimaryOrderForm({
                edited_field: "zx_remarks",
                edited_value: value,
              })
            }
          />

          {/* <TextInput
            style={{ height: 40 }}
            placeholder="Enter Remarks"
            value={primaryOrderForm.zx_remarks}
            // editable={distributorForm.zx_overallstatus=="Pending for approval" || distributorForm.zx_overallstatus=="Approved" || distributorForm.zx_overallstatus=="Rejected" ? false:true}
            onChangeText={(value) =>
              this.props.changePrimaryOrderForm({
                edited_field: "zx_remarks",
                edited_value: value,
              })
            }
          /> */}
        </View>

        <View
          style={{
            flexDirection: "column",
            borderColor: Colors.lightGrey,
            borderBottomWidth: 1,
            width: wp("90%"),
            margin: "0%",
            left: wp("4%"),
          }}
        >
          <Text
            style={{ fontWeight: "bold", fontSize: 14, bottom: hp("-2.5%") }}
          >
            Schedule Date of Delivery*
          </Text>
          <SelectDate
            style={{ marginTop: hp("3%") }}
            minDate={new Date()}
            maxDate={
              this.CalculateWeekendDays(new Date())
                ? new Date(minDate.setDate(minDate.getDate() + 5))
                : new Date(minDate.setDate(minDate.getDate() + 3))
            }
            date={primaryOrderForm.zx_scheduleddateofdelivery}
            onDateChange={(date) =>
              this.props.changePrimaryOrderForm({
                edited_field: "zx_scheduleddateofdelivery",
                edited_value: date,
              })
            }
            error={
              validation.invalid &&
              validation.invalid_field == "zx_scheduleddateofdelivery"
            }
          />
        </View>
        <Text style={{ color: "red", fontSize: 12, left: wp("3.5%") }}>
          {this.validateDate(primaryOrderForm.zx_scheduleddateofdelivery)}
        </Text>
        <TouchableOpacity
          style={{
            width: wp("34.5%"),
            alignSelf: "center",
            marginTop: hp("8%"),
            height: hp("4.7%"),
          }}
          onPress={() => {
            primaryOrderForm.zx_referenceno
              ? this.props.submitPrimaryOrderForm({
                  form1: form1,
                  itemarry: this.props.body,
                  // form1:form1,
                  token,
                })
              : HelperService.showToast({
                  message: "Please Enter Reference No.",
                });
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
    primaryOrderForm: state.orders.primaryOrderForm,
    validation: state.orders.orderValidation,
    loading: state.orders.submitPrimaryOrderLoader,
    body: state.products.cart.body,
    cartItem: state.products.cart.cartItem,
    variableDiscount: state.orders.variableDiscount,
    data: state.orders.headerValue,
    getRecord: state.orders.getRecord,
    project: state.project.getProject,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changePrimaryOrderForm: (params) =>
    dispatch(OrdersActions.changePrimaryOrderForm(params)),
  submitPrimaryOrderForm: (params) =>
    dispatch(OrdersActions.submitPrimaryOrderForm(params)),
  clearSizeForm: (params) => dispatch(ProductActions.clearSizeForm(params)),
  getProject: (params) => dispatch(ProjectActions.getProject(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailScreen);
