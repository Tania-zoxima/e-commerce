import React, { Component } from "react";
import { View, Alert, Image } from "react-native";
import { Button, Text } from "native-base";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Style from "./PresentScreenStyle";
import BlueButton from "../../Components/BlueButton";
import WhiteButton from "../../Components/WhiteButton";
import LayoutScreen from "../Layout/LayoutScreen";
import { START, ABSENT, GOOD, MORNING, LEAVE } from "../../Constants";
import NavigationService from "App/Services/NavigationService";
import { HelperService } from "App/Services/Utils/HelperService";
import UserActions from "App/Stores/User/Actions";
import Wave from "../../Components/WaveCurls/Wave";
import ImagePicker from "react-native-image-picker";
import ImageUploader from "./ImageUploader";

export default class TravelModeScreen extends React.Component {
  goTo(screen) {
    NavigationService.navigate(screen);
  }

  render() {
    return (
      <View style={Style.box1}>
        <Wave customStyles={Style.svgCurve} />
        <View style={Style.waveBox}>
          <Text style={{ ...Style.header }}>
            {"How are you"}
            <Text style={{ ...Style.header, ...Style.textClr }}>
              {" travelling ?"}
            </Text>
          </Text>

          <View style={{ ...Style.action }}>
            <WhiteButton
              style={{ ...Style.button }}
              textStyle={Style.buttontextStyle}
              title={"Two wheeler"}
              onPress={() => this.goTo("PresentScreen")}
            />
            <WhiteButton
              style={Style.button}
              textStyle={{ ...Style.buttontextStyle, ...Style.textClr }}
              title={"Four wheeler"}
              onPress={() => this.goTo("PresentScreen")}
            />
            <WhiteButton
              style={Style.button}
              textStyle={{ ...Style.buttontextStyle, ...Style.textClr }}
              title={"Public transport"}
              onPress={() => this.goTo("PresentScreen")}
            />
          </View>
        </View>

        <Text style={Style.imageText}>Click photo</Text>
        <ImageUploader />
      </View>
    );
  }
}
