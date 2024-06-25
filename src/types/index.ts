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
  first_name: string | null;
  last_name: string | null;
  email: string;
  username: string;
  pkid: number;
  credit: number;
  profile_pic : string | null;
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
  desc?: string;
};

export type TCourseHightlights = {
  header: string;
  desc?: string;
  color?: string;
  value: number;
};

export type TCourse = {
  id?: string;
  category?: string;
  title?: string;
  description?: string;
  thumbnail: string;
  credit?: number;
  is_mandatory?: boolean;
  is_certification_course?: boolean;
  certification_course_url?: string;
  is_enrolled?: boolean;
  is_CourseCompleted?: boolean;
  showLectures?: boolean;
  count_of_lectures?: string;
  showCredits?: boolean;
  onClick?: (id: string, name: string, thumbnail: string) => void;
};

export type TDashboard = {
  enrolled_course_count: number;
  pending_course_count: number;
  credits: number;
  mandatory_courses: TCourse[];
  categories: TCategory[];
};

export interface TCategory {
  id: string;
  name: string;
  description: string;
  courses_count: number;
  thumbnail: string;
}

export interface TCourseCard {
  thumbnail: string;
  header: string;
  description: string;
}

export interface TDashBoardBanner {
  header: string;
  left: string;
  right:string;
}
