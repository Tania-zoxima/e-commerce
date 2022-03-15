import React, { Component } from "react";
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
  TouchableHighlight,
} from "react-native";
import GenericIcon from "App/Components/GenericIcon";

import { ScrollableTab, TabHeading, Tab, Tabs } from "native-base";
import { ApplicationStyles, Helpers, Images, Metrics, Colors } from "App/Theme";
// import Card from '../../Components/Card/Card';
import Styles from "./GetSecondaryOrderStyles";
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

import { connect } from "react-redux";
import DistributorActions from "App/Stores/Distributor/Actions";
import Open from "./Open";
// import PendingForApproval from "./PendingForApproval";
// import Released from "./Released";
// import Cancelled from "./Cancelled";
import OrdersActions from "App/Stores/Orders/Actions";
import ProductActions from "App/Stores/Products/Actions";
import Pending from "./Pending";
import Released from "./Released";
import Cancelled from "./Cancelled";
import Pship from "./Pship";
import Shipped from "./Shipped";
class GetSecondaryOrder extends Component {
  componentDidMount() {
    this.fetchCall();
  }
  fetchCall() {
    const { token, distributor, id, primaryOrderForm } = this.props;
    let params = {
      token,
      order_id:id,
      offset: 0,
      limit: 50,
      show: true,
    };
    this.props.fetchSecondaryOrders(params);
  }
  render() {
    const { changeOrderSearchFilters, searchFilters, code } = this.props;
    return (
      <View style={Styles.mainContainer}>
        <Card
          style={code.zx_brandgroupcode == "1" ? Styles.card : Styles.cardBlue}
        >
          <BackArrowButton style={Styles.backarrow} />
          {code.zx_saletype == "Retail" ? (
            <View style={{ top: hp("2%") }}>
              <WhiteButton
                style={Styles.buttons}
                onPress={() => {
                  NavigationService.navigate("PlaceSecondaryOrder");
                  this.props.clearProduct();
                }}
                title={"NEW ORDER"}
                textStyle={Styles.buttontext}
              />
            </View>
          ) : (
            <View style={{ top: hp("2%") }}>
              <TouchableOpacity
                style={{
                  left: wp("2.5%"),
                  borderRadius: 6,
                  height: hp("5%"),
                  top: hp("3%"),
                  // bottom: hp("-2%"),
                  width: wp("30%"),
                  alignSelf: "flex-end",
                  top: hp("-2%"),
                  zIndex: 10000,
                }}
              >
                <Text></Text>
              </TouchableOpacity>
            </View>
          )}
          <Text style={{ ...Styles.titleText }}>
            {"Secondary "}
            <Text style={{ ...Styles.titleText, ...Styles.textClr }}>
              {" Orders"}
            </Text>
          </Text>

          <SearchBar
            placeholder={"Search By Order no."}
            onInputChange={(text) =>
              changeOrderSearchFilters({
                edited_field: "name",
                edited_value: text,
              })
            }
            onInputSubmit={(text) =>
              changeOrderSearchFilters({
                edited_field: "name",
                edited_value: text,
              })
            }
            onInputClear={(text) =>
              changeOrderSearchFilters({
                edited_field: "name",
                edited_value: "",
              })
            }
            value={searchFilters["searchValue"]}
            ContainerStyles={Styles.searchContainer}
          />
        </Card>
        <View style={Styles.container}>
          {/* <TouchableHighlight
          style={Styles.plusIcon}
          onPress={() => {NavigationService.navigate("NewDealerScreen",{show:false});this.props.clearDistributorForm()}}
        >
          <GenericIcon
            name={"add"}
            style={{ color: Colors.white, fontSize: 45, alignSelf: "center" }}
          />
        </TouchableHighlight> */}
        </View>
        <View>
          <Tabs
            renderTabBar={() => (
              <ScrollableTab tabStyle={{ backgroundColor: "white" }} />
            )}
            tabBarUnderlineStyle={
              code.zx_brandgroupcode == "1"
                ? { backgroundColor: Colors.darkRedPink }
                : { backgroundColor: Colors.bluebackground }
            }
            style={{ marginTop: hp("2.6%") }}
          >
            <Tab
              heading="New"
              textStyle={{ color: "#9A9A9A", fontSize: 15 }}
              tabStyle={{ backgroundColor: Colors.white }}
              activeTextStyle={{ color: Colors.black, fontSize: 15 }}
              activeTabStyle={{ backgroundColor: Colors.white }}
            >
              <Open />
            </Tab>
            <Tab
              heading="Pending for approval"
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
              <Pending/>
            </Tab>
            <Tab
              heading="Released"
              textStyle={{ color: "#9A9A9A", fontSize: 15 }}
              tabStyle={{ backgroundColor: Colors.white }}
              activeTextStyle={{ color: Colors.black, fontSize: 15 }}
              activeTabStyle={{ backgroundColor: Colors.white }}
            >
            <Released/>
            </Tab>
            <Tab
              heading="Cancelled"
              textStyle={{ color: "#9A9A9A", fontSize: 15 }}
              tabStyle={{ backgroundColor: Colors.white }}
              activeTextStyle={{ color: Colors.black, fontSize: 15 }}
              activeTabStyle={{ backgroundColor: Colors.white }}
            >
            <Cancelled/>
            </Tab>
            <Tab
              heading="Partially Shipped"
              textStyle={{ color: "#9A9A9A", fontSize: 15 }}
              tabStyle={{ backgroundColor: Colors.white }}
              activeTextStyle={{ color: Colors.black, fontSize: 15 }}
              activeTabStyle={{ backgroundColor: Colors.white }}
            >
            <Pship/>
            </Tab>
            <Tab
              heading="Shipped"
              textStyle={{ color: "#9A9A9A", fontSize: 15 }}
              tabStyle={{ backgroundColor: Colors.white }}
              activeTextStyle={{ color: Colors.black, fontSize: 15 }}
              activeTabStyle={{ backgroundColor: Colors.white }}
            >
            <Shipped/>
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
    distributor: state.distributor.DistributorList,
    searchFilters: state.orders.orderSearchFilters,
    code: state.user.user_details,
  };
};

const mapDispatchToProps = (dispatch) => ({
  // getDistributor: (params) => dispatch(DistributorActions.getDistributor(params)),
  // selectDistributor: (params) => dispatch(DistributorActions.selectDistributor(params)),
  // clearDistributorForm: () => dispatch(DistributorActions.clearDistributorForm()),
  // changeDistributorSearchFilters: (params) =>
  //   dispatch(DistributorActions.changeDistributorSearchFilters(params)),
  changeOrderSearchFilters: (params) =>
    dispatch(OrdersActions.changeOrderSearchFilters(params)),
  clearSecondaryOrderForm: (params) =>
    dispatch(OrdersActions.clearSecondaryOrderForm(params)),
  clearProduct: (params) => dispatch(ProductActions.clearProduct(params)),
  fetchSecondaryOrders: (params) =>
    dispatch(OrdersActions.fetchSecondaryOrders(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GetSecondaryOrder);
