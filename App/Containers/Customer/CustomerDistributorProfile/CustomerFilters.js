import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import BackArrowButton from "App/Components/BackArrowButton";
import BlueButton from "../../../Components/BlueButton/BlueButton";
import {
  Icon,
  Input,
  Button,
  ListItem,
  Radio,
  Left,
  Right,
  CheckBox,
  Label,
} from "native-base";

export default function CustomerFilters() {
  const [menuItems, setMenuItems] = useState([
    { id: "1", name: "Brand" },
    { id: "2", name: "Item Class" },
  ]);

  // this holds the keys of the menuItems for the view to know which category is currently being rendered.
  const [selectedItem, setSelectedItem] = useState("1");
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
        <View style={styles.menuColumn}>
          {menuItems.map((item, index) => {
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => setSelectedItem(item.id)}
                style={[
                  styles.menuItem,
                  item.id === selectedItem ? styles.selectedMenuItem : null,
                ]}
              >
                <Text style={styles.menuItemText}>{item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.settingsColumn}>
          {/* Option 1: AGE */}
          {selectedItem === "1" && (
            <View style={styles.settingsView}>
              <View style={{ flexDirection: "column", top: hp("1%") }}>
                <View style={{ marginTop: hp("-5%"), flexDirection: "row" }}>
                  <Label style={{ marginLeft: wp("20%"), top: "14.5%" }}>
                    {"Prince Pipes"}
                  </Label>
                  <CheckBox
                    style={{ marginLeft: wp("-40%"), top: "17%" }}
                    //  checked={complaintForm.zx_sampleitem == true  }
                    //  onPress={(event) => {
                    //    let updatedValue = complaintForm.zx_sampleitem== true? false:true
                    //    this.props.changeComplaintForm({ edited_field: 'zx_sampleitem', edited_value: updatedValue })
                    //   }
                    //   }
                  />
                </View>

                <View style={{ marginTop: hp("-3%"), flexDirection: "row" }}>
                  <Label style={{ marginLeft: wp("20%"), top: "28%" }}>
                    {"Trubore"}
                  </Label>
                  <CheckBox
                    style={{ marginLeft: wp("-30%"), top: "30%" }}
                    //   checked={complaintForm.zx_unloading == true}
                    //   onPress={(event) => {
                    //     let updatedValue = complaintForm.zx_unloading== true? false : true
                    //     this.props.changeComplaintForm({ edited_field: 'zx_unloading', edited_value: updatedValue })
                    //   }
                    //   }
                  />
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
      <View
        style={{
          height: hp("5%"),
          marginTop: hp("53%"),
          left: wp("8.5%"),
          width: wp("37%"),
        }}
      >
        <BlueButton style={{ ...styles.button }} title={"CANCEL"} />
      </View>
      <View
        style={{
          height: hp("5%"),
          marginTop: hp("-5%"),
          width: wp("38%"),
          left: wp("55%"),
        }}
      >
        <BlueButton style={{ ...styles.button1 }} title={"Apply filter"} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
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
