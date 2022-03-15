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
  Alert,
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
import DisplayCard from "../../Components/DisplayCard/DisplayCard";
import DisplayCardStrip from "../../Components/DisplayCard/DisplayCardStrip";
import Communication from "./Communication";
import Financial from "./Financial";
import Tax from "./Tax";
import BankDetails from "./BankDetails";
import NewDealerLayout from "../Layout/NewDealerLayout";
import DistributorActions from "App/Stores/Distributor/Actions";

class NewDealerScreen extends React.Component {
  componentDidMount() {
    this.props.extractFormData(this.props.distributorForm);
  }

  render() {
    // const[text,setText] = useState('pending for approval')
    let show = this.props.navigation.state.params;
    //  const {clear}=this.props.navigation.state.params
    //  console.log("clearrrrrrr",clear)
    // console.log("iiiiiiiiiddddddddddd",show)
    // console.log("aaaaaaaaaaaaaaaajjjjjjjjjjj",this.props.distributorForm);
    let selectedTabNode = [];
    switch (this.props.searchFilters["selectedTabonboard"]) {
      case 0:
        selectedTabNode = <Communication show={show}/>;
        break;
      case 1:
        selectedTabNode = <Financial show={show} />;
        break;
      case 2:
        selectedTabNode = <Tax />;
        break;
      case 3:
        selectedTabNode = <BankDetails />;
        break;
    }

    return (
      <View>
        <NewDealerLayout show={show} />
        <ScrollView>{selectedTabNode}</ScrollView>
      </View>
    );
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
  distributorForm: state.distributor.distributorForm,
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
  submitSelectedDistributorForm: (params) =>
    dispatch(DistributorActions.submitSelectedDistributorForm(params)),
  extractFormData: (params) =>
    dispatch(DistributorActions.extractFormData(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewDealerScreen);
