"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

function getClientYear() {
  return String(new Date().getFullYear());
}

function getServerYear() {
  return "";
}

/**
 * Year label that renders empty during prerender and fills in on the client
 * without hydration mismatches (server snapshot is used for the first
 * client render, then the real year streams in).
 */
export function CurrentYear() {
  const year = useSyncExternalStore(subscribe, getClientYear, getServerYear);

  return (
    <time dateTime={year || undefined} suppressHydrationWarning>
      {year}
    </time>
  );
}
