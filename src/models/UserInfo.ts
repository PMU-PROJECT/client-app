import { EligibleRewards, GivenRewards } from "./Rewards";

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  employeeInfo: {
    //   {
    // # Only if user is employee, else null
    //     "added_by": int,
    //     "can_reward": bool,
    //     "email": str,
    //     "first_name": str,
    //     "last_name": str,
    //     "place_id": int,
    //     "profile_picture": str
    // },
  } | null;
  is_admin: boolean;
  profile_picture: string;
  stamps: [];
  // {
  //     "employee_id": int,
  //     "given_on": str,
  //     "place_id": int,
  //     "visitor_id": int
  //   }
  given_rewards: GivenRewards[];
  eligible_rewards: EligibleRewards[];
}
