import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
} from "react-native";
import { connect } from "react-redux";
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
  Spinner,
} from "native-base";
import NavigationService from "App/Services/NavigationService";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import { HelperService } from "App/Services/Utils/HelperService";
import DashboardActions from "App/Stores/Dashboard/Actions";
import GenericIcon from "App/Components/GenericIcon";
import DatePicker from "App/Components/DatePicker";
import WhiteButton from "App/Components/WhiteButton";
import DatePickerStyles from "App/Components/DatePicker/DatePickerStyles";
import SearchableDropdown from "App/Components/SearchableDropdown";
import DashboardTabs from "App/Containers/Dashboard/DashboardTabs";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import _ from "lodash";
import TextTicker from "react-native-text-ticker";
import AutoScroll from "../../Components/AutoScrolling/AutoScrolling";
import ImageSilder from "../../Components/Imageslide/Imageslide";
import Loading from "App/Components/Loading";
import { getDeviceToken } from "react-native-device-info";
import Loader from "../Loader/Loader";
import VisitsActions from "App/Stores/Visits/Actions";

class DashboardLayout extends React.Component {
  componentDidMount() {
    // this.fetchCalls();
  }
  getImageUrl() {
    const { banner } = this.props;
    let imageurl = [];
    if (banner && banner.length) {
      banner.map((obj) => {
        if (obj.zx_url) {
          imageurl.push(obj.zx_url);
        }
      });
    }
    return imageurl;
  }

  getImageUrlLink() {
    const { banner } = this.props;
    let imageurllink = [];
    if (banner && banner.length) {
      banner.map((obj) => {
        if (obj.zx_url) {
          imageurllink.push(obj.zx_url);
        }
      });
    }
    return imageurllink;
  }

