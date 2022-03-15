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
  KeyboardAvoidingView,
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
import Styles from "../../Retailers/NewRetailer/NewRetailerStyle";
import InputText from "App/Components/FormInput/InputText";
import BlueButton from "../../../Components/BlueButton/BlueButton";
import SelectDate from "../../../Components/SelectDate/SelectDate";
import SearchableDropdown from "App/Components/SearchableDropdown";
import ImageUploaderScreen from "./ImageUploaderScreen";
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
import SelectBox from "react-native-multi-selectbox";
import { xorBy } from "lodash";
import Loading from "App/Components/Loading";
import MultipleImagePicker from "../../../Components/ImagePicker/MultipleImagePicker";
import CompetitorActions from "App/Stores/Competitor/Actions";
import ProductActions from "App/Stores/Products/Actions";
import IndicatorInputText from "../../../Components/FormInput/IndicatorInputText";

class RetailerTabScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      selectedName: [],
      selectedProduct: [],
      selectedType: [],
      selectedLine: [],
    };
  }
  componentDidMount() {
    const {
      token,
      retailerForm,
      agentid,
      fetchRetailers,
      logindata,
    } = this.props;
    this.state.timer = setTimeout(
      () =>
        this.props.getAllZone({
          token,
          id: agentid,
          level: 1,
        }),
      2000
    );
    this.state.timer = setTimeout(
      () => fetchRetailers({ token, agentid }),
      3000
    );
    this.state.timer = setTimeout(
      () =>
        this.props.getAllProductsBrands({
          token,
          zx_brandgroup: logindata.zx_brandgroup,
        }),
      4000
    );
    this.state.timer = setTimeout(
      () =>
        this.props.getCompetitorName({
          token,
        }),
      6000
    );
    this.state.timer = setTimeout(
      () =>
        this.props.getResidenceZone({
          token,
          id: agentid,
          level: 1,
        }),
      7000
    );
  }

  getData() {
    let data = [];
    if (this.state.selectedName.length) {
      this.state.selectedName.map((obj, index) => {
        data.push(obj.id);
      });
    }
    return data;
  }

  getDistributor() {
    const { retailerdata, orderForm, getParty } = this.props;
    let distributor = [];
    if (retailerdata && retailerdata.length) {
      retailerdata.map((obj) => {
        if (
          obj.zx_accounttype == "Primary Distributor" ||
          obj.zx_accounttype == "Distributor"
        ) {
          distributor.push({
            id: obj.id,
            name: obj.name,
          });
        }
      });
    }
    return distributor;
  }

  getProduct() {
    let data = [];
    if (this.state.selectedProduct.length) {
      this.state.selectedProduct.map((obj, index) => {
        data.push(obj.id);
      });
    }
    return data;
  }

  getType() {
    let data = [];
    if (this.state.selectedType.length) {
      this.state.selectedType.map((obj, index) => {
        data.push(obj.item);
      });
    }
    // console.log("ggggggg", data);
    return data;
  }

  getLine() {
    let data = [];
    if (this.state.selectedLine.length) {
      this.state.selectedLine.map((obj, index) => {
        data.push(obj.item);
      });
    }
    // console.log("ggggggg", data);
    return data;
  }

  onMultiChange() {
    return (item) =>
      this.setState({
        selectedName: xorBy(this.state.selectedName, [item], "id"),
      });
  }

  onMultiChangeProduct() {
    return (item) =>
      this.setState({
        selectedProduct: xorBy(this.state.selectedProduct, [item], "id"),
      });
  }

  onMultiChangeType() {
    return (item) =>
      this.setState({
        selectedType: xorBy(this.state.selectedType, [item], "id"),
      });
  }

  onMultiChangeLine() {
    return (item) =>
      this.setState({
        selectedLine: xorBy(this.state.selectedLine, [item], "id"),
      });
  }

  other() {
    const { projectForm } = this.props;
    let value = "";
    if (this.getLine().length) {
      value = this.getLine().some((c) => c == "Others");
    }
    // console.log("recorddd", value);
    return value;
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

  getLanguage() {
    const { language } = this.props;
    let Pincode = [];
    if (language && language.length) {
      language.map((obj) => {
        if (
          {
            id: obj.zx_languagespokenid,
            name: obj.zx_name,
          }
        ) {
          Pincode.push({
            id: obj.zx_languagespokenid,
            name: obj.zx_name,
          });
        }
      });
    }
    return Pincode;
  }

  getPincode1() {
    const { pincode1 } = this.props;
    let Pincode = [];
    if (pincode1 && pincode1.length) {
      pincode1.map((obj) => {
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

  getName() {
    const { name } = this.props;
    let compname = [];
    if (name && name.length) {
      name.map((obj) => {
        if ({ id: obj.zx_competitormasterid, item: obj.zx_recordid }) {
          compname.push({
            id: obj.zx_competitormasterid,
            item: obj.zx_recordid,
          });
        }
      });
    }
    return compname;
  }

  getProductName() {
    const { brands } = this.props;
    let compbrands = [];
    if (brands && brands.length) {
      brands.map((obj) => {
        if ({ id: obj.zx_brandsid, item: obj.zx_brandcode }) {
          compbrands.push({
            id: obj.zx_brandsid,
            item: obj.zx_brandcode,
          });
        }
      });
    }
    return compbrands;
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

  getState1() {
    const { state1 } = this.props;
    let pincode = [];
    if (state1 && state1.length) {
      state1.map((obj) => {
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

  getCity1() {
    const { city1 } = this.props;
    let pincode = [];
    if (city1 && city1.length) {
      city1.map((obj) => {
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

  getDistrict1() {
    const { district1 } = this.props;
    let pincode = [];
    if (district1 && district1.length) {
      district1.map((obj) => {
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

  getZone() {
    const { zone } = this.props;
    let pincode = [];
    if (zone && zone.length) {
      zone.map((obj) => {
        if (obj.zx_level == 1) {
          pincode.push({
            id: obj.zx_salesterritoryid,
            name: obj.zx_territoryname,
          });
        }
      });
    }
    return pincode;
  }

  getZone1() {
    const { zone1 } = this.props;
    let pincode = [];
    if (zone1 && zone1.length) {
      zone1.map((obj) => {
        if (obj.zx_level == 1) {
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

  getSubState1() {
    const { subState1 } = this.props;
    let pincode = [];
    if (subState1 && subState1.length) {
      subState1.map((obj) => {
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

  getArea() {
    const { area } = this.props;
    let pincode = [];
    if (area && area.length) {
      area.map((obj) => {
        if (obj.zx_level == 7) {
          pincode.push({
            id: obj.zx_salesterritoryid,
            name: obj.zx_territoryname,
          });
        }
      });
    }
    return pincode;
  }

  getArea1() {
    const { area1 } = this.props;
    let pincode = [];
    if (area1 && area1.length) {
      area1.map((obj) => {
        if (obj.zx_level == 7) {
          pincode.push({
            id: obj.zx_salesterritoryid,
            name: obj.zx_territoryname,
          });
        }
      });
    }
    return pincode;
  }

  // getSubState() {
  //   const { area } = this.props;
  //   let pincode = [];
  //   if (area && area.length) {
  //     area.map((obj) => {
  //       if ( obj.zx_level==3 ) {
  //         pincode.push({ id: obj.zx_salesterritoryid, name: obj.zx_territoryname });
  //       }
  //     });
  //   }
  //   return pincode;
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

  // componentWillUnmount() {}

  // submit(params) {

  //   const {
  //     createRetailer,
  //     token,
  //   } = this.props

  // console.log("deeeeppp", this.props.retailerForm)
  // this.props.createRetailer({
  //   ...this.props.retailerForm,
  //   ...{
  //     token: this.props.token,
  //     // agentid: this.props.agentid,
  //     // zx_accounttype:
  //     //   this.props.user_details.business_channel__c == "Wholesale"
  //     //     ? "CRM Customer"
  //     //     : "Retailer",
  //   },
  // });
  // }

  // onAreaChange(value) {
  //   this.props.changeRetailerForm({
  //     edited_field: "area__c",
  //     edited_value: value,
  //   });
  //   this.props.fetchDealers({
  //     token: this.props.token,
  //     agentid: this.props.agentid,
  //     offset: this.props.retailersOffset,
  //     limit: this.props.retailersLimit,
  //     area: value,
  //   });
  // }
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
      error = "";
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

  async submit() {
    let recordid = this.props.navigation.state.params;
    const { retailerForm, token, logindata } = this.props;
    this.props.createRetailerLoading();

    let location = await HelperService.requestLocation();

    if (location == "DENIED") {
      Alert.alert(
        "Location permission is required to proceed.",
        "Go App Permissions and Turn on Location Permission for Re-Konekt."
      );
      this.props.createRetailerLoadingStop();
      return;
    } else if (!location) {
      this.props.createRetailerLoadingStop();
      return;
    }
    this.props.createRetailer({
      form: {
        name: retailerForm.name,
        zx_firstname: retailerForm.zx_firstname,
        zx_lastname: retailerForm.zx_lastname,
        zx_accounttype: recordid.id,
        zx_udaannumber: retailerForm.zx_udaannumber,
        zx_alternatemobileno: retailerForm.zx_alternatemobileno,
        telephone1: retailerForm.telephone1 ? retailerForm.telephone1 : null,
        emailaddress1: retailerForm.emailaddress1
          ? retailerForm.emailaddress1
          : null,
        address1_line1: retailerForm.address1_line1,
        address1_line2: retailerForm.address1_line2,
        zx_dateofbirth: retailerForm.zx_dateofbirth,
        zx_landmark: retailerForm.zx_landmark ? retailerForm.zx_landmark : null,
        zx_residencenumber: retailerForm.zx_residencenumber
          ? retailerForm.zx_residencenumber
          : null,
        zx_residentialaddress1: retailerForm.zx_residentialaddress1
          ? retailerForm.zx_residentialaddress1
          : null,
        zx_residentiallandmark: retailerForm.zx_residentiallandmark
          ? retailerForm.zx_residentiallandmark
          : null,
        zx_Residentialpincode1: retailerForm.zx_Residentialpincode1
          ? retailerForm.zx_Residentialpincode1
          : null,
        zx_Residentialarea1: retailerForm.zx_Residentialarea1
          ? retailerForm.zx_Residentialarea1
          : null,
        zx_residentialcity1: retailerForm.zx_residentialcity1
          ? retailerForm.zx_residentialcity1
          : null,
        zx_Residentialdistrict1: retailerForm.zx_Residentialdistrict1
          ? retailerForm.zx_Residentialdistrict1
          : null,
        zx_Residentialstate1: retailerForm.zx_Residentialstate1
          ? retailerForm.zx_Residentialstate1
          : null,
        zx_Residentialzone1: retailerForm.zx_Residentialzone1
          ? retailerForm.zx_Residentialzone1
          : null,
        zx_Residentialsubstate1: retailerForm.zx_Residentialsubstate1
          ? retailerForm.zx_Residentialsubstate1
          : null,
        zx_age: retailerForm.zx_age ? retailerForm.zx_age : null,
        zx_dateofanniversary: retailerForm.zx_dateofanniversary
          ? retailerForm.zx_dateofanniversary
          : null,
        zx_noofchildren: retailerForm.zx_noofchildren
          ? retailerForm.zx_noofchildren
          : null,
        zx_education: retailerForm.zx_education
          ? retailerForm.zx_education
          : null,
        zx_languageusedforspeaking: retailerForm.zx_languageusedforspeaking,
        zx_languageusedforwriting: retailerForm.zx_languageusedforwriting,
        zx_gstno: retailerForm.zx_gstno,
        zx_panno: retailerForm.zx_panno,
        zx_aadharnumber: retailerForm.zx_aadharnumber
          ? retailerForm.zx_aadharnumber
          : null,
        zx_drivinglicensenumber: retailerForm.zx_drivinglicensenumber
          ? retailerForm.zx_drivinglicensenumber
          : null,
        zx_voteridnumber: retailerForm.zx_voteridnumber
          ? retailerForm.zx_voteridnumber
          : null,
        zx_shopimageid: null,
        zx_shopimage_url: retailerForm.zx_shopimage_url
          ? retailerForm.zx_shopimage_url
          : null,
        zx_visitingcard: retailerForm.zx_visitingcard
          ? retailerForm.zx_visitingcard
          : null,
        zx_gstpanimage: retailerForm.zx_gstpanimage
          ? retailerForm.zx_gstpanimage
          : null,
        zx_registereddate: "2022-01-04",
        zx_udaanstatus: retailerForm.zx_udaanstatus,
        zx_enrolledinubs: retailerForm.zx_enrolledinubs,
        zx_remarks: retailerForm.zx_remarks ? retailerForm.zx_remarks : null,
        zx_status: retailerForm.zx_status,
        // zx_saletype: retailerForm.zx_saletype ? retailerForm.zx_saletype : null,
        zx_reasonfornotsellingprinceproducts: retailerForm.zx_reasonfornotsellingprinceproducts
          ? retailerForm.zx_reasonfornotsellingprinceproducts
          : null,
        zx_pincode: retailerForm.zx_pincode,
        zx_area: retailerForm.zx_area,
        zx_city: retailerForm.zx_city,
        zx_district: retailerForm.zx_district,
        zx_substate: retailerForm.zx_substate,
        zx_state: retailerForm.zx_state,
        zx_zone: retailerForm.zx_zone,
        zx_paymentterm: retailerForm.zx_paymentterm
          ? retailerForm.zx_paymentterm
          : null,
        zx_countertype: retailerForm.zx_countertype
          ? retailerForm.zx_countertype
          : null,
        zx_businessline: this.getLine() ? this.getLine() : null,
        zx_otherbusinessline: retailerForm.zx_otherbusinessline
          ? retailerForm.zx_otherbusinessline
          : null,
        zx_valueofbusinesslineslakhspa: retailerForm.zx_valueofbusinesslineslakhspa
          ? retailerForm.zx_valueofbusinesslineslakhspa
          : null,
        address1_latitude: location.latitude,
        address1_longitude: location.longitude,
        competitorName: this.getData(),
        competitorproduct: this.getProduct(),
        parentaccountid: retailerForm.parentaccountid
          ? retailerForm.parentaccountid
          : null,
        zx_brandgroup: logindata && logindata.zx_brandgroup,
        zx_secondarysaletype: this.getType(),
      },
      token,
    });
  }

  render() {
    const {
      retailerForm,
      validation,
      dealerType,
      loader,
      user_details,
      city,
      beatLoader,
      fetchBeat,
      token,
      cityAllList,
      langSpoken,
      langWriting,
      compProduct,
      compName,
      selectType,
      selectReason,
      area,
      createRetailerLoader,
      list,
      uploadImageLoader,
      uploadImageField,
      uploadImage,
      logindata,
      agentid,
    } = this.props;
    // console.log("dobirthhh", this.getAge());
    let recordid = this.props.navigation.state.params;
    // console.log("showwwwwwwww", this.getLine());
    let forms = {
      name: retailerForm.name,
      zx_firstname: retailerForm.zx_firstname,
      zx_lastname: retailerForm.zx_lastname,
      zx_accounttype: recordid.id,
      zx_udaannumber: retailerForm.zx_udaannumber,
      zx_alternatemobileno: retailerForm.zx_alternatemobileno,
      telephone1: retailerForm.telephone1 ? retailerForm.telephone1 : null,
      emailaddress1: retailerForm.emailaddress1
        ? retailerForm.emailaddress1
        : null,
      address1_line1: retailerForm.address1_line1,
      address1_line2: retailerForm.address1_line2,
      zx_dateofbirth: HelperService.convertMomentDateToTimestamp(
        retailerForm.zx_dateofbirth
      ),
      zx_landmark: retailerForm.zx_landmark ? retailerForm.zx_landmark : null,
      zx_residencenumber: retailerForm.zx_residencenumber
        ? retailerForm.zx_residencenumber
        : null,
      zx_residentialaddress1: retailerForm.zx_residentialaddress1
        ? retailerForm.zx_residentialaddress1
        : null,
      zx_residentiallandmark: retailerForm.zx_residentiallandmark
        ? retailerForm.zx_residentiallandmark
        : null,
      zx_Residentialpincode1: retailerForm.zx_Residentialpincode1
        ? retailerForm.zx_Residentialpincode1
        : null,
      zx_Residentialarea1: retailerForm.zx_Residentialarea1
        ? retailerForm.zx_Residentialarea1
        : null,
      zx_residentialcity1: retailerForm.zx_residentialcity1
        ? retailerForm.zx_residentialcity1
        : null,
      zx_Residentialdistrict1: retailerForm.zx_Residentialdistrict1
        ? retailerForm.zx_Residentialdistrict1
        : null,
      zx_Residentialstate1: retailerForm.zx_Residentialstate1
        ? retailerForm.zx_Residentialstate1
        : null,
      zx_Residentialzone1: retailerForm.zx_Residentialzone1
        ? retailerForm.zx_Residentialzone1
        : null,
      zx_Residentialsubstate1: retailerForm.zx_Residentialsubstate1
        ? retailerForm.zx_Residentialsubstate1
        : null,
      zx_age: retailerForm.zx_age ? retailerForm.zx_age : null,
      zx_dateofanniversary: retailerForm.zx_dateofanniversary
        ? HelperService.convertMomentDateToTimestamp(
            retailerForm.zx_dateofanniversary
          )
        : null,
      zx_noofchildren: retailerForm.zx_noofchildren
        ? retailerForm.zx_noofchildren
        : null,
      zx_education: retailerForm.zx_education
        ? retailerForm.zx_education
        : null,
      zx_language: "b0e024c8-8c2c-40e5-a665-7598b4cf61e3",
      zx_languageforwriting: "f4970a12-0fac-4a5c-bdff-fa7b9a21e1e0",
      zx_gstno: retailerForm.zx_gstno,
      zx_panno: retailerForm.zx_panno,
      zx_aadharnumber: retailerForm.zx_aadharnumber
        ? retailerForm.zx_aadharnumber
        : null,
      zx_drivinglicensenumber: retailerForm.zx_drivinglicensenumber
        ? retailerForm.zx_drivinglicensenumber
        : null,
      zx_voteridnumber: retailerForm.zx_voteridnumber
        ? retailerForm.zx_voteridnumber
        : null,
      zx_shopimageid: retailerForm.zx_shopimageid
        ? retailerForm.zx_shopimageid
        : null,
      zx_visitingcard: retailerForm.zx_visitingcard
        ? retailerForm.zx_visitingcard
        : null,
      zx_gstpanimage: retailerForm.zx_gstpanimage
        ? retailerForm.zx_gstpanimage
        : null,
      zx_registereddate: "943986600000",
      zx_udaanstatus: retailerForm.zx_udaanstatus,
      zx_enrolledinubs: retailerForm.zx_enrolledinubs,
      zx_remarks: retailerForm.zx_remarks ? retailerForm.zx_remarks : null,
      zx_status: retailerForm.zx_status,
      // zx_saletype: retailerForm.zx_saletype ? retailerForm.zx_saletype : null,
      zx_reasonfornotsellingprinceproducts: retailerForm.zx_reasonfornotsellingprinceproducts
        ? retailerForm.zx_reasonfornotsellingprinceproducts
        : null,
      zx_pincode: retailerForm.zx_pincode,
      zx_area: retailerForm.zx_area,
      zx_city: retailerForm.zx_city,
      zx_district: retailerForm.zx_district,
      zx_substate: retailerForm.zx_substate,
      zx_state: retailerForm.zx_state,
      zx_zone: retailerForm.zx_zone,
      zx_paymentterm: retailerForm.zx_paymentterm
        ? retailerForm.zx_paymentterm
        : null,
      zx_countertype: retailerForm.zx_countertype
        ? retailerForm.zx_countertype
        : null,
      zx_businessline: retailerForm.zx_businessline
        ? retailerForm.zx_businessline
        : null,
      zx_valueofbusinesslineslakhspa: retailerForm.zx_valueofbusinesslineslakhspa
        ? retailerForm.zx_valueofbusinesslineslakhspa
        : null,
      address1_latitude: 7.909,
      address1_longitude: 5.99,
      competitorName: this.getData(),
      competitorproduct: this.getProduct(),
      parentaccountid: retailerForm.parentaccountid
        ? retailerForm.parentaccountid
        : null,
      zx_brandgroup: logindata && logindata.zx_brandgroup,
      zx_secondarysaletype: this.getType() ? this.getType() : null,
    };

    let form1 = {
      id: list ? list.id : "",
      name: retailerForm.name ? retailerForm.name : null,
      zx_firstname: retailerForm.zx_firstname
        ? retailerForm.zx_firstname
        : null,
      zx_lastname: retailerForm.zx_lastname ? retailerForm.zx_lastname : null,
      zx_accounttype: "Retailer",
      zx_udaannumber: retailerForm.zx_udaannumber,
      zx_alternatemobileno: retailerForm.zx_alternatemobileno,
      telephone1: retailerForm.telephone1 ? retailerForm.telephone1 : null,
      emailaddress1: retailerForm.emailaddress1
        ? retailerForm.emailaddress1
        : null,
      address1_line1: retailerForm.address1_line1
        ? retailerForm.address1_line1
        : null,
      address1_line2: retailerForm.address1_line2
        ? retailerForm.address1_line2
        : null,
      zx_dateofbirth: retailerForm.zx_dateofbirth
        ? HelperService.convertMomentDateToTimestamp(
            retailerForm.zx_dateofbirth
          )
        : null,
      zx_landmark: retailerForm.zx_landmark ? retailerForm.zx_landmark : null,
      zx_residencenumber: retailerForm.zx_residencenumber
        ? retailerForm.zx_residencenumber
        : null,
      zx_residentialaddress1: retailerForm.zx_residentialaddress1
        ? retailerForm.zx_residentialaddress1
        : null,
      zx_residentiallandmark: retailerForm.zx_residentiallandmark
        ? retailerForm.zx_residentiallandmark
        : null,
      zx_Residentialpincode1: retailerForm.zx_Residentialpincode1
        ? retailerForm.zx_Residentialarea1
        : list
        ? list.zx_pincode
        : null,
      zx_Residentialarea1: retailerForm.zx_Residentialarea1
        ? retailerForm.zx_Residentialarea1
        : list
        ? list.zx_area
        : null,
      zx_residentialcity1: retailerForm.zx_residentialcity1
        ? retailerForm.zx_residentialcity1
        : list
        ? list.zx_city
        : null,
      zx_Residentialdistrict1: retailerForm.zx_Residentialdistrict1
        ? retailerForm.zx_Residentialdistrict1
        : list
        ? list.zx_district
        : null,
      zx_Residentialstate1: retailerForm.zx_Residentialstate1
        ? retailerForm.zx_Residentialstate1
        : list
        ? list.zx_state
        : null,
      zx_Residentialzone1: retailerForm.zx_Residentialzone1
        ? retailerForm.zx_Residentialzone1
        : list
        ? list.zx_zone
        : null,
      zx_Residentialsubstate1: retailerForm.zx_Residentialsubstate1
        ? retailerForm.zx_Residentialsubstate1
        : list
        ? list.zx_substate
        : null,
      zx_age: retailerForm.zx_age ? retailerForm.zx_age : null,
      zx_dateofanniversary: retailerForm.zx_dateofanniversary
        ? HelperService.convertMomentDateToTimestamp(
            retailerForm.zx_dateofanniversary
          )
        : null,
      zx_noofchildren: retailerForm.zx_noofchildren
        ? retailerForm.zx_noofchildren
        : null,
      zx_education: retailerForm.zx_education
        ? retailerForm.zx_education
        : null,
      zx_language: "b0e024c8-8c2c-40e5-a665-7598b4cf61e3",
      zx_languageforwriting: "f4970a12-0fac-4a5c-bdff-fa7b9a21e1e0",
      zx_gstno: retailerForm.zx_gstno ? retailerForm.zx_gstno : null,
      zx_panno: retailerForm.zx_panno ? retailerForm.zx_panno : null,
      zx_aadharnumber: retailerForm.zx_aadharnumber
        ? retailerForm.zx_aadharnumber
        : null,
      zx_drivinglicensenumber: retailerForm.zx_drivinglicensenumber
        ? retailerForm.zx_drivinglicensenumber
        : null,
      zx_voteridnumber: retailerForm.zx_voteridnumber
        ? retailerForm.zx_voteridnumber
        : null,
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
      zx_remarks: retailerForm.zx_remarks ? retailerForm.zx_remarks : null,
      zx_status: retailerForm.zx_status ? retailerForm.zx_status : null,
      zx_saletype: retailerForm.zx_saletype ? retailerForm.zx_saletype : null,
      zx_reasonfornotsellingprinceproducts: retailerForm.zx_reasonfornotsellingprinceproducts
        ? retailerForm.zx_reasonfornotsellingprinceproducts
        : null,
      zx_pincode: retailerForm.zx_pincode
        ? retailerForm.zx_pincode
        : list
        ? list.zx_pincode
        : null,
      zx_area: retailerForm.zx_area
        ? retailerForm.zx_area
        : list
        ? list.zx_area
        : null,
      zx_city: retailerForm.zx_city
        ? retailerForm.zx_city
        : list
        ? list.zx_city
        : null,
      zx_district: retailerForm.zx_district
        ? retailerForm.zx_district
        : list
        ? list.zx_district
        : null,
      zx_substate: retailerForm.zx_substate
        ? retailerForm.zx_substate
        : list
        ? list.zx_substate
        : null,
      zx_state: retailerForm.zx_state
        ? retailerForm.zx_state
        : list
        ? list.zx_state
        : null,
      zx_zone: retailerForm.zx_zone
        ? retailerForm.zx_zone
        : list
        ? list.zx_zone
        : null,
      zx_paymentterm: retailerForm.zx_paymentterm
        ? retailerForm.zx_paymentterm
        : null,
      zx_countertype: retailerForm.zx_countertype
        ? retailerForm.zx_countertype
        : null,
      zx_businessline: retailerForm.zx_businessline
        ? retailerForm.zx_businessline
        : null,
      zx_valueofbusinesslineslakhspa: retailerForm.zx_valueofbusinesslineslakhspa
        ? retailerForm.zx_valueofbusinesslineslakhspa
        : null,
      address1_latitude: 7.909,
      address1_longitude: 5.99,
    };

    return (
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View style={Styles.mainContainer}>
          <Card
            style={
              logindata.zx_brandgroupcode == "1" ? Styles.card : Styles.cardBlue
            }
          >
            <View>
              <BackArrowButton style={Styles.backarrow} />
            </View>
            <Text style={{ ...Styles.titleText, marginLeft: wp("22%") }}>
              {"KYC Form"}
              {/* <Text style={{ ...Styles.titleText, ...Styles.textClr }}>
              {" Retailer"}
            </Text> */}
            </Text>
          </Card>
          {this.props.pincodeInfoLOader == true ||
          this.props.areaInfoLOader == true ||
          this.props.getAllAreaLoader ? (
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
          <ScrollView>
            <View style={Styles.outerView}>
              <View style={Styles.textView1}>
                <Text style={Styles.textStyle}>Firm Name*</Text>
                <InputText
                  style={Styles.placeholder}
                  placeholder={"Enter Firm Name"}
                  value={
                    retailerForm.name
                      ? retailerForm.name
                      : list && list.name
                      ? list.name
                      : ""
                  }
                  onChange={(value) =>
                    this.props.changeRetailerForm({
                      edited_field: "name",
                      edited_value: value,
                    })
                  }
                  error={
                    validation.invalid && validation.invalid_field == "name"
                  }
                />
              </View>

              <View style={Styles.textView1}>
                <Text style={Styles.textStyle}>First Name*</Text>
                <InputText
                  style={Styles.placeholder}
                  placeholder={"Enter First Name"}
                  value={
                    retailerForm.zx_firstname
                      ? retailerForm.zx_firstname
                      : list && list.name
                      ? list.name
                      : ""
                  }
                  onChange={(value) =>
                    this.props.changeRetailerForm({
                      edited_field: "zx_firstname",
                      edited_value: value,
                    })
                  }
                  error={
                    validation.invalid &&
                    validation.invalid_field == "zx_firstname"
                  }
                />
              </View>

              <View style={Styles.textView1}>
                <Text style={Styles.textStyle}>Last Name*</Text>
                <InputText
                  style={Styles.placeholder}
                  placeholder={"Enter Last Name"}
                  value={
                    retailerForm.zx_lastname
                      ? retailerForm.zx_lastname
                      : list && list.name
                      ? list.name
                      : ""
                  }
                  onChange={(value) =>
                    this.props.changeRetailerForm({
                      edited_field: "zx_lastname",
                      edited_value: value,
                    })
                  }
                  error={
                    validation.invalid &&
                    validation.invalid_field == "zx_lastname"
                  }
                />
              </View>

              <View style={Styles.textView1}>
                <Text style={Styles.textStyle}>
                  Mobile Number(UDAAN No. to capture)*{" "}
                </Text>
                <InputNumber
                  style={Styles.placeholder}
                  placeholder={"Enter Number(UDAAN No. to capture)*"}
                  value={retailerForm.zx_udaannumber}
                  onChange={(value) =>
                    this.props.changeRetailerForm({
                      edited_field: "zx_udaannumber",
                      edited_value: value,
                    })
                  }
                  maxLength={10}
                  error={
                    validation.invalid &&
                    validation.invalid_field == "zx_udaannumber"
                  }
                />
              </View>
              <Text style={{ color: "red" }}>
                {this.validatePhoneNumber(retailerForm.zx_udaannumber)}
              </Text>

              <View style={Styles.textView1}>
                <Text style={Styles.textStyle}>Alternate Number*</Text>
                <InputMobile
                  style={Styles.placeholder}
                  maxLength={10}
                  placeholder={"Enter Alternate Number"}
                  value={retailerForm.zx_alternatemobileno}
                  onChange={(value) =>
                    this.props.changeRetailerForm({
                      edited_field: "zx_alternatemobileno",
                      edited_value: value,
                    })
                  }
                  error={
                    validation.invalid &&
                    validation.invalid_field == "zx_alternatemobileno"
                  }
                />
              </View>
              <Text style={{ color: "red" }}>
                {this.validatePhoneNumber(retailerForm.zx_alternatemobileno)}
              </Text>

              <View style={Styles.textView1}>
                <Text style={Styles.textStyle}>Landline Number</Text>
                <InputMobile
                  style={Styles.placeholder}
                  placeholder={"Enter Landline Number"}
                  value={retailerForm.telephone1}
                  onChange={(value) =>
                    this.props.changeRetailerForm({
                      edited_field: "telephone1",
                      edited_value: value,
                    })
                  }
                  // maxLength={10}
                />
              </View>

              <View style={Styles.textView1}>
                <Text style={Styles.textStyle}>Enter Email Id</Text>
                <InputText
                  style={Styles.placeholder}
                  placeholder={"Enter Email Id"}
                  value={retailerForm.emailaddress1}
                  onChange={(value) =>
                    this.props.changeRetailerForm({
                      edited_field: "emailaddress1",
                      edited_value: value,
                    })
                  }
                  // error={
                  //   validation.invalid &&
                  //   validation.invalid_field == "emailaddress1"
                  // }
                />
              </View>
              <Text style={{ color: "red" }}>
                {this.validateEmail(retailerForm.emailaddress1)}
              </Text>

              <View style={Styles.textView1}>
                <Text style={Styles.textStyle}>Address 1*</Text>
                <InputText
                  style={Styles.placeholder}
                  placeholder={"Enter Address 1"}
                  value={retailerForm.address1_line1}
                  onChange={(value) =>
                    this.props.changeRetailerForm({
                      edited_field: "address1_line1",
                      edited_value: value,
                    })
                  }
                  error={
                    validation.invalid &&
                    validation.invalid_field == "address1_line1"
                  }
                />
              </View>

              <View style={Styles.textView1}>
                <Text style={Styles.textStyle}>Address 2*</Text>
                <InputText
                  style={Styles.placeholder}
                  placeholder={"Enter Address 2"}
                  value={retailerForm.address1_line2}
                  onChange={(value) =>
                    this.props.changeRetailerForm({
                      edited_field: "address1_line2",
                      edited_value: value,
                    })
                  }
                  error={
                    validation.invalid &&
                    validation.invalid_field == "address1_line2"
                  }
                />
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
                <InputText
                  style={Styles.placeholder}
                  placeholder={"Enter Landmark"}
                  value={retailerForm.zx_landmark}
                  onChange={(value) =>
                    this.props.changeRetailerForm({
                      edited_field: "zx_landmark",
                      edited_value: value,
                    })
                  }
                />
              </View>

              <View style={Styles.dropDown}>
                <Text style={Styles.textStyle}>Zone*</Text>

                <View style={Styles.dropDownInner}>
                  <SearchableDropdown
                    dataSource={this.getZone()}
                    placeHolderText={"Select Zone"}
                    selectedValue={retailerForm.zx_zone}
                    onChange={(value) => {
                      this.props.changeRetailerForm({
                        edited_field: "zx_zone",
                        edited_value: value,
                      }),
                        this.props.getAllState({
                          token,
                          id: agentid,
                          level: 2,
                          first_level: 1,
                          guidId: value,
                        });
                    }}
                    placeholder={"Select Zone"}
                    invalid={false}
                    customPickerStyles={{ ...Styles.picker }}
                    labelStyles={{ ...Styles.pickerLabel }}
                    key={retailerForm.zx_zone + _.uniqueId()}
                    error={
                      validation.invalid &&
                      validation.invalid_field == "zx_zone"
                    }
                    // disablePicker={true}
                    //  label={"Area"}
                  />
                </View>
              </View>

              <View style={Styles.dropDown}>
                <Text style={Styles.textStyle}>State*</Text>

                <View style={Styles.dropDownInner}>
                  <SearchableDropdown
                    dataSource={this.getState()}
                    placeHolderText={"Select State"}
                    selectedValue={retailerForm.zx_state}
                    onChange={(value) => {
                      this.props.changeRetailerForm({
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
                    invalid={false}
                    customPickerStyles={{ ...Styles.picker }}
                    labelStyles={{ ...Styles.pickerLabel }}
                    key={retailerForm.zx_state + _.uniqueId()}
                    error={
                      validation.invalid &&
                      validation.invalid_field == "zx_state"
                    }
                    // disablePicker={true}
                    //  label={"Area"}
                  />
                </View>
              </View>

              <View style={Styles.dropDown}>
                <Text style={Styles.textStyle}>Sub State/Market Circle*</Text>

                <View style={Styles.dropDownInner}>
                  <SearchableDropdown
                    dataSource={this.getSubState()}
                    placeHolderText={"Select Sub State/Market Circle"}
                    selectedValue={retailerForm.zx_substate}
                    onChange={(value) => {
                      this.props.changeRetailerForm({
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
                    placeholder={"Select Sub State/Market Circle"}
                    invalid={false}
                    customPickerStyles={{ ...Styles.picker }}
                    labelStyles={{ ...Styles.pickerLabel }}
                    key={retailerForm.zx_substate + _.uniqueId()}
                    error={
                      validation.invalid &&
                      validation.invalid_field == "zx_substate"
                    }
                    // disablePicker={true}
                    //  label={"Area"}
                  />
                </View>
              </View>

              <View style={Styles.dropDown}>
                <Text style={Styles.textStyle}>District*</Text>

                <View style={Styles.dropDownInner}>
                  <SearchableDropdown
                    dataSource={this.getDistrict()}
                    placeHolderText={"Select District"}
                    selectedValue={retailerForm.zx_district}
                    onChange={(value) => {
                      this.props.changeRetailerForm({
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
                    placeholder={"Select District"}
                    invalid={false}
                    customPickerStyles={{ ...Styles.picker }}
                    labelStyles={{ ...Styles.pickerLabel }}
                    key={retailerForm.zx_district + _.uniqueId()}
                    error={
                      validation.invalid &&
                      validation.invalid_field == "zx_district"
                    }
                    // disablePicker={true}
                    //  label={"Area"}
                  />
                </View>
              </View>

              <View style={Styles.dropDown}>
                <Text style={Styles.textStyle}>City/Town*</Text>

                <View style={Styles.dropDownInner}>
                  <SearchableDropdown
                    dataSource={this.getCity()}
                    placeHolderText={"Select City/Town"}
                    selectedValue={retailerForm.zx_city}
                    onChange={(value) => {
                      this.props.changeRetailerForm({
                        edited_field: "zx_city",
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
                    placeholder={"Select City/Town"}
                    invalid={false}
                    customPickerStyles={{ ...Styles.picker }}
                    labelStyles={{ ...Styles.pickerLabel }}
                    key={retailerForm.zx_city + _.uniqueId()}
                    error={
                      validation.invalid &&
                      validation.invalid_field == "zx_city"
                    }
                    // disablePicker={true}
                    //  label={"Area"}
                  />
                </View>
              </View>
              <View style={Styles.dropDown}>
                <Text style={Styles.textStyle}>Pin Code*</Text>

                <View style={Styles.dropDownInner}>
                  <SearchableDropdown
                    dataSource={this.getPincode()}
                    placeHolderText={"Select Pincode"}
                    selectedValue={retailerForm.zx_pincode}
                    onChange={(value) => {
                      this.props.changeRetailerForm({
                        edited_field: "zx_pincode",
                        edited_value: value,
                      }),
                        this.props.getAllArea({
                          token,
                          id: agentid,
                          level: 7,
                          first_level: 6,
                          guidId: value,
                        });
                    }}
                    placeholder={"Select Pincode"}
                    invalid={false}
                    customPickerStyles={{ ...Styles.picker }}
                    labelStyles={{ ...Styles.pickerLabel }}
                    key={retailerForm.zx_pincode + _.uniqueId()}
                    error={
                      validation.invalid &&
                      validation.invalid_field == "zx_pincode"
                    }
                    //  label={"Area"}
                  />
                </View>
              </View>

              <View style={Styles.dropDown}>
                <Text style={Styles.textStyle}>Area*</Text>

                <View style={Styles.dropDownInner}>
                  <SearchableDropdown
                    dataSource={this.getArea()}
                    placeHolderText={"Select Area"}
                    selectedValue={retailerForm.zx_area}
                    onChange={(value) =>
                      this.props.changeRetailerForm({
                        edited_field: "zx_area",
                        edited_value: value,
                      })
                    }
                    placeholder={"Select Area"}
                    invalid={false}
                    customPickerStyles={{ ...Styles.picker }}
                    labelStyles={{ ...Styles.pickerLabel }}
                    key={retailerForm.zx_area + _.uniqueId()}
                    // invalid={
                    //   validation.invalid && validation.invalid_field == "zx_area"
                    // }
                    //  label={"Area"}
                  />
                </View>
              </View>

              {recordid.id == "Plumber" ? (
                []
              ) : (
                <View style={Styles.textView1}>
                  <Text style={Styles.textStyle}>Residence Number</Text>
                  <InputNumber
                    style={Styles.placeholder}
                    placeholder={"Enter Residence Number"}
                    value={retailerForm.zx_residencenumber}
                    onChange={(value) =>
                      this.props.changeRetailerForm({
                        edited_field: "zx_residencenumber",
                        edited_value: value,
                      })
                    }
                    maxLength={5}
                  />
                </View>
              )}

              {recordid.id == "Plumber" ? (
                []
              ) : (
                <View style={Styles.textView1}>
                  <Text style={Styles.textStyle}>Residential Address </Text>
                  <InputText
                    style={Styles.placeholder}
                    placeholder={"Enter Residential Address 1"}
                    value={retailerForm.zx_residentialaddress1}
                    onChange={(value) =>
                      this.props.changeRetailerForm({
                        edited_field: "zx_residentialaddress1",
                        edited_value: value,
                      })
                    }
                  />
                </View>
              )}

              {recordid.id == "Plumber" ? (
                []
              ) : (
                <View style={Styles.textView1}>
                  <Text style={Styles.textStyle}>Residential Landmark</Text>
                  <InputText
                    style={Styles.placeholder}
                    placeholder={"Enter Residential Landmark"}
                    value={retailerForm.zx_residentiallandmark}
                    onChange={(value) =>
                      this.props.changeRetailerForm({
                        edited_field: "zx_residentiallandmark",
                        edited_value: value,
                      })
                    }
                  />
                </View>
              )}

              {/* <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>Residence Pincode</Text>
              <InputText
                style={Styles.placeholder}
                placeholder={"Enter Residence Pincode"}
                value={retailerForm.rnum}
                onChange={(value) =>
                  this.props.changeRetailerForm({
                    edited_field: "rarea",
                    edited_value: value,
                  })
                }
              />
            </View> */}

              {recordid.id == "Plumber" ? (
                []
              ) : (
                <View style={Styles.dropDown}>
                  <Text style={Styles.textStyle}>Residence Zone</Text>

                  <View style={Styles.dropDownInner}>
                    <SearchableDropdown
                      dataSource={this.getZone1()}
                      placeHolderText={"Select Residence Zone"}
                      selectedValue={retailerForm.zx_Residentialzone1}
                      onChange={(value) => {
                        this.props.changeRetailerForm({
                          edited_field: "zx_Residentialzone1",
                          edited_value: value,
                        }),
                          this.props.getResidenceState({
                            token,
                            id: agentid,
                            level: 2,
                            first_level: 1,
                            guidId: value,
                          });
                      }}
                      placeholder={"Select Residence Zone"}
                      invalid={false}
                      customPickerStyles={{ ...Styles.picker }}
                      labelStyles={{ ...Styles.pickerLabel }}
                      key={retailerForm.zx_Residentialzone1 + _.uniqueId()}
                      // invalid={
                      //   validation.invalid && validation.invalid_field == "area__c"
                      // }
                      //  label={"Area"}
                    />
                  </View>
                </View>
              )}

              {recordid.id == "Plumber" ? (
                []
              ) : (
                <View style={Styles.dropDown}>
                  <Text style={Styles.textStyle}>Residence State</Text>

                  <View style={Styles.dropDownInner}>
                    <SearchableDropdown
                      dataSource={this.getState1()}
                      placeHolderText={"Select Residence State"}
                      selectedValue={retailerForm.zx_Residentialstate1}
                      onChange={(value) => {
                        this.props.changeRetailerForm({
                          edited_field: "zx_Residentialstate1",
                          edited_value: value,
                        }),
                          this.props.getResidenceSubState({
                            token,
                            id: agentid,
                            level: 3,
                            first_level: 2,
                            guidId: value,
                          });
                      }}
                      placeholder={"Select Residence State"}
                      invalid={false}
                      customPickerStyles={{ ...Styles.picker }}
                      labelStyles={{ ...Styles.pickerLabel }}
                      key={retailerForm.zx_Residentialstate1 + _.uniqueId()}
                      // invalid={
                      //   validation.invalid && validation.invalid_field == "area__c"
                      // }
                      //  label={"Area"}
                    />
                  </View>
                </View>
              )}
              {recordid.id == "Plumber" ? (
                []
              ) : (
                <View style={Styles.dropDown}>
                  <Text style={Styles.textStyle}>Residence Sub-State</Text>

                  <View style={Styles.dropDownInner}>
                    <SearchableDropdown
                      dataSource={this.getSubState1()}
                      placeHolderText={"Select Residence Sub-State"}
                      selectedValue={retailerForm.zx_Residentialsubstate1}
                      onChange={(value) => {
                        this.props.changeRetailerForm({
                          edited_field: "zx_Residentialsubstate1",
                          edited_value: value,
                        }),
                          this.props.getResidenceDistrict({
                            token,
                            id: agentid,
                            level: 4,
                            first_level: 3,
                            guidId: value,
                          });
                      }}
                      placeholder={"Select Residence Sub-State"}
                      invalid={false}
                      customPickerStyles={{ ...Styles.picker }}
                      labelStyles={{ ...Styles.pickerLabel }}
                      key={retailerForm.zx_Residentialsubstate1 + _.uniqueId()}
                      // invalid={
                      //   validation.invalid && validation.invalid_field == "area__c"
                      // }
                      //  label={"Area"}
                    />
                  </View>
                </View>
              )}
              {recordid.id == "Plumber" ? (
                []
              ) : (
                <View style={Styles.dropDown}>
                  <Text style={Styles.textStyle}>Residence District</Text>

                  <View style={Styles.dropDownInner}>
                    <SearchableDropdown
                      dataSource={this.getDistrict1()}
                      placeHolderText={"Select Residence District"}
                      selectedValue={retailerForm.zx_Residentialdistrict1}
                      onChange={(value) => {
                        this.props.changeRetailerForm({
                          edited_field: "zx_Residentialdistrict1",
                          edited_value: value,
                        }),
                          this.props.getResidenceCity({
                            token,
                            id: agentid,
                            level: 5,
                            first_level: 4,
                            guidId: value,
                          });
                      }}
                      placeholder={"Select Residence District"}
                      invalid={false}
                      customPickerStyles={{ ...Styles.picker }}
                      labelStyles={{ ...Styles.pickerLabel }}
                      key={retailerForm.zx_Residentialdistrict1 + _.uniqueId()}
                      // invalid={
                      //   validation.invalid && validation.invalid_field == "area__c"
                      // }
                      //  label={"Area"}
                    />
                  </View>
                </View>
              )}
              {recordid.id == "Plumber" ? (
                []
              ) : (
                <View style={Styles.dropDown}>
                  <Text style={Styles.textStyle}>Residence City</Text>

                  <View style={Styles.dropDownInner}>
                    <SearchableDropdown
                      dataSource={this.getCity1()}
                      placeHolderText={"Select Residence City"}
                      selectedValue={retailerForm.zx_residentialcity1}
                      onChange={(value) => {
                        this.props.changeRetailerForm({
                          edited_field: "zx_residentialcity1",
                          edited_value: value,
                        }),
                          this.props.getResidencePincode({
                            token,
                            id: agentid,
                            level: 6,
                            first_level: 5,
                            guidId: value,
                          });
                      }}
                      placeholder={"Select Residence City"}
                      invalid={false}
                      customPickerStyles={{ ...Styles.picker }}
                      labelStyles={{ ...Styles.pickerLabel }}
                      key={retailerForm.zx_residentialcity1 + _.uniqueId()}
                      // invalid={
                      //   validation.invalid && validation.invalid_field == "area__c"
                      // }
                      //  label={"Area"}
                    />
                  </View>
                </View>
              )}

              {recordid.id == "Plumber" ? (
                []
              ) : (
                <View style={Styles.dropDown}>
                  <Text style={Styles.textStyle}>Residence Pincode</Text>

                  <View style={Styles.dropDownInner}>
                    <SearchableDropdown
                      dataSource={this.getPincode1()}
                      placeHolderText={"Select Residence Pincode"}
                      selectedValue={retailerForm.zx_Residentialpincode1}
                      onChange={(value) => {
                        {
                          this.props.changeRetailerForm({
                            edited_field: "zx_Residentialpincode1",
                            edited_value: value,
                          }),
                            this.props.getResidenceArea({
                              token,
                              id: agentid,
                              level: 7,
                              first_level: 6,
                              guidId: value,
                            });
                        }
                      }}
                      placeholder={"Select Residence Pincode"}
                      invalid={false}
                      customPickerStyles={{ ...Styles.picker }}
                      labelStyles={{ ...Styles.pickerLabel }}
                      key={retailerForm.zx_Residentialpincode1 + _.uniqueId()}
                      // invalid={
                      //   validation.invalid && validation.invalid_field == "area__c"
                      // }
                      //  label={"Area"}
                    />
                  </View>
                </View>
              )}

              {recordid.id == "Plumber" ? (
                []
              ) : (
                <View style={Styles.dropDown}>
                  <Text style={Styles.textStyle}>Residence Area</Text>

                  <View style={Styles.dropDownInner}>
                    <SearchableDropdown
                      dataSource={this.getArea1()}
                      placeHolderText={"Select Residence Area"}
                      selectedValue={retailerForm.zx_Residentialarea1}
                      onChange={(value) =>
                        this.props.changeRetailerForm({
                          edited_field: "zx_Residentialarea1",
                          edited_value: value,
                        })
                      }
                      placeholder={"Select Residence Area"}
                      invalid={false}
                      customPickerStyles={{ ...Styles.picker }}
                      labelStyles={{ ...Styles.pickerLabel }}
                      key={retailerForm.zx_Residentialarea1 + _.uniqueId()}
                      // invalid={
                      //   validation.invalid && validation.invalid_field == "area__c"
                      // }
                      //  label={"Area"}
                    />
                  </View>
                </View>
              )}

              <View style={Styles.textView1}>
                <Text style={Styles.textStyle}>No. of Children</Text>
                <InputNumber
                  style={Styles.placeholder}
                  placeholder={"Enter No. of Children"}
                  value={retailerForm.zx_noofchildren}
                  onChange={(value) =>
                    this.props.changeRetailerForm({
                      edited_field: "zx_noofchildren",
                      edited_value: value,
                    })
                  }
                />
              </View>

              <View style={Styles.textView1}>
                <Text style={Styles.textStyle}>Education</Text>

                <InputText
                  style={Styles.placeholder}
                  placeholder={"Enter Education"}
                  value={retailerForm.zx_education}
                  onChange={(value) =>
                    this.props.changeRetailerForm({
                      edited_field: "zx_education",
                      edited_value: value,
                    })
                  }
                />
              </View>
              <View style={Styles.dropDown}>
                <Text style={Styles.textStyle}>Language Spoken*</Text>

                <View style={Styles.dropDownInner}>
                  <SearchableDropdown
                    dataSource={[
                      { id: "Hindi", name: "Hindi" },
                      { id: "Punjabi", name: "Punjabi" },
                      { id: "English", name: "English" },
                      { id: "Marathi", name: "Marathi" },
                      { id: "Bengali", name: "Bengali" },
                      { id: "Gujarati", name: "Gujarati" },
                      { id: "Kannada", name: "Kannada" },
                      { id: "Malayalam", name: "Malayalam" },
                    ]}
                    placeHolderText={"Select Language Spoken"}
                    selectedValue={retailerForm.zx_languageusedforspeaking}
                    onChange={(value) =>
                      this.props.changeRetailerForm({
                        edited_field: "zx_languageusedforspeaking",
                        edited_value: value,
                      })
                    }
                    placeholder={"Select Language Spoken"}
                    invalid={false}
                    customPickerStyles={{ ...Styles.picker }}
                    labelStyles={{ ...Styles.pickerLabel }}
                    error={
                      validation.invalid &&
                      validation.invalid_field == "zx_languageusedforspeaking"
                    }
                    // invalid={
                    //   validation.invalid && validation.invalid_field == "area__c"
                    // }
                    //  label={"Area"}
                  />
                </View>
              </View>
              <View style={Styles.dropDown}>
                <Text style={Styles.textStyle}>Language For Writing*</Text>

                <View style={Styles.dropDownInner}>
                  <SearchableDropdown
                    dataSource={[
                      { id: "Hindi", name: "Hindi" },
                      { id: "Punjabi", name: "Punjabi" },
                      { id: "English", name: "English" },
                      { id: "Marathi", name: "Marathi" },
                      { id: "Bengali", name: "Bengali" },
                      { id: "Gujarati", name: "Gujarati" },
                      { id: "Kannada", name: "Kannada" },
                      { id: "Malayalam", name: "Malayalam" },
                    ]}
                    placeHolderText={"Select Language For Writing"}
                    selectedValue={retailerForm.zx_languageusedforwriting}
                    onChange={(value) =>
                      this.props.changeRetailerForm({
                        edited_field: "zx_languageusedforwriting",
                        edited_value: value,
                      })
                    }
                    placeholder={"Select Language For Writing"}
                    invalid={false}
                    customPickerStyles={{ ...Styles.picker }}
                    labelStyles={{ ...Styles.pickerLabel }}
                    error={
                      validation.invalid &&
                      validation.invalid_field == "zx_languageusedforwriting"
                    }
                    // invalid={
                    //   validation.invalid && validation.invalid_field == "area__c"
                    // }
                    //  label={"Area"}
                  />
                </View>
              </View>
              {/* <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>Language For Writing</Text>

              <InputText
                style={Styles.placeholder}
                placeholder={"Ente Language For Writing"}
                value={retailerForm.lanwriting}
                onChange={(value) =>
                  this.props.changeRetailerForm({
                    edited_field: "lanwriting",
                    edited_value: value,
                  })
                }
              />
            </View> */}

              {recordid.id == "Plumber" ? (
                []
              ) : (
                <View style={Styles.textView1}>
                  <Text style={Styles.textStyle}>GST No.</Text>
                  <InputText
                    style={Styles.placeholder}
                    placeholder={"Enter GST No."}
                    value={retailerForm.zx_gstno}
                    autoCapitalize="characters"
                    onChange={(value) =>
                      this.props.changeRetailerForm({
                        edited_field: "zx_gstno",
                        edited_value: value,
                      })
                    }
                    error={
                      validation.invalid &&
                      validation.invalid_field == "zx_gstno"
                    }
                  />
                </View>
              )}
              {recordid.id == "Plumber" ? (
                []
              ) : (
                <Text style={{ color: "red" }}>
                  {this.validateGstNumber(retailerForm.zx_gstno)}
                </Text>
              )}

              <View style={Styles.textView1}>
                <Text style={Styles.textStyle}>PAN No.</Text>
                <InputText
                  style={Styles.placeholder}
                  placeholder={"Enter PAN No."}
                  value={retailerForm.zx_panno}
                  onChange={(value) =>
                    this.props.changeRetailerForm({
                      edited_field: "zx_panno",
                      edited_value: value,
                    })
                  }
                  autoCapitalize="characters"
                  maxLength={10}
                  error={
                    validation.invalid && validation.invalid_field == "zx_panno"
                  }
                />
              </View>
              <Text style={{ color: "red" }}>
                {this.validatePan(retailerForm.zx_panno)}
              </Text>

              <View style={Styles.textView1}>
                <Text style={Styles.textStyle}>Aadhar No.</Text>
                <InputNumber
                  style={Styles.placeholder}
                  placeholder={"Ente Aadhar No."}
                  value={retailerForm.zx_aadharnumber}
                  onChange={(value) =>
                    this.props.changeRetailerForm({
                      edited_field: "zx_aadharnumber",
                      edited_value: value,
                    })
                  }
                  maxLength={12}
                  // error={
                  //   validation.invalid &&
                  //   validation.invalid_field == "zx_aadharnumber"
                  // }
                />
              </View>
              <Text style={{ color: "red" }}>
                {this.validateAadhaar(retailerForm.zx_aadharnumber)}
              </Text>

              <View style={Styles.textView1}>
                <Text style={Styles.textStyle}>Driving License No.</Text>
                <InputText
                  style={Styles.placeholder}
                  placeholder={"Ente Driving License No."}
                  value={retailerForm.zx_drivinglicensenumber}
                  onChange={(value) =>
                    this.props.changeRetailerForm({
                      edited_field: "zx_drivinglicensenumber",
                      edited_value: value,
                    })
                  }
                  // error={
                  //   validation.invalid &&
                  //   validation.invalid_field == "zx_drivinglicensenumber"
                  // }
                />
              </View>
              <Text style={{ color: "red" }}>
                {this.validateDL(retailerForm.zx_drivinglicensenumber)}
              </Text>

              <View style={Styles.textView1}>
                <Text style={Styles.textStyle}>Voter ID No.</Text>
                <InputText
                  style={Styles.placeholder}
                  placeholder={"Ente Voter ID No."}
                  value={retailerForm.zx_voteridnumber}
                  onChange={(value) =>
                    this.props.changeRetailerForm({
                      edited_field: "zx_voteridnumber",
                      edited_value: value,
                    })
                  }
                  // error={
                  //   validation.invalid &&
                  //   validation.invalid_field == "zx_voteridnumber"
                  // }
                />
              </View>
              <Text style={{ color: "red" }}>
                {this.validateVoterId(retailerForm.zx_voteridnumber)}
              </Text>

              {/* <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>Registered Date</Text>
              <InputText
                style={Styles.placeholder}
                placeholder={"Enter Registered Date"}
                value={retailerForm.rdate}
                onChange={(value) =>
                  this.props.changeRetailerForm({
                    edited_field: "rdate",
                    edited_value: value,
                  })
                }
              />
            </View> */}

              <View style={Styles.dropDown}>
                <Text style={Styles.textStyle}>UDAAN STATUS*</Text>
                <View style={Styles.dropDownInner}>
                  <SearchableDropdown
                    dataSource={[
                      { id: "Enrolled Only", name: "Enrolled Only" },
                      {
                        id: "Enrolled and validated",
                        name: "Enrolled and validated",
                      },
                    ]}
                    placeHolderText={"Select UDAAN STATUS"}
                    selectedValue={retailerForm.zx_udaanstatus}
                    onChange={(value) =>
                      this.props.changeRetailerForm({
                        edited_field: "zx_udaanstatus",
                        edited_value: value,
                      })
                    }
                    placeholder={"Select UDAAN STATUS"}
                    invalid={false}
                    customPickerStyles={{ ...Styles.picker }}
                    labelStyles={{ ...Styles.pickerLabel }}
                    error={
                      validation.invalid &&
                      validation.invalid_field == "zx_udaanstatus"
                    }
                    // label={"Area"}
                  />
                </View>
              </View>

              {/* <View style={Styles.textView2}>
              <Text style={Styles.textStyle}>
                Enrolled & Validated on UDAAN
              </Text>
              <View style={{ flexDirection: "row" }}>
                <View style={{ marginTop: hp("3.5%"), flexDirection: "row" }}>
                  <Label
                    style={{
                      marginLeft: wp("1%"),
                      fontSize: 13,
                      marginTop: hp("1%"),
                    }}
                  >
                    {"Enrolled"}
                  </Label>
                  <CheckBox
                    style={{ marginLeft: wp("2%"), marginTop: hp("1%") }}
                    checked={retailerForm.enrollvalnum == true}
                    onPress={(event) => {
                      let updatedValue =
                        retailerForm.enrollvalnum == true ? false : true;
                      this.props.changeRetailerForm({
                        edited_field: "enrollvalnum",
                        edited_value: updatedValue,
                      });
                    }}
                  />
                </View>

                <View style={{ marginTop: hp("3.5%"), flexDirection: "row" }}>
                  <Label
                    style={{
                      marginLeft: wp("15%"),
                      fontSize: 13,
                      marginTop: hp("1%"),
                    }}
                  >
                    {"Validated"}
                  </Label>
                  <CheckBox
                    style={{ marginLeft: wp("2%"), marginTop: hp("1%") }}
                    checked={retailerForm.enrollvalnum == true}
                    onPress={(event) => {
                      let updatedValue =
                        retailerForm.enrollvalnum == true ? false : true;
                      this.props.changeRetailerForm({
                        edited_field: "enrollvalnum",
                        edited_value: updatedValue,
                      });
                    }}
                  />
                </View>
              </View>
            </View> */}

              <View style={Styles.dropDown}>
                <Text style={Styles.textStyle}>Enrolled in UBS*</Text>
                <View style={Styles.dropDownInner}>
                  <SearchableDropdown
                    dataSource={[
                      { id: "Yes", name: "Yes" },
                      { id: "No", name: "No" },
                    ]}
                    placeHolderText={"Select Enrolled in UBS"}
                    selectedValue={retailerForm.zx_enrolledinubs}
                    onChange={(value) =>
                      this.props.changeRetailerForm({
                        edited_field: "zx_enrolledinubs",
                        edited_value: value,
                      })
                    }
                    placeholder={"Select Enrolled in UBS"}
                    invalid={false}
                    customPickerStyles={{ ...Styles.picker }}
                    labelStyles={{ ...Styles.pickerLabel }}
                    error={
                      validation.invalid &&
                      validation.invalid_field == "zx_enrolledinubs"
                    }
                    // label={"Area"}
                  />
                </View>
              </View>

              {/* <View style={Styles.textView2}>
              <Text style={Styles.textStyle}>Enrolled in USB</Text>
            </View>

            <View style={Styles.radioBtnInner}>
              <Text style={Styles.radioText}>Yes</Text>
              <Radio
                style={Styles.radioBtn}
                onPress={() =>
                  this.props.changeRetailerForm({
                    edited_field: "zx_constitutionofthefirm",
                    edited_value: "Partner",
                  })
                }
                selected={false}
                selected={retailerForm.zx_constitutionofthefirm == "Partner"}
                selectedColor={Colors.button}
                color={Colors.button}
              />
            </View>

            <View style={Styles.radioBtnInner}>
              <Text style={Styles.radioText}>No</Text>
              <Radio
                style={Styles.radioBtn}
                onPress={() =>
                  this.props.changeRetailerForm({
                    edited_field: "zx_constitutionofthefirm",
                    edited_value: "Partner",
                  })
                }
                selected={false}
                selected={retailerForm.zx_constitutionofthefirm == "Partner"}
                selectedColor={Colors.button}
                color={Colors.button}
              />
            </View> */}

              <View style={Styles.textView1}>
                <Text style={Styles.textStyle}>Payment Terms</Text>
                <InputNumber
                  style={Styles.placeholder}
                  placeholder={"Enter Payment Terms"}
                  value={retailerForm.zx_paymentterm}
                  onChange={(value) =>
                    this.props.changeRetailerForm({
                      edited_field: "zx_paymentterm",
                      edited_value: value,
                    })
                  }
                />
              </View>

              <View style={Styles.textView1}>
                <Text style={Styles.textStyle}>Remarks</Text>

                <InputText
                  style={Styles.placeholder}
                  placeholder={"Enter Remarks"}
                  value={retailerForm.zx_remarks}
                  onChange={(value) =>
                    this.props.changeRetailerForm({
                      edited_field: "zx_remarks",
                      edited_value: value,
                    })
                  }
                />
              </View>

              {/* <View style={Styles.dropDown}>
              <Text style={Styles.textStyle}>Competitor Name</Text>
              <View style={Styles.dropDownInner}>
                <SearchableDropdown
                  dataSource={compName}
                  placeHolderText={"Select Competitor Name"}
                  selectedValue={retailerForm.id}
                  onChange={(value) =>
                    this.props.changeRetailerForm({
                      edited_field: "id",
                      edited_value: value,
                    })
                  }
                  placeholder={"Select Competitor Name"}
                  invalid={false}
                  customPickerStyles={{ ...Styles.picker }}
                  labelStyles={{ ...Styles.pickerLabel }}
                  // invalid={
                  //   validation.invalid && validation.invalid_field == "area__c"
                  // }
                  // label={"Area"}
                />
              </View>
            </View>

            <View style={Styles.dropDown}>
              <Text style={Styles.textStyle}>Competitor Product</Text>
              <View style={Styles.dropDownInner}>
                <SearchableDropdown
                  dataSource={compProduct}
                  placeHolderText={"Select Competitor Product"}
                  selectedValue={retailerForm.id}
                  onChange={(value) =>
                    this.props.changeRetailerForm({
                      edited_field: "id",
                      edited_value: value,
                    })
                  }
                  placeholder={"Select Competitor Product"}
                  invalid={false}
                  customPickerStyles={{ ...Styles.picker }}
                  labelStyles={{ ...Styles.pickerLabel }}
                  // invalid={
                  //   validation.invalid && validation.invalid_field == "area__c"
                  // }
                  // label={"Area"}
                />
              </View>
            </View> */}

              <View style={Styles.textView2}>
                <Text style={Styles.textStyle}>Select One*</Text>
              </View>
              <View style={{ width: wp("90%"), flexDirection: "row" }}>
                <View style={Styles.radioBtnInner}>
                  <Text style={Styles.radioText}>PPF</Text>
                  <Radio
                    style={Styles.radioBtn}
                    onPress={() =>
                      this.props.changeRetailerForm({
                        edited_field: "zx_status",
                        edited_value: "PPF",
                      })
                    }
                    // selected={false}
                    selected={retailerForm.zx_status == "PPF"}
                    selectedColor={Colors.button}
                    color={Colors.button}
                  />
                </View>

                <View style={Styles.radioBtnInner}>
                  <Text style={Styles.radioText}>Non PPF</Text>
                  <Radio
                    style={Styles.radioBtn}
                    onPress={() =>
                      this.props.changeRetailerForm({
                        edited_field: "zx_status",
                        edited_value: "Non PPF",
                      })
                    }
                    // selected={false}
                    selected={retailerForm.zx_status == "Non PPF"}
                    selectedColor={Colors.button}
                    color={Colors.button}
                  />
                </View>
              </View>
              {retailerForm.zx_status == "Non PPF" ? (
                <View style={Styles.dropDown}>
                  <Text style={Styles.textStyle}>
                    Reason for not selling Prince pipe products
                  </Text>
                  <View style={Styles.dropDownInner}>
                    <SearchableDropdown
                      dataSource={selectReason}
                      placeHolderText={"Select reason"}
                      selectedValue={
                        retailerForm.zx_reasonfornotsellingprinceproducts
                      }
                      onChange={(value) =>
                        this.props.changeRetailerForm({
                          edited_field: "zx_reasonfornotsellingprinceproducts",
                          edited_value: value,
                        })
                      }
                      placeholder={"Select reason"}
                      invalid={false}
                      customPickerStyles={{ ...Styles.picker }}
                      key={retailerForm.zx_reasonfornotsellingprinceproducts}
                      labelStyles={{ ...Styles.pickerLabel }}

                      // invalid={
                      //   validation.invalid && validation.invalid_field == "area__c"
                      // }
                      // label={"Area"}
                    />
                  </View>
                </View>
              ) : (
                []
              )}

              {/* <View style={Styles.dropDown}>
              <Text style={Styles.textStyle}> Sales Type</Text>
              <View style={Styles.dropDownInner}>
                <SearchableDropdown
                  dataSource={[
                    { id: "Retail", name: "Retail" },
                    { id: "Project", name: "Project" },
                    { id: "NPD", name: "NPD" },
                    { id: "Industrial", name: "Industrial" },
                  ]}
                  placeHolderText={"Select Type"}
                  selectedValue={retailerForm.zx_saletype}
                  onChange={(value) =>
                    this.props.changeRetailerForm({
                      edited_field: "zx_saletype",
                      edited_value: value,
                    })
                  }
                  placeholder={"Select Type"}
                  invalid={false}
                  customPickerStyles={{ ...Styles.picker }}
                  labelStyles={{ ...Styles.pickerLabel }}
                  key={retailerForm.zx_saletype}

                  // invalid={
                  //   validation.invalid && validation.invalid_field == "area__c"
                  // }
                  // label={"Area"}
                />
              </View>
            </View> */}

              <View
                style={{
                  width: wp("35%"),
                  height: hp("12%"),
                  borderBottomWidth: 1,
                  borderColor: Colors.lightGrey,
                  marginTop: hp("1.5%"),
                }}
              >
                <Text style={Styles.textStyle}>DOB</Text>
                <SelectDate
                  date={
                    retailerForm.zx_dateofbirth
                      ? retailerForm.zx_dateofbirth
                      : null
                  }
                  maxDate={new Date()}
                  onDateChange={(date) =>
                    this.props.changeRetailerForm({
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

              <View
                style={{
                  width: wp("35%"),
                  height: hp("12%"),
                  borderBottomWidth: 1,
                  borderColor: Colors.lightGrey,
                  marginTop: hp("1.5%"),
                  marginLeft: wp("10%"),
                }}
              >
                <Text style={Styles.textStyle}>DOA</Text>
                <SelectDate
                  date={
                    retailerForm.zx_dateofanniversary
                      ? retailerForm.zx_dateofanniversary
                      : null
                  }
                  maxDate={new Date()}
                  onDateChange={(date) =>
                    this.props.changeRetailerForm({
                      edited_field: "zx_dateofanniversary",
                      edited_value: date,
                    })
                  }
                />
              </View>

              <View style={Styles.textView1}>
                <Text style={Styles.textStyle}>Age</Text>
                <InputNumber
                  style={Styles.placeholder}
                  value={(retailerForm.zx_age = this.getAge())}
                />
              </View>

              <View style={Styles.dropDown}>
                <Text style={Styles.textStyle}>
                  {recordid.id == "Plumber"
                    ? "Counter Type/ Grade Type"
                    : "Counter Type"}
                </Text>
                <View style={Styles.dropDownInner}>
                  <SearchableDropdown
                    dataSource={[
                      { id: "A+", name: "A+" },
                      { id: "A", name: "A" },
                      { id: "B", name: "B" },
                      { id: "C", name: "C" },
                      { id: "D", name: "D" },
                    ]}
                    placeHolderText={"Select Counter Type"}
                    selectedValue={retailerForm.zx_countertype}
                    onChange={(value) =>
                      this.props.changeRetailerForm({
                        edited_field: "zx_countertype",
                        edited_value: value,
                      })
                    }
                    placeholder={"Select Counter Type"}
                    invalid={false}
                    customPickerStyles={{ ...Styles.picker }}
                    key={retailerForm.zx_countertype}
                    labelStyles={{ ...Styles.pickerLabel }}

                    // invalid={
                    //   validation.invalid && validation.invalid_field == "area__c"
                    // }
                    // label={"Area"}
                  />
                </View>
              </View>
              <View style={Styles.dropDown}>
                <Text style={Styles.textStyle}>Associated Distributor</Text>
                <View style={Styles.dropDownInner}>
                  <SearchableDropdown
                    dataSource={this.getDistributor()}
                    placeHolderText={"Select Partner Type"}
                    selectedValue={retailerForm.parentaccountid}
                    onChange={(value) =>
                      this.props.changeRetailerForm({
                        edited_field: "parentaccountid",
                        edited_value: value,
                      })
                    }
                    placeholder={"Select Partner Type"}
                    invalid={false}
                    customPickerStyles={{ ...Styles.picker }}
                    key={retailerForm.parentaccountid}
                    labelStyles={{ ...Styles.pickerLabel }}
                  />
                </View>
              </View>
              {recordid.id == "Plumber" ? (
                []
              ) : (
                <View
                  style={{
                    width: wp("100%"),
                    marginTop: hp("3%"),
                  }}
                >
                  <SelectBox
                    label="Business Line"
                    labelStyle={{
                      color: Colors.black,
                      fontWeight: "bold",
                      fontSize: 13,
                    }}
                    width="90%"
                    viewMargin="25px"
                    containerStyle={{
                      elevation: 10,
                      // backgroundColor:"#F9F6EE",
                      borderRadius: 2,
                      justifyContent: "center",
                      padding: 10,
                      borderColor: "grey",
                    }}
                    options={[
                      { id: "Tiles", item: "Tiles" },
                      { id: "Paints", item: "Paints" },
                      { id: "Hardware", item: "Hardware" },
                      { id: "Ply and Laminates", item: "Ply and Laminates" },
                      { id: "Cement", item: "Cement" },
                      { id: "Electricals", item: "Electricals" },
                      { id: "Sanitary", item: "Sanitary" },
                      { id: "Others", item: "Others" },
                    ]}
                    selectedValues={this.state.selectedLine}
                    onMultiSelect={this.onMultiChangeLine()}
                    onTapClose={this.onMultiChangeLine()}
                    listOptionProps={{ nestedScrollEnabled: true }}
                    isMulti
                  />
                </View>
              )}

              {this.other() ? (
                <View
                  style={{
                    width: wp("85%"),
                    // marginTop: hp("-7%"),
                    // marginLeft: wp("6%"),
                  }}
                >
                  <IndicatorInputText
                    style={{ marginTop: "10%" }}
                    placeholder={"Enter Business Line!"}
                    //  maxLength={0}
                    value={retailerForm.zx_otherbusinessline}
                    multiline={true}
                    numberOfLines={1}
                    onChange={(value) =>
                      this.props.changeRetailerForm({
                        edited_field: "zx_otherbusinessline",
                        edited_value: value,
                      })
                    }
                  />
                </View>
              ) : (
                []
              )}

              {/* <View style={Styles.dropDown}>
              <Text style={Styles.textStyle}>Business Line</Text>
              <View style={Styles.dropDownInner}>
                <SearchableDropdown
                  dataSource={[
                    { id: "Tiles", name: "Tiles" },
                    { id: "Paints", name: "Paints" },
                    { id: "Hardware", name: "Hardware" },
                    { id: "Ply and Laminates", name: "Ply and Laminates" },
                    { id: "Cement", name: "Cement" },
                    { id: "Electricals", name: "Electricals" },
                    { id: "Sanitary & Others", name: "Sanitary & Others" },
                  ]}
                  placeHolderText={"Select Business Line"}
                  selectedValue={retailerForm.zx_businessline}
                  onChange={(value) =>
                    this.props.changeRetailerForm({
                      edited_field: "zx_businessline",
                      edited_value: value,
                    })
                  }
                  placeholder={"Select Business Line"}
                  invalid={false}
                  customPickerStyles={{ ...Styles.picker }}
                  key={retailerForm.zx_businessline}
                  labelStyles={{ ...Styles.pickerLabel }}
                />
              </View>
            </View> */}
              <View style={Styles.textView1}>
                <Text style={Styles.textStyle}>
                  Value of Business Lines (Lakhs PA)
                </Text>

                <InputNumber
                  style={Styles.placeholder}
                  placeholder={"Enter Value"}
                  value={retailerForm.zx_valueofbusinesslineslakhspa}
                  onChange={(value) =>
                    this.props.changeRetailerForm({
                      edited_field: "zx_valueofbusinesslineslakhspa",
                      edited_value: value,
                    })
                  }
                />
              </View>

              <View
                style={{
                  width: wp("100%"),
                  marginTop: hp("5%"),
                }}
              >
                <SelectBox
                  label="Competitor Name*"
                  labelStyle={{
                    color: Colors.black,
                    fontWeight: "bold",
                    fontSize: 13,
                  }}
                  width="90%"
                  viewMargin="25px"
                  containerStyle={{
                    elevation: 10,
                    // backgroundColor:"#F9F6EE",
                    borderRadius: 2,
                    justifyContent: "center",
                    padding: 10,
                    borderColor: "grey",
                  }}
                  options={this.getName()}
                  selectedValues={this.state.selectedName}
                  onMultiSelect={this.onMultiChange()}
                  onTapClose={this.onMultiChange()}
                  listOptionProps={{ nestedScrollEnabled: true }}
                  isMulti
                />
              </View>

              <View
                style={{
                  width: wp("100%"),
                  marginTop: hp("5%"),
                }}
              >
                <SelectBox
                  label="Competitor Product*"
                  labelStyle={{
                    color: Colors.black,
                    fontWeight: "bold",
                    fontSize: 13,
                  }}
                  width="90%"
                  viewMargin="25px"
                  containerStyle={{
                    elevation: 10,
                    // backgroundColor:"#F9F6EE",
                    borderRadius: 2,
                    justifyContent: "center",
                    padding: 10,
                    borderColor: "grey",
                  }}
                  options={this.getProductName()}
                  selectedValues={this.state.selectedProduct}
                  onMultiSelect={this.onMultiChangeProduct()}
                  onTapClose={this.onMultiChangeProduct()}
                  listOptionProps={{ nestedScrollEnabled: true }}
                  isMulti
                />
              </View>

              <View
                style={{
                  width: wp("100%"),
                  marginTop: hp("5%"),
                }}
              >
                <SelectBox
                  label="Secondary Sales Type"
                  labelStyle={{
                    color: Colors.black,
                    fontWeight: "bold",
                    fontSize: 13,
                  }}
                  width="90%"
                  viewMargin="25px"
                  containerStyle={{
                    elevation: 10,
                    // backgroundColor:"#F9F6EE",
                    borderRadius: 2,
                    justifyContent: "center",
                    padding: 10,
                    borderColor: "grey",
                  }}
                  options={[
                    { id: "Retail", item: "Retail" },
                    { id: "Project", item: "Project" },
                    { id: "NPD", item: "NPD" },
                    { id: "Industrial", item: "Industrial" },
                  ]}
                  selectedValues={this.state.selectedType}
                  onMultiSelect={this.onMultiChangeType()}
                  onTapClose={this.onMultiChangeType()}
                  listOptionProps={{ nestedScrollEnabled: true }}
                  isMulti
                />
              </View>

              <View style={{ width: wp("80%"), marginTop: hp("4%") }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: Colors.black,
                    fontWeight: "bold",
                  }}
                >
                  {recordid.id == "Plumber"
                    ? "GST/PAN / Driving License/ Voter ID/ Identity Proof"
                    : "GST Image Proof"}
                </Text>
                <MultipleImagePicker
                  title={"Take Pictue"}
                  images={retailerForm.zx_gstpanimage || []}
                  loading={
                    uploadImageLoader && uploadImageField == "zx_gstpanimage"
                  }
                  onClearImage={(value) =>
                    this.props.changeRetailerForm({
                      edited_field: "zx_gstpanimage",
                      edited_value: "",
                    })
                  }
                  onImageSuccess={({ images }) =>
                    this.props.uploadImage({
                      images,
                      params: { edited_field: "zx_gstpanimage" },
                      multiple: true,
                      previous_value: retailerForm.zx_gstpanimage || [],
                    })
                  }
                ></MultipleImagePicker>
              </View>

              <View style={{ width: wp("80%"), marginTop: hp("2%") }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: Colors.black,
                    fontWeight: "bold",
                  }}
                >
                  {recordid.id == "Plumber"
                    ? "Shop Image  / Selfie"
                    : "Shop Image Proof"}
                </Text>
                <MultipleImagePicker
                  title={"Take Pictue"}
                  images={retailerForm.zx_shopimage_url || []}
                  loading={
                    uploadImageLoader && uploadImageField == "zx_shopimage_url"
                  }
                  onClearImage={(value) =>
                    this.props.changeRetailerForm({
                      edited_field: "zx_shopimage_url",
                      edited_value: "",
                    })
                  }
                  onImageSuccess={({ images }) =>
                    this.props.uploadImage({
                      images,
                      params: { edited_field: "zx_shopimage_url" },
                      multiple: true,
                      previous_value: retailerForm.zx_shopimage_url || [],
                    })
                  }
                ></MultipleImagePicker>
              </View>

              <View style={{ width: wp("80%"), marginTop: hp("2%") }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: Colors.black,
                    fontWeight: "bold",
                  }}
                >
                  Visiting Card Image
                </Text>
                <MultipleImagePicker
                  title={"Take Pictue"}
                  images={retailerForm.zx_visitingcard || []}
                  loading={
                    uploadImageLoader && uploadImageField == "zx_visitingcard"
                  }
                  onClearImage={(value) =>
                    this.props.changeRetailerForm({
                      edited_field: "zx_visitingcard",
                      edited_value: "",
                    })
                  }
                  onImageSuccess={({ images }) =>
                    this.props.uploadImage({
                      images,
                      params: { edited_field: "zx_visitingcard" },
                      multiple: true,
                      previous_value: retailerForm.zx_visitingcard || [],
                    })
                  }
                ></MultipleImagePicker>
              </View>

              {/* <View style={{ flexDirection: "column", height: hp("65%") }}>
              <View style={{ marginLeft: "-32.8%", top: hp("6%") }}>
                <Text
                  style={{
                    left: wp("25.5%"),
                    fontSize: 11,
                    color: Colors.grey,
                    marginBottom: hp(2.5),
                    marginTop: hp(-0.5),
                  }}
                >
                  GST Image Proof*
                </Text>

                <View style={{ ...Styles.bottomMargin }}>
                  <MultipleImagePicker
                    title={"Take Pictue"}
                    images={retailerForm.zx_gstpanimage || []}
                    loading={
                      uploadImageLoader && uploadImageField == "zx_gstpanimage"
                    }
                    onClearImage={(value) =>
                      this.props.changeRetailerForm({
                        edited_field: "zx_gstpanimage",
                        edited_value: "",
                      })
                    }
                    onImageSuccess={({ images }) =>
                      this.props.uploadImage({
                        images,
                        params: { edited_field: "zx_gstpanimage" },
                        multiple: true,
                        previous_value: retailerForm.zx_gstpanimage || [],
                      })
                    }
                  >
                  </MultipleImagePicker>
                </View>
              </View>

              <View style={{ marginLeft: "-32.8%", top: hp("-15%") }}>
                <Text
                  style={{
                    left: wp("25.5%"),
                    fontSize: 11,
                    color: Colors.grey,
                    marginBottom: hp(1),
                    marginTop: hp("23%"),
                  }}
                >
                  Shop Image*
                </Text>
                <View style={{ ...Styles.bottomMargin }}>
                  <MultipleImagePicker
                    title={"Take Pictue"}
                    images={retailerForm.zx_shopimage_url || []}
                    loading={
                      uploadImageLoader &&
                      uploadImageField == "zx_shopimage_url"
                    }
                    onClearImage={(value) =>
                      this.props.changeRetailerForm({
                        edited_field: "zx_shopimage_url",
                        edited_value: "",
                      })
                    }
                    onImageSuccess={({ images }) =>
                      this.props.uploadImage({
                        images,
                        params: { edited_field: "zx_shopimage_url" },
                        multiple: true,
                        previous_value: retailerForm.zx_shopimage_url || [],
                      })
                    }
                  >
                  </MultipleImagePicker>
                </View>
              </View>

              <View style={{ marginLeft: "-32.8%", top: hp("-36%") }}>
                <Text
                  style={{
                    left: wp("25.5%"),
                    fontSize: 11,
                    color: Colors.grey,
                    marginBottom: hp(1),
                    marginTop: hp("23%"),
                  }}
                >
                  Visiting Card Image*
                </Text>

                <View style={{ ...Styles.bottomMargin }}>
                  <MultipleImagePicker
                    title={"Take Pictue"}
                    images={retailerForm.zx_visitingcard || []}
                    loading={
                      uploadImageLoader && uploadImageField == "zx_visitingcard"
                    }
                    onClearImage={(value) =>
                      this.props.changeRetailerForm({
                        edited_field: "zx_visitingcard",
                        edited_value: "",
                      })
                    }
                    onImageSuccess={({ images }) =>
                      this.props.uploadImage({
                        images,
                        params: { edited_field: "zx_visitingcard" },
                        multiple: true,
                        previous_value: retailerForm.zx_visitingcard || [],
                      })
                    }
                  >
                  </MultipleImagePicker>
                </View>
              </View>
            </View> */}
              <View
                style={{
                  height: hp("7%"),
                  marginBottom: hp("15%"),
                  left: wp("15%"),
                  marginTop: hp("3%"),
                }}
              >
                <BlueButton
                  style={
                    logindata.zx_brandgroupcode == "1"
                      ? Styles.button
                      : Styles.buttonBlue
                  }
                  title={"SUBMIT"}
                  // onPress={() =>
                  //   this.props.createRetailer({ form: forms, token })
                  // }
                  onPress={() =>
                    recordid.show == true
                      ? this.props.updateRetailer({ form: form1, token })
                      : this.submit()
                  }
                  // disabled={createRetailerLoader}
                  // loading={createRetailerLoader}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
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
    list: state.retailers.selectedRetailer.data,
    uploadImageField: state.common.uploadImageField,
    uploadImageLoader: state.common.uploadImageLoader,
    name: state.competitor.competitorName,
    brands: state.products.BrandList && state.products.BrandList,
    logindata: state.user.user_details,
    list: state.retailers.retailersList,
    retailerdata: state.retailers.retailersList.list,
    zone: state.distributor.getZone,
    pincode: state.distributor.getPincode,
    state: state.distributor.getState,
    city: state.distributor.getCity,
    subState: state.distributor.getSubState,
    district: state.distributor.getDistrict,
    zone1: state.distributor.getResidenceZone,
    pincode1: state.distributor.getResidencePincode,
    state1: state.distributor.getResidenceState,
    city1: state.distributor.getResidenceCity,
    subState1: state.distributor.getResidenceSubState,
    district1: state.distributor.getResidenceDistrict,
    area1: state.distributor.getResidenceArea,
    language: state.retailers.getLanguage,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeRetailerForm: (params) =>
    dispatch(RetailersActions.changeRetailerForm(params)),
  createRetailer: (params) => dispatch(RetailersActions.createRetailer(params)),
  fetchRetailerCompetitors: (params) =>
    dispatch(RetailersActions.fetchRetailerCompetitors(params)),
  fetchRetailers: (params) => dispatch(RetailersActions.fetchRetailers(params)),
  fetchRetailerArea: (params) =>
    dispatch(CommonActions.fetchRetailerArea(params)),
  fetchBeat: (params) => dispatch(CommonActions.fetchBeat(params)),
  clearRetailerForm: () => dispatch(RetailersActions.clearRetailerForm()),
  getAllArea: (params) => dispatch(DistributorActions.getAllArea(params)),
  getPincodeInfo: (params) => dispatch(RetailersActions.getPincodeInfo(params)),
  getAreaInfo: (params) => dispatch(RetailersActions.getAreaInfo(params)),
  updateRetailer: (params) => dispatch(RetailersActions.updateRetailer(params)),
  uploadImage: (params) => dispatch(CommonActions.uploadImage(params)),
  getCompetitorName: (params) =>
    dispatch(CompetitorActions.getCompetitorName(params)),
  getAllProductsBrands: (params) =>
    dispatch(ProductActions.getAllProductsBrands(params)),
  createRetailerLoading: () =>
    dispatch(RetailersActions.createRetailerLoading()),
  createRetailerLoadingStop: () =>
    dispatch(RetailersActions.createRetailerLoadingStop()),
  getAllState: (params) => dispatch(DistributorActions.getAllState(params)),
  getAllSubState: (params) =>
    dispatch(DistributorActions.getAllSubState(params)),
  getAllCity: (params) => dispatch(DistributorActions.getAllCity(params)),
  getAllPincode: (params) => dispatch(DistributorActions.getAllPincode(params)),
  getAllDistrict: (params) =>
    dispatch(DistributorActions.getAllDistrict(params)),
  getAllZone: (params) => dispatch(DistributorActions.getAllZone(params)),
  getResidenceArea: (params) =>
    dispatch(DistributorActions.getResidenceArea(params)),
  getResidenceState: (params) =>
    dispatch(DistributorActions.getResidenceState(params)),
  getResidenceSubState: (params) =>
    dispatch(DistributorActions.getResidenceSubState(params)),
  getResidenceCity: (params) =>
    dispatch(DistributorActions.getResidenceCity(params)),
  getResidencePincode: (params) =>
    dispatch(DistributorActions.getResidencePincode(params)),
  getResidenceDistrict: (params) =>
    dispatch(DistributorActions.getResidenceDistrict(params)),
  getResidenceZone: (params) =>
    dispatch(DistributorActions.getResidenceZone(params)),
  getLanguage: (params) => dispatch(RetailersActions.getLanguage(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RetailerTabScreen);
