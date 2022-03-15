import { put, call, take, select } from "redux-saga/effects";
import { UserTypes } from "App/Stores/User/Actions";
import UserActions from "App/Stores/User/Actions";
import { userService } from "App/Services/Api/UserService";
import { ValidationService } from "App/Services/ValidationService";
import { Toast } from "native-base";
import NavigationService from "App/Services/NavigationService";
import { HelperService } from "App/Services/Utils/HelperService";
import { getConnectionStatus } from "App/Stores/Common/Selectors";
import ActionQueuesActions from "App/Stores/ActionQueues/Actions";
import { offlineApiCall } from "./OfflineSaga";
import StartupActions from "App/Stores/Startup/Actions";
import InfluencerActions from "../Stores/Influencers/Actions";
import SiteActions from "../Stores/Sites/Actions";
import _, { concat } from "lodash";
import moment from "moment";
import AsyncStorage from "@react-native-community/async-storage";
var deviceId = HelperService.getDeviceId();

export function* loginUser(data) {
  yield put(UserActions.userLoginLoading());
  const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
  if (!isOnline) {
    yield put(UserActions.userLoginFailure());
    HelperService.showToast({
      message: "Cannot Login. No Internet connection.",
      duration: 2000,
      buttonText: "Okay",
    });
    return;
  }

  try {
    const userData = yield call(userService.loginUser, data);
    let user = yield select((state) => state.user);
    // console.log(userData);
    if (userData) {
      yield put(UserActions.userLoginSuccess(userData));
      yield put(
        UserActions.fetchAllPsmSuccess(
          HelperService.convertToSearchableListName({
            list: userData.subordinates,
            id_key: "zx_teamid",
            label_key: "zx_firstname",
            label_key1: "zx_lastname",
            label_key2: "dsr_name",
            label_key3: "zx_employeecode",
          })
        )
      );
      //if(!data.show){
      HelperService.showToast({
        message: "Logged in successfully!!",
        duration: 1000,
        buttonText: "",
      });
      yield put(
        UserActions.loginUserSession({
          id: user.id,
        })
      );

      yield put(StartupActions.startup());
      //}

      //if(data.show){
      //HelperService.showToast({ message: 'Enter OTP to Logged in successfully', duration: 1000, buttonText: '' });
      //NavigationService.navigate('LoginOtpScreen')}
      // NavigationService.navigateAndReset('DashboardScreen');
      // yield put(UserActions.fetchAllAreas({token: userData.token, agentid: userData.id}));//fetch all areas
      // yield put(UserActions.fetchAgentDetails({token: userData.token, agentid: userData.id}));// //fetch agent details
    } else {
      yield put(UserActions.userLoginFailure());
      HelperService.showToast({
        message: "Cannot Login. Invalid Number or Password",
        duration: 2000,
        buttonText: "Okay",
      });
    }
  } catch (error) {
    yield put(UserActions.userLoginFailure());
    HelperService.showToast({
      message: error,
      duration: 2000,
      buttonText: "Okay",
    });
  }
}
export function* loginUserSession(data) {
  // console.log("dataaaa", data);
  yield put(UserActions.userLoginSessionLoading());
  const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
  if (!isOnline) {
    yield put(UserActions.userLoginSessionFailure());
    HelperService.showToast({
      message: "Cannot Login. No Internet connection.",
      duration: 2000,
      buttonText: "Okay",
    });
    return;
  }

  try {
    let user = yield select((state) => state.user);
    const userData = yield call(userService.loginUserSession, user);

    if (userData) {
      yield put(UserActions.userLoginSessionSuccess(userData));
      yield put(
        UserActions.checkAttendance({
          token: user.token,
          date: HelperService.getCurrentTimestamp(),
        })
      );
      // yield put(UserActions.getSubArea({
      //   token:user.token,
      //   zx_team: user.id
      //    }));
      //if(!data.show){
      // HelperService.showToast({
      //   message: "Logged in Session successfully!!",
      //   duration: 1000,
      //   buttonText: "",
      // });
      //yield put(StartupActions.startup())
      //}

      //if(data.show){
      //HelperService.showToast({ message: 'Enter OTP to Logged in successfully', duration: 1000, buttonText: '' });
      //NavigationService.navigate('LoginOtpScreen')}
      // NavigationService.navigateAndReset('DashboardScreen');
      // yield put(UserActions.fetchAllAreas({token: userData.token, agentid: userData.id}));//fetch all areas
      // yield put(UserActions.fetchAgentDetails({token: userData.token, agentid: userData.id}));// //fetch agent details
    } else {
      yield put(UserActions.userLoginSessionFailure());
      //HelperService.showToast({ message: 'Cannot Login. Invalid Number or Password', duration: 2000, buttonText: 'Okay' });
    }
  } catch (error) {
    yield put(UserActions.userLoginSessionFailure());
    HelperService.showToast({
      message: error,
      duration: 2000,
      buttonText: "Okay",
    });
  }
}

