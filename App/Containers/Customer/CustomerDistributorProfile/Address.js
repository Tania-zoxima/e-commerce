import React, { Component } from "react";
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
// import DetailCard from "../../../Components/DetailCard/DetailCard";
// import DetailCardStrip from "../../../Components/DetailCard/DetailCardStrip";
import DetailCard from "../../../Components/DetailCard/DetailCard";
import DetailCardStrip from "../../../Components/DetailCard/DetailCardStrip";
import DatePicker from "App/Components/DatePicker";
import { Tab, Tabs, Icon } from "native-base";
import ShippingAddress from "../Address/ShippingAddress";
import BillingAddress from "../Address/BillingAddress";
import NavigationService from "App/Services/NavigationService";
import { connect } from "react-redux";
import RetailersActions from "App/Stores/Retailers/Actions";
import NoDataFound from "App/Components/NoDataFound";
import Loading from "App/Components/Loading";
import DistributorActions from "App/Stores/Distributor/Actions";

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
    };
  }
  componentDidMount() {
    const { token } = this.props;
    // this.props.clearForm();
    // console.log("hhhhhhhhhhhhhhhhh", this.props.item.accountid);
    this.fetchCall();
    // this.state.timer = setTimeout(
    //   () =>
    //     this.props.getAllArea({
    //       token:
    //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhME85RDAwMDAwMWtGazRVQUUiLCJpYXQiOjE2MTM3Mzc5NjF9.55TGMfE5X4DcIWiOtHvcq6mbzkZNQT-aH526mWEDAIc",
    //     }),
    //   3000
    // );
  }

  onSelectContact(params) {
    let id = this.props.item.id;

    NavigationService.navigate("CreateAddress", { id: id, show: false });
    this.props.selectContact(params);
  }

  getPincode() {
    const { area } = this.props;
    let pincode = [];
    if (area && area.length) {
      area.map((obj) => {
        if (obj.zx_level == 6) {
          pincode.push({
            id: obj.zx_salesterritoryid,
            name: obj.zx_territoryname,
          });
        }
      });
    }
    return pincode;
  }

  getState() {
    const { area } = this.props;
    let pincode = [];
    if (area && area.length) {
      area.map((obj) => {
        if (obj.zx_level == 2) {
          pincode.push({
            id: obj.zx_salesterritoryid,
            name: obj.zx_territoryname,
          });
        }
      });
    }
    return pincode;
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

  fetchCall() {
    const { getCustomerAddress, token } = this.props;

    getCustomerAddress({
      token,
      form: {
        customerId: this.props.item.id,
      },
    });
    this.props.clearTerritory()
  }
  getDataNode() {
    let visibleNode = [];

    const { details, addressloader } = this.props;

    if (details && details.length) {
      visibleNode = (
        <FlatList
          style={{ height: hp("50%") }}
          data={details}
          contentContainerStyle={{ paddingBottom: hp("8%"), paddingTop: 10 }}
          onRefresh={() => this.fetchCall()}
          refreshing={addressloader}
          keyExtractor={(item) => item.zx_recordid}
          renderItem={({ item }) => (
            <DetailCard
              dark={false}
              // onPress={() => {
              //   this.onSelectContact(item);
              // }}
              style={{
                backgroundColor: Colors.white,
                borderColor: "#F66A676B",
                borderWidth: 0.5,
                width: wp("85%"),
                height: hp("25%"),
              }}
              heading={item.zx_recordid}
              headstyle={Styles.head}
              heading1={item.zx_contactperson}
              head1style={Styles.head1}
              icon={"create"}
              callIcon={{
                width: wp("6%"),
                position: "absolute",
                left: wp("70%"),
                // right: wp("0%"),
                top: hp("0%"),
                height: hp("3%"),
                zIndex: 200,
              }}
              onPressicon={() => {
                this.onSelectContact(item);
              }}
              content={[
                <DetailCardStrip
                  labelStyle={Styles.ttl}
                  valueStyle={Styles.detail1}
                  label={"Address"}
                  value={item.zx_address}
                />,
                <DetailCardStrip
                  labelStyle={Styles.ttl}
                  valueStyle={Styles.detail1}
                  label={"City"}
                  value={item.zx_city}
                />,
                <DetailCardStrip
                  labelStyle={Styles.ttl}
                  valueStyle={Styles.detail1}
                  label={"Pin Code"}
                  value={
                    item.zx_postalcode
                  }
                />,
                <DetailCardStrip
                  labelStyle={Styles.ttl}
                  valueStyle={Styles.detail1}
                  label={"Address Type"}
                  value={item.zx_addresstype}
                />,
                // <DetailCardStrip
                //   labelStyle={Styles.ttl}
                //   valueStyle={Styles.detail}
                //   label={"Phone no."}
                //   value={item.zx_city11}
                // />,
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
    let id = this.props.item.id;
    return (
      <View style={{ marginBottom: hp("35%") }}>
        <TouchableOpacity
          style={Styles.plusIcon}
          onPress={() => {
            NavigationService.navigate("CreateAddress", { id: id, show: true });
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
          <View style={Styles.mainContainer}>
            {this.getDataNode()}
            {/* <FlatList
              // style={{ top: "4%", marginBottom:hp('10%') }}
              data={data}
              contentContainerStyle={{
                paddingBottom: hp("40%"),
                paddingTop: 10,
              }}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <DetailCard
                  dark={false}
                  // onPress={() => NavigationService.navigate("VisitApprovalTuple")}
                  style={{
                    backgroundColor: Colors.white,
                    borderColor: "#F66A676B",
                    borderWidth: 0.5,
                    width: wp("89%"),
                    height: hp("19%"),
                  }}
                  heading={item.order}
                  headstyle={Styles.head}
                  heading1={item.name}
                  head1style={Styles.head1}
                  content={[
                    <DetailCardStrip
                      labelStyle={Styles.ttl}
                      valueStyle={Styles.detail}
                      label={"Address"}
                      value={item.address}
                    />,
                    <DetailCardStrip
                      labelStyle={Styles.ttl}
                      valueStyle={Styles.detail}
                      label={"City"}
                      value={item.city}
                    />,
                    <DetailCardStrip
                      labelStyle={Styles.ttl}
                      valueStyle={Styles.detail}
                      label={"Contact"}
                      value={item.contact}
                    />,
                  ]}
                />
              )}
            /> */}
          </View>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.user.token,
  details: state.retailers.customerAddress,
  addressloader: state.retailers.getCustomerAddressLoader,
  area: state.distributor.getArea,
});

const mapDispatchToProps = (dispatch) => ({
  getCustomerAddress: (params) =>
    dispatch(RetailersActions.getCustomerAddress(params)),
  clearForm: (params) => dispatch(RetailersActions.clearForm(params)),
  getAllArea: (params) => dispatch(DistributorActions.getAllArea(params)),
  selectContact: (params) => dispatch(RetailersActions.selectContact(params)),
  clearTerritory: (params) => dispatch(DistributorActions.clearTerritory(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Address);
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
    position:"absolute"
  },
  head1: {
    fontSize: 19,
    fontFamily: "Rubik",
    left: hp("0%"),
    top: hp("3%"),
    fontWeight: "bold",
    position:"relative"
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
    fontSize: wp("3.2%"),
    fontFamily: "Rubik",
    fontWeight: "bold",
    bottom: hp("1%"),
    top: hp("8%"),
    right: wp("5%"),
    position:"relative"
  },
  detail1: {
    color: Colors.black,
    fontSize: wp("3.2%"),
    fontFamily: "Rubik",
    fontWeight: "bold",
    bottom: hp("1%"),
    left: wp("8%"),
    top: hp("8%"),
    width: wp("35%"),
    position:"relative"
  },
  plusIcon: {
    borderRadius: 50,
    // bottom: 40,
    position: "absolute",
    // left: 10,
    top: hp("30%"),
    left: wp("80%"),
    borderRadius: 50,
    height: 45,
    width: 45,
    backgroundColor: Colors.button,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
});
