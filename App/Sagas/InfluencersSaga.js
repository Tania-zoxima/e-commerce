import NavigationService from "App/Services/NavigationService";
import { HelperService } from "App/Services/Utils/HelperService";
import { ValidationService } from "App/Services/ValidationService";
import { getConnectionStatus } from "App/Stores/Common/Selectors";
import { call, put, select, take } from "redux-saga/effects";
import { influencersService } from "../Services/Api/InfluencersService";
import InfluencersActions, {
  InfluencersTypes,
} from "../Stores/Influencers/Actions";
import SiteActions from "../Stores/Sites/Actions";
import { offlineApiCall } from "./OfflineSaga";

export function* watchCreateInfluencerRequest() {
  while (true) {
    const { payload } = yield take(InfluencersTypes.INFLUENCER_FORM);

    try {
      const validationFailed = yield call(
        ValidationService.validateInfluencerForm,
        payload.form
      );
      if (validationFailed) {
        HelperService.showToast({
          message: validationFailed.error_message,
          duration: 2000,
          buttonText: "Okay",
        });
        yield put(
          InfluencersActions.influencerFormValidationFailed(validationFailed)
        );
        continue;
      }
    } catch (err) {
      console.log(err);
    }

    yield call(influencerForm, payload);
  }
}

export function* watchUpdateInfluencerRequest() {
  while (true) {
    const { payload } = yield take(InfluencersTypes.UPDATE_INFLUENCER);
    try {
      const validationFailed = yield call(
        ValidationService.validateInfluencerForm,
        payload
      );
      if (validationFailed) {
        HelperService.showToast({
          message: validationFailed.error_message,
          duration: 2000,
          buttonText: "Okay",
        });
        yield put(
          InfluencersActions.influencerFormValidationFailed(validationFailed)
        );
        continue;
      }
    } catch (err) {
      console.log(err);
    }
    yield call(updateInfluencer, payload);
  }
}

export function* createInfluencer(payload) {
  yield put(InfluencersActions.createInfluencerLoading());
  try {
    let offlinActionData = {
      apiCall: influencersService.createInfluencer,
      resource: "createInfluencer", //specify for which reducer we are using it
      callName: "create", //specify operation
      params: HelperService.decorateWithLocalId(payload),
      timestamp: HelperService.getCurrentTimestamp(),
      successCallback: InfluencersActions.createInfluencerSuccess,
      failureCallback: InfluencersActions.createInfluencerFailure,
      replaceServerParams: false,
    };

    const successData = yield call(offlineApiCall, offlinActionData);

    if (successData) {
      //Todo : change it to userData
      yield put(
        InfluencersActions.createInfluencerSuccess({
          data: successData,
          payload: payload,
        })
      );
      HelperService.showToast({
        message: "Influencer created Successfully.",
        duration: 1000,
        buttonText: "",
      });

      //navigate to today's visit page

      let user = yield select((state) => state.user);
      let influencers = yield select((state) => state.influencers);

      yield put(
        InfluencersActions.fetchInfluencers({
          token: user.token,
          agentid: user.id,
          offset: influencers.influencersOffset,
          limit: influencers.influencersLimit,
        })
      );
      NavigationService.navigate("InfluencersListScreen");
    } else {
      yield put(InfluencersActions.createInfluencerFailure());
      HelperService.showToast({
        message: "Cannot Create Influencer. Try after some time",
        duration: 2000,
        buttonText: "Okay",
      });
    }
  } catch (error) {
    console.log("Error", error);
    yield put(InfluencersActions.createInfluencerFailure());
    HelperService.showToast({
      message: error,
      duration: 2000,
      buttonText: "Okay",
    });
  }
}

export function* updateInfluencer(payload) {
  yield put(InfluencersActions.updateInfluencerLoading());
  try {
    let offlinActionData = {
      apiCall: influencersService.updateInfluencer,
      resource: "updateInfluencer", //specify for which reducer we are using it
      callName: "create", //specify operation
      params: HelperService.decorateWithLocalId(payload),
      timestamp: HelperService.getCurrentTimestamp(),
      successCallback: InfluencersActions.updateInfluencerSuccess,
      failureCallback: InfluencersActions.updateInfluencerFailure,
      replaceServerParams: false,
    };

    const successData = yield call(offlineApiCall, offlinActionData);

    if (successData) {
      //Todo : change it to userData
      yield put(InfluencersActions.updateInfluencerSuccess(payload));
      HelperService.showToast({
        message: "Influencer Updated Successfully",
        duration: 1000,
        buttonText: "",
      });
      let user = yield select((state) => state.user);
      let influencers = yield select((state) => state.influencers);

      yield put(
        InfluencersActions.fetchInfluencers({
          token: user.token,
          agentid: user.id,
          offset: influencers.influencersOffset,
          limit: influencers.influencersLimit,
        })
      );

      NavigationService.navigateAndReset("InfluencersListScreen");
    } else {
      yield put(InfluencersActions.updateInfluencerFailure());
      HelperService.showToast({
        message: "Influencer Updation failed!! Try Again.",
        duration: 2000,
        buttonText: "Okay",
      });
    }
  } catch (error) {
    yield put(InfluencersActions.updateInfluencerFailure());
    HelperService.showToast({
      message: error,
      duration: 2000,
      buttonText: "Okay",
    });
  }
}

