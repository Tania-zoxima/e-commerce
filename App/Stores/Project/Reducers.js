import { INITIAL_STATE } from "./InitialState";
import { createReducer } from "reduxsauce";
import { ProjectTypes } from "./Actions";
import _ from "lodash";

export const changeProjectForm = (state, { payload }) => {
  let updated_form = _.cloneDeep(state.projectForm);
  updated_form[payload.edited_field] = payload.edited_value;

  return {
    ...state,
    projectForm: {
      ...state.projectForm,
      ...updated_form,
    },
    projectFormValidation: {
      invalid: false,
      invalid_field: "",
    },
  };
};

export const createProjectFormSuccess = (state, { payload }) => {
  return {
    ...state,
    projectForm: {
      ...state.projectForm,
    },
    record: payload.data,
    projectFormLoader: false,
  };
};

export const createProjectFormFailure = (state, { payload }) => {
  return {
    ...state,
    projectForm: {
      ...state.projectForm,
    },
    projectFormLoader: false,
  };
};

export const createProjectFormLoading = (state) => ({
  ...state,
  projectFormLoader: true,
});

export const createProjectFormLoadingStop = (state, { payload }) => {
  return {
    ...state,
    projectFormLoader: false,
  };
};
export const getProjectLoading = (state) => ({
  ...state,
  getProjectLoader: true,
});

export const getProjectSuccess = (state, { payload }) => ({
  ...state,
  getProjectLoader: false,
  getProject: _.cloneDeep(payload),
});

export const getProjectFailure = (state) => ({
  ...state,
  getProjectLoader: false,
  getProject: [],
});

