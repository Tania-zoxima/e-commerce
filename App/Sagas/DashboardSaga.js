import { dashboardService } from "App/Services/Api/DashboardService";
import { getConnectionStatus } from "App/Stores/Common/Selectors";
import DashboardActions from "App/Stores/Dashboard/Actions";
import { call, put, select } from "redux-saga/effects";
import { HelperService } from "App/Services/Utils/HelperService";

// getOrderValue
// getVisitCount
// getSiteCount
// getCounters
// getEventCount

export function* getOrderValue({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(DashboardActions.doNothing());
    return;
  }

  yield put(DashboardActions.getOrderValueLoading());

  try {
    let successData = yield call(dashboardService.getOrderValue, payload);
    if (successData) {
      yield put(DashboardActions.getOrderValueSuccess(successData));
    } else {
      yield put(DashboardActions.getOrderValueFailure());
    }
  } catch (error) {
    // console.log('Error', error)
    yield put(DashboardActions.getOrderValueFailure());
  }
}

export function* getVisitCount({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(DashboardActions.doNothing());
    return;
  }

  yield put(DashboardActions.getVisitCountLoading());

  try {
    let successData = yield call(dashboardService.getVisitCount, payload);
    if (successData) {
      yield put(DashboardActions.getVisitCountSuccess(successData));
    } else {
      yield put(DashboardActions.getVisitCountFailure());
    }
  } catch (error) {
    // console.log('Error', error)
    yield put(DashboardActions.getVisitCountFailure());
  }
}

export function* getSiteCount({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(DashboardActions.doNothing());
    return;
  }

  yield put(DashboardActions.getSiteCountLoading());

  try {
    let successData = yield call(dashboardService.getSiteCount, payload);
    if (successData) {
      yield put(DashboardActions.getSiteCountSuccess(successData));
    } else {
      yield put(DashboardActions.getSiteCountFailure());
    }
  } catch (error) {
    // console.log('Error', error)
    yield put(DashboardActions.getSiteCountFailure());
  }
}

export function* getCounters({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(DashboardActions.doNothing());
    return;
  }

  yield put(DashboardActions.getCountersLoading());

  try {
    let successData = yield call(dashboardService.getCounters, payload);
    if (successData) {
      yield put(DashboardActions.getCountersSuccess(successData));
    } else {
      yield put(DashboardActions.getCountersFailure());
    }
  } catch (error) {
    // console.log('Error', error)
    yield put(DashboardActions.getCountersFailure());
  }
}

export function* getEventCount({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(DashboardActions.doNothing());
    return;
  }

  yield put(DashboardActions.getEventCountLoading());

  try {
    let successData = yield call(dashboardService.getEventCount, payload);
    if (successData) {
      yield put(DashboardActions.getEventCountSuccess(successData));
    } else {
      yield put(DashboardActions.getEventCountFailure());
    }
  } catch (error) {
    // console.log('Error', error)
    yield put(DashboardActions.getEventCountFailure());
  }
}

export function* getDashboardSummary({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(DashboardActions.doNothing());
    return;
  }

  yield put(DashboardActions.getDashboardSummaryLoading());

  try {
    let successData = yield call(dashboardService.getDashboardSummary, payload);
    if (successData) {
      yield put(DashboardActions.getDashboardSummarySuccess(successData));
    } else {
      console.log("Error", error);
      yield put(DashboardActions.getDashboardSummaryFailure());
    }
  } catch (error) {
    //   console.log('Error', error)
    yield put(DashboardActions.getDashboardSummaryFailure());
  }
}

export function* getDashboardBanner({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(DashboardActions.doNothing());
    return;
  }

  yield put(DashboardActions.getDashboardBannerLoading());

  try {
    let successData = yield call(dashboardService.getDashboardBanner, payload);
    if (successData) {
      yield put(DashboardActions.getDashboardBannerSuccess(successData));
    } else {
      yield put(DashboardActions.getDashboardBannerFailure());
    }
  } catch (error) {
    // console.log('Error', error)
    yield put(DashboardActions.getDashboardBannerFailure());
  }
}

export function* getPrimarySummary({ payload }) {
  console.log("primaryyparamsss", payload);
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(DashboardActions.doNothing());
    return;
  }

  yield put(DashboardActions.getPrimarySummaryLoading());

  try {
    let successData = yield call(dashboardService.getPrimarySummary, payload);
    if (successData) {
      yield put(DashboardActions.getPrimarySummarySuccess(successData));
      yield put(
        DashboardActions.getSecondarySummary({
          id: payload.id,
          fromdate: "2021-11-23",
          todate: "2021-12-03",
        })
      );
    } else {
      yield put(DashboardActions.getPrimarySummaryFailure());
    }
  } catch (error) {
    // console.log('Error', error)
    yield put(DashboardActions.getPrimarySummaryFailure());
  }
}

