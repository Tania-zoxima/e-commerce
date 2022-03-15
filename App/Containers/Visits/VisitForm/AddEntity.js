import React, { Component } from "react";
import { View, ScrollView, Text, Image } from "react-native";
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
      changeForm,
      removeForm,
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
      data1,
      updateStockForm,
      changeUpdateStock,
      visitInfoForm
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
          height:hp("18%"),
          marginTop:hp("2%"),
          paddingBottom:hp("2%")
        }}
      >
         {form.Id ? (
          []
        ) : (
          <View style={{height:hp("1.5%")}}>
          <GenericIcon
                    name={'trash-can'}
                    show={true}
		            style={Style.trashButtonIcon}
		            onPress={() => removeForm({id: form.id})}
		        /> 
                </View>
        )}
        <SearchableDropdown
          dataSource={data
            }
          placeHolderText={"Select Competitor"}
          selectedValue={
            updateStockForm.competitor &&
            updateStockForm.Id == form.Id
              ? updateStockForm.competitor
              : form.competitor}
          onChange={(value) =>{
            form.Id
            ? this.props.changeUpdateStock({
              edited_field: "competitor",
              edited_value: value,
              edited_field1: "Id",
              edited_value1: form.Id,
            })
            : changeForm({
            edited_field: "competitor",
            edited_value: value,
          })}}
          placeholder={"Select Competitor"}
          invalid={false}
          customPickerStyles={{
            width: "85%",
            marginLeft: wp("16%"),
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
          disablePicker={
            visitInfoForm.Id
                    ? this.props.showPicker
                    : false
          }
          // invalid={
          //   validation.invalid && validation.invalid_field == "area__c"
          // }
          //  label={"Existing customer?*"}
        />
        <SearchableDropdown
          dataSource={data1}
          placeHolderText={"Select Driving Factor"}
          selectedValue={
            updateStockForm.retailerdrivingfactor &&
            updateStockForm.Id == form.Id
              ? updateStockForm.retailerdrivingfactor
              : form.retailerdrivingfactor}
          onChange={(value) =>{
            form.Id
            ? this.props.changeUpdateStock({
              edited_field: "retailerdrivingfactor",
              edited_value: value,
              edited_field1: "Id",
              edited_value1: form.Id,
            })
            : changeForm({
            edited_field: "retailerdrivingfactor",
            edited_value: value,
          })}}
          placeholder={"Select Driving Factor"}
          invalid={false}
          customPickerStyles={{
            width: "85%",
            marginLeft: wp("16%"),
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
          disablePicker={
            visitInfoForm.Id
                    ? this.props.showPicker
                    : false
          }
          // invalid={
          //   validation.invalid && validation.invalid_field == "area__c"
          // }
          //  label={"Existing customer?*"}
        />
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
  updateStockForm: state.visits.updateStockForm,
  showPicker: state.visits.showPicker,
  showInput: state.visits.showInput,
  visitInfoForm: state.visits.visitInfoForm,

  dropPicker: state.visits.dropPicker,


});

const mapDispatchToProps = (dispatch) => ({
  changeCustomer: (params) => dispatch(VisitsActions.changeCustomer(params)),
  changeUpdateStock: (params) => dispatch(VisitsActions.changeUpdateStock(params)),

});

export default connect(mapStateToProps, mapDispatchToProps)(AddEntity);
