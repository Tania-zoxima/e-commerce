import React, { useState } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import BackArrowButton from "App/Components/BackArrowButton";
import { ApplicationStyles, Colors } from "App/Theme";
import { Card } from "react-native-paper";
import Styles from "./MeetStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DisplayCard from "../../Components/DisplayCard/DisplayCard";
import DisplayCardStrip from "../../Components/DisplayCard/DisplayCardStrip";
import NavigationService from "App/Services/NavigationService";


function Approved() {
    const [data, setdata] = useState([
        {
          name: "Shyam Retailers",
          category: "Retailer Meet",
          id: "1",
          startdate: "24/08/2021",
          enddate: "4:00 PM to 7:00 PM",
        },
        
      ]);
    return (
       
            <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        //    initialNumToRender={7}
        renderItem={({ item }) => (
          <DisplayCard
            dark={false}
            onPress={() => NavigationService.navigate("MeetPage")}
            contentContainerStyle={{ paddingBottom: 90,paddingTop:10}}
            style={{
              backgroundColor: Colors.white,
              borderColor: Colors.darkRedPink,
              borderWidth: .2,
              marginTop:hp("3%")
            //   paddingTop:50
            }}
            heading={item.name}
            Styletitle={Styles.head}
            // icon={"check"}
            // iconstyle={Styles.checkicon}
            content={[
              <DisplayCardStrip
                stylettl={Styles.ttl}
                styledetail={Styles.detail}
                label={"Meet Type"}
                value={item.category}
              />,
              <DisplayCardStrip
                stylettl={Styles.ttl}
                styledetail={Styles.detail}
                label={"Workshop Date"}
                value={item.startdate}
              />,
              <DisplayCardStrip
                stylettl={Styles.ttl}
                styledetail={Styles.detail}
                label={"From & To Time"}
                value={item.enddate}
              />,
            ]}
          />
        )}
      />
        
    )
}

export default Approved
