import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { ApplicationStyles, Colors } from "App/Theme";
import AgentInfo from "../../Components/AgentInfo/AgentInfo";
import { HelperService } from "../../Services/Utils/HelperService";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const Info = ({ details }) => {
  return (
    <View style={Styles.mainContainer}>
      <AgentInfo
        heading={"Employee Id"}
        value={
          details[0] && details[0].zx_employeecode
            ? details[0].zx_employeecode
            : "NA"
        }
      />
      <AgentInfo
        heading={"Alternate Phone no."}
        value={
          details[0] && details[0].zx_mobileno ? details[0].zx_mobileno : "NA"
        }
      />
      <AgentInfo
        heading={"Joining Date"}
        value={HelperService.dateReadableFormat(
          details[0] && details[0].zx_joiningdate
            ? details[0].zx_joiningdate
            : "NA"
        )}
      />
      <AgentInfo
        heading={"Manager"}
        value={
          details[2] && details[2][0].zx_firstname_namager
            ? details[2][0].zx_firstname_namager +
              " " +
              details[2][0].zx_lastname_namager
            : "NA"
        }
      />
      <AgentInfo
        heading={"Manager ID"}
        value={
          details[2] && details[2][0].zx_employeecode_namager
            ? details[2][0].zx_employeecode_namager
            : "NA"
        }
      />

      <View style={{ width: wp("40%"), margin: "5%" }}>
        <View>
          <Text
            style={{
              fontSize: 13,
              fontFamily: ApplicationStyles.textFont,
              color: Colors.lightGrey,
              left:wp("2%")
            }}
          >
            {"Area"}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              paddingTop: 13,
              justifyContent: "flex-start",
              flexWrap: "wrap",
              width:wp("80%")
            }}
          >
            {details[1] &&
              details[1].map((text) => (
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 13,
                    marginBottom: 10,
                    marginRight: 10,
                    marginTop: "2%",
                    padding: 10,
                    justifyContent: "center",
                    fontSize: 13,
                    top: "8%",
                    borderWidth: 2,
                    borderColor: Colors.tabBorder,
                    borderRadius: 25,
                    marginLeft: 5,
                    alignSelf: "center",
                  }}
                >
                  {text.zx_territoryname}
                </Text>
              ))}
          </View>
        </View>
      </View>
    </View>
  );
};
export default Info;

const Styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
});
