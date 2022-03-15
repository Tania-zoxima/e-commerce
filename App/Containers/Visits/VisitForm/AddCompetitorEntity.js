import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
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

import GenericIcon from "App/Components/GenericIcon";
import BrandComponent from "App/Components/BrandComponent";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AddBrandEntity from "./AddBrandEntity";
import VisitsActions from "App/Stores/Visits/Actions";
import _ from "lodash";

class AddCompetitorEntity extends Component {
  constructor() {
    super();

    this.state = {
      show: false,
    };
  }
  /* componentDidMount() {
    const { token, executeVisitData,  changeForm, } = this.props;
    changeForm({
      edited_field: "zx_percent",
      edited_value: '',
    })
  } */
  getBrandNode(param) {
    const {
      formBrand,
      removeFormBrand,
      formComp,
      changeBrandForm,
      data1,
      updateBrandForm,
    } = this.props;
    let addBrandsNode = [];

    if (formBrand.length) {
      formBrand.map((obj, index) => {
        if (obj.parent == param) {
          addBrandsNode.push(
            <AddBrandEntity
              formBrand={obj}
              key={obj.id + index}
              removeFormBrand={(params) => removeFormBrand(params)}
              id={formComp.id}
              changeForm={(params) =>
                changeBrandForm({ ...params, id: obj.id })
              }
              data={data1}
            />
          );
        }
      });
    }
    return addBrandsNode;
  }

  // getBrands() {
  //   const {
  //     distributorForm,
  //     visitInfoForm,
  //     formBrand,
  //     selectBrand,
  //     removeFormBrand,
  //     changeForm,
  //     changeUpdateBrandForm,
  //     data1,
  //     formComp,
  //   } = this.props;
  //   let brand = [];
  //   console.log("amamamam",formComp)
  //   if( visitInfoForm && visitInfoForm.competitorvisitinfo && visitInfoForm.competitorvisitinfo.length){
  //   if ( visitInfoForm && visitInfoForm.competitorvisitinfo && visitInfoForm.competitorvisitinfo.competitorbrandvisitinfo && visitInfoForm.competitorvisitinfo.competitorbrandvisitinfo.length) {
  //     visitInfoForm.competitorvisitinfo.competitorbrandvisitinfo.map((obj1) => {
  //       brand.push(
  //         <AddBrandEntity
  //         formBrand={obj1}
  //           key={obj1.Id}
  //           removeFormBrand={(params) => removeFormBrand(params)}
  //           // data={this.getData()}
  //           // id= {formComp.id}
  //           parent={visitInfoForm.competitorvisitinfo[0].Id}
  //           data={data1}
  //           changeUpdateCompForm={(params) =>
  //             changeUpdateCompForm({ ...params, childId: obj1.Id, id:visitInfoForm.competitorvisitinfo[0].Id })
  //           }
  //         />
  //       );
  //     });
  //   }

  //   }
  //   console.log("taannuuu",brand)
  //   return brand;
  // }