export function* startDay(data) {
  yield put(UserActions.userStartDayLoading());
  try {
    let offlinActionData = {
      apiCall: userService.startDay,
      resource: "startDay", //specify for which reducer we are using it
      callName: "create", //specify operation
      params: HelperService.decorateWithLocalId(data),
      timestamp: HelperService.getCurrentTimestamp(),
      successCallback: UserActions.userStartDaySuccess,
      failureCallback: UserActions.userStartDayFailure,
      replaceServerParams: false,
    };

    const userData = yield call(offlineApiCall, offlinActionData);
    // console.log("userData", userData);
    if (userData) {
      yield put(UserActions.userStartDaySuccess(data));
      let message = "Marked Present Successfully";
      switch (data.present_type) {
        case "In Office":
          message = "Marked In Office Successfully";
          break;
        case "Work From Home":
          message = "Marked Work From Home Successfully";
          break;
        case "Market Visit":
          message = "Marked Present Successfully";
          break;
        default:
          message = "Marked Present Successfully";
      }

      HelperService.showToast({
        message: message,
        duration: 1000,
        buttonText: "",
      });
      NavigationService.navigateAndReset("VisitsScreen");
    } else {
      yield put(UserActions.userStartDayFailure());
      HelperService.showToast({
        message: "Cannot Repeat action, Marked Present Already.",
        duration: 2000,
        buttonText: "Okay",
        style: {
          backgroundColor: "green",
          zIndex: 5,
        },
      });
    }
  } catch (error) {
    yield put(UserActions.userStartDayFailure());
    HelperService.showToast({
      message: error,
      duration: 2000,
      buttonText: "Okay",
    });
  }
}

export function* endDay({ user }) {
  yield put(UserActions.userEndDayLoading());
  try {
    let offlinActionData = {
      apiCall: userService.endDay,
      resource: "endDay", //specify for which reducer we are using it
      callName: "create", //specify operation
      params: HelperService.decorateWithLocalId(user),
      timestamp: HelperService.getCurrentTimestamp(),
      successCallback: UserActions.userEndDaySuccess,
      failureCallback: UserActions.userEndDayFailure,
      replaceServerParams: false,
    };

    const userData = yield call(offlineApiCall, offlinActionData);

    if (userData) {
      yield put(UserActions.userEndDaySuccess(user));
      HelperService.showToast({
        message: "Day Ended Successfully.",
        duration: 1000,
        buttonText: "",
      });
      NavigationService.navigateAndReset("CompletedDayScreen");
      setTimeout(() => {
        NavigationService.navigateAndReset("DashboardScreen");
      }, 2000);
    } else {
      yield put(UserActions.userEndDayFailure());
      HelperService.showToast({
        message: "Error Occurred , Try Again",
        duration: 2000,
        buttonText: "Okay",
      });
    }
  } catch (error) {
    yield put(UserActions.userEndDayFailure());
    HelperService.showToast({
      message: "Error Occurred , Try Again",
      duration: 2000,
      buttonText: "Okay",
    });
  }
}

export function* markAbsent({ user }) {
  yield put(UserActions.userMarkedAbsentLoading());
  try {
    let offlinActionData = {
      apiCall: userService.markUserAbsent,
      resource: "markAbsent", //specify for which reducer we are using it
      callName: "create", //specify operation
      params: HelperService.decorateWithLocalId(user),
      timestamp: HelperService.getCurrentTimestamp(),
      successCallback: UserActions.userMarkedAbsentSuccess,
      failureCallback: UserActions.userMarkedAbsentFailure,
      replaceServerParams: false,
    };

    const userData = yield call(offlineApiCall, offlinActionData);
    if (userData) {
      //Todo : change it to user
      yield put(UserActions.userMarkedAbsentSuccess(user));
      HelperService.showToast({
        message: "Absent Marked successfully.",
        duration: 1000,
        buttonText: "",
      });
      NavigationService.navigateAndReset("DashboardScreen");
    } else {
      yield put(UserActions.userMarkedAbsentFailure());
      HelperService.showToast({
        message: "Cannot Repeat action, Absent Already Marked.",
        duration: 2000,
        buttonText: "Okay",
      });
    }
  } catch (error) {
    yield put(UserActions.userMarkedAbsentFailure());
    HelperService.showToast({
      message: "Cannot Repeat action, Absent Already Marked.",
      duration: 2000,
      buttonText: "Okay",
    });
  }
}

