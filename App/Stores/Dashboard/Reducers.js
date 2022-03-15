import { INITIAL_STATE } from "./InitialState";
import { createReducer } from "reduxsauce";
import { DashboardTypes } from "./Actions";
import _, { filter } from "lodash";

export const changeDashboardSearchFilters = (state, { payload }) => {
  let updated_search_filters = _.cloneDeep(state.searchFilters);
  updated_search_filters[payload.edited_field] = payload.edited_value;
  return {
    ...state,
    searchFilters: updated_search_filters,
  };
};

export const getOrderValueSuccess = (state, { payload }) => {
  return {
    ...state,
    data: _.cloneDeep({
      ...state.data,
      orderValue: payload,
    }),
    loaders: {
      ...state.loaders,
      orderValueLoader: false,
    },
  };
};

export const getVisitCountSuccess = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      visitCount: payload,
    },
    loaders: {
      ...state.loaders,
      visitCountLoader: false,
    },
  };
};

export const getSiteCountSuccess = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      siteCount: payload,
    },
    loaders: {
      ...state.loaders,
      siteCountLoader: false,
    },
  };
};

export const getCountersSuccess = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      counters: payload,
    },
    loaders: {
      ...state.loaders,
      countersLoader: false,
    },
  };
};

export const getEventCountSuccess = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      eventsCount: payload,
    },
    loaders: {
      ...state.loaders,
      eventsCountLoader: false,
    },
  };
};

export const getDashboardSummarySuccess = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      dashboardSummary: payload,
    },
    loaders: {
      ...state.loaders,
      dashboardSummaryLoader: false,
    },
  };
};
export const getDashboardSummaryFailure = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      dashboardSummary: [],
    },
    loaders: {
      ...state.loaders,
      dashboardSummaryLoader: false,
    },
  };
};
export const getDashboardSummaryLoading = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      dashboardSummaryLoader: true,
    },
  };
};

export const getDashboardSummaryLoadingStop = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      dashboardSummaryLoader: false,
    },
  };
};

export const getDashboardBannerSuccess = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      dashboardBanner: payload,
    },
    loaders: {
      ...state.loaders,
      dashboardBannerLoader: false,
    },
  };
};
export const getDashboardBannerFailure = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      dashboardBanner: [],
    },
    loaders: {
      ...state.loaders,
      dashboardBannerLoader: false,
    },
  };
};
export const getDashboardBannerLoading = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      dashboardBannerLoader: true,
    },
  };
};

export const getDashboardBannerLoadingStop = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      dashboardBannerLoader: false,
    },
  };
};

export const getOrderValueFailure = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      orderValue: [],
    },
    loaders: {
      ...state.loaders,
      orderValueLoader: false,
    },
  };
};

export const getVisitCountFailure = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      visitCount: [],
    },
    loaders: {
      ...state.loaders,
      visitCountLoader: false,
    },
  };
};

export const getSiteCountFailure = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      siteCount: [],
    },
    loaders: {
      ...state.loaders,
      siteCountLoader: false,
    },
  };
};

export const getCountersFailure = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      counters: [],
    },
    loaders: {
      ...state.loaders,
      countersLoader: false,
    },
  };
};

export const getEventCountFailure = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      eventsCount: [],
    },
    loaders: {
      ...state.loaders,
      eventsCountLoader: false,
    },
  };
};

export const getOrderValueLoading = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      orderValueLoader: true,
    },
  };
};

export const getVisitCountLoading = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      visitCountLoader: true,
    },
  };
};

export const getSiteCountLoading = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      siteCountLoader: true,
    },
  };
};

export const getCountersLoading = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      countersLoader: true,
    },
  };
};

export const getEventCountLoading = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      eventsCountLoader: true,
    },
  };
};

export const getOrderValueLoadingStop = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      orderValueLoader: false,
    },
  };
};

export const getVisitCountLoadingStop = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      visitCountLoader: false,
    },
  };
};

export const getSiteCountLoadingStop = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      siteCountLoader: false,
    },
  };
};

export const getCountersLoadingStop = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      countersLoader: false,
    },
  };
};

