import { ordersService } from "App/Services/Api/OrdersService";
import { getConnectionStatus } from "App/Stores/Common/Selectors";
import OrdersActions from "App/Stores/Orders/Actions";
import { call, put, select, take } from "redux-saga/effects";
import { HelperService } from "App/Services/Utils/HelperService";
import NavigationService from "App/Services/NavigationService";
import { OrdersTypes } from "App/Stores/Orders/Actions";
import { ValidationService } from "App/Services/ValidationService";
import ProductActions from "App/Stores/Products/Actions";

//fetchOrderDetails
//fetchAllOrders

export function* fetchOrderDetails({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(OrdersActions.doNothing());
    return;
  }

  yield put(OrdersActions.fetchOrderDetailsLoading());
  try {
    let successData = yield call(ordersService.fetchOrderDetails, payload);
    if (successData) {
      yield put(
        OrdersActions.fetchOrderDetailsSuccess({
          id: payload.order_id,
          data: successData,
        })
      );
    } else {
      yield put(OrdersActions.fetchOrderDetailsFailure());
    }
  } catch (error) {
    // console.log('Error', error)
    yield put(OrdersActions.fetchOrderDetailsFailure());
  }
}

export function* fetchDealerOrderDetails({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(OrdersActions.doNothing());
    return;
  }

  yield put(OrdersActions.fetchOrderDetailsLoading());

  try {
    let successData = yield call(
      ordersService.fetchDealerOrderDetails,
      payload
    );
    if (successData) {
      yield put(
        OrdersActions.fetchOrderDetailsSuccess({
          id: payload.order_id,
          data: successData,
        })
      );
    } else {
      yield put(OrdersActions.fetchOrderDetailsFailure());
    }
  } catch (error) {
    // console.log('Error', error)
    yield put(OrdersActions.fetchOrderDetailsFailure());
  }
}

export function* fetchAllOrders({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(OrdersActions.doNothing());
    return;
  }

  yield put(OrdersActions.fetchAllOrdersLoading());

  try {
    let successData = yield call(ordersService.fetchOrders, payload);
    if (successData) {
      yield put(OrdersActions.fetchAllOrdersSuccess(successData));
    } else {
      yield put(OrdersActions.fetchAllOrdersFailure());
    }
  } catch (error) {
    // console.log('Error', error)
    yield put(OrdersActions.fetchAllOrdersFailure());
  }
}

export function* getOrderCount({ payload }) {
  const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
  if (!isOnline) {
    yield put(OrdersActions.doNothing());
    return;
  }

  yield put(OrdersActions.getOrderCountLoading());
  try {
    let successData = yield call(ordersService.getOrderCount, payload);
    if (successData) {
      yield put(OrdersActions.getOrderCountSuccess(successData));
    } else {
      yield put(OrdersActions.getOrderCountFailure());
    }
  } catch (error) {
    yield put(OrdersActions.getOrderCountFailure());
  }
}

export function* repeatOrder({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(OrdersActions.doNothing());
    return;
  }

  yield put(OrdersActions.repeatOrderLoading(payload.order__c));

  try {
    let successData = yield call(ordersService.repeatOrder, payload);
    if (successData) {
      yield put(OrdersActions.repeatOrderSuccess(successData));
      HelperService.showToast({
        message: "Order created Successfully.",
        duration: 1000,
        buttonText: "",
      });
      NavigationService.navigate("ReOrderInfoScreen", {
        id: payload.data.pg_id__c,
        data: payload.data,
      });
    } else {
      yield put(OrdersActions.repeatOrderFailure());
    }
  } catch (error) {
    // console.log('Error', error)
    yield put(OrdersActions.repeatOrderFailure());
  }
}