  getBrands(param) {
    const {
      visitInfoForm,
      formBrand,
      selectBrand,
      removeFormBrand,
      changeForm,
      changeUpdateBrandForm,
      data1,
      updateBrandForm,
      formComp,
    } = this.props;
    let brand = [];
    if (updateBrandForm && updateBrandForm.length) {
      updateBrandForm.map((obj1) => {
        if (obj1.parent == param) {
          brand.push(
            <AddBrandEntity
              formBrand={obj1}
              key={obj1.Id}
              removeFormBrand={(params) => removeFormBrand(params)}
              // data={this.getData()}
              id={formComp.id}
              data={data1}
              changeUpdateBrandForm={(params) =>
                changeUpdateBrandForm({ ...params, id: obj1.Id })
              }
            />
          );
        }
      });
    }
    return brand;
  }
  render() {
    const {
      formComp,
      changeForm,
      changeForm1,
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
      addFormBrand,
      removeFormComp,
      data,
      data1,
      changeUpdateCompForm,
      updateCompForm,
      visitInfoForm,

      key,
    } = this.props;

    return (
      <View
        style={{
          backgroundColor: Colors.lightPink,
          marginTop: hp("3%"),
          paddingBottom: hp("4%"),
        }}
      >
        {formComp.Id ? (
          []
        ) : (
          <View style={{ height: hp("1.5%") }}>
            <GenericIcon
              name={"trash-can"}
              show={true}
              style={Style.trashButtonIcon}
              onPress={() => removeFormComp({ id: formComp.id })}
            />
          </View>
        )}
        <SearchableDropdown
          dataSource={data}
          placeHolderText={"Select Competitor"}
          selectedValue={
            // visitInfoForm.competitorvisitinfo[0].competitor
            // // visitInfoForm.competitorvisitinfo[0].Id == formComp.Id
            //   ? visitInfoForm.competitorvisitinfo[0].competitor
            //   : formComp.competitor
            updateCompForm.competitor && updateCompForm.Id == formComp.Id
              ? updateCompForm.competitor
              : formComp.competitor
          }
          disablePicker={visitInfoForm.Id ? this.props.showPicker : false}
          onChange={(value) => {
            formComp.Id
              ? this.props.changeUpdateCompForm({
                  edited_field: "competitor",
                  edited_value: value,
                  //  edited_field1: "Id",
                  Id: formComp.Id,

                  // Id: visitInfoForm.competitorvisitinfo[0].Id,
                  // show: true
                })
              : changeForm1({
                  edited_field: "competitor",
                  edited_value: value,
                });
          }}
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
          key={
            updateCompForm.competitor && updateCompForm.Id == formComp.Id
              ? updateCompForm.competitor
              : formComp.competitor + _.uniqueId()
          }
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
                fontWeight: "bold",
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
                backgroundColor: "white",
                textAlign: "center",
              }}
              placeholder="Enter %"
              textAlign="center"
              value={
                // visitInfoForm.competitorvisitinfo[0].zx_percent
                // // visitInfoForm.competitorvisitinfo[0].Id == formComp.Id
                //   ? visitInfoForm.competitorvisitinfo[0].zx_percent
                //   : formComp.zx_percent

                updateCompForm.zx_percent && updateCompForm.Id == formComp.Id
                  ? updateCompForm.zx_percent
                  : formComp.zx_percent
              }
              editable={visitInfoForm.Id ? this.props.showInput : true}
              onChange={(value) => {
                const numericRegex = /^[0-9]$|^[1-9][0-9]$|^(100)$|^$/;
                if (numericRegex.test(value)) {
                  formComp.Id
                    ? this.props.changeUpdateCompForm({
                        edited_field: "zx_percent",
                        edited_value: value,
                        //   Id: visitInfoForm.competitorvisitinfo[0].Id,
                        // show: true
                        Id: formComp.Id,
                      })
                    : changeForm({
                        edited_field: "zx_percent",
                        edited_value: value,
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
                fontWeight: "bold",
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

                // marginLeft:("3%"),
                backgroundColor: "white",
                textAlign: "center",
              }}
              placeholder="Value(lacs)"
              textAlign="center"
              value={
                // visitInfoForm.competitorvisitinfo[0].zx_valuepa
                // // visitInfoForm.competitorvisitinfo[0].Id == formComp.Id
                //   ? visitInfoForm.competitorvisitinfo[0].zx_valuepa
                //   : formComp.zx_valuepa
                updateCompForm.zx_valuepa && updateCompForm.Id == formComp.Id
                  ? updateCompForm.zx_valuepa
                  : formComp.zx_valuepa
              }
              editable={visitInfoForm.Id ? this.props.showInput : true}
              onChange={(value) => {
                formComp.Id
                  ? this.props.changeUpdateCompForm({
                      edited_field: "zx_valuepa",
                      edited_value: value,
                      Id: formComp.Id,
                      // Id: visitInfoForm.competitorvisitinfo[0].Id,
                      // show: true
                    })
                  : changeForm({
                      edited_field: "zx_valuepa",
                      edited_value: value,
                    });
              }}
              // defaultValue={text}
            />
          </View>
        </View>
        <Text
          style={{
            color: Colors.darkRedPink,
            marginLeft: wp("3%"),
            marginTop: hp("2%"),
            fontWeight: "bold",
          }}
        >
          Distributor
        </Text>
        <View
          style={{
            width: wp("76%"),
            bottom: hp("0.8%"),
            right: wp("2.5%"),
            left: "0.5%",
          }}
        >
          <InputText
            style={{
              height: 40,
              // borderWidth: 1,
              borderColor: "white",
              marginTop: hp("2%"),
              width: wp("72%"),
              backgroundColor: "white",
              marginLeft: wp("3%"),
            }}
            placeholder="Enter Distributor Name"
            // textAlign="center"
            value={
              // visitInfoForm.competitorvisitinfo[0].zx_distributorname
              // // visitInfoForm.competitorvisitinfo[0].Id == formComp.Id
              //   ? visitInfoForm.competitorvisitinfo[0].zx_distributorname
              //   : formComp.zx_distributorname
              updateCompForm.zx_distributorname &&
              updateCompForm.Id == formComp.Id
                ? updateCompForm.zx_distributorname
                : formComp.zx_distributorname
            }
            editable={visitInfoForm.Id ? this.props.showInput : true}
            onChange={(value) => {
              formComp.Id
                ? this.props.changeUpdateCompForm({
                    edited_field: "zx_distributorname",
                    edited_value: value,
                    Id: formComp.Id,
                    // Id: visitInfoForm.competitorvisitinfo[0].Id,
                    // show: true
                  })
                : changeForm({
                    edited_field: "zx_distributorname",
                    edited_value: value,
                  });
            }}
            // defaultValue={text}
          />
        </View>

        {/* <SearchableDropdown
            dataSource={[
               { id: "Yes", name: "Yes" },
               { id: "No", name: "No" },
              ]}
            placeHolderText={"Select Distributor"}
            selectedValue={selectedCustomer}
            onChange={(value) => changeCustomer(value)}
            placeholder={"Select Distributor"}
            invalid={false}
            customPickerStyles={{
              width: "85%",
              marginLeft:wp("14%"),
              // marginTop: 7,
              borderWidth: 1,
              borderBottomColor: "lightgrey",
              borderColor: "white",
              backgroundColor:"white"
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
            
          /> */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Text
            style={{
              fontFamily: "Segoe UI",
              color: Colors.darkRedPink,
              top: hp("2.5%"),
              fontSize: 15,
              fontWeight: "bold",
              marginRight: wp("52%"),
            }}
          >
            Brand
          </Text>
          <TouchableOpacity
            onPress={() =>
              addFormBrand({ id: _.uniqueId(), parent: formComp.id })
            }
          >
            <Image
              style={Style.img}
              source={require("App/Assets/Images/add.png")}
            />
          </TouchableOpacity>
        </View>
        {formComp.Id ? this.getBrands(formComp.Id) : []}

        {this.getBrandNode(formComp.id)}
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
  formBrand: state.visits.AddBrandForm,
  visitInfoForm: state.visits.visitInfoForm,
  updateCompForm: state.visits.updateCompForm,
  updateBrandForm: state.visits.updateBrandForm,
  showPicker: state.visits.showPicker,
  showInput: state.visits.showInput,
  dropPicker: state.visits.dropPicker,
});

const mapDispatchToProps = (dispatch) => ({
  changeCustomer: (params) => dispatch(VisitsActions.changeCustomer(params)),
  addFormBrand: (params) => dispatch(VisitsActions.addBrandForm(params)),

  removeFormBrand: (params) => dispatch(VisitsActions.removeBrandForm(params)),
  changeBrandForm: (params) => dispatch(VisitsActions.changeBrandForm(params)),
  changeUpdateBrandForm: (params) =>
    dispatch(VisitsActions.changeUpdateBrandForm(params)),
  changeUpdateCompForm: (params) =>
    dispatch(VisitsActions.changeUpdateCompForm(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCompetitorEntity);
