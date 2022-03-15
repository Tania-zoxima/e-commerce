import React from "react";
import {
  Platform,
  View,
  ActivityIndicator,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { ScrollableTab, TabHeading, Tab, Tabs } from "native-base";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { liveInEurope } from "App/Stores/Example/Selectors";
import { ApplicationStyles, Helpers, Images, Metrics, Colors } from "App/Theme";
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
import Style from "../../Complaints/ComplaintScreenStyle";
import NavigationService from "App/Services/NavigationService";
import SearchBar from "App/Components/SearchBar";
import SearchableDropdown from "App/Components/SearchableDropdown";
import WhiteButton from "App/Components/WhiteButton";
import RetailersActions from "App/Stores/Retailers/Actions";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Card } from "react-native-paper";
import CustomerScreenTabs from "../../Customer/CustomerList/CustomerScreenTabs";
import RetailerList from "../../Retailers/RetailerList/RetailerList";
import Select from "App/Components/Select";

class RetailerListLayout extends React.Component {
  onAreaChange(areaCode) {
    this.props.updateSearchFilters({
      edited_field: "area",
      edited_value: areaCode,
    });
  }

  render() {
    const {
      agentAreas,
      retailerSearchFilters,
      updateSearchFilters,
      agentCity,
      cityAllList,
      user_details,
      dealersSearchList,
      code
    } = this.props;

    let selectNode = [];
    let selectNodeDataSource = agentAreas;
    let placeholder = "Select Area..";
    let changingValue = retailerSearchFilters["area"];
    let onChangeCallback = (value) =>
      updateSearchFilters({ edited_field: "area", edited_value: value });

    return (
      <View>
        <Card style={code.zx_brandgroupcode == "1"?Styles.card:Styles.cardBlue}>
          <Text style={{ ...Styles.titleText }}>
            {"My"}
            <Text style={{ ...Styles.titleText, ...Styles.textClr }}>
              {" Customers"}
            </Text>
          </Text>
          <View style={{ flexDirection: "row",width:wp("95%"),left:wp("3.5%")}}>
            <SearchBar
              placeholder={`Search ...`}
              // placeholder={"Search Customer..."}
              onInputChange={(text) =>
                updateSearchFilters({
                  edited_field: "searchValue",
                  edited_value: text,
                })
              }
              onInputSubmit={(text) =>
                updateSearchFilters({
                  edited_field: "searchValue",
                  edited_value: text,
                })
              }
              onInputClear={(text) =>
                updateSearchFilters({
                  edited_field: "searchValue",
                  edited_value: "",
                })
              }
              value={retailerSearchFilters["searchValue"]}
              ContainerStyles={Styles.searchContainer}
            />

            {/* <SearchBar
            // placeholder={`Search by ${retailerSearchFilters['searchBy']}`}
            placeholder={"Search by phone no."}
            // placeHolderText={placeholder}

            onInputChange={(text) => updateSearchFilters({ edited_field: 'area', 'edited_value': text })}
            onInputSubmit={(text) => updateSearchFilters({ edited_field: 'area', 'edited_value': text })}
            onInputClear={(text) => updateSearchFilters({ edited_field: 'area', 'edited_value': '' })}
            value={retailerSearchFilters['area']}
            ContainerStyles={Styles.searchContainer}
            // customPickerStyles={Styles.picker}

          /> */}
            <Select
              style={Styles.selectPickerStyle}
              placeholder={"Search By"}
              list={retailerSearchFilters.searchByOptions}
              selected={retailerSearchFilters["searchBy"]}
              onChange={(value) =>
                updateSearchFilters({
                  edited_field: "searchBy",
                  edited_value: value,
                })
              }
            />
          </View>
          {/* <View style={Styles.searchableDropdownContainer}>
            <View>
              <SearchableDropdown
                dataSource={selectNodeDataSource}
                placeHolderText={placeholder}
                selectedValue={changingValue}
                onChange={onChangeCallback}
                placeholder={placeholder}
                invalid={false}
                customPickerStyles={Styles.picker}
                // key={changingValue + retailerSearchFilters['type'] + user_details.business_channel__c}
              />
            </View>
          </View> */}
          <View style={Styles.searchFilterContainer}></View>
        </Card>
        {/* <Header style={{ ...Styles.header }}>
          <CustomerScreenTabs />
        
      </Header>
         */}
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
  agentCity: [{ id: "", name: "All" }].concat(state.user.agentCity),
  retailerCompetitors: state.retailers.retailerCompetitors,
  retailersList: state.retailers.retailersList,
  dealersList: state.retailers.dealersList,
  dealersSearchList: [{ id: "", name: "All" }].concat(
    state.retailers.dealersSearchList
  ),
  fetchRetailersLoader: state.retailers.fetchRetailersLoader,
  fetchDealersLoader: state.retailers.fetchDealersLoader,
  retailerSearchFilters: state.retailers.retailerSearchFilters,
  cityAllList: [{ id: "", name: "All" }].concat(state.common.cityAllList),
  code: state.user.user_details,
});

const mapDispatchToProps = (dispatch) => ({
  updateSearchFilters: (params) =>
    dispatch(RetailersActions.updateSearchFilters(params)),
  openMoreFiltersOption: () =>
    dispatch(RetailersActions.openMoreFiltersOption()),
  closeMoreFiltersOption: () =>
    dispatch(RetailersActions.closeMoreFiltersOption()),
  fetchRetailers: (params) => dispatch(RetailersActions.fetchRetailers(params)),
  fetchDealers: (params) => dispatch(RetailersActions.fetchDealers(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RetailerListLayout);

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
  card: {
    flexDirection: "column",

    paddingTop: 20,
    paddingBottom: 5,

    paddingLeft: 10,
    paddingRight: 10,
    elevation: 10,
    backgroundColor: Colors.background,
    height: hp("20%"),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "8%",
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
  },
  cardBlue: {
    flexDirection: "column",

    paddingTop: 20,
    paddingBottom: 5,

    paddingLeft: 10,
    paddingRight: 10,
    elevation: 10,
    backgroundColor: Colors.bluebackground,
    height: hp("20%"),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "8%",
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
  },
  titleText: {
    color: Colors.white,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 24,
    fontWeight: "bold",
    left: "8%",
  },
  textClr: {
    color: Colors.headerClr,
  },
  searchContainer: {
    // paddingVertical: 8,
    width: "50%",
    borderRadius: 10,
    // paddingHorizontal: 3,
     paddingBottom: 15,
    // elevation: 10,
    // backgroundColor: "white",
    // fontSize: wp("4.8%"),
    // fontWeight: "700",
    // color: Colors.blue,
    // height: "23%",
    marginLeft: "3%",
    marginTop: "4.5%",
    height: hp("5%"),
    // paddingRight:10

    // alignSelf: "center",
  },
  searchableDropdownContainer: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    height: 60,
  },
  picker: {
    marginTop: 6,
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: "8%",
    width: "83%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    elevation: 10,
    marginLeft: "17%",
    height: "62%",
  },
  searchFilterContainer: {
    alignSelf: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
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
  selectPickerStyle: {
    width: wp("35%"),
    height: hp("5%"),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    marginTop: hp("2.1%"),
    backgroundColor: "white",
    marginLeft: "4%",
  },
});
