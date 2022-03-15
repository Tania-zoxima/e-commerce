import React, { Component } from "react";
import { View, Alert, ScrollView, FlatList } from "react-native";
import { Button, Text, Icon } from "native-base";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Style from "./PlannedVisitStyles";
import BlueButton from "App/Components/BlueButton";
import WhiteButton from "App/Components/WhiteButton";
import NavigationService from "App/Services/NavigationService";
import { HelperService } from "App/Services/Utils/HelperService";
import PlannedVisitCard from "App/Containers/Visits/PlannedVisitCard";
import SitesPlannedVisitCard from "App/Containers/Visits/PlannedVisitCard/SitesPlannedVisitCard";
import InfluencerPlannedVisitCard from "App/Containers/Visits/PlannedVisitCard/InfluencerPlannedVisitCard";
import Loading from "App/Components/Loading";
import GenericIcon from "App/Components/GenericIcon";
import NoDataFound from "App/Components/NoDataFound";
import RetailersActions from "App/Stores/Retailers/Actions";
import VisitsActions from "App/Stores/Visits/Actions";
import SitesActions from "App/Stores/Sites/Actions";
import InfluencersActions from "App/Stores/Influencers/Actions";
import EditVisitCard from "App/Containers/Visits/EditVisitCard";
import CommonActions from "App/Stores/Common/Actions";
import { Colors } from "App/Theme";
import _ from "lodash";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import ObjectiveModal from "App/Containers/Visits/ObjectiveModal";

const objectiveList = {
  "0": "consumer_direct",
  "1": "dealer",
  "2": "distributor",
  "3": "sez_export",
  "4": "sub_distributor",
};

class AddPlannedVisitsScreen extends React.Component {
  componentDidMount() {
    const {
      retailersList,
      getObjective,
      updateSearchFilters,
      changePlannedSelectedPSM,
      agentid,
      token,
      fetchTodayAreaPjp,
      changeAddPlannedVisitsSearchFilters,
    } = this.props;
    changePlannedSelectedPSM(agentid);
    this.props.clearSelectRetailer();
    this.props.changePlannedStartDate(1);
    this.props.changePlannedSelectedDate(
      HelperService.getCurrentTimestamp() + 1 * 24 * 60 * 60 * 1000
    );
    if (retailersList && !_.isEmpty(retailersList)) {
      updateSearchFilters({
        edited_field: "type",
        edited_value: retailersList.type[0],
      });
      updateSearchFilters({ edited_field: "selectedTab", edited_value: 0 });
    } else {
      this.fetchRetailersCall();
      // updateSearchFilters({ edited_field: 'type', 'edited_value':value })
    }
    // this.props.changePlannedStartDate(1)
    // fetchTodayAreaPjp({
    // token,
    //team__c: agentid,
    //date:HelperService.getCurrentTimestamp(),
    //})
    getObjective({ token, type: objectiveList["0"] });

    changeAddPlannedVisitsSearchFilters({
      edited_field: "name",
      edited_value: "",
    });
  }
  fetchRetailersCall() {
    const { token, agentid, fetchRetailers } = this.props;

    fetchRetailers({
      token,
      agentid,
    });
  }

  filterResults(list) {
    const { searchFilters, retailerSearchFilters } = this.props;
    let filteredList = [];

    //  filteredList = HelperService.searchTextListFilter(list, 'area__c', searchFilters['area'])

    filteredList = HelperService.searchTextListFilter(
      list,
      this.props.searchFilters["searchBy"],
      this.props.searchFilters["searchvalue"]
    );
    // filteredList = HelperService.searchTextListFilter(filteredList, 'telephone1', searchFilters['area']);
    filteredList = HelperService.sortListFilter(filteredList, "name", "ASC");

    return filteredList;
  }

  fetchDataFromAreaList() {
    const { agentAreaPjp, agentBeatPjp, agentPjp, searchFilters } = this.props;

    let data = "";
    agentPjp.area && agentPjp.area.length
      ? agentPjp.area.map((obj) => {
          if (obj.area__c == searchFilters["area"]) {
            data = obj.zx_customer;
          }
        })
      : [];

    return data;
  }

