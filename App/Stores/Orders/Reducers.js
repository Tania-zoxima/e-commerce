import { INITIAL_STATE } from "./InitialState";
import { createReducer } from "reduxsauce";
import { OrdersTypes } from "./Actions";
import _ from "lodash";

export const fetchOrderDetailsLoading = (state) => ({
  ...state,
  fetchOrderDetailsLoading: true,
});

export const fetchOrderDetailsSuccess = (state, { payload }) => {
  let updatedOrderDetailMapping = _.cloneDeep(state.allOrdersDetailsMapping);
  updatedOrderDetailMapping[payload.id] = payload.data;
  return {
    ...state,
    fetchOrderDetailsLoading: false,
    allOrdersDetailsMapping: updatedOrderDetailMapping,
  };
};

export const fetchOrderDetailsFailure = (state) => ({
  ...state,
  fetchOrderDetailsLoading: false,
  allOrdersDetailsMapping: INITIAL_STATE.allOrdersDetailsMapping,
});

export const fetchAllOrdersLoading = (state) => ({
  ...state,
  fetchAllOrdersLoader: true,
});

export const fetchAllOrdersSuccess = (state, { payload }) => ({
  ...state,
  fetchAllOrdersLoader: false,
  allOrders: _.cloneDeep(payload),
});

export const fetchAllOrdersFailure = (state) => ({
  ...state,
  fetchAllOrdersLoader: false,
  // allOrders: []
});

export const selectOrder = (state, { payload }) => ({
  ...state,
  selectedOrder: payload,
});

export const doNothing = (state) => ({
  ...state,
});

export const repeatOrderLoading = (state, { payload }) => ({
  ...state,
  repeatOrderLoader: payload,
});

export const repeatOrderSuccess = (state, { payload }) => ({
  ...state,
  repeatOrderLoader: false,
});

export const repeatOrderFailure = (state) => ({
  ...state,
  repeatOrderLoader: false,
});

export const showModal = (state, { payload }) => ({
  ...state,
  showModal: true,
});

export const closeModal = (state, { payload }) => ({
  ...state,
  showModal: false,
});

export const showModals = (state, { payload }) => ({
  ...state,
  showModals: true,
});

export const closeModals = (state, { payload }) => ({
  ...state,
  showModals: false,
});

export const showTransportModal = (state, { payload }) => ({
  ...state,
  showtransportmodal: true,
});

export const closeTransportModal = (state, { payload }) => ({
  ...state,
  showtransportmodal: false,
});

export const changeBrandSearchFilters = (state, { payload }) => {
  let updated_distributor_search_filters = _.cloneDeep(state.searchFilters);
  updated_distributor_search_filters[payload.edited_field] =
    payload.edited_value;
  //console.log(payload.edited_field)
  return {
    ...state,

    searchFilters: {
      ...state.searchFilters,
      ...updated_distributor_search_filters,
    },
    openMoreFilters: false,
  };
};

export const selectDetail = (state, { payload }) => ({
  ...state,
  shipDetail: payload,
});

export const selectDetailSuccess = (state, { payload }) => ({
  ...state,
  shipDetail: _.cloneDeep(payload),
});
export const selectTransport = (state, { payload }) => ({
  ...state,
  selectedTransport: payload,
});

export const selectTransportSuccess = (state, { payload }) => ({
  ...state,
  selectedTransport: _.cloneDeep(payload),
});
export const getTransportSuccess = (state, { payload }) => {
  return {
    ...state,
    getTransport: payload,
    getTransportLoader: false,
  };
};

export const getTransportFailure = (state, { payload }) => {
  return {
    ...state,
    getTransportLoader: false,
    getTransport: [],
  };
};

export const getTransportLoading = (state) => {
  return {
    ...state,
    getTransportLoader: true,
  };
};

export const getTransportLoadingStop = (state) => {
  return {
    ...state,
    getTransportLoader: false,
  };
};

export const changePrimaryOrderForm = (state, { payload }) => {
  let updated_form = _.cloneDeep(state.primaryOrderForm);
  updated_form[payload.edited_field] = payload.edited_value;

  return {
    ...state,
    primaryOrderForm: {
      ...state.primaryOrderForm,
      ...updated_form,
    },
    orderValidation: {
      invalid: false,
      invalid_field: "",
    },
  };
};

