"use client"
import React, { useEffect, useState } from 'react'

type BankAccount = {
  id: string
  bankName: string
  iban: string
  note?: string
}

export default function BankAccountsPage() {
  const [accounts, setAccounts] = useState<BankAccount[]>([])
  const [bankName, setBankName] = useState('')
  const [iban, setIban] = useState('')
  const [note, setNote] = useState('')

  useEffect(() => {
    try {
      const raw = localStorage.getItem('bankAccounts')
      if (raw) setAccounts(JSON.parse(raw))
    } catch (e) {
      console.error('Failed to load bank accounts', e)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('bankAccounts', JSON.stringify(accounts))
  }, [accounts])

  function addAccount() {
    if (!bankName.trim() || !iban.trim()) return
    const acc: BankAccount = { id: Date.now().toString(), bankName: bankName.trim(), iban: iban.trim(), note: note.trim() }
    setAccounts(a => [acc, ...a])
    setBankName('')
    setIban('')
    setNote('')
  }

  function removeAccount(id: string) {
    setAccounts(a => a.filter(x => x.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded shadow">
        <h1 className="text-lg font-semibold">حسابات السحب البنكية</h1>
        <p className="text-sm text-gray-500">أضف حساباتك البنكية هنا ليتم استخدامها عند سحب الرصيد.</p>
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
