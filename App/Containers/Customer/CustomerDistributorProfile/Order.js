import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import BackArrowButton from "App/Components/BackArrowButton";
import { ApplicationStyles, Colors } from "App/Theme";
import { Card } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { HelperService } from "App/Services/Utils/HelperService";
import GenericIcon from "App/Components/GenericIcon";

import DetailCard from "../../../Components/DetailCard/DetailCard";
import DetailCardStrip from "../../../Components/DetailCard/DetailCardStrip";
// import BlueButton from "../../Components/BlueButton";
import DatePicker from "App/Components/DatePicker";
import SearchBar from "App/Components/SearchBar";

import { Icon, Header, Tab, Tabs, ScrollableTab } from "native-base";
import OrderOpen from "../Order/OrderOpen";
import OrderReleased from "../Order/OrderReleased";
import OrderCancel from "../Order/OrderCancel";
import OrderPending from "../Order/OrderPending";
import OrderPship from "../Order/OrderPship";
import OrderShip from "../Order/OrderShip";
import NavigationService from "App/Services/NavigationService";

export default function Order(props) {
  let id = props.item.id;

  return (
    <ScrollView style={{ top: hp("-5%") }}>
      <Tabs
        tabBarUnderlineStyle={{ color: "white", marginBottom: hp("0.5%") }}
        style={{ width: wp("90%"), alignSelf: "center" }}
        renderTabBar={() => (
          <ScrollableTab tabStyle={{ backgroundColor: "white" }} />
        )}
      >
        <Tab
          heading="Open "
          textStyle={{ color: "#fff", fontSize: 15 }}
          tabStyle={{ backgroundColor: Colors.tabBlue }}
          activeTextStyle={{ color: "#fff", fontSize: 15 }}
          activeTabStyle={{ backgroundColor: Colors.tabBlue }}
        >
          <OrderOpen item={id} />
        </Tab>
        <Tab
          heading="Released"
          textStyle={{ color: "#fff", fontSize: 15 }}
          tabStyle={{ backgroundColor: Colors.tabBlue }}
          activeTextStyle={{ color: "#fff", fontSize: 15 }}
          activeTabStyle={{ backgroundColor: Colors.tabBlue }}
        >
          <OrderReleased item={id} />
        </Tab>
        <Tab
          heading="Pending for Approval"
          textStyle={{ color: "#fff", fontSize: 15 }}
          tabStyle={{ backgroundColor: Colors.tabBlue }}
          activeTextStyle={{ color: "#fff", fontSize: 15 }}
          activeTabStyle={{ backgroundColor: Colors.tabBlue }}
        >
          <OrderPending item={id}/>
        </Tab>
        <Tab
          heading="Cancelled"
          textStyle={{ color: "#fff", fontSize: 15 }}
          tabStyle={{ backgroundColor: Colors.tabBlue }}
          activeTextStyle={{ color: "#fff", fontSize: 15 }}
          activeTabStyle={{ backgroundColor: Colors.tabBlue }}
        >
          <OrderCancel item={id} />
        </Tab>
        <Tab
          heading="Partially Shipped"
          textStyle={{ color: "#fff", fontSize: 15 }}
          tabStyle={{ backgroundColor: Colors.tabBlue }}
          activeTextStyle={{ color: "#fff", fontSize: 15 }}
          activeTabStyle={{ backgroundColor: Colors.tabBlue }}
        >
          <OrderPship item={id} />
        </Tab>
        <Tab
          heading="Shipped"
          textStyle={{ color: "#fff", fontSize: 15 }}
          tabStyle={{ backgroundColor: Colors.tabBlue }}
          activeTextStyle={{ color: "#fff", fontSize: 15 }}
          activeTabStyle={{ backgroundColor: Colors.tabBlue }}
        >
          <OrderShip item={id} />
        </Tab>
      </Tabs>
    </ScrollView>
  );
}
const Styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: hp("1.5%"),
    display: "flex",
    flexDirection: "row",
  },
  cardstyle: {
    backgroundColor: Colors.darkRedPink,
    width: wp("100%"),
    top: hp("-1%"),
    height: hp("15%"),
    borderBottomLeftRadius: 55,
    borderBottomRightRadius: 55,
  },
  backarrow: {
    color: Colors.background,
    fontSize: 34,
    paddingRight: 360,
    paddingTop: 15,
  },
  title: {
    fontFamily: "Rubik",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    bottom: hp("1%"),
  },
  titleText: {
    color: Colors.black,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 28,
    fontWeight: "bold",
  },

  date: {
    fontSize: 38,
    fontFamily: "Rubik",
    color: Colors.background,
    left: hp("3%"),
    top: hp("0.5%"),
    fontWeight: "bold",
  },
  month: {
    fontSize: 19,
    fontFamily: "Rubik",
    color: Colors.background,
    left: hp("1%"),
    fontWeight: "bold",
    top: hp("-1%"),
  },
  head: {
    fontSize: 19,
    fontFamily: "Rubik",
    left: hp("0%"),
    fontWeight: "bold",
    color: Colors.background,
  },
  head1: {
    fontSize: 14,
    fontFamily: "Rubik",
    left: hp("-0.4%"),
    fontWeight: "bold",
    top: hp("0%"),
  },

  ttl: {
    color: Colors.lightGrey,
    fontSize: wp("3.6%"),
    fontFamily: "Rubik",
    fontWeight: "bold",
    bottom: hp("1%"),
    top: hp("4%"),
    left: wp("-3%"),
  },
  detail: {
    color: Colors.black,
    fontSize: wp("3.6%"),
    fontFamily: "Rubik",
    fontWeight: "bold",
    bottom: hp("1%"),
    left: wp("6%"),
    top: hp("4%"),
  },
  searchContainer: {
    width: wp("50%"),
    borderRadius: 10,
    paddingHorizontal: 3,
    paddingTop: 0,
    elevation: 10,
    backgroundColor: Colors.lightPink,
    fontSize: wp("4.8%"),
    fontWeight: "700",
    color: Colors.blue,
    height: hp("5%"),
    alignSelf: "center",
  },
});
