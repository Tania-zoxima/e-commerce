import { INITIAL_STATE } from "./InitialState";
import { createReducer } from "reduxsauce";
import { CompetitorTypes } from "./Actions";
import _ from "lodash";

export const changeCompetitorForm = (state, { payload }) => {
  let updated_form = _.cloneDeep(state.competitorForm);
  updated_form[payload.edited_field] = payload.edited_value;

  return {
    ...state,
    competitorForm: {
      ...state.competitorForm,
      ...updated_form,
    },
    //    competitorFormValidation: {
    //        invalid: false,
    //        invalid_field: ''
    //    }
  };
};

export const createCompetitorFormSuccess = (state, { payload }) => {
  return {
    ...state,
    competitorForm: {
      ...state.competitorForm,
      // selectedDistributorForm: [],
    },
    record: payload.data,
    competitorFormLoader: false,
  };
};

export const createCompetitorFormFailure = (state, { payload }) => {
  return {
    ...state,
    competitorForm: {
      ...state.competitorForm,
      competitorFormLoader: false,
    },
  };
};

export const createCompetitorFormLoading = (state, { payload }) => {
  return {
    ...state,
    competitorForm: {
      ...state.competitorForm,
      competitorFormLoader: true,
    },
  };
};

export const createCompetitorFormLoadingStop = (state, { payload }) => {
  return {
    ...state,
    competitorForm: {
      ...state.competitorForm,
      competitorFormLoader: false,
    },
  };
};

export const clearCompetitorForm = (state) => ({
  ...state,
  competitorForm: {},
  // searchFilters
});

export const getCompetitorSuccess = (state, { payload }) => {
  return {
    ...state,
    competitorList: payload,
    getCompetitorLoader: false,
  };
};

export const getCompetitorFailure = (state, { payload }) => {
  return {
    ...state,
    getCompetitorLoader: false,
    competitorList: [],
  };
};

export const getCompetitorLoading = (state) => {
  return {
    ...state,
    getCompetitorLoader: true,
  };
};

export const getCompetitorLoadingStop = (state) => {
  return {
    ...state,
    getCompetitorLoader: false,
  };
};

export const getCompetitorWithDateSuccess = (state, { payload }) => {
  return {
    ...state,
    competitorList: payload,
    getCompetitorLoader: false,
  };
};

export const getCompetitorWithDateFailure = (state, { payload }) => {
  return {
    ...state,
    getCompetitorLoader: false,
    competitorList: [],
  };
};

export const getCompetitorWithDateLoading = (state) => {
  return {
    ...state,
    getCompetitorLoader: true,
  };
};

export const getCompetitorWithDateLoadingStop = (state) => {
  return {
    ...state,
    getCompetitorLoader: false,
  };
};

export const getCompetitorNameSuccess = (state, { payload }) => {
  return {
    ...state,
    competitorName: payload,
    getCompetitorNameLoader: false,
  };
};

export const getCompetitorNameFailure = (state, { payload }) => {
  return {
    ...state,
    getCompetitorNameLoader: false,
    competitorName: [],
  };
};

export const getCompetitorNameLoading = (state) => {
  return {
    ...state,
    getCompetitorNameLoader: true,
  };
};

export const getCompetitorNameLoadingStop = (state) => {
  return {
    ...state,
    getCompetitorNameLoader: false,
  };
};

export const getClassSuccess = (state, { payload }) => {
  return {
    ...state,
    class: payload,
    getClassLoader: false,
  };
};

export const getClassFailure = (state, { payload }) => {
  return {
    ...state,
    getClassLoader: false,
    class: [],
  };
};

export const getClassLoading = (state) => {
  return {
    ...state,
    getClassLoader: true,
  };
};

export const getClassLoadingStop = (state) => {
  return {
    ...state,
    getClassLoader: false,
  };
};

export const changeCompetitorSearchFilters = (state, { payload }) => {
  let updated_competitor_search_filters = _.cloneDeep(state.searchFilters);
  updated_competitor_search_filters[payload.edited_field] =
    payload.edited_value;
  //console.log(payload.edited_field)
  return {
    ...state,

    searchFilters: {
      ...state.searchFilters,
      ...updated_competitor_search_filters,
    },
  };
};

export const getCompetitorParentSuccess = (state, { payload }) => {
  return {
    ...state,
    competitorParentList: payload,
    getCompetitorParentLoader: false,
  };
};

export const getCompetitorParentFailure = (state, { payload }) => {
  return {
    ...state,
    getCompetitorParentLoader: false,
    competitorParentList: [],
  };
};

export const getCompetitorParentLoading = (state) => {
  return {
    ...state,
    getCompetitorParentLoader: true,
  };
};

export const getCompetitorParentLoadingStop = (state) => {
  return {
    ...state,
    getCompetitorParentLoader: false,
  };
};
export const getCompetitorChildSuccess = (state, { payload }) => {
  return {
    ...state,
    competitorChildList: payload,
    getCompetitorChildLoader: false,
  };
};

export const getCompetitorChildFailure = (state, { payload }) => {
  return {
    ...state,
    getCompetitorChildLoader: false,
    competitorChildList: [],
  };
};

