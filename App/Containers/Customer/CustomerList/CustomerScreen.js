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

import GenericIcon from "App/Components/GenericIcon";
import DashboardActions from "App/Stores/Dashboard/Actions";

import { ScrollableTab, TabHeading, Tab, Tabs } from "native-base";
import { ApplicationStyles, Helpers, Images, Metrics, Colors } from "App/Theme";

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
// import Card from '../../Components/Card/Card'
import WhiteButton from "App/Components/WhiteButton";
import { HelperService } from "App/Services/Utils/HelperService";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Card } from "react-native-paper";
import BackArrowButton from "App/Components/BackArrowButton";
// import PrimaryDistributor from "./PrimaryDistributor";
import RetailerList from "../../Retailers/RetailerList/RetailerList";


class CustomerScreen extends React.Component {
  render() {
    // const[text,setText] = useState('pending for approval')

    let selectedTabNode = [];
    switch (this.props.searchFilters["selectedTab"]) {
      case 0:
        selectedTabNode = <RetailerList />;
        break;
      case 1:
        selectedTabNode = <Financial />;
        break;
      case 2:
        selectedTabNode = <Tax />;
        break;
      case 3:
        selectedTabNode = <BankDetails />;
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerScreen);
