import { put, call, take, select } from "redux-saga/effects";
import { RetailersTypes } from "App/Stores/Retailers/Actions";
import RetailerActions from "App/Stores/Retailers/Actions";
import CommonActions from "App/Stores/Common/Actions";
import { VisitsTypes } from "App/Stores/Visits/Actions";
import VisitsActions from "App/Stores/Visits/Actions";
import InfluencersActions from "App/Stores/Influencers/Actions";
import SiteActions from "App/Stores/Sites/Actions";
import { retailerService } from "App/Services/Api/RetailerService";
import { visitsService } from "App/Services/Api/VisitsService";
import { ValidationService } from "App/Services/ValidationService";
import { Toast } from "native-base";
import NavigationService from "App/Services/NavigationService";
import { HelperService } from "App/Services/Utils/HelperService";
import { getConnectionStatus } from "App/Stores/Common/Selectors";
import ActionQueuesActions from "App/Stores/ActionQueues/Actions";
import { offlineApiCall } from "./OfflineSaga";
import { Alert } from "react-native";
import _ from "lodash";
import ProductActions from "App/Stores/Products/Actions";

//fetchVisitsDisplayList
//fetchVisitsStorageList
//getVisitsDisplayList
//submit planned visits
//cancel visit
//edit visit
//start visit
//end visit
//press start visit
//press end visit
//fetch visit info

export function* startVisit({ payload }) {
  // console.log("ppppppppppppppppppp",payload)
  yield put(VisitsActions.startVisitLoading({ id: payload.payload.visitId }));
  try {
    let offlinActionData = {
      apiCall: visitsService.startVisit,
      resource: "startVisit",
      callName: "create",
      params: HelperService.decorateWithLocalId(payload),
      timestamp: HelperService.getCurrentTimestamp(),
      successCallback: VisitsActions.startVisitSuccess,
      failureCallback: VisitsActions.startVisitFailure,
      replaceServerParams: false,
    };

    const successData = yield call(offlineApiCall, offlinActionData);
    if (successData) {
      //Todo : change it to userData
      yield put(VisitsActions.startVisitSuccess(payload.visit));
      yield put(VisitsActions.clearOrderHeaderForm());
      yield call(navigateAfterVisitStarted, { visit: payload.payload });
      HelperService.showToast({
        message: "Visit Started.",
        duration: 1000,
        buttonText: "",
      });
      yield call(updateVisitsData, {
        updatedField: "zx_visitstatus",
        updatedValue: "Started",
        visit: payload.payload,
        visitId: payload.payload.visitId,
      });
      yield call(refreshVisitsDisplayList);
    } else {
      yield put(VisitsActions.startVisitFailure());
    }
  } catch (error) {
    yield put(VisitsActions.startVisitFailure());
    HelperService.showToast({
      message: "Error starting visit",
      duration: 2000,
      buttonText: "Okay",
    });
  }
}

export function* endVisit({ payload }) {
  yield put(VisitsActions.endVisitLoading({ id: payload.visitData.name }));
  try {
    let offlinActionData = {
      apiCall: visitsService.endVisit,
      resource: "endVisit",
      callName: "create",
      params: HelperService.decorateWithLocalId(payload),
      timestamp: HelperService.getCurrentTimestamp(),
      successCallback: VisitsActions.endVisitSuccess,
      failureCallback: VisitsActions.endVisitFailure,
      replaceServerParams: false,
    };

    const successData = yield call(offlineApiCall, offlinActionData);

    if (successData) {
      yield put(VisitsActions.endVisitSuccess(payload.visitData));
      HelperService.showToast({
        message: "Visit Ended.",
        duration: 1000,
        buttonText: "",
      });

      yield call(updateVisitsData, {
        updatedField: "zx_visitstatus",
        updatedValue: "Completed",
        visit: payload.visitData,
        visitId: payload.visitData.name,
      });
      yield call(refreshVisitsDisplayList);
      yield call(refreshVisitsStorageList);
    } else {
      yield put(VisitsActions.endVisitFailure());
      HelperService.showToast({
        message: "Error ending visit",
        duration: 2000,
        buttonText: "Okay",
      });
    }
  } catch (error) {
    yield put(VisitsActions.endVisitFailure());
    HelperService.showToast({
      message: "Error ending visit",
      duration: 2000,
      buttonText: "Okay",
    });
  }
}

export function* fetchVisitsDisplayList({ payload }) {
  const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
  if (!isOnline) {
    yield put(VisitsActions.doNothing());
    return;
  }
  yield put(VisitsActions.fetchVisitsDisplayListLoading());
  try {
    let successData = yield call(visitsService.fetchVisits, payload);
    // console.log("sucessdatatavisiteeeeeeeeeeeee",successData)
    if (successData) {
      // console.log("sucessdatatavisit",successData)
      yield put(VisitsActions.fetchVisitsDisplayListSuccess(successData));
      let data = yield call(searchInDisplayList, {
        startDate: payload.startDate,
        agentid: payload.agentid,
      });
      data = HelperService.removeDuplicateVisits(successData);
      yield put(VisitsActions.fetchFilteredVisitsDisplayListSuccess(data));
    } else {
      yield put(VisitsActions.fetchVisitsDisplayListFailure());
      yield put(VisitsActions.fetchFilteredVisitsDisplayListSuccess([]));
    }
  } catch (error) {
    // console.log('Error', error)
    yield put(VisitsActions.fetchVisitsDisplayListFailure());
    yield put(VisitsActions.fetchFilteredVisitsDisplayListSuccess([]));
  }
}

export function* fetchVisitsStorageList({ payload }) {
  const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
  if (!isOnline) {
    yield put(VisitsActions.doNothing());
    return;
  }

  try {
    let successData = yield call(visitsService.fetchVisits, payload);
    if (successData) {
      yield put(VisitsActions.fetchVisitsStorageListSuccess(successData));
    } else {
      yield put(VisitsActions.fetchVisitsStorageListFailure());
    }
  } catch (error) {
    // console.log('Error', error)
    yield put(VisitsActions.fetchVisitsStorageListFailure());
  }
}

export function* getVisitsDisplayList({ payload }) {
  try {
    let searchedData = [];
    searchedData = yield call(searchInDisplayList, payload);

    if (searchedData.length) {
      searchedData = HelperService.removeDuplicateVisits(searchedData);
      yield put(
        VisitsActions.fetchFilteredVisitsDisplayListSuccess(searchedData)
      );
      return;
    }

    yield put(VisitsActions.fetchFilteredVisitsDisplayListSuccess([]));
    yield put(VisitsActions.fetchVisitsDisplayList(payload));
  } catch (error) {
    // console.log('Error in getVisitsDisplayList', error)
  }
}

export function* refreshVisitsDisplayList() {
  let user = yield select((state) => state.user);
  let searchFilters = yield select((state) => state.visits.searchFilters);
  yield put(
    VisitsActions.fetchVisitsDisplayList({
      token: user.token,
      agentid: searchFilters["psm__c"],
      startDate: searchFilters["startDate"],
      endDate: searchFilters["endDate"],
    })
  );
}

export function* refreshVisitsStorageList() {
  let user = yield select((state) => state.user);
  let searchFilters = yield select((state) => state.visits.searchFilters);
  yield put(
    VisitsActions.fetchVisitsStorageList({
      token: user.token,
      agentid: user.id,
      startDate: searchFilters["startDate"],
      endDate: searchFilters["endDate"],
    })
  );
}

export function* updateVisitsData({
  updatedField,
  updatedValue,
  visit,
  visitId,
}) {
  let filteredDisplayData = yield select(
    (state) => state.visits.filteredDisplayData
  );
  let visitsStorageList = yield select(
    (state) => state.visits.visitsStorageList
  );
  let visitsDisplayList = yield select(
    (state) => state.visits.visitsDisplayList
  );
  let searchFilters = yield select((state) => state.visits.searchFilters);

  filteredDisplayData.map((obj) => {
    if (obj.name == visitId) {
      obj[updatedField] = updatedValue;
    }
  });

  //	_.map(visitsStorageList, (value, key) => {
  //	if (HelperService.datesAreOnSameDay(key, searchFilters['startDate'])) {
  //	value.map((obj) => {
  //	if (obj.sfid == visitId) {
  //	obj[updatedField] = updatedValue;
  //	}
  //});
  //	}
  //});

  visitsDisplayList.map((obj) => {
    if (
      HelperService.datesAreOnSameDay(
        HelperService.getDateTimestamp(obj.visit_date__c),
        searchFilters["startDate"]
      ) &&
      searchFilters["psm__c"] == obj.team_id__c
    ) {
      if (obj.name == visitId) {
        obj[updatedField] = updatedValue;
      }
    }
  });

  yield put(VisitsActions.fetchVisitsDisplayListSuccess(visitsDisplayList));
  yield put(
    VisitsActions.fetchFilteredVisitsDisplayListSuccess(filteredDisplayData)
  );
  //yield put(VisitsActions.fetchVisitsStorageListSuccess(visitsStorageList));
}

