import React, { Component } from "react";
import WhiteButton from "App/Components/WhiteButton";
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Icon, Input, Button } from "native-base";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Style from "./RetailerListStyle";
import RetailerTuple from "App/Containers/Retailers/RetailerTuple";
import NavigationService from "App/Services/NavigationService";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import RetailersActions from "App/Stores/Retailers/Actions";
import { HelperService } from "App/Services/Utils/HelperService";
import Loading from "App/Components/Loading";
import NoDataFound from "App/Components/NoDataFound";
import GenericIcon from "App/Components/GenericIcon";
import CommonActions from "App/Stores/Common/Actions";
import _ from "lodash";
import DisplayCard from "../../../Components/DisplayCard/DisplayCard";
import DisplayCardStrip from "../../../Components/DisplayCard/DisplayCardStrip";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import DashboardActions from "App/Stores/Dashboard/Actions";

class RetailerListScreen extends Component {
  componentDidMount() {
    const { retailersList, updateSearchFilters } = this.props;
    // this.fetchRetailersCall();
    this.props.clearSelectRetailer();
    if (retailersList && !_.isEmpty(retailersList)) {
      updateSearchFilters({
        edited_field: "type",
        edited_value: retailersList.type[0],
      });
      updateSearchFilters({ edited_field: "selectedTab", edited_value: 0 });
    } else {
      this.fetchRetailersCall();
    }
  }

  fetchRetailersCall() {
    const { token, agentid, fetchRetailers } = this.props;

    fetchRetailers({ token, agentid });
  }

  filterResults(list) {
    let retailerSearchFilters = this.props.retailerSearchFilters;
    let filteredList = HelperService.searchTextListFilter(
      list,
      retailerSearchFilters["searchBy"],
      retailerSearchFilters["searchValue"]
    );
    // filteredList = HelperService.searchTextListFilter(filteredList, 'telephone1', retailerSearchFilters['area']);
    filteredList = HelperService.sortListFilter(
      filteredList,
      retailerSearchFilters["sortBy"],
      retailerSearchFilters["sortType"]
    );
    return filteredList;
  }

  onSelectRetailer(params) {
    // console.log("pppaaramsret", params.data.accountid);
    NavigationService.navigate("DistributorProfile", {
      id: params.data.accountid,
    });
    this.props.selectRetailer(params);
  }

  getRetailerCardNode(data) {
    //  console.log("dataaaaaaaa",data)
    const {
      retailersList,
      retailerSearchFilters,
      updateSearchFilters,
      code,
    } = this.props;

    let count = 0;
    let filteredPartiesList = this.filterResults(
      HelperService.filterTextListFilter(
        retailersList.list,
        "zx_accounttype",
        data
      )
    );
    count = filteredPartiesList.length;
    // console.log("anccnc",filteredPartiesList)

    return (
      <WhiteButton
        title={data + "(" + count + ")"}
        style={{ ...Style.actionButton, ...Style.customSelectedStyleCorpBlue }}
        textStyle={Style.actionButtonText}
        onPress={() => {
          updateSearchFilters({ edited_field: "type", edited_value: data });
          updateSearchFilters({ edited_field: "selectedTab", edited_value: 0 });
        }}
        selected={retailerSearchFilters["type"] == data}
        customSelectedStyle={
          code.zx_brandgroupcode == "1"
            ? {
                ...Style.customSelectedStyleCorpBlue,
                ...Style.selected,
              }
            : {
                ...Style.customSelectedStyleCorpBlue,
                ...Style.selectedBlue,
              }
        }
        customSelectedTextStyle={Style.customSelectedTextStyle}
      />
    );
  }

