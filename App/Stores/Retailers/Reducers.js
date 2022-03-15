/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from "./InitialState";
import { createReducer } from "reduxsauce";
import { RetailersTypes } from "./Actions";
import _ from "lodash";

export const createRetailerLoading = (state) => ({
  ...state,
  createRetailerLoader: true,
});

export const createRetailerLoadingStop = (state) => ({
  ...state,
  createRetailerLoader: false,
});

export const changeRetailerForm = (state, { payload }) => {
  let updated_form = _.cloneDeep(state.retailerForm);
  updated_form[payload.edited_field] = payload.edited_value;

  return {
    ...state,
    retailerForm: {
      ...state.retailerForm,
      ...updated_form,
    },
    retailerFormValidation: {
      invalid: false,
      invalid_field: "",
    },
  };
};

export const changeUpdateRetailerForm = (state, { payload }) => {
  let updated_form = _.cloneDeep(state.retailerUpdateForm);
  updated_form[payload.edited_field] = payload.edited_value;

  return {
    ...state,
    retailerForm: {
      ...state.retailerForm,
      // ...updated_form
    },
  };
};

export const createRetailerFailure = (state, { payload }) => ({
  ...state,
  createRetailerLoader: false,
});

export const retailerFormValidationFailed = (state, { payload }) => ({
  ...state,
  retailerFormValidation: {
    ...payload,
  },
});

export const createRetailerSuccess = (state, { payload }) => ({
  ...state,
  retailerForm: {},
  record: payload.data,
  createRetailerLoader: false,
});

export const updateRetailerSuccess = (state, { payload }) => ({
  ...state,
  retailerForm: {},
  record: payload.data,
  updateRetailerLoader: false,
});

export const updateRetailerLoading = (state) => ({
  ...state,
  updateRetailerLoader: true,
});

export const updateRetailerLoadingStop = (state) => ({
  ...state,
  updateRetailerLoader: false,
});

export const updateRetailerFailure = (state, { payload }) => ({
  ...state,
  updateRetailerLoader: false,
});

export const createComplaintSuccess = (state, { payload }) => ({
  ...state,
  ComplaintForm: {},
  createComplaintLoading: false,
});

export const createComplaintLoading = (state) => ({
  ...state,
  createComplaintLoading: true,
});

export const createComplaintLoadingStop = (state) => ({
  ...state,
  createComplaintLoading: false,
});

export const createComplaintFailure = (state, { payload }) => ({
  ...state,
  createComplaintLoading: false,
});

export const updateRetailerLocationLoading = (state) => ({
  ...state,
  updateRetailerLocationLoader: true,
});

export const updateRetailerLocationLoadingStop = (state) => ({
  ...state,
  updateRetailerLocationLoader: false,
});
export const extractFormDataUpdate = (state, { payload }) => ({
  ...state,
  retailerUpdateForm: payload,
});

export const updateRetailerLocationSuccess = (state, { payload }) => ({
  ...state,
  updateRetailerLocationLoader: false,
});

export const updateRetailerLocationFailure = (state, { payload }) => ({
  ...state,
  updateRetailerLocationLoader: false,
});

export const fetchRetailersLoading = (state) => ({
  ...state,
  fetchRetailersLoader: true,
});

export const fetchCreditLimitLoading = (state) => ({
  ...state,
  fetchCreditLimitLoading: true,
});

export const fetchCreditLimitSuccess = (state, { payload }) => ({
  ...state,
  fetchCreditLimitList: _.cloneDeep(payload),
  fetchCreditLimitLoading: false,
});

export const fetchCreditLimitFailure = (state) => ({
  ...state,
  fetchCreditLimitLoading: false,
});

export const fetchRetailersSuccess = (state, { payload }) => ({
  ...state,
  retailersList: _.cloneDeep(payload),
  fetchRetailersLoader: false,
});

export const fetchRetailersFailure = (state, { payload }) => ({
  ...state,
  fetchRetailersLoader: false,
  retailersList: [],
});

export const fetchDealersLoading = (state) => ({
  ...state,
  fetchDealersLoader: true,
});

export const fetchDealersSuccess = (state, { payload }) => ({
  ...state,
  dealersList: _.cloneDeep(payload),
  fetchDealersLoader: false,
});

export const fetchDealersFailure = (state, { payload }) => ({
  ...state,
  fetchDealersLoader: false,
  dealersList: [],
});

export const fetchRetailerOrdersLoading = (state) => ({
  ...state,
  fetchRetailerOrdersLoader: true,
});

export const fetchRetailerOrdersSuccess = (state, { payload }) => ({
  // let updatedretailerOrders = _.cloneDeep(state.retailerOrders);
  // updatedretailerOrders = _.extend(updatedretailerOrders, payload);

  ...state,
  retailerOrders: _.cloneDeep(payload),
  fetchRetailerOrdersLoader: false,
});

export const fetchRetailerOrdersFailure = (state) => ({
  ...state,
  fetchRetailerOrdersLoader: false,
  retailerOrders: [],
});

export const openMoreFilters = (state) => ({
  ...state,
  openMoreFilters: true,
});

export const closeMoreFilters = (state) => ({
  ...state,
  openMoreFilters: false,
});

export const updateSearchFilters = (state, { payload }) => {
  let updated_search_filters = _.cloneDeep(state.retailerSearchFilters);
  updated_search_filters[payload.edited_field] = payload.edited_value;

  return {
    ...state,
    retailerSearchFilters: {
      ...state.retailerSearchFilters,
      ...updated_search_filters,
    },
    openMoreFilters: false,
  };
};

export const selectRetailer = (state, { payload }) => ({
  ...state,
  selectedRetailer: payload,
});

export const selectRetailerSuccess = (state, { payload }) => ({
  ...state,
  selectedRetailer: _.cloneDeep(payload),
});

export const clearSelectRetailer = (state) => ({
  ...state,
  selectedRetailer: {},
});

export const clearRetailerForm = (state) => ({
  ...state,
  retailerForm: {},
  addressForm: {},
  updateAddress: {},
});

export const fetchRetailerCompetitorsLoading = (state) => ({
  ...state,
  fetchRetailerCompetitorsLoader: true,
});

export const fetchRetailerCompetitorsSuccess = (state, { payload }) => ({
  ...state,
  retailerCompetitors: payload,
  fetchRetailerCompetitorsLoader: false,
});

export const fetchRetailerCompetitorsFailure = (state) => ({
  ...state,
  fetchRetailerCompetitorsLoader: false,
});

export const doNothing = (state) => ({
  ...state,
});

export const makeDealerSearchList = (state, { payload }) => ({
  ...state,
  dealersSearchList: payload,
});

export const makeRetailerSearchList = (state, { payload }) => ({
  ...state,
  retailersSearchList: payload,
});

export const makeRetailerBeatSearchList = (state, { payload }) => ({
  ...state,
  retailersBeatSearchList: payload,
});

export const extractFormData = (state, { payload }) => ({
  ...state,
  retailerForm: payload,
});

export const fetchRetailerDealerSearchByLocationLoading = (
  state,
  { payload }
) => ({
  ...state,
  retailerDealerSearchByLocationLoader: true,
});

export const fetchRetailerDealerSearchByLocationLoadingStop = (
  state,
  { payload }
) => ({
  ...state,
  retailerDealerSearchByLocationLoader: false,
});

export const fetchRetailerDealerSearchByLocationSuccess = (
  state,
  { payload }
) => ({
  ...state,
  retailerDealerSearchByLocationList: _.cloneDeep(payload),
  retailerDealerSearchByLocationLoader: false,
});

export const fetchRetailerDealerSearchByLocationFailure = (
  state,
  { payload }
) => ({
  ...state,
  retailerDealerSearchByLocationList: [],
  retailerDealerSearchByLocationLoader: false,
});

export const fetchDealerOrdersLoading = (state) => ({
  ...state,
  fetchDealerOrdersLoader: true,
});

