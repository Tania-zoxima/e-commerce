import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import { Button, Textarea } from "native-base";
import { connect } from "react-redux";
import InputText from "App/Components/FormInput/InputText";
import InputMobile from "App/Components/FormInput/InputMobile";
import SearchableDropdown from "App/Components/SearchableDropdown";
import InputNumber from "App/Components/FormInput/InputNumber";
import BlueButton from "App/Components/BlueButton";
import Select from "App/Components/Select";
import NavigationService from "App/Services/NavigationService";
import { HelperService } from "App/Services/Utils/HelperService";
import DistributorActions from "App/Stores/Distributor/Actions";
import VisitsActions from "App/Stores/Visits/Actions";
import GenericIcon from "App/Components/GenericIcon";
import BrandComponent from "App/Components/BrandComponent";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import _ from "lodash";

class AddCustomer extends Component {
  constructor() {
    super();

    this.state = {
      show: false,
      timer: null,
    };
  }
  
  render() {
    const {
      formFirm,
      removeFirmForm,
      selectedCustomer,
      changeFirmForm,
      changeUpdateFirmForm,
      data,
      town,
      district,
      stockform,
      token,
      agentid,
    } = this.props;
    return (
      <View>
        <View style={styles.redcontainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Text style={styles.headtitle}>District</Text>
            <SearchableDropdown
              dataSource={district}
              placeHolderText={"Select District"}
              selectedValue={
                stockform.zx_district &&
                stockform.salesassuredbythefirmid == formFirm.Id
                  ? stockform.zx_district
                  : formFirm.zx_district
              }
              onChange={(value) => {
                formFirm.Id
                  ? (this.props.changeUpdateFirmForm({
                      edited_field: "zx_district",
                      edited_value: value,
                      edited_field1: "salesassuredbythefirmid",
                      edited_value1: formFirm.Id,
                    }),
                    this.props.getResidenceCity({
                      token,
                      id: agentid,
                      level: 5,
                      first_level: 4,
                      guidId: value,
                    }))
                  : this.props.changeFirmForm({
                      edited_field: "zx_district",
                      edited_value: value,
                    }),
                  this.props.getResidenceCity({
                    token,
                    id: agentid,
                    level: 5,
                    first_level: 4,
                    guidId: value,
                  });
              }}
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
              key={
                stockform.zx_district &&
                stockform.salesassuredbythefirmid == formFirm.Id
                  ? stockform.zx_district
                  : formFirm.zx_district + _.uniqueId()
              }
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Text style={styles.headtitle}>Town</Text>
            <SearchableDropdown
              dataSource={town}
              placeHolderText={"Select Town"}
              selectedValue={
                stockform.zx_town &&
                stockform.salesassuredbythefirmid == formFirm.Id
                  ? stockform.zx_town
                  : formFirm.zx_town
              }
              onChange={(value) => {
                formFirm.Id
                  ? this.props.changeUpdateFirmForm({
                      edited_field: "zx_town",
                      edited_value: value,
                      edited_field1: "salesassuredbythefirmid",
                      edited_value1: formFirm.Id,
                    })
                  : this.props.changeFirmForm({
                      edited_field: "zx_town",
                      edited_value: value,
                    });
              }}
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
              key={
                stockform.zx_town &&
                stockform.salesassuredbythefirmid == formFirm.Id
                  ? stockform.zx_town
                  : formFirm.zx_town + _.uniqueId()
              }
            />
          </View>
        </View>
        <Text style={styles.showheading}>
          Estimated business in first year(Rs. In Lakhs)
        </Text>
        {formFirm.Id ? (
          []
        ) : (
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
            onPress={() => removeFirmForm({ id: formFirm.id })}
          />
        )}
        <View>
          <View style={styles.bgstyle}>
            <SearchableDropdown
              dataSource={data}
              placeHolderText={"Select SubCategory"}
              selectedValue={
                stockform.itemsubcategory &&
                stockform.salesassuredbythefirmid == formFirm.Id
                  ? stockform.itemsubcategory
                  : formFirm.itemsubcategory
              }
              onChange={(value) => {
                formFirm.Id
                  ? this.props.changeUpdateFirmForm({
                      edited_field: "itemsubcategory",
                      edited_value: value,
                      edited_field1: "salesassuredbythefirmid",
                      edited_value1: formFirm.Id,
                    })
                  : this.props.changeFirmForm({
                      edited_field: "itemsubcategory",
                      edited_value: value,
                    });
              }}
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
              key={
                stockform.itemsubcategory &&
                stockform.salesassuredbythefirmid == formFirm.Id
                  ? stockform.itemsubcategory
                  : formFirm.itemsubcategory + _.uniqueId()
              }
            />
            <View
              style={{ width: wp("35%"), bottom: hp("0.5%"), right: wp("3%") }}
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
                value={
                  stockform.zx_estimatedbusinessinfirstyearinlakhs &&
                  stockform.salesassuredbythefirmid == formFirm.Id
                    ? stockform.zx_estimatedbusinessinfirstyearinlakhs
                    : formFirm.zx_estimatedbusinessinfirstyearinlakhs
                }
                onChange={(value) => {
                  formFirm.Id
                    ? this.props.changeUpdateFirmForm({
                        edited_field: "zx_estimatedbusinessinfirstyearinlakhs",
                        edited_value: value,
                        edited_field1: "salesassuredbythefirmid",
                        edited_value1: formFirm.Id,
                      })
                    : this.props.changeFirmForm({
                        edited_field: "zx_estimatedbusinessinfirstyearinlakhs",
                        edited_value: value,
                      });
                }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  productCategory: state.products.productCategoryDisplayList,
  loader: state.visits.UpdateStockSubmitLoader,
  searchFilters: state.visits.planVisit.searchFilters,
  user_details: state.user.user_details,
  selectedCustomer: state.visits.visitInfo.selectedCustomer,
  stockform: state.distributor.visitFirmStock,
  token: state.user.token,
  agentid: state.user.id,
});

const mapDispatchToProps = (dispatch) => ({
  changeCustomer: (params) => dispatch(VisitsActions.changeCustomer(params)),
  getResidenceCity: (params) =>
    dispatch(DistributorActions.getResidenceCity(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCustomer);
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
    fontSize: 16,
    left: wp("5%"),
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
