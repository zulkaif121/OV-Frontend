import { ApiClient } from "@/lib/api/client";
import { getAuthContext } from "@/lib/auth";

export const createServerApiClient = async (): Promise<ApiClient> => {
  const auth = await getAuthContext();

  return new ApiClient({
    getAccessToken: async () => auth.accessToken,
    getOrgId: async () => auth.orgId,
  });
};
