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
} from "react-native";
import { connect } from "react-redux";
import DashboardActions from "App/Stores/Dashboard/Actions";
import ProjectDetails from "./ProjectDetails";
import Leadinfo from "./Leadinfo";

class CreateLeadScreen extends React.Component {
  render() {
    let selectedTabNode = [];
    switch (this.props.searchFilters["selectedTab"]) {
      case 0:
        selectedTabNode = <Leadinfo/>;
        break;
      case 1:
        selectedTabNode =<ProjectDetails />;
        break;
    }

    return <ScrollView>{selectedTabNode}</ScrollView>;
  }
}
const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid: state.user.id,
  isASM: state.user.psmList,
  psmList: state.user.psmList.concat([{ id: "", name: "All" }]),
  searchFilters: state.dashboard.searchFilters,
  data: state.dashboard.data,
  loaders: state.dashboard.loaders,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateLeadScreen);
