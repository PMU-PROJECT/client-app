import { EligibleRewards, GivenRewards } from "./Rewards";
import { EmployeeInfo, UserInfo } from "./UserInfo";

class User implements UserInfo {
  constructor(
    firstName: string,
    lastName: string,
    email: string,
    employeeInfo: EmployeeInfo | null = null,
    is_admin: boolean = false,
    profile_picture: string,
    stamps: [] = [],
    given_rewards: GivenRewards[] = [],
    eligible_rewards: EligibleRewards[] = []
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.is_admin = is_admin;
    this.employeeInfo = employeeInfo;
    this.profile_picture = profile_picture;
    this.stamps = stamps;
    this.given_rewards = given_rewards;
    this.eligible_rewards = eligible_rewards;
  }
  firstName: string;
  lastName: string;
  email: string;
  employeeInfo: EmployeeInfo | null;
  is_admin: boolean;
  profile_picture: string;
  stamps;
  given_rewards: GivenRewards[];
  eligible_rewards: EligibleRewards[];
}

export default User;
