import { StaticImport } from "next/dist/shared/lib/get-img-props";

export default interface ModulesWeOffer {
  header: string;
  desc: string;
  color: {
    top: string;
    botttom: string;
  };
  topColor?: string;
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
  credits: number;
};

export type SideBarItem = {
  header: string;
  isSelected: boolean;
  icon: StaticImport;
};

export interface ISideBar {
  data: SideBarItem[];
  position: number;
  updateSideBar: (newArray: SideBarItem[], newPos: number) => void;
}

export type TSocialHandles = {
  logo: StaticImport;
  link: string;
};

export type TUserContext = {
  user: UserData | undefined;
  updateUserData: (userData: UserData) => void;
};

export type TSectionHeader = {
  header: string;
  desc: string;
};
