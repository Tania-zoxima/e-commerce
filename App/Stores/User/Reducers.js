/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { UserTypes } from './Actions'
import _ from 'lodash';
import AsyncStorage from '@react-native-community/async-storage';

export const userLoginLoading = (state) => ({
  ...state,
  userLoginIsLoading: true
});

export const userLoginSuccess = (state, { user }) => (
  AsyncStorage.setItem("brand", JSON.stringify(user.data[0].zx_brandgroupcode)),
  {
  ...state,
  id: user.data[0].id,
  token: user.token,
  userLoginIsLoading: false,
  userLoginErrorMessage: null,
  user_details: user.data[0]
}
 );

export const userLoginFailure = (state, { errorMessage }) => ({
  ...state,
  id: null,
  token: null,
  userLoginIsLoading: false,
  userLoginErrorMessage: errorMessage,
});

export const userLoginSessionLoading = (state) => ({
  ...state,
  userLoginSessionIsLoading: true
});

export const userLoginSessionSuccess = (state, { user }) => ({
  ...state,

  
  userLoginSessionIsLoading: false,
  

});

export const userLoginSessionFailure = (state, { errorMessage }) => ({
  ...state,
  id: null,
  token: null,
  userLoginSessionIsLoading: false,
  userLoginSessionErrorMessage: errorMessage,
});

export const changeLoginForm = (state, {user}) => ({
  ...state,
  username: user.username,
  password: user.password,
  validation: {...INITIAL_STATE.validation}
});

export const userLoginValidationFailed = (state, {validation}) => ({
  ...state,
  validation: {...state.validation, ...validation}
});

export const updateUserLocation = (state, {location}) => ({
  ...state,
  latitude: location.latitude,
  longitude: location.longitude
});

export const updateUserStartDayTime = (state, {startDayTime}) => ({
  ...state,
  startDayTime: startDayTime.date
});

export const updateUserArea = (state, {area}) => ({
  ...state,
  area: area,
  validation: {...INITIAL_STATE.validation}
});

export const fetchAllAreasLoading = (state) => ({
  ...state,
  fetchAllAreasLoading: true
});


export const fetchAllAreasSuccess = (state, {areas}) => ({
  ...state,
  agentAreas: areas.data2,
  agentCity : areas.data1,
  fetchAllAreasLoading: false
});


export const fetchAllAreasFailure = (state, {areas}) => ({
  ...state,
  fetchAllAreasLoading: false
});

export const userStartDayLoading = (state) => ({
  ...state,
  userStartDayLoading: true
});

export const userStartDayLoadingStop = (state) => ({
  ...state,
  userStartDayLoading: false
});

export const userStartDaySuccess = (state, {user}) => ({
  ...state,
  endDayTime: null,
  absentDayTime: null,
  startDayTime: user.date,
  logitude: user.logitude,
  latitude: user.latitude,
  area: user.area,
  userStartDayLoading: false
});

export const userStartDayFailure = (state) => ({
  ...state,
  endDayTime: null,
  startDayTime: null,
  absentDayTime: null,
  userStartDayLoading: false
});

export const userEndDaySuccess = (state, {user}) => ({
  ...state,
  endDayTime:  user.date,
  startDayTime: null,
  absentDayTime: null,
  userEndDayLoading: false
});

export const userEndDayLoading = (state) => ({
  ...state,
  userEndDayLoading: true
});

export const userEndDayLoadingStop = (state) => ({
  ...state,
  userEndDayLoading: false
});

export const userEndDayFailure = (state) => ({
  ...state,
  endDayTime: null,
  userEndDayLoading: false
});

export const userMarkedAbsentSuccess = (state, {user}) => ({
  ...state,
  absentDayTime: user.date,
  startDayTime: null,
  endDayTime: null,
  userMarkedAbsentLoading: false
});

export const userMarkedAbsentFailure = (state) => ({
  ...state,
  absentDayTime: null,
  startDayTime: null,
  endDayTime: null,
  userMarkedAbsentLoading: false
});

export const userMarkedAbsentLoading = (state) => ({
  ...state,
  userMarkedAbsentLoading: true
});