export function* watchSubmitSelectedPlannedVisits() {
  while (true) {
    const { payload } = yield take(VisitsTypes.SUBMIT_SELECTED_PLANNED_VISITS);
    let user = yield select((state) => state.user);
    let startDay = yield select((state) => state.startDay);

    var formPayload = _.cloneDeep(payload);
    //console.log(formPayload)
    formPayload.form = HelperService.removeField(formPayload.form, "local_id");
    formPayload.form = HelperService.removeField(formPayload.form, "name");
    formPayload.form = HelperService.removeField(
      formPayload.form,
      "address1_line1"
    );
    // console.log("aaaaaaaaaaaaaaaa",formPayload)

    yield call(submitSelectedPlannedVisits, formPayload);
  }
}

export function* submitSelectedPlannedVisits({ payload }) {
  yield put(VisitsActions.submitSelectedPlannedVisitsLoading());
  try {
    let offlinActionData = {
      apiCall: visitsService.planVisit,
      resource: "submitSelectedPlannedVisits",
      callName: "create",
      params: HelperService.decorateWithLocalId(payload),
      timestamp: HelperService.getCurrentTimestamp(),
      successCallback: VisitsActions.submitSelectedPlannedVisitsSuccess,
      failureCallback: VisitsActions.submitSelectedPlannedVisitsFailure,
      replaceServerParams: false,
    };

    const successData = yield call(offlineApiCall, offlinActionData);

    if (successData) {
      //Todo : change it to userData
      yield put(VisitsActions.submitSelectedPlannedVisitsSuccess(payload));
      NavigationService.navigateAndReset("VisitsScreen");
      HelperService.showToast({
        message: "Planned Visits Submitted.",
        duration: 5000,
        buttonText: "",
      });
      yield call(refreshVisitsDisplayList);
      //	yield call(refreshVisitsStorageList);
    } else {
      yield put(VisitsActions.submitSelectedPlannedVisitsFailure());
      HelperService.showToast({
        message: "Please Plan visit for future dates",
        duration: 2000,
        buttonText: "Okay",
      });
    }
  } catch (error) {
    // console.log(error)
    yield put(VisitsActions.submitSelectedPlannedVisitsFailure());
    HelperService.showToast({
      message: "Error Submitting visits",
      duration: 2000,
      buttonText: "Okay",
    });
  }
}

export function* watchSubmitSelectedUnplannedVisits() {
  while (true) {
    const { payload } = yield take(VisitsTypes.SUBMIT_SELECTED_UNPLANNED_VISIT);
    let user = yield select((state) => state.user);
    let startDay = yield select((state) => state.startDay);

    var formPayload = _.cloneDeep(payload);

    yield call(submitSelectedUnplannedVisits, formPayload);
  }
}

export function* submitSelectedUnplannedVisit({ payload }) {
  // console.log(payload)
  yield put(VisitsActions.submitSelectedPlannedVisitsLoading());
  try {
    let offlinActionData = {
      apiCall: visitsService.planVisit,
      resource: "submitSelectedUnplannedVisit",
      callName: "create",
      params: HelperService.decorateWithLocalId(payload),
      timestamp: HelperService.getCurrentTimestamp(),
      successCallback: VisitsActions.submitSelectedPlannedVisitsSuccess,
      failureCallback: VisitsActions.submitSelectedPlannedVisitsFailure,
      replaceServerParams: false,
    };

    const successData = yield call(offlineApiCall, offlinActionData);
    if (successData) {
      yield put(VisitsActions.submitSelectedPlannedVisitsLoadingStop(payload));
      NavigationService.navigateAndReset("VisitsScreen");
      HelperService.showToast({
        message: "Visit added for today.",
        duration: 5000,
        buttonText: "Okay",
      });
      yield call(refreshVisitsDisplayList);
      //	yield call(refreshVisitsStorageList);
    } else {
      yield put(VisitsActions.submitSelectedPlannedVisitsFailure());
      HelperService.showToast({
        message: "Error Submitting visit",
        duration: 2000,
        buttonText: "Okay",
      });
    }
  } catch (error) {
    yield put(VisitsActions.submitSelectedPlannedVisitsFailure());
    HelperService.showToast({
      message: "Error Submitting visit",
      duration: 2000,
      buttonText: "Okay",
    });
  }
}

export function* cancelVisit({ payload }) {
  yield put(VisitsActions.cancelVisitLoading());
  yield put(CommonActions.disableModal());
  try {
    let offlinActionData = {
      apiCall: visitsService.cancelVisit,
      resource: "cancelVisit",
      callName: "create",
      params: HelperService.decorateWithLocalId(payload),
      timestamp: HelperService.getCurrentTimestamp(),
      successCallback: VisitsActions.cancelVisitSuccess,
      failureCallback: VisitsActions.cancelVisitFailure,
      replaceServerParams: false,
    };
    const successData = yield call(offlineApiCall, offlinActionData);
    if (successData) {
      HelperService.showToast({
        message: "Visit Cancelled.",
        duration: 1000,
        buttonText: "Okay",
        position: "top",
      });
      yield put(VisitsActions.cancelVisitSuccess(payload));
      yield put(CommonActions.enableModal());
      yield put(CommonActions.closeModal());
      yield call(updateVisitsData, {
        updatedField: "zx_visitstatus",
        updatedValue: "Cancelled",
        visitId: payload.visit_id,
      });
      yield call(refreshVisitsDisplayList);
      yield call(refreshVisitsStorageList);
    } else {
      HelperService.showToast({
        message: "Cannot Cancel Visit.Try again",
        duration: 2000,
        buttonText: "Okay",
        position: "top",
      });
      yield put(VisitsActions.cancelVisitFailure(payload));
      yield put(CommonActions.enableModal());
    }
  } catch (error) {
    HelperService.showToast({
      message: "Cannot Cancel Visit.Try again",
      duration: 2000,
      buttonText: "Okay",
      position: "top",
    });
    yield put(VisitsActions.cancelVisitFailure(payload));
    yield put(CommonActions.enableModal());
  }
}

export function* editVisit({ payload }) {
  yield put(VisitsActions.editVisitLoading());
  yield put(CommonActions.disableModal());
  try {
    let offlinActionData = {
      apiCall: visitsService.editVisit,
      resource: "editVisit",
      callName: "create",
      params: HelperService.decorateWithLocalId(payload),
      timestamp: HelperService.getCurrentTimestamp(),
      successCallback: VisitsActions.editVisitSuccess,
      failureCallback: VisitsActions.editVisitFailure,
      replaceServerParams: false,
    };

    const successData = yield call(offlineApiCall, offlinActionData);
    if (successData) {
      HelperService.showToast({
        message: "Visit Updated.",
        duration: 1000,
        buttonText: "Okay",
        position: "top",
      });

      yield put(VisitsActions.editVisitSuccess(payload));
      yield put(CommonActions.enableModal());
      yield put(CommonActions.closeModal());
      yield call(refreshVisitsDisplayList);
      //	yield call(refreshVisitsStorageList);
    } else {
      HelperService.showToast({
        message: "Please Reschedule visit for future dates.",
        duration: 2000,
        buttonText: "Okay",
        position: "top",
      });
      yield put(VisitsActions.editVisitFailure(payload));
      yield put(CommonActions.enableModal());
    }
  } catch (error) {
    HelperService.showToast({
      message: "Update Visit failed.",
      duration: 2000,
      buttonText: "Okay",
      position: "top",
    });
    yield put(VisitsActions.editVisitFailure(payload));
    yield put(CommonActions.enableModal());
  }
}

function* navigateAfterVisitStarted(payload) {
  const { visit } = payload || {};
  let routeToNavigate = "StartVisitForm";
  NavigationService.navigate(routeToNavigate);
}

