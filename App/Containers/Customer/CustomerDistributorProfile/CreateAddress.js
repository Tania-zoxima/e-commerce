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
  ScrollView,
} from "react-native";
import { Icon, Input, Button, ListItem, Radio, Left, Right } from "native-base";
import BlueButton from "../../../Components/BlueButton/BlueButton";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SearchableDropdown from "App/Components/SearchableDropdown";
import { Colors } from "react-native/Libraries/NewAppScreen";
import InputNumber from "App/Components/FormInput/InputNumber";
import Styles from "./CreateAddressStyles";
import BackArrowButton from "App/Components/BackArrowButton";
import { Card } from "react-native-paper";
import _ from "lodash";
import RetailersActions from "App/Stores/Retailers/Actions";
import { HelperService } from "../../../Services/Utils/HelperService";

class CreateAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
    };
  }
  componentDidMount() {
    const { token, agentid } = this.props;

    // this.props.clearForm();

    this.state.timer = setTimeout(
      () =>
        this.props.getAllState({
          token,
          id: agentid,
          level: 2,
        }),
      5000
    );
  }

  componentWillUnmount() {
    // this.props.clearForm();
  }

  getPincode() {
    const { pincode } = this.props;
    let Pincode = [];
    if (pincode && pincode.length) {
      pincode.map((obj) => {
        if (obj.zx_level == 6) {
          Pincode.push({
            id: obj.zx_salesterritoryid,
            name: obj.zx_territoryname,
          });
        }
      });
    }
    return Pincode;
  }

  getState() {
    const { state } = this.props;
    let pincode = [];
    if (state && state.length) {
      state.map((obj) => {
        if (obj.zx_level == 2) {
          pincode.push({
            id: obj.zx_salesterritoryid,
            name: obj.zx_territoryname,
          });
        }
      });
    }
    return pincode;
  }

  getCity() {
    const { city } = this.props;
    let pincode = [];
    if (city && city.length) {
      city.map((obj) => {
        if (obj.zx_level == 5) {
          pincode.push({
            id: obj.zx_salesterritoryid,
            name: obj.zx_territoryname,
          });
        }
      });
    }
    return pincode;
  }

  getSubState() {
    const { subState } = this.props;
    let pincode = [];
    if (subState && subState.length) {
      subState.map((obj) => {
        if (obj.zx_level == 3) {
          pincode.push({
            id: obj.zx_salesterritoryid,
            name: obj.zx_territoryname,
          });
        }
      });
    }
    return pincode;
  }

  getDistrict() {
    const { district } = this.props;
    let pincode = [];
    if (district && district.length) {
      district.map((obj) => {
        if (obj.zx_level == 4) {
          pincode.push({
            id: obj.zx_salesterritoryid,
            name: obj.zx_territoryname,
          });
        }
      });
    }
    return pincode;
  }

  validateGstNumber(value) {
    let error;
    if (!value) {
      error = "Required";
    } else if (
      !/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/.test(value)
    ) {
      error = "Invalid GST Number";
    }
    return error;
  }

  validatePhoneNumber(value) {
    let error;
    if (!value) {
      error = "Required";
    } else if (
      !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value)
    ) {
      error = "Invalid Number";
    }
    return error;
  }
  render() {
    const complaintRef = [{ id: "Bill To", name: "Bill To" }];

    const {
      addressForm,
      distributorFormUpdate,
      submitValidation,
      token,
      agentid,
      loader,
      updateAddress,
      validation,
    } = this.props;

    console.log("partyyyyyyyss", this.getPincode().length);

    let recordid = this.props.navigation.state.params;
    //  console.log("recirdd",recordid.id)

    let forms = {
      zx_tickettype: "New Delivery Address",
      zx_customer: recordid.id,
      zx_contactperson: addressForm.zx_contactperson,
      zx_mobilenumber: addressForm.zx_mobilenumber,
      zx_gstno: addressForm.zx_gstno,
      zx_address: addressForm.zx_address,
      zx_city: addressForm.zx_city11,
      zx_area: "iuuj",
      zx_district: addressForm.zx_district,
      zx_substate: addressForm.zx_substate,
      zx_state: addressForm.zx_state,
      zx_team: agentid,
      zx_deliveryaddresstobeupdated: "7uj98ipodcd3",
    };

    let form1 = {
      zx_tickettype: "Update Delivery Address",
      zx_customer: recordid.id,
      zx_contactperson: addressForm.zx_contactperson,
      zx_mobilenumber: addressForm.zx_mobilenumber,
      zx_gstno: addressForm.zx_gstno,
      zx_address: addressForm.zx_address,
      zx_city: addressForm.zx_city11,
      zx_area: "iuuj",
      zx_district: addressForm.zx_district,
      zx_substate: addressForm.zx_substate,
      zx_state: addressForm.zx_state,
      zx_team: agentid,
      zx_deliveryaddresstobeupdated: "7uj98ipodcd3",
    };

    return (
      <View style={Styles.mainContainer}>
        <Card style={Styles.cardstyle1}>
          <BackArrowButton style={Styles.backarrow} />
          <Text style={Styles.title}>
            {recordid.show == true ? "Create " : "Update "}
            <Text style={Styles.titleText}>{"New Address "}</Text>
          </Text>
        </Card>

        <ScrollView style={{ marginBottom: hp("5%") }}>
          <View style={{ ...Styles.outerView, left: "2.5%" }}>
            <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>Person Name*</Text>
              <InputText
                style={Styles.placeholder}
                placeholder={"Enter Name"}
                value={addressForm.zx_contactperson}
                onChange={(value) =>
                  this.props.changeAddressForm({
                    edited_field: "zx_contactperson",
                    edited_value: value,
                  })
                }
                error={
                  validation.invalid &&
                  validation.invalid_field == "zx_contactperson"
                }
              />
            </View>

            {/* {(addressForm.zx_contactperson && addressForm.zx_contactperson.length) < 6 ? <Text style={{color:"red"}}>Mandatory Field</Text> : null} */}

            {/* <View style={Styles.dropDown}>
        <Text style={Styles.textStyle}>Address Type</Text>

        <View style={{marginLeft:wp("-2%"),marginTop:hp("1%"),width:wp("100%")}}>
          <SearchableDropdown 
          placeHolderText={" Select Address Type"}
                  dataSource={complaintRef}

           selectedValue={addressForm.zx_addresstype}
         onChange={(value) => this.props.changeAddressForm({ edited_field: 'zx_addresstype', edited_value: value })}

              
               placeholder={"Select Address Type"}
           
              labelStyles={{
            //   color: Colors.black,
              textAlign: "center",
              // width: "99%",
              //  padding:5,
            //   fontSize: 13,
              flexDirection: "row",
            }}
           
            invalid={false}
            customPickerStyles={{ width:"80%",marginLeft:6,marginTop:15,borderWidth:1,borderBottomColor:'lightgrey',borderColor:'white'}}
            key={addressForm.zx_addresstype}
           
           />
           </View>
        </View> */}

            <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>Address*</Text>
              <InputText
                style={Styles.placeholder}
                placeholder={"Enter Address"}
                value={addressForm.zx_address}
                onChange={(value) =>
                  this.props.changeAddressForm({
                    edited_field: "zx_address",
                    edited_value: value,
                  })
                }
                error={
                  validation.invalid && validation.invalid_field == "zx_address"
                }
              />
            </View>

            <View style={{ flexDirection: "column" }}>
              <View style={Styles.dropDown}>
                <Text style={Styles.textStyle}>State</Text>

                <View
                  style={{
                    marginLeft: wp("-2%"),
                    marginTop: hp("1%"),
                    width: wp("100%"),
                  }}
                >
                  <SearchableDropdown
                    placeHolderText={" Select State"}
                    dataSource={
                      this.getState().length
                        ? this.getState()
                        : [
                            {
                              id: addressForm.zx_state,
                              name: addressForm.statename,
                            },
                          ]
                    }
                    selectedValue={addressForm.zx_state}
                    onChange={(value) => {
                      this.props.changeAddressForm({
                        edited_field: "zx_state",
                        edited_value: value,
                      }),
                        this.props.getAllSubState({
                          token,
                          id: agentid,
                          level: 3,
                          first_level: 2,
                          guidId: value,
                        });
                    }}
                    placeholder={"Select State"}
                    labelStyles={{
                      //   color: Colors.black,
                      textAlign: "center",
                      // width: "99%",
                      //  padding:5,
                      //   fontSize: 13,
                      flexDirection: "row",
                    }}
                    invalid={false}
                    customPickerStyles={{
                      width: "80%",
                      marginLeft: 6,
                      marginTop: 15,
                      borderWidth: 1,
                      borderBottomColor: "lightgrey",
                      borderColor: "white",
                    }}
                    key={addressForm.state + _.uniqueId()}
                  />
                </View>
              </View>

              <View style={Styles.dropDown}>
                <Text style={Styles.textStyle}>Sub-State</Text>

                <View
                  style={{
                    marginLeft: wp("-2%"),
                    marginTop: hp("1%"),
                    width: wp("100%"),
                  }}
                >
                  <SearchableDropdown
                    placeHolderText={" Select Sub-State"}
                    dataSource={
                      this.getSubState().length
                        ? this.getSubState()
                        : [
                            {
                              id: addressForm.zx_substate,
                              name: addressForm.substatename,
                            },
                          ]
                    }
                    selectedValue={addressForm.zx_substate}
                    onChange={(value) => {
                      this.props.changeAddressForm({
                        edited_field: "zx_substate",
                        edited_value: value,
                      }),
                        this.props.getAllDistrict({
                          token,
                          id: agentid,
                          level: 4,
                          first_level: 3,
                          guidId: value,
                        });
                    }}
                    placeholder={"Select City"}
                    labelStyles={{
                      //   color: Colors.black,
                      textAlign: "center",
                      // width: "99%",
                      //  padding:5,
                      //   fontSize: 13,
                      flexDirection: "row",
                    }}
                    invalid={false}
                    customPickerStyles={{
                      width: "80%",
                      marginLeft: 6,
                      marginTop: 15,
                      borderWidth: 1,
                      borderBottomColor: "lightgrey",
                      borderColor: "white",
                    }}
                    key={addressForm.city + _.uniqueId()}
                  />
                </View>
              </View>
              <View style={Styles.dropDown}>
                <Text style={Styles.textStyle}>District</Text>

                <View
                  style={{
                    marginLeft: wp("-2%"),
                    marginTop: hp("1%"),
                    width: wp("100%"),
                  }}
                >
                  <SearchableDropdown
                    placeHolderText={" Select District"}
                    dataSource={
                      this.getDistrict().length
                        ? this.getDistrict()
                        : [
                            {
                              id: addressForm.zx_district,
                              name: addressForm.districtname,
                            },
                          ]
                    }
                    selectedValue={addressForm.zx_district}
                    onChange={(value) => {
                      this.props.changeAddressForm({
                        edited_field: "zx_district",
                        edited_value: value,
                      }),
                        this.props.getAllCity({
                          token,
                          id: agentid,
                          level: 5,
                          first_level: 4,
                          guidId: value,
                        });
                    }}
                    placeholder={"Select City"}
                    labelStyles={{
                      //   color: Colors.black,
                      textAlign: "center",
                      // width: "99%",
                      //  padding:5,
                      //   fontSize: 13,
                      flexDirection: "row",
                    }}
                    invalid={false}
                    customPickerStyles={{
                      width: "80%",
                      marginLeft: 6,
                      marginTop: 15,
                      borderWidth: 1,
                      borderBottomColor: "lightgrey",
                      borderColor: "white",
                    }}
                    key={addressForm.city + _.uniqueId()}
                  />
                </View>
              </View>

              <View style={Styles.dropDown}>
                <Text style={Styles.textStyle}>City/Town</Text>

                <View
                  style={{
                    marginLeft: wp("-2%"),
                    marginTop: hp("1%"),
                    width: wp("100%"),
                  }}
                >
                  <SearchableDropdown
                    placeHolderText={" Select City"}
                    dataSource={
                      this.getCity().length
                        ? this.getCity()
                        : [
                            {
                              id: addressForm.zx_city11,
                              name: addressForm.cityname,
                            },
                          ]
                    }
                    selectedValue={addressForm.zx_city11}
                    onChange={(value) => {
                      this.props.changeAddressForm({
                        edited_field: "zx_city11",
                        edited_value: value,
                      }),
                        this.props.getAllPincode({
                          token,
                          id: agentid,
                          level: 6,
                          first_level: 5,
                          guidId: value,
                        });
                    }}
                    placeholder={"Select City"}
                    labelStyles={{
                      //   color: Colors.black,
                      textAlign: "center",
                      // width: "99%",
                      //  padding:5,
                      //   fontSize: 13,
                      flexDirection: "row",
                    }}
                    invalid={false}
                    customPickerStyles={{
                      width: "80%",
                      marginLeft: 6,
                      marginTop: 15,
                      borderWidth: 1,
                      borderBottomColor: "lightgrey",
                      borderColor: "white",
                    }}
                    key={addressForm.city + _.uniqueId()}
                  />
                </View>
              </View>

              <View style={Styles.dropDown}>
                <Text style={Styles.textStyle}>Pin Code</Text>

                <View
                  style={{
                    marginLeft: wp("-2%"),
                    marginTop: hp("1%"),
                    width: wp("100%"),
                  }}
                >
                  <SearchableDropdown
                    placeHolderText={" Select Pincode"}
                    dataSource={
                      this.getPincode().length
                        ? this.getPincode()
                        : [
                            {
                              id: addressForm.pincodename,
                              name: addressForm.pincodename,
                            },
                          ]
                    }
                    selectedValue={
                      addressForm.pincode
                        ? addressForm.pincode
                        : addressForm.pincodename
                    }
                    onChange={(value) =>
                      this.props.changeAddressForm({
                        edited_field: "pincode",
                        edited_value: value,
                      })
                    }
                    placeholder={"Select Pincode"}
                    labelStyles={{
                      //   color: Colors.black,
                      textAlign: "center",
                      // width: "99%",
                      //  padding:5,
                      //   fontSize: 13,
                      flexDirection: "row",
                    }}
                    invalid={false}
                    customPickerStyles={{
                      width: "80%",
                      marginLeft: 6,
                      marginTop: 15,
                      borderWidth: 1,
                      borderBottomColor: "lightgrey",
                      borderColor: "white",
                    }}
                    key={addressForm.pincode + _.uniqueId()}
                  />
                </View>
              </View>

              <View style={Styles.textView1}>
                <Text style={Styles.textStyle}>Phone no.*</Text>
                <InputNumber
                  style={Styles.placeholder}
                  placeholder={"Enter Phone no."}
                  maxLength={10}
                  value={
                    addressForm.zx_mobilenumber
                      ? addressForm.zx_mobilenumber
                      : addressForm.zx_mobilenumber == ""
                      ? ""
                      : addressForm.zx_contactphoneno
                  }
                  onChange={(value) =>
                    this.props.changeAddressForm({
                      edited_field: "zx_mobilenumber",
                      edited_value: value,
                    })
                  }
                  error={
                    validation.invalid &&
                    validation.invalid_field == "zx_mobilenumber"
                  }
                />
              </View>
              {/* {!this.validatePhoneNumber(addressForm.zx_mobilenumber)  ? <Text style={{color:"red"}}>Enter Valid Number</Text> : null} */}

              <Text style={{ color: "red" }}>
                {this.validatePhoneNumber(addressForm.zx_mobilenumber)}
              </Text>

              <View style={Styles.textView1}>
                <Text style={Styles.textStyle}>G.S.T No.*</Text>
                <InputText
                  style={Styles.placeholder}
                  placeholder={"Enter G.S.T No."}
                  value={addressForm.zx_gstno}
                  onChange={(value) =>
                    this.props.changeAddressForm({
                      edited_field: "zx_gstno",
                      edited_value: value,
                    })
                  }
                  error={
                    validation.invalid && validation.invalid_field == "zx_gstno"
                  }
                />
              </View>
              <Text style={{ color: "red" }}>
                {this.validateGstNumber(addressForm.zx_gstno)}
              </Text>

              {/* {!this.validateGstNumber(addressForm.zx_gstno)   ? <Text style={{color:"red"}}>Enter Valid GST Number</Text> : null} */}
            </View>
          </View>
          <View
            style={{
              height: hp("5%"),
              left: wp("35%"),
              bottom: hp("4%"),
            }}
          >
            <BlueButton
              style={{ ...Styles.button }}
              title={"SAVE"}
              onPress={() => {
                this.props.submitAddressForm({
                  form: recordid.show == true ? forms : form1,
                  token,
                });
              }}
              disabled={loader}
              loading={loader}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    agentid: state.user.id,
    addressForm: state.retailers.addressForm,
    area: state.distributor.getArea,
    loader: state.retailers.submitAddressFormLoader,
    // updateAddress: state.retailers.updateAddress,
    validation: state.retailers.addressValidation,
    zone: state.distributor.getZone,
    pincode: state.distributor.getPincode,
    state: state.distributor.getState,
    city: state.distributor.getCity,
    subState: state.distributor.getSubState,
    district: state.distributor.getDistrict,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeAddressForm: (params) =>
    dispatch(RetailersActions.changeAddressForm(params)),
  submitAddressForm: (params) =>
    dispatch(RetailersActions.submitAddressForm(params)),
  getAllArea: (params) => dispatch(DistributorActions.getAllArea(params)),
  clearForm: (params) => dispatch(RetailersActions.clearForm(params)),
  updateContact: (params) => dispatch(RetailersActions.updateContact(params)),
  getAllState: (params) => dispatch(DistributorActions.getAllState(params)),
  getAllSubState: (params) =>
    dispatch(DistributorActions.getAllSubState(params)),
  getAllCity: (params) => dispatch(DistributorActions.getAllCity(params)),
  getAllPincode: (params) => dispatch(DistributorActions.getAllPincode(params)),
  getAllDistrict: (params) =>
    dispatch(DistributorActions.getAllDistrict(params)),
  getAllZone: (params) => dispatch(DistributorActions.getAllZone(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateAddress);
