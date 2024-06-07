"use server";

import { cookies } from "next/headers";

export const handleLogoutAction = async () => {
  cookies()
    .getAll()
    .forEach((cookie) => {
      cookies().delete(cookie.name);
    });
  return true;
};
