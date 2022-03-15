import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { liveInEurope } from "App/Stores/Example/Selectors";
import { ApplicationStyles, Helpers, Images, Metrics } from "App/Theme";
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
} from "native-base";
import NavigationService from "App/Services/NavigationService";
import WhiteButton from "App/Components/WhiteButton";
import BackArrowButton from "App/Components/BackArrowButton";
import SearchableDropdown from "App/Components/SearchableDropdown";
import { Colors } from "App/Theme";
import VisitsActions from "App/Stores/Visits/Actions";
import SearchBar from "App/Components/SearchBar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Card } from "react-native-paper";
import Select from "App/Components/Select";

class SearchByAreaLayout extends React.Component {
  render() {
    const {
      agentAreas,
      searchByAreaFilters,
      children,
      agentCity,
      changeSearchByAreaFilters,

      code,
    } = this.props;

    return (
      <View>
        <Card
          style={code.zx_brandgroupcode == "1" ? Styles.card : Styles.cardBlue}
        >
          {/* <Header transparent style={Styles.header}> */}
          {/* <View style={{paddingTop: hp('-2%'), paddingBottom: hp('0.5%')}}>
       <BackArrowButton />
       </View> */}
          <BackArrowButton style={{ color: "white", fontSize: 28 }} />
          <Text style={{ ...Styles.titleText }}>
            {"My"}
            <Text style={{ ...Styles.titleText, ...Styles.textClr }}>
              {" Customers"}
            </Text>
          </Text>
          <View
            style={{ flexDirection: "row", top: hp("1%"), right: wp("2%") }}
          >
            <SearchBar
              placeholder={"Search"}
              onInputChange={(text) =>
                changeSearchByAreaFilters({
                  edited_field: "searchvalue",
                  edited_value: text,
                })
              }
              onInputSubmit={(text) =>
                changeSearchByAreaFilters({
                  edited_field: "searchvalue",
                  edited_value: text,
                })
              }
              onInputClear={(text) =>
                changeSearchByAreaFilters({
                  edited_field: "searchvalue",
                  edited_value: "",
                })
              }
              value={searchByAreaFilters["searchValue"]}
              ContainerStyles={Styles.searchContainer}
            />
            <Select
              style={Styles.selectPickerStyle}
              placeholder={"Search By"}
              list={searchByAreaFilters.searchByOptions}
              selected={searchByAreaFilters["searchBy"]}
              onChange={(value) =>
                this.props.changeSearchByAreaFilters({
                  edited_field: "searchBy",
                  edited_value: value,
                })
              }
            />
          </View>
          {/* <SearchBar 
		               placeholder={`Search by Phone no....`}
                   onInputChange={(text) => changeSearchByAreaFilters({ edited_field: 'area', 'edited_value': text })}
                   onInputSubmit={(text) => changeSearchByAreaFilters({ edited_field: 'area', 'edited_value': text })}
                   onInputClear={(text) => changeSearchByAreaFilters({ edited_field: 'area', 'edited_value': '' })}
                   value={searchByAreaFilters['area']}
						  ContainerStyles={Styles.searchContainer}

		                /> */}

          {/* <View style={Styles.searchFilterContainer}></View> */}
        </Card>

        {/* </Header> */}
        {children}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  agentAreas: state.user.team_area_result
    ? [{ id: "", name: "All" }].concat(state.user.team_area_result)
    : [],
  searchByAreaFilters: state.visits.unplannedVisit.searchByAreaFilters,
  agentCity: [{ id: "", name: "All" }].concat(state.user.agentCity),
  cityAllList: [{ id: "", name: "All" }].concat(state.common.cityAllList),
  code: state.user.user_details,
});

const mapDispatchToProps = (dispatch) => ({
  changeSearchByAreaFilters: (params) =>
    dispatch(VisitsActions.changeSearchByAreaFilters(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchByAreaLayout);

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
  searchParamContainer: {
    //flexDirection: 'row',
    //marginBottom: '4%'
  },
  pickerStyles: {
    marginTop: 5,
    backgroundColor: "white",
    paddingVertical: 8,

    paddingHorizontal: "8%",
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 25,
    elevation: 5,
    marginLeft: "3%",
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
  card: {
    flexDirection: "column",

    paddingTop: 10,
    paddingBottom: 5,

    paddingLeft: 5,
    paddingRight: 5,
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

    paddingTop: 10,
    paddingBottom: 5,

    paddingLeft: 5,
    paddingRight: 5,
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
    left: "25%",
    top: hp("-1.5%"),
  },
  textClr: {
    color: Colors.headerClr,
  },
  searchContainer: {
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