export const submitPrimaryOrderSuccess = (state, { payload }) => {
  return {
    ...state,
    primaryOrderForm: {
      // ...state.primaryOrderForm,
      primaryOrderForm: payload,
      // selectedDistributorForm: [],
      submitPrimaryOrderLoader: false,
    },
    recordId: payload.order,
    cart: INITIAL_STATE.cart,
  };
};

export const submitPrimaryOrderFailure = (state, { payload }) => {
  return {
    ...state,
    primaryOrderForm: {
      ...state.primaryOrderForm,
      submitPrimaryOrderLoader: false,
    },
  };
};

export const submitPrimaryOrderLoading = (state) => {
  return {
    ...state,

    submitPrimaryOrderLoader: true,
  };
};

export const submitPrimaryOrderLoadingStop = (state, { payload }) => {
  return {
    ...state,
    primaryOrderForm: {
      ...state.primaryOrderForm,
      submitPrimaryOrderLoader: false,
    },
  };
};

export const clearOrderForm = (state) => ({
  ...state,
  primaryOrderForm: {},
  variableDiscount: [],
});

export const clearVariableDiscount = (state) => ({
  ...state,
  variableDiscount: [],
});

export const clearOrderLine = (state) => ({
  ...state,
  orderLine: [],
});

export const clearTransport = (state) => ({
  ...state,
  selectedTransport: {},
});

export const clearPlaceOrderForm = (state) => ({
  ...state,
  placeOrderForm: INITIAL_STATE.placeOrderForm,
});

export const clearOrderLocation = (state) => ({
  ...state,
  orderLocation: [],
});

export const changeOrderForm = (state, { payload }) => {
  let updated_form = _.cloneDeep(state.placeOrderForm);
  updated_form[payload.edited_field] = payload.edited_value;
  updated_form[payload.edited_field1] = payload.edited_value1;
  // console.log("hhhhhhhhhhhhhhh",payload)
  return {
    ...state,
    placeOrderForm: {
      ...state.placeOrderForm,
      ...updated_form,
    },
    //    distributorFormValidation: {
    //        invalid: false,
    //        invalid_field: ''
    //    }
  };
};

export const getOrderLocationSuccess = (state, { payload }) => {
  return {
    ...state,
    orderLocation: payload,
    orderLocationLoader: false,
  };
};

export const getVariableDiscountSuccess = (state, { payload }) => ({
  ...state,
  variableDiscount: _.cloneDeep(payload),
  getVariableDiscountLoader: false,
});

export const getVariableDiscountFailure = (state, { payload }) => ({
  ...state,
  getVariableDiscountLoader: false,
});

export const getVariableDiscountLoading = (state) => ({
  ...state,
  getVariableDiscountLoader: true,
});
export const getVariableDiscountLoadingStop = (state) => {
  return {
    ...state,
    getVariableDiscountLoader: false,
  };
};

export const getOrderLocationFailure = (state, { payload }) => {
  return {
    ...state,
    orderLocationLoader: false,
    orderLocation: [],
  };
};

export const getOrderLocationLoading = (state) => {
  return {
    ...state,
    orderLocationLoader: true,
  };
};

export const getOrderLocationLoadingStop = (state) => {
  return {
    ...state,
    orderLocationLoader: false,
  };
};

export const getRetailerItems = (state, { payload }) => ({
  ...state,
  retailerItems: payload,
});

export const orderValidationFailed = (state, { payload }) => ({
  ...state,
  orderValidation: {
    ...payload,
  },
});

export const secondaryOrderValidationFailed = (state, { payload }) => ({
  ...state,
  secondaryOrderValidation: {
    ...payload,
  },
});

export const changeOrderSearchFilters = (state, { payload }) => {
  let updated_order_search_filters = _.cloneDeep(state.orderSearchFilters);
  updated_order_search_filters[payload.edited_field] = payload.edited_value;
  //console.log(payload.edited_field)
  return {
    ...state,

    orderSearchFilters: {
      ...state.orderSearchFilters,
      ...updated_order_search_filters,
    },
  };
};
export const getOrderLineSuccess = (state, { payload }) => {
  return {
    ...state,
    orderLine: payload,
    orderLineLoader: false,
  };
};

export const getOrderLineFailure = (state, { payload }) => {
  return {
    ...state,
    orderLineLoader: false,
    orderLine: [],
  };
};

