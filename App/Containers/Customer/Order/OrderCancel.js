import React, { Component, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
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
import { connect } from "react-redux";
import RetailersActions from "App/Stores/Retailers/Actions";
import DetailCard from "../../../Components/DetailCard/DetailCard";
import DetailCardStrip from "../../../Components/DetailCard/DetailCardStrip";
// import BlueButton from "../../Components/BlueButton";
import DatePicker from "App/Components/DatePicker";
import SearchBar from "App/Components/SearchBar";
import NoDataFound from "App/Components/NoDataFound";
import Loading from "App/Components/Loading";
import NavigationService from "App/Services/NavigationService";
import { Icon, Header, Tab, Tabs } from "native-base";

class OrderCancel extends Component {
  componentDidMount() {
    this.fetchCall();
  }

  fetchCall() {
    const {
      token,
      details,
      fetchRetailerOrders,
      agentid,
      loading,
    } = this.props;

    this.props.fetchRetailerOrders({
      id: this.props.item,
      token,
    });
  }

  searchKeyValueInList(list) {
    // console.log("timmmmmuuuu",list)
    let result = "";
    result = list.filter((obj) => obj.zx_orderstatus == "Cancelled");
    // console.log(result);
    return result;
  }

  getDataNode() {
    let visibleNode = [];

    const {
      token,
      details,
      fetchRetailerOrders,
      agentid,
      loading,
    } = this.props;
    // console.log("anmolllllllllll", details)

    if (details && details.length) {
      let filteredSitesList = this.searchKeyValueInList(
        details.map((obj) => obj)
      );
      if (filteredSitesList && filteredSitesList.length) {
        visibleNode = (
          <FlatList
            style={{ height: hp("45%") }}
            data={filteredSitesList}
            contentContainerStyle={{ paddingBottom: hp("8%"), paddingTop: 10 }}
            keyExtractor={(item) => item.Id}
            onRefresh={() => this.fetchCall()}
            refreshing={loading}
            renderItem={({ item }) => (
              <DetailCard
                dark={false}
                style={{
                  backgroundColor: Colors.white,
                  borderColor: "#F66A676B",
                  borderWidth: 0.5,
                  right: hp("0.5%"),
                  width: wp("85%"),
                  // top:("15%")
                }}
                onPress={() =>
                  NavigationService.navigate("OrderTab", { data: item })
                }
                heading={item.zx_recordid ? "OR-" + item.zx_recordid : "NA"}
                headstyle={Styles.head}
                date={
                  item.zx_orderdate
                    ? HelperService.getCurrentDate1(item.zx_orderdate) +
                      "\n" +
                      HelperService.getMonthMappingName(
                        HelperService.getCurrentMonth(item.zx_orderdate)
                      )
                    : "NA"
                }
                datestyle={Styles.date}
                // month={item.month}
                // monthstyle={Styles.month}
                // heading1={"No.:" + " " + item.zx_navorderno}
                // head1style={Styles.head1}
                heading2={item.name1}
                head2style={Styles.head2}
                content={[
                  <DetailCardStrip
                    labelStyle={Styles.ttl}
                    valueStyle={Styles.detail}
                    label={"Item Class"}
                    value={item.zx_itemclasscode}
                  />,
                  <DetailCardStrip
                    labelStyle={Styles.ttl}
                    valueStyle={Styles.detail}
                    label={"No. of Bags"}
                    value={item.zx_noofbag}
                  />,
                  <DetailCardStrip
                    labelStyle={Styles.ttl}
                    valueStyle={{ ...Styles.detail }}
                    label={"Amount"}
                    value={item.zx_totalamountinctax}
                  />,
                  <DetailCardStrip
                    labelStyle={Styles.ttl}
                    valueStyle={{ ...Styles.detail }}
                    label={"Outstanding QTY"}
                    value={item.zx_totalqty}
                  />,
                ]}
              />
            )}
          />
        );
      } else {
        visibleNode = <NoDataFound text={"No Data Found"} />;
      }
    } else if (loading) {
      visibleNode = <Loading />;
    } else if (!details || (details && !details.length && !loading)) {
      visibleNode = (
        <NoDataFound text={"No Order found."}>
          <GenericIcon
            name={"refresh"}
            show={true}
            onPress={() => this.fetchCall()}
            style={{
              color: Colors.button,
              fontSize: 25,
              alignSelf: "center",
              padding: 10,
              top: "-10%",
            }}
          />
        </NoDataFound>
      );
    }

    return visibleNode;
  }
  // const [data, setdata] = useState([
  //   {
  //       order:"OR-695848",
  //       date: "29",
  //       id: "1",
  //       month: "june 2021",
  //       name:"No.:34587-1788123",

  //       itemClass:"Fittings",
  //       No:"898242",
  //       Amount:"Rs 4494.7",

  //     },

  // ]);

  // fetchCall() {
  //   const { token, details,  fetchRetailerOrders,agentid,loading } = this.props;
  //   let id=this.props.item
  //   console.log("iddd",id)
  //   //  let id=this.props.navigation.state.params
  //   fetchRetailerOrders({ token,

  //       customer_id:id,
  //     });

  // }

  render() {
    return <View>{this.getDataNode()}</View>;
  }
}
const mapStateToProps = (state) => ({
  token: state.user.token,
  details: state.retailers.retailerOrders,
  searchFilters: state.retailers.invoiceSearchFilters,
  loading: state.retailers.fetchRetailerOrdersLoader,
});

const mapDispatchToProps = (dispatch) => ({
  getCustomerInvoice: (params) =>
    dispatch(RetailersActions.getCustomerInvoice(params)),
  fetchRetailerOrders: (params) =>
    dispatch(RetailersActions.fetchRetailerOrders(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(OrderCancel);
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
    // fontSize:28,
    // fontFamily: 'Rubik',
    // color:Colors.background,
    // left:hp('4%'),
    // top:hp('0.5%'),
    // fontWeight:'bold'
    fontSize: 20,
    fontFamily: "Rubik",
    color: Colors.background,
    right: hp("1%"),
    top: hp("1%"),
    textAlign: "center",
    fontWeight: "600",
    position: "relative",
  },
  month: {
    fontSize: 12,
    fontFamily: "Rubik",
    color: Colors.background,
    left: hp("2.8%"),
    fontWeight: "bold",
    top: hp("0%"),
  },
  head: {
    fontSize: 18,
    fontFamily: "Rubik",
    left: hp("1%"),
    fontWeight: "bold",
    color: Colors.background,
  },
  head1: {
    fontSize: 11,
    fontFamily: "Rubik",
    left: hp("2%"),
    fontWeight: "bold",
    top: hp("2%"),
    color: Colors.cardblue,
  },

  ttl: {
    color: Colors.lightGrey,
    fontSize: wp("3.2%"),
    fontFamily: "Rubik",
    fontWeight: "bold",
    top: hp("4.5%"),
    width:wp("30%"),
    left:wp("2%")
  },
  detail: {
    color: Colors.black,
    fontSize: wp("3.2%"),
    fontFamily: "Rubik",
    fontWeight: "bold",
    top: hp("4.5%"),
    width:wp("30%"),
  },
  searchContainer: {
    width: "55%",
    borderRadius: 38,
    paddingTop: 0,
    backgroundColor: "white",
    fontSize: wp("4.8%"),
    fontWeight: "700",
    color: Colors.background,
    height: "14%",
    shadowColor: "#F66A676B",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 30,
    borderBottomColor: Colors.lightGrey,
    top: hp("2%"),
    right: wp("19%"),
  },
});