  getPartiesAccountType() {
    const { retailersList, fetchRetailersLoader } = this.props;

    let visibleNode = [];

    if (retailersList && retailersList.type) {
      let filteredRetailersList = retailersList.type;
      if (filteredRetailersList.length) {
        visibleNode = (
          <FlatList
            horizontal
            data={filteredRetailersList}
            renderItem={({ item }) => this.getRetailerCardNode(item)}
            keyExtractor={(item) => item}
            onRefresh={() => this.fetchRetailersCall()}
            refreshing={fetchRetailersLoader}
            ListEmptyComponent={() => <NoDataFound text={"No Parties Found"} />}
          />
        );
      } else {
        visibleNode = (
          <NoDataFound text={"No Parties Found"}>
            <Icon
              name={"refresh"}
              onPress={() => this.fetchRetailersCall()}
              style={{
                color: Colors.button,
                fontSize: 20,
                alignSelf: "center",
                padding: 10,
              }}
              type={"FontAwesome"}
            />
          </NoDataFound>
        );
      }
    } else if (fetchRetailersLoader) {
      visibleNode = <Loading />;
    } else if (
      !retailersList ||
      (retailersList && !retailersList.type && !fetchRetailersLoader)
    ) {
      visibleNode = (
        <NoDataFound text={"No Parties found."}>
          <Icon
            name={"refresh"}
            onPress={() => this.fetchRetailersCall()}
            style={{
              color: Colors.button,
              fontSize: 25,
              alignSelf: "center",
              padding: "2%",
            }}
            type={"FontAwesome"}
          />
        </NoDataFound>
      );
    }

    return visibleNode;
  }

  getPartiesAccountTypeData() {
    const {
      retailersList,
      retailerSearchFilters,
      fetchRetailersLoader,
      code,
    } = this.props;
    // console.log("partyyyyyy",retailerSearchFilters["type"])
    let visibleNode = [];
    let filteredPartiesList =
      retailersList.list && retailersList.list.length
        ? this.filterResults(
            HelperService.filterTextListFilter(
              retailersList.list,
              "zx_accounttype",
              retailerSearchFilters["type"]
            )
          )
        : [];
    // console.log("lissstttt",filteredPartiesList.length)
    if (filteredPartiesList.length) {
      visibleNode = (
        <FlatList
          data={filteredPartiesList}
          renderItem={({ item }) => (
            <DisplayCard
              dark={false}
              //  onPress={() => NavigationService.navigate("DistributorProfile")}
              onPress={() => {
                this.onSelectRetailer({ guId: item.agentid, data: item });
                this.props.clearSearchFilter();
              }}
              style={{
                backgroundColor: Colors.white,
                borderColor: "#F66A676B",
                borderWidth: 1,
                position:"relative"
                // height: hp("18.4%"),
              }}
              heading={item.name}
              Styletitle={
                code.zx_brandgroupcode == "1" ? Style.head : Style.headBlue
              }
              heading1={item.address1_line1}
              headingStyle={Style.head1}
              icon={"call"}
              callIcon={{
                top: hp("2%"),
                width: wp("8%"),
                left: wp("76%"),
                position: "absolute",
              }}
              onPressicon={() => {
                item.telephone1
                  ? HelperService.callNumber(item.telephone1)
                  : HelperService.showToast({
                      message: "Phone Number Not Available",
                      duration: 2000,
                      buttonText: "Okay",
                    });
              }}
              icon1={"location-on"}
              locationIcon={{
                top: hp("2%"),
                width: wp("8%"),
                left: wp("65%"),
                position: "absolute",
              }}
              onPresslocation={() => {
                item.address1_latitude && item.address1_longitude
                  ? HelperService.showDirectionInGoogleMaps(
                      item.address1_latitude,
                      item.address1_longitude
                    )
                  : HelperService.showToast({
                      message: "Geo Location Not Available",
                      duration: 2000,
                      buttonText: "Okay",
                    });
              }}
              iconStyle={Style.checkicon1}
              Stylestatus={Style.status}
              iconstyle={Style.checkicon}
              content={[
                <DisplayCardStrip
                  stylettl={Style.ttl}
                  styledetail={Style.detail}
                  label={"Last Order Date"}
                  value={HelperService.getDisplayDatewithyear(
                    item.last_order_date__c
                  )}
                />,
                <DisplayCardStrip
                  stylettl={{ ...Style.ttl }}
                  styledetail={{ ...Style.detail}}
                  label={"Last Visit Date"}
                  value={HelperService.getDisplayDatewithyear(
                    item.last_visit_date__c
                  )}
                />,
              ]}
            />
          )}
          // renderItem={({ item }) => <PrimaryDistributor
          //   item={item}
          //   id={item.guId}
          //   // onPress={() => this.onSelectRetailer({ id: item.sfid, data: item, })}
          // />}
          keyExtractor={(item, index) => item.name + index.toString()}
          onRefresh={() => this.fetchRetailersCall()}
          refreshing={fetchRetailersLoader}
          ListEmptyComponent={() => <NoDataFound text={"No Parties Found"} />}
        />
      );
    } else {
      visibleNode = <NoDataFound text={"No Parties Found"} />;
    }

    return visibleNode;
  }

