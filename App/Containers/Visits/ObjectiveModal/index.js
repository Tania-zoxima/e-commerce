import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import TextArea from "App/Components/FormInput/TextArea";
import BlueButton from "../../../Components/BlueButton/BlueButton";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import CommonActions from "App/Stores/Common/Actions";
import VisitsActions from "App/Stores/Visits/Actions";
import { HelperService } from "App/Services/Utils/HelperService";
import SearchableDropdown from "App/Components/SearchableDropdown";
import Loading from "App/Components/Loading";
import InputText from "App/Components/FormInput/InputText";

class ObjectiveModal extends Component {
  render() {
    const {
      isVisible,

      onCloseModal,
      selectedObjective,
      addVisitData,
      addVisitToPlan,
      changePlannedSelectedObjective,
      changePlannedSelectedOtherObjective,
      objectListLoader,
      objectList,
      selectedOtherObjective,
      code,
    } = this.props;
    //  console.log("abcde",selectedOtherObjective)

    let body = (
      <View style={Style.container}>
        <View style={Style.modalContainer}>
          <Text
            style={
              code == "1" ? Style.questionHeading : Style.questionHeadingBlue
            }
          >
            Select Objective
          </Text>
          {/* {     objectListLoader?       
        <View>
            <Loading/>
         </View>   
        
        : 
        <> */}
          <View
            style={{
              height: hp("5%"),
              top: hp("-6"),
              width: wp("90%"),
              left: "-9.5%",
            }}
          >
            <SearchableDropdown
              dataSource={objectList}
              placeHolderText={"Select"}
              selectedValue={selectedObjective}
              onChange={(value) => changePlannedSelectedObjective(value)}
              placeholder={"Type or Select "}
              invalid={false}
              labelStyles={{ ...Style.pickerLabel, borderRadius: 5 }}
              customPickerStyles={{ ...Style.picker }}
              // label={'Reason'}
            />
          </View>
          {selectedObjective == "Others" ? (
            <InputText
              style={{
                height: hp("12%"),
                top: "-12%",
                borderRadius: 5,
                paddingBottom: 61,
              }}
              placeholder={"Enter Objective"}
              value={selectedOtherObjective}
              onChange={(value) => changePlannedSelectedOtherObjective(value)}
              //label={'Other*'}
            />
          ) : (
            []
          )}
          {/* </>
        } */}
          <TouchableOpacity
            // color="#F66A67"
            // title="Save"
            onPress={() => {
              selectedObjective
                ? addVisitToPlan({
                    ...addVisitData,
                    zx_visitobjective: selectedObjective,
                    zx_remarksforothers: selectedOtherObjective,
                  })
                : HelperService.showToast({
                    message: "Objective for visit is empty",
                    duration: 1000,
                    buttonText: "",
                  });
              onCloseModal();
            }}
            disabled={false}
            loading={false}
            style={
              code == "1"
                ? { ...Style.actionButton, ...Style.yesActionButton }
                : { ...Style.actionButton, ...Style.yesBlueActionButton }
            }
            textStyle={Style.actionButtonTextStyle}
          >
            {/* onCloseModal() */}

            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                padding: 5,
                textAlign: "center",
              }}
            >
              SAVE
            </Text>
          </TouchableOpacity>

          {/* <Button
		                    title= "Save"

                        
		                     onPress={() => { selectedObjective? addVisitToPlan({...addVisitData,   objective_c:	selectedObjective  ,  other_visit_objective_c: selectedOtherObjective}):	HelperService.showToast({ message: 'Objective for visit c is empty', duration: 1000, buttonText: '' });
                             onCloseModal()
                         }
                     }
		                    disabled={false}
		                    loading={false}
		                    style={{...Style.actionButton, ...Style.yesActionButton}}
		                    textStyle={Style.actionButtonTextStyle}
		                /> */}

          {/* </View> */}
        </View>
      </View>
    );

    // console.log("dgsjfhsdkfjsdgdgg", objectList)

    return (
      <Modal
        isVisible={isVisible}
        onBackdropPress={() => {
          onCloseModal();
          changePlannedSelectedObjective();
          changePlannedSelectedOtherObjective();
        }}
        animationIn={"slideInUp"}
      >
        {body}
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  searchFilters: state.visits.planVisit.searchFilters,
  objectList: state.common.objectiveList,
  selectedObjective: state.visits.planVisit.selectedObjective,
  selectedOtherObjective: state.visits.planVisit.selectedOtherObjective,
  addVisitData: state.visits.addVisitData,
  // objectListLoader: state.visits. objectListLoader,
});

const mapDispatchToProps = (dispatch) => ({
  addVisitToPlan: (params) => dispatch(VisitsActions.addVisitToPlan(params)),
  changePlannedSelectedObjective: (params) =>
    dispatch(VisitsActions.changePlannedSelectedObjective(params)),
  changePlannedSelectedOtherObjective: (params) =>
    dispatch(VisitsActions.changePlannedSelectedOtherObjective(params)),

  hideObjectiveModal: () => dispatch(CommonActions.hideObjectiveModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ObjectiveModal);

const Style = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: Colors.white,
  },
  modalHeading: {
    color: Colors.primary,
    fontSize: wp("4.5%"),
    fontFamily: ApplicationStyles.textMsgFont,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  questionHeading: {
    color: Colors.background,
    fontSize: wp("4.8%"),
    fontFamily: ApplicationStyles.textMsgFont,
    marginBottom: hp("11%"),
    top: hp("3%"),
  },
  questionHeadingBlue: {
    color: Colors.bluebackground,
    fontSize: wp("4.8%"),
    fontFamily: ApplicationStyles.textMsgFont,
    marginBottom: hp("11%"),
    top: hp("3%"),
  },
  actionButtonTextStyle: {
    fontSize: wp("5%"),
  },
  actionButton: {
    width: wp("20%"),
    height: hp("4%"),
    borderRadius: hp("0.2%"),
    top: "-10%",
  },
  yesActionButton: {
    backgroundColor: "#ed1b24",
  },
  yesBlueActionButton: {
    backgroundColor: Colors.bluebackground,
  },
  noActionButton: {
    backgroundColor: "#D71E22",
  },
  actionContainer: {
    flexDirection: "row",
    marginTop: hp("2.5%"),
    width: "100%",
    justifyContent: "space-around",
  },
  container: {
    margin: 0,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    height: hp("35%"),
  },

  picker: {
    top: hp("1%"),
    // borderRadius: 8,
    width: wp("70%"),
    // height: hp('5.7%'),
    // marginBottom: hp('20%'),
    // paddingHorizontal: wp("2%"),
    marginLeft: wp("21%"),
  },
  pickerLabel: {
    color: Colors.grey,
    fontFamily: ApplicationStyles.textFont,
    textAlign: "left",
    width: "99%",
    padding: 10,
    flexDirection: "row",
  },
});
