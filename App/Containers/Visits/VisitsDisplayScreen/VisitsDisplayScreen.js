import React, { Component } from "react";
import {
  View,
  Alert,
  Image,
  ScrollView,
  TouchableHighlight,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Button, Text, Icon } from "native-base";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Style from "./VisitsDisplayScreenStyles";
import BlueButton from "App/Components/BlueButton";
import WhiteButton from "App/Components/WhiteButton";
import NavigationService from "App/Services/NavigationService";
import { HelperService } from "App/Services/Utils/HelperService";
import VisitsActions from "App/Stores/Visits/Actions";
import VisitCard from "App/Containers/Visits/VisitCard";
import VisitAction from "./VisitAction";
import Loading from "App/Components/Loading";
import NoDataFound from "App/Components/NoDataFound";
import GenericIcon from "App/Components/GenericIcon";
import EditVisitCard from "App/Containers/Visits/EditVisitCard";
import CommonActions from "App/Stores/Common/Actions";
import { Colors } from "App/Theme";
import _ from "lodash";

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


class VisitsDisplayScreen extends React.Component {
  componentDidMount() {
    this.getVisitsDisplayListCall();
    // this.fetchVisitsStorageListCall();
  }

  fetchVisitsDisplayListCall() {
    const {
      token,
      agentid,
      searchFilters,
      fetchVisitsDisplayList,
    } = this.props;

    fetchVisitsDisplayList({
      token: token,
      agentid: agentid,
      startDate: searchFilters["startDate"],
      endDate: searchFilters["endDate"],
			agentid: searchFilters['psm__c'],

    });
  }

  getVisitsDisplayListCall() {
    const {
      token,
      agentid,
      searchFilters,
      getVisitsDisplayList,
      changeSearchFilters,
    } = this.props;
    // changeSearchFilters({ edited_field: "name", edited_value: agentid });

    getVisitsDisplayList({
      token: token,
      agentid:  agentid,
      startDate:searchFilters["startDate"],
      endDate: searchFilters["endDate"],
    });
  }
  // fetchVisitsStorageListCall() {
	// 	const {
	// 		token,
	// 		agentid,
	// 		fetchVisitsStorageList
	// 	} = this.props;

	// 	fetchVisitsStorageList({
	// 		token: token,
	// 		agentid: agentid,
	// 		startDate: HelperService.getPrevious7DayTimestamp(),
	// 		endDate: HelperService.getNext7DayTimestamp()
	// 	});
	// }

  refresh() {
    this.fetchVisitsDisplayListCall();
    // this.fetchVisitsStorageListCall();
  }

  // filterResults(list) {
  //   let searchFilters = this.props.searchFilters;
  //   let filteredList = HelperService.searchTextListFilter(
  //     list,
  //     "visit",
  //     searchFilters["name"],
  //     "name"
  //   );
    // filteredList = HelperService.searchTextListFilter(
    //   filteredList,
    //   "visit",
    //   searchFilters["area"],
    //   "area__c"
    // );
  //   return filteredList;
  // }

  isStartVisitLoading(data) {
    const { startVisitLoader, startVisitLoadingId } = this.props;

    let loading = false;
    loading = !!startVisitLoader && startVisitLoadingId == data.zx_visitsid;
    return loading;
  }

  isEndVisitLoading(data) {
    const { endVisitLoader, endVisitLoadingId } = this.props;

    let loading = false;
    loading = !!endVisitLoader && endVisitLoadingId == data.zx_visitsid;
    return loading;
  }

  isActionVisible(data) {
    //if status is completed, cancelled and visit is not of current day then start and end visit actions are not visible.
    const { searchFilters, agentid } = this.props;
    //console.log(searchFilters['name'])
    //console.log(agentid)
    const status = data.zx_visitstatus;
    if (
      status == "Completed" ||
      status == "Canceled" ||
      status == "Unexecuted" ||
      !HelperService.isToday(searchFilters["startDate"])
    ) {
      return false;
    }
    if (agentid !== searchFilters['psm__c']) {
      return false;
    }

    return true;
  }

  isActionDisabled() {
    const { endVisitLoader, startVisitLoader } = this.props;

    return startVisitLoader || endVisitLoader;
  }

  getStartVisitText(data) {
    const { executeVisitData } = this.props;

    return data.zx_visitstatus == "Started" ||
      (!_.isEmpty(executeVisitData) &&
        data.zx_visitsid == executeVisitData.zx_visitsid)
      ? "Resume"
      : "Start Visit";
  }

