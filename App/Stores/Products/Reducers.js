/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from "./InitialState";
import { createReducer } from "reduxsauce";
import { ProductTypes } from "./Actions";
import _ from "lodash";

export const getAllProductsSuccess = (state, { payload }) => {
  return {
    ...state,
    productList: payload.productSearchableList,
    ProductList: _.cloneDeep(payload),
    getAllProductsLoader: false,
  };
};

export const getAllProductsFailure = (state, { payload }) => {
  return {
    ...state,
    getAllProductsLoader: false,
    productList: [],
    // ProductList: [],
  };
};

export const getAllProductsLoading = (state) => {
  return {
    ...state,
    getAllProductsLoader: true,
  };
};

export const getAllProductsLoadingStop = (state) => {
  return {
    ...state,
    getAllProductsLoader: false,
  };
};

export const clearProductApi = (state) => ({
  ...state,
  ProductList: [],
  BrandList: [],
  ItemList: [],
});

export const getProductCountSuccess = (state, { payload }) => {
  return {
    ...state,
    count: _.cloneDeep(payload),
    countLoader: false,
  };
};

export const getProductCountFailure = (state, { payload }) => {
  return {
    ...state,
    countLoader: false,
    count: {},
    // ProductList: [],
  };
};

export const getProductCountLoading = (state) => {
  return {
    ...state,
    countLoader: true,
  };
};

export const getProductCountLoadingStop = (state) => {
  return {
    ...state,
    countLoader: false,
  };
};

export const getAllProductsBrandsSuccess = (state, { payload }) => {
  return {
    ...state,
    productBrandList: payload.productSearchableList,
    BrandList: payload,
    getAllProductsBrandsLoader: false,
  };
};

export const getAllProductsBrandsFailure = (state, { payload }) => {
  return {
    ...state,
    getAllProductsBrandsLoader: false,
    productBrandList: [],
    BrandList: [],
  };
};

export const getAllProductsBrandsLoading = (state) => {
  return {
    ...state,
    getAllProductsBrandsLoader: true,
  };
};

export const getAllProductsBrandsLoadingStop = (state) => {
  return {
    ...state,
    getAllProductsBrandsLoader: false,
  };
};

export const getAllProductsClassSuccess = (state, { payload }) => {
  return {
    ...state,
    productClassList: payload.productSearchableList,
    ItemList: payload,
    getAllProductsClassLoader: false,
  };
};

export const getAllProductsClassFailure = (state, { payload }) => {
  return {
    ...state,
    getAllProductsClassLoader: false,
    productClassList: [],
    ItemList: [],
  };
};

export const getAllProductsClassLoading = (state) => {
  return {
    ...state,
    getAllProductsClassLoader: true,
  };
};

export const getAllProductsClassLoadingStop = (state) => {
  return {
    ...state,
    getAllProductsClassLoader: false,
  };
};

export const fetchProductCategoriesSuccess = (state, { payload }) => {
  return {
    ...state,
    productCategoryList: payload,
    fetchCategoryLoader: false,
  };
};

export const fetchProductCategoriesFailure = (state, { payload }) => {
  return {
    ...state,
    fetchCategoryLoader: false,
  };
};

export const fetchProductCategoriesLoading = (state) => {
  return {
    ...state,
    fetchCategoryLoader: true,
  };
};

export const fetchProductCategoriesLoadingStop = (state) => {
  return {
    ...state,
    fetchCategoryLoader: false,
  };
};

export const fetchProductGsmSuccess = (state, { payload }) => {
  return {
    ...state,
    productGsmList: payload,
    fetchGsmLoader: false,
  };
};

export const fetchProductGsmFailure = (state, { payload }) => {
  return {
    ...state,
    fetchGsmLoader: false,
    productGsmList: [],
  };
};

export const fetchProductGsmLoading = (state) => {
  return {
    ...state,
    fetchGsmLoader: true,
  };
};

export const fetchProductGsmLoadingStop = (state) => {
  return {
    ...state,
    fetchGsmLoader: false,
  };
};

