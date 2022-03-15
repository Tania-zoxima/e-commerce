import React, { Component } from "react";
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
import Styles from "./CompetitorInfoStyles";
import InputText from "App/Components/FormInput/InputText";
import BlueButton from "../../Components/BlueButton";
import SearchableDropdown from "App/Components/SearchableDropdown";
import Uploadimage from "../Leads/Uploadimage";
import CompetitorActions from "App/Stores/Competitor/Actions";
import { connect } from "react-redux";
import SelectDate from "../../Components/SelectDate/SelectDate";
import { HelperService } from "App/Services/Utils/HelperService";
import DistributorActions from "App/Stores/Distributor/Actions";
import SelectBox from "react-native-multi-selectbox";
import { xorBy } from "lodash";
import MultipleImagePicker from "App/Components/ImagePicker/MultipleImagePicker";
import CommonActions from "App/Stores/Common/Actions";
import ImageSlider from "../../Components/Imageslide";
import GenericDisplayCardStrip from "App/Components/GenericDisplayCard/GenericDisplayCardStrip";

class CompetitorDetail extends Component {
  getImage() {
    let record = this.props.navigation.state.params;
    let globArr = [];
    let arr = record.recordid.zx_attachments;
    let answ = arr.split(",");
    answ.forEach(function(obj) {
      globArr.push(obj);
    });
    // console.log(globArr);
    return globArr;
  }
  render() {
    const { code, openModal } = this.props;
    let record = this.props.navigation.state.params;
    console.log("jjjjjjj", record);
    return (
      <View style={Styles.mainContainer}>
        <Card
          style={
            code.zx_brandgroupcode == "1"
              ? Styles.cardstyle1
              : Styles.cardstyleBlue1
          }
        >
          <BackArrowButton style={Styles.backarrow} />
          <Text style={{ ...Styles.title, fontSize: 20, left: wp("15%") }}>
            {"Competitor "}
            <Text style={{ ...Styles.titleText, fontSize: 20 }}>
              {"Scheme Info"}
            </Text>
          </Text>
        </Card>

        <ScrollView style={{ height: hp("80%"), bottom: hp("5%") }}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: wp("70%"),
                borderWidth: 1,
                borderColor: Colors.black,
                marginTop: hp("1.5%"),
                justifyContent: "space-evenly",
              }}
            >
              <Text
                style={{
                  fontFamily: "Segoe UI",
                  color: Colors.black,
                  fontSize: 15,
                  fontWeight: "bold",
                  width: wp("30%"),
                  textAlignVertical: "center",
                  textAlign: "center",
                }}
              >
                Record No
              </Text>
              <Text
                style={{
                  borderColor: "transparent",
                  fontFamily: "Segoe UI",
                  color: Colors.grey,
                  fontSize: 15,
                  fontWeight: "bold",
                  width: wp("30%"),
                  textAlign: "center",
                }}
              >
                {"CSI-" + record.recordid.zx_recordno}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: wp("70%"),
                borderWidth: 1,
                borderColor: Colors.black,
                marginTop: hp("1.5%"),
                justifyContent: "space-evenly",
              }}
            >
              <Text
                style={{
                  fontFamily: "Segoe UI",
                  color: Colors.black,
                  fontSize: 15,
                  fontWeight: "bold",
                  width: wp("30%"),
                  textAlign: "center",
                  textAlignVertical: "center",
                }}
              >
                Created On
              </Text>
              <Text
                style={{
                  borderColor: "transparent",
                  fontFamily: "Segoe UI",
                  color: Colors.grey,
                  fontSize: 15,
                  fontWeight: "bold",
                  width: wp("30%"),
                  textAlign: "center",
                }}
              >
                {HelperService.dateReadableFormat(record.recordid.createdon)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: wp("70%"),
                borderWidth: 1,
                borderColor: Colors.black,
                marginTop: hp("1.5%"),
                justifyContent: "space-evenly",
              }}
            >
              <Text
                style={{
                  fontFamily: "Segoe UI",
                  color: Colors.black,
                  fontSize: 15,
                  fontWeight: "bold",
                  width: wp("30%"),
                  textAlign: "center",
                  textAlignVertical: "center",
                }}
              >
                Competitor Name
              </Text>
              <Text
                style={{
                  borderColor: "transparent",
                  fontFamily: "Segoe UI",
                  color: Colors.grey,
                  fontSize: 15,
                  fontWeight: "bold",
                  width: wp("30%"),
                  textAlign: "center",
                }}
              >
                {record.recordid.competitorName}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: wp("70%"),
                borderWidth: 1,
                borderColor: Colors.black,
                marginTop: hp("1.5%"),
                justifyContent: "space-evenly",
              }}
            >
              <Text
                style={{
                  fontFamily: "Segoe UI",
                  color: Colors.black,
                  fontSize: 15,
                  fontWeight: "bold",
                  width: wp("30%"),
                  textAlign: "center",
                  textAlignVertical: "center",
                }}
              >
                Sales Person Name
              </Text>
              <Text
                style={{
                  borderColor: "transparent",
                  fontFamily: "Segoe UI",
                  color: Colors.grey,
                  fontSize: 15,
                  fontWeight: "bold",
                  width: wp("30%"),
                  textAlign: "center",
                }}
              >
                {record.recordid.zx_firstname +
                  " " +
                  record.recordid.zx_lastname}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: wp("70%"),
                borderWidth: 1,
                borderColor: Colors.black,
                marginTop: hp("1.5%"),
                justifyContent: "space-evenly",
              }}
            >
              <Text
                style={{
                  fontFamily: "Segoe UI",
                  color: Colors.black,
                  fontSize: 15,
                  fontWeight: "bold",
                  width: wp("30%"),
                  textAlign: "center",
                  textAlignVertical: "center",
                }}
              >
                State Head Name
              </Text>
              <Text
                style={{
                  borderColor: "transparent",
                  fontFamily: "Segoe UI",
                  color: Colors.grey,
                  fontSize: 15,
                  fontWeight: "bold",
                  width: wp("30%"),
                  textAlign: "center",
                }}
              >
                {record.recordid.stateHeadfirstname +
                  " " +
                  record.recordid.stateHeadlastname}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: wp("70%"),
                borderWidth: 1,
                borderColor: Colors.black,
                marginTop: hp("1.5%"),
                justifyContent: "space-evenly",
              }}
            >
              <Text
                style={{
                  fontFamily: "Segoe UI",
                  color: Colors.black,
                  fontSize: 15,
                  fontWeight: "bold",
                  width: wp("30%"),
                  textAlign: "center",
                  textAlignVertical: "center",
                }}
              >
                Category
              </Text>
              <Text
                style={{
                  borderColor: "transparent",
                  fontFamily: "Segoe UI",
                  color: Colors.grey,
                  fontSize: 15,
                  fontWeight: "bold",
                  width: wp("30%"),
                  textAlign: "center",
                }}
              >
                {record.recordid.zx_itemclasscode}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: wp("70%"),
                borderWidth: 1,
                borderColor: Colors.black,
                marginTop: hp("1.5%"),
                justifyContent: "space-evenly",
              }}
            >
              <Text
                style={{
                  fontFamily: "Segoe UI",
                  color: Colors.black,
                  fontSize: 15,
                  fontWeight: "bold",
                  width: wp("30%"),
                  textAlign: "center",
                  textAlignVertical: "center",
                }}
              >
                From Date
              </Text>
              <Text
                style={{
                  borderColor: "transparent",
                  fontFamily: "Segoe UI",
                  color: Colors.grey,
                  fontSize: 15,
                  fontWeight: "bold",
                  width: wp("30%"),
                  textAlign: "center",
                }}
              >
                {HelperService.dateReadableFormat(record.recordid.zx_fromdate)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: wp("70%"),
                borderWidth: 1,
                borderColor: Colors.black,
                marginTop: hp("1.5%"),
                justifyContent: "space-evenly",
              }}
            >
              <Text
                style={{
                  fontFamily: "Segoe UI",
                  color: Colors.black,
                  fontSize: 15,
                  fontWeight: "bold",
                  width: wp("30%"),
                  textAlign: "center",
                  textAlignVertical: "center",
                }}
              >
                To Date
              </Text>
              <Text
                style={{
                  borderColor: "transparent",
                  fontFamily: "Segoe UI",
                  color: Colors.grey,
                  fontSize: 15,
                  fontWeight: "bold",
                  width: wp("30%"),
                  textAlign: "center",
                }}
              >
                {HelperService.dateReadableFormat(record.recordid.zx_todate)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: wp("70%"),
                borderWidth: 1,
                borderColor: Colors.black,
                marginTop: hp("1.5%"),
                justifyContent: "space-evenly",
              }}
            >
              <Text
                style={{
                  fontFamily: "Segoe UI",
                  color: Colors.black,
                  fontSize: 15,
                  fontWeight: "bold",
                  width: wp("30%"),
                  textAlign: "center",
                  textAlignVertical: "center",
                }}
              >
                Period(in Days)
              </Text>
              <Text
                style={{
                  borderColor: "transparent",
                  fontFamily: "Segoe UI",
                  color: Colors.grey,
                  fontSize: 15,
                  fontWeight: "bold",
                  width: wp("30%"),
                  textAlign: "center",
                }}
              >
                {record.recordid.zx_periodindays}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: wp("70%"),
                borderWidth: 1,
                borderColor: Colors.black,
                marginTop: hp("1.5%"),
                justifyContent: "space-evenly",
              }}
            >
              <Text
                style={{
                  fontFamily: "Segoe UI",
                  color: Colors.black,
                  fontSize: 15,
                  fontWeight: "bold",
                  width: wp("30%"),
                  textAlign: "center",
                  textAlignVertical: "center",
                }}
              >
                State Name
              </Text>
              <Text
                style={{
                  borderColor: "transparent",
                  fontFamily: "Segoe UI",
                  color: Colors.grey,
                  fontSize: 15,
                  fontWeight: "bold",
                  width: wp("30%"),
                  textAlign: "center",
                }}
              >
                {record.recordid.stateName}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                width: wp("70%"),
                borderWidth: 1,
                borderColor: Colors.black,
                marginTop: hp("1.5%"),
                justifyContent: "space-evenly",
              }}
            >
              <Text
                style={{
                  fontFamily: "Segoe UI",
                  color: Colors.black,
                  fontSize: 15,
                  fontWeight: "bold",
                  width: wp("30%"),
                  textAlign: "center",
                  textAlignVertical: "center",
                }}
              >
                District Name
              </Text>
              <Text
                style={{
                  borderColor: "transparent",
                  fontFamily: "Segoe UI",
                  color: Colors.grey,
                  fontSize: 15,
                  fontWeight: "bold",
                  width: wp("30%"),
                  textAlign: "center",
                }}
              >
                {record.recordid.districtName}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: wp("70%"),
                borderWidth: 1,
                borderColor: Colors.black,
                marginTop: hp("1.5%"),
                justifyContent: "space-evenly",
              }}
            >
              <Text
                style={{
                  fontFamily: "Segoe UI",
                  color: Colors.black,
                  fontSize: 15,
                  fontWeight: "bold",
                  width: wp("30%"),
                  textAlign: "center",
                  textAlignVertical: "center",
                }}
              >
                Zone Name
              </Text>
              <Text
                style={{
                  borderColor: "transparent",
                  fontFamily: "Segoe UI",
                  color: Colors.grey,
                  fontSize: 15,
                  fontWeight: "bold",
                  width: wp("30%"),
                  textAlign: "center",
                }}
              >
                {record.recordid.zoneName}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: wp("70%"),
                borderWidth: 1,
                borderColor: Colors.black,
                marginTop: hp("1.5%"),
                justifyContent: "space-evenly",
              }}
            >
              <Text
                style={{
                  fontFamily: "Segoe UI",
                  color: Colors.black,
                  fontSize: 15,
                  fontWeight: "bold",
                  width: wp("30%"),
                  textAlign: "center",
                  textAlignVertical: "center",
                }}
              >
                SubState Name
              </Text>
              <Text
                style={{
                  borderColor: "transparent",
                  fontFamily: "Segoe UI",
                  color: Colors.grey,
                  fontSize: 15,
                  fontWeight: "bold",
                  width: wp("30%"),
                  textAlign: "center",
                }}
              >
                {record.recordid.substateName}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: wp("70%"),
                borderWidth: 1,
                borderColor: Colors.black,
                marginTop: hp("1.5%"),
                justifyContent: "space-evenly",
              }}
            >
              <Text
                style={{
                  fontFamily: "Segoe UI",
                  color: Colors.black,
                  fontSize: 15,
                  fontWeight: "bold",
                  width: wp("30%"),
                  textAlign: "center",
                  textAlignVertical: "center",
                }}
              >
                City Name
              </Text>
              <Text
                style={{
                  borderColor: "transparent",
                  fontFamily: "Segoe UI",
                  color: Colors.grey,
                  fontSize: 15,
                  fontWeight: "bold",
                  width: wp("30%"),
                  textAlign: "center",
                }}
              >
                {record.recordid.citytownName}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: wp("70%"),
                borderWidth: 1,
                borderColor: Colors.black,
                marginTop: hp("1.5%"),
                justifyContent: "space-evenly",
              }}
            >
              <Text
                style={{
                  fontFamily: "Segoe UI",
                  color: Colors.black,
                  fontSize: 15,
                  fontWeight: "bold",
                  width: wp("30%"),
                  textAlign: "center",
                  textAlignVertical: "center",
                }}
              >
                Area Name
              </Text>
              <Text
                style={{
                  borderColor: "transparent",
                  fontFamily: "Segoe UI",
                  color: Colors.grey,
                  fontSize: 15,
                  fontWeight: "bold",
                  width: wp("30%"),
                  textAlign: "center",
                }}
              >
                {record.recordid.zx_territoryname}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: wp("70%"),
                borderWidth: 1,
                borderColor: Colors.black,
                marginTop: hp("1.5%"),
                justifyContent: "space-evenly",
              }}
            >
              <Text
                style={{
                  fontFamily: "Segoe UI",
                  color: Colors.black,
                  fontSize: 15,
                  fontWeight: "bold",
                  width: wp("30%"),
                  textAlign: "center",
                  textAlignVertical: "center",
                }}
              >
                Type Of Scheme
              </Text>
              <Text
                style={{
                  borderColor: "transparent",
                  fontFamily: "Segoe UI",
                  color: Colors.grey,
                  fontSize: 15,
                  fontWeight: "bold",
                  width: wp("30%"),
                  textAlign: "center",
                }}
              >
                {record.recordid.zx_typeofscheme}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: wp("70%"),
                borderWidth: 1,
                borderColor: Colors.black,
                marginTop: hp("1.5%"),
                justifyContent: "space-evenly",
              }}
            >
              <Text
                style={{
                  fontFamily: "Segoe UI",
                  color: Colors.black,
                  fontSize: 15,
                  fontWeight: "bold",
                  width: wp("30%"),
                  textAlign: "center",
                  textAlignVertical: "center",
                }}
              >
                Mode Of Scheme
              </Text>
              <Text
                style={{
                  borderColor: "transparent",
                  fontFamily: "Segoe UI",
                  color: Colors.grey,
                  fontSize: 15,
                  fontWeight: "bold",
                  width: wp("30%"),
                  textAlign: "center",
                }}
              >
                {record.recordid.zx_modeofscheme}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: wp("70%"),
                borderWidth: 1,
                borderColor: Colors.black,
                marginTop: hp("1.5%"),
                justifyContent: "space-evenly",
              }}
            >
              <Text
                style={{
                  fontFamily: "Segoe UI",
                  color: Colors.black,
                  fontSize: 15,
                  fontWeight: "bold",
                  width: wp("30%"),
                  textAlign: "center",
                  textAlignVertical: "center",
                }}
              >
                Remarks
              </Text>
              <Text
                style={{
                  borderColor: "transparent",
                  fontFamily: "Segoe UI",
                  color: Colors.grey,
                  fontSize: 15,
                  fontWeight: "bold",
                  width: wp("30%"),
                  textAlign: "center",
                }}
              >
                {record.recordid.zx_remarks}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: wp("70%"),
                borderWidth: 1,
                borderColor: Colors.black,
                marginTop: hp("1.5%"),
                justifyContent: "space-evenly",
              }}
            >
              <Text
                style={{
                  fontFamily: "Segoe UI",
                  color: Colors.black,
                  fontSize: 15,
                  fontWeight: "bold",
                  width: wp("30%"),
                  textAlign: "center",
                  textAlignVertical: "center",
                }}
              >
                Partner Type
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  width: wp("30%"),
                  textAlign: "center",
                  alignSelf: "center",
                  justifyContent: "center",
                }}
              >
                {record.recordid.zx_partnertype.map((item) => {
                  return (
                    <Text
                      style={{
                        borderColor: "transparent",
                        fontFamily: "Segoe UI",
                        color: Colors.grey,
                        fontSize: 13,
                        fontWeight: "bold",
                        textAlign: "center",
                        alignSelf: "center",
                      }}
                    >
                      {item}
                    </Text>
                  );
                })}
              </View>
            </View>
            <View
              style={{
                width: "70%",
                alignSelf: "center",
                marginTop: hp("3%"),
                borderWidth: 1,
                borderColor: Colors.black,
              }}
            >
              <GenericDisplayCardStrip
                key={"Image:"}
                label={"Image:"}
                labelStyle={{
                  fontFamily: "Segoe UI",
                  color: Colors.black,
                  fontSize: 15,
                  fontWeight: "bold",
                  width: wp("30%"),
                  textAlign: "center",
                  textAlignVertical: "center",
                }}
                value={
                  <Text
                    style={
                      record.recordid.zx_attachments
                        ? {
                            textDecorationLine: "underline",
                            color: Colors.black,
                          }
                        : {}
                    }
                    onPress={() => {
                      return openModal({
                        content: (
                          <View style={{ flex: 1, alignSelf: "center" }}>
                            <ImageSlider
                              images={
                                record.recordid.zx_attachments
                                  ? this.getImage()
                                  : []
                                // visitInfoForm.zx_visitattachment == null
                                //   ? []
                                //   : visitInfoForm.zx_visitattachment.split(" ")
                              }
                            />
                          </View>
                        ),
                        heading: "Preview",
                        bodyFlexHeight: 0.7,
                      });
                    }}
                  >
                    {record.recordid.zx_attachments ? "View" : "No file"}
                  </Text>
                }
                valueStyle={{
                  borderColor: "transparent",
                  fontFamily: "Segoe UI",
                  color: Colors.grey,
                  fontSize: 15,
                  fontWeight: "bold",
                  width: wp("30%"),
                  textAlign: "center",
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    agentid: state.user.id,
    code: state.user.user_details,
  };
};

const mapDispatchToProps = (dispatch) => ({
  openModal: (params) => dispatch(CommonActions.openModal(params)),
  closeModal: (params) => dispatch(CommonActions.closeModal(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CompetitorDetail);
