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
import { File } from "buffer";
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

  if (response.ok) {
    cookies().set(TOKEN, response.data?.access ?? "", { httpOnly: true });
    //const userData = getUserData(response.data?.access || "");
  }
  return response;
}

export async function getUserData(token: string) {
  const response = await fetchApi<UserData, ApiError>(
    createAPIEndpoint(FETCHUSER),
    { method: "GET" }
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
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string,
  employeeId: string,
  photoFile: File|null,
) {
  console.log("test0", firstName, photoFile);
  const formData = new FormData();
  formData.append("email", email);
  formData.append("first_name", firstName);
  formData.append("last_name", lastName);
  formData.append("password", password);
  formData.append("re_password", confirmPassword);
  formData.append("username", `${firstName}${lastName}`);
  formData.append("employee_id", employeeId);
  if (photoFile) {
    console.log("formData0",formData,photoFile);
    formData.append("profile_pic", "");
    console.log("formData",formData,photoFile);
    
  }else{
    formData.append("profile_pic", "");
    console.log("formData2",formData);
  }
  console.log("payload",formData);
  
  const response = await fetchApi<UserData, ApiError>(
    createAPIEndpoint(SIGNUP),
    {
      method: "POST",
      body: formData,
    }
  );
  // if (response.ok) {
  //   cookies().set("isLoggedIn", "true", { httpOnly: true });
  //   cookies().set("userData", JSON.stringify(response.data), {
  //     httpOnly: true,
  //   });
  // }
  return response;
}
