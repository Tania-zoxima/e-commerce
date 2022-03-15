import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import InputText from "App/Components/FormInput/InputText";
import { ApplicationStyles, Colors } from "App/Theme";
import Styles from "./AddParticipantStyle";

function AddParticipant() {
  return (
    <View>
      <Text
        style={{
          textAlign: "center",
          fontSize: 24,
          color: Colors.darkRedPink,
          fontWeight: "bold",
          marginTop: hp("0%"),
        }}
      >
        ADD PARTICIPANT DETAILS
      </Text>
      <ScrollView>
        <View style={Styles.outerView}>
          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Plumber Name</Text>
            <InputText
              style={Styles.placeholder}
              placeholder={"Enter Plumber Name"}
            />
          </View>

          <View style={{ ...Styles.textView1 }}>
            <Text style={Styles.textStyle}>Contact Number</Text>
            <InputText
              style={Styles.placeholder}
              placeholder={"Enter Contact Number"}
            />
          </View>
          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Aadhar Number</Text>
            <InputText
              style={Styles.placeholder}
              placeholder={"Enter Aadhar Number"}
            />
          </View>

          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>PAN Number</Text>
            <InputText
              style={Styles.placeholder}
              placeholder={"Enter PAN Number"}
            />
          </View>
          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Voter ID</Text>
            <InputText
              style={Styles.placeholder}
              placeholder={"Enter Voter ID"}
            />
          </View>
          <View style={Styles.textView1}>
            <Text style={Styles.textStyle}>Driving License no.</Text>
            <InputText
              style={Styles.placeholder}
              placeholder={"Enter Driving License no."}
            />
          </View>
        </View>
        <TouchableOpacity style={{backgroundColor:Colors.darkRedPink,width:wp("40%"),marginLeft:wp("25%"),height:hp("6%"),justifyContent:"center",borderRadius:10}}>
          <Text style={{color:Colors.white,textAlign:"center",fontSize:18,fontWeight:"bold"}}>SUBMIT</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default AddParticipant;
