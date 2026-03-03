import { redirect } from "next/navigation";

import { getAuthContext } from "@/lib/auth";
import { AppShell } from "@/shared/components/app-shell";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const auth = await getAuthContext();

  if (!auth.userId) {
    redirect("/login");
  }

  return <AppShell role={auth.role} email={auth.email}>{children}</AppShell>;
}
