import { EligibleRewards, GivenRewards } from "./Rewards";

export type UserStamps = {
  employee_id: number;
  given_on: string;
  place_id: number;
  visitor_id: number;
};

export type EmployeeInfo = {
  added_by: number;
  can_reward: boolean;
  email: string;
  first_name: string;
  last_name: string;
  place_id: number;
  profile_picture: string;
};

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  // Only if user is employee, else null
  employeeInfo: EmployeeInfo | null;
  is_admin: boolean;
  profile_picture: string;
  stamps: UserStamps[];
  given_rewards: GivenRewards[];
  eligible_rewards: EligibleRewards[];
}
