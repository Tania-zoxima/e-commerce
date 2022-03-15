import React, { Component } from "react";
import { View, Alert, ScrollView, Text } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Style from "./NewDealerScreenStyles";
// import Style from '../Dashboard/DashboardScreenStyle'
import BlueButton from "App/Components/BlueButton";
import WhiteButton from "App/Components/WhiteButton";
import { START, ABSENT, GOOD, MORNING } from "App/Constants";
import NavigationService from "App/Services/NavigationService";
import { HelperService } from "App/Services/Utils/HelperService";
import DashboardActions from "App/Stores/Dashboard/Actions";
import SingleInfo from "App/Components/SingleInfo";
import Separator from "App/Components/Separator";
import DashboardHeading from "App/Components/DashboardHeading";
import CircularProgressBar from "App/Components/CircularProgressBar";
// import AchievedTargets from './AchievedTargets';
import {
  Container,
  Header,
  Tab,
  Tabs,
  ScrollableTab,
  TabHeading,
} from "native-base";

//<ScrollableTab tabsContainerStyle={Style.tabHeading} underlineStyle={Style.tabUnderLine} style={Style.mainTabs} />

class NewDealerTabs extends React.Component {
  render() {
    const { isASM, searchFilters, changeSearchFilters,code } = this.props;
    return (
      <Tabs
        onChangeTab={(tab) =>
          changeSearchFilters({
            edited_field: "selectedTabonboard",
            edited_value: tab.i,
          })
        }
        renderTabBar={() => (
          <ScrollableTab tabStyle={{ backgroundColor: "white" }} />
        )}
        tabBarUnderlineStyle={code.zx_brandgroupcode == "1"?Style.tabUnderLine:Style.tabUnderLineBlue}
        style={Style.mainTabs}
        initialPage={searchFilters["selectedTabonboard"]}
      >
        <Tab
          selected={true}
          underlineStyle={{ ...Style.tabUnderLine }}
          heading={
            <TabHeading style={Style.tabHeading}>
              <Text style={Style.tabText}>Communication</Text>
            </TabHeading>
          }
        />

        <Tab
          selected={false}
          underlineStyle={Style.tabUnderLine}
          heading={
            <TabHeading style={Style.tabHeading}>
              <Text style={Style.tabText}>Financial</Text>
            </TabHeading>
          }
        />
        <Tab
          selected={false}
          underlineStyle={Style.tabUnderLine}
          heading={
            <TabHeading style={Style.tabHeading}>
              <Text style={Style.tabText}>Tax/GST</Text>
            </TabHeading>
          }
        />
        <Tab
          selected={false}
          underlineStyle={Style.tabUnderLine}
          heading={
            <TabHeading style={Style.tabHeading}>
              <Text style={Style.tabText}>Bank Details</Text>
            </TabHeading>
          }
        />
      </Tabs>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid: state.user.id,
  isASM: state.user.psmList,
  psmList: state.user.psmList.concat([{ id: "", name: "All" }]),
  searchFilters: state.dashboard.searchFilters,
  code: state.user.user_details,
});

const mapDispatchToProps = (dispatch) => ({
  changeSearchFilters: (params) =>
    dispatch(DashboardActions.changeDashboardSearchFilters(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewDealerTabs);
