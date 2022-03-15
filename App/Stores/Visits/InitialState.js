import { HelperService } from "App/Services/Utils/HelperService";
import _ from "lodash";

export const INITIAL_STATE = {
  visitsDisplayList: [],
  visitsStorageList: {},
  filteredDisplayData: [],
  visitsAction: false,
  fetchVisitsDisplayListLoader: false,
  searchFilters: {
    startDate: HelperService.getCurrentTimestamp(),
    endDate: HelperService.getCurrentTimestamp(),
    psm__c: "",
    area: "",
    name: "",
  },
  planVisit: {
    searchFilters: {
      name: "",
      area: "",
      retailer_type: "",
      CompEdit: "",
      StockEdit: "",
      beat: "",
      searchvalue: "",
      searchBy: "name",

      searchByOptions: [
        {
          label: "By Name",
          value: "name",
        },
        {
          label: "By Phone no.",
          value: "telephone1",
        },
      ],
    },
    selectedVisitDate: HelperService.getCurrentTimestamp(),
    selectedVisitPSM: "",
    selectedObjective: "",
    selectedOtherObjective: "",
    startDate: 0,

    selectedPlannedVisits: [],
    submitPlannedVisitsLoader: false,
  },

  unplannedVisit: {
    findNearMeLoader: false,
    nearLocation: {
      latitude: "",
      longitude: "",
    },
    searchByAreaFilters: {
      area: "",
      name: "",
      party_type: "",
      searchvalue: "",
      searchBy: "name",

      searchByOptions: [
        {
          label: "By Name",
          value: "name",
        },
        {
          label: "By Phone no.",
          value: "telephone1",
        },
      ],
    },
  },
  editVisit: {
    formData: {
      reason: "",
      cancelRemarks: "",
      visitDate: null,
      psm: "",
      summary: "",
    },
    cancelVisitLoader: false,
    editVisitLoader: false,
    editVisitValidation: {
      invalid: false,
      invalid_field: "",
    },
  },
  executeVisitData: {},
  placeOrderLoader: false,
  cart: {
    order: {
      from__c: "",
      order_date__c: null, //is set while placing order
      total_payable_amount__c: "", //is set wen in cart
      //"promoted_product_count__c": "0",
      //"retailer__c": "", //is set while placing order
      //"total_product_sku__c": "0",
      //"unique_product_count__c": ""//changes dynamically
    },
    items: [],
  },
  // visitInfoForm: {
  //   // "market_material_required__c": false,
  // },

  visitInfoFormMultiple: [
    {
      id: 1,
      visibility_level__c: "",
      top_visible_brand__c: "",
      pricing_and_scheme_info__c: "",
      picture__c: "",
      send_marketing_material__c: "No",
      summary__c: "",
    },
  ],
  visitInfoFormValidation: {
    invalid: false,
    invalid_field: "",
    error_message: "",
  },

  AddCompetitorForm: [
    {
      id: _.uniqueId(),
      competitors__c: "",
      competitor_product__c: "",
      price__c: "",
      potential_off_take__c: "",
      // "payment_term__c": "",
      quantity__c: "",
      // "competitor_name__c":"",
    },
  ],

  CompetitorSubmitLoader: false,

  CompetitorFormValidation: {
    invalid: false,
    invalid_field: "",
  },

  AddStockForm: [
    {
      id: _.uniqueId(),
      competitor: null,
      retailerdrivingfactor: null,
    },
  ],

  AddBrandForm: [
    {
      id: _.uniqueId(),
      brand: null,
      zx_percent: null,
      zx_valuepa: null,
      parent: null,
    },
  ],

  AddCompForm: [
    {
      id: _.uniqueId(),
      competitor: null,
      zx_percent: null,
      zx_valuepa: null,
      zx_distributorname: null,
    },
  ],

  SelectBrandForm: [
    {
      id: _.uniqueId(),
      brand: null,
      zx_percent: null,
      zx_value: null,
    },
  ],

  StockSubmitLoader: false,

  StockFormValidation: {
    invalid: false,
    invalid_field: "",
  },
  addVisitInfoLoader: false,
  visibilityLevelList: [
    { value: "", label: "None" },
    { value: "Good", label: "Good" },
    { value: "Bad", label: "Bad" },
  ],
  startVisitLoadingId: "",
  endVisitLoadingId: "",
  startVisitLoader: false,
  endVisitLoader: false,
  fetchVisitInfoLoader: false,
  visitInfoMapping: {},
  visitImageLoader: false,
  visitInfoImage: {},

  UpdateStockSubmitLoader: false,
  UpdateCompetitorSubmitLoader: false,

  visitCompetitor: [],
  getVisitCompetitorLoader: false,

  visitStock: [],
  getVisitStockLoader: false,

  getParentAreasLoader: false,
  parentAreas: {},

  // OrderFormValidation: {
  //   invalid: false,
  //   invalid_field: "",
  // },

  orderHeaderForm: {},

  objectList: [],
  objectListLoader: false,

  addVisitData: {},
  visitInfo: {
    selectedCustomer: "",
  },

  visitBrand: {
    selectedBrand: "",
  },

  visitInfoForm: {},
  visitInfoFormLoader: false,

  visitSummary: {},
  visitSummaryLoader: false,

  visitHistory: {},
  visitHistoryLoader: false,
  updateVisitInfoLoader: false,

  updateBrand: [],
  updateCompForm: [],
  updateStockForm: [],
  updateBrandForm: [],

  brandInfo: [
    {
      brand: "",
      zx_percent: "",
      zx_value: "",
    },
  ],
  compFactor: [
    {
      competitor: "",
      retailerdrivingfactor: "",
    },
  ],
  compInfo: [
    {
      competitor: "",
      zx_percent: "",
      zx_valuepa: "",
      zx_distributorname: "",
      competitorbrandvisitinfo: [
        {
          brand: "",
          zx_percent: "",
          zx_valuepa: "",
          parent_id: "",
        },
      ],
    },
  ],
  compBrand: [
    {
      brand: "",
      zx_percent: "",
      zx_valuepa: "",
      parent_id: "",
    },
  ],
  showPicker: true,
  showInput: false,
  showButton: false,
  dropPicker: false,
  record: {},

  imageForm: {},
};
