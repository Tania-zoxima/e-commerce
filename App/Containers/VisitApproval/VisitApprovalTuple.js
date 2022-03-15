import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import BackArrowButton from "App/Components/BackArrowButton";
import { ApplicationStyles, Colors } from "App/Theme";
import { Card } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { HelperService } from "App/Services/Utils/HelperService";
import GenericIcon from "App/Components/GenericIcon";

import DetailCard from "../../Components/DetailCard/DetailCard";
import DetailCardStrip from "../../Components/DetailCard/DetailCardStrip";
import BlueButton from "../../Components/BlueButton";
import DatePicker from "App/Components/DatePicker";
import { Icon } from "native-base";

export default function VisitApprovalTuple() {
  const [data, setdata] = useState([
    {
      date: "2",
      id: "1",
      month: "NOV",
      name: "Visit Date",

      name1: "Planned Visit",
      partyName: "AK Enterprises",
      party: "Distributor",
      purpose: "Daily Visit",
      visitStatus: "Open",
    },
    {
      date: "2",
      id: "1",
      month: "NOV",
      name: "Visit Date",

      name1: "Planned Visit",
      partyName: "AK Enterprises",
      party: "Distributor",
      purpose: "Daily Visit",
      visitStatus: "Open",
    },
    {
      name: "Visit Date",
      date: "2",
      id: "1",
      month: "NOV",
      name: "Visit Date",

      name1: "Planned Visit",
      partyName: "AK Enterprises",
      party: "Distributor",
      purpose: "Daily Visit",
      visitStatus: "Open",
    },
  ]);

  let datePickerNode = (
    <View>
      <Text>{HelperService.getVisitsDisplayDate(new Date().getTime())}</Text>
      <GenericIcon
        name={"calendar"}
        show={true}
        // style={{
        //   ...DatePickerStyles.icon,
        //   ...DatePickerStyles.iconActive,
        //   ...Styles.dateIcon,
        // }}
      />
    </View>
  );

  return (
    <View style={Styles.mainContainer}>
      <BackArrowButton style={Styles.backarrow} />
      <Text style={Styles.title}>{"Visit Approval"}</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: hp("10%"),
          position: "relative",
          marginTop: "2%",
        }}
      >
        <TouchableOpacity>
          <Icon
            name={"caret-left"}
            ios={"caret-left"}
            android={"caret-left"}
            // style={Styles.dateChangeIcon}
            type={"FontAwesome5"}
          />
        </TouchableOpacity>

        <View>
          <DatePicker
            allowRangeSelection={true}
            selectedStartDate={new Date().getTime()}
            selectedEndDate={new Date().getTime()}
            onDateChange={(params) => console.log(params)}
          ></DatePicker>
        </View>
        <TouchableOpacity>
          {/* style={{}} */}
          <Icon
            name={"caret-right"}
            ios={"caret-right"}
            android={"caret-right"}
            // style={Styles.dateChangeIcon}F
            type={"FontAwesome5"}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={Styles.floatBtn}>
        <Text style={Styles.btnText}>Approve all</Text>
      </TouchableOpacity>

      <FlatList
        style={{ top: hp("0%"), marginBottom: "10%" }}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DetailCard
            dark={false}
            button1={"Approve"}
            buttonStyle1={Styles.button1}
            textStyle={Styles.btnText}
            button2={"Reject"}
            buttonStyle={Styles.button2}
            style={{
              backgroundColor: Colors.white,
              borderColor: Colors.darkRedPink,
              borderWidth: 0,
            }}
            // heading={item.name}
            // headstyle={Styles.head}
            date={item.date}
            datestyle={Styles.date}
            month={item.month}
            monthstyle={Styles.month}
            heading1={item.name}
            head1style={Styles.head1}
            heading2={item.name1}
            head2style={Styles.head2}
            content={[
              <DetailCardStrip
                labelStyle={Styles.ttl}
                valueStyle={Styles.detail}
                label={"Party Name"}
                value={item.partyName}
              />,
              <DetailCardStrip
                labelStyle={Styles.ttl}
                valueStyle={Styles.detail}
                label={"Party"}
                value={item.party}
              />,
              <DetailCardStrip
                labelStyle={Styles.ttl}
                valueStyle={Styles.detail}
                label={"Purpose"}
                value={item.purpose}
              />,
              <DetailCardStrip
                labelStyle={Styles.ttl}
                valueStyle={Styles.detail}
                label={"Visit Status"}
                value={item.visitStatus}
              />,
            ]}
          />
        )}
      />
      {/* <View>
       <TouchableOpacity>
           <Text>Approve </Text>
           </TouchableOpacity>
       <TouchableOpacity>
       <Text>Reject </Text>
       </TouchableOpacity>

        </View> */}
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

  date: {
    fontSize: 43,
    fontFamily: "Rubik",
    color: Colors.background,
    left: hp("1%"),
    top: hp("0.5%"),
  },
  month: {
    fontSize: 19,
    fontFamily: "Rubik",
    color: Colors.background,
    left: hp("1%"),
    fontWeight: "bold",
  },
  head1: {
    fontSize: 14,
    fontFamily: "Rubik",
    left: hp("1%"),
    fontWeight: "bold",
  },
  head2: {
    fontSize: 14,
    fontFamily: "Rubik",
    color: Colors.darkGreen,
    //   left:hp('0.5%'),
    fontWeight: "bold",
  },
  button1: {
    backgroundColor: Colors.darkGreen,
    color: "white",
    left: wp("5%"),
    width: wp("34%"),
    marginTop: hp("3%"),
    marginBottom: hp("2%"),
    borderRadius: 5,
    height: hp("4%"),
  },
  button2: {
    backgroundColor: Colors.background,
    color: "white",
    left: wp("13%"),
    width: wp("34%"),
    marginTop: hp("3%"),
    marginBottom: hp("2%"),
    borderRadius: 5,
    height: hp("4%"),
  },
  btnText: {
    color: Colors.white,
    fontFamily: "Rubik",
    textAlign: "center",
    padding: 3,
  },
  floatBtn: {
    height: hp("5.5%"),
    width: wp("55%"),

    bottom: hp("11%"),
    position: "absolute",
    
    borderRadius: 20,
    
    backgroundColor: Colors.darkGreen,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10000,
  },

  ttl: {
    color: Colors.lightGrey,
    fontSize: wp("3.6%"),
    fontFamily: "Rubik",
    fontWeight: "bold",
    bottom: hp("1%"),
    top: hp("1.5%"),
    left: wp("9%"),
  },
  detail: {
    color: Colors.black,
    fontSize: wp("3.6%"),
    fontFamily: "Rubik",
    fontWeight: "bold",
    bottom: hp("1%"),
    left: wp("14%"),
    top: hp("1.5%"),
  },
});
