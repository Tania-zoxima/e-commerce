import CircularProgressBar from "App/Components/CircularProgressBar";
import Loading from "App/Components/Loading";
import Separator from "App/Components/Separator";
import SingleInfo from "App/Components/SingleInfo";
import DashboardActions from "App/Stores/Dashboard/Actions";
import { HelperService } from "App/Services/Utils/HelperService";
import _ from "lodash";
import { Text, Icon } from "native-base";
import React from "react";
import {
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { FlatList, Dimensions } from "react-native";
import { View } from "react-native";
import { connect } from "react-redux";
import Style from "./DashboardScreenStyle";
import moment from "moment";
import { Colors, ApplicationStyles } from "App/Theme";
import NavigationService from "App/Services/NavigationService";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import SearchableDropdown from "App/Components/SearchableDropdown";
import DatePicker from "App/Components/DatePicker";
import DatePickerStyles from "App/Components/DatePicker/DatePickerStyles";
import GenericIcon from "App/Components/GenericIcon";
const { width, height } = Dimensions.get("window");
import VisitsActions from "App/Stores/Visits/Actions";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

class DailyReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attendanceList: [],
      visitList: [],
      travelList: [],
      visitedAreaList: [],
      timer: null,
    };
  }
  //numberWithCommas = (x) => {
  // return x.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  //}
  fetchCall() {
    const { agentid, token,searchFilters } = this.props;
    (this.state.timer = setTimeout(
      () =>
        this.props.getDashboardSummary({
          token,
          form: {
            userGuid: searchFilters.psm__c?searchFilters.psm__c:agentid,
            userDate: HelperService.getCurrentTimestamp(),
          },
        }),
      500
    )),
      (this.state.timer = setTimeout(
        () =>
          this.onDateChange({
            selectedStartDate: HelperService.getCurrentTimestamp(),
          }),
        700
      ));
    this.props.resetFilter(), this.onReset();
  }

  onReset() {
    this.props.filter.map((item) => {
      if (item.checked == true) {
        item.checked = false;
      }
    });
  }

  filteredData(list) {
    let filteredList = {};
    const { searchFilters } = this.props;

    let selectedPSM = searchFilters["psm__c"];

    if (selectedPSM) {
      if (list[selectedPSM]) {
        filteredList[selectedPSM] = list[selectedPSM];
      }
      return filteredList;
    }

    return list;
  }

  onDateChange(params) {
    const {
      token,
      agentid,
      searchFilters,
      changeSearchFilters,
      searchDashboardOrderFilters,
    } = this.props;
    // console.log("paramssss", params);
    changeSearchFilters({
      edited_field: "startDate",
      edited_value: params.selectedStartDate,
    });

    changeSearchFilters({
      edited_field: "endDate",
      edited_value: params.selectedEndDate,
    });
    this.state.timer = setTimeout(
      () =>
        this.props.getVisitSummary(
          {
            id: searchFilters.psm__c?searchFilters.psm__c:agentid,
            fromdate: params.selectedStartDate,
            todate: params.selectedEndDate,
          },
          token
        ),
      500
    );
    this.state.timer = setTimeout(
      () =>
        this.props.dashboardOrderFilter({
          forms: {
            zx_team: searchFilters.psm__c?searchFilters.psm__c:agentid,
            zx_state: searchDashboardOrderFilters.state,
            zx_substate: searchDashboardOrderFilters.sub,
            zx_district: searchDashboardOrderFilters.district,
            zx_zone: searchDashboardOrderFilters.zone,
            zx_area: searchDashboardOrderFilters.area,
            zx_city: searchDashboardOrderFilters.city,
            zx_brandgroup: searchDashboardOrderFilters.brand,
            zx_itemclass: searchDashboardOrderFilters.itemClass,
            zx_fromdate: HelperService.dateReadableFormatWithHyphen(
              params.selectedStartDate
            ),
            zx_todate: HelperService.dateReadableFormatWithHyphen(
              params.selectedEndDate
            ),
          },
          token,
        }),
      700
    );
  }

  onMonthChange(month) {
    const { token, agentid, searchFilters, changeSearchFilters } = this.props;

    changeSearchFilters({
      edited_field: "selectedMonth",
      edited_value: month,
    });

    let timestamps = HelperService.getMonthStartAndEndDateTimestamp(month);

    changeSearchFilters({
      edited_field: "startDate",
      edited_value: timestamps[0],
    });

    changeSearchFilters({
      edited_field: "endDate",
      edited_value: timestamps[1],
    });

    this.props.getVisitSummary(
      {
        id: agentid,
        fromdate: HelperService.dateReadableFormatWithHyphen(
          params.selectedStartDate
        ),
        todate: HelperService.dateReadableFormatWithHyphen(
          params.selectedStartDate
        ),
      },
      token
    );
  }

  _renderAttendanceRow = ({ item, index }) => {
    return (
      <View
        key={index}
        style={[
          Style.itemContainer,
          { width: width / 3.5 },
          { backgroundColor: item.backgroundColor },
        ]}
      >
        <Text style={Style.itemTitle}>{item.title}</Text>
        <Text
          style={[
            Style.itemTitle2,
            // {
            //   top: item.title === "DAY STARTED AT" ? hp("3.5%") : hp("2%"),
            // },
          ]}
        >
          {item.title2}
        </Text>
        <Text
          style={[
            Style.itemDetail,
            {
              color:
                item.detail === "DAY ENDED AT" ? Colors.black : Colors.white,
            },
            // {
            //   top: item.detail === "DAY ENDED AT" ? hp("0%") : hp("1%"),
            // },
            {
              fontSize:
                item.detail === "DAY ENDED AT" ? wp("2.6%") : wp("2.6%"),
            },
          ]}
        >
          {item.detail}
        </Text>
        <Text style={Style.itemTitle1}>{item.title1}</Text>
        <Text
          style={[
            Style.itemDetail1,
            {
              fontSize:
                item.detail === "DAY ENDED AT" ? wp("2.8%") : wp("2.8%"),
            },
          ]}
        >
          {item.detail1}
        </Text>

        <Image
          source={item.img}
          style={{
            height: 55,
            width: 55,
            // left: wp("9%"),
            alignSelf: "center",
            justifyContent: "center",
            // top: hp("7%"),
            // position: "absolute",
          }}
        />
        {/* <Image
          source={item.img1}
          style={{
            height: hp("6%"),
            width: wp("12%"),
            left: wp("8%"),
             top: hp("17%"),
            // position: "absolute",
          }}
        />
        <Image
          source={item.img2}
          style={{
            height: hp("7.5%"),
            width: wp("15%"),
            left: wp("7%"),
            top: hp("17%"),
            // position: "absolute",
          }}
        /> */}

        {/* {checkSwitch(item.title)} */}
      </View>
    );
  };

  render() {
    const {
      changeSearchFilters,
      searchFilters,
      primarySummary,
      secondarySummary,
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
            {HelperService.getDashboardDisplayDate(
              searchFilters["startDate"],
              searchFilters["endDate"]
            )}
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
        <View style={{ top: hp("1.5%"), height: hp("8%") }}>
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
    const { data, visitSummary, code } = this.props;
    // console.log("daattaaaaaaaaaaaaaaaaddddddddddddddd",data)
    let attendanceArr = [];
    let visitArr = [];
    let travelArr = [];
    let visitedAreaList = [];

    attendanceArr = [
      {
        title: "ATTENDANCE",
        title2:
          data && data[0] && data[0].zx_attendancedate
            ? HelperService.removeTimestringFromDate(data[0].zx_attendancedate)
            : "No Record",
        detail:
          data && data[0] && data[0].zx_attendancetype
            ? data[0].zx_attendancetype
            : "No Record",
        backgroundColor: Colors.pink,
        img: require("../../Assets/Images/checking-attendance.png"),
      },
      {
        title: "DAY STARTED AT",
        title2:
          data &&
          data[0] &&
          data[0].zx_startdaydateandtime &&
          data[0].zx_startdaydateandtime !== "No Record"
            ? HelperService.getTimeFromString(data[0].zx_startdaydateandtime)
            : "No Record",
        detail: "DAY ENDED AT",
        backgroundColor: Colors.mustard,

        detail1:
          data &&
          data[0] &&
          data[0].zx_enddaydateandtime &&
          data[0].zx_enddaydateandtime !== "No Record"
            ? HelperService.getTimeFromString(data[0].zx_enddaydateandtime)
            : "No Record",
        img: require("../../Assets/Images/time.png"),
      },

      {
        title: "TOTAL HRS WORKED",
        backgroundColor: Colors.green,

        detail:
          data[0] && data[0].totalHours ? data[0].totalHours : "No Record",
        img: require("../../Assets/Images/hour.png"),
      },
    ];
    // const pie = {
    //   labels: ["Open", "Complete", "Cancel"],
    //   data: this.getValue(),
    // };
    // const pie = {
    //   labels: ["Swim", "Bike", "Run"],
    //   data: [0.4, 0.6, 0.8]
    // };
    // const chartConfig = {
    //   backgroundGradientFrom: "white",
    //   backgroundGradientFromOpacity: 0,
    //   backgroundGradientTo: "white",
    //   backgroundGradientToOpacity: 0,
    //   color: (opacity = 1) => `rgba(255, 80, 80, ${opacity})`,
    //   strokeWidth: 1, // optional, default 3
    //   barPercentage: 0.5,
    // };

    const chartConfig = {
      backgroundGradientFrom: "#1E2923",
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: "#08130D",
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5,
      useShadowColorFromDataset: false, // optional
    };

    // getValue() {
    //   const { visitSummary } = this.props;
    //   let arr = [];
    //   let open = visitSummary.open ? visitSummary.open : "0";
    //   let completed = visitSummary.completed ? visitSummary.completed : "0";
    //   let cancel = visitSummary.cancelled ? visitSummary.cancelled : "0";
    //   let total = open + completed + cancel;
    //   arr.push(open / total, completed / total, cancel / total);
    //   return arr;
    // }

    const pie1 = [
      {
        name: "Open",
        population: visitSummary.open ? visitSummary.open : 0,
        color: "#ffff99",
        // legendFontColor: "#7F7F7F",
        // legendFontSize: 15,
      },
      {
        name: "Completed",
        population: visitSummary.completed ? visitSummary.completed : 0,
        color: "#b3ffb3",
        // legendFontColor: "#7F7F7F",
        // legendFontSize: 15,
      },
      {
        name: "Cancelled",
        population: visitSummary.cancelled ? visitSummary.cancelled : 0,
        color: "#ff9999",
        // legendFontColor: "#7F7F7F",
        // legendFontSize: 15,
      },
    ];

    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={
              this.props.dashboardSummaryLoader ||
              this.props.loading ||
              this.props.visitSummaryLoader
            }
            onRefresh={() => {
              this.fetchCall();
            }}
          />
        }
      >
        <View style={{ paddingVertical: 15, left: "2%" }}>
          <View style={{ paddingLeft: 10 }}>
            <FlatList
              horizontal={true}
              data={attendanceArr}
              refreshing={this.props.loaders.dashboardSummaryLoader}
              renderItem={this._renderAttendanceRow}
              keyExtractor={(item, index) => index.toString()}
              extraData={this.attendanceList}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => {
                return <View style={{ width: 10 }} />;
              }}
              ListFooterComponent={() => {
                return <View style={{ width: 10 }} />;
              }}
            />
          </View>
        </View>
        <View style={{ left: wp("20%") }}>{visiblePickerNode}</View>
        <TouchableOpacity onPress={() => NavigationService.navigate("VisitSummaryTab")}>
          <View
            style={{
              borderColor: Colors.lightPink,
              borderWidth: 1.5,
              height: hp("25%"),
              marginLeft: wp("6.5%"),
              width: wp(88),
              marginTop: hp(1),
              marginBottom: hp(2),
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                top: hp("2%"),
                left: wp("5%"),
              }}
            >
              Visit Summary
            </Text>
            <View
              style={{
                flexDirection: "row",
                top: hp("1%"),
                position: "absolute",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  top: hp("9%"),
                  left: wp("10%"),
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <GenericIcon
                    name={"circle"}
                    style={{ fontSize: 16, color: "#ffff99", top: hp("0.3%") }}
                    show={true}
                  />
                  <Text style={{ fontSize: 15 }}>
                    Open:{visitSummary.open ? visitSummary.open : "0"}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <GenericIcon
                    name={"circle"}
                    style={{ fontSize: 16, color: "#ff9999", top: hp("0.3%") }}
                    show={true}
                  />
                  <Text style={{ fontSize: 15 }}>
                    Cancelled:
                    {visitSummary.cancelled ? visitSummary.cancelled : "0"}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <GenericIcon
                    name={"circle"}
                    style={{ fontSize: 16, color: "#b3ffb3", top: hp("0.3%") }}
                    show={true}
                  />
                  <Text style={{ fontSize: 15 }}>
                    Completed:
                    {visitSummary.completed ? visitSummary.completed : "0"}
                  </Text>
                </View>
              </View>
              <View
                style={{ position: "absolute", left: wp("35%"), top: hp("2%") }}
              >
                <PieChart
                  data={pie1}
                  width={200}
                  height={150}
                  chartConfig={chartConfig}
                  accessor={"population"}
                  backgroundColor={"transparent"}
                  paddingLeft={"45"}
                  center={[5, 5]}
                  hasLegend={false}
                  avoidFalseZero={true}
                  // absolute
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            left: "40%",
            bottom: hp("2%"),
            top: hp("1%"),
          }}
          onPress={() => NavigationService.navigate("DashboardFilter")}
        >
          <Text
            style={
              code.zx_brandgroupcode == "1"
                ? { fontSize: 15, color: "#ed1b24", left: "4%" }
                : { fontSize: 15, color: "#018EBC", left: "4%" }
            }
          >
            Filter by
          </Text>
          <GenericIcon
            name={"tune"}
            style={
              code.zx_brandgroupcode == "1"
                ? {
                    color: Colors.button,
                    fontSize: 23,
                    paddingRight: 0,
                    left: "10%",
                    top: "0%",
                  }
                : {
                    color: Colors.bluebackground,
                    fontSize: 23,
                    paddingRight: 0,
                    left: "10%",
                    top: "0%",
                  }
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => NavigationService.navigate("PrimaryOrder")}
          style={{
            height: hp(15),
            borderRadius: 12,
            marginLeft: wp("6%"),
            width: wp(88),
            marginBottom: hp(2),
            top: hp("2%"),
            backgroundColor: Colors.orange,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              top: hp("1%"),
            }}
          >
            <Text
              style={{
                fontSize: 22,
                color: Colors.white,
                textAlign: "center",
                left: wp("2%"),
              }}
            >
              Primary Orders
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  left: wp("5%"),
                  top: hp("1%"),
                }}
              >
                <Text style={{ fontSize: 14, color: "#FFFFFFA6" }}>
                  Total Order Value
                </Text>
                <Text style={{ fontSize: 22, color: Colors.white }}>
                  ₹
                  {primarySummary && !_.isEmpty(primarySummary)
                    ? primarySummary.totalamounOfPrimaryOrder == "0"
                      ? "0"
                      : HelperService.FixedDecimalValue(
                          primarySummary.totalamounOfPrimaryOrder
                        )
                    : "0"}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  right: wp("5%"),
                  top: hp("1%"),
                }}
              >
                <Text style={{ fontSize: 14, color: "#FFFFFFA6" }}>
                  Total Bags
                </Text>
                <Text style={{ fontSize: 22, color: Colors.white }}>
                  {primarySummary && !_.isEmpty(primarySummary)
                    ? primarySummary.totalNobagsOfPrimaryOrder
                    : "0"}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => NavigationService.navigate("SecondaryOrder")}
          style={{
            height: hp(15),
            borderRadius: 12,
            marginLeft: wp("6%"),
            width: wp(88),
            marginBottom: hp(2),
            top: hp("2%"),
            backgroundColor: Colors.cardblue,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              top: hp("1%"),
            }}
          >
            <Text
              style={{
                fontSize: 22,
                color: Colors.white,
                textAlign: "center",
                left: wp("2%"),
              }}
            >
              Secondary Orders
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  left: wp("5%"),
                  top: hp("1%"),
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: "#FFFFFFA6",
                  }}
                >
                  Total Order Value
                </Text>
                <Text style={{ fontSize: 22, color: Colors.white }}>
                  ₹
                  {secondarySummary && !_.isEmpty(secondarySummary)
                    ? secondarySummary.totalamounOfPrimaryOrder == "0"
                      ? "0"
                      : HelperService.FixedDecimalValue(
                          secondarySummary.totalamounOfPrimaryOrder
                        )
                    : "0"}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  right: wp("5%"),
                  top: hp("1%"),
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: "#FFFFFFA6",
                  }}
                >
                  Total Bags
                </Text>
                <Text style={{ fontSize: 22, color: Colors.white }}>
                  {secondarySummary && !_.isEmpty(secondarySummary)
                    ? secondarySummary.totalNobagsOfPrimaryOrder
                    : "0"}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* {this.props.visitSummaryloader == true ||
        this.props.primarySummaryloader == true ||
        this.props.secondarySummaryloader ? (
          <Loading />
        ) : null} */}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid: state.user.id,
  isASM: state.user.isASM,
  psmList: state.user.psmList.concat([{ id: "", name: "All" }]),
  searchFilters: state.dashboard.searchFilters,
  data: state.dashboard.data.dashboardSummary,
  loaders: state.dashboard.loaders,
  userGuid: state.user.id,
  visitSummary: state.visits.visitSummary,
  visitSummaryloader: state.visits.visitSummaryLoader,
  primarySummary:
    state.dashboard.data.filterOrder.data &&
    state.dashboard.data.filterOrder.data.primary_orders,
  primarySummaryloader: state.dashboard.loaders.primarySummaryLoader,
  secondarySummary:
    state.dashboard.data.filterOrder.data &&
    state.dashboard.data.filterOrder.data.secondary_orders,
  secondarySummaryloader: state.dashboard.loaders.secondarySummaryLoader,
  code: state.user.user_details,
  searchDashboardOrderFilters: state.dashboard.searchDashboardOrderFilters,
  dashboardSummaryLoader: state.dashboard.loaders.dashboardSummaryLoader,
  loading: state.dashboard.loaders.filterOrderLoader,
  filter: state.dashboard.filter,
});

