// src/app/owner/login/page.tsx
export default function OwnerLoginPage(props: any) {
  const searchParams = props.searchParams || {};
  const err = searchParams?.e === "1";
  const returnTo = searchParams?.returnTo || "/owner";

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-right">دخول المالك</h1>
        <p className="text-sm text-slate-500 text-right mt-1">
          حساب خاص بالمالك فقط (ليس بائع ولا مشتري).
        </p>

        <form action="/api/owner/login" method="post" className="mt-6 space-y-4">
          <input type="hidden" name="returnTo" value={returnTo} />

          <div className="space-y-2">
            <label className="block text-sm text-right">الاسم</label>
            <input
              name="username"
              defaultValue="omar"
              className="w-full rounded-xl border px-4 py-3 text-right outline-none focus:ring-2 focus:ring-sky-200"
              autoComplete="username"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-right">كلمة السر</label>
            <input
              name="password"
              type="password"
              className="w-full rounded-xl border px-4 py-3 text-right outline-none focus:ring-2 focus:ring-sky-200"
              autoComplete="current-password"
            />
          </div>

          {err && <div className="text-sm text-red-600 text-right">بيانات دخول غير صحيحة</div>}

          <button className="w-full rounded-xl bg-sky-600 py-3 font-semibold text-white hover:bg-sky-700">
            دخول
          </button>
        </form>
      </div>
    </div>
  );
}

// ASSISTANT_FINAL: true