export function* pressStartVisit({ payload }) {
  let user = yield select((state) => state.user);
  let visit = payload.visit;
  let executeVisitData = yield select((state) => state.visits.executeVisitData);
  let currentVisits = yield select((state) => state.visits.filteredDisplayData);
  let startedToday = user.startDayTime
    ? HelperService.isToday(user.startDayTime)
    : false;
  let endedToday = user.endDayTime
    ? HelperService.isToday(user.endDayTime)
    : false;
  let absentToday = user.absentDayTime
    ? HelperService.isToday(user.absentDayTime)
    : false;

  //check whether day is started or not.
  //whether agent is absent.
  //whether agent ended day.
  //check whether any other visit is already started.

  if (absentToday) {
    HelperService.showToast({
      message: "Cannot Start Visit.You are marked absent for today",
      duration: 2000,
      buttonText: "Okay",
    });

    yield put(VisitsActions.doNothing());
    return;
  }

  if (endedToday) {
    HelperService.showToast({
      message: "Cannot Start Visit.You already ended your day",
      duration: 2000,
      buttonText: "Okay",
    });

    yield put(VisitsActions.doNothing());
    return;
  }

  if (!startedToday) {
    HelperService.showToast({
      message: "Cannot Start Visit. Please start your day first.",
      duration: 2000,
      buttonText: "Okay",
    });

    yield put(VisitsActions.doNothing());
    return;
  }

  //same day two visits cannot be started simultaineously.
  // if (!_.isEmpty(executeVisitData) && executeVisitData.sfid != visit.sfid && HelperService.isToday(executeVisitData.visit_date__c)) {
  // 	HelperService.showToast({
  // 		message: `Visit for seller ${executeVisitData.seller_name} is already started.Please end that visit before starting new visit.`,
  // duration: 4000,
  // buttonText: 'Okay'
  // 	});

  // 	yield put(VisitsActions.pressStartVisitSuccess());
  // 	return;
  // }

  //condition that checks that this visit is already started
  if (
    (!_.isEmpty(executeVisitData) && executeVisitData.name == visit.name) ||
    visit.zx_visitstatus == "Started"
  ) {
    HelperService.showToast({
      message: "Visit Resumed.",
      duration: 2000,
      buttonText: "Okay",
    });

    yield put(VisitsActions.pressStartVisitSuccess(visit));
    yield call(navigateAfterVisitStarted, { visit });
    return;
  }

  //same day two visits cannot be started simultaineously on the basis of status
  let anotherVisitInProgress = false;
  currentVisits.map((obj) => {
    if (obj.zx_visitstatus == "Started" && obj.name != visit.name) {
      anotherVisitInProgress = obj;
    }
  });

  if (anotherVisitInProgress) {
    HelperService.showToast({
      message: `Visit for seller ${anotherVisitInProgress.name} is already started.Please end that visit before starting new visit.`,
      duration: 4000,
      buttonText: "Okay",
    });

    yield put(VisitsActions.pressStartVisitSuccess());
    return;
  }

  try {
    const confirm = yield call(HelperService.showAlert, {
      heading: "Start Visit",
      message: "Do you want to start this visit?",
    });
    yield call(processStartVisit, { visit: visit, user: user });
  } catch (error) {
    yield put(VisitsActions.pressStartVisitSuccess());
  }
}

export function* pressEndVisit({ payload }) {
  let user = yield select((state) => state.user);
  let visit = payload.visit;
  let executeVisitData = yield select((state) => state.visits.executeVisitData);
  let startedToday = user.startDayTime
    ? HelperService.isToday(user.startDayTime)
    : false;
  let endedToday = user.endDayTime
    ? HelperService.isToday(user.endDayTime)
    : false;
  let absentToday = user.absentDayTime
    ? HelperService.isToday(user.absentDayTime)
    : false;

  if (visit.zx_visitstatus != "Started") {
    HelperService.showToast({
      message: "Cannot End Visit. This Visit is not started yet",
      duration: 4000,
      buttonText: "Okay",
    });

    yield put(VisitsActions.doNothing());
    return;
  }

  if (absentToday) {
    HelperService.showToast({
      message: "Cannot End Visit.You are marked absent for today",
      duration: 3000,
      buttonText: "Okay",
    });

    yield put(VisitsActions.doNothing());
    return;
  }

  if (endedToday) {
    HelperService.showToast({
      message: "Cannot End Visit.You already ended your day",
      duration: 3000,
      buttonText: "Okay",
    });

    yield put(VisitsActions.doNothing());
    return;
  }

  if (!startedToday) {
    HelperService.showToast({
      message: "Cannot End Visit. Please start your day first.",
      duration: 3000,
      buttonText: "Okay",
    });

    yield put(VisitsActions.doNothing());
    return;
  }

  try {
    const confirm = yield call(HelperService.showAlert, {
      heading: "End Visit",
      message: "Do you want to end this visit?",
    });
    yield call(processEndVisit, { visit: visit, user: user });
  } catch (error) {
    yield put(VisitsActions.pressEndVisitSuccess());
  }
}

export function* processStartVisit(payload) {
  let visits = yield select((state) => state.visits);
  let user = payload.user;
  let data = payload.visit;
  let token = user.token;
  let agentid = visits.searchFilters["psm__c"];

  yield put(VisitsActions.startVisitLoading({ id: data.zx_visitsid }));
  let location = yield call(fetchLocation);
  if (location) {
    yield put(
      VisitsActions.startVisit({
        token: token,
        payload: {
          zx_checkinlatitude: String(location.latitude),
          zx_checkinlongitude: String(location.longitude),
          visitId: data.zx_visitsid,
          zx_currentDateandTime: HelperService.dateReadableFormat3(),
          zx_currentDate: HelperService.dateReadableFormats(),
          //check_in_address__c: data.check_in_address__c
        },
        visit: data,
      })
    );
  } else {
    HelperService.showToast({
      message: "Unable to fetch location.Please try again.",
      duration: 2000,
      buttonText: "Okay",
    });
    yield put(VisitsActions.startVisitLoadingStop());
  }
}

export function* processEndVisit(payload) {
  let visits = yield select((state) => state.visits);
  let user = payload.user;
  let data = payload.visit;
  let token = user.token;
  let agentid = visits.searchFilters["psm__c"];

  yield put(VisitsActions.endVisitLoading({ id: data.name }));
  let location = yield call(fetchLocation);
  if (location) {
    yield put(
      VisitsActions.endVisit({
        visit_id: data.name,
        token: token,
        agentid: agentid,
        payload: {
          zx_checkoutlatitude: String(location.latitude),
          zx_checkoutlongitude: String(location.longitude),
          visitId: data.zx_visitsid,
          zx_currentDateandTime: HelperService.dateReadableFormat3(),
          zx_currentDate: HelperService.dateReadableFormats(),
          //	check_out_address__c: String(HelperService.getCurrentTimestamp()),
          //	status__c: "Completed"
        },
        visitData: data,
      })
    );
  } else {
    HelperService.showToast({
      message: "Unable to fetch location.Please try again.",
      duration: 2000,
      buttonText: "Okay",
    });
    yield put(VisitsActions.endVisitLoadingStop());
  }
}

export function* pressEditVisit({ payload }) {
  //console.log('in edit')
  let user = yield select((state) => state.user);
  let visit = payload.visit;
  let modalData = payload.modalData;
  const { content, heading, bodyFlexHeight } = modalData;

  let executeVisitData = yield select((state) => state.visits.executeVisitData);
  let startedToday = user.startDayTime
    ? HelperService.isToday(user.startDayTime)
    : false;
  let endedToday = user.endDayTime
    ? HelperService.isToday(user.endDayTime)
    : false;
  let absentToday = user.absentDayTime
    ? HelperService.isToday(user.absentDayTime)
    : false;

  if (absentToday) {
    HelperService.showToast({
      message: "Cannot Edit Visit.You are marked absent for today",
      duration: 3000,
      buttonText: "Okay",
    });

    yield put(VisitsActions.pressEditVisitSuccess());
    return;
  }

  if (endedToday) {
    HelperService.showToast({
      message: "Cannot Edit Visit.You already ended your day",
      duration: 3000,
      buttonText: "Okay",
    });

    yield put(VisitsActions.pressEditVisitSuccess());
    return;
  }

  if (!startedToday) {
    HelperService.showToast({
      message: "Cannot Edit Visit. Please start your day first.",
      duration: 3000,
      buttonText: "Okay",
    });

    yield put(VisitsActions.pressEditVisitSuccess());
    return;
  }

  if (visit.status__c == "Started") {
    HelperService.showToast({
      message: "Cannot Edit Visit. Visit already started",
      duration: 3000,
      buttonText: "Okay",
    });

    yield put(VisitsActions.pressEditVisitSuccess());
    return;
  }

  yield put(
    CommonActions.openModal({
      content,
      heading,
      bodyFlexHeight,
    })
  );
}

export function* pressCancelVisit({ payload }) {
  let user = yield select((state) => state.user);
  let visit = payload.visit;
  let modalData = payload.modalData;
  const { content, heading, bodyFlexHeight } = modalData;

  let executeVisitData = yield select((state) => state.visits.executeVisitData);
  let startedToday = user.startDayTime
    ? HelperService.isToday(user.startDayTime)
    : false;
  let endedToday = user.endDayTime
    ? HelperService.isToday(user.endDayTime)
    : false;
  let absentToday = user.absentDayTime
    ? HelperService.isToday(user.absentDayTime)
    : false;

  if (absentToday) {
    HelperService.showToast({
      message: "Cannot Cancel Visit.You are marked absent for today",
      duration: 3000,
      buttonText: "Okay",
    });

    yield put(VisitsActions.pressCancelVisitSuccess());
    return;
  }

  if (endedToday) {
    HelperService.showToast({
      message: "Cannot Cancel Visit.You already ended your day",
      duration: 3000,
      buttonText: "Okay",
    });

    yield put(VisitsActions.pressCancelVisitSuccess());
    return;
  }

  if (!startedToday) {
    HelperService.showToast({
      message: "Cannot Cancel Visit. Please start your day first.",
      duration: 3000,
      buttonText: "Okay",
    });

    yield put(VisitsActions.pressCancelVisitSuccess());
    return;
  }

  if (visit.status__c == "Started") {
    HelperService.showToast({
      message: "Cannot Cancel Visit. Visit already started",
      duration: 3000,
      buttonText: "Okay",
    });

    yield put(VisitsActions.pressCancelVisitSuccess());
    return;
  }

  yield put(
    CommonActions.openModal({
      content,
      heading,
      bodyFlexHeight,
    })
  );
}