export const getEventCountLoadingStop = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      eventsCountLoader: false,
    },
  };
};

export const getTickerSuccess = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      ticker: payload,
    },
    loaders: {
      ...state.loaders,
      tickerLoader: false,
    },
  };
};
export const getTickerFailure = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      ticker: [],
    },
    loaders: {
      ...state.loaders,
      tickerLoader: false,
    },
  };
};
export const getTickerLoading = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      tickerLoader: true,
    },
  };
};

export const getTickerLoadingStop = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      tickerLoader: false,
    },
  };
};

export const getPrimarySummarySuccess = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      primarySummary: payload,
    },
    loaders: {
      ...state.loaders,
      primarySummaryLoader: false,
    },
  };
};
export const getPrimarySummaryFailure = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      primarySummary: {},
      secondarySummary: {},
    },
    loaders: {
      ...state.loaders,
      primarySummaryLoader: false,
    },
  };
};
export const getPrimarySummaryLoading = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      primarySummaryLoader: true,
    },
  };
};

export const getPrimarySummaryLoadingStop = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      primarySummaryLoader: false,
    },
  };
};

export const getSecondarySummarySuccess = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      secondarySummary: payload,
    },
    loaders: {
      ...state.loaders,
      secondarySummaryLoader: false,
    },
  };
};
export const getSecondarySummaryFailure = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      secondarySummary: {},
    },
    loaders: {
      ...state.loaders,
      secondarySummaryLoader: false,
    },
  };
};
export const getSecondarySummaryLoading = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      secondarySummaryLoader: true,
    },
  };
};

export const getSecondarySummaryLoadingStop = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      secondarySummaryLoader: false,
    },
  };
};

export const doNothing = (state) => ({
  ...state,
});

export const getAllBrandsSuccess = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      brand: payload,
    },
    loaders: {
      ...state.loaders,
      brandLoader: false,
    },
    filter:state.filter.concat(payload)
  };
};
export const getAllBrandsFailure = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      brand: {},
    },
    loaders: {
      ...state.loaders,
      brandLoader: false,
    },
  };
};
export const getAllBrandsLoading = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      brandLoader: true,
    },
  };
};

export const getAllBrandsLoadingStop = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      brandLoader: false,
    },
  };
};

export const getAllClassSuccess = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      itemClass: payload,
    },
    loaders: {
      ...state.loaders,
      itemClassLoader: false,
    },
    filter:state.filter.concat(payload)
  };
};
export const getAllClassFailure = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      itemClass: {},
    },
    loaders: {
      ...state.loaders,
      itemClassLoader: false,
    },
  };
};
export const getAllClassLoading = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      itemClassLoader: true,
    },
  };
};

export const getAllClassLoadingStop = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      itemClassLoader: false,
    },
  };
};

export const getCitySuccess = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      city: payload,
    },
    loaders: {
      ...state.loaders,
      cityLoader: false,
    },
    filter:state.filter.concat(payload)
  };
};
export const getCityFailure = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      city: {},
    },
    loaders: {
      ...state.loaders,
      cityLoader: false,
    },
  };
};
export const getCityLoading = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      cityLoader: true,
    },
  };
};

export const getCityLoadingStop = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      cityLoader: false,
    },
  };
};
export const getStateSuccess = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      state: payload,
    },
    loaders: {
      ...state.loaders,
      stateLoader: false,
    },
    filter:state.filter.concat(payload)
  };
};
export const getStateFailure = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      state: {},
    },
    loaders: {
      ...state.loaders,
      stateLoader: false,
    },
  };
};
export const getStateLoading = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      stateLoader: true,
    },
  };
};

export const getStateLoadingStop = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      stateLoader: false,
    },
  };
};
export const getSubStateSuccess = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      subState: payload,
    },
    loaders: {
      ...state.loaders,
      subStateLoader: false,
    },
    filter:state.filter.concat(payload)
  };
};
export const getSubStateFailure = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      subState: {},
    },
    loaders: {
      ...state.loaders,
      subStateLoader: false,
    },
  };
};
export const getSubStateLoading = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      subStateLoader: true,
    },
  };
};

