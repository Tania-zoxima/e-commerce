import { HelperService } from "App/Services/Utils/HelperService";
import { getConnectionStatus } from "App/Stores/Common/Selectors";
import ProductActions from "App/Stores/Products/Actions";
import _ from "lodash";
import { call, put, select } from "redux-saga/effects";
import { productService } from "../Services/Api/ProductService";
import SiteActions from "../Stores/Sites/Actions";
import CommonActions from "App/Stores/Common/Actions";
import VisitsActions from "App/Stores/Visits/Actions";
import OrdersActions from "App/Stores/Orders/Actions";

// fetchAllProducts
// makefilteredProductList
// fetchCategories
// fetchSub Categories
// fetch Sub Sub Categories
// change search filter

// makeCategoryDisplayList
// makeSubCategoryDisplayList
// makeSubSubCategoryDisplayList

export function* getAllProducts({ payload }) {
  const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
  if (!isOnline) {
    yield put(ProductActions.doNothing());
    return;
  }
  yield put(ProductActions.getAllProductsLoading());
  try {
    let user = yield select((state) => state.user);
    const successData = yield call(productService.getAllProducts, payload);

    if (successData) {
      yield put(ProductActions.getAllProductsSuccess(successData));
    } else {
      yield put(ProductActions.getAllProductsFailure());
    }
  } catch (error) {
    yield put(ProductActions.getAllProductsFailure());
  }
}

export function* getProductCount({ payload }) {
  const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
  if (!isOnline) {
    yield put(ProductActions.doNothing());
    return;
  }

  yield put(ProductActions.getProductCountLoading());
  try {
    let successData = yield call(productService.getProductCount, payload);
    if (successData) {
      yield put(ProductActions.getProductCountSuccess(successData));
    } else {
      yield put(ProductActions.getProductCountFailure());
    }
  } catch (error) {
    yield put(ProductActions.getProductCountFailure());
  }
}

export function* getAllProductsBrands({ payload }) {
  //console.log(payload)
  const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
  if (!isOnline) {
    yield put(ProductActions.doNothing());
    return;
  }
  yield put(ProductActions.getAllProductsBrandsLoading());
  try {
    let successData = yield call(productService.getAllProductsBrands, payload);
    if (successData) {
      yield put(ProductActions.getAllProductsBrandsSuccess(successData));
      // let productSearchableList = HelperService.convertToSearchableListFormat({ list: successData, id_key: 'category_code__c', label_key: 'name' });
      // yield put(ProductActions.fetchProductsBrandSuccess({successData:successData, productSearchableList : productSearchableList}));
      //yield put(SiteActions.makeProductSearchableList(productSearchableList));
    } else {
      yield put(ProductActions.getAllProductsBrandsFailure());
    }
  } catch (error) {
    yield put(ProductActions.getAllProductsBrandsFailure());
  }
}

export function* getAllProductsClass({ payload }) {
  const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
  if (!isOnline) {
    yield put(ProductActions.doNothing());
    return;
  }
  yield put(ProductActions.getAllProductsClassLoading());
  try {
    let successData = yield call(productService.getAllProductsClass, payload);

    if (successData) {
      yield put(ProductActions.getAllProductsClassSuccess(successData));
      // let productSearchableList = HelperService.convertToSearchableListFormat({ list: successData, id_key: 'category_code__c', label_key: 'name' });
      // yield put(ProductActions.fetchProductsClgetAllProductsClassuccess({successData:successData, productSearchableList : productSearchableList}));
      //yield put(SiteActions.makeProductSearchableList(productSearchableList));
    } else {
      yield put(ProductActions.getAllProductsClassFailure());
    }
  } catch (error) {
    // console.log("classssseerroorrr", error);
    yield put(ProductActions.getAllProductsClassFailure());
  }
}

export function* fetchSchemes({ payload }) {
  const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
  if (!isOnline) {
    yield put(ProductActions.doNothing());
    return;
  }
  yield put(ProductActions.fetchSchemesLoading());
  try {
    let successData = yield call(productService.fetchSchemes, payload);
    if (successData) {
      yield put(ProductActions.fetchSchemesSuccess(successData));
    } else {
      yield put(ProductActions.fetchSchemesFailure());
    }
  } catch (error) {
    // console.log("Error", error);
    yield put(ProductActions.fetchSchemesFailure());
  }
}