export function* fetchLocation() {
  let location = yield call(HelperService.requestLocation);
  if (location == "DENIED") {
    Alert.alert(
      "Location permission is required to proceed.",
      "Go App Permissions and Turn on Location Permission for Re-Konekt."
    );
    return false;
  } else if (!location) {
    return false;
  }
  return location;
}

export function* searchInDisplayList(payload) {
  // console.log("checkinggggg");
  let filterResultsData = [];
  let visitsDisplayList = yield select(
    (state) => state.visits.visitsDisplayList
  );
  visitsDisplayList.map((obj) => {
    if (
      HelperService.datesAreOnSameDay(
        HelperService.removeTimestringFromDate(obj.zx_visitdate),
        HelperService.convertMiliToDateString(payload.startDate)
      ) &&
      payload.agentid == obj.zx_team
    ) {
      filterResultsData = filterResultsData.concat(obj);
    }
  });

  return filterResultsData;
}

export function* searchInStoredList(payload) {
  let filterResultsData = [];
  let visitsStorageList = yield select(
    (state) => state.visits.visitsStorageList
  );
  _.map(visitsStorageList, (value, key) => {
    if (HelperService.datesAreOnSameDay(key, payload.startDate)) {
      filterResultsData = filterResultsData.concat(value);
    }
  });

  return filterResultsData;
}

export function* addItemToCart({ payload }) {
  let cart = yield select((state) => state.visits.cart);
  let productList = yield select((state) => state.products.productItemList);
  let productSizeForm = yield select((state) => state.products.productSizeForm);
  let orderHeaderForm = yield select((state) => state.visits.orderHeaderForm);
  let agentAllPlant = yield select((state) => state.common.agentAllPlant);
  //console.log(productSizeForm)
  //console.log(payload)
  //console.log(Number(payload.width))
  let itemAlreadyPresent = false;
  cart.items = cart.items.map((obj) => {
    if (
      obj.product_item__c == payload.product_item__c &&
      obj.size == payload.size &&
      obj.packaging == payload.packaging
    ) {
      obj.quantity__c = payload.quantity__c;
      itemAlreadyPresent = true;
    }
    return obj;
  });
  //console.log(payload.width.slice(0,2))
  //console.log((payload.product_item__c==productSizeForm.id) && (productSizeForm.width==""))
  if (payload.width.slice(0, 2) == ">=" && productSizeForm.width == "") {
    HelperService.showToast({
      message: "Cannot Add to Cart.Enter the Size1(W)",
      duration: 1000,
      buttonText: "Okay",
    });

    //yield put(VisitsActions.addItemToCartSuccess())
    return;
  }
  if (
    payload.product_item__c == productSizeForm.id &&
    Number(productSizeForm.width) <=
      Number(payload.width.slice(2, payload.width.length))
  ) {
    HelperService.showToast({
      message: "Cannot Add to Cart.Enter the Size1(W) in Range",
      duration: 1000,
      buttonText: "Okay",
    });

    //yield put(VisitsActions.addItemToCartSuccess())
    return;
  }

  if (
    payload.product_item__c == productSizeForm.id &&
    Number(productSizeForm.width) >=
      Number(payload.length.slice(2, payload.length.length))
  ) {
    HelperService.showToast({
      message: "Cannot Add to Cart.Enter the Size1(W) in Range",
      duration: 1000,
      buttonText: "Okay",
    });

    //yield put(VisitsActions.addItemToCartSuccess())
    return;
  }

  if (
    payload.product_item__c == productSizeForm.id &&
    Number(productSizeForm.length) <=
      Number(payload.width.slice(2, payload.width.length))
  ) {
    HelperService.showToast({
      message: "Cannot Add to Cart.Enter the Size2(L) in Range",
      duration: 1000,
      buttonText: "Okay",
    });

    //yield put(VisitsActions.addItemToCartSuccess())
    return;
  }

  if (
    payload.product_item__c == productSizeForm.id &&
    Number(productSizeForm.length) >=
      Number(payload.length.slice(2, payload.length.length))
  ) {
    HelperService.showToast({
      message: "Cannot Add to Cart.Enter the Size2(L) in Range",
      duration: 1000,
      buttonText: "Okay",
    });

    //yield put(VisitsActions.addItemToCartSuccess())
    return;
  }

  if (payload.length.slice(0, 2) == "<=" && productSizeForm.length == "") {
    HelperService.showToast({
      message: "Cannot Add to Cart.Enter the Size2(L)",
      duration: 1000,
      buttonText: "Okay",
    });

    //yield put(VisitsActions.addItemToCartSuccess())
    return;
  }

  if (!itemAlreadyPresent) {
    cart.items.push(payload);
    //console.log(productList)
    productList.map((obj) => {
      if (
        obj.sfid == payload.product_item__c &&
        obj.size == payload.size &&
        obj.packaging == payload.packaging
      ) {
        (payload.packaging = obj.packaging),
          (payload.plant =
            agentAllPlant && agentAllPlant.length && agentAllPlant[0]
              ? HelperService.getNameFromSFID(
                  agentAllPlant[0],
                  orderHeaderForm.plant__c,
                  "sap_code__c"
                )
              : ""),
          (payload.quality = obj.brand),
          (payload.width =
            obj.width.slice(0, 2) == ">=" || obj.width.slice(0, 2) == "<="
              ? productSizeForm.width
              : obj.width),
          (payload.length =
            obj.length.slice(0, 2) == ">=" || obj.length.slice(0, 2) == "<="
              ? productSizeForm.length
              : obj.length),
          (payload.gsm = obj.gsm),
          (payload.size = obj.size);
        //payload.product_variant__c=obj.name
        //payload.quantity= obj.quantity,
      }
    });

    yield put(ProductActions.fetchProductItemPrice(payload));
    yield put(ProductActions.clearSizeForm());
  }

  yield put(VisitsActions.addItemToCartSuccess(cart));

  //yield put(VisitsActions.editCartOrder({ edited_field: 'unique_product_count__c', edited_value: cart.items.length }))

  //yield put(VisitsActions.editCartOrder({ edited_field: 'total_tax__c', edited_value: total_value*.18 }))
}

export function* removeItemFromCart({ payload }) {
  let cart = yield select((state) => state.visits.cart);
  let currentVisit = yield select((state) => state.visits.executeVisitData);
  let currentParty = yield select((state) => state.retailers.selectedRetailer);
  let itemAlreadyPresent = false;
  cart.items = cart.items.filter(
    (obj) => obj.product_item__c != payload.product_item__c
  );
  yield put(VisitsActions.removeItemFromCartSuccess(cart));
  let total_value = getTotalOrderValue({
    item: cart.items,
    type:
      currentVisit.type__c ||
      (currentParty && currentParty.data && currentParty.data.account_type__c),
  });
  //yield put(VisitsActions.editCartOrder({ edited_field: 'unique_product_count__c', edited_value: cart.items.length }))
  yield put(
    VisitsActions.editCartOrder({
      edited_field: "total_payable_amount__c",
      edited_value: total_value,
    })
  );
  //yield put(VisitsActions.editCartOrder({ edited_field: 'total_tax__c', edited_value: total_value*.18 }))
}

export function* editCartOrder({ payload }) {
  let cart = yield select((state) => state.visits.cart);
  cart.order[payload.edited_field] = payload.edited_value;
  yield put(VisitsActions.editCartOrderSuccess(cart));
}

export function* placeOrder(payload) {
  yield put(VisitsActions.placeOrderLoading());
  try {
    let offlinActionData = {
      apiCall: visitsService.placeOrder,
      resource: "editVisit",
      callName: "create",
      params: HelperService.decorateWithLocalId(payload),
      timestamp: HelperService.getCurrentTimestamp(),
      successCallback: VisitsActions.placeOrderSuccess,
      failureCallback: VisitsActions.placeOrderFailure,
      replaceServerParams: false,
    };

    const successData = yield call(offlineApiCall, offlinActionData);
    if (successData) {
      HelperService.showToast({
        message: " Order Placed Successfully.",
        duration: 1000,
        buttonText: "Okay",
      });

      yield put(VisitsActions.placeOrderSuccess(payload));
      yield put(ProductActions.fetchProductItemSuccess([]));
      NavigationService.navigate("VisitBookOrder");
    } else {
      HelperService.showToast({
        message: "Order cannot be placed.",
        duration: 2000,
        buttonText: "Okay",
      });
      yield put(VisitsActions.placeOrderFailure());
    }
  } catch (error) {
    HelperService.showToast({
      message: "Order cannot be placed.",
      duration: 2000,
      buttonText: "Okay",
    });
    yield put(VisitsActions.placeOrderFailure());
  }
}

export function* fetchVisitInfo({ payload }) {
  const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
  if (!isOnline) {
    yield put(VisitsActions.doNothing());
    return;
  }
  yield put(VisitsActions.fetchVisitInfoLoading());
  try {
    let successData = yield call(visitsService.fetchVisitInfo, payload);
    if (successData) {
      yield put(VisitsActions.fetchVisitInfoSuccess(successData));
      yield put(VisitsActions.clearBox());
      if (
        successData &&
        successData.competitorvisitinfo &&
        successData.competitorvisitinfo.length
      )
        yield put(
          VisitsActions.fetchVisitCompSuccess(successData.competitorvisitinfo)
        );
      // yield put(VisitsActions.setVisitInfoForm({ market_material_required__c: successData.attachmentDetail[0].market_material_required__c, remarks__c: successData.attachmentDetail[0].remarks__c}))
    } else {
      yield put(VisitsActions.fetchVisitInfoFailure());
    }
  } catch (error) {
    // console.log('Error', error)
    yield put(VisitsActions.fetchVisitInfoFailure());
  }
}

