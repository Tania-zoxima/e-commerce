import { createActions } from 'reduxsauce'

/**
 * We use reduxsauce's `createActions()` helper to easily create redux actions.
 *
 * Keys are action names and values are the list of parameters for the given action.
 *
 * Action names are turned to SNAKE_CASE into the `Types` variable. This can be used
 * to listen to actions:
 *
 * - to trigger reducers to update the state, for example in App/Stores/Example/Reducers.js
 * - to trigger sagas, for example in App/Sagas/index.js
 *
 * Actions can be dispatched:
 *
 * - in React components using `dispatch(...)`, for example in App/App.js
 * - in sagas using `yield put(...)`, for example in App/Sagas/ExampleSaga.js
 *
 * @see https://github.com/infinitered/reduxsauce#createactions
 */
const { Types, Creators } = createActions({
	loginUser: ['data'],// data coming from from will go into 'data' key when we call this action
	userLoginLoading: null,
	userLoginSuccess: ['user'],
	userLoginFailure: ['errorMessage'],

	loginUserSession: ['data'],// data coming from from will go into 'data' key when we call this action
	userLoginSessionLoading: null,
	userLoginSessionSuccess: ['user'],
	userLoginSessionFailure: ['errorMessage'],

	loginUserOtp: ['data'],// data coming from from will go into 'data' key when we call this action
	userLoginOtpLoading: null,
	userLoginOtpSuccess: ['user'],
	userLoginOtpFailure: ['errorMessage'],

	
	
	logoutUser: ['data'],
	userLogoutLoading: null,
	userLogoutSuccess: ['user'],
	userLogoutFailure: ['errorMessage'],

	logoutUserSession: ['data'],
	userLogoutSessionLoading: null,
	userLogoutSessionSuccess: ['user'],
	userLogoutSessionFailure: ['errorMessage'],


	changeLoginForm: ['user'],
	userLoginValidationFailed: ['validation'],
	userStartDayValidationFailed: ['validation'],
	updateUserLocation: ['location'],
	updateUserStartDayTime: ['startDayTime'],
	updateUserArea: ['area'],
	fetchAllAreas: ['user'],
	fetchAllAreasLoading: [null],
	fetchAllAreasSuccess: ['areas'],
	fetchAllAreasFailure: [null],
	startUserDay: ['user'],
	endUserDay: ['user'],
	markUserAbsent: ['user'],
	userStartDaySuccess: ['user'],
	userStartDayFailure: null,
	userEndDaySuccess: ['user'],
	userEndDayFailure: null,
	userStartDayLoading: null,
	userStartDayLoadingStop: null,
	userEndDayLoadingStop: null,
	userEndDayLoading: null,
	userMarkedAbsentSuccess: ['user'],
	userMarkedAbsentFailure: null,
	userMarkedAbsentLoading: null,
	updateUserMarkedAbsentReason: ['reason'],
	fetchAgentDetails: ['payload'],
	fetchAgentDetailsSuccess: ['payload'],
	fetchAgentDetailsFailure: null,
	checkAttendance: ['payload'],
	updateAgentAttendanceDetails: ['payload'],
	checkAttendanceFailure: null,
	doNothing: null,
	fetchAllPsm: ['payload'],
	fetchAllPsmLoading: null,
	fetchAllPsmLoadingStop: null,
	fetchAllPsmSuccess: ['payload'],
	fetchAllPsmFailure: null,



	//MenuScreen data
	getProfile: ['payload'],
	getProfileLoading: null,
	getProfileLoadingStop: null,
	getProfileSuccess: ['payload'],
	getProfileFailure: null,


	//reset password
    changeResetForm: ['payload'],
	submitResetFormLoading: null,
	submitResetFormLoadingStop: null,
	submitResetForm: ['payload'],
	submitResetFormSuccess: ['payload'],
	submitResetFormFailure: null,

	changeBrand:['payload'],
	clearResetForm: null,
	clearOtp:null,
	clearPassword:null,
	clearBoxes:null,
	clearResetOtp: null,

	changeUploadProfile: ['payload'],

    changeGetOtp: ['payload'],
	submitGetOtp: ['payload'],
	submitGetOtpLoading: null,
	submitGetOtpSuccess: ['payload'],
	submitGetOtpFailure: null,
	submitGetOtpLoadingStop: null,
    
	changeResetOtp: ['payload'],

	submitResetOtp: ['payload'],
	submitResetOtpLoading: null,
	submitResetOtpSuccess: ['payload'],
	submitResetOtpFailure: null,
	submitResetOtpLoadingStop: null,

	changeResetPasswordOtp: ['payload'],

	ResetPasswordOtp: ['payload'],
	ResetPasswordOtpLoading: null,
	ResetPasswordOtpSuccess: ['payload'],
	ResetPasswordOtpFailure: null,
	ResetPasswordOtpLoadingStop: null,

	userPicUpload:['payload'],
    userPicUploadLoading: null,
    userPicUploadSuccess: ['payload'],
    userPicUploadFailed:null,

	getSubArea: ["payload"],
  getSubAreaLoading: null,
  getSubAreaSuccess: ["payload"],
  getSubAreaFailure: null,
  getSubAreaLoadingStop: null,
});

export const UserTypes = Types
export default Creators
