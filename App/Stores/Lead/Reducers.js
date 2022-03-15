import { INITIAL_STATE } from "./InitialState";
import { createReducer } from "reduxsauce";
import { LeadTypes, LeadTypesTypes } from "./Actions";
import _ from "lodash";

export const changeLeadForm = (state, { payload }) => {
  let updated_form = _.cloneDeep(state.leadForm);
  updated_form[payload.edited_field] = payload.edited_value;

  return {
    ...state,
    leadForm: {
      ...state.leadForm,
      ...updated_form,
    },
    //    formValidation: {
    //        invalid: false,
    //        invalid_field: ''
    //    }
  };
};

export const createLeadFormSuccess = (state, { payload }) => {
  return {
    ...state,
    leadForm: {
      ...state.leadForm,
    },
    record:payload.data,

    leadFormLoader: false,
  };
};

export const createLeadFormFailure = (state, { payload }) => {
  return {
    ...state,
    leadForm: {
      ...state.leadForm,
    },
    leadFormLoader: false,
  };
};

export const createLeadFormLoading = (state) => ({
  ...state,
  leadFormLoader: true,
});

export const createLeadFormLoadingStop = (state, { payload }) => {
  return {
    ...state,
    leadFormLoader: false,
  };
};
export const getLeadLoading = (state) => ({
  ...state,
  getLeadLoader: true,
});

export const getLeadSuccess = (state, { payload }) => ({
  ...state,
  getLeadLoader: false,
  getLead: _.cloneDeep(payload),
});

export const getLeadFailure = (state) => ({
  ...state,
  getLeadLoader: false,
  getLead:[]
});

export const changeLeadSearchFilters = (state, { payload }) => {
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

export const doNothing = (state) => ({
  ...state,
});


export const updateLeadSuccess = (state, { payload }) => ({
  ...state,
  leadForm: {},
  record:payload.data,
  updateLeadLoader: false,
});

export const updateLeadLoading = (state) => ({
  ...state,
  updateLeadLoader: true,
});

export const updateLeadLoadingStop = (state) => ({
  ...state,
  updateLeadLoader: false,
});

export const updateLeadFailure = (state, { payload }) => ({
  ...state,
  updateLeadLoader: false,
});

export const selectLead = (state, { payload }) => ({
  ...state,
leadForm:(payload),
});

export const selectLeadSuccess = (state, { payload }) => ({
  ...state,
  leadForm: _.cloneDeep(payload),
});
export const clearForm = (state) => ({
  ...state,
  leadForm: {},
});
export const resetFilter = (state) => ({
  ...state,
  searchFilters: INITIAL_STATE.searchFilters,
  // searchFilters
});


export const reducer = createReducer(INITIAL_STATE, {
  [LeadTypes.CHANGE_LEAD_FORM]: changeLeadForm,

  [LeadTypes.CREATE_LEAD_FORM_SUCCESS]: createLeadFormSuccess,
  [LeadTypes.CREATE_LEAD_FORM_FAILURE]: createLeadFormFailure,
  [LeadTypes.CREATE_LEAD_FORM_LOADING]: createLeadFormLoading,
  [LeadTypes.CREATE_LEAD_FORM_LOADING_STOP]: createLeadFormLoadingStop,

  [LeadTypes.GET_LEAD_LOADING]: getLeadLoading,
  [LeadTypes.GET_LEAD_SUCCESS]: getLeadSuccess,
  [LeadTypes.GET_LEAD_FAILURE]: getLeadFailure,
  [LeadTypes.CHANGE_LEAD_SEARCH_FILTERS]: changeLeadSearchFilters,

  [LeadTypes.DO_NOTHING]: doNothing,

  [LeadTypes.UPDATE_LEAD_SUCCESS]: updateLeadSuccess,
  [LeadTypes.UPDATE_LEAD_FAILURE]: updateLeadFailure,
  [LeadTypes.UPDATE_LEAD_LOADING]: updateLeadLoading,
  [LeadTypes.UPDATE_LEAD_LOADING_STOP]: updateLeadLoadingStop,

  [LeadTypes.SELECT_LEAD]: selectLead,
  [LeadTypes.SELECT_LEAD_SUCCESS]: selectLeadSuccess,
  [LeadTypes.CLEAR_FORM]: clearForm,
  [LeadTypes.RESET_FILTER]: resetFilter,
});
