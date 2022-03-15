import React from "react";
import { View,StyleSheet} from "react-native";
import { Item, Input, InputGroup, Icon, Label } from "native-base";
import { Colors, ApplicationStyles } from 'App/Theme'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// import Style from "./InputStyles";

const LoginInputNumber = ({
  placeholder = "",
  onChange = () => {},
  styles = {},
  value = "",
  error = false,
  label = "",
  secureTextEntry,
}) => (
  <>
    {label ? <Label style={{ ...Style.label }}>{label}</Label> : []}
    <Item style={{ ...Style.item }}>
      <Input
        value={String(value || "")}
        placeholder={placeholder}
        style={
          error
            ? { ...Style.input, ...Style.inputError, ...styles }
            : { ...Style.input, ...styles }
        }
        onChangeText={(event) => onChange(event)}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={Style.placeholder.color}
      />
    </Item>
  </>
);

export default LoginInputNumber;
const Style = StyleSheet.create({
    item: {
        borderBottomWidth: 0,
        marginBottom: 7,
        marginTop: 7,
        
      },
      itemNumber: {
        marginVertical: 10,
      },
    
      label: {
        color: Colors.primary,
        fontFamily: ApplicationStyles.textMsgFont,
        paddingLeft: 5,
        fontSize: wp('4.4%')
      },
      input: {
        borderColor:Colors.white,
        borderRadius: 0,
        borderWidth: 1,
        color: Colors.white,
        // fontFamily: ApplicationStyles.textMsgFont,
        padding: 10,
        // fontSize: wp('4%'),
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop:hp("3%")
      },
      inputError: {
        borderColor: Colors.error,
      },
      placeholder: {
        color: Colors.white,
        fontFamily: ApplicationStyles.textMsgFont,
        fontSize: wp('1.5%')
      },

  });
  