export function* addVisitInfo(payload) {
  yield put(VisitsActions.addVisitInfoLoading());
  try {
    let offlinActionData = {
      apiCall: visitsService.addVisitInfo,
      resource: "addVisitInfo",
      callName: "create",
      params: HelperService.decorateWithLocalId(payload),
      timestamp: HelperService.getCurrentTimestamp(),
      successCallback: VisitsActions.addVisitInfoSuccess,
      failureCallback: VisitsActions.addVisitInfoFailure,
      replaceServerParams: false,
    };
    let currentUser = yield select((state) => state.user);
    let currentVisit = yield select((state) => state.visits.executeVisitData);
    let currentVisitId = currentVisit["pg_id__c"];

    const successData = yield call(offlineApiCall, offlinActionData);
    if (successData) {
      HelperService.showToast({
        message: "Visit Info Added Successfully.",
        duration: 1000,
        buttonText: "Okay",
      });
      yield put(VisitsActions.addVisitInfoSuccess(successData));
      //yield put(VisitsActions.fetchVisitInfo({ visit_id: currentVisitId, token :currentUser.token}))

      //yield put(VisitsActions.clearAddInfoForm());
      NavigationService.navigate("StartVisitForm");
    } else {
      HelperService.showToast({
        message: "Failed. Cannot Add Visit",
        duration: 2000,
        buttonText: "Okay",
      });
      yield put(VisitsActions.addVisitInfoFailure());
    }
  } catch (error) {
    HelperService.showToast({
      message: "Failed. Cannot Add Visit",
      duration: 2000,
      buttonText: "Okay",
    });
    // console.log(error)
    yield put(VisitsActions.addVisitInfoFailure());
  }
}

export function* watchAddVisitInfo() {
  while (true) {
    const { payload } = yield take(VisitsTypes.ADD_VISIT_INFO);
    let currentUser = yield select((state) => state.user);
    let currentVisit = yield select((state) => state.visits.executeVisitData);
    let currentVisitId = currentVisit["pg_id__c"];
    payload.visit = currentVisitId;
    let requestDataPayload = {
      //agentid: currentUser.id,
      token: currentUser.token,
      //visit_id: currentVisitId,
      payload: payload,
    };

    {
      //try {
      //const validationFailed = yield call(ValidationService.validateAddVisitForm, requestDataPayload.payload);
      //if (validationFailed) {
      //	HelperService.showToast({
      //	message: validationFailed.error_message,
      //	duration: 2000,
      //buttonText: 'Okay'
      //});
      //	yield put(VisitsActions.visitInfoValidationFailed(validationFailed));
      //continue;
      //}
      //} catch (err) {
      //	console.log(err)
      //}
    }
    yield call(addVisitInfo, requestDataPayload);
  }
}

export function* watchPlaceOrder() {
  while (true) {
    const { payload } = yield take(VisitsTypes.PLACE_ORDER);
    let currentVisit = yield select((state) => state.visits.executeVisitData);
    let parentAreas = yield select((state) => state.visits.parentAreas);
    let currentParty = yield select(
      (state) => state.retailers.selectedRetailer
    );
    let currentData = yield select((state) => state.user.user_details);
    let orderHeaderForm = yield select((state) => state.visits.orderHeaderForm);
    //let  agentDistChannel =   yield select(state => state.common.agentDistChannel)
    yield put(
      VisitsActions.editCartOrder({
        edited_field: "order_created_by__c",
        edited_value: currentData.sfid,
      })
    );
    yield put(
      VisitsActions.editCartOrder({
        edited_field: "created_from__c",
        edited_value: "SFA",
      })
    );
    yield put(
      VisitsActions.editCartOrder({
        edited_field: "order_date__c",
        edited_value: HelperService.getCurrentTimestamp(),
      })
    );
    yield put(
      VisitsActions.editCartOrder({
        edited_field: "from__c",
        edited_value: currentVisit.customer_sfid__c || currentParty.id,
      })
    );
    yield put(
      VisitsActions.editCartOrder({
        edited_field: "bill_to_id__c",
        edited_value: currentVisit.customer_sfid__c || currentParty.id,
      })
    );
    yield put(
      VisitsActions.editCartOrder({
        edited_field: "business_channel__c",
        edited_value: currentData.business_channel__c,
      })
    );
    //yield put(VisitsActions.editCartOrder({ edited_field: 'created_From__c', edited_value: 'SFA'  }));
    //yield put(VisitsActions.editCartOrder({ edited_field: 'order_Created_By__c', edited_value: currentData.sfid  }));
    //yield put(VisitsActions.editCartOrder({ edited_field: 'created_from__c', edited_value: currentVisit.customer_sfid__c|| currentParty.id }));
    yield put(
      VisitsActions.editCartOrder({
        edited_field: "to__c",
        edited_value: currentVisit.parentid || currentParty.data.parentid,
      })
    );
    if (currentVisit.sfid) {
      yield put(
        VisitsActions.editCartOrder({
          edited_field: "visits__c",
          edited_value: currentVisit.sfid,
        })
      );
    }
    //yield put(VisitsActions.editCartOrder({ edited_field: 'flsp__c', edited_value: currentVisit.flsp__c }));
    yield put(
      VisitsActions.editCartOrder({
        edited_field: "team_manager__c",
        edited_value:
          currentVisit.team_manager__c || currentData.team_manager__c,
      })
    );
    yield put(
      VisitsActions.editCartOrder({
        edited_field: "zsm__c",
        edited_value: currentVisit.manager__c || currentData.manager__c,
      })
    );
    yield put(
      VisitsActions.editCartOrder({
        edited_field: "order_confirmation_status__c",
        edited_value: "Open",
      })
    );
    yield put(
      VisitsActions.editCartOrder({
        edited_field: "order_delivery_status__c",
        edited_value: "Open",
      })
    );
    yield put(
      VisitsActions.editCartOrder({
        edited_field: "order_type__c",
        edited_value:
          currentVisit.type__c == "Retailer" ||
          (currentParty &&
            currentParty.data &&
            currentParty.data.account_type__c == "Retailer")
            ? "Secondary"
            : "Primary",
      })
    );
    yield put(
      VisitsActions.editCartOrder({
        edited_field: "distribution__c",
        edited_value:
          currentVisit.type__c == "Retailer" ||
          (currentParty &&
            currentParty.data &&
            currentParty.data.account_type__c == "Retailer")
            ? "a0s1y0000006aQUAAY"
            : orderHeaderForm.DC__c,
      })
    );
    yield put(
      VisitsActions.editCartOrder({
        edited_field: "city__c",
        edited_value: parentAreas.parent_city__c,
      })
    );
    yield put(
      VisitsActions.editCartOrder({
        edited_field: "ship_to_address__c",
        edited_value:
          currentVisit.billingstreet || currentParty.data.billingstreet,
      })
    );
    yield put(
      VisitsActions.editCartOrder({
        edited_field: "ship_to_id__c",
        edited_value: currentVisit.customer_sfid__c || currentParty.id,
      })
    );
    //let retailersList = yield select(state => state.retailers.retailersList);
    //let dealersList = yield select(state => state.retailers.dealersList);
    //let dealer__c = '';
    let cart = yield select((state) => state.visits.cart);
    let total_value = getTotalOrderValue({
      item: cart.items,
      type:
        currentVisit.type__c ||
        (currentParty &&
          currentParty.data &&
          currentParty.data.account_type__c),
    });
    let Total_Quantity__c = getTotalOrderQuantity(cart.items);
    let Total_Discount = getTotalDiscount(cart.items);
    let Total_Exmil = getTotalExmil(cart.items);
    yield put(
      VisitsActions.editCartOrder({
        edited_field: "total_payable_amount__c",
        edited_value: total_value,
      })
    );
    yield put(
      VisitsActions.editCartOrder({
        edited_field: "component_2__c",
        edited_value: Total_Discount,
      })
    );
    yield put(
      VisitsActions.editCartOrder({
        edited_field: "total_quantity__c",
        edited_value: Total_Quantity__c,
      })
    );
    yield put(
      VisitsActions.editCartOrder({
        edited_field: "component_1__c",
        edited_value: Total_Exmil,
      })
    );

    //yield put(VisitsActions.editCartOrder({ edited_field: 'dealer__c', edited_value: dealer__c }));

    let currentCartData = yield select((state) => state.visits.cart);
    let BrandList = yield select((state) => state.products.BrandList);
    let productCategoryList = yield select(
      (state) => state.products.productCategoryList
    );
    //console.log(currentCartData)
    let currentCart = _.cloneDeep(currentCartData);
    currentCart.items.map((obj) => {
      //console.log(obj)
      const productVariant = obj["product_variant__c"];
      const productitem = obj["product_item__c"];
      const number_of_sheets = obj["number_of_sheets"];
      const additional_discount = obj["additional_discount"]
        ? obj["additional_discount"]
        : 0;
      //var productitem='product_item__c'
      //console.log(productVariant)
      //console.log(productitem)
      HelperService.removeField(obj, "quality");
      HelperService.removeField(obj, "plant");
      HelperService.removeField(obj, "gsm");
      HelperService.removeField(obj, "product_variant__c");
      HelperService.removeField(obj, "number_of_sheets");
      HelperService.removeField(obj, "additional_discount");
      //HelperService.removeField(obj,'product_variant__c');

      //HelperService.interChangeValue(obj,'product_variant__c', productitem);
      HelperService.interChangeValue(obj, "product_item__c", productVariant);
      //return obj['product_variant__c']==productitem
      //return obj['product_item__c'] ==productVariant
      //obj[productVariant]== obj.product_item__c
      obj.total_additional_discount__c =
        Number(additional_discount) * Number(obj.quantity__c);
      obj.additional_discount = additional_discount;
      obj.month__c = HelperService.getMonthName(
        HelperService.getCurrentTimestamp()
      );

      obj.shipped_qty__c = 0;
      obj.shipping_qty__c = 0;
      obj.quality__c = getBrandSfid({
        brand__c: obj.brand__c,
        list: BrandList,
      });
      obj.brand__c = getBrandSfid({ brand__c: obj.brand__c, list: BrandList });
      obj.product_family__c = getProductFamilySfid({
        id: obj.product_family__c,
        list: productCategoryList,
      });
      obj.number_of_sheets__c = number_of_sheets;

      //obj[productitem] ==obj.product_variant__c

      //HelperService.removeField(obj,'product_variant');
    });

    //console.log(cart)
    // console.log(currentCart)
    let currentUser = yield select((state) => state.user);

    let addOrderLine = yield select((state) => state.retailers.addOrderForm);
    let requestdataPayload = {
      agentid: currentUser.id,
      token: currentUser.token,
      payload: currentCart,
    };

    //try {
    //const validationFailed = yield call(ValidationService.validatePlaceOrderForm, requestdataPayload.payload);
    //if (validationFailed) {
    //	HelperService.showToast({
    //		message: validationFailed.error_message,
    //		duration: 2000,
    //		buttonText: 'Okay'
    //	});
    //	yield put(VisitsActions.doNothing());
    //	continue;
    //}
    //	} catch (err) {
    //		console.log(err)
    //	}
    if (!addOrderLine.status) {
      yield call(placeOrder, requestdataPayload);
    }

    if (addOrderLine.status) {
      currentCart.items.map((obj) => {
        obj["order_pg_id__c"] = addOrderLine.id;
      });
      yield put(
        RetailerActions.addOrderLine({
          token: currentUser.token,
          orderLine: currentCart.items,
          order_id: addOrderLine.id,
        })
      );
    }
  }
}