export function* fetchAgentAreas(payload) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(UserActions.doNothing());
    return;
  }

  yield put(UserActions.fetchAllAreasLoading());

  try {
    let user = yield select((state) => state.user);
    payload.team__c = user.id;

    let data = yield call(userService.getAgentAreas, payload);
    if (data) {
      let data2 = HelperService.sortListFilter(
        data.city,
        "area_name__c",
        "ASC"
      );
      data2 = HelperService.convertToSearchableListFormat({
        list: data.city,
        id_key: "sfid",
        label_key: "area_name__c",
      });
      let data1 = HelperService.sortListFilter(
        data.area,
        "area_name__c",
        "ASC"
      );
      data1 = HelperService.convertToSearchableListFormat({
        list: data.area,
        id_key: "sfid",
        label_key: "area_name__c",
      });
      yield put(UserActions.fetchAllAreasSuccess({ data1, data2 }));
    } else {
      yield put(UserActions.fetchAllAreasFailure());
    }
  } catch (error) {
    // console.log("Error", error);
    yield put(UserActions.fetchAllAreasFailure());
  }
}

export function* logoutUser(data) {
  yield put(UserActions.userLogoutLoading());
  const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
  if (!isOnline) {
    yield put(UserActions.userLogoutFailure());
    HelperService.showToast({
      message: "Cannot Logout. No Internet connection.",
      duration: 2000,
      buttonText: "Okay",
    });
    return;
  }
  try {
    let user = yield select((state) => state.user);
    let sfid = user.id;
    data.id = sfid;

    let userData = yield call(userService.logoutUser, data);
    if (userData) {
      yield put(UserActions.userLogoutSuccess(userData.data));
      HelperService.showToast({
        message: "Logged Out successfully!!",
        duration: 500,
        buttonText: "",
      });
      yield put(
        UserActions.logoutUserSession({
          id: user.id,
          token: user.token,
        })
      );
      NavigationService.navigateAndReset("LoginScreen");
    } else {
      yield put(UserActions.userLogoutFailure());
      HelperService.showToast({
        message: "Cannot Logout. ",
        duration: 2000,
        buttonText: "Okay",
      });
    }
  } catch (error) {
    yield put(UserActions.userLogoutFailure());
    HelperService.showToast({
      message: error,
      duration: 2000,
      buttonText: "Okay",
    });
  }
}

export function* logoutUserSession(data) {
  yield put(UserActions.userLogoutSessionLoading());
  const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
  if (!isOnline) {
    yield put(UserActions.userLogoutSessionFailure());
    HelperService.showToast({
      message: "Cannot Logout. No Internet connection.",
      duration: 2000,
      buttonText: "Okay",
    });
    return;
  }
  try {
    let user = yield select((state) => state.user);
    let sfid = user.id;
    data.id = sfid;

    let userData = yield call(userService.logoutUserSession, data);
    if (userData) {
      yield put(UserActions.userLogoutSessionSuccess(userData.data));

      NavigationService.navigateAndReset("LoginScreen");
    } else {
      yield put(UserActions.userLogoutSessionFailure());
      // HelperService.showToast({ message: 'Cannot Logout. ' , duration: 2000, buttonText: 'Okay' });
    }
  } catch (error) {
    yield put(UserActions.userLogoutSessionFailure());
    HelperService.showToast({
      message: error,
      duration: 2000,
      buttonText: "Okay",
    });
  }
}

export function* fetchAgentDetails({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(UserActions.doNothing());
    return;
  }

  try {
    let data = yield call(userService.getAgentDetails, payload);
    if (data) {
      yield put(UserActions.fetchAgentDetailsSuccess(data));
    } else {
      yield put(UserActions.fetchAgentDetailsFailure());
    }
  } catch (error) {
    // console.log("Error", error);
    yield put(UserActions.fetchAgentDetailsFailure());
  }
}

