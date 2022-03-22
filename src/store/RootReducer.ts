import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { SitesReducer } from "./reducers/SitesReducer";
import { UserReducer } from "./reducers/UserReducer";

export const RootReducer = combineReducers({
  user: UserReducer,
  sites: SitesReducer,
});

export const store = createStore(RootReducer, composeWithDevTools());
