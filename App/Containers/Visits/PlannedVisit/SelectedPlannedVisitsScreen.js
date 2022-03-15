import React, { Component } from "react";
import { View, Alert, ScrollView, FlatList } from "react-native";
import { Button, Text } from "native-base";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Style from "./PlannedVisitStyles";
import BlueButton from "App/Components/BlueButton";
import WhiteButton from "App/Components/WhiteButton";
import NavigationService from "App/Services/NavigationService";
import { HelperService } from "App/Services/Utils/HelperService";
import SelectedVisitCard from "App/Containers/Visits/SelectedVisitCard";
import { Helpers, Metrics, Fonts, Colors, ApplicationStyles } from "App/Theme";
import Loading from "App/Components/Loading";
import NoDataFound from "App/Components/NoDataFound";
import RetailersActions from "App/Stores/Retailers/Actions";
import VisitsActions from "App/Stores/Visits/Actions";
import _ from "lodash";
import GenericIcon from "App/Components/GenericIcon";
import DatePicker from "App/Components/DatePicker";
import ActionModal from "App/Components/ActionModal";
import DatePickerStyles from "App/Components/DatePicker/DatePickerStyles";
import RecurrenceSelection from "App/Containers/Visits/RecurrenceSelection";
import { widthPercentageToDP } from "react-native-responsive-screen";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

class SelectedPlannedVisitsScreen extends React.Component {
  componentDidMount() {
    // this.fetchRetailersCall();
  }

