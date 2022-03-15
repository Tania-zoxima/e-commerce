import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableHighlight,
  TextInput,
  TouchableOpacity,
} from "react-native";
import BackArrowButton from "App/Components/BackArrowButton";
import { ApplicationStyles, Colors } from "App/Theme";
import { Card } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DetailCard from "../../Components/DetailCard/DetailCard";
import DetailCardStrip from "../../Components/DetailCard/DetailCardStrip";
import SearchBar from "App/Components/SearchBar";
import GenericIcon from "App/Components/GenericIcon";
import NavigationService from "App/Services/NavigationService";
import Styles from "./CompetitorInfoStyles";
import { connect } from "react-redux";
import CompetitorActions from "App/Stores/Competitor/Actions";
import { HelperService } from "App/Services/Utils/HelperService";
import NoDataFound from "App/Components/NoDataFound";
import Loading from "App/Components/Loading";
import DatePickerStyles from "App/Components/DatePicker/DatePickerStyles";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Body,
  Input,
  Item,
  Right,
  Segment,
} from "native-base";
import SearchableDropdown from "App/Components/SearchableDropdown";
import DatePicker from "App/Components/DatePicker";
import DistributorActions from "App/Stores/Distributor/Actions";

class CompetitorInfo extends Component {
  constructor() {
    super();
    this.state = {
      timer: null,
    };
  }
  componentDidMount() {
    const { details, agentid, token } = this.props;
    this.fetchCall();
    this.props.resetFilter();
    this.props.resetDateFilter();
    this.props.clearTerritory();
    // this.state.timer = setTimeout(
    //   () =>
    //     this.props.getCompetitorChild({
    //       id: agentid,
    //       token: token,
    //     }),
    // 500
    // );
  }
  fetchCall() {
    const { details, agentid, token } = this.props;

    this.props.getCompetitor({
      id: agentid,
      token: token,
    }),
      this.props.resetFilter();
    this.props.resetDateFilter();
    // this.props.getCompetitor({
    //   id: agentid,
    //   token: token,
    // });
  }
  onDateChange(params) {
    const {
      token,
      agentid,
      searchFilters,
      changeCompetitorSearchFilters,
      searchDashboardOrderFilters,
    } = this.props;
    // console.log("paramssss", params);
    changeCompetitorSearchFilters({
      edited_field: "startDate",
      edited_value: params.selectedStartDate,
    });

    changeCompetitorSearchFilters({
      edited_field: "endDate",
      edited_value: params.selectedEndDate,
    });
    this.props.getCompetitorWithDate({
      id: agentid,
      token: token,
      fromdate: params.selectedStartDate,
      todate: params.selectedEndDate,
    });
  }

  onMonthChange(month) {
    const {
      token,
      agentid,
      searchFilters,
      changeCompetitorSearchFilters,
    } = this.props;

    changeCompetitorSearchFilters({
      edited_field: "selectedMonth",
      edited_value: month,
    });

    let timestamps = HelperService.getMonthStartAndEndDateTimestamp(month);

    changeCompetitorSearchFilters({
      edited_field: "startDate",
      edited_value: timestamps[0],
    });

    changeCompetitorSearchFilters({
      edited_field: "endDate",
      edited_value: timestamps[1],
    });
    this.props.getCompetitorWithDate({
      id: agentid,
      token: token,
    });
  }

  getName() {
    const { name } = this.props;
    let Name = [];
    if (name && name.length) {
      name.map((obj) => {
        if ({ id: obj.zx_competitormasterid, name: obj.zx_recordid }) {
          Name.push({
            id: obj.zx_competitormasterid,
            name: obj.zx_recordid,
          });
        }
      });
    }
    return Name;
  }
  getClassName() {
    const { classname } = this.props;
    let Name = [];
    if (classname && classname.length) {
      classname.map((obj) => {
        if ({ id: obj.zx_itemclassid, name: obj.zx_description }) {
          Name.push({
            id: obj.zx_itemclassid,
            name: obj.zx_description,
          });
        }
      });
    }
    return Name;
  }

