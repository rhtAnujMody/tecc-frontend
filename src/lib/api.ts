
import { TOKEN } from "./constants";
import { getLocalData } from "./utils";

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


export const fetchApi = async <TResponse, TError>(
  url: string,
  options: FetchOptions
): Promise<FetchResponse<TResponse, TError>> => {
  const { method, headers = {}, body } = options;

  const token = getLocalData(TOKEN);

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
      ...(body && !(body instanceof FormData) ? { "Content-Type": "application/json" } : {}),
      "ngrok-skip-browser-warning": "true",
    },
    body: body instanceof FormData ? body : JSON.stringify(body),
  };

  try {
    const response = await fetch(url, fetchOptions);
    let data: TResponse | undefined;

    if (response.status === 200 || response.status === 201) {
      data = await response.json();
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
  const res = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getLocalData(TOKEN),
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify(body),
  });
  const data: T = await res.json();
  return data;
};
