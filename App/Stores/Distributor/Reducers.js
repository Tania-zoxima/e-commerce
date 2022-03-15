import { INITIAL_STATE } from "./InitialState";
import { createReducer } from "reduxsauce";
import { DistributorTypes } from "./Actions";
import _ from "lodash";

export const changeDistributorForm = (state, { payload }) => {
  let updated_form = _.cloneDeep(state.distributorForm);
  updated_form[payload.edited_field] = payload.edited_value;

  return {
    ...state,
    distributorForm: {
      ...state.distributorForm,
      ...updated_form,
    },
    distributorFormValidation: {
      invalid: false,
      invalid_field: "",
    },
  };
};

export const distributorFormValidationFailed = (state, { payload }) => ({
  ...state,
  distributorFormValidation: {
    ...payload,
  },
});

export const submitSelectedDistributorFormSuccess = (state, { payload }) => {
  return {
    ...state,
    distributorForm: {
      ...state.distributorForm,
      selectedDistributorForm: [],
    },
    record: payload.data,
    submitDistributorFormLoader: false,
  };
};

export const submitSelectedDistributorFormFailure = (state, { payload }) => {
  return {
    ...state,
    distributorForm: {
      ...state.distributorForm,
      submitDistributorFormLoader: false,
    },
  };
};

export const submitSelectedDistributorFormLoading = (state) => {
  return {
    ...state,

    submitDistributorFormLoader: true,
  };
};

export const submitSelectedDistributorFormLoadingStop = (
  state,
  { payload }
) => {
  return {
    ...state,
    distributorForm: {
      ...state.distributorForm,
      submitDistributorFormLoader: false,
    },
  };
};

export const updateDistributorForm = (state, { payload }) => {
  let updated_form = _.cloneDeep(state.editDistributorForm);
  updated_form[payload.edited_field] = payload.edited_value;

  return {
    ...state,
    editDistributorForm: {
      ...state.editDistributorForm,
      ...updated_form,
    },
    //    retailerFormValidation: {
    //        invalid: false,
    //        invalid_field: ''
    //    }
  };
};

export const submitEditedDistributorFormSuccess = (state, { payload }) => {
  return {
    ...state,
    editDistributorForm: {
      ...state.editDistributorForm,
      editedDistributorForm: [],
      submitEditedDistributorFormLoader: false,
    },
  };
};

export const submitEditedDistributorFormFailure = (state, { payload }) => {
  return {
    ...state,
    editDistributorForm: {
      ...state.editDistributorForm,
      submitEditedDistributorFormLoader: false,
    },
  };
};

export const submitEditedDistributorFormLoading = (state, { payload }) => {
  return {
    ...state,
    editDistributorForm: {
      ...state.editDistributorForm,
      submitEditedDistributorFormLoader: true,
    },
  };
};

export const submitEditedDistributorFormLoadingStop = (state, { payload }) => {
  return {
    ...state,
    editDistributorForm: {
      ...state.editdistributorForm,
      submitEditedDistributorFormLoader: false,
    },
  };
};

export const getDistributorSuccess = (state, { payload }) => {
  return {
    ...state,
    DistributorList: payload,
    getDistributorLoader: false,
  };
};

export const getDistributorFailure = (state, { payload }) => {
  return {
    ...state,
    getDistributorLoader: false,
    DistributorList: [],
  };
};

export const getDistributorLoading = (state) => {
  return {
    ...state,
    getDistributorLoader: true,
  };
};

export const getDistributorLoadingStop = (state) => {
  return {
    ...state,
    getDistributorLoader: false,
  };
};

export const getAllAreaSuccess = (state, { payload }) => {
  return {
    ...state,
    getArea: payload,
    getAllAreaLoader: false,
  };
};

export const getAllAreaFailure = (state, { payload }) => {
  return {
    ...state,
    getAllAreaLoader: false,
    getArea: [],
  };
};

export const getAllAreaLoading = (state) => {
  return {
    ...state,
    getAllAreaLoader: true,
  };
};

