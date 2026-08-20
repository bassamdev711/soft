"use client";

import type { ReactNode } from "react";

export function AdminPageHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: ReactNode }) {
  return <header className="admin-page-header"><div className="min-w-0"><p className="admin-eyebrow">{eyebrow}</p><h1 className="admin-page-title">{title}</h1><p className="admin-page-description">{description}</p></div>{action && <div className="admin-page-action">{action}</div>}</header>;
}