export const fetchDealerOrdersSuccess = (state, { payload }) => {
  let updateddealerOrders = _.cloneDeep(state.dealerOrders);
  updateddealerOrders = _.extend(updateddealerOrders, payload);

  return {
    ...state,
    dealerOrders: {
      ...updateddealerOrders,
    },
    fetchDealerOrdersLoader: false,
  };
};

export const fetchDealerOrdersFailure = (state) => ({
  ...state,
  fetchDealerOrdersLoader: false,
});

export const fetchDealerInvoiceLoading = (state) => ({
  ...state,
  fetchDealerInvoiceLoader: true,
});

export const fetchDealerInvoiceSuccess = (state, { payload }) => {
  let updateddealerInvoice = _.cloneDeep(state.dealerInvoice);
  updateddealerInvoice = _.extend(updateddealerInvoice, payload);

  return {
    ...state,
    dealerInvoice: {
      ...updateddealerInvoice,
    },
    fetchDealerInvoiceLoader: false,
  };
};

export const fetchDealerInvoiceFailure = (state) => ({
  ...state,
  fetchDealerInvoiceLoader: false,
});

export const fetchDealerOutstandingLoading = (state) => ({
  ...state,
  fetchDealerOutstandingLoader: true,
});

export const fetchDealerOutstandingSuccess = (state, { payload }) => {
  let updateddealerOutstanding = _.cloneDeep(state.dealerOutstanding);
  updateddealerOutstanding = _.extend(updateddealerOutstanding, payload);

  return {
    ...state,
    dealerOutstanding: {
      ...updateddealerOutstanding,
    },
    fetchDealerOutstandingLoader: false,
  };
};

export const fetchDealerOutstandingFailure = (state) => ({
  ...state,
  fetchDealerOutstandingLoader: false,
});

export const fetchDealerPaymentsLoading = (state) => ({
  ...state,
  fetchDealerPaymentsLoader: true,
});

export const fetchDealerPaymentsSuccess = (state, { payload }) => {
  let updateddealerPayments = _.cloneDeep(state.dealerPayments);
  updateddealerPayments = _.extend(updateddealerPayments, payload);

  return {
    ...state,
    dealerPayments: {
      ...updateddealerPayments,
    },
    fetchDealerPaymentsLoader: false,
  };
};

export const fetchDealerPaymentsFailure = (state) => ({
  ...state,
  fetchDealerPaymentsLoader: false,
});

export const fetchInvoiceDetailLoading = (state) => ({
  ...state,
  fetchInvoiceDetailLoader: true,
});

export const fetchInvoiceDetailSuccess = (state, { payload }) => {
  let updatedInvoiceDetailsMapping = _.cloneDeep(
    state.allInvoiceDetailsMapping
  );
  updatedInvoiceDetailsMapping[payload.id] = payload.data;
  return {
    ...state,
    fetchInvoiceDetailLoader: false,
    allInvoiceDetailsMapping: updatedInvoiceDetailsMapping,
  };
};

export const fetchInvoiceDetailFailure = (state) => ({
  ...state,
  fetchInvoiceDetailLoader: false,
});

export const editPaymentsForm = (state, { payload }) => {
  let updated_form = _.cloneDeep(state.paymentForm);
  updated_form[payload.edited_field] = payload.edited_value;

  return {
    ...state,
    paymentForm: {
      ...state.paymentForm,
      ...updated_form,
    },
  };
};

export const submitPaymentsFormSuccess = (state, { payload }) => ({
  ...state,
  paymentFormLoader: false,
  paymentForm: INITIAL_STATE.paymentForm,
});

export const submitPaymentsFormFailure = (state, { payload }) => ({
  ...state,
  paymentFormLoader: false,
});

export const submitPaymentsFormLoading = (state, { payload }) => ({
  ...state,
  paymentFormLoader: true,
});

export const submitPaymentsFormLoadingStop = (state, { payload }) => ({
  ...state,
  paymentFormLoader: false,
});

export const clearPaymentsForm = (state, { payload }) => ({
  ...state,
  paymentForm: INITIAL_STATE.paymentForm,
});

export const clearPayment = (state) => ({
  ...state,
  getPayment: {},
});

export const fetchComplaintTypeLoading = (state) => ({
  ...state,
  fetchComplaintTypeLoading: true,
});

export const fetchComplaintTypeSuccess = (state, { payload }) => ({
  ...state,
  agentComplaintType: payload,
  fetchComplaintTypeLoading: false,
});

export const fetchComplaintTypeFailure = (state, { payload }) => ({
  ...state,
  fetchComplaintTypeLoading: false,
});

// [RetailersTypes.CREATE_COMPETITOR_SUCCESS]: createCompetitorSuccess,
// [RetailersTypes.CREATE_COMPETITOR_FAILURE]: createCompetitorFailure,
// [RetailersTypes.CREATE_COMPETITOR_LOADING]: createCompetitorLoading,
// [RetailersTypes.CREATE_COMPETITOR_LOADING_STOP]: createCompetitorLoadingStop

export const createCompetitorSuccess = (state, { payload }) => ({
  ...state,
  createCompetitorLoader: false,
});

export const createCompetitorFailure = (state, { payload }) => ({
  ...state,
  createCompetitorLoader: false,
});

export const createCompetitorLoading = (state, { payload }) => ({
  ...state,
  createCompetitorLoader: true,
});

export const createCompetitorLoadingStop = (state, { payload }) => ({
  ...state,
  createCompetitorLoader: false,
});

export const editNewCompetitorForm = (state, { payload }) => {
  let updated_form = _.cloneDeep(state.newCompetitorForm);
  updated_form[payload.edited_field] = payload.edited_value;
  return {
    ...state,
    newCompetitorForm: {
      ...state.newCompetitorForm,
      ...updated_form,
    },
  };
};

export const clearNewCompetitorForm = (state, { payload }) => {
  return {
    ...state,
    newCompetitorForm: {},
  };
};

export const fetchComplaintsLoading = (state) => ({
  ...state,
  fetchComplaintsLoading: true,
});

export const fetchComplaintsSuccess = (state, { payload }) => ({
  ...state,
  agentComplaints: payload,
  fetchComplaintsLoading: false,
});

export const fetchComplaintsFailure = (state, { payload }) => ({
  ...state,
  fetchComplaintsLoading: false,
});

export const fetchDsrLoading = (state) => ({
  ...state,
  fetchDsrLoader: true,
});

export const fetchDsrSuccess = (state, { payload }) => ({
  ...state,
  dsrList: _.cloneDeep(payload),

  fetchDsrLoader: false,
});

export const fetchDsrFailure = (state, { payload }) => ({
  ...state,
  fetchDsrLoader: false,
  dsrList: [],
});

export const fetchDsrAreaLoading = (state) => ({
  ...state,
  fetchDsrAreaLoader: true,
});

export const fetchDsrAreaSuccess = (state, { payload }) => ({
  ...state,
  dsrArea: _.cloneDeep(payload),

  fetchDsrAreaLoader: false,
});

export const fetchDsrAreaFailure = (state, { payload }) => ({
  ...state,
  fetchDsrAreaLoader: false,
  dsrArea: [],
});

export const fetchDsrAreaListLoading = (state) => ({
  ...state,
  fetchDsrAreaListLoader: true,
});

export const fetchDsrAreaListSuccess = (state, { payload }) => ({
  ...state,
  dsrAreaList: _.cloneDeep(payload),

  fetchDsrAreaListLoader: false,
});

export const fetchDsrAreaListFailure = (state, { payload }) => ({
  ...state,
  fetchDsrAreaListLoader: false,
  dsrAreaList: [],
});

export const createDsrLoading = (state) => ({
  ...state,
  createDsrLoader: true,
});

export const createDsrLoadingStop = (state) => ({
  ...state,
  createDsrLoader: false,
});

export const changeDsrForm = (state, { payload }) => {
  let updated_form = _.cloneDeep(state.dsrForm);
  updated_form[payload.edited_field] = payload.edited_value;

  return {
    ...state,
    dsrForm: {
      ...state.dsrForm,
      ...updated_form,
    },
    dsrFormValidation: {
      invalid: false,
      invalid_field: "",
    },
  };
};

