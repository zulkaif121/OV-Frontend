import { ApiClient } from "@/lib/api/client";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export const createBrowserApiClient = (): ApiClient => {
  const supabase = createSupabaseBrowserClient();

  return new ApiClient({
    getAccessToken: async () => {
      const { data } = await supabase.auth.getSession();
      return data.session?.access_token ?? null;
    },
    getOrgId: async () => (typeof window !== "undefined" ? window.localStorage.getItem("ovi-org-id") : null),
  });
};