export const getAllAreaLoadingStop = (state) => {
  return {
    ...state,
    getAllAreaLoader: false,
  };
};

export const getAllPincodeSuccess = (state, { payload }) => {
  return {
    ...state,
    getPincode: payload,
    getAllPincodeLoader: false,
  };
};

export const getAllPincodeFailure = (state, { payload }) => {
  return {
    ...state,
    getAllPincodeLoader: false,
    getPincode: [],
  };
};

export const getAllPincodeLoading = (state) => {
  return {
    ...state,
    getAllPincodeLoader: true,
  };
};

export const getAllPincodeLoadingStop = (state) => {
  return {
    ...state,
    getAllPincodeLoader: false,
  };
};

export const getAllZoneSuccess = (state, { payload }) => {
  return {
    ...state,
    getZone: payload,
    getAllZoneLoader: false,
  };
};

export const getAllZoneFailure = (state, { payload }) => {
  return {
    ...state,
    getAllZoneLoader: false,
    getZone: [],
  };
};

export const getAllZoneLoading = (state) => {
  return {
    ...state,
    getAllZoneLoader: true,
  };
};

export const getAllZoneLoadingStop = (state) => {
  return {
    ...state,
    getAllZoneLoader: false,
  };
};

export const getAllStateSuccess = (state, { payload }) => {
  return {
    ...state,
    getState: payload,
    getAllStateLoader: false,
  };
};

export const getAllStateFailure = (state, { payload }) => {
  return {
    ...state,
    getAllStateLoader: false,
    getState: [],
  };
};

export const getAllStateLoading = (state) => {
  return {
    ...state,
    getAllStateLoader: true,
  };
};

export const getAllStateLoadingStop = (state) => {
  return {
    ...state,
    getAllStateLoader: false,
  };
};

export const getAllSubStateSuccess = (state, { payload }) => {
  return {
    ...state,
    getSubState: payload,
    getAllSubStateLoader: false,
  };
};

export const getAllSubStateFailure = (state, { payload }) => {
  return {
    ...state,
    getAllSubStateLoader: false,
    getSubState: [],
  };
};

export const getAllSubStateLoading = (state) => {
  return {
    ...state,
    getAllSubStateLoader: true,
  };
};

export const getAllSubStateLoadingStop = (state) => {
  return {
    ...state,
    getAllSubStateLoader: false,
  };
};

export const getAllDistrictSuccess = (state, { payload }) => {
  return {
    ...state,
    getDistrict: payload,
    getAllDistrictLoader: false,
  };
};

export const getAllDistrictFailure = (state, { payload }) => {
  return {
    ...state,
    getAllDistrictLoader: false,
    getDistrict: [],
  };
};

export const getAllDistrictLoading = (state) => {
  return {
    ...state,
    getAllDistrictLoader: true,
  };
};

export const getAllDistrictLoadingStop = (state) => {
  return {
    ...state,
    getAllDistrictLoader: false,
  };
};

export const getAllCitySuccess = (state, { payload }) => {
  return {
    ...state,
    getCity: payload,
    getAllCityLoader: false,
  };
};

export const getAllCityFailure = (state, { payload }) => {
  return {
    ...state,
    getAllCityLoader: false,
    getCity: [],
  };
};

export const getAllCityLoading = (state) => {
  return {
    ...state,
    getAllCityLoader: true,
  };
};

export const getAllCityLoadingStop = (state) => {
  return {
    ...state,
    getAllCityLoader: false,
  };
};

export const selectDistributor = (state, { payload }) => ({
  ...state,
  distributorForm: payload,
});

export const selectDistributorSuccess = (state, { payload }) => ({
  ...state,
  distributorForm: _.cloneDeep(payload),
});

export const extractFormData = (state, { payload }) => ({
  ...state,
  distributorFormUpdate: payload,
});

export const updateDistributorSuccess = (state, { payload }) => ({
  ...state,
  distributorForm: {},
  record: payload.data,
  updateDistributorLoader: false,
});

export const updateDistributorLoading = (state) => ({
  ...state,
  updateDistributorLoader: true,
});

