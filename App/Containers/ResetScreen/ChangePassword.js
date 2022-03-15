import React, { useState } from "react";
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
import WhiteButton from "../../Components/WhiteButton";
import GenericIcon from "App/Components/GenericIcon";
// import logo from '../Assets';

function ChangePassword({ form, loading, changeForm, submitForm }) {
  const [eye, setEye] = useState(true);
  const [eye1, setEye1] = useState(true);
  return (
    <View>
      <BackArrowButton style={styles.backarrow} />
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Image
          style={{
            width: 247,
            height: 35,
            resizeMode: "contain",
            left: wp("12%"),
            marginTop: 42,
          }}
          source={require("App/Assets/Images/logo.png")}
        />
        <Image
          style={{
            width: 247,
            height: 60,
            resizeMode: "contain",
            right: wp("8%"),
            marginTop: 25,
          }}
          source={require("App/Assets/Images/turbore.png")}
        />
      </View>
      <Text
        style={{
          textAlign: "center",
          color: Colors.black,
          fontSize: 20,
          fontWeight: "bold",
          marginTop: hp("5%"),
        }}
      >
        Change Password
      </Text>

      <View
        style={{
          marginTop: hp("2%"),
          justifyContent: "center",
          width: wp("65%"),
          alignSelf: "center",
          right: wp("18%"),
        }}
      >
        <TextInput
          style={styles.text}
          placeholder="Username"
          onChangeText={(value) =>
            changeForm({
              edited_field: "username",
              edited_value: value,
            })
          }
        ></TextInput>
        <TextInput
          style={styles.text}
          placeholder="New Password"
          onChangeText={(value) =>
            changeForm({
              edited_field: "new_password",
              edited_value: value,
            })
          }
          secureTextEntry={eye}
        ></TextInput>
        {eye ? (
          <GenericIcon
            name={"visibility-off"}
            style={{
              color: Colors.black,
              fontSize: wp("5.5%"),
              left: wp("80%"),
              position:"absolute"
            }}
            onPress={() => setEye(false)}
          />
        ) : (
          <GenericIcon
            name={"visibility"}
            style={{
              color: Colors.black,
              fontSize: wp("5.5%"),
              left: wp("80%"),
              position:"absolute"
            }}
            onPress={() => setEye(true)}
          />
        )}
        <TextInput
          style={styles.text}
          placeholder="Confirm Old Password"
          onChangeText={(value) => {
            changeForm({
              edited_field: "password",
              edited_value: value,
            });
          }}
          secureTextEntry={eye1}
        ></TextInput>
        {eye1 ? (
          <GenericIcon
            name={"visibility-off"}
            style={{
              color: Colors.black,
              fontSize: wp("5.5%"),
              left: wp("80%"),
              bottom: hp("4.5%"),
            }}
            onPress={() => setEye1(false)}
          />
        ) : (
          <GenericIcon
            name={"visibility"}
            style={{
              color: Colors.black,
              fontSize: wp("5.5%"),
              left: wp("80%"),
              bottom: hp("4.5%"),
            }}
            onPress={() => setEye1(true)}
          />
        )}
      </View>
      <WhiteButton
        style={{
          width: wp("85%"),
          height: hp("6%"),
          backgroundColor: "#e6e6e6",
          marginTop: hp("6%"),
          marginLeft: wp("8%"),
          borderRadius: 3,
          textAlign: "center",
          textTransform: "uppercase",
          shadowColor: Colors.darkRedPink,
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4.84,
          elevation: 10,
          borderColor: "black",
          borderWidth: 1,
        }}
        title={"SUBMIT"}
        onPress={() => {
          submitForm({ ...form });
        }}
        disabled={loading}
        loading={loading}
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
  );
}

function mapStateToProps(state) {
  return {
    form: state.user.resetPasswordForm,
    loading: state.user.resetLoader,
  };
}

const mapDispatchToProps = (dispatch) => ({
  submitForm: (params) => dispatch(UserActions.submitResetForm(params)),
  changeForm: (params) => dispatch(UserActions.changeResetForm(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
