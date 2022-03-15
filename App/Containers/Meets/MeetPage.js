import React, { useState } from "react";
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from "react-native";
import BackArrowButton from "App/Components/BackArrowButton";
import Styles from "./MeetStyles";
import { ApplicationStyles, Colors } from "App/Theme";
import { Card } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DisplayCard from "../../Components/DisplayCard/DisplayCard";
import DisplayCardStrip from "../../Components/DisplayCard/DisplayCardStrip";
import { Tab, Tabs, Icon } from "native-base";
import MeetInfo from "./MeetInfo";
import MeetParticipants from "./MeetParticipants";
import NavigationService from "App/Services/NavigationService";
function MeetPage() {
    return (
        <View style={Styles.mainContainer}>
      
        <BackArrowButton style={{color:"black",fontSize:25,marginRight:wp("85%"),marginTop:hp("2%")}} />
        

     
        <Tabs
          tabBarUnderlineStyle={{ width: wp("32%"), marginLeft: wp("7.5%"),marginBottom:hp(".5%") }}
          style={{ width: wp("95%"),marginTop:hp("1.5%") }}
        >
          <Tab
            heading="Meet Info "
            textStyle={{ color: "#fff", fontSize: 15 }}
            tabStyle={{ backgroundColor: Colors.darkRedPink, flex: 1 }}
            activeTextStyle={{ color: "#fff", fontSize: 15 }}
            activeTabStyle={{ backgroundColor: Colors.darkRedPink }}
          >
            <MeetInfo />
          </Tab>
          <Tab
            heading="Meet Participants"
            textStyle={{ color: "#fff", fontSize: 15 }}
            tabStyle={{ backgroundColor: Colors.darkRedPink, flex: 1 }}
            activeTextStyle={{ color: "#fff", fontSize: 15 }}
            activeTabStyle={{ backgroundColor: Colors.darkRedPink }}
          >
            <MeetParticipants />
          </Tab>
          
        </Tabs>

        
      </View>
    )
}

export default MeetPage
