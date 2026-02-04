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
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function buildErrorMessage(data: unknown): string {
  if (typeof data === "string") return data;

  if (isRecord(data)) {
    const msg = data.message != null ? String(data.message) : "";
    const details =
      data.details != null ? JSON.stringify(data.details, null, 2) : "";
    return [msg, details].filter(Boolean).join("\n");
  }

  return String(data);
}

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
      : options?.body !== undefined
        ? JSON.stringify(options.body)
        : undefined,
  });

  const contentType = res.headers.get("content-type") ?? "";
  const data = contentType.includes("application/json")
    ? await res.json()
    : await res.text();

  if (!res.ok) {
    const message = buildErrorMessage(data);
    throw new ApiError(
      res.status,
      data,
      `API Error (${res.status}): ${message}`,
    );
  }

  return data as T;
}
