import React, { Component } from "react";
import { View, Text, Alert } from "react-native";
import { Card } from "native-base";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Style from "./EndDayScreenStyle";
import BlueButton from "../../Components/BlueButton";
import { END } from "../../Constants";
import NavigationService from "App/Services/NavigationService";
import LayoutScreen from "../Layout/LayoutScreen";
import UserActions from "App/Stores/User/Actions";
import { HelperService } from "App/Services/Utils/HelperService";
import Wave from "../../Components/WaveCurls/Wave";
import GenericIcon from "App/Components/GenericIcon";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors, Metrics, Helpers, Fonts } from "App/Theme";

class EndDayScreen extends Component {
  async submit() {
    this.props.userEndDayLoading(); // starts btn loading

    let location = await HelperService.requestLocation();
    if (location == "DENIED") {
      Alert.alert(
        "Location permission is required to proceed.",
        "Go App Permissions and Turn on Location Permission for Re-Konekt."
      );
      this.props.userEndDayLoadingStop(); // stops btn loading
      return;
    } else if (!location) {
      this.props.userEndDayLoadingStop();
      return;
    }

    this.props.endUserDay({
      date: HelperService.getCurrentTimestamp(),
      latitude: location.latitude,
      longitude: location.longitude,
      user: this.props.agentid,
      token: this.props.token,
    });
  }

  render() {
    const { code } = this.props;
    return (
      <View style={Style.container}>
        <GenericIcon
          name={"timer"}
          style={{
            left: wp("-40.4%"),
            top: hp("1.2%"),
            color: Colors.headerClr,
            fontSize: 20,
            fontWeight: "bold",
          }}
        />
        <Text
          style={
            code.zx_brandgroupcode == "1"
              ? { ...Style.title }
              : { ...Style.titleBlue }
          }
        >
          {"End your"}
          <Text style={{ ...Style.title, ...Style.textClr }}>{" Day"}</Text>
        </Text>
        <Wave customStyles={Style.svgCurve} color={code.zx_brandgroupcode == "1"?"#ed1b24":"#018EBC"}/>
        <View style={code.zx_brandgroupcode == "1"?Style.waveBox:Style.waveBoxBlue}>
          <View style={Style.buttonBox}>
            <View style={Style.clock}>
              <Text style={Style.time}>
                {HelperService.showElapsedTime(this.props.startDayTime)}
              </Text>
            </View>
          </View>
          <View>
            <BlueButton
              style={Style.buttons}
              textStyle={code.zx_brandgroupcode == "1"?Style.buttontextStyle:Style.buttontextStyleBlue}
              title={END}
              disabled={!!this.props.userEndDayLoader}
              loading={!!this.props.userEndDayLoader}
              onPress={() => this.submit()}
            />
          </View>
        </View>
      </View>
    );
  }
}

EndDayScreen.propTypes = {
  area: PropTypes.string,
  validation: PropTypes.object,
  userStartDayLoader: PropTypes.bool,
  agentAreas: PropTypes.array,
  token: PropTypes.string,
  agentid: PropTypes.string,
};

const mapStateToProps = (state) => ({
  area: state.user.area,
  userEndDayLoader: state.user.userEndDayLoading,
  token: state.user.token,
  agentid: state.user.id,
  startDayTime: state.user.startDayTime,
  sfid: state.user.id,
  code: state.user.user_details,
});

const mapDispatchToProps = (dispatch) => ({
  endUserDay: (params) => dispatch(UserActions.endUserDay(params)),
  userEndDayLoading: () => dispatch(UserActions.userEndDayLoading()),
  updateUserLocation: (location) =>
    dispatch(UserActions.updateUserLocation(location)),
  userEndDayLoadingStop: () => dispatch(UserActions.userEndDayLoadingStop()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EndDayScreen);
