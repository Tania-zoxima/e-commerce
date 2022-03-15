import React, { Component } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
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
import { Card } from "react-native-paper";
import BackArrowButton from "App/Components/BackArrowButton";

class ComplaintInfo extends Component {
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

  getLocation() {
    const { location } = this.props;
    let pincode = [];
    if (location && location.length) {
      location.map((obj) => {
        if ({ id: obj.accountId, name: obj.name }) {
          pincode.push({ id: obj.accountId, name: obj.name });
        }
      });
    }
    return pincode;
  }

  render() {
    const complaintRef = [
      { id: "CCRD001 - Normal", name: "CCRD001 - Normal" },
      { id: "CCRD002 - Sample", name: "CCRD002 - Sample" },

      { id: "CCRD005 - Site Visit", name: "CCRD005 - Site Visit" },

      { id: "CCRD008 - Photo Emailed", name: "CCRD008 - Photo Emailed" },
      { id: "CCRD009 - Video Emailed", name: "CCRD009 - Video Emailed" },
    ];
    const comtype = [
      { id: "Technical", name: "Technical" },
      { id: "Commercial", name: "Commercial" },
    ];
    const { complaintForm, validation, token, loading } = this.props;

    //    let recordid=this.props.navigation.state.params;
    //  console.log("recorddiiddd",recordid.recordid.id)

    //   let forms={
    //     "zx_batchnumber":complaintForm.zx_batchnumber,
    //     "zx_complaintsid":recordid.recordid.id,
    //     "zx_complainttype":complaintForm.zx_complainttype,
    //     "zx_defectivequantity":complaintForm.zx_defectivequantity,
    //     "zx_installationdate":HelperService.convertMomentDateToTimestamp(complaintForm.zx_installationdate),
    //     "zx_location":complaintForm.zx_location,
    //     "zx_name":"Abhishek",
    //     "zx_shopimage":"oasngosndgn200403894",
    //     "zx_unloading":complaintForm.zx_unloading==true?"Yes":"No",
    //     "zx_visitingcardimageurl":"xyz://kabfakfbk.com",
    //     "zx_invoice":"919e0243-f6e2-43bf-84b7-04dc1c5a9f31",
    //     "zx_createdfrom":"SFA",
    //     "zx_customer":"7E9AC804-4605-EC11-B6E6-000D3AC9F36B",
    //     "zx_sampleitem":complaintForm.zx_sampleitem==true?"Yes":"No",
    //     "zx_complaintstatus":"Pending",
    //     "zx_complaintreference":complaintForm.zx_complaintreference,
    //     "zx_barcodenumber":complaintForm.zx_barcodenumber,
    //     "zx_itemcategory":"a2bb9559-12fe-40c4-ac49-92ea3df7fed7",
    //     "zx_dateofclosing":"1631185350757",
    //     "zx_productgroup":"1e877b70-5f71-4262-8dfc-854431b658d2",
    //     "zx_dateofregistration":HelperService.getCurrentTimestamp(),
    //     "zx_natureofthecomplaint":complaintForm.zx_natureofthecomplaint

    //   }

    return (
      <View style={{ marginBottom: hp("-22%") }}>
        <Card style={Style.cardstyle}>
          <BackArrowButton style={Style.backarrow} />
          <Text style={Style.title}>
            {"Complaint "}
            <Text style={Style.titleText}>{"Info"}</Text>
          </Text>

          <View
            style={{
              height: hp("10%"),
              width: wp("20%"),
              marginLeft: wp("56%"),
              marginTop: hp("-3%"),
            }}
          >
            <SearchableDropdown
              placeHolderText={"Select Complaint Type"}
              dataSource={comtype}
              selectedValue={complaintForm.zx_complainttype}
              disablePicker={true}
              onChange={(value) =>
                this.props.changeComplaintForm({
                  edited_field: "zx_complainttype",
                  edited_value: value,
                })
              }
              placeholder={"Select Complaint Type"}
              invalid={false}
              // customPickerStyles={{ ...Styles.picker1 }}
              labelStyles={{ ...Style.pickerLabel1 }}
            />
          </View>
          <View
            style={{
              height: hp("10%"),
              width: wp("20%"),
              marginLeft: wp("56%"),
              marginTop: hp("-4%"),
            }}
          >
            <SearchableDropdown
              placeHolderText={"Select Location "}
              dataSource={this.getLocation()}
              disablePicker={true}
              selectedValue={complaintForm.zx_location}
              onChange={(value) =>
                this.props.changeComplaintForm({
                  edited_field: "zx_location",
                  edited_value: value,
                })
              }
              placeholder={"Select Location "}
              invalid={false}
              labelStyles={{ ...Style.pickerLabel1 }}
              //   customPickerStyles={{ ...Styles.picker1 }}
            />
          </View>
        </Card>

        <ScrollView style={{ marginBottom: hp("47%") }}>
          <View style={{ ...Style.outerView, left: "2.5%" }}>
            <View style={Style.textView1}>
              <Text style={Style.textStyle}>Batch No.</Text>
              {/* <Text style={Style.textStyle}>{complaintForm.zx_batchnumber}</Text> */}

              <InputText
                style={Style.placeholder}
                placeholder={"Enter Batch No."}
                value={complaintForm.zx_batchnumber}
                editable={false}
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
                editable={false}
                value={complaintForm.zx_barcodenumber}
                onChange={(value) =>
                  this.props.changeComplaintForm({
                    edited_field: "zx_barcodenumber",
                    edited_value: value,
                  })
                }
              />
            </View>

            <View style={Style.textViewdate}>
              <Text style={Style.textStyle}>Installation Date</Text>

              <SelectDate
                date={HelperService.dateReadableFormat(
                  complaintForm.zx_installationdate
                )}
                disabled={true}
                onDateChange={(date) =>
                  this.props.changeComplaintForm({
                    edited_field: "zx_dateofbirth",
                    edited_value: date,
                  })
                }
              />
            </View>

            <View style={{ flexDirection: "row" }}>
              <View style={{ marginTop: hp("3.5%"), flexDirection: "row" }}>
                <Label style={{ marginLeft: wp("1%") }}>
                  {"Sample Item ?"}
                </Label>
                <CheckBox
                  style={{ marginLeft: wp("2%") }}
                  checked={complaintForm.zx_sampleitem == "Yes" ? true : false}
                  // onPress={(event) => {
                  //   let updatedValue =
                  //     complaintForm.zx_sampleitem == true ? false : true;
                  //   this.props.changeComplaintForm({
                  //     edited_field: "zx_sampleitem",
                  //     edited_value: updatedValue,
                  //   });
                  // }}
                  disabled={true}
                />
              </View>

              <View style={{ marginTop: hp("3.5%"), flexDirection: "row" }}>
                <Label style={{ marginLeft: wp("5%") }}>{"Unloading ?"}</Label>
                <CheckBox
                  style={{ marginLeft: wp("2%") }}
                  checked={complaintForm.zx_unloading == "Yes" ? true : false}
                  disabled={true}
                  //   onPress={(event) => {
                  //     let updatedValue = complaintForm.zx_unloading== true? false : true
                  //     this.props.changeComplaintForm({ edited_field: 'zx_unloading', edited_value: updatedValue })
                  //   }
                  //   }
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
                    disablePicker={true}
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
                    disablePicker={true}
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
                <InputText
                  style={Style.placeholder}
                  placeholder={"Enter Defective Quantity"}
                  editable={false}
                  value={complaintForm.zx_defectivequantity}
                  onChange={(value) =>
                    this.props.changeComplaintForm({
                      edited_field: "zx_defectivequantity",
                      edited_value: value,
                    })
                  }
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
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
    location: state.retailers.getAllLocation,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeComplaintForm: (params) =>
    dispatch(RetailersActions.changeComplaintForm(params)),
  submitComplaintForm: (params) =>
    dispatch(RetailersActions.complaintForm(params)),
  getNatureCode: (params) => dispatch(RetailersActions.getNatureCode(params)),
  getAllLocation: (params) => dispatch(RetailersActions.getAllLocation(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ComplaintInfo);