  onDateChange(params) {
    const { token, agentid, searchFilters, changeSearchFilters } = this.props;

    changeSearchFilters({
      edited_field: "startDate",
      edited_value: params.selectedStartDate,
    });

    changeSearchFilters({
      edited_field: "endDate",
      edited_value: params.selectedEndDate,
    });

    let requestParams = {
      token,
      agentid,
      startDate: params.selectedStartDate,
      endDate: params.selectedEndDate,
      psm__c: searchFilters["psm__c"],
    };

    this.fetchData(requestParams);
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

    let requestParams = {
      token,
      agentid,
      startDate: timestamps[0],
      endDate: timestamps[1],
      psm__c: searchFilters["psm__c"],
    };

    this.fetchData(requestParams);
  }
  onSoChange(value) {
    const {
      token,
      agentid,
      searchFilters,
      changeSearchFilters,
      getDashboardSummary,
    } = this.props;

    changeSearchFilters({ edited_field: "psm__c", edited_value: value });

    // let requestParams = {
    //   token,
    //   agentid,

    //   psm__c: value,
    // };
    let params = {
      token,
      form: {
        userGuid: value,
        userDate: HelperService.getCurrentTimestamp(),
        // userDate: HelperService.getCurrentTimestamp(),
      },
    };
    getDashboardSummary(params);
    this.onDateChange1({
      selectedStartDate: HelperService.getCurrentTimestamp(),
      value:value
    });
  }
  onDateChange1(params) {
    const {
      token,
      agentid,
      searchFilters,
      changeSearchFilters,
      searchDashboardOrderFilters,
    } = this.props;
    console.log("paramssss", params);
    changeSearchFilters({
      edited_field: "startDate",
      edited_value: params.selectedStartDate,
    });

    changeSearchFilters({
      edited_field: "endDate",
      edited_value: params.selectedEndDate,
    });

    this.props.getVisitSummary(
      {
        id: params.value,
        fromdate: params.selectedStartDate,
        todate: params.selectedEndDate,
      },
      token
    ),
      this.props.dashboardOrderFilter({
        forms: {
          zx_team: params.value,
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
      });
  }
  fetchCall() {
    const { token, agentid, searchFilters, changeSearchFilters } = this.props;
    //console.log(token, agentid, 'QWERTY')

    let requestParams = {
      token,
      agentid,
      psm__c: searchFilters["psm__c"] ? searchFilters["psm__c"] : agentid,
    };

    this.fetchData(requestParams);
    //getSiteCount(params)
    //getCounters(params)
    //getEventCount(params)
  }

  fetchData(params) {
    const {
      getOrderValue,
      getVisitCount,
      getSiteCount,
      getCounters,
      getEventCount,
      getDashboardSummary,
      getDashboardBanner,
    } = this.props;

    getDashboardSummary(params);
    getDashboardBanner(params);
  }

  render() {
    const {
      changeSearchFilters,
      searchFilters,
      children,
      psmList,
      isASM,
      loaders,
      detail,
      banner,
      loader,
      ticker,
      getTicker,
    } = this.props;
    // console.log("bannerrrrr", ticker);

    let monthPickerNode = (
      <View style={Styles.monthPicker}>
        <Text style={Styles.dateText}>
          {HelperService.getMonthMappingName(searchFilters["selectedMonth"])}
        </Text>
      </View>
    );

    let datePickerNode = (
      <View>
        <View style={Styles.datePicker}>
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

    let psmListNode = [];
    if (isASM.length) {
      psmListNode = (
        <View style={{ height: hp("10%"), marginBottom: 0, paddingBottom: 0 }}>
          <SearchableDropdown
            dataSource={psmList}
            placeHolderText={"  Select SE"}
            selectedValue={searchFilters["psm__c"]}
            onChange={(value) => this.onSoChange(value)}
            placeholder={"Type or Select SE"}
            invalid={false}
            customPickerStyles={{ width: wp("90%") }}
            labelStyles={{
              color: Colors.darkRedPink,
              fontFamily: ApplicationStyles.textFont,
              textAlign: "center",
              //   width: "99%",
              //  padding:5,
              fontSize: 16,
              fontWeight: "bold",
              flexDirection: "row",
            }}
          />
        </View>
      );
    }

    return (
      <View>
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: hp("1%"),
            }}
          >
            <View style={{ display: "flex", flexDirection: "column" }}>
              <Title style={{ fontSize: 22, color: "black" }}>
                Hello,{" "}
                {detail && detail.zx_firstname ? detail.zx_firstname : "NA"}!
              </Title>
              <Title style={{ fontSize: 13, color: "#9A9A9A" }}>
                Welcome back to your account
              </Title>
            </View>
            <TouchableOpacity
              onPress={() => NavigationService.navigate("Notifications")}
              style={{ left: wp("5%"), top: hp("1.5%") }}
            >
              <GenericIcon
                name={"notifications"}
                style={
                  detail.zx_brandgroupcode == "1"
                    ? {
                        fontSize: 30,
                        color: Colors.button,
                      }
                    : {
                        fontSize: 30,
                        color: Colors.bluebackground,
                      }
                }
              />
            </TouchableOpacity>
          </View>
          {ticker && ticker.length ? (
            <AutoScroll ticker={ticker[0] && ticker[0].zx_body} />
          ) : (
            []
          )}

          {banner && banner.length ? (
            <ImageSilder
              data={this.getImageUrl()}
              onclick={(index) =>
                Linking.openURL(this.getImageUrlLink().toString())
              }
            />
          ) : (
            []
          )}
          <Header
            style={isASM.length ? { ...Styles.header } : { ...Styles.header }}
          >
            <DashboardTabs />
          </Header>
          <View
            style={{ display: "flex", flexDirection: "row", left: wp("10%") }}
          >
            {psmListNode}
            {/* {visiblePickerNode} */}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid: state.user.id,
  detail: state.user.user_details,
  isASM: state.user.psmList,
  psmList: state.user.psmList.concat([{ id: state.user.id, name: "Self" }]),
  searchFilters: state.dashboard.searchFilters,
  data: state.dashboard.data,
  loaders: state.dashboard.loaders,
  banner:
    state.dashboard.data.dashboardBanner &&
    state.dashboard.data.dashboardBanner.Banners,
  ticker:
    state.dashboard.data.dashboardBanner &&
    state.dashboard.data.dashboardBanner.Ticker,
  // ticker: state.dashboard.data.ticker[0],
  loader: state.dashboard.loaders.tickerLoader,
  dashboardSummaryLoader: state.dashboard.loaders.dashboardSummaryLoader,
  dashboardBannerLoader: state.dashboard.loaders.dashboardBannerLoader,
  fetchAllPsmLoader: state.user.fetchAllPsmLoader,
  loading: state.dashboard.loaders.filterOrderLoader,
  visitSummaryLoader: state.visits.visitSummaryLoader,
  searchDashboardOrderFilters: state.dashboard.searchDashboardOrderFilters,
});

const mapDispatchToProps = (dispatch) => ({
  changeSearchFilters: (params) =>
    dispatch(DashboardActions.changeDashboardSearchFilters(params)),
  getOrderValue: (params) => dispatch(DashboardActions.getOrderValue(params)),
  getVisitCount: (params) => dispatch(DashboardActions.getVisitCount(params)),
  getSiteCount: (params) => dispatch(DashboardActions.getSiteCount(params)),
  getCounters: (params) => dispatch(DashboardActions.getCounters(params)),
  getEventCount: (params) => dispatch(DashboardActions.getEventCount(params)),
  getDashboardSummary: (params) =>
    dispatch(DashboardActions.getDashboardSummary(params)),
  getDashboardBanner: (params) =>
    dispatch(DashboardActions.getDashboardBanner(params)),
  getVisitSummary: (params) => dispatch(VisitsActions.getVisitSummary(params)),
  dashboardOrderFilter: (params) =>
    dispatch(DashboardActions.dashboardOrderFilter(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardLayout);

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
