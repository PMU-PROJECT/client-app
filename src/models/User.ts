class User {
  firstName: string;
  lastName: string;
  email: string;
  employeeInfo: {
    // {
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
  stamps: []; // {
  //     "employee_id": int,
  //     "given_on": str,
  //     "place_id": int,
  //     "visitor_id": int
  //   }

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    employeeInfo: {} | null = null,
    is_admin: boolean = false,
    profile_picture: string,
    stamps: [] = []
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.is_admin = is_admin;
    this.employeeInfo = employeeInfo;
    this.profile_picture = profile_picture;
    this.stamps = stamps;
  }
}

export default User;
