import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  RefreshControl,
} from "react-native";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import GenericIcon from "App/Components/GenericIcon";
import ProgressBar from "../../../Components/ProgressBar";
import CircularProgressBar from "App/Components/CircularProgressBar";
import NavigationService from "App/Services/NavigationService";
import { connect } from "react-redux";
import RetailersActions from "App/Stores/Retailers/Actions";
import NoDataFound from "App/Components/NoDataFound";
import Loading from "App/Components/Loading";
import { Tab, Tabs, Icon } from "native-base";

class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
    };
  }
  componentDidMount() {
    this.fetchCall();
  }
  fetchCall() {
    const { getPayment, token } = this.props;

    this.state.timer = setTimeout(
      () => getPayment({ id: this.props.item.id, token: token }),
      500
    );
    this.state.timer = setTimeout(
      () =>
        this.props.getCustomerInfo({
          token,
          customerId: this.props.item.id,
        }),
      800
    );
  }

  getDataNode() {
    let visibleNode = [];

    const { details, loader } = this.props;

    if (details && details.length) {
      visibleNode = (
        <FlatList
          data={details}
          contentContainerStyle={{ paddingBottom: hp("5%"), paddingTop: 10 }}
          onRefresh={() => this.fetchCall()}
          refreshing={loader}
          keyExtractor={(item) => item.Id}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: "#C1E8E8",
                flexDirection: "row",
                justifyContent: "space-around",
                width: wp(80),
                left: wp(4),
                height: hp(5),
                margin: 4,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  textAlignVertical: "center",
                  left: wp("-7%"),
                  color: Colors.red,
                  width: wp("25%"),
                }}
              >
                {item.zx_itemclasscode}
              </Text>
              <Text
                style={{
                  left: wp("-12%"),
                  top: hp(1.5),
                  alignContent: "flex-end",
                }}
              >
                {item.zx_termdays}
              </Text>
            </View>
          )}
        />
      );
    } else if (loader) {
      visibleNode = <Loading />;
    } else if (!details || (details && !details.length && !loader)) {
      visibleNode = (
        <View
          style={{
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <TouchableOpacity style={{ alignSelf: "center" }}>
            <Text
              style={{
                color: Colors.grey,
                fontFamily: ApplicationStyles.textMsgFont,
                fontSize: wp("4.4%"),
                marginTop: "15%",
                alignSelf: "center",
              }}
            >
              No Data Found
            </Text>
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
          </TouchableOpacity>
        </View>
      );
    } else {
      visibleNode = <NoDataFound text={"No Data Found"} />;
    }
    return visibleNode;
  }

  render() {
    // console.log("analyticsssss", this.props.details);
    var value =
      Number(this.props.info[0] && this.props.info[0].zx_outstandingamount) -
      Number(this.props.info[0] && this.props.info[0].zx_overdueamount);
    var value1 =
      Number(this.props.info[0] && this.props.info[0].zx_outstandingamount) /
      Number(this.props.info[0] && this.props.info[0].zx_creditlimit);
    const { details, loader, data1 } = this.props;
    let id = this.props.item.id;
    let data = this.props.item;
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loader || this.props.getCustomerInfoLoader}
            onRefresh={() => {
              this.fetchCall();
            }}
          />
        }
        style={{top:hp("-6%"), marginBottom: hp("10%") }}
      >
        <View style={{ bottom: hp("40%"), marginTop: hp("45%") }}>
          <View style={styles.container}>
            <Text style={styles.title}>Loyalty Points</Text>
            <GenericIcon name={"emoji-events"} style={styles.icon} />
            <Text style={styles.text}>
              {/* {"100000000"} */}
              {data1[0] && data1[0].zx_loyaltypoints
                ? data1[0].zx_loyaltypoints
                : "NA"}
            </Text>
          </View>
          {(this.props.item &&
            this.props.item.zx_accounttype == "Primary Distributor") ||
          this.props.item.zx_accounttype == "Distributor" ? (
            <View style={styles.container1}>
              <Text style={styles.title}>Credit Info</Text>
              <View style={styles.bar}>
                <ProgressBar progress={value1 ? value1 : "0"} />
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  top: hp("11%"),
                  right: wp("53%"),
                }}
              >
                <GenericIcon
                  name={"circle"}
                  style={{
                    left: wp("55%"),
                    bottom: hp("4.8%"),
                    color: Colors.darkRedPink,
                  }}
                />
                <Text style={styles.text1}>
                  OUTSTANDING AMOUNT {"\n"}{" "}
                  <Text style={styles.value}>
                    ₹{" "}
                    {this.props.info[0] &&
                      this.props.info[0].zx_outstandingamount}{" "}
                  </Text>
                </Text>
                <GenericIcon
                  name={"circle"}
                  style={{
                    left: wp("55%"),
                    bottom: hp("4.8%"),
                    color: Colors.lightPink,
                  }}
                />
                <Text style={styles.text1}>
                  AVAILABLE CREDIT {"\n"}{" "}
                  <Text style={styles.value}> ₹ {value}</Text>
                </Text>
              </View>

              <Text
                style={{
                  marginTop: hp("7%"),
                  fontSize: 9,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                OVERDUE AMOUNT {"\n"}{" "}
                <Text style={{ color: Colors.black }}>
                  ₹ {this.props.info[0] && this.props.info[0].zx_overdueamount}{" "}
                </Text>
              </Text>
            </View>
          ) : (
            []
          )}
          <View
            style={{
              borderColor: Colors.lightGrey,

              borderWidth: 0.8,
              height: hp("28%"),
              marginRight: wp("5%"),
              marginLeft: wp("5%"),
              width: wp("90%"),
              marginTop: hp("3%"),
              marginBottom: hp("1%"),
              elevation: 2,
            }}
          >
            <View
              style={{
                marginBottom: hp("1%"),
                marginLeft: wp("1.5%"),
                marginTop: hp("1%"),
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Sales Overview {"\n"}
                  <Text style={{ fontSize: 10, color: "#ed1b24" }}>
                    (in Lakhs)
                  </Text>
                </Text>

                {/* <Select
                  style={styles.picker}
                  // label={'Select meet type*'}
                  // selected={eventForm.type__c}
                  // list={meetingListType}
                  // onChange={(value) => {
                  //     this.props.changeEventForm({ edited_field: 'type__c', edited_value: value })
                  // }}
                  // editable={selectedEvent.status__c !== 'Approved' ? true : false}
                />
                <Select
                  style={styles.picker}
                  // label={'Select meet type*'}
                  // selected={eventForm.type__c}
                  // list={meetingListType}
                  // onChange={(value) => {
                  //     this.props.changeEventForm({ edited_field: 'type__c', edited_value: value })
                  // }}
                  // editable={selectedEvent.status__c !== 'Approved' ? true : false}
                /> */}
              </View>
            </View>
            <View style={{ marginBottom: hp("7%"), marginLeft: wp("3%") }}>
              <CircularProgressBar />
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "column",

                left: wp("55%"),
                bottom: "139%",
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  marginTop: hp("11%"),
                  fontWeight: "bold",
                }}
              >
                TARGET
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  marginTop: hp("1%"),
                  color: Colors.darkRedPink,
                  fontWeight: "bold",
                }}
              >
                20
              </Text>
              <Text
                style={{
                  fontSize: 12.5,
                  marginTop: hp("1%"),
                  color: Colors.black,
                  fontWeight: "bold",
                }}
              >
                BALANCE
              </Text>
              <Text
                style={{
                  fontSize: 12.5,
                  marginTop: hp("1%"),
                  color: Colors.darkRedPink,
                  fontWeight: "bold",
                }}
              >
                12
              </Text>
            </View>
          </View>
          {this.props.item &&
          this.props.item.zx_accounttype == "Retailer" &&
          details &&
          !details.length ? (
            <TouchableOpacity
              style={{
                // borderRadius: 20,
                height: hp("5.5%"),
                backgroundColor: Colors.background,
                alignSelf: "center",
                width: wp("55%"),
                top: hp("1%"),
              }}
              onPress={() =>
                NavigationService.navigate("CreateCredit", { id: id })
              }
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 13,
                  color: Colors.white,
                  textAlign: "center",
                  textAlignVertical: "center",
                  alignSelf:"center"
                }}
              >
                CREATE PAYMENT TERMS
              </Text>
            </TouchableOpacity>
          ) : (
            []
          )}

          <View style={styles.container2}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.title}>Credit Term Period</Text>

              {this.props.item &&
              this.props.item.zx_accounttype == "Retailer" &&
              details &&
              details.length ? (
                <GenericIcon
                  name={"create"}
                  style={{ fontSize: 25, color: Colors.button, top: hp("1%") }}
                  onPress={() =>
                    NavigationService.navigate("UpdateCredit", {
                      data: this.props.details,
                    })
                  }
                />
              ) : (
                []
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                backgroundColor: Colors.darkRedPink,
                width: wp(80),
                left: wp(4),
                height: hp(6),
                marginBottom: hp(1),
                margin: 4,
                marginTop: hp(5),
              }}
            >
              <Text
                style={{
                  color: Colors.white,
                  textAlignVertical: "center",
                  fontSize: 13,
                  borderRightWidth: 1,
                  width: wp(28),
                  borderColor: Colors.white,
                }}
              >
                ITEM CLASS
              </Text>
              <Text
                style={{
                  color: Colors.white,
                  textAlignVertical: "center",
                  fontSize: 13,

                  borderColor: Colors.white,
                }}
              >
                PAYMENT TERMS DAYS
              </Text>
            </View>

            {this.getDataNode()}
          </View>

          <TouchableOpacity style={styles.container3}>
            <Text
              style={{
                fontSize: 23,
                textAlign: "center",
                color: Colors.darkRedPink,
                fontWeight: "bold",
                top: hp("0.5%"),
                // marginBottom: hp("1.3%"),
              }}
            >
              Complaints
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                borderTopWidth: 0.8,
                borderColor: Colors.lightGrey,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  borderRightWidth: 0.8,
                  borderColor: Colors.lightGrey,
                  width: wp("22%"),
                  height: hp("7.5%"),
                }}
              >
                <Text
                  style={{ fontWeight: "bold", fontSize: 22, left: wp("5%") }}
                >
                  12
                </Text>
                <Text style={{ left: wp("2%"),fontSize: 12 }}>Pending</Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  borderRightWidth: 0.8,
                  borderColor: Colors.lightGrey,
                  width: wp("20%"),
                  height: hp("7.5%"),
                }}
              >
                <Text
                  style={{ fontWeight: "bold", fontSize: 22, left: wp("1%") }}
                >
                  50
                </Text>
                <Text style={{ right: wp("3%"),fontSize: 12  }}>Resolved</Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                }}
              >
                <Text
                  style={{ fontWeight: "bold", fontSize: 22, right: wp("3%") }}
                >
                  20
                </Text>
                <Text style={{ right: wp("3%"),fontSize: 12  }}>WIP</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.user.token,
  details: state.retailers.getPayment,
  loader: state.retailers.getPaymentLoader,
  info: state.retailers.customerInfo,
  data1: state.retailers.customerInfo,
  getCustomerInfoLoader: state.retailers.getCustomerInfoLoader,
});