export function* fetchProductCategories({ payload }) {
  const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
  if (!isOnline) {
    yield put(ProductActions.doNothing());
    return;
  }
  yield put(ProductActions.fetchProductCategoriesLoading());
  try {
    let user = yield select((state) => state.user);
    payload.team__c = user.id;
    let successData = yield call(
      productService.fetchProductCategories,
      payload
    );
    if (successData) {
      yield put(ProductActions.fetchProductCategoriesSuccess(successData));
      let productSearchableList = HelperService.convertToSearchableListFormat({
        list: successData,
        id_key: "sfid",
        label_key: "name",
      });
      //yield put(SiteActions.makeProductCategorySearchableList(productSearchableList));

      yield put(ProductActions.makeCategoryDisplayList(successData));
    } else {
      yield put(ProductActions.fetchProductCategoriesFailure());
    }
  } catch (error) {
    // console.log("Error", error);
    yield put(ProductActions.fetchProductCategoriesFailure());
  }
}

export function* fetchProductGsm({ payload }) {
  const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
  if (!isOnline) {
    yield put(ProductActions.doNothing());
    return;
  }
  yield put(ProductActions.fetchProductGsmLoading());
  try {
    let successData = yield call(productService.fetchProductGsm, payload);
    if (successData) {
      yield put(ProductActions.fetchProductGsmSuccess(successData));
      //yield put(ProductActions.makeSubCategoryDisplayList());
    } else {
      yield put(ProductActions.fetchProductGsmFailure());
    }
  } catch (error) {
    // console.log("Error", error);
    yield put(ProductActions.fetchProductGsmFailure());
  }
}

export function* fetchProductItem({ payload }) {
  const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
  if (!isOnline) {
    yield put(ProductActions.doNothing());
    return;
  }
  yield put(ProductActions.fetchProductItemLoading());
  try {
    let successData = yield call(productService.fetchProductItem, payload);
    if (successData) {
      let previousData = yield select(
        (state) => state.products.productItemList
      );
      let packagingSearchList = HelperService.convertToSearchableListFormatLabel(
        { list: successData, id_key: "packaging", label_key: "packaging" }
      );
      let removeDuplicatePackaging = HelperService.removeDuplicateLabel(
        packagingSearchList
      );
      let SizeSearchList = HelperService.convertToSearchableListFormatLabel({
        list: successData,
        id_key: "size",
        label_key: "size",
      });
      let removeDuplicateSize = HelperService.removeDuplicateLabel(
        SizeSearchList
      );
      //let updatedData = previousData.concat(successData)
      let removeDuplicate = HelperService.removeSfidNullitem(successData);
      //console.log(updatedData)

      yield put(
        ProductActions.fetchProductItemSuccess({
          successData: removeDuplicate,
          removeDuplicatePackaging: removeDuplicatePackaging,
          removeDuplicateSize: removeDuplicateSize,
        })
      );
      yield put(CommonActions.closeModal());
      //yield put(ProductActions.makeSubCategoryDisplayList());
    } else {
      yield put(ProductActions.fetchProductItemFailure());
    }
  } catch (error) {
    // console.log("Error", error);
    yield put(ProductActions.fetchProductItemFailure());
  }
}

export function* fetchProductItemPrice({ payload }) {
  const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
  if (!isOnline) {
    yield put(ProductActions.doNothing());
    return;
  }
  yield put(ProductActions.fetchProductItemPriceLoading());
  try {
    let user = yield select((state) => state.user);
    let cart = yield select((state) => state.visits.cart);

    let successData = yield call(productService.fetchProductItemPrice, {
      ...payload,
      token: user.token,
      type: user.user_details.business_channel__c,
    });
    if (successData) {
      //successData.sfid= payload.product_item__c
      let previousData = yield select(
        (state) => state.products.productItemPriceList
      );
      let updatedData = previousData.concat(successData);
      let removeDuplicate = HelperService.removeDuplicateitem(updatedData);

      yield put(ProductActions.fetchProductItemPriceSuccess(removeDuplicate));
      cart.items.map((obj) => {
        if (obj.product_item__c == payload.product_item__c) {
          (obj.number_of_reams__c =
            successData.number_of_reams == "NA"
              ? 0
              : successData.number_of_reams),
            (obj.total_price__c = successData.actual_price),
            (obj.ream_weight__c = successData.ream_weight),
            (obj.number_of_sheets = successData.number_of_sheets);
        }
      });

      yield put(VisitsActions.addItemToCartSuccess(cart));
      //yield put(CommonActions.closeModal());
      //yield put(ProductActions.makeSubCategoryDisplayList());
    } else {
      yield put(ProductActions.fetchProductItemPriceFailure());
    }
  } catch (error) {
    // console.log("Error", error);
    yield put(ProductActions.fetchProductItemPriceFailure());
  }
}