export function* checkAttendance({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(UserActions.doNothing());
    return;
  }
  try {
    let user = yield select((state) => state.user);
    payload.team__c = user.id;

    let data = yield call(userService.checkAttendance, payload);
    // console.log("dataaaa", data);
    if (data && !_.isEmpty(data)) {
      // absent_reason__c: null
      // attendance_date__c: 1591401600000
      // checkin_address: "Unnamed Road, SST Nagar, Patiala, Punjab 147001, India"
      // checkin_address__c: "Unnamed Road, SST Nagar, Patiala, Punjab 147001, India"
      // checkin_location__latitude__s: 30.3354539
      // checkin_location__longitude__s: 76.4217514
      // checkout_address: "N/A"
      // checkout_address__c: null
      // checkout_location__latitude__s: null
      // checkout_location__longitude__s: null
      // createddate: 1591473153000
      // end_day__c: false
      // end_time__c: null
      // name: null
      // pg_id__c: "b8da89d1-b7ad-4ae2-996f-b26a1e850ec4"
      // sfid: null
      // start_day__c: true
      // start_time__c: "19:52:33"
      // team__c: "a0m2y000000PJviAAG"
      // type__c: "Present"
      yield call(updateAttendance, data);
    } else {
      yield put(UserActions.checkAttendanceFailure());
    }
  } catch (error) {
    // console.log("checkAttendance Error", error);
    yield put(UserActions.checkAttendanceFailure());
  }
}

export function* fetchAllPsm(payload) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(UserActions.doNothing());
    return;
  }

  try {
    let user = yield select((state) => state.user);
    payload.manager_id = user.id;

    let data = yield call(userService.getAllPSM, payload);
    if (data) {
      data = HelperService.sortListFilter(data, "zx_firstname", "ASC");
      yield put(
        UserActions.fetchAllPsmSuccess(
          HelperService.convertToSearchableListName({
            list: data,
            id_key: "zx_teamid",
            label_key: "zx_firstname",
            label_key1: "zx_lastname",
          })
        )
      );
    } else {
      yield put(UserActions.fetchAllPsmFailure());
    }
  } catch (error) {
    // console.log("error", error);
    yield put(UserActions.fetchAllPsmFailure());
  }
}

export function* updateAttendance(payload) {
  // console.log("payloaddd", payload);
  // console.log("treeeee", payload);
  try {
    let currentDate = HelperService.getCurrentTimestamp();
    let absentDayTime =
      payload.zx_attendancetype == "Absent" ? currentDate : null;
    let startDayTime = null;
    let endDayTime = null;

    if (payload.zx_startdaydateandtime && !payload.zx_enddaydateandtime) {
      startDayTime = Date.parse(payload.createdon);
      //   console.log("ssssttartttt",startDayTime)
      //startDayTime= startDayTime.getTime()
      startDayTime = startDayTime - (11 / 2) * 60 * 1000 * 60;
      // startDayTime = moment.unix(currentDate/1000).format("YYYY-MM-DD");

      // startDayTime = startDayTime + ' ' + payload.createdon;
      // console.log("starttime",startDayTime)
      // startDayTime = HelperService.convertStringToDate(startDayTime);
    }

    if (payload.zx_startdaydateandtime && payload.zx_enddaydateandtime) {
      endDayTime = Date.parse(payload.zx_enddaydateandtime);
      // console.log("ssssttartttt",endDayTime)
      //startDayTime= startDayTime.getTime()
      endDayTime = endDayTime - (11 / 2) * 60 * 1000 * 60;
      //   endDayTime = moment.unix(currentDate / 1000).format("YYYY-MM-DD");
      //   endDayTime = endDayTime + " " + payload.zx_enddaydateandtime;
      //   endDayTime = HelperService.convertStringToDate(endDayTime);
    }

    yield put(
      UserActions.updateAgentAttendanceDetails({
        absentDayTime,
        startDayTime,
        endDayTime,
      })
    );
  } catch (error) {
    // console.log("updateAttendance: ", error);
  }
}

