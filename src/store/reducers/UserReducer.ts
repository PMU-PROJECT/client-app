import User from "../../models/User";
import { deleteTable, saveToken } from "../../utils/databaseUtils";
import { UserActions } from "../actions/UserActions";

export interface UserState {
  token: string | null;
  user: User | null;
  theme: "dark" | "light";
  language: "bg" | "en";
}

const initialState: UserState = {
  token: null,
  user: null,
  theme: "dark",
  language: "en",
};

export const UserReducer = (
  state: UserState = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case UserActions.LOGIN:
    case UserActions.REGISTER: {
      deleteTable();
      saveToken(action.payload.token);
      const {
        email,
        employee_info,
        first_name,
        is_admin,
        last_name,
        profile_picture,
        stamps,
        given_rewards,
        eligible_rewards,
      } = action.payload.userData;
      const user = new User(
        first_name,
        last_name,
        email,
        employee_info,
        is_admin,
        profile_picture,
        stamps,
        given_rewards,
        eligible_rewards
      );

      return {
        ...state,
        token: action.payload.token,
        user,
      };
    }

    case UserActions.LOGOUT: {
      deleteTable();
      return { ...state, token: null };
    }

    case UserActions.LANGUAGE_CHANGE: {
      return {
        ...state,
        language: action.payload.language,
      };
    }

    case UserActions.THEME_CHANGE: {
      return {
        ...state,
        theme: action.payload.theme,
      };
    }

    default: {
      return state;
    }
  }
};
