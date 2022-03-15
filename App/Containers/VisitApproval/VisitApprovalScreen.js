import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  
} from "react-native";

import BackArrowButton from "App/Components/BackArrowButton";
import { ApplicationStyles, Colors } from "App/Theme";
import { Card } from "react-native-paper";
import DatePicker from "App/Components/DatePicker";
// import DatePickerStyles from "App/Components/DatePicker/DatePickerStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { HelperService } from "App/Services/Utils/HelperService";
import GenericIcon from "App/Components/GenericIcon";

import DisplayCard from "../../Components/DisplayCard/DisplayCard";
import DisplayCardStrip from "../../Components/DisplayCard/DisplayCardStrip";
import NavigationService from "App/Services/NavigationService";

export default function VisitApprovalScreen() {
  const [data, setdata] = useState([
    {
      name: "Anil Gupta",
      status: "Pending for approval",
      id: "1",
      distributorVisit: "1",
      wholesalerVisit: "4",
      retailerVisit: "2",
      leadVisit: "2",
      influencerVisit: "1",
    },
  ]);

  
  return (
    <View style={Styles.mainContainer}>
      <BackArrowButton style={Styles.backarrow} />
      <Text style={Styles.title}>{"Visit Approval"}</Text>
     
      <FlatList
        style={{ top: "3%" }}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DisplayCard
            dark={false}
            // onPress={() => NavigationService.navigate("VisitApprovalTuple")}
            style={{
              backgroundColor: Colors.white,
              borderColor: Colors.darkRedPink,
              borderWidth: 0,
            }}
            heading={item.name}
            Styletitle={Styles.head}
            content={[
              <DisplayCardStrip
                stylettl={Styles.ttl}
                styledetail={Styles.detail}
                label={"Status"}
                value={item.status}
              />,
              <DisplayCardStrip
                stylettl={Styles.ttl}
                styledetail={Styles.detail}
                label={"Distributor Visit"}
                value={item.distributorVisit}
              />,
              <DisplayCardStrip
                stylettl={Styles.ttl}
                styledetail={Styles.detail}
                label={"Wholesaler Visit"}
                value={item.wholesalerVisit}
              />,
              <DisplayCardStrip
                stylettl={Styles.ttl}
                styledetail={Styles.detail}
                label={"Retailer Visit"}
                value={item.retailerVisit}
              />,
              <DisplayCardStrip
                stylettl={Styles.ttl}
                styledetail={Styles.detail}
                label={"Lead Visit"}
                value={item.leadVisit}
              />,
              <DisplayCardStrip
                stylettl={Styles.ttl}
                styledetail={Styles.detail}
                label={"Influencer Visit"}
                value={item.influencerVisit}
              />,
            ]}
          />
        )}
      />
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
    color: Colors.background,
    fontSize: 34,
    paddingRight: 360,
    paddingTop: 15,
  },
  title: {
    fontFamily: "Rubik",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    bottom: hp("1%"),
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
  head: {
    color: Colors.background,
    fontFamily: "Rubik",
    fontWeight: "bold",

    fontSize: 18,
    marginBottom: hp("3%"),
    textTransform: "capitalize",
  },
  ttl: {
    color: Colors.lightGrey,
    fontSize: wp("3.6%"),
    fontFamily: "Rubik",
    fontWeight: "bold",
    bottom: hp("1%"),
  },
  detail: {
    color: Colors.black,
    fontSize: wp("3.6%"),
    fontFamily: "Rubik",
    fontWeight: "bold",
    bottom: hp("1%"),
  },
});
