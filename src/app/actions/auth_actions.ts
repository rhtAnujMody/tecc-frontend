"use server";
import fetchApi from "@/lib/api";
import {
  FETCHUSER,
  LOGIN,
  SIGNUP,
  TOKEN,
  createAPIEndpoint,
} from "@/lib/constants";
import { ApiError, Tokens, UserData } from "@/types";
import { cookies } from "next/headers";

export async function signInUser(email: string, password: string) {
  const json = {
    email: email,
    password: password,
  };
  const response = await fetchApi<Tokens, ApiError>(createAPIEndpoint(LOGIN), {
    method: "POST",
    body: json,
  });

  return response;
}

export async function getUserData(token: string) {
  const response = await fetchApi<UserData, ApiError>(
    createAPIEndpoint(FETCHUSER),
    { method: "GET", headers:{"Authorization":`Bearer ${token}`} }
  );  

  if (response.ok) {
    cookies().set("isLoggedIn", "true", { httpOnly: true });
    cookies().set("userData", JSON.stringify(response.data), {
      httpOnly: true,
    });
  }
  return response;
}

export async function signUpUser(
  formData: FormData
) {

  const response = await fetchApi<UserData, ApiError>(
    createAPIEndpoint(SIGNUP),
    {
      method: "POST",
      body: formData,
    }
  );
  return response;
}
