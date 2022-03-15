import React, { Component } from "react";
import CommonActions from "App/Stores/Common/Actions";
import RetailersActions from "App/Stores/Retailers/Actions";
import { connect } from "react-redux";
import DistributorActions from "App/Stores/Distributor/Actions";

import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableHighlight,
  ScrollView,
  Alert,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from "react-native";
import BackArrowButton from "App/Components/BackArrowButton";
import { ApplicationStyles, Colors } from "App/Theme";
import { Card } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import SearchBar from "App/Components/SearchBar";
import GenericIcon from "App/Components/GenericIcon";
import NavigationService from "App/Services/NavigationService";
import Styles from "./CustomerInfoStyles";
import InputText from "App/Components/FormInput/InputText";
import BlueButton from "../../../Components/BlueButton/BlueButton";
import SelectDate from "../../../Components/SelectDate/SelectDate";
import SearchableDropdown from "App/Components/SearchableDropdown";
import ImageUploaderScreen from "../../Retailers/NewRetailer/ImageUploaderScreen";
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
import _ from "lodash";
import { HelperService } from "App/Services/Utils/HelperService";
import InputNumber from "App/Components/FormInput/InputNumber";
import InputMobile from "App/Components/FormInput/InputMobile";
import Loading from "App/Components/Loading";
import MultipleImagePicker from "../../../Components/ImagePicker/MultipleImagePicker";
import ToggleSwitch from "rn-toggle-switch";
import Modal from "react-native-modal";
import ToggleButton from "../../../Components/ToggleButton/ToggleButton";
import ImageSlider from "../../../Components/Imageslide";
import GenericDisplayCardStrip from "App/Components/GenericDisplayCard/GenericDisplayCardStrip";

class CustomerInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
    };
  }
  componentDidMount() {
    const { token, list } = this.props;
    this.props.getCustomerInfo({
      token,
      customerId: this.props.item.id,
    });
  }

  fetchCall() {
    const { token } = this.props;
    this.props.getCustomerInfo({
      token,
      customerId: this.props.item.id,
    });
  }

  getPincode() {
    const { area } = this.props;
    let pincode = [];
    if (area && area.length) {
      area.map((obj) => {
        if (obj.zx_level == 6) {
          pincode.push({
            id: obj.zx_salesterritoryid,
            name: obj.zx_territoryname,
          });
        }
      });
    }
    return pincode;
  }

  getState() {
    const { pincodeInfo } = this.props;
    let pincode = [];
    if (pincodeInfo && pincodeInfo.length) {
      pincodeInfo.map((obj) => {
        if ({ id: obj.zx_parentstate, name: obj.zx_parentstateTerritoryname }) {
          pincode.push({
            id: obj.zx_parentstate,
            name: obj.zx_parentstateTerritoryname,
          });
        }
      });
    }
    return pincode;
  }

  getCity() {
    const { pincodeInfo } = this.props;
    let pincode = [];
    if (pincodeInfo && pincodeInfo.length) {
      pincodeInfo.map((obj) => {
        if ({ id: obj.zx_parentcity, name: obj.zx_parentcityTerritoryname }) {
          pincode.push({
            id: obj.zx_parentcity,
            name: obj.zx_parentcityTerritoryname,
          });
        }
      });
    }
    return pincode;
  }

  getDistrict() {
    const { pincodeInfo } = this.props;
    let pincode = [];
    if (pincodeInfo && pincodeInfo.length) {
      pincodeInfo.map((obj) => {
        if (
          {
            id: obj.zx_parentdistrict,
            name: obj.zx_parentdistrictTerritoryname,
          }
        ) {
          pincode.push({
            id: obj.zx_parentdistrict,
            name: obj.zx_parentdistrictTerritoryname,
          });
        }
      });
    }
    return pincode;
  }

  getZone() {
    const { pincodeInfo } = this.props;
    let pincode = [];
    if (pincodeInfo && pincodeInfo.length) {
      pincodeInfo.map((obj) => {
        if ({ id: obj.zx_parentzone, name: obj.zx_parentzoneTerritoryname }) {
          pincode.push({
            id: obj.zx_parentzone,
            name: obj.zx_parentzoneTerritoryname,
          });
        }
      });
    }
    return pincode;
  }

  getSubState() {
    const { pincodeInfo } = this.props;
    let pincode = [];
    if (pincodeInfo && pincodeInfo.length) {
      pincodeInfo.map((obj) => {
        if (
          {
            id: obj.zx_parentsubstate,
            name: obj.zx_parentsubstateTerritoryname,
          }
        ) {
          pincode.push({
            id: obj.zx_parentsubstate,
            name: obj.zx_parentsubstateTerritoryname,
          });
        }
      });
    }
    return pincode;
  }

  getArea() {
    const { areaInfo } = this.props;
    let pincode = [];
    if (areaInfo && areaInfo.length) {
      areaInfo.map((obj) => {
        if ({ id: obj.zx_salesterritoryid, name: obj.zx_territoryname }) {
          pincode.push({
            id: obj.zx_salesterritoryid,
            name: obj.zx_territoryname,
          });
        }
      });
    }
    return pincode;
  }
  getAge() {
    const { retailerForm } = this.props;
    var today = new Date();
    var birthDate = new Date(retailerForm.zx_dateofbirth);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
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

  validateEmail(value) {
    let error;
    if (!value) {
      error = "";
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      error = "Invalid Email";
    }
    return error;
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

  validatePan(value) {
    let error;
    if (!value) {
      error = "Required";
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

  validateDL(value) {
    let error;
    if (!value) {
      error = "";
    } else if (
      !/^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/.test(
        value
      )
    ) {
      error = "Invalid DL Number";
    }
    return error;
  }

  validateVoterId(value) {
    let error;
    if (!value) {
      error = "";
    } else if (!/^([a-zA-Z]){3}([0-9]){7}?$/.test(value)) {
      error = "Invalid Voter Id Number";
    }
    return error;
  }

  getImage() {
    const { list } = this.props;
    let globArr = [];
    let arr = list[0] && list[0].zx_gstpanimage;
    if (arr) {
      let answ = arr.split(",");
      answ.forEach(function(obj) {
        globArr.push(obj);
      });
    }
    // console.log(globArr);
    return globArr;
  }

  getImage1() {
    const { list } = this.props;
    let globArr = [];
    let arr = list[0] && list[0].zx_shopimage_url;
    if (arr) {
      let answ = arr.split(",");
      answ.forEach(function(obj) {
        globArr.push(obj);
      });
    }
    // console.log(globArr);
    return globArr;
  }

  getImage2() {
    const { list } = this.props;
    let globArr = [];
    let arr = list[0] && list[0].zx_visitingcard;
    if (arr) {
      let answ = arr.split(",");
      answ.forEach(function(obj) {
        globArr.push(obj);
      });
    }
    // console.log(globArr);
    return globArr;
  }
  render() {
    // let onSelectSwitch = index => {
    //   alert('Selected index: ' + index);
    // };
    const {
      retailerForm,
      validation,
      selectReason,
      list,
      details,
      status,
      loader,
      accountStatus,
      token,
      updateStatus,
      changePffAutomation,
      customerPffAutomation,
      changeHoldActive,
      holdActive,
      customerStatus,
      load,
      showCustomerModal,
      hideCustomerModal,
      isModalVisible,
      uploadImageField,
      uploadImageLoader,
      uploadImage,
      code,
      openModal,
    } = this.props;

    let form1 = {
      id: list[0] ? list[0].Id : "",
      name: retailerForm.name ? retailerForm.name : "",
      zx_firstname: retailerForm.zx_firstname ? retailerForm.zx_firstname : "",
      zx_lastname: "abc",
      zx_accounttype: "Retailer",
      zx_udaannumber: retailerForm.zx_udaannumber,
      zx_alternatemobileno: retailerForm.zx_alternatemobileno,
      telephone1: retailerForm.telephone1 ? retailerForm.telephone1 : "",
      emailaddress1: retailerForm.emailaddress1
        ? retailerForm.emailaddress1
        : "",
      address1_line1: retailerForm.address1_line1
        ? retailerForm.address1_line1
        : "",
      address1_line2: retailerForm.address1_line2
        ? retailerForm.address1_line2
        : "",
      zx_dateofbirth: retailerForm.zx_dateofbirth
        ? HelperService.convertMomentDateToTimestamp(
            retailerForm.zx_dateofbirth
          )
        : "",
      zx_landmark: retailerForm.zx_landmark ? retailerForm.zx_landmark : "",
      zx_residencenumber: retailerForm.zx_residencenumber
        ? retailerForm.zx_residencenumber
        : "",
      zx_residentialaddress1: retailerForm.zx_residentialaddress1
        ? retailerForm.zx_residentialaddress1
        : "",
      zx_residentiallandmark: retailerForm.zx_residentiallandmark
        ? retailerForm.zx_residentiallandmark
        : "",
      zx_Residentialpincode1: retailerForm.zx_Residentialpincode1
        ? retailerForm.zx_Residentialarea1
        : list[0]
        ? list[0].zx_pincode
        : null,
      zx_Residentialarea1: retailerForm.zx_Residentialarea1
        ? retailerForm.zx_Residentialarea1
        : list[0]
        ? list[0].zx_area
        : null,
      zx_residentialcity1: retailerForm.zx_residentialcity1
        ? retailerForm.zx_residentialcity1
        : list[0]
        ? list[0].zx_city
        : null,
      zx_Residentialdistrict1: retailerForm.zx_Residentialdistrict1
        ? retailerForm.zx_Residentialdistrict1
        : list[0]
        ? list[0].zx_district
        : null,
      zx_Residentialstate1: retailerForm.zx_Residentialstate1
        ? retailerForm.zx_Residentialstate1
        : list[0]
        ? list[0].zx_state
        : null,
      zx_Residentialzone1: retailerForm.zx_Residentialzone1
        ? retailerForm.zx_Residentialzone1
        : list[0]
        ? list[0].zx_zone
        : null,
      zx_Residentialsubstate1: retailerForm.zx_Residentialsubstate1
        ? retailerForm.zx_Residentialsubstate1
        : list[0]
        ? list[0].zx_substate
        : null,
      zx_age: retailerForm.zx_age ? retailerForm.zx_age : "",
      zx_dateofanniversary: retailerForm.zx_dateofanniversary
        ? HelperService.convertMomentDateToTimestamp(
            retailerForm.zx_dateofanniversary
          )
        : "",
      zx_noofchildren: retailerForm.zx_noofchildren
        ? retailerForm.zx_noofchildren
        : "",
      zx_education: retailerForm.zx_education ? retailerForm.zx_education : "",
      zx_language: "b0e024c8-8c2c-40e5-a665-7598b4cf61e3",
      zx_languageforwriting: "f4970a12-0fac-4a5c-bdff-fa7b9a21e1e0",
      zx_gstno: retailerForm.zx_gstno ? retailerForm.zx_gstno : "",
      zx_panno: retailerForm.zx_panno ? retailerForm.zx_panno : "",
      zx_aadharnumber: retailerForm.zx_aadharnumber
        ? retailerForm.zx_aadharnumber
        : "",
      zx_drivinglicensenumber: retailerForm.zx_drivinglicensenumber
        ? retailerForm.zx_drivinglicensenumber
        : "",
      zx_voteridnumber: retailerForm.zx_voteridnumber
        ? retailerForm.zx_voteridnumber
        : "",
      zx_shopimageid: "bf11cc7a-5508-4ffa-bb58-29c3d8cae4ff",
      zx_visitingcard: "78uyhj",
      zx_gstpanimage: "788yh8",
      zx_registereddate: "943986600000",
      zx_udaanstatus: retailerForm.zx_udaanstatus
        ? retailerForm.zx_udaanstatus
        : null,
      zx_enrolledinubs: retailerForm.zx_enrolledinubs
        ? retailerForm.zx_enrolledinubs
        : null,
      zx_remarks: retailerForm.zx_remarks ? retailerForm.zx_remarks : "",
      zx_status: retailerForm.zx_status ? retailerForm.zx_status : null,
      zx_saletype: retailerForm.zx_saletype ? retailerForm.zx_saletype : null,
      zx_reasonfornotsellingprinceproducts: retailerForm.zx_reasonfornotsellingprinceproducts
        ? retailerForm.zx_reasonfornotsellingprinceproducts
        : null,
      zx_pincode: retailerForm.zx_pincode
        ? retailerForm.zx_pincode
        : list[0]
        ? list[0].zx_pincode
        : null,
      zx_area: retailerForm.zx_area
        ? retailerForm.zx_area
        : list[0]
        ? list[0].zx_area
        : null,
      zx_city: retailerForm.zx_city
        ? retailerForm.zx_city
        : list[0]
        ? list[0].zx_city
        : null,
      zx_district: retailerForm.zx_district
        ? retailerForm.zx_district
        : list[0]
        ? list[0].zx_district
        : null,
      zx_substate: retailerForm.zx_substate
        ? retailerForm.zx_substate
        : list[0]
        ? list[0].zx_substate
        : null,
      zx_state: retailerForm.zx_state
        ? retailerForm.zx_state
        : list[0]
        ? list[0].zx_state
        : null,
      zx_zone: retailerForm.zx_zone
        ? retailerForm.zx_zone
        : list[0]
        ? list[0].zx_zone
        : null,
      zx_paymentterm: retailerForm.zx_paymentterm
        ? retailerForm.zx_paymentterm
        : "",
      zx_countertype: retailerForm.zx_countertype
        ? retailerForm.zx_countertype
        : null,
      zx_businessline: retailerForm.zx_businessline
        ? retailerForm.zx_businessline
        : null,
      zx_valueofbusinesslineslakhspa: retailerForm.zx_valueofbusinesslineslakhspa
        ? retailerForm.zx_valueofbusinesslineslakhspa
        : "",
      address1_latitude: 7.909,
      address1_longitude: 5.99,
    };

    let forms = {
      id: this.props.guId,
      zx_activationstatus:
        status.zx_activationstatus == false ? "Deactivate" : "Activate",
      zx_ActivatedDeactivatedby: this.props.agentid,
      zx_activationanddeactivatonreason:
        status.zx_activationanddeactivatonreason,
    };

    let forms1 = {
      id: this.props.guId,
      zx_status: updateStatus.zx_status == false ? "Non PPF" : "PPF",
      zx_PPFNonPPFStatusChangedby: this.props.agentid,
      zx_remarksforchangingppfnonppfstatus:
        updateStatus.zx_remarksforchangingppfnonppfstatus,
    };

    let form2 = {
      id: this.props.guId,
      zx_customerstatus:
        holdActive.zx_customerstatus == false ? "Active" : "Hold",
      zx_customerstatuschangedby: this.props.agentid,
      zx_remarksforchangingppfnonppfstatus:
        holdActive.zx_remarksforchangingppfnonppfstatus,
    };
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.props.getCustomerInfoLoader}
            onRefresh={() => {
              this.fetchCall();
            }}
          />
        }
        style={{ top: hp("-5%") }}
      >
        <View style={Styles.outerView}>
          {this.props.getCustomerInfoLoader ? null : (
            <View style={{ left: wp("2%"), marginTop: hp("2%") }}>
              <ToggleButton
                selectionMode={
                  list[0] &&
                  list[0].zx_activationstatus &&
                  list[0].zx_activationstatus == "Activate"
                    ? true
                    : false
                }
                roundCorner={true}
                option1={"Activate"}
                option2={"Deactivate"}
                disable={this.props.getshow ? false : true}
                //  isEnabled={list[0] && list[0].zx_customerstatus == "Hold" ? true : false}
                // onSelectSwitch={(value) => {
                //   this.props.changeAccountStatus({
                //     edited_field: "zx_activationstatus",
                //     edited_value: value,
                //   });
                //   this.props.showModal();
                // }}
                selectionColor={
                  code.zx_brandgroupcode == "1" ? "#ed1b24" : "#018EBC"
                }
              />
            </View>
          )}
          {/* <Modal isVisible={this.props.showmodal} transparent={true}>
            <View
              style={{
                backgroundColor: "white",
                height: hp("31%"),
                borderRadius: 10,
              }}
            >
              <TouchableOpacity onPress={() => this.props.closeModal()}>
                <Text
                  style={{
                    fontSize: 20,
                    marginLeft: hp("42%"),
                    fontWeight: "bold",
                  }}
                >
                  X
                </Text>
              </TouchableOpacity>
              <SearchableDropdown
                dataSource={[
                  { id: "Price", name: "Price" },
                  { id: "Margin/Profitability", name: "Margin/Profitability" },
                  {
                    id: "Influencers/Market Demand",
                    name: "Influencers/Market Demand",
                  },
                  { id: "Visibility of Brand", name: "Visibility of Brand" },
                  {
                    id: "Timely Availability of Material",
                    name: "Timely Availability of Material",
                  },
                  { id: "Awareness of Brand", name: "Awareness of Brand" },
                  {
                    id: "Distributor Relationship",
                    name: "Distributor Relationship",
                  },
                  {
                    id: "Sales Person Relationship",
                    name: "Sales Person Relationship",
                  },
                  {
                    id: "Quality of the Product",
                    name: "Quality of the Product",
                  },
                  {
                    id: "Approval or Non-Approval of Brand",
                    name: "Approval or Non-Approval of Brand",
                  },
                  {
                    id: "Transparency/Ease of Transactions",
                    name: "Transparency/Ease of Transactions",
                  },
                  { id: "Product Range", name: "Product Range" },
                  {
                    id: "Secondary sales from Sales Team",
                    name: "Secondary sales from Sales Team",
                  },
                  { id: "Schemes", name: "Schemes" },
                  { id: "Credit Period", name: "Credit Period" },
                ]}
                placeHolderText={"Select Reason"}
                selectedValue={status.zx_activationanddeactivatonreason}
                // // selectedValue={data.sfid == form.id ? form.colour__c : ''}
                onChange={(value) =>
                  this.props.changeAccountStatus({
                    edited_field: "zx_activationanddeactivatonreason",
                    edited_value: value,
                  })
                }
                placeholder={"Select Reason"}
                invalid={false}
                labelStyles={{
                  color: Colors.black,
                  fontFamily: ApplicationStyles.textFont,
                  textAlign: "center",
                  //  width: "99%",
                  //  padding:5,
                  fontSize: 13,
                  flexDirection: "row",
                }}
                label={"Select Reason"}
                headerStyle={{
                  fontFamily: ApplicationStyles.textMsgFont,
                  color: Colors.black,
                  fontSize: wp("4.4%"),
                  // marginBottom: wp('3%'),
                  width: "106%",
                  textAlign: "left",
                  marginLeft: wp("30%"),
                }}
                customPickerStyles={{
                  // borderRadius: 5,
                  width: "73%",
                  height: hp("4.5%"),
                  elevation: 5,
                  // marginTop:hp("-5%"),

                  marginBottom: hp("9%"),
                  // paddingHorizontal: 0,
                  marginLeft: wp("26%"),
                  backgroundColor: Colors.white,
                  borderWidth: 1,
                }}
                // key={form.id}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.background,
                  width: wp("30%"),
                  height: "13%",
                  borderRadius: 5,
                  top: hp("-5%"),
                  alignSelf: "center",
                }}
                onPress={() => {
                  this.props.status.zx_activationanddeactivatonreason
                    ? this.props.accountStatus({ form: forms, token })
                    : HelperService.showToast({
                        message: "Please Select Reason",
                        duration: 1000,
                        buttonText: "",
                      });
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 17,
                    fontWeight: "bold",
                    textAlign: "center",
                    top: hp("0.5%"),
                  }}
                >
                  SUBMIT
                </Text>
              </TouchableOpacity>
            </View>
          </Modal> */}

          {this.props.getCustomerInfoLoader ? null : (
            <View style={{ left: wp("7%"), marginTop: hp("2%") }}>
              <ToggleButton
                selectionMode={
                  list[0] &&
                  list[0].zx_customerstatus &&
                  list[0].zx_customerstatus == "Hold"
                    ? true
                    : false
                }
                roundCorner={true}
                option1={"Hold"}
                option2={"Active"}
                disable={this.props.getshow ? false : true}
                //  isEnabled={list[0] && list[0].zx_customerstatus == "Hold" ? true : false}
                onSelectSwitch={(value) => {
                  {
                    this.props.changeHoldActive({
                      edited_field: "zx_customerstatus",
                      edited_value: value,
                    });
                  }
                  this.props.showModalHold();
                }}
                selectionColor={
                  code.zx_brandgroupcode == "1" ? "#ed1b24" : "#018EBC"
                }
              />
            </View>
          )}
          {/* <Modal isVisible={this.props.showmodalhold} transparent={true}>
            <View
              style={{
                backgroundColor: "white",
                height: hp("31%"),
                borderRadius: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.props.closeModalHold();
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    marginLeft: hp("42%"),
                    fontWeight: "bold",
                  }}
                >
                  X
                </Text>
              </TouchableOpacity>

              <Text
                style={{
                  textAlign: "center",
                  fontSize: 17,
                  fontWeight: "bold",
                  top: "-2%",
                }}
              >
                Enter Reason
              </Text>
              <TextInput
                style={{
                  height: hp("10%"),
                  top: "1%",
                  borderRadius: 5,
                  width: wp("80%"),
                  borderColor: "black",
                  borderWidth: 1,
                  alignSelf: "center",
                }}
                placeholder={"Enter Reason"}
                maxLength={250}
                multiline={true}
                value={holdActive.zx_remarksforchangingppfnonppfstatus}
                onChange={(value) =>
                  changeHoldActive({
                    edited_field: "zx_remarksforchangingppfnonppfstatus",
                    edited_value: value,
                  })
                }
              />
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.background,
                  width: wp("30%"),
                  height: "13%",
                  borderRadius: 5,
                  top: hp("3%"),
                  alignSelf: "center",
                }}
                onPress={() => {
                  this.props.holdActive.zx_remarksforchangingppfnonppfstatus
                    ? this.props.customerStatus({ form: form2, token })
                    : HelperService.showToast({
                        message: "Please Enter Reason",
                        duration: 1000,
                        buttonText: "",
                      });
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 17,
                    fontWeight: "bold",
                    textAlign: "center",
                    top: hp("0.5%"),
                  }}
                >
                  SUBMIT
                </Text>
              </TouchableOpacity>
            </View>
          </Modal> */}
          {this.props.getCustomerInfoLoader ? null : (
            <View style={{ left: wp("2.5%"), marginTop: hp("2%") }}>
              <ToggleButton
                selectionMode={
                  list[0] && list[0].zx_status && list[0].zx_status == "PPF"
                    ? true
                    : false
                }
                roundCorner={true}
                option1={"PPF"}
                option2={"Non PPF"}
                disable={this.props.getshow ? false : true}
                //  isEnabled={list[0] && list[0].zx_customerstatus == "Hold" ? true : false}
                onSelectSwitch={(value) => {
                  this.props.changePffAutomation({
                    edited_field: "zx_status",
                    edited_value: value,
                  });
                  this.props.showModalPpf();
                }}
                selectionColor={
                  code.zx_brandgroupcode == "1" ? "#ed1b24" : "#018EBC"
                }
              />
            </View>
          )}
          {/* <Modal isVisible={this.props.showmodalppf} transparent={true}>
            <View
              style={{
                backgroundColor: "white",
                height: hp("31%"),
                borderRadius: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.props.closeModalPpf();
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    marginLeft: hp("42%"),
                    fontWeight: "bold",
                  }}
                >
                  X
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 17,
                  fontWeight: "bold",
                  top: "-2%",
                }}
              >
                Enter Reason
              </Text>

              <TextInput
                style={{
                  height: hp("10%"),
                  top: "1%",
                  borderRadius: 5,
                  width: wp("80%"),
                  borderColor: "black",
                  borderWidth: 1,
                  alignSelf: "center",
                }}
                placeholder={"Enter Reason"}
                value={updateStatus.zx_remarksforchangingppfnonppfstatus}
                onChange={(value) =>
                  changePffAutomation({
                    edited_field: "zx_remarksforchangingppfnonppfstatus",
                    edited_value: value,
                  })
                }
              />
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.background,
                  width: wp("30%"),
                  height: "13%",
                  borderRadius: 5,
                  top: hp("3%"),
                  alignSelf: "center",
                }}
                onPress={() => {
                  this.props.updateStatus.zx_remarksforchangingppfnonppfstatus
                    ? this.props.customerPffAutomation({ form: forms1, token })
                    : HelperService.showToast({
                        message: "Please Enter Reason",
                        duration: 1000,
                        buttonText: "",
                      });
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 17,
                    fontWeight: "bold",
                    textAlign: "center",
                    top: hp("0.5%"),
                  }}
                >
                  SUBMIT
                </Text>
              </TouchableOpacity>
            </View>
          </Modal> */}
          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Firm Name</Text>
            <Text style={Styles.placeholder}>
              {retailerForm.name
                ? retailerForm.name
                : list[0] && list[0].name
                ? list[0].name
                : ""}
            </Text>
          </View>

          <View style={Styles.textView}>
            <Text style={Styles.textStyle}>First Name</Text>
            <Text style={Styles.placeholder}>
              {retailerForm.zx_firstname
                ? retailerForm.zx_firstname
                : list[0] && list[0].zx_firstname
                ? list[0].zx_firstname
                : "NA"}
            </Text>
          </View>

          <View style={{ ...Styles.textView, left: wp("10%") }}>
            <Text style={Styles.textStyle}>Last Name</Text>
            <Text style={Styles.placeholder}>
              {retailerForm.zx_lastname
                ? retailerForm.zx_lastname
                : list[0] && list[0].zx_lastname
                ? list[0].zx_lastname
                : "NA"}
            </Text>
          </View>

          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>
              Mobile Number(UDAAN No. to capture)
            </Text>
            <Text style={Styles.placeholder}>
              {retailerForm.zx_udaannumber
                ? retailerForm.zx_udaannumber
                : list[0] && list[0].zx_udaannumber
                ? list[0].zx_udaannumber
                : "NA"}
            </Text>
          </View>
          {/* <Text style={{ color: "red" }}>
            {this.validatePhoneNumber(retailerForm.zx_udaannumber)}
          </Text> */}

          <View style={Styles.textView}>
            <Text style={Styles.textStyle}>Landline No.</Text>
            <Text style={Styles.placeholder}>
              {retailerForm.telephone1
                ? retailerForm.telephone1
                : list[0] && list[0].telephone1
                ? list[0].telephone1
                : "NA"}
            </Text>
          </View>
          <View style={{ ...Styles.textView, left: wp("10%") }}>
            <Text style={Styles.textStyle}>Alternate No.</Text>
            <Text style={Styles.placeholder}>
              {retailerForm.zx_alternatemobileno
                ? retailerForm.zx_alternatemobileno
                : list[0] && list[0].zx_alternatemobileno
                ? list[0].zx_alternatemobileno
                : "NA"}
            </Text>
          </View>
          {/* <Text style={{ color: "red" }}>
            {this.validatePhoneNumber(retailerForm.zx_alternatemobileno)}
          </Text> */}

          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Email Id</Text>
            <Text style={Styles.placeholder}>
              {retailerForm.emailaddress1
                ? retailerForm.emailaddress1
                : list[0] && list[0].emailaddress1
                ? list[0].emailaddress1
                : "NA"}
            </Text>
          </View>

          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Address 1*</Text>
            <Text style={Styles.placeholder}>
              {retailerForm.address1_line1
                ? retailerForm.address1_line1
                : list[0] && list[0].address1_line1
                ? list[0].address1_line1
                : "NA"}
            </Text>
          </View>

          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Address 2*</Text>
            <Text style={Styles.placeholder}>
              {retailerForm.address1_line2
                ? retailerForm.address1_line2
                : list[0] && list[0].address1_line2
                ? list[0].address1_line2
                : "NA"}
            </Text>
          </View>

          {/* <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>Address 2*</Text>
              <InputText
                style={Styles.placeholder}
                placeholder={"Enter Address 2"}
                value={retailerForm.address}
                onChange={(value) =>
                  this.props.changeRetailerForm({
                    edited_field: "address",
                    edited_value: value,
                  })
                }
              />
            </View> */}

          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Landmark</Text>
            <Text style={Styles.placeholder}>
              {retailerForm.zx_landmark
                ? retailerForm.zx_landmark
                : list[0] && list[0].zx_landmark
                ? list[0].zx_landmark
                : "NA"}
            </Text>
          </View>

          <View style={Styles.textView}>
            <Text style={Styles.textStyle}>Pin Code</Text>
            <Text style={Styles.placeholder}>
              {retailerForm.pincodeName
                ? retailerForm.pincodeName
                : list[0] && list[0].pincodeName
                ? list[0].pincodeName
                : "NA"}
            </Text>
          </View>

          <View style={{ ...Styles.textView, left: wp("10%") }}>
            <Text style={Styles.textStyle}>City/Town</Text>
            <Text style={Styles.placeholder}>
              {retailerForm.cityName
                ? retailerForm.cityName
                : list[0] && list[0].cityname
                ? list[0].cityname
                : "NA"}
            </Text>
          </View>

          <View style={Styles.textView}>
            <Text style={Styles.textStyle}>District</Text>
            <Text style={Styles.placeholder}>
              {retailerForm.districtName
                ? retailerForm.districtName
                : list[0] && list[0].districtName
                ? list[0].districtName
                : "NA"}
            </Text>
          </View>

          <View style={{ ...Styles.textView, left: wp("10%") }}>
            <Text style={Styles.textStyle}>Sub State</Text>
            <Text style={Styles.placeholder}>
              {retailerForm.substateName
                ? retailerForm.substateName
                : list[0] && list[0].substateName
                ? list[0].substateName
                : "NA"}
            </Text>
          </View>

          <View style={Styles.textView}>
            <Text style={Styles.textStyle}>State</Text>
            <Text style={Styles.placeholder}>
              {retailerForm.stateName
                ? retailerForm.stateName
                : list[0] && list[0].stateName
                ? list[0].stateName
                : "NA"}
            </Text>
          </View>

          <View style={{ ...Styles.textView, left: wp("10%") }}>
            <Text style={Styles.textStyle}>Zone</Text>
            <Text style={Styles.placeholder}>
              {retailerForm.zoneName
                ? retailerForm.zoneName
                : list[0] && list[0].zoneName
                ? list[0].zoneName
                : "NA"}
            </Text>
          </View>

          <View style={Styles.textView}>
            <Text style={Styles.textStyle}>Area</Text>
            <Text style={Styles.placeholder}>
              {retailerForm.areaName
                ? retailerForm.areaName
                : list[0] && list[0].areaName
                ? list[0].areaName
                : "NA"}
            </Text>
          </View>

          <View style={{ ...Styles.textView, left: wp("10%") }}>
            <Text style={Styles.textStyle}>Residence No.</Text>
            <Text style={Styles.placeholder}>
              {retailerForm.zx_residencenumber
                ? retailerForm.zx_residencenumber
                : list[0] && list[0].zx_residencenumber
                ? list[0].zx_residencenumber
                : "NA"}
            </Text>
          </View>

          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Residential Address 1</Text>
            <Text style={Styles.placeholder}>
              {retailerForm.zx_residentialaddress1
                ? retailerForm.zx_residentialaddress1
                : list[0] && list[0].zx_residentialaddress1
                ? list[0].zx_residentialaddress1
                : "NA"}
            </Text>
          </View>

          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Residential Landmark</Text>
            <Text style={Styles.placeholder}>
              {retailerForm.zx_residentiallandmark
                ? retailerForm.zx_residentiallandmark
                : list[0] && list[0].zx_residentiallandmark
                ? list[0].zx_residentiallandmark
                : "NA"}
            </Text>
          </View>

          <View style={Styles.textView}>
            <Text style={Styles.textStyle}>Residence Pincode</Text>
            <Text style={Styles.placeholder}>
              {retailerForm.zx_residentialpincode1name
                ? retailerForm.zx_residentialpincode1name
                : list[0] && list[0].residentialpincodename
                ? list[0].residentialpincodename
                : "NA"}
            </Text>
          </View>
          <View style={{ ...Styles.textView, left: wp("10%") }}>
            <Text style={Styles.textStyle}>Residence District</Text>
            <Text style={Styles.placeholder}>
              {retailerForm.zx_residentialdistrict1name
                ? retailerForm.zx_residentialdistrict1name
                : list[0] && list[0].residentialdistrictyname
                ? list[0].residentialdistrictyname
                : "NA"}
            </Text>
          </View>

          <View style={Styles.textView}>
            <Text style={Styles.textStyle}>Residence City</Text>
            <Text style={Styles.placeholder}>
              {retailerForm.zx_residentialcity1name
                ? retailerForm.zx_residentialcity1name
                : list[0] && list[0].residentialcityname
                ? list[0].residentialcityname
                : "NA"}
            </Text>
          </View>

          <View style={{ ...Styles.textView, left: wp("10%") }}>
            <Text style={Styles.textStyle}>Residence Area</Text>
            <Text style={Styles.placeholder}>
              {retailerForm.zx_residentialarea1name
                ? retailerForm.zx_residentialarea1name
                : list[0] && list[0].residentialareaname
                ? list[0].residentialareaname
                : "NA"}
            </Text>
          </View>

          <View style={Styles.textView}>
            <Text style={Styles.textStyle}>Residence State</Text>
            <Text style={Styles.placeholder}>
              {retailerForm.zx_residentialstate1name
                ? retailerForm.zx_residentialstate1name
                : list[0] && list[0].residentialstatename
                ? list[0].residentialstatename
                : "NA"}
            </Text>
          </View>

          <View style={{ ...Styles.textView, left: wp("10%") }}>
            <Text style={Styles.textStyle}>Residence Zone</Text>
            <Text style={Styles.placeholder}>
              {retailerForm.zx_residentialzone1name
                ? retailerForm.zx_residentialzone1name
                : list[0] && list[0].residentialzonename
                ? list[0].residentialzonename
                : "NA"}
            </Text>
          </View>
          <View style={{ ...Styles.textView }}>
            <Text style={Styles.textStyle}>Residence Sub-State</Text>
            <Text style={Styles.placeholder}>
              {retailerForm.zx_residentialsubstate1name
                ? retailerForm.zx_residentialsubstate1name
                : list[0] && list[0].residentialsubstatename
                ? list[0].residentialsubstatename
                : "NA"}
            </Text>
          </View>

          <View
            style={{
              width: wp("35%"),
              height: hp("12%"),
              borderBottomWidth: 1,
              borderColor: Colors.lightGrey,
              marginTop: hp("1.5%"),
              left: wp("10%"),
            }}
          >
            <Text style={Styles.textStyle}>DOB</Text>
            <Text
              style={{
                borderColor: "transparent",
                left: wp("0.5%"),
                fontFamily: "Segoe UI",
                color: Colors.grey,
                fontSize: 14,
                top: hp("5%"),
                fontWeight: "bold",
              }}
            >
              {retailerForm.zx_dateofbirth
                ? retailerForm.zx_dateofbirth
                : list[0] && list[0].zx_dateofbirth
                ? HelperService.dateReadableFormat(list[0].zx_dateofbirth)
                : "NA"}
            </Text>
          </View>

          <View
            style={{
              width: wp("35%"),
              height: hp("10%"),
              borderBottomWidth: 1,
              borderColor: Colors.lightGrey,
              marginTop: hp("1.5%"),
              // marginLeft: wp("10%"),
            }}
          >
            <Text style={Styles.textStyle}>DOA</Text>
            <Text
              style={{
                borderColor: "transparent",
                left: wp("0.5%"),
                fontFamily: "Segoe UI",
                color: Colors.grey,
                fontSize: 14,
                top: hp("3%"),
                fontWeight: "bold",
              }}
            >
              {retailerForm.zx_dateofanniversary
                ? retailerForm.zx_dateofanniversary
                : list[0] && list[0].zx_dateofanniversary
                ? HelperService.dateReadableFormat(list[0].zx_dateofanniversary)
                : "NA"}
            </Text>
          </View>

          <View style={{ ...Styles.textView, left: wp("15%") }}>
            <Text style={Styles.textStyle}>Age</Text>
            <Text style={Styles.placeholder}>
              {retailerForm.zx_age
                ? (retailerForm.zx_age = this.getAge())
                : list[0] && list[0].zx_age
                ? list[0].zx_age
                : null}
            </Text>
          </View>

          <View style={{ ...Styles.textView }}>
            <Text style={Styles.textStyle}>No. of Children</Text>
            <Text style={Styles.placeholder}>
              {retailerForm.zx_noofchildren
                ? retailerForm.zx_noofchildren
                : list[0] && list[0].zx_noofchildren
                ? list[0].zx_noofchildren
                : "NA"}
            </Text>
          </View>

          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Education</Text>

            <Text style={Styles.placeholder}>
              {retailerForm.zx_education
                ? retailerForm.zx_education
                : list[0] && list[0].zx_education
                ? list[0].zx_education
                : "NA"}
            </Text>
          </View>

          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>GST No.</Text>
            <Text style={Styles.placeholder}>
              {retailerForm.zx_gstno
                ? retailerForm.zx_gstno
                : list[0] && list[0].zx_gstno
                ? list[0].zx_gstno
                : "NA"}
            </Text>
          </View>

          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>PAN No.</Text>
            <Text style={Styles.placeholder}>
              {retailerForm.zx_panno
                ? retailerForm.zx_panno
                : list[0] && list[0].zx_panno
                ? list[0].zx_panno
                : "NA"}
            </Text>
          </View>

          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Aadhar No.</Text>
            <Text style={Styles.placeholder}>
              {retailerForm.zx_aadharnumber
                ? retailerForm.zx_aadharnumber
                : list[0] && list[0].zx_aadharnumber
                ? list[0].zx_aadharnumber
                : "NA"}
            </Text>
          </View>

          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Driving License No.</Text>
            <Text style={Styles.placeholder}>
              {retailerForm.zx_drivinglicensenumber
                ? retailerForm.zx_drivinglicensenumber
                : list[0] && list[0].zx_drivinglicensenumber
                ? list[0].zx_drivinglicensenumber
                : "NA"}
            </Text>
          </View>

          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Voter ID No.</Text>
            <Text style={Styles.placeholder}>
              {retailerForm.zx_voteridnumber
                ? retailerForm.zx_voteridnumber
                : list[0] && list[0].zx_voteridnumber
                ? list[0].zx_voteridnumber
                : "NA"}
            </Text>
          </View>

          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>UDAAN STATUS*</Text>
            <Text style={Styles.placeholder}>
              {retailerForm.zx_udaanstatus
                ? retailerForm.zx_udaanstatus
                : list[0] && list[0].zx_udaanstatus
                ? list[0].zx_udaanstatus
                : "NA"}
            </Text>
          </View>

          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Enrolled in UBS*</Text>
            <Text style={Styles.placeholder}>
              {retailerForm.zx_enrolledinubs
                ? retailerForm.zx_enrolledinubs
                : list[0] && list[0].zx_enrolledinubs
                ? list[0].zx_enrolledinubs
                : "NA"}
            </Text>
          </View>

          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Payment Terms</Text>
            <Text style={Styles.placeholder}>
              {retailerForm.zx_paymentterm
                ? retailerForm.zx_paymentterm
                : list[0] && list[0].zx_paymentterm
                ? list[0].zx_paymentterm
                : "NA"}
            </Text>
          </View>

          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Remarks</Text>

            <Text style={Styles.placeholder}>
              {retailerForm.zx_remarks
                ? retailerForm.zx_remarks
                : list[0] && list[0].zx_remarks
                ? list[0].zx_remarks
                : "NA"}
            </Text>
          </View>

          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Counter Type</Text>
            <Text style={Styles.placeholder}>
              {retailerForm.zx_countertype
                ? retailerForm.zx_countertype
                : list[0] && list[0].zx_countertype
                ? list[0].zx_countertype
                : "NA"}
            </Text>
          </View>

          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Business Line</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                top: hp("3%"),
                flexWrap: "wrap",
                width: wp("90%"),
                borderBottomWidth: 1,
                borderColor: Colors.lightGrey,
              }}
            >
              {list[0] && list[0].zx_businessline ? (
                list[0].zx_businessline.map((text) => (
                  <Text
                    style={{
                      borderColor: "transparent",
                      left: wp("0.5%"),
                      fontFamily: "Segoe UI",
                      color: Colors.grey,
                      fontSize: 14,
                      top: hp("3%"),
                      fontWeight: "bold",
                    }}
                  >
                    {text + ","}
                  </Text>
                ))
              ) : (
                <Text>NA</Text>
              )}
            </View>
          </View>

          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>
              Value of Business Lines (Lakhs PA)
            </Text>

            <Text style={Styles.placeholder}>
              {retailerForm.zx_valueofbusinesslineslakhspa
                ? retailerForm.zx_valueofbusinesslineslakhspa
                : list[0] && list[0].zx_valueofbusinesslineslakhspa
                ? list[0].zx_valueofbusinesslineslakhspa
                : "NA"}
            </Text>
          </View>

          <View
            style={{
              width: "90%",
              alignSelf: "center",
              marginTop: hp("7%"),
            }}
          >
            <GenericDisplayCardStrip
              key={"GST image Proof:"}
              label={"GST image Proof:"}
              labelStyle={{
                color: Colors.black,
                fontSize: 13,
                fontWeight: "bold",
                fontFamily: ApplicationStyles.textFont,
              }}
              value={
                <Text
                  style={
                    list[0] && list[0].zx_gstpanimage
                      ? { textDecorationLine: "underline", color: Colors.black }
                      : {}
                  }
                  onPress={() => {
                    return openModal({
                      content: (
                        <View style={{ flex: 1, alignSelf: "center" }}>
                          <ImageSlider
                            images={
                              this.getImage()
                              // visitInfoForm.zx_visitattachment == null
                              //   ? []
                              //   : visitInfoForm.zx_visitattachment.split(" ")
                            }
                          />
                        </View>
                      ),
                      heading: "Preview",
                      bodyFlexHeight: 0.7,
                    });
                  }}
                >
                  {list[0] && list[0].zx_gstpanimage ? "View" : "No file"}
                </Text>
              }
            />
          </View>

          <View
            style={{
              width: "90%",
              alignSelf: "center",
              marginTop: hp("7%"),
            }}
          >
            <GenericDisplayCardStrip
              key={"Shop Id Proof:"}
              label={"Shop Id Proof:"}
              labelStyle={{
                color: Colors.black,
                fontSize: 13,
                fontWeight: "bold",
                fontFamily: ApplicationStyles.textFont,
              }}
              value={
                <Text
                  style={
                    list[0] && list[0].zx_shopimage_url
                      ? { textDecorationLine: "underline", color: Colors.black }
                      : {}
                  }
                  onPress={() => {
                    return openModal({
                      content: (
                        <View style={{ flex: 1, alignSelf: "center" }}>
                          <ImageSlider
                            images={
                              this.getImage1()
                              // visitInfoForm.zx_visitattachment == null
                              //   ? []
                              //   : visitInfoForm.zx_visitattachment.split(" ")
                            }
                          />
                        </View>
                      ),
                      heading: "Preview",
                      bodyFlexHeight: 0.7,
                    });
                  }}
                >
                  {list[0] && list[0].zx_shopimage_url ? "View" : "No file"}
                </Text>
              }
            />
          </View>

          <View
            style={{
              width: "90%",
              alignSelf: "center",
              marginTop: hp("7%"),
            }}
          >
            <GenericDisplayCardStrip
              key={"Visiting Card Proof:"}
              label={"Visiting Card Proof:"}
              labelStyle={{
                color: Colors.black,
                fontSize: 13,
                fontWeight: "bold",
                fontFamily: ApplicationStyles.textFont,
              }}
              value={
                <Text
                  style={
                    list[0] && list[0].zx_visitingcard
                      ? { textDecorationLine: "underline", color: Colors.black }
                      : {}
                  }
                  onPress={() => {
                    return openModal({
                      content: (
                        <View style={{ flex: 1, alignSelf: "center" }}>
                          <ImageSlider
                            images={
                              this.getImage2()
                              // visitInfoForm.zx_visitattachment == null
                              //   ? []
                              //   : visitInfoForm.zx_visitattachment.split(" ")
                            }
                          />
                        </View>
                      ),
                      heading: "Preview",
                      bodyFlexHeight: 0.7,
                    });
                  }}
                >
                  {list[0] && list[0].zx_visitingcard ? "View" : "No file"}
                </Text>
              }
            />
          </View>
        </View>
        {this.props.accountStatusLoader == true ||
        this.props.pffAutomationLoader == true ||
        this.props.load == true ||
        this.props.getCustomerInfoLoader ? (
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
      </ScrollView>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    agentid: state.user.id,
    retailersOffset: state.retailers.retailersOffset,
    retailersLimit: state.retailers.retailersLimit,
    retailerForm: state.retailers.retailerForm,
    validation: state.retailers.retailerFormValidation,
    createRetailerLoader: state.retailers.createRetailerLoader,
    retailerCompetitors: state.retailers.retailerCompetitors,
    categories: state.retailers.categories,
    retailerCompetitors: state.retailers.retailerCompetitors,
    dealersSearchList: state.retailers.dealersSearchList,
    agentAreas: state.common.retailerArea,
    loader: state.common.fetchRetailerAreaLoading,
    beatList: state.common.agentBeat,
    dealersList: state.retailers.dealersSearchList,
    dealerType: state.common.dealerType,
    user_details: state.user.user_details,
    city: state.user.agentAreas,
    beatLoader: state.common.fetchBeatLoading,
    cityAllList: state.common.cityAllList,
    langSpoken: state.common.languageSpoken,
    langWriting: state.common.languageWriting,
    compName: state.common.competitorName,
    compProduct: state.common.competitorProduct,
    selectType: state.common.typeOptions,
    selectReason: state.common.reasonOptions,
    getAllAreaLoader: state.distributor.getAllAreaLoader,
    area: state.distributor.getArea,
    pincodeInfo: state.retailers.pincodeInfo,
    pincodeInfoLOader: state.retailers.getPincodeInfoLoader,
    areaInfo: state.retailers.areaInfo,
    areaInfoLOader: state.retailers.getAreaInfoLoader,
    list: state.retailers.customerInfo,
    uploadImageField: state.common.uploadImageField,
    uploadImageLoader: state.common.uploadImageLoader,
    guId: state.retailers.selectedRetailer.data.id,
    loader: state.retailers.accountStatusLoader,
    status: state.retailers.accountsStatus,
    updateStatus: state.retailers.updatePff,
    loading: state.retailers.pffAutomationLoader,
    holdActive: state.retailers.holdActive,
    load: state.retailers.holdActiveLoader,
    showmodal: state.retailers.showModal,
    showmodalhold: state.retailers.showModalHold,
    showmodalppf: state.retailers.showModalPpf,
    getCustomerInfoLoader: state.retailers.getCustomerInfoLoader,
    code: state.user.user_details,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeRetailerForm: (params) =>
    dispatch(RetailersActions.changeRetailerForm(params)),
  createRetailer: (params) => dispatch(RetailersActions.createRetailer(params)),
  fetchRetailerCompetitors: (params) =>
    dispatch(RetailersActions.fetchRetailerCompetitors(params)),
  fetchDealers: (params) => dispatch(RetailersActions.fetchDealers(params)),
  fetchRetailerArea: (params) =>
    dispatch(CommonActions.fetchRetailerArea(params)),
  fetchBeat: (params) => dispatch(CommonActions.fetchBeat(params)),
  clearRetailerForm: () => dispatch(RetailersActions.clearRetailerForm()),
  getAllArea: (params) => dispatch(DistributorActions.getAllArea(params)),
  getPincodeInfo: (params) => dispatch(RetailersActions.getPincodeInfo(params)),
  getAreaInfo: (params) => dispatch(RetailersActions.getAreaInfo(params)),
  updateRetailer: (params) => dispatch(RetailersActions.updateRetailer(params)),
  uploadImage: (params) => dispatch(CommonActions.uploadImage(params)),
  getCustomerInfo: (params) =>
    dispatch(RetailersActions.getCustomerInfo(params)),
  accountStatus: (params) => dispatch(RetailersActions.accountStatus(params)),
  changeAccountStatus: (params) =>
    dispatch(RetailersActions.changeAccountStatus(params)),
  changePffAutomation: (params) =>
    dispatch(RetailersActions.changePffAutomation(params)),
  customerPffAutomation: (params) =>
    dispatch(RetailersActions.customerPffAutomation(params)),
  customerStatus: (params) => dispatch(RetailersActions.customerStatus(params)),
  changeHoldActive: (params) =>
    dispatch(RetailersActions.changeHoldActive(params)),
  openModal: (params) => dispatch(CommonActions.openModal(params)),
  closeModal: (params) => dispatch(CommonActions.closeModal(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CustomerInfo);
