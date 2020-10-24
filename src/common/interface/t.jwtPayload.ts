export interface IUserInfo {
  email: string;
  fullName: string;
  phone: string;
  avatar: string;
  roles: string[];
}

export interface IUserLoginResponse extends IUserInfo {
  token: string;
}
