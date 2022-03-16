import { deleteTable, saveToken } from "../../utils/databaseUtils";
import { UserActions } from "../actions/UserActions";

export interface UserState {
  token: string | null;
}

const initialState: UserState = {
  token: null,
};

export const UserReducer = (
  state: UserState = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case UserActions.LOGIN: {
      deleteTable();
      console.log(action.payload.token);
      saveToken(action.payload.token);
      return { token: action.payload.token };
    }

    case UserActions.REGISTER: {
      deleteTable();
      saveToken(action.payload.token);
      return { token: action.payload.token };
    }

    case UserActions.LOGOUT: {
      deleteTable();
      return { token: null };
    }

    default:
      return state;
  }
};
