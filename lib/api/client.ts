type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

export class ApiError extends Error {
  constructor(
    public status: number,
    public data: unknown,
    message = "API Error",
  ) {
    super(message);
  }
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

type ApiOptions = {
  method?: HttpMethod;
  body?: unknown;
  formData?: FormData;
  headers?: Record<string, string>;
};

export async function api<T>(path: string, options?: ApiOptions): Promise<T> {
  const hasForm = Boolean(options?.formData);

  const res = await fetch(`${BASE_URL}${path}`, {
    method: options?.method ?? "GET",
    headers: {
      ...(hasForm ? {} : { "Content-Type": "application/json" }),
      ...(options?.headers ?? {}),
    },
    body: hasForm
      ? options!.formData
      : options?.body
        ? JSON.stringify(options.body)
        : undefined,
  });

  const contentType = res.headers.get("content-type");
  const data = contentType?.includes("application/json")
    ? await res.json()
    : await res.text();

  if (!res.ok) throw new ApiError(res.status, data);

  return data as T;
}