export const updateDistributorLoadingStop = (state) => ({
  ...state,
  updateDistributorLoader: false,
});

export const updateDistributorFailure = (state, { payload }) => ({
  ...state,
  updateDistributorLoader: false,
});

export const clearDistributorForm = (state) => ({
  ...state,
  distributorForm: {},
});

export const clearTerritory = (state) => ({
  ...state,
  getArea: [],
  getPincode: [],
  getCity: [],
  getState: [],
  getSubState: [],
  getDistrict: [],
  getZone: [],
  getResidenceArea: [],
  getResidencePincode: [],
  getResidenceCity: [],
  getResidenceState: [],
  getResidenceSubState: [],
  getResidenceDistrict: [],
  getResidenceZone: [],
});

export const sendApprovalSuccess = (state, { payload }) => {
  return {
    ...state,
    sendApproval: {
      ...state.sendApproval,
      sendApprovalLoader: false,
    },
  };
};

export const sendApprovalFailure = (state, { payload }) => {
  return {
    ...state,
    sendApproval: {
      ...state.sendApproval,
      sendApprovalLoader: false,
    },
  };
};

export const sendApprovalLoading = (state, { payload }) => {
  return {
    ...state,
    sendApproval: {
      ...state.sendApproval,
      sendApprovalLoader: true,
    },
  };
};

export const sendApprovalLoadingStop = (state, { payload }) => {
  return {
    ...state,
    sendApproval: {
      ...state.sendApproval,
      sendApprovalLoader: false,
    },
  };
};

export const submitDistributorFormValidationFailed = (state, { payload }) => ({
  ...state,
  submitDistributorFormValidation: {
    ...payload,
  },
});

export const changeDistributorSearchFilters = (state, { payload }) => {
  let updated_distributor_search_filters = _.cloneDeep(state.searchFilters);
  updated_distributor_search_filters[payload.edited_field] =
    payload.edited_value;
  //console.log(payload.edited_field)
  return {
    ...state,

    searchFilters: {
      ...state.searchFilters,
      ...updated_distributor_search_filters,
    },
  };
};
export const addStockForm = (state, { payload }) => {
  let updatedAddStockForm = _.cloneDeep(state.AddStockForm);
  updatedAddStockForm.push(payload);
  return {
    ...state,
    AddStockForm: updatedAddStockForm,
  };
};
export const removeStockForm = (state, { payload }) => {
  let updatedAddStockForm = [];

  state.AddStockForm.map((obj) => {
    if (obj.id != payload.id) {
      updatedAddStockForm.push(obj);
    }
  });

  return {
    ...state,
    AddStockForm: updatedAddStockForm,
  };
};

export const addCustomerForm = (state, { payload }) => {
  let updatedAddCustomerForm = _.cloneDeep(state.AddCustomerForm);
  updatedAddCustomerForm.push(payload);
  return {
    ...state,
    AddCustomerForm: updatedAddCustomerForm,
  };
};
export const removeCustomerForm = (state, { payload }) => {
  let updatedAddCustomerForm = [];

  state.AddCustomerForm.map((obj) => {
    if (obj.id != payload.id) {
      updatedAddCustomerForm.push(obj);
    }
  });

  return {
    ...state,
    AddCustomerForm: updatedAddCustomerForm,
  };
};
export const addFirmForm = (state, { payload }) => {
  let updatedAddFirmForm = _.cloneDeep(state.AddFirmForm);
  updatedAddFirmForm.push(payload);
  return {
    ...state,
    AddFirmForm: updatedAddFirmForm,
  };
};
export const removeFirmForm = (state, { payload }) => {
  let updatedAddFirmForm = [];

  state.AddFirmForm.map((obj) => {
    if (obj.id != payload.id) {
      updatedAddFirmForm.push(obj);
    }
  });

  return {
    ...state,
    AddFirmForm: updatedAddFirmForm,
  };
};

export const getSubCategorySuccess = (state, { payload }) => {
  return {
    ...state,
    getSubCategory: payload,
    getSubCategoryLoader: false,
  };
};

