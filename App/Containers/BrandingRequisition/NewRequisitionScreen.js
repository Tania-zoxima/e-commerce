import React, { useState } from "react";
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
import DetailCard from "../../Components/DetailCard/DetailCard";
import DetailCardStrip from "../../Components/DetailCard/DetailCardStrip";
import SearchBar from "App/Components/SearchBar";
import GenericIcon from "App/Components/GenericIcon";
import NavigationService from "App/Services/NavigationService";
 import Styles from "./BrandRequisitionStyles";
import InputText from "App/Components/FormInput/InputText";
import BlueButton from "../../Components/BlueButton";
import SearchableDropdown from "App/Components/SearchableDropdown";
import Uploadimage from "../Leads/Uploadimage";
import { connect } from "react-redux";
import UserActions from 'App/Stores/User/Actions'



function NewRequisitionScreen(props) {
  const brandingList = [
    { id: "Shop Board", name: "Shop Board" },
    { id: "In Shop Branding", name: "In Shop Branding" },
  ];
  const { selectedBrand, changeBrand } = props;

  return (
    <View style={Styles.mainContainer}>
      

      <ScrollView>
        <View style={Styles.outerView}>
          <Text style={{ ...Styles.titleText }}>NEW REQUISITION</Text>
          

          {/* <View style={{ ...Styles.textView, left: wp("10%") }}>
            <Text style={Styles.textStyle}>To</Text>
            <InputText style={Styles.placeholder} placeholder={"Enter Date"} />
          </View>
          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Competitor Name*</Text>
            <InputText
              style={Styles.placeholder}
              placeholder={"Enter Competitor Name"}
            />
          </View> */}
          <View style={Styles.dropDown}>
            <Text style={Styles.textStyle}>Customer</Text>

            <View style={Styles.dropDownInner}>
              <SearchableDropdown
                // dataSource={this.props.agentAreas}
                placeHolderText={"Select Customer"}
                // selectedValue={influencerForm.area__c}
                // onChange={(value) =>
                //   this.props.changeInfluencerForm({
                //     edited_field: "area__c",
                //     edited_value: value,
                //   })
                // }
                placeholder={"Select Customer"}
                invalid={false}
                customPickerStyles={{ ...Styles.picker }}
                // labelStyles={{ ...Styles.pickerLabel }}
                // invalid={
                //   validation.invalid && validation.invalid_field == "area__c"
                // }
                //  label={"Area"}
              />
            </View>
            </View>
          {/* </View>

          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Period (In Days)</Text>
            <InputText
              style={Styles.placeholder}
              placeholder={"Enter Period"}
            />
          </View> */}
          {/* <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Area</Text>
            <InputText style={Styles.placeholder} placeholder={"Enter Area"} />
          </View>
          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Remarks</Text>
            <InputText
              style={Styles.placeholder}
              placeholder={"Enter Remarks"}
            />
          </View> */}
          <View style={Styles.dropDown}>
            <Text style={Styles.textStyle}>Shop Branding</Text>
            <View style={Styles.dropDownInner}>
              <SearchableDropdown
                 dataSource={brandingList}
                placeHolderText={"Select Shop Branding"}
                 selectedValue={selectedBrand}
                 onChange={(value) => changeBrand(value)}
                //   this.props.changeInfluencerForm({
                //     edited_field: "area__c",
                //     edited_value: value,
                //   })
                // }
                placeholder={"Select Shop Branding"}
                invalid={false}
                customPickerStyles={{ ...Styles.picker }}
                // labelStyles={{ ...Style.pickerLabel }}
                // invalid={
                //   validation.invalid && validation.invalid_field == "area__c"
                // }
                // label={"Area"}
              />
            </View>
          </View>
          {/* <View style={Styles.dropDown}>
            <Text style={Styles.textStyle}>Type of scheme</Text>

            <View style={Styles.dropDownInner}>
              <SearchableDropdown
                // dataSource={this.props.agentAreas}
                placeHolderText={"Select Type of scheme"}
                // selectedValue={influencerForm.area__c}
                // onChange={(value) =>
                //   this.props.changeInfluencerForm({
                //     edited_field: "area__c",
                //     edited_value: value,
                //   })
                // }
                placeholder={"Select Type of scheme"}
                invalid={false}
                customPickerStyles={{ ...Styles.picker }}
                // labelStyles={{ ...Style.pickerLabel }}
                // invalid={
                //   validation.invalid && validation.invalid_field == "area__c"
                // }
                // label={"Area"}
              />
            </View>
          </View> */}
          {/* <View style={Styles.dropDown}>
            <Text style={Styles.textStyle}>Mode of scheme</Text>

            <View style={Styles.dropDownInner}>
              <SearchableDropdown
                // dataSource={this.props.agentAreas}
                placeHolderText={"Select Mode of scheme"}
                // selectedValue={influencerForm.area__c}
                // onChange={(value) =>
                //   this.props.changeInfluencerForm({
                //     edited_field: "area__c",
                //     edited_value: value,
                //   })
                // }
                placeholder={"Select Mode of scheme"}
                invalid={false}
                customPickerStyles={{ ...Styles.picker }}
                // labelStyles={{ ...Style.pickerLabel }}
                // invalid={
                //   validation.invalid && validation.invalid_field == "area__c"
                // }
                // label={"Area"}
              />
            </View>
          </View>
          <View style={{display:"flex",flexDirection:"column",right:hp("10%"),marginTop:hp("4%"),marginBottom:hp("-15%")}}>
        <Text style={{left:wp("21%"),fontSize:11,color:Colors.firozi,marginTop:hp(1)}}>Add Image</Text>
        <Uploadimage/>
        </View> */}
        <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Qty</Text>
            <InputText
              style={Styles.placeholder}
              placeholder={"Enter Qty"}
            />
          </View>
          <View>
            <BlueButton style={Styles.button} title={"SAVE"} />
          </View>
        </View>
      </ScrollView>
    </View>
    
  );
}
const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid: state.user.id,
  agentAreas: state.user.agentAreas,
  agentDetails: state.user.agentDetails,
  selectedBrand: state.user.branding.selectedBrand,

});
const mapDispatchToProps = (dispatch) => ({
  changeForm: (params) => dispatch(VisitsActions.changeVisitInfoForm(params)),
  changeBrand: (params) => dispatch(UserActions.changeBrand(params)),

});


export default connect(
  mapStateToProps,mapDispatchToProps
)(NewRequisitionScreen)


