import React, { Component } from "react";
import { View, ScrollView, Text, Image, TextInput } from "react-native";
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

class AddEntity extends Component {
  constructor() {
    super();

    this.state = {
      show: false,
    };
  }
  render() {
    const {
      form,
      removeForm,
      selectedCustomer,
      changeCustomer,
      data,
      distributorForm,
      changeDistributorForm,
      changeForm,
      changeUpdateStockForm,
      stockform,
    } = this.props;
    return (
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
          dataSource={data}
          placeHolderText={"Select SubCategory"}
          selectedValue={
            stockform.itemsubcategory &&
            stockform.lastthreeyearsalesid == form.Id
              ? stockform.itemsubcategory
              : form.itemsubcategory
          }
          onChange={(value) => {
            form.Id
              ? this.props.changeUpdateStockForm({
                  edited_field: "itemsubcategory",
                  edited_value: value,
                  edited_field1: "lastthreeyearsalesid",
                  edited_value1: form.Id,
                })
              : this.props.changeForm({
                  edited_field: "itemsubcategory",
                  edited_value: value,
                });
          }}
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
          key={
            stockform.itemsubcategory &&
            stockform.lastthreeyearsalesid == form.Id
              ? stockform.itemsubcategory
              : form.itemsubcategory + _.uniqueId()
          }
        />
        {/* <Text
              style={{
                fontSize: 12,
                textAlignVertical: "center",
                width: wp(18),
                color: Colors.red,
              }}
            >
              Agri Fittings
            </Text> */}
        <View style={{ width: wp("15%"), bottom: hp("0.8%"), right: wp("5%") }}>
          <InputText
            style={{
              height: hp(5),
              backgroundColor: "white",
              width: wp("55%"),
              top: hp(1.5),
              right: wp("3%"),
              borderRadius: 6,
            }}
            value={
              stockform.zx_l2lysales &&
              stockform.lastthreeyearsalesid == form.Id
                ? stockform.zx_l2lysales
                : form.zx_l2lysales
            }
            textAlign="center"
            onChange={(value) => {
              form.Id
                ? this.props.changeUpdateStockForm({
                    edited_field: "zx_l2lysales",
                    edited_value: value,
                    edited_field1: "lastthreeyearsalesid",
                    edited_value1: form.Id,
                  })
                : this.props.changeForm({
                    edited_field: "zx_l2lysales",
                    edited_value: value,
                  });
            }}
          />
        </View>
        {/* <TextInput
          style={{
            height: hp(5),
            backgroundColor: "white",
            width: wp("15%"),
            top: hp(1.5),
            right: wp("8%"),
            borderRadius: 6,
          }}
          value={form.zx_l2lysales}
          textAlign="center"
          onChangeText={(value) =>
            this.props.changeForm({
              edited_field: "zx_l2lysales",
              edited_value: value,
            })
          }
        /> */}
        <View style={{ width: wp("15%"), bottom: hp("0.8%"), right: wp("3%") }}>
          <InputText
            style={{
              height: hp(5),
              backgroundColor: "white",
              width: wp("55%"),
              top: hp(1.5),
              right: wp("3%"),
              borderRadius: 6,
            }}
            value={
              stockform.zx_lysales && stockform.lastthreeyearsalesid == form.Id
                ? stockform.zx_lysales
                : form.zx_lysales
            }
            textAlign="center"
            onChange={(value) => {
              form.Id
                ? this.props.changeUpdateStockForm({
                    edited_field: "zx_lysales",
                    edited_value: value,
                    edited_field1: "lastthreeyearsalesid",
                    edited_value1: form.Id,
                  })
                : this.props.changeForm({
                    edited_field: "zx_lysales",
                    edited_value: value,
                  });
            }}
          />
        </View>
        {/* <TextInput
          style={{
            height: hp(5),
            backgroundColor: "white",
            width: wp("15%"),
            top: hp(1.5),
            right: wp("5.5%"),
            borderRadius: 6,
          }}
          value={form.zx_lysales}
          textAlign="center"
          onChangeText={(value) =>
            this.props.changeForm({
              edited_field: "zx_lysales",
              edited_value: value,
            })
          }
        /> */}
        <View style={{ width: wp("15%"), bottom: hp("0.8%"), right: wp("1%") }}>
          <InputText
            style={{
              height: hp(5),
              backgroundColor: "white",
              width: wp("55%"),
              top: hp(1.5),
              right: wp("3%"),
              borderRadius: 6,
            }}
            value={
              stockform.zx_cysales && stockform.lastthreeyearsalesid == form.Id
                ? stockform.zx_cysales
                : form.zx_cysales
            }
            textAlign="center"
            onChange={(value) => {
              form.Id
                ? this.props.changeUpdateStockForm({
                    edited_field: "zx_cysales",
                    edited_value: value,
                    edited_field1: "lastthreeyearsalesid",
                    edited_value1: form.Id,
                  })
                : this.props.changeForm({
                    edited_field: "zx_cysales",
                    edited_value: value,
                  });
            }}
          />
        </View>
        {form.Id ? (
          []
        ) : (
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
            onPress={() => removeForm({ id: form.id })}
          />
        )}
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
  distributorForm: state.distributor.distributorForm,
  stockform: state.distributor.visitStock,
});

const mapDispatchToProps = (dispatch) => ({
  changeCustomer: (params) => dispatch(VisitsActions.changeCustomer(params)),
  changeDistributorForm: (params) =>
    dispatch(DistributorActions.changeDistributorForm(params)),
  changeUpdateStockForm: (params) =>
    dispatch(DistributorActions.changeUpdateStockForm(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEntity);