  fetchDataFromBeatList() {
    const { agentAreaPjp, agentBeatPjp, agentPjp, searchFilters } = this.props;

    let data = "";

    agentPjp.beat && agentPjp.beat.length
      ? agentPjp.beat.map((obj) => {
          if (obj.beat__c == searchFilters["beat"]) {
            data = obj.zx_customer;
          }
        })
      : [];

    return data;
  }

  addall = (params) => {
    const {
      selectedPlannedVisits,
      selectedVisitDate,
      retailerSearchFilters,
      addBulkVisitsToPlan,
      partiesMapping,
      selectedVisitPSM,
      agentid,
      selectedObjective,
      user_details,
      retailersList,
    } = this.props;

    let pjp = this.fetchDataFromAreaList();
    let pjpBeat = this.fetchDataFromBeatList();
    let filterList = this.filterResults(
      HelperService.searchTextListFilter(
        retailersList.list,
        "zx_accounttype",
        retailerSearchFilters["type"]
      )
    );

    addBulkVisitsToPlan({
      selectedPlannedVisits,
      selectedVisitDate,
      retailerSearchFilters,
      filterList,
      selectedVisitPSM,
      user_details,
      agentid,
      pjp,
      pjpBeat,
      retailersList,
      selectedObjective,
    });
  };

  isaddall = () => {
    const { retailerSearchFilters, partiesMapping, retailersList } = this.props;

    let allAdded = true;
    let filterList = [];
    if (retailersList && retailersList.list && retailersList.list.length) {
      filterList = this.filterResults(
        HelperService.searchTextListFilter(
          retailersList.list,
          "zx_accounttype",
          retailerSearchFilters["type"]
        )
      );
    }
    // if(filterList)

    filterList.map((obj) => {
      if (!this.isRetailerAdded(obj)) {
        allAdded = false;
      }
    });

    return allAdded;
  };

  isRemoveall = () => {
    const {
      selectedPlannedVisits,
      selectedVisitDate,
      selectedObjective,
      retailerSearchFilters,
      removeBulkVisitsToPlan,
      selectedVisitPSM,
      agentid,
      retailersList,
      user_details,
    } = this.props;
    let filterList = this.filterResults(
      HelperService.searchTextListFilter(
        retailersList.list,
        "zx_accounttype",
        retailerSearchFilters["type"]
      )
    );

    removeBulkVisitsToPlan({
      selectedPlannedVisits,
      selectedVisitDate,
      retailerSearchFilters,
      filterList,
      selectedObjective,

      selectedVisitPSM,
      agentid,
      user_details,
    });
  };

  onAddClick(params) {
    const {
      agentid,
      selectedVisitPSM,
      changePlannedSelectedObjective,
      changePlannedSelectedOtherObjective,
      showObjectiveModal,
      selectedVisitDate,
      addVisitToPlan,
      searchFilters,
      setAddVisitData,
      retailersList,
      selectedObjective,
      selectedOtherObjective,

      user_details,
      agentAreaPjp,
      retailerSearchFilters,
    } = this.props;
    let data = {
      zx_customer: params.id,
      //  "visit_type": "Planned",
      //  zx_visitdate: selectedVisitDate,
      // zx_currenrtdate: HelperService.getCurrentDate(),
      zx_currenrtdateandtime: HelperService.dateReadableFormat3(),
      // "assigned_by__c":(selectedVisitPSM==agentid) ? 'Self' :'Manager',
      zx_accounttype: params.zx_accounttype,
      zx_visitdate2: HelperService.dateReadableFormatWithHyphen(
        selectedVisitDate
      ),
      name: params.name,
      // "area__c": params.area__c,
      zx_team: selectedVisitPSM ? selectedVisitPSM : agentid,

      // "pjp_header__c": this.fetchDataFromAreaList(),
      zx_visittype: "Planned",
      zx_visitobjective: selectedObjective,
      zx_remarksforothers: selectedOtherObjective,
      zx_visitstatus: "Open",
      address1_line1: params.address1_line1,
    };

    // if (retailerSearchFilters["type"] == "Retailer") {
    //   data.pjp_header__c = this.fetchDataFromBeatList();
    // }

    data = HelperService.decorateWithLocalId(data);
    // addVisitToPlan(data)
    setAddVisitData(data);

    showObjectiveModal();
    changePlannedSelectedObjective(), changePlannedSelectedOtherObjective();
  }