export function* fetchProductSubSubCategories({ payload }) {
  const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
  if (!isOnline) {
    yield put(ProductActions.doNothing());
    return;
  }
  yield put(ProductActions.fetchProductSubSubCategoriesLoading());
  try {
    let successData = yield call(
      productService.fetchProductSubSubCategories,
      payload
    );
    if (successData) {
      let previousData = yield select(
        (state) => state.products.productSubSubCategoryList
      );
      let updatedData = previousData.concat(successData);
      updatedData = _.uniqBy(updatedData, "sfid");
      yield put(
        ProductActions.fetchProductSubSubCategoriesSuccess(updatedData)
      );
      yield put(ProductActions.makeSubSubCategoryDisplayList());
    } else {
      yield put(ProductActions.fetchProductSubSubCategoriesFailure());
    }
  } catch (error) {
    // console.log("Error", error);
    yield put(ProductActions.fetchProductSubSubCategoriesFailure());
  }
}

export function* makeCategoryDisplayList({ payload }) {
  let list = [];
  payload.map((obj) => {
    list.push({
      id: obj.sfid,
      name: obj.name,
    });
  });

  list = HelperService.removeDuplicateProduct(list);

  yield put(ProductActions.makeCategoryDisplayListSuccess(list));
  //yield put(SiteActions.makeProductCategorySearchableList(list));
}

export function* makeSubCategoryDisplayList() {
  let selectedCategories = yield select(
    (state) => state.products.searchFilters["selectedCategories"]
  );
  let allSubCategories = yield select(
    (state) => state.products.productSubCategoryList
  );
  let allCategories = yield select(
    (state) => state.products.productCategoryList
  );
  let list = [];

  selectedCategories.map((catId) => {
    let subList = [];
    allSubCategories.map((obj) => {
      if (obj.product_category__c == catId) {
        subList.push({
          id: obj.sfid,
          name: obj.product_sub_category_name__c,
        });
      }
    });

    if (subList.length) {
      subList.unshift({
        id: catId,
        name: getSelectedCatName({
          list: allCategories,
          id: catId,
          idField: "sfid",
          nameField: "category_name__c",
        }),
        header: true,
      });
    }
    list = list.concat(subList);
    // console.log(list, "DATAS");
  });

  yield put(ProductActions.makeSubCategoryDisplayListSuccess(list));
  yield put(SiteActions.makeProductSubCategorySearchableList(list));
}

export function* makeSubSubCategoryDisplayList() {
  let selectedSubCategories = yield select(
    (state) => state.products.searchFilters["selectedSubCategories"]
  );
  let allSubSubCategories = yield select(
    (state) => state.products.productSubSubCategoryList
  );
  let allSubCategories = yield select(
    (state) => state.products.productSubCategoryList
  );
  let list = [];

  selectedSubCategories.map((catId) => {
    let subList = [];
    allSubSubCategories.map((obj) => {
      if (obj.product_sub_category__c == catId) {
        subList.push({
          id: obj.sfid,
          name: obj.product_sub_sub_category_name__c,
        });
      }
    });

    if (subList.length) {
      subList.unshift({
        id: catId,
        name: getSelectedCatName({
          list: allSubCategories,
          id: catId,
          idField: "sfid",
          nameField: "product_sub_category_name__c",
        }),
        header: true,
      });
    }

    list = list.concat(subList);
  });

  yield put(ProductActions.makeSubSubCategoryDisplayListSuccess(list));
  yield put(SiteActions.makeProductSubSubCategorySearchableList(list));
}

function getSelectedCatName(params) {
  let name = "";
  params.list.map((obj) => {
    if (obj[params.idField] == params.id) {
      name = obj[params.nameField];
    }
  });

  return name;
}