export function* watchCreateContactRequest() {
  while (true) {
    const { payload } = yield take(InfluencersTypes.CREATE_INFLUENCER);
    try {
      const validationFailed = yield call(
        ValidationService.validateInfluencerForm,
        payload
      );
      if (validationFailed) {
        HelperService.showToast({
          message: validationFailed.error_message,
          duration: 2000,
          buttonText: "Okay",
        });
        yield put(
          InfluencersActions.influencerFormValidationFailed(validationFailed)
        );
        continue;
      }
    } catch (err) {
      console.log(err);
    }

    yield call(createContact, payload);
  }
}

export function* fetchInfluencers({ payload }) {
  const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
  if (!isOnline) {
    yield put(InfluencersActions.doNothing());
    return;
  }
  yield put(InfluencersActions.fetchInfluencersLoading());
  try {
    let successData = yield call(influencersService.fetchInfluencers, payload);
    if (successData) {
      yield put(InfluencersActions.fetchInfluencersSuccess(successData));
      let influencerSearchableList = HelperService.convertToSearchableListFormat(
        {
          list: successData.map((obj) => obj),
          id_key: "sfid",
          label_key: "name",
        }
      );
      yield put(
        SiteActions.makeInfluencerSearchableList(influencerSearchableList)
      );
    } else {
      yield put(InfluencersActions.fetchInfluencersFailure());
    }
  } catch (error) {
    console.log("Error", error);
    yield put(InfluencersActions.fetchInfluencersFailure());
  }
}

export function* fetchInfluencerSites({ payload }) {
  const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
  if (!isOnline) {
    yield put(InfluencersActions.doNothing());
    return;
  }
  yield put(InfluencersActions.fetchInfluencerSiteLoading());
  try {
    let successData = yield call(
      influencersService.fetchInfluencerSites,
      payload
    );
    if (successData) {
      yield put(InfluencersActions.fetchInfluencerSiteSuccess(successData));
    } else {
      yield put(InfluencersActions.fetchInfluencerSiteFailure());
    }
  } catch (error) {
    console.log("Error", error);
    yield put(InfluencersActions.fetchInfluencerSiteFailure());
  }
}

export function* extractInfluencerInfoData({ payload }) {
  try {
    let id = payload.id;
    let selectedInfluencerdata = {};
    let influencerList = yield select(
      (state) => state.influencers.influencerList
    );
    if (influencerList && influencerList.length) {
      influencerList.map((obj) => {
        if (obj.id == id) {
          selectedInfluencerdata = obj.data;
        }
      });

      yield put(
        InfluencersActions.selectInfluencer({
          id: id,
          data: selectedInfluencerdata,
          type: "Influencers",
        })
      );
    } else {
      let influencers = yield select((state) => state.influencers);
      let user = yield select((state) => state.user);
      let successData = yield call(influencersService.fetchInfluencers, {
        agentid: user.id,
        token: user.token,
        offset: influencers.influencerOffset,
        limit: influencers.influencerLimit,
      });

      if (successData) {
        yield put(InfluencersActions.fetchInfluencersSuccess(successData));
        if (successData && successData.length) {
          successData.map((obj) => {
            if (obj.data.id == id) {
              selectedInfluencerdata = obj.data;
            }
          });
          yield put(
            InfluencersActions.selectInfluencer({
              id: id,
              data: selectedInfluencerdata,
              type: "Influencers",
            })
          );
        }
      } else {
        yield put(InfluencersActions.fetchInfluencersFailure());
      }
    }
  } catch (error) {
    yield put(InfluencersActions.doNothing());
  }
}

export function* influencerForm(payload) {
  yield put(InfluencersActions.influencerFormLoading());
  try {
    let offlinActionData = {
      apiCall: influencersService.createInfluencer,
      resource: "createInfluencer",
      callName: "create",
      params: HelperService.decorateWithLocalId(payload),
      timestamp: HelperService.getCurrentTimestamp(),
      successCallback: InfluencersActions.influencerFormSuccess,
      failureCallback: InfluencersActions.influencerFormFailure,
      replaceServerParams: false,
    };

    const successData = yield call(offlineApiCall, offlinActionData);
    if (successData) {
      //Todo : change it to userData
      yield put(
        InfluencersActions.influencerFormSuccess({
          data: successData,
          payload: payload,
        })
      );
      yield put(InfluencersActions.clearInfluencerForm());
      NavigationService.navigate("InfluncerSuccess");
      // NavigationService.navigate("DistributorProfile");
      HelperService.showToast({
        message: "Form Submitted",
        duration: 1000,
        buttonText: "",
      });
      // yield call(refreshVisitsDisplayList);
      //	yield call(refreshVisitsStorageList);
    } else {
      yield put(InfluencersActions.influencerFormFailure());
      // console.log("eerorrr", error);
      HelperService.showToast({
        message: "Error Submitting form",
        duration: 2000,
        buttonText: "Okay",
      });
    }
  } catch (error) {
    yield put(InfluencersActions.influencerFormFailure());
    HelperService.showToast({
      message: "Error Saving Form",
      duration: 2000,
      buttonText: "Okay",
    });
  }
}
