import { Rewards } from "../../models/Rewards";
import { RewardsActions } from "../actions/RewardsActions";

export interface RewardsState {
  rewards: Rewards;
}

const initialState: RewardsState = {
  rewards: { received_rewards: [], given_rewards: [] },
};

export const SitesReducer = (
  state: RewardsState = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case RewardsActions.SET_REWARDS: {
      return {
        ...state,
        rewards: {
          received_rewards: action.payload.received_rewards,
          given_rewards: action.payload.given_rewards,
        },
      };
    }

    default:
      return state;
  }
};
