import { Site } from "../../models/Site";
import { SitesActions } from "../actions/SitesActions";

export interface SitesState {
  sites: Site[];
}

const initialState: SitesState = {
  sites: [],
};

export const SitesReducer = (
  state: SitesState = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case SitesActions.SET_SITES: {
      return { ...state, sites: action.payload.sites };
    }

    default:
      return state;
  }
};
