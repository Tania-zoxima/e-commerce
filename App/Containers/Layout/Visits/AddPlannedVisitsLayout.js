import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { liveInEurope } from "App/Stores/Example/Selectors";
import NavigationService from "App/Services/NavigationService";
import SearchBar from "App/Components/SearchBar";
import SearchableDropdown from "App/Components/SearchableDropdown";
import WhiteButton from "App/Components/WhiteButton";
import BlueButton from "App/Components/BlueButton";
import DatePicker from "App/Components/DatePicker";
import DatesScrolling from "App/Components/DatesScrolling";
import { HelperService } from "App/Services/Utils/HelperService";
import VisitsActions from "App/Stores/Visits/Actions";
import BackArrowButton from "App/Components/BackArrowButton";
import CommonActions from "App/Stores/Common/Actions";
import _ from "lodash";
import { ApplicationStyles, Helpers, Images, Metrics, Colors } from "App/Theme";
import Select from "App/Components/Select";
import {
  Platform,
  View,
  ActivityIndicator,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet,
} from "react-native";
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
  Badge,
} from "native-base";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Card } from "react-native-paper";

class AddPlannedVisitsLayout extends React.Component {
  componentDidMount() {
    const {
      changeSearchFilters,
      agentid,
      getAreaPjp,
      token,
      agentAreaPjp,
      searchFilters,
      changePlannedSelectedPSM,
      selectedVisitPSM,
      selectedVisitDate,
      changeAddPlannedVisitsSearchFilters,
    } = this.props;

    // changePlannedSelectedPSM(agentid)
    // getAreaPjp({
    // token,
    // team__c: agentid,
    //date: selectedVisitDate,
    //});
  }

