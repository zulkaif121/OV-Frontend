import type { Metadata } from "next";

import { ModulePage } from "@/shared/components/module-page";

export const metadata: Metadata = {
  title: "Help",
};

export default function HelpRoutePage() {
  return <ModulePage title="Help" description="Access support resources and troubleshooting guides." eyebrow="Support" />;
}
