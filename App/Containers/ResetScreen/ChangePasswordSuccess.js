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

class ChangePasswordSuccess extends Component {
  render() {
    return (
      <View>
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
              top:hp("5%")
            }}
          >
              Password Has Been Changed Successfully!

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
            NavigationService.navigate("MenuScreen");
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
  data: state.competitor.record
});
const mapDispatchToProps = (dispatch) => ({
  clearSecondaryOrderForm: (params) =>
    dispatch(OrdersActions.clearSecondaryOrderForm(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePasswordSuccess);
