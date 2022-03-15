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
    };
  }
  render() {
    const {
      formCustomer,
      removeCustomerForm,
      selectedCustomer,
      changeCustomerForm,
      changeUpdateCustomerForm,
      data,
      stockform,
    } = this.props;
    return (
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
          <Text style={{ textAlignVertical: "center", color: Colors.white }}>
            Name of the customer
          </Text>
          <View style={styles.InputTextView}>
            <InputText
              style={styles.InputTextStyle}
              placeholder={""}
              value={
                stockform.zx_nameofthecustomer &&
                stockform.previouscustomerdetailsid == formCustomer.Id
                  ? stockform.zx_nameofthecustomer
                  : formCustomer.zx_nameofthecustomer
              }
              onChange={(value) => {
                formCustomer.Id
                  ? this.props.changeUpdateCustomerForm({
                      edited_field: "zx_nameofthecustomer",
                      edited_value: value,
                      edited_field1: "previouscustomerdetailsid",
                      edited_value1: formCustomer.Id,
                    })
                  : this.props.changeCustomerForm({
                      edited_field: "zx_nameofthecustomer",
                      edited_value: value,
                    });
              }}
            />
          </View>
        </View>
        <Text style={styles.showheading}>Category Sold(Rs. In Lacs)</Text>
        {formCustomer.Id ? (
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
              top: hp("11%"),
              right: 10,
              padding: 5,
              marginBottom: 5,
              zIndex: 100,
            }}
            onPress={() => removeCustomerForm({ id: formCustomer.id })}
          />
        )}
        <View>
          <View style={styles.bgstyle}>
            <SearchableDropdown
              dataSource={data}
              placeHolderText={"Select SubCategory"}
              selectedValue={
                stockform.itemsubcategory &&
                stockform.previouscustomerdetailsid == formCustomer.Id
                  ? stockform.itemsubcategory
                  : formCustomer.itemsubcategory
              }
              onChange={(value) => {
                formCustomer.Id
                  ? this.props.changeUpdateCustomerForm({
                      edited_field: "itemsubcategory",
                      edited_value: value,
                      edited_field1: "previouscustomerdetailsid",
                      edited_value1: formCustomer.Id,
                    })
                  : this.props.changeCustomerForm({
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
                stockform.previouscustomerdetailsid == formCustomer.Id
                  ? stockform.itemsubcategory
                  : formCustomer.itemsubcategory + _.uniqueId()
              }
            />
            <View
              style={{ width: wp("35%"), bottom: hp("0.5%"), right: wp("2%") }}
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
                  stockform.zx_categorysold &&
                  stockform.previouscustomerdetailsid == formCustomer.Id
                    ? stockform.zx_categorysold
                    : formCustomer.zx_categorysold
                }
                onChange={(value) => {
                  formCustomer.Id
                    ? this.props.changeUpdateCustomerForm({
                        edited_field: "zx_categorysold",
                        edited_value: value,
                        edited_field1: "previouscustomerdetailsid",
                        edited_value1: formCustomer.Id,
                      })
                    : this.props.changeCustomerForm({
                        edited_field: "zx_categorysold",
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
  stockform: state.distributor.visitCustomerStock,
});

const mapDispatchToProps = (dispatch) => ({
  changeCustomer: (params) => dispatch(VisitsActions.changeCustomer(params)),
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