export const fetchProductItemSuccess = (state, { payload }) => {
  return {
    ...state,
    productItemList: payload.successData,
    sizeList: payload.removeDuplicateSize,
    packagingList: payload.removeDuplicatePackaging,
    fetchItemLoader: false,
  };
};

export const fetchProductItemFailure = (state, { payload }) => {
  return {
    ...state,
    productItemList: {},
    fetchItemLoader: false,
  };
};

export const fetchProductItemLoading = (state) => {
  return {
    ...state,
    fetchItemLoader: true,
  };
};

export const fetchProductItemLoadingStop = (state) => {
  return {
    ...state,
    fetchItemLoader: false,
  };
};

export const fetchProductSubSubCategoriesSuccess = (state, { payload }) => {
  return {
    ...state,
    productSubSubCategoryList: payload,
    fetchSubSubCategoryLoader: false,
  };
};

export const fetchProductSubSubCategoriesFailure = (state, { payload }) => {
  return {
    ...state,
    fetchSubSubCategoryLoader: false,
  };
};

export const fetchProductSubSubCategoriesLoading = (state) => {
  return {
    ...state,
    fetchSubSubCategoryLoader: true,
  };
};

export const fetchProductSubSubCategoriesLoadingStop = (state) => {
  return {
    ...state,
    fetchSubSubCategoryLoader: false,
  };
};

export const changeSearchFilters = (state, { payload }) => {
  let updated_search_filters = _.cloneDeep(state.searchFilters);
  updated_search_filters[payload.edited_field] = payload.edited_value;

  return {
    ...state,
    searchFilters: {
      ...state.searchFilters,
      ...updated_search_filters,
    },
  };
};

export const doNothing = (state) => ({
  ...state,
});

export const makeCategoryDisplayListSuccess = (state, { payload }) => {
  return {
    ...state,
    productCategoryDisplayList: _.cloneDeep(payload),
  };
};

export const makeSubCategoryDisplayListSuccess = (state, { payload }) => {
  return {
    ...state,
    productSubCategoryDisplayList: _.cloneDeep(payload),
  };
};

export const makeSubSubCategoryDisplayListSuccess = (state, { payload }) => {
  return {
    ...state,
    productSubSubCategoryDisplayList: _.cloneDeep(payload),
  };
};

export const fetchSchemesSuccess = (state, { payload }) => {
  return {
    ...state,
    schemes: payload,
    fetchSchemesLoader: false,
  };
};

export const fetchSchemesFailure = (state, { payload }) => {
  return {
    ...state,
    fetchSchemesLoader: false,
  };
};

export const fetchSchemesLoading = (state) => {
  return {
    ...state,
    fetchSchemesLoader: true,
  };
};

export const fetchSchemesLoadingStop = (state) => {
  return {
    ...state,
    fetchSchemesLoader: false,
  };
};

export const changeSchemesSearchFilters = (state, { payload }) => {
  let updated_search_filters = _.cloneDeep(state.schemesSearchFilters);
  updated_search_filters[payload.edited_field] = payload.edited_value;
  return {
    ...state,
    schemesSearchFilters: {
      ...state.schemesSearchFilters,
      ...updated_search_filters,
    },
  };
};

export const fetchProductItemPriceSuccess = (state, { payload }) => {
  return {
    ...state,
    productItemPriceList: payload,
    fetchItemPriceLoader: false,
  };
};

export const fetchProductItemPriceFailure = (state, { payload }) => {
  return {
    ...state,
    // productItemPriceList: {},
    fetchItemPriceLoader: false,
  };
};

export const fetchProductItemPriceLoading = (state) => {
  return {
    ...state,
    fetchItemPriceLoader: true,
  };
};

export const fetchProductItemPriceLoadingStop = (state) => {
  return {
    ...state,
    fetchItemPriceLoader: false,
  };
};

export const openDealerDiscountEdit = (state) => ({
  ...state,
  editDealerDiscount: true,
});

export const closeDealerDiscountEdit = (state) => ({
  ...state,
  editDealerDiscount: false,
});

export const changeDealerDiscountSuccess = (state, { payload }) => ({
  ...state,
  cart: payload,
});

