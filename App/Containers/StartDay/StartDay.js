import React, { Component } from "react";
import { View, Alert, Image } from "react-native";
import { Button, Text } from "native-base";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Style from "./StartDayStyle";
import BlueButton from "../../Components/BlueButton";
import WhiteButton from "../../Components/WhiteButton";
import GenericIcon from "App/Components/GenericIcon";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import LayoutScreen from "../Layout/LayoutScreen";
import { START, ABSENT, GOOD, MORNING, LEAVE } from "../../Constants";
import NavigationService from "App/Services/NavigationService";
import { HelperService } from "App/Services/Utils/HelperService";
import UserActions from "App/Stores/User/Actions";

class StartDayScreen extends React.Component {
  goTo(screen) {
    NavigationService.navigate(screen);
  }

  render() {
    const { data } = this.props;
    

    return (
      <View style={data.zx_brandgroupcode == "1"?Style.box:Style.boxBlue}>
        <Image
          source={require("../../Assets/Images/back.png")}
          style={{ top: hp("4.6%"), width: wp("9.5%"), left: wp("5%") }}
        />

        <Text style={{ ...Style.header, left: wp("-7%") }}>
          {"Start your"}
          <Text style={{ ...Style.header, ...Style.textClr }}>{" Day"}</Text>
        </Text>

        <Text style={{ ...Style.dottedLine, ...Style.mb13 }}>
          {"-----------------------------------------------------------"}
        </Text>

        <Text style={{ ...Style.wish }}>
           Hi {data && data.zx_firstname ? data.zx_firstname : "NA"} !
        </Text>

        <Text style={{ ...Style.wish, ...Style.textClr }}>
          {"Welcome Back"}
        </Text>

        <Text style={{ ...Style.textClr, ...Style.line }} />

        <WhiteButton
          style={{ ...Style.buttons, ...Style.mt23 }}
          title={START}
          textStyle={{ ...Style.buttontextStyle, top: "12.5%" }}
          onPress={() => this.goTo("StartDaySelectionScreen")}
        />
        <WhiteButton
          style={Style.buttons}
          title={LEAVE}
          textStyle={{ ...Style.buttontextStyle, ...Style.textClr, top: "8%" }}
          onPress={() => this.goTo("AbsentScreen")}
        />
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  data: state.user.user_details,
});

const mapDispatchToProps = (dispatch) => ({


});

export default connect(mapStateToProps, mapDispatchToProps)(StartDayScreen);
