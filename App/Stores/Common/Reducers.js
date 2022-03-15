/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { offlineActionTypes, reducer as network } from "react-native-offline";
import { CommonTypes } from './Actions'

export const connectionChanged = (state, { payload }) => {
  if (network.isConnected != payload && !payload) {
    return { ...state, isNetworkBannerVisible: true };
  } else {
    return { ...state, isNetworkBannerVisible: false };
  }
}

export const screenChanged = (state, { screen }) => ({
  ...state,
  currentScreen: screen
});

export const openModal = (state, { payload }) => ({
  ...state,
  genericActionModal: {
    ...state.genericActionModal,
    content: payload.content,
    heading: payload.heading,
    bodyFlexHeight: payload.bodyFlexHeight,
    visible: true,
    disable: false
  }
});

export const closeModal = (state) => ({
  ...state,
  genericActionModal: {
    ...state.genericActionModal,
    content: [],
    heading: '',
    bodyFlexHeight: '',
    visible: false,
    disable: false
  }
});

export const showObjectiveModal = (state) => ({
  ...state,
  isObjModalVisible: true
});


export const  hideObjectiveModal = (state) => ({
  ...state,
  isObjModalVisible: false,
 
});

export const showCustomerModal = (state) => ({
  ...state,
  isModalVisible: true
});


export const  hideCustomerModal = (state) => ({
  ...state,
  isModalVisible: false,
 
});


export const disableModal = (state) => ({
  ...state,
  genericActionModal: {
    ...state.genericActionModal,
    disable: true
  }
});

export const enableModal = (state) => ({
  ...state,
  genericActionModal: {
    ...state.genericActionModal,
    disable: false
  }
});

export const fetchAllAreaPjpLoading = (state) => ({
  ...state,
  fetchAllAreaPjpLoading: true
});

export const fetchAllAreaPjpSuccess = (state, { areas }) => ({
  ...state,
  agentAreaPjp: areas,
  fetchAllAreaPjpLoading: false
});
export const fetchAllBeatPjpSuccess = (state, { areas }) => ({
  ...state,
  agentBeatPjp: areas,
  fetchAllAreaPjpLoading: false
});

export const fetchAllPjpSuccess = (state, { areas }) => ({
  ...state,
  agentPjp: areas,
  fetchAllAreaPjpLoading: false
});


export const fetchAllAreaPjpFailure = (state, { areas }) => ({
  ...state,
  agentAreaPjp: [],
  agentBeatPjp: [],
  agentPjp: [],
  fetchAllAreaPjpLoading: false
});

export const fetchObjectiveLoading = (state) => ({
  ...state,
  fetchObjectiveLoading: true
});

export const fetchObjectiveSuccess = (state, { areas }) => ({
  ...state,
  objectiveList: areas,
  fetchObjectiveLoading: false
});


export const fetchObjectiveFailure = (state, { areas }) => ({
  ...state,
  fetchObjectiveLoading: false
});

export const doNothing = (state) => ({
  ...state
});

export const uploadImageSuccess = (state, { payload }) => ({
  ...state,
  uploadImageField: payload,

  uploadImageLoader: false

});


export const uploadImageFailure = (state) => ({
  ...state,

  uploadImageLoader: false

});


export const uploadImageLoading = (state) => ({
  ...state,

  uploadImageLoader: true

});


export const uploadImageLoadingStop = (state) => ({
  ...state,

  uploadImageLoader: false

});

export const setUploadImageField = (state, { payload }) => ({
  ...state,
  uploadImageField: payload
});

export const fetchBeatLoading = (state) => ({
  ...state,
  fetchBeatLoading: true
});


export const fetchBeatSuccess = (state, { payload }) => ({
  ...state,
  agentBeat: payload,
  fetchBeatLoading: false
});


export const fetchBeatFailure = (state, { payload }) => ({
  ...state,
  fetchBeatLoading: false
});

export const fetchStateLoading = (state) => ({
  ...state,
  fetchStateLoading: true
});

export const fetchStateSuccess = (state, {areas}) => ({
  ...state,
  stateList: areas,
  fetchStateLoading: false
});


export const fetchStateFailure = (state, {areas}) => ({
  ...state,
  fetchStateLoading: false
});


export const fetchCityLoading = (state) => ({
  ...state,
  fetchCityLoading: true
});

export const fetchCitySuccess = (state, {areas}) => ({
  ...state,
  cityList: areas,
  fetchCityLoading: false
});


export const fetchAllCityFailure = (state, {areas}) => ({
  ...state,
  fetchAllCityLoading: false
});

