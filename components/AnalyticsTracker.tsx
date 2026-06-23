"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initTracker, sendEvent } from "@/lib/tracker";

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    sendEvent("page_view", { pageUrl: pathname });
  }, [pathname]);

  useEffect(() => {
    const cleanup = initTracker();
    return () => cleanup();
  }, []);

  return null;
}
