import React from "react";
import { View,StyleSheet} from "react-native";
import { Item, Input, Label } from "native-base";
import { Colors, ApplicationStyles } from 'App/Theme'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const LoginInputText = ({
  placeholder = "",
  onChange = () => {},
  style = {},
  value = "",
  error = false,
  label = "",
  multiline = false,
  numberOfLines = 4,
  editable = true,
}) => (
  <>
    {label ? <Label style={{ ...Style.label }}>{label}</Label> : []}
    <Item style={{ ...Style.item }}>
      <Input
        value={String(value || "")}
        placeholder={placeholder}
        style={
          error
            ? { ...Style.input, ...Style.inputError, ...style }
            : { ...Style.input, ...style }
        }
        onChangeText={(event) => onChange(event)}
        placeholderTextColor={Style.placeholder.color}
        multiline={multiline}
        numberOfLines={numberOfLines}
        editable={editable}
      />
    </Item>
  </>
);

export default LoginInputText;
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
  