export const getOrderLineLoading = (state) => {
  return {
    ...state,
    orderLineLoader: true,
  };
};

export const getOrderLineLoadingStop = (state) => {
  return {
    ...state,
    orderLineLoader: false,
  };
};

export const changeSecondaryBrandSearchFilters = (state, { payload }) => {
  let updated_distributor_search_filters = _.cloneDeep(
    state.searchSecondaryFilters
  );
  updated_distributor_search_filters[payload.edited_field] =
    payload.edited_value;
  //console.log(payload.edited_field)
  return {
    ...state,

    searchSecondaryFilters: {
      ...state.searchSecondaryFilters,
      ...updated_distributor_search_filters,
    },
    openMoreFilters: false,
  };
};

export const changeSecondaryOrderForm = (state, { payload }) => {
  let updated_form = _.cloneDeep(state.secondaryOrderForm);
  updated_form[payload.edited_field] = payload.edited_value;

  return {
    ...state,
    secondaryOrderForm: {
      ...state.secondaryOrderForm,
      ...updated_form,
    },
    orderValidation: {
      invalid: false,
      invalid_field: "",
    },
  };
};

export const changeSecondaryPlaceOrderForm = (state, { payload }) => {
  let updated_form = _.cloneDeep(state.placeSecondaryOrderForm);
  updated_form[payload.edited_field] = payload.edited_value;
  updated_form[payload.edited_field1] = payload.edited_value1;
  // console.log("hhhhhhhhhhhhhhh",payload)
  return {
    ...state,
    placeSecondaryOrderForm: {
      ...state.placeSecondaryOrderForm,
      ...updated_form,
    },
    //    distributorFormValidation: {
    //        invalid: false,
    //        invalid_field: ''
    //    }
  };
};

export const fetchSecondaryOrdersLoading = (state) => ({
  ...state,
  fetchSecondaryOrdersLoader: true,
});

export const fetchSecondaryOrdersSuccess = (state, { payload }) => ({
  ...state,
  fetchSecondaryOrdersLoader: false,
  secondaryOrders: _.cloneDeep(payload),
});

export const fetchSecondaryOrdersFailure = (state) => ({
  ...state,
  fetchSecondaryOrdersLoader: false,
  // secondaryOrders:[]
});

export const getOrderCountLoading = (state) => ({
  ...state,
  countLoader: true,
});

export const getOrderCountSuccess = (state, { payload }) => ({
  ...state,
  countLoader: false,
  count: _.cloneDeep(payload),
});

export const getOrderCountFailure = (state) => ({
  ...state,
  countLoader: false,
  // secondaryOrders:[]
});

export const getSecondaryCountLoading = (state) => ({
  ...state,
  orderCountLoader: true,
});

export const getSecondaryCountSuccess = (state, { payload }) => ({
  ...state,
  orderCountLoader: false,
  orderCount: _.cloneDeep(payload),
});

export const getSecondaryCountFailure = (state) => ({
  ...state,
  orderCountLoader: false,
  // secondarySecondarys:[]
});
export const submitSecondaryOrderSuccess = (state, { payload }) => {
  return {
    ...state,
    secondaryOrderForm: {
      // ...state.secondaryOrderForm,
      secondaryOrderForm: payload,
      // selectedDistributorForm: [],
      submitSecondaryOrderLoader: false,
    },
    cart: INITIAL_STATE.cart,
    recordId: payload.order,
  };
};

export const submitSecondaryOrderFailure = (state, { payload }) => {
  return {
    ...state,
    secondaryOrderForm: {
      ...state.secondaryOrderForm,
      submitSecondaryOrderLoader: false,
    },
  };
};

export const submitSecondaryOrderLoading = (state) => {
  return {
    ...state,

    submitSecondaryOrderLoader: true,
  };
};

export const submitSecondaryOrderLoadingStop = (state, { payload }) => {
  return {
    ...state,
    secondaryOrderForm: {
      ...state.secondaryOrderForm,
      submitSecondaryOrderLoader: false,
    },
  };
};
export const clearSecondaryOrderForm = (state) => ({
  ...state,
  secondaryOrderForm: {},
});

export const clearSecondaryPlaceOrderForm = (state) => ({
  ...state,
  placeSecondaryOrderForm: INITIAL_STATE.placeSecondaryOrderForm,
});