export const changeProjectSearchFilters = (state, { payload }) => {
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
export const getBathroomMasterSuccess = (state, { payload }) => {
  return {
    ...state,
    bathroomMaster: payload,
    getBathroomMasterLoader: false,
  };
};

export const getBathroomMasterFailure = (state, { payload }) => {
  return {
    ...state,
    getBathroomMasterLoader: false,
    bathroomMaster: [],
  };
};

export const getBathroomMasterLoading = (state) => {
  return {
    ...state,
    getBathroomMasterLoader: true,
  };
};

export const getBathroomMasterLoadingStop = (state) => {
  return {
    ...state,
    getBathroomMasterLoader: false,
  };
};

export const updateProjectSuccess = (state, { payload }) => ({
  ...state,
  projectForm: {},
  record: payload.data,
  updateProjectLoader: false,
});

export const updateProjectLoading = (state) => ({
  ...state,
  updateProjectLoader: true,
});

export const updateProjectLoadingStop = (state) => ({
  ...state,
  updateProjectLoader: false,
});

export const updateProjectFailure = (state, { payload }) => ({
  ...state,
  updateProjectLoader: false,
});

export const selectProject = (state, { payload }) => ({
  ...state,
  projectForm: payload,
});

export const selectProjectSuccess = (state, { payload }) => ({
  ...state,
  projectForm: _.cloneDeep(payload),
});
export const clearProjectForm = (state) => ({
  ...state,
  projectForm: {},
  cart: {
    ...state.cart,
    cartItem: []
  },
});

export const clearProjectApi = (state) => ({
  ...state,
  getProjectOpportunity: [],
  getProductSold: [],
  getProjectProductSold: [],
  getProductOffer: [],
});
export const clearGetProjectApi = (state) => ({
  ...state,
  getProject: [],
});

export const projectFormValidationFailed = (state, { payload }) => ({
  ...state,
  projectFormValidation: {
    ...payload,
  },
});

export const getCatalogueLoading = (state) => ({
  ...state,
  getCatalogueLoader: true,
});

export const getCatalogueSuccess = (state, { payload }) => ({
  ...state,
  getCatalogueLoader: false,
  catalogue: _.cloneDeep(payload),
});

export const getCatalogueFailure = (state) => ({
  ...state,
  getCatalogueLoader: false,
  catalogue: [],
});

export const resetFilter = (state) => ({
  ...state,
  searchFilters: INITIAL_STATE.searchFilters,
  // searchFilters
});

export const getProjectOpportunityLoading = (state) => ({
  ...state,
  getProjectOpportunityLoader: true,
});

export const getProjectOpportunitySuccess = (state, { payload }) => ({
  ...state,
  getProjectOpportunityLoader: false,
  getProjectOpportunity: _.cloneDeep(payload),
});

export const getProjectOpportunityFailure = (state) => ({
  ...state,
  getProjectOpportunityLoader: false,
  getProjectOpportunity: [],
});

export const getProductSoldLoading = (state) => ({
  ...state,
  getProductSoldLoader: true,
});

export const getProductSoldSuccess = (state, { payload }) => ({
  ...state,
  getProductSoldLoader: false,
  getProductSold: _.cloneDeep(payload),
});

export const getProductSoldFailure = (state) => ({
  ...state,
  getProductSoldLoader: false,
  getProductSold: [],
});

export const getProjectProductSoldLoading = (state) => ({
  ...state,
  getProjectProductSoldLoader: true,
});

export const getProjectProductSoldSuccess = (state, { payload }) => ({
  ...state,
  getProjectProductSoldLoader: false,
  getProjectProductSold: _.cloneDeep(payload),
});

export const getProjectProductSoldFailure = (state) => ({
  ...state,
  getProjectProductSoldLoader: false,
  getProjectProductSold: [],
});

export const getProductOfferLoading = (state) => ({
  ...state,
  getProductOfferLoader: true,
});

export const getProductOfferSuccess = (state, { payload }) => ({
  ...state,
  getProductOfferLoader: false,
  getProductOffer: _.cloneDeep(payload),
});

export const getProductOfferFailure = (state) => ({
  ...state,
  getProductOfferLoader: false,
  getProductOffer: [],
});

export const addProductToCart = (state, { payload }) => {
  return {
    ...state,
    cart: {
      ...state.cart,
      cartItem: state.cart.cartItem.concat(payload),
    },
  };
};

export const createProjectProductSuccess = (state, { payload }) => {
  return {
    ...state,
    projectProduct: {
      ...state.projectProduct,
    },
    record: payload.data,
    projectProductLoader: false,
  };
};

export const createProjectProductFailure = (state, { payload }) => {
  return {
    ...state,
    projectProduct: {
      ...state.projectProduct,
    },
    projectProductLoader: false,
  };
};

export const createProjectProductLoading = (state) => ({
  ...state,
  projectProductLoader: true,
});

export const createProjectProductLoadingStop = (state, { payload }) => {
  return {
    ...state,
    projectProductLoader: false,
  };
};

export const clearCart = (state, { payload }) => {
  return {
    ...state,
    cart: {
      ...state.cart,
      cartItem: [],
    },
  };
};

export const reducer = createReducer(INITIAL_STATE, {
  [ProjectTypes.CHANGE_PROJECT_FORM]: changeProjectForm,
  [ProjectTypes.CLEAR_CART]: clearCart,

  [ProjectTypes.ADD_PRODUCT_TO_CART]: addProductToCart,

  [ProjectTypes.PROJECT_FORM_VALIDATION_FAILED]: projectFormValidationFailed,

  [ProjectTypes.GET_CATALOGUE_LOADING]: getCatalogueLoading,
  [ProjectTypes.GET_CATALOGUE_SUCCESS]: getCatalogueSuccess,
  [ProjectTypes.GET_CATALOGUE_FAILURE]: getCatalogueFailure,

  [ProjectTypes.CREATE_PROJECT_FORM_SUCCESS]: createProjectFormSuccess,
  [ProjectTypes.CREATE_PROJECT_FORM_FAILURE]: createProjectFormFailure,
  [ProjectTypes.CREATE_PROJECT_FORM_LOADING]: createProjectFormLoading,
  [ProjectTypes.CREATE_PROJECT_FORM_LOADING_STOP]: createProjectFormLoadingStop,

  [ProjectTypes.CREATE_PROJECT_PRODUCT_SUCCESS]: createProjectProductSuccess,
  [ProjectTypes.CREATE_PROJECT_PRODUCT_FAILURE]: createProjectProductFailure,
  [ProjectTypes.CREATE_PROJECT_PRODUCT_LOADING]: createProjectProductLoading,
  [ProjectTypes.CREATE_PROJECT_PRODUCT_LOADING_STOP]: createProjectProductLoadingStop,

  [ProjectTypes.GET_BATHROOM_MASTER_SUCCESS]: getBathroomMasterSuccess,
  [ProjectTypes.GET_BATHROOM_MASTER_FAILURE]: getBathroomMasterFailure,
  [ProjectTypes.GET_BATHROOM_MASTER_LOADING]: getBathroomMasterLoading,
  [ProjectTypes.GET_BATHROOM_MASTER_LOADING_STOP]: getBathroomMasterLoadingStop,

  [ProjectTypes.GET_PROJECT_LOADING]: getProjectLoading,
  [ProjectTypes.GET_PROJECT_SUCCESS]: getProjectSuccess,
  [ProjectTypes.GET_PROJECT_FAILURE]: getProjectFailure,
  [ProjectTypes.CHANGE_PROJECT_SEARCH_FILTERS]: changeProjectSearchFilters,

  [ProjectTypes.DO_NOTHING]: doNothing,

  [ProjectTypes.UPDATE_PROJECT_SUCCESS]: updateProjectSuccess,
  [ProjectTypes.UPDATE_PROJECT_FAILURE]: updateProjectFailure,
  [ProjectTypes.UPDATE_PROJECT_LOADING]: updateProjectLoading,
  [ProjectTypes.UPDATE_PROJECT_LOADING_STOP]: updateProjectLoadingStop,

  [ProjectTypes.SELECT_PROJECT]: selectProject,
  [ProjectTypes.SELECT_PROJECT_SUCCESS]: selectProjectSuccess,

  [ProjectTypes.CLEAR_PROJECT_FORM]: clearProjectForm,
  [ProjectTypes.CLEAR_PROJECT_API]: clearProjectApi,
  [ProjectTypes.CLEAR_GET_PROJECT_API]: clearGetProjectApi,
  [ProjectTypes.RESET_FILTER]: resetFilter,
  [ProjectTypes.GET_PROJECT_OPPORTUNITY_LOADING]: getProjectOpportunityLoading,
  [ProjectTypes.GET_PROJECT_OPPORTUNITY_SUCCESS]: getProjectOpportunitySuccess,
  [ProjectTypes.GET_PROJECT_OPPORTUNITY_FAILURE]: getProjectOpportunityFailure,

  [ProjectTypes.GET_PRODUCT_OFFER_LOADING]: getProductOfferLoading,
  [ProjectTypes.GET_PRODUCT_OFFER_SUCCESS]: getProductOfferSuccess,
  [ProjectTypes.GET_PRODUCT_OFFER_FAILURE]: getProductOfferFailure,

  [ProjectTypes.GET_PRODUCT_SOLD_LOADING]: getProductSoldLoading,
  [ProjectTypes.GET_PRODUCT_SOLD_SUCCESS]: getProductSoldSuccess,
  [ProjectTypes.GET_PRODUCT_SOLD_FAILURE]: getProductSoldFailure,

  [ProjectTypes.GET_PROJECT_PRODUCT_SOLD_LOADING]: getProjectProductSoldLoading,
  [ProjectTypes.GET_PROJECT_PRODUCT_SOLD_SUCCESS]: getProjectProductSoldSuccess,
  [ProjectTypes.GET_PROJECT_PRODUCT_SOLD_FAILURE]: getProjectProductSoldFailure,
});
