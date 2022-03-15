import React, { Component } from "react";
import { View, ScrollView, Text, Image, TextInput } from "react-native";
import { Button, Textarea } from "native-base";
import { connect } from "react-redux";
import Style from "./VisitFormStyles";
import InputText from "App/Components/FormInput/InputText";
import InputMobile from "App/Components/FormInput/InputMobile";
import SearchableDropdown from "App/Components/SearchableDropdown";
import InputNumber from "App/Components/FormInput/InputNumber";
import BlueButton from "App/Components/BlueButton";
import Select from "App/Components/Select";
import NavigationService from "App/Services/NavigationService";
import { HelperService } from "App/Services/Utils/HelperService";
import VisitsActions from "App/Stores/Visits/Actions";
import GenericIcon from "App/Components/GenericIcon";
import BrandComponent from "App/Components/BrandComponent";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import _ from "lodash";

class SelectBrandEntity extends Component {
  constructor() {
    super();

    this.state = {
      show: false,
    };
  }

  getbrand() {
    const { brands } = this.props;
    let brandname = [];
    if (brands && brands.length) {
      brands.map((obj) => {
        if ({ id: obj.zx_brandsid, name: obj.zx_brandcode }) {
          brandname.push({ id: obj.zx_brandsid, name: obj.zx_brandcode });
        }
      });
    }
    return brandname;
  }
  render() {
    const {
      formBrand,
      changeForm,
      removeFormBrand,
      productCategory,
      show,
      loader,
      submitForm,
      searchFilters,
      editForm,
      disable,
      selectedCustomer,
      changeCustomer,
      changeBrand,
      selectBrand,
      removeSelectForm,
      selectBrandForm,
      updateBrand,
      visitInfoForm,
      // data,
    } = this.props;

    return (
      <View
        style={{
          borderWidth: 2,
          borderColor: Colors.lightPink,
          elevation: 5,
          width: wp("87%"),
          marginLeft: wp("2%"),
          marginBottom: "2%",
          borderRadius: 10,
          height: hp("18%"),
          marginTop: hp("2%"),
          paddingBottom: hp("2%"),
        }}
      >
        {selectBrand.Id ? (
          []
        ) : (
          <GenericIcon
            name={"trash-can"}
            show={true}
            style={Style.trashButtonIcon}
            onPress={() => removeSelectForm({ id: selectBrand.id })}
          />
        )}

        <View style={{ height: hp("5%") }}>
          <SearchableDropdown
            dataSource={this.getbrand()}
            placeHolderText={"Select Brand"}
            selectedValue={
              updateBrand.brand && updateBrand.Id == selectBrand.Id
                ? updateBrand.brand
                : selectBrand.brand
            }
            onChange={(value) => {
              selectBrand.Id
                ? this.props.changeUpdateBrand({
                    edited_field: "brand",
                    edited_value: value,
                    edited_field1: "Id",
                    edited_value1: selectBrand.Id,
                  })
                : changeForm({
                    edited_field: "brand",
                    edited_value: value,
                  });
            }}
            placeholder={"Select Brand"}
            invalid={false}
            customPickerStyles={{
              width: "85%",
              marginLeft: wp("6%"),
              // marginTop: hp("5%"),
              borderWidth: 1,
              borderBottomColor: "lightgrey",
              borderColor: Colors.lightPink,
              backgroundColor: Colors.lightPink,
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
            key={selectBrand.brand + _.uniqueId()}
            disablePicker={visitInfoForm.Id ? this.props.showPicker : false}
            // invalid={
            //   validation.invalid && validation.invalid_field == "area__c"
            // }
            //  label={"Existing customer?*"}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: hp("7%"),
              height: hp("10%"),
            }}
          >
            <View
              style={{
                width: wp("30%"),
                flexDirection: "column",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  color: Colors.darkRedPink,
                }}
              >
                Percent(%)
              </Text>
              <InputText
                style={{
                  height: 40,
                  // borderWidth: 1,
                  borderColor: "white",
                  // marginTop: hp("2%"),
                  width: wp("35%"),

                  // marginLeft:("3%"),
                  backgroundColor: Colors.lightPink,
                  textAlign: "center",
                }}
                placeholder="Enter %"
                value={
                  updateBrand.zx_percent && updateBrand.Id == selectBrand.Id
                    ? updateBrand.zx_percent
                    : selectBrand.zx_percent
                }
                onChange={(value) => {
                  const numericRegex = /^[0-9]$|^[1-9][0-9]$|^(100)$|^$/;
                  if (numericRegex.test(value)) {
                    selectBrand.Id
                      ? this.props.changeUpdateBrand({
                          edited_field: "zx_percent",
                          edited_value: value,
                          edited_field1: "Id",
                          edited_value1: selectBrand.Id,
                        })
                      : changeForm({
                          edited_field: "zx_percent",
                          edited_value: value,
                        });
                  }
                }}
                editable={visitInfoForm.Id ? this.props.showInput : true}
                // defaultValue={text}
              />
            </View>

            <View
              style={{
                width: wp("30%"),

                flexDirection: "column",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  color: Colors.darkRedPink,
                }}
              >
                Value(in lacs)
              </Text>
              <InputText
                style={{
                  height: 40,
                  // borderWidth: 1,
                  borderColor: "white",
                  // marginTop: hp("2%"),
                  width: wp("35%"),
                  backgroundColor: Colors.lightPink,
                  textAlign: "center",
                }}
                placeholder="Value(PA)"
                textAlign="center"
                value={
                  updateBrand.zx_value && updateBrand.Id == selectBrand.Id
                    ? updateBrand.zx_value
                    : selectBrand.zx_value
                }
                onChange={(value) => {
                  selectBrand.Id
                    ? this.props.changeUpdateBrand({
                        edited_field: "zx_value",
                        edited_value: value,
                        edited_field1: "Id",
                        edited_value1: selectBrand.Id,
                      })
                    : changeForm({
                        edited_field: "zx_value",
                        edited_value: value,
                      });
                }}
                editable={visitInfoForm.Id ? this.props.showInput : true}
                // defaultValue={text}
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
  brands: state.products.BrandList && state.products.BrandList,
  updateBrand: state.visits.updateBrand,
  visitInfoForm: state.visits.visitInfoForm,
  showPicker: state.visits.showPicker,
  showInput: state.visits.showInput,
  dropPicker: state.visits.dropPicker,
});

const mapDispatchToProps = (dispatch) => ({
  changeCustomer: (params) => dispatch(VisitsActions.changeCustomer(params)),
  changeBrand: (params) => dispatch(VisitsActions.changeBrand(params)),
  changeUpdateBrand: (params) =>
    dispatch(VisitsActions.changeUpdateBrand(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectBrandEntity);