export function* watchUserLoginRequest() {
  while (true) {
    const { data } = yield take(UserTypes.LOGIN_USER);

    try {
      const validationFailed = yield call(
        ValidationService.validateLoginForm,
        data
      );
      if (validationFailed) {
        HelperService.showToast({
          message: validationFailed.error_message,
          duration: 2000,
          buttonText: "Okay",
        });
        yield put(UserActions.userLoginValidationFailed(validationFailed));
        continue;
      }
    } catch (err) {}

    yield call(loginUser, data);
  }
}

export function* watchUserStartDayRequest() {
  while (true) {
    const { user } = yield take(UserTypes.START_USER_DAY);
    try {
      const validationFailed = yield call(
        ValidationService.validateStartDay,
        user
      );
      if (validationFailed) {
        HelperService.showToast({
          message: validationFailed.error_message,
          duration: 2000,
          buttonText: "Okay",
        });
        yield put(UserActions.userStartDayValidationFailed(validationFailed));
        continue;
      }
    } catch (err) {
      // console.log(err);
    }
    yield call(startDay, user);
  }
}

export function* watchUserLogoutRequest() {
  while (true) {
    const { data } = yield take(UserTypes.LOGOUT_USER);

    yield call(logoutUser, data);
  }
}

export function* getProfile({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(UserActions.doNothing());
    return;
  }
  yield put(UserActions.getProfileLoading());

  try {
    let data = yield call(userService.getProfile, payload);
    if (data) {
      yield put(UserActions.getProfileSuccess(data));
    } else {
      yield put(UserActions.getProfileFailure());
    }
  } catch (error) {
    // console.log("Error", error);
    yield put(UserActions.getProfileFailure());
  }
}

export function* submitResetForm({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(UserActions.doNothing());
    return;
  }
  yield put(UserActions.submitResetFormLoading());
  try {
    let data = yield call(userService.resetPassword, payload);
    if (data) {
      yield put(UserActions.submitResetFormSuccess(data));
      HelperService.showToast({
        message: "Password Changed Successfully!!",
        duration: 500,
        buttonText: "",
      });
      yield put(UserActions.clearResetForm());
      NavigationService.navigate("ChangePasswordSuccess");
    } else {
      yield put(UserActions.submitResetFormFailure());
      HelperService.showToast({
        message: "Error in Changing Password",
        duration: 500,
        buttonText: "",
      });
    }
  } catch (error) {
    // console.log("Error", error);
    yield put(UserActions.submitResetFormFailure());
  }
}

export function* submitGetOtp({ payload }) {
  yield put(UserActions.submitGetOtpLoading());
  try {
    // let user = yield select(state => state.user)
    // payload.team__c = user.id

    let offlinActionData = {
      apiCall: userService.getOtp,
      resource: "getOtp", //specify for which reducer we are using it
      callName: "create", //specify operation
      params: HelperService.decorateWithLocalId(payload),
      timestamp: HelperService.getCurrentTimestamp(),
      successCallback: UserActions.submitGetOtpSuccess,
      failureCallback: UserActions.submitGetOtpFailure,
      replaceServerParams: false,
    };

    const successData = yield call(offlineApiCall, offlinActionData);
    // console.log("abc", successData);

    if (successData) {
      //Todo : change it to userData
      yield put(UserActions.submitGetOtpSuccess(payload));
      // yield put(RetailerActions.clearForm());

      NavigationService.navigate("ResetScreen");
      //  yield put(UserActions.clearOtp());

      HelperService.showToast({
        message: "OTP has been sent successfully.",
        duration: 1000,
        buttonText: "",
      });
    } else {
      yield put(UserActions.submitGetOtpFailure());
      HelperService.showToast({
        message: "Username is incorrect",
        duration: 2000,
        buttonText: "Okay",
      });
    }
  } catch (error) {
    // console.log("Error", error);
    yield put(UserActions.submitGetOtpFailure());
    HelperService.showToast({
      message: error,
      duration: 2000,
      buttonText: "Okay",
    });
  }
}

