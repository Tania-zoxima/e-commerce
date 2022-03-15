import { HelperService } from "App/Services/Utils/HelperService";
/**
 * The initial values for the redux state.
 */
export const INITIAL_STATE = {
  competitorForm: {},
  competitorFormLoader: false,

  competitorName: [],
  getCompetitorNameLoader: false,

  competitorList: {},
  getCompetitorLoader: false,

  class: {},
  getClassLoader: false,

  searchFilters: {
    name: "",
    brand: [],
    startDate: null,
    endDate: null,
    selectedDateType: "Date", //or Month,
    selectedMonth: new Date(HelperService.getCurrentTimestamp()).getMonth(),
  },
  competitorParentList: {},
  getCompetitorParentLoader: false,
  competitorChildList: {},
  getCompetitorChildLoader: false,
  searchCompetitorFilters: {
    brand: [],
  },
  record: {},
};