  getPsmAssigned(data) {
    const { agentid, psmList } = this.props;

    return agentid == data.name
      ? "Self"
      : HelperService.findMatchingKeyValueInList(
          psmList,
          "id",
          data.name,
          "name"
        ) || "Self";
  }

  getCardNode(data) {
    const {
      isASM,
      psmList,
      agentid,
      openModal,
      pressEndVisit,
      pressEditVisit,
      pressStartVisit,
      pressCancelVisit,
      executeVisitData,
      categoryRatingMapping,
      startVisitLoader,
      endVisitLoader,
      code
    } = this.props;

    return (
      <VisitCard
        visitData={data}
        isASM={isASM}
        psmAssigned={this.getPsmAssigned(data)}
        showPsmDetails={isASM}
        startVisitText={this.getStartVisitText(data)}
        categoryRatingMapping={categoryRatingMapping}
        orderData={data}
        onPressStartVisit={() =>{ pressStartVisit({ visit: data }); this.props.clearVisitInfo()}}
        onPressEndVisit={() => pressEndVisit({ visit: data })}
        startVisitDisabled={this.isActionDisabled()}
        endVisitDisabled={this.isActionDisabled()}
        actionVisible={this.isActionVisible(data)}
        infoVisible={!this.isActionVisible(data)}
        startVisitLoading={this.isStartVisitLoading(data)}
        code={code.zx_brandgroupcode}
        endVisitLoading={this.isEndVisitLoading(data)}
        editDisabled={this.isActionDisabled()}
        cancelDisabled={this.isActionDisabled()}
        onEditClick={() =>
          pressEditVisit({
            visit: data,
            modalData: {
              content: (
                <EditVisitCard
                  key={data.sfid}
                  cancel={false}
                  edit={true}
                  data={data}
                />
              ),
              heading: "Edit Visit Date",
              bodyFlexHeight:100
            },
          })
        }
        onCancelClick={() =>
          pressCancelVisit({
            visit: data,
            modalData: {
              content: (
                <EditVisitCard
                  key={data.sfid}
                  cancel={true}
                  edit={false}
                  data={data}
                />
              ),
              heading: "Cancel Visit",
            },
          })
        }
      />
    );
  }