export const getSubStateLoadingStop = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      subStateLoader: false,
    },
  };
};
export const getZoneSuccess = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      zone: payload,
    },
    loaders: {
      ...state.loaders,
      zoneLoader: false,
    },
    filter:state.filter.concat(payload)
  };
};
export const getZoneFailure = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      zone: {},
    },
    loaders: {
      ...state.loaders,
      zoneLoader: false,
    },
  };
};
export const getZoneLoading = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      zoneLoader: true,
    },
  };
};

export const getZoneLoadingStop = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      zoneLoader: false,
    },
  };
};
export const getDistrictSuccess = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      district: payload,
    },
    loaders: {
      ...state.loaders,
      districtLoader: false,
    },
    filter:state.filter.concat(payload)
  };
};
export const getDistrictFailure = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      district: {},
    },
    loaders: {
      ...state.loaders,
      districtLoader: false,
    },
  };
};
export const getDistrictLoading = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      districtLoader: true,
    },
  };
};

export const getDistrictLoadingStop = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      districtLoader: false,
    },
  };
};
export const getAreaSuccess = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      area: payload,
    },
    loaders: {
      ...state.loaders,
      areaLoader: false,
    },
    filter:state.filter.concat(payload)
  };
};
export const getAreaFailure = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      area: {},
    },
    loaders: {
      ...state.loaders,
      areaLoader: false,
    },
  };
};
export const getAreaLoading = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      areaLoader: true,
    },
  };
};

export const getAreaLoadingStop = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      areaLoader: false,
    },
  };
};

export const dashboardOrderFilterSuccess = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      filterOrder: payload,
    },
    loaders: {
      ...state.loaders,
      filterOrderLoader: false,
    },

  };
};
export const dashboardOrderFilterFailure = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      filterOrder: {},
    },
    loaders: {
      ...state.loaders,
      filterOrderLoader: false,
    },
  };
};
export const dashboardOrderFilterLoading = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      filterOrderLoader: true,
    },
  };
};

export const dashboardOrderFilterLoadingStop = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      filterOrderLoader: false,
    },
  };
};

export const changeDashboardOrderFilters = (state, { payload }) => {
  let updated_search_filters = _.cloneDeep(state.searchDashboardOrderFilters);
  updated_search_filters[payload.edited_field] = payload.edited_value;
  return {
      ...state,
      searchDashboardOrderFilters: {
          ...state.searchDashboardOrderFilters,
          ...updated_search_filters
      }
  }
};
export const resetFilter = (state) => ({
  ...state,
  searchDashboardOrderFilters:INITIAL_STATE.searchDashboardOrderFilters,
  // searchFilters
});

export const getDrsSuccess = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      drsValue: payload,
    },
    loaders: {
      ...state.loaders,
      drsValueLoader: false,
    },
    // filter:state.filter.concat(payload)
  };
};
export const getDrsFailure = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      drsValue: {},
    },
    loaders: {
      ...state.loaders,
      drsValueLoader: false,
    },
  };
};
export const getDrsLoading = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      drsValueLoader: true,
    },
  };
};

export const getDrsLoadingStop = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      drsValueLoader: false,
    },
  };
};

export const clearSearchFilter = (state) => ({
  ...state,
    searchFilters: {
      ...state.searchFilters,
      selectedTab:0,
      selectedTabRetail: 0,
      selectedTabonboard:0
    },
});