export function* fetchVisitImage({ payload }) {
  const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
  if (!isOnline) {
    yield put(VisitsActions.doNothing());
    return;
  }
  yield put(VisitsActions.fetchVisitImageLoading());
  try {
    let successData = yield call(visitsService.fetchVisitImage, payload);
    if (successData) {
      let data = successData;
      // let imageUri = data.attachmentDetail;

      yield put(
        VisitsActions.fetchVisitImageSuccess({
          id: payload.sfid,
          data: successData,
        })
      );
    } else {
      yield put(VisitsActions.fetchVisitImageFailure());
    }
  } catch (error) {
    // console.log('Error', error)
    yield put(VisitsActions.fetchVisitImageFailure());
  }
}

function getTotalOrderValue(items) {
  let value = 0;
  items.item.map((obj) => {
    if (obj.additional_discount)
      //console.log(Number(obj.price))
      value +=
        Number(obj.quantity__c) * Number(obj.total_price__c) -
        Number(obj.additional_discount) * Number(obj.quantity__c);
    else value += Number(obj.quantity__c) * Number(obj.total_price__c);
  });
  return value;
}

function getBrandSfid(items) {
  let value = "";
  items.list.map((obj) => {
    if (obj.category_code__c == items.brand__c)
      //console.log(Number(obj.price))
      value = obj.sfid;
  });
  return value;
}

function getProductFamilySfid(items) {
  let value = "";
  items.list.map((obj) => {
    if (obj.sfid == items.id)
      //console.log(Number(obj.price))
      value = obj.parent_category__c;
  });
  return value;
}

function getTotalOrderQuantity(items) {
  let value = 0;
  items.map((obj) => {
    //console.log(Number(obj.price))
    value += Number(obj.quantity__c);
  });
  return value;
}

function getTotalDiscount(items) {
  let value = 0;
  items.map((obj) => {
    //console.log(Number(obj.price))
    if (obj.additional_discount) {
      value += Number(obj.additional_discount) * Number(obj.quantity__c);
    } else {
      value = 0;
    }
  });
  return value;
}

function getTotalExmil(items) {
  let value = 0;
  items.map((obj) => {
    //console.log(Number(obj.price))
    value += Number(obj.exmill_price);
  });
  return value;
}

export function* watchCompetitorForm() {
  while (true) {
    const { payload } = yield take(VisitsTypes.SUBMIT_COMPETITOR_FORM);

    try {
      const validationFailed = yield call(
        ValidationService.validateCompetitor,
        payload.form
      );
      if (validationFailed) {
        HelperService.showToast({
          message: validationFailed.error_message,
          duration: 2000,
          buttonText: "Okay",
        });

        yield put(
          VisitsActions.CompetitorFormValidationFailed(validationFailed)
        );
        continue;
      }
    } catch (err) {
      // console.log(err)
    }

    var formPayload = _.cloneDeep(payload);

    formPayload.form.map((obj, index) => {
      obj = HelperService.removeField(obj, "id");
    });

    yield call(submitCompetitorForm, formPayload);
  }
}

export function* submitCompetitorForm(payload) {
  yield put(VisitsActions.submitCompetitorFormLoading());
  try {
    let offlinActionData = {
      apiCall: visitsService.submitCompetitorForm,
      resource: "submitCompetitorForm",
      callName: "create",
      params: HelperService.decorateWithLocalId(payload),
      timestamp: HelperService.getCurrentTimestamp(),
      successCallback: VisitsActions.submitCompetitorFormSuccess,
      failureCallback: VisitsActions.submitCompetitorFormFailure,
      replaceServerParams: false,
    };

    const successData = yield call(offlineApiCall, offlinActionData);

    let user = yield select((state) => state.user);

    if (successData) {
      yield put(VisitsActions.submitCompetitorFormSuccess(payload));
      yield put(
        VisitsActions.getCompetitor({ token: user.token, show: false })
      );
      NavigationService.navigate("StartVisitForm");

      HelperService.showToast({
        message: "Competitors submitted successfully.",
        duration: 1000,
        buttonText: "",
      });
    } else {
      yield put(VisitsActions.submitCompetitorFormFailure());
      HelperService.showToast({
        message: "Cannot submit Competitor. Try after some time",
        duration: 2000,
        buttonText: "Okay",
      });
    }
  } catch (error) {
    // console.log('Error', error)
    yield put(VisitsActions.submitCompetitorFormFailure());
    HelperService.showToast({
      message: error,
      duration: 2000,
      buttonText: "Okay",
    });
  }
}

export function* watchStockForm() {
  while (true) {
    const { payload } = yield take(VisitsTypes.SUBMIT_STOCK_FORM);

    try {
      const validationFailed = yield call(
        ValidationService.validateStock,
        payload.form
      );
      if (validationFailed) {
        HelperService.showToast({
          message: validationFailed.error_message,
          duration: 2000,
          buttonText: "Okay",
        });

        yield put(VisitsActions.StockFormValidationFailed(validationFailed));
        continue;
      }
    } catch (err) {
      // console.log(err)
    }

    var formPayload = _.cloneDeep(payload);

    formPayload.form.map((obj, index) => {
      obj = HelperService.removeField(obj, "id");
    });

    yield call(submitStockForm, formPayload);
  }
}

export function* watchUpdateStockForm() {
  while (true) {
    const { payload } = yield take(VisitsTypes.SUBMIT_UPDATE_STOCK_FORM);

    //try {
    //	const validationFailed = yield call(ValidationService.validateStock, payload.form);
    //if (validationFailed) {
    //	HelperService.showToast({
    //	message: validationFailed.error_message,
    //	duration: 2000,
    //	buttonText: 'Okay'
    //	});

    //yield put(VisitsActions.StockFormValidationFailed(validationFailed));
    //	continue;
    //	}
    //	} catch (err) {
    //console.log(err)
    //	}

    yield call(submitUpdateStockForm, payload);
  }
}

export function* watchUpdateCompetitorForm() {
  while (true) {
    //console.log('im here')
    const { payload } = yield take(VisitsTypes.SUBMIT_UPDATE_COMPETITOR_FORM);

    //try {
    //	const validationFailed = yield call(ValidationService.validateStock, payload.form);
    //if (validationFailed) {
    //	HelperService.showToast({
    //	message: validationFailed.error_message,
    //	duration: 2000,
    //	buttonText: 'Okay'
    //	});

    //yield put(VisitsActions.StockFormValidationFailed(validationFailed));
    //	continue;
    //	}
    //	} catch (err) {
    //console.log(err)
    //	}

    yield call(submitUpdateCompetitorForm, payload);
  }
}

