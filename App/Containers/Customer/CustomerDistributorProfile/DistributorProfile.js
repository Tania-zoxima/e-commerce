import React, { useState } from "react";
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
  Button,
} from "react-native";
import { connect } from "react-redux";

import GenericIcon from "App/Components/GenericIcon";
import DashboardActions from "App/Stores/Dashboard/Actions";
import RetailersActions from "App/Stores/Retailers/Actions";

import { ScrollableTab, TabHeading, Tab, Tabs } from "native-base";
import { ApplicationStyles, Helpers, Images, Metrics, Colors } from "App/Theme";

import {
  Container,
  Header,
  Title,
  Content,
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
// import Card from '../../Components/Card/Card'
import WhiteButton from "App/Components/WhiteButton";
import { HelperService } from "App/Services/Utils/HelperService";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Card } from "react-native-paper";
import DistributorProfileInfo from "./DistributorProfileInfo";
import Analytics from "./Analytics";
import Invoices from "./Invoices";
import Complaints from "../../Complaints/ComplaintScreen";
import Contacts from "./Contacts";
import Visits from "./Visits";
import Scheme from "./Scheme";
import Address from "./Address";
import Order from "./Order";
import DistributorProfileTabs from "./DistributorProfileTabs";
import Styles from "./DistriButorStyles";
import BackArrowButton from "../../../Components/BackArrowButton/BackArrowButton";
import Payment from "./Payment";
import CustomerInfo from "./CustomerInfo";
import VisitsActions from "App/Stores/Visits/Actions";
class DistributorProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  async updateLocation() {
    this.props.captureCustomerLocationLoading();
    let location = await HelperService.requestLocation();
    if (location == "DENIED") {
      Alert.alert(
        "Location permission is required to proceed.",
        "Go App Permissions and Turn on Location Permission for Re-Konekt."
      );
      this.props.captureCustomerLocationLoadingStop(); // stops btn loading
      return;
    } else if (!location) {
      this.props.captureCustomerLocationLoadingStop();
      return;
    }

