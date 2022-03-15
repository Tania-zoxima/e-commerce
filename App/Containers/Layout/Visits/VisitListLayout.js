import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
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
  Badge,
  Spinner,
} from "native-base";
import NavigationService from "App/Services/NavigationService";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import { HelperService } from "App/Services/Utils/HelperService";
import VisitsActions from "App/Stores/Visits/Actions";
import GenericIcon from "App/Components/GenericIcon";
import SearchBar from "App/Components/SearchBar";
import DatePicker from "App/Components/DatePicker";
import DatePickerStyles from "App/Components/DatePicker/DatePickerStyles";
import SearchableDropdown from "App/Components/SearchableDropdown";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import _ from "lodash";
import CommonActions from "App/Stores/Common/Actions";
import { Card } from "react-native-paper";

class VisitListLayout extends React.Component {
  componentDidMount() {
    const {
      changeSearchFilters,
      agentid,
      getAreaPjp,
      token,
      searchFilters,
    } = this.props;

    this.onDateChange({
      selectedStartDate: HelperService.getCurrentTimestamp(),
    });

    changeSearchFilters({ edited_field: "psm__c", edited_value: agentid });
  }

  onDateChange(params) {
    const {
      changeSearchFilters,
      getVisitsDisplayList,
      token,
      agentid,
      searchFilters,
      getAreaPjp,
      businessChannel,
    } = this.props;

    changeSearchFilters({
      edited_field: "startDate",
      edited_value: params.selectedStartDate,
    });

    changeSearchFilters({
      edited_field: "endDate",
      edited_value: params.selectedStartDate,
    });
    // this.fetchVisitsDisplayListCall();
    getVisitsDisplayList({
      token: token,
       agentid:  agentid,
      startDate: params.selectedStartDate,
      endDate: params.selectedStartDate,
    });

    getVisitsDisplayList({
      token: token,
      agentid: searchFilters["psm__c"] || agentid,
      startDate: params.selectedStartDate,
      endDate: params.selectedStartDate,
    });
  }

  fetchVisitsDisplayListCall() {
    const {
      token,
      agentid,
      searchFilters,
      fetchVisitsDisplayList,
    } = this.props;

    fetchVisitsDisplayList({
      token: token,
      agentid: agentid,
      startDate: searchFilters["startDate"],
      endDate: searchFilters["endDate"],
      agentid: searchFilters["psm__c"],
    });
  }

  onFilterChange(value) {
    const {
      changeSearchFilters,
      getVisitsDisplayList,
      searchFilters,
      token,
      getAreaPjp,
      businessChannel,
    } = this.props;

    changeSearchFilters({
      edited_field: "psm__c",
      edited_value: value,
    });

    getVisitsDisplayList({
      token: token,
      startDate: searchFilters["startDate"],
      endDate: searchFilters["endDate"],
      agentid: value,
    });
  }