export function* getTransport({ payload }) {
  const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
  if (!isOnline) {
    yield put(OrdersActions.doNothing());
    return;
  }

  yield put(OrdersActions.getTransportLoading());
  try {
    let successData = yield call(ordersService.getTransport, payload);
    if (successData) {
      yield put(OrdersActions.getTransportSuccess(successData));
    } else {
      yield put(OrdersActions.getTransportFailure());
    }
  } catch (error) {
    yield put(OrdersActions.getTransportFailure());
  }
}
export function* submitPrimaryOrderForm(payload) {
  // console.log("brdddddddddddddd", payload)
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(OrdersActions.doNothing());
    return;
  }

  yield put(OrdersActions.submitPrimaryOrderLoading());
  try {
    let successData = yield call(ordersService.createPrimaryOrder, payload);
    // console.log("sucessdatataorder", successData);
    // let offlinActionData = {
    // 	apiCall: (ordersService.createPrimaryOrder),
    // 	resource: 'createPrimaryOrder',
    // 	callName: 'create',
    // 	params: HelperService.decorateWithLocalId(payload),
    // 	 timestamp: HelperService.getCurrentTimestamp(),
    // 	successCallback: (OrdersActions.submitPrimaryOrderSuccess),
    // 	failureCallback: (OrdersActions.submitPrimaryOrderFailure),
    // 	replaceServerParams: false
    // };

    // const successData = yield call(ordersService.createPrimaryOrder, payload);
    // console.log("amannn", successData)

    if (successData) {
      //Todo : change it to userData
      yield put(OrdersActions.submitPrimaryOrderSuccess(successData));
      yield put(OrdersActions.clearOrderForm());
      yield put(ProductActions.clearSizeForm());
      yield put(OrdersActions.clearTransport());
      HelperService.showToast({
        message: "Order Placed Successfully.",
        duration: 1000,
        buttonText: "",
      });
      NavigationService.navigate("PrimaryOrderSuccess");
      // yield call(refreshVisitsDisplayList);
      //	yield call(refreshVisitsStorageList);
    } else {
      yield put(OrdersActions.submitPrimaryOrderFailure());
      // console.log("eerorrr",error)
      HelperService.showToast({
        message: "Error in Order Placing",
        duration: 2000,
        buttonText: "Okay",
      });
    }
  } catch (error) {
    yield put(OrdersActions.submitPrimaryOrderFailure());
    // console.log("eerorrrppppppp",error)

    HelperService.showToast({
      message: "Error in Order Placing",
      duration: 2000,
      buttonText: "Okay",
    });
  }
}

export function* watchSubmitPrimaryOrder() {
  while (true) {
    const { payload } = yield take(OrdersTypes.SUBMIT_PRIMARY_ORDER_FORM);

    try {
      const validationFailed = yield call(
        ValidationService.orderFormValidation,
        payload.form1
      );
      if (validationFailed) {
        HelperService.showToast({
          message: validationFailed.error_message,
          duration: 2000,
          buttonText: "Okay",
        });
        yield put(OrdersActions.orderValidationFailed(validationFailed));
        continue;
      }
    } catch (err) {}

    yield call(submitPrimaryOrderForm, payload);
  }
}

export function* getVariableDiscount({ payload }) {
  const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
  if (!isOnline) {
    yield put(OrdersActions.doNothing());
    return;
  }
  yield put(OrdersActions.getVariableDiscountLoading());
  try {
    let successData = yield call(ordersService.getVariableDiscount, payload);
    if (successData) {
      // console.log("sucessdataaa",successData)
      let previousData = yield select((state) => state.orders.variableDiscount);
      let updatedData = previousData.concat([
        {
          productname: payload.form.zx_product,
          discount: successData.zx_variablediscount,
          productcode: payload.form.zx_productname,
        },
      ]);
      let removeDuplicate = HelperService.removeDuplicateitem(updatedData);
      yield put(OrdersActions.getVariableDiscountSuccess(removeDuplicate));
    } else {
      // console.log("eeroorrrrr",error)
      yield put(OrdersActions.getVariableDiscountFailure());
    }
  } catch (error) {
    // console.log('Error', error)
    yield put(OrdersActions.getVariableDiscountFailure());
  }
}

export function* getOrderLocation({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(OrdersActions.doNothing());
    return;
  }

  yield put(OrdersActions.getOrderLocationLoading());

  try {
    let successData = yield call(ordersService.getOrderLocation, payload);
    if (successData) {
      console.log("sucesssss", successData);
      yield put(OrdersActions.getOrderLocationSuccess(successData));
      yield put(
        OrdersActions.changeOrderForm({
          edited_field: "location",
          edited_field1: "id",
          edited_value: successData[0].zx_location,
          edited_value1: payload.product_id,
        })
      );
      yield put(
        OrdersActions.changeOrderForm({
          edited_field: "account",
          edited_field1: "id",
          edited_value: successData[0].zx_accounttype,
          edited_value1: payload.product_id,
        })
      );
    } else {
      yield put(OrdersActions.getOrderLocationFailure());
    }
  } catch (error) {
    yield put(OrdersActions.getOrderLocationFailure());
  }
}