export const fetchRegularOrdersLoading = (state) => ({
  ...state,
  fetchRegularOrdersLoader: true,
});

export const fetchRegularOrdersSuccess = (state, { payload }) => ({
  ...state,
  fetchRegularOrdersLoader: false,
  regularOrders: _.cloneDeep(payload),
});

export const fetchRegularOrdersFailure = (state) => ({
  ...state,
  fetchRegularOrdersLoader: false,
});

export const getPartyOrderLoading = (state) => ({
  ...state,
  getPartyLoader: true,
});

export const getPartyOrderSuccess = (state, { payload }) => ({
  ...state,
  getPartyLoader: false,
  getParty: _.cloneDeep(payload),
});

export const getPartyOrderFailure = (state) => ({
  ...state,
  getPartyLoader: false,
});

export const getGoodReturnLoading = (state) => ({
  ...state,
  goodReturnLoader: true,
});

export const getGoodReturnSuccess = (state, { payload }) => ({
  ...state,
  goodReturnLoader: false,
  goodReturn: _.cloneDeep(payload),
});

export const getGoodReturnFailure = (state) => ({
  ...state,
  goodReturn: [],
  goodReturnLoader: false,
});

export const changeGoodReturnSearchFilters = (state, { payload }) => {
  let updated_distributor_search_filters = _.cloneDeep(state.goodReturnFilters);
  updated_distributor_search_filters[payload.edited_field] =
    payload.edited_value;
  //console.log(payload.edited_field)
  return {
    ...state,

    goodReturnFilters: {
      ...state.goodReturnFilters,
      ...updated_distributor_search_filters,
    },
  };
};

export const showGoodModal = (state, { payload }) => ({
  ...state,
  showGoodModal: true,
});

export const closeGoodModal = (state, { payload }) => ({
  ...state,
  showGoodModal: false,
});

export const changePrimaryGoodForm = (state, { payload }) => {
  let updated_form = _.cloneDeep(state.primaryGoodForm);
  updated_form[payload.edited_field] = payload.edited_value;

  return {
    ...state,
    primaryGoodForm: {
      ...state.primaryGoodForm,
      ...updated_form,
    },
    // orderValidation: {
    //   invalid: false,
    //   invalid_field: "",
    // },
  };
};

export const changePlaceGoodForm = (state, { payload }) => {
  let updated_form = _.cloneDeep(state.placeGoodForm);
  updated_form[payload.edited_field] = payload.edited_value;
  updated_form[payload.edited_field1] = payload.edited_value1;
  return {
    ...state,
    placeGoodForm: {
      ...state.placeGoodForm,
      ...updated_form,
    },
  };
};

export const addPrimaryGoodToCartSuccess = (state, { payload }) => {
  return {
    ...state,
    cart: _.cloneDeep(payload),
  };
};

export const deletePrimaryGoodToCart = (state, { payload }) => {
  return {
    ...state,
    cart: {
      ...state.cart,
      cartItem: state.cart.cartItem.filter(
        (obj) => obj.zx_productname != payload.id.name
      ),
    },
  };
};
export const createPrimaryGoodSuccess = (state, { payload }) => {
  return {
    ...state,
    primaryGoodReturnForm: {
      // ...state.secondaryOrderForm,
      primaryGoodReturnForm: payload,
      // selectedDistributorForm: [],
    },
    primaryGoodReturnFormLoader: false,
    cart: INITIAL_STATE.cart,
    // recordGoodId: payload.primaryGoodReturnForm.data.goodsreturnHeader[0],
  };
};

export const createPrimaryGoodFailure = (state, { payload }) => {
  return {
    ...state,
    primaryGoodReturnForm: {
      ...state.primaryGoodReturnForm,
    },
    primaryGoodReturnFormLoader: false,
  };
};

export const createPrimaryGoodLoading = (state) => {
  return {
    ...state,

    primaryGoodReturnFormLoader: true,
  };
};

export const createPrimaryGoodLoadingStop = (state, { payload }) => {
  return {
    ...state,
    primaryGoodReturnForm: {
      ...state.primaryGoodReturnForm,
    },
    primaryGoodReturnFormLoader: false,
  };
};

export const clearGoodForm = (state) => ({
  ...state,
  primaryGoodForm: {},
});