export const createDsrFailure = (state, { payload }) => ({
  ...state,
  createDsrLoader: false,
});

export const dsrFormValidationFailed = (state, { payload }) => ({
  ...state,
  dsrFormValidation: {
    ...payload,
  },
});

export const createDsrSuccess = (state, { payload }) => ({
  ...state,
  dsrForm: {},
  createDsrLoader: false,
});

export const createDsrAreaLoading = (state) => ({
  ...state,
  createDsrAreaLoader: true,
});

export const createDsrAreaLoadingStop = (state) => ({
  ...state,
  createDsrAreaLoader: false,
});

export const changeDsrAreaForm = (state, { payload }) => {
  let updated_form = _.cloneDeep(state.dsrAreaForm);
  updated_form[payload.edited_field] = payload.edited_value;

  return {
    ...state,
    dsrAreaForm: {
      ...state.dsrAreaForm,
      ...updated_form,
    },
  };
};

export const createDsrAreaFailure = (state, { payload }) => ({
  ...state,
  createDsrAreaLoader: false,
});

export const clearDsrAreaForm = (state, { payload }) => {
  return {
    ...state,
    dsrAreaForm: {},
  };
};

export const createDsrAreaSuccess = (state, { payload }) => ({
  ...state,
  dsrAreaForm: {},
  createDsrAreaLoader: false,
});

export const updateOrderSearchFilters = (state, { payload }) => {
  let updated_search_filters = _.cloneDeep(state.OrderSearchFilters);
  updated_search_filters[payload.edited_field] = payload.edited_value;
  return {
    ...state,
    OrderSearchFilters: updated_search_filters,
  };
};

export const deleteOrderLineLoading = (state, { payload }) => ({
  ...state,
  deleteOrderLineLoader: payload.id,
});

export const deleteOrderLineSuccess = (state, { payload }) => ({
  ...state,

  deleteOrderLineLoader: false,
});

export const deleteOrderLineFailure = (state, { payload }) => ({
  ...state,
  deleteOrderLineLoader: false,
});

export const editOrderQuantityLoading = (state, { payload }) => ({
  ...state,
  editOrderQuantityLoader: payload.id,
});

export const editOrderQuantitySuccess = (state, { payload }) => ({
  ...state,

  editOrderQuantityLoader: false,
});

export const editOrderQuantityFailure = (state, { payload }) => ({
  ...state,
  editOrderQuantityLoader: false,
});

export const addOrderLineLoading = (state) => ({
  ...state,
  addOrderLineLoader: true,
});

export const addOrderLineSuccess = (state, { payload }) => ({
  ...state,

  addOrderLineLoader: false,
});

export const addOrderLineFailure = (state, { payload }) => ({
  ...state,
  addOrderLineLoader: false,
});

export const setAddOrderLineData = (state, { payload }) => ({
  ...state,
  addOrderForm: payload,
});

export const clearAddOrderLineData = (state) => ({
  ...state,
  addOrderForm: INITIAL_STATE.addOrderForm,
});

export const getCustomerInfoSuccess = (state, { payload }) => {
  return {
    ...state,
    customerInfo: payload,
    getCustomerInfoLoader: false,
  };
};

export const getCustomerInfoFailure = (state, { payload }) => {
  return {
    ...state,
    getCustomerInfoLoader: false,
    customerInfo: [],
  };
};

export const getCustomerInfoLoading = (state) => {
  return {
    ...state,
    getCustomerInfoLoader: true,
  };
};

export const getCustomerInfoLoadingStop = (state) => {
  return {
    ...state,
    getCustomerInfoLoader: false,
  };
};

export const getCustomerVisitSuccess = (state, { payload }) => {
  return {
    ...state,
    customerVisit: payload,
    getCustomerVisitLoader: false,
  };
};

export const getCustomerVisitFailure = (state, { payload }) => {
  return {
    ...state,
    getCustomerVisitLoader: false,
    customerVisit: [],
  };
};

export const getCustomerVisitLoading = (state) => {
  return {
    ...state,
    getCustomerVisitLoader: true,
  };
};

export const getCustomerVisitLoadingStop = (state) => {
  return {
    ...state,
    getCustomerVisitLoader: false,
  };
};

export const getCustomerInvoiceSuccess = (state, { payload }) => {
  return {
    ...state,
    customerInvoice: payload,
    getCustomerInvoiceLoader: false,
  };
};

export const getCustomerInvoiceFailure = (state, { payload }) => {
  return {
    ...state,
    getCustomerInvoiceLoader: false,
    customerInvoice: [],
  };
};

export const getCustomerInvoiceLoading = (state) => {
  return {
    ...state,
    getCustomerInvoiceLoader: true,
  };
};

export const getCustomerInvoiceLoadingStop = (state) => {
  return {
    ...state,
    getCustomerInvoiceLoader: false,
  };
};

export const getCustomerComplaintSuccess = (state, { payload }) => {
  return {
    ...state,
    customerComplaint: payload,
    getCustomerComplaintLoader: false,
  };
};

export const getCustomerComplaintFailure = (state, { payload }) => {
  return {
    ...state,
    getCustomerComplaintLoader: false,
    customerComplaint: [],
  };
};

export const getCustomerComplaintLoading = (state) => {
  return {
    ...state,
    getCustomerComplaintLoader: true,
  };
};

export const getCustomerComplaintLoadingStop = (state) => {
  return {
    ...state,
    getCustomerComplaintLoader: false,
  };
};

export const changeComplaintForm = (state, { payload }) => {
  let updated_form = _.cloneDeep(state.complaintForm);
  updated_form[payload.edited_field] = payload.edited_value;

  return {
    ...state,
    complaintForm: {
      ...state.complaintForm,
      ...updated_form,
    },
    complaintFormValidation: {
      invalid: false,
      invalid_field: "",
    },
  };
};

export const complaintFormSuccess = (state, { payload }) => {
  return {
    ...state,
    complaintForm: {
      ...state.complaintForm,
      // selectedcomplaintForm: [],
    },
    record:payload,
    complaintFormLoader: false,
  };
};

export const complaintFormFailure = (state, { payload }) => {
  return {
    ...state,
    complaintForm: {
      ...state.complaintForm,
    },
    complaintFormLoader: false,
  };
};

export const complaintFormLoading = (state) => {
  return {
    ...state,

    complaintFormLoader: true,
  };
};

export const complaintFormLoadingStop = (state, { payload }) => {
  return {
    ...state,
    complaintForm: {
      ...state.complaintForm,
    },
    complaintFormLoader: false,
  };
};

export const getNatureCodeSuccess = (state, { payload }) => {
  return {
    ...state,
    getNatureCode: payload,
    getNatureCodeLoader: false,
  };
};

export const getNatureCodeFailure = (state, { payload }) => {
  return {
    ...state,
    getNatureCodeLoader: false,
    getNatureCode: [],
  };
};

export const getNatureCodeLoading = (state) => {
  return {
    ...state,
    getNatureCodeLoader: true,
  };
};

export const getNatureCodeLoadingStop = (state) => {
  return {
    ...state,
    getNatureCodeLoader: false,
  };
};

export const getCustomerInvoiceLinesSuccess = (state, { payload }) => {
  return {
    ...state,
    customerInvoiceLines: payload,
    getCustomerInvoiceLinesLoader: false,
  };
};

export const getCustomerInvoiceLinesFailure = (state, { payload }) => {
  return {
    ...state,
    getCustomerInvoiceLinesLoader: false,
    customerInvoiceLines: [],
  };
};

export const getCustomerInvoiceLinesLoading = (state) => {
  return {
    ...state,
    getCustomerInvoiceLinesLoader: true,
  };
};

export const getCustomerInvoiceLinesLoadingStop = (state) => {
  return {
    ...state,
    getCustomerInvoiceLinesLoader: false,
  };
};

export const getAllLocationSuccess = (state, { payload }) => {
  return {
    ...state,
    getAllLocation: payload,
    getAllLocationLoader: false,
  };
};

