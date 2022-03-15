import React from "react";
import {
  Platform,
  View,
  ActivityIndicator,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { liveInEurope } from "App/Stores/Example/Selectors";

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
  Badge,
} from "native-base";
import NavigationService from "App/Services/NavigationService";
import WhiteButton from "App/Components/WhiteButton";
import RetailersActions from "App/Stores/Retailers/Actions";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import BackArrowButton from "App/Components/BackArrowButton";
import VisitsActions from "App/Stores/Visits/Actions";
import ProductActions from "App/Stores/Products/Actions";

class StartVisitLayout extends React.Component {
  // componentDidMount() {
  //   const { token, executeVisitData } = this.props;
  //   this.props.({
  //     token,
  //     visit_id: executeVisitData.zx_visitsid,
  //   });
  // }

  scrollToIndex(index) {
    let distanceToBeScrolled = index * wp("23%");
    if (this.flatListRef) {
      this.flatListRef.scrollTo({
        x: distanceToBeScrolled,
        y: 0,
        animated: true,
      });
    }
  }

  render() {
    const {
      cart,
      children,
      partyType,
      retailerId,
      currentScreen,
      extractRetailerInfoData,
      executeVisitData,
      products,
    } = this.props;

    return (
      <SafeAreaView>
        <Header style={Styles.header}>
          <View style={{ paddingTop: hp("1%"), paddingBottom: hp("1%") }}>
            <BackArrowButton
              style={{ fontSize: 30, color: Colors.darkRedPink }}
              onPress={() => {
                NavigationService.navigate("VisitsScreen");
              }}
              show={true}
            />
          </View>
          <ScrollView
            horizontal={true}
            ref={(ref) => {
              this.flatListRef = ref;
            }}
          >
            <WhiteButton
              title={"Visit info"}
              style={{
                ...Styles.actionButton,
                ...Styles.customSelectedStyleCorpBlue,
              }}
              textStyle={Styles.actionButtonText}
              onPress={() => {
                NavigationService.navigate("StartVisitForm");
                this.scrollToIndex(0);
              }}
              selected={currentScreen == "StartVisitForm"}
              customSelectedStyle={Styles.selected}
              customSelectedTextStyle={Styles.customSelectedTextStyle}
            />

            {
              <WhiteButton
                title={"Book Order"}
                style={{
                  ...Styles.actionButton,
                  ...Styles.customSelectedStyleCorpBlue,
                }}
                textStyle={Styles.actionButtonText}
                onPress={() => {
                  executeVisitData.zx_accounttype == "Primary Distributor" ||
                  executeVisitData.zx_accounttype == "Distributor"
                    ? NavigationService.navigate("PlacePrimaryOrder")
                    : NavigationService.navigate("PlaceSecondaryOrder");
                  this.scrollToIndex(1);
                  this.props.clearSelectRetailer();
                  this.props.clearCart();
                  this.props.clearAddOrderLineData();
                  this.props.getAllProducts();
                }}
                selected={currentScreen == "PlacePrimaryOrder"}
                customSelectedStyle={Styles.selected}
                customSelectedTextStyle={Styles.customSelectedTextStyle}
              />
            }
            {
              <WhiteButton
                title={"Visit History"}
                style={{
                  ...Styles.actionButton,
                  ...Styles.customSelectedStyleCorpBlue,
                }}
                textStyle={Styles.actionButtonText}
                onPress={() => {
                  NavigationService.navigate("VisitHistory");
                  this.scrollToIndex(1);
                }}
                selected={currentScreen == "VisitHistory"}
                customSelectedStyle={Styles.selected}
                customSelectedTextStyle={Styles.customSelectedTextStyle}
              />
            }

            {
              //<WhiteButton
              // title={`Cart (${(cart && cart.items) ? (cart.items.length) : 0})`}
              //style={Styles.headerButton}
              //onPress={() => {NavigationService.navigate('VisitOrderCart'); this.scrollToIndex(2)}}
              //textStyle={Styles.headerButtonText}
              //selected={currentScreen == 'VisitOrderCart'}
              // >
              // <Badge style={Styles.countBadge}>
              //   <Text>{(this.props.cart && this.props.cart.items) ? (this.props.cart.items.length) : 0}</Text>
              // </Badge>
              // </WhiteButton>
            }
            {
              // partyType == 'Dealer' ?
              //  <WhiteButton
              //  title={'Outstanding'}
              // style={Styles.headerButton}
              //onPress={() => {NavigationService.navigate('VisitRetailerOutstanding'); extractRetailerInfoData({id: retailerId}); this.scrollToIndex(3)}}
              // textStyle={Styles.headerButtonText}
              //  selected={currentScreen == 'VisitRetailerOutstanding' || currentScreen == 'OutstandingPaymentInfo'}
              // /> : []
            }

            {
              //<WhiteButton
              //title={'Party info'}
              //style={Styles.headerButton}
              //onPress={() => {
              //partyType == 'Retailer' ? NavigationService.navigate('RetailerInfoScreen') : NavigationService.navigate('DealerInfoScreen');
              //extractRetailerInfoData({id: retailerId});
              //this.scrollToIndex(4)
              //}}
              //textStyle={Styles.headerButtonText}
              //selected={currentScreen == 'RetailerInfoScreen'}
              ///>
            }
          </ScrollView>
        </Header>
        {children}
      </SafeAreaView>
    );
  }
  z;
}

