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
  TouchableOpacity,
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
import GenericIcon from "App/Components/GenericIcon";

class OrderLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedButton: "tag" };
  }
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
      products,
    } = this.props;

    return (
      <SafeAreaView>
        <View style={{ paddingTop: hp("1%"), paddingBottom: hp("1%") }}>
          <BackArrowButton
            style={{ fontSize: 30, color: Colors.darkRedPink }}
            onPress={() => {
              NavigationService.navigate("PlacePrimaryOrder");
            }}
            show={true}
          />
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={{ margin: "2%" }}
          ref={(ref) => {
            this.flatListRef = ref;
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.2)",
                alignItems: "center",
                justifyContent: "center",
                width: 70,
                height: 70,
                backgroundColor: "#F7893A",
                borderRadius: 50,
                margin: wp("3%"),
              }}
              onPress={() => {
                NavigationService.navigate("VariableDiscount");
                this.setState({ selectedButton: "tag" });
              }}
            >
              {/* onPress={() => {NavigationService.navigate('StartVisitForm'); this.scrollToIndex(0)}} */}
              <GenericIcon
                name={"local-offer"}
                style={{ fontSize: 30, color: "white" }}
              />
            </TouchableOpacity>
            <View style={{ width: wp("20%") }}>
              <Text
                style={{
                  color: this.state.selectedButton === "tag" ? "red" : "black",
                  textAlign: "center",
                }}
              >
                Variable Discount
              </Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.2)",
                alignItems: "center",
                justifyContent: "center",
                width: 70,
                height: 70,
                backgroundColor: "#4CABCE",
                borderRadius: 50,
                margin: wp("3%"),
              }}
              onPress={() => {
                NavigationService.navigate("ItemDetail");
                this.setState({ selectedButton: "receipt" });
              }}
            >
              <GenericIcon
                name={"receipt"}
                style={{ fontSize: 30, color: "white" }}
              />
            </TouchableOpacity>
            <View style={{ width: wp("20%") }}>
              <Text
                style={{
                  color:
                    this.state.selectedButton === "receipt" ? "red" : "black",
                  textAlign: "center",
                }}
              >
                Item Detail
              </Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.2)",
                alignItems: "center",
                justifyContent: "center",
                width: 70,
                height: 70,
                backgroundColor: "#49D17C",
                borderRadius: 50,
                margin: wp("3%"),
              }}
              onPress={() => {
                NavigationService.navigate("Shipping");
                this.setState({ selectedButton: "train" });
              }}
            >
              <GenericIcon
                name={"train"}
                style={{ fontSize: 30, color: "white" }}
              />
            </TouchableOpacity>
            <View style={{ width: wp("20%") }}>
              <Text
                style={{
                  color:
                    this.state.selectedButton === "train" ? "red" : "black",
                  textAlign: "center",
                }}
              >
                Shipping Detail
              </Text>
            </View>
          </View>
          {/* <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.2)",
                alignItems: "center",
                justifyContent: "center",
                width: 70,
                height: 70,
                backgroundColor: "#735FDA",
                borderRadius: 50,
                margin: wp("3%"),
              }}
              onPress={() => {
                NavigationService.navigate("TransportDetail");
                this.setState({ selectedButton: "ship" });
              }}
            >
              <GenericIcon
                name={"local-shipping"}
                style={{ fontSize: 30, color: "white" }}
              />
            </TouchableOpacity>
            <View style={{ width: wp("20%") }}>
              <Text
                style={{
                  color: this.state.selectedButton === "ship" ? "red" : "black",
                  textAlign: "center",
                }}
              >
                Transport Detail
              </Text>
            </View>
          </View> */}
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.2)",
                alignItems: "center",
                justifyContent: "center",
                width: 70,
                height: 70,
                backgroundColor: "#EC2F4B",
                borderRadius: 50,
                margin: wp("3%"),
              }}
              onPress={() => {
                NavigationService.navigate("OrderDetail");
                this.setState({ selectedButton: "cart" });
              }}
            >
              <GenericIcon
                name={"shopping-cart"}
                style={{ fontSize: 30, color: "white" }}
              />
            </TouchableOpacity>
            <View style={{ width: wp("20%") }}>
              <Text
                style={{
                  color: this.state.selectedButton === "cart" ? "red" : "black",
                  textAlign: "center",
                }}
              >
                Order Detail
              </Text>
            </View>
          </View>
          {/* <WhiteButton 
                        title={'Visit'} 
                        style={{borderWidth: 1,
                            borderColor: "rgba(0,0,0,0.2)",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 70,
                            height: 70,
                            backgroundColor: "#EC2F4B",
                            borderRadius: 50,
                            margin: wp('3%'),}}
                        // style={{...Styles.actionButton, ...Styles.customSelectedStyleCorpBlue}}
                        textStyle={Styles.actionButtonText}
                        onPress={() => {NavigationService.navigate('StartVisitForm'); this.scrollToIndex(0)}}  
                        // selected={currentScreen == 'StartVisitForm'}
                        customSelectedStyle={Styles.selected}
                        customSelectedTextStyle={Styles.customSelectedTextStyle}
                      /> */}
          {
            // <WhiteButton
            //   title={'Survey'}
            //  style={{...Styles.actionButton, ...Styles.customSelectedStyleCorpBlue}}
            //  textStyle={Styles.actionButtonText}
            //  onPress={() => {NavigationService.navigate('VisitBookOrder'); this.scrollToIndex(1)}}
            //   selected={currentScreen == 'VisitBookOrder'}
            //  customSelectedStyle={{...Styles.customSelectedStyleCorpBlue, ...Styles.selected}}
            //  customSelectedTextStyle={Styles.customSelectedTextStyle}
            // />
          }
          {
            // <WhiteButton
            //   title={"Book Order"}
            //   style={{
            //     ...Styles.actionButton,
            //     ...Styles.customSelectedStyleCorpBlue,
            //   }}
            //   textStyle={Styles.actionButtonText}
            //   onPress={() => {
            //     NavigationService.navigate("VisitBookOrderHeader");
            //     this.scrollToIndex(1);
            //     this.props.clearSelectRetailer();
            //     this.props.clearCart();
            //     this.props.clearAddOrderLineData();
            //     this.props.getAllProducts();
            //   }}
            //   selected={currentScreen == "VisitBookOrderHeader"}
            //   customSelectedStyle={Styles.selected}
            //   customSelectedTextStyle={Styles.customSelectedTextStyle}
            // />
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
});

const mapDispatchToProps = (dispatch) => ({
  extractRetailerInfoData: (params) =>
    dispatch(RetailersActions.extractRetailerInfoData(params)),
  clearSelectRetailer: () => dispatch(RetailersActions.clearSelectRetailer()),
  clearAddOrderLineData: () =>
    dispatch(RetailersActions.clearAddOrderLineData()),
  getAllProducts: (params) => dispatch(ProductActions.getAllProducts(params)),
  clearCart: () => dispatch(VisitsActions.clearCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderLayout);

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
    borderRadius: 100,
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
    color: Colors.white,
    // top:hp("15%")
  },
});
