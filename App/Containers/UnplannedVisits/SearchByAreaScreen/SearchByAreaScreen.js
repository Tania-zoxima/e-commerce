import React, { Component } from "react";
import {
  View,
  Alert,
  ScrollView,
  TouchableHighlight,
  FlatList,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Button, Text, Icon } from "native-base";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Style from "./SearchByAreaScreenStyles";
import BlueButton from "App/Components/BlueButton";
import SearchableDropdown from "App/Components/SearchableDropdown";
import WhiteButton from "App/Components/WhiteButton";
import RetailerCard from "../UnplannedRetailerCard";
import NavigationService from "App/Services/NavigationService";
import { HelperService } from "App/Services/Utils/HelperService";
import RetailersActions from "App/Stores/Retailers/Actions";
import VisitsActions from "App/Stores/Visits/Actions";
import SitesActions from "App/Stores/Sites/Actions";
import InfluencersActions from "App/Stores/Influencers/Actions";
import VisitCard from "App/Containers/Visits/VisitCard";
import Loading from "App/Components/Loading";
import NoDataFound from "App/Components/NoDataFound";
import { Colors } from "App/Theme";
import RetailerResultList from "App/Containers/UnplannedVisits/RetailerResultList";
import PlannedVisitCard from "App/Containers/Visits/PlannedVisitCard";
import _ from "lodash";
import DisplayCard from "../../../Components/DisplayCard/DisplayCard";
import DisplayCardStrip from "../../../Components/DisplayCard/DisplayCardStrip";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import GenericIcon from "App/Components/GenericIcon";

class SearchByAreaScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      param: {},
      objective: "",
      otherObj: "",
    };
  }
  componentDidMount() {
    const {
      retailersList,

      updateSearchFilters,
    } = this.props;

    this.props.clearSelectRetailer();

    if (retailersList && !_.isEmpty(retailersList)) {
      updateSearchFilters({
        edited_field: "party_type",
        edited_value: retailersList.type[0],
      });
      updateSearchFilters({ edited_field: "selectedTab", edited_value: 0 });
    } else {
      this.fetchRetailersCall();
    }
  }

  fetchRetailersCall() {
    const { token, agentid, fetchRetailers } = this.props;

    fetchRetailers({
      token,
      agentid,
    });
  }

  filterResults(list) {
    const { searchByAreaFilters } = this.props;

    let filteredList = HelperService.searchTextListFilter(
      list,
      this.props.searchByAreaFilters["searchBy"],
      this.props.searchByAreaFilters["searchvalue"]
    );
    // filteredList = HelperService.searchTextListFilter(
    //   filteredList,
    //   "telephone1",
    //   searchByAreaFilters["area"]
    // );
    filteredList = HelperService.sortListFilter(filteredList, "name");
    return filteredList;
  }

  onSelect(params) {
    const {
      token,
      agentid,
      offset,
      limit,
      submitSelectedUnplannedVisit,
      user_details,
    } = this.props;
    // console.log("kkkkkkkkkkkkkkkkkkkkk",params);
    let data = [
      {
        zx_customer: this.state.param.Id,

        //"visit_type": "Unplanned",
        // zx_visitdate: HelperService.getCurrentTimestamp(),
        zx_currenrtdate: HelperService.dateReadableFormats(),
        zx_currenrtdateandtime: HelperService.dateReadableFormat3(),
        // "createddate": HelperService.getCurrentTimestamp(),
        // "assigned_by__c": "Self",
        zx_accounttype: this.state.param.zx_accounttype,
        // "area__c":params.area,
        zx_team: agentid,
        zx_visitobjective: this.state.objective,
        zx_visitstatus: "Open",
        zx_visittype: "Unplanned",
        zx_remarksforothers: this.state.otherObj,

        // name: params.accountnumber,
      },
    ];

    Alert.alert(
      "Plan Visit For Today",
      "Do you want to plan the visit for today of this party?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () =>
            submitSelectedUnplannedVisit({
              form: data,
              token: token,
              agentid: agentid,
            }),
        },
      ],
      { cancelable: false }
    );
  }

  getRetailerCardNode(data) {
    const {
      retailersList,
      retailerSearchFilters,
      updateSearchFilters,
      searchByAreaFilters,
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

    return (
      <WhiteButton
        title={data.replace("_", " ") + "(" + count + ")"}
        style={{ ...Style.actionButton, ...Style.customSelectedStyleCorpBlue }}
        textStyle={Style.actionButtonText}
        onPress={() => {
          updateSearchFilters({
            edited_field: "party_type",
            edited_value: data,
          });
          // updateSearchFilters({ edited_field: 'selectedTab', 'edited_value': 0 })
        }}
        selected={searchByAreaFilters["party_type"] == data}
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
            key={"Retailers"}
            data={filteredRetailersList}
            renderItem={({ item }) => this.getRetailerCardNode(item)}
            keyExtractor={(item) => item.toString()}
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
    } else if (retailersList && !fetchRetailersLoader) {
      visibleNode = (
        <NoDataFound text={"No Parties found."}>
          <Icon
            name={"refresh"}
            onPress={() => this.fetchRetailersCall()}
            style={{
              color: Colors.button,
              fontSize: 25,
              alignSelf: "center",
              padding: 10,
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
      searchByAreaFilters,
      fetchRetailersLoader,
      code,
    } = this.props;
    // console.log(searchByAreaFilters);
    let visibleNode = [];
    let filteredPartiesList =
      retailersList.list && retailersList.list.length
        ? this.filterResults(
            HelperService.filterTextListFilter(
              retailersList.list,
              "zx_accounttype",
              searchByAreaFilters["party_type"]
            )
          )
        : [];
    if (filteredPartiesList.length) {
      visibleNode = (
        <FlatList
          style={{ backgroundColor: Colors.white }}
          key={"Retailers"}
          data={filteredPartiesList}
          renderItem={({ item }) => (
            <DisplayCard
              dark={false}
              onPress={() => {
                this.setState({
                  isVisible: true,
                  param: {
                    Id: item.id,
                    zx_accounttype: item.zx_accounttype,
                    name: item.accountnumber,
                  },
                });
              }}
              // onPress={() => {
              //   this.onSelect({
              //     Id: item.id,
              //     zx_accounttype: item.zx_accounttype,
              //     name: item.accountnumber,
              //   });
              // }}
              // onPress={() => NavigationService.navigate("DistributorProfile")}

              style={{
                backgroundColor: Colors.white,
                borderColor: "#F66A676B",
                borderWidth: 1,
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
                // data.location_latitudes && data.locationlongitude_s
                //   ? HelperService.showDirectionInGoogleMaps(
                //     data.location_latitude_s,
                //     data.location_longitude_s
                //   )
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
                  styledetail={{ ...Style.detail }}
                  label={"Last Visit Date"}
                  value={HelperService.getDisplayDatewithyear(
                    item.last_visit_date__c
                  )}
                />,
              ]}
            />
          )}
          //   renderItem={({ item }) => <PlannedVisitCard
          //   data={item}
          //   // key={item.sfid}
          //   // id={item.sfid}
          //   show={true}
          //    onPress={()=> {this.onSelect({zx_customer: item.zx_customer,type:item.zx_accounttype, })}}
          //   //  area:item.area__c

          // />}
          keyExtractor={(item) => item.name}
        />
      );
    } else {
      visibleNode = <NoDataFound text={""} />;
    }
    return visibleNode;
  }
  onCloseModal() {
    if (this.state.objective == "") {
      HelperService.showToast({ message: "Please Select Objective" });
    } else {
      this.setState({ isVisible: !this.state.isVisible });
      this.onSelect();
    }
  }

  loadingNode() {
    let loadingNode = (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.button,
          paddingBottom: 5,
          position: "absolute",
          backgroundColor: "rgb(0, 0, 0, .3)",
          zIndex: 4,
          width: "100%",
          height: "100%",
        }}
      >
        <Loading />
      </View>
    );
    return loadingNode;
  }

  render() {
    const { submitPlannedVisitsLoader } = this.props;
    // console.log("jjjjjjjjj", this.state.param);
    return (
      <View style={{ flex: 1, backgroundColor: Colors.lightGrey }}>
        <View
          style={{
            height: "15%",
            backgroundColor: Colors.white,
            justifyContent: "center",
          }}
        >
          {this.getPartiesAccountType()}
        </View>

        {submitPlannedVisitsLoader
          ? this.loadingNode()
          : this.getPartiesAccountTypeData()}

        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.isVisible}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: Colors.lightPink,
              height: 270,
              width: "80%",
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#fff",
              marginTop: 250,
              marginLeft: 40,
            }}
          >
            <TouchableOpacity
              onPress={() =>
                this.setState({ isVisible: !this.state.isVisible })
              }
              style={{ left: wp("30%") }}
            >
              <GenericIcon
                name={"cancel"}
                style={{
                  fontSize: 25,
                  color: Colors.black,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: Colors.darkRedPink,
                marginTop: 10,
                fontWeight: "bold",
              }}
            >
              Select Objective
            </Text>
            <View style={{ height: hp("10%") }}>
              <SearchableDropdown
                dataSource={[
                  { id: "Order", name: "Order" },
                  { id: "Collection", name: "Collection" },
                  {
                    id: "Relationship Building",
                    name: "Relationship Building",
                  },
                  { id: "New Product Demo", name: "New Product Demo" },
                  { id: "Issues Resolution", name: "Issues Resolution" },
                  { id: "Meet", name: "Meet" },
                  { id: "Workshop", name: "Workshop" },
                  { id: "Others", name: "Others" },
                ]}
                placeHolderText={"Select Objective"}
                selectedValue={this.state.objective}
                onChange={(value) => this.setState({ objective: value })}
                placeholder={"Type or Select Objective"}
                invalid={false}
                labelStyles={{
                  color: Colors.black,
                  textAlign: "center",
                  //   width: "99%",
                  //  padding:5,
                  fontSize: 13,
                  flexDirection: "row",
                }}
                customPickerStyles={{
                  ...Style.picker,
                  left: wp("0.5%"),
                  backgroundColor: "white",
                }}
                // label={'Reason'}
              />
            </View>
            {this.state.objective == "Others" ? (
              <TextInput
                style={{
                  height: hp("8%"),
                  top: "1.5%",
                  borderRadius: 5,
                  width: wp("60%"),
                  borderColor: "black",
                  borderWidth: 1,
                  alignSelf: "center",
                }}
                placeholder={"Enter Objective"}
                // editable={distributorForm.zx_overallstatus=="Pending for approval" || distributorForm.zx_overallstatus=="Approved" || distributorForm.zx_overallstatus=="Rejected" ? false:true}
                value={this.state.otherObj}
                onChangeText={(value) => this.setState({ otherObj: value })}
              />
            ) : null}
            <WhiteButton
              style={{
                backgroundColor: Colors.darkRedPink,
                top: hp("2%"),
                borderRadius: 10,
                height: hp("5%"),
                width: wp("25%"),
              }}
              // onPress={ () => this.props.sendApproval({form: item,token,id:item.Id})}
              onPress={() => {
                this.state.objective == "Others"
                  ? this.state.otherObj == ""
                    ? HelperService.showToast({ message: "Enter Objective" })
                    : this.onCloseModal()
                  : this.onCloseModal();
              }}
              title={"SUBMIT"}
              textStyle={{ color: Colors.white, fontSize: 12 }}
            ></WhiteButton>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid: state.user.id,
  retailersList: state.retailers.retailersList,
  dealersList: state.retailers.dealersList,
  agentAreas: [{ id: "", name: "All" }].concat(state.user.agentAreas),

  offset: state.retailers.retailersOffset,
  limit: state.retailers.retailersLimit,
  fetchRetailersLoader: state.retailers.fetchRetailersLoader,
  fetchDealersLoader: state.retailers.fetchDealersLoader,
  searchByAreaFilters: state.visits.unplannedVisit.searchByAreaFilters,
  submitPlannedVisitsLoader: state.visits.planVisit.submitPlannedVisitsLoader,
  countMapping: state.retailers.countMapping,
  partiesMapping: state.retailers.partiesMapping,
  retailerSearchFilters: state.retailers.retailerSearchFilters,
  user_details: state.user.user_details,
  isASM: state.user.psmList,
  code: state.user.user_details,
});

const mapDispatchToProps = (dispatch) => ({
  fetchRetailers: (params) => dispatch(RetailersActions.fetchRetailers(params)),
  fetchRetailers: (params) => dispatch(RetailersActions.fetchRetailers(params)),
  fetchDealers: (params) => dispatch(RetailersActions.fetchDealers(params)),
  submitSelectedUnplannedVisit: (params) =>
    dispatch(VisitsActions.submitSelectedUnplannedVisit(params)),
  updateSearchFilters: (params) =>
    dispatch(VisitsActions.changeSearchByAreaFilters(params)),
  clearSelectRetailer: () => dispatch(RetailersActions.clearSelectRetailer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchByAreaScreen);