const mapDispatchToProps = (dispatch) => ({
  changeSearchFilters: (params) =>
    dispatch(DashboardActions.changeDashboardSearchFilters(params)),
  // getOrderValue: (params) => dispatch(DashboardActions.getOrderValue(params)),
  getVisitCount: (params) => dispatch(DashboardActions.getVisitCount(params)),
  getSiteCount: (params) => dispatch(DashboardActions.getSiteCount(params)),
  getCounters: (params) => dispatch(DashboardActions.getCounters(params)),
  getEventCount: (params) => dispatch(DashboardActions.getEventCount(params)),
  getDashboardSummary: (params) =>
    dispatch(DashboardActions.getDashboardSummary(params)),
  getVisitSummary: (params) => dispatch(VisitsActions.getVisitSummary(params)),
  getPrimarySummary: (params) =>
    dispatch(DashboardActions.getPrimarySummary(params)),
  getSecondarySummary: (params) =>
    dispatch(DashboardActions.getSecondarySummary(params)),
  dashboardOrderFilter: (params) =>
    dispatch(DashboardActions.dashboardOrderFilter(params)),
  resetFilter: (params) => dispatch(DashboardActions.resetFilter(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DailyReport);
const Styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.white,
    borderBottomWidth: 0,
    height: hp("11%"),
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    paddingTop: hp("2%"),
    elevation: 2,
  },
  datePicker: {
    alignSelf: "center",
    backgroundColor: Colors.button,
    borderRadius: 100,
    flexDirection: "row",
    width: wp("43%"),
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  monthPicker: {
    alignSelf: "center",
    backgroundColor: Colors.button,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    width: wp("25%"),
  },
  dateText: {
    fontFamily: ApplicationStyles.textMediumFont,
    color: Colors.white,
    fontSize: wp("3.3%"),
    textTransform: "capitalize",
  },
  dateIcon: {
    color: Colors.white,
    fontSize: wp("7%"),
    marginLeft: 0,
    marginRight: 0,
    zIndex: 2,
    paddingLeft: wp("3%"),
  },
  dateChangeIcon: {
    color: Colors.button,
    alignSelf: "center",
    paddingHorizontal: wp("3%"),
    fontSize: wp("11%"),
  },
  psmPickerStyles: {
    marginTop: -5,
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: "8%",
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 25,
    elevation: 5,
    marginLeft: "5%",
  },
  actionButton: {
    borderWidth: 1.5,
    width: wp("20%"),
    height: 35,
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: Colors.clrF1F9FF,
    marginHorizontal: wp("1.2%"),
  },
  actionButtonText: {
    fontSize: wp("3%"),
    fontFamily: ApplicationStyles.textMediumFont,
  },
  selectedActionButton: {
    borderWidth: 1.5,
    width: wp("20%"),
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: Colors.clrF1F9FF,
    marginHorizontal: wp("1.2%"),
    height: 35,
  },
  refreshIcon: {
    color: Colors.primary,
    fontSize: wp("5%"),
    alignSelf: "center",
    padding: hp("1%"),
    paddingBottom: 0,
    position: "absolute",
    right: wp("3.3%"),
    marginTop: hp("16.5%"),
    zIndex: 2,
  },
  loadingIcon: {
    color: Colors.primary,
    fontSize: wp("6.9%"),
    alignSelf: "center",
    position: "absolute",
    right: wp("5.3%"),
    marginTop: hp("13.2%"),
    zIndex: 2,
  },
});
