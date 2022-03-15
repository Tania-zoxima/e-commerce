import React, { Component } from "react";
import InputText from "App/Components/FormInput/InputText";
import CheckBoxContainer from "../../Components/Checkox/Checkbox";
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
import Styles from "./NewDealerScreenStyles";
import { Icon, Input, Button, ListItem, Radio, Left, Right } from "native-base";
import BlueButton from "../../Components/BlueButton";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import InputNumber from "App/Components/FormInput/InputNumber";

class BankDetails extends Component {
  validateAccount(value) {
    let error;
    if (!value) {
      error = "";
    } else if (!/[0-9]{9,18}$/.test(value)) {
      error = "Invalid Account Number";
    }
    return error;
  }

  validateIfsc(value) {
    let error;
    if (!value) {
      error = "";
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value)) {
      error = "Invalid IFSC Number";
    }
    return error;
  }

  render() {
    const {
      distributorForm,
      validation,
      distributorFormUpdate,
      submitValidation,
    } = this.props;

    return (
      <ScrollView style={{ marginBottom: hp("30%") }}>
        <View style={{ ...Styles.outerView, left: "2.5%" }}>
          <View>
            <View style={Styles.textView}>
              <Text style={{ ...Styles.textStyle, marginBottom: hp("-0%") }}>
                Account No.
              </Text>
              <InputNumber
                style={Styles.placeholder}
                placeholder={"Enter Account No."}
                value={distributorForm.zx_accountno}
                editable={
                  distributorForm.zx_overallstatus == "Pending for approval" ||
                  distributorForm.zx_overallstatus == "Approved"
                    ? false
                    : true
                }
                onChange={(value) =>
                  this.props.changeDistributorForm({
                    edited_field: "zx_accountno",
                    edited_value: value,
                  })
                }
                error={
                  submitValidation.invalid &&
                  submitValidation.invalid_field == "zx_accountno"
                }
              />
            </View>
            <Text style={{ color: "red" }}>
              {this.validateAccount(distributorForm.zx_accountno)}
            </Text>
          </View>

          <View>
            <View style={{ ...Styles.textView, left: wp("10%") }}>
              <Text style={{ ...Styles.textStyle, marginBottom: hp("-0%") }}>
                IFSC Code
              </Text>
              <InputText
                style={Styles.placeholder}
                placeholder={"Enter IFSC Code"}
                value={distributorForm.zx_ifsccode}
                editable={
                  distributorForm.zx_overallstatus == "Pending for approval" ||
                  distributorForm.zx_overallstatus == "Approved" 
                    ? false
                    : true
                }
                onChange={(value) =>
                  this.props.changeDistributorForm({
                    edited_field: "zx_ifsccode",
                    edited_value: value,
                  })
                }
                autoCapitalize="characters"
                error={
                  submitValidation.invalid &&
                  submitValidation.invalid_field == "zx_ifsccode"
                }
              />
            </View>
            <Text style={{ color: "red", left: wp("10%") }}>
              {this.validateIfsc(distributorForm.zx_ifsccode)}
            </Text>
          </View>

          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Bank Name</Text>
            <InputText
              style={Styles.placeholder}
              placeholder={"Enter Bank Name"}
              value={distributorForm.zx_bankname}
              editable={
                distributorForm.zx_overallstatus == "Pending for approval" ||
                distributorForm.zx_overallstatus == "Approved" 
                  ? false
                  : true
              }
              onChange={(value) =>
                this.props.changeDistributorForm({
                  edited_field: "zx_bankname",
                  edited_value: value,
                })
              }
              error={
                submitValidation.invalid &&
                submitValidation.invalid_field == "zx_bankname"
              }
            />
          </View>

          <View style={{ ...Styles.textView1 }}>
            <Text style={Styles.textStyle}>Bank Address</Text>
            <InputText
              style={Styles.placeholder}
              placeholder={"Enter Bank Address"}
              editable={
                distributorForm.zx_overallstatus == "Pending for approval" ||
                distributorForm.zx_overallstatus == "Approved" 
                  ? false
                  : true
              }
              value={distributorForm.zx_bankaddress}
              onChange={(value) =>
                this.props.changeDistributorForm({
                  edited_field: "zx_bankaddress",
                  edited_value: value,
                })
              }
              error={
                submitValidation.invalid &&
                submitValidation.invalid_field == "zx_bankaddress"
              }
            />
          </View>

          {/* <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Bank Code</Text>
        <InputText style={Styles.placeholder} placeholder={"Enter Bank Code"}
        // 
        />
      </View> */}

          <View style={Styles.textView}>
            <Text style={Styles.textStyle}>Deposit Amount</Text>
            <InputNumber
              style={Styles.placeholder}
              placeholder={"Enter Deposit Amount"}
              editable={
                distributorForm.zx_overallstatus == "Pending for approval" ||
                distributorForm.zx_overallstatus == "Approved" 
                  ? false
                  : true
              }
              value={distributorForm.zx_depositamount}
              onChange={(value) =>
                this.props.changeDistributorForm({
                  edited_field: "zx_depositamount",
                  edited_value: value,
                })
              }
              error={
                submitValidation.invalid &&
                submitValidation.invalid_field == "zx_depositamount"
              }
            />
          </View>

          <View style={{ ...Styles.textView, left: wp("10%") }}>
            <Text style={Styles.textStyle}>Credit Term Pipes</Text>
            <InputNumber
              style={Styles.placeholder}
              placeholder={"Enter Credit Term Pipes"}
              editable={
                distributorForm.zx_overallstatus == "Pending for approval" ||
                distributorForm.zx_overallstatus == "Approved" 
                  ? false
                  : true
              }
              value={distributorForm.zx_credittermpipes}
              onChange={(value) =>
                this.props.changeDistributorForm({
                  edited_field: "zx_credittermpipes",
                  edited_value: value,
                })
              }
              error={
                submitValidation.invalid &&
                submitValidation.invalid_field == "zx_credittermpipes"
              }
            />
          </View>

          <View style={Styles.textView}>
            <Text style={Styles.textStyle}>Credit limit(In Rs.)</Text>
            <InputNumber
              style={Styles.placeholder}
              placeholder={"Enter Credit limit(In Rs.)"}
              value={distributorForm.zx_creditlimit}
              editable={
                distributorForm.zx_overallstatus == "Pending for approval" ||
                distributorForm.zx_overallstatus == "Approved" 
                  ? false
                  : true
              }
              onChange={(value) =>
                this.props.changeDistributorForm({
                  edited_field: "zx_creditlimit",
                  edited_value: value,
                })
              }
              error={
                submitValidation.invalid &&
                submitValidation.invalid_field == "zx_creditlimit"
              }
            />
          </View>

          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>
              Name of nearset distributor with distance
            </Text>
            <InputText
              style={Styles.placeholder}
              placeholder={"Enter Details"}
              editable={
                distributorForm.zx_overallstatus == "Pending for approval" ||
                distributorForm.zx_overallstatus == "Approved" 
                  ? false
                  : true
              }
              value={distributorForm.zx_nameofnearestdistributorwithdistance}
              onChange={(value) =>
                this.props.changeDistributorForm({
                  edited_field: "zx_nameofnearestdistributorwithdistance",
                  edited_value: value,
                })
              }
              error={
                submitValidation.invalid &&
                submitValidation.invalid_field ==
                  "zx_nameofnearestdistributorwithdistance"
              }
            />
          </View>

          {/* <View style={{ marginTop: "3%" }}>
        <BlueButton style={Styles.button} title={"SAVE"}
        onPress={() => this.onSubmit(editDistributorForm)} />
      </View> */}
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

    // validation: state.retailers.retailerFormValidation,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeDistributorForm: (params) =>
    dispatch(DistributorActions.changeDistributorForm(params)),
  submitSelectedDistributorForm: (params) =>
    dispatch(DistributorActions.submitSelectedDistributorForm(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BankDetails);
