"use client";

import { MainLayout } from "@components/layout/MainLayout";

export default function BookmarksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
