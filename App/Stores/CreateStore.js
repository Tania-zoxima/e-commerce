import { createNetworkMiddleware } from "react-native-offline";
import { applyMiddleware, compose, createStore } from "redux";
import { createLogger } from "redux-logger";
import { createTransform, persistReducer, persistStore } from "redux-persist";
/**
 * This import defaults to localStorage for web and AsyncStorage for react-native.
 *
 * Keep in mind this storage *is not secure*. Do not use it to store sensitive information
 * (like API tokens, private and sensitive data, etc.).
 *
 * If you need to store sensitive information, use redux-persist-sensitive-storage.
 * @see https://github.com/CodingZeal/redux-persist-sensitive-storage
 */
import createSensitiveStorage from "redux-persist-sensitive-storage";
import FilesystemStorage from "redux-persist-filesystem-storage";
import createSagaMiddleware from "redux-saga";
import { INITIAL_STATE as RETAILER_INITIAL_STATE } from "./Retailers/InitialState";
import { INITIAL_STATE as VISITS_INITIAL_STATE } from "./Visits/InitialState";
import { INITIAL_STATE as DASHBOARD_INITIAL_STATE } from "./Dashboard/InitialState";
import { INITIAL_STATE as USER_INITIAL_STATE } from "./User/InitialState";

const sensitiveStorage = createSensitiveStorage({
  keychainService: "myKeychain",
  sharedPreferencesName: "mySharedPrefs",
});

//example when you change reducer in live app
// const migrations = {
//     0: (state) => {
//         return {
//           ...state,
//             user: {
//               ...state.user,
//                validation : {
//                 invalid_number: false,
//                 invalid_password: false,
//                 error_message:''
//               }
//             }
//         }
//     }
// }

const blacklistPaths = [
  "network",
  "common",
  "distributor",
  "retailers",
  "orders",
  "products",
  "competitor",
  "dashboard",
  "influencers",
  "lead",
  "project",
  "visits",
];
let blacklistTransform = createTransform((inboundState, key) => {
  if (key === "retailers") {
    return {
      ...inboundState,
      retailerSearchFilters: RETAILER_INITIAL_STATE.retailerSearchFilters,
      selectedRetailer: RETAILER_INITIAL_STATE.selectedRetailer,
      selectedDealer: RETAILER_INITIAL_STATE.selectedDealer,
    };
  } else if (key === "visits") {
    return {
      ...inboundState,
      visitsDisplayList: VISITS_INITIAL_STATE.visitsDisplayList,
      filteredDisplayData: VISITS_INITIAL_STATE.filteredDisplayData,
      searchFilters: VISITS_INITIAL_STATE.searchFilters,
      visitsAction: VISITS_INITIAL_STATE.visitsAction,
      editVisit: VISITS_INITIAL_STATE.editVisit,
    };
  } else if (key === "dashboard") {
    return {
      ...inboundState,
      searchFilters: DASHBOARD_INITIAL_STATE.searchFilters,
    };
  } else if (key === "user") {
    return {
      ...inboundState,

      userLoginIsLoading: USER_INITIAL_STATE.userLoginIsLoading,
      userLoginSessionIsLoading: USER_INITIAL_STATE.userLoginSessionIsLoading,
      userLogoutIsLoading: USER_INITIAL_STATE.userLogoutIsLoading,
      userLogoutSessionIsLoading: USER_INITIAL_STATE.userLogoutSessionIsLoading,
    };
  } else {
    return inboundState;
  }
});

const persistConfig = {
  key: "root",
  version: 0,
  storage: FilesystemStorage,
  debug: false,
  //migrate: createMigrate(migrations, { debug: true }),

  /**
   * Blacklist state that we do not need/want to persist
   */
  blacklist: blacklistPaths,
  transforms: [blacklistTransform],
};

export default (rootReducer, rootSaga) => {
  const middleware = [];
  const enhancers = [];

  // Connect the sagas to the redux store
  const sagaMiddleware = createSagaMiddleware();
  const networkMiddleware = createNetworkMiddleware({
    queueReleaseThrottle: 200,
  });

  middleware.push(networkMiddleware);
  middleware.push(sagaMiddleware);

  enhancers.push(applyMiddleware(...middleware, createLogger()));

  // Redux persist
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(persistedReducer, compose(...enhancers));
  const persistor = persistStore(store);

  // Kick off the root saga
  sagaMiddleware.run(rootSaga);

  return { store, persistor };
};
