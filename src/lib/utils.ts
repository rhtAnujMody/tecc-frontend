import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TOKEN } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const checkIsEmpty = (value: string) => {
  if (value && value.length > 0) {
    return false;
  }
  return true;
};

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const getInitials = (str1: string, str2: string) => {
  return `${str1.charAt(0) + str2.charAt(0)}`;
};

export const setLocalData = (key: string, data: string) => {
  localStorage.setItem(key, data);
};

export const getLocalData = (key: string) => {
  if (localStorage) {
    return localStorage.getItem(key);
  }
  return "";
};

export const fetcher = async <T>(url: string) => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getLocalData(TOKEN),
      "ngrok-skip-browser-warning": "true",
    },
  });
  const data: T = await res.json();
  return data;
};
