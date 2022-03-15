import React,{useRef, useState,useEffect}from "react";
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
import NavigationService from "App/Services/NavigationService";
import OTPInputView from '@twotalltotems/react-native-otp-input';
import RNOtpVerify from 'react-native-otp-verify';
import { Card } from "react-native-paper";

// import logo from '../Assets';

function ResetScreen({loginOtp, form, loading, changeForm, submitForm,submitResetOtp,loginResetOtp,loader,username,token,changeResetOtp }) {
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const [otp, setOtp] = useState();
   console.log("raaammmmm", otp)


// useEffect(() => {
//   RNOtpVerify.getOtp()
//       .then((p) => {
//           RNOtpVerify.addListener((message) => {
//               try {
//                 console.log("treeee",message)
//                   if (message && message !== 'Timeout Error') {
//                       const otp = /(\d{4})/g.exec(message)[1];
//                       if (otp.length === 4) {
//                         setOtp(otp.split(''));
//                       }
//                   } else {
//                       console.log( 'OTPVerification: RNOtpVerify.getOtp - message=>', message );
//                   }
//               } catch (error) {
//                   console.log('OTPVerification: RNOtpVerify.getOtp error=>', error );
//               }
//           });
//       })
//       .catch((error) => {
//           console.log(error);
//       });

//   return () => {
//     RNOtpVerify.removeOtpListener();
//   };
// }, []);

//   useEffect(() => {
    
//     RNOtpVerify.getOtp()

//     .then(p => RNOtpVerify.addListener(otpHandler))

//     .catch(p => console.log(p));
//     console.log("ghhraaammmmmt",RNOtpVerify.addListener(otpHandler))

//     return() => RNOtpVerify.removeListener();
//   },[]);

//  const otpHandler = (message) => {
//    console.log('deeeppp',message);
//     // const otp = /(\d{4})/g.exec(message)[1];
//   const otp = "1234";
//   //  console.log("gameee",otp)
//     changeResetOtp({
//       edited_field: "sharedOtp",
//       edited_value: otp,
//     });
//     console.log('azxsdcf',otp)
//     RNOtpVerify.removeListener();
//     // Keyboard.dismiss();
// }
    

  //   RNOtpVerify.getOtp()
  //     .then(p =>
  //       RNOtpVerify.addListener(message => {
  //         try {
  //           if (message) {
  //             console,log('asdfg',message)
  //             const messageArray = message.split('\n');
  //             if (messageArray[2]) {
  //               const otp = messageArray[2].split(' ')[0];
  //               if (otp.length === 4) {
  //                 setOtpArray(otp.split(''));

  //                 // to auto submit otp in 4 secs
  //                 // setAutoSubmitOtpTime(AUTO_SUBMIT_OTP_TIME_LIMIT);
  //                 // startAutoSubmitOtpTimer();
  //               }
  //             }
  //           }
  //         } catch (error) {
  //           console.log(
  //             error.message,
  //             'RNOtpVerify.getOtp - read message, OtpVerification',
  //           );
  //         }
  //       }),
  //     )
  //     .catch(error => {
  //       console.log(
  //         error.message,
  //         'RNOtpVerify.getOtp, OtpVerification',
  //       );
  //     });

  //   // remove listener on unmount
  //   return () => {
  //     RNOtpVerify.removeListener();
  //   };
  // }, []);

 
    

  
let forms={
  
    username: loginOtp.username,
    sharedOtp:loginResetOtp.sharedOtp,

}
  return (
    <View >
      <BackArrowButton style={styles.backarrow} />
      <Card style={styles.container}>
      {/* <Image
        source={require("../../Assets/Images/logo.png")}
        style={styles.image}
      /> */}
       <Text
        style={{
          textAlign: "left",
          color: "white",
          fontSize: 25,
          fontWeight: "bold",
          marginTop: hp("3%"),
          marginLeft:wp("10%")
        }}
      >
        Verify Details
      </Text>
      <Text
        style={{
          textAlign: "left",
          color: "white",
          fontSize: 18,
          fontWeight: "bold",
           marginTop: hp("1%"),
          marginLeft:wp("10%")
        }}
      >
        OTP sent to your mobile number
      </Text>
      

      <View style={{alignItems:"center",marginTop:"-2%"}}>
      <OTPInputView
    style={{width: '80%', height: 200}}
    pinCount={4}
    code={loginResetOtp.sharedOtp}
    onCodeChanged={value => 
      // changeResetOtp({...otp, 1: text});
      changeResetOtp({
        edited_field: "sharedOtp",
        edited_value: value,
      })}
    // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
    // onCodeChanged = {code => { this.setState({code})}}
    autoFocusOnLoad
    codeInputFieldStyle={styles.otpBox}
    codeInputHighlightStyle={styles.underlineStyleHighLighted}
    // onCodeFilled = {(code => {
    //     console.log(`Code is ${code}, you are good to go!`)
    // })}
/>
      
   
</View>
      {/* <View style={styles.otpContainer}>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={firstInput}
            value={loginResetOtp.sharedOtp}
            onChangeText={value => {
              // changeResetOtp({...otp, 1: text});
              changeResetOtp({
                edited_field: "sharedOtp",
                edited_value: value,
              })
              value && secondInput.current.focus();
            }}
          />
        </View>
        
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={secondInput}
            value={loginResetOtp.sharedOtp}
            onChangeText={value => {
              // setOtp({...otp, 2: text});
              changeResetOtp({
                edited_field: "sharedOtp",
                edited_value: value,
              })
              value ? thirdInput.current.focus() : firstInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={thirdInput}
            value={loginResetOtp.sharedOtp}
            onChangeText={value => {
              // setOtp({...otp, 3: text});
              changeResetOtp({
                edited_field: "sharedOtp",
                edited_value: value,
              })
              value ? fourthInput.current.focus() : secondInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={fourthInput}
            value={loginResetOtp.sharedOtp}
            onChangeText={value => {
              // setOtp({...otp, 4: text});
              changeResetOtp({
                edited_field: "sharedOtp",
                edited_value: value,
              })
              !value && thirdInput.current.focus();
            }}
          />
        </View>
      </View> */}
      {/* <Text
        style={{
          textAlign: "center",
          color: Colors.firozi,
          fontSize: 20,
          fontWeight: "bold",
          marginTop: hp("5%"),
        }}
      >
        Reset Password
      </Text> */}

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
        {/* <TextInput
          style={styles.text}
          placeholder="New Password"
          onChangeText={(value) =>
            changeForm({
              edited_field: "new_password",
              edited_value: value,
            })
          }
        ></TextInput> */}
        {/* <TextInput
          style={styles.text}
          placeholder="Old Password"
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
    </Card>

      <BlueButton
                style={styles.button}
                title={"PROCEED"}
                onPress={() => {
                  submitResetOtp({form:forms },token)
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
  username: state.user.username,
  token: state.user.token,
    loading: state.user.resetLoader,
    loginResetOtp: state.user.loginResetOtp,
    loader: state.user.loginResetOtpLoader,
    loginOtp: state.user.loginOtp,


  };
}

const mapDispatchToProps = (dispatch) => ({
  submitForm: (params) => dispatch(UserActions.submitResetForm(params)),
  changeForm: (params) => dispatch(UserActions.changeResetForm(params)),
  submitResetOtp: (params) => dispatch(UserActions.submitResetOtp(params)),
  changeResetOtp: (params) => dispatch(UserActions.changeResetOtp(params)),
  
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetScreen);