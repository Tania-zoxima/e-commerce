import React, { Component } from "react";
import { View, Alert, ScrollView, FlatList } from "react-native";
import { Button, Text } from "native-base";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Style from "./EditVisitCardStyles";
import BlueButton from "App/Components/BlueButton";
import WhiteButton from "App/Components/WhiteButton";
import NavigationService from "App/Services/NavigationService";
import { HelperService } from "App/Services/Utils/HelperService";
import PlannedVisitCard from "App/Containers/Visits/PlannedVisitCard";
import Loading from "App/Components/Loading";
import GenericIcon from "App/Components/GenericIcon";
import NoDataFound from "App/Components/NoDataFound";
import RetailersActions from "App/Stores/Retailers/Actions";
import VisitsActions from "App/Stores/Visits/Actions";
import CommonActions from "App/Stores/Common/Actions";
import { Colors, ApplicationStyles } from "App/Theme";
import TextArea from "App/Components/FormInput/TextArea";
import DatePicker from "App/Components/DatePicker";
import DatePickerStyles from "App/Components/DatePicker/DatePickerStyles";
import SearchableDropdown from "App/Components/SearchableDropdown";
import _ from "lodash";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

class EditVisitCard extends React.Component {
  componentDidMount() {
    const { data, updateVisitFormChange } = this.props;
    //console.log(data)
    updateVisitFormChange({
      edited_field: "updatedvisitdate",
      edited_value: HelperService.convertMomentDateToTimestamp(
        data.zx_visitdate
      ),
    });
  }

  componentWillUnmount() {
    const { updateVisitFormChange } = this.props;

    // updateVisitFormChange({
    // 	edited_field: 'visitDate',
    // 	edited_value: null
    // });

    // updateVisitFormChange({
    // 	edited_field: 'psm',
    // 	edited_value: ''
    // });

    // updateVisitFormChange({
    // 	edited_field: 'summary',
    // 	edited_value: ''
    // });

    // updateVisitFormChange({
    // 	edited_field: 'cancelRemarks',
    // 	edited_value: ''
    // });
  }

  onEditSubmit() {
    const {
      data,
      token,
      agentid,
      editVisit,
      editVisitData,
      editVisitValidationFailed,
    } = this.props;
    if (!editVisitData.reason) {
      HelperService.showToast({
        message: "Please enter reason for rescheduling before submitting.",
        duration: 2000,
        buttonText: "Okay",
        position: "top",
      });

      editVisitValidationFailed({
        invalid_field: "reason",
      });
      return;
    }
    editVisit({
      form: {
        visit_id: data.zx_visitsid,
        // updatedvisitdate: editVisitData.updatedvisitdate || data.zx_visitdate,
        reasonforreschedulingvisit: editVisitData.reason,
        // reason: ,
        // team__c:agentid,
        // status__c	 : "Planned",
        // psm__c		 : editVisit.psm || agentid,
        // summary__c	 : editVisit.summary,
        
        zx_updatedvisitdateinstring:HelperService.dateReadableFormatWithHyphen(editVisitData.updatedvisitdate || data.zx_visitdate),
        zx_currenrtdate:HelperService.dateReadableFormats(),

        //agentid 	 : agentid
      },
      token,
    });
  }

  onCancelSubmit() {
    const {
      data,
      token,
      agentid,
      cancelVisit,
      editVisitData,
      editVisitValidationFailed,
    } = this.props;

    if (!editVisitData.cancelRemarks) {
      HelperService.showToast({
        message: "Please enter remarks before submitting.",
        duration: 2000,
        buttonText: "Okay",
        position: "top",
      });

      editVisitValidationFailed({
        invalid_field: "cancelRemarks",
      });
      return;
    }

    cancelVisit({
      visit_id: data.pg_id__c || data.sfid,
      token: token,
      //	agentid				: agentid,
      status__c: "Cancelled",
      cancelled_reason__c: editVisitData.cancelRemarks,
    });
  }

