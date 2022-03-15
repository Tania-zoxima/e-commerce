import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  CheckBox,
  RefreshControl,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import BackArrowButton from "App/Components/BackArrowButton";
import BlueButton from "App/Components/BlueButton/BlueButton";
import {
  Icon,
  Input,
  Button,
  ListItem,
  Radio,
  Left,
  Right,
  Label,
} from "native-base";
import { connect } from "react-redux";
import RetailersActions from "App/Stores/Retailers/Actions";
import NavigationService from "App/Services/NavigationService";
import _ from "lodash";
import CompetitorActions from "App/Stores/Competitor/Actions";
import { HelperService } from "App/Services/Utils/HelperService";
import GenericIcon from "App/Components/GenericIcon";
import DashboardActions from "App/Stores/Dashboard/Actions";

class DashboardFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: [
        { id: "1", name: "Brand" },
        { id: "2", name: "Item Class" },
        { id: "3", name: "Zone" },
        { id: "4", name: "State" },
        { id: "5", name: "Sub State" },
        { id: "6", name: "District" },
        { id: "7", name: "City" },
        { id: "8", name: "Area" },
      ],
      // data: [
      //   { id: "1", name: "Technical", checked: false, parent: "1" },
      //   { id: "2", name: "Fitting", checked: false, parent: "2" },
      //   { id: "3", name: "Commercial", checked: false, parent: "1" },
      //   { id: "4", name: "Pipes", checked: false, parent: "2" },
      // ],
      selectedFruits: [],
      selectedItem: "1",
      timer: null,
      // loading1:false
    };
  }

  componentDidMount() {
    const { details, agentid, token, data1, brand, zone, code } = this.props;
    if (brand && _.isEmpty(brand)) {
      this.props.getAllBrands({
        token,
        id: agentid,
        zx_brandgroup: code.zx_brandgroup,
      });
    }
  }
  fetchCall() {
    const { details, agentid, token, data1, brand, zone,code } = this.props;
    if (brand && _.isEmpty(brand)) {
      this.props.getAllBrands({ token, id: agentid,zx_brandgroup: code.zx_brandgroup, });
    }
  }
  onchecked(id) {
    const data = this.props.filter;
    const index = data.findIndex((x) => x.id === id);
    data[index].checked = !data[index].checked;
    // console.log("hkkkkkkkk", data);
  }

  onReset() {
    this.props.filter.map((item) => {
      if (item.checked == true) {
        item.checked = false;
      }
    });
  }

  renderFruits(record) {
    // console.log("ttaanaiaaaa", record);
    return this.props.filter.map((item, key) => {
      if (item.parent == record.id) {
        return (
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            key={key}
            onPress={() => {
              this.onchecked(item.id), this.getSelectedFruits();
            }}
          >
            {item.checked ? (
              <GenericIcon
                name={"check-box"}
                style={{ fontSize: 25, alignSelf: "center" }}
              />
            ) : (
              <GenericIcon
                name={"crop-square"}
                style={{ fontSize: 25, alignSelf: "center" }}
              />
            )}
            {/* <CheckBox
              value={item.checked}
              onValueChange={() => {
                this.onchecked(item.id),this.getSelectedFruits();
              }}
            /> */}
            <Text style={{ fontWeight: "bold", fontSize: 15, left: wp("3%") }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      }
    });
  }
  getSelectedFruits() {
    var keys = this.props.filter.map((t) => t.name);
    var checks = this.props.filter.map((t) => t.checked);
    var unique = this.props.filter.map((t) => t.id);
    var parentid = this.props.filter.map((t) => t.parent);
    let BrandSelected = [];
    let ClassSelected = [];
    let ZoneSelected = [];
    let StateSelected = [];
    let SubSelected = [];
    let DistrictSelected = [];
    let CitySelected = [];
    let AreaSelected = [];
    for (let i = 0; i < checks.length; i++) {
      if (checks[i] == true && parentid[i] == 1) {
        BrandSelected.push(unique[i]);
      }
      if (checks[i] == true && parentid[i] == 2) {
        ClassSelected.push(unique[i]);
      }
      if (checks[i] == true && parentid[i] == 3) {
        ZoneSelected.push(unique[i]);
      }
      if (checks[i] == true && parentid[i] == 4) {
        StateSelected.push(unique[i]);
      }
      if (checks[i] == true && parentid[i] == 5) {
        SubSelected.push(unique[i]);
      }
      if (checks[i] == true && parentid[i] == 6) {
        DistrictSelected.push(unique[i]);
      }
      if (checks[i] == true && parentid[i] == 7) {
        CitySelected.push(unique[i]);
      }
      if (checks[i] == true && parentid[i] == 8) {
        AreaSelected.push(unique[i]);
      }
    }
    this.props.changeSearchFilters({
      edited_field: "brand",
      edited_value: BrandSelected,
    });
    this.props.changeSearchFilters({
      edited_field: "itemClass",
      edited_value: ClassSelected,
    });
    this.props.changeSearchFilters({
      edited_field: "zone",
      edited_value: ZoneSelected,
    });
    this.props.changeSearchFilters({
      edited_field: "state",
      edited_value: StateSelected,
    });
    this.props.changeSearchFilters({
      edited_field: "sub",
      edited_value: SubSelected,
    });
    this.props.changeSearchFilters({
      edited_field: "district",
      edited_value: DistrictSelected,
    });
    this.props.changeSearchFilters({
      edited_field: "city",
      edited_value: CitySelected,
    });
    this.props.changeSearchFilters({
      edited_field: "area",
      edited_value: AreaSelected,
    });
    // alert(BrandSelected);
  }
  render() {
    const {
      data1,
      filter,
      agentid,
      searchFilters,
      token,
      loading1,
      code,
      searchDateFilters,
    } = this.props;

    let form1 = {
      zx_team: searchDateFilters.psm__c ? searchDateFilters.psm__c : agentid,
      zx_state: searchFilters.state,
      zx_substate: searchFilters.sub,
      zx_district: searchFilters.district,
      zx_zone: searchFilters.zone,
      zx_area: searchFilters.area,
      zx_city: searchFilters.city,
      zx_brandgroup: searchFilters.brand,
      zx_itemclass: searchFilters.itemClass,
      zx_fromdate: HelperService.dateReadableFormatWithHyphen(
        this.props.searchDateFilters["startDate"]
      ),
      zx_todate:
        this.props.searchDateFilters["startDate"] !== "undefined"
          ? HelperService.dateReadableFormatWithHyphen(
              this.props.searchDateFilters["startDate"]
            )
          : HelperService.dateReadableFormatWithHyphen(),
    };

    //  console.log("filterssssschildddd", data1);
    return (
      // <ScrollView
      //   refreshControl={
      //     <RefreshControl
      //       refreshing={loading1}
      //       onRefresh={() => {
      //         this.fetchCall();
      //       }}
      //     />
      //   }
      // >
      <View>
        <BackArrowButton style={styles.backarrow} />

        <View style={{ flexDirection: "row" }}>
          <Text style={styles.titleText}>{" FILTER"}</Text>

          <TouchableOpacity
            onPress={() => {
              this.props.resetFilter(), this.onReset();
            }}
            style={{ left: wp("55%"), zIndex: 200 }}
          >
            <Text
              style={{
                color: Colors.cardblue,
                fontFamily: "Ubuntu",
                fontSize: 13.5,
                fontWeight: "bold",
                // left: wp("5%"),
                bottom: hp("7.5%"),
                top: hp("1%"),
              }}
            >
              {" Reset Filters"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ width: wp("40%") }}>
            {this.state.menuItems.map((item, index) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => this.setState({ selectedItem: item.id })}
                  style={[
                    styles.menuItem,
                    item.id === this.state.selectedItem
                      ? styles.selectedMenuItem
                      : null,
                  ]}
                >
                  <Text style={styles.menuItemText}>{item.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View
            style={{
              right: wp("5%"),
              top: hp("3%"),
              height: hp("60%"),
              width: wp("50%"),
            }}
          >
            <ScrollView>
              {this.state.menuItems.map((item, index) => {
                return (
                  <View style={{ flexDirection: "column" }}>
                    {this.state.selectedItem === item.id &&
                      this.renderFruits({ id: item.id, name: item.name })}
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
        {/* <View style={styles.content}>
          <View style={styles.menuColumn}>
            {this.props.menu.map((item, index) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => this.setState({ selectedItem: item.id })}
                  style={[
                    styles.menuItem,
                    item.id === this.state.selectedItem
                      ? styles.selectedMenuItem
                      : null,
                  ]}
                >
                  <Text style={styles.menuItemText}>{item.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.settingsColumn}>
            {this.props.menu.map((item, index) => {
              return (
                <View style={styles.settingsColumn}>
                  {this.state.selectedItem === item.id &&
                    this.renderFruits(item.id)}
                </View>
              );
            })}
          </View>
        </View> */}
        <View
          style={{
            height: hp("5%"),
            marginTop: hp("7%"),
            left: wp("8.5%"),
            width: wp("37%"),
          }}
        >
          <BlueButton
            style={
              code.zx_brandgroupcode == "1"
                ? { ...styles.button }
                : { ...styles.buttonBlue }
            }
            title={"CANCEL"}
            onPress={() => {
              NavigationService.navigate("DashboardScreen");
            }}
          />
        </View>
        <View
          style={{
            height: hp("5%"),
            marginTop: hp("-5%"),
            width: wp("38%"),
            left: wp("55%"),
          }}
        >
          <BlueButton
            style={
              code.zx_brandgroupcode == "1"
                ? { ...styles.button1 }
                : { ...styles.buttonBlue1 }
            }
            title={"Apply filter"}
            onPress={() => {
              this.props.dashboardOrderFilter({ forms: form1, token });
              NavigationService.navigate("DashboardScreen");
            }}
            // onPress={() => {
            //   this.getSelectedFruits();
            //   NavigationService.navigate("CompetitorInfo");
            // }}
          />
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  searchFilters: state.dashboard.searchDashboardOrderFilters,
  token: state.user.token,
  agentid: state.user.id,
  brand: state.dashboard.data.brand,
  zone: state.dashboard.data.zone,
  filter: state.dashboard.filter,
  loading1: state.dashboard.loaders.zoneLoader,
  code: state.user.user_details,
  searchDateFilters: state.dashboard.searchFilters,
});
const mapDispatchToProps = (dispatch) => ({
  searchCompetitor: (params) =>
    dispatch(CompetitorActions.searchCompetitor(params)),
  changeSearchFilters: (params) =>
    dispatch(DashboardActions.changeDashboardOrderFilters(params)),
  getCompetitorChild: (params) =>
    dispatch(CompetitorActions.getCompetitorChild(params)),
  resetFilter: (params) => dispatch(DashboardActions.resetFilter(params)),
  getCompetitor: (params) => dispatch(CompetitorActions.getCompetitor(params)),
  getAllBrands: (params) => dispatch(DashboardActions.getAllBrands(params)),
  getZone: (params) => dispatch(DashboardActions.getZone(params)),
  dashboardOrderFilter: (params) =>
    dispatch(DashboardActions.dashboardOrderFilter(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(DashboardFilter);
const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    // flex: 0.70,
    top: hp("1%"),
    // height:hp("38%")
  },

  // menu Column - left
  menuColumn: {
    flex: 0.4,
    flexDirection: "column",
    borderRightColor: "#F8F8FF",
    borderRightWidth: 1,
    backgroundColor: "#DEF0FF",
  },
  menuItem: {
    // flex: 1,
    flex: 0,
    height: hp("7%"),
    justifyContent: "center",
    alignItems: "center",

    // alignItems: 'flex-start',
    // borderWidth:1,
  },
  selectedMenuItem: {
    borderLeftColor: Colors.grey,
    borderLeftWidth: 5,
    backgroundColor: "#7FC4FD",
  },

  menuItemText: {
    marginLeft: 10,
    alignSelf: "flex-start",
    color: Colors.black,
    fontSize: 16,
    fontWeight: "bold",
  },

  // settings column -right
  settingsColumn: {
    flex: 0.6,
    padding: 15,
    color: Colors.cardblue,
  },

  backarrow: {
    color: Colors.black,
    fontSize: 32,
    // paddingRight: 15,
    paddingTop: 10,
    // backgroundColor:"yellow",
    // left:wp("2%"),
    width: "8%",
  },
  titleText: {
    color: Colors.black,
    fontFamily: "Ubuntu",
    fontSize: 23,
    fontWeight: "bold",
    left: wp("10%"),
    bottom: hp("7.5%"),
    top: hp("-4%"),
  },

  titleText1: {
    color: Colors.cardblue,
    fontFamily: "Ubuntu",
    fontSize: 13.5,
    fontWeight: "bold",
    left: wp("55%"),
    bottom: hp("7.5%"),
    top: hp("-2.9%"),
  },
  button: {
    width: wp("40%"),
    height: hp("5.5%"),
    marginTop: hp("0%"),
    left: wp("-3%"),
    paddingBottom: 14,
    borderRadius: 5,
  },
  buttonBlue: {
    width: wp("40%"),
    height: hp("5.5%"),
    marginTop: hp("0%"),
    left: wp("-3%"),
    paddingBottom: 14,
    borderRadius: 5,
    backgroundColor: Colors.bluebackground,
  },

  button1: {
    width: wp("40%"),
    height: hp("5.5%"),
    marginTop: hp("0%"),
    left: wp("-1%"),
    paddingBottom: 14,
    borderRadius: 5,
  },
  buttonBlue1: {
    width: wp("40%"),
    height: hp("5.5%"),
    marginTop: hp("0%"),
    left: wp("-1%"),
    paddingBottom: 14,
    borderRadius: 5,
    backgroundColor: Colors.bluebackground,
  },
});