const mapStateToProps = (state) => ({
  isConnected: state.network.isConnected,
  isVisible: state.common.isNetworkBannerVisible,
  currentScreen: state.common.currentScreen,
  cart: state.visits.cart,
  retailerId: state.visits.executeVisitData.retailer_dealer__c,
  partyType: state.visits.executeVisitData.type__c,
  products: state.products.ProductList,
  visitInfoMapping: state.visits.visitInfoMapping[0],
  executeVisitData: state.visits.executeVisitData,
  token: state.user.token,
});

const mapDispatchToProps = (dispatch) => ({
  extractRetailerInfoData: (params) =>
    dispatch(RetailersActions.extractRetailerInfoData(params)),
  clearSelectRetailer: () => dispatch(RetailersActions.clearSelectRetailer()),
  clearAddOrderLineData: () =>
    dispatch(RetailersActions.clearAddOrderLineData()),
  getAllProducts: (params) => dispatch(ProductActions.getAllProducts(params)),
  clearCart: () => dispatch(VisitsActions.clearCart()),
  fetchVisitInfo: (params) => dispatch(VisitsActions.fetchVisitInfo(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StartVisitLayout);

const Styles = StyleSheet.create({
  header: {
    height: hp("13%"),
    alignItems: "flex-start",

    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  headerBody: {
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    textAlign: "center",
    alignSelf: "center",
    flex: 1,
    width: wp("100%"),
  },
  headerButton: {
    borderWidth: 1.5,
    paddingLeft: 0,
    paddingRight: 0,
    textAlign: "center",
    marginHorizontal: 4,
    minWidth: wp("26%"),
    backgroundColor: Colors.firozi,
    alignSelf: "center",
    height: hp("5.5%"),
    overflow: "visible",
  },
  headerButtonText: {
    fontSize: wp("3.6%"),
    fontFamily: ApplicationStyles.textMediumFont,
    textAlign: "center",
  },
  countBadge: {
    position: "absolute",
    backgroundColor: Colors.button,
    right: wp("1.5%"),
    top: hp("1.4%"),
    borderColor: Colors.user,
    borderWidth: 0.5,
  },

  actionButton: {
    overflow: "visible",
    paddingLeft: wp("5%"),
    paddingRight: wp("4%"),
    marginBottom: hp("1%"),
    marginTop: hp("1%"),
    marginRight: wp("2%"),
    marginLeft: wp("1%"),
    height: hp("5.0%"),
    elevation: 10,
    minWidth: wp("25%"),
    borderRadius: 10,
  },
  customSelectedTextStyle: {
    fontSize: wp("3.5%"),
    fontFamily: ApplicationStyles.textMsgFont,
    color: Colors.white,
  },
  selected: {
    borderWidth: 0,
    // borderColor: Colors.darkRedPink,
    backgroundColor: Colors.darkRedPink,
  },
  customSelectedStyleCorpBlue: {
    backgroundColor: Colors.lightPink,
    width: wp("28%"),
  },
  actionButtonText: {
    fontSize: wp("3.5%"),
    fontWeight: "700",
    fontFamily: ApplicationStyles.textMsgFont,
    color: Colors.darkRedPink,
  },
});
