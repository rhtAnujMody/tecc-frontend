export const API_BASE_URL =
  "https://5d95-2401-4900-8838-af0c-dc46-64ae-3d8b-22d5.ngrok-free.app/api/";
export const TIMEOUT = 5000;
export const createAPIEndpoint = (path: string) => {
  return `${API_BASE_URL}${path}`;
};

//api urls
export const LOGIN = "v1/auth/jwt/create/";
export const FETCHUSER = "v1/userData/getUserDetails/";
export const SIGNUP = "v1/auth/users/";