export const reducer = createReducer(INITIAL_STATE, {
  [DashboardTypes.CHANGE_DASHBOARD_ORDER_FILTERS]: changeDashboardOrderFilters,
  [DashboardTypes.CHANGE_DASHBOARD_SEARCH_FILTERS]: changeDashboardSearchFilters,
  [DashboardTypes.RESET_FILTER]: resetFilter,
  [DashboardTypes.CLEAR_SEARCH_FILTER]: clearSearchFilter,
  [DashboardTypes.GET_ORDER_VALUE_SUCCESS]: getOrderValueSuccess,
  [DashboardTypes.GET_VISIT_COUNT_SUCCESS]: getVisitCountSuccess,
  [DashboardTypes.GET_SITE_COUNT_SUCCESS]: getSiteCountSuccess,
  [DashboardTypes.GET_COUNTERS_SUCCESS]: getCountersSuccess,
  [DashboardTypes.GET_EVENT_COUNT_SUCCESS]: getEventCountSuccess,
  [DashboardTypes.GET_DASHBOARD_SUMMARY_SUCCESS]: getDashboardSummarySuccess,
  [DashboardTypes.GET_DASHBOARD_BANNER_SUCCESS]: getDashboardBannerSuccess,
  [DashboardTypes.GET_TICKER_SUCCESS]: getTickerSuccess,
  [DashboardTypes.GET_PRIMARY_SUMMARY_SUCCESS]: getPrimarySummarySuccess,
  [DashboardTypes.GET_SECONDARY_SUMMARY_SUCCESS]: getSecondarySummarySuccess,
  [DashboardTypes.GET_ALL_BRANDS_SUCCESS]: getAllBrandsSuccess,
  [DashboardTypes.GET_ALL_CLASS_SUCCESS]: getAllClassSuccess,
  [DashboardTypes.GET_CITY_SUCCESS]: getCitySuccess,
  [DashboardTypes.GET_STATE_SUCCESS]: getStateSuccess,
  [DashboardTypes.GET_SUB_STATE_SUCCESS]: getSubStateSuccess,
  [DashboardTypes.GET_DISTRICT_SUCCESS]: getDistrictSuccess,
  [DashboardTypes.GET_AREA_SUCCESS]: getAreaSuccess,
  [DashboardTypes.GET_ZONE_SUCCESS]: getZoneSuccess,
  [DashboardTypes.DASHBOARD_ORDER_FILTER_SUCCESS]: dashboardOrderFilterSuccess,
  [DashboardTypes.GET_DRS_SUCCESS]: getDrsSuccess,

  [DashboardTypes.GET_ORDER_VALUE_FAILURE]: getOrderValueFailure,
  [DashboardTypes.GET_VISIT_COUNT_FAILURE]: getVisitCountFailure,
  [DashboardTypes.GET_SITE_COUNT_FAILURE]: getSiteCountFailure,
  [DashboardTypes.GET_COUNTERS_FAILURE]: getCountersFailure,
  [DashboardTypes.GET_EVENT_COUNT_FAILURE]: getEventCountFailure,
  [DashboardTypes.GET_DASHBOARD_SUMMARY_FAILURE]: getDashboardSummaryFailure,
  [DashboardTypes.GET_DASHBOARD_BANNER_FAILURE]: getDashboardBannerFailure,
  [DashboardTypes.GET_TICKER_FAILURE]: getTickerFailure,
  [DashboardTypes.GET_PRIMARY_SUMMARY_FAILURE]: getPrimarySummaryFailure,
  [DashboardTypes.GET_SECONDARY_SUMMARY_FAILURE]: getSecondarySummaryFailure,
  [DashboardTypes.GET_ALL_BRANDS_FAILURE]: getAllBrandsFailure,
  [DashboardTypes.GET_ALL_CLASS_FAILURE]: getAllClassFailure,
  [DashboardTypes.GET_CITY_FAILURE]: getCityFailure,
  [DashboardTypes.GET_STATE_FAILURE]: getStateFailure,
  [DashboardTypes.GET_SUB_STATE_FAILURE]: getSubStateFailure,
  [DashboardTypes.GET_DISTRICT_FAILURE]: getDistrictFailure,
  [DashboardTypes.GET_AREA_FAILURE]: getAreaFailure,
  [DashboardTypes.GET_ZONE_FAILURE]: getZoneFailure,
  [DashboardTypes.DASHBOARD_ORDER_FILTER_FAILURE]: dashboardOrderFilterFailure,
  [DashboardTypes.GET_DRS_FAILURE]: getDrsFailure,


  [DashboardTypes.GET_ORDER_VALUE_LOADING]: getOrderValueLoading,
  [DashboardTypes.GET_VISIT_COUNT_LOADING]: getVisitCountLoading,
  [DashboardTypes.GET_SITE_COUNT_LOADING]: getSiteCountLoading,
  [DashboardTypes.GET_COUNTERS_LOADING]: getCountersLoading,
  [DashboardTypes.GET_EVENT_COUNT_LOADING]: getEventCountLoading,
  [DashboardTypes.GET_DASHBOARD_SUMMARY_LOADING]: getDashboardSummaryLoading,
  [DashboardTypes.GET_DASHBOARD_BANNER_LOADING]: getDashboardBannerLoading,
  [DashboardTypes.GET_TICKER_LOADING]: getTickerLoading,
  [DashboardTypes.GET_PRIMARY_SUMMARY_LOADING]: getPrimarySummaryLoading,
  [DashboardTypes.GET_SECONDARY_SUMMARY_LOADING]: getSecondarySummaryLoading,
  [DashboardTypes.GET_ALL_BRANDS_LOADING]: getAllBrandsLoading,
  [DashboardTypes.GET_ALL_CLASS_LOADING]: getAllClassLoading,
  [DashboardTypes.GET_CITY_LOADING]: getCityLoading,
  [DashboardTypes.GET_STATE_LOADING]: getStateLoading,
  [DashboardTypes.GET_SUB_STATE_LOADING]: getSubStateLoading,
  [DashboardTypes.GET_DISTRICT_LOADING]: getDistrictLoading,
  [DashboardTypes.GET_AREA_LOADING]: getAreaLoading,
  [DashboardTypes.GET_ZONE_LOADING]: getZoneLoading,
  [DashboardTypes.DASHBOARD_ORDER_FILTER_LOADING]: dashboardOrderFilterLoading,
  [DashboardTypes.GET_DRS_LOADING]: getDrsLoading,


  [DashboardTypes.GET_ORDER_VALUE_LOADING_STOP]: getOrderValueLoadingStop,
  [DashboardTypes.GET_VISIT_COUNT_LOADING_STOP]: getVisitCountLoadingStop,
  [DashboardTypes.GET_SITE_COUNT_LOADING_STOP]: getSiteCountLoadingStop,
  [DashboardTypes.GET_COUNTERS_LOADING_STOP]: getCountersLoadingStop,
  [DashboardTypes.GET_EVENT_COUNT_LOADING_STOP]: getEventCountLoadingStop,
  [DashboardTypes.GET_DASHBOARD_SUMMARY_LOADING_STOP]: getDashboardSummaryLoadingStop,
  [DashboardTypes.GET_DASHBOARD_BANNER_LOADING_STOP]: getDashboardBannerLoadingStop,
  [DashboardTypes.GET_TICKER_LOADING_STOP]: getTickerLoadingStop,
  [DashboardTypes.GET_PRIMARY_SUMMARY_LOADING_STOP]: getPrimarySummaryLoadingStop,
  [DashboardTypes.GET_SECONDARY_SUMMARY_LOADING_STOP]: getSecondarySummaryLoadingStop,
  [DashboardTypes.GET_ALL_BRANDS_LOADING_STOP]: getAllBrandsLoadingStop,
  [DashboardTypes.GET_ALL_CLASS_LOADING_STOP]: getAllClassLoadingStop,
  [DashboardTypes.GET_CITY_LOADING_STOP]: getCityLoadingStop,
  [DashboardTypes.GET_STATE_LOADING_STOP]: getStateLoadingStop,
  [DashboardTypes.GET_SUB_STATE_LOADING_STOP]: getSubStateLoadingStop,
  [DashboardTypes.GET_DISTRICT_LOADING_STOP]: getDistrictLoadingStop,
  [DashboardTypes.GET_AREA_LOADING_STOP]: getAreaLoadingStop,
  [DashboardTypes.GET_ZONE_LOADING_STOP]: getZoneLoadingStop,
  [DashboardTypes.DASHBOARD_ORDER_FILTER_LOADING_STOP]: dashboardOrderFilterLoadingStop,
  [DashboardTypes.GET_DRS_LOADING_STOP]: getDrsLoadingStop,

  [DashboardTypes.DO_NOTHING]: doNothing,
});
