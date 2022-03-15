import React, { Component } from "react";
import {
  Platform,
  View,
  ActivityIndicator,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
  Text,
} from "react-native";
import GenericIcon from "App/Components/GenericIcon";
import { HelperService } from "../../../Services/Utils/HelperService";

import Styles from "./GetPrimaryOrderStyles";
import DetailCard from "./../../../Components/DetailCard/DetailCard";
import DetailCardStrip from "./../../../Components/DetailCard/DetailCardStrip";
import { connect } from "react-redux";
import DistributorActions from "App/Stores/Distributor/Actions";
import OrdersActions from "App/Stores/Orders/Actions";

import NavigationService from "App/Services/NavigationService";
import { ApplicationStyles, Helpers, Images, Metrics, Colors } from "App/Theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import NoDataFound from "App/Components/NoDataFound";
import Loading from "App/Components/Loading";
import ProductActions from "App/Stores/Products/Actions";
import { Icon, Input, Button } from "native-base";
import WhiteButton from "../../../Components/WhiteButton/WhiteButton";
// import { ValidationService } from "../../Services/ValidationService";
class PendingForApproval extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 50,
      offset: 50,
    };
  }
  componentDidMount() {
    // this.fetchCall();
  }
  // componentWillUnmount(){
  //   this.props.clearSizeForm();
  // }
  getData(item) {
    const { allOrders } = this.props;
    let brandsNode = "";

    if (allOrders && allOrders.length) {
      allOrders.map((obj) => {
        if (obj.orderlines && obj.orderlines.length && obj.Id == item) {
          obj.orderlines.map((obj1) => {
            brandsNode = obj1.zx_itemclass;
          });
        }
      });
    }
    return brandsNode;
  }

  getData1(item) {
    const { allOrders } = this.props;
    let brandsNode = "";

    if (allOrders && allOrders.length) {
      allOrders.map((obj) => {
        if (obj.orderlines && obj.orderlines.length && obj.Id == item) {
          obj.orderlines.map((obj1) => {
            brandsNode = obj1.zx_noofbagspcs;
          });
        }
      });
    }
    return brandsNode;
  }

  getData2(item) {
    const { allOrders } = this.props;
    let brandsNode = "";

    if (allOrders && allOrders.length) {
      allOrders.map((obj) => {
        if (obj.orderlines && obj.orderlines.length && obj.Id == item) {
          obj.orderlines.map((obj1) => {
            brandsNode = obj1.zx_totalamount;
          });
        }
      });
    }
    return brandsNode;
  }

  getData3(item) {
    const { allOrders } = this.props;
    let brandsNode = "";

    if (allOrders && allOrders.length) {
      allOrders.map((obj) => {
        if (obj.orderlines && obj.orderlines.length && obj.Id == item) {
          obj.orderlines.map((obj1) => {
            brandsNode = obj1.zx_qty;
          });
        }
      });
    }
    return brandsNode;
  }

  getclass() {
    const { productClass } = this.props;
    let classname = [];
    if (productClass && productClass.length) {
      productClass.map((obj) => {
        if ({ id: obj.zx_itemclassid, name: obj.zx_itemclasscode }) {
          classname.push({
            id: obj.zx_itemclassid,
            name: obj.zx_itemclasscode,
          });
        }
      });
    }
    return classname;
  }

  getDistributor() {
    const { list, orderForm } = this.props;
    let distributor = [];
    if (list && list.length) {
      list.map((obj) => {
        if (obj.zx_accounttype == "Primary Distributor") {
          distributor.push({
            id: obj.id,
            name: obj.name,
          });
        }
      });
    }
    return distributor;
  }

  //   onSelectDistributor(params) {
  //     NavigationService.navigate("NewDealerScreen", { show: true });
  //     this.props.selectDistributor(params);
  //   }
  fetchCall() {
    const { token, distributor, id, primaryOrderForm, agentid } = this.props;
    let params = {
      token,
      order_id: agentid,
    };
    this.props.fetchAllOrders(params);
  }
  fetchMore() {
    const { token, distributor, id, primaryOrderForm, agentid } = this.props;
    let params = {
      token,
      order_id: agentid,
      offset: this.state.offset,
      limit: this.state.limit,
      show: false,
    };
    this.props.fetchAllOrders(params);
  }
  searchKeyValueInList(list) {
    let result = "";
    result = list.filter((obj) => obj.zx_orderstatus == "Pending For Approval");
    // console.log(result);
    return result;
  }

  filterResults(list) {
    const { searchFilters } = this.props;
    let filteredList = [];

    //  filteredList = HelperService.searchTextListFilter(list, 'area__c', searchFilters['name'])

    filteredList = HelperService.searchTextListFilter(
      list,
      "zx_recordid",
      searchFilters["name"]
    );
    filteredList = HelperService.sortDesc(filteredList, "zx_recordid");

    return filteredList;
  }

  handleMoreLoad() {
    this.setState({ offset: this.state.offset + 50 }, this.fetchMore());
  }

  renderFooter = () => {
    return (
      //Footer View with Load More button
      <View
        style={{
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        {this.props.allOrders &&
        this.props.allOrders.length &&
        this.props.allOrders[0].totalCount > 50 ? (
          this.props.count !== 0 ? (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => this.handleMoreLoad()}
              //On Click of button calling getData function to load more data
              style={{
                padding: 10,
                backgroundColor: "#800000",
                borderRadius: 4,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ color: "white", fontSize: 15, textAlign: "center" }}
              >
                Load More
              </Text>
              {this.props.loader ? (
                <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
              ) : null}
            </TouchableOpacity>
          ) : null
        ) : null}
      </View>
    );
  };

  getDataNode() {
    let visibleNode = [];

    const { allOrders, loader, token, loading, code } = this.props;

    if (allOrders && allOrders.length) {
      let filteredSitesList = this.searchKeyValueInList(
        allOrders.map((obj) => obj)
      );

      if (filteredSitesList && filteredSitesList.length) {
        let searchedFilteredList = this.filterResults(filteredSitesList);
        if (filteredSitesList.length) {
          visibleNode = (
            <FlatList
              style={{ height: hp("57%"), top: "1%" }}
              data={searchedFilteredList}
              contentContainerStyle={{
                paddingBottom: hp("5%"),
                paddingTop: 10,
              }}
              keyExtractor={(item) => item.Id}
              onRefresh={() => this.fetchCall()}
              // ListFooterComponent={this.renderFooter}
              refreshing={loader}
              renderItem={({ item }) => (
                <DetailCard
                  dark={false}
                  style={{
                    backgroundColor: Colors.white,
                    borderColor: "#F66A676B",
                    borderWidth: 1,
                    // right:hp('0.5%'),
                    width: wp("92%"),
                    // height: hp("25%"),
                  }}
                  onPress={() => {
                    NavigationService.navigate("OrderDetails", {
                      data: item,
                    });
                    this.props.clearOrderLine();
                  }}
                  heading={item.zx_recordid ? "POR-" + item.zx_recordid : "NA"}
                  headstyle={
                    code.zx_brandgroupcode == "1"
                      ? Styles.head
                      : Styles.headBlue
                  }
                  status={item.zx_ordertype2 ? item.zx_ordertype2 : "NA"}
                  Stylestatus={Styles.status}
                  statusStyle={Styles.status1}
                  // onPressstatus={() =>
                  //   NavigationService.navigate("OrderDetails", { data: item })
                  // }
                  date={
                    item.zx_orderdate
                      ? HelperService.getCurrentDate1(item.zx_orderdate) +
                        "\n" +
                        HelperService.getMonthMappingName(
                          HelperService.getCurrentMonth(item.zx_orderdate)
                        )
                      : "NA"
                  }
                  datestyle={
                    code.zx_brandgroupcode == "1"
                      ? Styles.date
                      : Styles.dateBlue
                  }
                  // y
                  // heading1={"No.:" + " " + item.zx_navorderno}
                  // head1style={Styles.head1}
                  // heading2={item.name1}
                  // head2style={Styles.head2}
                  content={[
                    <DetailCardStrip
                      labelStyle={Styles.ttl}
                      valueStyle={Styles.detail}
                      label={"Distributor"}
                      // value={"A B Mauri Pvt.Ltd. abcfdg"}
                      value={item.zx_orderfrom_name}
                    />,
                    <DetailCardStrip
                      labelStyle={Styles.ttl}
                      valueStyle={Styles.detail}
                      label={"Item Class"}
                      value={item.zx_description}
                      // value={HelperService.getNameFromSFID(
                      //   this.getclass(),
                      //   this.getData(item.Id)
                      // )}
                    />,
                    <DetailCardStrip
                      labelStyle={Styles.ttl}
                      valueStyle={Styles.detail}
                      label={"No. of Bags"}
                      value={item.zx_noofbag}
                      // value={this.getData1(item.Id)}
                    />,
                    <DetailCardStrip
                      labelStyle={Styles.ttl}
                      valueStyle={{ ...Styles.detail }}
                      label={"Order Value"}
                      value={item.zx_totalamountexctax}
                    />,
                    <DetailCardStrip
                      labelStyle={Styles.ttl}
                      valueStyle={{ ...Styles.detail }}
                      label={"Total QTY"}
                      value={item.zx_totalqty}
                    />,
                  ]}
                />
              )}
            />
          );
        }
      } else {
        visibleNode = <NoDataFound text={"No Data Found"} />;
      }
    } else if (loader) {
      visibleNode = <Loading />;
    } else if (!allOrders || (allOrders && !allOrders.length && !loader)) {
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
            }}
          />
        </NoDataFound>
      );
    }

    return visibleNode;
  }

  render() {
    return <View>{this.getDataNode()}</View>;
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    agentid: state.user.id,
    distributor: state.distributor.DistributorList,
    loader: state.orders.fetchAllOrdersLoader,
    loading: state.distributor.getDistributorLoader,
    submitValidation: state.distributor.submitDistributorFormValidation,
    allOrders: state.orders.allOrders,
    list: state.retailers.retailersList.list,
    primaryOrderForm: state.orders.primaryOrderForm,
    productClass: state.products.ItemList && state.products.ItemList,
    searchFilters: state.orders.orderSearchFilters,
    code: state.user.user_details,
    count: state.orders.count.count,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getDistributor: (params) =>
    dispatch(DistributorActions.getDistributor(params)),
  selectDistributor: (params) =>
    dispatch(DistributorActions.selectDistributor(params)),
  clearDistributorForm: () =>
    dispatch(DistributorActions.clearDistributorForm()),
  sendApproval: (params) => dispatch(DistributorActions.sendApproval(params)),
  submitDistributorFormValidationFailed: (params) =>
    dispatch(DistributorActions.submitDistributorFormValidationFailed(params)),
  changeDistributorSearchFilters: (params) =>
    dispatch(DistributorActions.changeDistributorSearchFilters(params)),
  fetchAllOrders: (params) => dispatch(OrdersActions.fetchAllOrders(params)),
  changeOrderSearchFilters: (params) =>
    dispatch(OrdersActions.changeOrderSearchFilters(params)),
  clearSizeForm: (params) => dispatch(ProductActions.clearSizeForm(params)),
  clearOrderLine: (params) => dispatch(OrdersActions.clearOrderLine(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PendingForApproval);
const Style = StyleSheet.create({
  status: {
    color: Colors.white,
    zIndex: 1002,
    width: wp("26%"),
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: 8,
    backgroundColor: "#D7561EB3",
    borderRadius: 5,
    top: hp("1%"),
    height: hp("2%"),
    textAlign: "center",
    marginLeft: wp("15%"),
    textAlign: "right",
    justifyContent: "flex-end",
  },
});
