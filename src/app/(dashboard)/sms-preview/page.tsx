import type { Metadata } from "next";

import { ModulePage } from "@/shared/components/module-page";

export const metadata: Metadata = {
  title: "SMS Preview",
};

export default function SmsPreviewRoutePage() {
  return <ModulePage title="SMS Preview" description="Preview outbound guest message flows." eyebrow="Communications" />;
}
