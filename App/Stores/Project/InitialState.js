import { HelperService } from "App/Services/Utils/HelperService";

/**
 * The initial values for the redux state.
 */
export const INITIAL_STATE = {
  projectForm: {},
  projectFormLoader: false,

  projectProduct: {},
  projectProductLoader: false,


  getProject: [],
  getProjectLoader: false,
  searchFilters: {
    name: "",
    startDate: null,
    endDate: null,
    selectedDateType: "Date", //or Month,
    selectedMonth: new Date(HelperService.getCurrentTimestamp()).getMonth(),
    type: [],
    stage: [],
  },

  bathroomMaster: {},
  getBathroomMasterLoader: false,
  updateProjectLoader: false,

  projectFormValidation: {
    invalid: false,
    invalid_field: "",
  },
  catalogue: [],
  getCatalogueLoader: false,
  record: {},
  filter: [
    { id: "1", name: "Residential", checked: false, parent: "2" },
    { id: "2", name: "Commercial", checked: false, parent: "2" },
    { id: "3", name: "Layout", checked: false, parent: "2" },
    { id: "4", name: "Hospital", checked: false, parent: "2" },
    { id: "5", name: "Hotel", checked: false, parent: "2" },
    { id: "6", name: "Township", checked: false, parent: "2" },
    { id: "7", name: "Villa", checked: false, parent: "2" },
    { id: "8", name: "Resort", checked: false, parent: "2" },
    { id: "9", name: "Industry", checked: false, parent: "2" },
    { id: "10", name: "Infra", checked: false, parent: "2" },
    { id: "11", name: "Others", checked: false, parent: "2" },
    { id: "12", name: "Design stage", checked: false, parent: "1" },
    { id: "13", name: "Tendering stage", checked: false, parent: "1" },
    {
      id: "14",
      name: "Order issued to contractor",
      checked: false,
      parent: "1",
    },
    { id: "15", name: "Mock up stage", checked: false, parent: "1" },
    { id: "16", name: "Price offer stage", checked: false, parent: "1" },
    { id: "17", name: "Order issued stage", checked: false, parent: "1" },
    { id: "18", name: "Supply stage", checked: false, parent: "1" },
  ],
  getProjectOpportunity: [],
  getProjectOpportunityLoader: false,

  getProductSold: [],
  getProductSoldLoader: false,

  getProjectProductSold: [],
  getProjectProductSoldLoader: false,

  getProductOffer: [],
  getProductOfferLoader: false,

  cart: {
    cartItem: [],
  },
};