  render() {
    const {
      searchFilters,
      visitCount,

      children,
      psmList,
      isASM,
      agentAreaPjp,
      loader,
      agentBeatPjp,
      isManager,
      agentAreas,
      code,
    } = this.props;

    let datePickerNode = (
      <View style={Styles.datePicker}>
        <Text
          style={
            code.zx_brandgroupcode == "1"
              ? Styles.dateText
              : Styles.dateTextBlue
          }
        >
          {HelperService.getVisitsDisplayDate(searchFilters["startDate"])}
        </Text>

        <GenericIcon
          name={"calendar"}
          show={true}
          style={
            code.zx_brandgroupcode == "1"
              ? {
                  ...DatePickerStyles.icon,
                  ...DatePickerStyles.iconActive,
                  ...Styles.dateIcon,
                }
              : {
                  ...DatePickerStyles.icon,
                  ...DatePickerStyles.iconActive,
                  ...Styles.dateIconBlue,
                }
          }
        />
      </View>
    );

    let area = "";

    agentAreaPjp.map((obj) => {
      area = obj.area__c;
    });

    let psmListNode = [];

    if (isASM.length || isManager == "ASM" || isManager == "GM") {
      psmListNode = (
        <View style={{ height: hp("10%"), zIndex: 100 }}>
          <SearchableDropdown
            key={"psm" + searchFilters["psm__c"]}
            dataSource={HelperService.sortListFilter(psmList, "name", "ASC")}
            placeHolderText={"Select SO"}
            selectedValue={searchFilters["psm__c"]}
            onChange={(value) => this.onFilterChange(value)}
            placeholder={"Type or Select SO"}
            invalid={false}
            customPickerStyles={Styles.psmPickerStyles}
          />
        </View>
      );
    }

    // let psmListNode = [];
    // if (isASM.length) {
    //   psmListNode = (
    //     <View style={{ height: hp("10%") }}>
    //       <Searchbar
    //         key={"psm" + searchFilters["psm__c"]}
    //         dataSource={psmList}
    //         placeHolderText={"Select SO"}
    //         selectedValue={searchFilters["psm__c"]}
    //         onChange={(value) => this.onFilterChange(value)}
    //         placeholder={"Type or Select SO"}
    //         invalid={false}
    //         customPickerStyles={Styles.psmPickerStyles}
    //       />
    //     </View>
    //   );
    // }
    // console.log("yyyyyyyy", psmListNode && !_.isEmpty(psmListNode));
    return (
      <View style={{ backgroundColor: Colors.white }}>
        <Card
          // style={
          //   isASM.length|| isManager=='ASM'|| isManager== "GM"
          //     ? { ...Styles.card, ...{ height: hp("27%") } }
          //     : { ...Styles.card }
          // }
          style={
            psmListNode && !_.isEmpty(psmListNode)
              ? code.zx_brandgroupcode == "1"
                ? { ...Styles.card, ...{ height: hp("25%") } }
                : { ...Styles.cardBlue, ...{ height: hp("25%") } }
              : code.zx_brandgroupcode == "1"
              ? { ...Styles.card }
              : { ...Styles.cardBlue }
          }
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              height: hp("10%"),
              position: "relative",
              marginTop: "2%",
            }}
          >
            <TouchableOpacity
              transparent
              onPress={() =>
                this.onDateChange({
                  selectedStartDate: HelperService.getPreviousDayTimestamp(
                    searchFilters["startDate"]
                  ),
                })
              }
            >
              <Icon
                name={"caret-left"}
                ios={"caret-left"}
                android={"caret-left"}
                style={Styles.dateChangeIcon}
                type={"FontAwesome5"}
              />
            </TouchableOpacity>
            <View>
              <DatePicker
                allowRangeSelection={false}
                selectedStartDate={searchFilters["startDate"]}
                selectedEndDate={searchFilters["endDate"]}
                onDateChange={(params) => this.onDateChange(params)}
              >
                {datePickerNode}
              </DatePicker>
            </View>
            <TouchableOpacity
              transparent
              onPress={() =>
                this.onDateChange({
                  selectedStartDate: HelperService.getNextDayTimestamp(
                    searchFilters["startDate"]
                  ),
                })
              }
            >
              <Icon
                name={"caret-right"}
                ios={"caret-right"}
                android={"caret-right"}
                style={Styles.dateChangeIcon}
                type={"FontAwesome5"}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              height: hp("5.5%"),
              top: hp("-1.5%"),
            }}
          >
            {psmListNode}
          </View>
          {/* <View style={{height: hp('5.5%')}}>
					  <SearchableDropdown
                dataSource={[{id: '', name: 'All'}].concat(HelperService.sortListFilter(agentAreas, 'name', 'ASC'))}
                placeHolderText={'Select Area...'}
                selectedValue={searchFilters['area']}
                onChange={(areaCode) => changeSearchFilters({ edited_field: 'area', edited_value: areaCode })}
                placeholder={'Type or Select Area'}
                invalid={false}
                customPickerStyles={Styles.pickerStyles}
                key={searchFilters['area'] + _.uniqueId()}
              /> */}

          {/* <SearchBar
                placeholder={`Search Customer...`}
            placeHolderText={`Search Customer...`}

            
             onInputChange={(text) => this.props.changeSearchFilters({ edited_field: 'name', 'edited_value': text })}
            onInputSubmit={(text) =>this.props. changeSearchFilters({ edited_field: 'name', 'edited_value': text })}
            onInputClear={(text) => this.props.changeSearchFilters({ edited_field: 'name', 'edited_value': '' })}
            value={searchFilters['searchValue']}
            

            

                

                    
                style={{ ...Styles.searchContainer }}
              /> */}
          {/* </View> */}

          <Text
            style={
              psmListNode && !_.isEmpty(psmListNode)
                ? Styles.countBadgeText
                : Styles.countBadgeText1
            }
          >
            {"Total Visits for Today: "}
            <Text style={{ ...Styles.countBadgeText, color: Colors.white }}>
              {visitCount}
            </Text>
          </Text>

          {/* <View>
            <Text style={Styles.countBadgeText}>
              {"Total Visits for Month: "}
              <Text style={{ ...Styles.countBadgeText, color: Colors.white }}>
                {visitCount}
              </Text>
            </Text>
          </View> */}
          {/* <View>
            <Text style={Styles.countBadgeText}>
              {"Total Visits: "}
              <Text style={{ ...Styles.countBadgeText, color: Colors.white }}>
                {visitCount}
              </Text>
            </Text>
          </View> */}
        </Card>

        {children}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  visitsDisplayList: state.visits.visitsDisplayList,
  filteredDisplayData: state.visits.filteredDisplayData,
  token: state.user.token,
  agentid: state.user.id,
  searchFilters: state.visits.searchFilters,
  isASM: state.user.psmList,
  psmList: state.user.psmList.concat([{ id: state.user.id, name: "Self" }]),
  agentAreas: state.user.team_area_result
    ? [{ id: "", name: "All" }].concat(state.user.team_area_result)
    : [],
  agentAreaPjp: state.common.agentAreaPjp.concat([{ id: "", name: "All" }]),
  // agentBeatPjp				: state.common.agentBeatPjp,
  loader: state.common.fetchAllAreaPjpLoading,
  visitCount:
    state.visits.filteredDisplayData && state.visits.filteredDisplayData.length
      ? state.visits.filteredDisplayData.length
      : 0,
  businessChannel: state.user.user_details
    ? state.user.user_details.business_channel__c
    : "",
  isManager: state.user.user_details
    ? state.user.user_details.designation__c
    : "",
  code: state.user.user_details,
});

