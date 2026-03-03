"use client";

import { useMemo } from "react";
import { useQuery, type QueryKey, type UseQueryResult } from "@tanstack/react-query";
import type { ZodType } from "zod";

import { createBrowserApiClient } from "@/lib/api/browser-client";
import type { ApiClientError } from "@/lib/api/errors";

interface UseApiQueryOptions<TData> {
  queryKey: QueryKey;
  path: string;
  schema: ZodType<TData>;
  enabled?: boolean;
}

export const useApiQuery = <TData>({ queryKey, path, schema, enabled = true }: UseApiQueryOptions<TData>): UseQueryResult<TData, ApiClientError> => {
  const apiClient = useMemo(() => createBrowserApiClient(), []);

  return useQuery<TData, ApiClientError>({
    queryKey,
    queryFn: () => apiClient.get(path, schema),
    enabled,
  });
};