export const getAllLocationFailure = (state, { payload }) => {
  return {
    ...state,
    getAllLocationLoader: false,
    getAllLocation: [],
  };
};

export const getAllLocationLoading = (state) => {
  return {
    ...state,
    getAllLocationLoader: true,
  };
};

export const getAllLocationLoadingStop = (state) => {
  return {
    ...state,
    getAllLocationLoader: false,
  };
};

export const clearForm = (state) => ({
  ...state,
  complaintForm: {},
  retailerForm: {},
  contactForm: {},
  addressForm: {},
  updateAddress: {},
});

export const getCustomerAddressSuccess = (state, { payload }) => {
  return {
    ...state,
    customerAddress: payload,
    getCustomerAddressLoader: false,
  };
};

export const getCustomerAddressFailure = (state, { payload }) => {
  return {
    ...state,
    getCustomerAddressLoader: false,
    customerAddress: [],
  };
};

export const getCustomerAddressLoading = (state) => {
  return {
    ...state,
    getCustomerAddressLoader: true,
  };
};

export const getCustomerAddressLoadingStop = (state) => {
  return {
    ...state,
    getCustomerAddressLoader: false,
  };
};

export const changeAddressForm = (state, { payload }) => {
  let updated_form = _.cloneDeep(state.addressForm);
  updated_form[payload.edited_field] = payload.edited_value;

  return {
    ...state,
    addressForm: {
      ...state.addressForm,
      ...updated_form,
    },
    addressValidation: {
      invalid: false,
      invalid_field: "",
    },
  };
};

export const submitAddressFormSuccess = (state, { payload }) => {
  return {
    ...state,
    addressForm: {
      ...state.addressForm,
    },
    // selectedDistributorForm: [],
    submitAddressFormLoader: false,
  };
};

export const createContactFormSuccess = (state, { payload }) => {
  return {
    ...state,
    contactForm: {
      ...state.contactForm,
    },
    // selectedDistributorForm: [],
    contactFormLoader: false,
  };
};

export const submitAddressFormFailure = (state, { payload }) => {
  return {
    ...state,
    addressForm: {
      ...state.addressForm,
    },
    submitAddressFormLoader: false,
  };
};
export const createContactFormFailure = (state, { payload }) => {
  return {
    ...state,
    contactForm: {
      ...state.contactForm,
    },
    contactFormLoader: false,
  };
};

export const submitAddressFormLoading = (state, { payload }) => {
  return {
    ...state,

    submitAddressFormLoader: true,
  };
};

export const createContactFormLoading = (state) => ({
  ...state,
  contactFormLoader: true,
});

export const submitAddressFormLoadingStop = (state, { payload }) => {
  return {
    ...state,
    addressForm: {
      ...state.addressForm,
    },
    submitAddressFormLoader: false,
  };
};

export const createContactFormLoadingStop = (state) => {
  return {
    ...state,

    contactFormLoader: false,
  };
};
export const changeContactForm = (state, { payload }) => {
  let updated_form = _.cloneDeep(state.contactForm);
  updated_form[payload.edited_field] = payload.edited_value;

  return {
    ...state,
    contactForm: {
      ...state.contactForm,
      ...updated_form,
    },
    formValidation: {
      invalid: false,
      invalid_field: "",
    },
  };
};

export const contactFormValidationFailed = (state, { payload }) => ({
  ...state,
  formValidation: {
    ...payload,
  },
});

export const addressFormValidationFailed = (state, { payload }) => ({
  ...state,
  addressValidation: {
    ...payload,
  },
});

export const selectComplaint = (state, { payload }) => ({
  ...state,
  complaintForm: payload,
});

export const selectComplaintSuccess = (state, { payload }) => ({
  ...state,
  complaintForm: _.cloneDeep(payload),
});

export const getContactSuccess = (state, { payload }) => ({
  ...state,
  getContact: _.cloneDeep(payload),
  getContactLoader: false,
});

export const getContactFailure = (state, { payload }) => ({
  ...state,
  getContactLoader: false,
  getContact: [],
});

export const getContactLoading = (state) => ({
  ...state,
  getContactLoader: true,
});
export const getContactLoadingStop = (state) => {
  return {
    ...state,
    getContactLoader: false,
  };
};

export const searchComplaint = (state, { payload }) => ({
  ...state,
  data: payload,
});

export const changeSearchFilters = (state, { payload }) => {
  let updated_search_filters = _.cloneDeep(state.searchFilters);
  updated_search_filters[payload.edited_field] = payload.edited_value;
  return {
    ...state,
    searchFilters: {
      ...state.searchFilters,
      ...updated_search_filters,
    },
  };
};

export const getPincodeInfoSuccess = (state, { payload }) => {
  return {
    ...state,
    pincodeInfo: payload,
    getPincodeInfoLoader: false,
  };
};

export const getPincodeInfoFailure = (state, { payload }) => {
  return {
    ...state,
    getPincodeInfoLoader: false,
    pincodeInfo: [],
  };
};

export const getPincodeInfoLoading = (state) => {
  return {
    ...state,
    getPincodeInfoLoader: true,
  };
};

export const getPincodeInfoLoadingStop = (state) => {
  return {
    ...state,
    getPincodeInfoLoader: false,
  };
};

export const getAreaInfoSuccess = (state, { payload }) => {
  return {
    ...state,
    areaInfo: payload,
    getAreaInfoLoader: false,
  };
};

export const getAreaInfoFailure = (state, { payload }) => {
  return {
    ...state,
    getAreaInfoLoader: false,
    areaInfo: [],
  };
};

export const getAreaInfoLoading = (state) => {
  return {
    ...state,
    getAreaInfoLoader: true,
  };
};

export const getAreaInfoLoadingStop = (state) => {
  return {
    ...state,
    getAreaInfoLoader: false,
  };
};
export const selectContact = (state, { payload }) => ({
  ...state,
  addressForm: payload,
});

export const selectContactSuccess = (state, { payload }) => ({
  ...state,
  addressForm: _.cloneDeep(payload),
});

export const updateContactSuccess = (state, { payload }) => ({
  ...state,
  addressForm: {},
  updateContactLoader: false,
});

export const updateContactLoading = (state) => ({
  ...state,
  updateContactLoader: true,
});

export const updateContactLoadingStop = (state) => ({
  ...state,
  updateContactLoader: false,
});

export const updateContactFailure = (state, { payload }) => ({
  ...state,
  updateContactLoader: false,
});

export const selectContactForm = (state, { payload }) => ({
  ...state,
  contactForm: payload,
});

export const selectContactFormSuccess = (state, { payload }) => ({
  ...state,
  contactForm: _.cloneDeep(payload),
});

export const changeInvoiceSearchFilters = (state, { payload }) => {
  let updated_invoice_search_filters = _.cloneDeep(state.invoiceSearchFilters);
  updated_invoice_search_filters[payload.edited_field] = payload.edited_value;
  //console.log(payload.edited_field)
  return {
    ...state,

    invoiceSearchFilters: {
      ...state.invoiceSearchFilters,
      ...updated_invoice_search_filters,
    },
  };
};
export const captureCustomerLocationSuccess = (state, { payload }) => ({
  ...state,
  captureLocationLoader: false,
});
export const captureCustomerLocationLoading = (state) => ({
  ...state,
  captureLocationLoader: true,
});

export const captureCustomerLocationLoadingStop = (state) => ({
  ...state,
  captureLocationLoader: false,
});
export const captureCustomerLocationFailure = (state, { payload }) => ({
  ...state,
  captureLocationLoader: false,
});

export const getPaymentSuccess = (state, { payload }) => ({
  ...state,
  getPayment: _.cloneDeep(payload),
  getPaymentLoader: false,
});

export const getPaymentFailure = (state, { payload }) => ({
  ...state,
  getPaymentLoader: false,
  getPayment: {},
});

export const getPaymentLoading = (state) => ({
  ...state,
  getPaymentLoader: true,
});
export const getPaymentLoadingStop = (state) => {
  return {
    ...state,
    getPaymentLoader: false,
  };
};