export function* changeDealerDiscount({ payload }) {
  let cart = _.cloneDeep(yield select((state) => state.visits.cart));
  //let dealerDiscount = payload;
  cart.items.map((obj) => {
    if (obj.product_item__c == payload.sfid) {
      obj.additional_discount = payload.additional_discount;
      //obj.net_price= obj.total_price__c*obj.quantity__c -payload.additional_discount*obj.quantity__c,
    }
  });

  yield put(VisitsActions.addItemToCartSuccess(cart));
}

export function* addOrderToCart({ payload }) {
  // console.log("payloaddddbody",payload)
  let cart = yield select((state) => state.products.cart);
  let itemAlreadyPresent = false;
  cart.cartItem = cart.cartItem.map((obj) => {
    if (obj.name == payload.name) {
      // console.log(obj, "Gggyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyh")
      //obj = payload
      (obj.quantity = payload.quantity),
        (obj.total_qty = payload.quantity * payload.upp),
        (obj.total_price = payload.unitprice * obj.total_qty);
      itemAlreadyPresent = true;
    }
    return obj;
  });

  cart.body = cart.body.map((obj) => {
    if (obj.zx_product == payload.id) {
      // console.log(obj, "Gggyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyh")
      //obj = payload
      (obj.zx_noofbagspcs = payload.quantity),
        (obj.zx_qty = payload.quantity * payload.upp),
        (obj.zx_totalamount = payload.unitprice * obj.zx_qty),
        (obj.zx_totaldiscount = (payload.discount / 100) * obj.zx_qty);
      itemAlreadyPresent = true;
    }
    return obj;
  });

  if (!itemAlreadyPresent) {
    cart.cartItem.push(payload);
  }

  yield put(ProductActions.addOrderToCartSuccess(cart));
}

export function* addSecondaryOrderToCart({ payload }) {
  // console.log("payloaddddbody", payload);
  let cartSecondary = yield select((state) => state.products.cartSecondary);
  let itemAlreadyPresent = false;
  cartSecondary.cartItem = cartSecondary.cartItem.map((obj) => {
    if (obj.name == payload.name) {
      //obj = payload
      (obj.quantity = payload.quantity),
        (obj.total_qty = payload.quantity * payload.upp),
        (obj.total_price = payload.unitprice * obj.total_qty);
      if (payload.zx_cgst == "0.0" && payload.zx_sgst == "0.0") {
        obj.zx_totaltax = (obj.total_price * payload.old_igst) / 100;
      } else {
        obj.zx_totaltax =
          (obj.total_price * payload.old_cgst) / 100 +
          (obj.total_price * payload.old_sgst) / 100;
      }
      itemAlreadyPresent = true;
    }
    return obj;
  });

  cartSecondary.body = cartSecondary.body.map((obj) => {
    if (obj.zx_product == payload.id) {
      // console.log(obj, "Gggyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyh")
      //obj = payload
      (obj.zx_noofbagspcs = payload.quantity),
        (obj.zx_qty = payload.quantity * payload.upp),
        (obj.zx_totalamount = payload.unitprice * obj.zx_qty),
        (obj.zx_totaldiscount = (payload.discount / 100) * obj.zx_qty);
      itemAlreadyPresent = true;
    }
    return obj;
  });

  if (!itemAlreadyPresent) {
    cartSecondary.cartItem.push(payload);
  }

  yield put(ProductActions.addSecondaryOrderToCartSuccess(cartSecondary));
}

export function* changeOrderDiscount({ payload }) {
  console.log("payloadddddddiscount", payload);
  let cartSecondary = yield select((state) => state.products.cartSecondary);
  //let dealerDiscount = payload;
  cartSecondary.cartItem = cartSecondary.cartItem.map((obj) => {
    // console.log("showwww",payload.show == false);
    if (payload.show == false) {
      // console.log("kkkkkkkkkkkkk",obj.name == payload.name)
      if (obj.name == payload.name) {
        obj.discount = payload.discount;
      }
    } else if (payload.show == "empty") {
      if (obj.name == payload.name) {
        obj.discount = payload.discount;
      }
    } else {
      obj.discount = payload.discount;
    }
    return obj;
    // if(obj.product_item__c==payload.sfid)
    // {
    // 	obj.additional_discount=payload.additional_discount
    // }
  });

  yield put(ProductActions.addSecondaryOrderToCartSuccess(cartSecondary));
}
