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

class Contacts extends Component {
  componentDidMount() {
    const { token } = this.props;
    // console.log("hhhhhhhhhhhhhhhhh", this.props.item.id);
    this.fetchCall();
  }

  fetchCall() {
    const { getContact, token } = this.props;

    getContact({
      token,
      form: {
        accoutnid: this.props.item.id,
      },
    });
  }

  onSelectContactForm(params) {
    let id = this.props.item.id;

    NavigationService.navigate("CreateContact", { id: id, show: false });
    this.props.selectContactForm(params);
  }

  getDataNode() {
    let visibleNode = [];

    const { details, addressloader } = this.props;

    if (details && details.length) {
      visibleNode = (
        <FlatList
          style={{ height: hp("50%") }}
          data={details}
          onRefresh={() => this.fetchCall()}
          refreshing={addressloader}
          contentContainerStyle={{ paddingBottom: hp("8%"), paddingTop: 10 }}
          keyExtractor={(item) => item.firstname}
          renderItem={({ item }) => (
            <DetailCard
              dark={false}
              // onPress={() => {
              //   this.onSelectContactForm(item);
              // }}
              style={{
                backgroundColor: Colors.white,
                borderColor: "#F66A676B",
                borderWidth: 0.5,
                width: wp("85%"),
                // minheight: hp("21%"),
              }}
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
                this.onSelectContactForm(item);
              }}
              heading={item.firstname + " " + item.lastname}
              headstyle={Styles.head}
              // heading1={item.lastname}
              // head1style={Styles.head}
              content={[
                <DetailCardStrip
                  labelStyle={Styles.ttl}
                  valueStyle={Styles.detail}
                  label={"Mobile No."}
                  value={item.mobilephone}
                />,
                <DetailCardStrip
                  labelStyle={Styles.ttl}
                  valueStyle={Styles.detail}
                  label={"Alternate Mobile No."}
                  value={item.telephone1}
                />,
                <DetailCardStrip
                  labelStyle={Styles.ttl}
                  valueStyle={Styles.detail}
                  label={"Landline No."}
                  value={item.telephone1}
                />,
                <DetailCardStrip
                  labelStyle={Styles.ttl}
                  valueStyle={Styles.detail}
                  label={"Email"}
                  value={item.emailaddress1}
                />,
                // <DetailCardStrip
                //   labelStyle={Styles.ttl}
                //   valueStyle={Styles.detail}
                //   label={"Address Type"}
                //   value={item.zx_addresstype}
                // />,
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
        <NoDataFound text={"No Contacts found."}>
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
    // console.log("kkkkkkkkkkkk",id)
    return (
      <View style={{ marginBottom: hp("35%"),top:hp("-6%") }}>
        <TouchableOpacity
          style={Styles.plusIcon}
          onPress={() => {
            NavigationService.navigate("CreateContact", { id: id, show: true });
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
  details: state.retailers.getContact,
  addressloader: state.retailers.getContactLoader,
});

const mapDispatchToProps = (dispatch) => ({
  getContact: (params) => dispatch(RetailersActions.getContact(params)),
  clearForm: (params) => dispatch(RetailersActions.clearForm(params)),
  selectContactForm: (params) =>
    dispatch(RetailersActions.selectContactForm(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
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
    height: hp("18%"),
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
    fontSize: 15,
    fontFamily: "Rubik",
    // left: hp("1%"),
    fontWeight: "bold",
    color: Colors.background,
    top: hp("-1%"),
    // width:wp("15%"),
    position: "absolute",
  },
  head1: {
    fontSize: 14,
    fontFamily: "Rubik",
    left: hp("0%"),
    top: hp("0%"),
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
    fontSize: wp("2.5%"),
    fontFamily: "Rubik",
    fontWeight: "bold",
    bottom: hp("1%"),
    top: hp("3%"),
    // right: wp("32%"),
    position: "relative",
    // width:wp("20%")
  },
  detail: {
    color: Colors.black,
    fontSize: wp("2.5%"),
    fontFamily: "Rubik",
    fontWeight: "bold",
    bottom: hp("1%"),
    left: wp("10%"),
    top: hp("3%"),
    position: "relative",
    width:wp("30%"),
    textAlign:"right"
  },
  plusIcon: {
    borderRadius: 50,
    // bottom: 40,
    position: "absolute",
    // left: 10,
    top: hp("35%"),
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