export const createPaymentFormSuccess = (state, { payload }) => {
  return {
    ...state,
    paymentForm: {
      ...state.paymentForm,
    },
    // selectedDistributorForm: [],
    paymentFormLoader: false,
  };
};

export const createPaymentFormFailure = (state, { payload }) => {
  return {
    ...state,
    paymentForm: {
      ...state.paymentForm,
    },
    paymentFormLoader: false,
  };
};

export const createPaymentFormLoading = (state) => ({
  ...state,
  paymentFormLoader: true,
});

export const createPaymentFormLoadingStop = (state) => {
  return {
    ...state,

    paymentFormLoader: false,
  };
};
export const changePaymentForm = (state, { payload }) => {
  let updated_form = _.cloneDeep(state.paymentForm);
  updated_form[payload.edited_field] = payload.edited_value;
  // updated_form[payload.edited_field1] =   payload.edited_value1
  return {
    ...state,
    paymentForm: {
      ...state.paymentForm,
      ...updated_form,
    },
  };
};

export const updatePaymentSuccess = (state, { payload }) => ({
  ...state,
  paymentUpdateForm: {},
  paymentUpdateFormLoader: false,
});

export const updatePaymentLoading = (state) => ({
  ...state,
  paymentUpdateFormLoader: true,
});

export const updatePaymentLoadingStop = (state) => ({
  ...state,
  paymentUpdateFormLoader: false,
});

export const updatePaymentFailure = (state, { payload }) => ({
  ...state,
  paymentUpdateFormLoader: false,
});

export const changeUpdatePaymentForm = (state, { payload }) => {
  let updated_form = _.cloneDeep(state.paymentUpdateForm);
  updated_form[payload.edited_field] = payload.edited_value;
  //    updated_form[payload.edited_field1] =   payload.edited_value1
  return {
    ...state,
    paymentUpdateForm: {
      ...state.paymentUpdateForm,
      ...updated_form,
    },
  };
};

export const changeAccountStatus = (state, { payload }) => {
  let updated_form = _.cloneDeep(state.accountsStatus);
  updated_form[payload.edited_field] = payload.edited_value;

  return {
    ...state,
    accountsStatus: {
      ...state.accountsStatus,
      ...updated_form,
    },
    //    addressValidation: {
    //        invalid: false,
    //        invalid_field: ''
    //    }
  };
};

export const customerPffAutomationSuccess = (state, { payload }) => ({
  ...state,
  updatePff: {},
  pffAutomationLoader: false,
});
export const customerPffAutomationLoading = (state) => ({
  ...state,
  pffAutomationLoader: true,
});

export const customerPffAutomationLoadingStop = (state) => ({
  ...state,
  pffAutomationLoader: false,
});
export const customerPffAutomationFailure = (state, { payload }) => ({
  ...state,
  pffAutomationLoader: false,
});

export const changePffAutomation = (state, { payload }) => {
  let updated_form = _.cloneDeep(state.updatePff);
  updated_form[payload.edited_field] = payload.edited_value;

  return {
    ...state,
    updatePff: {
      ...state.updatePff,
      ...updated_form,
    },
    //    addressValidation: {
    //        invalid: false,
    //        invalid_field: ''
    //    }
  };
};
export const accountStatusSuccess = (state, { payload }) => ({
  ...state,
  accountsStatus: {},
  accountStatusLoader: false,
});
export const accountStatusLoading = (state) => ({
  ...state,
  accountStatusLoader: true,
});

export const accountStatusLoadingStop = (state) => ({
  ...state,
  accountStatusLoader: false,
});
export const accountStatusFailure = (state, { payload }) => ({
  ...state,
  accountStatusLoader: false,
});

export const changeHoldActive = (state, { payload }) => {
  let updated_form = _.cloneDeep(state.holdActive);
  updated_form[payload.edited_field] = payload.edited_value;

  return {
    ...state,
    holdActive: {
      ...state.holdActive,
      ...updated_form,
    },
    //    addressValidation: {
    //        invalid: false,
    //        invalid_field: ''
    //    }
  };
};

export const customerStatusSuccess = (state, { payload }) => ({
  ...state,
  holdActive: {},
  holdActiveLoader: false,
});
export const customerStatusLoading = (state) => ({
  ...state,
  holdActiveLoader: true,
});

export const customerStatusLoadingStop = (state) => ({
  ...state,
  holdActiveLoader: false,
});
export const customerStatusFailure = (state, { payload }) => ({
  ...state,
  holdActiveLoader: false,
});

export const showModal = (state, { payload }) => ({
  ...state,
  showModal: true,
});

export const closeModal = (state, { payload }) => ({
  ...state,
  showModal: false,
});

export const showModalHold = (state, { payload }) => ({
  ...state,
  showModalHold: true,
});

export const closeModalHold = (state, { payload }) => ({
  ...state,
  showModalHold: false,
});

export const showModalPpf = (state, { payload }) => ({
  ...state,
  showModalPpf: true,
});

export const closeModalPpf = (state, { payload }) => ({
  ...state,
  showModalPpf: false,
});

export const onEditInfo = (state, { payload }) => ({
  ...state,
  retailerForm: payload,
});

export const onEditInfoSuccess = (state, { payload }) => ({
  ...state,
  retailerForm: _.cloneDeep(payload),
});

export const getLanguageSuccess = (state, { payload }) => ({
  ...state,
  getLanguage: _.cloneDeep(payload),
  getLanguageLoader: false,
});

export const getLanguageFailure = (state, { payload }) => ({
  ...state,
  getLanguageLoader: false,
  getLanguage: {},
});

export const getLanguageLoading = (state) => ({
  ...state,
  getLanguageLoader: true,
});
export const getLanguageLoadingStop = (state) => {
  return {
    ...state,
    getLanguageLoader: false,
  };
};

