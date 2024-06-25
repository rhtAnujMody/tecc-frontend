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
  profile_pic: string | null;
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
  updateUserData: (userData: UserData, callAPI: boolean) => void;
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
  onClick?: (item: TCourse) => void;
  sections?: TSection[];
  course_progress?: number;
  buttonText?: string;
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
  questions: Question[];
  articles?: Articles;
  title?: string;
  quiz_schema?: TQuizSchema[];
  is_mandatory?: boolean;
  duration: string;
  type: "video" | "article" | "quiz";
}

export interface Articles {
  id: string;
  article_name: string;
  article_url: string;
  order: number;
  type: string;
}

export interface Question {
  id: number;
  text: string;
  options: Record<string, string>;
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

export interface TCourseCard {
  thumbnail: string;
  header: string;
  description: string;
}

export interface TDashBoardBanner {
  header: string;
  color: string;
}

export type TQuizDialog = {
  showDialog: boolean;
  id: string;
  questions: Question[];
  title: string;
  isMandatory: boolean;
  closeQuiz: (revalidate: boolean) => void;
};

export type TSubmitAnswer = {
  score: number;
  passed: boolean;
  question_id: number;
  is_correct: boolean;
  correct_answers: string[];
};
