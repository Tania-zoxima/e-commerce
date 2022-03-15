import React, { Component } from "react";
import { View, Alert, ScrollView, RefreshControl } from "react-native";
import { Button, Text } from "native-base";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Style from "./DashboardScreenStyle";
import BlueButton from "App/Components/BlueButton";
import WhiteButton from "App/Components/WhiteButton";
import LayoutScreen from "../Layout/LayoutScreen";
import { START, ABSENT, GOOD, MORNING } from "App/Constants";
import NavigationService from "App/Services/NavigationService";
import { HelperService } from "App/Services/Utils/HelperService";
import UserActions from "App/Stores/User/Actions";
import SingleInfo from "App/Components/SingleInfo";
import Separator from "App/Components/Separator";
import DashboardHeading from "App/Components/DashboardHeading";
import DashboardTabs from "./DashboardTabs";
import AchievedTargets from "./AchievedTargets";
import CircularProgressBar from "App/Components/CircularProgressBar";
import GroupedLineChart from "App/Components/GroupedLineChart";
import { Colors, ApplicationStyles, Fonts, Metrics } from "App/Theme";
import SummaryTables from "./SummaryTables";
import MyDetails from "./SummaryTables/MyDetails";
import DashboardActions from "App/Stores/Dashboard/Actions";
import SalesOverview from "./SalesOverview";
import DailyReport from "./DailyReport";
import VisitsActions from "App/Stores/Visits/Actions";
import Loader from "../Loader/Loader";
import _ from "lodash";

class DashboardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
    };
  }
  componentDidMount() {
    const {
      token,
      agentid,
      searchFilters,
      banner,
      getOrderValue,
      getVisitCount,
      getSiteCount,
      getCounters,
      getEventCount,
      getDashboardBanner,
      getDashboardSummary,
      logindata,
      userGuid,
      getTicker,
      summary,
      psmList,
    } = this.props;

    let params = {
      token,
      form: {
        userGuid: userGuid,
        userDate: HelperService.getCurrentTimestamp(),
        // userDate: HelperService.getCurrentTimestamp(),
      },
    };
    let params1 = {
      token,
      zx_brandgroup: logindata && logindata.zx_brandgroup,
      zx_publishon: "SFA",
      // userDate: HelperService.getCurrentTimestamp(),
    };

    this.state.timer = setTimeout(() => getDashboardBanner(params1), 4000);

    this.state.timer = setTimeout(() => getDashboardSummary(params), 5000);

    // this.state.timer = setTimeout(() => this.props.fetchAllPsm(), 6000);

    this.state.timer = setTimeout(
      () =>
        this.onDateChange({
          selectedStartDate: HelperService.getCurrentTimestamp(),
        }),
      8500
    );
  }

  onDateChange(params) {
    const {
      token,
      agentid,
      searchFilters,
      changeSearchFilters,
      searchDashboardOrderFilters,
      visitSummary,
      filterOrder,
    } = this.props;

    changeSearchFilters({
      edited_field: "startDate",
      edited_value: params.selectedStartDate,
    });

    changeSearchFilters({
      edited_field: "endDate",
      edited_value: params.selectedEndDate,
    });

    this.state.timer = setTimeout(
      () =>
        this.props.getVisitSummary(
          {
            id: agentid,
            fromdate: params.selectedStartDate,
            todate: params.selectedStartDate,
          },
          token
        ),
      2000
    );

    this.state.timer = setTimeout(
      () =>
        this.props.dashboardOrderFilter({
          forms: {
            zx_team: agentid,
            zx_state: searchDashboardOrderFilters.state,
            zx_substate: searchDashboardOrderFilters.sub,
            zx_district: searchDashboardOrderFilters.district,
            zx_zone: searchDashboardOrderFilters.zone,
            zx_area: searchDashboardOrderFilters.area,
            zx_city: searchDashboardOrderFilters.city,
            zx_brandgroup: searchDashboardOrderFilters.brand,
            zx_itemclass: searchDashboardOrderFilters.itemClass,
            zx_fromdate: HelperService.dateReadableFormatWithHyphen(
              params.selectedStartDate
            ),
            zx_todate: HelperService.dateReadableFormatWithHyphen(
              params.selectedStartDate
            ),
          },
          token,
        }),
      3000
    );
  }

  onMonthChange(month) {
    const { token, agentid, searchFilters, changeSearchFilters } = this.props;

    changeSearchFilters({
      edited_field: "selectedMonth",
      edited_value: month,
    });

    let timestamps = HelperService.getMonthStartAndEndDateTimestamp(month);

    changeSearchFilters({
      edited_field: "startDate",
      edited_value: timestamps[0],
    });

    changeSearchFilters({
      edited_field: "endDate",
      edited_value: timestamps[1],
    });

    this.props.getVisitSummary(
      {
        id: agentid,
        fromdate: params.selectedStartDate,
        todate: params.selectedStartDate,
      },
      token
    );
  }

  render() {
    let selectedTabNode = [];
    if (this.props.isASM.length) {
      switch (this.props.searchFilters["selectedTab"]) {
        case 0:
          selectedTabNode = <DailyReport />;
          break;
        case 1:
          selectedTabNode = <SalesOverview />;
          break;
        case 2:
          selectedTabNode = <MyDetails />;
          break;
      }
    } else {
      switch (this.props.searchFilters["selectedTab"]) {
        case 0:
          selectedTabNode = <DailyReport />;
          break;
        case 1:
          selectedTabNode = <SalesOverview />;
          break;
        case 2:
          selectedTabNode = <MyDetails />;
          break;
      }
    }
    return <View>{selectedTabNode}</View>;
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
  userGuid: state.user.id,
  logindata: state.user.user_details,
  loader: state.dashboard.loaders.tickerLoader,
  visitSummary: state.visits.visitSummary,
  primarySummary: state.dashboard.primarySummary,
  secondarySummary: state.dashboard.secondarySummary,
  searchDashboardOrderFilters: state.dashboard.searchDashboardOrderFilters,
  dashboardSummaryLoader: state.dashboard.loaders.dashboardSummaryLoader,
  dashboardBannerLoader: state.dashboard.loaders.dashboardBannerLoader,
  fetchAllPsmLoader: state.user.fetchAllPsmLoader,
  loading: state.dashboard.loaders.filterOrderLoader,
  visitSummaryLoader: state.visits.visitSummaryLoader,
  banner: state.dashboard.data.dashboardBanner,
  summary: state.dashboard.data.dashboardSummary,
  filterOrder: state.dashboard.data.filterOrder,
});

const mapDispatchToProps = (dispatch) => ({
  changeSearchFilters: (params) =>
    dispatch(DashboardActions.changeDashboardSearchFilters(params)),
  getOrderValue: (params) => dispatch(DashboardActions.getOrderValue(params)),
  getVisitCount: (params) => dispatch(DashboardActions.getVisitCount(params)),
  getSiteCount: (params) => dispatch(DashboardActions.getSiteCount(params)),
  getCounters: (params) => dispatch(DashboardActions.getCounters(params)),
  getEventCount: (params) => dispatch(DashboardActions.getEventCount(params)),
  getDashboardSummary: (params) =>
    dispatch(DashboardActions.getDashboardSummary(params)),
  getDashboardBanner: (params) =>
    dispatch(DashboardActions.getDashboardBanner(params)),
  fetchAllPsm: (params) => dispatch(UserActions.fetchAllPsm(params)),
  // getTicker: (params) => dispatch(DashboardActions.getTicker(params)),
  getVisitSummary: (params) => dispatch(VisitsActions.getVisitSummary(params)),
  getPrimarySummary: (params) =>
    dispatch(DashboardActions.getPrimarySummary(params)),
  getSecondarySummary: (params) =>
    dispatch(DashboardActions.getSecondarySummary(params)),
  dashboardOrderFilter: (params) =>
    dispatch(DashboardActions.dashboardOrderFilter(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);
