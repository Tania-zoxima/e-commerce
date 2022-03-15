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
import Indicator from "./StepIndicator";
import Modal from "react-native-modal";
import { connect } from "react-redux";
import ProjectActions from "App/Stores/Project/Actions";
import InputNumber from "App/Components/FormInput/InputNumber";
import SelectDate from "../../Components/SelectDate/SelectDate";
import RetailersActions from "App/Stores/Retailers/Actions";
import CompetitorActions from "App/Stores/Competitor/Actions";
import MultipleImagePicker from "App/Components/ImagePicker/MultipleImagePicker";
import CommonActions from "App/Stores/Common/Actions";
import { HelperService } from "../../Services/Utils/HelperService";
import GenericIcon from "App/Components/GenericIcon";
import _ from "lodash";
import ImageSlider from "App/Components/Imageslide";
import GenericDisplayCardStrip from "App/Components/GenericDisplayCard/GenericDisplayCardStrip";
import VisitsActions from "App/Stores/Visits/Actions";
import WhiteButton from "App/Components/WhiteButton";
import NavigationService from "App/Services/NavigationService";
class UpdateProject extends Component {
  constructor() {
    super();
    this.state = {
      currentPosition: 0,
      isModalVisible: false,
      timer: null,
    };
  }
  componentDidMount() {
    const { token, agentid, list, name } = this.props;
    if (list && _.isEmpty(list)) {
      this.state.timer = setTimeout(
        () =>
          this.props.fetchRetailers({
            token,
            agentid,
          }),
        2000
      );
    }
    if (name && !name.length) {
      this.state.timer = setTimeout(
        () =>
          this.props.getCompetitorName({
            token,
          }),
        3000
      );
    }
    this.getPipeline();
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

  getImage() {
    const { projectForm } = this.props;
    let globArr = [];
    let arr = projectForm.zx_reraimageofproof;
    if (arr) {
      let answ = arr.split(",");
      answ.forEach(function(obj) {
        globArr.push(obj);
      });
    }
    // console.log(globArr);
    return globArr;
  }

  getImage1() {
    const { projectForm } = this.props;
    let globArr = [];
    let arr = projectForm.zx_imageofproof;
    if (arr) {
      let answ = arr.split(",");
      answ.forEach(function(obj) {
        globArr.push(obj);
      });
    }
    // console.log(globArr);
    return globArr;
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

  getPreferDistributor() {
    const { retailerdata, list } = this.props;
    // console.log("listttt", list);
    let distributor = [];
    if (retailerdata && retailerdata.length) {
      retailerdata.map((obj) => {
        if (
          obj.zx_accounttype == "Distributor" ||
          obj.zx_accounttype == "Primary Distributor"
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
  getPipeline() {
    const { projectForm } = this.props;
    const labels = [
      "Design stage",
      "Tendering stage",
      "Order issued to contractor",
      "Mock up stage",
      "Price offer stage",
      "Order issued stage",
      "Supply stage",
    ];
    let position = 0;
    if (projectForm && projectForm.zx_pipelinestage) {
      position = labels.indexOf(projectForm.zx_pipelinestage);
    }
    this.setState({ currentPosition: position });
  }

  getPipelineId() {
    const { projectForm } = this.props;
    const labels = [
      "Design stage",
      "Tendering stage",
      "Order issued to contractor",
      "Mock up stage",
      "Price offer stage",
      "Order issued stage",
      "Supply stage",
    ];
    let index = labels[this.state.currentPosition];
    // console.log("index",index)
    return index;
  }

  increment() {
    this.setState({
      currentPosition: this.state.currentPosition + 1,
    });
  }

  decrement() {
    this.setState({
      currentPosition: this.state.currentPosition - 1,
    });
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  other() {
    const { projectForm } = this.props;
    let value = "";
    let arr = projectForm.zx_referencefrom;
    if (projectForm && !_.isEmpty(projectForm)) {
      value = arr.some((c) => c == "Others");
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
      code,
      openModal,
      imageForm,
    } = this.props;

    let form1 = {
      Id: projectForm.Id,
      zx_numberofongoingprojects: projectForm.zx_numberofongoingprojects,
      zx_numberofupcomingprojects: projectForm.zx_numberofupcomingprojects,
      zx_nameofproject: projectForm.zx_nameofproject,
      zx_location: projectForm.zx_location,
      zx_numberofbathrooms: projectForm.zx_numberofbathrooms,
      zx_numberoffloors: projectForm.zx_numberoffloors,
      zx_numberoftowers: projectForm.zx_numberoftowers,
      zx_landareaunderdevelopment: projectForm.zx_landareaunderdevelopment,
      zx_Nameofplumbingconsultant: projectForm.zx_nameofplumbingconsultant
        ? projectForm.zx_nameofplumbingconsultant
        : null,
      zx_nameofarchitect: projectForm.zx_nameofarchitect
        ? projectForm.zx_nameofarchitect
        : null,
      zx_nameofplumbingcontractor: projectForm.zx_nameofplumbingcontractor
        ? projectForm.zx_nameofplumbingcontractor
        : null,
      zx_projectcost: projectForm.zx_projectcost,
      zx_RERAnumber: projectForm.zx_reranumber,
      zx_RERAImageofproof:
        imageForm && !_.isEmpty(imageForm)
          ? imageForm.zx_RERAImageofproof
          : projectForm.zx_reraimageofproof
          ? projectForm.zx_reraimageofproof
          : null,
      zx_gstnumber: projectForm.zx_gstnumber,
      zx_ImageofProof:
        imageForm && !_.isEmpty(imageForm)
          ? imageForm.zx_ImageofProof
          : projectForm.zx_imageofproof
          ? projectForm.zx_imageofproof
          : null,
      zx_type: projectForm.zx_type,
      zx_otherprojecttype: projectForm.zx_otherprojecttype,
      zx_referencefrom: projectForm.zx_referencefrom,
      zx_otherreference: projectForm.zx_otherreference,
      zx_pipelinestage: this.getPipelineId()
        ? this.getPipelineId()
        : projectForm.zx_pipelinestage,
      zx_Projectcompletiondate: HelperService.convertMomentDateToTimestamp(
        projectForm.zx_projectcompletiondate
      ),
      zx_Tentativedateofsupply: HelperService.convertMomentDateToTimestamp(
        projectForm.zx_tentativedateofsupply
      ),
      zx_Competitor: projectForm.zx_competitor,
      zx_projectstatus: projectForm.zx_projectstatus,
      zx_reasonfororderloss: projectForm.zx_reasonfororderloss
        ? projectForm.zx_reasonfororderloss
        : null,
      zx_competitorwhogottheorder: projectForm.zx_competitorwhogottheorder
        ? projectForm.zx_competitorwhogottheorder
        : null,
      zx_preferreddistributor: projectForm.zx_preferreddistributor
        ? projectForm.zx_preferreddistributor
        : null,
      zx_projectdeveloper: projectForm.zx_projectdeveloper
        ? projectForm.zx_projectdeveloper
        : null,
      zx_projectmanager: projectForm.zx_projectmanager
        ? projectForm.zx_projectmanager
        : null,
      zx_purchasemanager: projectForm.zx_purchasemanager
        ? projectForm.zx_purchasemanager
        : null,
      zx_siteengineer: projectForm.zx_siteengineer
        ? projectForm.zx_siteengineer
        : null,
      zx_opportunitytimeline: projectForm.zx_opportunitytimeline
        ? projectForm.zx_opportunitytimeline
        : null,
    };
    // console.log("curentposition", this.state.currentPosition);
    let show = this.props.navigation.state.params;
    // console.log("iddddddd", show);
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
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <Text style={Styles.title}>{"Update Project "}</Text>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                top: hp("-2%"),
                width: wp("28%"),
                borderRadius: 10,
              }}
              onPress={this.toggleModal}
            >
              <Text
                style={
                  code.zx_brandgroupcode == "1"
                    ? {
                        color: Colors.darkRedPink,
                        fontSize: 15,
                        fontWeight: "bold",
                        alignSelf: "center",
                        top: hp("0.8%"),
                      }
                    : {
                        color: Colors.bluebackground,
                        fontSize: 15,
                        fontWeight: "bold",
                        alignSelf: "center",
                        top: hp("0.8%"),
                      }
                }
              >
                Change Status
              </Text>
            </TouchableOpacity>
          </View>
        </Card>
        <ScrollView>
          <WhiteButton
            style={{
              backgroundColor:
                code.zx_brandgroupcode == "1"
                  ? Colors.darkRedPink
                  : Colors.bluebackground,
              height: hp("5%"),
              borderRadius: 5,
              width: wp("40%"),
              left: wp("55%"),
            }}
            // onPress={ () => this.props.sendApproval({form: item,token,id:item.Id})}
            onPress={() => NavigationService.navigate("UpdateTab")}
            title={"Opportunity & Products"}
            textStyle={{ color: Colors.white, fontSize: 12 }}
          ></WhiteButton>
          <Indicator
            currentPosition={this.state.currentPosition}
            handleIncrement={() => this.increment()}
            handleDecrement={() => this.decrement()}
            code={code.zx_brandgroupcode}
            show={show.show}
          />

          <View style={Styles.dropDown}>
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
                labelStyles={{
                  color: Colors.black,
                  fontFamily: ApplicationStyles.textFont,
                  textAlign: "left",
                  //   width: "99%",
                  //  padding:5,
                  fontSize: 13,
                  flexDirection: "row",
                }}
                customPickerStyles={{ ...Styles.picker }}
                key={projectForm.zx_type + _.uniqueId()}
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
              <TextInput
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
              />
            </View>
          ) : (
            []
          )}
          {/* <View style={Styles.dropDown}>
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
                placeHolderText={" Select Type"}
                selectedValue={projectForm.zx_pipelinestage}
                onChange={(value) =>
                  this.props.changeProjectForm({
                    edited_field: "zx_pipelinestage",
                    edited_value: value,
                  })
                }
                placeholder={"Select Type"}
                invalid={false}
                customPickerStyles={{ ...Styles.picker }}
              />
            </View>
          </View> */}
          <View style={Styles.outerView}>
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
              />
            </View>
            <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>Location *</Text>
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
                  }),
                    this.props.changeProjectForm({
                      edited_field: "zx_projectcost",
                      edited_value: this.getCost(),
                    });
                }}
              />
            </View>
            <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>Cost of Project*</Text>
              <InputText
                style={Styles.placeholder}
                placeholder={"Enter Project Cost"}
                value={projectForm.zx_projectcost}
                // onChange={(value) =>
                //   this.props.changeProjectForm({
                //     edited_field: "zx_RERAnumber",
                //     edited_value: value,
                //   })
                // }
              />
            </View>
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
              />
            </View>
            <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>
                Land area under development(Sq. Ft)*
              </Text>
              <InputText
                style={Styles.placeholder}
                placeholder={"Enter Land area under development(Sq. Ft)"}
                value={projectForm.zx_landareaunderdevelopment}
                onChange={(value) =>
                  this.props.changeProjectForm({
                    edited_field: "zx_landareaunderdevelopment",
                    edited_value: value,
                  })
                }
              />
            </View>
            <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>Project Developer</Text>
              <InputText
                style={Styles.placeholder}
                placeholder={"Enter Project Developer"}
                value={projectForm.zx_projectdeveloper}
                onChange={(value) =>
                  this.props.changeProjectForm({
                    edited_field: "zx_projectdeveloper",
                    edited_value: value,
                  })
                }
              />
            </View>
            <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>Project Manager</Text>
              <InputText
                style={Styles.placeholder}
                placeholder={"Enter Project Manager"}
                value={projectForm.zx_projectmanager}
                onChange={(value) =>
                  this.props.changeProjectForm({
                    edited_field: "zx_projectmanager",
                    edited_value: value,
                  })
                }
              />
            </View>
            <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>Purchase Manager</Text>
              <InputText
                style={Styles.placeholder}
                placeholder={"Enter Purchase Manager"}
                value={projectForm.zx_purchasemanager}
                onChange={(value) =>
                  this.props.changeProjectForm({
                    edited_field: "zx_purchasemanager",
                    edited_value: value,
                  })
                }
              />
            </View>

            <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>Site Engineer</Text>
              <InputText
                style={Styles.placeholder}
                placeholder={"Enter Site Engineer"}
                value={projectForm.zx_siteengineer}
                onChange={(value) =>
                  this.props.changeProjectForm({
                    edited_field: "zx_siteengineer",
                    edited_value: value,
                  })
                }
              />
            </View>

            <View style={Styles.dropDown}>
              <Text style={Styles.textStyle}>Opportunity Timeline</Text>

              <View style={Styles.dropDownInner}>
                <SearchableDropdown
                  dataSource={[
                    { id: "More than 12 months", name: "More than 12 months" },
                    { id: "3-6 months", name: "3-6 months" },
                    { id: "0-3 months", name: "0-3 months" },
                  ]}
                  placeHolderText={" Select Opportunity Timeline"}
                  selectedValue={projectForm.zx_opportunitytimeline}
                  onChange={(value) =>
                    this.props.changeProjectForm({
                      edited_field: "zx_opportunitytimeline",
                      edited_value: value,
                    })
                  }
                  placeholder={"Select Opportunity Timeline"}
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
                  key={projectForm.zx_opportunitytimeline + _.uniqueId()}
                  // labelStyles={{ ...Styles.pickerLabel }}
                  // invalid={
                  //   validation.invalid && validation.invalid_field == "area__c"
                  // }
                  //  label={"Area"}
                />
              </View>
            </View>

            <View style={Styles.dropDown}>
              <Text style={Styles.textStyle}>Name of plumbing consultant*</Text>

              <View style={Styles.dropDownInner}>
                <SearchableDropdown
                  dataSource={this.getDistributor()}
                  placeHolderText={" Select plumbing consultant name"}
                  selectedValue={projectForm.zx_nameofplumbingconsultant}
                  onChange={(value) =>
                    this.props.changeProjectForm({
                      edited_field: "zx_nameofplumbingconsultant",
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
                  key={projectForm.zx_nameofplumbingconsultant + _.uniqueId()}
                  // labelStyles={{ ...Styles.pickerLabel }}
                  // invalid={
                  //   validation.invalid && validation.invalid_field == "area__c"
                  // }
                  //  label={"Area"}
                />
              </View>
            </View>
            <View style={Styles.dropDown}>
              <Text style={Styles.textStyle}>Name of architect*</Text>

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
                  key={projectForm.zx_nameofarchitect + _.uniqueId()}
                  // labelStyles={{ ...Styles.pickerLabel }}
                  // invalid={
                  //   validation.invalid && validation.invalid_field == "area__c"
                  // }
                  //  label={"Area"}
                />
              </View>
            </View>

            <View style={Styles.dropDown}>
              <Text style={Styles.textStyle}>Name of plumbing contractor*</Text>

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
                  key={projectForm.zx_nameofplumbingcontractor + _.uniqueId()}
                  // labelStyles={{ ...Styles.pickerLabel }}
                  // invalid={
                  //   validation.invalid && validation.invalid_field == "area__c"
                  // }
                  //  label={"Area"}
                />
              </View>
            </View>
            {projectForm.zx_pipelinestage == "Tendering stage" ||
            projectForm.zx_pipelinestage == "Design stage" ? null : (
              <View style={Styles.dropDown}>
                <Text style={Styles.textStyle}>Preffered Distributor</Text>

                <View style={Styles.dropDownInner}>
                  <SearchableDropdown
                    dataSource={this.getPreferDistributor()}
                    placeHolderText={" Select Preffered Distributor"}
                    selectedValue={projectForm.zx_preferreddistributor}
                    onChange={(value) =>
                      this.props.changeProjectForm({
                        edited_field: "zx_preferreddistributor",
                        edited_value: value,
                      })
                    }
                    placeholder={"Select Preffered Distributor "}
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
                    key={projectForm.zx_preferreddistributor + _.uniqueId()}
                    // labelStyles={{ ...Styles.pickerLabel }}
                    // invalid={
                    //   validation.invalid && validation.invalid_field == "area__c"
                    // }
                    //  label={"Area"}
                  />
                </View>
              </View>
            )}
            <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>Tentative date of supply</Text>
              <SelectDate
                date={projectForm.zx_tentativedateofsupply}
                maxDate={new Date()}
                onDateChange={(date) =>
                  this.props.changeProjectForm({
                    edited_field: "zx_tentativedateofsupply",
                    edited_value: date,
                  })
                }
              />
            </View>
            <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>Project completion date</Text>
              <SelectDate
                date={projectForm.zx_projectcompletiondate}
                maxDate={new Date()}
                onDateChange={(date) =>
                  this.props.changeProjectForm({
                    edited_field: "zx_projectcompletiondate",
                    edited_value: date,
                  })
                }
              />
            </View>
            <View style={Styles.dropDown}>
              <Text style={Styles.textStyle}>Competitors*</Text>

              <View style={Styles.dropDownInner}>
                <SearchableDropdown
                  dataSource={this.getName()}
                  placeHolderText={" Select Competitors"}
                  selectedValue={projectForm.zx_competitor}
                  onChange={(value) =>
                    this.props.changeProjectForm({
                      edited_field: "zx_competitor",
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
                  key={projectForm.zx_competitor + _.uniqueId()}
                />
              </View>
            </View>
            <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>RERA number</Text>
              <InputText
                style={Styles.placeholder}
                placeholder={"Enter RERA number"}
                value={projectForm.zx_reranumber}
                onChange={(value) =>
                  this.props.changeProjectForm({
                    edited_field: "zx_reranumber",
                    edited_value: value,
                  })
                }
              />
            </View>
            <View
              style={{
                width: "90%",
                alignSelf: "center",
                marginTop: hp("7%"),
              }}
            >
              <GenericDisplayCardStrip
                key={"RERA image Proof:"}
                label={"RERA image Proof:"}
                labelStyle={{
                  color: Colors.black,
                  fontSize: 13,
                  fontWeight: "bold",
                  fontFamily: ApplicationStyles.textFont,
                  left: wp("7%"),
                }}
                value={
                  <Text
                    style={
                      projectForm.zx_reraimageofproof
                        ? {
                            textDecorationLine: "underline",
                            color: Colors.black,
                          }
                        : {}
                    }
                    onPress={() => {
                      return openModal({
                        content: (
                          <View style={{ flex: 1, alignSelf: "center" }}>
                            <ImageSlider images={this.getImage()} />
                          </View>
                        ),
                        heading: "Preview",
                        bodyFlexHeight: 0.7,
                      });
                    }}
                  >
                    {projectForm.zx_reraimageofproof ? "View" : "No file"}
                  </Text>
                }
              />
            </View>
            <View style={{ width: wp("80%"), left: wp("7%") }}>
              <Text
                style={{
                  fontSize: 12,
                  color: Colors.black,
                  fontWeight: "bold",
                }}
              >
                Update RERA Image Proof
              </Text>
              <MultipleImagePicker
                title={"Take Pictue"}
                images={this.props.imageForm.zx_RERAImageofproof || []}
                loading={
                  uploadImageLoader && uploadImageField == "zx_RERAImageofproof"
                }
                onClearImage={(value) =>
                  this.props.changeImageForm({
                    edited_field: "zx_RERAImageofproof",
                    edited_value: null,
                  })
                }
                onImageSuccess={({ images }) =>
                  this.props.uploadImage({
                    images,
                    params: { edited_field: "zx_RERAImageofproof" },
                    multiple: true,
                    previous_value:
                      this.props.imageForm.zx_RERAImageofproof || [],
                  })
                }
              ></MultipleImagePicker>
            </View>

            <View>
              <View style={Styles.textView1}>
                <Text style={Styles.textStyle}>GST number*</Text>
                <InputText
                  style={Styles.placeholder}
                  placeholder={"Enter GST number"}
                  autoCapitalize="characters"
                  value={projectForm.zx_gstnumber}
                  onChange={(value) =>
                    this.props.changeProjectForm({
                      edited_field: "zx_gstnumber",
                      edited_value: value,
                    })
                  }
                  // error={
                  //   validation.invalid &&
                  //   validation.invalid_field == "zx_gstnumber"
                  // }
                />
              </View>
              <Text style={{ color: "red", left: "8%" }}>
                {this.validateGstNumber(projectForm.zx_gstnumber)}
              </Text>
            </View>

            <View
              style={{
                width: "90%",
                alignSelf: "center",
                marginTop: hp("7%"),
              }}
            >
              <GenericDisplayCardStrip
                key={"GST image Proof:"}
                label={"GST image Proof:"}
                labelStyle={{
                  color: Colors.black,
                  fontSize: 13,
                  fontWeight: "bold",
                  fontFamily: ApplicationStyles.textFont,
                  left: wp("7%"),
                }}
                value={
                  <Text
                    style={
                      projectForm.zx_imageofproof
                        ? {
                            textDecorationLine: "underline",
                            color: Colors.black,
                          }
                        : {}
                    }
                    onPress={() => {
                      return openModal({
                        content: (
                          <View style={{ flex: 1, alignSelf: "center" }}>
                            <ImageSlider images={this.getImage1()} />
                          </View>
                        ),
                        heading: "Preview",
                        bodyFlexHeight: 0.7,
                      });
                    }}
                  >
                    {projectForm.zx_imageofproof ? "View" : "No file"}
                  </Text>
                }
              />
            </View>
            <View style={{ width: wp("80%"), left: wp("7%") }}>
              <Text
                style={{
                  fontSize: 12,
                  color: Colors.black,
                  fontWeight: "bold",
                }}
              >
                Update GST Image Proof*
              </Text>
              <MultipleImagePicker
                title={"Take Pictue"}
                images={this.props.imageForm.zx_ImageofProof || []}
                loading={
                  uploadImageLoader && uploadImageField == "zx_ImageofProof"
                }
                onClearImage={(value) =>
                  this.props.changeImageForm({
                    edited_field: "zx_ImageofProof",
                    edited_value: null,
                  })
                }
                onImageSuccess={({ images }) =>
                  this.props.uploadImage({
                    images,
                    params: { edited_field: "zx_ImageofProof" },
                    multiple: true,
                    previous_value: this.props.imageForm.zx_ImageofProof || [],
                  })
                }
              ></MultipleImagePicker>
            </View>

            <View style={Styles.dropDown}>
              <Text style={{ ...Styles.textStyle, fontSize: 14 }}>
                Refrence from
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  // justifyContent: "space-between",
                  width: wp("80%"),
                  left: wp("15%"),
                  top: hp("2.5%"),
                }}
              >
                {projectForm && !_.isEmpty(projectForm)
                  ? projectForm.zx_referencefrom.map((item) => {
                      return (
                        <View style={{ top: hp("2.5%"), right: wp("15%") }}>
                          <Text
                            style={{
                              color: Colors.grey,
                              fontWeight: "bold",
                              fontSize: 13,
                            }}
                          >
                            {item + "  "}
                          </Text>
                        </View>
                      );
                    })
                  : []}
              </View>
              {this.other() ? (
                <View
                  style={{
                    width: wp("85%"),
                    marginTop: hp("3%"),
                  }}
                >
                  <TextInput
                    style={{
                      height: 40,
                      borderWidth: 1,
                      borderColor: "black",
                      marginTop: hp("1%"),
                    }}
                    placeholder="Enter Reference Type!"
                    value={projectForm.zx_otherreference}
                    onChangeText={(value) =>
                      changeProjectForm({
                        edited_field: "zx_otherreference",
                        edited_value: value,
                      })
                    }
                  />
                </View>
              ) : (
                []
              )}
            </View>
            <View
              style={{
                backgroundColor: "black",
                marginTop: hp("5%"),
                marginLeft: wp("35%"),
              }}
            >
              <BlueButton
                style={
                  code.zx_brandgroupcode == "1"
                    ? Styles.button
                    : Styles.buttonBlue
                }
                title={"SAVE"}
                onPress={() => {
                  projectForm.zx_pipelinestage == "Design stage"
                    ? projectForm.zx_nameofarchitect ||
                      projectForm.zx_Nameofplumbingconsultant
                      ? this.props.updateProject({ form: form1, token })
                      : HelperService.showToast({
                          message:
                            "Mandatory to Select either Name of architect or Name of Plumbing Consultant",
                        })
                    : this.props.updateProject({ form: form1, token });
                }}
              />
            </View>
          </View>
        </ScrollView>
        <Modal isVisible={this.state.isModalVisible}>
          <View
            style={
              projectForm.zx_projectstatus == "Lost"
                ? { backgroundColor: "white", height: hp("70%") }
                : { backgroundColor: "white", height: hp("40%") }
            }
          >
            <Card
              style={
                code.zx_brandgroupcode == "1"
                  ? {
                      backgroundColor: Colors.darkRedPink,
                      width: wp("90%"),
                      // top: hp("-1%"),
                      height: hp("9%"),
                      borderBottomLeftRadius: 55,
                      borderBottomRightRadius: 55,
                    }
                  : {
                      backgroundColor: Colors.bluebackground,
                      width: wp("90%"),
                      // top: hp("-1%"),
                      height: hp("9%"),
                      borderBottomLeftRadius: 55,
                      borderBottomRightRadius: 55,
                    }
              }
            >
              <TouchableOpacity onPress={this.toggleModal}>
                <Text
                  style={{
                    fontSize: 20,
                    marginLeft: hp("42%"),
                    fontWeight: "bold",
                  }}
                >
                  X
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: "Rubik",
                  fontSize: 26,
                  fontWeight: "bold",
                  textAlign: "center",
                  bottom: hp("2%"),
                  color: Colors.white,
                }}
              >
                {" "}
                Change Status
              </Text>
            </Card>
            <View
              style={{
                width: "85%",
                // borderWidth: 1.2,
                // borderColor: Colors.grey,
                // borderRadius: 30,
                marginVertical: 30,
                left: wp("7%"),
                height: hp("50%"),
              }}
            >
              <SearchableDropdown
                dataSource={[
                  { id: "Won", name: "Won" },
                  { id: "Hold", name: "Hold" },
                  { id: "Lost", name: "Lost" },
                  { id: "Open", name: "Open" },
                ]}
                placeHolderText={"Status"}
                selectedValue={projectForm.zx_projectstatus}
                onChange={(value) =>
                  this.props.changeProjectForm({
                    edited_field: "zx_projectstatus",
                    edited_value: value,
                  })
                }
                placeholder={"Type or Select Status"}
                invalid={false}
                labelStyles={{
                  color: Colors.black,
                  fontFamily: ApplicationStyles.textFont,
                  textAlign: "center",
                  //   width: "99%",
                  //  padding:5,
                  fontSize: 13,
                  flexDirection: "row",
                }}
                label={"Status"}
                headerStyle={{
                  fontFamily: ApplicationStyles.textMsgFont,
                  color: Colors.black,
                  fontSize: wp("4.4%"),
                  // marginBottom: wp('3%'),
                  // top: hp("5%"),
                  width: "106%",
                  textAlign: "left",
                  marginLeft: wp("5%"),
                }}
                customPickerStyles={
                  projectForm.zx_projectstatus == "Lost"
                    ? {
                        // borderRadius: 5,
                        width: "80%",
                        height: hp("4.5%"),
                        elevation: 5,
                        marginBottom: hp("7%"),
                        // paddingHorizontal: 0,
                        marginLeft: wp("20%"),
                        backgroundColor: Colors.white,
                        borderWidth: 1,
                      }
                    : {
                        // borderRadius: 5,
                        width: "60%",
                        height: hp("4.5%"),
                        elevation: 5,
                        marginBottom: hp("40%"),
                        // paddingHorizontal: 0,
                        marginLeft: wp("80%"),
                        backgroundColor: Colors.white,
                        borderWidth: 1,
                      }
                }
                // key={form.id}
              />
              {projectForm.zx_projectstatus == "Lost" ? (
                <SearchableDropdown
                  dataSource={[
                    { id: "Price", name: "Price" },
                    { id: "Range", name: "Range" },
                    { id: "Credit", name: "Credit" },
                    { id: "Approval", name: "Approval" },
                    { id: "Availability", name: "Availability" },
                    {
                      id: "Delay in Response from Costing",
                      name: "Delay in Response from Costing",
                    },
                  ]}
                  placeHolderText={"Select Reason"}
                  selectedValue={projectForm.zx_reasonfororderloss}
                  onChange={(value) =>
                    this.props.changeProjectForm({
                      edited_field: "zx_reasonfororderloss",
                      edited_value: value,
                    })
                  }
                  placeholder={"Type or Select Reason"}
                  invalid={false}
                  labelStyles={{
                    color: Colors.black,
                    fontFamily: ApplicationStyles.textFont,
                    textAlign: "center",
                    //   width: "99%",
                    //  padding:5,
                    fontSize: 13,
                    flexDirection: "row",
                  }}
                  label={"Reason for Order Loss"}
                  headerStyle={{
                    fontFamily: ApplicationStyles.textMsgFont,
                    color: Colors.black,
                    fontSize: wp("4.4%"),
                    // top: hp("5%"),
                    width: "106%",
                    textAlign: "left",
                    marginLeft: wp("5%"),
                  }}
                  customPickerStyles={{
                    // borderRadius: 5,
                    width: "80%",
                    height: hp("4.5%"),
                    elevation: 5,
                    marginBottom: hp("7%"),
                    // paddingHorizontal: 0,
                    marginLeft: wp("20%"),
                    backgroundColor: Colors.white,
                    borderWidth: 1,
                  }}
                  // key={form.id}
                />
              ) : (
                []
              )}
              {projectForm.zx_projectstatus == "Lost" ? (
                <SearchableDropdown
                  dataSource={this.getName()}
                  placeHolderText={"Select Competitor"}
                  selectedValue={projectForm.zx_competitorwhogottheorder}
                  onChange={(value) =>
                    this.props.changeProjectForm({
                      edited_field: "zx_competitorwhogottheorder",
                      edited_value: value,
                    })
                  }
                  placeholder={"Type or Select Competitor"}
                  invalid={false}
                  labelStyles={{
                    color: Colors.black,
                    fontFamily: ApplicationStyles.textFont,
                    textAlign: "center",
                    //   width: "99%",
                    //  padding:5,
                    fontSize: 13,
                    flexDirection: "row",
                  }}
                  label={"Competitor who got the Order"}
                  headerStyle={{
                    fontFamily: ApplicationStyles.textMsgFont,
                    color: Colors.black,
                    fontSize: wp("4.4%"),
                    // top: hp("5%"),
                    width: "106%",
                    textAlign: "left",
                    marginLeft: wp("5%"),
                  }}
                  customPickerStyles={{
                    // borderRadius: 5,
                    width: "80%",
                    height: hp("4.5%"),
                    elevation: 5,
                    marginBottom: hp("7%"),
                    // paddingHorizontal: 0,
                    marginLeft: wp("20%"),
                    backgroundColor: Colors.white,
                    borderWidth: 1,
                  }}
                  // key={form.id}
                />
              ) : (
                []
              )}
            </View>
            <TouchableOpacity
              style={
                projectForm.zx_projectstatus == "Lost"
                  ? {
                      width: "40%",
                      // marginTop: hp("2%"),
                      top: hp("-5%"),
                      height: hp("4.8"),
                      backgroundColor: Colors.darkRedPink,
                      left: wp("25%"),
                      borderRadius: 10,
                    }
                  : {
                      width: "40%",
                      // marginTop: hp("2%"),
                      top: hp("-35%"),
                      height: hp("4.8"),
                      backgroundColor: Colors.darkRedPink,
                      left: wp("25%"),
                      borderRadius: 10,
                    }
              }
              // onPress={this.toggleModal}
              onPress={this.toggleModal}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: Colors.white,
                  textAlignVertical: "center",
                  fontSize: 25,
                }}
              >
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
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
    code: state.user.user_details,
    imageForm: state.visits.imageForm,
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
  updateProject: (params) => dispatch(ProjectActions.updateProject(params)),
  openModal: (params) => dispatch(CommonActions.openModal(params)),
  closeModal: (params) => dispatch(CommonActions.closeModal(params)),
  changeImageForm: (params) => dispatch(VisitsActions.changeImageForm(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(UpdateProject);

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
    borderRadius: 3,
  },
  buttonBlue: {
    width: wp("29%"),
    height: hp("5%"),
    borderRadius: 3,
    backgroundColor: Colors.bluebackground,
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
