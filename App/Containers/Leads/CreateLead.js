import React, { Component } from "react";
import InputText from "App/Components/FormInput/InputText";
import {
  View,
  Text,
  Image,
  Keyboard,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import BlueButton from "../../Components/BlueButton";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SearchableDropdown from "App/Components/SearchableDropdown";
import Uploadimage from "./Uploadimage";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import { Card } from "react-native-paper";
import BackArrowButton from "App/Components/BackArrowButton";
import { connect } from "react-redux";
import ProjectActions from "App/Stores/Project/Actions";
import InputNumber from "App/Components/FormInput/InputNumber";
import SelectDate from "../../Components/SelectDate/SelectDate";
import RetailersActions from "App/Stores/Retailers/Actions";
import SelectBox from "react-native-multi-selectbox";
import { xorBy } from "lodash";
import CompetitorActions from "App/Stores/Competitor/Actions";
import MultipleImagePicker from "App/Components/ImagePicker/MultipleImagePicker";
import CommonActions from "App/Stores/Common/Actions";
import GenericIcon from "App/Components/GenericIcon";
import { HelperService } from "App/Services/Utils/HelperService";
import LeadActions from "App/Stores/Lead/Actions";
import IndicatorInputText from "App/Components/FormInput/IndicatorInputText";
class CreateLead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTeams: [],
      timer: null,
    };
  }
  componentDidMount() {
    const { token, agentid } = this.props;
    let params = {
      token,
      form: {
        team: agentid,
        projecttype: [],
        projectPipelinestage: [],
        fromDate: null,
        toDate: null,
      },
    };
    this.props.fetchRetailers({ token, agentid });
    this.props.getProject(params);
  }
  getDistributor() {
    const { retailerdata } = this.props;
    let distributor = [];
    if (retailerdata && retailerdata.length) {
      retailerdata.map((obj) => {
        if (
          obj.zx_accounttype == "Primary Distributor" ||
          obj.zx_accounttype == "Distributor"
        ) {
          distributor.push({
            id: obj.id,
            name: obj.name,
          });
        }
      });
    }
    return distributor;
  }

  getName() {
    const { project } = this.props;
    let Name = [];
    if (project && project.length) {
      project.map((obj) => {
        if ({ id: obj.Id, name: obj.zx_nameofproject }) {
          Name.push({
            id: obj.Id,
            name: obj.zx_nameofproject,
          });
        }
      });
    }
    return Name;
  }

  render() {
    const {
      changeLeadForm,
      leadForm,
      token,
      agentid,
      loading,
      list,
      uploadImage,
      uploadImageField,
      uploadImageLoader,
      validation,
      code,
    } = this.props;

    let forms = {
      zx_project: leadForm.zx_project,
      zx_distributor: leadForm.zx_distributor,
      zx_projectdescription: leadForm.zx_projectdescription
        ? leadForm.zx_projectdescription
        : null,
      zx_probability: leadForm.zx_probability,
      zx_type: leadForm.zx_type,
      zx_leadsource: leadForm.zx_leadsource,
      zx_stage: leadForm.zx_stage,
      zx_dealstatus: leadForm.zx_dealstatus,
      zx_scheduledeliverydate: leadForm.zx_scheduledeliverydate,
      zx_remarks: leadForm.zx_remarks ? leadForm.zx_remarks : null,
      zx_attachments: "Books",
      zx_team: agentid,
    };
    //   console.log("beennnn",this.state.selectedTeams)
    // let record = this.state.selectedTeams.find(c => c.item == "Others")
    // console.log("beennnnzzz",record)

    return (
      <View style={Styles.mainContainer}>
        <Card
          style={
            code.zx_brandgroupcode == "1"
              ? Styles.cardstyle
              : Styles.cardstyleBlue
          }
        >
          <BackArrowButton style={Styles.backarrow} />
          <Text style={Styles.title}>{"Create Opportunity "}</Text>
        </Card>
        <ScrollView style={{ bottom: "5%" }}>
          <View style={{ ...Styles.outerView, marginTop: "2.5%" }}>
            <View style={{ ...Styles.dropDown }}>
              <Text style={Styles.textStyle}>Project*</Text>

              <View style={Styles.dropDownInner}>
                <SearchableDropdown
                  dataSource={this.getName()}
                  placeHolderText={" Select Project"}
                  selectedValue={leadForm.zx_project}
                  onChange={(value) =>
                    this.props.changeLeadForm({
                      edited_field: "zx_project",
                      edited_value: value,
                    })
                  }
                  placeholder={"Select Project"}
                  invalid={false}
                  customPickerStyles={{ ...Styles.picker }}
                />
              </View>
            </View>
            <View style={{ ...Styles.dropDown }}>
              <Text style={Styles.textStyle}>Distributor*</Text>

              <View style={Styles.dropDownInner}>
                <SearchableDropdown
                  dataSource={this.getDistributor()}
                  placeHolderText={" Select Distributor"}
                  selectedValue={leadForm.zx_distributor}
                  onChange={(value) =>
                    this.props.changeLeadForm({
                      edited_field: "zx_distributor",
                      edited_value: value,
                    })
                  }
                  placeholder={"Select Distributor"}
                  invalid={false}
                  customPickerStyles={{ ...Styles.picker }}
                  // labelStyles={{ ...Styles.pickerLabel }}
                  //   invalid={
                  //     validation.invalid && validation.invalid_field == "zx_type"
                  //   }
                  //  label={"Area"}
                />
              </View>
            </View>
            {/* <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>
                Name of the marketing person*
              </Text>
              <InputText
                style={Styles.placeholder}
                placeholder={"Enter Name of the marketing person"}
                value={leadForm.zx_nameofproject}
                onChange={(value) =>
                  this.props.changeLeadForm({
                    edited_field: "zx_nameofproject",
                    edited_value: value,
                  })
                }
                // error={
                //   validation.invalid &&
                //   validation.invalid_field == "zx_nameofproject"
                // }
              />
            </View> */}

            <View style={{ ...Styles.dropDown }}>
              <Text style={Styles.textStyle}>Type*</Text>

              <View style={Styles.dropDownInner}>
                <SearchableDropdown
                  dataSource={[
                    { id: "New business", name: "New business" },
                    { id: "Existing business", name: "Existing business" },
                    { id: "Upgrade", name: "Upgrade" },
                    { id: "Partner sale", name: "Partner sale" },
                  ]}
                  placeHolderText={" Select Type"}
                  selectedValue={leadForm.zx_type}
                  onChange={(value) =>
                    this.props.changeLeadForm({
                      edited_field: "zx_type",
                      edited_value: value,
                    })
                  }
                  placeholder={"Select Type"}
                  invalid={false}
                  customPickerStyles={{ ...Styles.picker }}
                  // labelStyles={{ ...Styles.pickerLabel }}
                  //   invalid={
                  //     validation.invalid && validation.invalid_field == "zx_type"
                  //   }
                  //  label={"Area"}
                />
              </View>
            </View>
            {/* <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>Contact Number</Text>
              <InputNumber
                style={Styles.placeholder}
                placeholder={"Enter Contact Number"}
                value={leadForm.zx_numberofongoingprojects}
                onChange={(value) =>
                  this.props.changeLeadForm({
                    edited_field: "zx_numberofongoingprojects",
                    edited_value: value,
                  })
                }
              />
            </View> */}

            <View style={Styles.dropDown}>
              <Text style={Styles.textStyle}>Lead source*</Text>

              <View style={Styles.dropDownInner}>
                <SearchableDropdown
                  dataSource={[
                    { id: "Campaign", name: "Campaign" },
                    { id: "Cold call", name: "Cold call" },
                    {
                      id: "Conference",
                      name: "Conference",
                    },
                    { id: "Direct mail", name: "Direct mail" },
                    { id: "Distributor enquiry", name: "Distributor enquiry" },
                    { id: "Email", name: "Email" },
                    { id: "Employee", name: "Employee" },
                    { id: "Biltrax", name: "Biltrax" },
                  ]}
                  placeHolderText={" Select Lead source "}
                  selectedValue={leadForm.zx_leadsource}
                  onChange={(value) =>
                    this.props.changeLeadForm({
                      edited_field: "zx_leadsource",
                      edited_value: value,
                    })
                  }
                  placeholder={"Select Lead source"}
                  invalid={false}
                  customPickerStyles={{ ...Styles.picker }}
                  // labelStyles={{ ...Styles.pickerLabel }}
                  //   invalid={
                  //     validation.invalid &&
                  //     validation.invalid_field == "zx_leadsource"
                  //   }
                  //  label={"Area"}
                />
              </View>
            </View>

            <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>Project description*</Text>
              <InputText
                style={Styles.placeholder}
                placeholder={"Enter Project description"}
                value={leadForm.zx_projectdescription}
                onChange={(value) =>
                  this.props.changeLeadForm({
                    edited_field: "zx_projectdescription",
                    edited_value: value,
                  })
                }
                // error={
                //   validation.invalid &&
                //   validation.invalid_field == "zx_projectdescription"
                // }
              />
            </View>

            <View style={Styles.dropDown}>
              <Text style={Styles.textStyle}>Stage*</Text>

              <View style={Styles.dropDownInner}>
                <SearchableDropdown
                  dataSource={[
                    { id: "Customer evaluation", name: "Customer evaluation" },
                    { id: "Negotiation", name: "Negotiation" },
                    {
                      id: "Quote",
                      name: "Quote",
                    },
                    { id: "Costing approval", name: "Costing approval" },
                    { id: "Closed won", name: "Closed won" },
                    { id: "Closed lost", name: "Closed lost" },
                  ]}
                  placeHolderText={" Select Stage "}
                  selectedValue={leadForm.zx_stage}
                  onChange={(value) =>
                    this.props.changeLeadForm({
                      edited_field: "zx_stage",
                      edited_value: value,
                    })
                  }
                  placeholder={"Select Stage"}
                  invalid={false}
                  customPickerStyles={{ ...Styles.picker }}
                  // labelStyles={{ ...Styles.pickerLabel }}
                  //   invalid={
                  //     validation.invalid && validation.invalid_field == "zx_stage"
                  //   }
                  //  label={"Area"}
                />
              </View>
            </View>
            <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>Probability %</Text>
              <InputNumber
                style={Styles.placeholder}
                placeholder={"Enter Probability %"}
                value={leadForm.zx_probability}
                onChange={(value) =>
                  this.props.changeLeadForm({
                    edited_field: "zx_probability",
                    edited_value: value,
                  })
                }
              />
            </View>
            <View style={Styles.dropDown}>
              <Text style={Styles.textStyle}>Deal Status*</Text>

              <View style={Styles.dropDownInner}>
                <SearchableDropdown
                  dataSource={[
                    { id: "Abandoned", name: "Abandoned" },
                    { id: "Closed", name: "Closed" },
                    {
                      id: "Lost",
                      name: "Lost",
                    },
                    { id: "Not Interested", name: "Not Interested" },
                    { id: "Progress", name: "Progress" },
                  ]}
                  placeHolderText={" Select Deal Status "}
                  selectedValue={leadForm.zx_dealstatus}
                  onChange={(value) =>
                    this.props.changeLeadForm({
                      edited_field: "zx_dealstatus",
                      edited_value: value,
                    })
                  }
                  placeholder={"Select Deal Status"}
                  invalid={false}
                  customPickerStyles={{ ...Styles.picker }}
                  // labelStyles={{ ...Styles.pickerLabel }}
                  //   invalid={
                  //     validation.invalid &&
                  //     validation.invalid_field == "zx_dealstatus"
                  //   }
                  //  label={"Area"}
                />
              </View>
            </View>

            {/* <View
              style={{
                flexDirection: "column",
                borderColor: Colors.lightGrey,
                borderBottomWidth: 1,
                width: wp("90%"),
                margin: "4%",
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 14 }}>Remarks*</Text>
              <IndicatorInputText
                style={{ marginTop: "4%" }}
                placeholder={"Enter Remarks"}
                //  maxLength={0}
                value={leadForm.zx_remarks}
                multiline={true}
                numberOfLines={1}
                onChange={(value) =>
                  this.props.changeLeadForm({
                    edited_field: "zx_remarks",
                    edited_value: value,
                  })
                }
              />
            </View> */}

            <View
              style={{
                flexDirection: "column",
                borderColor: Colors.lightGrey,
                borderBottomWidth: 1,
                width: wp("80%"),
                left: wp("7%"),
                marginTop: hp("2%"),
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 14,
                  top: hp("3%"),
                }}
              >
                Schedule Date of Delivery*
              </Text>
              <SelectDate
                style={{ top: hp("10%") }}
                date={leadForm.zx_scheduledeliverydate}
                onDateChange={(date) =>
                  this.props.changeLeadForm({
                    edited_field: "zx_scheduledeliverydate",
                    edited_value: date,
                  })
                }
              />
            </View>
            <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>Remarks*</Text>
              <IndicatorInputText
                style={{ top: hp("5%") }}
                placeholder={"Enter Remarks"}
                //  maxLength={0}
                value={leadForm.zx_remarks}
                multiline={true}
                numberOfLines={1}
                onChange={(value) =>
                  this.props.changeLeadForm({
                    edited_field: "zx_remarks",
                    edited_value: value,
                  })
                }
              />
              {/* <InputText
                style={Styles.placeholder}
                placeholder={"Enter Remarks"}
                value={leadForm.zx_remarks}
                onChange={(value) =>
                  this.props.changeLeadForm({
                    edited_field: "zx_remarks",
                    edited_value: value,
                  })
                }
              /> */}
            </View>
          </View>
          <View
            style={{
              marginTop: "2%",
              height: "2%",
              width: "35%",
              alignSelf: "center",
            }}
          >
            <BlueButton
              style={
                code.zx_brandgroupcode == "1"
                  ? { marginTop: "1%", paddingBottom: hp("1%") }
                  : { marginTop: "1%", backgroundColor: Colors.bluebackground }
              }
              title={"SAVE"}
              onPress={() => {
                leadForm.zx_probability
                  ? leadForm.zx_probability > 100
                    ? HelperService.showToast({
                        message: "Enter Valid Probability Number",
                      })
                    : this.props.createLeadForm({ form: forms, token })
                  : HelperService.showToast({
                      message: "Enter Probability Number",
                    });
              }}
              // disabled={loading}
              // loading={loading}
            />
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
    leadForm: state.lead.leadForm,
    loading: state.lead.leadFormLoader,
    uploadImageField: state.common.uploadImageField,
    uploadImageLoader: state.common.uploadImageLoader,
    list: state.retailers.retailersList,
    retailerdata: state.retailers.retailersList.list,
    code: state.user.user_details,
    project: state.project.getProject,
    // validation: state.lead.leadFormValidation,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeLeadForm: (params) => dispatch(LeadActions.changeLeadForm(params)),
  createLeadForm: (params) => dispatch(LeadActions.createLeadForm(params)),
  fetchRetailers: (params) => dispatch(RetailersActions.fetchRetailers(params)),
  getCompetitorName: (params) =>
    dispatch(CompetitorActions.getCompetitorName(params)),
  getBathroomMaster: (params) =>
    dispatch(ProjectActions.getBathroomMaster(params)),
  uploadImage: (params) => dispatch(CommonActions.uploadImage(params)),
  leadFormValidationFailed: (params) =>
    dispatch(ProjectActions.leadFormValidationFailed(params)),
  getProject: (params) => dispatch(ProjectActions.getProject(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateLead);
const Styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: hp("0%"),
  },
  cardstyle: {
    backgroundColor: Colors.darkRedPink,
    width: wp("100%"),
    top: hp("-1%"),
    height: hp("12%"),
    borderBottomLeftRadius: 55,
    borderBottomRightRadius: 55,
  },
  cardstyleBlue: {
    backgroundColor: Colors.bluebackground,
    width: wp("100%"),
    top: hp("-1%"),
    height: hp("12%"),
    borderBottomLeftRadius: 55,
    borderBottomRightRadius: 55,
  },
  backarrow: {
    color: Colors.white,
    fontSize: 32,
    paddingLeft: 7,
    paddingTop: 20,
  },
  title: {
    fontFamily: "Rubik",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    bottom: hp("2%"),
    color: Colors.white,
  },

  head: {
    fontSize: 25,
    fontFamily: "Rubik",
    left: hp("0%"),
    fontWeight: "bold",
    color: Colors.black,
    top: hp("-1.5%"),
  },

  ttl: {
    color: Colors.lightGrey,
    fontSize: wp("3.5%"),
    fontFamily: ApplicationStyles.textFont,
    left: wp("8%"),
    fontWeight: "bold",
  },
  detail: {
    color: Colors.black,
    fontSize: wp("3.7%"),
    fontFamily: ApplicationStyles.textMsgFont,
    right: wp("8%"),
    fontWeight: "bold",
  },
  plusIcon: {
    borderRadius: 50,
    bottom: hp("10%"),
    position: "absolute",
    right: wp("4.5%"),
    borderRadius: 50,
    height: hp("6%"),
    width: wp("12%"),
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10000,
    elevation: 6,
  },
  checkicon: {
    left: wp("75%"),
    top: hp("-4%"),
    backgroundColor: Colors.darkRedPink,
    color: Colors.white,
    borderRadius: 50,
    height: hp(4),
    width: wp(8),
    padding: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  titleText: {
    color: Colors.black,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 28,
    fontWeight: "bold",
  },
  placeholder: {
    borderColor: "transparent",
    right: wp("1.5%"),
    fontFamily: "Segoe UI",
    // color:Colors.black,
    fontSize: 13,
    top: hp("2%"),
    fontWeight: "bold",
  },

  outerView: {
    flexDirection: "row",
    flexWrap: "wrap",
    left: "0%",
    right: "8%",
    top: "0%",
    marginBottom: "20%",
  },
  textView: {
    width: wp("80%"),
    marginTop: hp("1.5%"),
    display: "flex",
    flexDirection: "row",
    height: hp(15),
  },

  textView1: {
    width: wp("80%"),
    borderBottomWidth: 1,
    borderColor: Colors.lightGrey,
    marginTop: hp("1.5%"),
    left: wp("7%"),
  },
  textStyle: {
    fontFamily: "Segoe UI",
    color: Colors.black,
    top: hp("2.5%"),
    fontSize: 13,
    fontWeight: "bold",
  },
  dropDown: {
    width: wp("85%"),
    marginTop: hp("2%"),
    marginBottom: hp("3%"),
    marginLeft: wp("6%"),
  },
  dropDownInner: {
    // left: wp("5%"),
    top: hp("3.5%"),
  },
  picker: {
    // borderRadius: 100,
    width: wp("85%"),
    // height: hp('5.7%'),
    marginBottom: hp("2%"),
    paddingHorizontal: 8,
    left: wp("0.5%"),
  },
  button: {
    width: wp("29%"),
    height: hp("5%"),
    top: hp("5%"),
    left: wp("29%"),
    // paddingBottom: 4,
    borderRadius: 3,
  },
  textView2: {
    width: wp("40%"),
    borderBottomWidth: 1,
    borderColor: Colors.lightGrey,
    marginTop: hp("1.5%"),
    left: wp("7%"),
    height: hp(11),
  },
});
