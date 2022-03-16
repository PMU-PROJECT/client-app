import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { UserReducer } from "./reducers/UserReducer";

export const RootReducer = combineReducers({
  user: UserReducer,
});

export const store = createStore(RootReducer, composeWithDevTools());
