export type ApiErrorCode =
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "VALIDATION"
  | "SERVER"
  | "NETWORK"
  | "UNKNOWN";

export class ApiClientError extends Error {
  code: ApiErrorCode;
  status: number;
  details?: unknown;

  constructor(message: string, code: ApiErrorCode, status: number, details?: unknown) {
    super(message);
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

export const mapStatusToCode = (status: number): ApiErrorCode => {
  if (status === 401) {
    return "UNAUTHORIZED";
  }
  if (status === 403) {
    return "FORBIDDEN";
  }
  if (status === 404) {
    return "NOT_FOUND";
  }
  if (status === 422 || status === 400) {
    return "VALIDATION";
  }
  if (status >= 500) {
    return "SERVER";
  }
  return "UNKNOWN";
};
