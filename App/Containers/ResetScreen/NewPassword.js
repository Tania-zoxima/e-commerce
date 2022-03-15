import React,{useState} from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Button,
} from "react-native";
import { Colors } from "App/Theme";
import BackArrowButton from "App/Components/BackArrowButton";
import styles from "./ResetScreenStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import UserActions from "App/Stores/User/Actions";
import { connect } from "react-redux";
import BlueButton from "../../Components/BlueButton";
import InputPassword from "App/Components/FormInput/InputPassword";
import GenericIcon from "App/Components/GenericIcon";
import LoginInputNumber from "../Login/LoginInputNumber";



// import logo from '../Assets';

function NewPassword({loginOtp,changeResetPasswordOtp,loader,ResetPasswordOtp,loginResetPassword,username,token,otpHashCode}) {
const [secureTextEntry,setSecureTextEntry] = useState(true);

  let forms={
  
    username:loginOtp.username,
    newpassword:loginResetPassword.newpassword,
     generatedtoken:otpHashCode.generatedtoken


}
console.log("hashhh",loginOtp)
  return (
    <View >
      <BackArrowButton style={styles.backarrow} />
      <View style={styles.container}>
      {/* <Image
        source={require("../../Assets/Images/logo.png")}
        style={styles.image}
      /> */}
      <Text
        style={{
        //   textAlign: "center",
          color: "white",
          fontSize: 20,
          fontWeight: "bold",
          marginTop: hp("1%"),
          left:"4%"
        }}
      >
        New Password
      </Text>

      <View style={styles.outer}>
        {/* <TextInput
          style={styles.text}
          placeholder="Username"
          onChangeText={(value) =>
            changeForm({
              edited_field: "username",
              edited_value: value,
            })
          }
        ></TextInput> */}
        <LoginInputNumber
          // style={styles.text}
          placeholder="Enter New Password"
          value={loginResetPassword.newpassword}
          onChange={(value) =>
            changeResetPasswordOtp({
              edited_field: "newpassword",
              edited_value: value,
            })
          }
          secureTextEntry={secureTextEntry}
        />
        {secureTextEntry?<GenericIcon
            name={"visibility-off"}
            style={{ color: Colors.primary, fontSize: wp("5.5%"),left:wp("75%"),bottom:hp("5.5%") }}
            onPress={() => {setSecureTextEntry(false)}}
          />:<GenericIcon
          name={"visibility"}
          style={{ color: Colors.primary, fontSize: wp("5.5%"),left:wp("75%"),bottom:hp("5.5%") }}
          onPress={() => {setSecureTextEntry(true)}}
        />}
        {/* <TextInput
          style={styles.text}
          placeholder="Confirm Old Password"
          onChangeText={(value) => {
            changeForm({
              edited_field: "password",
              edited_value: value,
            });
          }}
        ></TextInput> */}
        {/* <TextInput
          style={styles.text}
          placeholder="Date of Birth"
          onChangeText={(value) =>
            changeForm({
              edited_field: "brday_date",
              edited_value: value,
            })
          }
        ></TextInput> */}
      </View>
      <BlueButton
                style={styles.button}
                title={"Submit"}
                onPress={() => {
                  ResetPasswordOtp({form:forms},token);
                }}
                disabled={loader}
                loading={loader}
              />
      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => {
          submitForm({ ...form });
        }}
      >
        <Text style={styles.buttonText}>SUBMIT</Text>
      </TouchableOpacity> */}
    </View>
    </View>
  );
}

function mapStateToProps(state) {
  return {
    loginResetPassword: state.user.loginResetPassword,
    loader: state.user.loginResetPasswordLoader,
    username: state.user.username,
  token: state.user.token,
  otpHashCode:state.user.otpHashCode.data[0],
  loginOtp: state.user.loginOtp,

  };
}

const mapDispatchToProps = (dispatch) => ({
  ResetPasswordOtp: (params) => dispatch(UserActions.ResetPasswordOtp(params)),
  changeResetPasswordOtp: (params) => dispatch(UserActions.changeResetPasswordOtp(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPassword);