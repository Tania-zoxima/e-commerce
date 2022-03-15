import React, { Component, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import BackArrowButton from "App/Components/BackArrowButton";
import { ApplicationStyles, Colors } from "App/Theme";
import { Card } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Tab, Tabs, Icon, ScrollableTab } from "native-base";
import NavigationService from "App/Services/NavigationService";
import OrderHeader from "./OrderHeader";
import OrderLine from "./OrderLine";

class OrderTab extends Component {
  render() {
    const { data } = this.props.navigation.state.params;
    // console.log("Ammmmmmmm", data)

    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingTop: hp("0%"),
        }}
      >
        <BackArrowButton
          style={{
            color: "black",
            fontSize: 25,
            marginRight: wp("90%"),
            marginTop: hp("5%"),
          }}
        />

        <View>
          <Tabs
            // renderTabBar={() => (
            //     <ScrollableTab tabStyle={{ backgroundColor: "white" }} />
            //   )}
            tabBarUnderlineStyle={{
              width: wp("32%"),
              marginLeft: wp("7.5%"),
              marginBottom: hp(".5%"),
              backgroundColor: Colors.darkRedPink,
            }}
            style={{ width: wp("95%"), marginTop: hp("-0%") }}
          >
            <Tab
              heading="Info "
              textStyle={{ color: "#9A9A9A", fontSize: 15 }}
              tabStyle={{ backgroundColor: Colors.white, flex: 1 }}
              activeTextStyle={{ color: Colors.black, fontSize: 15 }}
              activeTabStyle={{ backgroundColor: Colors.white }}
            >
              <OrderHeader detail={data} />
            </Tab>
            <Tab
              heading="Order Lines"
              textStyle={{ color: "#9A9A9A", fontSize: 15 }}
              tabStyle={{ backgroundColor: Colors.white, flex: 1 }}
              activeTextStyle={{ color: Colors.black, fontSize: 15 }}
              activeTabStyle={{ backgroundColor: Colors.white }}
            >
              <OrderLine detail={data} />
            </Tab>
          </Tabs>
        </View>
      </View>
    );
  }
}

export default OrderTab;
