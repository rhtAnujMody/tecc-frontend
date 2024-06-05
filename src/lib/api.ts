import { cookies } from "next/headers";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface FetchOptions {
  method: HttpMethod;
  headers?: HeadersInit;
  body?: Record<string, string>;
}

interface FetchResponse<T, E> {
  data?: T | undefined;
  status: number;
  ok: boolean;
  error?: E | string;
}

async function fetchApi<TResponse, TError>(
  url: string,
  options: FetchOptions
): Promise<FetchResponse<TResponse, TError>> {
  const { method, headers, body } = options;
  let authJson = {};
  if (cookies().get("token")) {
    authJson = {
      Authorization: `Bearer ${cookies().get("token")?.value}`,
    };
  }

  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(5000),
      method,
      headers: {
        ...authJson,
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

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
      error: "Something Went Wrong, please try again later",
    };
  }
}

export default fetchApi;
