import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import BackArrowButton from "App/Components/BackArrowButton";
import { ApplicationStyles, Colors } from "App/Theme";
import { Card } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SearchableDropdown from "App/Components/SearchableDropdown";
import { connect } from "react-redux";
import RetailersActions from "App/Stores/Retailers/Actions";
import SearchBar from "App/Components/SearchBar";

class ComplaintLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
    };
  }
  componentDidMount() {
    const { token } = this.props;
    this.state.timer = setTimeout(
      () =>
        this.props.getAllLocation({
          token,
        }),
      3000
    );
  }
  getLocation() {
    const { location } = this.props;
    let pincode = [];
    if (location && location.length) {
      location.map((obj) => {
        if ({ id: obj.accountId, name: obj.name }) {
          pincode.push({ id: obj.accountId, name: obj.name });
        }
      });
    }
    return pincode;
  }
  render() {
    const { children, complaintForm } = this.props;
    const comtype = [
      { id: "Technical", name: "Technical" },
      { id: "Commercial", name: "Commercial" },
    ];
    return (
      <View>
        <Card style={Styles.cardstyle}>
          <BackArrowButton style={Styles.backarrow} />
          <Text style={Styles.title}>
            {"Create "}
            <Text style={Styles.titleText}>{"New Complaint"}</Text>
          </Text>

          <View
            style={{
              height: hp("10%"),
              width: wp("88%"),
              marginLeft: wp("3%"),
              marginTop: hp("-2%"),
              bottom: hp("2%"),
            }}
          >
            <SearchableDropdown
              placeHolderText={"Select Complaint Type "}
              dataSource={comtype}
              selectedValue={complaintForm.zx_complainttype}
              onChange={(value) =>
                this.props.changeComplaintForm({
                  edited_field: "zx_complainttype",
                  edited_value: value,
                })
              }
              placeholder={"Select Complaint Type"}
              invalid={false}
              customPickerStyles={{ ...Styles.picker1 }}
              labelStyles={{ ...Styles.pickerLabel }}
            />
          </View>
          <View
            style={{
              height: hp("10%"),
              width: wp("88%"),
              marginLeft: wp("3%"),
              marginTop: hp("-5.5%"),
            }}
          >
            <SearchableDropdown
              placeHolderText={"Select Location "}
              dataSource={this.getLocation()}
              selectedValue={complaintForm.zx_location}
              onChange={(value) =>
                this.props.changeComplaintForm({
                  edited_field: "zx_location",
                  edited_value: value,
                })
              }
              placeholder={"Select Location "}
              invalid={false}
              labelStyles={{ ...Styles.pickerLabel }}
              customPickerStyles={{ ...Styles.picker1 }}
            />
          </View>
        </Card>

        {children}
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.user.token,
  location: state.retailers.getAllLocation,
  complaintForm: state.retailers.complaintForm,
});

const mapDispatchToProps = (dispatch) => ({
  getAllLocation: (params) => dispatch(RetailersActions.getAllLocation(params)),
  changeComplaintForm: (params) =>
    dispatch(RetailersActions.changeComplaintForm(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ComplaintLayout);
const Styles = StyleSheet.create({
  status: {
    color: Colors.white,

    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: 8,
    // marginBottom: 3,
    backgroundColor: "#D7561EB3",
    width: wp(24),
    padding: wp(0.5),
    borderRadius: 5,
    top: hp("1%"),
    left: wp("3%"),
    height: hp("2%"),
    textAlign: "center",
  },
  cardstyle: {
    flexDirection: "column",
    paddingTop: hp("2%"),
    paddingBottom: hp("1%"),
    width: wp("100%"),
    paddingLeft: wp("2%"),
    paddingRight: wp("2%"),
    elevation: 10,
    backgroundColor: Colors.background,
    height: hp("23%"),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "8%",
    borderBottomLeftRadius: 65,
    borderBottomRightRadius: 65,
  },
  backarrow: {
    color: Colors.black,
    fontSize: 32,
    paddingRight: wp("90%"),
  },

  title: {
    color: Colors.white,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 28,
    fontWeight: "bold",
    left: wp("13%"),
    top: hp("-2%"),
  },
  titleText: {
    color: Colors.black,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 28,
    fontWeight: "bold",
  },
  pickerLabel: {
    color: Colors.black,
    flexDirection: "row",
    fontFamily: ApplicationStyles.textFont,
    fontSize: 15,
    padding: 5,
    // textAlign: "left",
    width: "99%",
  },
  picker1: {
    borderRadius: hp("1%"),
    width: wp("70%"),
    minHeight: hp("5.7%"),
    marginBottom: hp("2%"),
    marginLeft: "18%",
  },
});
