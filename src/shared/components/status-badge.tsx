import { Badge } from "@/shared/components/ui/badge";

const variantByStatus = {
  success: "success",
  warning: "warning",
  error: "danger",
  info: "info",
  new: "info",
  progress: "warning",
  complete: "success",
  critical: "danger",
  pending: "pending",
  default: "default",
} as const;

interface StatusBadgeProps {
  status: keyof typeof variantByStatus;
  label?: string;
}

export const StatusBadge = ({ status, label }: StatusBadgeProps) => (
  <Badge variant={variantByStatus[status]}>{label ?? status}</Badge>
);
