import React from "react";
import { View, Text } from "react-native";
import { Picker } from "native-base";
import Style from "./AgentInfoStyle";
const AgentInfo = ({
  heading,
  value,
  value1,
  value2,
  value3,
  value0,
  heading1,
  style = {},
}) => (
  <View>
    {heading != "Area" ? (
      <View style={Style.container}>
        <Text style={Style.heading}>{heading}</Text>
        <Text style={Style.value}>{value}</Text>
      </View>
    ) : (
      <View style={Style.areacontainer}>
        <View>
          <Text style={Style.heading}>{heading}</Text>
          <View style={Style.valuecontainer}>
            <Text style={Style.value1}>{value0}</Text>
          </View>
        </View>
      </View>
    )}
  </View>
);

export default AgentInfo;
