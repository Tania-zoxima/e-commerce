import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Keyboard,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Item, Input, Button, Spinner } from "native-base";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import Style from "./LoginScreenStyle";
import BlueButton from "App/Components/BlueButton";
import InputMobile from "App/Components/FormInput/InputMobile";
import InputPassword from "App/Components/FormInput/InputPassword";
import InputText from "App/Components/FormInput/InputText";
import { SEND_OTP } from "App/Constants";
import NavigationService from "App/Services/NavigationService";
import UserActions from "App/Stores/User/Actions";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import LinearGradient from "react-native-linear-gradient";
import GenericIcon from "App/Components/GenericIcon";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-community/async-storage";
import LoginInputText from "../Login/LoginInputNumber";
import { Card } from "react-native-paper";
import BackArrowButton from "App/Components/BackArrowButton";


// import LoginInputNumber from "./LoginInputNumber";

class UserScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       secureTextEntry: true,
//       fcmtoken: "",
//     };
//   }

//   componentDidMount() {
//     AsyncStorage.getItem("@fcmtoken").then((token) => {
//       if (token) {
//         console.log("fcm token =======>", token);
//         this.setState({ fcmtoken: JSON.parse(token) });
//       }
//     });
//   }

//   submit() {
//     Keyboard.dismiss();

    //  NavigationService.navigate('DashboardScreen')
    // const { loginUser, password, username } = this.props;

//     loginUser({
//       username: username,
//       password: password,
//       firebaseToken: this.state.fcmtoken,
//     });
//   }

  render() {
    const {
      validation,
      changeForm,
      password,
      loading,
      username,
      submitGetOtp,
      loginOtp,
      token,
      logindata,
    } = this.props;
    let forms = {
      username:loginOtp.username,
    };
    return (
      <View >
      <BackArrowButton style={styles.backarrow} />

        <Card style={styles.container1}>
        <View style={styles.header}>
          <Image
            style={{
              width: 200,
              height: 45,
              resizeMode: "contain",
              top:hp("-4%")
            }}
            source={require("App/Assets/Images/logop.png")}
          />
          <Image
            style={{
              width: 200,
              height: 75,
              resizeMode: "contain",
              top:hp("-4%")
            }}
            source={require("App/Assets/Images/logotu1.png")}
          />

          <View
            style={{
            top: hp("-1.5%"),
              width: wp("80%"),
              justifyContent: "center",
            }}
          >
            <LoginInputText
              placeholder={"Username"}
              value={loginOtp.username}
              onChange={(value) =>
                  changeForm({
                    edited_field: "username",
                    edited_value: value,
                  })
                }
              
            //   error={validation.username}
            />

            {/* <LoginInputNumber
              placeholder={"Password"}
              value={password}
              onChange={(value) =>
                changeForm({ password: value, username: username })
              }
              error={validation.invalid_password}
              secureTextEntry={this.state.secureTextEntry}
            />
            {this.state.secureTextEntry ? (
              <GenericIcon
                name={"visibility-off"}
                style={{
                  color: Colors.white,
                  fontSize: wp("5.5%"),
                  left: wp("70%"),
                  bottom: hp("5.5%"),
                }}
                onPress={() => this.setState({ secureTextEntry: false })}
              />
            ) : (
              <GenericIcon
                name={"visibility"}
                style={{
                  color: Colors.white,
                  fontSize: wp("5.5%"),
                  left: wp("70%"),
                  bottom: hp("5.5%"),
                }}
                onPress={() => this.setState({ secureTextEntry: true })}
              />
            )} */}

            <BlueButton
              style={{
                ...ApplicationStyles.formButton,
                alignSelf: "center",
                // marginTop: hp("2%"),
                top:hp("2.5%"),
                maxHeight: hp("6%"),
                backgroundColor: "#9a0000",
                borderRadius: 3,
    textTransform: "uppercase"

                
              }}
              onPress={() => {
                submitGetOtp({ form: forms }, token)
              
              }}
              disabled={loading}
              loading={loading}
              title={"Generate OTP"}
            />

            {/* <TouchableOpacity
              style={{ fontSize: 14,top:hp("-1.5%"), color: Colors.white }}
              onPress={() => {
                this.props.clear(), submitGetOtp({ form: forms }, token);
              }}
            >
              <Text style={{ fontSize: 14, color: Colors.white }}>
                {" "}
                Forgot Password ?
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
        {/* <View style={styles.footer}>
          <Image
            style={{
              width: 300,
              height: 300,
              top: hp("-20%"),
              left: wp("2%"),
            }}
            source={require("App/Assets/Images/tank.png")}
          />
          <View
            style={{
              borderBottomColor: "white",
              borderBottomWidth: 1,
              top: hp("-22%"),
            }}
          />
          <Text
            style={{
              color: "white",
              top: hp("-20%"),
              textAlign: "center",
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Plumbing | Sewerage | Drainage
          </Text>
          <Text
            style={{
              color: "white",
              top: hp("-19.5%"),
              textAlign: "center",
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Agriculture | Borewell | Industrial | Water Tanks
          </Text>
        </View> */}
        </Card>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.user.username,
  token: state.user.token,
  password: state.user.password,
  loading: state.user.userLoginIsLoading,
  loginOtp: state.user.loginOtp,
  validation: state.user.validation,
  logindata: state.user.user_details,
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (data) => dispatch(UserActions.loginUser(data)),
  changeForm: (data) => dispatch(UserActions.changeGetOtp(data)),
  submitGetOtp: (data) => dispatch(UserActions.submitGetOtp(data)),
  clear: () => dispatch(UserActions.clearOtp()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserScreen);
const styles = StyleSheet.create({
  container1: {
    //  flex: 1,
    // backgroundColor: "#ed1b24",
    // width:"90%",
    // maxHeight:"40%",
    // alignSelf:"center",
    // elevation:5,
     borderRadius:15,
    // left:"3%",
    flexDirection: "column",
    elevation: 15,
    backgroundColor: "#ed1b24",
    height: hp("45%"),
    justifyContent: "center",
    // alignItems: "center",
    alignSelf:"center",
    marginTop:"30%",
     width:"90%",

    // paddingHorizontal: "8%",
    // borderBottomLeftRadius: 65,
    // borderBottomRightRadius: 65,
    

  },
  header: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    top:"5%"
  },
  footer: {
    flex: 1,
    backgroundColor: "#6d6e72",
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  //   logo: {
  //     width: height_logo,
  //     height: height_logo,
  //   },
  title: {
    color: "#05375a",
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    color: "grey",
    marginTop: 5,
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
  backarrow: {
    color:"#ed1b24" ,
    fontSize: 28,
    paddingLeft: 7,
    paddingTop: 15,
  },
});
