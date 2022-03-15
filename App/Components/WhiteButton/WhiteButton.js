import React from "react";
import { Button, Text, Spinner } from "native-base";
import { TouchableOpacity } from "react-native";
import Style from "./WhiteButtonStyle";
import { Colors, ApplicationStyles } from "App/Theme";
import GenericIcon from "App/Components/GenericIcon";

const WhiteButton = ({
  style,
  textStyle,
  onPress,
  title,
  disabled = false,
  icon,
  iconstyle,
  loading = false,
  selected = false,
  children = [],
  customSelectedStyle = {},
  customSelectedTextStyle = {},
}) => {
  let textStyleNode = selected
    ? {
        ...Style.text,
        ...textStyle,
        ...Style.selectedText,
        ...customSelectedTextStyle,
      }
    : { ...Style.text, ...textStyle };
  let buttonStyleNode = selected
    ? {
        ...Style.button,
        ...style,
        ...Style.selectedButton,
        ...customSelectedStyle,
      }
    : { ...Style.button, ...style };
  let textNode = <Text style={textStyleNode}>{title}</Text>;
  textNode = title ? textNode : [];

  return (
    <TouchableOpacity
      disabled={disabled}
      block
      rounded
      style={buttonStyleNode}
      onPress={onPress}
    >
      {icon ? <GenericIcon name={icon} style={iconstyle} /> : []}
      {!loading ? children : []}
      {loading ? <Spinner color={Colors.primary} /> : textNode}
    </TouchableOpacity>
  );
};

export default WhiteButton;
