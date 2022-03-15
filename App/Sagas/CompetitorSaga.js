import { put, call, take, select } from "redux-saga/effects";
import CompetitorActions from "App/Stores/Competitor/Actions";
import CommonActions from "App/Stores/Common/Actions";
import { competitorService } from "App/Services/Api/CompetitorService";
import { ValidationService } from "App/Services/ValidationService";
import { Toast } from "native-base";
import NavigationService from "App/Services/NavigationService";
import { HelperService } from "App/Services/Utils/HelperService";
import { getConnectionStatus } from "App/Stores/Common/Selectors";
import ActionQueuesActions from "App/Stores/ActionQueues/Actions";
import { offlineApiCall } from "./OfflineSaga";
import { Alert } from "react-native";
import _ from "lodash";
import DistributorActions from "App/Stores/Distributor/Actions";

export function* createCompetitorForm({ payload }) {
  yield put(CompetitorActions.createCompetitorFormLoading());
  try {
    let offlinActionData = {
      apiCall: competitorService.createCompetitor,
      resource: "createCompetitor",
      callName: "create",
      params: HelperService.decorateWithLocalId(payload),
      timestamp: HelperService.getCurrentTimestamp(),
      successCallback: CompetitorActions.createCompetitorFormSuccess,
      failureCallback: CompetitorActions.createCompetitorFormFailure,
      replaceServerParams: false,
    };

    const successData = yield call(offlineApiCall, offlinActionData);
    if (successData) {
      //Todo : change it to userData
      yield put(
        CompetitorActions.createCompetitorFormSuccess({
          data: successData,
          payload: payload,
        })
      );
      NavigationService.navigate("CompetitorSuccess");
      HelperService.showToast({
        message: "Form Saved.",
        duration: 1000,
        buttonText: "",
      });
      yield put(CompetitorActions.clearCompetitorForm());
      yield put(DistributorActions.clearTerritory());
      // yield call(refreshVisitsDisplayList);
      //	yield call(refreshVisitsStorageList);
    } else {
      yield put(CompetitorActions.createCompetitorFormFailure());
      // console.log("eerorrr",error)
      HelperService.showToast({
        message: "Error Submitting form",
        duration: 2000,
        buttonText: "Okay",
      });
    }
  } catch (error) {
    yield put(CompetitorActions.createCompetitorFormFailure());
    HelperService.showToast({
      message: "Error Saving Form",
      duration: 2000,
      buttonText: "Okay",
    });
  }
}

//   export function* watchCreateDistributorRequest() {
// 	while (true) {
// 		const { payload } = yield take(DistributorTypes.SUBMIT_SELECTED_DISTRIBUTOR_FORM)

// 		 try {
// 		 	const validationFailed = yield call(ValidationService.validateDistributorForm, payload.form);
// 		 	if (validationFailed) {
// 			HelperService.showToast({ message: validationFailed.error_message, duration: 2000, buttonText: 'Okay' });
// 				yield put(DistributorActions.distributorFormValidationFailed(validationFailed));
// 				continue;
// 			}
// 		} catch (err) {
// 		console.log("rkkkkkk",err)
// 		 }

// 		yield call(createCompetitorForm, payload)
// 	}
// }

export function* getCompetitorName({ payload }) {
  const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
  if (!isOnline) {
    yield put(CompetitorActions.doNothing());
    return;
  }
  yield put(CompetitorActions.getCompetitorNameLoading());
  try {
    let successData = yield call(competitorService.getCompetitorName, payload);
    if (successData) {
      yield put(CompetitorActions.getCompetitorNameSuccess(successData));
    } else {
      yield put(CompetitorActions.getCompetitorNameFailure());
    }
  } catch (error) {
    yield put(CompetitorActions.getCompetitorNameFailure());
  }
}
export function* getCompetitor({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(CompetitorActions.doNothing());
    return;
  }

  yield put(CompetitorActions.getCompetitorLoading());

  try {
    let successData = yield call(competitorService.getCompetitor, payload);
    if (successData) {
      yield put(CompetitorActions.getCompetitorSuccess(successData));
      yield put(
        CompetitorActions.getCompetitorChildSuccess(successData.childFilter)
      );
    } else {
      yield put(CompetitorActions.getCompetitorFailure());
    }
  } catch (error) {
    yield put(CompetitorActions.getCompetitorFailure());
  }
}

export function* getCompetitorWithDate({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(CompetitorActions.doNothing());
    return;
  }

  yield put(CompetitorActions.getCompetitorWithDateLoading());

  try {
    let successData = yield call(competitorService.getCompetitor, payload);
    if (successData) {
      yield put(CompetitorActions.getCompetitorWithDateSuccess(successData));
    } else {
      yield put(CompetitorActions.getCompetitorWithDateFailure());
    }
  } catch (error) {
    yield put(CompetitorActions.getCompetitorWithDaterFailure());
  }
}

export function* getClass({ payload }) {
  const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
  if (!isOnline) {
    yield put(CompetitorActions.doNothing());
    return;
  }
  yield put(CompetitorActions.getClassLoading());
  try {
    let successData = yield call(competitorService.getClass, payload);
    if (successData) {
      yield put(CompetitorActions.getClassSuccess(successData));
    } else {
      yield put(CompetitorActions.getClassFailure());
    }
  } catch (error) {
    yield put(CompetitorActions.getClassFailure());
  }
}

export function* getCompetitorParent({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(CompetitorActions.doNothing());
    return;
  }

  yield put(CompetitorActions.getCompetitorParentLoading());

  try {
    let successData = yield call(
      competitorService.getCompetitorFilter,
      payload
    );
    if (successData) {
      // successData = HelperService.convertToSearchableListFormat({
      //   list: successData,
      //   id_key: "parentId",
      //   label_key: "parentName",
      // });
      yield put(CompetitorActions.getCompetitorParentSuccess(successData));
    } else {
      yield put(CompetitorActions.getCompetitorParentFailure());
    }
  } catch (error) {
    yield put(CompetitorActions.getCompetitorParentFailure());
  }
}

export function* getCompetitorChild({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(CompetitorActions.doNothing());
    return;
  }

  yield put(CompetitorActions.getCompetitorChildLoading());

  try {
    let successData = yield call(competitorService.getCompetitorChild, payload);
    if (successData) {
      successData = HelperService.mergeChildArray({
        list: successData,
      });
      // finaldata = HelperService.convertToSearchableListFormatChild({
      // 	  list: successData,
      // 	});
      yield put(CompetitorActions.getCompetitorChildSuccess(successData));
    } else {
      yield put(CompetitorActions.getCompetitorChildFailure());
    }
  } catch (error) {
    yield put(CompetitorActions.getCompetitorChildFailure());
  }
}
