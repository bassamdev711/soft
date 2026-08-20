"use client";

import { AlertCircle, Database, Loader2, RefreshCw } from "lucide-react";

export function AdminLoadingState({ label = "جارٍ تحميل البيانات..." }: { label?: string }) {
  return <div className="grid min-h-52 place-items-center rounded-3xl border border-slate-200 bg-white"><div className="flex flex-col items-center gap-3 text-sm text-slate-500"><Loader2 className="h-7 w-7 animate-spin text-indigo-600" /><span>{label}</span></div></div>;
}

export function AdminErrorState({ onRetry, label = "تعذر تحميل البيانات" }: { onRetry?: () => void; label?: string }) {
  return <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-slate-800"><div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-red-100 text-red-600"><AlertCircle className="h-6 w-6" /></div><h2 className="mt-4 font-display text-xl font-bold">{label}</h2><p className="mx-auto mt-2 max-w-lg text-sm leading-7 text-slate-600">تحتاج قاعدة البيانات إلى التحقق من الاتصال وتطبيق مخطط PostgreSQL قبل استخدام هذا القسم. لم تُحذف أي بيانات.</p>{onRetry && <button type="button" onClick={onRetry} className="button-secondary mt-5"><RefreshCw className="h-4 w-4" /> إعادة المحاولة</button>}</div>;
}

export function AdminEmptyState({ icon: Icon = Database, title, description }: { icon?: typeof Database; title: string; description: string }) {
  return <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600"><Icon className="mx-auto h-8 w-8 text-slate-400" /><h2 className="mt-3 font-display text-lg font-bold text-slate-800">{title}</h2><p className="mt-1 text-sm leading-7">{description}</p></div>;
}
