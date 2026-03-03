import type { AppRole } from "@/config/roles";

interface RouteAccessRule {
  prefix: string;
  roles: AppRole[];
}

export const routeAccessRules: RouteAccessRule[] = [
  { prefix: "/dashboard", roles: ["SUPERADMIN", "ADMIN", "MANAGER"] },
  { prefix: "/today", roles: ["SUPERADMIN", "ADMIN", "MANAGER", "ASSISTANT", "GUEST"] },
  { prefix: "/tasks", roles: ["SUPERADMIN", "ADMIN", "MANAGER", "ASSISTANT", "CLEANER", "MAINTENANCE"] },
  { prefix: "/inbox", roles: ["SUPERADMIN", "ADMIN", "MANAGER", "ASSISTANT"] },
  { prefix: "/properties", roles: ["SUPERADMIN", "ADMIN", "MANAGER"] },
  { prefix: "/vendors", roles: ["SUPERADMIN", "ADMIN", "MANAGER"] },
  { prefix: "/signals", roles: ["SUPERADMIN", "ADMIN", "MANAGER"] },
  { prefix: "/vendor-triage", roles: ["SUPERADMIN", "ADMIN", "MANAGER"] },
  { prefix: "/calendar", roles: ["SUPERADMIN", "ADMIN", "MANAGER"] },
  { prefix: "/money", roles: ["SUPERADMIN", "ADMIN"] },
  { prefix: "/reports", roles: ["SUPERADMIN", "ADMIN", "MANAGER", "OWNER"] },
  { prefix: "/tracker", roles: ["SUPERADMIN", "ADMIN", "MANAGER"] },
  { prefix: "/wiki", roles: ["SUPERADMIN", "ADMIN", "MANAGER"] },
  { prefix: "/guidebooks", roles: ["SUPERADMIN", "ADMIN", "MANAGER"] },
  { prefix: "/supplies", roles: ["SUPERADMIN", "ADMIN", "MANAGER"] },
  { prefix: "/marketplace", roles: ["SUPERADMIN", "ADMIN", "MANAGER"] },
  { prefix: "/ai-copilot", roles: ["SUPERADMIN", "ADMIN", "MANAGER"] },
  { prefix: "/workflows", roles: ["SUPERADMIN", "ADMIN"] },
  { prefix: "/integrations", roles: ["SUPERADMIN", "ADMIN"] },
  { prefix: "/smart-devices", roles: ["SUPERADMIN", "ADMIN"] },
  { prefix: "/settings", roles: ["SUPERADMIN", "ADMIN", "MANAGER"] },
  { prefix: "/claims", roles: ["SUPERADMIN", "ADMIN", "OWNER"] },
  { prefix: "/upsells", roles: ["SUPERADMIN", "ADMIN"] },
  { prefix: "/owner", roles: ["OWNER"] },
  { prefix: "/assistant", roles: ["ASSISTANT"] },
  { prefix: "/cleaner", roles: ["CLEANER"] },
  { prefix: "/maintenance", roles: ["MAINTENANCE"] },
  { prefix: "/vendor-portal", roles: ["MAINTENANCE"] },
  { prefix: "/staff-mobile", roles: ["CLEANER", "MAINTENANCE"] },
];

export const isRoleAllowedForPath = (role: AppRole, path: string): boolean => {
  const rule = routeAccessRules.find((candidate) => path === candidate.prefix || path.startsWith(`${candidate.prefix}/`));
  if (!rule) {
    return true;
  }
  return rule.roles.includes(role);
};
