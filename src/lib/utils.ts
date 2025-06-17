import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import { Contributor } from "@/types";

export const isFileSizeValid = (file: File, maxSizeMB: number): boolean => {
  const fileSizeInMB = file.size / (1024 * 1024); // size in MB
  return fileSizeInMB <= maxSizeMB;
};

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

export const validateEmployeeId = (employeeID: string) => {
  return /^[rR][0-9]{4}$/.test(employeeID);
};

export const getInitials = (str1: string, str2: string) => {
  return `${str1.charAt(0) + str2.charAt(0)}`;
};

export const capitializeFirstChar = (str1?: string) => {
  if (!str1) {
    return;
  }
  return `${str1.charAt(0).toUpperCase() + str1.slice(1)}`;
};

export const setLocalData = (key: string, data: string) => {
  if (localStorage) {
    localStorage.setItem(key, data);
  }
};

export const getLocalData = (key: string) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }

  return null;
};

export const deleteLocalData = () => {
  if (localStorage) {
    localStorage.clear();
  }
};

export const dateGenerator = (date: dayjs.ConfigType, type: string = "DD-MM-YYYY") => {
  return dayjs(date).format(type);
}

export const formatContributors = (contributors:Contributor[]) => {
  return contributors.map((contributor, index) => {
    const name = `${contributor.first_name} ${contributor.last_name[0]}`;

    return index < contributors.length - 1 ? `${name}, ` : name;
  }).join('');
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp * 1000;
    return Date.now() >= expiry;
  } catch {
    return true;
  }
};