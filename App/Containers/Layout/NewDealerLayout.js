import React, { Component } from "react";
import {
  Platform,
  View,
  ActivityIndicator,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
} from "react-native";
import { connect } from "react-redux";

import GenericIcon from "App/Components/GenericIcon";
import DistributorActions from "App/Stores/Distributor/Actions";

import { ScrollableTab, TabHeading, Tab, Tabs } from "native-base";
import { ApplicationStyles, Helpers, Images, Metrics, Colors } from "App/Theme";

// import Styles from "../NewDealer/NewDealerScreenStyles";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Body,
  Text,
  Input,
  Item,
  Right,
  Segment,
} from "native-base";
import NavigationService from "App/Services/NavigationService";
import SearchBar from "App/Components/SearchBar";

import WhiteButton from "App/Components/WhiteButton";
import { HelperService } from "App/Services/Utils/HelperService";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Card } from "react-native-paper";
import BackArrowButton from "App/Components/BackArrowButton";
import DisplayCard from "../../Components/DisplayCard/DisplayCard";
import DisplayCardStrip from "../../Components/DisplayCard/DisplayCardStrip";
import NewDealerTabs from "../NewDealer/NewDealerTabs";
import NewDealerScreen from "../NewDealer/NewDealerScreen";
import DashboardTabs from "../Dashboard/DashboardTabs";
import _ from "lodash";

// const NewDealerLayout=({show}, props ) =>{
class NewDealerLayout extends Component {
  componentDidMount() {
    const { show } = this.props.show;
    // {show==false?this.props.clearDistributorForm():[]};
  }

  getData() {
    const { data } = this.props;
    let arr = [];
    if (data && data.length) {
      data.map((obj) => {
        if (obj.itemsubcategory) {
          arr.push(obj);
        }
      });
    }
    // console.log("aarrrr", arr);
    return arr;
  }
  getData1() {
    const { data1 } = this.props;
    let arr = [];
    if (data1 && data1.length) {
      data1.map((obj) => {
        if (obj.itemsubcategory) {
          arr.push(obj);
        }
      });
    }
    return arr;
  }
  getData2() {
    const { data2 } = this.props;
    let arr = [];
    if (data2 && data2.length) {
      data2.map((obj) => {
        if (obj.itemsubcategory) {
          arr.push(obj);
        }
      });
    }
    return arr;
  }
  getUpdatedData() {
    const { stockform } = this.props;
    let arr = [];
    if (stockform && !_.isEmpty(stockform)) {
      arr.push(stockform);
    }
    return arr;
  }

  getUpdatedData1() {
    const { stockform1 } = this.props;
    let arr = [];
    if (stockform1 && !_.isEmpty(stockform1)) {
      arr.push(stockform1);
    }
    return arr;
  }

