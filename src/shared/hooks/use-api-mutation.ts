"use client";

import { useMemo } from "react";
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { ZodType } from "zod";

import { createBrowserApiClient } from "@/lib/api/browser-client";
import type { ApiClientError } from "@/lib/api/errors";

interface UseApiMutationOptions<TData> {
  path: string;
  schema: ZodType<TData>;
  method?: "POST" | "PUT" | "PATCH" | "DELETE";
}

export const useApiMutation = <TData, TBody = unknown>({
  path,
  schema,
  method = "POST",
}: UseApiMutationOptions<TData>): UseMutationResult<TData, ApiClientError, TBody> => {
  const apiClient = useMemo(() => createBrowserApiClient(), []);

  return useMutation<TData, ApiClientError, TBody>({
    mutationFn: (body) =>
      apiClient.request({
        path,
        method,
        schema,
        body,
      }),
  });
};
