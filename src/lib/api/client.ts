import { z, type ZodType } from "zod";

import { env } from "@/lib/env";
import { ApiClientError, mapStatusToCode } from "@/lib/api/errors";

export interface ApiRequestOptions<TResponse, TBody = unknown> {
  path: string;
  schema: ZodType<TResponse>;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: TBody;
  headers?: HeadersInit;
  accessToken?: string;
  orgId?: string;
  signal?: AbortSignal;
}

interface ApiClientConfig {
  getAccessToken?: () => Promise<string | null>;
  getOrgId?: () => Promise<string | null>;
}

const ensureTrailingSlash = (value: string): string => (value.endsWith("/") ? value : `${value}/`);

const API_BASE = `${ensureTrailingSlash(env.NEXT_PUBLIC_API_URL)}api/v1/`;

const envelopeSchema = <TData>(schema: ZodType<TData>) =>
  z.union([
    z.object({ data: schema }),
    schema,
  ]);

export class ApiClient {
  private readonly getAccessToken?: ApiClientConfig["getAccessToken"];
  private readonly getOrgId?: ApiClientConfig["getOrgId"];

  constructor(config: ApiClientConfig = {}) {
    this.getAccessToken = config.getAccessToken;
    this.getOrgId = config.getOrgId;
  }

  async request<TResponse, TBody = unknown>(options: ApiRequestOptions<TResponse, TBody>): Promise<TResponse> {
    const method = options.method ?? "GET";
    const token = options.accessToken ?? (await this.getAccessToken?.()) ?? null;
    const orgId = options.orgId ?? (await this.getOrgId?.()) ?? null;

    if (!orgId) {
      throw new ApiClientError("Missing org scope.", "FORBIDDEN", 403);
    }

    const headers = new Headers(options.headers);
    headers.set("Content-Type", "application/json");
    headers.set("X-Org-Id", orgId);

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const path = options.path.replace(/^\//, "");
    const response = await fetch(`${API_BASE}${path}`, {
      method,
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
      signal: options.signal,
      cache: "no-store",
      credentials: "include",
    }).catch((error: unknown) => {
      throw new ApiClientError("Network error while reaching API.", "NETWORK", 0, error);
    });

    const text = await response.text();
    const payload = text ? safeJsonParse(text) : null;

    if (!response.ok) {
      const detail = payload && typeof payload === "object" ? payload : undefined;
      throw new ApiClientError(
        `API request failed with status ${response.status}`,
        mapStatusToCode(response.status),
        response.status,
        detail,
      );
    }

    const parsed = envelopeSchema(options.schema).safeParse(payload);
    if (!parsed.success) {
      throw new ApiClientError("API response validation failed.", "VALIDATION", response.status, parsed.error.flatten());
    }

    if ("data" in parsed.data) {
      return parsed.data.data;
    }

    return parsed.data;
  }

  get<TResponse>(path: string, schema: ZodType<TResponse>, options: Omit<ApiRequestOptions<TResponse>, "path" | "schema" | "method"> = {}): Promise<TResponse> {
    return this.request<TResponse>({ ...options, method: "GET", path, schema });
  }

  post<TResponse, TBody>(path: string, schema: ZodType<TResponse>, body: TBody, options: Omit<ApiRequestOptions<TResponse, TBody>, "path" | "schema" | "method" | "body"> = {}): Promise<TResponse> {
    return this.request<TResponse, TBody>({ ...options, method: "POST", path, schema, body });
  }
}

const safeJsonParse = (value: string): unknown => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};
