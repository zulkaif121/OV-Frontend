import { defaultRouteByRole, resolveRole, type AppRole } from "@/config/roles";

const rawUiOnlyMode = process.env.NEXT_PUBLIC_UI_ONLY_MODE;
const UI_ONLY_MODE_FLAG = rawUiOnlyMode ? rawUiOnlyMode === "true" : true;

export const isUiOnlyMode = (): boolean => process.env.NODE_ENV !== "production" && UI_ONLY_MODE_FLAG;

export const resolveUiOnlyRole = (value: string | null | undefined): AppRole => {
  const fallback = process.env.NEXT_PUBLIC_UI_ONLY_ROLE ?? "SUPERADMIN";
  return resolveRole(value ?? fallback);
};

export const getUiOnlyDefaultRoute = (): string => defaultRouteByRole[resolveUiOnlyRole(null)];
