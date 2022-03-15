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
import Uploadimage from "./Uploadimage";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
export default function ProjectDetails() {
    return (
        <View style={{ ...Styles.outerView, left: "2.5%" }}>
          <View style={Styles.dropDown}>
        <Text style={Styles.textStyle}>Type*</Text>

        <View style={Styles.dropDownInner}>
          <SearchableDropdown placeHolderText={" Select Type"} />
        </View>
      </View>
      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Reference from*</Text>
        <InputText style={Styles.placeholder} placeholder={"Enter Reference"} />
      </View>
      <View style={Styles.dropDown}>
        <Text style={Styles.textStyle}>Pipeline stage*</Text>

        <View style={Styles.dropDownInner}>
          <SearchableDropdown placeHolderText={" Design stage"} />
        </View>
      </View>
      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Number of ongoing projects</Text>
        <InputText style={Styles.placeholder} placeholder={"Enter Number of ongoing projects"} />
      </View>
      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Number of upcoming projects</Text>
        <InputText style={Styles.placeholder} placeholder={"Enter Number of upcoming projects"} />
      </View>
      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Name of project*</Text>
        <InputText style={Styles.placeholder} placeholder={"Enter Name of project"} />
      </View>
      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Location *</Text>
        <InputText style={Styles.placeholder} placeholder={"Enter Location"} />
      </View>
      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Number of bathrooms*</Text>
        <InputText style={Styles.placeholder} placeholder={"Enter Number of bathrooms"} />
      </View>
      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Number of floors*</Text>
        <InputText style={Styles.placeholder} placeholder={"Enter Number of floors"} />
      </View>
      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Number of towers*</Text>
        <InputText style={Styles.placeholder} placeholder={"Enter Number of towers"} />
      </View>
      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Land area under development*</Text>
        <InputText style={Styles.placeholder} placeholder={"Enter Land area under development"} />
      </View>
      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Name of plumbing consultant</Text>
        <InputText style={Styles.placeholder} placeholder={"Enter Name of plumbing consultant"} />
      </View>
      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Name of architect</Text>
        <InputText style={Styles.placeholder} placeholder={"Enter Name of architect"} />
      </View>
      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Name of plumbing contractor</Text>
        <InputText style={Styles.placeholder} placeholder={"Enter Name of plumbing contractor"} />
      </View>
      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Tentative date of supply</Text>
        <InputText style={Styles.placeholder} placeholder={"Select date>"} />
      </View>
      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Project completion date</Text>
        <InputText style={Styles.placeholder} placeholder={"Select date>"} />
      </View>
      <View style={Styles.textView}>
          <View style={Styles.textView2}>
        <Text style={Styles.textStyle}>RERA number*</Text>
        <InputText style={Styles.placeholder} placeholder={"Enter RERA number"} />
        </View>
        <View style={{display:"flex",flexDirection:"column"}}>
        <Text style={{left:wp("21%"),fontSize:11,color:Colors.firozi,marginBottom:hp(1),marginTop:hp(1)}}>Image of proof</Text>
        <Uploadimage/>
        </View>
      </View>
      <View style={Styles.textView}>
          <View style={Styles.textView2}>
        <Text style={Styles.textStyle}>GST number*</Text>
        <InputText style={Styles.placeholder} placeholder={"Enter GST number"} />
        </View>
        <View style={{display:"flex",flexDirection:"column"}}>
        <Text style={{left:wp("21%"),fontSize:11,color:Colors.firozi,marginBottom:hp(1),marginTop:hp(1)}}>Image of proof</Text>
        <Uploadimage/>
        </View>
      </View>
      
      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Products Offered</Text>
        <InputText style={Styles.placeholder} placeholder={"Enter Products Offered"} />
      </View>
      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Products sold</Text>
        <InputText style={Styles.placeholder} placeholder={"Enter Products sold"} />
      </View>
      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Competitors</Text>
        <InputText style={Styles.placeholder} placeholder={"Enter Competitors"} />
      </View>
      <View style={{ right: wp("-5%"), marginTop: hp("-1%") }}>
        <BlueButton style={{ ...Styles.button }} title={"SAVE"} />
      </View>
        </View>
    )
}