export const fetchAllCityLoading = (state) => ({
  ...state,
  fetchAllCityLoading: true
});

export const fetchAllCitySuccess = (state, {areas}) => ({
  ...state,
  cityAllList: areas,
  fetchAllCityLoading: false
});


export const fetchCityFailure = (state, {areas}) => ({
  ...state,
  fetchCityLoading: false
});

export const fetchRetailerAreaLoading = (state) => ({
  ...state,
  fetchRetailerAreaLoading: true
});

export const fetchRetailerAreaSuccess = (state, {payload}) => ({
  ...state,
  
  retailerArea: payload,
  fetchRetailerAreaLoading: false
});


export const fetchRetailerAreaFailure = (state, {areas}) => ({
  ...state,
  fetchRetailerAreaLoading: false
});

export const fetchDealerTypeLoading = (state) => ({
  ...state,
  fetchDealerTypeLoading: true
});

export const fetchDealerTypeSuccess = (state, {payload}) => ({
  ...state,
  dealerType: payload,
  fetchDealerTypeLoading: false
});


export const fetchDealerTypeFailure = (state, {areas}) => ({
  ...state,
  fetchDealerTypeLoading: false
});

export const fetchAllPlantLoading = (state) => ({
  ...state,
  fetchAllPlantLoading: true
});


export const fetchAllPlantSuccess = (state, { payload }) => ({
  ...state,
  agentAllPlant: payload.data,
  searchAllPlant: payload.searchList,
  fetchAllPlantLoading: false
});


export const fetchAllPlantFailure = (state, { payload }) => ({
  ...state,
  fetchAllPlantLoading: false
});

export const fetchIncoTermLoading = (state) => ({
  ...state,
  fetchIncoTermLoading: true
});


export const fetchIncoTermSuccess = (state, { payload }) => ({
  ...state,
  agentIncoTerm: payload,
  fetchIncoTermLoading: false
});



export const fetchIncoTermFailure = (state, { payload }) => ({
  ...state,
  fetchIncoTermLoading: false
});

export const fetchAllRouteLoading = (state) => ({
  ...state,
  fetchAllRouteLoading: true
});

export const fetchAllRouteSuccess = (state, { payload }) => ({
  ...state,
  agentAllRoute: payload,
  fetchAllRouteLoading: false
});


export const fetchAllRouteFailure = (state, { payload }) => ({
  ...state,
  fetchAllRouteLoading: false
});

export const fetchAllInsuranceLoading = (state) => ({
  ...state,
  fetchAllInsuranceLoading: true
});

export const fetchAllInsuranceSuccess = (state, { payload }) => ({
  ...state,
  agentAllInsurance: payload,
  fetchAllInsuranceLoading: false
});


export const fetchAllInsuranceFailure = (state, { payload }) => ({
  ...state,
  fetchAllInsuranceLoading: false
});


export const fetchDistChannelLoading = (state) => ({
  ...state,
  fetchDistChannelLoading: true
});


export const fetchDistChannelSuccess = (state, { payload }) => ({
  ...state,
  agentDistChannel: payload.data,
  searchDistChannel:payload.searchList ,
  fetchDistChannelLoading: false
});


export const fetchDistChannelFailure = (state, { payload }) => ({
  ...state,
  fetchDistChannelLoading: false
});

export const getBillPartyLoading = (state) => ({
  ...state,
  getBillPartyLoading: true
});


export const getBillPartySuccess = (state, { payload }) => ({
  ...state,
  getBillPartyList: payload,
  getBillPartyLoading: false
});


export const getBillPartyFailure = (state, { payload }) => ({
  ...state,
  getBillPartyLoading: false
});

export const fetchCurrentLocationSuccess = (state, {payload}) => {
  return {
      ...state,
      currentLocation: payload
  }
}


export const fetchCurrentLocationFailure = (state, {payload}) => {
  return {
      ...state,
      currentLocation: INITIAL_STATE.currentLocation
  }
}

export const fetchCurrentLocationLoading = (state) => {
  return {
      ...state,
      fetchCurrentLocationLoader: true
  }
}

export const fetchCurrentLocationLoadingStop = (state) => {
  return {
      ...state,
      fetchCurrentLocationLoader: false
  }
}


export const updateCurrentLocation = (state, {payload}) => {
  return {
      ...state,
      currentLocation: INITIAL_STATE.currentLocation
  }
}

export const getAllNotificationsSuccess = (state, {payload}) => {
  return {
      ...state,
      notifications: payload,
      getAllNotificationsLoader: false
  }
}


export const getAllNotificationsFailure = (state, {payload}) => {
  return {
      ...state,
      notifications: [],
      getAllNotificationsLoader: false
  }
}