export const updateUserMarkedAbsentReason = (state, {reason}) => ({
  ...state,
  absentReason: reason.absentReason
});

export const userStartDayValidationFailed = (state, {validation}) => ({
  ...state,
  userStartDayLoading: false,
  validation: {...state.validation, ...validation}
});

export const fetchAgentDetailsSuccess = (state, {payload}) => ({
  ...state,
  agentDetails: payload,
  isASM: (payload['agentDetail']['member_type'] == 'ASM')
})

export const fetchAgentDetailsFailure = (state, {payload}) => ({
  ...state,
  agentDetails: {}
});


export const updateAgentAttendanceDetails = (state, {payload}) => ({
  ...state,
    absentDayTime: payload.absentDayTime,
    startDayTime: payload.startDayTime,
    endDayTime: payload.endDayTime
});
 

export const checkAttendanceFailure = (state, {payload}) => ({
  ...state
}); 


export const doNothing = (state) => ({
    ...state
});



export const fetchAllPsmLoading = (state) => ({
  ...state,
  fetchAllPsmLoader: true
});

export const fetchAllPsmLoadingStop =  (state) => ({
  ...state,
  fetchAllPsmLoader: false
});

export const fetchAllPsmSuccess = (state, {payload}) => ({
  ...state,
  fetchAllPsmLoader: false,
  psmList: payload
});

export const fetchAllPsmFailure = (state, {payload}) => ({
  ...state,
  fetchAllPsmLoader: false
});

export const getProfileLoading = (state) => ({
  ...state,
  profileLoader: true
});

export const getProfileLoadingStop =  (state) => ({
  ...state,
  profileLoader: false
});

export const getProfileSuccess = (state, {payload}) => ({
  ...state,
  profileLoader: false,
  profile: payload
});

export const getProfileFailure = (state, {payload}) => ({
  ...state,
  profileLoader: false
});

export const userLogoutLoading = (state) => ({
  ...state,
  userLogoutIsLoading: true
});

export const userLogoutSuccess = (state, {user}) => ({
  
  ...INITIAL_STATE,
});

export const userLogoutFailure = (state, { errorMessage }) => ({
  ...state,
  id: null,
  token: null,
  userLogoutIsLoading: false,
  userLoginErrorMessage: errorMessage
});

export const userLogoutSessionLoading = (state) => ({
  ...state,
  userLogoutSessionIsLoading: true
});

export const userLogoutSessionSuccess = (state, {user}) => ({
  
  ...INITIAL_STATE,
});

export const userLogoutSessionFailure = (state, { errorMessage }) => ({
  ...state,
  id: null,
  token: null,
  userLogoutSessionIsLoading: false,
  userLoginSessionErrorMessage: errorMessage
});

export const changeResetForm = (state, { payload }) => {
  const { edited_field, edited_value } = payload;
// console.log("payloddddd",payload)
  let changed_entity = {};
  changed_entity[edited_field] = edited_value;
  return {
    ...state,
    resetPasswordForm: {
      ...state.resetPasswordForm,
      ...changed_entity,
    },
  };
};


export const submitResetFormLoading = (state) => ({
  ...state,
  resetLoader: true,
});

export const submitResetFormLoadingStop = (state) => ({
  ...state,
  resetLoader: false,
});

export const submitResetFormSuccess = (state, { payload }) => ({
  ...state,
  resetLoader: false,
});

export const submitResetFormFailure = (state, { errorMessage }) => ({
  ...state,
  resetLoader: false,
});
export const changeBrand = (state, { payload }) => {
  return {
      ...state,
      branding: {
          ...state.visitInfo,
          selectedBrand: payload
      }
  }
};

export const clearResetForm = (state) => ({
  ...state,
  resetPasswordForm:INITIAL_STATE.resetPasswordForm,
});

export const clearOtp = (state) => ({
  ...state,
  // loginResetOtp:INITIAL_STATE.loginResetOtp,
  loginOtp:INITIAL_STATE.loginOtp
});

export const clearPassword = (state) => ({
  ...state,
  loginResetPassword:INITIAL_STATE.loginResetPassword,
});
export const clearBoxes = (state) => ({
  ...state,
  loginResetOtp:INITIAL_STATE.loginResetOtp,
});

