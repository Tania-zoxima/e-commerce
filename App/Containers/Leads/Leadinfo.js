import React from "react";
import InputText from "App/Components/FormInput/InputText";
import {
  View,
  Text,
  Image,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Styles from "./CreateLeadScreenStyle";
import BlueButton from "../../Components/BlueButton";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SearchableDropdown from "App/Components/SearchableDropdown";

export default function Leadinfo() {
  return (
    <View style={{ ...Styles.outerView, left: "2.5%" }}>
      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Name *</Text>
        <InputText style={Styles.placeholder} placeholder={"Enter Name"} />
      </View>
      <View style={Styles.dropDown}>
        <Text style={Styles.textStyle}>Type*</Text>

        <View style={Styles.dropDownInner}>
          <SearchableDropdown placeHolderText={" Select Type"} />
        </View>
      </View>

      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Designation*</Text>
        <InputText
          style={Styles.placeholder}
          placeholder={"Enter Designation"}
        />
      </View>

      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Mobile No.*</Text>
        <InputText
          style={Styles.placeholder}
          placeholder={"Enter Mobile No."}
        />
      </View>
      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Alternate No.</Text>
        <InputText
          style={Styles.placeholder}
          placeholder={"Enter Alternate No."}
        />
      </View>
      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Landline No.</Text>
        <InputText
          style={Styles.placeholder}
          placeholder={"Enter Landline No."}
        />
      </View>
      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Email Id</Text>
        <InputText style={Styles.placeholder} placeholder={"Enter Email Id"} />
      </View>
      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Birthday</Text>
        <InputText style={Styles.placeholder} placeholder={"Select Date>"} />
      </View>
      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Anniversary</Text>
        <InputText style={Styles.placeholder} placeholder={"Select Date>"} />
      </View>
      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Name of Organization*</Text>
        <InputText
          style={Styles.placeholder}
          placeholder={"Enter Name of Organization"}
        />
      </View>
      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Address*</Text>
        <InputText style={Styles.placeholder} placeholder={"Enter Address"} />
      </View>
      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Landmark</Text>
        <InputText style={Styles.placeholder} placeholder={"Enter Landmark"} />
      </View>
      <View style={Styles.dropDown}>
        <Text style={Styles.textStyle}>Area</Text>
        <View style={Styles.dropDownInner}>
          <SearchableDropdown placeHolderText={" Select Area"} />
        </View>
      </View>
      <View style={Styles.dropDown}>
        <Text style={Styles.textStyle}>City</Text>
        <View style={Styles.dropDownInner}>
          <SearchableDropdown placeHolderText={" Select City"} />
        </View>
      </View>
      <View style={Styles.dropDown}>
        <Text style={Styles.textStyle}>State</Text>

        <View style={Styles.dropDownInner}>
          <SearchableDropdown placeHolderText={" Select State"} />
        </View>
      </View>
      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>District</Text>
        <InputText style={Styles.placeholder} placeholder={"Enter District"} />
      </View>

      <View style={Styles.dropDown}>
        <Text style={Styles.textStyle}>Zone</Text>

        <View style={Styles.dropDownInner}>
          <SearchableDropdown placeHolderText={" Select Zone"} />
        </View>
      </View>
      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Pincode*</Text>
        <InputText style={Styles.placeholder} placeholder={"Enter Pincode"} />
      </View>

      <View style={{ right: wp("-5%"), marginTop: hp("-1%") }}>
        <BlueButton style={{ ...Styles.button }} title={"SAVE"} />
      </View>
    </View>
  );
}
