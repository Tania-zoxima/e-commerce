import React, { Component } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import BackArrowButton from "App/Components/BackArrowButton";
import { ApplicationStyles, Colors } from "App/Theme";
import { Card } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DetailCard from "../../../Components/DetailCard/DetailCard";
import DetailCardStrip from "../../../Components/DetailCard/DetailCardStrip";
import NavigationService from "App/Services/NavigationService";
import { connect } from "react-redux";
import NoDataFound from "App/Components/NoDataFound";
import Loading from "App/Components/Loading";
import { Tab, Tabs, Icon } from "native-base";
import { HelperService } from "App/Services/Utils/HelperService";
import _ from "lodash";

class PrimaryOrder extends Component {
  getDataNode() {
    let visibleNode = [];

    const { data, loader } = this.props;

    if (data && data.length) {
      visibleNode = (
        <FlatList
          data={data}
          keyExtractor={(item) => item.OrderId}
          //    initialNumToRender={7}
          renderItem={({ item }) => (
            <DetailCard
              dark={false}
              onPress={() => {
                NavigationService.navigate("PrimaryOrderDetails", {
                  record: item,
                });
              }}
              style={{
                backgroundColor: Colors.white,
                borderColor: Colors.darkRedPink,
                borderWidth: 0.2,
                shadowOffset: {
                  width: 15,
                  height: 15,
                },
                shadowOpacity: 20,
                shadowRadius: 10,
                shadowColor: Colors.darkRedPink,
                elevation: 20,
              }}
              heading={"OR-" + item.zx_recordid}
              headstyle={Styles.head}
              date={HelperService.getCurrentDate1(item.zx_orderdate)}
              datestyle={Styles.date}
              month={HelperService.getMonthMappingName(
                HelperService.getCurrentMonth(item.zx_orderdate)
              )}
              monthstyle={Styles.month}
              heading1={item.no}
              head1style={Styles.head1}
              content={[
                <DetailCardStrip
                  label={"Bill To"}
                  value={item.name}
                  labelStyle={Styles.label}
                  valueStyle={Styles.value}
                />,
                <DetailCardStrip
                  label={"Ship To"}
                  value={item.name}
                  labelStyle={Styles.label}
                  valueStyle={Styles.value}
                />,
                <DetailCardStrip
                  label={"Item Class"}
                  value={item.zx_itemclassname}
                  labelStyle={Styles.label}
                  valueStyle={Styles.value}
                />,
                <DetailCardStrip
                  label={"No"}
                  value={item.zx_totalamountofbags}
                  labelStyle={Styles.label}
                  valueStyle={Styles.value}
                />,
                <DetailCardStrip
                  label={"Amount"}
                  value={
                    "₹" +
                    HelperService.FixedDecimalValue(item.zx_totalamountoforder)
                  }
                  labelStyle={Styles.label}
                  valueStyle={Styles.value}
                />,
              ]}
            />
          )}
        />
      );
    } else if (loader) {
      visibleNode = <Loading />;
    } else if (!data || (data && !data.length && !loader)) {
      visibleNode = (
        <NoDataFound text={"No Data found."}>
          <Icon
            name={"refresh"}
            // onPress={() => this.fetchCall()}
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
    const { code, primarySummary } = this.props;
    return (
      <View style={Styles.mainContainer}>
        <Card
          style={
            code.zx_brandgroupcode == "1"
              ? Styles.cardstyle
              : Styles.cardstyleBlue
          }
        >
          <BackArrowButton style={Styles.backarrow} />
          <Text style={Styles.title}>
            {"Primary "}
            <Text style={Styles.titleText}>{"Orders" + ":"}</Text>
            <Text style={Styles.titleText}>
              {primarySummary && !_.isEmpty(primarySummary)
                ? primarySummary.total_orders
                : "0"}
            </Text>
          </Text>
        </Card>
        {this.getDataNode()}
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.user.token,
  data:
    state.dashboard.data.filterOrder.data &&
    state.dashboard.data.filterOrder.data.primary_orders.orders,
  loader: state.dashboard.loaders.filterOrderLoader,
  code: state.user.user_details,
  primarySummary:
    state.dashboard.data.filterOrder.data &&
    state.dashboard.data.filterOrder.data.primary_orders,
});

const mapDispatchToProps = (dispatch) => ({
  getContact: (params) => dispatch(RetailersActions.getContact(params)),
  clearForm: (params) => dispatch(RetailersActions.clearForm(params)),
  selectContactForm: (params) =>
    dispatch(RetailersActions.selectContactForm(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PrimaryOrder);
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
    height: hp("8%"),
  },
  cardstyleBlue: {
    backgroundColor: Colors.bluebackground,
    width: wp("100%"),
    top: hp("-1%"),
    height: hp("8%"),
  },
  backarrow: {
    color: Colors.white,
    fontSize: 25,
    paddingLeft: 7,
    paddingTop: 15,
  },
  title: {
    color: Colors.white,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 28,
    fontWeight: "bold",
    left: wp("23%"),
    top: hp("-3%"),
  },
  titleText: {
    color: Colors.black,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 28,
    fontWeight: "bold",
  },
  head: {
    color: Colors.darkRedPink,
    fontSize: 17,
    textAlign: "center",
  },
  date: {
    color: Colors.darkRedPink,
    fontSize: 37,
    textAlign: "center",
    top: hp("1.5%"),
  },
  month: {
    color: Colors.darkRedPink,
    fontSize: 13,
    textAlign: "center",
    top: hp("1.5%"),
  },
  head1: {
    color: Colors.firozi,
    fontSize: 11,
    fontWeight: "bold",
    textAlign: "center",
  },
  value: {
    color: Colors.black,
    fontSize: 13,
    fontWeight: "bold",
    left: wp("20%"),
    top: hp("2%"),
  },
  label: {
    color: Colors.lightGrey,
    fontSize: 13,
    fontWeight: "bold",
    left: wp("10%"),
    top: hp("2%"),
  },
});
