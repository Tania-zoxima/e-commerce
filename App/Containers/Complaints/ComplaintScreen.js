import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import Style from "./ComplaintScreenStyle";
import GenericIcon from "App/Components/GenericIcon";
import NavigationService from "App/Services/NavigationService";
import {
  Icon,
  Input,
  ScrollableTab,
  Container,
  TabHeading,
  Tab,
  Tabs,
  Content,
} from "native-base";
import { ApplicationStyles, Colors } from "App/Theme";
import Pending from "./Pending/PendingScreen";
import Resloved from "./Resloved/ReslovedScreen";
import WIP from "./WIP/WIP";
import { connect } from "react-redux";
import RetailersActions from "App/Stores/Retailers/Actions";
import { heightPercentageToDP } from "react-native-responsive-screen";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

class ComplaintScreen extends Component {
  // componentDidMount() {
  //   const { token } = this.props;
  //   // console.log("hhhhhhhhhhhhhhhhh", this.props.item.accountid);
  //  this.fetchRetailersCall()
  // }

  // fetchRetailersCall() {
  //   const { getCustomerComplaint,token } = this.props;

  //   getCustomerComplaint({ token,
  //     form: {
  //       customerId:this.props.item.accountid,
  //     },});
  // }
  render() {
    const { details, complaintloader } = this.props;
    let id = this.props.item.id;
    //  console.log("complaintsssssss",id)

    return (
      <View style={{ marginBottom: hp("35%"),top:hp("-6%") }}>
        <TouchableOpacity
          style={Style.plusIcon}
          onPress={() => {
            NavigationService.navigate("CreateComplaint", { id: id });
            this.props.clearForm();
          }}
        >
          <Icon
            name={"ios-add"}
            ios={"ios-add"}
            android={"md-add"}
            style={{ color: Colors.white, fontSize: 45, alignSelf: "center" }}
          />
        </TouchableOpacity>

        <ScrollView>
          <View style={Style.container}>
            {/* <TouchableOpacity
              style={{
                flexDirection: "row",
                top: "2%",
                left: hp("37%"),
                width: wp("23%"),
              }}
              onPress={() => NavigationService.navigate("ComplaintFilters")}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: "#F66A67",
                  left: "-12%",
                  top: "-4%",
                }}
              >
                Filter by
              </Text>
              <GenericIcon
                name={"tune"}
                style={{
                  color: Colors.button,
                  fontSize: 23,
                  paddingRight: 0,
                  left: "10%",
                  top: "-3%",
                }}
              />
            </TouchableOpacity> */}

            <View style={Style.tabs}>
              {/* <Container   >
        <Content  theme={{backgroundColor:"red"}} > */}
              <Tabs
                tabBarUnderlineStyle={{
                  color: "white",
                  marginBottom: hp("0.2%"),
                }}
              >
                <Tab
                  heading="Pending "
                  textStyle={{ color: "#fff", fontSize: 15 }}
                  tabStyle={{ backgroundColor: Colors.tabBlue, flex: 1 }}
                  activeTextStyle={{ color: "#fff", fontSize: 15 }}
                  activeTabStyle={{ backgroundColor: Colors.tabBlue }}
                >
                  <Pending item={id} />
                </Tab>
                <Tab
                  heading="Resolved"
                  textStyle={{ color: "#fff", fontSize: 15 }}
                  tabStyle={{ backgroundColor: Colors.tabBlue, flex: 1 }}
                  activeTextStyle={{ color: "#fff", fontSize: 15 }}
                  activeTabStyle={{ backgroundColor: Colors.tabBlue }}
                >
                  <Resloved item={id} />
                </Tab>
                <Tab
                  heading="WIP"
                  textStyle={{ color: "#fff", fontSize: 15 }}
                  tabStyle={{ backgroundColor: Colors.tabBlue, flex: 1 }}
                  activeTextStyle={{ color: "#fff", fontSize: 15 }}
                  activeTabStyle={{ backgroundColor: Colors.tabBlue }}
                >
                  <WIP item={id} />
                </Tab>
              </Tabs>
              {/* </Content></Container> */}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.user.token,
  details: state.retailers.customerComplaint,
  complaintloader: state.retailers.getCustomerComplaintLoader,
});

const mapDispatchToProps = (dispatch) => ({
  getCustomerComplaint: (params) =>
    dispatch(RetailersActions.getCustomerComplaint(params)),
  clearForm: (params) => dispatch(RetailersActions.clearForm(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ComplaintScreen);
// export default ComplaintScreen;