  onRemoveClick(item) {
    const {
      agentid,
      selectedVisitPSM,
      selectedVisitDate,
      selectedObjective,
      removeVisitFromPlan,
      selectedPlannedVisits,
    } = this.props;

    _.map(selectedPlannedVisits, (obj) => {
      if (
        obj.zx_customer == item.id &&
        HelperService.datesAreOnSameDay(
          HelperService.getDateTimestamp(obj.zx_visitdate2),
          selectedVisitDate
        )
      ) {
        id = obj.local_id;
      }
    });

    removeVisitFromPlan({ id });
  }

  isRetailerAdded(item) {
    const {
      selectedPlannedVisits,
      selectedVisitDate,
      selectedObjective,
      selectedVisitPSM,
    } = this.props;

    let isAdded = false;
    _.map(selectedPlannedVisits, (obj) => {
      if (
        obj.zx_customer == item.id &&
        HelperService.datesAreOnSameDay(
          HelperService.getDateTimestamp(obj.zx_visitdate2),
          selectedVisitDate
        )
      ) {
        isAdded = true;
      }
    });
    // console.log("Zameen", isAdded);

    return isAdded;
  }

  getRetailerCardNode(data) {
    const {
      retailersList,
      retailerSearchFilters,
      updateSearchFilters,
      getObjective,
      token,
      code
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

    //  console.log("datentime:", HelperService.dateReadableFormats())

    return (
      <WhiteButton
        title={data.replace("_", " ") + "(" + count + ")"}
        style={{ ...Style.actionButton, ...Style.customSelectedStyleCorpBlue }}
        textStyle={Style.actionButtonText}
        onPress={() => {
          updateSearchFilters({ edited_field: "type", edited_value: data });
          updateSearchFilters({
            edited_field: "selectedTab",
            edited_value: 0,
          });
          // getObjective({ token, type:retailersList.type[tabData.i.toString()] })
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
    const {
      retailersList,
      fetchRetailersLoader,
      updateSearchFilters,

      getObjective,
      token,
    } = this.props;

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
              onPress={() => this.fetchRetailersFF()}
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
      retailerSearchFilters,
      fetchRetailersLoader,
      code,
    } = this.props;
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
    if (filteredPartiesList.length) {
      visibleNode = (
        <FlatList
          style={{ backgroundColor: "white" }}
          key={"Retailers"}
          data={filteredPartiesList}
          renderItem={({ item }) => (
            <PlannedVisitCard
              data={item}
              key={item.id}
              id={item.id}
              onAddClick={() => this.onAddClick(item)}
              onRemoveClick={() => this.onRemoveClick(item)}
              added={this.isRetailerAdded(item)}
              show={false}
              code={code.zx_brandgroupcode}
            />
          )}
          keyExtractor={(item) => item.id}
          onRefresh={() => this.fetchRetailersCall()}
          refreshing={fetchRetailersLoader}
          ListEmptyComponent={() => <NoDataFound text={"No Parties Found"} />}
        />
      );
    } else {
      <View style={{ marginTop: "5%" }}>
        visibleNode = <NoDataFound text={"No Parties Found"} />
      </View>;
    }
    return visibleNode;
  }

  displayButton() {
    const { retailersList, retailerSearchFilters } = this.props;

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
    if (filteredPartiesList.length) {
      //  visibleNode = (

      //   <WhiteButton
      //   selected={false}
      //   title={!this.isaddall() ? 'ADD ALL' : 'REMOVE ALL'}
      //   disabled={false}
      //   loading={false}
      //   onPress={this.isaddall() ? this.isRemoveall : this.addall}
      //   style={Style.addActionButton}
      //   textStyle={Style.addActionButtonText}
      // >
      //   </WhiteButton>

      // );}else {
      visibleNode = [];
    }

    return visibleNode;
  }

  render() {
    const {
      retailerSearchFilters,
      partiesMapping,
      isObjModalVisible,
      hideObjectiveModal,
      selectedVisitDate,
      code
    } = this.props;
    // console.log("jjjjjjjjjjjjjjjjjj",HelperService.dateReadableFormat2(selectedVisitDate))

    return (
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <View style={{ height: hp("8%"), backgroundColor: Colors.white }}>
          {this.getPartiesAccountType()}
        </View>

        <ObjectiveModal
          isVisible={isObjModalVisible}
          onCloseModal={() => hideObjectiveModal()}
          code={code.zx_brandgroupcode}
        />

        {this.getPartiesAccountTypeData()}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid: state.user.id,
  isConnected: state.network.isConnected,
  agentAreas: [{ id: "", name: "All" }].concat(state.user.agentAreas),
  retailersOffset: state.retailers.retailersOffset,
  retailersLimit: state.retailers.retailersLimit,
  retailersList: state.retailers.retailersList,
  dealersList: state.retailers.dealersList,
  fetchRetailersLoader: state.retailers.fetchRetailersLoader,
  fetchDealersLoader: state.retailers.fetchDealersLoader,
  searchFilters: state.visits.planVisit.searchFilters,
  categoryRatingMapping: state.common.categoryRatingMapping,
  selectedVisitDate: state.visits.planVisit.selectedVisitDate,
  selectedVisitPSM: state.visits.planVisit.selectedVisitPSM,
  selectedPlannedVisits: state.visits.planVisit.selectedPlannedVisits,
  countMapping: state.retailers.countMapping,
  partiesMapping: state.retailers.partiesMapping,
  selectedVisitDate: state.visits.planVisit.selectedVisitDate,
  selectedVisitPSM: state.visits.planVisit.selectedVisitPSM,
  retailerSearchFilters: state.retailers.retailerSearchFilters,
  selectedObjective: state.visits.planVisit.selectedObjective,
  isObjModalVisible: state.common.isObjModalVisible,
  objectList: state.common.objectiveList,

  agentAreaPjp: state.common.agentAreaPjp,
  agentPjp: state.common.agentPjp,
  agentBeatPjp: state.common.agentBeatPjp,
  user_details: state.user.user_details,
  businessChannel: state.user.user_details
    ? state.user.user_details.business_channel__c
    : "",
  code: state.user.user_details,
});

const mapDispatchToProps = (dispatch) => ({
  fetchRetailers: (params) => dispatch(RetailersActions.fetchRetailers(params)),
  fetchDealers: (params) => dispatch(RetailersActions.fetchDealers(params)),
  addVisitToPlan: (params) => dispatch(VisitsActions.addVisitToPlan(params)),
  removeVisitFromPlan: (params) =>
    dispatch(VisitsActions.removeVisitFromPlan(params)),
  updateSearchFilters: (params) =>
    dispatch(RetailersActions.updateSearchFilters(params)),
  clearSelectRetailer: () => dispatch(RetailersActions.clearSelectRetailer()),
  changePlannedSelectedPSM: (params) =>
    dispatch(VisitsActions.changePlannedSelectedPSM(params)),
  changeAddPlannedVisitsSearchFilters: (params) =>
    dispatch(VisitsActions.changeAddPlannedVisitsSearchFilters(params)),
  getAreaPjp: (params) => dispatch(CommonActions.fetchAllAreaPjp(params)),
  fetchTodayAreaPjp: (params) =>
    dispatch(CommonActions.fetchTodayAreaPjp(params)),
  changePlannedSelectedDate: (params) =>
    dispatch(VisitsActions.changePlannedSelectedDate(params)),
  changePlannedStartDate: (params) =>
    dispatch(VisitsActions.changePlannedStartDate(params)),
  addBulkVisitsToPlan: (params) =>
    dispatch(VisitsActions.addBulkVisitsToPlan(params)),
  removeBulkVisitsToPlan: (params) =>
    dispatch(VisitsActions.removeBulkVisitsToPlan(params)),
  showObjectiveModal: () => dispatch(CommonActions.showObjectiveModal()),
  hideObjectiveModal: () => dispatch(CommonActions.hideObjectiveModal()),
  getObjective: (params) => dispatch(VisitsActions.getObjective(params)),
  changePlannedSelectedObjective: (params) =>
    dispatch(VisitsActions.changePlannedSelectedObjective(params)),
  changePlannedSelectedOtherObjective: (params) =>
    dispatch(VisitsActions.changePlannedSelectedOtherObjective(params)),
  setAddVisitData: (params) => dispatch(VisitsActions.setAddVisitData(params)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPlannedVisitsScreen);