export const clearPrimaryPlaceGoodForm = (state) => ({
  ...state,
  placeGoodForm: INITIAL_STATE.placeGoodForm,
});

export const clearPrimaryGoodCart = (state, { payload }) => {
  return {
    ...state,
    cart: {
      ...state.cart,
      cartItem: [],
    },
    // cartSecondary: INITIAL_STATE.cartSecondary
  };
};

export const showReturnModal = (state, { payload }) => ({
  ...state,
  showReturnModal: true,
});

export const closeReturnModal = (state, { payload }) => ({
  ...state,
  showReturnModal: false,
});
export const changeSecondaryGoodForm = (state, { payload }) => {
  let updated_form = _.cloneDeep(state.secondaryGoodForm);
  updated_form[payload.edited_field] = payload.edited_value;

  return {
    ...state,
    secondaryGoodForm: {
      ...state.secondaryGoodForm,
      ...updated_form,
    },
    // orderValidation: {
    //   invalid: false,
    //   invalid_field: "",
    // },
  };
};
export const changePlaceReturnForm = (state, { payload }) => {
  let updated_form = _.cloneDeep(state.placeReturnForm);
  updated_form[payload.edited_field] = payload.edited_value;
  updated_form[payload.edited_field1] = payload.edited_value1;
  return {
    ...state,
    placeReturnForm: {
      ...state.placeReturnForm,
      ...updated_form,
    },
  };
};

export const addSecondaryGoodToCartSuccess = (state, { payload }) => {
  return {
    ...state,
    cartReturn: _.cloneDeep(payload),
  };
};

export const deleteSecondaryGoodToCart = (state, { payload }) => {
  return {
    ...state,
    cartReturn: {
      ...state.cartReturn,
      cartItemReturn: state.cartReturn.cartItemReturn.filter(
        (obj) => obj.zx_productname != payload.id.name
      ),
    },
  };
};

export const getSecondaryGoodLoading = (state) => ({
  ...state,
  secondaryGoodLoader: true,
});

export const getSecondaryGoodSuccess = (state, { payload }) => ({
  ...state,
  secondaryGoodLoader: false,
  secondaryGood: _.cloneDeep(payload),
});

export const getSecondaryGoodFailure = (state) => ({
  ...state,
  secondaryGood: [],
  secondaryGoodLoader: false,
});

export const changeGoodSearchFilters = (state, { payload }) => {
  let updated_distributor_search_filters = _.cloneDeep(state.returnFilters);
  updated_distributor_search_filters[payload.edited_field] =
    payload.edited_value;
  //console.log(payload.edited_field)
  return {
    ...state,

    returnFilters: {
      ...state.returnFilters,
      ...updated_distributor_search_filters,
    },
  };
};

export const createSecondaryGoodSuccess = (state, { payload }) => {
  return {
    ...state,
    secondaryGoodReturnForm: {
      // ...state.secondaryOrderForm,
      secondaryGoodReturnForm: payload,
      // selectedDistributorForm: [],
    },
    secondaryGoodReturnFormLoader: false,
    cartReturn: INITIAL_STATE.cartReturn,
    // recordGoodId: payload.primaryGoodReturnForm.data.goodsreturnHeader[0],
  };
};

export const createSecondaryGoodFailure = (state, { payload }) => {
  return {
    ...state,
    secondaryGoodReturnForm: {
      ...state.secondaryGoodReturnForm,
    },
    secondaryGoodReturnFormLoader: false,
  };
};

export const createSecondaryGoodLoading = (state) => {
  return {
    ...state,

    secondaryGoodReturnFormLoader: true,
  };
};

export const createSecondaryGoodLoadingStop = (state, { payload }) => {
  return {
    ...state,
    secondaryGoodReturnForm: {
      ...state.secondaryGoodReturnForm,
    },
    secondaryGoodReturnFormLoader: false,
  };
};

export const clearGoodReturnForm = (state) => ({
  ...state,
  secondaryGoodForm: {},
});

export const clearSecondaryPlaceGoodForm = (state) => ({
  ...state,
  placeReturnForm: INITIAL_STATE.placeReturnForm,
});

export const clearSecondaryGoodCart = (state, { payload }) => {
  return {
    ...state,
    cartReturn: {
      ...state.cartReturn,
      cartItemReturn: [],
    },
    // cartSecondary: INITIAL_STATE.cartSecondary
  };
};
export const resetDateFilter = (state) => ({
  ...state,
  returnFilters: INITIAL_STATE.returnFilters,
  goodReturnFilters: INITIAL_STATE.goodReturnFilters,
  // searchFilters
});