export function* getTicker({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(DashboardActions.doNothing());
    return;
  }

  yield put(DashboardActions.getTickerLoading());

  try {
    let successData = yield call(dashboardService.getTicker, payload);
    if (successData) {
      yield put(DashboardActions.getTickerSuccess(successData));
    } else {
      yield put(DashboardActions.getTickerFailure());
    }
  } catch (error) {
    // console.log('Error', error)
    yield put(DashboardActions.getTickerFailure());
  }
}

export function* getSecondarySummary({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(DashboardActions.doNothing());
    return;
  }

  yield put(DashboardActions.getSecondarySummaryLoading());

  try {
    let successData = yield call(dashboardService.getSecondarySummary, payload);
    if (successData) {
      yield put(DashboardActions.getSecondarySummarySuccess(successData));
    } else {
      yield put(DashboardActions.getSecondarySummaryFailure());
    }
  } catch (error) {
    // console.log('Error', error)
    yield put(DashboardActions.getSecondarySummaryFailure());
  }
}

export function* getAllBrands({ payload }) {
  //console.log(payload)
  const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
  if (!isOnline) {
    yield put(DashboardActions.doNothing());
    return;
  }
  yield put(DashboardActions.getAllBrandsLoading());
  try {
    let successData = yield call(dashboardService.getAllBrands, payload);
    if (successData) {
      let brandSearchableList = HelperService.convertToBrandSearchableListFormat(
        { list: successData, id_key: "zx_brandsid", label_key: "zx_brandcode" }
      );
      yield put(DashboardActions.getAllBrandsSuccess(brandSearchableList));
      yield put(
        DashboardActions.getAllClass({
          token: payload.token,
          id: payload.id,
        })
      );
    } else {
      yield put(DashboardActions.getAllBrandsFailure());
    }
  } catch (error) {
    console.log("classssseerroorrr", error);
    yield put(DashboardActions.getAllBrandsFailure());
  }
}

export function* getAllClass({ payload }) {
  console.log("payyloadddd", payload);
  const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
  if (!isOnline) {
    yield put(DashboardActions.doNothing());
    return;
  }
  yield put(DashboardActions.getAllClassLoading());
  try {
    let successData = yield call(dashboardService.getAllClass, payload);

    if (successData) {
      let brandSearchableList = HelperService.convertToClassSearchableListFormat(
        {
          list: successData,
          id_key: "zx_itemclassid",
          label_key: "zx_itemclasscode",
        }
      );
      yield put(DashboardActions.getAllClassSuccess(brandSearchableList));
      yield put(
        DashboardActions.getZone({
          token: payload.token,
          id: payload.id,
        })
      );
      // let productSearchableList = HelperService.convertToSearchableListFormat({ list: successData, id_key: 'category_code__c', label_key: 'name' });
      // yield put(DashboardActions.fetchProductsClgetAllProductsClassuccess({successData:successData, productSearchableList : productSearchableList}));
      //yield put(SiteActions.makeProductSearchableList(productSearchableList));
    } else {
      yield put(DashboardActions.getAllClassFailure());
    }
  } catch (error) {
    // console.log("classssseerroorrr", error);
    yield put(DashboardActions.getAllClassFailure());
  }
}

export function* getZone({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(DashboardActions.doNothing());
    return;
  }

  yield put(DashboardActions.getZoneLoading());

  try {
    let successData = yield call(dashboardService.subArea, payload);
    if (successData) {
      let brandSearchableList = HelperService.convertToZoneSearchableListFormat(
        {
          list: successData,
          id_key: "zx_parentzone",
          label_key: "zx_parentzonename",
        }
      );
      let arr = [];
      arr = HelperService.removeDuplicateRecord(brandSearchableList);
      yield put(DashboardActions.getZoneSuccess(arr));
      yield put(
        DashboardActions.getState({
          token: payload.token,
          id: payload.id,
        })
      );
    } else {
      yield put(DashboardActions.getZoneFailure());
    }
  } catch (error) {
    console.log("Error", error);
    yield put(DashboardActions.getZoneFailure());
  }
}

export function* getState({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(DashboardActions.doNothing());
    return;
  }

  yield put(DashboardActions.getStateLoading());

  try {
    let successData = yield call(dashboardService.subArea, payload);
    if (successData) {
      let brandSearchableList = HelperService.convertToStateSearchableListFormat(
        {
          list: successData,
          id_key: "zx_parentstate",
          label_key: "zx_parentstatename",
        }
      );
      let arr = [];
      arr = HelperService.removeDuplicateRecord(brandSearchableList);
      yield put(DashboardActions.getStateSuccess(arr));
      yield put(
        DashboardActions.getSubState({
          token: payload.token,
          id: payload.id,
        })
      );
    } else {
      yield put(DashboardActions.getStateFailure());
    }
  } catch (error) {
    console.log("Error", error);
    yield put(DashboardActions.getStateFailure());
  }
}

