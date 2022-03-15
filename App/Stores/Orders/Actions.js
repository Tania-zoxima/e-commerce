import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  fetchOrderDetails: ["payload"],
  fetchDealerOrderDetails: ["payload"],
  fetchOrderDetailsLoading: null,
  fetchOrderDetailsSuccess: ["payload"],
  fetchOrderDetailsFailure: null,

  fetchAllOrders: ["payload"],
  fetchAllOrdersLoading: null,
  fetchAllOrdersSuccess: ["payload"],
  fetchAllOrdersFailure: null,
  fetchAllOrdersLoadingStop: null,

  getOrderCount: ["payload"],
  getOrderCountLoading: null,
  getOrderCountSuccess: ["payload"],
  getOrderCountFailure: null,
  getOrderCountLoadingStop: null,

  getSecondaryCount: ["payload"],
  getSecondaryCountLoading: null,
  getSecondaryCountSuccess: ["payload"],
  getSecondaryCountFailure: null,
  getSecondaryCountLoadingStop: null,

  selectOrder: ["payload"],
  doNothing: null,

  repeatOrder: ["payload"],
  repeatOrderLoading: ["payload"],
  repeatOrderSuccess: ["payload"],
  repeatOrderFailure: null,

  showModal: null,
  closeModal: null,

  showModals: null,
  closeModals: null,

  changeBrandSearchFilters: ["payload"],

  selectDetail: ["payload"],
  selectDetailSuccess: ["payload"],
  selectTransport: ["payload"],
  selectTransportSuccess: ["payload"],

  getTransport: ["payload"],
  getTransportSuccess: ["payload"],
  getTransportFailure: ["payload"],
  getTransportLoading: null,
  getTransportLoadingStop: null,

  changePrimaryOrderForm: ["payload"],

  submitPrimaryOrderForm: ["payload"],
  submitPrimaryOrderSuccess: ["payload"],
  submitPrimaryOrderFailure: null,
  submitPrimaryOrderLoading: null,
  submitPrimaryOrderLoadingStop: null,

  changeOrderForm: ["payload"],

  clearOrderForm: null,
  clearPlaceOrderForm: null,
  clearVariableDiscount: null,

  getVariableDiscount: ["payload"],
  getVariableDiscountLoading: null,
  getVariableDiscountSuccess: ["payload"],
  getVariableDiscountFailure: null,
  getVariableDiscountLoadingStop: null,

  getOrderLocation: ["payload"],
  getOrderLocationSuccess: ["payload"],
  getOrderLocationFailure: ["payload"],
  getOrderLocationLoading: null,
  getOrderLocationLoadingStop: null,

  getRetailerItems: ["payload"],

  orderValidationFailed: ["payload"],
  changeOrderSearchFilters: ["payload"],

  getOrderLine: ["payload"],
  getOrderLineSuccess: ["payload"],
  getOrderLineFailure: ["payload"],
  getOrderLineLoading: null,
  getOrderLineLoadingStop: null,
  clearOrderLine: null,
  clearOrderLocation: null,

  changeSecondaryBrandSearchFilters: ["payload"],
  changeSecondaryOrderForm: ["payload"],
  changeSecondaryPlaceOrderForm: ["payload"],

  clearSecondaryOrderForm: null,
  clearSecondaryPlaceOrderForm: null,

  fetchSecondaryOrders: ["payload"],
  fetchSecondaryOrdersLoading: null,
  fetchSecondaryOrdersSuccess: ["payload"],
  fetchSecondaryOrdersFailure: null,
  fetchSecondaryOrdersLoadingStop: null,
  secondaryOrderValidationFailed: ["payload"],

  submitSecondaryOrderForm: ["payload"],
  submitSecondaryOrderSuccess: ["payload"],
  submitSecondaryOrderFailure: null,
  submitSecondaryOrderLoading: null,
  submitSecondaryOrderLoadingStop: null,

  fetchRegularOrders: ["payload"],
  fetchRegularOrdersLoading: null,
  fetchRegularOrdersSuccess: ["payload"],
  fetchRegularOrdersFailure: null,
  fetchRegularOrdersLoadingStop: null,

  showTransportModal: null,
  closeTransportModal: null,
  clearTransport: null,
  getPartyOrder: ["payload"],
  getPartyOrderLoading: null,
  getPartyOrderSuccess: ["payload"],
  getPartyOrderFailure: null,
  getPartyOrderLoadingStop: null,

  getGoodReturn: ["payload"],
  getGoodReturnLoading: null,
  getGoodReturnSuccess: ["payload"],
  getGoodReturnFailure: null,
  getGoodReturnLoadingStop: null,

  changeGoodReturnSearchFilters: ["payload"],

  showGoodModal: null,
  closeGoodModal: null,
  changePrimaryGoodForm: ["payload"],
  changePlaceGoodForm: ["payload"],
  addPrimaryGoodToCart: ["payload"],
  addPrimaryGoodToCartSuccess: ["payload"],
  deletePrimaryGoodToCart: ["payload"],

  createPrimaryGood: ["payload"],
  createPrimaryGoodSuccess: ["payload"],
  createPrimaryGoodFailure: null,
  createPrimaryGoodLoading: null,
  createPrimaryGoodLoadingStop: null,
  clearGoodForm:null,
  clearPrimaryPlaceGoodForm:null,
  clearPrimaryGoodCart:null,
  clearTransport:null,
  showReturnModal: null,
  closeReturnModal: null,
  changeSecondaryGoodForm: ["payload"],
  changePlaceReturnForm: ["payload"],
  addSecondaryGoodToCart: ["payload"],
  addSecondaryGoodToCartSuccess: ["payload"],
  deleteSecondaryGoodToCart: ["payload"],

  getSecondaryGood: ["payload"],
  getSecondaryGoodLoading: null,
  getSecondaryGoodSuccess: ["payload"],
  getSecondaryGoodFailure: null,
  getSecondaryGoodLoadingStop: null,

  changeGoodSearchFilters: ["payload"],

  createSecondaryGood: ["payload"],
  createSecondaryGoodSuccess: ["payload"],
  createSecondaryGoodFailure: null,
  createSecondaryGoodLoading: null,
  createSecondaryGoodLoadingStop: null,

  clearGoodReturnForm:null,
  clearSecondaryPlaceGoodForm:null,
  clearSecondaryGoodCart:null,
  resetDateFilter:null

});

export const OrdersTypes = Types;
export default Creators;
