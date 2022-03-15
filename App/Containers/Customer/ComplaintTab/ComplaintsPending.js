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

import DetailCard from "../../../Components/DetailCard/DetailCard";
import DetailCardStrip from "../../../Components/DetailCard/DetailCardStrip";
import DatePicker from "App/Components/DatePicker";
import { Icon } from "native-base";

const ComplaintsPending = ({ details }) => {
  // console.log("pendingggggg", details[0] && details[0].zx_complaintsid);
  // const [data, setdata] = useState([
  //   {
  //       order:"CMP-3808424",
  //       date: "29",
  //       id: "1",
  //       month: "June 2021",
  //       name:"INV-6778",

  //       name1:"Invoice No.",
  //       complaintTpe:"Commerical",
  //       description:"Ultrafit Pipes",
  //       category:"SWR-PIP",
  //       groupCode:"UFP",
  //       nature:"Short Quality",
  //       location:"Dadra"

  //     },
  //     {
  //       order:"CMP-3808424",
  //       date: "29",
  //       id: "1",
  //       month: "June 2021",
  //       name:"INV-6778",

  //       name1:"Invoice No.",
  //       complaintTpe:"Commerical",
  //       description:"Ultrafit Pipes",
  //       category:"SWR-PIP",
  //       groupCode:"UFP",
  //       nature:"Short Quality",
  //       location:"Dadra"

  //     },
  //     {
  //       order:"CMP-3808424",
  //       date: "29",
  //       id: "1",
  //       month: "June 2021",
  //       name:"INV-6778",

  //       name1:"Invoice No.",
  //       complaintTpe:"Commerical",
  //       description:"Ultrafit Pipes",
  //       category:"SWR-PIP",
  //       groupCode:"UFP",
  //       nature:"Short Quality",
  //       location:"Dadra"

  //     },
  //     {
  //       order:"CMP-3808424",
  //       date: "29",
  //       id: "1",
  //       month: "June 2021",
  //       name:"INV-6778",

  //       name1:"Invoice No.",
  //       complaintTpe:"Commerical",
  //       description:"Ultrafit Pipes",
  //       category:"SWR-PIP",
  //       groupCode:"UFP",
  //       nature:"Short Quality",
  //       location:"Dadra"

  //     },
  // ]);

  return (
    <View style={Styles.mainContainer}>
      <FlatList
        style={{ top: hp("2%%"), marginBottom: "10%" }}
        data={details}
        contentContainerStyle={{ paddingBottom:hp("40%"),paddingTop:10}}
        keyExtractor={(item) => item.zx_complaintsid}
        renderItem={({ item }) => (
          <DetailCard
            dark={false}
            style={{
              backgroundColor: Colors.white,
              borderWidth: 0.5,
              width: wp("89%"),
              right: wp("1%"),
              borderColor: "#F66A676B",
            }}
            heading={item.zx_batchnumber}
            headstyle={Styles.head}
            date={HelperService.dateReadableFormatwithmonthname(
              item.zx_installationdate
            )}
            datestyle={Styles.date}
            // month={item.month}
            // monthstyle={Styles.month}
            heading1={"INV-6778"}
            head1style={Styles.head1}
            heading2={"Invoice No."}
            head2style={Styles.head2}
            content={[
              <DetailCardStrip
                labelStyle={Styles.ttl}
                valueStyle={Styles.detail}
                label={"Complaint Type"}
                value={item.zx_complainttype}
              />,
              <DetailCardStrip
                labelStyle={Styles.ttl}
                valueStyle={Styles.detail}
                label={"Description"}
                value={item.zx_name}
              />,
              <DetailCardStrip
                labelStyle={Styles.ttl}
                valueStyle={Styles.detail}
                label={"Category"}
                value={item.category}
              />,
              <DetailCardStrip
                labelStyle={Styles.ttl}
                valueStyle={Styles.detail}
                label={"Group code"}
                value={item.groupCode}
              />,
              <DetailCardStrip
                labelStyle={Styles.ttl}
                valueStyle={Styles.detail}
                label={"Nature of complaints"}
                value={item.nature}
              />,
              <DetailCardStrip
                labelStyle={Styles.ttl}
                valueStyle={Styles.detail}
                label={"Location"}
                value={item.location}
              />,
            ]}
          />
        )}
      />
       
     
    </View>
  );
};
export default ComplaintsPending;
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
    fontSize: 27,
    fontWeight: "bold",
  },

  date: {
    fontSize: 16,
    fontFamily: "Rubik",
    color: Colors.background,
    // left: hp("3%"),
    top: hp("2%"),
    textAlign: "center",
    // fontWeight:"bold"
  },
  month: {
    fontSize: 12,
    fontFamily: "Rubik",
    color: Colors.background,
    left: hp("0%"),
    top: hp("1%"),
  },
  head: {
    fontSize: 18,
    fontFamily: "Rubik",
    left: hp("0%"),
    fontWeight: "bold",
    color: Colors.background,
  },
  head1: {
    fontSize: 13,
    fontFamily: "Rubik",
    // left:hp('-0.4%'),
    textAlign: "center",
    top: hp("2.5%"),
  },
  head2: {
    fontSize: 13,
    fontFamily: "Rubik",
    // left:hp('-0.4%'),
    top: hp("2.5%"),
    color: Colors.lightGrey,
    textAlign: "center",
    fontWeight: "bold",
  },

  ttl: {
    color: Colors.lightGrey,
    fontSize: wp("3%"),
    fontFamily: "Rubik",
    fontWeight: "bold",
    bottom: hp("1%"),
    top: hp("4%"),
    left: wp("7%"),
  },
  detail: {
    color: Colors.black,
    fontSize: wp("3%"),
    fontFamily: "Rubik",
    fontWeight: "bold",
    bottom: hp("1%"),
    left: wp("15%"),
    top: hp("4%"),
  },
 
  container: {
    // flex: 1,
  },
  plusIcon: {
    borderRadius: 50,
    // bottom:hp("-7%"),
    position: "absolute",
    left:wp("70%"),
    top:hp("65%"),
    // borderRadius: 50,
    height: 45,
    width: 45,
    backgroundColor: Colors.button,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
