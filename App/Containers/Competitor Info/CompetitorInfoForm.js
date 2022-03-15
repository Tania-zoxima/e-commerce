import React, { Component } from "react";
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
import Styles from "./CompetitorInfoStyles";
import InputText from "App/Components/FormInput/InputText";
import BlueButton from "../../Components/BlueButton";
import SearchableDropdown from "App/Components/SearchableDropdown";
import Uploadimage from "../Leads/Uploadimage";
import CompetitorActions from "App/Stores/Competitor/Actions";
import { connect } from "react-redux";
import SelectDate from "../../Components/SelectDate/SelectDate";
import { HelperService } from "App/Services/Utils/HelperService";
import DistributorActions from "App/Stores/Distributor/Actions";
import SelectBox from "react-native-multi-selectbox";
import { xorBy } from "lodash";
import MultipleImagePicker from "App/Components/ImagePicker/MultipleImagePicker";
import CommonActions from "App/Stores/Common/Actions";

class CompetitorInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      selectedTeams: [],
    };
  }
  componentDidMount() {
    const { token, agentid } = this.props;
    this.state.timer = setTimeout(
      () =>
        this.props.getAllZone({
          token,
          id: agentid,
          level: 1,
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
    this.state.timer = setTimeout(
      () =>
        this.props.getClass({
          token,
        }),
      4000
    );
  }
  getArea() {
    const { area } = this.props;
    let Area = [];
    if (area && area.length) {
      area.map((obj) => {
        if (obj.zx_level == 7) {
          Area.push({
            id: obj.zx_salesterritoryid,
            name: obj.zx_territoryname,
          });
        }
      });
    }
    return Area;
  }
  getZone() {
    const { zone } = this.props;
    let Zone = [];
    if (zone && zone.length) {
      zone.map((obj) => {
        if (obj.zx_level == 1) {
          Zone.push({
            id: obj.zx_salesterritoryid,
            name: obj.zx_territoryname,
          });
        }
      });
    }
    return Zone;
  }
  getState() {
    const { state } = this.props;
    let State = [];
    if (state && state.length) {
      state.map((obj) => {
        if (obj.zx_level == 2) {
          State.push({
            id: obj.zx_salesterritoryid,
            name: obj.zx_territoryname,
          });
        }
      });
    }
    return State;
  }
  getSubState() {
    const { subState } = this.props;
    let SubState = [];
    if (subState && subState.length) {
      subState.map((obj) => {
        if (obj.zx_level == 3) {
          SubState.push({
            id: obj.zx_salesterritoryid,
            name: obj.zx_territoryname,
          });
        }
      });
    }
    return SubState;
  }
  getDistrict() {
    const { district } = this.props;
    let District = [];
    if (district && district.length) {
      district.map((obj) => {
        if (obj.zx_level == 4) {
          District.push({
            id: obj.zx_salesterritoryid,
            name: obj.zx_territoryname,
          });
        }
      });
    }
    return District;
  }
  getCity() {
    const { city } = this.props;
    let City = [];
    if (city && city.length) {
      city.map((obj) => {
        if (obj.zx_level == 5) {
          City.push({
            id: obj.zx_salesterritoryid,
            name: obj.zx_territoryname,
          });
        }
      });
    }
    return City;
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
  getClassName() {
    const { classname } = this.props;
    let Name = [];
    if (classname && classname.length) {
      classname.map((obj) => {
        if ({ id: obj.zx_itemclassid, name: obj.zx_description }) {
          Name.push({
            id: obj.zx_itemclassid,
            name: obj.zx_description,
          });
        }
      });
    }
    return Name;
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
    return data;
  }

  render() {
    const {
      competitorForm,
      token,
      agentid,
      uploadImageLoader,
      uploadImageField,
      code,
    } = this.props;
    let forms = {
      zx_area: competitorForm.zx_area ? competitorForm.zx_area : null,
      zx_attachments: competitorForm.zx_attachments
        ? competitorForm.zx_attachments
        : null,
      zx_class: competitorForm.zx_class,
      zx_competitorname: competitorForm.zx_competitorname,
      zx_competitorschemeinfoid: agentid,
      zx_fromdate: HelperService.convertMomentDateToTimestamp(
        competitorForm.zx_fromdate
      ),
      zx_modeofscheme: competitorForm.zx_modeofscheme,
      zx_periodindays: competitorForm.zx_periodindays,
      zx_remarks: competitorForm.zx_remarks,
      zx_salesexecutive: agentid,
      zx_targetaudience: "Distributor",
      zx_todate: HelperService.convertMomentDateToTimestamp(
        competitorForm.zx_todate
      ),
      zx_typeofscheme: competitorForm.zx_typeofscheme,
      zx_zone: competitorForm.zx_zone ? competitorForm.zx_zone : null,
      zx_state: competitorForm.zx_state ? competitorForm.zx_state : null,
      zx_substate: competitorForm.zx_substate
        ? competitorForm.zx_substate
        : null,
      zx_district: competitorForm.zx_district
        ? competitorForm.zx_district
        : null,
      zx_citytown: competitorForm.zx_citytown
        ? competitorForm.zx_citytown
        : null,
      zx_partnerType: this.getData(),
    };

    var date1 = new Date(competitorForm.zx_fromdate);
    var date2 = new Date(competitorForm.zx_todate);
    var msDiff = date2.getTime() - date1.getTime(); //Future date - current date
    var days = Math.floor(msDiff / (1000 * 60 * 60 * 24));
    console.log(this.getData());
    return (
      <View style={Styles.mainContainer}>
        <Card
          style={
            code.zx_brandgroupcode == "1"
              ? Styles.cardstyle1
              : Styles.cardstyleBlue1
          }
        >
          <BackArrowButton style={Styles.backarrow} />
          <Text style={Styles.title}>
            {"Competitor "}
            <Text style={Styles.titleText}>{"Scheme Info"}</Text>
          </Text>
        </Card>

        <ScrollView style={{ bottom: hp("10%") }}>
          <View style={Styles.outerView}>
            <View style={Styles.dropDown}>
              <Text style={Styles.textStyle}>Competitor Name*</Text>
              <View style={Styles.dropDownInner}>
                <SearchableDropdown
                  dataSource={this.getName()}
                  placeHolderText={"Select Competitor Name"}
                  selectedValue={competitorForm.zx_competitorname}
                  onChange={(value) =>
                    this.props.changeCompetitorForm({
                      edited_field: "zx_competitorname",
                      edited_value: value,
                    })
                  }
                  placeholder={"Select Competitor Name"}
                  invalid={false}
                  customPickerStyles={{ ...Styles.picker }}
                  labelStyles={{
                    color: Colors.black,
                    fontFamily: ApplicationStyles.textFont,
                    // textAlign: "center",
                    //   width: "99%",
                    //  padding:5,
                    fontSize: 13,
                    flexDirection: "row",
                  }}
                />
              </View>
            </View>
            <View style={Styles.textViewdate}>
              <Text style={Styles.textStyle}>From</Text>
              <SelectDate
                date={
                  competitorForm.zx_fromdate ? competitorForm.zx_fromdate : null
                }
                // minDate={new Date()}
                onDateChange={(date) =>
                  this.props.changeCompetitorForm({
                    edited_field: "zx_fromdate",
                    edited_value: date,
                  })
                }
              />
            </View>

            <View style={{ ...Styles.textViewdate, left: wp("10%") }}>
              <Text style={Styles.textStyle}>To</Text>
              <SelectDate
                date={
                  competitorForm.zx_todate ? competitorForm.zx_todate : null
                }
                minDate={new Date()}
                onDateChange={(date) =>
                  this.props.changeCompetitorForm({
                    edited_field: "zx_todate",
                    edited_value: date,
                  })
                }
              />
            </View>
            <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>Period (In Days)</Text>
              <InputText
                style={Styles.placeholder}
                placeholder={"Enter Period"}
                value={(competitorForm.zx_periodindays = days)}
                // onChange={(value) =>
                //   this.props.changeCompetitorForm({
                //     edited_field: "zx_periodindays",
                //     edited_value: value,
                //   })
                // }
                editable={false}
              />
            </View>

            <View style={Styles.dropDown}>
              <Text style={Styles.textStyle}>Category</Text>

              <View style={Styles.dropDownInner}>
                <SearchableDropdown
                  dataSource={this.getClassName()}
                  placeHolderText={"Select Category"}
                  selectedValue={competitorForm.zx_class}
                  onChange={(value) =>
                    this.props.changeCompetitorForm({
                      edited_field: "zx_class",
                      edited_value: value,
                    })
                  }
                  placeholder={"Select Category"}
                  invalid={false}
                  customPickerStyles={{ ...Styles.picker }}
                  labelStyles={{
                    color: Colors.black,
                    fontFamily: ApplicationStyles.textFont,
                    // textAlign: "center",
                    //   width: "99%",
                    //  padding:5,
                    fontSize: 13,
                    flexDirection: "row",
                  }}
                />
              </View>
            </View>

            <View style={Styles.dropDown}>
              <Text style={Styles.textStyle}>Zone</Text>
              <View style={Styles.dropDownInner}>
                <SearchableDropdown
                  dataSource={this.getZone()}
                  placeHolderText={"Select Zone"}
                  selectedValue={competitorForm.zx_zone}
                  onChange={(value) => {
                    this.props.changeCompetitorForm({
                      edited_field: "zx_zone",
                      edited_value: value,
                    }),
                      this.props.getAllState({
                        token,
                        id: agentid,
                        level: 2,
                        first_level: 1,
                        guidId: value,
                      });
                  }}
                  placeholder={"Select Zone"}
                  invalid={false}
                  customPickerStyles={{ ...Styles.picker }}
                  labelStyles={{
                    color: Colors.black,
                    fontFamily: ApplicationStyles.textFont,
                    // textAlign: "center",
                    //   width: "99%",
                    //  padding:5,
                    fontSize: 13,
                    flexDirection: "row",
                  }}
                />
              </View>
            </View>
            <View style={Styles.dropDown}>
              <Text style={Styles.textStyle}>State</Text>
              <View style={Styles.dropDownInner}>
                <SearchableDropdown
                  dataSource={this.getState()}
                  placeHolderText={"Select State"}
                  selectedValue={competitorForm.zx_state}
                  onChange={(value) => {
                    this.props.changeCompetitorForm({
                      edited_field: "zx_state",
                      edited_value: value,
                    }),
                      this.props.getAllSubState({
                        token,
                        id: agentid,
                        level: 3,
                        first_level: 2,
                        guidId: value,
                      });
                  }}
                  placeholder={"Select State"}
                  invalid={false}
                  customPickerStyles={{ ...Styles.picker }}
                  labelStyles={{
                    color: Colors.black,
                    fontFamily: ApplicationStyles.textFont,
                    // textAlign: "center",
                    //   width: "99%",
                    //  padding:5,
                    fontSize: 13,
                    flexDirection: "row",
                  }}
                />
              </View>
            </View>
            <View style={Styles.dropDown}>
              <Text style={Styles.textStyle}>Sub-State</Text>
              <View style={Styles.dropDownInner}>
                <SearchableDropdown
                  dataSource={this.getSubState()}
                  placeHolderText={"Select Sub-State"}
                  selectedValue={competitorForm.zx_substate}
                  onChange={(value) => {
                    this.props.changeCompetitorForm({
                      edited_field: "zx_substate",
                      edited_value: value,
                    }),
                      this.props.getAllDistrict({
                        token,
                        id: agentid,
                        level: 4,
                        first_level: 3,
                        guidId: value,
                      });
                  }}
                  placeholder={"Select Sub-State"}
                  invalid={false}
                  customPickerStyles={{ ...Styles.picker }}
                  labelStyles={{
                    color: Colors.black,
                    fontFamily: ApplicationStyles.textFont,
                    // textAlign: "center",
                    //   width: "99%",
                    //  padding:5,
                    fontSize: 13,
                    flexDirection: "row",
                  }}
                />
              </View>
            </View>
            <View style={Styles.dropDown}>
              <Text style={Styles.textStyle}>District</Text>
              <View style={Styles.dropDownInner}>
                <SearchableDropdown
                  dataSource={this.getDistrict()}
                  placeHolderText={"Select District"}
                  selectedValue={competitorForm.zx_district}
                  onChange={(value) => {
                    this.props.changeCompetitorForm({
                      edited_field: "zx_district",
                      edited_value: value,
                    }),
                      this.props.getAllCity({
                        token,
                        id: agentid,
                        level: 5,
                        first_level: 4,
                        guidId: value,
                      });
                  }}
                  placeholder={"Select District"}
                  invalid={false}
                  customPickerStyles={{ ...Styles.picker }}
                  labelStyles={{
                    color: Colors.black,
                    fontFamily: ApplicationStyles.textFont,
                    // textAlign: "center",
                    //   width: "99%",
                    //  padding:5,
                    fontSize: 13,
                    flexDirection: "row",
                  }}
                />
              </View>
            </View>
            <View style={Styles.dropDown}>
              <Text style={Styles.textStyle}>City</Text>
              <View style={Styles.dropDownInner}>
                <SearchableDropdown
                  dataSource={this.getCity()}
                  placeHolderText={"Select City"}
                  selectedValue={competitorForm.zx_citytown}
                  onChange={(value) => {
                    this.props.changeCompetitorForm({
                      edited_field: "zx_citytown",
                      edited_value: value,
                    }),
                      this.props.getAllArea({
                        token,
                        id: agentid,
                        level: 7,
                        first_level: 5,
                        guidId: value,
                      });
                  }}
                  placeholder={"Select City"}
                  invalid={false}
                  customPickerStyles={{ ...Styles.picker }}
                  labelStyles={{
                    color: Colors.black,
                    fontFamily: ApplicationStyles.textFont,
                    // textAlign: "center",
                    //   width: "99%",
                    //  padding:5,
                    fontSize: 13,
                    flexDirection: "row",
                  }}
                />
              </View>
            </View>
            <View style={Styles.dropDown}>
              <Text style={Styles.textStyle}>Area</Text>
              <View style={Styles.dropDownInner}>
                <SearchableDropdown
                  dataSource={this.getArea()}
                  placeHolderText={"Select Area"}
                  selectedValue={competitorForm.zx_area}
                  onChange={(value) =>
                    this.props.changeCompetitorForm({
                      edited_field: "zx_area",
                      edited_value: value,
                    })
                  }
                  placeholder={"Select Area"}
                  invalid={false}
                  customPickerStyles={{ ...Styles.picker }}
                  labelStyles={{
                    color: Colors.black,
                    fontFamily: ApplicationStyles.textFont,
                    // textAlign: "center",
                    //   width: "99%",
                    //  padding:5,
                    fontSize: 13,
                    flexDirection: "row",
                  }}
                />
              </View>
            </View>

            <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>Remarks</Text>
              <InputText
                style={Styles.placeholder}
                placeholder={"Enter Remarks"}
                value={competitorForm.zx_remarks}
                onChange={(value) =>
                  this.props.changeCompetitorForm({
                    edited_field: "zx_remarks",
                    edited_value: value,
                  })
                }
              />
            </View>

            <View style={Styles.dropDown}>
              <Text style={Styles.textStyle}>Type of scheme</Text>

              <View style={Styles.dropDownInner}>
                <SearchableDropdown
                  dataSource={[
                    { id: "Credit Note", name: "Credit Note" },
                    { id: "Foreign Tour scheme", name: "Foreign Tour scheme" },
                    { id: "Others", name: "Others" },
                  ]}
                  placeHolderText={"Select Type of scheme"}
                  selectedValue={competitorForm.zx_typeofscheme}
                  onChange={(value) =>
                    this.props.changeCompetitorForm({
                      edited_field: "zx_typeofscheme",
                      edited_value: value,
                    })
                  }
                  placeholder={"Select Type of scheme"}
                  invalid={false}
                  customPickerStyles={{ ...Styles.picker }}
                  labelStyles={{
                    color: Colors.black,
                    fontFamily: ApplicationStyles.textFont,
                    // textAlign: "center",
                    //   width: "99%",
                    //  padding:5,
                    fontSize: 13,
                    flexDirection: "row",
                  }}
                />
              </View>
            </View>
            <View style={Styles.dropDown}>
              <Text style={Styles.textStyle}>Mode of scheme</Text>

              <View style={Styles.dropDownInner}>
                <SearchableDropdown
                  dataSource={[
                    { id: "Percenatge", name: "Percenatge" },
                    { id: "Gift", name: "Gift" },
                    { id: "Others", name: "Others" },
                  ]}
                  placeHolderText={"Select Mode of scheme"}
                  selectedValue={competitorForm.zx_modeofscheme}
                  onChange={(value) =>
                    this.props.changeCompetitorForm({
                      edited_field: "zx_modeofscheme",
                      edited_value: value,
                    })
                  }
                  placeholder={"Select Mode of scheme"}
                  invalid={false}
                  customPickerStyles={{ ...Styles.picker }}
                  labelStyles={{
                    color: Colors.black,
                    fontFamily: ApplicationStyles.textFont,
                    // textAlign: "center",
                    //   width: "99%",
                    //  padding:5,
                    fontSize: 13,
                    flexDirection: "row",
                  }}
                />
              </View>
              <View style={{ top: hp("7%") }}>
                <SelectBox
                  label="Select Partner Type"
                  labelStyle={{
                    color: Colors.black,
                    fontWeight: "bold",
                    fontSize: 14,
                  }}
                  width="100%"
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
                    { id: "Retailer", item: "Retailer" },
                    { id: "Wholesaler", item: "Wholesaler" },
                    { id: "Distributor", item: "Distributor" },
                    { id: "Plumber", item: "Plumber" },
                    { id: "Architect", item: "Architect" },
                    { id: "Contractor", item: "Contractor" },
                    { id: "Consultant", item: "Consultant" },
                    { id: "Builder", item: "Builder" },
                    { id: "Employee", item: "Employee" },
                    { id: "Other Stakeholders", item: "Other Stakeholders" },
                  ]}
                  selectedValues={this.state.selectedTeams}
                  onMultiSelect={this.onMultiChange()}
                  onTapClose={this.onMultiChange()}
                  listOptionProps={{ nestedScrollEnabled: true }}
                  isMulti
                />
                {/* <Text style={Styles.textStyle}>Target Audience</Text>
              <View style={Styles.dropDownInner}>
                <SearchableDropdown
                dataSource={[
                  { id: "retailer", name: "retailer" },
                  { id: "wholeseller", name: "wholeseller" },
                  { id: "Distributor", name: "Distributor" },
                  { id: "plumber", name: "plumber" },
                  { id: "architect", name: "architect" },
                  { id: "contractor", name: "contractor" },
                  { id: "consultant", name: "consultant" },
                  { id: "builder", name: "builder" },
                  { id: "employee", name: "employee" },
                  { id: "Other Stakeholders", name: "Other Stakeholders" },
                ]}
                  placeHolderText={"Select Target Audience"}
                  selectedValue={competitorForm.zx_targetaudience}
                  onChange={(value) =>
                    this.props.changeCompetitorForm({
                      edited_field: "zx_targetaudience",
                      edited_value: value,
                    })
                  }
                  placeholder={"Select Target Audience"}
                  invalid={false}
                  customPickerStyles={{ ...Styles.picker }}
                  labelStyles={{
                    color: Colors.black,
                    fontFamily: ApplicationStyles.textFont,
                    // textAlign: "center",
                    //   width: "99%",
                    //  padding:5,
                    fontSize: 13,
                    flexDirection: "row",
                  }}
                />
              </View> */}
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                right: hp("10%"),
                marginTop: hp("7%"),
                marginBottom: hp("-15%"),
              }}
            >
              <Text
                style={{
                  left: wp("21%"),
                  fontSize: 14.5,
                  color: Colors.black,
                  marginTop: hp(1),
                  fontWeight:"bold"
                }}
              >
                Take Scheme Picture
              </Text>
              <View style={{ ...Styles.bottomMargin }}>
                <MultipleImagePicker
                  title={"Take Pictue"}
                  images={competitorForm.zx_attachments || []}
                  loading={
                    uploadImageLoader && uploadImageField == "zx_attachments"
                  }
                  onClearImage={(value) =>
                    this.props.competitorForm({
                      edited_field: "zx_attachments",
                      edited_value: "",
                    })
                  }
                  onImageSuccess={({ images }) =>
                    this.props.uploadImage({
                      images,
                      params: { edited_field: "zx_attachments" },
                      multiple: true,
                      previous_value: competitorForm.zx_attachments || [],
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
            <View style={{ marginLeft: hp("15%"), marginTop: hp("20%") }}>
              <BlueButton
                style={
                  code.zx_brandgroupcode == "1"
                    ? Styles.button
                    : Styles.buttonBlue
                }
                title={"SAVE"}
                onPress={() =>
                  this.props.createCompetitorForm({ form: forms, token })
                }
              />
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
    area: state.distributor.getArea,
    competitorForm: state.competitor.competitorForm,
    name: state.competitor.competitorName,
    classname: state.competitor.class,
    //  validation: state.retailers.retailerFormValidation,
    competitorFormLoader: state.competitor.competitorFormLoader,
    uploadImageField: state.common.uploadImageField,
    uploadImageLoader: state.common.uploadImageLoader,
    code: state.user.user_details,
    zone: state.distributor.getZone,
    pincode: state.distributor.getPincode,
    state: state.distributor.getState,
    city: state.distributor.getCity,
    subState: state.distributor.getSubState,
    district: state.distributor.getDistrict,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeCompetitorForm: (params) =>
    dispatch(CompetitorActions.changeCompetitorForm(params)),
  getAllArea: (params) => dispatch(DistributorActions.getAllArea(params)),
  getClass: (params) => dispatch(CompetitorActions.getClass(params)),
  getCompetitorName: (params) =>
    dispatch(CompetitorActions.getCompetitorName(params)),
  createCompetitorForm: (params) =>
    dispatch(CompetitorActions.createCompetitorForm(params)),
  uploadImage: (params) => dispatch(CommonActions.uploadImage(params)),
  getAllState: (params) => dispatch(DistributorActions.getAllState(params)),
  getAllSubState: (params) =>
    dispatch(DistributorActions.getAllSubState(params)),
  getAllCity: (params) => dispatch(DistributorActions.getAllCity(params)),
  getAllPincode: (params) => dispatch(DistributorActions.getAllPincode(params)),
  getAllDistrict: (params) =>
    dispatch(DistributorActions.getAllDistrict(params)),
  getAllZone: (params) => dispatch(DistributorActions.getAllZone(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CompetitorInfoForm);
