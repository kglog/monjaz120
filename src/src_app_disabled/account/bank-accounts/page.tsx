"use client"
import React, { useEffect, useState } from 'react'

type BankAccount = {
  id: string
  bankName: string
  iban: string
  note?: string
  status?: 'PENDING' | 'ACTIVE'
  createdAt?: string
}

export default function AccountBankAccountsPage() {
  const [user, setUser] = useState<any>(null)
  const isVerified = Boolean(
    user && (user.verified || user.identityVerified || user.isVerified || user.verifiedId || user.isIdentityVerified)
  )
  const [accounts, setAccounts] = useState<BankAccount[]>([])
  const [bankName, setBankName] = useState('')
  const [iban, setIban] = useState('')
  const [note, setNote] = useState('')
  const [paypal, setPaypal] = useState('')

  useEffect(() => {
    try {
      const raw = localStorage.getItem('bankAccounts')
      if (raw) setAccounts(JSON.parse(raw))
      const rawUser = localStorage.getItem('user')
      if (rawUser) {
        try { setUser(JSON.parse(rawUser)) } catch (e) { /* ignore */ }
      }
      const payRaw = localStorage.getItem('paymentIntegrations')
      if (payRaw) {
        try {
          const parsed = JSON.parse(payRaw)
          setPaypal(parsed.paypal || '')
        } catch (e) {
          // ignore
        }
      }
    } catch (e) {
      console.error('Failed to load bank accounts', e)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('bankAccounts', JSON.stringify(accounts))
  }, [accounts])

  useEffect(() => {
    try {
      localStorage.setItem('paymentIntegrations', JSON.stringify({ paypal }))
    } catch (e) {
      console.error('failed to save payment integrations', e)
    }
  }, [paypal])

  function addAccount() {
    if (!bankName.trim() || !iban.trim()) return
    const acc: BankAccount = {
      id: Date.now().toString(),
      bankName: bankName.trim(),
      iban: iban.trim(),
      note: note.trim(),
      status: isVerified ? 'ACTIVE' : 'PENDING',
      createdAt: new Date().toISOString(),
    }
    setAccounts(a => [acc, ...a])
    setBankName('')
    setIban('')
    setNote('')
    if (!isVerified) {
      alert('تم إضافة الحساب كـ "قيد المراجعة". لا يمكن استخدامه للسحب حتى قبول الهوية.')
    }
  }

  function removeAccount(id: string) {
    setAccounts(a => a.filter(x => x.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded shadow">
        <h1 className="text-lg font-semibold">المدفوعات وطرق السحب</h1>
        <p className="text-sm text-gray-500">أضف حسابات السحب وأدوات الدفع الخاصة بك هنا.</p>

        {!isVerified && (
          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm text-yellow-800">تم تعطيل السحب مؤقتًا حتى قبول الهوية. يمكنك إضافة حسابات، لكنها ستبقى "قيد المراجعة" ولا تُستخدم للسحب.</p>
            <a href="/account/verify" className="inline-block mt-2 px-3 py-2 bg-cyan-600 text-white rounded">توثيق الهوية</a>
          </div>
        )}

        <div className="mt-4">
          <h2 className="font-medium mb-2">تكاملات الدفع (PayPal)</h2>
          <p className="text-sm text-gray-500 mb-2">ربط حساب PayPal لتلقي المدفوعات.</p>
          <div className="flex gap-2">
            <input placeholder="PayPal email أو معرف" value={paypal} onChange={(e) => setPaypal(e.target.value)} className="p-2 border rounded flex-1" />
            <button onClick={() => { try { localStorage.setItem('paymentIntegrations', JSON.stringify({ paypal })); alert(isVerified ? 'تم حفظ PayPal' : 'تم حفظ PayPal (قيد المراجعة)'); } catch (e) { console.error(e); alert('فشل الحفظ'); } }} className="px-3 py-2 bg-cyan-600 text-white rounded">حفظ</button>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-medium mb-3">إضافة حساب جديد</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input placeholder="اسم البنك" value={bankName} onChange={(e) => setBankName(e.target.value)} className="p-2 border rounded" />
          <input placeholder="IBAN أو رقم الحساب" value={iban} onChange={(e) => setIban(e.target.value)} className="p-2 border rounded" />
          <input placeholder="ملاحظة (اختياري)" value={note} onChange={(e) => setNote(e.target.value)} className="p-2 border rounded" />
        </div>
        <div className="mt-3">
          <button onClick={addAccount} className="px-4 py-2 bg-cyan-600 text-white rounded">أضف الحساب</button>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-medium mb-3">قائمة الحسابات</h2>
        {accounts.length === 0 && <p className="text-sm text-gray-500">لا توجد حسابات بعد. أضف أول حسابك.</p>}
        <ul className="space-y-2">
          {accounts.map(acc => (
            <li key={acc.id} className="p-3 border rounded flex items-start justify-between">
              <div>
                <div className="font-semibold">{acc.bankName}</div>
                <div className="text-sm text-gray-700">{acc.iban}</div>
                <div className="text-sm text-gray-500">حالة: {acc.status ?? 'ACTIVE'}</div>
                {acc.note && <div className="text-sm text-gray-500">{acc.note}</div>}
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={() => removeAccount(acc.id)} className="px-3 py-1 bg-red-600 text-white rounded">حذف</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// ASSISTANT_FINAL: true