export const getSubCategoryFailure = (state, { payload }) => {
  return {
    ...state,
    getSubCategoryLoader: false,
    getSubCategory: [],
  };
};

export const getSubCategoryLoading = (state) => {
  return {
    ...state,
    getSubCategoryLoader: true,
  };
};

export const getSubCategoryLoadingStop = (state) => {
  return {
    ...state,
    getSubCategoryLoader: false,
  };
};
export const changeStockForm = (state, { payload }) => {
  let updatedAddStockForm = _.cloneDeep(state.AddStockForm);
  updatedAddStockForm.map((obj) => {
    if (obj.id == payload.id) {
      obj[payload.edited_field] = payload.edited_value;
    }
  });

  return {
    ...state,
    AddStockForm: updatedAddStockForm,
  };
};
export const changeCustomerForm = (state, { payload }) => {
  let updatedAddCustomerForm = _.cloneDeep(state.AddCustomerForm);
  updatedAddCustomerForm.map((obj) => {
    if (obj.id == payload.id) {
      obj[payload.edited_field] = payload.edited_value;
    }
  });

  return {
    ...state,
    AddCustomerForm: updatedAddCustomerForm,
  };
};
export const changeFirmForm = (state, { payload }) => {
  let updatedAddFirmForm = _.cloneDeep(state.AddFirmForm);
  updatedAddFirmForm.map((obj) => {
    if (obj.id == payload.id) {
      obj[payload.edited_field] = payload.edited_value;
    }
  });

  return {
    ...state,
    AddFirmForm: updatedAddFirmForm,
  };
};

export const changeUpdateStockForm = (state, { payload }) => {
  let updated_form = _.cloneDeep(state.visitStock);
  updated_form[payload.edited_field] = payload.edited_value;
  updated_form[payload.edited_field1] = payload.edited_value1;

  return {
    ...state,
    visitStock: {
      ...state.visitStock,
      ...updated_form,
    },
  };
};

export const changeUpdateCustomerForm = (state, { payload }) => {
  let updated_form = _.cloneDeep(state.visitCustomerStock);
  updated_form[payload.edited_field] = payload.edited_value;
  updated_form[payload.edited_field1] = payload.edited_value1;
  return {
    ...state,
    visitCustomerStock: {
      ...state.visitCustomerStock,
      ...updated_form,
    },
  };
};

export const changeUpdateFirmForm = (state, { payload }) => {
  let updated_form = _.cloneDeep(state.visitFirmStock);
  updated_form[payload.edited_field] = payload.edited_value;
  updated_form[payload.edited_field1] = payload.edited_value1;
  return {
    ...state,
    visitFirmStock: {
      ...state.visitFirmStock,
      ...updated_form,
    },
  };
};

export const clearUpdateLongForm = (state) => ({
  ...state,
  visitStock: [],
  visitCustomerStock: [],
  visitFirmStock: [],
  AddStockForm: INITIAL_STATE.AddStockForm,
  AddCustomerForm: INITIAL_STATE.AddCustomerForm,
  AddFirmForm: INITIAL_STATE.AddFirmForm,
  sale: INITIAL_STATE.sale,
  best: INITIAL_STATE.best,
  firstFirm: INITIAL_STATE.firstFirm,
});
export const doNothing = (state) => ({
  ...state,
});

export const getResidenceAreaSuccess = (state, { payload }) => {
  return {
    ...state,
    getResidenceArea: payload,
    getResidenceAreaLoader: false,
  };
};

export const getResidenceAreaFailure = (state, { payload }) => {
  return {
    ...state,
    getResidenceAreaLoader: false,
    getResidenceArea: [],
  };
};

export const getResidenceAreaLoading = (state) => {
  return {
    ...state,
    getResidenceAreaLoader: true,
  };
};

export const getResidenceAreaLoadingStop = (state) => {
  return {
    ...state,
    getResidenceAreaLoader: false,
  };
};