const mapDispatchToProps = (dispatch) => ({
  getPayment: (params) => dispatch(RetailersActions.getPayment(params)),
  clearForm: (params) => dispatch(RetailersActions.clearForm(params)),
  selectContact: (params) => dispatch(RetailersActions.selectContact(params)),
  selectCreditTerm: (params) =>
    dispatch(RetailersActions.selectCreditTerm(params)),
  getCustomerInfo: (params) =>
    dispatch(RetailersActions.getCustomerInfo(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Analytics);
const styles = StyleSheet.create({
  container: {
    borderWidth: 0.8,
    borderColor: Colors.lightGrey,
    height: hp("14%"),
    marginTop: hp("0%"),
    width: wp("90%"),
    left: wp("5%"),
    elevation: 2,
  },
  container3: {
    borderWidth: 0.8,
    borderColor: Colors.lightGrey,
    height: hp("13%"),
    marginTop: hp("3%"),
    width: wp("90%"),
    left: wp("5%"),
    display: "flex",
    flexDirection: "column",
    elevation: 2,
    marginBottom: hp("4%"),
  },
  title: {
    fontSize: wp(5),
    fontWeight: "bold",
    left: wp("5%"),
    top: hp("1.5%"),
  },
  icon: {
    fontSize: wp(10),
    color: Colors.mustard,
    top: hp("4%"),
    left: wp("15%"),
  },
  text: {
    fontSize: hp(4),
    fontWeight: "bold",
    left: wp("45%"),
    top: hp("-2%"),
    color: Colors.darkRedPink,
  },
  container1: {
    borderWidth: 0.8,
    borderColor: Colors.lightGrey,
    // height: hp("20%"),
    marginTop: hp("3%"),
    width: wp("90%"),
    left: wp("5%"),
    elevation: 2,
  },
  container2: {
    borderWidth: 0.8,
    borderColor: Colors.lightGrey,
    marginTop: hp("3%"),
    width: wp("90%"),
    left: wp("5%"),
    elevation: 2,
  },
  bar: {
    top: hp("3.5%"),
    left: wp("8%"),
  },
  text1: {
    fontSize: 9,
    fontWeight: "bold",
    left: wp("53%"),
    top: hp("-5%"),
    color: Colors.black,
  },
  value: {
    color: Colors.darkRedPink,
  },

  picker: {
    // borderRadius: 100,
    borderColor: "black",
    width: wp("20%"),
    borderWidth: 1,
    // elevation:5,
    backgroundColor: "white",
    // height: hp('2%'),
    marginTop: 5,
    marginBottom: hp("2%"),
    fontSize: wp("2%"),
    justifyContent: "center",
    marginRight: wp("1.5%"),
  },
});
