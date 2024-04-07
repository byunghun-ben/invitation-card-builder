"use client";

import logger from "@/utils/logger";
import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals(metric => {
    logger.log(metric);
  });
}
