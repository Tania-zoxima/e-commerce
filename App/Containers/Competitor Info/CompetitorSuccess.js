import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  CheckBox,
  ImageBackground,
  TextInput,
  Alert,
  FlatList,
  StyleSheet,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import OrdersActions from "App/Stores/Orders/Actions";
import { connect } from "react-redux";
import GenericIcon from "App/Components/GenericIcon";
import NavigationService from "App/Services/NavigationService";
import CompetitorActions from "App/Stores/Competitor/Actions";

class CompetitorSuccess extends Component {
  fetchCall() {
    const { details, agentid, token } = this.props;

    this.props.getCompetitor({
      id: agentid,
      token: token,
    });
  }
  render() {
    const { data } = this.props;
    // console.log("recordddiddd", this.props.data);
    return (
      <View>
        {/* <TouchableOpacity
          onPress={() => {
            NavigationService.navigate("GetSecondaryOrder");
          }}
        >
          <GenericIcon
            name={"arrow-back"}
            style={{
              fontSize: 30,
              color: "black",
            }}
          />
        </TouchableOpacity> */}
        <View style={{ alignItems: "center", top: hp("20%") }}>
          <Image
            style={{ width: 150, height: 150 }}
            source={require("App/Assets/Images/check.png")}
          />
          <Text
            style={{
              fontSize: 19,
              fontWeight: "bold",
              padding: 10,
              textAlign: "center",
              top: hp("5%"),
            }}
          >
            {/* Record Id  Created Successfully! */}
            Record {data.recordid[0].zx_recordno} Created Successfully!
          </Text>
          {/* <Text style={{ fontSize: 22, padding: 10, textAlign: "center" }}>
            Distributor Id {data.zx_recordid} has been created
          </Text> */}
        </View>
        <TouchableOpacity
          style={{
            alignItems: "center",
            top: hp("30%"),
            backgroundColor: "#2eb82e",
            width: wp("20%"),
            height: hp("5%"),
            alignSelf: "center",
          }}
          onPress={() => {
            NavigationService.navigate("CompetitorInfo");
            this.fetchCall();
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              textAlignVertical: "center",
              fontSize: 20,
              color: "white",
              top: hp("0.5%"),
            }}
          >
            OK
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  data: state.competitor.record,
  token: state.user.token,
  agentid: state.user.id,
});
const mapDispatchToProps = (dispatch) => ({
  clearSecondaryOrderForm: (params) =>
    dispatch(OrdersActions.clearSecondaryOrderForm(params)),
  getCompetitor: (params) => dispatch(CompetitorActions.getCompetitor(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompetitorSuccess);
