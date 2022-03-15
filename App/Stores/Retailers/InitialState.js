import { HelperService } from "App/Services/Utils/HelperService";

/**
 * The initial values for the redux state.
 */
export const INITIAL_STATE = {
  retailersList: {},
  fetchRetailersLoader: false,
  fetchDealersLoader: false,

  fetchCreditLimitLoading: false,
  fetchCreditLimitList: [],

  fetchRetailerCompetitorsLoader: false,
  retailerSearchFilters: {
    area: "",
    distributor: "",
    type: "Retailer",
    sortType: "ASC",
    sortBy: "",
    searchBy: "name",
    searchValue: "",
    selectedTab: 0,
    selectedMonth: new Date(HelperService.getCurrentTimestamp()).getMonth(),

    searchByOptions: [
      {
        label: "By Name",
        value: "name",
      },
      {
        label: "By Phone No.",
        value: "telephone1",
      },
    ],
  },
  openMoreFilters: false,
  retailerForm: {},
  retailerUpdateForm: {},
  ComplaintForm: {},
  retailerFormValidation: {
    invalid: false,
    invalid_field: "",
  },
  createRetailerLoader: false,
  updateRetailerLoader: false,
  fetchRetailerOrdersLoader: false,
  retailerOrders: [], // {key: value}, key is retailer/dealer id, values is array of orders
  updateRetailerLocationLoader: false,
  selectedRetailer: {},
  selectedDealer: {},
  retailerCompetitors: [],
  retailersOffset: 0,
  retailersLimit: 1000,
  retailerOrdersOffset: 0,
  retailerOrdersLimit: 1000,
  categories: [
    {
      id: "A",
      name: "A",
    },
    {
      id: "B",
      name: "B",
    },
    {
      id: "C",
      name: "C",
    },
  ],
  dealersSearchList: [],
  retailersSearchList: [],
  retailersBeatSearchList: [],
  retailerDealerSearchByLocationList: [],
  retailerDealerSearchByLocationLoader: [],
  findNearMeLoader: false,
  fetchDealerOrdersLoader: false,
  dealerOrders: {},
  fetchDealerInvoiceLoader: false,
  dealerInvoice: {},
  fetchDealerOutstandingLoader: false,
  dealerOutstanding: {},
  deleteOrderLineLoader: false,
  fetchDealerPaymentsLoader: false,
  dealerPayments: {},
  fetchInvoiceDetailLoader: false,
  allInvoiceDetailsMapping: {}, //id mapping for order details,
  paymentForm: {},
  paymentFormLoader: false,
  paymentModes: [
    {
      id: "Digital",
      name: "Digital",
    },
    {
      id: "Cash",
      name: "Cash",
    },
    {
      id: "Cheque",
      name: "Cheque",
    },
  ],

  countMapping: {},

  agentComplaintType: [],
  fetchComplaintTypeLoading: false,
  fetchComplaintTypeFailure: false,

  agentComplaints: [],
  fetchComplaintsLoading: false,
  fetchComplaintsFailure: false,

  partiesMapping: {},
  createCompetitorLoader: false,
  newCompetitorForm: {},

  fetchDsrLoader: false,
  dsrList: [],

  fetchDsrAreaLoader: false,
  dsrAreaList: [],
  dsrArea: [],

  createDsrLoader: false,

  dsrForm: {},
  dsrFormValidation: {
    invalid: false,
    invalid_field: "",
  },

  dsrAreaForm: {},
  createDsrAreaLoader: false,

  fetchDsrAreaListLoader: false,

  OrderSearchFilters: {
    selectedDateType: "Date", //or Month,
    selectedMonth: new Date(HelperService.getCurrentTimestamp()).getMonth(),
    selectedYear: new Date(HelperService.getCurrentTimestamp()).getFullYear(),
  },

  cartQuantity: {},
  editOrderQuantityLoader: false,
  addOrderLineLoader: false,

  addOrderForm: {
    status: false,
  },

  customerInfo: {},
  getCustomerInfoLoader: false,

  customerVisit: {},
  getCustomerVisitLoader: false,

  customerInvoice: {},
  getCustomerInvoiceLoader: false,

  customerComplaint: {},
  getCustomerComplaintLoader: false,

  complaintForm: {},
  complaintFormLoader: false,
  complaintFormValidation: {
    invalid: false,
    invalid_field: "",
  },

  getNatureCode: [],
  getNatureCodeLoader: false,
  customerInvoiceLines: {},
  getCustomerInvoiceLinesLoader: false,

  getAllLocation: [],
  getAllLocationLoader: false,

  addressForm: {},
  submitAddressFormLoader: false,

  customerAddress: {},
  getCustomerAddressLoader: false,

  getContact: [],
  getContactLoader: false,

  filterComplaint: {},

  contactForm: {},
  contactFormLoader: false,

  addressValidation: {
    invalid: false,
    invalid_field: "",
  },

  formValidation: {
    invalid: false,
    invalid_field: "",
  },

  data: [
    { id: "1", name: "Technical", checked: false, parent: "1" },
    { id: "2", name: "Fitting", checked: false, parent: "2" },
    { id: "3", name: "Commercial", checked: false, parent: "1" },
    { id: "4", name: "Pipes", checked: false, parent: "2" },
  ],
  searchFilters: {
    brand: [],
  },

  pincodeInfo: {},
  getPincodeInfoLoader: false,

  areaInfo: {},
  getAreaInfoLoader: false,
  updateAddress: {},
  updateContactLoader: false,

  invoiceSearchFilters: {
    name: "",
  },
  captureLocationLoader: false,

  getPayment: {},
  getPaymentLoader: false,

  paymentForm: {},
  paymentFormLoader: false,
  paymentUpdateForm: {},
  paymentUpdateFormLoader: false,
  accountStatusLoader: false,
  accountsStatus: {},

  pffAutomationLoader: false,
  updatePff: {},

  holdActive: {},
  holdActiveLoader: false,

  showModal: false,

  showModalHold: false,

  showModalPpf: false,
  getLanguage: {},
  getLanguageLoader: false,
  record: {},
};
