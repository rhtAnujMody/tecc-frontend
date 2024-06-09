export const API_BASE_URL =
  "https://f9f7-2401-4900-8839-8a6a-10ff-cdf8-b1a1-7a41.ngrok-free.app/api/";
export const TIMEOUT = 5000;
export const createAPIEndpoint = (path: string) => {
  return `${API_BASE_URL}${path}`;
};

//keys
export const USERDATA = "userData";

//api urls
export const LOGIN = "v1/auth/jwt/create/";
export const FETCHUSER = "v1/userData/getUserDetails/";
export const SIGNUP = "v1/auth/users/";