  render() {
    const {
      isASM,
      psmList,
      agentAreas,
      searchFilters,
      selectedPlannedVisits,
      selectedVisitDate,
      selectedVisitPSM,
      changePlannedSelectedDate,
      changePlannedSelectedPSM,
      changeAddPlannedVisitsSearchFilters,
      token,
      getAreaPjp,
      searchFilter,
      agentAreaPjp,
      agentBeatPjp,
      startDate,
      loader,
      agentid,
      agentBeat,
      retailerSearchFilters,
      beatList,
      businessChannel,
      agentCity,
      code,
    } = this.props;

    // console.log('test')
    let psmListNode = [];
    // if (isASM.length) {
    //   psmListNode = (
    //     <SearchableDropdown
    //       dataSource={psmList}
    //       placeHolderText={"Select SO"}
    //       selectedValue={selectedVisitPSM}
    //       onChange={(value) => {
    //         changePlannedSelectedPSM(value);

    //         getAreaPjp({
    //           token,
    //           team__c: value,
    //           date: selectedVisitDate,
    //         });
    //       }}
    //       placeholder={"Type or Select SO"}
    //       invalid={false}
    //       customPickerStyles={{
    //         ...Styles.psmPickerStyles,
    //         width: "90%",
    //         marginLeft: "5%",
    //       }}
    //     />
    //   );
    // }
    // console.log("hhhhhh", isASM.length);
    return (
      <View style={{ backgroundColor: Colors.white }}>
        <Card
          style={
            code.zx_brandgroupcode == "1"
              ? { ...Styles.card, ...{ height: hp("30%") } }
              : { ...Styles.cardBlue, ...{ height: hp("30%") } }
          }
          // style={
          //   isASM.length
          //     ? { ...Styles.card, ...{ height: hp("33%") } }
          //     : code.zx_brandgroupcode == "1"
          //     ? { ...Styles.card, ...{ height: hp("30%") } }
          //     : { ...Styles.cardBlue, ...{ height: hp("30%") } }
          // }
        >
          <View style={{ paddingTop: hp("1%"), paddingBottom: hp("1%") }}>
            <BackArrowButton style={Styles.backBtn} />
          </View>

          <DatesScrolling
            startDate={HelperService.getNextNDayTimestamp(startDate)}
            endDate={HelperService.getNextNDayTimestamp(30, selectedVisitDate)}
            selectedStartDate={selectedVisitDate}
            selectedEndDate={selectedVisitDate}
            focusedDate={selectedVisitDate}
            allowRangeSelection={false}
            minDate={HelperService.getNextNDayTimestamp(1)}
            onDateChange={(params) => {
              changePlannedSelectedDate(params.selectedDate),
                changeAddPlannedVisitsSearchFilters({
                  edited_field: "area",
                  edited_value: "",
                });
              changeAddPlannedVisitsSearchFilters({
                edited_field: "beat",
                edited_value: "",
              });

              getAreaPjp({
                token,
                team__c: selectedVisitPSM ? selectedVisitPSM : agentid,
                date: params.selectedDate,
              });
            }}
          />

          {/* {psmListNode} */}

          {/* {loader ? (
              <Text style={Styles.heading}>{"Area List Loading .."}</Text>
            ) : ( */}
          <View style={{ flexDirection: "row", top: hp("-4%") }}>
            <SearchBar
              placeholder={`Search`}
              onInputChange={(text) =>
                this.props.changeAddPlannedVisitsSearchFilters({
                  edited_field: "searchvalue",
                  edited_value: text,
                })
              }
              onInputSubmit={(text) =>
                this.props.changeAddPlannedVisitsSearchFilters({
                  edited_field: "searchvalue",
                  edited_value: text,
                })
              }
              onInputClear={(text) =>
                this.props.changeAddPlannedVisitsSearchFilters({
                  edited_field: "searchvalue",
                  edited_value: "",
                })
              }
              value={searchFilters["searchValue"]}
              ContainerStyles={Styles.searchContainer1}
            />
            <Select
              style={Styles.selectPickerStyle}
              placeholder={"Search By"}
              list={searchFilters.searchByOptions}
              selected={searchFilters["searchBy"]}
              onChange={(value) =>
                this.props.changeAddPlannedVisitsSearchFilters({
                  edited_field: "searchBy",
                  edited_value: value,
                })
              }
            />
          </View>
          {/* )} */}

          <View style={{ top: hp("-8%") }}>
            <WhiteButton
              vertical
              style={Styles.viewBtn}
              textStyle={Styles.viewBtntext}
              title={"Visits"}
              onPress={() =>
                NavigationService.navigate("SelectedPlannedVisitsScreen")
              }
            >
              <Badge style={code.zx_brandgroupcode == "1"?Styles.countBadge:Styles.countBadgeBlue}>
                <Text style={{color:"black"}}>{selectedPlannedVisits.length}</Text>
              </Badge>
            </WhiteButton>
          </View>

          {/* <View style={Styles.searchFilterContainer}></View> */}
          {/* <SearchBar
            placeholder={`Search by Phone no....`}
            onInputChange={(text) =>
              this.props.changeAddPlannedVisitsSearchFilters({
                edited_field: "area",
                edited_value: text,
              })
            }
            onInputSubmit={(text) =>
              this.props.changeAddPlannedVisitsSearchFilters({
                edited_field: "area",
                edited_value: text,
              })
            }
            onInputClear={(text) =>
              this.props.changeAddPlannedVisitsSearchFilters({
                edited_field: "area",
                edited_value: "",
              })
            }
            value={searchFilters["area"]}
            ContainerStyles={Styles.searchContainer}
          /> */}
        </Card>
        {this.props.children}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid: state.user.id,
  agentAreas: state.user.team_area_result
    ? [{ id: "", name: "All" }].concat(state.user.team_area_result)
    : [],
  searchFilters: state.visits.planVisit.searchFilters,

  categoryRatingMapping: state.common.categoryRatingMapping,
  selectedVisitDate: state.visits.planVisit.selectedVisitDate,
  selectedVisitDate: state.visits.planVisit.selectedVisitDate,
  startDate: state.visits.planVisit.startDate,
  selectedPlannedVisits: state.visits.planVisit.selectedPlannedVisits,
  isASM: state.user.psmList,
  psmList: state.user.psmList.concat([{ id: state.user.id, name: "Self" }]),
  agentAreaPjp: state.common.agentAreaPjp,
  agentBeatPjp: state.common.agentBeatPjp,

  loader: state.common.fetchAllAreaPjpLoading,
  agentBeat: state.common.agentBeat,
  retailerSearchFilters: state.retailers.retailerSearchFilters,
  beatList: state.retailers.retailersBeatSearchList,
  businessChannel: state.user.user_details
    ? state.user.user_details.business_channel__c
    : "",
  agentCity: [{ id: "", name: "All" }].concat(state.user.agentCity),
  cityAllList: [{ id: "", name: "All" }].concat(state.common.cityAllList),
  code: state.user.user_details,
});

const mapDispatchToProps = (dispatch) => ({
  changePlannedSelectedDate: (params) =>
    dispatch(VisitsActions.changePlannedSelectedDate(params)),
  changePlannedSelectedPSM: (params) =>
    dispatch(VisitsActions.changePlannedSelectedPSM(params)),
  changeAddPlannedVisitsSearchFilters: (params) =>
    dispatch(VisitsActions.changeAddPlannedVisitsSearchFilters(params)),
  getAreaPjp: (params) => dispatch(CommonActions.fetchAllAreaPjp(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPlannedVisitsLayout);

const Styles = StyleSheet.create({
  card: {
    height: hp("36.5%"),
    alignItems: "flex-start",

    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: Colors.background,
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
  },
  cardBlue: {
    height: hp("36.5%"),
    alignItems: "flex-start",

    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: Colors.bluebackground,
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
  },
  searchableDropdown: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    alignSelf: "center",
  },
  pickerStyles: {
    marginTop: 5,
    backgroundColor: "white",
    paddingVertical: 8,

    paddingHorizontal: "8%",
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 25,
    elevation: 5,
  },
  pickerStyles1: {
    marginTop: -5,
    backgroundColor: "white",
    paddingVertical: 8,
    minHeight: hp("5.7%"),
    paddingHorizontal: "9%",
    width: "83%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 25,
    elevation: 5,
  },
  backBtn: {
    color: Colors.white,
    paddingRight: 10,
    paddingLeft: 5,
    fontSize: wp("8%"),
  },
  psmPickerStyles: {
    marginTop: -5,
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: "8%",
    width: "79%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 25,
    elevation: 5,
    marginLeft: "17%",
  },
  viewBtn: {
    height: hp("5.5%"),
    width: wp("24%"),
    paddingLeft: 0,
    paddingRight: 20,
    marginLeft: wp("0%"),
    overflow: "visible",
    borderRadius: 4,
    left: wp("63.5%"),
    top: "10%",
  },
  viewBtntext: {
    fontSize: wp("3.8%"),
    fontWeight: "bold",
    marginLeft: "27%",
  },
  countBadge: {
    position: "absolute",
    backgroundColor: Colors.button,
    right: -10,
    top: -10,
    
  },
  countBadgeBlue: {
    position: "absolute",
    backgroundColor: Colors.lightbluebackground,
    right: -10,
    top: -10,
    
  },
  searchContainer: {
    paddingVertical: 15,
    width: "55%",
    borderRadius: 7,
    // paddingHorizontal: 2,
    elevation: 10,
    backgroundColor: "white",
    fontSize: wp("3.8%"),
    fontWeight: "700",
    color: Colors.blue,
    // alignSelf:'center',
    // marginBottom:'2.5%',
    top: "-2%",
    height: hp("5.5%"),
    marginLeft: "4%",
    // height:'14%',
    // botttom:'10%',
    marginBottom: "10%",
    paddingTop: 5,
  },
  searchContainer1: {
    // paddingVertical: 8,
    width: "50%",
    borderRadius: 10,
    // paddingHorizontal: 3,
    paddingTop: 2,
    // elevation: 10,
    // backgroundColor: "white",
    // fontSize: wp("4.8%"),
    // fontWeight: "700",
    // color: Colors.blue,
    left: "3%",
    marginTop: "-1%",
    // bottom:hp("2%"),
    //     alignSelf: "center",
  },
  searchFilterContainer: {
    marginTop: hp(".5%"),
    alignSelf: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchFilterTypeBox: {
    marginHorizontal: wp("1%"),
    marginBottom: hp("1%"),
    borderWidth: 1.5,
    width: wp("42%"),
  },
  searchFilterTypeText: {
    fontSize: wp("3.8%"),
    fontFamily: ApplicationStyles.textMediumFont,
  },
  heading: {
    alignSelf: "center",
    color: Colors.primary,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: wp("4.2%"),
    marginBottom: 0,
    fontWeight: "bold",
    marginRight: "5%",
  },
  selectPickerStyle: {
    width: wp("40%"),
    height: hp("5.7%"),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    marginTop: hp("-0.5%"),
    backgroundColor: "white",
    left: "50%",
  },
});
