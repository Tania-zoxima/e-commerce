import React, { useState } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import BackArrowButton from "App/Components/BackArrowButton";
import { ApplicationStyles, Colors } from "App/Theme";
import { Card } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DisplayCard from "../../Components/DisplayCard/DisplayCard";
import DisplayCardStrip from "../../Components/DisplayCard/DisplayCardStrip";
import { Tab, Tabs, Icon } from "native-base";
import TrainingAll from "./TrainingAll";
import EnrollTraining from "./EnrollTraining";

export default function Training() {
  const [data, setdata] = useState([
    {
      name: "Training A",
      category: "Functional",
      id: "1",
      startdate: "19/07/2021",
      enddate: "19/08/2021",
    },
    {
      name: "Training B",
      category: "Awareness",
      id: "2",
      startdate: "19/07/2021",
      enddate: "19/08/2021",
    },
  ]);
  return (
    <View style={Styles.mainContainer}>
      <Card style={Styles.cardstyle}>
        <BackArrowButton style={Styles.backarrow} />
        <Text style={Styles.title}>
          {"Training "}
          <Text style={Styles.titleText}>{"Requisition"}</Text>
        </Text>
      </Card>
      <Tabs
          tabBarUnderlineStyle={{ width: wp("50%"),marginBottom:hp(".5%"),backgroundColor:Colors.darkRedPink }}
          style={{ width: wp("100%"),marginTop:hp("1.5%") }}
        >
          <Tab
            heading="All"
            textStyle={{ color: "#9A9A9A", fontSize: 15 }}
            tabStyle={{ backgroundColor: Colors.white, flex: 1 }}
            activeTextStyle={{ color: Colors.black, fontSize: 15 }}
            activeTabStyle={{ backgroundColor: Colors.white }}
          >
            <TrainingAll/>
          </Tab>
          <Tab
            heading="Enrolled Trainings"
            textStyle={{ color: "#9A9A9A", fontSize: 15 }}
            tabStyle={{ backgroundColor: Colors.white, flex: 1 }}
            activeTextStyle={{ color: Colors.black, fontSize: 15 }}
            activeTabStyle={{ backgroundColor: Colors.white }}
          >
            <EnrollTraining/>
          </Tab>

        </Tabs>

      {/* <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        //    initialNumToRender={7}
        renderItem={({ item }) => (
          <DisplayCard
            dark={false}
            style={{
              backgroundColor: Colors.white,
              borderColor: Colors.darkRedPink,
              borderWidth: 0,
            }}
            heading={item.name}
            Styletitle={Styles.head}
            icon={"check"}
            iconstyle={Styles.checkicon}
            content={[
              <DisplayCardStrip
                stylettl={Styles.ttl}
                styledetail={Styles.detail}
                label={"Category"}
                value={item.category}
              />,
              <DisplayCardStrip
                stylettl={Styles.ttl}
                styledetail={Styles.detail}
                label={"Start Date"}
                value={item.startdate}
              />,
              <DisplayCardStrip
                stylettl={Styles.ttl}
                styledetail={Styles.detail}
                label={"End Date"}
                value={item.enddate}
              />,
            ]}
          />
        )}
      /> */}
    </View>
  );
}
const Styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: hp("0%"),
  },
  cardstyle: {
    backgroundColor: Colors.darkRedPink,
    width: wp("100%"),
    top: hp("-1%"),
    height: hp("15%"),
    borderBottomLeftRadius: 55,
    borderBottomRightRadius: 55,
  },
  backarrow: {
    color: Colors.white,
    fontSize: 32,
    paddingLeft: 7,
    paddingTop: 20,
  },
  title: {
    color: Colors.white,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 28,
    fontWeight: "bold",
    left: wp("15%"),
    top: hp("-1%"),
  },
  head:{
    color: Colors.black,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: 18,
    marginBottom: 5,
    textTransform: 'capitalize',


  },
  titleText: {
    color: Colors.black,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 28,
    fontWeight: "bold",
  },
  checkicon: {
    left: wp("75%"),
    top: hp("-4%"),
    backgroundColor: Colors.darkRedPink,
    color: Colors.white,
    borderRadius: 50,
    height: hp(4),
    width: wp(8),
    padding: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  ttl: {
    color: Colors.lightGrey,
    fontSize: wp("3.5%"),
    fontFamily: ApplicationStyles.textFont,
    left: wp("18%"),
    fontWeight: "bold",
  },
  detail: {
    color: Colors.black,
    fontSize: wp("3.7%"),
    fontFamily: ApplicationStyles.textMsgFont,
    right: wp("18%"),
    fontWeight: "bold",
  },
});
