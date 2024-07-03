export const API_BASE_URL =
  "https://b574-125-21-77-42.ngrok-free.app/api/";
export const TIMEOUT = 5000;
export const createAPIEndpoint = (path: string) => {
  return `${API_BASE_URL}${path}`;
};

//keys
export const USERDATA = "userData";
export const TOKEN = "token";

//SideBar
export const COURSEDETAILINDEX = 100;

//api urls
export const LOGIN = "v1/auth/jwt/create/";
export const FETCHUSER = "v1/userData/getUserDetails/";
export const SIGNUP = "v1/auth/users/";
export const COURSESBYCATEGORY = "v1/courses/byCategory/";
export const DASHBOARD = "v1/dashboard/getDashboardDetails/";
export const ENROLLED = "v1/enrollCourse/getEnrolledCourse/";
export const PENDING = "v1/enrollCourse/getPendingCourse/";
export const COMPLETED = "v1/enrollCourse/getCompletedCourse/";
export const COURSEDETAIL = "v1/sections/getCourseDetails/";
export const TOGGLEPROGRESS = "v1/progress/markCompleted/";
export const SUBMITANSWER = "v1/quiz/submitQuestionAnswer/";
export const ENROLLCOURSE = "v1/enrollCourse/enroll/";
export const INTERNALCERTIFICATIONSEARNED = "v1/certificate/";
export const EXTERNALCERTIFICATIONSEARNED = "v1/externalCertificate/";
export const KNOWLEDGEBANK = "v1/knowledgeBank/";
export const GETDROPDOWN = "v1/dropdown/?filter=";
export const CASESTUDY = "v1/caseStudy/";

//dashboard items
export const ITEMSPERPAGE = 5;