const mapDispatchToProps = (dispatch) => ({
  changeSearchFilters: (params) =>
    dispatch(VisitsActions.changeSearchFilters(params)),
  getVisitsDisplayList: (params) =>
    dispatch(VisitsActions.getVisitsDisplayList(params)),
  // getAllPjp: (params)   => dispatch(UserActions.getAllPjp(params)),
  getAreaPjp: (params) => dispatch(CommonActions.fetchAllAreaPjp(params)),
  fetchVisitsDisplayList: (params) =>
  dispatch(VisitsActions.fetchVisitsDisplayList(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VisitListLayout);

const Styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.background,
    borderBottomWidth: 0,
    height: hp("18%"),
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    elevation: 10,
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
    paddingHorizontal: "8%",
    paddingLeft: 10,
    paddingRight: 10,
  },
  cardBlue: {
    backgroundColor: Colors.bluebackground,
    borderBottomWidth: 0,
    height: hp("22%"),
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    elevation: 10,
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
    paddingHorizontal: "8%",
    paddingLeft: 10,
    paddingRight: 10,
  },
  datePicker: {
    alignSelf: "center",
    backgroundColor: Colors.white,
    borderRadius: 4,
    width: wp("50%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    height: hp(4.5),
  },
  dateText: {
    fontFamily: "Segoe UI",
    color: Colors.background,
    fontSize: wp("3.5%"),
    textTransform: "capitalize",
  },
  dateTextBlue: {
    fontFamily: "Segoe UI",
    color: Colors.bluebackground,
    fontSize: wp("3.5%"),
    textTransform: "capitalize",
  },
  dateIcon: {
    color: Colors.background,
    fontSize: wp("6%"),
    marginLeft: 0,
    marginRight: 0,
    zIndex: 2,
    paddingLeft: wp("3%"),
  },
  dateIconBlue: {
    color: Colors.bluebackground,
    fontSize: wp("6%"),
    marginLeft: 0,
    marginRight: 0,
    zIndex: 2,
    paddingLeft: wp("3%"),
  },
  dateChangeIcon: {
    color: Colors.white,
    fontSize: wp("13.5%"),

    alignItems: "center",
    paddingHorizontal: 20,
  },
  searchContainer: {
    color: "black",
  },
  psmPickerStyles: {
    // marginTop: hp("-3"),
    top: hp("0%"),
    backgroundColor: Colors.white,
    paddingVertical: 8,
    paddingHorizontal: "8%",
    width: "88%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 2,
    elevation: 5,
    marginLeft: "13%",
    borderRadius: 10,
    fontSize: wp("4.8%"),
    // height: "95%",
    zIndex: 500,
  },
  countBadge: {
    padding: 0,
    borderWidth: 0.5,
    height: wp("9.3%"),
    width: wp("10%"),
    position: "absolute",
    left: "64%",
    alignItems: "center",
    justifyContent: "center",
  },
  countBadgeText: {
    color: Colors.headerClr,
    fontSize: wp("3.7%"),
    // marginTop: "4%",
    top: hp("1%"),
    alignSelf: "center",
    fontFamily: "Roboto",
  },
  countBadgeText1: {
    color: Colors.headerClr,
    fontSize: wp("3.7%"),
    // marginTop: "-6%",
    top: hp("-3.5%"),
    alignSelf: "center",
    fontFamily: "Roboto",
  },
  heading: {
    color: Colors.primary,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: wp("4.2%"),
    marginBottom: 0,
    fontWeight: "bold",
    marginLeft: "15%",
  },
});
