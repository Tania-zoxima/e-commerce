import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  CheckBox,
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

class CompetitorFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // menuItems: [
      //   { id: "1", name: "Brand" },
      //   { id: "2", name: "Item Class" },
      //   { id: "3", name: "Category" },
      // ],
      // data: [
      //   { id: "1", name: "Technical", checked: false, parent: "1" },
      //   { id: "2", name: "Fitting", checked: false, parent: "2" },
      //   { id: "3", name: "Commercial", checked: false, parent: "1" },
      //   { id: "4", name: "Pipes", checked: false, parent: "2" },
      // ],
      selectedFruits: [],
      selectedItem: this.props.menu[0].id,
      timer: null,
    };
  }

  componentDidMount() {
    const { details, agentid, token, data1 } = this.props;
    // const { details, agentid, token } = this.props;
    if (!data1.length) {
      this.props.getCompetitorChild({
        id: agentid,
        token: token,
      });
    }
  }
  onchecked(id, parent1) {
    // console.log("iidddddd", id, parent1);
    const data = this.props.data1;
    const index = data.findIndex((x) => x.id === id);

    const result = this.props.data1.find(
      ({ parent, checked }) => parent === parent1 && checked == true
    );
    // console.log("resultttttt", result);
    if (result != undefined) {
      const index1 = data.findIndex((x) => x.id === result.id);
      data[index1].checked = !data[index1].checked;
    }
    data[index].checked = !data[index].checked;
    // console.log("hkkkkkkkk", data);
  }

  onReset() {
    this.props.data1.map((item) => {
      if (item.checked == true) {
        item.checked = false;
      }
    });
    // const data = this.props.data1;
    // const index = data.findIndex((x) => x.checked === true);
    // data[index].checked = !data[index].checked;
    // console.log("newwdataaaa", this.props.data1);
  }

  renderFruits(record) {
    // console.log("ttaanaiaaaa", record);
    return this.props.data1.map((item, key) => {
      if (item.parent == record.id) {
        return (
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            key={key}
            onPress={() => {
              this.onchecked(item.id, item.parent);
              this.getSelectedFruits();
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
                this.onchecked(item.id);
              }}
            /> */}
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      }
    });
  }
  getSelectedFruits() {
    var keys = this.props.data1.map((t) => t.name);
    var checks = this.props.data1.map((t) => t.checked);
    var parentkey = this.props.data1.map((t) => t.parent);
    let BrandSelected = [];
    for (let i = 0; i < checks.length; i++) {
      if (checks[i] == true) {
        // BrandSelected.push({id:checks[i],name:keys[i]});
        BrandSelected.push(keys[i]);
      }
    }
    // this.props.searchComplaint({BrandSelected});
    this.props.changeSearchFilters({
      edited_field: "brand",
      edited_value: BrandSelected,
    });
    // alert(BrandSelected);
    // let CategorySelected = [];
    // for (let i = 0; i < checks.length; i++) {
    //   if (checks[i] == true && parentkey[i]==2) {
    //     CategorySelected.push(keys[i]);
    //   }
    // }
    // this.props.searchComplaint({CategorySelected});
    // this.props.changeSearchFilters({
    //   edited_field: "category",
    //   edited_value: CategorySelected,
    // })
  }
  render() {
    const { data1 } = this.props;
    // console.log("filtersssss", this.props.searchFilters);
    //  console.log("filterssssschildddd", data1);
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
          <View style={{ right: wp("25%"), top: hp("5%") }}>
            {this.props.menu.map((item, index) => {
              return (
                <View style={{ flexDirection: "column" }}>
                  {this.state.selectedItem === item.id &&
                    this.renderFruits({ id: item.id, name: item.name })}
                </View>
              );
            })}
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
            style={{ ...styles.button }}
            title={"CANCEL"}
            onPress={() => {
              NavigationService.navigate("CompetitorInfo");
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
            style={{ ...styles.button1 }}
            title={"Apply filter"}
            onPress={() => {
              this.getSelectedFruits();
              NavigationService.navigate("CompetitorInfo");
            }}
          />
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  searchFilters: state.competitor.searchCompetitorFilters,
  menu: state.competitor.competitorList.parentFilter,
  data1: state.competitor.competitorChildList,
  token: state.user.token,
  agentid: state.user.id,
});
const mapDispatchToProps = (dispatch) => ({
  searchCompetitor: (params) =>
    dispatch(CompetitorActions.searchCompetitor(params)),
  changeSearchFilters: (params) =>
    dispatch(CompetitorActions.changeSearchCompetitorFilters(params)),
  getCompetitorChild: (params) =>
    dispatch(CompetitorActions.getCompetitorChild(params)),
  resetFilter: (params) => dispatch(CompetitorActions.resetFilter(params)),
  getCompetitor: (params) => dispatch(CompetitorActions.getCompetitor(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CompetitorFilters);
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

  button1: {
    width: wp("40%"),
    height: hp("5.5%"),
    marginTop: hp("0%"),
    left: wp("-1%"),
    paddingBottom: 14,
    borderRadius: 5,
  },
});