export function* getOrderLine({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(OrdersActions.doNothing());
    return;
  }

  yield put(OrdersActions.getOrderLineLoading());

  try {
    let successData = yield call(ordersService.getOrderLine, payload);
    if (successData) {
      yield put(OrdersActions.getOrderLineSuccess(successData));
    } else {
      yield put(OrdersActions.getOrderLineFailure());
    }
  } catch (error) {
    yield put(OrdersActions.getOrderLineFailure());
  }
}
export function* fetchSecondaryOrders({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(OrdersActions.doNothing());
    return;
  }

  yield put(OrdersActions.fetchSecondaryOrdersLoading());

  try {
    let successData = yield call(ordersService.fetchSecondaryOrders, payload);
    if (successData) {
      yield put(OrdersActions.fetchSecondaryOrdersSuccess(successData));
    } else {
      yield put(OrdersActions.fetchSecondaryOrdersFailure());
    }
  } catch (error) {
    // console.log('Error', error)
    yield put(OrdersActions.fetchSecondaryOrdersFailure());
  }
}
export function* getSecondaryCount({ payload }) {
  const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
  if (!isOnline) {
    yield put(OrdersActions.doNothing());
    return;
  }

  yield put(OrdersActions.getSecondaryCountLoading());
  try {
    let successData = yield call(ordersService.getSecondaryCount, payload);
    if (successData) {
      yield put(OrdersActions.getSecondaryCountSuccess(successData));
    } else {
      yield put(OrdersActions.getSecondaryCountFailure());
    }
  } catch (error) {
    yield put(OrdersActions.getSecondaryCountFailure());
  }
}

export function* watchSubmitSecondaryOrder() {
  while (true) {
    const { payload } = yield take(OrdersTypes.SUBMIT_SECONDARY_ORDER_FORM);

    try {
      const validationFailed = yield call(
        ValidationService.secondaryOrderFormValidation,
        payload.form1
      );
      if (validationFailed) {
        HelperService.showToast({
          message: validationFailed.error_message,
          duration: 2000,
          buttonText: "Okay",
        });
        yield put(
          OrdersActions.secondaryOrderValidationFailed(validationFailed)
        );
        continue;
      }
    } catch (err) {}

    yield call(submitSecondaryOrderForm, payload);
  }
}

export function* submitSecondaryOrderForm(payload) {
  // console.log("brdddddddddddddd", payload)
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(OrdersActions.doNothing());
    return;
  }

  yield put(OrdersActions.submitSecondaryOrderLoading());
  try {
    let successData = yield call(ordersService.createSecondaryOrder, payload);
    if (successData) {
      //Todo : change it to userData
      // console.log("sucessdatataorder", successData);
      yield put(OrdersActions.submitSecondaryOrderSuccess(successData));
      yield put(OrdersActions.clearSecondaryOrderForm());
      yield put(ProductActions.clearSecondaryCart());
      HelperService.showToast({
        message: "Order Placed Successfully.",
        duration: 1000,
        buttonText: "",
      });
      NavigationService.navigate("SecondaryOrderSuccess");
    } else {
      yield put(OrdersActions.submitSecondaryOrderFailure());
      // console.log("eerorrr",error)
      HelperService.showToast({
        message: "Error in Order Placing",
        duration: 2000,
        buttonText: "Okay",
      });
    }
  } catch (error) {
    yield put(OrdersActions.submitSecondaryOrderFailure());
    // console.log("eerorrrppppppp",error)

    HelperService.showToast({
      message: "Error in Order Placing",
      duration: 2000,
      buttonText: "Okay",
    });
  }
}

export function* fetchRegularOrders({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(OrdersActions.doNothing());
    return;
  }

  yield put(OrdersActions.fetchRegularOrdersLoading());

  try {
    let successData = yield call(ordersService.fetchRegularOrders, payload);
    if (successData && successData.length) {
      yield put(OrdersActions.fetchRegularOrdersSuccess(successData));
    } else {
      yield put(OrdersActions.fetchRegularOrdersFailure());
    }
  } catch (error) {
    // console.log('Error', error)
    yield put(OrdersActions.fetchRegularOrdersFailure());
  }
}

export function* getPartyOrder({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(OrdersActions.doNothing());
    return;
  }

  yield put(OrdersActions.getPartyOrderLoading());

  try {
    let successData = yield call(ordersService.getParty, payload);
    if (successData) {
      yield put(OrdersActions.getPartyOrderSuccess(successData));
    } else {
      yield put(OrdersActions.getPartyOrderFailure());
    }
  } catch (error) {
    // console.log('Error', error)
    yield put(OrdersActions.getPartyOrderFailure());
  }
}

export function* getGoodReturn({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(OrdersActions.doNothing());
    return;
  }

  yield put(OrdersActions.getGoodReturnLoading());

  try {
    let successData = yield call(ordersService.getGoodReturn, payload);
    if (successData && successData.length) {
      yield put(OrdersActions.getGoodReturnSuccess(successData));
    } else {
      yield put(OrdersActions.getGoodReturnFailure());
    }
  } catch (error) {
    // console.log('Error', error)
    yield put(OrdersActions.getGoodReturnFailure());
  }
}

