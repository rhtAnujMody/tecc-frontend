import { createAPIEndpoint, TOKEN } from "./constants";
import { getLocalData, isTokenExpired, deleteLocalData } from "./utils";
import { handleLogoutAction } from "@/app/actions/logout_actions";
import { toast } from "@/components/ui/use-toast";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface FetchOptions {
  method: HttpMethod;
  headers?: HeadersInit;
  body?: Record<string, string> | FormData;
}

interface FetchResponse<T, E> {
  data?: T | undefined;
  status: number;
  ok: boolean;
  error?: E | string;
}

const handleTokenExpiration = async () => {
  deleteLocalData();
  await handleLogoutAction();
  if (typeof window !== 'undefined') {
    toast({
      title: "Session Expired",
      description: "Your session has expired. Redirecting to intranet website...",
      variant: "destructive",
    });
    await new Promise(resolve => setTimeout(resolve, 5000));
    window.location.href = 'https://intranet.revealhealthtech.com';
  }
};

export const fetchApi = async <TResponse, TError>(
  url: string,
  options: FetchOptions
): Promise<FetchResponse<TResponse, TError>> => {
  const { method, headers = {}, body } = options;

  const token = getLocalData(TOKEN);

  if (token && isTokenExpired(token)) {
    await handleTokenExpiration();
    return {
      status: 401,
      ok: false,
      error: "Token expired" as TError,
    };
  }

  // Construct authorization headers if token is present
  const authHeaders: HeadersInit = {};
  if (token) {
    authHeaders["Authorization"] = `Bearer ${token}`;
  }

  const fetchOptions: RequestInit = {
    method,
    headers: {
      ...authHeaders,
      ...headers,
      ...(body && !(body instanceof FormData)
        ? { "Content-Type": "application/json" }
        : {}),
      "ngrok-skip-browser-warning": "true",
    },
    body: body instanceof FormData ? body : JSON.stringify(body),
  };

  try {
    const endpoint = createAPIEndpoint(url);
    const response = await fetch(endpoint, fetchOptions);
    let data: TResponse | undefined;

    if (response.status === 200 || response.status === 201) {
      data = await response.json();
    } else if (response.status === 403 || response.status === 401) {
      console.log("token expired 404");
      await handleTokenExpiration();
      return {
        status: 401,
        ok: false,
        error: "Unauthorized" as TError,
      };
    } else {
      return {
        status: 0,
        ok: false,
        error: (await response.json()) as TError,
      };
    }

    return {
      data,
      status: response.status,
      ok: response.ok,
    };
  } catch (e) {
    console.log("api error catch", e);
    return {
      status: 0,
      ok: false,
      error: "Something went wrong, please try again later",
    };
  }
};

export const fetcher = async <T>(
  url: string,
  method: "GET" | "POST" = "GET",
  body?: Record<string, string>
) => {
  const token = getLocalData(TOKEN);

  if (token && isTokenExpired(token)) {
    await handleTokenExpiration();
    throw new Error("Token expired");
  }

  const res = await fetch(createAPIEndpoint(url), {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify(body),
  });

  if (res.status === 403 || res.status === 401) {
    await handleTokenExpiration();
    throw new Error("Unauthorized");
  }

  const data: T = await res.json();
  return data;
};
