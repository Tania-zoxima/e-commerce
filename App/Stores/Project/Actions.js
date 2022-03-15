import { createActions } from "reduxsauce";
const { Types, Creators } = createActions({
  changeProjectForm: ["payload"],

  createProjectForm: ["payload"],
  createProjectFormSuccess: ["payload"],
  createProjectFormFailure: null,
  createProjectFormLoading: null,
  createProjectFormLoadingStop: null,

  createProjectProduct: ["payload"],
  createProjectProductSuccess: ["payload"],
  createProjectProductFailure: null,
  createProjectProductLoading: null,
  createProjectProductLoadingStop: null,

  getProject: ["payload"],
  getProjectLoading: null,
  getProjectSuccess: ["payload"],
  getProjectFailure: null,
  getProjectLoadingStop: null,
  changeProjectSearchFilters: ["payload"],
  doNothing: null,
  getBathroomMaster: ["payload"],
  getBathroomMasterLoading: null,
  getBathroomMasterSuccess: ["payload"],
  getBathroomMasterFailure: null,
  getBathroomMasterLoadingStop: null,

  updateProject: ["payload"],
  updateProjectLoading: null,
  updateProjectSuccess: ["payload"],
  updateProjectFailure: null,
  updateProjectLoadingStop: null,

  selectProject: ["payload"],
  selectProjectSuccess: ["payload"],

  clearProjectForm: null,

  projectFormValidationFailed: ["payload"],

  getCatalogue: ["payload"],
  getCatalogueLoading: null,
  getCatalogueSuccess: ["payload"],
  getCatalogueFailure: null,
  getCatalogueLoadingStop: null,
  resetFilter: null,

  getProjectOpportunity: ["payload"],
  getProjectOpportunityLoading: null,
  getProjectOpportunitySuccess: ["payload"],
  getProjectOpportunityFailure: null,
  getProjectOpportunityLoadingStop: null,

  getProductSold: ["payload"],
  getProductSoldLoading: null,
  getProductSoldSuccess: ["payload"],
  getProductSoldFailure: null,
  getProductSoldLoadingStop: null,

  getProjectProductSold: ["payload"],
  getProjectProductSoldLoading: null,
  getProjectProductSoldSuccess: ["payload"],
  getProjectProductSoldFailure: null,
  getProjectProductSoldLoadingStop: null,

  getProductOffer: ["payload"],
  getProductOfferLoading: null,
  getProductOfferSuccess: ["payload"],
  getProductOfferFailure: null,
  getProductOfferLoadingStop: null,

  addProductToCart: ["payload"],
  clearCart: null,
  clearProjectApi:null,
  clearGetProjectApi:null
});

export const ProjectTypes = Types;
export default Creators;
