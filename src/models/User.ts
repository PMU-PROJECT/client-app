import { EligibleRewards, GivenRewards } from "./Rewards";

class User {
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

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    employeeInfo: {} | null = null,
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
}

export default User;
