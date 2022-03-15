import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  ScrollView,
} from "react-native";
import BackArrowButton from "App/Components/BackArrowButton";
import { ApplicationStyles, Colors } from "App/Theme";
import { Card, TextInput } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Styles from "./CreateInfluencerStyles";
import InputText from "App/Components/FormInput/InputText";
import SearchableDropdown from "App/Components/SearchableDropdown";
import { connect } from "react-redux";
import { HelperService } from "App/Services/Utils/HelperService";
import InputMobile from "App/Components/FormInput/InputMobile";
import SelectDate from "../../../Components/SelectDate/SelectDate";
import BlueButton from "App/Components/BlueButton";
import influencerActions from "App/Stores/Influencers/Actions";
import DistributorActions from "App/Stores/Distributor/Actions";
import RetailersActions from "App/Stores/Retailers/Actions";
import _ from "lodash";
import UserActions from "App/Stores/User/Actions";
import GenericIcon from "App/Components/GenericIcon";
import NavigationService from "App/Services/NavigationService";

class CreateInfluencer extends Component {
  componentDidMount() {
    const { token, agentid } = this.props;
    this.props.getSubArea({
      token,
      agentid,
    });
    // this.props.getAreaInfo({

    // })
  }
  getPincode() {
    const { area } = this.props;
    let pincode = [];
    if (area && area.length) {
      area.map((obj) => {
        if (obj.zx_level == 6) {
          pincode.push({
            id: obj.zx_salesterritoryid,
            name: obj.zx_territoryname,
          });
        }
      });
    }
    return pincode;
  }

  getState() {
    const { subAreas } = this.props;
    let pincode = [];
    if (subAreas && subAreas.length) {
      subAreas.map((obj) => {
        if ({ id: obj.zx_parentstate, name: obj.zx_parentstatename }) {
          pincode.push({
            id: obj.zx_parentstate,
            name: obj.zx_parentstatename,
          });
        }
      });
    }
    let arr = [];
    arr = HelperService.removeDuplicateRecord(pincode);
    return arr;
  }

  getCity() {
    const { subAreas } = this.props;
    let pincode = [];
    if (subAreas && subAreas.length) {
      subAreas.map((obj) => {
        if ({ id: obj.zx_parentcity, name: obj.zx_parentcityname }) {
          pincode.push({
            id: obj.zx_parentcity,
            name: obj.zx_parentcityname,
          });
        }
      });
    }
    let arr = [];
    arr = HelperService.removeDuplicateRecord(pincode);
    return arr;
  }

  getDistrict() {
    const { subAreas } = this.props;
    let pincode = [];
    if (subAreas && subAreas.length) {
      subAreas.map((obj) => {
        if (
          {
            id: obj.zx_parentdistrict,
            name: obj.zx_parentdistrictname,
          }
        ) {
          pincode.push({
            id: obj.zx_parentdistrict,
            name: obj.zx_parentdistrictname,
          });
        }
      });
    }
    let arr = [];
    arr = HelperService.removeDuplicateRecord(pincode);
    return arr;
  }

  getZone() {
    const { subAreas } = this.props;
    let pincode = [];
    if (subAreas && subAreas.length) {
      subAreas.map((obj) => {
        if ({ id: obj.zx_parentzone, name: obj.zx_parentzonename }) {
          pincode.push({
            id: obj.zx_parentzone,
            name: obj.zx_parentzonename,
          });
        }
      });
    }
    let arr = [];
    arr = HelperService.removeDuplicateRecord(pincode);
    return arr;
  }

  getSubState() {
    const { subAreas } = this.props;
    let pincode = [];
    if (subAreas && subAreas.length) {
      subAreas.map((obj) => {
        if (
          {
            id: obj.zx_parentsubstate,
            name: obj.zx_parentsubstatename,
          }
        ) {
          pincode.push({
            id: obj.zx_parentsubstate,
            name: obj.zx_parentsubstatename,
          });
        }
      });
    }
    let arr = [];
    arr = HelperService.removeDuplicateRecord(pincode);
    return arr;
  }

  getArea() {
    const { subAreas } = this.props;
    let pincode = [];
    if (subAreas && subAreas.length) {
      subAreas.map((obj) => {
        if ({ id: obj.Id, name: obj.zx_territoryname }) {
          pincode.push({
            id: obj.Id,
            name: obj.zx_territoryname,
          });
        }
      });
    }
    return pincode;
  }

