import { combineReducers } from "redux";
import configureStore from "./CreateStore";
import rootSaga from "App/Sagas";
import { reducer as CommonReducer } from "./Common/Reducers";
import { reducer as network } from "react-native-offline";
import { reducer as UserReducer } from "./User/Reducers";
import { reducer as RetailersReducer } from "./Retailers/Reducers";
import { reducer as EventsReducer } from "./Events/Reducers";
import { reducer as VisitsReducer } from "./Visits/Reducers";
import { reducer as ActionQueuesReducer } from "./ActionQueues/Reducers";
import { reducer as ProductsReducer } from "./Products/Reducers";
import { reducer as OrdersReducer } from "./Orders/Reducers";
import { reducer as DashboardReducer } from "./Dashboard/Reducers";
import { reducer as InfluencerReducer } from "./Influencers/Reducers";
import { reducer as SiteReducer } from "./Sites/Reducers";
import { reducer as LocalReducer } from "./LocalExpense/Reducers";
import { reducer as TourReducer } from "./Tour/Reducers";
import { reducer as OutstationReducer } from "./OutstationExpense/Reducers";
import { reducer as ExpenseReducer } from "./ExpenseItem/Reducers";
import { reducer as DistributorReducer } from "./Distributor/Reducers";
import { reducer as CompetitorReducer } from "./Competitor/Reducers";
import { reducer as ProjectReducer } from "./Project/Reducers";
import { reducer as LeadReducer } from "./Lead/Reducers";

export default () => {
  const appReducer = combineReducers({
    network: network,
    common: CommonReducer,
    user: UserReducer,
    retailers: RetailersReducer,
    visits: VisitsReducer,
    products: ProductsReducer,
    orders: OrdersReducer,
    events: EventsReducer,
    dashboard: DashboardReducer,
    actionQueues: ActionQueuesReducer,
    influencers: InfluencerReducer,
    sites: SiteReducer,
    local: LocalReducer,
    tours: TourReducer,
    outstations: OutstationReducer,
    expenses: ExpenseReducer,
    distributor: DistributorReducer,
    competitor: CompetitorReducer,
    project: ProjectReducer,
    lead: LeadReducer,
  });
  const rootReducer = (state, action) => {
    if (action.type === "USER_LOGOUT_SUCCESS") {
      state = undefined;
    }
    return appReducer(state, action);
  };

  return configureStore(rootReducer, rootSaga);
};
