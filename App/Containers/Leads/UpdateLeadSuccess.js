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
import DistributorActions from "App/Stores/Distributor/Actions";
import { connect } from "react-redux";
import GenericIcon from "App/Components/GenericIcon";
import NavigationService from "App/Services/NavigationService";
import LeadActions from "App/Stores/Lead/Actions";

class UpdateLeadSuccess extends Component {
  fetchCall() {
    const { details, id, token, searchFilters } = this.props;
    let params = {
      token,
      form: {
        teamid: id,
        leadType: [],
        lead_dealstatus: [],
        fromDate: null,
        toDate: null,
      },
    };
    this.props.getLead(params);
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
            style={{ width: 100, height: 100 }}
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
            Opportunity Id {data.recordid[0].zx_recordid} Updated Successfully!
          </Text>
          {/* <Text style={{ fontSize: 22, padding: 10, textAlign: "center" }}>
            Distributor Id {data.zx_recordid} has been updated
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
            NavigationService.navigate("Leads");
            this.props.clearDistributorForm();
            this.fetchCall()
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
  data: state.lead.record,
  token: state.user.token,
    id: state.user.id,
    searchFilters: state.lead.searchFilters,
});
const mapDispatchToProps = (dispatch) => ({
  clearDistributorForm: (params) =>
    dispatch(DistributorActions.clearDistributorForm()),
    getLead: (params) => dispatch(LeadActions.getLead(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateLeadSuccess);
