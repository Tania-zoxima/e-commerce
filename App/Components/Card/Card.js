import { Body, Container, Header, Icon, Left, Right, Title } from "native-base";
import React from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";
import { Colors, ApplicationStyles } from "App/Theme";
import GenericIcon from "App/Components/GenericIcon";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Card = ({
  style = {},
  textStyle = {},
  onPress,
  title,
  target,
  month,
  text,
  value,
}) => {
  return (
    <View style={{ ...Styles.card, ...style }} onPress={onPress}>
      <Text style={{ ...Styles.text, ...textStyle }}>{title}</Text>
      
      <Text style={{ ...Styles.valuetext, ...textStyle }}>{value}</Text>
     
    </View>
  );
};

export default Card;

const Styles = StyleSheet.create({
  card: {
    width: wp("40%"),
    marginHorizontal: wp("3%"),
    marginVertical: hp("1.4%"),
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    height: hp("18.0%"),
    borderRadius: 5,
    borderColor: "#F66A676B",
    borderWidth: 1,
    flexDirection: "column",
    paddingTop: "10%",
  },

  text: {
    color: Colors.black,
    fontFamily: ApplicationStyles.textMsgFont,
    fontWeight: "bold",
    fontSize: 10.5,
    textTransform: "uppercase",
   textAlign:"center",
    flexWrap: "wrap",
    top:"-45%",
    
  },
  
  valuetext: {
    color: Colors.darkRedPink,
    fontFamily: ApplicationStyles.textMsgFont,
    fontWeight: "bold",
    fontSize: 30,
    textTransform: "uppercase",
    alignSelf: "center",
    flexWrap: "wrap",
    top:"-18%"
  },
  
});
