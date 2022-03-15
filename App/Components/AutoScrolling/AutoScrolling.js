import React,{Component} from 'react'
import AutoScrolling from "react-native-auto-scrolling";
import { View, StyleSheet, TouchableOpacity, Image,Text } from "react-native";
export default class AutoScroll extends Component  {
  render(){

  // const {ticker}=props;
    return (
        <View>
            <AutoScrolling
            style={{
              backgroundColor: "#7FC4FD",
              width: 400,
              padding: 6,
              marginBottom: 10,
              marginTop: 5,
              height: 35,
            }}
            endPadding={50}
          >
            <Text style={{ color: "#E3E3E3", fontSize: 13 }}>
              {this.props.ticker}
            </Text>
          </AutoScrolling>
        </View>
    )}
}
