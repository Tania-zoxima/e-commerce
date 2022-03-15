import React from 'react'
import { Text, View, TouchableWithoutFeedback } from 'react-native'
import Style from './DisplayCardStyles'


const DisplayCardStrip = ({
  label,
  value,
  dark,
  labelStyle,
  valueStyle,
  stylettl,
  styledetail
}) => (
    <View style={Style.strip}>
     	<Text style={dark ? Style.darkTtl : stylettl}>{label}</Text>
      <Text style={dark ? Style.darkDetail :styledetail}>{value}</Text>
    </View>
);

export default DisplayCardStrip