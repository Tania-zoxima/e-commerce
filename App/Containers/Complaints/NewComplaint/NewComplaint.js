import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import Style from "./NewComplaintStyle";
import InputText from "App/Components/FormInput/InputText";
import TextArea from "App/Components/FormInput/TextArea";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SearchableDropdown from "App/Components/SearchableDropdown";
import GenericIcon from "App/Components/GenericIcon";
import NavigationService from "App/Services/NavigationService";
import BlueButton from "App/Components/BlueButton";
import MultipleImagePicker from "App/Components/ImagePicker/MultipleImagePicker";
import { connect } from "react-redux";
import {
  Icon,
  Input,
  Button,
  ListItem,
  Radio,
  Left,
  Right,
  CheckBox,
  Label,
} from "native-base";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import SelectDate from "../../../Components/SelectDate/SelectDate";
import CheckBoxContainer from "../../../Components/Checkox/Checkbox";
import RetailersActions from "App/Stores/Retailers/Actions";
import { fromPairs } from "lodash";
import { HelperService } from "App/Services/Utils/HelperService";

class NewComplaintScreen extends Component {
  componentDidMount() {
    const { token } = this.props;
    this.props.getNatureCode({
      token,
    });
  }

  getNature() {
    const { getNatureCodes } = this.props;
    let code = [];
    if (getNatureCodes && getNatureCodes.length) {
      getNatureCodes.map((obj) => {
        if ({ id: obj.id, name: obj.zx_description }) {
          code.push({ id: obj.id, name: obj.zx_description });
        }
      });
    }
    return code;
  }

