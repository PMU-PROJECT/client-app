class User {
  firstName: string;
  lastName: string;
  email: string;
  employeeInfo: {} | null;
  isAdmin: boolean;
  profilePic: string;
  stamps: [];

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    employeeInfo: {} | null = null,
    isAdmin: boolean = false,
    profilePic: string,
    stamps: [] = []
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.isAdmin = isAdmin;
    this.employeeInfo = employeeInfo;
    this.profilePic = profilePic;
    this.stamps = stamps;
  }
}

export default User;
