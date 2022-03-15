import React from "react";
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Style from "./DisplayCardStyles";
import GenericIcon from "App/Components/GenericIcon";
import { ApplicationStyles, Helpers, Images, Metrics, Colors } from "App/Theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import BlueButton from "App/Components/BlueButton";

const DisplayCard = ({
  content,
  heading,
  dark,
  style,
  callIcon,
  locationIcon,
  onPress,
  icon,
  Styletitle,
  icon1,
  iconStyle,
  heading1,
  headingStyle,
  onPresslocation,
  onPressicon,
  status,
  onPressstatus,
  iconstyle,
  Stylestatus,
}) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View
      style={
        dark ? { ...Style.darkCard, ...style } : { ...Style.card, ...style }
      }
    >
      <View style={{ display: "flex", flexDirection: "row" }}>
        {heading ? (
          <View>
            <Text style={dark ? Style.darkTitle : Styletitle}>{heading}</Text>
          </View>
        ) : (
          []
        )}
        <TouchableOpacity onPress={onPressstatus}>
          {status ? (
            <Text style={dark ? Style.darkTitle : Stylestatus}>{status}</Text>
          ) : (
            []
          )}
        </TouchableOpacity>
      </View>
      {heading1 ? (
        <View>
          <Text style={dark ? Style.darkTitle : headingStyle}>{heading1}</Text>
        </View>
      ) : (
        []
      )}

      <TouchableOpacity onPress={onPressicon} style={callIcon}>
        {icon ? <GenericIcon name={icon} style={iconstyle} /> : []}
      </TouchableOpacity>
      <TouchableOpacity onPress={onPresslocation} style={locationIcon}>
        {icon1 ? <GenericIcon name={icon1} style={iconStyle} /> : []}
      </TouchableOpacity>

      <View>{content}</View>
    </View>
  </TouchableWithoutFeedback>
);

export default DisplayCard;