  render() {
    const complaintRef = [
      { id: "CCRD001 - Normal", name: "CCRD001 - Normal" },
      { id: "CCRD002 - Sample", name: "CCRD002 - Sample" },

      { id: "CCRD005 - Site Visit", name: "CCRD005 - Site Visit" },

      { id: "CCRD008 - Photo Emailed", name: "CCRD008 - Photo Emailed" },
      { id: "CCRD009 - Video Emailed", name: "CCRD009 - Video Emailed" },
    ];
    const { complaintForm, validation, token, loading, agentid } = this.props;

    let recordid = this.props.navigation.state.params;
    // console.log("recorddiiddd", recordid);

    let forms = {
      zx_team: agentid,
      zx_batchnumber: complaintForm.zx_batchnumber,
      // zx_complaintsid: recordid.recordid.id,
      zx_complainttype: complaintForm.zx_complainttype,
      zx_defectivequantity: complaintForm.zx_defectivequantity,
      zx_installationdate: HelperService.convertMomentDateToTimestamp(
        complaintForm.zx_installationdate
      ),
      zx_location: complaintForm.zx_location,
      zx_name: "Abhishek",
      zx_shopimage: "oasngosndgn200403894",
      zx_unloading: complaintForm.zx_unloading == true ? "Yes" : "No",
      zx_visitingcardimageurl: "xyz://kabfakfbk.com",
      zx_invoice: recordid.recordid.id ? recordid.recordid.id : "",
      zx_createdfrom: "SFA",
      zx_customer: recordid.recordid.zx_invoiceto
        ? recordid.recordid.zx_invoiceto
        : "",
      zx_sampleitem: complaintForm.zx_sampleitem == true ? "Yes" : "No",
      zx_complaintstatus: "Pending",
      zx_complaintreference: complaintForm.zx_complaintreference,
      zx_barcodenumber: complaintForm.zx_barcodenumber,
      zx_itemcategory: recordid.recordid.zx_itemcategory
        ? recordid.recordid.zx_itemcategory
        : "",
      zx_dateofclosing: "1631185350757",
      zx_productgroup: recordid.recordid.zx_productgroup
        ? recordid.recordid.zx_productgroup
        : "",
      zx_dateofregistration: HelperService.getCurrentTimestamp(),
      zx_natureofthecomplaint: complaintForm.zx_natureofthecomplaint,
    };

    return (
      <ScrollView style={{ marginBottom: hp("5%") }}>
        <View style={{ ...Style.outerView, left: "2.5%" }}>
          <View style={Style.textView1}>
            <Text style={Style.textStyle}>Batch No.</Text>
            <InputText
              style={Style.placeholder}
              placeholder={"Enter Batch No."}
              value={complaintForm.zx_batchnumber}
              // editable={distributorForm.zx_overallstatus=="Pending for approval" || distributorForm.zx_overallstatus=="Approved" || distributorForm.zx_overallstatus=="Rejected" ? false:true}
              onChange={(value) =>
                this.props.changeComplaintForm({
                  edited_field: "zx_batchnumber",
                  edited_value: value,
                })
              }
            />
          </View>

          <View style={Style.textView1}>
            <Text style={Style.textStyle}>Barcode No.</Text>
            <InputText
              style={Style.placeholder}
              placeholder={"Enter Barcode No."}
              // editable={distributorForm.zx_overallstatus=="Pending for approval" || distributorForm.zx_overallstatus=="Approved" || distributorForm.zx_overallstatus=="Rejected" ? false:true}
              value={complaintForm.zx_barcodenumber}
              onChange={(value) =>
                this.props.changeComplaintForm({
                  edited_field: "zx_barcodenumber",
                  edited_value: value,
                })
              }
            />
          </View>

          {/* <View style={Style.textViewdate}>
        <Text style={Style.textStyle}>Installation Date</Text>
        <SelectDate
        date={complaintForm.zx_installationdate}
        // disabled={distributorForm.zx_overallstatus=="Pending for approval" || distributorForm.zx_overallstatus=="Approved" || distributorForm.zx_overallstatus=="Rejected" ? true:false}
        onDateChange={(date) => this.props.changeComplaintForm({
          edited_field: "zx_installationdate",
          edited_value: date,
        })}
        />
      </View> */}

          <View style={Style.textViewdate}>
            <Text style={Style.textStyle}>Installation Date</Text>
            <SelectDate
              date={complaintForm.zx_installationdate}
              maxDate={new Date()}
              // disabled={distriForm.zx_overallstatus=="Pending for approval" || distributorForm.zx_overallstatus=="Approved" || distributorForm.zx_overallstatus=="Rejected" ? true:false}
              onDateChange={(date) =>
                this.props.changeComplaintForm({
                  edited_field: "zx_installationdate",
                  edited_value: date,
                })
              }
            />
          </View>

          <View style={{ flexDirection: "row" }}>
            <View style={{ marginTop: hp("3.5%"), flexDirection: "row" }}>
              <Label style={{ marginLeft: wp("1%") }}>{"Sample Item ?"}</Label>
              <CheckBox
                style={{ marginLeft: wp("2%") }}
                checked={complaintForm.zx_sampleitem == true}
                onPress={(event) => {
                  let updatedValue =
                    complaintForm.zx_sampleitem == true ? false : true;
                  this.props.changeComplaintForm({
                    edited_field: "zx_sampleitem",
                    edited_value: updatedValue,
                  });
                }}
              />
            </View>

            <View style={{ marginTop: hp("3.5%"), flexDirection: "row" }}>
              <Label style={{ marginLeft: wp("5%") }}>{"Unloading ?"}</Label>
              <CheckBox
                style={{ marginLeft: wp("2%") }}
                checked={complaintForm.zx_unloading == true}
                onPress={(event) => {
                  let updatedValue =
                    complaintForm.zx_unloading == true ? false : true;
                  this.props.changeComplaintForm({
                    edited_field: "zx_unloading",
                    edited_value: updatedValue,
                  });
                }}
              />
            </View>
          </View>

          <View>
            <View style={Style.dropDown}>
              <Text style={Style.textStyle}>Complaint Refrence</Text>

              <View
                style={{
                  marginLeft: wp("1%"),
                  marginTop: hp("2%"),
                  width: wp("100%"),
                }}
              >
                <SearchableDropdown
                  placeHolderText={" Select Complaint Refrence"}
                  dataSource={complaintRef}
                  selectedValue={complaintForm.zx_complaintreference}
                  onChange={(value) =>
                    this.props.changeComplaintForm({
                      edited_field: "zx_complaintreference",
                      edited_value: value,
                    })
                  }
                  placeholder={"Select Complaint Refrence"}
                  labelStyles={{
                    color: Colors.black,
                    textAlign: "center",
                    // width: "99%",
                    //  padding:5,
                    fontSize: 13,
                    flexDirection: "row",
                  }}
                  invalid={false}
                  customPickerStyles={{
                    width: "80%",
                    marginLeft: 6,
                    marginTop: 15,
                    borderWidth: 1,
                    borderBottomColor: "lightgrey",
                    borderColor: "white",
                  }}
                  key={complaintForm.zx_complaintreference}
                />
              </View>
            </View>

            <View style={Style.dropDown}>
              <Text style={Style.textStyle}>Nature Code</Text>
              <View
                style={{
                  marginLeft: wp("1%"),
                  marginTop: hp("2%"),
                  width: wp("100%"),
                }}
              >
                <SearchableDropdown
                  placeHolderText={" Select Nature Code"}
                  dataSource={this.getNature()}
                  selectedValue={complaintForm.zx_natureofthecomplaint}
                  onChange={(value) =>
                    this.props.changeComplaintForm({
                      edited_field: "zx_natureofthecomplaint",
                      edited_value: value,
                    })
                  }
                  placeholder={"Select Nature Code"}
                  //   disablePicker={distributorForm.zx_overallstatus=="Pending for approval" || distributorForm.zx_overallstatus=="Approved" || distributorForm.zx_overallstatus=="Rejected" ? true:false}
                  labelStyles={{
                    color: Colors.black,
                    textAlign: "center",
                    // width: "99%",
                    //  padding:5,
                    fontSize: 13,
                    flexDirection: "row",
                  }}
                  // key={distributorForm.zx_billingpostcode + _.uniqueId()}
                  // invalid={false}
                  customPickerStyles={{
                    width: "80%",
                    marginLeft: 6,
                    marginTop: 15,
                    borderWidth: 1,
                    borderBottomColor: "lightgrey",
                    borderColor: "white",
                  }}
                  key={complaintForm.zx_natureofthecomplaint}
                />
              </View>
            </View>

            <View style={Style.textView1}>
              <Text style={Style.textStyle}>Defective Quantity</Text>
              <TextInput
                style={Style.placeholder1}
                placeholder={"Enter Defective Quantity"}
                keyboardType="numeric"
                // editable={distributorForm.zx_overallstatus=="Pending for approval" || distributorForm.zx_overallstatus=="Approved" || distributorForm.zx_overallstatus=="Rejected" ? false:true}
                value={complaintForm.zx_defectivequantity}
                onChangeText={(value) =>
                  this.props.changeComplaintForm({
                    edited_field: "zx_defectivequantity",
                    edited_value: value,
                  })
                }
              />
            </View>
          </View>

          <View
            style={{
              marginLeft: wp("30%"),
              marginTop: hp("5%"),
              height: hp("5%"),
            }}
          >
            <BlueButton
              style={{ ...Style.button }}
              title={"SUBMIT"}
              onPress={() => {
                complaintForm.zx_defectivequantity >
                recordid.recordid.zx_quantity
                  ? HelperService.showToast({
                      message:
                        "Please enter Defective Quantity less than or equal to invoiced Quantity",
                    })
                  : this.props.submitComplaintForm({ form: forms, token });
              }}
              disabled={loading}
              loading={loading}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    agentid: state.user.id,
    complaintForm: state.retailers.complaintForm,
    validation: state.retailers.complaintFormValidation,
    getNatureCodes: state.retailers.getNatureCode,
    loading: state.retailers.complaintFormLoader,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeComplaintForm: (params) =>
    dispatch(RetailersActions.changeComplaintForm(params)),
  submitComplaintForm: (params) =>
    dispatch(RetailersActions.complaintForm(params)),
  getNatureCode: (params) => dispatch(RetailersActions.getNatureCode(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewComplaintScreen);
