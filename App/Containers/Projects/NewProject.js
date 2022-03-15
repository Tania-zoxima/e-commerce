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
import _ from "lodash";
import IndicatorInputText from "../../Components/FormInput/IndicatorInputText";

class NewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTeams: [],
      timer: null,
    };
  }
  componentDidMount() {
    const { token, agentid } = this.props;
    this.state.timer = setTimeout(
      () =>
        this.props.fetchRetailers({
          token,
          agentid,
        }),
      2000
    );
    this.state.timer = setTimeout(
      () =>
        this.props.getCompetitorName({
          token,
        }),
      3000
    );
  }

  getDistributor() {
    const { retailerdata, list } = this.props;
    // console.log("listttt", list);
    let distributor = [];
    if (retailerdata && retailerdata.length) {
      retailerdata.map((obj) => {
        if (obj.zx_accounttype == "Consultant") {
          distributor.push({
            id: obj.id,
            name: obj.name,
          });
        }
      });
    }
    return distributor;
  }

  getDistributor1() {
    const { retailerdata, list } = this.props;
    // console.log("listttt", list);
    let distributor = [];
    if (retailerdata && retailerdata.length) {
      retailerdata.map((obj) => {
        if (obj.zx_accounttype == "Architects") {
          distributor.push({
            id: obj.id,
            name: obj.name,
          });
        }
      });
    }
    return distributor;
  }

  getDistributor2() {
    const { retailerdata, list } = this.props;
    // console.log("listttt", list);
    let distributor = [];
    if (retailerdata && retailerdata.length) {
      retailerdata.map((obj) => {
        if (obj.zx_accounttype == "Contractor") {
          distributor.push({
            id: obj.id,
            name: obj.name,
          });
        }
      });
    }
    return distributor;
  }

  onMultiChange() {
    return (item) =>
      this.setState({
        selectedTeams: xorBy(this.state.selectedTeams, [item], "id"),
      });
  }

  getData() {
    let data = [];
    if (this.state.selectedTeams.length) {
      this.state.selectedTeams.map((obj, index) => {
        data.push(obj.item);
      });
    }
    // console.log("fffeeerrr", data);
    return data;
  }

  getName() {
    const { name } = this.props;
    let Name = [];
    if (name && name.length) {
      name.map((obj) => {
        if ({ id: obj.zx_competitormasterid, name: obj.zx_recordid }) {
          Name.push({
            id: obj.zx_competitormasterid,
            name: obj.zx_recordid,
          });
        }
      });
    }
    return Name;
  }
  getCost() {
    const { bathroomMaster, projectForm } = this.props;
    let value = projectForm.zx_numberofbathrooms;
    let value1 = bathroomMaster.zx_panindiabathroomcost;
    let value2 = value * value1;
    return value2;
  }
  validateGstNumber(value) {
    let error;
    if (!value) {
      error = "Required";
    } else if (
      !/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/.test(value)
    ) {
      error = "Invalid GST Number";
    }
    return error;
  }

  validateEmpty(value) {
    let error;
    if (!value) {
      error = "Required";
    }
    return error;
  }

  other() {
    const { projectForm } = this.props;
    let value = "";
    if (this.getData().length) {
      value = this.getData().some((c) => c == "Others");
    }
    // console.log("recorddd", value);
    return value;
  }

  render() {
    const {
      changeProjectForm,
      projectForm,
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
      zx_numberofongoingprojects: projectForm.zx_numberofongoingprojects
        ? projectForm.zx_numberofongoingprojects
        : null,
      zx_numberofupcomingprojects: projectForm.zx_numberofupcomingprojects
        ? projectForm.zx_numberofupcomingprojects
        : null,
      zx_nameofproject: projectForm.zx_nameofproject,
      zx_location: projectForm.zx_location,
      zx_numberofbathrooms: projectForm.zx_numberofbathrooms,
      zx_numberoffloors: projectForm.zx_numberofbathrooms,
      zx_numberoftowers: projectForm.zx_numberoftowers,
      zx_landareaunderdevelopment: projectForm.zx_landareaunderdevelopment,
      zx_Nameofplumbingconsultant: projectForm.zx_Nameofplumbingconsultant
        ? projectForm.zx_Nameofplumbingconsultant
        : null,
      zx_nameofarchitect: projectForm.zx_nameofarchitect
        ? projectForm.zx_nameofarchitect
        : null,
      zx_nameofplumbingcontractor: projectForm.zx_nameofplumbingcontractor
        ? projectForm.zx_nameofplumbingcontractor
        : null,
      zx_projectcost: projectForm.zx_projectcost,
      zx_RERAnumber: projectForm.zx_RERAnumber
        ? projectForm.zx_RERAnumber
        : null,
      zx_RERAImageofproof: projectForm.zx_RERAImageofproof,
      // ? projectForm.zx_RERAImageofproof
      // : null,
      zx_gstnumber: projectForm.zx_gstnumber,
      zx_ImageofProof: projectForm.zx_ImageofProof
        ? projectForm.zx_ImageofProof
        : null,
      zx_type: projectForm.zx_type,
      zx_otherprojecttype: projectForm.zx_otherprojecttype,
      zx_referencefrom: this.getData(),
      zx_otherreference: projectForm.zx_otherreference,

      zx_pipelinestage: projectForm.zx_pipelinestage,
      zx_team: agentid,
      zx_Projectcompletiondate: projectForm.zx_Projectcompletiondate
        ? HelperService.convertMomentDateToTimestamp(
            projectForm.zx_Projectcompletiondate
          )
        : null,
      zx_Tentativedateofsupply: projectForm.zx_Tentativedateofsupply
        ? HelperService.convertMomentDateToTimestamp(
            projectForm.zx_Tentativedateofsupply
          )
        : null,
      zx_Competitor: projectForm.zx_Competitor
        ? projectForm.zx_Competitor
        : null,
    };
    //   console.log("beennnn",this.state.selectedTeams)
    // let record = this.state.selectedTeams.find((c) => c.item == "Others");
    // console.log("beennnnzzz", this.other());
    var minDate = new Date();

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
          <Text style={Styles.title}>{"Create Project "}</Text>
        </Card>
        <ScrollView style={{ bottom: "5%" }}>
          <View style={{ ...Styles.outerView, marginTop: "5%" }}>
            <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>Name of project*</Text>
              <InputText
                style={Styles.placeholder}
                placeholder={"Enter Name of project"}
                value={projectForm.zx_nameofproject}
                onChange={(value) =>
                  this.props.changeProjectForm({
                    edited_field: "zx_nameofproject",
                    edited_value: value,
                  })
                }
                error={
                  validation.invalid &&
                  validation.invalid_field == "zx_nameofproject"
                }
              />
            </View>
            <View style={{ ...Styles.dropDown }}>
              <Text style={Styles.textStyle}>Type*</Text>
              <View style={Styles.dropDownInner}>
                <SearchableDropdown
                  dataSource={[
                    { id: "Residential", name: "Residential" },
                    { id: "Commercial", name: "Commercial" },
                    { id: "Layout", name: "Layout" },
                    { id: "Hospital", name: "Hospital" },
                    { id: "Hotel", name: "Hotel" },
                    { id: "Township", name: "Township" },
                    { id: "Villa", name: "Villa" },
                    { id: "Resort", name: "Resort" },
                    { id: "Industry", name: "Industry" },
                    { id: "Infra", name: "Infra" },
                    { id: "Others", name: "Others" },
                  ]}
                  placeHolderText={" Select Type"}
                  selectedValue={projectForm.zx_type}
                  onChange={(value) =>
                    this.props.changeProjectForm({
                      edited_field: "zx_type",
                      edited_value: value,
                    })
                  }
                  placeholder={"Select Type"}
                  invalid={false}
                  customPickerStyles={{ ...Styles.picker }}
                  labelStyles={{
                    color: Colors.black,
                    fontFamily: ApplicationStyles.textFont,
                    textAlign: "left",
                    //   width: "99%",
                    //  padding:5,
                    fontSize: 13,
                    flexDirection: "row",
                  }}
                  error={
                    validation.invalid && validation.invalid_field == "zx_type"
                  }
                  //  label={"Area"}
                />
              </View>
            </View>
            {projectForm.zx_type == "Others" ? (
              <View
                style={{
                  width: wp("85%"),
                  marginTop: hp("2%"),
                  marginLeft: wp("6%"),
                }}
              >
                <IndicatorInputText
                  style={{ marginTop: "10%" }}
                  placeholder={"Enter Type!"}
                  //  maxLength={0}
                  value={projectForm.zx_otherprojecttype}
                  multiline={true}
                  numberOfLines={1}
                  onChange={(value) =>
                    changeProjectForm({
                      edited_field: "zx_otherprojecttype",
                      edited_value: value,
                    })
                  }
                />
                {/* <TextInput
                  style={{
                    height: 40,
                    borderWidth: 1,
                    borderColor: "black",
                    marginTop: hp("1%"),
                  }}
                  placeholder="Enter Other Type!"
                  value={projectForm.zx_otherprojecttype}
                  onChangeText={(value) =>
                    changeProjectForm({
                      edited_field: "zx_otherprojecttype",
                      edited_value: value,
                    })
                  }
                /> */}
                <Text style={{ color: "red", left: wp("1%") }}>
                  {this.validateEmpty(projectForm.zx_otherprojecttype)}
                </Text>
              </View>
            ) : (
              []
            )}
            {/* {projectForm.zx_type == "Others" ? (
              <View
                style={{
                  marginLeft: "5%",
                  width: "65%",
                  backgroundColor: "pink",
                }}
              >
                <TextInput
                  style={{
                    marginTop: "3%",
                    borderRadius: 5,
                    paddingBottom: 60,
                    width: "100%",
                    borderColor: Colors.lightGrey,
                    borderWidth: 1,
                    backgroundColor: "white",
                  }}
                  placeholder={"Enter Type"}
                  value={projectForm.zx_otherprojecttype}
                  onChangeText={(value) =>
                    changeProjectForm({
                      edited_field: "zx_otherprojecttype",
                      edited_value: value,
                    })
                  }
                  // error={
                  //     validation.invalid &&
                  //     validation.invalid_field == "zx_otherprojecttype"
                  //   }

                  //label={'Other*'}
                />
                <Text style={{ color: "red", left: wp("1%") }}>
                  {this.validateEmpty(projectForm.zx_otherprojecttype)}
                </Text>
              </View>
            ) : (
              []
            )} */}

            <View style={Styles.dropDown}>
              <Text style={Styles.textStyle}>Pipeline stage*</Text>

              <View style={Styles.dropDownInner}>
                <SearchableDropdown
                  dataSource={[
                    { id: "Design stage", name: "Design stage" },
                    { id: "Tendering stage", name: "Tendering stage" },
                    {
                      id: "Order issued to contractor",
                      name: "Order issued to contractor",
                    },
                    { id: "Mock up stage", name: "Mock up stage" },
                    { id: "Price offer stage", name: "Price offer stage" },
                    { id: "Order issued stage", name: "Order issued stage" },
                    { id: "Supply stage", name: "Supply stage" },
                  ]}
                  placeHolderText={" Select pipeline stage "}
                  selectedValue={projectForm.zx_pipelinestage}
                  onChange={(value) =>
                    this.props.changeProjectForm({
                      edited_field: "zx_pipelinestage",
                      edited_value: value,
                    })
                  }
                  placeholder={"Select pipeline stage"}
                  invalid={false}
                  customPickerStyles={{ ...Styles.picker }}
                  labelStyles={{
                    color: Colors.black,
                    fontFamily: ApplicationStyles.textFont,
                    textAlign: "left",
                    //   width: "99%",
                    //  padding:5,
                    fontSize: 13,
                    flexDirection: "row",
                  }}
                  error={
                    validation.invalid &&
                    validation.invalid_field == "zx_pipelinestage"
                  }
                  //  label={"Area"}
                />
              </View>
            </View>

            <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>Number of ongoing projects</Text>
              <InputNumber
                style={Styles.placeholder}
                placeholder={"Enter Number of ongoing projects"}
                value={projectForm.zx_numberofongoingprojects}
                onChange={(value) =>
                  this.props.changeProjectForm({
                    edited_field: "zx_numberofongoingprojects",
                    edited_value: value,
                  })
                }
              />
            </View>

            <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>Number of upcoming projects</Text>
              <InputNumber
                style={Styles.placeholder}
                placeholder={"Enter Number of upcoming projects"}
                value={projectForm.zx_numberofupcomingprojects}
                onChange={(value) =>
                  this.props.changeProjectForm({
                    edited_field: "zx_numberofupcomingprojects",
                    edited_value: value,
                  })
                }
              />
            </View>

            <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>Location*</Text>
              <InputText
                style={Styles.placeholder}
                placeholder={"Enter Location"}
                value={projectForm.zx_location}
                onChange={(value) =>
                  this.props.changeProjectForm({
                    edited_field: "zx_location",
                    edited_value: value,
                  })
                }
                error={
                  validation.invalid &&
                  validation.invalid_field == "zx_location"
                }
              />
            </View>

            <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>Number of bathrooms*</Text>
              <InputNumber
                style={Styles.placeholder}
                placeholder={"Enter Number of bathrooms"}
                value={projectForm.zx_numberofbathrooms}
                onChange={(value) => {
                  this.props.changeProjectForm({
                    edited_field: "zx_numberofbathrooms",
                    edited_value: value,
                  });
                  this.props.getBathroomMaster({
                    token,
                    value: value,
                  });
                }}
                error={
                  validation.invalid &&
                  validation.invalid_field == "zx_numberofbathrooms"
                }
              />
            </View>

            {projectForm.zx_numberofbathrooms ? (
              <View style={Styles.textView1}>
                <Text style={Styles.textStyle}>Cost of Project</Text>
                <InputText
                  style={Styles.placeholder}
                  placeholder={"Enter Project Cost"}
                  value={projectForm.zx_projectcost}
                  editable={false}
                  // onChange={(value) =>
                  //   this.props.changeProjectForm({
                  //     edited_field: "zx_RERAnumber",
                  //     edited_value: value,
                  //   })
                  // }
                />
              </View>
            ) : null}

            <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>Number of floors*</Text>
              <InputNumber
                style={Styles.placeholder}
                placeholder={"Enter Number of floors"}
                value={projectForm.zx_numberoffloors}
                onChange={(value) =>
                  this.props.changeProjectForm({
                    edited_field: "zx_numberoffloors",
                    edited_value: value,
                  })
                }
                error={
                  validation.invalid &&
                  validation.invalid_field == "zx_numberoffloors"
                }
              />
            </View>

            <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>Number of towers*</Text>
              <InputNumber
                style={Styles.placeholder}
                placeholder={"Enter Number of towers"}
                value={projectForm.zx_numberoftowers}
                onChange={(value) =>
                  this.props.changeProjectForm({
                    edited_field: "zx_numberoftowers",
                    edited_value: value,
                  })
                }
                error={
                  validation.invalid &&
                  validation.invalid_field == "zx_numberoftowers"
                }
              />
            </View>

            <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>
                Land area under development(Sq. Ft)*
              </Text>
              <InputNumber
                style={Styles.placeholder}
                placeholder={"Enter Land area under development(Sq. Ft)"}
                value={projectForm.zx_landareaunderdevelopment}
                onChange={(value) =>
                  this.props.changeProjectForm({
                    edited_field: "zx_landareaunderdevelopment",
                    edited_value: value,
                  })
                }
                error={
                  validation.invalid &&
                  validation.invalid_field == "zx_landareaunderdevelopment"
                }
              />
            </View>

            <View style={Styles.dropDown}>
              <Text style={Styles.textStyle}>Name of plumbing consultant</Text>

              <View style={Styles.dropDownInner}>
                <SearchableDropdown
                  dataSource={this.getDistributor()}
                  placeHolderText={" Select plumbing consultant name"}
                  selectedValue={projectForm.zx_Nameofplumbingconsultant}
                  onChange={(value) =>
                    this.props.changeProjectForm({
                      edited_field: "zx_Nameofplumbingconsultant",
                      edited_value: value,
                    })
                  }
                  placeholder={"Select plumbing consultant name"}
                  invalid={false}
                  customPickerStyles={{ ...Styles.picker }}
                  labelStyles={{
                    color: Colors.black,
                    fontFamily: ApplicationStyles.textFont,
                    textAlign: "left",
                    //   width: "99%",
                    //  padding:5,
                    fontSize: 13,
                    flexDirection: "row",
                  }}
                  // invalid={
                  //   validation.invalid && validation.invalid_field == "area__c"
                  // }
                  //  label={"Area"}
                />
              </View>
            </View>

            <View style={Styles.dropDown}>
              <Text style={Styles.textStyle}>Name of architect</Text>

              <View style={Styles.dropDownInner}>
                <SearchableDropdown
                  dataSource={this.getDistributor1()}
                  placeHolderText={" Select architect name"}
                  selectedValue={projectForm.zx_nameofarchitect}
                  onChange={(value) =>
                    this.props.changeProjectForm({
                      edited_field: "zx_nameofarchitect",
                      edited_value: value,
                    })
                  }
                  placeholder={"Select architect name"}
                  invalid={false}
                  customPickerStyles={{ ...Styles.picker }}
                  labelStyles={{
                    color: Colors.black,
                    fontFamily: ApplicationStyles.textFont,
                    textAlign: "left",
                    //   width: "99%",
                    //  padding:5,
                    fontSize: 13,
                    flexDirection: "row",
                  }}
                  // invalid={
                  //   validation.invalid && validation.invalid_field == "area__c"
                  // }
                  //  label={"Area"}
                />
              </View>
            </View>

            <View style={Styles.dropDown}>
              <Text style={Styles.textStyle}>Name of plumbing contractor</Text>

              <View style={Styles.dropDownInner}>
                <SearchableDropdown
                  dataSource={this.getDistributor2()}
                  placeHolderText={" Select plumbing contractor name"}
                  selectedValue={projectForm.zx_nameofplumbingcontractor}
                  onChange={(value) =>
                    this.props.changeProjectForm({
                      edited_field: "zx_nameofplumbingcontractor",
                      edited_value: value,
                    })
                  }
                  placeholder={"Select plumbing contractor name "}
                  invalid={false}
                  customPickerStyles={{ ...Styles.picker }}
                  labelStyles={{
                    color: Colors.black,
                    fontFamily: ApplicationStyles.textFont,
                    textAlign: "left",
                    //   width: "99%",
                    //  padding:5,
                    fontSize: 13,
                    flexDirection: "row",
                  }}
                  // invalid={
                  //   validation.invalid && validation.invalid_field == "area__c"
                  // }
                  //  label={"Area"}
                />
              </View>
            </View>

            {/* <View style={Styles.textView}> */}

            <View
              style={{
                width: wp("35%"),
                height: hp("14%"),
                borderBottomWidth: 1,
                borderColor: Colors.lightGrey,
                marginTop: hp("1.5%"),
                marginLeft: wp("6%"),
              }}
            >
              <Text style={Styles.textStyle}>Tentative date of supply</Text>
              <SelectDate
                date={projectForm.zx_Tentativedateofsupply}
                minDate={new Date()}
                // maxDate={new Date}
                // maxDate={new Date()}
                onDateChange={(date) =>
                  this.props.changeProjectForm({
                    edited_field: "zx_Tentativedateofsupply",
                    edited_value: date,
                  })
                }
                // error={
                //   validation.invalid &&
                //   validation.invalid_field == "zx_Tentativedateofsupply"
                // }
              />
            </View>

            <View
              style={{
                width: wp("35%"),
                height: hp("14%"),
                borderBottomWidth: 1,
                borderColor: Colors.lightGrey,
                marginTop: hp("1.5%"),
                marginLeft: wp("13%"),
              }}
            >
              <Text style={Styles.textStyle}>Project completion date</Text>
              <SelectDate
                date={projectForm.zx_Projectcompletiondate}
                minDate={
                  projectForm.zx_Tentativedateofsupply
                    ? new Date(projectForm.zx_Tentativedateofsupply)
                    : new Date()
                }
                // maxDate={new Date()}
                onDateChange={(date) =>
                  this.props.changeProjectForm({
                    edited_field: "zx_Projectcompletiondate",
                    edited_value: date,
                  })
                }
                // error={
                //   validation.invalid &&
                //   validation.invalid_field == "zx_Projectcompletiondate"
                // }
              />
            </View>

            <View style={Styles.dropDown}>
              <Text style={Styles.textStyle}>Competitors</Text>

              <View style={Styles.dropDownInner}>
                <SearchableDropdown
                  dataSource={this.getName()}
                  placeHolderText={" Select Competitors"}
                  selectedValue={projectForm.zx_Competitor}
                  onChange={(value) =>
                    this.props.changeProjectForm({
                      edited_field: "zx_Competitor",
                      edited_value: value,
                    })
                  }
                  placeholder={"Select Competitors"}
                  invalid={false}
                  customPickerStyles={{ ...Styles.picker }}
                  labelStyles={{
                    color: Colors.black,
                    fontFamily: ApplicationStyles.textFont,
                    textAlign: "left",
                    //   width: "99%",
                    //  padding:5,
                    fontSize: 13,
                    flexDirection: "row",
                  }}
                  // invalid={
                  //   validation.invalid && validation.invalid_field == "area__c"
                  // }
                  //  label={"Area"}
                />
              </View>
            </View>

            <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>RERA number</Text>
              <InputText
                style={Styles.placeholder}
                placeholder={"Enter RERA number"}
                value={projectForm.zx_RERAnumber}
                onChange={(value) =>
                  this.props.changeProjectForm({
                    edited_field: "zx_RERAnumber",
                    edited_value: value,
                  })
                }
              />
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "column",
                width: "60%",
                left: hp("4%"),
                // height:hp("25%")
                marginTop: hp("2%"),
                // marginTop: hp("7%"),
                // marginBottom: hp("-15%"),
              }}
            >
              <Text
                style={{
                  left: wp("2%"),
                  fontSize: 11,
                  color: Colors.firozi,
                  marginTop: hp(1),
                }}
              >
                Image of proof
              </Text>
              <View style={{ ...Styles.bottomMargin }}>
                <MultipleImagePicker
                  title={"Take Pictue"}
                  images={projectForm.zx_RERAImageofproof || []}
                  loading={
                    uploadImageLoader &&
                    uploadImageField == "zx_RERAImageofproof"
                  }
                  onClearImage={(value) =>
                    this.props.changeProjectForm({
                      edited_field: "zx_RERAImageofproof",
                      edited_value: "",
                    })
                  }
                  onImageSuccess={({ images }) =>
                    this.props.uploadImage({
                      images,
                      params: { edited_field: "zx_RERAImageofproof" },
                      multiple: true,
                      previous_value: projectForm.zx_RERAImageofproof || [],
                    })
                  }
                >
                  <View style={Styles.recurringActionButton1}>
                    {/* <Text style={Styles.recurringActionButtonText1}> */}
                    <GenericIcon
                      name="camera"
                      //show={true}
                      style={Styles.recurringActionButtonIcon1}
                    />
                    {/* {'Take Pictue'}
		                </Text> */}
                  </View>
                </MultipleImagePicker>
              </View>
            </View>

            {/* <View style={{display:"flex",flexDirection:"column"}}>
        <Text style={{left:wp("21%"),fontSize:11,color:Colors.firozi,marginBottom:hp(1),marginTop:hp(1)}}>Image of proof</Text>
        <Uploadimage/>
        </View> */}

            {/* </View> */}

            <View>
              <View style={Styles.textView1}>
                <Text style={Styles.textStyle}>GST number*</Text>
                <InputText
                  style={Styles.placeholder}
                  placeholder={"Enter GST number"}
                  value={projectForm.zx_gstnumber}
                  onChange={(value) =>
                    this.props.changeProjectForm({
                      edited_field: "zx_gstnumber",
                      edited_value: value,
                    })
                  }
                  autoCapitalize="characters"
                  error={
                    validation.invalid &&
                    validation.invalid_field == "zx_gstnumber"
                  }
                />
              </View>
              <Text style={{ color: "red", left: "8%" }}>
                {this.validateGstNumber(projectForm.zx_gstnumber)}
              </Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "column",
                width: "60%",
                left: hp("4%"),
                // height:hp("25%")
                marginTop: hp("2%"),
                // marginBottom: hp("-15%"),
              }}
            >
              <Text
                style={{
                  left: wp("2%"),
                  fontSize: 11,
                  color: Colors.firozi,
                  marginTop: hp(1),
                }}
              >
                Image of proof*
              </Text>
              <View style={{ ...Styles.bottomMargin }}>
                <MultipleImagePicker
                  title={"Take Pictue"}
                  images={projectForm.zx_ImageofProof || []}
                  loading={
                    uploadImageLoader && uploadImageField == "zx_ImageofProof"
                  }
                  onClearImage={(value) =>
                    this.props.changeProjectForm({
                      edited_field: "zx_ImageofProof",
                      edited_value: "",
                    })
                  }
                  onImageSuccess={({ images }) =>
                    this.props.uploadImage({
                      images,
                      params: { edited_field: "zx_ImageofProof" },
                      multiple: true,
                      previous_value: projectForm.zx_RERAImageofproof || [],
                    })
                  }
                >
                  <View style={Styles.recurringActionButton1}>
                    {/* <Text style={Styles.recurringActionButtonText1}> */}
                    <GenericIcon
                      name="camera"
                      //show={true}
                      style={Styles.recurringActionButtonIcon1}
                    />
                    {/* {'Take Pictue'}
		                </Text> */}
                  </View>
                </MultipleImagePicker>
              </View>
            </View>

            <View
              style={{
                width: wp("100%"),
                marginTop: hp("5%"),
                marginLeft: "6.5%",
              }}
            >
              <SelectBox
                label="Refrence from*"
                labelStyle={{
                  color: Colors.black,
                  fontWeight: "bold",
                  fontSize: 13,
                }}
                width="90%"
                viewMargin="25px"
                containerStyle={{
                  elevation: 10,
                  // backgroundColor:"#F9F6EE",
                  borderRadius: 2,
                  justifyContent: "center",
                  padding: 10,
                  borderColor: "grey",
                }}
                options={[
                  {
                    item: "Direct/Walk",
                    id: "Direct/Walk",
                  },
                  {
                    item: "Consultant",
                    id: "Consultant",
                  },
                  {
                    item: "Biltrax",
                    id: "Biltrax",
                  },
                  {
                    item: "Exhibition",
                    id: "Exhibition",
                  },
                  {
                    item: "Contractor",
                    id: "Contractor",
                  },
                  {
                    item: "Builder",
                    id: "Builder",
                  },
                  {
                    item: "Newspaper",
                    id: "Newspaper",
                  },
                  {
                    item: "Indian Plumbing Association",
                    id: "Indian Plumbing Association",
                  },
                  {
                    item: "Websites",
                    id: "Websites",
                  },
                  {
                    item: "Others",
                    id: "Others",
                  },
                ]}
                selectedValues={this.state.selectedTeams}
                onMultiSelect={this.onMultiChange()}
                onTapClose={this.onMultiChange()}
                listOptionProps={{ nestedScrollEnabled: true }}
                isMulti
              />
            </View>
          </View>
          {this.other() ? (
            <View
              style={{
                width: wp("85%"),
                marginTop: hp("-7%"),
                marginLeft: wp("6%"),
              }}
            >
              <IndicatorInputText
                style={{ marginTop: "10%" }}
                placeholder={"Enter Reference Type!"}
                //  maxLength={0}
                value={projectForm.zx_otherreference}
                multiline={true}
                numberOfLines={1}
                onChange={(value) =>
                  changeProjectForm({
                    edited_field: "zx_otherreference",
                    edited_value: value,
                  })
                }
              />
              <Text style={{ color: "red", left: wp("1%") }}>
                {this.validateEmpty(projectForm.zx_otherreference)}
              </Text>
            </View>
          ) : (
            []
          )}

          {/* {record && !_.isEmpty(record) == true ? (
            <View style={{ marginLeft: "5%", width: "65%" }}>
              <TextInput
                style={{
                  height: hp("13%"),
                  marginTop: "3%",
                  borderRadius: 5,
                  paddingBottom: 60,
                  width: "100%",
                  borderColor: Colors.lightGrey,
                  borderWidth: 1,
                  backgroundColor: "white",
                }}
                placeholder={"Enter Type"}
                value={projectForm.zx_otherreference}
                onChangeText={(value) => changeProjectForm(value)}
                error={
                  validation.invalid &&
                  validation.invalid_field == "zx_otherreference"
                }
              />
              <Text style={{ color: "red", left: wp("1%") }}>
                {this.validateEmpty(projectForm.zx_otherreference)}
              </Text>
            </View>
          ) : (
            []
          )} */}

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
                  ? { marginTop: "1%" }
                  : { marginTop: "1%", backgroundColor: Colors.bluebackground }
              }
              title={"SAVE"}
              onPress={() =>
                this.props.createProjectForm({ form: forms, token })
              }
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
    projectForm: state.project.projectForm,
    loading: state.project.projectFormLoader,
    list: state.retailers.retailersList,
    retailerdata: state.retailers.retailersList.list,
    name: state.competitor.competitorName,
    bathroomMaster: state.project.bathroomMaster,
    loader: state.project.getBathroomMasterLoader,
    uploadImageField: state.common.uploadImageField,
    uploadImageLoader: state.common.uploadImageLoader,
    validation: state.project.projectFormValidation,
    code: state.user.user_details,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeProjectForm: (params) =>
    dispatch(ProjectActions.changeProjectForm(params)),
  createProjectForm: (params) =>
    dispatch(ProjectActions.createProjectForm(params)),
  fetchRetailers: (params) => dispatch(RetailersActions.fetchRetailers(params)),
  getCompetitorName: (params) =>
    dispatch(CompetitorActions.getCompetitorName(params)),
  getBathroomMaster: (params) =>
    dispatch(ProjectActions.getBathroomMaster(params)),
  uploadImage: (params) => dispatch(CommonActions.uploadImage(params)),
  projectFormValidationFailed: (params) =>
    dispatch(ProjectActions.projectFormValidationFailed(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(NewProject);
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
    left: wp("5%"),
    top: hp("3.5%"),
  },
  picker: {
    // borderRadius: 100,
    width: wp("85%"),
    // height: hp('5.7%'),
    marginBottom: hp("2%"),
    paddingHorizontal: 8,
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
