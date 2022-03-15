import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Item, Input, Button, Spinner } from "native-base";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Style from "./LoginScreenStyle";
import BlueButton from "App/Components/BlueButton";
import InputMobile from "App/Components/FormInput/InputMobile";
import InputPassword from "App/Components/FormInput/InputPassword";
import InputText from "App/Components/FormInput/InputText";
import { SEND_OTP } from "App/Constants";
import NavigationService from "App/Services/NavigationService";
import UserActions from "App/Stores/User/Actions";
import { Colors } from "App/Theme";
import LinearGradient from "react-native-linear-gradient";
import GenericIcon from "App/Components/GenericIcon";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-community/async-storage";

class LoginScreen1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secureTextEntry: true,
      fcmtoken: "",
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("@fcmtoken").then((token) => {
      if (token) {
        console.log("fcm token =======>", token);
        this.setState({ fcmtoken: JSON.parse(token) });
      }
    });
  }

  submit() {
    Keyboard.dismiss();

    //  NavigationService.navigate('DashboardScreen')
    const { loginUser, password, username } = this.props;

    loginUser({
      username: username,
      password: password,
      firebaseToken: this.state.fcmtoken,
    });
  }

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
      username: username,
    };
    return (
      <LinearGradient
        colors={["#F1BABC", "#F5C7BB", "#FCE0BA", "#FCE1BA", "#FCE3BB"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={Style.container}
      >
        <View style={Style.buttonBox}>
          <View style={{ flexDirection: "row" }}>
            <Image
              style={{
                width: 247,
                height: 35,
                resizeMode: "contain",
                left: wp("10%"),
                marginTop: 42,
              }}
              source={require("App/Assets/Images/logo.png")}
            />
            <Image
              style={{
                width: 247,
                height: 60,
                resizeMode: "contain",
                right: wp("10%"),
                marginTop: 25,
              }}
              source={require("App/Assets/Images/turbore.png")}
            />
          </View>
        </View>
        {/* <View style={Style.buttonBox}>
          <Image
            style={{
              width: 247,
              height: 52,
              resizeMode: "contain",

              marginTop: 30,
            }}
            source={require("App/Assets/Images/turbore.png")}
          />
        </View> */}
        <View style={Style.action}>
          <InputText
            placeholder={"Username"}
            value={username}
            onChange={(value) =>
              changeForm({ username: value, password: password })
            }
            error={validation.username}
          />

          <InputPassword
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
                color: Colors.primary,
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
                color: Colors.primary,
                fontSize: wp("5.5%"),
                left: wp("70%"),
                bottom: hp("5.5%"),
              }}
              onPress={() => this.setState({ secureTextEntry: true })}
            />
          )}

          <BlueButton
            style={Style.button}
            onPress={() => this.submit()}
            disabled={loading}
            loading={loading}
            title={"Login"}
          />

          <TouchableOpacity
            style={{ fontSize: 14, marginTop: 8, color: Colors.firozi }}
            onPress={() => {
              this.props.clear(), submitGetOtp({ form: forms }, token);
            }}
          >
            <Text style={{ fontSize: 14, marginTop: 8, color: Colors.firozi }}>
              {" "}
              Forgot Password ?
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Image
            style={{
              marginTop: 25,

              left: "-7%",
              width: 220,
              height: 250,
            }}
            source={require("App/Assets/Images/ak.png")}
          />
        </View>
      </LinearGradient>
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
  changeForm: (data) => dispatch(UserActions.changeLoginForm(data)),
  submitGetOtp: (data) => dispatch(UserActions.submitGetOtp(data)),
  clear: () => dispatch(UserActions.clearOtp()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen1);