  onRemoveClick(id) {
    const { removeVisitFromPlan } = this.props;

    Alert.alert(
      "Remove Planned Visit",
      "Do you want to delete this planned visit?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Confirm", onPress: () => removeVisitFromPlan({ id: id }) },
      ],
      { cancelable: false }
    );
  }

  fetchRetailersCall() {
    const {
      fetchRetailers,
      retailersOffset,
      retailersLimit,
      agentid,
      token,
    } = this.props;
    fetchRetailers({
      token: token,
      agentid: agentid,
      offset: retailersOffset,
      limit: retailersLimit,
    });
  }

  fetchDataFromList(zx_customer) {
    const { dealersList, retailersList } = this.props;

    let data = {};
    retailersList.map((obj) => {
      if (obj.seller.zx_customer == zx_customer) {
        data = obj.seller;
      }
    });

    if (_.isEmpty(data)) {
      dealersList.map((obj) => {
        if (obj.seller.zx_customer == zx_customer) {
          data = obj.seller;
        }
      });
    }

    return data;
  }

  cardNode(item) {
    const {
      psmList,
      agentid,
      categoryRatingMapping,
      recurringMapping,
      retailersList,
      editSelectedVisits,
	  code
    } = this.props;
    // console.log("shjdassdkdm", item)
    // console.log("shaaaaammaaa", item.name)

    return (
      <SelectedVisitCard
        name={item.name}
        type={item.zx_accounttype}
        id={item.local_id}
        zx_customer={item.zx_customer}
        categoryRatingMapping={categoryRatingMapping}
        onRemoveClick={() => this.onRemoveClick(item.local_id)}
        plannedVisitData={item}
        recurringMapping={recurringMapping}
        psmList={psmList}
        agentid={agentid}
        editSelectedVisits={(params) => editSelectedVisits(params)}
		code={code.zx_brandgroupcode}
      />
    );
  }

  onSubmit() {
    const {
      selectedPlannedVisits,
      submitSelectedPlannedVisits,
      token,
      agentid,
    } = this.props;

    Alert.alert(
      "Submit Planned Visits",
      "Do you want to submit your planned visits?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () =>
            submitSelectedPlannedVisits({
              form: selectedPlannedVisits,
              token: token,
              agentid: agentid,
            }),
        },
      ],
      { cancelable: false }
    );
  }

  editRepeatBeat(params) {
    const { selectedPlannedVisits, editSelectedVisits } = this.props;

    selectedPlannedVisits.map((obj) => {
      editSelectedVisits({
        ...params,
        id: obj.local_id,
      });
    });
  }

  clearRepeatBeat(params) {
    const { selectedPlannedVisits, editSelectedVisits } = this.props;

    selectedPlannedVisits.map((obj) => {
      editSelectedVisits({
        id: obj.local_id,
        edited_field: "till_date",
        edited_value: "",
      });

      editSelectedVisits({
        id: obj.local_id,
        edited_field: "recurring_on",
        edited_value: "",
      });
    });
  }

  render() {
    const {
      recurringMapping,
      retailersList,
      searchFilters,
      fetchRetailersLoader,
      categoryRatingMapping,
      selectedPlannedVisits,
      editSelectedVisits,
      submitPlannedVisitsLoader,
      token,
      agentid,
	  code
    } = this.props;

    let visibleNode = [];

    let noDataNode = <NoDataFound text={"No Planned Visits"}></NoDataFound>;

    visibleNode = (
      <FlatList
        data={HelperService.sortListFilter(
          selectedPlannedVisits,
          "date",
          "ASC"
        )}
        renderItem={({ item }) => this.cardNode(item)}
        keyExtractor={(item) => item.local_id}
        ListEmptyComponent={() => noDataNode}
      />
    );

    // editSelectedVisits({ id: id, edited_field: 'recurring_on', edited_value: '' }); editSelectedVisits({ id: id, edited_field: 'till_date', edited_value: '' })
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.95 }}>{visibleNode}</View>
        <BlueButton
          title={"Submit"}
          style={code.zx_brandgroupcode=="1"?{
            width: wp("47%"),
            alignSelf: "center",
            marginTop: 10,
            height: hp("5%"),
            borderRadius: 12,
          }:{
            width: wp("47%"),
            alignSelf: "center",
            marginTop: 10,
            height: hp("5%"),
            borderRadius: 12,
			backgroundColor:Colors.bluebackground
          }}
          textStyle={{
            fontSize: 20,
            fontFamily: ApplicationStyles.textMediumFont,
          }}
          loading={submitPlannedVisitsLoader}
          disabled={submitPlannedVisitsLoader}
          onPress={() => this.onSubmit()}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid: state.user.id,
  agentAreas: [{ id: "", name: "All" }].concat(state.user.agentAreas),
  retailersOffset: state.retailers.retailersOffset,
  retailersLimit: state.retailers.retailersLimit,
  retailersList: state.retailers.retailersList,
  dealersList: state.retailers.dealersList,
  fetchRetailersLoader: state.retailers.fetchRetailersLoader,
  searchFilters: state.visits.planVisit.searchFilters,
  categoryRatingMapping: state.common.categoryRatingMapping,
  recurringMapping: state.common.recurringMapping,
  selectedVisitDate: state.visits.planVisit.selectedVisitDate,
  selectedPlannedVisits: state.visits.planVisit.selectedPlannedVisits,
  submitPlannedVisitsLoader: state.visits.planVisit.submitPlannedVisitsLoader,
  isASM: state.user.isASM,
  psmList: state.user.psmList,
  code: state.user.user_details,
});

const mapDispatchToProps = (dispatch) => ({
  fetchRetailers: (params) => dispatch(RetailersActions.fetchRetailers(params)),
  editSelectedVisits: (params) =>
    dispatch(VisitsActions.editSelectedVisits(params)),
  removeVisitFromPlan: (params) =>
    dispatch(VisitsActions.removeVisitFromPlan(params)),
  changePlannedSelectedDate: (params) =>
    dispatch(VisitsActions.changePlannedSelectedDate(params)),
  submitSelectedPlannedVisits: (params) =>
    dispatch(VisitsActions.submitSelectedPlannedVisits(params)),
  changeAddPlannedVisitsSearchFilters: (params) =>
    dispatch(VisitsActions.changeAddPlannedVisitsSearchFilters(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedPlannedVisitsScreen);
