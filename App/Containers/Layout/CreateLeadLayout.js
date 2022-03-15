import React, { useState } from "react";
import {
  Platform,
  View,
  ActivityIndicator,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import GenericIcon from "App/Components/GenericIcon";
import { ApplicationStyles, Helpers, Images, Metrics, Colors } from "App/Theme";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Body,
  Text,
  Input,
  Item,
  Right,
  Segment,
} from "native-base";
import WhiteButton from "App/Components/WhiteButton";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Card } from "react-native-paper";
import BackArrowButton from "App/Components/BackArrowButton";
import CreateLeadTabs from "../Leads/CreateLeadsTabs";

function CreateLeadLayout() {
  const [text, setText] = useState("pending for approval");
  const [button, setButton] = useState("edit");

  return (
    <View>
      <Card style={Styles.card}>
        <BackArrowButton style={Styles.backarrow} />

        

        <Text style={{ ...Styles.titleText }}>
          {"Create"}
          <Text style={{ ...Styles.titleText, ...Styles.textClr }}>
            {" New Lead"}
          </Text>
        </Text>

        
      </Card>

      <Header style={{ ...Styles.header }}>
        <CreateLeadTabs />
      </Header>
    </View>
  );
}

export default CreateLeadLayout;
const Styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.white,
    borderBottomWidth: 0,
    height: hp("11%"),
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    paddingTop: hp("2%"),
    elevation: 2,
  },
  card: {
    flexDirection: "column",
    elevation: 10,
    backgroundColor: Colors.background,
    height: hp("10%"),
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 65,
    borderBottomRightRadius: 65,
  },

  titleText: {
    color: Colors.white,
    fontFamily: "Ubuntu",
    fontSize: 28,
    fontWeight: "bold",
    left: wp("19%"),
    
    top: hp("-2%"),
  },
  textClr: {
    color: Colors.black,
  },
  button: {
    left: wp("8.5%"),
    borderRadius: 6,
    height: hp("4.5%"),
    bottom: hp("3.5%"),
    width: wp(45),
  },
  button1: {
    left: wp("73%"),
    borderRadius: 6,
    height: hp("4.5%"),
    bottom: hp("1.5%"),
    paddingBottom: 1,
    width: wp("20%"),
  },
  buttontext: {
    fontFamily: "Lato",
    fontSize: 12,
    textTransform: "uppercase",
  },
  datePicker: {
    alignSelf: "center",
    backgroundColor: Colors.button,
    borderRadius: 100,
    flexDirection: "row",
    width: wp("43%"),
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  monthPicker: {
    alignSelf: "center",
    backgroundColor: Colors.button,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    width: wp("25%"),
  },
  dateText: {
    fontFamily: ApplicationStyles.textMediumFont,
    color: Colors.white,
    fontSize: wp("3.3%"),
    textTransform: "capitalize",
  },
  dateIcon: {
    color: Colors.white,
    fontSize: wp("7%"),
    marginLeft: 0,
    marginRight: 0,
    zIndex: 2,
    paddingLeft: wp("3%"),
  },
  dateChangeIcon: {
    color: Colors.button,
    alignSelf: "center",
    paddingHorizontal: wp("3%"),
    fontSize: wp("11%"),
  },
  psmPickerStyles: {
    marginTop: -5,
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: "8%",
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 25,
    elevation: 5,
    marginLeft: "5%",
  },
  actionButton: {
    borderWidth: 1.5,
    width: wp("20%"),
    height: 35,
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: Colors.clrF1F9FF,
    marginHorizontal: wp("1.2%"),
  },
  actionButtonText: {
    fontSize: wp("3%"),
    fontFamily: ApplicationStyles.textMediumFont,
  },
  selectedActionButton: {
    borderWidth: 1.5,
    width: wp("20%"),
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: Colors.clrF1F9FF,
    marginHorizontal: wp("1.2%"),
    height: 35,
  },
  refreshIcon: {
    color: Colors.primary,
    fontSize: wp("5%"),
    alignSelf: "center",
    padding: hp("1%"),
    paddingBottom: 0,
    position: "absolute",
    right: wp("3.3%"),
    marginTop: hp("16.5%"),
    zIndex: 2,
  },
  loadingIcon: {
    color: Colors.primary,
    fontSize: wp("6.9%"),
    alignSelf: "center",
    position: "absolute",
    right: wp("5.3%"),
    marginTop: hp("13.2%"),
    zIndex: 2,
  },
  backarrow: {
    color: Colors.white,
    fontSize: 32,
    paddingRight: 350,
    paddingTop: 2,
  },
  icon: {
    color: Colors.darkRedPink,
  },
});
