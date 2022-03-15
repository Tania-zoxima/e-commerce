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
} from "react-native";
import GenericIcon from "App/Components/GenericIcon";
import ProductActions from "App/Stores/Products/Actions";
import { ScrollableTab, TabHeading, Tab, Tabs } from "native-base";
import { ApplicationStyles, Helpers, Images, Metrics, Colors } from "App/Theme";
import Styles from "./PrimaryStyle";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Body,
  Text,
  Input,
  Item,
  Right,
  Segment,
} from "native-base";
import NavigationService from "App/Services/NavigationService";
import SearchBar from "App/Components/SearchBar";
import WhiteButton from "App/Components/WhiteButton";
import { HelperService } from "App/Services/Utils/HelperService";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Card } from "react-native-paper";
import BackArrowButton from "App/Components/BackArrowButton";
import { connect } from "react-redux";
import DistributorActions from "App/Stores/Distributor/Actions";
import OrdersActions from "App/Stores/Orders/Actions";
import NoDataFound from "App/Components/NoDataFound";
import Loading from "App/Components/Loading";
import DetailCard from "../../../Components/DetailCard/DetailCard";
import DetailCardStrip from "../../../Components/DetailCard/DetailCardStrip";

export class Cancel extends Component {
  // componentDidMount() {
  //   this.fetchCall();
  // }
  fetchCall() {
    const { id, token } = this.props;
    this.props.getGoodReturn({
      id: id,
      type: "Primary Order Return",
      token,
    });
    this.props.resetDateFilter();
  }

  searchKeyValueInList(list) {
    let result = "";
    result = list.filter((obj) => obj.zx_returnorderstatus == "Canceled");
    // console.log(result);
    return result;
  }

  filterResults(list) {
    const { searchFilters } = this.props;
    let filteredList = [];
    filteredList = HelperService.searchTextListFilter(
      list,
      "zx_recordid",
      searchFilters["name"]
    );
    filteredList = HelperService.sortListFilter(
      filteredList,
      "zx_recordid",
      "DSC"
    );

    return filteredList;
  }

  render() {
    const {
      changeGoodReturnSearchFilters,
      searchFilters,
      code,
      data,
      loading,
    } = this.props;
    let visibleNode = [];
    if (data && data.length) {
      let filteredSitesList = this.searchKeyValueInList(data.map((obj) => obj));
      if (filteredSitesList && filteredSitesList.length) {
        let searchedFilteredList = this.filterResults(filteredSitesList);
        // console.log("seacrrrrrrrrr", searchedFilteredList);
        if (searchedFilteredList.length) {
          visibleNode = (
            <FlatList
              style={{ height: hp("60%"), top: "1%" }}
              data={searchedFilteredList}
              contentContainerStyle={{
                paddingBottom: hp("10%"),
                paddingTop: 10,
              }}
              keyExtractor={(item) => item.id}
              onRefresh={() => this.fetchCall()}
              // ListFooterComponent={this.renderFooter}
              refreshing={loading}
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
                    NavigationService.navigate("PrimaryLines", {
                      record: item,
                    });
                  }}
                  heading={
                    item.zx_recordid ? "RPOR-" + item.zx_recordid : "RPOR-NA"
                  }
                  headstyle={
                    code.zx_brandgroupcode == "1"
                      ? Styles.head
                      : Styles.headBlue
                  }
                  // status={item.zx_ordertype2 ? item.zx_ordertype2 : "NA"}
                  // Stylestatus={Styles.status}
                  // statusStyle={Styles.status1}
                  // onPressstatus={() =>
                  //   NavigationService.navigate("OrderDetails", { data: item })
                  // }
                  // date={
                  //   item.zx_returndate
                  //     ? HelperService.getCurrentDate1(item.zx_returndate)
                  //     : "NA"
                  // }
                  // datestyle={
                  //   code.zx_brandgroupcode == "1"
                  //     ? Styles.date
                  //     : Styles.dateBlue
                  // }
                  // month={
                  //   item.zx_returndate
                  //     ? HelperService.getMonthMappingName(
                  //         HelperService.getCurrentMonth(item.zx_returndate)
                  //       )
                  //     : "NA"
                  // }
                  // monthstyle={
                  //   code.zx_brandgroupcode == "1"
                  //     ? Styles.month
                  //     : Styles.monthBlue
                  // }
                  // heading1={"No.:" + " " + item.zx_navorderno}
                  // head1style={Styles.head1}
                  // heading2={item.name1}
                  // head2style={Styles.head2}
                  content={[
                    <DetailCardStrip
                      labelStyle={Styles.ttl}
                      valueStyle={Styles.detail}
                      label={"Return Date"}
                      // value={"A B Mauri Pvt.Ltd. abcfdg"}
                      value={HelperService.dateReadableFormat(
                        item.zx_returndate
                      )}
                    />,
                    <DetailCardStrip
                      labelStyle={Styles.ttl}
                      valueStyle={Styles.detail}
                      label={"Distributor"}
                      // value={"A B Mauri Pvt.Ltd. abcfdg"}
                      value={item.returnfromName ? item.returnfromName : "NA"}
                    />,
                    <DetailCardStrip
                      labelStyle={Styles.ttl}
                      valueStyle={Styles.detail}
                      label={"Location"}
                      value={item.location_name ? item.location_name : "NA"}
                      // value={HelperService.getNameFromSFID(
                      //   this.getclass(),
                      //   this.getData(item.Id)
                      // )}
                    />,
                    <DetailCardStrip
                      labelStyle={Styles.ttl}
                      valueStyle={Styles.detail}
                      label={"Transporter"}
                      value={
                        item.transporter_transportername
                          ? item.transporter_transportername
                          : "NA"
                      }
                      // value={this.getData1(item.Id)}
                    />,
                    <DetailCardStrip
                      labelStyle={Styles.ttl}
                      valueStyle={Styles.detail}
                      label={"Remarks"}
                      value={item.zx_remarks ? item.zx_remarks : "NA"}
                      // value={this.getData1(item.Id)}
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
    } else if (loading) {
      visibleNode = <Loading />;
    } else if (data && !data.length && !loading) {
      visibleNode = <NoDataFound text={"No Data Found"} />;
    }
    return (
      <View>
        {/* <Loader loading={loading} /> */}
        {visibleNode}
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    id: state.user.id,
    code: state.user.user_details,
    data: state.orders.goodReturn,
    loading: state.orders.goodReturnLoader,
    searchFilters: state.orders.goodReturnFilters,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getGoodReturn: (params) => dispatch(OrdersActions.getGoodReturn(params)),
  changeGoodReturnSearchFilters: (params) =>
    dispatch(OrdersActions.changeGoodReturnSearchFilters(params)),
  resetDateFilter: (params) => dispatch(OrdersActions.resetDateFilter(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Cancel);