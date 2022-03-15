import { Container, Content, Text, Tabs, Tab } from "native-base";
import { ApplicationStyles, Helpers, Images, Metrics, Colors } from "App/Theme";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import BackArrowButton from "App/Components/BackArrowButton";
import Open from "./Open";
import Complete from "./Complete";
import Cancel from "./Cancel";

export class VisitSummaryTab extends Component {
  constructor() {
    super();
    this.state = {
      tabPage: 0,
    };
  }
  onChangeTab = (changeTabProps) => {
    const newTabIndex = changeTabProps.i;
    this.setState({ tabPage: newTabIndex });
  };
  render() {
    const { code } = this.props;
    return (
      <Container>
        <View
          style={{ backgroundColor: Colors.darkRedPink, flexDirection: "row" }}
        >
          <BackArrowButton
            style={{
              fontSize: 25,
              color: Colors.white,
            }}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 25,
              left: wp("20%"),
              color: "white",
            }}
          >
            Visit Summary
          </Text>
        </View>
        <Content style={{ top: hp("1%") }}>
          <Tabs
            page={this.state.tabPage}
            onChangeTab={this.onChangeTab}
            tabBarUnderlineStyle={
              code.zx_brandgroupcode == "1"
                ? { backgroundColor: Colors.darkRedPink }
                : { backgroundColor: Colors.bluebackground }
            }
          >
            <Tab
              heading="Open"
              textStyle={{ color: "#9A9A9A", fontSize: 15 }}
              tabStyle={{ backgroundColor: Colors.white }}
              activeTextStyle={{ color: Colors.black, fontSize: 15 }}
              activeTabStyle={{ backgroundColor: Colors.white }}
            >
              <Open />
            </Tab>
            <Tab
              heading="Completed"
              textStyle={{
                color: "#9A9A9A",
                fontSize: 15,
                textAlign: "center",
              }}
              tabStyle={{ backgroundColor: Colors.white }}
              activeTextStyle={{
                color: Colors.black,
                fontSize: 15,
                textAlign: "center",
              }}
              activeTabStyle={{ backgroundColor: Colors.white }}
            >
              <Complete />
            </Tab>
            <Tab
              heading="Cancelled"
              textStyle={{ color: "#9A9A9A", fontSize: 15 }}
              tabStyle={{ backgroundColor: Colors.white }}
              activeTextStyle={{ color: Colors.black, fontSize: 15 }}
              activeTabStyle={{ backgroundColor: Colors.white }}
            >
              <Cancel />
            </Tab>
          </Tabs>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    id: state.user.id,
    code: state.user.user_details,
  };
};

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(VisitSummaryTab);

const Styles = StyleSheet.create({
  textStyle: {
    fontFamily: "Segoe UI",
    color: Colors.black,
    top: hp("2.5%"),
    fontSize: 13,
    fontWeight: "bold",
  },
  card: {
    flexDirection: "column",
    paddingTop: 20,
    paddingBottom: 5,

    paddingLeft: 10,
    paddingRight: 10,
    elevation: 10,
    backgroundColor: Colors.background,
    height: hp("10%"),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "8%",
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
    width: wp("100%"),
    right: "0.5%",
    top: "0%",
  },
  cardBlue: {
    flexDirection: "column",
    paddingTop: 20,
    paddingBottom: 5,

    paddingLeft: 10,
    paddingRight: 10,
    elevation: 10,
    backgroundColor: Colors.bluebackground,
    height: hp("10%"),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "8%",
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
    width: wp("100%"),
    right: "0.5%",
    top: "0%",
  },
  titleText: {
    color: Colors.white,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 26,
    fontWeight: "bold",
    left: "12%",
    bottom: hp("3%"),
  },
  textClr: {
    color: Colors.headerClr,
  },
  backarrow: {
    marginRight: wp("90%"),
    fontSize: 25,
    color: Colors.white,
  },
});