  getPincode() {
    const { subAreas } = this.props;
    let pincode = [];
    if (subAreas && subAreas.length) {
      subAreas.map((obj) => {
        if ({ id: obj.zx_parentpincode, name: obj.zx_parentpincodename }) {
          pincode.push({
            id: obj.zx_parentpincode,
            name: obj.zx_parentpincodename,
          });
        }
      });
    }
    let arr = [];
    arr = HelperService.removeDuplicateRecord(pincode);
    return arr;
  }
  // getPincode() {
  //   const { area } = this.props;
  //   let pincode = [];
  //   if (area && area.length) {
  //     area.map((obj) => {
  //       if (obj.zx_level == 6) {
  //         pincode.push({
  //           id: obj.zx_salesterritoryid,
  //           name: obj.zx_territoryname,
  //         });
  //       }
  //     });
  //   }
  //   return pincode;
  // }

  validatePhoneNumber(value) {
    let error;
    if (!value) {
      error = "Required";
    } else if (
      !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value)
    ) {
      error = "Invalid Number";
    }
    return error;
  }

  validatePhoneNumber1(value) {
    let error;
    if (!value) {
      error = "";
    } else if (
      !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value)
    ) {
      error = "Invalid Number";
    }
    return error;
  }

  validateEmail(value) {
    let error;
    if (!value) {
      error = "";
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      error = "Invalid Email";
    }
    return error;
  }

  validateEmpty(value) {
    let error;
    if (!value) {
      error = "Required";
    }
    return error;
  }

  render() {
    const {
      influencer,
      token,
      agentid,
      changeInfluenceForm,
      loading,
      validation,
      latitude,
      longitude,
      code,
    } = this.props;
    let arr = [];
    let forms = {
      createdon: HelperService.dateReadableFormat3(),
      name: influencer.name ? influencer.name : null,
      zx_designation: influencer.zx_designation
        ? influencer.zx_designation
        : null,
      zx_mobile: influencer.zx_mobile ? influencer.zx_mobile : null,
      zx_alternatemobileno: influencer.zx_alternatemobileno
        ? influencer.zx_alternatemobileno
        : null,
      telephone1: influencer.telephone1 ? influencer.telephone1 : null,
      emailaddress1: influencer.emailaddress1 ? influencer.emailaddress1 : null,
      zx_dateofbirth: HelperService.dateReadableFormatWithHyphen(
        influencer.zx_dateofbirth
      ),
      zx_dateofanniversary: HelperService.dateReadableFormatWithHyphen(
        influencer.zx_dateofanniversary
      ),
      zx_accounttype: influencer.zx_accounttype
        ? influencer.zx_accounttype
        : null,

      zx_otheraccounttype: influencer.zx_otheraccounttype
        ? influencer.zx_otheraccounttype
        : null,
      zx_nameoforganisation: influencer.zx_nameoforganisation
        ,
      address1_line1: influencer.address1_line1
        ? influencer.address1_line1
        : null,
      zx_landmark: influencer.zx_landmark ? influencer.zx_landmark : null,
      zx_area: influencer.zx_area,
      zx_city: influencer.zx_city,
      zx_district: influencer.zx_district,
      zx_substate: influencer.zx_substate,
      zx_state: influencer.zx_state,
      zx_zone: influencer.zx_zone,
      zx_pincode: influencer.zx_pincode,
      address1_latitude: 28.661135,
      address1_longitude: 77.263301,
      zx_brandgroup: code.zx_brandgroup,
      zx_secondarysaletype: arr.concat(code.zx_saletype),
    };

    return (
      <View style={Styles.mainContainer}>
        <Card
          style={
            code.zx_brandgroupcode == "1"
              ? Styles.cardstyle1
              : Styles.cardstyleBlue1
          }
        >
          <TouchableOpacity
            onPress={() => {
              NavigationService.navigate("MenuScreen");
            }}
            style={{ width: wp("10%"), left: wp("2%") }}
          >
            <GenericIcon
              name={"arrow-back"}
              style={{
                fontSize: 30,
                color: "white",
              }}
            />
          </TouchableOpacity>
          <Text style={Styles.title}>
            {"Create "}
            <Text style={Styles.titleText}>{"Influencers"}</Text>
          </Text>
        </Card>
        <ScrollView style={{ bottom: hp("10%") }}>
          <View style={Styles.outerView}>
            <View style={Styles.dropDown}>
              <Text style={Styles.textStyle}>Influencer Type*</Text>
              <View style={Styles.dropDownInner}>
                <SearchableDropdown
                  dataSource={[
                    { id: "Contractor", name: "Contractor" },
                    { id: "Consultant", name: "Consultant" },
                    { id: "Builder", name: "Builder" },
                    { id: "Architect", name: "Architect" },
                    { id: "End User", name: "End User" },
                    { id: "Government", name: "Government" },
                    { id: "Others", name: "Others" },
                  ]}
                  placeHolderText={"Enter Influencer Type"}
                  selectedValue={influencer.zx_accounttype}
                  onChange={(value) =>
                    this.props.changeInfluenceForm({
                      edited_field: "zx_accounttype",
                      edited_value: value,
                    })
                  }
                  placeholder={"Enter Influencer Type"}
                  invalid={false}
                  customPickerStyles={{ ...Styles.picker }}
                  labelStyles={{
                    color: Colors.black,
                    fontFamily: ApplicationStyles.textFont,
                    // textAlign: "center",
                    //   width: "99%",
                    //  padding:5,
                    fontSize: 13,
                    flexDirection: "row",
                  }}
                  invalid={
                    validation.invalid &&
                    validation.invalid_field == "zx_accounttype"
                  }
                />
              </View>
            </View>

            {influencer.zx_accounttype == "Others" ? (
              <View>
                <TextInput
                  style={{
                    height: hp("5%"),
                    marginTop: "2%",
                    borderRadius: 5,
                    paddingBottom: 61,
                    width: "130%",
                    borderColor: Colors.lightGrey,
                    borderWidth: 1,
                    backgroundColor: "white",
                  }}
                  placeholder={"Enter Influencer Type"}
                  value={influencer.zx_otheraccounttype}
                  onChangeText={(value) => changeInfluenceForm(value)}
                  // error={
                  //     validation.invalid &&
                  //     validation.invalid_field == "zx_otheraccounttype"
                  //   }

                  //label={'Other*'}
                />
                <Text style={{ color: "red", left: wp("1%") }}>
                  {this.validateEmpty(influencer.zx_otheraccounttype)}
                </Text>
              </View>
            ) : (
              []
            )}

            <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>Name of the person*</Text>
              <InputText
                style={Styles.placeholder}
                placeholder={"Enter Name"}
                value={influencer.name}
                onChange={(value) =>
                  this.props.changeInfluenceForm({
                    edited_field: "name",
                    edited_value: value,
                  })
                }
                // error={
                //   validation.invalid &&
                //   validation.invalid_field == "name"
                // }
              />
            </View>

            <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>Designation*</Text>
              <InputText
                style={Styles.placeholder}
                placeholder={"Enter Designation"}
                value={influencer.zx_designation}
                onChange={(value) =>
                  this.props.changeInfluenceForm({
                    edited_field: "zx_designation",
                    edited_value: value,
                  })
                }
                error={
                  validation.invalid &&
                  validation.invalid_field == "zx_designation"
                }
              />
            </View>

            <View>
              <View style={Styles.textView1}>
                <Text style={Styles.textStyle}>Mobile No.*</Text>
                <InputMobile
                  style={Styles.placeholder}
                  placeholder={"Enter Mobile No."}
                  value={influencer.zx_mobile}
                  onChange={(value) =>
                    this.props.changeInfluenceForm({
                      edited_field: "zx_mobile",
                      edited_value: value,
                    })
                  }
                  maxLength={10}
                  error={
                    validation.invalid &&
                    validation.invalid_field == "zx_mobile"
                  }
                />
              </View>
              <Text style={{ color: "red", left: wp("1%") }}>
                {this.validatePhoneNumber(influencer.zx_mobile)}
              </Text>
            </View>

            <View>
              <View style={Styles.textView1}>
                <Text style={Styles.textStyle}>Alternate Mobile No.</Text>
                <InputMobile
                  style={Styles.placeholder}
                  maxLength={10}
                  placeholder={"Enter Alternate No."}
                  value={influencer.zx_alternatemobileno}
                  onChange={(value) =>
                    this.props.changeInfluenceForm({
                      edited_field: "zx_alternatemobileno",
                      edited_value: value,
                    })
                  }
                />
              </View>
              <Text style={{ color: "red", left: wp("7%") }}>
                {this.validatePhoneNumber1(influencer.zx_alternatemobileno)}
              </Text>
            </View>

            <View>
              <View style={Styles.textView1}>
                <Text style={Styles.textStyle}>Landline No.</Text>
                <InputMobile
                  style={Styles.placeholder}
                  maxLength={10}
                  placeholder={"Enter Landline No."}
                  value={influencer.telephone1}
                  onChange={(value) =>
                    this.props.changeInfluenceForm({
                      edited_field: "telephone1",
                      edited_value: value,
                    })
                  }
                />
              </View>
              <Text style={{ color: "red", left: wp("7%") }}>
                {this.validatePhoneNumber1(influencer.telephone1)}
              </Text>
            </View>

            <View>
              <View style={Styles.textView1}>
                <Text style={Styles.textStyle}>Email Id</Text>
                <InputText
                  style={Styles.placeholder}
                  placeholder={"Enter Email Id"}
                  value={influencer.emailaddress1}
                  onChange={(value) =>
                    this.props.changeInfluenceForm({
                      edited_field: "emailaddress1",
                      edited_value: value,
                    })
                  }
                />
              </View>
              <Text style={{ color: "red", left: wp("7%") }}>
                {this.validateEmail(influencer.emailaddress1)}
              </Text>
            </View>

            <View
              style={{
                width: wp("35%"),
                height: hp("12%"),
                borderBottomWidth: 1,
                borderColor: Colors.lightGrey,
                marginTop: hp("1.5%"),
              }}
            >
              <Text style={Styles.textStyle}>Date of Birth</Text>
              <SelectDate
                date={influencer.zx_dateofbirth}
                maxDate={new Date()}
                onDateChange={(date) =>
                  this.props.changeInfluenceForm({
                    edited_field: "zx_dateofbirth",
                    edited_value: date,
                  })
                }
                // error={
                //   validation.invalid &&
                //   validation.invalid_field == "zx_dateofbirth"
                // }
              />
            </View>

            <View
              style={{
                width: wp("40%"),
                height: hp("12%"),
                borderBottomWidth: 1,
                borderColor: Colors.lightGrey,
                marginTop: hp("1.5%"),
                marginLeft: wp("10%"),
              }}
            >
              <Text style={Styles.textStyle}>Date of Anniversary</Text>
              <SelectDate
                date={influencer.zx_dateofanniversary}
                maxDate={new Date()}
                onDateChange={(date) =>
                  this.props.changeInfluenceForm({
                    edited_field: "zx_dateofanniversary",
                    edited_value: date,
                  })
                }
              />
            </View>

            <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>Name of the Organization*</Text>
              <InputText
                style={Styles.placeholder}
                placeholder={"Enter Organization Name"}
                value={influencer.zx_nameoforganisation}
                onChange={(value) =>
                  this.props.changeInfluenceForm({
                    edited_field: "zx_nameoforganisation",
                    edited_value: value,
                  })
                }
                error={
                  validation.invalid &&
                  validation.invalid_field == "zx_nameoforganisation"
                }
              />
            </View>

            <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>Address*</Text>
              <InputText
                style={Styles.placeholder}
                placeholder={"Enter Address"}
                value={influencer.address1_line1}
                onChange={(value) =>
                  this.props.changeInfluenceForm({
                    edited_field: "address1_line1",
                    edited_value: value,
                  })
                }
                error={
                  validation.invalid &&
                  validation.invalid_field == "address1_line1"
                }
              />
            </View>

            <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>Landmark</Text>
              <InputText
                style={Styles.placeholder}
                placeholder={"Enter Landmark"}
                value={influencer.zx_landmark}
                onChange={(value) =>
                  this.props.changeInfluenceForm({
                    edited_field: "zx_landmark",
                    edited_value: value,
                  })
                }
              />
            </View>

            <View style={Styles.dropDown}>
              <Text style={Styles.textStyle}>Area*</Text>

              <View style={Styles.dropDownInner}>
                <SearchableDropdown
                  dataSource={this.getArea()}
                  placeHolderText={"Select Area"}
                  selectedValue={influencer.zx_area}
                  onChange={(value) =>
                    this.props.changeInfluenceForm({
                      edited_field: "zx_area",
                      edited_value: value,
                    })
                  }
                  placeholder={"Select Area"}
                  invalid={false}
                  customPickerStyles={{ ...Styles.picker }}
                  labelStyles={{
                    color: Colors.black,
                    fontFamily: ApplicationStyles.textFont,
                    // textAlign: "center",
                    //   width: "99%",
                    //  padding:5,
                    fontSize: 13,
                    flexDirection: "row",
                  }}
                  key={influencer.zx_area + _.uniqueId()}
                  invalid={
                    validation.invalid && validation.invalid_field == "zx_area"
                  }
                  //  label={"Area"}
                />
              </View>
            </View>

            <View style={Styles.dropDown}>
              <Text style={Styles.textStyle}>Zone*</Text>

              <View style={Styles.dropDownInner}>
                <SearchableDropdown
                  dataSource={this.getZone()}
                  placeHolderText={"Select Zone"}
                  selectedValue={influencer.zx_zone}
                  onChange={(value) =>
                    this.props.changeInfluenceForm({
                      edited_field: "zx_zone",
                      edited_value: value,
                    })
                  }
                  placeholder={"Select Zone"}
                  invalid={false}
                  customPickerStyles={{ ...Styles.picker }}
                  labelStyles={{
                    color: Colors.black,
                    fontFamily: ApplicationStyles.textFont,
                    // textAlign: "center",
                    //   width: "99%",
                    //  padding:5,
                    fontSize: 13,
                    flexDirection: "row",
                  }}
                  key={influencer.zx_zone + _.uniqueId()}
                  invalid={
                    validation.invalid && validation.invalid_field == "zx_zone"
                  }
                  //  disablePicker={true}
                  //  label={"Area"}
                />
              </View>
            </View>

            <View style={Styles.dropDown}>
              <Text style={Styles.textStyle}>State*</Text>

              <View style={Styles.dropDownInner}>
                <SearchableDropdown
                  dataSource={this.getState()}
                  placeHolderText={"Select State"}
                  selectedValue={influencer.zx_state}
                  onChange={(value) =>
                    this.props.changeInfluenceForm({
                      edited_field: "zx_state",
                      edited_value: value,
                    })
                  }
                  placeholder={"Select State"}
                  invalid={false}
                  customPickerStyles={{ ...Styles.picker }}
                  labelStyles={{
                    color: Colors.black,
                    fontFamily: ApplicationStyles.textFont,
                    // textAlign: "center",
                    //   width: "99%",
                    //  padding:5,
                    fontSize: 13,
                    flexDirection: "row",
                  }}
                  key={influencer.zx_state + _.uniqueId()}
                  invalid={
                    validation.invalid && validation.invalid_field == "zx_state"
                  }
                  // disablePicker={true}
                  //  label={"Area"}
                />
              </View>
            </View>

            <View style={Styles.dropDown}>
              <Text style={Styles.textStyle}>Sub State/Market Circle*</Text>

              <View style={Styles.dropDownInner}>
                <SearchableDropdown
                  dataSource={this.getSubState()}
                  placeHolderText={"Select Sub State/Market Circle"}
                  selectedValue={influencer.zx_substate}
                  onChange={(value) =>
                    this.props.changeInfluenceForm({
                      edited_field: "zx_substate",
                      edited_value: value,
                    })
                  }
                  placeholder={"Select Sub State/Market Circle"}
                  invalid={false}
                  customPickerStyles={{ ...Styles.picker }}
                  labelStyles={{
                    color: Colors.black,
                    fontFamily: ApplicationStyles.textFont,
                    // textAlign: "center",
                    //   width: "99%",
                    //  padding:5,
                    fontSize: 13,
                    flexDirection: "row",
                  }}
                  key={influencer.zx_substate + _.uniqueId()}
                  invalid={
                    validation.invalid &&
                    validation.invalid_field == "zx_substate"
                  }
                  // disablePicker={true}
                  //  label={"Area"}
                />
              </View>
            </View>

            <View style={Styles.dropDown}>
              <Text style={Styles.textStyle}>District*</Text>

              <View style={Styles.dropDownInner}>
                <SearchableDropdown
                  dataSource={this.getDistrict()}
                  placeHolderText={"Select District"}
                  selectedValue={influencer.zx_district}
                  onChange={(value) =>
                    this.props.changeInfluenceForm({
                      edited_field: "zx_district",
                      edited_value: value,
                    })
                  }
                  placeholder={"Select District"}
                  invalid={false}
                  customPickerStyles={{ ...Styles.picker }}
                  labelStyles={{
                    color: Colors.black,
                    fontFamily: ApplicationStyles.textFont,
                    // textAlign: "center",
                    //   width: "99%",
                    //  padding:5,
                    fontSize: 13,
                    flexDirection: "row",
                  }}
                  key={influencer.zx_district + _.uniqueId()}
                  invalid={
                    validation.invalid &&
                    validation.invalid_field == "zx_district"
                  }
                  // disablePicker={true}
                  //  label={"Area"}
                />
              </View>
            </View>

            <View style={Styles.dropDown}>
              <Text style={Styles.textStyle}>City/Town*</Text>

              <View style={Styles.dropDownInner}>
                <SearchableDropdown
                  dataSource={this.getCity()}
                  placeHolderText={"Select City/Town"}
                  selectedValue={influencer.zx_city}
                  onChange={(value) =>
                    this.props.changeInfluenceForm({
                      edited_field: "zx_city",
                      edited_value: value,
                    })
                  }
                  placeholder={"Select City/Town"}
                  invalid={false}
                  customPickerStyles={{ ...Styles.picker }}
                  labelStyles={{
                    color: Colors.black,
                    fontFamily: ApplicationStyles.textFont,
                    // textAlign: "center",
                    //   width: "99%",
                    //  padding:5,
                    fontSize: 13,
                    flexDirection: "row",
                  }}
                  key={influencer.zx_city + _.uniqueId()}
                  invalid={
                    validation.invalid && validation.invalid_field == "zx_city"
                  }
                  // disablePicker={true}
                  //  label={"Area"}
                />
              </View>
            </View>

            <View style={Styles.dropDown}>
              <Text style={Styles.textStyle}>Pin Code*</Text>

              <View style={Styles.dropDownInner}>
                <SearchableDropdown
                  dataSource={this.getPincode()}
                  placeHolderText={"Select Pincode"}
                  selectedValue={influencer.zx_pincode}
                  onChange={
                    (value) =>
                      this.props.changeInfluenceForm({
                        edited_field: "zx_pincode",
                        edited_value: value,
                      })
                    // this.props.getPincodeInfo({
                    //   id: value,
                    //   token,
                    //   show:"influncer"
                    // })
                  }
                  placeholder={"Select Pincode"}
                  invalid={false}
                  customPickerStyles={{ ...Styles.picker }}
                  labelStyles={{
                    color: Colors.black,
                    fontFamily: ApplicationStyles.textFont,
                    // textAlign: "center",
                    //   width: "99%",
                    //  padding:5,
                    fontSize: 13,
                    flexDirection: "row",
                  }}
                  key={influencer.zx_pincode + _.uniqueId()}
                  invalid={
                    validation.invalid &&
                    validation.invalid_field == "zx_pincode"
                  }
                  //  label={"Area"}
                />
              </View>
            </View>

            <View style={{ marginLeft: hp("15%"), marginTop: hp("15%") }}>
              <BlueButton
                style={
                  code.zx_brandgroupcode == "1"
                    ? Styles.button
                    : Styles.buttonBlue
                }
                title={"SAVE"}
                onPress={() =>
                  this.props.influencerForm({ form: forms, token })
                }
                disabled={loading}
                loading={loading}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    agentid: state.user.id,
    validation: state.influencers.influencerFormValidation,
    loading: state.influencers.influencerLoader,
    influencer: state.influencers.influencer,
    area: state.distributor.getArea,
    pincodeInfo: state.retailers.pincodeInfo,
    pincodeInfoLOader: state.retailers.getPincodeInfoLoader,
    areaInfo: state.retailers.areaInfo,
    areaInfoLOader: state.retailers.getAreaInfoLoader,
    getAllAreaLoader: state.distributor.getAllAreaLoader,
    latitude: state.user.latitude,
    longitude: state.user.longitude,
    code: state.user.user_details,
    subAreas: state.user.subAreas,
  };
};

const mapDispatchToProps = (dispatch) => ({
  influencerForm: (params) =>
    dispatch(influencerActions.influencerForm(params)),
  changeInfluenceForm: (params) =>
    dispatch(influencerActions.changeInfluenceForm(params)),
  clearForm: (params) => dispatch(RetailersActions.clearForm(params)),
  getAllArea: (params) => dispatch(DistributorActions.getAllArea(params)),
  getPincodeInfo: (params) => dispatch(RetailersActions.getPincodeInfo(params)),
  getAreaInfo: (params) => dispatch(RetailersActions.getAreaInfo(params)),
  influencerFormValidationFailed: (params) =>
    dispatch(influencerActions.influencerFormValidationFailed(params)),
  getSubArea: (params) => dispatch(UserActions.getSubArea(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateInfluencer);