export function* submitStockForm(payload) {
  yield put(VisitsActions.submitStockFormLoading());
  try {
    let offlinActionData = {
      apiCall: visitsService.submitStockForm,
      resource: "submitStockForm",
      callName: "create",
      params: HelperService.decorateWithLocalId(payload),
      timestamp: HelperService.getCurrentTimestamp(),
      successCallback: VisitsActions.submitStockFormSuccess,
      failureCallback: VisitsActions.submitStockFormFailure,
      replaceServerParams: false,
    };
    let user = yield select((state) => state.user);
    const successData = yield call(offlineApiCall, offlinActionData);

    if (successData) {
      yield put(VisitsActions.submitStockFormSuccess(payload));
      yield put(VisitsActions.getStock({ token: user.token, show: false }));
      NavigationService.navigate("StartVisitForm");
      HelperService.showToast({
        message: "Stock submitted successfully.",
        duration: 1000,
        buttonText: "",
      });
    } else {
      yield put(VisitsActions.submitStockFormFailure());
      HelperService.showToast({
        message: "Cannot submit Stock. Try after some time",
        duration: 2000,
        buttonText: "Okay",
      });
    }
  } catch (error) {
    // console.log('Error', error)
    yield put(VisitsActions.submitStockFormFailure());
    HelperService.showToast({
      message: error,
      duration: 2000,
      buttonText: "Okay",
    });
  }
}

export function* submitUpdateStockForm(payload) {
  yield put(VisitsActions.submitUpdateStockFormLoading(payload));
  try {
    let offlinActionData = {
      apiCall: visitsService.submitUpdateStockForm,
      resource: "submitStockForm",
      callName: "create",
      params: HelperService.decorateWithLocalId(payload),
      timestamp: HelperService.getCurrentTimestamp(),
      successCallback: VisitsActions.submitUpdateStockFormSuccess,
      failureCallback: VisitsActions.submitUpdateStockFormFailure,
      replaceServerParams: false,
    };
    let user = yield select((state) => state.user);
    const successData = yield call(offlineApiCall, offlinActionData);

    if (successData) {
      yield put(VisitsActions.submitUpdateStockFormSuccess(payload));
      yield put(VisitsActions.getStock({ token: user.token, show: false }));
      yield put(
        VisitsActions.changeAddPlannedVisitsSearchFilters({
          edited_field: "StockEdit",
          edited_value: "",
        })
      );
      NavigationService.navigate("StartVisitForm");
      HelperService.showToast({
        message: "Stock Editted successfully.",
        duration: 1000,
        buttonText: "",
      });
    } else {
      yield put(VisitsActions.submitUpdateStockFormFailure());
      HelperService.showToast({
        message: "Cannot submit Stock. Try after some time",
        duration: 2000,
        buttonText: "Okay",
      });
    }
  } catch (error) {
    // console.log('Error', error)
    yield put(VisitsActions.submitUpdateStockFormFailure());
    HelperService.showToast({
      message: error,
      duration: 2000,
      buttonText: "Okay",
    });
  }
}

export function* submitUpdateCompetitorForm(payload) {
  yield put(VisitsActions.submitUpdateCompetitorFormLoading(payload));
  try {
    let offlinActionData = {
      apiCall: visitsService.submitUpdateCompetitorForm,
      resource: "submitUpdateCompetitorForm",
      callName: "create",
      params: HelperService.decorateWithLocalId(payload),
      timestamp: HelperService.getCurrentTimestamp(),
      successCallback: VisitsActions.submitUpdateCompetitorFormSuccess,
      failureCallback: VisitsActions.submitUpdateCompetitorFormFailure,
      replaceServerParams: false,
    };
    let user = yield select((state) => state.user);
    const successData = yield call(offlineApiCall, offlinActionData);

    if (successData) {
      yield put(VisitsActions.submitUpdateCompetitorFormSuccess(payload));
      yield put(
        VisitsActions.getCompetitor({ token: user.token, show: false })
      );
      yield put(
        VisitsActions.changeAddPlannedVisitsSearchFilters({
          edited_field: "CompEdit",
          edited_value: "",
        })
      );
      NavigationService.navigate("StartVisitForm");
      HelperService.showToast({
        message: "Competitor Editted successfully.",
        duration: 1000,
        buttonText: "",
      });
    } else {
      yield put(VisitsActions.submitUpdateStockFormFailure());
      HelperService.showToast({
        message: "Cannot submit Competitor. Try after some time",
        duration: 2000,
        buttonText: "Okay",
      });
    }
  } catch (error) {
    // console.log('Error', error)
    yield put(VisitsActions.submitUpdateCompetitorFormFailure());
    HelperService.showToast({
      message: error,
      duration: 2000,
      buttonText: "Okay",
    });
  }
}

export function* getCompetitor({ payload }) {
  const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
  if (!isOnline) {
    yield put(VisitsActions.doNothing());
    return;
  }
  yield put(VisitsActions.getCompetitorLoading());
  try {
    let executeVisitData = yield select(
      (state) => state.visits.executeVisitData
    );
    if (!payload.show) {
      payload.visit_id = executeVisitData.sfid || executeVisitData.pg_id__c;
    }

    let successData = yield call(visitsService.getCompetitor, payload);
    if (successData) {
      //successData = HelperService.convertToSearchableListFormat({ list: successData, id_key: 'sfid', label_key: 'name' });
      yield put(VisitsActions.getCompetitorSuccess(successData));
    } else {
      yield put(VisitsActions.getCompetitorFailure());
    }
  } catch (error) {
    // console.log('Error', error)
    yield put(VisitsActions.getCompetitorFailure());
  }
}

export function* getStock({ payload }) {
  const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
  if (!isOnline) {
    yield put(VisitsActions.doNothing());
    return;
  }
  yield put(VisitsActions.getStockLoading());
  try {
    let executeVisitData = yield select(
      (state) => state.visits.executeVisitData
    );

    if (!payload.show) {
      payload.visit_id = executeVisitData.sfid || executeVisitData.pg_id__c;
    }

    let successData = yield call(visitsService.getStock, payload);
    if (successData) {
      //successData = HelperService.convertToSearchableListFormat({ list: successData, id_key: 'sfid', label_key: 'name' });
      yield put(VisitsActions.getStockSuccess(successData));
      //yield put(VisitsActions.addStockForm({successData}))
    } else {
      yield put(VisitsActions.getStockFailure());
    }
  } catch (error) {
    // console.log('Error', error)
    yield put(VisitsActions.getStockFailure());
  }
}

export function* getParentAreas({ payload }) {
  const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
  if (!isOnline) {
    yield put(VisitsActions.doNothing());
    return;
  }
  yield put(VisitsActions.getParentAreasLoading());
  try {
    let executeVisitData = yield select(
      (state) => state.visits.executeVisitData
    );
    let selectedRetailer = yield select(
      (state) => state.retailers.selectedRetailer
    );

    payload.sfid = executeVisitData.area__c || selectedRetailer.data.area__c;

    let successData = yield call(visitsService.getParentAreas, payload);
    if (successData) {
      //successData = HelperService.convertToSearchableListFormat({ list: successData, id_key: 'sfid', label_key: 'name' });
      yield put(VisitsActions.getParentAreasSuccess(successData));
      //yield put(VisitsActions.addStockForm({successData}))
    } else {
      yield put(VisitsActions.getParentAreasFailure());
    }
  } catch (error) {
    // console.log('Error', error)
    yield put(VisitsActions.getParentAreasFailure());
  }
}

export function* getObjective({ payload }) {
  const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
  if (!isOnline) {
    yield put(VisitsActions.doNothing());
    return;
  }
  yield put(VisitsActions.getObjectiveLoading());
  try {
    let executeVisitData = yield select(
      (state) => state.visits.executeVisitData
    );

    let successData = yield call(visitsService.getObjective, payload);
    if (successData) {
      successData = HelperService.convertToSearchableListFormat1({
        list: successData,
      });
      yield put(VisitsActions.getObjectiveSuccess(successData));
      //yield put(VisitsActions.addStockForm({successData}))
    } else {
      yield put(VisitsActions.getObjectiveFailure());
    }
  } catch (error) {
    // console.log('Error', error)
    yield put(VisitsActions.getObjectiveFailure());
  }
}

