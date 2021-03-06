import User from "../../models/User";
import {
  deleteSettingsTable,
  deleteTokenTable,
  saveSettings,
  saveToken,
} from "../../utils/databaseUtils";
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
      deleteTokenTable();
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

    case UserActions.REFRESH_USER_INFO: {
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
      } = action.payload.userInfo;
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
        user,
      };
    }

    case UserActions.LOGOUT: {
      deleteTokenTable();
      return { ...state, user: null, token: null };
    }

    case UserActions.LANGUAGE_CHANGE: {
      deleteSettingsTable();
      saveSettings(action.payload.language, state.theme);
      return {
        ...state,
        language: action.payload.language,
      };
    }

    case UserActions.THEME_CHANGE: {
      deleteSettingsTable();
      saveSettings(state.language, action.payload.theme);
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
