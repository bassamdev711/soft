"use client";

import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { trpc } from "@/lib/trpc";
import { AlertCircle, Loader2, Save, Settings } from "lucide-react";
import { AdminPageHeader } from "@/components/AdminPageHeader";
import { toast } from "sonner";

function ContentEditor() {
  const { user } = useAuth();
  const content = trpc.siteContent.list.useQuery(undefined, { enabled: user?.role === "admin" });
  const utils = trpc.useUtils();
  const save = trpc.siteContent.save.useMutation({ onSuccess: async () => { await utils.siteContent.list.invalidate(); toast.success("تم حفظ المحتوى."); }, onError: () => toast.error("تعذر حفظ التعديل.") });
  const [draftKey, setDraftKey] = useState("");
  const [draftValue, setDraftValue] = useState("");
  if (user?.role !== "admin") return <div className="mx-auto mt-16 max-w-xl rounded-[1.5rem] border border-red-300/30 bg-red-50 p-8 text-center text-[#281417]"><AlertCircle className="mx-auto h-9 w-9 text-red-600" /><h1 className="mt-4 font-display text-2xl font-bold">لا تملك صلاحية إدارة المحتوى.</h1></div>;
  if (content.isLoading) return <div className="grid min-h-64 place-items-center"><Loader2 className="h-7 w-7 animate-spin text-[#397CFF]" /></div>;
  const entries = content.data ?? [];
  return <div dir="rtl" className="mx-auto max-w-6xl space-y-6"><AdminPageHeader eyebrow="ORA / CONTENT" title="المحتوى والإعدادات" description="حدّث النصوص العامة المرتبطة بالموقع دون تعديل الشفرة." /><section className="rounded-2xl border border-slate-200 bg-slate-900 p-5 text-white shadow-sm"><div className="flex items-start gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-[#f0c98d]"><Settings className="h-5 w-5" /></div><div><h2 className="text-lg font-bold">مفاتيح المحتوى المتصلة</h2><p className="mt-1 text-sm leading-7 text-slate-300">hero_title · hero_description · footer_message</p></div></div></section><form onSubmit={event => { event.preventDefault(); save.mutate({ contentKey: draftKey, contentValue: draftValue }); }} className="grid gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-6 sm:grid-cols-[.55fr_1fr_auto]"><label className="text-sm font-bold text-slate-700">مفتاح المحتوى<input required value={draftKey} onChange={event => setDraftKey(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm" placeholder="hero_title" dir="ltr" /></label><label className="text-sm font-bold text-slate-700">القيمة<textarea required value={draftValue} onChange={event => setDraftValue(event.target.value)} className="mt-2 min-h-20 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm" placeholder="النص الذي تريد حفظه" /></label><button type="submit" disabled={save.isPending} className="mt-auto inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#397CFF] px-4 text-sm font-bold text-white disabled:opacity-60"><Save className="h-4 w-4" />حفظ</button></form><div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white"><div className="border-b border-slate-100 px-6 py-4 text-sm font-bold text-slate-900">القيم المحفوظة</div>{entries.length === 0 ? <p className="p-6 text-sm text-slate-500">لا توجد قيم محتوى محفوظة بعد.</p> : <div className="divide-y divide-slate-100">{entries.map(item => <div key={item.id} className="grid gap-2 p-5 sm:grid-cols-[.3fr_1fr]"><code className="w-fit rounded bg-slate-100 px-2 py-1 text-xs text-slate-700" dir="ltr">{item.contentKey}</code><p className="text-sm leading-7 text-slate-700">{item.contentValue}</p></div>)}</div>}</div></div>;
}

export default function AdminContent() { return <DashboardLayout><ContentEditor /></DashboardLayout>; }
