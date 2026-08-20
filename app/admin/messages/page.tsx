"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { trpc } from "@/lib/trpc";
import { CheckCircle2, Mail, MessageSquare } from "lucide-react";
import { AdminEmptyState, AdminErrorState, AdminLoadingState } from "@/components/AdminQueryState";
import { AdminPageHeader } from "@/components/AdminPageHeader";

function MessagesAdmin() {
  const utils = trpc.useUtils();
  const messages = trpc.contactMessages.list.useQuery();
  const update = trpc.contactMessages.update.useMutation({ onSuccess: () => utils.contactMessages.list.invalidate() });

  return     <div dir="rtl" className="mx-auto max-w-7xl space-y-7"><AdminPageHeader eyebrow="ORA / CONTACT INBOX" title="رسائل التواصل" description="تابع رسائل الزوار، حوّلها إلى معالجة، وأغلقها بعد إتمام المتابعة." /><div className="grid gap-4">{messages.isLoading ? <AdminLoadingState label="جارٍ تحميل رسائل التواصل..." /> : messages.isError ? <AdminErrorState label="تعذر تحميل رسائل التواصل" onRetry={() => messages.refetch()} /> : messages.data?.length ? messages.data.map(item => <article key={item.id} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm"><div className="flex flex-col justify-between gap-5 lg:flex-row"><div className="flex gap-4"><div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-indigo-50 text-indigo-600"><MessageSquare className="h-5 w-5" /></div><div><div className="flex flex-wrap items-center gap-3"><h2 className="font-display text-2xl font-bold text-slate-900">{item.subject ?? "رسالة تواصل"}</h2><span className={`rounded-full px-3 py-1 text-xs font-bold ${item.status === "closed" ? "bg-slate-100 text-slate-500" : item.status === "in_progress" ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"}`}>{item.status === "closed" ? "مغلقة" : item.status === "in_progress" ? "قيد المعالجة" : "جديدة"}</span></div><div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500"><span>{item.name}</span><a href={`mailto:${item.email}`} dir="ltr" className="inline-flex items-center gap-1 text-indigo-600"><Mail className="h-3.5 w-3.5" />{item.email}</a></div><p className="mt-4 max-w-3xl whitespace-pre-wrap text-base leading-8 text-slate-600">{item.message}</p></div></div><div className="flex h-fit flex-wrap gap-2">{item.status !== "in_progress" && item.status !== "closed" && <button type="button" onClick={() => update.mutate({ id: item.id, status: "in_progress" })} className="button-primary"><CheckCircle2 className="h-4 w-4" /> بدء المعالجة</button>}{item.status !== "closed" && <button type="button" onClick={() => update.mutate({ id: item.id, status: "closed" })} className="button-secondary">إغلاق الرسالة</button>}</div></div></article>) : <AdminEmptyState icon={MessageSquare} title="صندوق التواصل فارغ" description="ستظهر هنا الرسائل الجديدة من نموذج التواصل، مع إمكان بدء المعالجة أو إغلاق الرسالة." />}</div></div>;
}

export default function MessagesAdminPage() { return <DashboardLayout><MessagesAdmin /></DashboardLayout>; }
