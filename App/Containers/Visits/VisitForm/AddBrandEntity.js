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
import _ from "lodash";
import GenericIcon from "App/Components/GenericIcon";
import BrandComponent from "App/Components/BrandComponent";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import VisitsActions from "App/Stores/Visits/Actions";

class AddBrandEntity extends Component {
  constructor() {
    super();

    this.state = {
      show: false,
    };
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
      data,
      id,
      parent,
      updateBrandForm,
      changeUpdateBrandForm,
      changeUpdateCompForm,
      visitInfoForm,
    } = this.props;

    return (
      <View
        style={{
          borderWidth: 2,
          borderColor: Colors.white,
          elevation: 5,
          width: wp("75%"),
          marginLeft: wp("2%"),
          marginBottom: "2%",
          borderRadius: 10,
          // height: hp("18%"),
          marginTop: hp("2%"),
          paddingBottom: hp("2%"),
        }}
      >
        {formBrand.Id ? (
          []
        ) : (
          <View style={{ height: hp("1.5%"), padding: 15 }}>
            <GenericIcon
              name={"trash-can"}
              show={true}
              style={Style.trashButtonIcon}
              onPress={() => removeFormBrand({ id: formBrand.id })}
            />
          </View>
        )}
        <View style={{ height: hp("6%") }}>
          <SearchableDropdown
            dataSource={data}
            placeHolderText={"Select Brand"}
            selectedValue={
              // visitInfoForm.competitorvisitinfo[0].competitorbrandvisitinfo.brand &&
              // visitInfoForm.competitorvisitinfo[0].competitorbrandvisitinfo.Id == formBrand.Id
              //   ? visitInfoForm.competitorvisitinfo[0].competitorbrandvisitinfo.brand
              //   : formBrand.brand

              updateBrandForm.brand && updateBrandForm.Id == formBrand.Id
                ? updateBrandForm.brand
                : formBrand.brand
            }
            onChange={(value) => {
              formBrand.Id
                ? this.props.changeUpdateBrandForm({
                    edited_field: "brand",
                    edited_value: value,

                    Id: formBrand.Id,

                    // edited_field2: "parent",
                    // edited_value2: parent,

                    // show: false
                  })
                : changeForm({
                    edited_field: "brand",
                    edited_value: value,
                    edited_field1: "parent",
                    edited_value1: id,
                  });
            }}
            placeholder={"Select Brand"}
            disablePicker={visitInfoForm.Id ? this.props.showPicker : false}
            invalid={false}
            customPickerStyles={{
              width: "85%",
              marginLeft: wp("17.5%"),
              marginTop: 15,
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
              updateBrandForm.brand && updateBrandForm.Id == formBrand.Id
                ? updateBrandForm.brand
                : formBrand.brand + _.uniqueId()
            }
          />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            top: hp("2%"),
          }}
        >
          <View
            style={{
              width: wp("30%"),
              bottom: hp("0.8%"),
              right: wp("5%"),
              left: "6%",
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 10,
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
                backgroundColor: "white",
                textAlign: "center",
              }}
              placeholder="Enter %"
              textAlign="center"
              value={
                // visitInfoForm.competitorvisitinfo[0].competitorbrandvisitinfo.zx_percent &&
                // visitInfoForm.competitorvisitinfo[0].competitorbrandvisitinfo.Id == formBrand.Id
                //   ? visitInfoForm.competitorvisitinfo[0].competitorbrandvisitinfo.zx_percent
                //   : formBrand.zx_percent

                updateBrandForm.zx_percent && updateBrandForm.Id == formBrand.Id
                  ? updateBrandForm.zx_percent
                  : formBrand.zx_percent
              }
              editable={visitInfoForm.Id ? this.props.showInput : true}
              onChange={(value) => {
                const numericRegex = /^[0-9]$|^[1-9][0-9]$|^(100)$|^$/;
                if (numericRegex.test(value)) {
                  formBrand.Id
                    ? this.props.changeUpdateBrandForm({
                        edited_field: "zx_percent",
                        edited_value: value,
                        Id: formBrand.Id,
                        // edited_field2: "parent",
                        // edited_value2: parent,
                      })
                    : changeForm({
                        edited_field: "zx_percent",
                        edited_value: value,
                        edited_field1: "parent",
                        edited_value1: id,
                      });
                }
              }}
              // defaultValue={text}
            />
          </View>

          <View
            style={{
              width: wp("30%"),
              bottom: hp("0.8%"),
              right: wp("3%"),
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 10,
                color: Colors.darkRedPink,
              }}
            >
              Value(lacs)
            </Text>
            <InputText
              style={{
                height: 40,
                // borderWidth: 1,
                borderColor: "white",
                // marginTop: hp("2%"),
                width: wp("35%"),
                backgroundColor: "white",
                textAlign: "center",
              }}
              placeholder="Value(lacs)"
              textAlign="center"
              value={
                // visitInfoForm.competitorvisitinfo[0].competitorbrandvisitinfo.zx_valuepa &&
                // visitInfoForm.competitorvisitinfo[0].competitorbrandvisitinfo.Id == formBrand.Id
                //   ? visitInfoForm.competitorvisitinfo[0].competitorbrandvisitinfo.zx_valuepa
                //   : formBrand.zx_valuepa
                updateBrandForm.zx_valuepa && updateBrandForm.Id == formBrand.Id
                  ? updateBrandForm.zx_valuepa
                  : formBrand.zx_valuepa
              }
              editable={visitInfoForm.Id ? this.props.showInput : true}
              onChange={(value) => {
                formBrand.Id
                  ? this.props.changeUpdateBrandForm({
                      edited_field: "zx_valuepa",
                      edited_value: value,
                      Id: formBrand.Id,
                      // edited_field2: "parent",
                      //   edited_value2: parent,
                    })
                  : changeForm({
                      edited_field: "zx_valuepa",
                      edited_value: value,
                      edited_field1: "parent",
                      edited_value1: id,
                    });
              }}
              // defaultValue={text}
            />
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
  updateBrandForm: state.visits.updateBrandForm,
  updateCompForm: state.visits.updateCompForm,
  visitInfoForm: state.visits.visitInfoForm,
  showPicker: state.visits.showPicker,
  showInput: state.visits.showInput,
  dropPicker: state.visits.dropPicker,
});

const mapDispatchToProps = (dispatch) => ({
  changeCustomer: (params) => dispatch(VisitsActions.changeCustomer(params)),
  changeUpdateBrandForm: (params) =>
    dispatch(VisitsActions.changeUpdateBrandForm(params)),
  changeUpdateCompForm: (params) =>
    dispatch(VisitsActions.changeUpdateCompForm(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddBrandEntity);
