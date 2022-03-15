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
import DetailCard from "../../Components/DetailCard/DetailCard";
import DetailCardStrip from "../../Components/DetailCard/DetailCardStrip";
import SearchBar from "App/Components/SearchBar";
import GenericIcon from "App/Components/GenericIcon";
import NavigationService from "App/Services/NavigationService";
import InputText from "App/Components/FormInput/InputText";
import BlueButton from "../../Components/BlueButton";
import SearchableDropdown from "App/Components/SearchableDropdown";
import Uploadimage from "../Leads/Uploadimage";
import Styles from "./MeetStyles";

function NewMeet() {
  return (
    <View style={Styles.mainContainer}>
      <Card style={Styles.cardstyle}>
        <BackArrowButton style={Styles.backarrow} />
        <Text style={Styles.title}>{"New Meet "}</Text>
      </Card>
      <ScrollView>
        <View style={Styles.dropDown}>
          <Text style={Styles.textStyle}>Meet Type</Text>

          <View style={Styles.dropDownInner}>
            <SearchableDropdown
              // dataSource={this.props.agentAreas}
              placeHolderText={"Select Meet Type"}
              // selectedValue={influencerForm.area__c}
              // onChange={(value) =>
              //   this.props.changeInfluencerForm({
              //     edited_field: "area__c",
              //     edited_value: value,
              //   })
              // }
              placeholder={"Select Meet Type"}
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
        <View style={Styles.outerView}>
          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Firm Name*</Text>
            <InputText
              style={Styles.placeholder}
              placeholder={"Enter Firm Name"}
            />
          </View>

          <View style={{ ...Styles.textView1 }}>
            <Text style={Styles.textStyle}>Contact Person</Text>
            <InputText
              style={Styles.placeholder}
              placeholder={"Enter Contact Person"}
            />
          </View>
          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Contact Number</Text>
            <InputText
              style={Styles.placeholder}
              placeholder={"Enter Contact Number"}
            />
          </View>

          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Area</Text>
            <InputText style={Styles.placeholder} placeholder={"Enter Area"} />
          </View>
          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Workshop Date</Text>
            <InputText
              style={Styles.placeholder}
              placeholder={"Enter Workshop Date"}
            />
          </View>

          <View style={Styles.textView}>
            <Text style={Styles.textStyle}>From</Text>
            <InputText style={Styles.placeholder} placeholder={"Enter Date"} />
          </View>

          <View style={{ ...Styles.textView, left: wp("10%") }}>
            <Text style={Styles.textStyle}>To</Text>
            <InputText style={Styles.placeholder} placeholder={"Enter Date"} />
          </View>
          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Amount</Text>
            <InputText
              style={Styles.placeholder}
              placeholder={"Enter Amount"}
            />
          </View>
          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Remarks</Text>
            <InputText
              style={Styles.placeholder}
              placeholder={"Enter Remarks"}
            />
          </View>
          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>PRS Number</Text>
            <InputText
              style={Styles.placeholder}
              placeholder={"Enter PRS Number"}
            />
          </View>

          <View>
            <BlueButton style={Styles.button} title={"SAVE"} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default NewMeet;
