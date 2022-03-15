import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  getAllProducts: ["payload"],
  getAllProductsSuccess: ["payload"],
  getAllProductsFailure: ["payload"],
  getAllProductsLoading: null,
  getAllProductsLoadingStop: null,

  getProductCount: ["payload"],
  getProductCountSuccess: ["payload"],
  getProductCountFailure: ["payload"],
  getProductCountLoading: null,
  getProductCountLoadingStop: null,

  getAllProductsBrands: ["payload"],
  getAllProductsBrandsSuccess: ["payload"],
  getAllProductsBrandsFailure: ["payload"],
  getAllProductsBrandsLoading: null,
  getAllProductsBrandsLoadingStop: null,

  getAllProductsClass: ["payload"],
  getAllProductsClassSuccess: ["payload"],
  getAllProductsClassFailure: ["payload"],
  getAllProductsClassLoading: null,
  getAllProductsClassLoadingStop: null,

  changeProductBrand: ["payload"],
  changeProductClass: ["payload"],

  fetchProductCategories: ["payload"],
  fetchProductCategoriesSuccess: ["payload"],
  fetchProductCategoriesFailure: ["payload"],
  fetchProductCategoriesLoading: null,
  fetchProductCategoriesLoadingStop: null,

  makeCategoryDisplayList: ["payload"],
  makeSubCategoryDisplayList: ["payload"],
  makeSubSubCategoryDisplayList: ["payload"],

  makeCategoryDisplayListSuccess: ["payload"],
  makeSubCategoryDisplayListSuccess: ["payload"],
  makeSubSubCategoryDisplayListSuccess: ["payload"],

  fetchProductGsm: ["payload"],
  fetchProductGsmSuccess: ["payload"],
  fetchProductGsmFailure: ["payload"],
  fetchProductGsmLoading: null,
  fetchProductGsmLoadingStop: null,

  fetchProductItem: ["payload"],
  fetchProductItemSuccess: ["payload"],
  fetchProductItemFailure: ["payload"],
  fetchProductItemLoading: null,
  fetchProductItemLoadingStop: null,

  fetchProductItemPrice: ["payload"],
  fetchProductItemPriceSuccess: ["payload"],
  fetchProductItemPriceFailure: ["payload"],
  fetchProductItemPriceLoading: null,
  fetchProductItemPriceLoadingStop: null,

  fetchProductSubSubCategories: ["payload"],
  fetchProductSubSubCategoriesSuccess: ["payload"],
  fetchProductSubSubCategoriesFailure: ["payload"],
  fetchProductSubSubCategoriesLoading: null,
  fetchProductSubSubCategoriesLoadingStop: null,

  fetchSchemes: ["payload"],
  fetchSchemesSuccess: ["payload"],
  fetchSchemesFailure: ["payload"],
  fetchSchemesLoading: null,
  fetchSchemesLoadingStop: null,
  changeSchemesSearchFilters: ["payload"],

  changeSearchFilters: ["payload"],
  //changeSearchFiltersSuccess: ['payload'],

  doNothing: null,

  openDealerDiscountEdit: null,
  closeDealerDiscountEdit: null,
  changeDealerDiscount: ["payload"],
  changeDealerDiscountSuccess: ["payload"],

  changeSizeForm: ["payload"],
  clearSizeForm: null,
  clearSecondaryCart: null,

  updateSizeSearchFilters: ["payload"],

  clearProductFilter: null,
  addOrderToCart: ["payload"],
  addOrderToCartSuccess: ["payload"],
  addBodyToCart: ["payload"],
  deleteOrderToCart: ["payload"],
  addSecondaryOrderToCart: ["payload"],
  addSecondaryOrderToCartSuccess: ["payload"],
  addSecondaryBodyToCart: ["payload"],
  deleteSecondaryOrderToCart: ["payload"],
  changeVariable: ['payload'],
  changeOrderDiscount: ['payload'],
  changeOrderDiscountSuccess: ['payload'],

  clearProduct:null,
  clearProductApi:null
});

export const ProductTypes = Types;
export default Creators;