export const reducer = createReducer(INITIAL_STATE, {
  [OrdersTypes.FETCH_ORDER_DETAILS_LOADING]: fetchOrderDetailsLoading,
  [OrdersTypes.FETCH_ORDER_DETAILS_SUCCESS]: fetchOrderDetailsSuccess,
  [OrdersTypes.FETCH_ORDER_DETAILS_FAILURE]: fetchOrderDetailsFailure,
  [OrdersTypes.FETCH_ALL_ORDERS_LOADING]: fetchAllOrdersLoading,
  [OrdersTypes.FETCH_ALL_ORDERS_SUCCESS]: fetchAllOrdersSuccess,
  [OrdersTypes.FETCH_ALL_ORDERS_FAILURE]: fetchAllOrdersFailure,
  [OrdersTypes.DO_NOTHING]: doNothing,
  [OrdersTypes.SELECT_ORDER]: selectOrder,

  //[OrdersTypes.REPEAT_ORDER]               			: repeatOrder,
  [OrdersTypes.REPEAT_ORDER_LOADING]: repeatOrderLoading,
  [OrdersTypes.REPEAT_ORDER_SUCCESS]: repeatOrderSuccess,
  [OrdersTypes.REPEAT_ORDER_FAILURE]: repeatOrderFailure,

  [OrdersTypes.SHOW_MODAL]: showModal,

  [OrdersTypes.CLOSE_MODAL]: closeModal,

  [OrdersTypes.SHOW_MODALS]: showModals,

  [OrdersTypes.CLOSE_MODALS]: closeModals,

  [OrdersTypes.SHOW_TRANSPORT_MODAL]: showTransportModal,

  [OrdersTypes.CLOSE_TRANSPORT_MODAL]: closeTransportModal,

  [OrdersTypes.CHANGE_BRAND_SEARCH_FILTERS]: changeBrandSearchFilters,
  [OrdersTypes.SELECT_DETAIL]: selectDetail,
  [OrdersTypes.SELECT_DETAIL_SUCCESS]: selectDetailSuccess,
  [OrdersTypes.SELECT_TRANSPORT]: selectTransport,
  [OrdersTypes.SELECT_TRANSPORT_SUCCESS]: selectTransportSuccess,

  [OrdersTypes.GET_TRANSPORT_LOADING]: getTransportLoading,
  [OrdersTypes.GET_TRANSPORT_LOADING_STOP]: getTransportLoadingStop,
  [OrdersTypes.GET_TRANSPORT_SUCCESS]: getTransportSuccess,
  [OrdersTypes.GET_TRANSPORT_FAILURE]: getTransportFailure,

  [OrdersTypes.CHANGE_PRIMARY_ORDER_FORM]: changePrimaryOrderForm,
  [OrdersTypes.CHANGE_PRIMARY_GOOD_FORM]: changePrimaryGoodForm,
  [OrdersTypes.CHANGE_SECONDARY_ORDER_FORM]: changeSecondaryOrderForm,
  [OrdersTypes.SUBMIT_PRIMARY_ORDER_SUCCESS]: submitPrimaryOrderSuccess,
  [OrdersTypes.SUBMIT_PRIMARY_ORDER_FAILURE]: submitPrimaryOrderFailure,
  [OrdersTypes.SUBMIT_PRIMARY_ORDER_LOADING]: submitPrimaryOrderLoading,
  [OrdersTypes.SUBMIT_PRIMARY_ORDER_LOADING_STOP]: submitPrimaryOrderLoadingStop,

  [OrdersTypes.SUBMIT_SECONDARY_ORDER_SUCCESS]: submitSecondaryOrderSuccess,
  [OrdersTypes.SUBMIT_SECONDARY_ORDER_FAILURE]: submitSecondaryOrderFailure,
  [OrdersTypes.SUBMIT_SECONDARY_ORDER_LOADING]: submitSecondaryOrderLoading,
  [OrdersTypes.SUBMIT_SECONDARY_ORDER_LOADING_STOP]: submitSecondaryOrderLoadingStop,

  [OrdersTypes.CLEAR_ORDER_FORM]: clearOrderForm,
  [OrdersTypes.CLEAR_GOOD_FORM]: clearGoodForm,
  [OrdersTypes.CLEAR_ORDER_LINE]: clearOrderLine,
  [OrdersTypes.CLEAR_SECONDARY_ORDER_FORM]: clearSecondaryOrderForm,
  [OrdersTypes.CLEAR_PRIMARY_PLACE_GOOD_FORM]: clearPrimaryPlaceGoodForm,
  [OrdersTypes.CLEAR_ORDER_LOCATION]: clearOrderLocation,
  [OrdersTypes.CLEAR_PRIMARY_GOOD_CART]: clearPrimaryGoodCart,
  [OrdersTypes.CLEAR_TRANSPORT]: clearTransport,
  [OrdersTypes.GET_VARIABLE_DISCOUNT_LOADING]: getVariableDiscountLoading,
  [OrdersTypes.GET_VARIABLE_DISCOUNT_LOADING_STOP]: getVariableDiscountLoadingStop,
  [OrdersTypes.GET_VARIABLE_DISCOUNT_SUCCESS]: getVariableDiscountSuccess,
  [OrdersTypes.GET_VARIABLE_DISCOUNT_FAILURE]: getVariableDiscountFailure,
  [OrdersTypes.CHANGE_ORDER_FORM]: changeOrderForm,
  [OrdersTypes.CHANGE_SECONDARY_PLACE_ORDER_FORM]: changeSecondaryPlaceOrderForm,
  [OrdersTypes.CLEAR_PLACE_ORDER_FORM]: clearPlaceOrderForm,
  [OrdersTypes.CLEAR_SECONDARY_PLACE_ORDER_FORM]: clearSecondaryPlaceOrderForm,
  [OrdersTypes.CLEAR_VARIABLE_DISCOUNT]: clearVariableDiscount,

  [OrdersTypes.GET_ORDER_LOCATION_LOADING]: getOrderLocationLoading,
  [OrdersTypes.GET_ORDER_LOCATION_LOADING_STOP]: getOrderLocationLoadingStop,
  [OrdersTypes.GET_ORDER_LOCATION_SUCCESS]: getOrderLocationSuccess,
  [OrdersTypes.GET_ORDER_LOCATION_FAILURE]: getOrderLocationFailure,

  [OrdersTypes.GET_RETAILER_ITEMS]: getRetailerItems,

  [OrdersTypes.ORDER_VALIDATION_FAILED]: orderValidationFailed,
  [OrdersTypes.CHANGE_ORDER_SEARCH_FILTERS]: changeOrderSearchFilters,
  [OrdersTypes.SECONDARY_ORDER_VALIDATION_FAILED]: secondaryOrderValidationFailed,
  [OrdersTypes.GET_ORDER_LINE_LOADING]: getOrderLineLoading,
  [OrdersTypes.GET_ORDER_LINE_LOADING_STOP]: getOrderLineLoadingStop,
  [OrdersTypes.GET_ORDER_LINE_SUCCESS]: getOrderLineSuccess,
  [OrdersTypes.GET_ORDER_LINE_FAILURE]: getOrderLineFailure,
  [OrdersTypes.CHANGE_SECONDARY_BRAND_SEARCH_FILTERS]: changeSecondaryBrandSearchFilters,
  [OrdersTypes.FETCH_SECONDARY_ORDERS_LOADING]: fetchSecondaryOrdersLoading,
  [OrdersTypes.FETCH_SECONDARY_ORDERS_SUCCESS]: fetchSecondaryOrdersSuccess,
  [OrdersTypes.FETCH_SECONDARY_ORDERS_FAILURE]: fetchSecondaryOrdersFailure,
  [OrdersTypes.FETCH_REGULAR_ORDERS_LOADING]: fetchRegularOrdersLoading,
  [OrdersTypes.FETCH_REGULAR_ORDERS_SUCCESS]: fetchRegularOrdersSuccess,
  [OrdersTypes.FETCH_REGULAR_ORDERS_FAILURE]: fetchRegularOrdersFailure,

  [OrdersTypes.GET_PARTY_ORDER_LOADING]: getPartyOrderLoading,
  [OrdersTypes.GET_PARTY_ORDER_SUCCESS]: getPartyOrderSuccess,
  [OrdersTypes.GET_PARTY_ORDER_FAILURE]: getPartyOrderFailure,
  [OrdersTypes.GET_ORDER_COUNT_LOADING]: getOrderCountLoading,
  [OrdersTypes.GET_ORDER_COUNT_SUCCESS]: getOrderCountSuccess,
  [OrdersTypes.GET_ORDER_COUNT_FAILURE]: getOrderCountFailure,
  [OrdersTypes.GET_SECONDARY_COUNT_LOADING]: getSecondaryCountLoading,
  [OrdersTypes.GET_SECONDARY_COUNT_SUCCESS]: getSecondaryCountSuccess,
  [OrdersTypes.GET_SECONDARY_COUNT_FAILURE]: getSecondaryCountFailure,

  [OrdersTypes.GET_GOOD_RETURN_LOADING]: getGoodReturnLoading,
  [OrdersTypes.GET_GOOD_RETURN_SUCCESS]: getGoodReturnSuccess,
  [OrdersTypes.GET_GOOD_RETURN_FAILURE]: getGoodReturnFailure,
  [OrdersTypes.CHANGE_GOOD_RETURN_SEARCH_FILTERS]: changeGoodReturnSearchFilters,

  [OrdersTypes.SHOW_GOOD_MODAL]: showGoodModal,
  [OrdersTypes.CHANGE_PLACE_GOOD_FORM]: changePlaceGoodForm,
  [OrdersTypes.CLOSE_GOOD_MODAL]: closeGoodModal,
  [OrdersTypes.ADD_PRIMARY_GOOD_TO_CART_SUCCESS]: addPrimaryGoodToCartSuccess,
  [OrdersTypes.DELETE_PRIMARY_GOOD_TO_CART]: deletePrimaryGoodToCart,

  [OrdersTypes.CREATE_PRIMARY_GOOD_SUCCESS]: createPrimaryGoodSuccess,
  [OrdersTypes.CREATE_PRIMARY_GOOD_FAILURE]: createPrimaryGoodFailure,
  [OrdersTypes.CREATE_PRIMARY_GOOD_LOADING]: createPrimaryGoodLoading,
  [OrdersTypes.CREATE_PRIMARY_GOOD_LOADING_STOP]: createPrimaryGoodLoadingStop,

  [OrdersTypes.SHOW_RETURN_MODAL]: showReturnModal,
  [OrdersTypes.CLOSE_RETURN_MODAL]: closeReturnModal,
  [OrdersTypes.CHANGE_SECONDARY_GOOD_FORM]: changeSecondaryGoodForm,
  [OrdersTypes.CHANGE_PLACE_RETURN_FORM]: changePlaceReturnForm,
  [OrdersTypes.ADD_SECONDARY_GOOD_TO_CART_SUCCESS]: addSecondaryGoodToCartSuccess,
  [OrdersTypes.DELETE_SECONDARY_GOOD_TO_CART]: deleteSecondaryGoodToCart,

  [OrdersTypes.GET_SECONDARY_GOOD_LOADING]: getSecondaryGoodLoading,
  [OrdersTypes.GET_SECONDARY_GOOD_SUCCESS]: getSecondaryGoodSuccess,
  [OrdersTypes.GET_SECONDARY_GOOD_FAILURE]: getSecondaryGoodFailure,
  [OrdersTypes.CHANGE_GOOD_SEARCH_FILTERS]: changeGoodSearchFilters,

  [OrdersTypes.CREATE_SECONDARY_GOOD_SUCCESS]: createSecondaryGoodSuccess,
  [OrdersTypes.CREATE_SECONDARY_GOOD_FAILURE]: createSecondaryGoodFailure,
  [OrdersTypes.CREATE_SECONDARY_GOOD_LOADING]: createSecondaryGoodLoading,
  [OrdersTypes.CREATE_SECONDARY_GOOD_LOADING_STOP]: createSecondaryGoodLoadingStop,

  [OrdersTypes.CLEAR_SECONDARY_PLACE_GOOD_FORM]: clearSecondaryPlaceGoodForm,
  [OrdersTypes.CLEAR_GOOD_RETURN_FORM]: clearGoodReturnForm,
  [OrdersTypes.CLEAR_SECONDARY_GOOD_CART]: clearSecondaryGoodCart,
  [OrdersTypes.RESET_DATE_FILTER]: resetDateFilter,
});
