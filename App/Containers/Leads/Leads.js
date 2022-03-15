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
import LeadActions from "App/Stores/Lead/Actions";
import NoDataFound from "App/Components/NoDataFound";
import Loading from "App/Components/Loading";
import Styles from "./LeadStyle";
import DatePicker from "App/Components/DatePicker";
import DatePickerStyles from "App/Components/DatePicker/DatePickerStyles";
class Leads extends Component {
  componentDidMount() {
    this.fetchCall();
  }
  fetchCall() {
    const { details, id, token, searchFilters } = this.props;
    let params = {
      token,
      form: {
        teamid: id,
        leadType: [],
        lead_dealstatus: [],
        fromDate: null,
        toDate: null,
      },
    };
    this.props.getLead(params);
    this.props.resetFilter();
    this.onReset();
  }
  onReset() {
    this.props.filter.map((item) => {
      if (item.checked == true) {
        item.checked = false;
      }
    });
  }
  filterResults(list) {
    const { searchFilters } = this.props;
    let filteredList = [];
    filteredList = HelperService.searchTextListFilter(
      list,
      "name",
      searchFilters["name"]
    );
    filteredList = HelperService.sortListFilter(
      filteredList,
      "zx_recordid",
      "DSC"
    );

    return filteredList;
  }

  onSelectLead(params) {
    NavigationService.navigate("UpdateLead");
    this.props.selectLead(params);
    // this.props.clearUpdateLongForm()
  }
  onDateChange(params) {
    const {
      token,
      agentid,
      searchFilters,
      changeLeadSearchFilters,
      searchDashboardOrderFilters,
      id,
    } = this.props;
    // console.log("paramssss", params);
    changeLeadSearchFilters({
      edited_field: "startDate",
      edited_value: params.selectedStartDate,
    });

    changeLeadSearchFilters({
      edited_field: "endDate",
      edited_value: params.selectedEndDate,
    });
    this.props.getLead({
      token,
      form: {
        teamid: id,
        leadType: searchFilters.type,
        lead_dealstatus: searchFilters.stage,
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
      changeLeadSearchFilters,
    } = this.props;

    changeLeadSearchFilters({
      edited_field: "selectedMonth",
      edited_value: month,
    });

    let timestamps = HelperService.getMonthStartAndEndDateTimestamp(month);

    changeLeadSearchFilters({
      edited_field: "startDate",
      edited_value: timestamps[0],
    });

    changeLeadSearchFilters({
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
      changeLeadSearchFilters,
      searchFilters,
      details,
      loading,
      code,
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
            style={{ height: hp("78%"), top: hp("1%") }}
            contentContainerStyle={{ paddingBottom: 90, paddingTop: 10 }}
            onRefresh={() => this.fetchCall()}
            showsVerticalScrollIndicator={false}
            refreshing={loading}
            data={searchedFilteredList}
            keyExtractor={(item) => item.id}
            //    initialNumToRender={7}
            renderItem={({ item }) => (
              <DisplayCard
                dark={false}
                style={{
                  backgroundColor: Colors.white,
                  borderColor: Colors.lightPink,
                  borderWidth: 1.5,
                  // height: hp("21%"),
                  position: "relative",
                }}
                heading={item.name ? item.name : "NA"}
                Styletitle={Styles.head}
                //   icon={"call"}
                //   callIcon={{
                //     width: wp("15%"),
                // position:"absolute",
                //     // left: wp("67%"),
                //     right:wp("0%"),
                //     top: hp("2%"),
                //     height: hp("5%"),
                //     zIndex: 200,
                //   }}
                icon1={"create"}
                iconStyle={{ marginLeft: wp("5%"), fontSize: 25 }}
                locationIcon={{
                  width: wp("13%"),
                  right: wp("11%"),
                  position: "absolute",
                  marginTop: hp("2.3%"),
                  marginBottom: hp("4%"),
                }}
                status={item.zx_dealstatus}
                Stylestatus={Styles.status}
                iconstyle={{
                  left: wp("3%"),
                  // top: hp("-4%"),
                  backgroundColor: Colors.phoneClr,
                  color: Colors.white,
                  borderRadius: 50,
                  height: hp(4),
                  width: wp(8),
                  padding: 7,
                  fontSize: 18,
                  zIndex: 200,
                }}
                onPresslocation={() => this.onSelectLead(item)}
                content={[
                  <DisplayCardStrip
                    stylettl={Styles.ttl}
                    styledetail={Styles.detail}
                    label={"Opportunity id"}
                    value={item.zx_recordid}
                  />,
                  <DisplayCardStrip
                    stylettl={Styles.ttl}
                    styledetail={Styles.detail}
                    label={"Lead Type"}
                    value={item.zx_type}
                  />,
                  <DisplayCardStrip
                    stylettl={Styles.ttl}
                    styledetail={Styles.detail}
                    label={"Lead Created On"}
                    value={HelperService.dateReadableFormat(
                      item.zx_scheduledeliverydate
                    )}
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
      visibleNode = (
        <NoDataFound text={"No Data found."}>
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
    }

    return (
      <View style={Styles.mainContainer}>
        <Card
          style={code.zx_brandgroupcode == "1" ? Styles.card : Styles.cardBlue}
        >
          <BackArrowButton style={Styles.backarrow1} />
          <Text style={Styles.title}>
            {"My "}
            <Text style={Styles.titleText}>{"Opportunity"}</Text>
          </Text>

          <SearchBar
            placeholder={"Search by name..."}
            onInputChange={(text) =>
              changeLeadSearchFilters({
                edited_field: "name",
                edited_value: text,
              })
            }
            onInputSubmit={(text) =>
              changeLeadSearchFilters({
                edited_field: "name",
                edited_value: text,
              })
            }
            onInputClear={(text) =>
              changeLeadSearchFilters({
                edited_field: "name",
                edited_value: "",
              })
            }
            value={searchFilters["searchValue"]}
            ContainerStyles={Styles.searchContainer}
          />
        </Card>
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
              onPress={() => NavigationService.navigate("LeadFilter")}
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
        {visibleNode}
        <TouchableOpacity
          style={
            code.zx_brandgroupcode == "1"
              ? Styles.plusIcon
              : Styles.plusIconBlue
          }
          onPress={() => {
            NavigationService.navigate("CreateLead");
            this.props.clearForm();
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
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    id: state.user.id,
    searchFilters: state.lead.searchFilters,
    details: state.lead.getLead,
    loading: state.lead.getLeadLoader,
    code: state.user.user_details,
    filter: state.lead.filter,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeLeadSearchFilters: (params) =>
    dispatch(LeadActions.changeLeadSearchFilters(params)),
  getLead: (params) => dispatch(LeadActions.getLead(params)),
  selectLead: (params) => dispatch(LeadActions.selectLead(params)),
  clearForm: (params) => dispatch(LeadActions.clearForm(params)),
  resetFilter: (params) => dispatch(LeadActions.resetFilter(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Leads);
