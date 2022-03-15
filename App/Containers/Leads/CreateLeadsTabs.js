import React, { Component } from "react";
import { View, Alert, ScrollView, Text } from "react-native";
import { connect } from "react-redux";
import Style from "./CreateLeadScreenStyle"
import DashboardActions from "App/Stores/Dashboard/Actions";

import {
  Container,
  Header,
  Tab,
  Tabs,
  ScrollableTab,
  TabHeading,
} from "native-base";

class CreateLeadTabs extends React.Component {
  render() {
    const { isASM, searchFilters, changeSearchFilters } = this.props;
    return (
      <Tabs
        onChangeTab={(tab) =>
          changeSearchFilters({
            edited_field: "selectedTab",
            edited_value: tab.i,
          })
        }

        tabBarUnderlineStyle={Style.tabUnderLine}
        style={Style.mainTabs}
        initialPage={searchFilters["selectedTab"]}
      >
        <Tab
          selected={true}
          underlineStyle={{ ...Style.tabUnderLine }}
          heading={
            <TabHeading style={Style.tabHeading}>
              <Text style={Style.tabText}>Lead Info</Text>
            </TabHeading>
          }
        />

        <Tab
          selected={false}
          underlineStyle={Style.tabUnderLine}
          heading={
            <TabHeading style={Style.tabHeading}>
              <Text style={Style.tabText}>Project Details</Text>
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
});

const mapDispatchToProps = (dispatch) => ({
  changeSearchFilters: (params) =>
    dispatch(DashboardActions.changeDashboardSearchFilters(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateLeadTabs);
