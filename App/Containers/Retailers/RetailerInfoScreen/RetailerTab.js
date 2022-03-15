import React, { Component } from "react";
import { View, Alert, ScrollView, Text } from "react-native";
import { connect } from "react-redux";
import Style from "./RetailerInfoStyle";
import RetailersActions from "App/Stores/Retailers/Actions";

import {
  Container,
  Header,
  Tab,
  Tabs,
  ScrollableTab,
  TabHeading,
} from "native-base";

//<ScrollableTab tabsContainerStyle={Style.tabHeading} underlineStyle={Style.tabUnderLine} style={Style.mainTabs} />

class RetailerTab extends React.Component {
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
          underlineStyle={Style.tabUnderLine}
          heading={
            <TabHeading style={Style.tabHeading}>
              <Text style={Style.tabText}> Info</Text>
            </TabHeading>
          }
        ></Tab>

        {
          //   <Tab selected={true} underlineStyle={Style.tabUnderLine} heading={<TabHeading style={Style.tabHeading}><Text style={Style.tabText}>Orders</Text></TabHeading>}>
          // </Tab>
        }

        {searchFilters["type"] == "Retail_Distributor" ||
        searchFilters["type"] == "Wholesaler" ? (
          <Tab
            selected={false}
            underlineStyle={Style.tabUnderLine}
            heading={
              <TabHeading style={Style.tabHeading}>
                <Text style={Style.tabText}>Credit Limit</Text>
              </TabHeading>
            }
          ></Tab>
        ) : (
          []
        )}

        {searchFilters["type"] == "Retail_Distributor" ||
        searchFilters["type"] == "Wholesaler" ? (
          <Tab
            selected={false}
            underlineStyle={Style.tabUnderLine}
            heading={
              <TabHeading style={Style.tabHeading}>
                <Text style={Style.tabText}>Outstanding</Text>
              </TabHeading>
            }
          ></Tab>
        ) : (
          []
        )}
      </Tabs>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid: state.user.id,
  isASM: state.user.user_details.designation__c,
  psmList: state.user.psmList.concat([{ id: "", name: "All" }]),
  searchFilters: state.retailers.retailerSearchFilters,
  //retailerSearchFilters: state.retailers.retailerSearchFilters,
});

const mapDispatchToProps = (dispatch) => ({
  changeSearchFilters: (params) =>
    dispatch(RetailersActions.updateSearchFilters(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RetailerTab);
