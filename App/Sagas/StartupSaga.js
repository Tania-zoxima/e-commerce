import { put, select, call } from "redux-saga/effects";
import NavigationService from "App/Services/NavigationService";
import UserActions from "App/Stores/User/Actions";
import RetailersActions from "App/Stores/Retailers/Actions";
import ProductActions from "App/Stores/Products/Actions";
import InfluencerActions from "App/Stores/Influencers/Actions";
import { HelperService } from "App/Services/Utils/HelperService";
import TourAction from "App/Stores/Tour/Actions";
import CommonActions from "App/Stores/Common/Actions";
import { userService } from "App/Services/Api/UserService";

/**
 * The startup saga is the place to define behavior to execute when the application starts.
 */

export function* startup({ params }) {
  let user = yield select((state) => state.user);
  let retailers = yield select((state) => state.retailers);
  let products = yield select((state) => state.products);
  let influencers = yield select((state) => state.influencers);
  let tours = yield select((state) => state.tours);

  const { id, token, startDayTime, endDayTime, absentDayTime } = user;

  const { retailersOffset, retailersLimit } = retailers;

  const {
    productOffset,
    productLimit,
    categoryOffset,
    categoryLimit,
  } = products;

  const { influencerOffset, influencerLimit } = influencers;

  let startedToday = startDayTime ? HelperService.isToday(startDayTime) : false;
  let endedToday = endDayTime ? HelperService.isToday(endDayTime) : false;
  let absentToday = absentDayTime
    ? HelperService.isToday(absentDayTime)
    : false;

  let logged_in = token && id;
  if (logged_in) {
    // if user us already logged in
    if (startedToday) {
      // user has started the day
      NavigationService.navigateAndReset("DashboardScreen");
    } else if (endedToday) {
      // user has ended the day
      NavigationService.navigateAndReset("DashboardScreen");
    } else if (absentToday) {
      // user has ended the day
      NavigationService.navigateAndReset("DashboardScreen");
    } else {
      // user has neither started or ended the day
      NavigationService.navigateAndReset("DashboardScreen");
    }

   

    //fetch user areas if logged in already
    // yield put(UserActions.fetchAllAreas({
    // token,
    // agentid: id
    //  }));

    //fetch user areas if logged in already
    // yield put(UserActions.fetchAgentDetails({
    // token,
    //agentid: id
    //}));
   

    // yield put(
    //   UserActions.getProfile({
    //     id:id,
    //   })
    // );

    //api to check agent attendance details : Todo=> uncomment
    // yield put(
    //   UserActions.checkAttendance({
    //     token,
    //     date: HelperService.getCurrentTimestamp(),
        
    //   })
    // );

    //fetch all PSMs for a agent
    //  yield put(UserActions.fetchAllPsm({
    //  token,
    // agentid: id
    //}));


    //fetch all competitors logged in already 
  //  yield put(RetailersActions.fetchRetailerCompetitors({
  //    token
  //   }));


    //fetch all retailers on startup if logged in already 
    // yield put(RetailersActions.fetchRetailers({
    //   token,
    //   guId: id,
    //   // offset: retailersOffset,
    //   // limit: retailersLimit
    // }));

    //fetch all dealers on startup if logged in already 
   // yield put(RetailersActions.fetchDealers({

   

    
    //  token,
    //  agentid: id,
    //offset: retailersOffset,
    // limit: retailersLimit
    // }));

    // yield put(ProductActions.getAllProducts({
    //   state :"60319e74-60d6-eb11-bacc-000d3af296c9",
    //   id:"64c95549-ced7-eb11-bacb-000d3ac9bbac",
    //   token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhME85RDAwMDAwMWtGazRVQUUiLCJpYXQiOjE2MTM3Mzc5NjF9.55TGMfE5X4DcIWiOtHvcq6mbzkZNQT-aH526mWEDAIc',
     
    // }));

    // yield put(ProductActions.fetchProductCategories({
    // token,
    //agentid: id,
    // offset: categoryOffset,
    //limit: categoryLimit
    //}));

    // yield put(ProductActions.fetchProductSubCategories({
    // token,
    // agentid: id,
    // offset: productOffset,
    // limit: productLimit
    //  }));

    //   yield put(ProductActions.fetchProductSubSubCategories({
    // token,
    // agentid: id,
    // offset: categoryOffset,
    //limit: categoryLimit
    // }));

    // yield put(InfluencerActions.fetchInfluencers({
    //  token,
    //agentid: id,
    // offset: influencerOffset,
    //limit: influencerLimit
    // }));

    //  yield put(TourAction.fetchCities({
    //  token,
    //  agentid: id
    // }))

    // yield put(CommonActions.fetchObjective({ token,})),

    //yield put(CommonActions.fetchState({ token,})),
    //yield put(CommonActions.fetchCity({ token,
    // }))

    //yield put(CommonActions.fetchAllCity({ token,
    //}))

    ///yield put(CommonActions.fetchBeat({ token,}),)

    //yield put(CommonActions.fetchRetailerArea({ token,}),)

    // yield put(CommonActions.fetchDealerType({ token,}),)

    // const appData = yield call(userService.getAppVersion, { token });

    // let android_version = appData ? appData.zx_android : "";

    // appData ? HelperService.checkAppVersion(android_version) : "";
  } else {
    // if user is not logged in
    NavigationService.navigateAndReset("LoginScreen");
  }
}
