export default interface modulesWeOffer {
  header: string;
  logo: string;
  desc: string;
  color: string;
}

export type Tokens = {
  refresh: string;
  access: string;
};

export type ApiError = {
  detail: string;
  code: string;
};

export type UserData = {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  pkid: number;
};