export const changeUploadProfile = (state, { payload }) => {
  let updated_form = _.cloneDeep(state.imageUpload);
 updated_form[payload.edited_field] = payload.edited_value;

 return {
     ...state,
     imageUpload: {
         ...state.imageUpload,
         ...updated_form, 
     },
    //  addressValidation: {
    //      invalid: false,
    //      invalid_field: ''
    //  }
 }
};

export const changeGetOtp = (state, { payload }) => {
  let updated_form = _.cloneDeep(state.loginOtp);
 updated_form[payload.edited_field] = payload.edited_value;

 return {
     ...state,
     loginOtp: {
         ...state.loginOtp,
          ...updated_form, 
     },
    //  addressValidation: {
    //      invalid: false,
    //      invalid_field: ''
    //  }
 }
};

export const submitGetOtpSuccess = (state, { payload }) => ({
  ...state,
  loginOtpLoader: false

});
export const submitGetOtpLoading = (state) => ({
  ...state,
  loginOtpLoader: true
});


export const submitGetOtpLoadingStop = (state) => ({
  ...state,
  loginOtpLoader: false
});
export const submitGetOtpFailure = (state, { payload }) => ({
  ...state,
  loginOtpLoader: false
});


export const submitResetOtpSuccess = (state, { payload }) => ({
  ...state,

  loginResetOtp: {
    ...state.loginResetOtp,

  },
  otpHashCode:payload,
  loginResetOtpLoader: false

});
export const submitResetOtpLoading = (state) => ({
  ...state,
  loginResetOtpLoader: true
});


export const submitResetOtpLoadingStop = (state) => ({
  ...state,
  loginResetOtpLoader: false
});
export const submitResetOtpFailure = (state, { payload }) => ({
  ...state,
  loginResetOtp: {
    ...state.loginResetOtp,
  },
  loginResetOtpLoader: false
});

export const changeResetOtp = (state, { payload }) => {
  let updated_form = _.cloneDeep(state.loginResetOtp);
 updated_form[payload.edited_field] = payload.edited_value;

 return {
     ...state,
     loginResetOtp: {
         ...state.loginResetOtp,
          ...updated_form, 
     },
    //  addressValidation: {
    //      invalid: false,
    //      invalid_field: ''
    //  }
 }
};

export const ResetPasswordOtpSuccess = (state, { payload }) => ({
  ...state,
  loginResetPassword: {
    ...state.loginResetPassword,
  },
  loginResetPasswordLoader: false

});
export const ResetPasswordOtpLoading = (state) => ({
  ...state,
  loginResetPasswordLoader: true
});


export const ResetPasswordOtpLoadingStop = (state) => ({
  ...state,
  loginResetPasswordLoader: false
});
export const ResetPasswordOtpFailure = (state, { payload }) => ({
  ...state,
  loginResetPassword: {
    ...state.loginResetPassword,
  },
  loginResetPasswordLoader: false
});

export const changeResetPasswordOtp = (state, { payload }) => {
  let updated_form = _.cloneDeep(state.loginResetPassword);
 updated_form[payload.edited_field] = payload.edited_value;

 return {
     ...state,
     loginResetPassword: {
         ...state.loginResetPassword,
          ...updated_form, 
     },
    //  addressValidation: {
    //      invalid: false,
    //      invalid_field: ''
    //  }
 }
};

export const userPicUploadLoading = (state, {payload}) => ({
  ...state,
  userPicUploadLoader: true
});
export const userPicUploadSuccess = (state, {payload}) => {
  // console.log("payload.edited_value",payload)
// let updated_form = _.cloneDeep(state.user);
// updated_form.user_profile_pic__c = payload;

return {
    ...state,
    userPicture:payload,
    userPicUploadLoader: false,
}
};

export const userPicUploadFailed = (state, {payload}) => ({
  ...state,
  userPicUploadLoader: false,
});

export const getSubAreaLoading = (state) => ({
  ...state,
  getSubAreaLoader: true,
});