export function* getSubState({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(DashboardActions.doNothing());
    return;
  }

  yield put(DashboardActions.getSubStateLoading());

  try {
    let successData = yield call(dashboardService.subArea, payload);
    if (successData) {
      let brandSearchableList = HelperService.convertToSubStateSearchableListFormat(
        {
          list: successData,
          id_key: "zx_parentsubstate",
          label_key: "zx_parentsubstatename",
        }
      );
      let arr = [];
      arr = HelperService.removeDuplicateRecord(brandSearchableList);
      yield put(DashboardActions.getSubStateSuccess(arr));
      yield put(
        DashboardActions.getCity({
          token: payload.token,
          id: payload.id,
        })
      );
    } else {
      yield put(DashboardActions.getSubStateFailure());
    }
  } catch (error) {
    console.log("Error", error);
    yield put(DashboardActions.getSubStateFailure());
  }
}

export function* getCity({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(DashboardActions.doNothing());
    return;
  }

  yield put(DashboardActions.getCityLoading());

  try {
    let successData = yield call(dashboardService.subArea, payload);
    if (successData) {
      let brandSearchableList = HelperService.convertToCitySearchableListFormat(
        {
          list: successData,
          id_key: "zx_parentcity",
          label_key: "zx_parentcityname",
        }
      );
      let arr = [];
      arr = HelperService.removeDuplicateRecord(brandSearchableList);
      yield put(DashboardActions.getCitySuccess(arr));
      yield put(
        DashboardActions.getDistrict({
          token: payload.token,
          id: payload.id,
        })
      );
    } else {
      yield put(DashboardActions.getCityFailure());
    }
  } catch (error) {
    console.log("Error", error);
    yield put(DashboardActions.getCityFailure());
  }
}

export function* getDistrict({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(DashboardActions.doNothing());
    return;
  }

  yield put(DashboardActions.getDistrictLoading());

  try {
    let successData = yield call(dashboardService.subArea, payload);
    if (successData) {
      let brandSearchableList = HelperService.convertToDistrictSearchableListFormat(
        {
          list: successData,
          id_key: "zx_parentdistrict",
          label_key: "zx_parentdistrictname",
        }
      );
      let arr = [];
      arr = HelperService.removeDuplicateRecord(brandSearchableList);
      yield put(DashboardActions.getDistrictSuccess(arr));
      yield put(
        DashboardActions.getArea({
          token: payload.token,
          id: payload.id,
        })
      );
    } else {
      yield put(DashboardActions.getDistrictFailure());
    }
  } catch (error) {
    console.log("Error", error);
    yield put(DashboardActions.getDistrictFailure());
  }
}

export function* getArea({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(DashboardActions.doNothing());
    return;
  }

  yield put(DashboardActions.getAreaLoading());

  try {
    let successData = yield call(dashboardService.subArea, payload);
    if (successData) {
      let brandSearchableList = HelperService.convertToAreaSearchableListFormat(
        {
          list: successData,
          id_key: "Id",
          label_key: "zx_territoryname",
        }
      );
      let arr = [];
      arr = HelperService.removeDuplicateRecord(brandSearchableList);
      yield put(DashboardActions.getAreaSuccess(arr));
    } else {
      yield put(DashboardActions.getAreaFailure());
    }
  } catch (error) {
    console.log("Error", error);
    yield put(DashboardActions.getAreaFailure());
  }
}

export function* dashboardOrderFilter({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(DashboardActions.doNothing());
    return;
  }

  yield put(DashboardActions.dashboardOrderFilterLoading());
  try {
    let successData = yield call(
      dashboardService.dashboardOrderFilter,
      payload
    );
    // console.log("sucessdatataorder", successData);
    if (successData) {
      //Todo : change it to userData
      yield put(DashboardActions.dashboardOrderFilterSuccess(successData));
      //   yield put(DashboardActions.clearOrderForm());
      //   yield put(ProductActions.clearSizeForm());

      //   HelperService.showToast({
      //     message: "Order Placed Successfully.",
      //     duration: 1000,
      //     buttonText: "",
      //   });
    } else {
      yield put(DashboardActions.dashboardOrderFilterFailure());
    }
  } catch (error) {
    yield put(DashboardActions.dashboardOrderFilterFailure());
  }
}

export function* getDrs({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(DashboardActions.doNothing());
    return;
  }

  yield put(DashboardActions.getDrsLoading());

  try {
    let successData = yield call(dashboardService.getDrs, payload);
    if (successData) {
      yield put(DashboardActions.getDrsSuccess(successData));
    } else {
      yield put(DashboardActions.getDrsFailure());
    }
  } catch (error) {
    // console.log('Error', error)
    yield put(DashboardActions.getDrsFailure());
  }
}
