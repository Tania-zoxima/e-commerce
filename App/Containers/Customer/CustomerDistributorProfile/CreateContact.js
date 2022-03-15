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
import BlueButton from "../../../Components/BlueButton";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SearchableDropdown from "App/Components/SearchableDropdown";

import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import { Card } from "react-native-paper";
import BackArrowButton from "App/Components/BackArrowButton";
import RetailersActions from "App/Stores/Retailers/Actions";
import { connect } from "react-redux";
import InputMobile from "App/Components/FormInput/InputMobile";

class CreateContact extends Component {
  componentDidMount() {
    // this.props.clearForm();
  }

  validatePhoneNumber(value) {
    let error;
    if (!value) {
      error = 'Required';
    } else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value)) {
      error = 'Invalid Number';
    }
    return error;
    }

    validatePhoneNumber1(value) {
      let error;
      if (!value) {
        error = '';
      } else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value)) {
        error = 'Invalid Number';
      }
      return error;
      }


    validateEmail(value) {
      let error;
      if (!value) {
        error = 'Required';
      } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        error = 'Invalid Email';
      }
      return error;
      }


  render() {
    const { contactForm, token, agentid, validation, loading } = this.props;
    let recordid = this.props.navigation.state.params;
    // console.log("recordiddddd", recordid);
    let forms = {
      // zx_tickettype: "Contact Creation",
      telephone1: contactForm.telephone1,
      firstname: contactForm.firstname,
      lastname: contactForm.lastname,
      emailaddress1: contactForm.emailaddress1,
      mobilephone: contactForm.mobilephone,
      parentcustomerid: recordid.id,
      zx_team: agentid,
      zx_mobileno: contactForm.zx_mobileno?contactForm.zx_mobileno:"",
      // zx_source: "SFA",
      // zx_contacttobeupdated: "dbb76567-43d1-4b8d-9ba8-19ad9ea83f50",
      // "contactid": "527cbb43-6009-4d4b-9dc4-f61200f9b8c8",
      // "firstname": "pall",   
      // "lastname": "din",
      // "zx_mobileno": "6598565655",
      // "emailaddress1": "pallvi@zoxima.com",
      // "mobilephone": "445645454",
      // "parentcustomerid": "dbb76567-43d1-4b8d-9ba8-19ad9ea83f50",
      // "zx_team": "ece842d6-ee33-492c-9f2e-e6dfe4f9d84d",
      // "telephone1":"555885552"
  
      
    };
    let form1 = {
      // zx_tickettype: "Contact Updation",
      // zx_alternatemobilenumber: contactForm.telephone1,
      // zx_contactperson: contactForm.firstname,
      // zx_emailid: contactForm.emailaddress1,
      // zx_mobilenumber: contactForm.mobilephone,
      // zx_customer: recordid.id,
      // zx_team: agentid,
      // zx_landline: contactForm.zx_landline?contactForm.zx_landline:"",
      // zx_source: "SFA",
      // zx_contacttobeupdated: "dbb76567-43d1-4b8d-9ba8-19ad9ea83f50",

      telephone1: contactForm.telephone1,
      firstname: contactForm.firstname,
      lastname: contactForm.lastname,
      emailaddress1: contactForm.emailaddress1,
      mobilephone: contactForm.mobilephone,
      parentcustomerid: recordid.id,
      zx_team: agentid,
      zx_mobileno: contactForm.zx_mobileno?contactForm.zx_mobileno:"",
      contactid:contactForm.id
    };
    // console.log("loaderrrrrrrrrrr", loading);

    return (
      <View style={Styles.mainContainer}>
        <Card style={Styles.cardstyle}>
          <BackArrowButton style={Styles.backarrow} />
          <Text style={Styles.title}>
            {recordid.show==true?"Create ":"Update "}
            <Text style={Styles.titleText}>{"Contact"}</Text>
          </Text>
        </Card>
        <ScrollView>
          <View style={Styles.outerView}>
            <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>First Name*</Text>
              <InputText
                style={Styles.placeholder}
                placeholder={"Enter Name"}
                value={contactForm.firstname}
                onChange={(value) =>
                  this.props.changeContactForm({
                    edited_field: "firstname",
                    edited_value: value,
                  })
                }
                error={
                  validation.invalid &&
                  validation.invalid_field == "firstname"
                }
              />
            </View>

            
            <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>Last Name*</Text>
              <InputText
                style={Styles.placeholder}
                placeholder={"Enter Name"}
                value={contactForm.lastname}
                onChange={(value) =>
                  this.props.changeContactForm({
                    edited_field: "lastname",
                    edited_value: value,
                  })
                }
                error={
                  validation.invalid &&
                  validation.invalid_field == "lastname"
                }
              />
            </View>
            


           
           <View>
            <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>Mobile No.*</Text>
              <InputMobile
                style={Styles.placeholder}
                placeholder={"Enter Mobile No."}
                value={contactForm.mobilephone}
                onChange={(value) =>
                  this.props.changeContactForm({
                    edited_field: "mobilephone",
                    edited_value: value,
                  })
                }
                maxLength={10}
                error={
                  validation.invalid &&
                  validation.invalid_field == "mobilephone"
                }
              />
            </View>
     <Text style={{color:"red", left:wp("7%")}}>{this.validatePhoneNumber(contactForm.mobilephone)}</Text>
     </View>
            
            <View>
            <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>Alternate Mobile No.*</Text>
              <InputMobile
                style={Styles.placeholder}
                placeholder={"Enter Alternate Mobile No."}
                value={contactForm.telephone1}
                onChange={(value) =>
                  this.props.changeContactForm({
                    edited_field: "telephone1",
                    edited_value: value,
                  })
                }
                maxLength={10}
                error={
                  validation.invalid &&
                  validation.invalid_field == "telephone1"
                }
              />
            </View>
     <Text style={{color:"red",left:wp("7%")}}>{this.validatePhoneNumber(contactForm.telephone1)}</Text>
     </View>
            <View>
            <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>Phone/Landline Number</Text>
              <InputMobile
                style={Styles.placeholder}
                placeholder={"Enter Landline number"}
                maxLength={10}
                value={contactForm.zx_mobileno}
                onChange={(value) =>
                  this.props.changeContactForm({
                    edited_field: "zx_mobileno",
                    edited_value: value,
                  })
                }
                // error={validation.invalid &&validation.invalid_field == "zx_landline" }


              />
            </View>
            <Text style={{color:"red",left:wp("7%")}}>{this.validatePhoneNumber1(contactForm.telephone1)}</Text>
     </View>

            <View>
            <View style={Styles.textView1}>
              <Text style={Styles.textStyle}>Email Id*</Text>
              <InputText
                style={Styles.placeholder}
                placeholder={"Enter Email Id"}
                value={contactForm.emailaddress1}
                onChange={(value) =>
                  this.props.changeContactForm({
                    edited_field: "emailaddress1",
                    edited_value: value,
                  })
                }
                error={
                  validation.invalid && validation.invalid_field == "emailaddress1"
                }
              />
            </View>
     <Text style={{color:"red", left:wp("7%")}}>{this.validateEmail(contactForm.emailaddress1)}</Text>
     </View>

            <View style={{ marginTop: hp("8%"), marginLeft: wp("35%") }}>
              <BlueButton
                style={Styles.button}
                title={"SAVE"}
                onPress={() =>
                  this.props.createContactForm({ form: recordid.show==true? forms:form1, token })
                }
                disabled={loading}
                loading={loading}
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
    contactForm: state.retailers.contactForm,
    name: state.competitor.competitorName,
    classname: state.competitor.class,
    validation: state.retailers.formValidation,
    loading: state.retailers.contactFormLoader,
    details: state.retailers.getContact,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeContactForm: (params) =>
    dispatch(RetailersActions.changeContactForm(params)),
  createContactForm: (params) =>
    dispatch(RetailersActions.createContactForm(params)),
  contactFormValidationFailed: (params) =>
    dispatch(RetailersActions.contactFormValidationFailed(params)),
  clearForm: (params) => dispatch(RetailersActions.clearForm(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateContact);
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
  backarrow: {
    color: Colors.white,
    fontSize: 32,
    paddingLeft: 7,
    paddingTop: 20,
  },
  title: {
    fontFamily: "Rubik",
    fontSize: 28,
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
    //   top: hp("5%"),
    //   left: wp("20%"),
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