    this.props.captureCustomerLocation({
      form: {
        address1_latitude: Number(location.latitude),
        address1_longitude: Number(location.longitude),
        // agentid: this.props.agentid,
        AccountGuid: this.props.guId,
      },
      token: this.props.token,
    });
  }

  // onSelectRetailer(params) {
  //   const { retailersList } = this.props;

  // const { data, guId } = retailersList;

  //   // console.log("pppaaramsret", params.data.accountid);
  //   NavigationService.navigate("RetailerTabScreen"
  //     // id: params.data.accountid,
  //   );
  //   this.props.selectRetailer(params);
  // }

  onEditRetailer(params) {
    const { retailersList } = this.props;
    const { data, guId } = retailersList;
    console.log("pppaaramsret", params);
    NavigationService.navigate("UpdateCustomerInfo", {
      id: data,
    });
    this.props.clearVisitInfo(), this.props.onEditInfo(params);
  }

  render() {
    //  console.log("recirdd",recordid.id)

    //     let forms =
    //   {
    //     "AccountGuid":"817352e5-82df-eb11-bacb-000d3ac9c0fc",
    //     "address1_latitude":"28.4033024",
    // "address1_longitude":"77.037568"
    // }

    const { retailersList, loader, token, details, code } = this.props;
    const { data, guId } = retailersList;
    // console.log("rretailersss", retailersList);
    let selectedTabNode = [];
    switch (this.props.searchFilters["selectedTabRetail"]) {
      case 0:
        selectedTabNode =
          data.zx_accounttype == "Primary Distributor" ||
          data.zx_accounttype == "Distributor" ? (
            <DistributorProfileInfo item={data} />
          ) : (
            <CustomerInfo item={data} getshow={this.state.show} />
          );
        break;
      case 1:
        selectedTabNode = <Analytics item={data} />;
        break;
      case 2:
        selectedTabNode = <Order item={data} />;
        break;
      case 3:
        selectedTabNode = <Invoices item={data} />;
        break;
      case 4:
        selectedTabNode = <Complaints item={data} />;
        break;
      case 5:
        selectedTabNode = <Contacts item={data} />;
        break;
      case 6:
        selectedTabNode = <Visits item={data} />;
        break;
      // case 7:
      //   selectedTabNode = <Scheme />;
      //   break;
      case 7:
        selectedTabNode = <Address item={data} />;
        break;
      // case 9:
      //   selectedTabNode = <Payment item={data} />;
      //   break;
    }
    // console.log("hhhhhhhggg",data)
    // console.log("hhhhhhhgggeeee",data.zx_accounttype !== "Primary Distributor" || data.zx_accounttype !== "Distributor")

    return (
      <View>
        <View style={Styles.headView}>
          <BackArrowButton
            style={Styles.backBtn}
            onPress={() => {
              this.props.clearPayment();
            }}
          />

          <Text style={Styles.headerText}>{data.zx_accounttype} Profile</Text>
        </View>

        {details && details[0]?<View style={{ flexDirection: "row" }}>
          <Text style={{ ...Styles.titleText }}>{data.name}</Text>
          {data.zx_accounttype == "Primary Distributor" ||
          data.zx_accounttype == "Distributor" ? (
            []
          ) : (
            <WhiteButton
              style={{
                backgroundColor:
                  code.zx_brandgroupcode == "1"
                    ? Colors.darkRedPink
                    : Colors.bluebackground,
                borderRadius: 10,
                height: hp("5%"),
                width: wp("25%"),
                marginTop: hp("2%"),
              }}
              // onPress={ () => this.props.sendApproval({form: item,token,id:item.Id})}
              onPress={() => this.onEditRetailer(details && details[0])}
              title={"EDIT INFO"}
              textStyle={{ color: Colors.white, fontSize: 12 }}
            ></WhiteButton>
          )}
        </View>:[]}

        <View>
          <Text
            style={{
              color: Colors.lightGrey,
              marginTop: hp("-2%"),
              padding: 17,
            }}
          >
            Customer ID:
            {data.zx_accounttype == "Distributor"
              ? data.accountnumber
              : "C" + data.zx_recordno}
          </Text>
        </View>

        {/* <View style={{flexDirection:'row',marginTop:hp("2%")}}>

      <TouchableOpacity  style={Styles.button}
     
    disabled={loader}
          loading={loader} >
          <Icon name={"call"} style={Styles.icon} />

          <GenericIcon name={"my-location"} style={Styles.icon1} />
          </TouchableOpacity>
         </View>  */}

        {/* <View>
          <Text
            style={{
              color: Colors.lightGrey,
              marginTop: hp("-2%"),
              padding: 17,
            }}
          >
            Customer ID:{data.accountnumber}
          </Text>
        </View> */}

        <View
          style={{
            flexDirection: "row",
            // marginTop: hp("2%"),
            width: wp("90%"),
          }}
        >
          <WhiteButton
            style={{
              backgroundColor:
                code.zx_brandgroupcode == "1"
                  ? Colors.darkRedPink
                  : Colors.bluebackground,
              height: hp("5%"),
              borderRadius: 5,
              width: wp("40%"),
              left: wp("5%"),
            }}
            // onPress={ () => this.props.sendApproval({form: item,token,id:item.Id})}
            onPress={() => this.updateLocation()}
            title={"Capture Geo Location"}
            textStyle={{ color: Colors.white, fontSize: 12 }}
          ></WhiteButton>
          {/* <TouchableOpacity
            style={
              code.zx_brandgroupcode == "1" ? Styles.button : Styles.buttonBlue
            }
            onPress={() => this.updateLocation()}
          >
            <GenericIcon
              name={"pin-drop"}
              style={{
                color: "white",
                fontSize: 18,
                top: hp("1.3%"),
                left: wp("1.8%"),
              }}
            />

            <Text style={Styles.buttontext}>Capture Geo Location</Text>
          </TouchableOpacity> */}

          <GenericIcon name={"emoji-events"} style={Styles.award} />

          <Text style={Styles.numStyle}>
            {details[0] && details[0].zx_rewardpoints
              ? details[0].zx_rewardpoints
              : "NA"}
          </Text>
        </View>
        <Text style={Styles.titleText1}>Reward Points</Text>
        <View style={{ top: hp("-6%") }}>
          <Header style={{ ...Styles.header }}>
            <DistributorProfileTabs />
          </Header>
        </View>
        {selectedTabNode}
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid: state.user.id,
  area: state.user.area,
  agentAreas: state.user.agentAreas,
  isASM: state.user.psmList,
  psmList: state.user.psmList.concat([{ id: "", name: "All" }]),
  searchFilters: state.dashboard.searchFilters,
  loaders: state.dashboard.loaders,
  retailersList: state.retailers.selectedRetailer,
  guId: state.retailers.selectedRetailer.data.id,
  loader: state.retailers.captureLocationLoader,
  latitude: state.user.latitude,
  longitude: state.user.longitude,
  details: state.retailers.customerInfo,
  code: state.user.user_details,
});

const mapDispatchToProps = (dispatch) => ({
  changeSearchFilters: (params) =>
    dispatch(DashboardActions.changeSearchFilters(params)),
  getOrderValue: (params) => dispatch(DashboardActions.getOrderValue(params)),
  getVisitCount: (params) => dispatch(DashboardActions.getVisitCount(params)),
  getSiteCount: (params) => dispatch(DashboardActions.getSiteCount(params)),
  getCounters: (params) => dispatch(DashboardActions.getCounters(params)),
  getEventCount: (params) => dispatch(DashboardActions.getEventCount(params)),
  getDashboardSummary: (params) =>
    dispatch(DashboardActions.getDashboardSummary(params)),
  selectRetailer: (params) => dispatch(RetailersActions.selectRetailer(params)),
  onEditInfo: (params) => dispatch(RetailersActions.onEditInfo(params)),
  captureCustomerLocation: (params) =>
    dispatch(RetailersActions.captureCustomerLocation(params)),
  captureCustomerLocationLoading: () =>
    dispatch(RetailersActions.captureCustomerLocationLoading()),
  captureCustomerLocationLoadingStop: () =>
    dispatch(RetailersActions.captureCustomerLocationLoadingStop()),
  clearVisitInfo: () => dispatch(VisitsActions.clearVisitInfo()),
  clearPayment: () => dispatch(RetailersActions.clearPayment()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DistributorProfile);
