import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import BackArrowButton from "App/Components/BackArrowButton";
import { ApplicationStyles, Colors } from "App/Theme";
import { Card } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SearchBar from "App/Components/SearchBar";
import GenericIcon from "App/Components/GenericIcon";
import NavigationService from "App/Services/NavigationService";
 import Styles from "./NewInfluencersStyle";
import InputText from "App/Components/FormInput/InputText";
import BlueButton from "../../../Components/BlueButton/BlueButton";
import SearchableDropdown from "App/Components/SearchableDropdown";

function AddInfluencerScreen() {
  return (
    <View style={Styles.mainContainer}>
        <Card style={Styles.cardstyle}>
          <View>
            <BackArrowButton style={Styles.backarrow} />
          </View>
          <Text style={{ ...Styles.titleText }}>
            {"Add"}
            <Text style={{ ...Styles.titleText, ...Styles.textClr }}>
              {" Influencer"}
            </Text>
          </Text>
        </Card>
      

      <ScrollView>
        <View style={Styles.outerView}>
          

           <View style={{ ...Styles.textView1 }}>
            <Text style={Styles.textStyle}>Influencer Name*</Text>
            <InputText style={Styles.placeholder} placeholder={"Enter Name"} />
          </View>
          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Phone no.*</Text>
            <InputText
              style={Styles.placeholder}
              placeholder={"Enter Phone no."}
            />
          </View> 
          <View style={Styles.dropDown}>
            <Text style={Styles.textStyle}>Type</Text>

            <View style={Styles.dropDownInner}>
              <SearchableDropdown
                // dataSource={this.props.agentAreas}
                placeHolderText={"Select Type"}
                // selectedValue={influencerForm.area__c}
                // onChange={(value) =>
                //   this.props.changeInfluencerForm({
                //     edited_field: "area__c",
                //     edited_value: value,
                //   })
                // }
                placeholder={"Select Type"}
                invalid={false}
                customPickerStyles={{ ...Styles.picker }}
                // labelStyles={{ ...Styles.pickerLabel }}
                // invalid={
                //   validation.invalid && validation.invalid_field == "area__c"
                // }
                //  label={"Area"}
              />
            </View>
            </View>
          
        <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Pincode</Text>
            <InputText
              style={Styles.placeholder}
              placeholder={"Enter Pincode"}
            />
          </View>

          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Potential Value</Text>
            <InputText
              style={Styles.placeholder}
              placeholder={"Enter Area"}
            />
          </View>

          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Remarks</Text>
            <InputText
              style={Styles.placeholder}
              placeholder={"Enter Remarks"}
            />
          </View>
          <View>
            <BlueButton style={Styles.button} title={"SUBMIT"} />
          </View>
        </View>
      </ScrollView>
    </View>
    
  );
}

export default AddInfluencerScreen;