export const clearProductFilter = (state) => ({
  ...state,
  productGsmList: [],
  productBrandList: [],
  productItemList: [],
  productItemPriceList: [],
  sizeList: [],
  packagingList: [],
  searchFilters: INITIAL_STATE.searchFilters,
  sizeSearchFilters: INITIAL_STATE.sizeSearchFilters,
});

export const clearProduct = (state) => ({
  ...state,
  ProductList: [],
  count: {},
});

export const changeSizeForm = (state, { payload }) => {
  let updated_search_filters = _.cloneDeep(state.productSizeForm);

  updated_search_filters[payload.edited_field] = payload.edited_value.value;

  updated_search_filters[payload.edited_field1] = payload.edited_value.id;
  return {
    ...state,
    productSizeForm: {
      ...state.productSizeForm,
      ...updated_search_filters,
    },
  };
};

export const clearSizeForm = (state, { payload }) => {
  return {
    ...state,
    cart: {
      ...state.cart,
      cartItem: [],
      body: [],
    },
    // cart: INITIAL_STATE.cart
  };
};
export const clearSecondaryCart = (state, { payload }) => {
  return {
    ...state,
    cartSecondary: {
      ...state.cartSecondary,
      cartItem: [],
      body: [],
    },
    // cartSecondary: INITIAL_STATE.cartSecondary
  };
};

export const updateSizeSearchFilters = (state, { payload }) => {
  let updated_search_filters = _.cloneDeep(state.sizeSearchFilters);
  updated_search_filters[payload.edited_field] = payload.edited_value;

  return {
    ...state,
    sizeSearchFilters: {
      ...state.sizeSearchFilters,
      ...updated_search_filters,
    },
  };
};

export const changeProductBrand = (state, { payload }) => {
  return {
    ...state,
    selectProduct: {
      ...state.selectProduct,
      selectedBrand: payload,
    },
  };
};
export const changeProductClass = (state, { payload }) => {
  return {
    ...state,
    selectProduct: {
      ...state.selectProduct,
      selectedClass: payload,
    },
  };
};

export const addOrderToCartSuccess = (state, { payload }) => {
  return {
    ...state,
    cart: _.cloneDeep(payload),
  };
};

export const addBodyToCart = (state, { payload }) => {
  return {
    ...state,
    cart: {
      ...state.cart,
      body: state.cart.body.concat(payload),
    },
  };
};

export const deleteOrderToCart = (state, { payload }) => {
  return {
    ...state,
    cart: {
      ...state.cart,
      cartItem: state.cart.cartItem.filter(
        (obj) => obj.name != payload.id.name
      ),
      body: state.cart.body.filter(
        (obj) => obj.zx_product != payload.id.product_id
      ),
    },
  };
};

export const addSecondaryOrderToCartSuccess = (state, { payload }) => {
  return {
    ...state,
    cartSecondary: _.cloneDeep(payload),
  };
};

export const addSecondaryBodyToCart = (state, { payload }) => {
  return {
    ...state,
    cartSecondary: {
      ...state.cartSecondary,
      body: state.cartSecondary.body.concat(payload),
    },
  };
};

export const deleteSecondaryOrderToCart = (state, { payload }) => {
  return {
    ...state,
    cartSecondary: {
      ...state.cartSecondary,
      cartItem: state.cartSecondary.cartItem.filter(
        (obj) => obj.name != payload.id.name
      ),
      body: state.cartSecondary.body.filter(
        (obj) => obj.zx_product != payload.id.product_id
      ),
    },
  };
};

export const changeOrderDiscountSuccess = (state, { payload }) => ({
  ...state,
  cartSecondary: _.cloneDeep(payload),
});

export const changeVariable = (state, { payload }) => {
  let updated_search_filters = _.cloneDeep(state.variable);
  updated_search_filters[payload.edited_field] = payload.edited_value;
  return {
    ...state,
    variable: {
      ...state.variable,
      ...updated_search_filters,
    },
  };
};

