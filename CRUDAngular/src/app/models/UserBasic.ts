export class UserBasic {
  login: string;
  password: string;
  isActive: boolean;
  isAdmin: boolean;

  constructor(login: string = '', password: string = '', isActive: boolean = false, isAdmin = false){
    this.login = login;
    this.password = password;
    this.isActive = isActive;
    this.isAdmin = isAdmin;
  }
}
