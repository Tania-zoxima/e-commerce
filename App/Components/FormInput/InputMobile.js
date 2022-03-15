import React from "react";
import { View } from "react-native";
import { Item, Input, InputGroup, Icon, Label } from "native-base";
import Style from "./InputStyles";

const InputMobile = ({
  placeholder = "",
  onChange = () => {},
  styles = {},
  value = "",
  error = false,
  label = "",
  editable = true,
  maxLength,
}) => (
  <>
    {label ? <Label style={{ ...Style.label }}>{label}</Label> : []}
    <Item style={{ ...Style.item }}>
      <Input
        value={String(value || "")}
        placeholder={placeholder}
        style={
          error
            ? { ...Style.input1, ...Style.inputError, ...styles }
            : { ...Style.input1, ...styles }
        }
        onChangeText={(event) => onChange(event)}
        keyboardType={"phone-pad"}
        placeholderTextColor={Style.placeholder.color}
        editable={editable}
        maxLength={maxLength}
      />
    </Item>
  </>
);

export default InputMobile;
