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
import ProjectActions from "App/Stores/Project/Actions";

class ProjectFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: [
        { id: "1", name: "Pipeline Stage" },
        { id: "2", name: "Project Type" },
      ],
      selectedFruits: [],
      selectedItem: "1",
      timer: null,
    };
  }

  onchecked(id) {
    const data = this.props.filter;
    const index = data.findIndex((x) => x.id === id);
    data[index].checked = !data[index].checked;
  }

  onReset() {
    this.props.filter.map((item) => {
      if (item.checked == true) {
        item.checked = false;
      }
    });
  }

  renderFruits(record) {
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
    for (let i = 0; i < checks.length; i++) {
      if (checks[i] == true && parentid[i] == 1) {
        BrandSelected.push(keys[i]);
      }
      if (checks[i] == true && parentid[i] == 2) {
        ClassSelected.push(keys[i]);
      }
    }
    this.props.changeSearchFilters({
      edited_field: "stage",
      edited_value: BrandSelected,
    });
    this.props.changeSearchFilters({
      edited_field: "type",
      edited_value: ClassSelected,
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
    } = this.props;

    let forms = {
      team: agentid,
      projecttype: searchFilters.type,
      projectPipelinestage: searchFilters.stage,
      fromDate: searchFilters["startDate"]
        ? HelperService.dateReadableFormatWithHyphen(searchFilters["startDate"])
        : null,
      toDate: searchFilters["endDate"]
        ? HelperService.dateReadableFormatWithHyphen(searchFilters["endDate"])
        : null,
    };
    return (
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
              top: hp("3%"),
              height: hp("60%"),
              width: wp("60%"),
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
              NavigationService.navigate("Projects");
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
              this.props.getProject({ form: forms, token });
              NavigationService.navigate("Projects");
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
  searchFilters: state.project.searchFilters,
  token: state.user.token,
  agentid: state.user.id,
  filter: state.project.filter,
  code: state.user.user_details,
});
const mapDispatchToProps = (dispatch) => ({
  changeSearchFilters: (params) =>
    dispatch(ProjectActions.changeProjectSearchFilters(params)),
  resetFilter: (params) => dispatch(ProjectActions.resetFilter(params)),
  getProject: (params) => dispatch(ProjectActions.getProject(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProjectFilter);
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
    width: wp("35%"),
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