export const getSubAreaSuccess = (state, { payload }) => ({
  ...state,
  getSubAreaLoader: false,
  subAreas: _.cloneDeep(payload),
});

export const getSubAreaFailure = (state) => ({
  ...state,
  getSubAreaLoader: false,
  subAreas:[]
});


export const reducer = createReducer(INITIAL_STATE, {

  [UserTypes.GET_SUB_AREA_LOADING]: getSubAreaLoading,
  [UserTypes.GET_SUB_AREA_SUCCESS]: getSubAreaSuccess,
  [UserTypes.GET_SUB_AREA_FAILURE]: getSubAreaFailure,

  [UserTypes.CHANGE_UPLOAD_PROFILE]              :changeUploadProfile ,
  [UserTypes.CHANGE_RESET_OTP]              :changeResetOtp ,
  [UserTypes.CHANGE_GET_OTP]              :changeGetOtp ,

  [UserTypes.CHANGE_RESET_PASSWORD_OTP]              :changeResetPasswordOtp ,


  [UserTypes.USER_LOGIN_LOADING]              : userLoginLoading,
  [UserTypes.USER_LOGIN_SUCCESS]              : userLoginSuccess,
  [UserTypes.USER_LOGIN_FAILURE]              : userLoginFailure,

  [UserTypes.USER_LOGIN_SESSION_LOADING]              : userLoginSessionLoading,
  [UserTypes.USER_LOGIN_SESSION_SUCCESS]              : userLoginSessionSuccess,
  [UserTypes.USER_LOGIN_SESSION_FAILURE]              : userLoginSessionFailure,


  [UserTypes.USER_LOGOUT_LOADING]              : userLogoutLoading,
  [UserTypes.USER_LOGOUT_SUCCESS]              : userLogoutSuccess,
  [UserTypes.USER_LOGOUT_FAILURE]              : userLogoutFailure,

  [UserTypes.USER_LOGOUT_SESSION_LOADING]              : userLogoutSessionLoading,
  [UserTypes.USER_LOGOUT_SESSION_SUCCESS]              : userLogoutSessionSuccess,
  [UserTypes.USER_LOGOUT_SESSION_FAILURE]              : userLogoutSessionFailure,

  [UserTypes.CHANGE_LOGIN_FORM]               : changeLoginForm,
  [UserTypes.USER_LOGIN_VALIDATION_FAILED]    : userLoginValidationFailed,
  [UserTypes.USER_START_DAY_VALIDATION_FAILED]: userStartDayValidationFailed,
  [UserTypes.UPDATE_USER_LOCATION]            : updateUserLocation,
  [UserTypes.UPDATE_USER_START_DAY_TIME]      : updateUserStartDayTime,
  [UserTypes.UPDATE_USER_AREA]                : updateUserArea,
  [UserTypes.FETCH_ALL_AREAS_LOADING]         : fetchAllAreasLoading,
  [UserTypes.FETCH_ALL_AREAS_SUCCESS]         : fetchAllAreasSuccess,
  [UserTypes.FETCH_ALL_AREAS_FAILURE]         : fetchAllAreasFailure,
  [UserTypes.USER_START_DAY_SUCCESS]          : userStartDaySuccess,
  [UserTypes.USER_START_DAY_FAILURE]          : userStartDayFailure,
  [UserTypes.USER_START_DAY_LOADING]          : userStartDayLoading,
  [UserTypes.USER_END_DAY_SUCCESS]            : userEndDaySuccess,
  [UserTypes.USER_END_DAY_FAILURE]            : userEndDayFailure,
  [UserTypes.USER_END_DAY_LOADING]            : userEndDayLoading,
  [UserTypes.USER_MARKED_ABSENT_SUCCESS]      : userMarkedAbsentSuccess,
  [UserTypes.USER_MARKED_ABSENT_FAILURE]      : userMarkedAbsentFailure,
  [UserTypes.USER_MARKED_ABSENT_LOADING]      : userMarkedAbsentLoading,
  [UserTypes.USER_START_DAY_LOADING_STOP]     : userStartDayLoadingStop,
  [UserTypes.USER_END_DAY_LOADING_STOP]       : userEndDayLoadingStop,
  [UserTypes.UPDATE_USER_MARKED_ABSENT_REASON]: updateUserMarkedAbsentReason,
  [UserTypes.FETCH_AGENT_DETAILS_SUCCESS]     : fetchAgentDetailsSuccess,
  [UserTypes.FETCH_AGENT_DETAILS_FAILURE]     : fetchAgentDetailsFailure,
  [UserTypes.UPDATE_AGENT_ATTENDANCE_DETAILS] : updateAgentAttendanceDetails,
  [UserTypes.CHECK_ATTENDANCE_FAILURE]        : checkAttendanceFailure,
  [UserTypes.DO_NOTHING]                      : doNothing,


  //[UserTypes.DO_NOTHING]                      :   fetchAllPsm,
  [UserTypes.FETCH_ALL_PSM_LOADING]           : fetchAllPsmLoading,
  [UserTypes.FETCH_ALL_PSM_LOADING_STOP]      : fetchAllPsmLoadingStop,
  [UserTypes.FETCH_ALL_PSM_SUCCESS]           : fetchAllPsmSuccess,
  [UserTypes.FETCH_ALL_PSM_FAILURE]           : fetchAllPsmFailure,

  [UserTypes.GET_PROFILE_LOADING]           : getProfileLoading,
  [UserTypes.GET_PROFILE_LOADING_STOP]      : getProfileLoadingStop,
  [UserTypes.GET_PROFILE_SUCCESS]           : getProfileSuccess,
  [UserTypes.GET_PROFILE_FAILURE]           : getProfileFailure,


  //Reset reducer
  [UserTypes.CHANGE_RESET_FORM]: changeResetForm,
  [UserTypes.SUBMIT_RESET_FORM_LOADING]: submitResetFormLoading,
  [UserTypes.SUBMIT_RESET_FORM_LOADING_STOP]: submitResetFormLoadingStop,
  [UserTypes.SUBMIT_RESET_FORM_SUCCESS]: submitResetFormSuccess,
  [UserTypes.SUBMIT_RESET_FORM_FAILURE]: submitResetFormFailure,

  [UserTypes.SUBMIT_GET_OTP_LOADING]: submitGetOtpLoading,
  [UserTypes.SUBMIT_GET_OTP_LOADING_STOP]: submitGetOtpLoadingStop,
  [UserTypes.SUBMIT_GET_OTP_SUCCESS]: submitGetOtpSuccess,
  [UserTypes.SUBMIT_GET_OTP_FAILURE]: submitGetOtpFailure,

  [UserTypes.SUBMIT_RESET_OTP_LOADING]: submitResetOtpLoading,
  [UserTypes.SUBMIT_RESET_OTP_LOADING_STOP]: submitResetOtpLoadingStop,
  [UserTypes.SUBMIT_RESET_OTP_SUCCESS]: submitResetOtpSuccess,
  [UserTypes.SUBMIT_RESET_OTP_FAILURE]: submitResetOtpFailure,

  [UserTypes.CHANGE_BRAND]: changeBrand,
  [UserTypes.CLEAR_RESET_FORM]: clearResetForm,
  [UserTypes.CLEAR_OTP]: clearOtp,
  [UserTypes.CLEAR_PASSWORD]: clearPassword,
  [UserTypes.CLEAR_BOXES]: clearBoxes,

  


  [UserTypes.USER_PIC_UPLOAD_LOADING]       : userPicUploadLoading,
  [UserTypes.USER_PIC_UPLOAD_SUCCESS]       : userPicUploadSuccess,
  [UserTypes.USER_PIC_UPLOAD_FAILED]        : userPicUploadFailed,

  [UserTypes.RESET_PASSWORD_OTP_LOADING]: ResetPasswordOtpLoading,
  [UserTypes.RESET_PASSWORD_OTP_LOADING_STOP]: ResetPasswordOtpLoadingStop,
  [UserTypes.RESET_PASSWORD_OTP_SUCCESS]: ResetPasswordOtpSuccess,
  [UserTypes.RESET_PASSWORD_OTP_FAILURE]: ResetPasswordOtpFailure,


});
