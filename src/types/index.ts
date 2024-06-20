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
  category_name?: string;
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
  sections?: TSection[];
  course_progress?: number;
};

export interface TSection {
  id: string;
  title: string;
  contents: TContent[];
}

export interface TContent {
  id: string;
  section: string;
  video_name?: string;
  video_url?: string;
  order: number;
  is_completed: boolean;
  article_name?: string;
  article_url?: string;
  quiz_name?: string;
  quiz_schema?: TQuizSchema[];
  is_mandatory?: boolean;
  duration: string;
  type: "video" | "article" | "quiz";
}

export interface TQuizSchema {
  correct: string;
  options: string[];
  question: string;
}

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
