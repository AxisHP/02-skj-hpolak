const API_ROOT = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5284/api";

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

async function parseBody<T>(response: Response): Promise<T> {
  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();
  if (!text) {
    return undefined as T;
  }

  return JSON.parse(text) as T;
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, headers, ...rest } = options;

  const response = await fetch(`${API_ROOT}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (!response.ok) {
    const errorBody = await parseBody<{ message?: string }>(response).catch(() => ({ message: "" }));
    throw new Error(errorBody?.message || `Request failed with status ${response.status}`);
  }

  return parseBody<T>(response);
}
