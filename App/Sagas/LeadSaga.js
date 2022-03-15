import { put, call, take, select } from "redux-saga/effects";
import { ValidationService } from "App/Services/ValidationService";
import { Toast } from "native-base";
import NavigationService from "App/Services/NavigationService";
import { HelperService } from "App/Services/Utils/HelperService";
import { getConnectionStatus } from "App/Stores/Common/Selectors";
import ActionQueuesActions from "App/Stores/ActionQueues/Actions";
import { offlineApiCall } from "./OfflineSaga";
import { Alert } from "react-native";
import _ from "lodash";
import LeadActions from "App/Stores/Lead/Actions";
import { leadService } from "../Services/Api/LeadService";

export function* createLeadForm({ payload }) {
  yield put(LeadActions.createLeadFormLoading());
  try {
    let offlinActionData = {
      apiCall: leadService.createLead,
      resource: "createLead",
      callName: "create",
      params: HelperService.decorateWithLocalId(payload),
      timestamp: HelperService.getCurrentTimestamp(),
      successCallback: LeadActions.createLeadFormSuccess,
      failureCallback: LeadActions.createLeadFormFailure,
      replaceServerParams: false,
    };

    const successData = yield call(offlineApiCall, offlinActionData);
    if (successData) {
      //Todo : change it to userData
      yield put(LeadActions.createLeadFormSuccess({data:successData,payload:payload}));
      NavigationService.navigate("CreateLeadSuccess");
      yield put(LeadActions.clearForm());
      HelperService.showToast({
        message: "Opportunity Created Successfully",
        duration: 1000,
        buttonText: "",
      });
      // yield call(refreshVisitsDisplayList);
      //	yield call(refreshVisitsStorageList);
    } else {
      yield put(LeadActions.createLeadFormFailure());
      // console.log("eerorrr", error);
      HelperService.showToast({
        message: "Error Creating Opportunity",
        duration: 2000,
        buttonText: "Okay",
      });
    }
  } catch (error) {
    yield put(LeadActions.createLeadFormFailure());
    HelperService.showToast({
      message: "Error Creating Opportunity",
      duration: 2000,
      buttonText: "Okay",
    });
  }
}

export function* getLead({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(LeadActions.doNothing());
    return;
  }

  yield put(LeadActions.getLeadLoading());

  try {
    let successData = yield call(leadService.getLead, payload);
    if (successData) {
      yield put(LeadActions.getLeadSuccess(successData));
    } else {
      yield put(LeadActions.getLeadFailure());
    }
  } catch (error) {
    console.log("Error", error);
    yield put(LeadActions.getLeadFailure());
  }
}

export function* updateLead({ payload }) {
  console.log("payloaddddd", payload);
  yield put(LeadActions.updateLeadLoading());
  try {
    let offlinActionData = {
      apiCall: leadService.updateLead,
      resource: "updateLead", //specify for which reducer we are using it
      callName: "update", //specify operation
      params: HelperService.decorateWithLocalId(payload),
      timestamp: HelperService.getCurrentTimestamp(),
      successCallback: LeadActions.updateLeadSuccess,
      failureCallback: LeadActions.updateLeadFailure,
      replaceServerParams: false,
    };

    const successData = yield call(offlineApiCall, offlinActionData);

    if (successData) {
      yield put(LeadActions.updateLeadSuccess({data:successData,payload:payload}));
      NavigationService.navigate("UpdateLeadSuccess");
      HelperService.showToast({
        message: "Updated Successfully",
        duration: 1000,
        buttonText: "",
      });
      yield put(LeadActions.clearForm());
      
    } else {
      yield put(LeadActions.updateLeadFailure());
      HelperService.showToast({
        message: "Updation failed!! Try Again.",
        duration: 2000,
        buttonText: "Okay",
      });
    }
  } catch (error) {
    yield put(LeadActions.updateLeadFailure());
    HelperService.showToast({
      message: error,
      duration: 2000,
      buttonText: "Okay",
    });
    //   console.log(error);
  }
}
