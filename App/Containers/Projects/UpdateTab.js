import { Container, Content, Text, Tabs, Tab } from "native-base";
import { ApplicationStyles, Helpers, Images, Metrics, Colors } from "App/Theme";
import React, { Component } from "react";
import UpdateProject from "./UpdateProject";
import { connect } from "react-redux";
import { Card } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import BackArrowButton from "App/Components/BackArrowButton";
import ProjectOpportunity from "./ProjectOpportunity";
import ProductSold from "./ProductSold";
import ProductOffer from "./ProductOffer";
import ProjectActions from "App/Stores/Project/Actions";

export class UpdateTab extends Component {
  constructor() {
    super();
    this.state = {
      tabPage: 0,
    };
  }
  componentWillUnmount() {
    this.props.clearProjectApi();
  }
  onChangeTab = (changeTabProps) => {
    const newTabIndex = changeTabProps.i;
    this.setState({ tabPage: newTabIndex });
  };
  render() {
    const { code } = this.props;
    return (
      <View>
        <Card
          style={code.zx_brandgroupcode == "1" ? Styles.card : Styles.cardBlue}
        >
          <View>
            <BackArrowButton style={Styles.backarrow} />
          </View>
          <Text style={{ ...Styles.titleText, marginLeft: wp("22%") }}>
            {"Projects"}
            {/* <Text style={{ ...Styles.titleText, ...Styles.textClr }}>
              {" Retailer"}
            </Text> */}
          </Text>
        </Card>
        <View style={{ top: hp("1%"), height: hp("100%") }}>
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
              heading="Opportunity"
              textStyle={{ color: "#9A9A9A", fontSize: 15 }}
              tabStyle={{ backgroundColor: Colors.white }}
              activeTextStyle={{ color: Colors.black, fontSize: 15 }}
              activeTabStyle={{ backgroundColor: Colors.white }}
            >
              <ProjectOpportunity />
            </Tab>
            <Tab
              heading="Products Offered"
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
              <ProductOffer />
            </Tab>
            <Tab
              heading="Products Sold"
              textStyle={{ color: "#9A9A9A", fontSize: 15 }}
              tabStyle={{ backgroundColor: Colors.white }}
              activeTextStyle={{ color: Colors.black, fontSize: 15 }}
              activeTabStyle={{ backgroundColor: Colors.white }}
            >
              <ProductSold />
            </Tab>
          </Tabs>
        </View>
      </View>
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

const mapDispatchToProps = (dispatch) => ({
  clearProjectApi: (params) => dispatch(ProjectActions.clearProjectApi(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(UpdateTab);

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