export const reducer = createReducer(INITIAL_STATE, {
  [RetailersTypes.CLEAR_FORM]: clearForm,

  [RetailersTypes.CREATE_RETAILER_LOADING]: createRetailerLoading,
  [RetailersTypes.CREATE_RETAILER_LOADING_STOP]: createRetailerLoadingStop,
  [RetailersTypes.CREATE_RETAILER_SUCCESS]: createRetailerSuccess,
  [RetailersTypes.CREATE_RETAILER_FAILURE]: createRetailerFailure,

  [RetailersTypes.CREATE_COMPLAINT_LOADING]: createComplaintLoading,
  [RetailersTypes.CREATE_COMPLAINT_LOADING_STOP]: createComplaintLoadingStop,
  [RetailersTypes.CREATE_COMPLAINT_SUCCESS]: createComplaintSuccess,
  [RetailersTypes.CREATE_COMPLAINT_FAILURE]: createComplaintFailure,

  [RetailersTypes.UPDATE_RETAILER_LOADING]: updateRetailerLoading,
  [RetailersTypes.UPDATE_RETAILER_LOADING_STOP]: updateRetailerLoadingStop,
  [RetailersTypes.UPDATE_RETAILER_SUCCESS]: updateRetailerSuccess,
  [RetailersTypes.UPDATE_RETAILER_FAILURE]: updateRetailerFailure,

  [RetailersTypes.UPDATE_ORDER_SEARCH_FILTERS]: updateOrderSearchFilters,
  [RetailersTypes.CHANGE_RETAILER_FORM]: changeRetailerForm,
  [RetailersTypes.RETAILER_FORM_VALIDATION_FAILED]: retailerFormValidationFailed,

  [RetailersTypes.UPDATE_RETAILER_LOCATION_LOADING]: updateRetailerLocationLoading,
  [RetailersTypes.UPDATE_RETAILER_LOCATION_LOADING_STOP]: updateRetailerLocationLoadingStop,
  [RetailersTypes.UPDATE_RETAILER_LOCATION_SUCCESS]: updateRetailerLocationSuccess,
  [RetailersTypes.UPDATE_RETAILER_LOCATION_FAILURE]: updateRetailerLocationFailure,

  [RetailersTypes.OPEN_MORE_FILTERS_OPTION]: openMoreFilters,
  [RetailersTypes.CLOSE_MORE_FILTERS_OPTION]: closeMoreFilters,

  [RetailersTypes.FETCH_RETAILERS_LOADING]: fetchRetailersLoading,
  [RetailersTypes.FETCH_RETAILERS_SUCCESS]: fetchRetailersSuccess,
  [RetailersTypes.FETCH_RETAILERS_FAILURE]: fetchRetailersFailure,

  [RetailersTypes.DELETE_ORDER_LINE_LOADING]: deleteOrderLineLoading,
  [RetailersTypes.DELETE_ORDER_LINE_SUCCESS]: deleteOrderLineSuccess,
  [RetailersTypes.DELETE_ORDER_LINE_FAILURE]: deleteOrderLineFailure,

  [RetailersTypes.EDIT_ORDER_QUANTITY_LOADING]: editOrderQuantityLoading,
  [RetailersTypes.EDIT_ORDER_QUANTITY_SUCCESS]: editOrderQuantitySuccess,
  [RetailersTypes.EDIT_ORDER_QUANTITY_FAILURE]: editOrderQuantityFailure,

  [RetailersTypes.ADD_ORDER_LINE_LOADING]: addOrderLineLoading,
  [RetailersTypes.ADD_ORDER_LINE_SUCCESS]: addOrderLineSuccess,
  [RetailersTypes.ADD_ORDER_LINE_FAILURE]: addOrderLineFailure,

  [RetailersTypes.SET_ADD_ORDER_LINE_DATA]: setAddOrderLineData,
  [RetailersTypes.CLEAR_ADD_ORDER_LINE_DATA]: clearAddOrderLineData,

  //fetchDealerOrders: ['payload'],
  [RetailersTypes.FETCH_DEALER_ORDERS_LOADING]: fetchDealerOrdersLoading,
  [RetailersTypes.FETCH_DEALER_ORDERS_SUCCESS]: fetchDealerOrdersSuccess,
  [RetailersTypes.FETCH_DEALER_ORDERS_FAILURE]: fetchDealerOrdersFailure,

  //fetchDealerInvoice: ['payload'],
  [RetailersTypes.FETCH_DEALER_INVOICE_LOADING]: fetchDealerInvoiceLoading,
  [RetailersTypes.FETCH_DEALER_INVOICE_SUCCESS]: fetchDealerInvoiceSuccess,
  [RetailersTypes.FETCH_DEALER_INVOICE_FAILURE]: fetchDealerInvoiceFailure,

  // fetchDealerOutstanding: ['payload'],
  [RetailersTypes.FETCH_DEALER_OUTSTANDING_LOADING]: fetchDealerOutstandingLoading,
  [RetailersTypes.FETCH_DEALER_OUTSTANDING_SUCCESS]: fetchDealerOutstandingSuccess,
  [RetailersTypes.FETCH_DEALER_OUTSTANDING_FAILURE]: fetchDealerOutstandingFailure,

  [RetailersTypes.FETCH_DEALER_PAYMENTS_LOADING]: fetchDealerPaymentsLoading,
  [RetailersTypes.FETCH_DEALER_PAYMENTS_SUCCESS]: fetchDealerPaymentsSuccess,
  [RetailersTypes.FETCH_DEALER_PAYMENTS_FAILURE]: fetchDealerPaymentsFailure,

  [RetailersTypes.FETCH_DEALERS_LOADING]: fetchDealersLoading,
  [RetailersTypes.FETCH_DEALERS_SUCCESS]: fetchDealersSuccess,
  [RetailersTypes.FETCH_DEALERS_FAILURE]: fetchDealersFailure,

  [RetailersTypes.FETCH_RETAILER_ORDERS_LOADING]: fetchRetailerOrdersLoading,
  [RetailersTypes.FETCH_RETAILER_ORDERS_SUCCESS]: fetchRetailerOrdersSuccess,
  [RetailersTypes.FETCH_RETAILER_ORDERS_FAILURE]: fetchRetailerOrdersFailure,

  [RetailersTypes.FETCH_RETAILER_COMPETITORS_LOADING]: fetchRetailerCompetitorsLoading,
  [RetailersTypes.FETCH_RETAILER_COMPETITORS_SUCCESS]: fetchRetailerCompetitorsSuccess,
  [RetailersTypes.FETCH_RETAILER_COMPETITORS_FAILURE]: fetchRetailerCompetitorsFailure,

  [RetailersTypes.UPDATE_SEARCH_FILTERS]: updateSearchFilters,

  [RetailersTypes.MAKE_DEALER_SEARCH_LIST]: makeDealerSearchList,
  [RetailersTypes.MAKE_RETAILER_SEARCH_LIST]: makeRetailerSearchList,
  [RetailersTypes.MAKE_RETAILER_BEAT_SEARCH_LIST]: makeRetailerBeatSearchList,

  [RetailersTypes.EXTRACT_FORM_DATA]: extractFormData,
  [RetailersTypes.EXTRACT_FORM_DATA_UPDATE]: extractFormDataUpdate,

  [RetailersTypes.DO_NOTHING]: doNothing,

  [RetailersTypes.SELECT_RETAILER]: selectRetailer,
  [RetailersTypes.SELECT_RETAILER_SUCCESS]: selectRetailerSuccess,
  [RetailersTypes.CLEAR_SELECT_RETAILER]: clearSelectRetailer,
  [RetailersTypes.CLEAR_RETAILER_FORM]: clearRetailerForm,

  //fetchInvoiceDetail: ['payload'],
  [RetailersTypes.FETCH_INVOICE_DETAIL_SUCCESS]: fetchInvoiceDetailSuccess,
  [RetailersTypes.FETCH_INVOICE_DETAIL_LOADING]: fetchInvoiceDetailLoading,
  [RetailersTypes.FETCH_INVOICE_DETAIL_FAILURE]: fetchInvoiceDetailFailure,

  [RetailersTypes.FETCH_RETAILER_DEALER_SEARCH_BY_LOCATION_LOADING]: fetchRetailerDealerSearchByLocationLoading,
  [RetailersTypes.FETCH_RETAILER_DEALER_SEARCH_BY_LOCATION_LOADING_STOP]: fetchRetailerDealerSearchByLocationLoadingStop,
  [RetailersTypes.FETCH_RETAILER_DEALER_SEARCH_BY_LOCATION_SUCCESS]: fetchRetailerDealerSearchByLocationSuccess,
  [RetailersTypes.FETCH_RETAILER_DEALER_SEARCH_BY_LOCATION_FAILURE]: fetchRetailerDealerSearchByLocationFailure,

  [RetailersTypes.EDIT_PAYMENTS_FORM]: editPaymentsForm,

  [RetailersTypes.CLEAR_PAYMENTS_FORM]: clearPaymentsForm,
  [RetailersTypes.SUBMIT_PAYMENTS_FORM_SUCCESS]: submitPaymentsFormSuccess,
  [RetailersTypes.SUBMIT_PAYMENTS_FORM_FAILURE]: submitPaymentsFormFailure,
  [RetailersTypes.SUBMIT_PAYMENTS_FORM_LOADING]: submitPaymentsFormLoading,
  [RetailersTypes.SUBMIT_PAYMENTS_FORM_LOADING_STOP]: submitPaymentsFormLoadingStop,

  [RetailersTypes.FETCH_COMPLAINT_TYPE_LOADING]: fetchComplaintTypeLoading,
  [RetailersTypes.FETCH_COMPLAINT_TYPE_SUCCESS]: fetchComplaintTypeSuccess,
  [RetailersTypes.FETCH_COMPLAINT_TYPE_FAILURE]: fetchComplaintTypeFailure,

  [RetailersTypes.FETCH_COMPLAINTS_LOADING]: fetchComplaintsLoading,
  [RetailersTypes.FETCH_COMPLAINTS_SUCCESS]: fetchComplaintsSuccess,
  [RetailersTypes.FETCH_COMPLAINTS_FAILURE]: fetchComplaintsFailure,

  [RetailersTypes.CHANGE_UPDATE_RETAILER_FORM]: changeUpdateRetailerForm,

  [RetailersTypes.CREATE_COMPETITOR_SUCCESS]: createCompetitorSuccess,
  [RetailersTypes.CREATE_COMPETITOR_FAILURE]: createCompetitorFailure,
  [RetailersTypes.CREATE_COMPETITOR_LOADING]: createCompetitorLoading,
  [RetailersTypes.CREATE_COMPETITOR_LOADING_STOP]: createCompetitorLoadingStop,
  [RetailersTypes.EDIT_NEW_COMPETITOR_FORM]: editNewCompetitorForm,
  [RetailersTypes.CLEAR_NEW_COMPETITOR_FORM]: clearNewCompetitorForm,

  [RetailersTypes.FETCH_DSR_LOADING]: fetchDsrLoading,
  [RetailersTypes.FETCH_DSR_SUCCESS]: fetchDsrSuccess,
  [RetailersTypes.FETCH_DSR_FAILURE]: fetchDsrFailure,

  [RetailersTypes.FETCH_DSR_AREA_LOADING]: fetchDsrAreaLoading,
  [RetailersTypes.FETCH_DSR_AREA_SUCCESS]: fetchDsrAreaSuccess,
  [RetailersTypes.FETCH_DSR_AREA_FAILURE]: fetchDsrAreaFailure,

  [RetailersTypes.FETCH_CREDIT_LIMIT_LOADING]: fetchCreditLimitLoading,
  [RetailersTypes.FETCH_CREDIT_LIMIT_SUCCESS]: fetchCreditLimitSuccess,
  [RetailersTypes.FETCH_CREDIT_LIMIT_FAILURE]: fetchCreditLimitFailure,

  [RetailersTypes.FETCH_DSR_AREA_LIST_LOADING]: fetchDsrAreaListLoading,
  [RetailersTypes.FETCH_DSR_AREA_LIST_SUCCESS]: fetchDsrAreaListSuccess,
  [RetailersTypes.FETCH_DSR_AREA_LIST_FAILURE]: fetchDsrAreaListFailure,

  [RetailersTypes.CREATE_DSR_LOADING]: createDsrLoading,
  [RetailersTypes.CREATE_DSR_LOADING_STOP]: createDsrLoadingStop,
  [RetailersTypes.CREATE_DSR_SUCCESS]: createDsrSuccess,
  [RetailersTypes.CREATE_DSR_FAILURE]: createDsrFailure,

  [RetailersTypes.CHANGE_DSR_FORM]: changeDsrForm,
  [RetailersTypes.DSR_FORM_VALIDATION_FAILED]: dsrFormValidationFailed,

  [RetailersTypes.CREATE_DSR_AREA_LOADING]: createDsrAreaLoading,
  [RetailersTypes.CREATE_DSR_AREA_LOADING_STOP]: createDsrAreaLoadingStop,
  [RetailersTypes.CREATE_DSR_AREA_SUCCESS]: createDsrAreaSuccess,
  [RetailersTypes.CREATE_DSR_AREA_FAILURE]: createDsrAreaFailure,

  [RetailersTypes.CHANGE_DSR_AREA_FORM]: changeDsrAreaForm,
  [RetailersTypes.CLEAR_DSR_AREA_FORM]: clearDsrAreaForm,

  [RetailersTypes.GET_CUSTOMER_INFO_LOADING]: getCustomerInfoLoading,
  [RetailersTypes.GET_CUSTOMER_INFO_LOADING_STOP]: getCustomerInfoLoadingStop,
  [RetailersTypes.GET_CUSTOMER_INFO_SUCCESS]: getCustomerInfoSuccess,
  [RetailersTypes.GET_CUSTOMER_INFO_FAILURE]: getCustomerInfoFailure,

  [RetailersTypes.GET_CUSTOMER_VISIT_LOADING]: getCustomerVisitLoading,
  [RetailersTypes.GET_CUSTOMER_VISIT_LOADING_STOP]: getCustomerVisitLoadingStop,
  [RetailersTypes.GET_CUSTOMER_VISIT_SUCCESS]: getCustomerVisitSuccess,
  [RetailersTypes.GET_CUSTOMER_VISIT_FAILURE]: getCustomerVisitFailure,

  [RetailersTypes.GET_CUSTOMER_INVOICE_LOADING]: getCustomerInvoiceLoading,
  [RetailersTypes.GET_CUSTOMER_INVOICE_LOADING_STOP]: getCustomerInvoiceLoadingStop,
  [RetailersTypes.GET_CUSTOMER_INVOICE_SUCCESS]: getCustomerInvoiceSuccess,
  [RetailersTypes.GET_CUSTOMER_INVOICE_FAILURE]: getCustomerInvoiceFailure,

  [RetailersTypes.GET_CUSTOMER_COMPLAINT_LOADING]: getCustomerComplaintLoading,
  [RetailersTypes.GET_CUSTOMER_COMPLAINT_LOADING_STOP]: getCustomerComplaintLoadingStop,
  [RetailersTypes.GET_CUSTOMER_COMPLAINT_SUCCESS]: getCustomerComplaintSuccess,
  [RetailersTypes.GET_CUSTOMER_COMPLAINT_FAILURE]: getCustomerComplaintFailure,

  [RetailersTypes.CHANGE_COMPLAINT_FORM]: changeComplaintForm,

  [RetailersTypes.COMPLAINT_FORM_SUCCESS]: complaintFormSuccess,
  [RetailersTypes.COMPLAINT_FORM_FAILURE]: complaintFormFailure,
  [RetailersTypes.COMPLAINT_FORM_LOADING]: complaintFormLoading,
  [RetailersTypes.COMPLAINT_FORM_LOADING_STOP]: complaintFormLoadingStop,

  [RetailersTypes.GET_NATURE_CODE_SUCCESS]: getNatureCodeSuccess,
  [RetailersTypes.GET_NATURE_CODE_FAILURE]: getNatureCodeFailure,
  [RetailersTypes.GET_NATURE_CODE_LOADING]: getNatureCodeLoading,
  [RetailersTypes.GET_NATURE_CODE_LOADING_STOP]: getNatureCodeLoadingStop,
  [RetailersTypes.GET_CUSTOMER_INVOICE_LINES_LOADING]: getCustomerInvoiceLinesLoading,
  [RetailersTypes.GET_CUSTOMER_INVOICE_LINES_LOADING_STOP]: getCustomerInvoiceLinesLoadingStop,
  [RetailersTypes.GET_CUSTOMER_INVOICE_LINES_SUCCESS]: getCustomerInvoiceLinesSuccess,
  [RetailersTypes.GET_CUSTOMER_INVOICE_LINES_FAILURE]: getCustomerInvoiceLinesFailure,

  [RetailersTypes.GET_ALL_LOCATION_LOADING]: getAllLocationLoading,
  [RetailersTypes.GET_ALL_LOCATION_LOADING_STOP]: getAllLocationLoadingStop,
  [RetailersTypes.GET_ALL_LOCATION_SUCCESS]: getAllLocationSuccess,
  [RetailersTypes.GET_ALL_LOCATION_FAILURE]: getAllLocationFailure,

  [RetailersTypes.CHANGE_ADDRESS_FORM]: changeAddressForm,

  [RetailersTypes.SUBMIT_ADDRESS_FORM_SUCCESS]: submitAddressFormSuccess,
  [RetailersTypes.SUBMIT_ADDRESS_FORM_FAILURE]: submitAddressFormFailure,
  [RetailersTypes.SUBMIT_ADDRESS_FORM_LOADING]: submitAddressFormLoading,
  [RetailersTypes.SUBMIT_ADDRESS_FORM_LOADING_STOP]: submitAddressFormLoadingStop,
  [RetailersTypes.GET_CUSTOMER_ADDRESS_LOADING]: getCustomerAddressLoading,
  [RetailersTypes.GET_CUSTOMER_ADDRESS_LOADING_STOP]: getCustomerAddressLoadingStop,
  [RetailersTypes.GET_CUSTOMER_ADDRESS_SUCCESS]: getCustomerAddressSuccess,
  [RetailersTypes.GET_CUSTOMER_ADDRESS_FAILURE]: getCustomerAddressFailure,

  [RetailersTypes.CHANGE_CONTACT_FORM]: changeContactForm,

  [RetailersTypes.CREATE_CONTACT_FORM_SUCCESS]: createContactFormSuccess,
  [RetailersTypes.CREATE_CONTACT_FORM_FAILURE]: createContactFormFailure,
  [RetailersTypes.CREATE_CONTACT_FORM_LOADING]: createContactFormLoading,
  [RetailersTypes.CREATE_CONTACT_FORM_LOADING_STOP]: createContactFormLoadingStop,

  [RetailersTypes.CONTACT_FORM_VALIDATION_FAILED]: contactFormValidationFailed,
  [RetailersTypes.ADDRESS_FORM_VALIDATION_FAILED]: addressFormValidationFailed,

  [RetailersTypes.SELECT_COMPLAINT]: selectComplaint,
  [RetailersTypes.SELECT_COMPLAINT_SUCCESS]: selectComplaintSuccess,

  [RetailersTypes.ON_EDIT_INFO]: onEditInfo,
  [RetailersTypes.ON_EDIT_INFO_SUCCESS]: onEditInfoSuccess,

  [RetailersTypes.GET_CONTACT_LOADING]: getContactLoading,
  [RetailersTypes.GET_CONTACT_LOADING_STOP]: getContactLoadingStop,
  [RetailersTypes.GET_CONTACT_SUCCESS]: getContactSuccess,
  [RetailersTypes.GET_CONTACT_FAILURE]: getContactFailure,

  [RetailersTypes.SEARCH_COMPLAINT]: searchComplaint,

  [RetailersTypes.CHANGE_SEARCH_FILTERS]: changeSearchFilters,

  [RetailersTypes.GET_PINCODE_INFO_LOADING]: getPincodeInfoLoading,
  [RetailersTypes.GET_PINCODE_INFO_LOADING_STOP]: getPincodeInfoLoadingStop,
  [RetailersTypes.GET_PINCODE_INFO_SUCCESS]: getPincodeInfoSuccess,
  [RetailersTypes.GET_PINCODE_INFO_FAILURE]: getPincodeInfoFailure,

  [RetailersTypes.GET_AREA_INFO_LOADING]: getAreaInfoLoading,
  [RetailersTypes.GET_AREA_INFO_LOADING_STOP]: getAreaInfoLoadingStop,
  [RetailersTypes.GET_AREA_INFO_SUCCESS]: getAreaInfoSuccess,
  [RetailersTypes.GET_AREA_INFO_FAILURE]: getAreaInfoFailure,

  [RetailersTypes.SELECT_CONTACT_FORM]: selectContactForm,
  [RetailersTypes.SELECT_CONTACT_FORM_SUCCESS]: selectContactFormSuccess,

  [RetailersTypes.SELECT_CONTACT]: selectContact,
  [RetailersTypes.SELECT_CONTACT_SUCCESS]: selectContactSuccess,

  [RetailersTypes.UPDATE_CONTACT_LOADING]: updateContactLoading,
  [RetailersTypes.UPDATE_CONTACT_LOADING_STOP]: updateContactLoadingStop,
  [RetailersTypes.UPDATE_CONTACT_SUCCESS]: updateContactSuccess,
  [RetailersTypes.UPDATE_CONTACT_FAILURE]: updateContactFailure,

  [RetailersTypes.CHANGE_INVOICE_SEARCH_FILTERS]: changeInvoiceSearchFilters,

  [RetailersTypes.CAPTURE_CUSTOMER_LOCATION_SUCCESS]: captureCustomerLocationSuccess,
  [RetailersTypes.CAPTURE_CUSTOMER_LOCATION_LOADING]: captureCustomerLocationLoading,
  [RetailersTypes.CAPTURE_CUSTOMER_LOCATION_LOADING_STOP]: captureCustomerLocationLoadingStop,
  [RetailersTypes.CAPTURE_CUSTOMER_LOCATION_FAILURE]: captureCustomerLocationFailure,

  [RetailersTypes.GET_PAYMENT_LOADING]: getPaymentLoading,
  [RetailersTypes.GET_PAYMENT_LOADING_STOP]: getPaymentLoadingStop,
  [RetailersTypes.GET_PAYMENT_SUCCESS]: getPaymentSuccess,
  [RetailersTypes.GET_PAYMENT_FAILURE]: getPaymentFailure,

  [RetailersTypes.CHANGE_PAYMENT_FORM]: changePaymentForm,

  [RetailersTypes.UPDATE_PAYMENT_LOADING]: updatePaymentLoading,
  [RetailersTypes.UPDATE_PAYMENT_LOADING_STOP]: updatePaymentLoadingStop,
  [RetailersTypes.UPDATE_PAYMENT_SUCCESS]: updatePaymentSuccess,
  [RetailersTypes.UPDATE_PAYMENT_FAILURE]: updatePaymentFailure,

  [RetailersTypes.CREATE_PAYMENT_FORM_SUCCESS]: createPaymentFormSuccess,
  [RetailersTypes.CREATE_PAYMENT_FORM_FAILURE]: createPaymentFormFailure,
  [RetailersTypes.CREATE_PAYMENT_FORM_LOADING]: createPaymentFormLoading,
  [RetailersTypes.CREATE_PAYMENT_FORM_LOADING_STOP]: createPaymentFormLoadingStop,
  [RetailersTypes.CHANGE_UPDATE_PAYMENT_FORM]: changeUpdatePaymentForm,
  [RetailersTypes.SHOW_MODAL]: showModal,
  [RetailersTypes.CLOSE_MODAL]: closeModal,

  [RetailersTypes.SHOW_MODAL_HOLD]: showModalHold,
  [RetailersTypes.CLOSE_MODAL_HOLD]: closeModalHold,

  [RetailersTypes.SHOW_MODAL_PPF]: showModalPpf,
  [RetailersTypes.CLOSE_MODAL_PPF]: closeModalPpf,
  [RetailersTypes.ACCOUNT_STATUS_SUCCESS]: accountStatusSuccess,
  [RetailersTypes.ACCOUNT_STATUS_LOADING]: accountStatusLoading,
  [RetailersTypes.ACCOUNT_STATUS_LOADING_STOP]: accountStatusLoadingStop,
  [RetailersTypes.ACCOUNT_STATUS_FAILURE]: accountStatusFailure,

  [RetailersTypes.CUSTOMER_STATUS_SUCCESS]: customerStatusSuccess,
  [RetailersTypes.CUSTOMER_STATUS_LOADING]: customerStatusLoading,
  [RetailersTypes.CUSTOMER_STATUS_LOADING_STOP]: customerStatusLoadingStop,
  [RetailersTypes.CUSTOMER_STATUS_FAILURE]: customerStatusFailure,

  [RetailersTypes.CUSTOMER_PFF_AUTOMATION_SUCCESS]: customerPffAutomationSuccess,
  [RetailersTypes.CUSTOMER_PFF_AUTOMATION_LOADING]: customerPffAutomationLoading,
  [RetailersTypes.CUSTOMER_PFF_AUTOMATION_LOADING_STOP]: customerPffAutomationLoadingStop,
  [RetailersTypes.CUSTOMER_PFF_AUTOMATION_FAILURE]: customerPffAutomationFailure,
  [RetailersTypes.CHANGE_ACCOUNT_STATUS]: changeAccountStatus,
  [RetailersTypes.CHANGE_PFF_AUTOMATION]: changePffAutomation,
  [RetailersTypes.CHANGE_HOLD_ACTIVE]: changeHoldActive,

  [RetailersTypes.GET_LANGUAGE_LOADING]: getLanguageLoading,
  [RetailersTypes.GET_LANGUAGE_LOADING_STOP]: getLanguageLoadingStop,
  [RetailersTypes.GET_LANGUAGE_SUCCESS]: getLanguageSuccess,
  [RetailersTypes.GET_LANGUAGE_FAILURE]: getLanguageFailure,
});
