import { cache } from "react";
import { cookies } from "next/headers";

import { resolveRole, type AppRole } from "@/config/roles";
import { isUiOnlyMode, resolveUiOnlyRole } from "@/lib/dev-mode";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export interface AuthContext {
  userId: string | null;
  email: string | null;
  role: AppRole;
  orgId: string | null;
  accessToken: string | null;
}

export const getAuthContext = cache(async (): Promise<AuthContext> => {
  const cookieStore = await cookies();

  if (isUiOnlyMode()) {
    const uiRole = resolveUiOnlyRole(cookieStore.get("ovi-dev-role")?.value ?? null);
    const uiOrgId = cookieStore.get("ovi-org-id")?.value ?? "dev-org";

    return {
      userId: "ui-dev-user",
      email: "ui-dev@local.ovi",
      role: uiRole,
      orgId: uiOrgId,
      accessToken: null,
    };
  }

  const supabase = await createSupabaseServerClient();
  const [{ data: userData }, { data: sessionData }] = await Promise.all([
    supabase.auth.getUser(),
    supabase.auth.getSession(),
  ]);

  const user = userData.user;
  const session = sessionData.session;

  const role = resolveRole(user?.app_metadata?.role ?? user?.user_metadata?.role);
  const orgId =
    (typeof user?.app_metadata?.org_id === "string" && user.app_metadata.org_id) ||
    (typeof user?.user_metadata?.org_id === "string" && user.user_metadata.org_id) ||
    cookieStore.get("ovi-org-id")?.value ||
    null;

  return {
    userId: user?.id ?? null,
    email: user?.email ?? null,
    role,
    orgId,
    accessToken: session?.access_token ?? null,
  };
});
