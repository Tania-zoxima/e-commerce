import React from "react";
import { Text, View, TouchableWithoutFeedback } from "react-native";
import Style from "./DetailCardStyles";

const DetailCardStrip = ({ label, value, dark, labelStyle, valueStyle }) => (
  <View style={Style.strip}>
    <Text style={dark ? Style.darkTtl : labelStyle}>{label}</Text>
      <Text style={dark ? Style.darkDetail : valueStyle}>{value}</Text>
  </View>
);

export default DetailCardStrip;