  filterResults(list) {
    // console.log("lidddddddddddddd", list)
    const {
      searchFilters,
      
    } = this.props;

    let filteredList = HelperService.searchTextListFilter(
      list,
      "name",
      searchFilters["name"]
    );

   filteredList = HelperService.sortListFilter(filteredList, "zx_recordid", 'DSC');

    
    // console.log("fiiterrrrr", filteredList)
		
	  return filteredList;
   
  }
  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 12,
          width: "100%",
          backgroundColor: "white",
        }}
      />
    );
  }

  render() {
    const {
      token,
      agentid,
      visitsDisplayList,
      visitsStorageList,
      visitsAction,
      fetchVisitsDisplayListLoader,
      searchFilters,
      openVisitsAction,
      closeVisitsAction,
      filteredDisplayData,
      code
    } = this.props;

    let visibleNode = [];

    if (filteredDisplayData && filteredDisplayData.length) {
      let searchedFilteredList = this.filterResults(filteredDisplayData);
      if (searchedFilteredList.length) {
        visibleNode = (
          <FlatList
          style={{height:hp("50%")}}
            data={searchedFilteredList}
            contentContainerStyle={{ paddingBottom: 50,paddingTop:10}}
            ItemSeparatorComponent = { this.FlatListItemSeparator }
          // style={{borderColor:"black",borderWidth:2,paddingBottom:hp("90%"),paddingTop:hp("2%")}}
            renderItem={({ item }) => this.getCardNode(item)}
            onRefresh={() => this.fetchVisitsDisplayListCall()}
            refreshing={fetchVisitsDisplayListLoader}
            keyExtractor={(item) => item.id}
          />
        );
      } else {
        visibleNode = (
          <NoDataFound text={"No Visits for selected filter."}></NoDataFound>
        );
      }
    } else if (fetchVisitsDisplayListLoader) {
      visibleNode = <Loading />;
    } else if (
      filteredDisplayData &&
      !filteredDisplayData.length &&
      !fetchVisitsDisplayListLoader
    ) {
      visibleNode = (
        <NoDataFound text={"No Visits for this date."}>
          <GenericIcon
            name={"refresh"}
            show={true}
            onPress={() => this.fetchVisitsDisplayListCall()}
            style={{
              color: Colors.button,
              fontSize: 35,
              alignSelf: "center",
              padding: 10,
            }}
          />
        </NoDataFound>
      );
    }

    return (
      <View style={{...Style.container}}>
      
        {visibleNode}
     
        {visitsAction ? (
          <VisitAction
            closeVisitsAction={closeVisitsAction}
            openVisitsAction={openVisitsAction}
            code={code.zx_brandgroupcode}
          />
        ) : (
          []
        )}
        <TouchableOpacity
          style={code.zx_brandgroupcode=="1"?Style.plusIcon:Style.plusIconBlue}
          onPress={() => {
            visitsAction ? closeVisitsAction() : openVisitsAction();
          }}
        >
          <GenericIcon
						name={visitsAction ? 'remove' : 'add'}
						style={{ color: Colors.white, fontSize: 45, alignSelf: 'center' }}
					/>
          
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid: state.user.id,
  visitsDisplayList: state.visits.visitsDisplayList,
  visitsStorageList: state.visits.visitsStorageList,
  visitsAction: state.visits.visitsAction,
  fetchVisitsDisplayListLoader: state.visits.fetchVisitsDisplayListLoader,
  searchFilters: state.visits.searchFilters,
  filteredDisplayData: state.visits.filteredDisplayData,
  categoryRatingMapping: state.common.categoryRatingMapping,
  startVisitLoader: state.visits.startVisitLoader,
  endVisitLoader: state.visits.endVisitLoader,
  isASM: state.user.isASM,
  psmList: state.user.psmList.concat([{ id: "", name: "All" }]),
  startedToday: state.user.startDayTime
    ? HelperService.isToday(state.user.startDayTime)
    : false,
  endedToday: state.user.endDayTime
    ? HelperService.isToday(state.user.endDayTime)
    : false,
  absentToday: state.user.absentDayTime
    ? HelperService.isToday(state.user.absentDayTime)
    : false,
  executeVisitData: state.visits.executeVisitData,
  startVisitLoadingId: state.visits.startVisitLoadingId,
  endVisitLoadingId: state.visits.endVisitLoadingId,
  businessChannel: state.user.user_details
    ? state.user.user_details.business_channel__c
    : "",
  code: state.user.user_details,
});

const mapDispatchToProps = (dispatch) => ({
  fetchVisitsStorageList: (params) =>
    dispatch(VisitsActions.fetchVisitsStorageList(params)),
  fetchVisitsDisplayList: (params) =>
    dispatch(VisitsActions.fetchVisitsDisplayList(params)),
  changeSearchFilters: (params) =>
    dispatch(VisitsActions.changeSearchFilters(params)),
  openVisitsAction: () => dispatch(VisitsActions.openVisitsAction()),
  closeVisitsAction: () => dispatch(VisitsActions.closeVisitsAction()),
  getVisitsDisplayList: (params) =>
    dispatch(VisitsActions.getVisitsDisplayList(params)),
  executeVisit: (params) => dispatch(VisitsActions.executeVisit(params)),
  openModal: (params) => dispatch(CommonActions.openModal(params)),
  disableModal: (params) => dispatch(CommonActions.disableModal(params)),
  startVisit: (params) => dispatch(VisitsActions.startVisit(params)),
  endVisit: (params) => dispatch(VisitsActions.endVisit(params)),
  startVisitLoading: (params) =>
    dispatch(VisitsActions.startVisitLoading(params)),
  endVisitLoading: (params) => dispatch(VisitsActions.endVisitLoading(params)),
  startVisitLoadingStop: (params) =>
    dispatch(VisitsActions.startVisitLoadingStop(params)),
  endVisitLoadingStop: (params) =>
    dispatch(VisitsActions.endVisitLoadingStop(params)),
  pressStartVisit: (params) => dispatch(VisitsActions.pressStartVisit(params)),
  pressEndVisit: (params) => dispatch(VisitsActions.pressEndVisit(params)),
  pressEditVisit: (params) => dispatch(VisitsActions.pressEditVisit(params)),
  pressCancelVisit: (params) =>
    dispatch(VisitsActions.pressCancelVisit(params)),
    clearVisitInfo: () =>
    dispatch(VisitsActions.clearVisitInfo()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisitsDisplayScreen);