  filterResults(list) {
    // console.log("lisstttt",list);
    const { searchFilters, searchCompetitorFilters } = this.props;
    let filteredList = HelperService.sortListFilter(list, "zx_recordno", "DSC");
    filteredList = HelperService.multiFieldSearchText(
      filteredList,
      searchCompetitorFilters["brand"]
    );
    // console.log("ddddddddd", filteredList);
    return filteredList;
  }

  render() {
    const {
      details,
      Approved,
      loader,
      token,
      loading,
      code,
      searchFilters,
      data1,
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
    let visibleNode = [];
    if (details && details.length) {
      let searchedFilteredList = this.filterResults(details);
      // setTimeout(() =>  this.setState({saudaModal:true}), Platform.OS === "ios" ? 200 : 0);
      // console.log("seacrrrrrrrrr", searchedFilteredList);
      if (searchedFilteredList.length) {
        visibleNode = (
          <FlatList
            style={{ height: hp("78%"), top: hp("-9%") }}
            contentContainerStyle={{ paddingBottom: 90, paddingTop: 10 }}
            onRefresh={() => this.fetchCall()}
            showsVerticalScrollIndicator={false}
            refreshing={loading}
            data={searchedFilteredList}
            keyExtractor={(item, index) => item.zx_recordid + index.toString()}
            renderItem={({ item }) => (
              <DetailCard
                dark={false}
                style={{
                  backgroundColor: Colors.white,
                  borderWidth: 0.5,
                  width: wp("89%"),
                  right: wp("1%"),
                  borderColor: "#F66A676B",
                }}
                onPress={() =>
                  NavigationService.navigate("CompetitorDetail", {
                    recordid: item,
                  })
                }
                heading={"CS-" + item.zx_recordno}
                headstyle={Styles.head}
                date={
                  HelperService.getCurrentDate1(item.zx_todate) +
                  "\n" +
                  HelperService.getMonthMappingName(
                    HelperService.getCurrentMonth(item.zx_todate)
                  )
                }
                datestyle={
                  code.zx_brandgroupcode == "1" ? Styles.date : Styles.dateBlue
                }
                // month={item.month}
                // monthstyle={Styles.month}
                // heading1={item.name}
                // head1style={Styles.head1}
                // heading2={item.name1}
                // head2style={Styles.head2}

                content={[
                  <DetailCardStrip
                    labelStyle={Styles.ttl}
                    valueStyle={Styles.detail}
                    label={"Competitor Name"}
                    value={item.competitorName}
                    // value={HelperService.getNameFromSFID(
                    //   this.getName(),
                    //   item.zx_competitorname
                    // )}
                  />,
                  <DetailCardStrip
                    labelStyle={Styles.ttl}
                    valueStyle={Styles.detail}
                    label={"Sales Person Name"}
                    value={item.zx_firstname + " " + item.zx_lastname}
                    // value={HelperService.getNameFromSFID(
                    //   this.getName(),
                    //   item.zx_competitorname
                    // )}
                  />,
                  <DetailCardStrip
                    labelStyle={Styles.ttl}
                    valueStyle={Styles.detail}
                    label={"State Head Name"}
                    value={
                      item.stateHeadfirstname + " " + item.stateHeadlastname
                    }
                    // value={HelperService.getNameFromSFID(
                    //   this.getName(),
                    //   item.zx_competitorname
                    // )}
                  />,
                  <DetailCardStrip
                    labelStyle={Styles.ttl}
                    valueStyle={Styles.detail}
                    label={"Category"}
                    value={item.zx_itemclasscode}
                    // value={HelperService.getNameFromSFID(
                    //   this.getClassName(),
                    //   item.zx_class
                    // )}
                  />,
                  <DetailCardStrip
                    labelStyle={Styles.ttl}
                    valueStyle={Styles.detail}
                    label={"From"}
                    value={HelperService.dateReadableFormat(item.zx_fromdate)}
                  />,
                  <DetailCardStrip
                    labelStyle={Styles.ttl}
                    valueStyle={Styles.detail}
                    label={"To"}
                    value={HelperService.dateReadableFormat(item.zx_todate)}
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
    } else if (details && !details.length && !loading) {
      visibleNode = <NoDataFound text={"No Data Found"} />;
    } else {
      visibleNode = (
        <View
          style={{
            justifyContent: "center",
            alignSelf: "center",
            top: hp("5%"),
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
    }

    return (
      <View style={Styles.mainContainer}>
        <TouchableHighlight
          style={
            code.zx_brandgroupcode == "1"
              ? Styles.plusIcon
              : Styles.plusIconBlue
          }
          onPress={() => {
            NavigationService.navigate("CompetitorInfoForm"),
              this.props.clearCompetitorForm();
          }}
        >
          <GenericIcon
            name={"add"}
            style={{ color: Colors.white, fontSize: 45, alignSelf: "center" }}
          />
        </TouchableHighlight>

        {/* <View style={{ width: wp("100%") }}>
            <SearchBar
              placeholder={"Search by name"}
              onInputChange={(text) =>
                changeCompetitorSearchFilters({
                  edited_field: "name",
                  edited_value: text,
                })
              }
              onInputSubmit={(text) =>
                changeCompetitorSearchFilters({
                  edited_field: "name",
                  edited_value: text,
                })
              }
              onInputClear={(text) =>
                changeCompetitorSearchFilters({
                  edited_field: "name",
                  edited_value: "",
                })
              }
              value={searchFilters["searchValue"]}
              ContainerStyles={Styles.searchContainer}
            />
          </View> */}
        {data1 && data1.length ? (
          <View style={{ left: wp("28%"), top: hp("-3.5%") }}>
            <TouchableOpacity
              style={{ flexDirection: "row", left: "16%" }}
              onPress={() => NavigationService.navigate("CompetitorFilters")}
            >
              <Text
                style={
                  code.zx_brandgroupcode == "1"
                    ? { fontSize: 15, color: "#F66A67", left: "4%" }
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
          </View>
        ) : (
          []
        )}
        <View
          style={
            details && details.length
              ? { top: hp("-8%"), right: wp("20%") }
              : { top: hp("-5%"), right: wp("20%") }
          }
        >
          {visiblePickerNode}
        </View>

        {visibleNode}
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid: state.user.id,
  details: state.competitor.competitorList.data,
  name: state.competitor.competitorName,
  classname: state.competitor.class,
  searchFilters: state.competitor.searchFilters,
  searchCompetitorFilters: state.competitor.searchCompetitorFilters,
  loading: state.competitor.getCompetitorLoader,
  data1: state.competitor.competitorChildList,
  code: state.user.user_details,
});

const mapDispatchToProps = (dispatch) => ({
  getCompetitor: (params) => dispatch(CompetitorActions.getCompetitor(params)),
  getCompetitorWithDate: (params) =>
    dispatch(CompetitorActions.getCompetitorWithDate(params)),
  getCompetitorName: (params) =>
    dispatch(CompetitorActions.getCompetitorName(params)),
  getClass: (params) => dispatch(CompetitorActions.getClass(params)),
  changeCompetitorSearchFilters: (params) =>
    dispatch(CompetitorActions.changeCompetitorSearchFilters(params)),
  clearCompetitorForm: () => dispatch(CompetitorActions.clearCompetitorForm()),
  getCompetitorChild: (params) =>
    dispatch(CompetitorActions.getCompetitorChild(params)),
  resetFilter: (params) => dispatch(CompetitorActions.resetFilter(params)),
  resetDateFilter: (params) =>
    dispatch(CompetitorActions.resetDateFilter(params)),
  clearTerritory: (params) =>
    dispatch(DistributorActions.clearTerritory(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CompetitorInfo);
