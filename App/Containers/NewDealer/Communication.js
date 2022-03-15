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
} from "react-native";
import Styles from "./NewDealerScreenStyles";
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
import BlueButton from "../../Components/BlueButton";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ScrollView } from "react-navigation";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import InputDate from "../../Components/FormInput/InputDate";
import { HelperService } from "../../Services/Utils/HelperService";
import InputMobile from "App/Components/FormInput/InputMobile";
import InputNumber from "App/Components/FormInput/InputNumber";

import SelectDate from "../../Components/SelectDate/SelectDate";
import SearchableDropdown from "../../Components/SearchableDropdown/SearchableDropdown";
import _ from "lodash";
import Loading from "../../Components/Loading/Loading";
import UserActions from "App/Stores/User/Actions";

class Communication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
    };
  }
  componentDidMount() {
    const { token, agentid } = this.props;
    this.props.getSubArea({
      token,
      agentid,
    });
    // this.state.timer = setTimeout(
    //   () =>
    //     this.props.getAllState({
    //       token,
    //       id: agentid,
    //       level: 2,
    //     }),
    //   5000
    // );
  }

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //       itemSelected: "",
  //   };
  // }
  // componentDidMount() {
  //   this.props.clearRetailerForm();
  //   const { token, fetchRetailerArea, user_details } = this.props;
  //   if (user_details.business_channel__c == "Retail") {
  //     fetchRetailerArea({
  //       token,
  //       partyType: "Retailer",
  //     });
  //   }
  // }

  // getPincode() {
  //   const { pincode } = this.props;
  //   let Pincode = [];
  //   if (pincode && pincode.length) {
  //     pincode.map((obj) => {
  //       if (obj.zx_level == 6) {
  //         Pincode.push({
  //           id: obj.zx_salesterritoryid,
  //           name: obj.zx_territoryname,
  //         });
  //       }
  //     });
  //   }
  //   return Pincode;
  // }

  // getState() {
  //   const { state } = this.props;
  //   let pincode = [];
  //   if (state && state.length) {
  //     state.map((obj) => {
  //       if (obj.zx_level == 2) {
  //         pincode.push({
  //           id: obj.zx_salesterritoryid,
  //           name: obj.zx_territoryname,
  //         });
  //       }
  //     });
  //   }
  //   return pincode;
  // }

  // getCity() {
  //   const { city } = this.props;
  //   let pincode = [];
  //   if (city && city.length) {
  //     city.map((obj) => {
  //       if (obj.zx_level == 5) {
  //         pincode.push({
  //           id: obj.zx_salesterritoryid,
  //           name: obj.zx_territoryname,
  //         });
  //       }
  //     });
  //   }
  //   return pincode;
  // }

  getState() {
    const { subAreas } = this.props;
    let pincode = [];
    if (subAreas && subAreas.length) {
      subAreas.map((obj) => {
        if ({ id: obj.zx_parentstate, name: obj.zx_parentstatename }) {
          pincode.push({
            id: obj.zx_parentstate,
            name: obj.zx_parentstatename,
          });
        }
      });
    }
    let arr = [];
    arr = HelperService.removeDuplicateRecord(pincode);
    return arr;
  }

  getCity() {
    const { subAreas } = this.props;
    let pincode = [];
    if (subAreas && subAreas.length) {
      subAreas.map((obj) => {
        if ({ id: obj.zx_parentcity, name: obj.zx_parentcityname }) {
          pincode.push({
            id: obj.zx_parentcity,
            name: obj.zx_parentcityname,
          });
        }
      });
    }
    let arr = [];
    arr = HelperService.removeDuplicateRecord(pincode);
    return arr;
  }

  getPincode() {
    const { subAreas } = this.props;
    let pincode = [];
    if (subAreas && subAreas.length) {
      subAreas.map((obj) => {
        if ({ id: obj.zx_parentpincode, name: obj.zx_parentpincodename }) {
          pincode.push({
            id: obj.zx_parentpincode,
            name: obj.zx_parentpincodename,
          });
        }
      });
    }
    let arr = [];
    arr = HelperService.removeDuplicateRecord(pincode);
    return arr;
  }

  getArea() {
    const { subAreas } = this.props;
    let pincode = [];
    if (subAreas && subAreas.length) {
      subAreas.map((obj) => {
        if ({ id: obj.Id, name: obj.zx_territoryname }) {
          pincode.push({
            id: obj.Id,
            name: obj.zx_territoryname,
          });
        }
      });
    }
    let arr = [];
    arr = HelperService.removeDuplicateRecord(pincode);
    return arr;
  }

  getDistrict() {
    const { subAreas } = this.props;
    let pincode = [];
    if (subAreas && subAreas.length) {
      subAreas.map((obj) => {
        if ({ id: obj.zx_parentdistrict, name: obj.zx_parentdistrictname }) {
          pincode.push({
            id: obj.zx_parentdistrict,
            name: obj.zx_parentdistrictname,
          });
        }
      });
    }
    let arr = [];
    arr = HelperService.removeDuplicateRecord(pincode);
    return arr;
  }

  getSubstate() {
    const { subAreas } = this.props;
    let pincode = [];
    if (subAreas && subAreas.length) {
      subAreas.map((obj) => {
        if (
          {
            id: obj.zx_parentsubstate,
            name: obj.zx_parentsubstatename,
          }
        ) {
          pincode.push({
            id: obj.zx_parentsubstate,
            name: obj.zx_parentsubstatename,
          });
        }
      });
    }
    let arr = [];
    arr = HelperService.removeDuplicateRecord(pincode);
    return arr;
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

  validatePhoneNumber1(value) {
    let error;
    if (!value) {
      error = "";
    } else if (
      !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value)
    ) {
      error = "Invalid Number";
    }
    return error;
  }

  validateFax(value) {
    let error;
    if (!value) {
      error = "";
    } else if (!/^\+?[0-9]{7,}$/.test(value)) {
      error = "Invalid Fax Number";
    }
    return error;
  }

  render() {
    const {
      distributorForm,
      area,
      getAllAreaLoader,
      validation,
      distributorFormUpdate,
      submitValidation,
      token,
      agentid,
    } = this.props;
    // console.log("showwcommm", this.props.show);
    return (
      <ScrollView style={{ marginBottom: hp("25%") }}>
        <View style={Styles.outerView}>
          {/* <ScrollView style={{marginBottom:"25%"}}> */}

          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Name of the Firm*</Text>
            <InputText
              style={Styles.placeholder}
              placeholder={"Enter Firm Name"}
              // value={distributorForm.item.zx_nameofthefirm?distributorForm.item.zx_nameofthefirm:distributorForm.zx_nameofthefirm}
              value={distributorForm.zx_nameofthefirm}
              // onChange={(value) =>
              //   {distributorForm.item?this.props.changeDistributorForm({
              //     edited_field:"zx_nameofthefirm1",
              //     edited_value: value,
              //   }):this.props.changeDistributorForm({
              //     edited_field:"zx_nameofthefirm",
              //     edited_value: value,
              //   })}
              // }
              onChange={(value) =>
                this.props.changeDistributorForm({
                  edited_field: "zx_nameofthefirm",
                  edited_value: value,
                })
              }
              error={
                validation.invalid &&
                validation.invalid_field == "zx_nameofthefirm"
              }
              editable={
                distributorForm.zx_overallstatus == "Pending for approval" ||
                distributorForm.zx_overallstatus == "Approved"
                  ? false
                  : true
              }
            />
          </View>

          <View>
            <Text style={Styles.textStyle}>Constitution of the Firm*</Text>
          </View>

          <View style={Styles.radoiBtnOuter}>
            <View style={Styles.radioBtnInner}>
              <Text style={Styles.radioText}>Proprietor</Text>
              <Radio
                style={Styles.radioBtn}
                onPress={() => {
                  distributorForm.zx_overallstatus == "Pending for approval" ||
                  distributorForm.zx_overallstatus == "Approved"
                    ? []
                    : this.props.changeDistributorForm({
                        edited_field: "zx_constitutionofthefirm",
                        edited_value: "Proprietor",
                      });
                }}
                disabled={
                  distributorForm.zx_overallstatus == "Pending for approval" ||
                  distributorForm.zx_overallstatus == "Approved"
                    ? true
                    : false
                }
                // selected={false}
                selected={
                  distributorForm.zx_constitutionofthefirm == "Proprietor"
                }
                error={
                  validation.invalid &&
                  validation.invalid_field == "zx_constitutionofthefirm"
                }
                selectedColor={Colors.button}
                color={Colors.button}

                // selected={plannedVisitData.recurring_on == obj.id}
                // onPress={() => {
                // 	editSelectedVisits({id: id, edited_field: 'recurring_on', edited_value: obj.id})
                // 	if (!plannedVisitData.till_date) {
                // 		editSelectedVisits({id: id, edited_field: 'till_date', edited_value: HelperService.getNextNDayTimestamp(30, plannedVisitData.visit_date__c)})
                // 	}

                // }}
              />
            </View>

            <View style={Styles.radioBtnInner}>
              <Text style={Styles.radioText}>Partner</Text>
              <Radio
                style={Styles.radioBtn}
                onPress={() => {
                  distributorForm.zx_overallstatus == "Pending for approval" ||
                  distributorForm.zx_overallstatus == "Approved"
                    ? []
                    : this.props.changeDistributorForm({
                        edited_field: "zx_constitutionofthefirm",
                        edited_value: "Partner",
                      });
                }}
                disabled={
                  distributorForm.zx_overallstatus == "Pending for approval" ||
                  distributorForm.zx_overallstatus == "Approved"
                    ? true
                    : false
                }
                // selected={false}
                selected={distributorForm.zx_constitutionofthefirm == "Partner"}
                selectedColor={Colors.button}
                color={Colors.button}
              />
            </View>

            <View style={Styles.radioBtnInner}>
              <Text style={Styles.radioText}>Private</Text>
              <Radio
                style={Styles.radioBtn}
                onPress={() => {
                  distributorForm.zx_overallstatus == "Pending for approval" ||
                  distributorForm.zx_overallstatus == "Approved"
                    ? []
                    : this.props.changeDistributorForm({
                        edited_field: "zx_constitutionofthefirm",
                        edited_value: "Private",
                      });
                }}
                // selected={false}
                disabled={
                  distributorForm.zx_overallstatus == "Pending for approval" ||
                  distributorForm.zx_overallstatus == "Approved"
                    ? true
                    : false
                }
                selected={distributorForm.zx_constitutionofthefirm == "Private"}
                selectedColor={Colors.button}
                color={Colors.button}
              />
            </View>

            <View style={Styles.radioBtnInner}>
              <Text style={Styles.radioText}>Public</Text>
              <Radio
                style={{ ...Styles.radioBtn, marginLeft: wp("9%") }}
                onPress={() => {
                  distributorForm.zx_overallstatus == "Pending for approval" ||
                  distributorForm.zx_overallstatus == "Approved"
                    ? []
                    : this.props.changeDistributorForm({
                        edited_field: "zx_constitutionofthefirm",
                        edited_value: "Public",
                      });
                }}
                // selected={false}
                disabled={
                  distributorForm.zx_overallstatus == "Pending for approval" ||
                  distributorForm.zx_overallstatus == "Approved"
                    ? true
                    : false
                }
                selected={distributorForm.zx_constitutionofthefirm == "Public"}
                selectedColor={Colors.button}
                color={Colors.button}
              />
            </View>

            <View style={Styles.radioBtnInner}>
              <Text style={Styles.radioText}>Others</Text>
              <Radio
                style={{ ...Styles.radioBtn, marginLeft: wp("4%") }}
                onPress={() => {
                  distributorForm.zx_overallstatus == "Pending for approval" ||
                  distributorForm.zx_overallstatus == "Approved"
                    ? []
                    : this.props.changeDistributorForm({
                        edited_field: "zx_constitutionofthefirm",
                        edited_value: "Others",
                      });
                }}
                // selected={false}
                disabled={
                  distributorForm.zx_overallstatus == "Pending for approval" ||
                  distributorForm.zx_overallstatus == "Approved"
                    ? true
                    : false
                }
                selected={distributorForm.zx_constitutionofthefirm == "Others"}
                selectedColor={Colors.button}
                color={Colors.button}
              />
            </View>
          </View>

          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Name*</Text>
            <InputText
              style={Styles.placeholder}
              placeholder={"Enter Name"}
              value={distributorForm.zx_distributorname}
              onChange={(value) =>
                this.props.changeDistributorForm({
                  edited_field: "zx_distributorname",
                  edited_value: value,
                })
              }
              editable={
                distributorForm.zx_overallstatus == "Pending for approval" ||
                distributorForm.zx_overallstatus == "Approved"
                  ? false
                  : true
              }
              error={
                validation.invalid &&
                validation.invalid_field == "zx_distributorname"
              }
            />
          </View>

          <View style={Styles.textViewdate}>
            <Text style={Styles.textStyle}>Date of Birth</Text>
            <SelectDate
              date={
                distributorForm.zx_dateofbirth
                  ? distributorForm.zx_dateofbirth
                  : null
              }
              maxDate={new Date()}
              disabled={
                distributorForm.zx_overallstatus == "Pending for approval" ||
                distributorForm.zx_overallstatus == "Approved"
                  ? true
                  : false
              }
              onDateChange={(date) =>
                this.props.changeDistributorForm({
                  edited_field: "zx_dateofbirth",
                  edited_value: date,
                })
              }
              error={
                validation.invalid &&
                validation.invalid_field == "zx_dateofbirth"
              }
            />
          </View>

          <View style={{ ...Styles.textViewdate, left: wp("10%") }}>
            <Text style={Styles.textStyle}>Year of Establishment</Text>
            <SelectDate
              date={
                distributorForm.zx_yearofestablishment
                  ? distributorForm.zx_yearofestablishment
                  : null
              }
              maxDate={new Date()}
              disabled={
                distributorForm.zx_overallstatus == "Pending for approval" ||
                distributorForm.zx_overallstatus == "Approved"
                  ? true
                  : false
              }
              onDateChange={(date) =>
                this.props.changeDistributorForm({
                  edited_field: "zx_yearofestablishment",
                  edited_value: date,
                })
              }
              error={
                submitValidation.invalid &&
                submitValidation.invalid_field == "zx_yearofestablishment"
              }
            />
          </View>

          <View>
            <View style={Styles.textView}>
              <Text style={Styles.textStyle}>Mobile no.*</Text>
              <InputMobile
                styles={Styles.placeholder}
                placeholder={"Enter Mobile no."}
                value={distributorForm.zx_mobileno}
                onChange={(value) =>
                  this.props.changeDistributorForm({
                    edited_field: "zx_mobileno",
                    edited_value: value,
                  })
                }
                maxLength={10}
                error={
                  submitValidation.invalid &&
                  submitValidation.invalid_field == "zx_mobileno"
                }
                // label={'Mobile*'}
                editable={
                  distributorForm.zx_overallstatus == "Pending for approval" ||
                  distributorForm.zx_overallstatus == "Approved"
                    ? false
                    : true
                }
              />
            </View>
            <Text style={{ color: "red" }}>
              {this.validatePhoneNumber(distributorForm.zx_mobileno)}
            </Text>
          </View>

          <View>
            <View style={{ ...Styles.textView, left: wp("10%") }}>
              <Text style={Styles.textStyle}>Telephone no.</Text>
              <InputMobile
                styles={Styles.placeholder}
                placeholder={"Enter Telephone no."}
                value={distributorForm.zx_telephoneno}
                onChange={(value) =>
                  this.props.changeDistributorForm({
                    edited_field: "zx_telephoneno",
                    edited_value: value,
                  })
                }
                maxLength={10}
                error={
                  submitValidation.invalid &&
                  submitValidation.invalid_field == "zx_telephoneno"
                }
                // label={'Mobile*'}
                editable={
                  distributorForm.zx_overallstatus == "Pending for approval" ||
                  distributorForm.zx_overallstatus == "Approved"
                    ? false
                    : true
                }
              />
            </View>
            <Text style={{ color: "red", left: wp("10%") }}>
              {this.validatePhoneNumber1(distributorForm.zx_telephoneno)}
            </Text>
          </View>
          <View>
            <View style={Styles.textView}>
              <Text style={{ ...Styles.textStyle }}>Fax no.</Text>
              <InputNumber
                style={Styles.placeholder}
                placeholder={"Enter Fax no."}
                value={distributorForm.zx_faxno}
                onChange={(value) =>
                  this.props.changeDistributorForm({
                    edited_field: "zx_faxno",
                    edited_value: value,
                  })
                }
                editable={
                  distributorForm.zx_overallstatus == "Pending for approval" ||
                  distributorForm.zx_overallstatus == "Approved"
                    ? false
                    : true
                }
                error={
                  submitValidation.invalid &&
                  submitValidation.invalid_field == "zx_faxno"
                }
              />
            </View>
            <Text style={{ color: "red" }}>
              {this.validateFax(distributorForm.zx_faxno)}
            </Text>
          </View>

          <View>
            <View style={{ ...Styles.textView, left: wp("10%") }}>
              <Text style={Styles.textStyle}>Alt. Mobile no.*</Text>
              <InputMobile
                styles={Styles.placeholder}
                placeholder={"Enter mobile no."}
                value={distributorForm.zx_alternatemobileno}
                onChange={(value) =>
                  this.props.changeDistributorForm({
                    edited_field: "zx_alternatemobileno",
                    edited_value: value,
                  })
                }
                maxLength={10}
                error={
                  submitValidation.invalid &&
                  submitValidation.invalid_field == "zx_alternatemobileno"
                }
                // label={'Mobile*'}
                editable={
                  distributorForm.zx_overallstatus == "Pending for approval" ||
                  distributorForm.zx_overallstatus == "Approved"
                    ? false
                    : true
                }
              />
            </View>
            <Text style={{ color: "red", left: wp("10%") }}>
              {this.validatePhoneNumber(distributorForm.zx_alternatemobileno)}
            </Text>
          </View>

          <View>
            <Text style={Styles.titleText}>
              Adderss for Correspondence/billing
            </Text>
          </View>

          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Address1*</Text>
            <InputText
              style={Styles.placeholder}
              placeholder={"Enter Address"}
              value={distributorForm.zx_billingaddress1}
              onChange={(value) =>
                this.props.changeDistributorForm({
                  edited_field: "zx_billingaddress1",
                  edited_value: value,
                })
              }
              error={
                validation.invalid &&
                validation.invalid_field == "zx_billingaddress1"
              }
              editable={
                distributorForm.zx_overallstatus == "Pending for approval" ||
                distributorForm.zx_overallstatus == "Approved"
                  ? false
                  : true
              }
            />
          </View>

          <View style={Styles.textView}>
            <Text style={Styles.textStyle}>Address2*</Text>
            <InputText
              style={{ ...Styles.placeholder }}
              placeholder={"Enter Address"}
              value={distributorForm.zx_billingaddress2}
              onChange={(value) =>
                this.props.changeDistributorForm({
                  edited_field: "zx_billingaddress2",
                  edited_value: value,
                })
              }
              error={
                validation.invalid &&
                validation.invalid_field == "zx_billingaddress2"
              }
              editable={
                distributorForm.zx_overallstatus == "Pending for approval" ||
                distributorForm.zx_overallstatus == "Approved"
                  ? false
                  : true
              }
            />
          </View>
          <View style={{ ...Styles.textView, left: wp("10%") }}>
            <Text style={Styles.textStyle}>State*</Text>
            <SearchableDropdown
              dataSource={this.getState()}
              placeHolderText={"Select State"}
              selectedValue={distributorForm.zx_billingstate}
              onChange={(value) => {
                this.props.changeDistributorForm({
                  edited_field: "zx_billingstate",
                  edited_value: value,
                });
              }}
              placeholder={"Type or Select State"}
              labelStyles={{
                color: Colors.black,
                fontFamily: ApplicationStyles.textFont,
                textAlign: "center",
                //   width: "99%",
                //  padding:5,
                fontSize: 13,
                flexDirection: "row",
              }}
              key={distributorForm.zx_billingstate + _.uniqueId()}
              error={
                validation.invalid &&
                validation.invalid_field == "zx_billingstate"
              }
              disablePicker={
                distributorForm.zx_overallstatus == "Pending for approval" ||
                distributorForm.zx_overallstatus == "Approved"
                  ? true
                  : false
              }
              // invalid={false}
              customPickerStyles={{
                width: "78%",
                marginLeft: 63,
                marginTop: 15,
                borderWidth: 1,
                borderBottomColor: "lightgrey",
                borderColor: "white",
              }}
            />
          </View>

          <View style={Styles.textView}>
            <Text style={Styles.textStyle}>Sub-State*</Text>
            <SearchableDropdown
              dataSource={this.getSubstate()}
              placeHolderText={"Select SubState"}
              selectedValue={distributorForm.zx_substate}
              onChange={(value) => {
                this.props.changeDistributorForm({
                  edited_field: "zx_substate",
                  edited_value: value,
                });
              }}
              placeholder={"Type or Select SubState"}
              labelStyles={{
                color: Colors.black,
                fontFamily: ApplicationStyles.textFont,
                textAlign: "center",
                //   width: "99%",
                //  padding:5,
                fontSize: 13,
                flexDirection: "row",
              }}
              key={distributorForm.zx_substate + _.uniqueId()}
              error={
                validation.invalid && validation.invalid_field == "zx_substate"
              }
              disablePicker={
                distributorForm.zx_overallstatus == "Pending for approval" ||
                distributorForm.zx_overallstatus == "Approved"
                  ? true
                  : false
              }
              // invalid={false}
              customPickerStyles={{
                width: "78%",
                marginLeft: 63,
                marginTop: 15,
                borderWidth: 1,
                borderBottomColor: "lightgrey",
                borderColor: "white",
              }}
            />
          </View>
          <View style={{ ...Styles.textView, left: wp("10%") }}>
            <Text style={Styles.textStyle}>District*</Text>
            <SearchableDropdown
              dataSource={this.getDistrict()}
              placeHolderText={"Select District"}
              selectedValue={distributorForm.zx_district}
              onChange={(value) => {
                this.props.changeDistributorForm({
                  edited_field: "zx_district",
                  edited_value: value,
                });
              }}
              placeholder={"Type or Select District"}
              labelStyles={{
                color: Colors.black,
                fontFamily: ApplicationStyles.textFont,
                textAlign: "center",
                //   width: "99%",
                //  padding:5,
                fontSize: 13,
                flexDirection: "row",
              }}
              key={distributorForm.zx_district + _.uniqueId()}
              error={
                validation.invalid && validation.invalid_field == "zx_district"
              }
              disablePicker={
                distributorForm.zx_overallstatus == "Pending for approval" ||
                distributorForm.zx_overallstatus == "Approved"
                  ? true
                  : false
              }
              // invalid={false}
              customPickerStyles={{
                width: "78%",
                marginLeft: 63,
                marginTop: 15,
                borderWidth: 1,
                borderBottomColor: "lightgrey",
                borderColor: "white",
              }}
            />
          </View>
          <View style={Styles.textView}>
            <Text style={Styles.textStyle}>City*</Text>
            <SearchableDropdown
              dataSource={this.getCity()}
              placeHolderText={"Select City"}
              selectedValue={distributorForm.zx_billingcity}
              onChange={(value) => {
                this.props.changeDistributorForm({
                  edited_field: "zx_billingcity",
                  edited_value: value,
                });
              }}
              placeholder={"Type or Select City"}
              labelStyles={{
                color: Colors.black,
                fontFamily: ApplicationStyles.textFont,
                textAlign: "center",
                //   width: "99%",
                //  padding:5,
                fontSize: 13,
                flexDirection: "row",
              }}
              key={distributorForm.zx_billingcity + _.uniqueId()}
              error={
                validation.invalid &&
                validation.invalid_field == "zx_billingcity"
              }
              disablePicker={
                distributorForm.zx_overallstatus == "Pending for approval" ||
                distributorForm.zx_overallstatus == "Approved"
                  ? true
                  : false
              }
              // invalid={false}
              customPickerStyles={{
                width: "78%",
                marginLeft: 63,
                marginTop: 15,
                borderWidth: 1,
                borderBottomColor: "lightgrey",
                borderColor: "white",
              }}
            />
          </View>
          <View style={{ ...Styles.textView, left: wp("10%") }}>
            <Text style={Styles.textStyle}>Post Code* </Text>
            <SearchableDropdown
              dataSource={this.getPincode()}
              // dataSource={
              //   this.getPincode() && this.getPincode().length
              //     ? this.getPincode()
              //     : [
              //         {
              //           id: distributorForm.zx_billingpostcode,
              //           name: distributorForm.billingpostcodename,
              //         },
              //       ]
              // }
              placeHolderText={"Select Post-Code"}
              selectedValue={distributorForm.zx_billingpostcode}
              onChange={(value) =>
                this.props.changeDistributorForm({
                  edited_field: "zx_billingpostcode",
                  edited_value: value,
                })
              }
              placeholder={"Type or Select Post-Code"}
              labelStyles={{
                color: Colors.black,
                fontFamily: ApplicationStyles.textFont,
                textAlign: "center",
                //   width: "99%",
                //  padding:5,
                fontSize: 13,
                flexDirection: "row",
              }}
              key={distributorForm.zx_billingpostcode + _.uniqueId()}
              error={
                validation.invalid &&
                validation.invalid_field == "zx_billingpostcode"
              }
              disablePicker={
                distributorForm.zx_overallstatus == "Pending for approval" ||
                distributorForm.zx_overallstatus == "Approved"
                  ? true
                  : false
              }
              // invalid={false}
              customPickerStyles={{
                width: "78%",
                marginLeft: 63,
                marginTop: 15,
                borderWidth: 1,
                borderBottomColor: "lightgrey",
                borderColor: "white",
              }}
            />
          </View>

          <View style={Styles.textView}>
            <Text style={Styles.textStyle}>Area*</Text>
            <SearchableDropdown
              dataSource={this.getArea()}
              placeHolderText={"Select Area"}
              selectedValue={distributorForm.zx_area}
              onChange={(value) => {
                this.props.changeDistributorForm({
                  edited_field: "zx_area",
                  edited_value: value,
                });
              }}
              placeholder={"Type or Select Area"}
              labelStyles={{
                color: Colors.black,
                fontFamily: ApplicationStyles.textFont,
                textAlign: "center",
                //   width: "99%",
                //  padding:5,
                fontSize: 13,
                flexDirection: "row",
              }}
              key={distributorForm.zx_area + _.uniqueId()}
              error={
                validation.invalid && validation.invalid_field == "zx_area"
              }
              disablePicker={
                distributorForm.zx_overallstatus == "Pending for approval" ||
                distributorForm.zx_overallstatus == "Approved"
                  ? true
                  : false
              }
              // invalid={false}
              customPickerStyles={{
                width: "78%",
                marginLeft: 63,
                marginTop: 15,
                borderWidth: 1,
                borderBottomColor: "lightgrey",
                borderColor: "white",
              }}
            />
          </View>

          {this.props.show.show ? (
            []
          ) : (
            <View
              style={{
                marginTop: hp("3.5%"),
                flexDirection: "row",
                width: wp("80%"),
              }}
            >
              <Label style={{ marginLeft: wp("1%") }}>{"Same As Above"}</Label>

              <CheckBox
                style={{ marginLeft: wp("2%") }}
                checked={distributorForm.same_as_above == true}
                onPress={(event) => {
                  let updatedValue =
                    distributorForm.same_as_above == true ? false : true;
                  this.props.changeDistributorForm({
                    edited_field: "same_as_above",
                    edited_value: updatedValue,
                  });
                }}
              />
            </View>
          )}

          <View>
            <Text style={{ ...Styles.titleText }}>
              Warehouse/Delivery Address
            </Text>
          </View>

          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Address1*</Text>
            <InputText
              style={Styles.placeholder}
              placeholder={"Enter Address"}
              value={
                distributorForm.same_as_above == true
                  ? distributorForm.zx_billingaddress1
                  : distributorForm.zx_deliveryaddress1
              }
              onChange={(value) =>
                this.props.changeDistributorForm({
                  edited_field:
                    distributorForm.same_as_above == true
                      ? "zx_deliveryaddress1"
                      : "zx_deliveryaddress1",
                  edited_value: value,
                })
              }
              error={
                validation.invalid &&
                validation.invalid_field == "zx_deliveryaddress1"
              }
              editable={
                distributorForm.zx_overallstatus == "Pending for approval" ||
                distributorForm.zx_overallstatus == "Approved"
                  ? false
                  : true
              }
            />
          </View>

          <View style={Styles.textView}>
            <Text style={Styles.textStyle}>Address2*</Text>
            <InputText
              style={Styles.placeholder}
              placeholder={"Enter Address"}
              value={
                distributorForm.same_as_above == true
                  ? distributorForm.zx_billingaddress2
                  : distributorForm.zx_deliveryaddress2
              }
              onChange={(value) =>
                this.props.changeDistributorForm({
                  edited_field:
                    distributorForm.same_as_above == true
                      ? "zx_deliveryaddress2"
                      : "zx_deliveryaddress2",
                  edited_value: value,
                })
              }
              error={
                validation.invalid &&
                validation.invalid_field == "zx_deliveryaddress2"
              }
              editable={
                distributorForm.zx_overallstatus == "Pending for approval" ||
                distributorForm.zx_overallstatus == "Approved"
                  ? false
                  : true
              }
            />
          </View>
          <View style={{ ...Styles.textView, left: wp("10%") }}>
            <Text style={Styles.textStyle}>State*</Text>
            <SearchableDropdown
              dataSource={this.getState()}
              placeHolderText={"Select State"}
              selectedValue={
                distributorForm.same_as_above == true
                  ? distributorForm.zx_billingstate
                  : distributorForm.zx_deliverystate
              }
              onChange={(value) =>
                this.props.changeDistributorForm({
                  edited_field:
                    distributorForm.same_as_above == true
                      ? "zx_deliverystate"
                      : "zx_deliverystate",
                  edited_value: value,
                })
              }
              placeholder={"Type or Select State"}
              labelStyles={{
                color: Colors.black,
                fontFamily: ApplicationStyles.textFont,
                textAlign: "center",
                //   width: "99%",
                //  padding:5,
                fontSize: 13,
                flexDirection: "row",
              }}
              disablePicker={
                distributorForm.zx_overallstatus == "Pending for approval" ||
                distributorForm.zx_overallstatus == "Approved"
                  ? true
                  : false
              }
              // invalid={false}
              error={
                validation.invalid &&
                validation.invalid_field == "zx_deliverystate"
              }
              key={
                distributorForm.same_as_above == true
                  ? distributorForm.zx_billingstate
                  : distributorForm.zx_deliverystate + _.uniqueId()
              }
              customPickerStyles={{
                width: "78%",
                marginLeft: 63,
                marginTop: 15,
                borderWidth: 1,
                borderBottomColor: "lightgrey",
                borderColor: "white",
              }}
            />
          </View>

          <View style={{ ...Styles.textView }}>
            <Text style={Styles.textStyle}>Sub-State*</Text>
            <SearchableDropdown
              dataSource={this.getSubstate()}
              placeHolderText={"Select Sub-State"}
              selectedValue={
                distributorForm.same_as_above == true
                  ? distributorForm.zx_substate
                  : distributorForm.zx_residentialsubstate
              }
              onChange={(value) =>
                this.props.changeDistributorForm({
                  edited_field:
                    distributorForm.same_as_above == true
                      ? "zx_residentialsubstate"
                      : "zx_residentialsubstate",
                  edited_value: value,
                })
              }
              placeholder={"Type or Select Sub-State"}
              labelStyles={{
                color: Colors.black,
                fontFamily: ApplicationStyles.textFont,
                textAlign: "center",
                //   width: "99%",
                //  padding:5,
                fontSize: 13,
                flexDirection: "row",
              }}
              disablePicker={
                distributorForm.zx_overallstatus == "Pending for approval" ||
                distributorForm.zx_overallstatus == "Approved"
                  ? true
                  : false
              }
              // invalid={false}
              error={
                validation.invalid &&
                validation.invalid_field == "zx_residentialsubstate"
              }
              key={
                distributorForm.same_as_above == true
                  ? distributorForm.zx_substate
                  : distributorForm.zx_residentialsubstate + _.uniqueId()
              }
              customPickerStyles={{
                width: "78%",
                marginLeft: 63,
                marginTop: 15,
                borderWidth: 1,
                borderBottomColor: "lightgrey",
                borderColor: "white",
              }}
            />
          </View>

          <View style={{ ...Styles.textView, left: wp("10%") }}>
            <Text style={Styles.textStyle}>District*</Text>
            <SearchableDropdown
              dataSource={this.getDistrict()}
              placeHolderText={"Select District"}
              selectedValue={
                distributorForm.same_as_above == true
                  ? distributorForm.zx_district
                  : distributorForm.zx_residentialdistrict
              }
              onChange={(value) =>
                this.props.changeDistributorForm({
                  edited_field:
                    distributorForm.same_as_above == true
                      ? "zx_residentialdistrict"
                      : "zx_residentialdistrict",
                  edited_value: value,
                })
              }
              placeholder={"Type or Select District"}
              labelStyles={{
                color: Colors.black,
                fontFamily: ApplicationStyles.textFont,
                textAlign: "center",
                //   width: "99%",
                //  padding:5,
                fontSize: 13,
                flexDirection: "row",
              }}
              disablePicker={
                distributorForm.zx_overallstatus == "Pending for approval" ||
                distributorForm.zx_overallstatus == "Approved"
                  ? true
                  : false
              }
              // invalid={false}
              error={
                validation.invalid &&
                validation.invalid_field == "zx_residentialdistrict"
              }
              key={
                distributorForm.same_as_above == true
                  ? distributorForm.zx_district
                  : distributorForm.zx_residentialdistrict + _.uniqueId()
              }
              customPickerStyles={{
                width: "78%",
                marginLeft: 63,
                marginTop: 15,
                borderWidth: 1,
                borderBottomColor: "lightgrey",
                borderColor: "white",
              }}
            />
          </View>

          <View style={Styles.textView}>
            <Text style={Styles.textStyle}>City*</Text>
            <SearchableDropdown
              dataSource={this.getCity()}
              placeHolderText={"Select City"}
              selectedValue={
                distributorForm.same_as_above == true
                  ? distributorForm.zx_billingcity
                  : distributorForm.zx_deliverycity
              }
              onChange={(value) =>
                this.props.changeDistributorForm({
                  edited_field:
                    distributorForm.same_as_above == true
                      ? "zx_deliverycity"
                      : "zx_deliverycity",
                  edited_value: value,
                })
              }
              placeholder={"Type or Select City"}
              labelStyles={{
                color: Colors.black,
                fontFamily: ApplicationStyles.textFont,
                textAlign: "center",
                //   width: "99%",
                //  padding:5,
                fontSize: 13,
                flexDirection: "row",
              }}
              disablePicker={
                distributorForm.zx_overallstatus == "Pending for approval" ||
                distributorForm.zx_overallstatus == "Approved"
                  ? true
                  : false
              }
              // invalid={false}
              error={
                validation.invalid &&
                validation.invalid_field == "zx_deliverycity"
              }
              key={
                distributorForm.same_as_above == true
                  ? distributorForm.zx_billingcity
                  : distributorForm.zx_deliverycity + _.uniqueId()
              }
              customPickerStyles={{
                width: "78%",
                marginLeft: 63,
                marginTop: 15,
                borderWidth: 1,
                borderBottomColor: "lightgrey",
                borderColor: "white",
              }}
            />
          </View>

          <View style={{ ...Styles.textView, left: wp("10%") }}>
            <Text style={Styles.textStyle}>Post Code* </Text>
            <SearchableDropdown
              dataSource={this.getPincode()}
              placeHolderText={"Select Post Code"}
              selectedValue={
                distributorForm.same_as_above == true
                  ? distributorForm.zx_billingpostcode
                  : distributorForm.zx_deliverypostcode
              }
              onChange={(value) =>
                this.props.changeDistributorForm({
                  edited_field:
                    distributorForm.same_as_above == true
                      ? "zx_deliverypostcode"
                      : "zx_deliverypostcode",
                  edited_value: value,
                })
              }
              placeholder={"Type or Select Post Code"}
              labelStyles={{
                color: Colors.black,
                fontFamily: ApplicationStyles.textFont,
                textAlign: "center",
                //   width: "99%",
                //  padding:5,
                fontSize: 13,
                flexDirection: "row",
              }}
              disablePicker={
                distributorForm.zx_overallstatus == "Pending for approval" ||
                distributorForm.zx_overallstatus == "Approved"
                  ? true
                  : false
              }
              // invalid={false}
              error={
                validation.invalid &&
                validation.invalid_field == "zx_deliverypostcode"
              }
              key={
                distributorForm.same_as_above == true
                  ? distributorForm.zx_billingpostcode
                  : distributorForm.zx_deliverypostcode + _.uniqueId()
              }
              customPickerStyles={{
                width: "78%",
                marginLeft: 63,
                marginTop: 15,
                borderWidth: 1,
                borderBottomColor: "lightgrey",
                borderColor: "white",
              }}
            />
          </View>
          <View style={{ ...Styles.textView }}>
            <Text style={Styles.textStyle}>Area* </Text>
            <SearchableDropdown
              dataSource={this.getArea()}
              placeHolderText={"Select Area"}
              selectedValue={
                distributorForm.same_as_above == true
                  ? distributorForm.zx_area
                  : distributorForm.zx_residentialarea
              }
              onChange={(value) =>
                this.props.changeDistributorForm({
                  edited_field:
                    distributorForm.same_as_above == true
                      ? "zx_residentialarea"
                      : "zx_residentialarea",
                  edited_value: value,
                })
              }
              placeholder={"Type or Select Area"}
              labelStyles={{
                color: Colors.black,
                fontFamily: ApplicationStyles.textFont,
                textAlign: "center",
                //   width: "99%",
                //  padding:5,
                fontSize: 13,
                flexDirection: "row",
              }}
              disablePicker={
                distributorForm.zx_overallstatus == "Pending for approval" ||
                distributorForm.zx_overallstatus == "Approved"
                  ? true
                  : false
              }
              // invalid={false}
              error={
                validation.invalid &&
                validation.invalid_field == "zx_residentialarea"
              }
              key={
                distributorForm.same_as_above == true
                  ? distributorForm.zx_area
                  : distributorForm.zx_residentialarea + _.uniqueId()
              }
              customPickerStyles={{
                width: "78%",
                marginLeft: 63,
                marginTop: 15,
                borderWidth: 1,
                borderBottomColor: "lightgrey",
                borderColor: "white",
              }}
            />
          </View>
          {/* </ScrollView> */}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    agentid: state.user.id,
    area: state.distributor.getArea,
    distributorForm: state.distributor.distributorForm,
    getAllAreaLoader: state.distributor.getAllAreaLoader,
    validation: state.distributor.distributorFormValidation,
    distributorFormUpdate: state.distributor.distributorFormUpdate,
    submitValidation: state.distributor.submitDistributorFormValidation,
    pincode: state.distributor.getPincode,
    state: state.distributor.getState,
    city: state.distributor.getCity,
    subAreas: state.user.subAreas,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeDistributorForm: (params) =>
    dispatch(DistributorActions.changeDistributorForm(params)),
  submitSelectedDistributorForm: (params) =>
    dispatch(DistributorActions.submitSelectedDistributorForm(params)),
  getAllState: (params) => dispatch(DistributorActions.getAllState(params)),
  getAllCity: (params) => dispatch(DistributorActions.getAllCity(params)),
  getAllPincode: (params) => dispatch(DistributorActions.getAllPincode(params)),
  clearDistributorForm: () =>
    dispatch(DistributorActions.clearDistributorForm()),
  submitDistributorFormValidationFailed: (params) =>
    dispatch(DistributorActions.submitDistributorFormValidationFailed(params)),
  getSubArea: (params) => dispatch(UserActions.getSubArea(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Communication);