  onPressCard() {
    const { retailerSearchFilters } = this.props;

    switch (retailerSearchFilters["type"]) {
      case "Primary Distributor":
        NavigationService.navigate("RetailerList", {
          type: retailerSearchFilters["type"],
        });
        break;
      case "Retailer":
        NavigationService.navigate(
          "RetailerTabScreen",
          this.props.clearForm(),
          {
            type: retailerSearchFilters["type"],
          }
        );
        break;
      case "Influencer":
        NavigationService.navigate("NewInfluencers");
        break;
      default:
        NavigationService.navigate("NewRetailer", {
          type: retailerSearchFilters["type"],
        });
        break;
    }
  }
  render() {
    const { retailersList } = this.props;

    //  console.log("navigation", Colors.background);

    return (
      <View style={{ ...Style.container, backgroundColor: Colors.white }}>
        <View style={{ height: "13%", backgroundColor: Colors.white }}>
          {this.getPartiesAccountType()}
        </View>
        {/* <PrimaryDistributor /> */}

        {this.getPartiesAccountTypeData()}
        {/* <TouchableOpacity 
        style={Style.plusIcon}
onPress={()=>this.onPressCard()}
        // onPress={()=> { retailersList.type == 'Retailer' ? NavigationService.navigate('RetailerTabScreen') : NavigationService.navigate("PrimaryDistributor")}}
         >
        <Image
            
            source={require("App/Assets/Images/add.png")}

          
         
            style={{ color: Colors.white, fontSize: 45, alignSelf: 'center' }}
          />
        </TouchableOpacity> */}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid: state.user.id,
  agentAreas: state.user.agentAreas,
  fetchRetailersLoader: state.retailers.fetchRetailersLoader,
  retailerSearchFilters: state.retailers.retailerSearchFilters,
  isConnected: state.network.isConnected,
  retailersList: state.retailers.retailersList,
  code: state.user.user_details,
});

const mapDispatchToProps = (dispatch) => ({
  selectRetailer: (params) => dispatch(RetailersActions.selectRetailer(params)),
  selectDealer: (params) => dispatch(RetailersActions.selectDealer(params)),
  fetchRetailers: (params) => dispatch(RetailersActions.fetchRetailers(params)),
  extractFormData: (params) =>
    dispatch(RetailersActions.extractFormData(params)),
  clearSelectRetailer: () => dispatch(RetailersActions.clearSelectRetailer()),
  updateSearchFilters: (params) =>
    dispatch(RetailersActions.updateSearchFilters(params)),
  fetchRetailerArea: (params) =>
    dispatch(CommonActions.fetchRetailerArea(params)),
  clearForm: (params) => dispatch(RetailersActions.clearForm(params)),
  clearSearchFilter: (params) =>
    dispatch(DashboardActions.clearSearchFilter(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RetailerListScreen);
