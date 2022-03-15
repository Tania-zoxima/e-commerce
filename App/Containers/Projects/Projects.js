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
import Styles from "./ProjectStyle";
import { ScrollableTab, TabHeading, Tab, Tabs } from "native-base";
import { ApplicationStyles, Helpers, Images, Metrics, Colors } from "App/Theme";
// import Card from '../../Components/Card/Card';
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
// import Card from '../../Components/Card/Card'
import WhiteButton from "App/Components/WhiteButton";
import { HelperService } from "App/Services/Utils/HelperService";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Card } from "react-native-paper";
import BackArrowButton from "App/Components/BackArrowButton";
import DisplayCard from "../../Components/DisplayCard/DisplayCard";
import DisplayCardStrip from "../../Components/DisplayCard/DisplayCardStrip";
import { connect } from "react-redux";
import Open from "./Open";
import Hold from "./Hold";
import Won from "./Won";
import Lost from "./Lost";
import DatePickerStyles from "App/Components/DatePicker/DatePickerStyles";
import ProjectActions from "App/Stores/Project/Actions";
import DatePicker from "App/Components/DatePicker";

class Projects extends Component {
  componentDidMount() {
    const { token, project, id, searchFilters } = this.props;
    let params = {
      token,
      form: {
        team: id,
        projecttype: [],
        projectPipelinestage: [],
        fromDate: null,
        toDate: null,
      },
    };

    this.props.getProject(params), this.props.resetFilter(), this.onReset();
  }
  componentWillUnmount() {
    this.props.clearProjectApi();
    this.props.clearGetProjectApi()
  }
  onReset() {
    this.props.filter.map((item) => {
      if (item.checked == true) {
        item.checked = false;
      }
    });
  }
  onDateChange(params) {
    const {
      token,
      agentid,
      searchFilters,
      changeProjectSearchFilters,
      searchDashboardOrderFilters,
      id,
    } = this.props;
    changeProjectSearchFilters({
      edited_field: "startDate",
      edited_value: params.selectedStartDate,
    });

    changeProjectSearchFilters({
      edited_field: "endDate",
      edited_value: params.selectedEndDate,
    });
    this.props.getProject({
      token,
      form: {
        team: id,
        projecttype: searchFilters.type,
        projectPipelinestage: searchFilters.stage,
        fromDate: HelperService.dateReadableFormatWithHyphen(
          params.selectedStartDate
        ),
        toDate: HelperService.dateReadableFormatWithHyphen(
          params.selectedEndDate
        ),
      },
    });
  }

  onMonthChange(month) {
    const {
      token,
      agentid,
      searchFilters,
      changeProjectSearchFilters,
    } = this.props;

    changeProjectSearchFilters({
      edited_field: "selectedMonth",
      edited_value: month,
    });

    let timestamps = HelperService.getMonthStartAndEndDateTimestamp(month);

    changeProjectSearchFilters({
      edited_field: "startDate",
      edited_value: timestamps[0],
    });

    changeProjectSearchFilters({
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
      changeProjectSearchFilters,
      searchFilters,
      code,
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
      <View style={Styles.mainContainer}>
        <Card
          style={code.zx_brandgroupcode == "1" ? Styles.card : Styles.cardBlue}
        >
          <BackArrowButton style={Styles.backarrow1} />
          <Text style={{ ...Styles.titleText, top: hp("-3%") }}>
            {"Projects "}
          </Text>

          <SearchBar
            placeholder={"Search..."}
            onInputChange={(text) =>
              changeProjectSearchFilters({
                edited_field: "name",
                edited_value: text,
              })
            }
            onInputSubmit={(text) =>
              changeProjectSearchFilters({
                edited_field: "name",
                edited_value: text,
              })
            }
            onInputClear={(text) =>
              changeProjectSearchFilters({
                edited_field: "name",
                edited_value: "",
              })
            }
            value={searchFilters["searchValue"]}
            ContainerStyles={Styles.searchContainer}
          />
        </Card>
        <TouchableOpacity
          style={
            code.zx_brandgroupcode == "1"
              ? Styles.plusIcon
              : Styles.plusIconBlue
          }
          onPress={() => {
            NavigationService.navigate("NewProject"),
              this.props.clearProjectForm();
          }}
        >
          <Icon
            name={"ios-add"}
            ios={"ios-add"}
            android={"md-add"}
            style={{
              color: Colors.white,
              fontSize: 45,
              alignSelf: "center",
              left: wp("0.5%"),
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            top: hp("2.5%"),
          }}
        >
          <View style={{ right: wp("10%") }}>{visiblePickerNode}</View>
          <View style={{ top: hp("1.5%") }}>
            <TouchableOpacity
              style={{ flexDirection: "row", left: "16%" }}
              onPress={() => NavigationService.navigate("ProjectFilter")}
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
              heading="Hold"
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
              <Hold />
            </Tab>
            <Tab
              heading="Won"
              textStyle={{ color: "#9A9A9A", fontSize: 15 }}
              tabStyle={{ backgroundColor: Colors.white }}
              activeTextStyle={{ color: Colors.black, fontSize: 15 }}
              activeTabStyle={{ backgroundColor: Colors.white }}
            >
              <Won />
            </Tab>
            <Tab
              heading="Lost"
              textStyle={{ color: "#9A9A9A", fontSize: 15 }}
              tabStyle={{ backgroundColor: Colors.white }}
              activeTextStyle={{ color: Colors.black, fontSize: 15 }}
              activeTabStyle={{ backgroundColor: Colors.white }}
            >
              <Lost />
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
    searchFilters: state.project.searchFilters,
    code: state.user.user_details,
    loading: state.project.getProjectLoader,
    project: state.project.getProject,
    filter: state.project.filter,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeProjectSearchFilters: (params) =>
    dispatch(ProjectActions.changeProjectSearchFilters(params)),
  clearProjectForm: (params) =>
    dispatch(ProjectActions.clearProjectForm(params)),
  getProject: (params) => dispatch(ProjectActions.getProject(params)),
  resetFilter: (params) => dispatch(ProjectActions.resetFilter(params)),
  clearProjectApi: (params) => dispatch(ProjectActions.clearProjectApi(params)),
  clearGetProjectApi: (params) => dispatch(ProjectActions.clearGetProjectApi(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Projects);
