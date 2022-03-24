import User from "../../models/User";
import { deleteTable, saveToken } from "../../utils/databaseUtils";
import { UserActions } from "../actions/UserActions";

export interface UserState {
  token: string | null;
  user: User | null;
}

const initialState: UserState = {
  token: null,
  user: null,
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
      } = action.payload.userData;
      const user = new User(
        first_name,
        last_name,
        email,
        employee_info,
        is_admin,
        profile_picture,
        stamps
      );
      // console.log(user);
      return { token: action.payload.token, user };
    }

    case UserActions.LOGOUT: {
      deleteTable();
      return { token: null };
    }

    default:
      return state;
  }
};
