export class User {

  login: string;
  firstName: string;
  lastName: string;
  password: string;
  isActive: boolean;
  isAdmin: boolean;

  constructor(login: string, firstName: string, lastName: string, password: string, isActive: boolean, isAdmin: boolean) {
    this.login = login;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.isActive = isActive;
    this.isAdmin = isAdmin;
  }
}

