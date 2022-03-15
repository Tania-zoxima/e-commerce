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
  ScrollView,
} from "react-native";
import Styles from "./NewDealerScreenStyles";
import { Icon, Input, Button, ListItem, Radio, Left, Right } from "native-base";
import BlueButton from "../../Components/BlueButton";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SearchableDropdown from "App/Components/SearchableDropdown";
import { Colors } from "react-native/Libraries/NewAppScreen";
import InputNumber from "App/Components/FormInput/InputNumber";

class Communication extends Component {
  validatePan(value) {
    let error;
    if (!value) {
      error = "";
    } else if (!/[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value)) {
      error = "Invalid PAN Number";
    }
    return error;
  }

  validateAadhaar(value) {
    let error;
    if (!value) {
      error = "";
    } else if (!/^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/.test(value)) {
      error = "Invalid Aadhaar Number";
    }
    return error;
  }

  validateGstNumber(value) {
    let error;
    if (!value) {
      error = "";
    } else if (
      !/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/.test(value)
    ) {
      error = "Invalid GST Number";
    }
    return error;
  }

  render() {
    const gstOptions = [
      { id: "Registered", name: "Registered" },
      { id: "Not Registered", name: "Not Registered" },
    ];
    const {
      distributorForm,
      validation,
      distributorFormUpdate,
      submitValidation,
      // gstType
    } = this.props;

    return (
      <ScrollView style={{ marginBottom: hp("30%") }}>
        <View style={{ ...Styles.outerView, left: "2.5%" }}>
          <View style={Styles.dropDown}>
            <Text style={Styles.textStyle}>GST Registration Type*</Text>

            <View
              style={{
                marginLeft: wp("1%"),
                marginTop: hp("2%"),
                width: wp("100%"),
              }}
            >
              <SearchableDropdown
                placeHolderText={" Select Registration Type"}
                dataSource={gstOptions}
                selectedValue={distributorForm.zx_gstregtype}
                onChange={(value) =>
                  this.props.changeDistributorForm({
                    edited_field: "zx_gstregtype",
                    edited_value: value,
                  })
                }
                placeholder={"Select Registration Type"}
                disablePicker={
                  distributorForm.zx_overallstatus == "Pending for approval" ||
                  distributorForm.zx_overallstatus == "Approved" 
                    ? true
                    : false
                }
                labelStyles={{
                  color: Colors.black,
                  textAlign: "center",
                  // width: "99%",
                  //  padding:5,
                  fontSize: 13,
                  flexDirection: "row",
                }}
                // key={distributorForm.zx_billingpostcode + _.uniqueId()}
                // invalid={false}
                error={
                  validation.invalid &&
                  validation.invalid_field == "zx_gstregtype"
                }
                customPickerStyles={{
                  width: "80%",
                  marginLeft: 6,
                  marginTop: 15,
                  borderWidth: 1,
                  borderBottomColor: "lightgrey",
                  borderColor: "white",
                }}
                key={distributorForm.zx_gstregtype}
              />
            </View>
          </View>
          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>PAN No.</Text>
            <InputText
              style={Styles.placeholder}
              placeholder={"Enter PAN No."}
              value={distributorForm.zx_panno}
              editable={
                distributorForm.zx_overallstatus == "Pending for approval" ||
                distributorForm.zx_overallstatus == "Approved" 
                  ? false
                  : true
              }
              onChange={(value) =>
                this.props.changeDistributorForm({
                  edited_field: "zx_panno",
                  edited_value: value,
                })
              }
              autoCapitalize ="characters"
              error={
                submitValidation.invalid &&
                submitValidation.invalid_field == "zx_panno"
              }
              maxLength={10}
            />
          </View>
          <Text style={{ color: "red" }}>
            {this.validatePan(distributorForm.zx_panno)}
          </Text>

          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>AADHAR No.</Text>
            <InputNumber
              style={Styles.placeholder}
              placeholder={"Enter AADHAR No."}
              editable={
                distributorForm.zx_overallstatus == "Pending for approval" ||
                distributorForm.zx_overallstatus == "Approved" 
                  ? false
                  : true
              }
              maxLength={12}
              value={distributorForm.zx_aadharno}
              onChange={(value) =>
                this.props.changeDistributorForm({
                  edited_field: "zx_aadharno",
                  edited_value: value,
                })
              }
              error={
                submitValidation.invalid &&
                submitValidation.invalid_field == "zx_aadharno"
              }
            />
          </View>
          <Text style={{ color: "red" }}>
            {this.validateAadhaar(distributorForm.zx_aadharno)}
          </Text>

          <View>
            <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>GST No.</Text>
              <InputText
                style={Styles.placeholder}
                placeholder={"Enter GST No."}
                autoCapitalize="characters"
                value={distributorForm.zx_gstno}
                editable={
                  distributorForm.zx_overallstatus == "Pending for approval" ||
                  distributorForm.zx_overallstatus == "Approved" 
                    ? false
                    : true
                }
                onChange={(value) =>
                  this.props.changeDistributorForm({
                    edited_field: "zx_gstno",
                    edited_value: value,
                  })
                }
                error={
                  submitValidation.invalid &&
                  submitValidation.invalid_field == "zx_gstno"
                }
              />
            </View>
            <Text style={{ color: "red" }}>
              {this.validateGstNumber(distributorForm.zx_gstno)}
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
    // gstType: state.common.gstOptions,

    distributorForm: state.distributor.distributorForm,
    validation: state.distributor.distributorFormValidation,
    submitValidation: state.distributor.submitDistributorFormValidation,
    // validation: state.retailers.retailerFormValidation,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeDistributorForm: (params) =>
    dispatch(DistributorActions.changeDistributorForm(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Communication);
