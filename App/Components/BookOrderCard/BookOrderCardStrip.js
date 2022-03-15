import React from 'react'
import { Text, View, TouchableWithoutFeedback } from 'react-native'
import Style from './BookOrderCardStyle'


const BookOrderCardStrip = ({
  label,
  value,
  dark,
  labelStyle,
  valueStyle,
  stylettl,
  styledetail
}) => (
    <View style={Style.strip}>
     	<Text style={dark ? Style.darkTtl : Style.ttl}>{label}</Text>
      <Text style={dark ? Style.darkDetail :Style.detail}>{value}</Text>
    </View>
);

export default BookOrderCardStrip