import React, { Component } from "react";
import { View, Alert } from "react-native";
import { Button, Text } from "native-base";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Style from "./StartDayStyle";
import BlueButton from "../../Components/BlueButton";
import WhiteButton from "../../Components/WhiteButton";
import LayoutScreen from "../Layout/LayoutScreen";
import { START, ABSENT, GOOD, MORNING, LEAVE } from "../../Constants";
import NavigationService from "App/Services/NavigationService";
import { HelperService } from "App/Services/Utils/HelperService";
import UserActions from "App/Stores/User/Actions";
import Wave from "../../Components/WaveCurls/Wave";
import { heightPercentageToDP } from "react-native-responsive-screen";

class StartDaySelectionScreen extends React.Component {
  goTo(screen) {
    NavigationService.navigate(screen);
  }

  render() {
    const { code } = this.props;
    return (
      <View style={code.zx_brandgroupcode == "1" ? Style.box1 : Style.boxBlue1}>
        {/* <Wave customStyles={Style.svgCurve} /> */}
        <View style={Style.waveBox}>
          <Text
            style={{ ...Style.header, ...Style.titleText, marginTop: "15%" }}
          >
            {"You will be marked present"}
            <Text
              style={{ ...Style.header, ...Style.textClr, ...Style.titleText }}
            >
              {" for today"}
            </Text>
          </Text>
          <WhiteButton
            style={{ ...Style.buttons1 }}
            textStyle={{ ...Style.buttontextStyle, ...Style.textClr }}
            title={"MARKET VISIT"}
            onPress={() => this.goTo("PresentScreen")}
          />
          <WhiteButton
            style={Style.buttons1}
            textStyle={{ ...Style.buttontextStyle, ...Style.textClr }}
            title={"IN OFFICE"}
            onPress={() => this.goTo("InOfficeScreen")}
          />
          <WhiteButton
            style={Style.buttons1}
            textStyle={{ ...Style.buttontextStyle, ...Style.textClr }}
            title={"WORK FROM HOME"}
            onPress={() => this.goTo("WorkFromHomeScreen")}
          />
          <WhiteButton
            style={Style.buttons1}
            textStyle={{ ...Style.buttontextStyle, ...Style.textClr }}
            title={"IN DEPOT"}
            onPress={() => this.goTo("InDepotScreen")}
          />
          {code.zx_designationname == "DSR" ? (
            []
          ) : (
            <WhiteButton
              style={Style.buttons1}
              textStyle={{ ...Style.buttontextStyle, ...Style.textClr }}
              title={"IN FACTORY"}
              onPress={() => this.goTo("InFactoryScreen")}
            />
          )}
          {code.zx_designationname == "DSR" ? (
            []
          ) : (
            <WhiteButton
              style={Style.buttons1}
              textStyle={{ ...Style.buttontextStyle, ...Style.textClr }}
              title={"TRAVEL"}
              onPress={() => this.goTo("TravelScreen")}
            />
          )}
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  code: state.user.user_details,
});

const mapDispatchToProps = (dispatch) => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartDaySelectionScreen);
