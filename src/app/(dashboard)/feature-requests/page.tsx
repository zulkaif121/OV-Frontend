import type { Metadata } from "next";

import { ModulePage } from "@/shared/components/module-page";

export const metadata: Metadata = {
  title: "Feature Requests",
};

export default function FeatureRequestsRoutePage() {
  return <ModulePage title="Feature Requests" description="Track incoming feature ideas and prioritization." eyebrow="Platform" />;
}