export const getAllNotificationsLoading = (state) => {
  return {
      ...state,
      getAllNotificationsLoader: true
  }
}

export const getAllNotificationsLoadingStop = (state) => {
  return {
      ...state,
      getAllNotificationsLoader: false
  }
}

export const uploadUserImageSuccess = (state, { payload }) => ({
  ...state,
  uploadUserImageField: payload,
  uploadUserImageLoader: false

});


export const uploadUserImageFailure = (state) => ({
  ...state,
  uploadUserImageLoader: false

});


export const uploadUserImageLoading = (state) => ({
  ...state,
  uploadUserImageLoader: true

});


export const uploadUserImageLoadingStop = (state) => ({
  ...state,
  uploadUserImageLoader: false

});

export const setUploadUserImageField = (state, { payload }) => ({
  ...state,
  uploadUserImageField: payload
});



export const reducer = createReducer(INITIAL_STATE, {
  [CommonTypes.CONNECTION_CHANGED]: connectionChanged,
  [CommonTypes.SCREEN_CHANGED]: screenChanged,
  [CommonTypes.OPEN_MODAL]: openModal,
  [CommonTypes.CLOSE_MODAL]: closeModal,
  [CommonTypes.DISABLE_MODAL]: disableModal,
  [CommonTypes.ENABLE_MODAL]: enableModal,

  [CommonTypes.FETCH_ALL_AREA_PJP_LOADING]: fetchAllAreaPjpLoading,
  [CommonTypes.FETCH_ALL_AREA_PJP_SUCCESS]: fetchAllAreaPjpSuccess,
  [CommonTypes.FETCH_ALL_PJP_SUCCESS]: fetchAllPjpSuccess,
  [CommonTypes.FETCH_ALL_BEAT_PJP_SUCCESS]: fetchAllBeatPjpSuccess,
  [CommonTypes.FETCH_ALL_AREA_PJP_FAILURE]: fetchAllAreaPjpFailure,


  [CommonTypes.FETCH_OBJECTIVE_LOADING]: fetchObjectiveLoading,
  [CommonTypes.FETCH_OBJECTIVE_SUCCESS]: fetchObjectiveSuccess,
  [CommonTypes.FETCH_OBJECTIVE_FAILURE]: fetchObjectiveFailure,

  [CommonTypes.DO_NOTHING]: doNothing,


  [CommonTypes.UPLOAD_IMAGE_LOADING]      : uploadImageLoading,
  [CommonTypes.UPLOAD_IMAGE_LOADING_STOP] : uploadImageLoadingStop,
  [CommonTypes.UPLOAD_IMAGE_SUCCESS]      : uploadImageSuccess,
  [CommonTypes.UPLOAD_IMAGE_FAILURE]      : uploadImageFailure,
  [CommonTypes.SET_UPLOAD_IMAGE_FIELD]    : setUploadImageField,


  [CommonTypes.FETCH_STATE_LOADING]         : fetchStateLoading,
  [CommonTypes.FETCH_STATE_SUCCESS]         : fetchStateSuccess,
  [CommonTypes.FETCH_STATE_FAILURE]         : fetchStateFailure,

  [CommonTypes.FETCH_CITY_LOADING]         : fetchCityLoading,
  [CommonTypes.FETCH_CITY_SUCCESS]         : fetchCitySuccess,
  [CommonTypes.FETCH_CITY_FAILURE]         : fetchCityFailure,

  [CommonTypes.FETCH_ALL_CITY_LOADING]         : fetchAllCityLoading,
  [CommonTypes.FETCH_ALL_CITY_SUCCESS]         : fetchAllCitySuccess,
  [CommonTypes.FETCH_ALL_CITY_FAILURE]         : fetchAllCityFailure,

  // [CommonTypes.UPLOAD_IMAGE_LOADING]: uploadImageLoading,
  // [CommonTypes.UPLOAD_IMAGE_LOADING_STOP]: uploadImageLoadingStop,
  // [CommonTypes.UPLOAD_IMAGE_SUCCESS]: uploadImageSuccess,
  // [CommonTypes.UPLOAD_IMAGE_FAILURE]: uploadImageFailure,
  // [CommonTypes.SET_UPLOAD_IMAGE_FIELD]: setUploadImageField,
  
  [CommonTypes.FETCH_BEAT_LOADING]: fetchBeatLoading,
  [CommonTypes.FETCH_BEAT_SUCCESS]: fetchBeatSuccess,
  [CommonTypes.FETCH_BEAT_FAILURE]: fetchBeatFailure,

  [CommonTypes.FETCH_DIST_CHANNEL_LOADING]: fetchDistChannelLoading,
  [CommonTypes.FETCH_DIST_CHANNEL_SUCCESS]: fetchDistChannelSuccess,
  [CommonTypes.FETCH_DIST_CHANNEL_FAILURE]: fetchDistChannelFailure,

  [CommonTypes.FETCH_ALL_PLANT_LOADING]: fetchAllPlantLoading,
  [CommonTypes.FETCH_ALL_PLANT_SUCCESS]: fetchAllPlantSuccess,
  [CommonTypes.FETCH_ALL_PLANT_FAILURE]: fetchAllPlantFailure,

  [CommonTypes.FETCH_INCO_TERM_LOADING]: fetchIncoTermLoading,
  [CommonTypes.FETCH_INCO_TERM_SUCCESS]: fetchIncoTermSuccess,
  [CommonTypes.FETCH_INCO_TERM_FAILURE]: fetchIncoTermFailure,

  [CommonTypes.FETCH_ALL_ROUTE_LOADING]: fetchAllRouteLoading,
  [CommonTypes.FETCH_ALL_ROUTE_SUCCESS]: fetchAllRouteSuccess,
  [CommonTypes.FETCH_ALL_ROUTE_FAILURE]: fetchAllRouteFailure,

  [CommonTypes.FETCH_ALL_INSURANCE_LOADING]: fetchAllInsuranceLoading,
  [CommonTypes.FETCH_ALL_INSURANCE_SUCCESS]: fetchAllInsuranceSuccess,
  [CommonTypes.FETCH_ALL_INSURANCE_FAILURE]: fetchAllInsuranceFailure,

  [CommonTypes.FETCH_RETAILER_AREA_LOADING]: fetchRetailerAreaLoading,
  [CommonTypes.FETCH_RETAILER_AREA_SUCCESS]: fetchRetailerAreaSuccess,
  [CommonTypes.FETCH_RETAILER_AREA_FAILURE]: fetchRetailerAreaFailure,

  [CommonTypes.FETCH_DEALER_TYPE_LOADING]: fetchDealerTypeLoading,
  [CommonTypes.FETCH_DEALER_TYPE_SUCCESS]: fetchDealerTypeSuccess,
  [CommonTypes.FETCH_DEALER_TYPE_FAILURE]: fetchDealerTypeFailure,

  [CommonTypes.GET_BILL_PARTY_LOADING]:  getBillPartyLoading,
  [CommonTypes.GET_BILL_PARTY_SUCCESS]:  getBillPartySuccess,
  [CommonTypes.GET_BILL_PARTY_FAILURE]:  getBillPartyFailure,

  [CommonTypes.FETCH_CURRENT_LOCATION_SUCCESS]     : fetchCurrentLocationSuccess,
    [CommonTypes.FETCH_CURRENT_LOCATION_FAILURE]     : fetchCurrentLocationFailure,
    [CommonTypes.FETCH_CURRENT_LOCATION_LOADING]     : fetchCurrentLocationLoading,
    [CommonTypes.FETCH_CURRENT_LOCATION_LOADING_STOP]: fetchCurrentLocationLoadingStop,
    [CommonTypes.UPDATE_CURRENT_LOCATION]            : updateCurrentLocation,


    [CommonTypes.SHOW_OBJECTIVE_MODAL]:  showObjectiveModal,
  [CommonTypes.HIDE_OBJECTIVE_MODAL]:  hideObjectiveModal,

  [CommonTypes.GET_ALL_NOTIFICATIONS_SUCCESS]     : getAllNotificationsSuccess,
    [CommonTypes.GET_ALL_NOTIFICATIONS_FAILURE]     : getAllNotificationsFailure,
    [CommonTypes.GET_ALL_NOTIFICATIONS_LOADING]     : getAllNotificationsLoading,
    [CommonTypes.GET_ALL_NOTIFICATIONS_LOADING_STOP]: getAllNotificationsLoadingStop,

    [CommonTypes.UPLOAD_USER_IMAGE_LOADING]      : uploadUserImageLoading,
  [CommonTypes.UPLOAD_USER_IMAGE_LOADING_STOP] : uploadUserImageLoadingStop,
  [CommonTypes.UPLOAD_USER_IMAGE_SUCCESS]      : uploadUserImageSuccess,
  [CommonTypes.UPLOAD_USER_IMAGE_FAILURE]      : uploadUserImageFailure,
  [CommonTypes.SET_UPLOAD_USER_IMAGE_FIELD]    : setUploadUserImageField,
});
