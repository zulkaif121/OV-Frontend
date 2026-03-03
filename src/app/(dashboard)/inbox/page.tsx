import type { Metadata } from "next";
import { Suspense } from "react";

import { InboxPage } from "@/features/inbox/components/inbox-page";
import { PageLoadingSkeleton } from "@/shared/components/page-loading-skeleton";

export const metadata: Metadata = {
  title: "Inbox",
};

export default function InboxRoutePage() {
  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <InboxPage />
    </Suspense>
  );
}
