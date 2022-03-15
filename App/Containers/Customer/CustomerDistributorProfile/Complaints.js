import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
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
import { Tab, Tabs, Icon } from "native-base";
// import ComplaintsPending from "../ComplaintTab/ComplaintsPending";
// import ComplaintsResolved from "../ComplaintTab/ComplaintsResolved";
import { connect } from "react-redux";
import RetailersActions from "App/Stores/Retailers/Actions";
import NavigationService from "App/Services/NavigationService";


class Complaints extends React.Component {
  
  componentDidMount() {
    const { token } = this.props;
    // console.log("hhhhhhhhhhhhhhhhh", this.props.item.accountid);
    this.props.getCustomerComplaint({
      token,
      form: {
        customerId:this.props.item.id,
      },
    });
  }
  render() {
    const { details } = this.props;
     let id=this.props.item.id
    // console.log("complaintsssssss",id)
  return (
    <ScrollView>
      <View style={Styles.mainContainer}>
        <Tabs
          tabBarUnderlineStyle={{ width: "22%", marginLeft: "10%" }}
          style={{ width: wp("90%") }}
        >
          <Tab
            heading="Pending "
            textStyle={{ color: "#fff", fontSize: 15 }}
            tabStyle={{ backgroundColor: Colors.tabBlue, flex: 1 }}
            activeTextStyle={{ color: "#fff", fontSize: 15 }}
            activeTabStyle={{ backgroundColor: Colors.tabBlue }}
          >
            {/* <ComplaintsPending details={details} /> */}
          </Tab>
          <Tab
            heading="Resolved"
            textStyle={{ color: "#fff", fontSize: 15 }}
            tabStyle={{ backgroundColor: Colors.tabBlue, flex: 1 }}
            activeTextStyle={{ color: "#fff", fontSize: 15 }}
            activeTabStyle={{ backgroundColor: Colors.tabBlue }}
          >
            {/* <ComplaintsResolved /> */}
          </Tab>
        </Tabs>
        {/* <TouchableOpacity
          style={Styles.plusIcon}
          onPress={() => NavigationService.navigate("CreateComplaint",{id:id})}
        >
          <GenericIcon
            name={"add"}
            style={{ color: Colors.white, fontSize: 45, alignSelf: "center" }}
          />
        </TouchableOpacity> */}
      </View>
    </ScrollView>
  );
}
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  details: state.retailers.customerComplaint,
});

const mapDispatchToProps = (dispatch) => ({
  getCustomerComplaint: (params) =>
    dispatch(RetailersActions.getCustomerComplaint(params)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Complaints);
const Styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: hp("0%"),
    marginTop: hp("2%"),
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
    fontSize: 28,
    fontFamily: "Rubik",
    color: Colors.background,
    left: hp("2%"),
    top: hp("2%"),
  },
  month: {
    fontSize: 16,
    fontFamily: "Rubik",
    color: Colors.background,
    left: hp("-0.5%"),
    top: hp("1.5%"),
  },
  head: {
    fontSize: 19,
    fontFamily: "Rubik",
    left: hp("0%"),
    fontWeight: "bold",
    color: Colors.background,
  },
  head1: {
    fontSize: 14,
    fontFamily: "Rubik",
    left: hp("-0.4%"),
    top: hp("1.5%"),
  },
  head2: {
    fontSize: 14,
    fontFamily: "Rubik",
    left: hp("-0.4%"),
    top: hp("1.5%"),
    color: Colors.lightGrey,
  },

  ttl: {
    color: Colors.lightGrey,
    fontSize: wp("3.6%"),
    fontFamily: "Rubik",
    fontWeight: "bold",
    bottom: hp("1%"),
    top: hp("4%"),
    left: wp("-12%"),
  },
  detail: {
    color: Colors.black,
    fontSize: wp("3.6%"),
    fontFamily: "Rubik",
    fontWeight: "bold",
    bottom: hp("1%"),
    left: wp("-10%"),
    top: hp("4%"),
  },
  // plusIcon: {
  //   borderRadius: 50,
  //   bottom: hp("10%"),
  //   position: "absolute",
  //   right: wp("4.5%"),
  //   borderRadius: 50,
  //   height: hp("6%"),
  //   width: wp("12%"),
  //   backgroundColor: Colors.background,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   zIndex: 10000,
  //   elevation: 6,
  // },
  plusIcon: {
    borderRadius: 50,
    // bottom:hp("-7%"),
    position: "absolute",
    left:wp("78%"),
    top:hp("75%"),
    // borderRadius: 50,
    height: 45,
    width: 45,
    backgroundColor: Colors.button,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