  render() {
    const {
      edit,
      data,
      isASM,
      cancel,
      psmList,
      editVisitLoader,
      cancelVisitLoader,
      updateVisitFormChange,
      editVisitData,
      editVisit,
      cancelVisit,
      validation,
      code
    } = this.props;

    if (cancel) {
      return (
        <View
          style={{
            padding: 20,
            alignSelf: "center",
            backgroundColor: Colors.white,
            flex: 0.8,
            justifyContent: "center",
          }}
        >
          <ScrollView>
            <Text style={Style.title}>{"Remarks*"}</Text>
            <TextArea
              placeholder={"Cancellation Remarks..."}
              numberOfLines={5}
              value={editVisitData.cancelRemarks}
              error={
                validation.invalid &&
                validation.invalid_field == "cancelRemarks"
              }
              onChange={(text) =>
                updateVisitFormChange({
                  edited_field: "cancelRemarks",
                  edited_value: text,
                })
              }
            />
            <BlueButton
              title={"Submit"}
              style={{
                marginTop: 20,
                width: "60%",
                height: 50,
                alignSelf: "center",
              }}
              textStyle={{
                fontSize: 20,
                fontFamily: ApplicationStyles.textMsgFont,
              }}
              loading={cancelVisitLoader}
              onPress={() => this.onCancelSubmit()}
            />
          </ScrollView>
        </View>
      );
    }

    if (edit) {
      let datePickerNode = (
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Text style={Style.detail}>
            {`${HelperService.dateReadableFormat(editVisitData.updatedvisitdate)}  `}

            {/* <Text style={{color: Colors.button, fontSize: 13}}>{'Reschedule Visit Date'}</Text> */}
          </Text>
          <GenericIcon
            name="create"
            style={{
              color: Colors.white,
              fontSize: 22,
              marginTop: 7,
              marginLeft: -15,
            }}
          />
        </View>
      );

      let psmListNode = [];
      if (isASM) {
        psmListNode = (
          <View>
            <Text style={{ ...Style.title, marginTop: 20 }}>{"Assign To"}</Text>
            <SearchableDropdown
              dataSource={psmList}
              placeHolderText={"Select PSM"}
              selectedValue={editVisitData.psm}
              onChange={(value) =>
                updateVisitFormChange({
                  edited_field: "psm",
                  edited_value: value,
                })
              }
              placeholder={"Type or Select PSM"}
              invalid={false}
              customPickerStyles={Style.pickerStyles}
            />
          </View>
        );
      }

      return (
        <View style={{ marginTop: hp("10%") }}>
          <View
            style={{
              marginLeft: "30%",
              backgroundColor: code.zx_brandgroupcode=="1"?Colors.darkRedPink:Colors.bluebackground,
              width: wp("40%"),
              height: hp("5%"),
              borderRadius: 8,
            }}
          >
            <DatePicker
              allowRangeSelection={false}
              minDate={HelperService.getNextNDayTimestamp(1)}
              selectedStartDate={editVisitData.updatedvisitdate}
              selectedEndDate={editVisitData.updatedvisitdate}
              onDateChange={(params) =>
                updateVisitFormChange({
                  edited_field: "updatedvisitdate",
                  edited_value: params.selectedStartDate,
                })
              }
            >
              {datePickerNode}
            </DatePicker>
            {
              //psmListNode
            }
            {
              //<Text style={{...Style.title, marginTop: 20}}>
              //{'Summary'}
              //</Text>
              // <TextArea
              //	error={validation.invalid && validation.invalid_field == 'summary'}
              //	placeholder={'Summary'}
              //numberOfLines={3}
              //value={editVisitData.summary}
              //onChange={(text) => updateVisitFormChange({edited_field: 'summary', edited_value: text})}
              ///>
            }
          </View>
          <View style={{ marginLeft: wp("15%"), marginTop: hp("8%") }}>
            <Text
              style={{
                color: code.zx_brandgroupcode=="1"?Colors.darkRedPink:Colors.bluebackground,
                fontSize: 20,
                paddingBottom: hp("1%"),
                marginLeft: wp("25%"),
              }}
            >
              Reason
            </Text>
            <TextArea
              placeholder={"Reason for rescheduling visit..."}
              numberOfLines={5}
              style={{
                height: hp("13%"),
                borderWidth: 0.8,
                borderColor: Colors.lightGrey,
                width: wp("70%"),
                marginLeft: wp("-15%"),
              }}
              value={editVisitData.reason}
              error={validation.invalid && validation.invalid_field == "reason"}
              onChange={(text) =>
                updateVisitFormChange({
                  edited_field: "reason",
                  edited_value: text,
                })
              }
            />
            {/* style={{height: hp("13%"),borderWidth:0.8,borderColor:Colors.lightGrey,width:wp("70%")}} */}
          </View>
          <View style={{ marginTop: "15%" }}>
            <BlueButton
              title={"Save"}
              style={code.zx_brandgroupcode=="1"?{
                //marginTop: '5%',
                height: "45%",
                alignSelf: "center",
                textAlign: "center",
                paddingHorizontal: 40,
                width: "30%",
                borderRadius: 10,
              }:{
                //marginTop: '5%',
                height: "45%",
                alignSelf: "center",
                textAlign: "center",
                paddingHorizontal: 40,
                width: "30%",
                borderRadius: 10,
                backgroundColor:Colors.bluebackground
              }}
              textStyle={{
                fontSize: 20,
                fontFamily: ApplicationStyles.textMsgFont,
                textAlign: "center",
              }}
              loading={editVisitLoader}
              onPress={() => this.onEditSubmit()}
            />
          </View>
        </View>
      );
    }

    return [];
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid: state.user.id,
  editVisitData: state.visits.editVisit.formData,
  cancelVisitLoader: state.visits.editVisit.cancelVisitLoader,
  editVisitLoader: state.visits.editVisit.editVisitLoader,
  validation: state.visits.editVisit.editVisitValidation,
  isASM: state.user.isASM,
  psmList: state.user.psmList,
  code: state.user.user_details,
});

const mapDispatchToProps = (dispatch) => ({
  fetchRetailers: (params) => dispatch(RetailersActions.fetchRetailers(params)),
  addVisitToPlan: (params) => dispatch(VisitsActions.addVisitToPlan(params)),
  openModal: (params) => dispatch(CommonActions.openModal(params)),
  cancelVisit: (params) => dispatch(VisitsActions.cancelVisit(params)),
  editVisit: (params) => dispatch(VisitsActions.editVisit(params)),
  cancelVisitLoadingStop: () =>
    dispatch(VisitsActions.cancelVisitLoadingStop()),
  editVisitLoadingStop: () => dispatch(VisitsActions.editVisitLoadingStop()),
  updateVisitFormChange: (params) =>
    dispatch(VisitsActions.updateVisitFormChange(params)),
  editVisitValidationFailed: (params) =>
    dispatch(VisitsActions.editVisitValidationFailed(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditVisitCard);
