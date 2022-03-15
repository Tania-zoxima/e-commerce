import React, { Component } from "react";
import { View, Alert } from "react-native";
import { Button, Text } from "native-base";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Style from "../../StartDay/StartDayStyle";
import BlueButton from "../../../Components/BlueButton";
import WhiteButton from "../../../Components/WhiteButton";

import NavigationService from "App/Services/NavigationService";
import { HelperService } from "App/Services/Utils/HelperService";
import UserActions from "App/Stores/User/Actions";
import Wave from "../../../Components/WaveCurls/Wave";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { watchPosition } from "react-native-geolocation-service";
import RetailersActions from "App/Stores/Retailers/Actions";
import DistributorActions from "App/Stores/Distributor/Actions";
import BackArrowButton from "App/Components/BackArrowButton";
class KycScreen extends React.Component {
  goTo(screen) {
    NavigationService.navigate(screen, { show: false });
  }

  render() {
    const { code } = this.props;
    return (
      <View style={code.zx_brandgroupcode == "1" ? Style.box1 : Style.boxBlue1}>
        <BackArrowButton
          style={{
            color: "white",
            fontSize: 32,
            paddingRight: 330,
            paddingTop: 0,
          }}
        />
        {/* <Wave customStyles={Style.svgCurve} /> */}
        <View style={Style.waveBox}>
          <Text
            style={{
              ...Style.header,
              ...Style.titleText,
              marginTop: "3%",
              marginRight: "17%",
            }}
          >
            {"Select Partner Type"}
          </Text>
          <WhiteButton
            style={{ ...Style.buttons1 }}
            textStyle={{ ...Style.buttontextStyle, ...Style.textClr }}
            title={"Retailer"}
            onPress={() => {
              NavigationService.navigate("RetailerTabScreen", {
                id: "Retailer",
              });
              this.props.clearForm();
              this.props.clearTerritory();
            }}
          />
          <WhiteButton
            style={Style.buttons1}
            textStyle={{ ...Style.buttontextStyle, ...Style.textClr }}
            title={"Wholesaler"}
            onPress={() => {
              NavigationService.navigate("RetailerTabScreen", {
                id: "Wholesaler",
              });
              this.props.clearForm();
              this.props.clearTerritory();
            }}
          />
          <WhiteButton
            style={Style.buttons1}
            textStyle={{ ...Style.buttontextStyle, ...Style.textClr }}
            title={"Plumber"}
            onPress={() => {
              NavigationService.navigate("RetailerTabScreen", {
                id: "Plumber",
              });
              this.props.clearForm();
              this.props.clearTerritory();
            }}
          />
          <WhiteButton
            style={Style.buttons1}
            textStyle={{ ...Style.buttontextStyle, ...Style.textClr }}
            title={"Architect"}
            onPress={() => {
              NavigationService.navigate("RetailerTabScreen", {
                id: "Architect",
              });
              this.props.clearForm();
              this.props.clearTerritory();
            }}
          />
          <WhiteButton
            style={Style.buttons1}
            textStyle={{ ...Style.buttontextStyle, ...Style.textClr }}
            title={"Builder"}
            onPress={() => {
              NavigationService.navigate("RetailerTabScreen", {
                id: "Builder",
              });
              this.props.clearForm();
              this.props.clearTerritory();
            }}
          />
          <WhiteButton
            style={Style.buttons1}
            textStyle={{ ...Style.buttontextStyle, ...Style.textClr }}
            title={"Consultant "}
            onPress={() => {
              NavigationService.navigate("RetailerTabScreen", {
                id: "Consultant",
              });
              this.props.clearForm();
              this.props.clearTerritory();
            }}
          />
          <WhiteButton
            style={Style.buttons1}
            textStyle={{ ...Style.buttontextStyle, ...Style.textClr }}
            title={"Contractor"}
            onPress={() => {
              NavigationService.navigate("RetailerTabScreen", {
                id: "Contractor",
              });
              this.props.clearForm();
              this.props.clearTerritory();
            }}
          />
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  code: state.user.user_details,
});

const mapDispatchToProps = (dispatch) => ({
  clearSelectRetailer: () => dispatch(RetailersActions.clearSelectRetailer()),
  clearForm: () => dispatch(RetailersActions.clearForm()),
  clearTerritory: (params) =>
    dispatch(DistributorActions.clearTerritory(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(KycScreen);