export function* submitResetOtp({ payload }) {
  yield put(UserActions.submitResetOtpLoading());
  try {
    // let user = yield select(state => state.user)
    // payload.team__c = user.id

    let offlinActionData = {
      apiCall: userService.resetOtp,
      resource: "resetOtp", //specify for which reducer we are using it
      callName: "create", //specify operation
      params: HelperService.decorateWithLocalId(payload),
      timestamp: HelperService.getCurrentTimestamp(),
      successCallback: UserActions.submitResetOtpSuccess,
      failureCallback: UserActions.submitResetOtpFailure,
      replaceServerParams: false,
    };

    const successData = yield call(offlineApiCall, offlinActionData);
    // console.log("ddddaaattttaaa", successData);
    if (successData) {
      //Todo : change it to userData
      yield put(UserActions.submitResetOtpSuccess(successData));

      NavigationService.navigate("NewPassword");
      yield put(UserActions.clearBoxes());

      HelperService.showToast({
        message: "Submitted successfully.",
        duration: 1000,
        buttonText: "",
      });
    } else {
      yield put(UserActions.submitResetOtpFailure());
      HelperService.showToast({
        message: "OTP is incorrect",
        duration: 2000,
        buttonText: "Okay",
      });
    }
  } catch (error) {
    // console.log("Error", error);
    yield put(UserActions.submitResetOtpFailure());
    HelperService.showToast({
      message: error,
      duration: 2000,
      buttonText: "Okay",
    });
  }
}

export function* ResetPasswordOtp({ payload }) {
  yield put(UserActions.ResetPasswordOtpLoading());
  try {
    // let user = yield select(state => state.user)
    // payload.team__c = user.id

    let offlinActionData = {
      apiCall: userService.resetPasswordOtp,
      resource: "resetPasswordOtp", //specify for which reducer we are using it
      callName: "create", //specify operation
      params: HelperService.decorateWithLocalId(payload),
      timestamp: HelperService.getCurrentTimestamp(),
      successCallback: UserActions.ResetPasswordOtpSuccess,
      failureCallback: UserActions.ResetPasswordOtpFailure,
      replaceServerParams: false,
    };

    const successData = yield call(offlineApiCall, offlinActionData);
    // console.log("ddddaaattttaaa", successData);
    if (successData) {
      //Todo : change it to userData
      yield put(UserActions.ResetPasswordOtpSuccess(payload));

      NavigationService.navigate("LoginScreen");
      yield put(UserActions.clearPassword());

      HelperService.showToast({
        message: "Password reset successfully.",
        duration: 1000,
        buttonText: "",
      });
    } else {
      yield put(UserActions.ResetPasswordOtpFailure());
      HelperService.showToast({
        message: "Password reset failed",
        duration: 2000,
        buttonText: "Okay",
      });
    }
  } catch (error) {
    // console.log("Error", error);
    yield put(UserActions.ResetPasswordOtpFailure());
    HelperService.showToast({
      message: error,
      duration: 2000,
      buttonText: "Okay",
    });
  }
}

export function* userPicUpload(payload) {
  // console.log("reset payload", payload);
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(UserActions.doNothing());
    return;
  }

  try {
    yield put(UserActions.userPicUploadLoading());
    let { token } = yield select((state) => state.user);
    let { id } = yield select((state) => state.user);
    payload.token = token;
    payload.id = id;

    let data = yield call(userService.uploadProfile, payload);
    if (data) {
      // console.log("data", data);
      HelperService.showToast({
        message: "Profile picture uploaded",
        duration: 3000,
        buttonText: "Okay",
      });
      // data =HelperService.sortListFilter(data, 'team_member_name__c' , 'ASC');
      // yield put(UserActions.fetchAllPsmSuccess(HelperService.convertToSearchableListFormat({ list: data, id_key: 'sfid', label_key: 'team_member_name__c' })));
      yield put(UserActions.userPicUploadSuccess(payload.payload.picUrl));
      yield put(UserActions.getProfile({ id: id, token: token }));
    } else {
      yield put(UserActions.userPicUploadFailed());
    }
  } catch (error) {
    // console.log("error", error);
    yield put(UserActions.userPicUploadFailed());
  }
}

export function* getSubArea({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(UserActions.doNothing());
    return;
  }

  yield put(UserActions.getSubAreaLoading());

  try {
    let successData = yield call(userService.subArea, payload);
    if (successData) {
      yield put(UserActions.getSubAreaSuccess(successData));
      // if (payload.show == true) {
      //   yield put(
      //     InfluencersAction.changeInfluenceForm({
      //       edited_field: "zx_city",
      //       edited_value: successData[0].zx_parentcity,
      //     })
      //   );

      // }
    } else {
      yield put(UserActions.getSubAreaFailure());
    }
  } catch (error) {
    // console.log("Error", error);
    yield put(UserActions.getSubAreaFailure());
  }
}
