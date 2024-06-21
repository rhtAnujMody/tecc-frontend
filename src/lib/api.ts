import { cookies } from 'next/headers';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface FetchOptions {
  method: HttpMethod;
  headers?: HeadersInit;
  body?: Record<string, string> | FormData;
}

interface FetchResponse<T, E> {
  data?: T | undefined  ;
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
  if (cookies().get('token')) {
    authJson = {
      Authorization: `Bearer ${cookies().get('token')?.value}`,
    };
  }
  console.log(url);
  try {
    const fetchOptions: RequestInit = {
      signal: AbortSignal.timeout(5000),
      method,
      headers: {
        ...authJson,
        ...headers,
      },
    };

    // Handle different types of body
    if (body instanceof FormData) {
      fetchOptions.body = body;
    } else if (typeof body === 'object' && body !== null) {
      fetchOptions.headers = {
        ...fetchOptions.headers,
        'Content-Type': 'application/json',
      };
      fetchOptions.body = JSON.stringify(body);
    }

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
      error: 'Something went wrong, please try again later',
    };
  }
}

export default fetchApi;
