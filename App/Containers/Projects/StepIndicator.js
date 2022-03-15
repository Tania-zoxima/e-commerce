import React, { useState, useEffect } from "react";
import {
  Platform,
  View,
  ActivityIndicator,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
  StatusBar,
  Text,
  ScrollView
} from "react-native";
import StepIndicator from "react-native-step-indicator";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const labels = [
  "Design stage",
  "Tendering stage",
  "Order issued to contractor",
  "Mock up stage",
  "Price offer stage",
  "Order issued stage",
  "Supply stage",
];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "#85e085",
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: "black",
  stepStrokeUnFinishedColor: "#aaaaaa",
  separatorFinishedColor: "black",
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: "black",
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#85e085",
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: "black",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "#aaaaaa",
  labelColor: "#999999",
  labelSize: 13,
  currentStepLabelColor: "black",
};
function Indicator(props) {
  const data = [
    {label:"Design stage"},
    {label:"Tendering stage"},
    {label:"Order issued to contractor"},
    {label:"Mock up stage"},
    {label:"Price offer stage"},
    {label:"Order issued stage"},
    {label:"Supply stage"},
  ];
  return (
    <View>
      <ScrollView horizontal style={{height:hp("10%"),top:hp("1%")}}>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={props.currentPosition}
        labels={labels}
        stepCount={7}
        renderLabel={({position, stepStatus, label, currentPosition})=>{
          return(
          <View style={styles.lblcontainer}>
            <Text style={styles.lbltext}>{data[position].label}</Text>
          </View>
          )}}
      />
      </ScrollView>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <TouchableOpacity
          onPress={props.handleDecrement}
          style={{ right: wp("20%") }}
        >
          <Text style={props.code=="1"?{ color: Colors.darkRedPink, fontSize: 18 }:{ color: Colors.bluebackground, fontSize: 18 }}>
            {props.show?Previous:""}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={props.handleIncrement}
          style={{ left: wp("20%") }}
        >
          <Text style={props.code=="1"?{ color: Colors.darkRedPink, fontSize: 18 }:{ color: Colors.bluebackground, fontSize: 18 }}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default Indicator;
const styles = StyleSheet.create({
  lblcontainer:{
    // padding:10,
    width:(Dimensions.get('window').width*.20) + 40
  },
  lbltext:{
    fontSize:12,
    textAlign:"center"
  }
});
