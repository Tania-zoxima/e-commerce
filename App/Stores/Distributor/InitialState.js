import { HelperService } from "App/Services/Utils/HelperService";
import _ from "lodash";

/**
 * The initial values for the redux state.
 */
export const INITIAL_STATE = {
  distributorForm: {},
  sendApproval: {},

  distributorFormUpdate: {},
  submitDistributorFormLoader: false,

  editDistributorForm: {},

  submitEditedDistributorFormLoader: false,

  searchFilters: {
    name: "",
  },

  DistributorList: [],
  getDistributorLoader: false,

  getArea: [],
  getAllAreaLoader: false,

  getPincode: [],
  getAllPincodeLoader: false,

  getCity: [],
  getAllCityLoader: false,

  getState: [],
  getAllStateLoader: false,

  getSubState: [],
  getAllSubStateLoader: false,

  getDistrict: [],
  getAllDistrictLoader: false,

  getZone: [],
  getAllZoneLoader: false,

  distributorFormValidation: {
    invalid: false,
    invalid_field: "",
  },

  submitDistributorFormValidation: {
    invalid: false,
    invalid_field: "",
  },
  updateDistributorLoader: false,
  sendApprovalLoader: false,
  AddStockForm: [
    {
      id: _.uniqueId(),
      itemsubcategory: null,
      zx_l2lysales: null,
      zx_lysales: null,
      zx_cysales: null,
    },
  ],
  AddCustomerForm: [
    {
      id: _.uniqueId(),
      zx_nameofthecustomer: null,
      itemsubcategory: null,
      zx_categorysold: null,
    },
  ],
  AddFirmForm: [
    {
      id: _.uniqueId(),
      zx_district: null,
      zx_town: null,
      itemsubcategory: null,
      zx_estimatedbusinessinfirstyearinlakhs: null,
    },
  ],
  getSubCategory: [],
  getSubCategoryLoader: false,
  visitStock: [],
  visitCustomerStock: [],
  visitFirmStock: [],

  getResidenceArea: [],
  getResidenceAreaLoader: false,

  getResidencePincode: [],
  getResidencePincodeLoader: false,

  getResidenceCity: [],
  getResidenceCityLoader: false,

  getResidenceState: [],
  getResidenceStateLoader: false,

  getResidenceSubState: [],
  getResidenceSubStateLoader: false,

  getResidenceDistrict: [],
  getResidenceDistrictLoader: false,

  getResidenceZone: [],
  getResidenceZoneLoader: false,

  record: {},
  sale: [
    {
      itemsubcategory: "",
      zx_l2lysales: "",
      zx_lysales: "",
      zx_cysales: "",
    },
  ],
  best: [
    {
      zx_nameofthecustomer: "",
      itemsubcategory: "",
      zx_categorysold: "",
    },
  ],
  firstFirm: [
    {
      zx_district: "",
      zx_town: "",
      itemsubcategory: "",
      zx_estimatedbusinessinfirstyearinlakhs: "",
    },
  ],
};
