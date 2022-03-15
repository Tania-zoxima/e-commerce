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
import Open from "./Open";
import Closed from "./Closed";
import Cancel from "./Cancel";
import DatePickerStyles from "App/Components/DatePicker/DatePickerStyles";
import ProjectActions from "App/Stores/Project/Actions";
import DatePicker from "App/Components/DatePicker";

class PrimaryGoodReturn extends Component {
  componentDidMount() {
    const { id, token } = this.props;
    this.props.getGoodReturn({
      id: id,
      type: "Primary Order Return",
      token,
    });
    this.props.resetDateFilter()
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
  fetchCall() {
    const { id, token } = this.props;
    this.props.getGoodReturn({
      id: id,
      type: "Primary Order Return",
      token,
    });
  }
  onDateChange(params) {
    const {
      token,
      agentid,
      searchFilters,
      changeGoodReturnSearchFilters,
      searchDashboardOrderFilters,
      id,
    } = this.props;
    changeGoodReturnSearchFilters({
      edited_field: "startDate",
      edited_value: params.selectedStartDate,
    });

    changeGoodReturnSearchFilters({
      edited_field: "endDate",
      edited_value: params.selectedEndDate,
    });
    this.props.getGoodReturn({
      id: id,
      type: "Primary Order Return",
      token,
      fromdate: params.selectedStartDate,
      todate: params.selectedEndDate,
    });
  }

  onMonthChange(month) {
    const {
      token,
      agentid,
      searchFilters,
      changeGoodReturnSearchFilters,
    } = this.props;

    changeGoodReturnSearchFilters({
      edited_field: "selectedMonth",
      edited_value: month,
    });

    let timestamps = HelperService.getMonthStartAndEndDateTimestamp(month);

    changeGoodReturnSearchFilters({
      edited_field: "startDate",
      edited_value: timestamps[0],
    });

    changeGoodReturnSearchFilters({
      edited_field: "endDate",
      edited_value: timestamps[1],
    });
    // this.props.getCompetitor({
    //   id: agentid,
    //   token: token,
    // });
  }
  render() {
    const {
      changeGoodReturnSearchFilters,
      searchFilters,
      code,
      data,
      loading,
    } = this.props;
    let datePickerNode = (
      <View>
        <View
          style={
            this.props.code.zx_brandgroupcode == "1"
              ? {
                  alignSelf: "center",
                  backgroundColor: Colors.background,
                  borderRadius: 100,
                  flexDirection: "row",
                  width: wp("43%"),
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 8,
                }
              : {
                  alignSelf: "center",
                  backgroundColor: Colors.bluebackground,
                  borderRadius: 100,
                  flexDirection: "row",
                  width: wp("43%"),
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 8,
                }
          }
        >
          <Text style={Styles.dateText}>
            {searchFilters["startDate"]
              ? HelperService.getDashboardDisplayDate(
                  searchFilters["startDate"],
                  searchFilters["endDate"]
                )
              : "Select Date"}
          </Text>
          <GenericIcon
            name={"calendar"}
            show={true}
            style={{
              ...DatePickerStyles.icon,
              ...DatePickerStyles.iconActive,
              ...Styles.dateIcon,
            }}
          />
        </View>
      </View>
    );

    let monthPickerNode = (
      <View style={Styles.monthPicker}>
        <Text style={Styles.dateText}>
          {HelperService.getMonthMappingName(searchFilters["selectedMonth"])}
        </Text>
      </View>
    );
    let visiblePickerNode = [];

    if (searchFilters["selectedDateType"] == "Month") {
      visiblePickerNode = (
        <View style={{ flexDirection: "row", width: wp("35%") }}>
          <TouchableOpacity
            transparent
            onPress={() =>
              this.onMonthChange(
                HelperService.getPreviousMonth(searchFilters["selectedMonth"])
              )
            }
          >
            <Icon
              name={"ios-arrow-back"}
              ios={"ios-arrow-back"}
              android={"md-arrow-dropleft"}
              style={Styles.dateChangeIcon}
            />
          </TouchableOpacity>
          {monthPickerNode}
          <TouchableOpacity
            transparent
            onPress={() =>
              this.onMonthChange(
                HelperService.getNextMonth(searchFilters["selectedMonth"])
              )
            }
          >
            <Icon
              name={"ios-arrow-forward"}
              ios={"ios-arrow-forward"}
              android={"md-arrow-dropright"}
              style={Styles.dateChangeIcon}
            />
          </TouchableOpacity>
        </View>
      );
    } else {
      visiblePickerNode = (
        <View style={{ height: hp("8%") }}>
          <DatePicker
            allowRangeSelection={true}
            selectedStartDate={searchFilters["startDate"]}
            selectedEndDate={searchFilters["endDate"]}
            onDateChange={(params) => this.onDateChange(params)}
          >
            {datePickerNode}
          </DatePicker>
        </View>
      );
    }
    return (
      <View>
        <Card
          style={code.zx_brandgroupcode == "1" ? Styles.card : Styles.cardBlue}
        >
          <BackArrowButton style={Styles.backarrow} />
          <View style={{ top: hp("2%"), right: wp("8%") }}>
            <WhiteButton
              style={Styles.buttons}
              onPress={() => {
                NavigationService.navigate("PlacePrimaryGoodReturn");
              }}
              title={"NEW ORDER"}
              textStyle={Styles.buttontext}
            />
          </View>
          <Text style={{ ...Styles.titleText, left: wp("5%") }}>
            {"Primary "}
            <Text style={{ ...Styles.titleText, ...Styles.textClr }}>
              {"Goods Return"}
            </Text>
          </Text>

          <SearchBar
            placeholder={"Search by no.only(except RPOR-)"}
            onInputChange={(text) =>
              changeGoodReturnSearchFilters({
                edited_field: "name",
                edited_value: text,
              })
            }
            onInputSubmit={(text) =>
              changeGoodReturnSearchFilters({
                edited_field: "name",
                edited_value: text,
              })
            }
            onInputClear={(text) =>
              changeGoodReturnSearchFilters({
                edited_field: "name",
                edited_value: "",
              })
            }
            value={searchFilters["searchValue"]}
            ContainerStyles={Styles.searchContainer}
          />
        </Card>
        <View style={{ right: wp("17%"), top: hp("1%") }}>
          {visiblePickerNode}
        </View>
        <View style={{ height: hp("100%"), top: hp("1%") }}>
          <Tabs
            tabBarUnderlineStyle={
              code.zx_brandgroupcode == "1"
                ? { backgroundColor: Colors.darkRedPink }
                : { backgroundColor: Colors.bluebackground }
            }
          >
            <Tab
              heading="Open"
              textStyle={{ color: "#9A9A9A", fontSize: 15 }}
              tabStyle={{ backgroundColor: Colors.white }}
              activeTextStyle={{ color: Colors.black, fontSize: 15 }}
              activeTabStyle={{ backgroundColor: Colors.white }}
            >
              <Open />
            </Tab>
            <Tab
              heading="Closed"
              textStyle={{
                color: "#9A9A9A",
                fontSize: 15,
                textAlign: "center",
              }}
              tabStyle={{ backgroundColor: Colors.white }}
              activeTextStyle={{
                color: Colors.black,
                fontSize: 15,
                textAlign: "center",
              }}
              activeTabStyle={{ backgroundColor: Colors.white }}
            >
              <Closed />
            </Tab>
            <Tab
              heading="Cancelled"
              textStyle={{ color: "#9A9A9A", fontSize: 15 }}
              tabStyle={{ backgroundColor: Colors.white }}
              activeTextStyle={{ color: Colors.black, fontSize: 15 }}
              activeTabStyle={{ backgroundColor: Colors.white }}
            >
              <Cancel />
            </Tab>
          </Tabs>
        </View>
        
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

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryGoodReturn);