export const getResidencePincodeSuccess = (state, { payload }) => {
  return {
    ...state,
    getResidencePincode: payload,
    getResidencePincodeLoader: false,
  };
};

export const getResidencePincodeFailure = (state, { payload }) => {
  return {
    ...state,
    getResidencePincodeLoader: false,
    getResidencePincode: [],
  };
};

export const getResidencePincodeLoading = (state) => {
  return {
    ...state,
    getResidencePincodeLoader: true,
  };
};

export const getResidencePincodeLoadingStop = (state) => {
  return {
    ...state,
    getResidencePincodeLoader: false,
  };
};

export const getResidenceZoneSuccess = (state, { payload }) => {
  return {
    ...state,
    getResidenceZone: payload,
    getResidenceZoneLoader: false,
  };
};

export const getResidenceZoneFailure = (state, { payload }) => {
  return {
    ...state,
    getResidenceZoneLoader: false,
    getResidenceZone: [],
  };
};

export const getResidenceZoneLoading = (state) => {
  return {
    ...state,
    getResidenceZoneLoader: true,
  };
};

export const getResidenceZoneLoadingStop = (state) => {
  return {
    ...state,
    getResidenceZoneLoader: false,
  };
};

export const getResidenceStateSuccess = (state, { payload }) => {
  return {
    ...state,
    getResidenceState: payload,
    getResidenceStateLoader: false,
  };
};

export const getResidenceStateFailure = (state, { payload }) => {
  return {
    ...state,
    getResidenceStateLoader: false,
    getResidenceState: [],
  };
};

export const getResidenceStateLoading = (state) => {
  return {
    ...state,
    getResidenceStateLoader: true,
  };
};

export const getResidenceStateLoadingStop = (state) => {
  return {
    ...state,
    getResidenceStateLoader: false,
  };
};

export const getResidenceSubStateSuccess = (state, { payload }) => {
  return {
    ...state,
    getResidenceSubState: payload,
    getResidenceSubStateLoader: false,
  };
};

export const getResidenceSubStateFailure = (state, { payload }) => {
  return {
    ...state,
    getResidenceSubStateLoader: false,
    getResidenceSubState: [],
  };
};

export const getResidenceSubStateLoading = (state) => {
  return {
    ...state,
    getResidenceSubStateLoader: true,
  };
};

export const getResidenceSubStateLoadingStop = (state) => {
  return {
    ...state,
    getResidenceSubStateLoader: false,
  };
};

export const getResidenceDistrictSuccess = (state, { payload }) => {
  return {
    ...state,
    getResidenceDistrict: payload,
    getResidenceDistrictLoader: false,
  };
};

export const getResidenceDistrictFailure = (state, { payload }) => {
  return {
    ...state,
    getResidenceDistrictLoader: false,
    getResidenceDistrict: [],
  };
};

export const getResidenceDistrictLoading = (state) => {
  return {
    ...state,
    getResidenceDistrictLoader: true,
  };
};

export const getResidenceDistrictLoadingStop = (state) => {
  return {
    ...state,
    getResidenceDistrictLoader: false,
  };
};

export const getResidenceCitySuccess = (state, { payload }) => {
  return {
    ...state,
    getResidenceCity: payload,
    getResidenceCityLoader: false,
  };
};

export const getResidenceCityFailure = (state, { payload }) => {
  return {
    ...state,
    getResidenceCityLoader: false,
    getResidenceCity: [],
  };
};

export const getResidenceCityLoading = (state) => {
  return {
    ...state,
    getResidenceCityLoader: true,
  };
};

export const getResidenceCityLoadingStop = (state) => {
  return {
    ...state,
    getResidenceCityLoader: false,
  };
};

export const addCustomerSale = (state, { payload }) => ({
  ...state,
  sale: _.cloneDeep(payload),
});

export const bestCustomer = (state, { payload }) => ({
  ...state,
  best: _.cloneDeep(payload),
});

