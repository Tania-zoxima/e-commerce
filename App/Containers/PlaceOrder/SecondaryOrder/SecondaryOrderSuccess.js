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

class SecondaryOrderSuccess extends Component {
  fetchCall() {
    const { token, distributor, id, primaryOrderForm } = this.props;
    let params = {
      token,
      order_id: id,
      offset: 0,
      limit: 50,
      show: true,
    };
    this.props.fetchSecondaryOrders(params);
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
            style={{ width: 150, height: 150, right: wp("5%") }}
            source={require("App/Assets/Images/surprise-box.png")}
          />
          <Text
            style={{
              fontSize: 19,
              fontWeight: "bold",
              padding: 10,
              textAlign: "center",
            }}
          >
            Order placed successfully!
          </Text>
          <Text style={{ fontSize: 22, padding: 10, textAlign: "center" }}>
            Your Order No. SOR-{data.zx_recordid} has been placed
          </Text>
        </View>
        <TouchableOpacity
          style={{
            alignItems: "center",
            top: hp("30%"),
            backgroundColor: "#f05959",
            width: wp("20%"),
            height: hp("5%"),
            alignSelf: "center",
          }}
          onPress={() => {
            NavigationService.navigate("GetSecondaryOrder"),this.fetchCall()
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
  data: state.orders.recordId,
  id: state.user.id,
  token: state.user.token,
});
const mapDispatchToProps = (dispatch) => ({
  clearSecondaryOrderForm: (params) =>
    dispatch(OrdersActions.clearSecondaryOrderForm(params)),
  fetchSecondaryOrders: (params) =>
    dispatch(OrdersActions.fetchSecondaryOrders(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecondaryOrderSuccess);
