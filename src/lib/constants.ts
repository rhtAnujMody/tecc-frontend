export const API_BASE_URL =
  "https://31b1-2401-4900-883b-f7af-95dc-3033-54b0-e1e0.ngrok-free.app/api/";
export const TIMEOUT = 5000;
export const createAPIEndpoint = (path: string) => {
  return `${API_BASE_URL}${path}`;
};

//keys
export const USERDATA = "userData";
export const TOKEN = "token";

//api urls
export const LOGIN = "v1/auth/jwt/create/";
export const FETCHUSER = "v1/userData/getUserDetails/";
export const SIGNUP = "v1/auth/users/";
export const COURSESBYCATEGORY = "v1/courses/byCategory/";
export const DASHBOARD = "v1/dashboard/getDashboardDetails/";
export const ENROLLED = "v1/dashboard/getDashboardDetails/";

//v1/enrollCourse/getEnrolledCourse/
