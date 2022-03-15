import { HelperService } from "App/Services/Utils/HelperService";

/**
 * The initial values for the redux state.
 */
export const INITIAL_STATE = {
  leadForm: {},
  leadFormLoader: false,
  getLead: [],
  getLeadLoader: false,
  searchFilters: {
    name: "",
    startDate: null,
    endDate: null,
    selectedDateType: "Date", //or Month,
    selectedMonth: new Date(HelperService.getCurrentTimestamp()).getMonth(),
    type: [],
    stage: [],
  },
  updateLeadLoader: false,
  record: {},
  filter: [
    { id: "1", name: "New business", checked: false, parent: "1" },
    { id: "2", name: "Existing business", checked: false, parent: "1" },
    { id: "3", name: "Upgrade", checked: false, parent: "1" },
    { id: "4", name: "Partner sale", checked: false, parent: "1" },
    { id: "5", name: "Abandoned", checked: false, parent: "2" },
    { id: "6", name: "Closed", checked: false, parent: "2" },
    {
      id: "7",
      name: "Lost",
      checked: false,
      parent: "2",
    },
    { id: "8", name: "Not Interested", checked: false, parent: "2" },
    { id: "9", name: "Progress", checked: false, parent: "2" },
  ],
};
