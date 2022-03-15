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

class UpdateSuccess extends Component {
  fetchCall() {
    const { token, distributor, id } = this.props;
    let params = {
      token,
      salesexecutive: id,
    };
    this.props.getDistributor(params);
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
            Record {data.userResult} Updated Successfully!
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
            NavigationService.navigate("DistributorOnboardingScreen");
            this.props.clearDistributorForm();
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
  data: state.distributor.record,
  token: state.user.token,
  id: state.user.id,
});
const mapDispatchToProps = (dispatch) => ({
  clearDistributorForm: (params) =>
    dispatch(DistributorActions.clearDistributorForm()),
  getDistributor: (params) =>
    dispatch(DistributorActions.getDistributor(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateSuccess);
