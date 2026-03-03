import { z } from "zod";

export const roleSchema = z.enum([
  "SUPERADMIN",
  "ADMIN",
  "MANAGER",
  "ASSISTANT",
  "OWNER",
  "CLEANER",
  "MAINTENANCE",
  "GUEST",
]);

export type AppRole = z.infer<typeof roleSchema>;

export const allRoles: AppRole[] = roleSchema.options;

export const defaultRouteByRole: Record<AppRole, string> = {
  SUPERADMIN: "/dashboard",
  ADMIN: "/dashboard",
  MANAGER: "/dashboard",
  ASSISTANT: "/assistant",
  OWNER: "/owner",
  CLEANER: "/cleaner",
  MAINTENANCE: "/maintenance",
  GUEST: "/today",
};

export const resolveRole = (value: unknown): AppRole => {
  const parsed = roleSchema.safeParse(value);
  return parsed.success ? parsed.data : "GUEST";
};
