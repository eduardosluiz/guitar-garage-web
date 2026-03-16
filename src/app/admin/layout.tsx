// src/app/admin/layout.tsx
import React from 'react';
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminLayoutClient from './AdminLayoutClient';

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <AdminLayoutClient>
      {children}
    </AdminLayoutClient>
  );
}
