import { HelperService } from "App/Services/Utils/HelperService";
export const INITIAL_STATE = {
  fetchOrderDetailsLoader: false,
  allOrdersDetailsMapping: {}, //id mapping for order details
  allOrders: [],
  fetchAllOrdersLoader: false,
  selectedOrder: {},
  ordersLimit: 1000,
  ordersOffset: 0,
  repeatOrderLoader: false,
  showModal: true,

  searchFilters: {
    type: "",
    name: "",
    class: "",
    searchvalue: "",
    goodTransport: "",
    searchBy: "zx_productname",

    searchByOptions: [
      {
        label: "Name",
        value: "zx_productname",
      },
      {
        label: "Code",
        value: "zx_productcode",
      },
    ],
  },
  shipDetail: {},
  selectedTransport: {},
  showModals: true,
  getTransport: [],
  getTransportLoader: false,

  primaryOrderForm: {},
  submitPrimaryOrderLoader: false,

  variableDiscount: [],
  getVariableDiscountLoader: false,

  placeOrderForm: {
    location: "",
    account:"",
    qty: "",
    id: "",
    uom: "",
    upp: "",
    total_qty: "",
    total_price: "",
    discount: "",
    toogle: false,
    transportname: "",
    transportmobile: "",
    transportphone: "",
    transportcode: "",
    transportid: "",
    transportcontactperson: "",
  },

  placeOrderFormNew: {
    location: "",
    account:"",
    qty: "",
    id: "",
    uom: "",
    upp: "",
    total_qty: "",
    total_price: "",
    discount: "",
    toogle: false,
    transportname: "",
    transportmobile: "",
    transportphone: "",
    transportcode: "",
    transportid: "",
    transportcontactperson: "",
  },

  orderLocation: [],
  orderLocationLoader: false,

  retailerItems: {},

  orderValidation: {
    invalid: false,
    invalid_field: "",
  },

  orderSearchFilters: {
    name: "",
    class: "",
  },

  headerValue: {
    totalDiscount: "",
    totalqty: "",
    ordervalue: "",
    ordervaluexd: "",
    bags: "",
  },
  orderLine: [],
  orderLineLoader: false,

  searchSecondaryFilters: {
    type: "",
    name: "",
    class: "",
    searchvalue: "",
    searchBy: "zx_productname",

    searchByOptions: [
      {
        label: "Name",
        value: "zx_productname",
      },
      {
        label: "Code",
        value: "zx_productcode",
      },
    ],
  },

  secondaryOrderForm: {},
  submitSecondaryOrderLoader: false,
  placeSecondaryOrderForm: {
    location: "",
    qty: "",
    id: "",
    uom: "",
    upp: "",
    total_qty: "",
    total_price: "",
    discount: "",
    toogle: false,
  },
  secondaryOrders: [],
  fetchSecondaryOrdersLoader: false,

  secondaryOrderValidation: {
    invalid: false,
    invalid_field: "",
  },

  headerSecondaryValue: {
    totalDiscount: "",
    totalqty: "",
    ordervalue: "",
    ordervaluexd: "",
    bags: "",
  },

  regularOrders: [],
  fetchRegularOrdersLoader: false,

  showtransportmodal: false,

  getParty: [],
  getPartyLoader: false,

  recordId: {},
  count: {},
  orderCount: {},
  orderCountLoader: false,
  countLoader: false,
  goodReturn: [],
  goodReturnLoader: false,
  goodReturnFilters: {
    type: "",
    name: "",
    class: "",
    startDate: null,
    endDate: null,
    selectedDateType: "Date", //or Month,
    selectedMonth: new Date(HelperService.getCurrentTimestamp()).getMonth(),
    searchvalue: "",
    searchBy: "zx_productname",
    brand: "",
    location: "",
    searchByOptions: [
      {
        label: "Name",
        value: "zx_productname",
      },
      {
        label: "Code",
        value: "zx_productcode",
      },
    ],
  },
  showGoodModal: true,
  primaryGoodForm: {},
  placeGoodForm: {
    location: "",
    qty: "",
    id: "",
    total_qty: "",
  },
  recordGoodId: {},
  cart: {
    cartItem: [],
  },

  primaryGoodReturnForm: {},
  primaryGoodReturnFormLoader: false,

  showReturnModal: true,
  secondaryGoodForm: {},
  placeReturnForm: {
    location: "",
    qty: "",
    id: "",
    total_qty: "",
  },
  cartReturn: {
    cartItemReturn: [],
  },

  secondaryGood: [],
  secondaryGoodLoader: false,
  returnFilters: {
    type: "",
    name: "",
    class: "",
    searchvalue: "",
    startDate: null,
    endDate: null,
    selectedDateType: "Date", //or Month,
    selectedMonth: new Date(HelperService.getCurrentTimestamp()).getMonth(),
    searchBy: "zx_productname",
    brand: "",
    location: "",
    searchByOptions: [
      {
        label: "Name",
        value: "zx_productname",
      },
      {
        label: "Code",
        value: "zx_productcode",
      },
    ],
  },
  secondaryGoodReturnForm: {},
  secondaryGoodReturnFormLoader: false,
};