export function* addPrimaryGoodToCart({ payload }) {
  // console.log("payloaddddbody", payload);
  let cart = yield select((state) => state.orders.cart);
  let itemAlreadyPresent = false;
  cart.cartItem = cart.cartItem.map((obj) => {
    if (obj.zx_productname == payload.name) {
      (obj.zx_returnquantity = payload.quantity), (itemAlreadyPresent = true);
    }
    return obj;
  });

  if (!itemAlreadyPresent) {
    cart.cartItem.push(payload);
  }

  yield put(OrdersActions.addPrimaryGoodToCartSuccess(cart));
}

export function* createPrimaryGood({ payload }) {
  // console.log("brdddddddddddddd", payload)
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(OrdersActions.doNothing());
    return;
  }

  yield put(OrdersActions.createPrimaryGoodLoading());
  try {
    let successData = yield call(ordersService.createPrimaryGood, payload);
    if (successData) {
      //Todo : change it to userData
      // console.log("sucessdatataorder", successData);
      yield put(OrdersActions.createPrimaryGoodSuccess(successData));
      yield put(OrdersActions.clearGoodForm());
      yield put(OrdersActions.clearPrimaryGoodCart());
      HelperService.showToast({
        message: "Return Placed Successfully.",
        duration: 1000,
        buttonText: "",
      });
      NavigationService.navigate("PrimaryGoodSuccess");
    } else {
      yield put(OrdersActions.createPrimaryGoodFailure());
      // console.log("eerorrr",error)
      HelperService.showToast({
        message: "Error in Placing Return",
        duration: 2000,
        buttonText: "Okay",
      });
    }
  } catch (error) {
    yield put(OrdersActions.createPrimaryGoodFailure());
    // console.log("eerorrrppppppp",error)

    HelperService.showToast({
      message: "Error in Placing Return",
      duration: 2000,
      buttonText: "Okay",
    });
  }
}

export function* addSecondaryGoodToCart({ payload }) {
  // console.log("payloaddddbody", payload);
  let cartReturn = yield select((state) => state.orders.cartReturn);
  let itemAlreadyPresent = false;
  cartReturn.cartItemReturn = cartReturn.cartItemReturn.map((obj) => {
    if (obj.zx_productname == payload.name) {
      (obj.zx_returnquantity = payload.quantity), (itemAlreadyPresent = true);
    }
    return obj;
  });

  if (!itemAlreadyPresent) {
    cartReturn.cartItemReturn.push(payload);
  }

  yield put(OrdersActions.addSecondaryGoodToCartSuccess(cartReturn));
}

export function* getSecondaryGood({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(OrdersActions.doNothing());
    return;
  }

  yield put(OrdersActions.getSecondaryGoodLoading());

  try {
    let successData = yield call(ordersService.getSecondaryGood, payload);
    if (successData && successData.length) {
      yield put(OrdersActions.getSecondaryGoodSuccess(successData));
    } else {
      yield put(OrdersActions.getSecondaryGoodFailure());
    }
  } catch (error) {
    // console.log('Error', error)
    yield put(OrdersActions.getSecondaryGoodFailure());
  }
}

export function* createSecondaryGood({ payload }) {
  // console.log("brdddddddddddddd", payload)
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(OrdersActions.doNothing());
    return;
  }

  yield put(OrdersActions.createSecondaryGoodLoading());
  try {
    let successData = yield call(ordersService.createSecondaryGood, payload);
    if (successData) {
      //Todo : change it to userData
      // console.log("sucessdatataorder", successData);
      yield put(OrdersActions.createSecondaryGoodSuccess(successData));
      yield put(OrdersActions.clearGoodReturnForm());
      yield put(OrdersActions.clearSecondaryGoodCart());
      HelperService.showToast({
        message: "Return Placed Successfully.",
        duration: 1000,
        buttonText: "",
      });
      NavigationService.navigate("SecondaryGoodSuccess");
    } else {
      yield put(OrdersActions.createSecondaryGoodFailure());
      // console.log("eerorrr",error)
      HelperService.showToast({
        message: "Error in Placing Return",
        duration: 2000,
        buttonText: "Okay",
      });
    }
  } catch (error) {
    yield put(OrdersActions.createSecondaryGoodFailure());
    // console.log("eerorrrppppppp",error)

    HelperService.showToast({
      message: "Error in Placing Return",
      duration: 2000,
      buttonText: "Okay",
    });
  }
}