export const getCompetitorChildLoading = (state) => {
  return {
    ...state,
    getCompetitorChildLoader: true,
  };
};

export const getCompetitorChildLoadingStop = (state) => {
  return {
    ...state,
    getCompetitorChildLoader: false,
  };
};

export const changeSearchCompetitorFilters = (state, { payload }) => {
  let updated_search_filters = _.cloneDeep(state.searchCompetitorFilters);
  updated_search_filters[payload.edited_field] = payload.edited_value;
  return {
    ...state,
    searchCompetitorFilters: {
      ...state.searchCompetitorFilters,
      ...updated_search_filters,
    },
  };
};

export const resetFilter = (state) => ({
  ...state,
  searchCompetitorFilters: INITIAL_STATE.searchCompetitorFilters,
  // searchFilters: INITIAL_STATE.searchFilters,
  // searchFilters
});
export const resetDateFilter = (state) => ({
  ...state,
  // searchCompetitorFilters: INITIAL_STATE.searchCompetitorFilters,
  searchFilters: INITIAL_STATE.searchFilters,
  // searchFilters
});
export const reducer = createReducer(INITIAL_STATE, {
  [CompetitorTypes.CHANGE_COMPETITOR_FORM]: changeCompetitorForm,

  [CompetitorTypes.CREATE_COMPETITOR_FORM_SUCCESS]: createCompetitorFormSuccess,
  [CompetitorTypes.CREATE_COMPETITOR_FORM_FAILURE]: createCompetitorFormFailure,
  [CompetitorTypes.CREATE_COMPETITOR_FORM_LOADING]: createCompetitorFormLoading,
  [CompetitorTypes.CREATE_COMPETITOR_FORM_LOADING_STOP]: createCompetitorFormLoadingStop,

  [CompetitorTypes.GET_COMPETITOR_NAME_SUCCESS]: getCompetitorNameSuccess,
  [CompetitorTypes.GET_COMPETITOR_NAME_FAILURE]: getCompetitorNameFailure,
  [CompetitorTypes.GET_COMPETITOR_NAME_LOADING]: getCompetitorNameLoading,
  [CompetitorTypes.GET_COMPETITOR_NAME_LOADING_STOP]: getCompetitorNameLoadingStop,

  [CompetitorTypes.GET_COMPETITOR_LOADING]: getCompetitorLoading,
  [CompetitorTypes.GET_COMPETITOR_LOADING_STOP]: getCompetitorLoadingStop,
  [CompetitorTypes.GET_COMPETITOR_SUCCESS]: getCompetitorSuccess,
  [CompetitorTypes.GET_COMPETITOR_FAILURE]: getCompetitorFailure,

  [CompetitorTypes.GET_COMPETITOR_WITH_DATE_LOADING]: getCompetitorWithDateLoading,
  [CompetitorTypes.GET_COMPETITOR_WITH_DATE_LOADING_STOP]: getCompetitorWithDateLoadingStop,
  [CompetitorTypes.GET_COMPETITOR_WITH_DATE_SUCCESS]: getCompetitorWithDateSuccess,
  [CompetitorTypes.GET_COMPETITOR_WITH_DATE_FAILURE]: getCompetitorWithDateFailure,

  [CompetitorTypes.GET_CLASS_SUCCESS]: getClassSuccess,
  [CompetitorTypes.GET_CLASS_FAILURE]: getClassFailure,
  [CompetitorTypes.GET_CLASS_LOADING]: getClassLoading,
  [CompetitorTypes.GET_CLASS_LOADING_STOP]: getClassLoadingStop,

  [CompetitorTypes.CLEAR_COMPETITOR_FORM]: clearCompetitorForm,
  [CompetitorTypes.CHANGE_COMPETITOR_SEARCH_FILTERS]: changeCompetitorSearchFilters,

  [CompetitorTypes.GET_COMPETITOR_PARENT_LOADING]: getCompetitorParentLoading,
  [CompetitorTypes.GET_COMPETITOR_PARENT_LOADING_STOP]: getCompetitorParentLoadingStop,
  [CompetitorTypes.GET_COMPETITOR_PARENT_SUCCESS]: getCompetitorParentSuccess,
  [CompetitorTypes.GET_COMPETITOR_PARENT_FAILURE]: getCompetitorParentFailure,

  [CompetitorTypes.GET_COMPETITOR_CHILD_LOADING]: getCompetitorChildLoading,
  [CompetitorTypes.GET_COMPETITOR_CHILD_LOADING_STOP]: getCompetitorChildLoadingStop,
  [CompetitorTypes.GET_COMPETITOR_CHILD_SUCCESS]: getCompetitorChildSuccess,
  [CompetitorTypes.GET_COMPETITOR_CHILD_FAILURE]: getCompetitorChildFailure,
  [CompetitorTypes.CHANGE_SEARCH_COMPETITOR_FILTERS]: changeSearchCompetitorFilters,
  [CompetitorTypes.RESET_FILTER]: resetFilter,
  [CompetitorTypes.RESET_DATE_FILTER]: resetDateFilter,
});