  getUpdatedData2() {
    const { stockform2 } = this.props;
    let arr = [];
    if (stockform2 && !_.isEmpty(stockform2)) {
      arr.push(stockform2);
    }
    return arr;
  }
  render() {
    const {
      submitSelectedDistributorForm,
      distributorForm,
      token,
      updateDistributor,
      clearDistributorForm,
      agentid,
      loading,
      stockform,
      stockform1,
      stockform2,
      code,
    } = this.props;
    // console.log("agent",agentid)
    const { show } = this.props.show;
    // console.log("ddoobbbbb", stockform2 && !_.isEmpty(stockform2));

    let lastthree = [];
    let previouscustomer = [];
    let salesassured = [];

    let forms = {
      zx_aadharno: distributorForm.zx_aadharno
        ? distributorForm.zx_aadharno
        : "",
      zx_accountno: distributorForm.zx_accountno
        ? distributorForm.zx_accountno
        : "",
      // "zx_dateofbirth":"1128969000000",
      zx_dateofbirth: distributorForm.zx_dateofbirth
        ? distributorForm.zx_dateofbirth
        : null,
      zx_salesexecutive: agentid,
      zx_overallstatus: "Draft",
      // zx_agrifittingscy: "0.43",
      zx_agrifittingsl2ly: "0.35",
      zx_agrifittingsly: "0.23",
      zx_agripipescy: "0.34",
      zx_agripipesl2ly: "0.34",
      zx_agripipesly: "0.35",
      zx_alternatemobileno: distributorForm.zx_alternatemobileno,
      zx_bankaddress: distributorForm.zx_bankaddress
        ? distributorForm.zx_bankaddress
        : "",
      zx_bankname: distributorForm.zx_bankname
        ? distributorForm.zx_bankname
        : "",
      zx_billingaddress1: distributorForm.zx_billingaddress1,
      zx_billingaddress2: distributorForm.zx_billingaddress2,
      zx_billingcity: distributorForm.zx_billingcity,
      zx_billingpostcode: distributorForm.zx_billingpostcode,
      zx_billingstate: distributorForm.zx_billingstate,
      zx_cibilscore: distributorForm.zx_cibilscore
        ? distributorForm.zx_cibilscore
        : "",
      zx_constitutionofthefirm: distributorForm.zx_constitutionofthefirm,
      zx_cpvcpipesfittingscy: "0.34",
      zx_cpvcpipesfittingsl2ly: "0.34",
      zx_cpvcpipesfittingsly: "0.45",
      zx_creditlimit: distributorForm.zx_creditlimit
        ? distributorForm.zx_creditlimit
        : null,
      zx_credittermpipes: distributorForm.zx_credittermpipes
        ? distributorForm.zx_credittermpipes
        : null,
      zx_dealingwithpvc: distributorForm.zx_dealingwithpvc,
      zx_deliveryaddress1: distributorForm.zx_deliveryaddress1
        ? distributorForm.zx_deliveryaddress1
        : distributorForm.zx_billingaddress1,
      zx_deliveryaddress2: distributorForm.zx_deliveryaddress2
        ? distributorForm.zx_deliveryaddress2
        : distributorForm.zx_billingaddress2,
      zx_deliverypostcode: distributorForm.zx_deliverypostcode
        ? distributorForm.zx_deliverypostcode
        : distributorForm.zx_billingpostcode,
      zx_deliverycity: distributorForm.zx_deliverycity
        ? distributorForm.zx_deliverycity
        : distributorForm.zx_billingcity,
      zx_deliverystate: distributorForm.zx_deliverystate
        ? distributorForm.zx_deliverystate
        : distributorForm.zx_billingstate,
      zx_depositamount: distributorForm.zx_depositamount
        ? distributorForm.zx_depositamount
        : null,
      zx_distributorname: distributorForm.zx_distributorname,
      zx_easyfitpipesfittingscy: "7.65",
      zx_easyfitpipesfittingsl2ly: "7.54",
      zx_easyfitpipesfittingsly: "8.90",
      zx_faxno: distributorForm.zx_faxno ? distributorForm.zx_faxno : "",
      zx_grossturnoverperannum: distributorForm.zx_grossturnoverperannum,
      zx_gstregtype: distributorForm.zx_gstregtype,
      zx_gstno: distributorForm.zx_gstno ? distributorForm.zx_gstno : "",
      zx_ifsccode: distributorForm.zx_ifsccode
        ? distributorForm.zx_ifsccode
        : "",
      zx_mobileno: distributorForm.zx_mobileno,
      zx_nameofnearestdistributorwithdistance: distributorForm.zx_nameofnearestdistributorwithdistance
        ? distributorForm.zx_nameofnearestdistributorwithdistance
        : "",
      zx_nameofthefirm: distributorForm.zx_nameofthefirm,
      zx_pprpipesfittingscy: "13.98",
      zx_panno: distributorForm.zx_panno ? distributorForm.zx_panno : "",
      zx_pprpipesfittingsl2ly: "19.76",
      zx_pprpipesfittingsly: "12.23",
      zx_remarks: distributorForm.zx_remarks ? distributorForm.zx_remarks : "",
      zx_telephoneno: distributorForm.zx_telephoneno
        ? distributorForm.zx_telephoneno
        : "",
      zx_ultrafitpipesfittingscy: "12.65",
      zx_ultrafitpipesfittingsl2ly: "23.56",
      // "zx_yearofestablishment":"1378751400000",
      zx_yearofestablishment: distributorForm.zx_yearofestablishment
        ? distributorForm.zx_yearofestablishment
        : null,
      zx_ultrafitpipesfittingsly: "23.89",
      zx_substate: distributorForm.zx_substate,
      zx_residentialsubstate: distributorForm.zx_residentialsubstate
        ? distributorForm.zx_residentialsubstate
        : distributorForm.zx_substate,
      zx_district: distributorForm.zx_district,
      zx_residentialdistrict: distributorForm.zx_residentialdistrict
        ? distributorForm.zx_residentialdistrict
        : distributorForm.zx_district,
      zx_area: distributorForm.zx_area,
      zx_residentialarea: distributorForm.zx_residentialarea
        ? distributorForm.zx_residentialarea
        : distributorForm.zx_area,
    };

    let form1 = {
      Id: distributorForm.Id,
      zx_aadharno: distributorForm.zx_aadharno
        ? distributorForm.zx_aadharno
        : "",
      zx_accountno: distributorForm.zx_accountno
        ? distributorForm.zx_accountno
        : "",
      // "zx_dateofbirth":"1128969000000",
      zx_dateofbirth: distributorForm.zx_dateofbirth
        ? distributorForm.zx_dateofbirth
        : null,
      zx_salesexecutive: agentid,
      zx_overallstatus: distributorForm.zx_overallstatus,
      // zx_agrifittingscy: "0.43",
      zx_agrifittingsl2ly: "0.35",
      zx_agrifittingsly: "0.23",
      zx_agripipescy: "0.34",
      zx_agripipesl2ly: "0.34",
      zx_agripipesly: "0.35",
      zx_alternatemobileno: distributorForm.zx_alternatemobileno,
      zx_bankaddress: distributorForm.zx_bankaddress
        ? distributorForm.zx_bankaddress
        : "",
      zx_bankname: distributorForm.zx_bankname
        ? distributorForm.zx_bankname
        : "",
      zx_billingaddress1: distributorForm.zx_billingaddress1,
      zx_billingaddress2: distributorForm.zx_billingaddress2,
      zx_billingcity: distributorForm.zx_billingcity,
      zx_billingpostcode: distributorForm.zx_billingpostcode,
      zx_billingstate: distributorForm.zx_billingstate,
      zx_cibilscore: distributorForm.zx_cibilscore
        ? distributorForm.zx_cibilscore
        : "",
      zx_constitutionofthefirm: distributorForm.zx_constitutionofthefirm,
      zx_cpvcpipesfittingscy: "0.34",
      zx_cpvcpipesfittingsl2ly: "0.34",
      zx_cpvcpipesfittingsly: "0.45",
      zx_creditlimit: distributorForm.zx_creditlimit
        ? distributorForm.zx_creditlimit
        : null,
      zx_credittermpipes: distributorForm.zx_credittermpipes
        ? distributorForm.zx_credittermpipes
        : null,
      zx_dealingwithpvc: distributorForm.zx_dealingwithpvc,
      zx_deliveryaddress1: distributorForm.zx_deliveryaddress1
        ? distributorForm.zx_deliveryaddress1
        : distributorForm.zx_billingaddress1,
      zx_deliveryaddress2: distributorForm.zx_deliveryaddress2
        ? distributorForm.zx_deliveryaddress2
        : distributorForm.zx_billingaddress2,
      zx_deliverypostcode: distributorForm.zx_deliverypostcode
        ? distributorForm.zx_deliverypostcode
        : distributorForm.zx_billingpostcode,
      zx_deliverycity: distributorForm.zx_deliverycity
        ? distributorForm.zx_deliverycity
        : distributorForm.zx_billingcity,
      zx_deliverystate: distributorForm.zx_deliverystate
        ? distributorForm.zx_deliverystate
        : distributorForm.zx_billingstate,
      zx_depositamount: distributorForm.zx_depositamount
        ? distributorForm.zx_depositamount
        : null,
      zx_distributorname: distributorForm.zx_distributorname,
      zx_easyfitpipesfittingscy: "7.65",
      zx_easyfitpipesfittingsl2ly: "7.54",
      zx_easyfitpipesfittingsly: "8.90",
      zx_faxno: distributorForm.zx_faxno ? distributorForm.zx_faxno : "",
      zx_grossturnoverperannum: distributorForm.zx_grossturnoverperannum,
      zx_gstregtype: distributorForm.zx_gstregtype,
      zx_gstno: distributorForm.zx_gstno ? distributorForm.zx_gstno : "",
      zx_ifsccode: distributorForm.zx_ifsccode
        ? distributorForm.zx_ifsccode
        : "",
      zx_mobileno: distributorForm.zx_mobileno,
      zx_nameofnearestdistributorwithdistance: distributorForm.zx_nameofnearestdistributorwithdistance
        ? distributorForm.zx_nameofnearestdistributorwithdistance
        : "",
      zx_nameofthefirm: distributorForm.zx_nameofthefirm,
      zx_pprpipesfittingscy: "13.98",
      zx_panno: distributorForm.zx_panno ? distributorForm.zx_panno : "",
      zx_pprpipesfittingsl2ly: "19.76",
      zx_pprpipesfittingsly: "12.23",
      zx_remarks: distributorForm.zx_remarks ? distributorForm.zx_remarks : "",
      zx_telephoneno: distributorForm.zx_telephoneno
        ? distributorForm.zx_telephoneno
        : "",
      zx_ultrafitpipesfittingscy: "12.65",
      zx_ultrafitpipesfittingsl2ly: "23.56",
      // "zx_yearofestablishment":"1378751400000",
      zx_yearofestablishment: distributorForm.zx_yearofestablishment
        ? distributorForm.zx_yearofestablishment
        : null,
      zx_ultrafitpipesfittingsly: "23.89",
      lastthreeyearsales: lastthree.concat(
        this.getUpdatedData(),
        this.getData()
      ),
      previouscustomerdetails: previouscustomer.concat(
        this.getUpdatedData1(),
        this.getData1()
      ),
      salesassuredbythefirm: salesassured.concat(
        this.getUpdatedData2(),
        this.getData2()
      ),
      zx_substate: distributorForm.zx_substate,
      zx_residentialsubstate: distributorForm.zx_residentialsubstate
        ? distributorForm.zx_residentialsubstate
        : distributorForm.zx_substate,
      zx_district: distributorForm.zx_district,
      zx_residentialdistrict: distributorForm.zx_residentialdistrict
        ? distributorForm.zx_residentialdistrict
        : distributorForm.zx_district,
      zx_area: distributorForm.zx_area,
      zx_residentialarea: distributorForm.zx_residentialarea
        ? distributorForm.zx_residentialarea
        : distributorForm.zx_area,
    };

    return (
      <View>
        <Card
          style={code.zx_brandgroupcode == "1" ? Styles.card : Styles.cardBlue}
        >
          <BackArrowButton style={Styles.backarrow} />
          <Text style={show ? Styles.titleText1 : Styles.titleText}>
            {"KYC"}
            <Text style={{ ...Styles.titleText, ...Styles.textClr }}>
              {" Form"}
            </Text>
          </Text>

          <View style={{ flexDirection: "row" }}>
            <View>
              <WhiteButton
                style={show ? Styles.buttonsi : Styles.buttons}
                onPress={() => {
                  show
                    ? updateDistributor({ form: form1, token })
                    : submitSelectedDistributorForm({ form: forms, token });
                }}
                // disabled={loading}
                // loading={loading}
                // onPress={() => setText("Submit for Approval")}
                title={"Save"}
                textStyle={Styles.buttontext}
              />
            </View>
            {/* <View>

        <WhiteButton
        style={show?(Styles.buttoni):(Styles.button)}
          // onPress={() => setText("Submit for Approval")}
          title={"pending for approval"}
          textStyle={Styles.buttontext}

        />
        </View> */}
          </View>
        </Card>

        <Header style={{ ...Styles.header }}>
          <NewDealerTabs />
        </Header>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    agentid: state.user.id,
    data: state.distributor.sale,
    data1: state.distributor.best,
    data2: state.distributor.firstFirm,
    distributorForm: state.distributor.distributorForm,
    // validation: state.retailers.retailerFormValidation,
    loading: state.distributor.submitDistributorFormLoader,
    stockform: state.distributor.visitStock,
    stockform1: state.distributor.visitCustomerStock,
    stockform2: state.distributor.visitFirmStock,
    code: state.user.user_details,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeDistributorForm: (params) =>
    dispatch(DistributorActions.changeDistributorForm(params)),
  submitSelectedDistributorForm: (params) =>
    dispatch(DistributorActions.submitSelectedDistributorForm(params)),
  updateDistributor: (params) =>
    dispatch(DistributorActions.updateDistributor(params)),
  clearDistributorForm: () =>
    dispatch(DistributorActions.clearDistributorForm()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewDealerLayout);

const Styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.white,
    borderBottomWidth: 0,
    height: hp("11%"),
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    paddingTop: hp("2%"),
    elevation: 2,
  },
  card: {
    flexDirection: "column",
    elevation: 10,
    backgroundColor: Colors.background,
    height: hp("20%"),
    justifyContent: "center",
    alignItems: "center",
    // paddingHorizontal: "8%",
    borderBottomLeftRadius: 65,
    borderBottomRightRadius: 65,
  },
  cardBlue: {
    flexDirection: "column",
    elevation: 10,
    backgroundColor: Colors.bluebackground,
    height: hp("20%"),
    justifyContent: "center",
    alignItems: "center",
    // paddingHorizontal: "8%",
    borderBottomLeftRadius: 65,
    borderBottomRightRadius: 65,
  },

  titleText: {
    color: Colors.white,
    fontFamily: "Ubuntu",
    fontSize: 23,
    fontWeight: "bold",
    left: wp("5.5%"),
    bottom: hp("7.5%"),
    top: hp("0%"),
  },
  titleText1: {
    color: Colors.white,
    fontFamily: "Ubuntu",
    fontSize: 23,
    fontWeight: "bold",
    left: wp("5.5%"),
    // bottom: hp("17.5%"),
    paddingBottom: hp("5%"),
    top: hp("-1%"),
  },
  textClr: {
    color: Colors.headerClr,
  },
  button: {
    left: wp("8.5%"),
    borderRadius: 6,
    height: hp("5%"),
    bottom: hp("-2%"),
    width: wp("40%"),
  },
  button1: {
    left: wp("73%"),
    borderRadius: 6,
    height: hp("4.5%"),
    bottom: hp("1.5%"),
    paddingBottom: 1,
    width: wp("20%"),
  },
  buttoni: {
    left: wp("8.5%"),
    borderRadius: 6,
    height: hp("5%"),
    bottom: hp("3.5%"),
    width: wp("40%"),
  },
  buttontext: {
    fontFamily: "Lato",
    fontSize: 13,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  backBtn: {
    color: Colors.white,
    paddingRight: 10,
    paddingLeft: 5,
    fontSize: wp("8%"),
  },

  datePicker: {
    alignSelf: "center",
    backgroundColor: Colors.button,
    borderRadius: 100,
    flexDirection: "row",
    width: wp("43%"),
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  monthPicker: {
    alignSelf: "center",
    backgroundColor: Colors.button,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    width: wp("25%"),
  },
  dateText: {
    fontFamily: ApplicationStyles.textMediumFont,
    color: Colors.white,
    fontSize: wp("3.3%"),
    textTransform: "capitalize",
  },
  dateIcon: {
    color: Colors.white,
    fontSize: wp("7%"),
    marginLeft: 0,
    marginRight: 0,
    zIndex: 2,
    paddingLeft: wp("3%"),
  },
  dateChangeIcon: {
    color: Colors.button,
    alignSelf: "center",
    paddingHorizontal: wp("3%"),
    fontSize: wp("11%"),
  },
  psmPickerStyles: {
    marginTop: -5,
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: "8%",
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 25,
    elevation: 5,
    marginLeft: "5%",
  },
  actionButton: {
    borderWidth: 1.5,
    width: wp("20%"),
    height: 35,
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: Colors.clrF1F9FF,
    marginHorizontal: wp("1.2%"),
  },
  actionButtonText: {
    fontSize: wp("3%"),
    fontFamily: ApplicationStyles.textMediumFont,
  },
  selectedActionButton: {
    borderWidth: 1.5,
    width: wp("20%"),
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: Colors.clrF1F9FF,
    marginHorizontal: wp("1.2%"),
    height: 35,
  },
  refreshIcon: {
    color: Colors.primary,
    fontSize: wp("5%"),
    alignSelf: "center",
    padding: hp("1%"),
    paddingBottom: 0,
    position: "absolute",
    right: wp("3.3%"),
    marginTop: hp("16.5%"),
    zIndex: 2,
  },
  loadingIcon: {
    color: Colors.primary,
    fontSize: wp("6.9%"),
    alignSelf: "center",
    position: "absolute",
    right: wp("5.3%"),
    marginTop: hp("13.2%"),
    zIndex: 2,
  },
  backarrow: {
    color: Colors.white,
    fontSize: 32,
    paddingRight: 330,
    paddingTop: 0,
  },
  icon: {
    color: Colors.darkRedPink,
  },
  buttons: {
    left: wp("6%"),
    borderRadius: 6,
    height: hp("5%"),
    bottom: hp("-2%"),
    width: wp("40%"),
  },
  buttonsi: {
    left: wp("6%"),
    borderRadius: 6,
    height: hp("5%"),
    bottom: hp("3.5%"),
    width: wp("40%"),
  },
});
