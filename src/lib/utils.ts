import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import imageCompression from 'browser-image-compression';

export const compressImage = async (imageFile: File): Promise<File> => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(imageFile, options);
    return compressedFile;
  } catch (error) {
    console.error('Error compressing image:', error);
    throw error;
  }
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

export const capitalizeFirstChar = (str1?: string) => {
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
  if (localStorage) {
    return localStorage.getItem(key);
  }

  return null;
};

export const deleteLocalData = () => {
  if (typeof localStorage !== 'undefined') {
    localStorage.clear();
  }
};
