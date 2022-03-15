import { createActions } from "reduxsauce";
const { Types, Creators } = createActions({
  changeLeadForm: ["payload"],

  createLeadForm: ["payload"],
  createLeadFormSuccess: ["payload"],
  createLeadFormFailure: null,
  createLeadFormLoading: null,
  createLeadFormLoadingStop: null,

  getLead: ["payload"],
  getLeadLoading: null,
  getLeadSuccess: ["payload"],
  getLeadFailure: null,
  getLeadLoadingStop: null,
  changeLeadSearchFilters: ["payload"],
  doNothing: null,

  updateLead: ["payload"],
  updateLeadLoading: null,
  updateLeadSuccess: ["payload"],
  updateLeadFailure: null,
  updateLeadLoadingStop: null,

  selectLead: ['payload'],
	selectLeadSuccess: ['payload'],
  clearForm:null,
  resetFilter:null,


});

export const LeadTypes = Types;
export default Creators;
