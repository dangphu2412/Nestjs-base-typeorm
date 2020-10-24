export interface IUserInfo {
  email: string;
  fullName: string;
  phone: string;
  avatar: string;
}

export interface IUserLoginResponse extends IUserInfo {
  token: string;
}
