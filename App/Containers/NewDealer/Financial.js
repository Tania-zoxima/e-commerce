import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import InputText from "App/Components/FormInput/InputText";
import { Radio } from "native-base";
import DistributorActions from "App/Stores/Distributor/Actions";
import { connect } from "react-redux";
import AddEntity from "./AddEntity";
import _ from "lodash";
import AddCustomer from "./AddCustomer";
import AddFirm from "./AddFirm";
import UserActions from "App/Stores/User/Actions";
import GenericIcon from "App/Components/GenericIcon";
import SearchableDropdown from "App/Components/SearchableDropdown";
import { HelperService } from "../../Services/Utils/HelperService";

class Financial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      inputs: [
        {
          itemsubcategory: "",
          zx_l2lysales: "",
          zx_lysales: "",
          zx_cysales: "",
        },
      ],
      customer: [
        {
          zx_nameofthecustomer: "",
          itemsubcategory: "",
          zx_categorysold: "",
        },
      ],
      firm: [
        {
          zx_district: "",
          zx_town: "",
          itemsubcategory: "",
          zx_estimatedbusinessinfirstyearinlakhs: "",
        },
      ],
    };
  }
  componentDidMount() {
    const { token, agentid, distributorForm } = this.props;
    this.state.timer = setTimeout(
      () =>
        this.props.getSubCategory({
          token,
        }),
      1000
    );
    this.state.timer = setTimeout(
      () =>
        this.props.getSubArea({
          token,
          agentid,
        }),
      2000
    );
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

  addHandler = () => {
    const _inputs = [...this.state.inputs];
    _inputs.push({
      itemsubcategory: "",
      zx_l2lysales: "",
      zx_lysales: "",
      zx_cysales: "",
    });
    this.setState({ inputs: _inputs });
    this.props.addSale(_inputs);
  };

  deleteHandler = (key) => {
    const _inputs = this.state.inputs.filter((input, index) => index != key);
    this.setState({ inputs: _inputs });
    this.props.addSale(_inputs);
  };

  inputHandler = (text, key, param) => {
    // console.log("ggggggggg", text, key, param);
    const _inputs = [...this.state.inputs];
    if (param == "itemsubcategory") {
      _inputs[key].itemsubcategory = text;
    }
    if (param == "zx_l2lysales") {
      _inputs[key].zx_l2lysales = text;
    }
    if (param == "zx_lysales") {
      _inputs[key].zx_lysales = text;
    }
    if (param == "zx_cysales") {
      _inputs[key].zx_cysales = text;
    }
    this.setState({ inputs: _inputs });
    this.props.addSale(_inputs);
  };

  getNode() {
    const { form, removeForm, changeForm } = this.props;
    let brandsNode = [];

    if (form.length) {
      form.map((obj, index) => {
        brandsNode.push(
          <AddEntity
            form={obj}
            key={obj.id + index}
            removeForm={(params) => removeForm(params)}
            data={this.getData()}
            changeForm={(params) => changeForm({ ...params, id: obj.id })}
          />
        );
      });
    }
    return brandsNode;
  }

  addCustomerHandler = () => {
    const _customer = [...this.state.customer];
    _customer.push({
      zx_nameofthecustomer: "",
      itemsubcategory: "",
      zx_categorysold: "",
    });
    this.setState({ customer: _customer });
    this.props.bestCustomer(_customer);
  };

  deleteCustomerHandler = (key) => {
    const _customer = this.state.customer.filter(
      (input, index) => index != key
    );
    this.setState({ customer: _customer });
    this.props.bestCustomer(_customer);
  };

  inputCustomerHandler = (text, key, param) => {
    // console.log("ggggggggg", text, key, param);
    const _customer = [...this.state.customer];
    if (param == "zx_nameofthecustomer") {
      _customer[key].zx_nameofthecustomer = text;
    }
    if (param == "itemsubcategory") {
      _customer[key].itemsubcategory = text;
    }
    if (param == "zx_categorysold") {
      _customer[key].zx_categorysold = text;
    }
    this.setState({ customer: _customer });
    this.props.bestCustomer(_customer);
  };

  getNode1() {
    const { formCustomer, removeCustomerForm, changeCustomerForm } = this.props;
    let brandsNode = [];

    if (formCustomer.length) {
      formCustomer.map((obj, index) => {
        brandsNode.push(
          <AddCustomer
            formCustomer={obj}
            key={obj.id + index}
            removeCustomerForm={(params) => removeCustomerForm(params)}
            data={this.getData()}
            changeCustomerForm={(params) =>
              changeCustomerForm({ ...params, id: obj.id })
            }
          />
        );
      });
    }
    return brandsNode;
  }

  addFirmHandler = () => {
    const _firm = [...this.state.firm];
    _firm.push({
      zx_district: "",
      zx_town: "",
      itemsubcategory: "",
      zx_estimatedbusinessinfirstyearinlakhs: "",
    });
    this.setState({ firm: _firm });
    this.props.firstYearSale(_firm);
  };

  deleteFirmHandler = (key) => {
    const _firm = this.state.firm.filter((input, index) => index != key);
    this.setState({ firm: _firm });
    this.props.firstYearSale(_firm);
  };

  inputFirmHandler = (text, key, param) => {
    // console.log("ggggggggg", text, key, param);
    const _firm = [...this.state.firm];
    if (param == "zx_district") {
      _firm[key].zx_district = text;
    }
    if (param == "zx_town") {
      _firm[key].zx_town = text;
    }
    if (param == "itemsubcategory") {
      _firm[key].itemsubcategory = text;
    }
    if (param == "zx_estimatedbusinessinfirstyearinlakhs") {
      _firm[key].zx_estimatedbusinessinfirstyearinlakhs = text;
    }
    this.setState({ firm: _firm });
    this.props.firstYearSale(_firm);
  };

  getNode2() {
    const { formFirm, removeFirmForm, changeFirmForm } = this.props;
    let brandsNode = [];

    if (formFirm.length) {
      formFirm.map((obj, index) => {
        brandsNode.push(
          <AddFirm
            formFirm={obj}
            key={obj.id + index}
            removeFirmForm={(params) => removeFirmForm(params)}
            data={this.getData()}
            town={this.getCity()}
            district={this.getDistrict()}
            changeFirmForm={(params) =>
              changeFirmForm({ ...params, id: obj.id })
            }
          />
        );
      });
    }
    return brandsNode;
  }
  getCustomerSale() {
    const {
      distributorForm,
      formCustomer,
      removeCustomerForm,
      changeCustomerForm,
      changeUpdateCustomerForm,
    } = this.props;
    let price = [];
    if (distributorForm && !_.isEmpty(distributorForm)) {
      distributorForm.previouscustomerdetails.map((obj1) => {
        price.push(
          <AddCustomer
            formCustomer={obj1}
            key={obj1.Id}
            removeCustomerForm={(params) => removeCustomerForm(params)}
            data={this.getData()}
            changeUpdateCustomerForm={(params) =>
              changeUpdateCustomerForm({ ...params, id: obj1.Id })
            }
          />
        );
      });
    }
    return price;
  }

  getTotalSale() {
    const {
      distributorForm,
      form,
      removeForm,
      changeForm,
      changeUpdateStockForm,
    } = this.props;
    let price = [];
    if (distributorForm && !_.isEmpty(distributorForm)) {
      distributorForm.distributorlastthreeyearsale.map((obj1) => {
        price.push(
          <AddEntity
            form={obj1}
            key={obj1.Id}
            removeForm={(params) => removeForm(params)}
            data={this.getData()}
            changeUpdateStockForm={(params) =>
              changeUpdateStockForm({ ...params, id: obj1.Id })
            }
          />
        );
      });
    }
    return price;
  }

  getSale() {
    const {
      distributorForm,
      formFirm,
      removeFirmForm,
      changeFirmForm,
      changeUpdateFirmForm,
    } = this.props;
    let price = [];
    if (distributorForm && !_.isEmpty(distributorForm)) {
      distributorForm.salesassuredbythefirm.map((obj1) => {
        price.push(
          <AddFirm
            formFirm={obj1}
            key={obj1.Id}
            removeFirmForm={(params) => removeFirmForm(params)}
            data={this.getData()}
            town={this.getCity()}
            district={this.getDistrict()}
            changeUpdateFirmForm={(params) =>
              changeUpdateFirmForm({ ...params, id: obj1.Id })
            }
          />
        );
      });
    }
    return price;
  }

  getData() {
    const { subcategory } = this.props;
    let data = [];
    if (subcategory && subcategory.length) {
      subcategory.map((obj) => {
        if ({ id: obj.id, name: obj.zx_description }) {
          data.push({
            id: obj.id,
            name: obj.zx_description,
          });
        }
      });
    }
    return data;
  }

  render() {
    const {
      distributorForm,
      changeDistributorForm,
      validation,
      distributorFormUpdate,
      submitValidation,
      addForm,
      addCustomerForm,
      addFirmForm,
    } = this.props;
    // console.log("kkkkkkkkkkkk", this.props.sale);
    return (
      <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView style={{  flex: 1,marginBottom: hp("30%") }}>
        <View style={{ marginBottom: hp(10) }}>
          <View>
            <Text style={{ left: wp("8%"), fontWeight: "bold" }}>
              Gross Turnover(Per Annum)*
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                left: wp("6%"),
                top: hp(1),
                marginBottom: hp(2),
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: wp(30),
                  justifyContent: "space-around",
                }}
              >
                <Text style={{ color: Colors.lightGrey }}>{"<2 CR"}</Text>
                <Radio
                  onPress={() => {
                    distributorForm.zx_overallstatus ==
                      "Pending for approval" ||
                    distributorForm.zx_overallstatus == "Approved"
                      ? []
                      : changeDistributorForm({
                          edited_field: "zx_grossturnoverperannum",
                          edited_value: "<2 CR",
                        });
                  }}
                  // selected={false}
                  disabled={
                    distributorForm.zx_overallstatus ==
                      "Pending for approval" ||
                    distributorForm.zx_overallstatus == "Approved"
                      ? true
                      : false
                  }
                  selected={distributorForm.zx_grossturnoverperannum == "<2 CR"}
                  error={
                    validation.invalid &&
                    validation.invalid_field == "zx_grossturnoverperannum"
                  }
                  selectedColor={Colors.button}
                  color={Colors.button}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: wp(30),
                  justifyContent: "space-around",
                }}
              >
                <Text style={{ color: Colors.lightGrey }}>{"2-3 CR"}</Text>
                <Radio
                  onPress={() => {
                    distributorForm.zx_overallstatus ==
                      "Pending for approval" ||
                    distributorForm.zx_overallstatus == "Approved"
                      ? []
                      : changeDistributorForm({
                          edited_field: "zx_grossturnoverperannum",
                          edited_value: "2-3 CR",
                        });
                  }}
                  // selected={false}
                  disabled={
                    distributorForm.zx_overallstatus ==
                      "Pending for approval" ||
                    distributorForm.zx_overallstatus == "Approved"
                      ? true
                      : false
                  }
                  selected={
                    distributorForm.zx_grossturnoverperannum == "2-3 CR"
                  }
                  selectedColor={Colors.button}
                  color={Colors.button}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: wp(30),
                  justifyContent: "space-around",
                }}
              >
                <Text style={{ color: Colors.lightGrey }}>{"3-5 CR"}</Text>
                <Radio
                  onPress={() => {
                    distributorForm.zx_overallstatus ==
                      "Pending for approval" ||
                    distributorForm.zx_overallstatus == "Approved"
                      ? []
                      : changeDistributorForm({
                          edited_field: "zx_grossturnoverperannum",
                          edited_value: "3-5 CR",
                        });
                  }}
                  // selected={false}
                  disabled={
                    distributorForm.zx_overallstatus ==
                      "Pending for approval" ||
                    distributorForm.zx_overallstatus == "Approved"
                      ? true
                      : false
                  }
                  selected={
                    distributorForm.zx_grossturnoverperannum == "3-5 CR"
                  }
                  selectedColor={Colors.button}
                  color={Colors.button}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: wp(30),
                  justifyContent: "space-around",
                }}
              >
                <Text style={{ color: Colors.lightGrey }}>{"5-8 CR"}</Text>
                <Radio
                  onPress={() => {
                    distributorForm.zx_overallstatus ==
                      "Pending for approval" ||
                    distributorForm.zx_overallstatus == "Approved"
                      ? []
                      : changeDistributorForm({
                          edited_field: "zx_grossturnoverperannum",
                          edited_value: "5-8 CR",
                        });
                  }}
                  // selected={false}
                  disabled={
                    distributorForm.zx_overallstatus ==
                      "Pending for approval" ||
                    distributorForm.zx_overallstatus == "Approved"
                      ? true
                      : false
                  }
                  selected={
                    distributorForm.zx_grossturnoverperannum == "5-8 CR"
                  }
                  selectedColor={Colors.button}
                  color={Colors.button}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: wp(30),
                  justifyContent: "space-around",
                }}
              >
                <Text style={{ color: Colors.lightGrey }}>{">8 CR"}</Text>
                <Radio
                  onPress={() => {
                    distributorForm.zx_overallstatus ==
                      "Pending for approval" ||
                    distributorForm.zx_overallstatus == "Approved"
                      ? []
                      : changeDistributorForm({
                          edited_field: "zx_grossturnoverperannum",
                          edited_value: ">8 CR",
                        });
                  }}
                  // selected={false}
                  disabled={
                    distributorForm.zx_overallstatus ==
                      "Pending for approval" ||
                    distributorForm.zx_overallstatus == "Approved"
                      ? true
                      : false
                  }
                  selected={distributorForm.zx_grossturnoverperannum == ">8 CR"}
                  selectedColor={Colors.button}
                  color={Colors.button}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "column",
              flexWrap: "wrap",
              left: wp("6%"),
              marginBottom: 15,
              top: hp(1),
            }}
          >
            <View style={{ width: 325, borderBottomWidth: 1, height: hp(8) }}>
              <Text style={{ paddingLeft: wp(2), fontWeight: "bold" }}>
                Cibil Score
              </Text>
              <InputText
                style={{ borderColor: "transparent", height: hp(5) }}
                placeholder={"Enter Cibil Score"}
                value={distributorForm.zx_cibilscore}
                editable={
                  distributorForm.zx_overallstatus == "Pending for approval" ||
                  distributorForm.zx_overallstatus == "Approved"
                    ? false
                    : true
                }
                onChange={(value) =>
                  changeDistributorForm({
                    edited_field: "zx_cibilscore",
                    edited_value: value,
                  })
                }
                error={
                  validation.invalid &&
                  validation.invalid_field == "zx_cibilscore"
                }
                maxLength={3}
              />
            </View>
          </View>
          <View>
            <Text
              style={{
                left: wp("8%"),
                top: hp(1.5),
                marginBottom: hp(1.5),
                fontWeight: "bold",
              }}
            >
              Dealing with PVC*
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                left: wp("6%"),
                top: hp(1),
                marginBottom: hp(2),
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: wp(30),
                  justifyContent: "space-around",
                }}
              >
                <Text style={{ color: Colors.lightGrey }}>Yes</Text>
                <Radio
                  onPress={() => {
                    distributorForm.zx_overallstatus ==
                      "Pending for approval" ||
                    distributorForm.zx_overallstatus == "Approved"
                      ? []
                      : changeDistributorForm({
                          edited_field: "zx_dealingwithpvc",
                          edited_value: "Yes",
                        });
                  }}
                  // selected={false}
                  disabled={
                    distributorForm.zx_overallstatus ==
                      "Pending for approval" ||
                    distributorForm.zx_overallstatus == "Approved"
                      ? true
                      : false
                  }
                  selected={distributorForm.zx_dealingwithpvc == "Yes"}
                  error={
                    validation.invalid &&
                    validation.invalid_field == "zx_dealingwithpvc"
                  }
                  selectedColor={Colors.button}
                  color={Colors.button}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: wp(30),
                  justifyContent: "space-around",
                }}
              >
                <Text style={{ color: Colors.lightGrey }}>No</Text>
                <Radio
                  onPress={() => {
                    distributorForm.zx_overallstatus ==
                      "Pending for approval" ||
                    distributorForm.zx_overallstatus == "Approved"
                      ? []
                      : changeDistributorForm({
                          edited_field: "zx_dealingwithpvc",
                          edited_value: "No",
                        });
                  }}
                  // selected={false}
                  disabled={
                    distributorForm.zx_overallstatus ==
                      "Pending for approval" ||
                    distributorForm.zx_overallstatus == "Approved"
                      ? true
                      : false
                  }
                  selected={distributorForm.zx_dealingwithpvc == "No"}
                  selectedColor={Colors.button}
                  color={Colors.button}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: "column",
              flexWrap: "wrap",
              left: wp("6%"),
              marginBottom: 15,
              top: hp(1),
            }}
          >
            <View style={{ width: 325, borderBottomWidth: 1, height: hp(8) }}>
              <Text style={{ paddingLeft: wp(2), fontWeight: "bold" }}>
                Remarks
              </Text>
              <InputText
                style={{ borderColor: "transparent", height: hp(5) }}
                placeholder={"Enter Remarks"}
                value={distributorForm.zx_remarks}
                editable={
                  distributorForm.zx_overallstatus == "Pending for approval" ||
                  distributorForm.zx_overallstatus == "Approved"
                    ? false
                    : true
                }
                onChange={(value) =>
                  changeDistributorForm({
                    edited_field: "zx_remarks",
                    edited_value: value,
                  })
                }
              />
            </View>
          </View>
          {/* {this.props.show.show ? <Text>hiii</Text> : []} */}
          {this.props.show.show ? (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  width: wp("90%"),
                  justifyContent: "space-around",
                  marginLeft: wp("4%"),
                  marginTop: hp("2%"),
                }}
              >
                <Text
                  style={{
                    color: Colors.red,
                    fontWeight: "bold",
                  }}
                >
                  Total sale value of the firm for last three years
                </Text>
                <TouchableOpacity onPress={() => this.addHandler()}>
                  <Image
                    style={styles.img}
                    source={require("App/Assets/Images/add.png")}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  backgroundColor: Colors.darkRedPink,
                  width: wp(90),
                  left: wp(5),
                  height: hp(6),
                  marginBottom: hp(1),
                  margin: 4,
                }}
              >
                <Text
                  style={{
                    color: Colors.white,
                    textAlignVertical: "center",
                    fontSize: 12,
                    borderRightWidth: 1,
                    width: wp(25),
                    borderColor: Colors.white,
                    left: wp(6),
                  }}
                >
                  Category
                </Text>
                <View style={{ flexDirection: "column" }}>
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: 12,
                      borderBottomWidth: 1,
                      width: wp(57),
                      borderColor: Colors.white,
                      height: hp(3),
                      textAlign: "center",
                      left: wp(2),
                    }}
                  >
                    Sales(Rs. in Lacs)
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <Text style={{ color: Colors.white, fontSize: 12 }}>
                      L2LY
                    </Text>
                    <Text style={{ color: Colors.white, fontSize: 12 }}>
                      LY
                    </Text>
                    <Text style={{ color: Colors.white, fontSize: 12 }}>
                      CY
                    </Text>
                  </View>
                </View>
              </View>
              <View>
                {this.getTotalSale()}
                {this.props.sale.map((input, key) => (
                  <View
                    style={{
                      backgroundColor: "#C1E8E8",
                      flexDirection: "row",
                      justifyContent: "space-around",
                      width: wp(90),
                      left: wp(5),
                      height: hp(8),
                      margin: 4,
                    }}
                  >
                    <SearchableDropdown
                      dataSource={this.getData()}
                      placeHolderText={"Select SubCategory"}
                      selectedValue={input.itemsubcategory}
                      onChange={(text) =>
                        this.inputHandler(text, key, "itemsubcategory")
                      }
                      placeholder={"Select SubCategory"}
                      invalid={false}
                      customPickerStyles={{
                        width: "72%",
                        marginLeft: wp("10%"),
                        marginTop: hp("1%"),
                        borderWidth: 1,
                        borderBottomColor: "lightgrey",
                        borderColor: "white",
                        backgroundColor: "white",
                      }}
                      labelStyles={{
                        color: Colors.black,
                        fontFamily: ApplicationStyles.textFont,
                        textAlign: "center",
                        //   width: "99%",
                        //  padding:5,
                        fontSize: 11,
                        flexDirection: "row",
                        fontWeight: "bold",
                      }}
                    />

                    <View
                      style={{
                        width: wp("15%"),
                        bottom: hp("0.8%"),
                        right: wp("5%"),
                      }}
                    >
                      <InputText
                        style={{
                          height: hp(5),
                          backgroundColor: "white",
                          width: wp("55%"),
                          top: hp(1.5),
                          right: wp("3%"),
                          borderRadius: 6,
                        }}
                        value={input.zx_l2lysales}
                        textAlign="center"
                        onChange={(value) =>
                          this.inputHandler(value, key, "zx_l2lysales")
                        }
                      />
                    </View>

                    <View
                      style={{
                        width: wp("15%"),
                        bottom: hp("0.8%"),
                        right: wp("3%"),
                      }}
                    >
                      <InputText
                        style={{
                          height: hp(5),
                          backgroundColor: "white",
                          width: wp("55%"),
                          top: hp(1.5),
                          right: wp("3%"),
                          borderRadius: 6,
                        }}
                        value={input.zx_lysales}
                        textAlign="center"
                        onChange={(value) =>
                          this.inputHandler(value, key, "zx_lysales")
                        }
                      />
                    </View>

                    <View
                      style={{
                        width: wp("15%"),
                        bottom: hp("0.8%"),
                        right: wp("1%"),
                      }}
                    >
                      <InputText
                        style={{
                          height: hp(5),
                          backgroundColor: "white",
                          width: wp("55%"),
                          top: hp(1.5),
                          right: wp("3%"),
                          borderRadius: 6,
                        }}
                        value={input.zx_cysales}
                        textAlign="center"
                        onChange={(value) =>
                          this.inputHandler(value, key, "zx_cysales")
                        }
                      />
                    </View>
                    <GenericIcon
                      name={"trash-can"}
                      show={true}
                      style={{
                        color: Colors.error,
                        fontSize: wp("4%"),
                        alignSelf: "center",
                        position: "absolute",
                        top: 0,
                        right: 2,
                        //  padding: 5,
                        marginBottom: 7,
                        zIndex: 100,
                      }}
                      onPress={() => this.deleteHandler(key)}
                    />
                  </View>
                ))}
              </View>

              <View style={styles.container}>
                <View
                  style={{
                    flexDirection: "row",
                    width: wp(90),
                    justifyContent: "space-around",
                  }}
                >
                  <Text
                    style={{
                      color: Colors.red,
                      fontWeight: "bold",
                    }}
                  >
                    Details of the best customer of the firm
                  </Text>
                  <TouchableOpacity onPress={() => this.addCustomerHandler()}>
                    <Image
                      style={styles.img}
                      source={require("App/Assets/Images/add.png")}
                    />
                  </TouchableOpacity>
                </View>
                {this.getCustomerSale()}
                {this.props.best.map((input, key) => (
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        backgroundColor: Colors.darkRedPink,
                        width: wp(90),
                        top: hp(2),
                        margin: 4,
                      }}
                    >
                      <Text
                        style={{
                          textAlignVertical: "center",
                          color: Colors.white,
                        }}
                      >
                        Name of the customer
                      </Text>
                      <View style={styles.InputTextView}>
                        <InputText
                          style={styles.InputTextStyle}
                          placeholder={""}
                          value={input.zx_nameofthecustomer}
                          onChange={(text) =>
                            this.inputCustomerHandler(
                              text,
                              key,
                              "zx_nameofthecustomer"
                            )
                          }
                        />
                      </View>
                    </View>
                    <Text style={styles.showheading}>
                      Category Sold(Rs. In Lacs)
                    </Text>
                    <GenericIcon
                      name={"trash-can"}
                      show={true}
                      style={{
                        color: Colors.error,
                        fontSize: wp("5%"),
                        alignSelf: "center",
                        position: "absolute",
                        top: hp("11%"),
                        right: 10,
                        padding: 5,
                        marginBottom: 5,
                        zIndex: 100,
                      }}
                      onPress={() => this.deleteCustomerHandler(key)}
                    />
                    <View>
                      <View style={styles.bgstyle}>
                        <SearchableDropdown
                          dataSource={this.getData()}
                          placeHolderText={"Select SubCategory"}
                          selectedValue={input.itemsubcategory}
                          onChange={(text) =>
                            this.inputCustomerHandler(
                              text,
                              key,
                              "itemsubcategory"
                            )
                          }
                          placeholder={"Select SubCategory"}
                          invalid={false}
                          customPickerStyles={{
                            width: "70%",
                            marginLeft: wp("10%"),
                            marginTop: hp("0.5%"),
                            borderWidth: 1,
                            borderBottomColor: "lightgrey",
                            borderColor: "white",
                            backgroundColor: "white",
                          }}
                          labelStyles={{
                            color: Colors.black,
                            fontFamily: ApplicationStyles.textFont,
                            textAlign: "center",
                            //   width: "99%",
                            //  padding:5,
                            fontSize: 13,
                            flexDirection: "row",
                          }}
                        />
                        <View
                          style={{
                            width: wp("35%"),
                            bottom: hp("0.5%"),
                            right: wp("2%"),
                          }}
                        >
                          <InputText
                            style={{
                              borderColor: "transparent",
                              height: hp(5),
                              backgroundColor: Colors.white,
                              marginTop: hp("1%"),
                              right: wp("3%"),
                              width: wp("40%"),
                            }}
                            placeholder={""}
                            value={input.zx_categorysold}
                            onChange={(text) =>
                              this.inputCustomerHandler(
                                text,
                                key,
                                "zx_categorysold"
                              )
                            }
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
              <View style={styles.container}>
                <View
                  style={{
                    flexDirection: "row",
                    width: wp(90),
                    justifyContent: "space-around",
                  }}
                >
                  <Text style={styles.head}>
                    Sales assured by the firm to the are proposed/ MOU
                  </Text>
                  <TouchableOpacity onPress={() => this.addFirmHandler()}>
                    <Image
                      style={styles.img}
                      source={require("App/Assets/Images/add.png")}
                    />
                  </TouchableOpacity>
                </View>
                {this.getSale()}
                {this.props.firstFirm.map((input, key) => (
                  <View>
                    <View
                      style={{
                        flexDirection: "column",
                        justifyContent: "space-around",
                        backgroundColor: Colors.darkRedPink,
                        width: wp(90),
                        top: hp(2),
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-around",
                        }}
                      >
                        <Text
                          style={{
                            textAlignVertical: "center",
                            color: Colors.white,
                            fontSize: 16,
                            left: wp("5%"),
                          }}
                        >
                          District
                        </Text>
                        <SearchableDropdown
                          dataSource={this.getDistrict()}
                          placeHolderText={"Select District"}
                          selectedValue={input.zx_district}
                          onChange={(text) =>
                            this.inputFirmHandler(text, key, "zx_district")
                          }
                          placeholder={"Select District"}
                          invalid={false}
                          customPickerStyles={{
                            width: "55%",
                            marginLeft: wp("40%"),
                            marginTop: hp("0.5%"),
                            borderWidth: 1,
                            borderBottomColor: "lightgrey",
                            borderColor: "white",
                            backgroundColor: "white",
                          }}
                          labelStyles={{
                            color: Colors.black,
                            fontFamily: ApplicationStyles.textFont,
                            textAlign: "center",
                            //   width: "99%",
                            //  padding:5,
                            fontSize: 13,
                            flexDirection: "row",
                          }}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-around",
                        }}
                      >
                        <Text
                          style={{
                            textAlignVertical: "center",
                            color: Colors.white,
                            fontSize: 16,
                            left: wp("5%"),
                          }}
                        >
                          Town
                        </Text>
                        <SearchableDropdown
                          dataSource={this.getCity()}
                          placeHolderText={"Select Town"}
                          selectedValue={input.zx_town}
                          onChange={(text) =>
                            this.inputFirmHandler(text, key, "zx_town")
                          }
                          placeholder={"Select Town"}
                          invalid={false}
                          customPickerStyles={{
                            width: "53%",
                            marginLeft: wp("42%"),
                            // marginTop: hp("0.5%"),
                            borderWidth: 1,
                            borderBottomColor: "lightgrey",
                            borderColor: "white",
                            backgroundColor: "white",
                          }}
                          labelStyles={{
                            color: Colors.black,
                            fontFamily: ApplicationStyles.textFont,
                            textAlign: "center",
                            //   width: "99%",
                            //  padding:5,
                            fontSize: 13,
                            flexDirection: "row",
                          }}
                        />
                      </View>
                    </View>
                    <Text style={styles.showheading}>
                      Estimated business in first year(Rs. In Lakhs)
                    </Text>

                    <GenericIcon
                      name={"trash-can"}
                      show={true}
                      style={{
                        color: Colors.error,
                        fontSize: wp("5%"),
                        alignSelf: "center",
                        position: "absolute",
                        top: hp("18%"),
                        right: 10,
                        padding: 5,
                        marginBottom: 5,
                        zIndex: 100,
                      }}
                      onPress={() => this.deleteFirmHandler(key)}
                    />

                    <View>
                      <View style={styles.bgstyle}>
                        <SearchableDropdown
                          dataSource={this.getData()}
                          placeHolderText={"Select SubCategory"}
                          selectedValue={input.itemsubcategory}
                          onChange={(text) =>
                            this.inputFirmHandler(text, key, "itemsubcategory")
                          }
                          placeholder={"Select SubCategory"}
                          invalid={false}
                          customPickerStyles={{
                            width: "70%",
                            marginLeft: wp("10%"),
                            marginTop: hp("0.5%"),
                            borderWidth: 1,
                            borderBottomColor: "lightgrey",
                            borderColor: "white",
                            backgroundColor: "white",
                          }}
                          labelStyles={{
                            color: Colors.black,
                            fontFamily: ApplicationStyles.textFont,
                            textAlign: "center",
                            //   width: "99%",
                            //  padding:5,
                            fontSize: 13,
                            flexDirection: "row",
                          }}
                        />
                        <View
                          style={{
                            width: wp("35%"),
                            bottom: hp("0.5%"),
                            right: wp("3%"),
                          }}
                        >
                          <InputText
                            style={{
                              borderColor: "transparent",
                              height: hp(5),
                              backgroundColor: Colors.white,
                              marginTop: hp("1%"),
                              right: wp("3%"),
                              width: wp("40%"),
                            }}
                            placeholder={""}
                            value={input.zx_estimatedbusinessinfirstyearinlakhs}
                            onChange={(text) =>
                              this.inputFirmHandler(
                                text,
                                key,
                                "zx_estimatedbusinessinfirstyearinlakhs"
                              )
                            }
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ) : (
            []
          )}
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    agentid: state.user.id,

    distributorForm: state.distributor.distributorForm,
    validation: state.distributor.distributorFormValidation,
    submitValidation: state.distributor.submitDistributorFormValidation,
    form: state.distributor.AddStockForm,
    formCustomer: state.distributor.AddCustomerForm,
    formFirm: state.distributor.AddFirmForm,
    subcategory: state.distributor.getSubCategory,
    area: state.distributor.getArea,
    district: state.distributor.getResidenceDistrict,
    town: state.distributor.getResidenceArea,
    subAreas: state.user.subAreas,
    sale: state.distributor.sale,
    best: state.distributor.best,
    firstFirm: state.distributor.firstFirm,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeDistributorForm: (params) =>
    dispatch(DistributorActions.changeDistributorForm(params)),
  submitSelectedDistributorForm: (params) =>
    dispatch(DistributorActions.submitSelectedDistributorForm(params)),
  addForm: (params) => dispatch(DistributorActions.addStockForm(params)),
  removeForm: (params) => dispatch(DistributorActions.removeStockForm(params)),
  addCustomerForm: (params) =>
    dispatch(DistributorActions.addCustomerForm(params)),
  removeCustomerForm: (params) =>
    dispatch(DistributorActions.removeCustomerForm(params)),
  addFirmForm: (params) => dispatch(DistributorActions.addFirmForm(params)),
  removeFirmForm: (params) =>
    dispatch(DistributorActions.removeFirmForm(params)),
  getSubCategory: (params) =>
    dispatch(DistributorActions.getSubCategory(params)),
  changeForm: (params) => dispatch(DistributorActions.changeStockForm(params)),
  changeCustomerForm: (params) =>
    dispatch(DistributorActions.changeCustomerForm(params)),
  changeFirmForm: (params) =>
    dispatch(DistributorActions.changeFirmForm(params)),
  changeUpdateStockForm: (params) =>
    dispatch(DistributorActions.changeUpdateStockForm(params)),
  changeUpdateCustomerForm: (params) =>
    dispatch(DistributorActions.changeUpdateCustomerForm(params)),
  changeUpdateFirmForm: (params) =>
    dispatch(DistributorActions.changeUpdateFirmForm(params)),
  getResidenceDistrict: (params) =>
    dispatch(DistributorActions.getResidenceDistrict(params)),
  getResidenceCity: (params) =>
    dispatch(DistributorActions.getResidenceCity(params)),
  getSubArea: (params) => dispatch(UserActions.getSubArea(params)),
  addSale: (params) => dispatch(DistributorActions.addCustomerSale(params)),
  bestCustomer: (params) => dispatch(DistributorActions.bestCustomer(params)),
  firstYearSale: (params) => dispatch(DistributorActions.firstYearSale(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Financial);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    margin: 10,
  },
  InputTextStyle: {
    borderColor: "transparent",
    height: hp(5),
    backgroundColor: Colors.white,
  },
  InputTextView: {
    width: wp(40),
  },
  Textstyle: {
    textAlignVertical: "center",
    color: Colors.red,
    width: wp(18),
    fontSize: 12,
  },
  bgstyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: Colors.skyblue,
    width: wp(90),
    top: hp(2),
    margin: 4,
  },
  showheading: {
    textAlign: "center",
    top: hp(4),
    marginBottom: hp(3),
    fontWeight: "bold",
  },
  headtitle: {
    textAlignVertical: "center",
    color: Colors.white,
    fontSize: 12,
  },
  redcontainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: Colors.darkRedPink,
    width: wp(90),
    top: hp(2),
  },
  img: {
    width: wp(6),
    height: hp(3),
  },
  head: {
    fontSize: wp("3.5%"),
    color: Colors.red,
    fontWeight: "bold",
  },
});