export const firstYearSale = (state, { payload }) => ({
  ...state,
  firstFirm: _.cloneDeep(payload),
});
export const reducer = createReducer(INITIAL_STATE, {
  [DistributorTypes.CHANGE_DISTRIBUTOR_FORM]: changeDistributorForm,
  [DistributorTypes.ADD_CUSTOMER_SALE]: addCustomerSale,
  [DistributorTypes.BEST_CUSTOMER]: bestCustomer,
  [DistributorTypes.FIRST_YEAR_SALE]: firstYearSale,
  [DistributorTypes.SUBMIT_SELECTED_DISTRIBUTOR_FORM_SUCCESS]: submitSelectedDistributorFormSuccess,
  [DistributorTypes.SUBMIT_SELECTED_DISTRIBUTOR_FORM_FAILURE]: submitSelectedDistributorFormFailure,
  [DistributorTypes.SUBMIT_SELECTED_DISTRIBUTOR_FORM_LOADING]: submitSelectedDistributorFormLoading,
  [DistributorTypes.SUBMIT_SELECTED_DISTRIBUTOR_FORM_LOADING_STOP]: submitSelectedDistributorFormLoadingStop,

  [DistributorTypes.UPDATE_DISTRIBUTOR_FORM]: updateDistributorForm,
  [DistributorTypes.CHANGE_DISTRIBUTOR_SEARCH_FILTERS]: changeDistributorSearchFilters,

  [DistributorTypes.SUBMIT_EDITED_DISTRIBUTOR_FORM_SUCCESS]: submitEditedDistributorFormSuccess,
  [DistributorTypes.SUBMIT_EDITED_DISTRIBUTOR_FORM_FAILURE]: submitEditedDistributorFormFailure,
  [DistributorTypes.SUBMIT_EDITED_DISTRIBUTOR_FORM_LOADING]: submitEditedDistributorFormLoading,
  [DistributorTypes.SUBMIT_EDITED_DISTRIBUTOR_FORM_LOADING_STOP]: submitEditedDistributorFormLoadingStop,
  [DistributorTypes.DISTRIBUTOR_FORM_VALIDATION_FAILED]: distributorFormValidationFailed,

  [DistributorTypes.SUBMIT_DISTRIBUTOR_FORM_VALIDATION_FAILED]: submitDistributorFormValidationFailed,

  [DistributorTypes.GET_DISTRIBUTOR_SUCCESS]: getDistributorSuccess,
  [DistributorTypes.GET_DISTRIBUTOR_FAILURE]: getDistributorFailure,
  [DistributorTypes.GET_DISTRIBUTOR_LOADING]: getDistributorLoading,
  [DistributorTypes.GET_DISTRIBUTOR_LOADING_STOP]: getDistributorLoadingStop,

  [DistributorTypes.GET_ALL_AREA_SUCCESS]: getAllAreaSuccess,
  [DistributorTypes.GET_ALL_AREA_FAILURE]: getAllAreaFailure,
  [DistributorTypes.GET_ALL_AREA_LOADING]: getAllAreaLoading,
  [DistributorTypes.GET_ALL_AREA_LOADING_STOP]: getAllAreaLoadingStop,

  [DistributorTypes.GET_ALL_PINCODE_SUCCESS]: getAllPincodeSuccess,
  [DistributorTypes.GET_ALL_PINCODE_FAILURE]: getAllPincodeFailure,
  [DistributorTypes.GET_ALL_PINCODE_LOADING]: getAllPincodeLoading,
  [DistributorTypes.GET_ALL_PINCODE_LOADING_STOP]: getAllPincodeLoadingStop,

  [DistributorTypes.GET_ALL_STATE_SUCCESS]: getAllStateSuccess,
  [DistributorTypes.GET_ALL_STATE_FAILURE]: getAllStateFailure,
  [DistributorTypes.GET_ALL_STATE_LOADING]: getAllStateLoading,
  [DistributorTypes.GET_ALL_STATE_LOADING_STOP]: getAllStateLoadingStop,

  [DistributorTypes.GET_ALL_SUB_STATE_SUCCESS]: getAllSubStateSuccess,
  [DistributorTypes.GET_ALL_SUB_STATE_FAILURE]: getAllSubStateFailure,
  [DistributorTypes.GET_ALL_SUB_STATE_LOADING]: getAllSubStateLoading,
  [DistributorTypes.GET_ALL_SUB_STATE_LOADING_STOP]: getAllSubStateLoadingStop,

  [DistributorTypes.GET_ALL_DISTRICT_SUCCESS]: getAllDistrictSuccess,
  [DistributorTypes.GET_ALL_DISTRICT_FAILURE]: getAllDistrictFailure,
  [DistributorTypes.GET_ALL_DISTRICT_LOADING]: getAllDistrictLoading,
  [DistributorTypes.GET_ALL_DISTRICT_LOADING_STOP]: getAllDistrictLoadingStop,

  [DistributorTypes.GET_ALL_CITY_SUCCESS]: getAllCitySuccess,
  [DistributorTypes.GET_ALL_CITY_FAILURE]: getAllCityFailure,
  [DistributorTypes.GET_ALL_CITY_LOADING]: getAllCityLoading,
  [DistributorTypes.GET_ALL_CITY_LOADING_STOP]: getAllCityLoadingStop,

  [DistributorTypes.GET_ALL_ZONE_SUCCESS]: getAllZoneSuccess,
  [DistributorTypes.GET_ALL_ZONE_FAILURE]: getAllZoneFailure,
  [DistributorTypes.GET_ALL_ZONE_LOADING]: getAllZoneLoading,
  [DistributorTypes.GET_ALL_ZONE_LOADING_STOP]: getAllZoneLoadingStop,

  [DistributorTypes.SELECT_DISTRIBUTOR]: selectDistributor,
  [DistributorTypes.SELECT_DISTRIBUTOR_SUCCESS]: selectDistributorSuccess,
  [DistributorTypes.EXTRACT_FORM_DATA]: extractFormData,

  [DistributorTypes.UPDATE_DISTRIBUTOR_LOADING]: updateDistributorLoading,
  [DistributorTypes.UPDATE_DISTRIBUTOR_LOADING_STOP]: updateDistributorLoadingStop,
  [DistributorTypes.UPDATE_DISTRIBUTOR_SUCCESS]: updateDistributorSuccess,
  [DistributorTypes.UPDATE_DISTRIBUTOR_FAILURE]: updateDistributorFailure,

  [DistributorTypes.CLEAR_DISTRIBUTOR_FORM]: clearDistributorForm,

  [DistributorTypes.SEND_APPROVAL_SUCCESS]: sendApprovalSuccess,
  [DistributorTypes.SEND_APPROVAL_FAILURE]: sendApprovalFailure,
  [DistributorTypes.SEND_APPROVAL_LOADING]: sendApprovalLoading,
  [DistributorTypes.SEND_APPROVAL_LOADING_STOP]: sendApprovalLoadingStop,
  [DistributorTypes.ADD_STOCK_FORM]: addStockForm,
  [DistributorTypes.REMOVE_STOCK_FORM]: removeStockForm,
  [DistributorTypes.ADD_CUSTOMER_FORM]: addCustomerForm,
  [DistributorTypes.REMOVE_CUSTOMER_FORM]: removeCustomerForm,
  [DistributorTypes.REMOVE_FIRM_FORM]: removeFirmForm,
  [DistributorTypes.ADD_FIRM_FORM]: addFirmForm,
  [DistributorTypes.GET_SUB_CATEGORY_SUCCESS]: getSubCategorySuccess,
  [DistributorTypes.GET_SUB_CATEGORY_FAILURE]: getSubCategoryFailure,
  [DistributorTypes.GET_SUB_CATEGORY_LOADING]: getSubCategoryLoading,
  [DistributorTypes.GET_SUB_CATEGORY_LOADING_STOP]: getSubCategoryLoadingStop,
  [DistributorTypes.CHANGE_STOCK_FORM]: changeStockForm,
  [DistributorTypes.CHANGE_CUSTOMER_FORM]: changeCustomerForm,
  [DistributorTypes.CHANGE_FIRM_FORM]: changeFirmForm,
  [DistributorTypes.CHANGE_UPDATE_STOCK_FORM]: changeUpdateStockForm,
  [DistributorTypes.CHANGE_UPDATE_CUSTOMER_FORM]: changeUpdateCustomerForm,
  [DistributorTypes.CHANGE_UPDATE_FIRM_FORM]: changeUpdateFirmForm,
  [DistributorTypes.CLEAR_UPDATE_LONG_FORM]: clearUpdateLongForm,
  [DistributorTypes.CLEAR_TERRITORY]: clearTerritory,
  [DistributorTypes.DO_NOTHING]: doNothing,

  [DistributorTypes.GET_RESIDENCE_AREA_SUCCESS]: getResidenceAreaSuccess,
  [DistributorTypes.GET_RESIDENCE_AREA_FAILURE]: getResidenceAreaFailure,
  [DistributorTypes.GET_RESIDENCE_AREA_LOADING]: getResidenceAreaLoading,
  [DistributorTypes.GET_RESIDENCE_AREA_LOADING_STOP]: getResidenceAreaLoadingStop,

  [DistributorTypes.GET_RESIDENCE_PINCODE_SUCCESS]: getResidencePincodeSuccess,
  [DistributorTypes.GET_RESIDENCE_PINCODE_FAILURE]: getResidencePincodeFailure,
  [DistributorTypes.GET_RESIDENCE_PINCODE_LOADING]: getResidencePincodeLoading,
  [DistributorTypes.GET_RESIDENCE_PINCODE_LOADING_STOP]: getResidencePincodeLoadingStop,

  [DistributorTypes.GET_RESIDENCE_STATE_SUCCESS]: getResidenceStateSuccess,
  [DistributorTypes.GET_RESIDENCE_STATE_FAILURE]: getResidenceStateFailure,
  [DistributorTypes.GET_RESIDENCE_STATE_LOADING]: getResidenceStateLoading,
  [DistributorTypes.GET_RESIDENCE_STATE_LOADING_STOP]: getResidenceStateLoadingStop,

  [DistributorTypes.GET_RESIDENCE_SUB_STATE_SUCCESS]: getResidenceSubStateSuccess,
  [DistributorTypes.GET_RESIDENCE_SUB_STATE_FAILURE]: getResidenceSubStateFailure,
  [DistributorTypes.GET_RESIDENCE_SUB_STATE_LOADING]: getResidenceSubStateLoading,
  [DistributorTypes.GET_RESIDENCE_SUB_STATE_LOADING_STOP]: getResidenceSubStateLoadingStop,

  [DistributorTypes.GET_RESIDENCE_DISTRICT_SUCCESS]: getResidenceDistrictSuccess,
  [DistributorTypes.GET_RESIDENCE_DISTRICT_FAILURE]: getResidenceDistrictFailure,
  [DistributorTypes.GET_RESIDENCE_DISTRICT_LOADING]: getResidenceDistrictLoading,
  [DistributorTypes.GET_RESIDENCE_DISTRICT_LOADING_STOP]: getResidenceDistrictLoadingStop,

  [DistributorTypes.GET_RESIDENCE_CITY_SUCCESS]: getResidenceCitySuccess,
  [DistributorTypes.GET_RESIDENCE_CITY_FAILURE]: getResidenceCityFailure,
  [DistributorTypes.GET_RESIDENCE_CITY_LOADING]: getResidenceCityLoading,
  [DistributorTypes.GET_RESIDENCE_CITY_LOADING_STOP]: getResidenceCityLoadingStop,

  [DistributorTypes.GET_RESIDENCE_ZONE_SUCCESS]: getResidenceZoneSuccess,
  [DistributorTypes.GET_RESIDENCE_ZONE_FAILURE]: getResidenceZoneFailure,
  [DistributorTypes.GET_RESIDENCE_ZONE_LOADING]: getResidenceZoneLoading,
  [DistributorTypes.GET_RESIDENCE_ZONE_LOADING_STOP]: getResidenceZoneLoadingStop,
});