export const reducer = createReducer(INITIAL_STATE, {
  // fetchProducts: ['payload'],
  // [ProductTypes.GET_ALL_PRODUCTS]                       : getAllProducts,
  [ProductTypes.GET_ALL_PRODUCTS_SUCCESS]: getAllProductsSuccess,
  [ProductTypes.GET_ALL_PRODUCTS_FAILURE]: getAllProductsFailure,
  [ProductTypes.GET_ALL_PRODUCTS_LOADING]: getAllProductsLoading,
  [ProductTypes.GET_ALL_PRODUCTS_LOADING_STOP]: getAllProductsLoadingStop,

  [ProductTypes.GET_PRODUCT_COUNT_SUCCESS]: getProductCountSuccess,
  [ProductTypes.GET_PRODUCT_COUNT_FAILURE]: getProductCountFailure,
  [ProductTypes.GET_PRODUCT_COUNT_LOADING]: getProductCountLoading,
  [ProductTypes.GET_PRODUCT_COUNT_LOADING_STOP]: getProductCountLoadingStop,
  // fetchProductsBrand: ['payload'],
  [ProductTypes.GET_ALL_PRODUCTS_BRANDS_SUCCESS]: getAllProductsBrandsSuccess,
  [ProductTypes.GET_ALL_PRODUCTS_BRANDS_FAILURE]: getAllProductsBrandsFailure,
  [ProductTypes.GET_ALL_PRODUCTS_BRANDS_LOADING]: getAllProductsBrandsLoading,
  [ProductTypes.GET_ALL_PRODUCTS_BRANDS_LOADING_STOP]: getAllProductsBrandsLoadingStop,

  [ProductTypes.GET_ALL_PRODUCTS_CLASS_SUCCESS]: getAllProductsClassSuccess,
  [ProductTypes.GET_ALL_PRODUCTS_CLASS_FAILURE]: getAllProductsClassFailure,
  [ProductTypes.GET_ALL_PRODUCTS_CLASS_LOADING]: getAllProductsClassLoading,
  [ProductTypes.GET_ALL_PRODUCTS_CLASS_LOADING_STOP]: getAllProductsClassLoadingStop,

  [ProductTypes.CHANGE_PRODUCT_BRAND]: changeProductBrand,
  [ProductTypes.CHANGE_PRODUCT_CLASS]: changeProductClass,
  [ProductTypes.CHANGE_VARIABLE]: changeVariable,

  // fetchProductCategories: ['payload'],
  [ProductTypes.FETCH_PRODUCT_CATEGORIES_SUCCESS]: fetchProductCategoriesSuccess,
  [ProductTypes.FETCH_PRODUCT_CATEGORIES_FAILURE]: fetchProductCategoriesFailure,
  [ProductTypes.FETCH_PRODUCT_CATEGORIES_LOADING]: fetchProductCategoriesLoading,
  [ProductTypes.FETCH_PRODUCT_CATEGORIES_LOADING_STOP]: fetchProductCategoriesLoadingStop,

  [ProductTypes.UPDATE_SIZE_SEARCH_FILTERS]: updateSizeSearchFilters,

  // fetchProductSubCategories: ['payload'],
  [ProductTypes.FETCH_PRODUCT_GSM_SUCCESS]: fetchProductGsmSuccess,
  [ProductTypes.FETCH_PRODUCT_GSM_FAILURE]: fetchProductGsmFailure,
  [ProductTypes.FETCH_PRODUCT_GSM_LOADING]: fetchProductGsmLoading,
  [ProductTypes.FETCH_PRODUCT_GSM_LOADING_STOP]: fetchProductGsmLoadingStop,

  [ProductTypes.FETCH_PRODUCT_ITEM_SUCCESS]: fetchProductItemSuccess,
  [ProductTypes.FETCH_PRODUCT_ITEM_FAILURE]: fetchProductItemFailure,
  [ProductTypes.FETCH_PRODUCT_ITEM_LOADING]: fetchProductItemLoading,
  [ProductTypes.FETCH_PRODUCT_ITEM_LOADING_STOP]: fetchProductItemLoadingStop,

  // fetchProductSubSubCategories: ['payload'],
  [ProductTypes.FETCH_PRODUCT_SUB_SUB_CATEGORIES_SUCCESS]: fetchProductSubSubCategoriesSuccess,
  [ProductTypes.FETCH_PRODUCT_SUB_SUB_CATEGORIES_FAILURE]: fetchProductSubSubCategoriesFailure,
  [ProductTypes.FETCH_PRODUCT_SUB_SUB_CATEGORIES_LOADING]: fetchProductSubSubCategoriesLoading,
  [ProductTypes.FETCH_PRODUCT_SUB_SUB_CATEGORIES_LOADING_STOP]: fetchProductSubSubCategoriesLoadingStop,
  [ProductTypes.CHANGE_SEARCH_FILTERS]: changeSearchFilters,

  [ProductTypes.MAKE_CATEGORY_DISPLAY_LIST_SUCCESS]: makeCategoryDisplayListSuccess,
  [ProductTypes.MAKE_SUB_CATEGORY_DISPLAY_LIST_SUCCESS]: makeSubCategoryDisplayListSuccess,
  [ProductTypes.MAKE_SUB_SUB_CATEGORY_DISPLAY_LIST_SUCCESS]: makeSubSubCategoryDisplayListSuccess,

  [ProductTypes.FETCH_SCHEMES_SUCCESS]: fetchSchemesSuccess,
  [ProductTypes.FETCH_SCHEMES_FAILURE]: fetchSchemesFailure,
  [ProductTypes.FETCH_SCHEMES_LOADING]: fetchSchemesLoading,
  [ProductTypes.FETCH_SCHEMES_LOADING_STOP]: fetchSchemesLoadingStop,
  [ProductTypes.CHANGE_SCHEMES_SEARCH_FILTERS]: changeSchemesSearchFilters,
  [ProductTypes.DO_NOTHING]: doNothing,

  [ProductTypes.FETCH_PRODUCT_ITEM_PRICE_SUCCESS]: fetchProductItemPriceSuccess,
  [ProductTypes.FETCH_PRODUCT_ITEM_PRICE_FAILURE]: fetchProductItemPriceFailure,
  [ProductTypes.FETCH_PRODUCT_ITEM_PRICE_LOADING]: fetchProductItemPriceLoading,
  [ProductTypes.FETCH_PRODUCT_ITEM_PRICE_LOADING_STOP]: fetchProductItemPriceLoadingStop,

  [ProductTypes.OPEN_DEALER_DISCOUNT_EDIT]: openDealerDiscountEdit,
  [ProductTypes.CLOSE_DEALER_DISCOUNT_EDIT]: closeDealerDiscountEdit,
  [ProductTypes.CHANGE_DEALER_DISCOUNT_SUCCESS]: changeDealerDiscountSuccess,

  [ProductTypes.CLEAR_PRODUCT_FILTER]: clearProductFilter,
  [ProductTypes.CLEAR_PRODUCT]: clearProduct,
  [ProductTypes.CLEAR_PRODUCT_API]: clearProductApi,
  [ProductTypes.CHANGE_SIZE_FORM]: changeSizeForm,
  [ProductTypes.CLEAR_SIZE_FORM]: clearSizeForm,
  [ProductTypes.CLEAR_SECONDARY_CART]: clearSecondaryCart,
  [ProductTypes.ADD_ORDER_TO_CART_SUCCESS]: addOrderToCartSuccess,
  [ProductTypes.ADD_BODY_TO_CART]: addBodyToCart,
  [ProductTypes.DELETE_ORDER_TO_CART]: deleteOrderToCart,

  [ProductTypes.ADD_SECONDARY_ORDER_TO_CART_SUCCESS]: addSecondaryOrderToCartSuccess,
  [ProductTypes.ADD_SECONDARY_BODY_TO_CART]: addSecondaryBodyToCart,
  [ProductTypes.DELETE_SECONDARY_ORDER_TO_CART]: deleteSecondaryOrderToCart,
  [ProductTypes.CHANGE_ORDER_DISCOUNT_SUCCESS]: changeOrderDiscountSuccess,
});
