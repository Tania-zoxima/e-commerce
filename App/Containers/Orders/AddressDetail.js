import React, { Component } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";

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
import RetailersActions from "App/Stores/Retailers/Actions";
import DisplayCard from "../../Components/DetailCard/DetailCard";
import DisplayCardStrip from "../../Components/DetailCard/DetailCardStrip";
import NavigationService from "App/Services/NavigationService";
import OrdersActions from "App/Stores/Orders/Actions";
import { connect } from "react-redux";
import DistributorActions from "App/Stores/Distributor/Actions";
import NoDataFound from "App/Components/NoDataFound";
import Loading from "App/Components/Loading";
import { Tab, Tabs, Icon } from "native-base";
class AddressDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
    };
  }
  componentDidMount() {
    const { getCustomerAddress, token, primaryOrderForm } = this.props;
    this.fetchCall();
  }
  fetchCall() {
    const { getCustomerAddress, token, primaryOrderForm } = this.props;

    getCustomerAddress({
      token,
      form: {
        customerId: primaryOrderForm.zx_orderfrom,
      },
    });
  }

  onSelectDetail(params) {
    // console.log("ppppppppp",params)
    NavigationService.navigate("Shipping");
    this.props.selectDetail(params);
    this.props.setModalVisible();
  }
  getCity() {
    const { area } = this.props;
    let pincode = [];
    if (area && area.length) {
      area.map((obj) => {
        if (obj.zx_level == 5) {
          pincode.push({
            id: obj.zx_salesterritoryid,
            name: obj.zx_territoryname,
          });
        }
      });
    }
    return pincode;
  }

  getDataNode() {
    let visibleNode = [];

    const { details, addressloader } = this.props;

    if (details && details.length) {
      visibleNode = (
        <FlatList
          style={{ top: "4%", marginBottom: hp("10%") }}
          data={details}
          onRefresh={() => this.fetchCall()}
          refreshing={addressloader}
          keyExtractor={(item) => item.zx_recordid}
          renderItem={({ item }) => (
            <DisplayCard
              dark={false}
              onPress={() => this.onSelectDetail(item)}
              style={{
                backgroundColor: Colors.white,
                borderColor: "#F66A676B",
                borderWidth: 1.5,
                width: wp("80%"),
                height: hp("20%"),
              }}
              // heading={item.order}
              // headstyle={Styles.head}
              // heading1={item.name}
              // head1style={Styles.head1}
              content={[
                <DisplayCardStrip
                  labelStyle={Styles.ttl}
                  valueStyle={Styles.detail}
                  label={"Ship To Code"}
                  value={item.zx_recordid}
                />,
                <DisplayCardStrip
                  labelStyle={Styles.ttl}
                  valueStyle={Styles.detail}
                  label={"Ship To Name"}
                  value={item.zx_contactperson}
                />,
                <DisplayCardStrip
                  labelStyle={Styles.ttl}
                  valueStyle={Styles.detail}
                  label={"Shipping Address"}
                  value={item.zx_address}
                />,
                <DisplayCardStrip
                  labelStyle={Styles.ttl}
                  valueStyle={Styles.detail}
                  label={"City"}
                  value={HelperService.getNameFromSFID(
                    this.getCity(),
                    item.zx_city11
                  )}
                />,
                <DisplayCardStrip
                  labelStyle={Styles.ttl}
                  valueStyle={Styles.detail}
                  label={"Contact Number"}
                  value={item.zx_mobile}
                />,
              ]}
            />
          )}
        />
      );
    } else if (addressloader) {
      visibleNode = <Loading />;
    } else if (!details || (details && !details.length && !addressloader)) {
      visibleNode = (
        <NoDataFound text={"No Data found."}>
          <Icon
            name={"refresh"}
            onPress={() => this.fetchCall()}
            style={{
              color: Colors.button,
              fontSize: 25,
              alignSelf: "center",
              padding: "2%",
            }}
            type={"FontAwesome"}
          />
        </NoDataFound>
      );
    } else {
      visibleNode = <NoDataFound text={"No Data Found"} />;
    }
    return visibleNode;
  }
  render() {
    // let hide=this.props.setModalVisible
    // console.log("hideeeeeee",hide)
    const { details, addressloader } = this.props;
    return (
      <View style={Styles.mainContainer}>
        {this.getDataNode()}
        {/* <FlatList
          style={{ top: "4%", marginBottom: hp("10%") }}
          data={details}
          keyExtractor={(item) => item.zx_recordid}
          renderItem={({ item }) => (
            <DisplayCard
              dark={false}
              onPress={() => this.onSelectDetail(item)}
              style={{
                backgroundColor: Colors.white,
                borderColor: "#F66A676B",
                borderWidth: 0.5,
                width: wp("80%"),
                height: hp("16%"),
              }}
              // heading={item.order}
              // headstyle={Styles.head}
              // heading1={item.name}
              // head1style={Styles.head1}
              content={[
                <DisplayCardStrip
                  labelStyle={Styles.ttl}
                  valueStyle={Styles.detail}
                  label={"Ship To Code"}
                  value={item.zx_recordid}
                />,
                <DisplayCardStrip
                  labelStyle={Styles.ttl}
                  valueStyle={Styles.detail}
                  label={"Ship To Name"}
                  value={item.zx_contactperson}
                />,
                <DisplayCardStrip
                  labelStyle={Styles.ttl}
                  valueStyle={Styles.detail}
                  label={"Shipping Address"}
                  value={item.zx_address}
                />,
                <DisplayCardStrip
                  labelStyle={Styles.ttl}
                  valueStyle={Styles.detail}
                  label={"City"}
                  value={HelperService.getNameFromSFID(this.getCity(),item.zx_city11)}
                />,
                <DisplayCardStrip
                  labelStyle={Styles.ttl}
                  valueStyle={Styles.detail}
                  label={"Contact Number"}
                  value={item.zx_mobile}
                />,
              ]}
            />
          )}
        /> */}
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    distributor: state.distributor.DistributorList,
    details: state.retailers.customerAddress,
    area: state.distributor.getArea,
    id: state.user.id,
    primaryOrderForm: state.orders.primaryOrderForm,
    addressloader: state.retailers.getCustomerAddressLoader,
    token: state.user.token,
  };
};

const mapDispatchToProps = (dispatch) => ({
  selectDetail: (params) => dispatch(OrdersActions.selectDetail(params)),
  getCustomerAddress: (params) =>
    dispatch(RetailersActions.getCustomerAddress(params)),
  getAllArea: (params) => dispatch(DistributorActions.getAllArea(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddressDetail);

const Styles = StyleSheet.create({
  head: {
    fontSize: 17,
    fontFamily: "Rubik",
    left: hp("1%"),
    fontWeight: "bold",
    color: Colors.background,
    top: hp("0%"),
  },
  head1: {
    fontSize: 13.5,
    fontFamily: "Rubik",
    left: hp("1%"),
    fontWeight: "bold",
    top: hp("0%"),
  },
  ttl: {
    color: Colors.lightGrey,
    fontSize: wp("3%"),
    fontFamily: "Rubik",
    fontWeight: "bold",
    // top: hp("6.5%"),
    left: wp("3%"),
  },
  detail: {
    color: Colors.black,
    fontSize: wp("3%"),
    fontFamily: "Rubik",
    fontWeight: "bold",
    // top: hp("6.5%"),
    left: wp("25%"),
    width: wp("25%"),
  },
});