export function* addBulkVisitsToPlan({ payload }) {
  const {
    selectedPlannedVisits,
    selectedVisitDate,
    filterList,
    retailerSearchFilters,
    user_details,
    selectedVisitPSM,
    agentid,
    pjp,
    pjpBeat,
  } = payload;

  let visitsToBeAdded = [];
  //console.log(partiesMapping[retailerSearchFilters['type']])

  filterList.map((obj) => {
    if (
      !isRetailerAdded({
        selectedPlannedVisits,
        selectedVisitDate,
        retailerSearchFilters,
        item: obj,
      })
    ) {
      visitsToBeAdded.push(
        HelperService.decorateWithLocalId({
          customer_name__c: obj.sfid,
          //  "visit_type": "Planned",
          visit_date__c: selectedVisitDate,
          //   "createddate": HelperService.getCurrentTimestamp(),
          assigned_by__c: selectedVisitPSM == agentid ? "Self" : "Manager",
          type__c: obj.account_type__c,
          name: obj.name,
          area__c: obj.area__c,
          team_id__c: selectedVisitPSM ? selectedVisitPSM : agentid,
          objective__c: "Site Verification",
          pjp_header__c: pjp,
          visit_type__c: "Planned",
        })
      );
    }
  });

  let updatedSelectedPlannedVisit = _.cloneDeep(selectedPlannedVisits);
  updatedSelectedPlannedVisit = updatedSelectedPlannedVisit.concat(
    visitsToBeAdded
  );
  yield put(
    VisitsActions.addBulkVisitsToPlanSuccess(updatedSelectedPlannedVisit)
  );
}

export function* removeBulkVisitsToPlan({ payload }) {
  const {
    selectedPlannedVisits,
    selectedVisitDate,
    filterList,
    retailerSearchFilters,
    user_details,
    selectedVisitPSM,
    agentid,
    pjp,
  } = payload;

  let visitsToBeRemoved = [];
  let updatedSelectedPlannedVisit = _.cloneDeep(selectedPlannedVisits);

  filterList.map((party) => {
    _.map(selectedPlannedVisits, (obj) => {
      console.log("obbjjj", obj);
      if (
        obj.customer_name__c == party.sfid &&
        HelperService.datesAreOnSameDay(obj.visit_date__c, selectedVisitDate)
      ) {
        visitsToBeRemoved.push(obj.local_id);
      }
    });
  });

  updatedSelectedPlannedVisit = updatedSelectedPlannedVisit.filter(
    (obj) => visitsToBeRemoved.indexOf(obj.local_id) == -1
  );

  yield put(
    VisitsActions.removeBulkVisitsToPlanSuccess(updatedSelectedPlannedVisit)
  );
}

function isRetailerAdded(payload) {
  const {
    selectedPlannedVisits,
    selectedVisitDate,
    retailerSearchFilters,
    item,
  } = payload;

  let isAdded = false;
  _.map(selectedPlannedVisits, (obj) => {
    if (
      obj.customer_name__c == item.sfid &&
      HelperService.datesAreOnSameDay(obj.visit_date__c, selectedVisitDate)
    ) {
      isAdded = true;
    }
  });

  return isAdded;
}

export function* watchVisitInfo() {
  while (true) {
    const { payload } = yield take(VisitsTypes.CREATE_VISIT_INFO);

    try {
      const validationFailed = yield call(
        ValidationService.validateVisitInfo,
        payload.form
      );
      if (validationFailed) {
        HelperService.showToast({
          message: validationFailed.error_message,
          duration: 2000,
          buttonText: "Okay",
        });
        yield put(VisitsActions.visitInfoValidationFailed(validationFailed));
        continue;
      }
    } catch (err) {}

    yield call(createVisitInfo, payload);
  }
}

export function* createVisitInfo(payload) {
  // console.log("pppyatoorrrr", payload);
  yield put(VisitsActions.createVisitInfoLoading());
  try {
    let offlinActionData = {
      apiCall: visitsService.createVisitInfo,
      resource: "createVisitInfo",
      callName: "create",
      params: HelperService.decorateWithLocalId(payload),
      timestamp: HelperService.getCurrentTimestamp(),
      successCallback: VisitsActions.createVisitInfoSuccess,
      failureCallback: VisitsActions.createVisitInfoFailure,
      replaceServerParams: false,
    };

    const successData = yield call(offlineApiCall, offlinActionData);
    if (successData) {
      //Todo : change it to userData
      yield put(
        VisitsActions.createVisitInfoSuccess({
          data: successData,
          payload: payload,
        })
      );
      NavigationService.navigate("VisitFormSuccess");

      yield put(VisitsActions.clearVisitInfo());

      yield put(
        VisitsActions.fetchVisitInfo({
          token: payload.token,
          visit_id: payload.form.zx_visit,
        })
      );

      // NavigationService.navigateAndReset("DistributorProfile");
      HelperService.showToast({
        message: "Visit Info Submit.",
        duration: 1000,
        buttonText: "",
      });
      // yield call(refreshVisitsDisplayList);
      //	yield call(refreshVisitsStorageList);
    } else {
      yield put(VisitsActions.createVisitInfoFailure());
      // console.log("eerorrr", error);
      HelperService.showToast({
        message: "Error Submitting form",
        duration: 2000,
        buttonText: "Okay",
      });
    }
  } catch (error) {
    yield put(RetailerActions.createVisitInfoFailure());
    HelperService.showToast({
      message: "Error Saving Form",
      duration: 2000,
      buttonText: "Okay",
    });
  }
}

export function* getVisitSummary({ payload }) {
  const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
  if (!isOnline) {
    yield put(VisitsActions.doNothing());
    return;
  }
  yield put(VisitsActions.getVisitSummaryLoading());
  try {
    let successData = yield call(visitsService.getVisitSummary, payload);
    if (successData) {
      yield put(VisitsActions.getVisitSummarySuccess(successData));
      // yield put(VisitsActions.setVisitInfoForm({ market_material_required__c: successData.attachmentDetail[0].market_material_required__c, remarks__c: successData.attachmentDetail[0].remarks__c}))
    } else {
      yield put(VisitsActions.getVisitSummaryFailure());
    }
  } catch (error) {
    // console.log('Error', error)
    yield put(VisitsActions.getVisitSummaryFailure());
  }
}

export function* getVisitHistory({ payload }) {
  const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
  if (!isOnline) {
    yield put(VisitsActions.doNothing());
    return;
  }
  yield put(VisitsActions.getVisitHistoryLoading());
  try {
    let successData = yield call(visitsService.getVisitHistory, payload);
    if (successData) {
      yield put(VisitsActions.getVisitHistorySuccess(successData));
      // yield put(VisitsActions.setVisitInfoForm({ market_material_required__c: successData.attachmentDetail[0].market_material_required__c, remarks__c: successData.attachmentDetail[0].remarks__c}))
    } else {
      yield put(VisitsActions.getVisitHistoryFailure());
    }
  } catch (error) {
    // console.log('Error', error)
    yield put(VisitsActions.getVisitHistoryFailure());
  }
}

export function* updateVisitInfo({ payload }) {
  // console.log("payloaddddd",payload)
  yield put(VisitsActions.updateVisitInfoLoading());
  try {
    //let user = yield select((state) => state.user);
    // payload.team__c = user.id;

    let offlinActionData = {
      apiCall: visitsService.updateVisitInfo,
      resource: "updateVisitInfo", //specify for which reducer we are using it
      callName: "update", //specify operation
      params: HelperService.decorateWithLocalId(payload),
      timestamp: HelperService.getCurrentTimestamp(),
      successCallback: VisitsActions.updateVisitInfoSuccess,
      failureCallback: VisitsActions.updateVisitInfoFailure,
      replaceServerParams: false,
    };

    const successData = yield call(offlineApiCall, offlinActionData);
    //   console.log(successData)
    let executeVisitData = yield select(
      (state) => state.visits.executeVisitData
    );
    let token = yield select((state) => state.user.token);
    if (successData) {
      yield put(
        VisitsActions.updateVisitInfoSuccess({
          data: successData,
          payload: payload,
        })
      );
      // yield put(VisitsActions.clearUpdateLongForm());
      NavigationService.navigate("UpdateVisitSuccess");
      yield put(VisitsActions.clearVisitInfo());

      // yield put(CommonActions.closeModal());
      yield put(
        VisitsActions.fetchVisitInfo({
          token: token,
          visit_id: executeVisitData.zx_visitsid,
        })
      );
      HelperService.showToast({
        message: "Updated Successfully",
        duration: 1000,
        buttonText: "",
      });

      //	NavigationService.navigate('StartVisitForm');
    } else {
      yield put(VisitsActions.updateVisitInfoFailure());
      HelperService.showToast({
        message: "Updation failed!! Try Again.",
        duration: 2000,
        buttonText: "Okay",
      });
    }
  } catch (error) {
    yield put(VisitsActions.updateVisitInfoFailure());
    HelperService.showToast({
      message: error,
      duration: 2000,
      buttonText: "Okay",
    });
    //   console.log(error);
  }
}

export function* ChangeNewCompetitorForm({ payload }) {
  // console.log("payloaddddbody", payload);
  let cart = yield select((state) => state.visits.AddCompForm);
  let itemAlreadyPresent = false;
  // for (let obj of cart) {
  //   if (obj.id == payload.id) {
  //     obj[payload.edited_field] = payload.edited_value;
  //   }
  //   return obj;
  // }
  cart = cart.map((obj) => {
    if (obj.id == payload.id) {
      obj[payload.edited_field] = payload.edited_value;
    }
    return obj;
  });

  // if (!itemAlreadyPresent) {
  //   cart.cartItem.push(payload);
  // }

  yield put(VisitsActions.ChangeNewCompetitorFormSuccess(cart));
}
