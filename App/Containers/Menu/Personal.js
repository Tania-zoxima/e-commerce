import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { ApplicationStyles, Colors } from "App/Theme";
import DatePicker from "App/Components/DatePicker";
import GenericIcon from "App/Components/GenericIcon";
import AgentPersonal from "../../Components/AgentInfo/AgentPersonal";
import { HelperService } from '../../Services/Utils/HelperService';
const Personal= ({ details}) => {
  
  return (
    <View style={Styles.mainContainer}>
      <AgentPersonal heading={"First Name"} value={details[0]&&details[0].zx_firstname?details[0].zx_firstname:'NA'}/>
      <AgentPersonal heading={"Last Name"} value={details[0]&&details[0].zx_lastname?details[0].zx_lastname:'NA'}/>
      <AgentPersonal heading={"Phone no."} value={details[0]&&details[0].zx_mobileno?details[0].zx_mobileno:'NA'}/>
      <AgentPersonal heading={"Whatsapp no."} value={details[0]&&details[0].zx_mobileno?details[0].zx_mobileno:'NA'}/>
      <AgentPersonal heading={"Email ID"} value={details[0]&&details[0].zx_emailid?details[0].zx_emailid:'NA'}/>
      <AgentPersonal heading={"Date of Birth"} value={HelperService.dateReadableFormat(details[0]&&details[0].zx_birthdaydate?details[0].zx_birthdaydate:'NA')}/>
      <AgentPersonal heading={"Anniversary date"} value={HelperService.dateReadableFormat(details[0]&&details[0].zx_marriageanniversarydate?details[0].zx_marriageanniversarydate:'NA')}/>
      {/* <AgentPersonal heading={"State"} value={details&&details.zx_designatioin?details.zx_designatioin:'NA'}/>
      <AgentPersonal heading={"City"} value={details&&details.zx_designatioin?details.zx_designatioin:'NA'}/>
      <AgentPersonal heading={"Address"} value={details&&details.zx_designatioin?details.zx_designatioin:'NA'}/> */}
      
     
    </View>
  );
}

export default Personal;

const Styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },

  
});
