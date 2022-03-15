import React, { Component } from "react";
import InputText from "App/Components/FormInput/InputText";

import {
  View,
  Text,
  Image,
  Keyboard,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import Style from "../CustomerList/CustomerScreenStyles";
import { Icon, Input, Button, ListItem, Radio, Left, Right } from "native-base";
import BlueButton from "../../../Components/BlueButton";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { connect } from "react-redux";
import RetailersActions from "App/Stores/Retailers/Actions";
import NavigationService from "App/Services/NavigationService";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";

class DistributorProfileInfo extends React.Component {
  componentDidMount() {
    const { token } = this.props;
    this.props.getCustomerInfo({
      token,
      customerId: this.props.item.id,
    });
  }
  fetchCall() {
    const { token } = this.props;
    this.props.getCustomerInfo({
      token,
      customerId: this.props.item.id,
    });
  }

  render() {
    const { details, token, loader } = this.props;
    // console.log("deetailssspencilllllll", this.props.item);
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loader}
            onRefresh={() => {
              this.fetchCall();
            }}
          />
        }
        style={{marginBottom: hp("40%"),top:hp("-5%") }}
      >
        <View style={{ ...Style.outerView, left: "1.3%" }}>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                marginTop: hp("0.5%"),
              }}
            >
              General
            </Text>
            {this.props.item && this.props.item.zx_accounttype == "Retailer" ? (
              <TouchableOpacity
                style={{
                  borderRadius: 20,
                  height: hp("5%"),
                  backgroundColor: Colors.background,
                  width: wp("30%"),
                  left: wp("30%"),
                }}
                onPress={() =>
                  NavigationService.navigate("RetailerTabScreen", {
                    show: true,
                  })
                }
              >
                <Text
                  style={{
                    fontFamily: "Lato",
                    fontSize: 18,
                    color: Colors.white,
                    textAlign: "center",
                    top: hp("0.8%"),
                  }}
                >
                  Edit Form
                </Text>
              </TouchableOpacity>
            ) : (
              []
            )}
          </View>
          <View style={{ ...Style.textView1 }}>
            <Text style={Style.textStyle}>Customer No./Nav code</Text>
            <Text style={Style.placeholder}>
              {details[0] && details[0].accountnumber
                ? details[0].accountnumber
                : "NA"}
            </Text>
          </View>

          <View style={{ ...Style.textView1 }}>
            <Text style={Style.textStyle}>Name</Text>
            <Text style={Style.placeholder}>
              {details[0] && details[0].zx_firstname
                ? details[0].zx_firstname
                : "NA"}{" "}
              {details[0] && details[0].zx_lastname
                ? details[0].zx_lastname
                : "NA"}
            </Text>
          </View>

          <View style={{ ...Style.textView1 }}>
            <Text style={Style.textStyle}>Firm Name</Text>
            <Text style={Style.placeholder}>
              {details[0] && details[0].name ? details[0].name : "NA"}
            </Text>
          </View>

          <View style={{ ...Style.textView1 }}>
            <Text style={Style.textStyle}>Billing Address Line 1</Text>
            <Text style={Style.placeholder}>
              {details[0] && details[0].address1_line1
                ? details[0].address1_line1
                : "NA"}
            </Text>
          </View>

          <View style={{ ...Style.textView1 }}>
            <Text style={Style.textStyle}>Billing Address Line 2</Text>
            <Text style={Style.placeholder}>
              {details[0] && details[0].address1_line2
                ? details[0].address1_line2
                : "NA"}
            </Text>
          </View>

          <View style={{ ...Style.textView }}>
            <Text style={Style.textStyle}>City/Town</Text>
            <Text style={Style.placeholder}>
              {details[0] && details[0].cityname
                ? details[0].cityname
                : "NA"}
            </Text>
          </View>

          <View style={{ ...Style.textView, left: wp("10%") }}>
            <Text style={Style.textStyle}>District</Text>
            <Text style={Style.placeholder}>
              {details[0] && details[0].districtName
                ? details[0].districtName
                : "NA"}
            </Text>
          </View>

          <View style={{ ...Style.textView }}>
            <Text style={Style.textStyle}>Sub State</Text>
            <Text style={Style.placeholder}>
              {details[0] && details[0].substateName
                ? details[0].substateName
                : "NA"}
            </Text>
          </View>

          <View style={{ ...Style.textView, left: wp("10%") }}>
            <Text style={Style.textStyle}>Pin code</Text>
            <Text style={Style.placeholder}>
              {details[0] && details[0].pincodeName
                ? details[0].pincodeName
                : "NA"}
            </Text>
          </View>

          <View style={{ ...Style.textView }}>
            <Text style={Style.textStyle}>Area</Text>
            <Text style={Style.placeholder}>
              {details[0] && details[0].areaName ? details[0].areaName : "NA"}
            </Text>
          </View>

          <View style={{ ...Style.textView, left: wp("10%") }}>
            <Text style={Style.textStyle}>Zone</Text>
            <Text style={Style.placeholder}>
              {details[0] && details[0].zoneName ? details[0].zoneName : "NA"}
            </Text>
          </View>

          <Text
            style={{ fontSize: 22, fontWeight: "bold", marginTop: hp("3%") }}
          >
            Communication
          </Text>

          <View style={{ ...Style.textView1 }}>
            <Text style={Style.textStyle}>Contact Person</Text>
            <Text style={Style.placeholder}>
              {details[0] && details[0].zx_firstname
                ? details[0].zx_firstname
                : "NA"}{" "}
              {details[0] && details[0].zx_lastname
                ? details[0].zx_lastname
                : "NA"}
            </Text>
          </View>

          <View style={{ ...Style.textView }}>
            <Text style={Style.textStyle}>Mobile No.</Text>
            <Text style={Style.placeholder}>
              {details[0] && details[0].zx_mobile ? details[0].zx_mobile : "NA"}
            </Text>
          </View>

          <View style={{ ...Style.textView, left: wp("10%") }}>
            <Text style={Style.textStyle}>Alternate Mobile No.</Text>
            <Text style={Style.placeholder}>
              {" "}
              {details[0] && details[0].zx_alternatemobileno
                ? details[0].zx_alternatemobileno
                : "NA"}{" "}
            </Text>
          </View>

          <View style={{ ...Style.textView }}>
            <Text style={Style.textStyle}>Phone No.</Text>
            <Text style={Style.placeholder}>
              {details[0] && details[0].zx_mobile ? details[0].zx_mobile : "NA"}
            </Text>
          </View>

          <View style={{ ...Style.textView1 }}>
            <Text style={Style.textStyle}>Email</Text>
            <Text style={Style.placeholder}>
              {details[0] && details[0].emailaddress1
                ? details[0].emailaddress1
                : "NA"}
            </Text>
          </View>

          <Text
            style={{ fontSize: 22, fontWeight: "bold", marginTop: hp("3%") }}
          >
            Tax Information
          </Text>

          <View style={{ ...Style.textView1 }}>
            <Text style={Style.textStyle}>C.S.T No.</Text>
            <Text style={Style.placeholder}>
              {details[0] && details[0].zx_cstno ? details[0].zx_cstno : "NA"}
            </Text>
          </View>

          <View style={{ ...Style.textView1 }}>
            <Text style={Style.textStyle}>L.S.T No.</Text>
            <Text style={Style.placeholder}>
              {details[0] && details[0].zx_lstno ? details[0].zx_lstno : "NA"}
            </Text>
          </View>

          <View style={{ ...Style.textView1 }}>
            <Text style={Style.textStyle}>T.I.N No.</Text>
            <Text style={Style.placeholder}>
              {details[0] && details[0].zx_tinno ? details[0].zx_tinno : "NA"}
            </Text>
          </View>

          <View style={{ ...Style.textView1 }}>
            <Text style={Style.textStyle}>GST No.</Text>
            <Text style={Style.placeholder}>
              {details[0] && details[0].zx_gstno ? details[0].zx_gstno : "NA"}
            </Text>
          </View>

          <View style={{ ...Style.textView1 }}>
            <Text style={Style.textStyle}>PAN No.</Text>
            <Text style={Style.placeholder}>
              {details[0] && details[0].zx_panno ? details[0].zx_panno : "NA"}
            </Text>
          </View>

          {/* <View style={{ ...Style.textView1 }}>
          <Text style={Style.textStyle}>Last Order Date</Text>
          <Text style={Style.placeholder}> {details[0] && details[0].zx_alternatemobileno ? details[0].zx_alternatemobileno : "NA"}</Text> 
        </View>

        <View style={Style.textView}>
          <Text style={Style.textStyle}>DOB</Text>
          <Text style={Style.placeholder} > {details[0] && details[0].zx_alternatemobileno ? details[0].zx_alternatemobileno : "NA"}</Text>
        </View>

        <View style={{ ...Style.textView, left: wp("10%") }}>
          <Text style={Style.textStyle}>Anniversary Date</Text>
          <Text style={Style.placeholder}> {details[0] && details[0].zx_alternatemobileno ? details[0].zx_alternatemobileno : "NA"}</Text> 
        </View>

        <View style={{ ...Style.textView }}>
          <Text style={Style.textStyle}>State</Text>
          <Text style={Style.placeholder}> {details[0] && details[0].zx_state ? details[0].zx_state : "NA"}</Text> 
        </View>

        <View style={{ ...Style.textView, left: wp("10%") }}>
          <Text style={Style.textStyle}>City</Text>
          <Text style={Style.placeholder}> {details[0] && details[0].zx_city ? details[0].zx_city : "NA"}</Text> 
        </View>

        <View style={Style.textView1}>
          <Text style={Style.textStyle}>Postal Code</Text>
          <Text style={Style.placeholder}> {details[0] && details[0].zx_city ? details[0].zx_city : "NA"} </Text> 
        </View>

        <View style={Style.textView1}>
          <Text style={Style.textStyle}>Billing Street</Text>
          <Text
            style={Style.placeholder}> {details[0] && details[0].address1_line1 ? details[0].address1_line1 : "NA"}</Text>
        </View> */}
        </View>
      </ScrollView>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.user.token,
  details: state.retailers.customerInfo,
  loader: state.retailers.getCustomerInfoLoader,
});

const mapDispatchToProps = (dispatch) => ({
  getCustomerInfo: (params) =>
    dispatch(RetailersActions.getCustomerInfo(params)),
  // getDashboardSummary: (params) =>
  //   dispatch(DashboardActions.getDashboardSummary(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DistributorProfileInfo);
