import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  fetchRetailers: ["payload"],
  fetchRetailersLoading: null,
  fetchRetailersSuccess: ["payload"],
  fetchRetailersFailure: null,

  fetchCreditLimit: ["payload"],
  fetchCreditLimitLoading: null,
  fetchCreditLimitSuccess: ["payload"],
  fetchCreditLimitFailure: null,

  fetchDealers: ["payload"],
  fetchDealersLoading: null,
  fetchDealersSuccess: ["payload"],
  fetchDealersFailure: null,

  updateSearchFilters: ["payload"],

  createRetailer: ["payload"],
  createRetailerLoading: null,
  createRetailerSuccess: ["payload"],
  createRetailerFailure: null,
  createRetailerLoadingStop: null,

  createComplaint: ["payload"],
  createComplaintLoading: null,
  createComplaintSuccess: ["payload"],
  createComplaintFailure: null,
  createComplaintLoadingStop: null,

  updateRetailer: ["payload"],
  updateRetailerLoading: null,
  updateRetailerSuccess: ["payload"],
  updateRetailerFailure: null,
  updateRetailerLoadingStop: null,
  extractFormDataUpdate: ["payload"],

  fetchComplaintType: ["payload"],
  fetchComplaintTypeLoading: [null],
  fetchComplaintTypeSuccess: ["payload"],
  fetchComplaintTypeFailure: [null],

  fetchComplaints: ["payload"],
  fetchComplaintsLoading: [null],
  fetchComplaintsSuccess: ["payload"],
  fetchComplaintsFailure: [null],

  changeRetailerForm: ["payload"],
  retailerFormValidationFailed: ["payload"],
  changeUpdateRetailerForm: ["payload"],

  fetchRetailerOrders: ["payload"],
  fetchRetailerOrdersLoading: null,
  fetchRetailerOrdersSuccess: ["payload"],
  fetchRetailerOrdersFailure: null,

  fetchDealerOrders: ["payload"],
  fetchDealerOrdersLoading: null,
  fetchDealerOrdersSuccess: ["payload"],
  fetchDealerOrdersFailure: null,

  fetchDealerInvoice: ["payload"],
  fetchDealerInvoiceLoading: null,
  fetchDealerInvoiceSuccess: ["payload"],
  fetchDealerInvoiceFailure: null,

  fetchDealerOutstanding: ["payload"],
  fetchDealerOutstandingLoading: null,
  fetchDealerOutstandingSuccess: ["payload"],
  fetchDealerOutstandingFailure: null,

  fetchDealerPayments: ["payload"],
  fetchDealerPaymentsLoading: null,
  fetchDealerPaymentsSuccess: ["payload"],
  fetchDealerPaymentsFailure: null,

  fetchRetailerCompetitors: ["payload"],
  fetchRetailerCompetitorsLoading: null,
  fetchRetailerCompetitorsSuccess: ["payload"],
  fetchRetailerCompetitorsFailure: null,

  updateRetailerLocation: ["payload"],
  updateRetailerLocationLoading: null,
  updateRetailerLocationLoadingStop: null,
  updateRetailerLocationSuccess: ["payload"],
  updateRetailerLocationFailure: null,

  openMoreFiltersOption: null,
  closeMoreFiltersOption: null,

  makeDealerSearchList: ["payload"],
  makeRetailerSearchList: ["payload"],
  makeRetailerBeatSearchList: ["payload"],

  extractFormData: ["payload"],

  extractRetailerInfoData: ["payload"],
  selectRetailer: ["payload"],
  selectRetailerSuccess: ["payload"],
  selectDealer: ["payload"],
  doNothing: null,
  clearSelectRetailer: null,
  clearRetailerForm: null,

  fetchRetailerDealerSearchByLocation: ["payload"],
  fetchRetailerDealerSearchByLocationLoading: null,
  fetchRetailerDealerSearchByLocationLoadingStop: null,
  fetchRetailerDealerSearchByLocationSuccess: ["payload"],
  fetchRetailerDealerSearchByLocationFailure: null,

  fetchInvoiceDetail: ["payload"],
  fetchInvoiceDetailSuccess: ["payload"],
  fetchInvoiceDetailLoading: null,
  fetchInvoiceDetailFailure: null,

  editPaymentsForm: ["payload"],
  submitPaymentsForm: ["payload"],
  clearPaymentsForm: ["payload"],
  submitPaymentsFormSuccess: ["payload"],
  submitPaymentsFormFailure: null,
  submitPaymentsFormLoading: null,
  submitPaymentsFormLoadingStop: null,

  createCompetitor: ["payload"],
  createCompetitorSuccess: ["payload"],
  createCompetitorFailure: null,
  createCompetitorLoading: null,
  createCompetitorLoadingStop: null,
  editNewCompetitorForm: ["payload"],
  clearNewCompetitorForm: null,

  fetchDsr: ["payload"],
  fetchDsrLoading: null,
  fetchDsrSuccess: ["payload"],
  fetchDsrFailure: null,

  fetchDsrArea: ["payload"],
  fetchDsrAreaLoading: null,
  fetchDsrAreaSuccess: ["payload"],
  fetchDsrAreaFailure: null,

  fetchDsrAreaList: ["payload"],
  fetchDsrAreaListLoading: null,
  fetchDsrAreaListSuccess: ["payload"],
  fetchDsrAreaListFailure: null,

  createDsr: ["payload"],
  createDsrLoading: null,
  createDsrSuccess: ["payload"],
  createDsrFailure: null,
  createDsrLoadingStop: null,

  changeDsrForm: ["payload"],
  dsrFormValidationFailed: ["payload"],

  createDsrArea: ["payload"],
  createDsrAreaLoading: null,
  createDsrAreaSuccess: ["payload"],
  createDsrAreaFailure: null,
  createDsrAreaLoadingStop: null,

  changeDsrAreaForm: ["payload"],
  clearDsrAreaForm: null,

  updateOrderSearchFilters: ["payload"],

  deleteOrderLine: ["payload"],
  deleteOrderLineLoading: ["payload"],
  deleteOrderLineSuccess: ["payload"],
  deleteOrderLineFailure: null,

  editOrderQuantity: ["payload"],
  editOrderQuantityLoading: ["payload"],
  editOrderQuantitySuccess: ["payload"],
  editOrderQuantityFailure: null,

  addOrderLine: ["payload"],
  addOrderLineLoading: null,
  addOrderLineSuccess: ["payload"],
  addOrderLineFailure: null,

  setAddOrderLineData: ["payload"],
  clearAddOrderLineData: null,

  getCustomerInfo: ["payload"],
  getCustomerInfoLoading: null,
  getCustomerInfoSuccess: ["payload"],
  getCustomerInfoFailure: null,
  getCustomerInfoLoadingStop: null,

  getCustomerVisit: ["payload"],
  getCustomerVisitLoading: null,
  getCustomerVisitSuccess: ["payload"],
  getCustomerVisitFailure: null,
  getCustomerVisitLoadingStop: null,

  getCustomerInvoice: ["payload"],
  getCustomerInvoiceLoading: null,
  getCustomerInvoiceSuccess: ["payload"],
  getCustomerInvoiceFailure: null,
  getCustomerInvoiceLoadingStop: null,

  getCustomerComplaint: ["payload"],
  getCustomerComplaintLoading: null,
  getCustomerComplaintSuccess: ["payload"],
  getCustomerComplaintFailure: null,
  getCustomerComplaintLoadingStop: null,

  changeComplaintForm: ["payload"],

  complaintForm: ["payload"],
  complaintFormSuccess: ["payload"],
  complaintFormFailure: null,
  complaintFormLoading: null,
  complaintFormLoadingStop: null,

  getNatureCode: ["payload"],
  getNatureCodeSuccess: ["payload"],
  getNatureCodeFailure: ["payload"],
  getNatureCodeLoading: null,
  getNatureCodeLoadingStop: null,

  getCustomerInvoiceLines: ["payload"],
  getCustomerInvoiceLinesLoading: null,
  getCustomerInvoiceLinesSuccess: ["payload"],
  getCustomerInvoiceLinesFailure: null,
  getCustomerInvoiceLinesLoadingStop: null,

  getAllLocation: ["payload"],
  getAllLocationSuccess: ["payload"],
  getAllLocationFailure: ["payload"],
  getAllLocationLoading: null,
  getAllLocationLoadingStop: null,

  getCustomerAddress: ["payload"],
  getCustomerAddressLoading: null,
  getCustomerAddressSuccess: ["payload"],
  getCustomerAddressFailure: null,
  getCustomerAddressLoadingStop: null,

  changeContactForm: ["payload"],

  createContactForm: ["payload"],
  createContactFormSuccess: ["payload"],
  createContactFormFailure: null,
  createContactFormLoading: null,
  createContactFormLoadingStop: null,

  contactFormValidationFailed: ["payload"],
  addressFormValidationFailed: ["payload"],

  clearForm: null,

  changeAddressForm: ["payload"],

  submitAddressForm: ["payload"],
  submitAddressFormSuccess: ["payload"],
  submitAddressFormFailure: null,
  submitAddressFormLoading: null,
  submitAddressFormLoadingStop: null,

  selectComplaint: ["payload"],
  selectComplaintSuccess: ["payload"],

  getContact: ["payload"],
  getContactLoading: null,
  getContactSuccess: ["payload"],
  getContactFailure: null,
  getContactLoadingStop: null,

  searchComplaint: ["payload"],
  changeSearchFilters: ["payload"],

  getPincodeInfo: ["payload"],
  getPincodeInfoLoading: null,
  getPincodeInfoSuccess: ["payload"],
  getPincodeInfoFailure: null,
  getPincodeInfoLoadingStop: null,

  getAreaInfo: ["payload"],
  getAreaInfoLoading: null,
  getAreaInfoSuccess: ["payload"],
  getAreaInfoFailure: null,
  getAreaInfoLoadingStop: null,

  selectContactForm: ["payload"],
  selectContactFormSuccess: ["payload"],
  selectContact: ["payload"],
  selectContactSuccess: ["payload"],

  updateContact: ["payload"],
  updateContactLoading: null,
  updateContactSuccess: ["payload"],
  updateContactFailure: null,
  updateContactLoadingStop: null,

  changeInvoiceSearchFilters: ["payload"],

  captureCustomerLocation: ["payload"],
  captureCustomerLocationLoading: null,
  captureCustomerLocationSuccess: ["payload"],
  captureCustomerLocationFailure: null,
  captureCustomerLocationLoadingStop: null,

  getPayment: ["payload"],
  getPaymentLoading: null,
  getPaymentSuccess: ["payload"],
  getPaymentFailure: null,
  getPaymentLoadingStop: null,

  clearPayment: null,

  createPaymentForm: ["payload"],
  createPaymentFormSuccess: ["payload"],
  createPaymentFormFailure: null,
  createPaymentFormLoading: null,
  createPaymentFormLoadingStop: null,
  changePaymentForm: ["payload"],

  updatePayment: ["payload"],
  updatePaymentLoading: null,
  updatePaymentSuccess: ["payload"],
  updatePaymentFailure: null,
  updatePaymentLoadingStop: null,
  changeUpdatePaymentForm: ["payload"],
  changeAccountStatus: ["payload"],
  accountStatus: ["payload"],
  accountStatusLoading: null,
  accountStatusSuccess: ["payload"],
  accountStatusFailure: null,
  accountStatusLoadingStop: null,

  changePffAutomation: ["payload"],

  customerPffAutomation: ["payload"],
  customerPffAutomationLoading: null,
  customerPffAutomationSuccess: ["payload"],
  customerPffAutomationFailure: null,
  customerPffAutomationLoadingStop: null,

  changeHoldActive: ["payload"],

  customerStatus: ["payload"],
  customerStatusLoading: null,
  customerStatusSuccess: ["payload"],
  customerStatusFailure: null,
  customerStatusLoadingStop: null,

  showModal: null,
  closeModal: null,

  showModalHold: null,
  closeModalHold: null,

  showModalPpf: null,
  closeModalPpf: null,

  onEditInfo: ["payload"],
  onEditInfoSuccess: ["payload"],

  getLanguage: ["payload"],
  getLanguageLoading: null,
  getLanguageSuccess: ["payload"],
  getLanguageFailure: null,
  getLanguageLoadingStop: null,
});

export const RetailersTypes = Types;
export default Creators;
