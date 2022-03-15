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

class ComplaintFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: [
        { id: "1", name: "Brand" },
        { id: "2", name: "Item Class" },
        { id: "3", name: "Category" },
      ],
      // data: [
      //   { id: "1", name: "Technical", checked:false, parent: "1" },
      //   { id: "2", name: "Fitting", checked: false, parent: "2" },
      //   { id: "3", name: "Commercial", checked: false, parent: "1" },
      //   { id: "4", name: "Pipes", checked: false, parent: "2" },
      // ],
      selectedFruits: [],
      selectedItem: "1",
    };
  }

  onchecked(id) {
    // console.log("iidddddd", id);
    const data = this.props.data;
    const index = data.findIndex((x) => x.id === id);
    data[index].checked = !data[index].checked;
    // console.log("eeeeeeeeeeee", data[index].checked);
    // this.setState(data)
    // console.log("hkkkkkkkk", data);
  }
  ondechecked(id) {
    // console.log("iiddddddeeeee", id);
    const data = this.props.data;
    const index = data.findIndex((x) => x.id === id);
    data[index].checked = !data[index].checked;
    // console.log("dataaaaa", data);
  }
  renderFruits(record) {
    // console.log("ttaanaiaaaa", record);
    return this.props.data.map((item, key) => {
      if (item.parent == record) {
        return (
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            key={key}
            // onPress={() => {
            //   this.onchecked(item.id);
            // }}
          >
            {this.props.searchFilters.brand.indexOf(item.name) > -1 ? (
              <CheckBox
                value={item.checked}
                onValueChange={() => {
                  this.ondechecked(item.id);
                }}
              />
            ) : (
              <CheckBox
                value={item.checked}
                onValueChange={() => {
                  this.onchecked(item.id);
                }}
              />
            )}
            <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
          </TouchableOpacity>
        );
      }
    });
  }
  getSelectedFruits() {
    var keys = this.props.data.map((t) => t.name);
    var checks = this.props.data.map((t) => t.checked);
    var parentkey = this.props.data.map((t) => t.parent);
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
    // console.log("ooooooommmm", this.props.data);
    // console.log("jjjjjjjjjjjjjjjjj", this.props.searchFilters);
    return (
      <View>
        <BackArrowButton style={styles.backarrow} />

        <View style={{ flexDirection: "row" }}>
          <Text style={styles.titleText}>{" FILTER"}</Text>

          <TouchableOpacity>
            <Text style={styles.titleText1}>{" Reset Filters"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {this.state.menuItems.map((item, index) => {
            return (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: hp("8.5%"),
                }}
              >
                <View style={styles.menuColumn}>
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
                </View>
                <View style={styles.settingsColumn}>
                  {this.state.selectedItem === item.id &&
                    this.renderFruits(item.id)}
                </View>
              </View>
            );
          })}
        </View>
        <View
          style={{
            height: hp("5%"),
            marginTop: hp("43%"),
            left: wp("8.5%"),
            width: wp("37%"),
          }}
        >
          <BlueButton
            style={{ ...styles.button }}
            title={"CANCEL"}
            onPress={() => {
              NavigationService.navigate("DistributorProfile");
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
              NavigationService.navigate("DistributorProfile");
            }}
          />
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  data: state.retailers.data,
  searchFilters: state.retailers.searchFilters,
});
const mapDispatchToProps = (dispatch) => ({
  searchComplaint: (params) =>
    dispatch(RetailersActions.searchComplaint(params)),
  changeSearchFilters: (params) =>
    dispatch(RetailersActions.changeSearchFilters(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ComplaintFilters);

const styles = StyleSheet.create({
  content: {
    flexDirection: "column",
    // flex: 0.70,
    top: hp("1%"),
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
    color: Colors.white,
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
    left: wp("5%"),
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
