"use server";

import { cookies } from "next/headers";

export const handleLogoutAction = async () => {
  if (cookies()) {
    cookies()
      .getAll()
      .forEach((cookie) => {
        cookies().delete(cookie.name);
      });
    return true;
  }

  return false;
};
