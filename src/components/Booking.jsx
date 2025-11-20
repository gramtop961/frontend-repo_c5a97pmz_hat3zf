import { useState } from 'react'

export default function Booking() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [form, setForm] = useState({ type: 'intake', name: '', email: '', phone: '', date: '', time: '', notes: '' })
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setOk(null)
    try {
      const res = await fetch(`${baseUrl}/api/book`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, selected_codes: [] })
      })
      const data = await res.json()
      if (res.ok) setOk({ ok: true, id: data.id })
      else setOk({ ok: false, error: data.detail || 'Fout bij boeken' })
    } catch (e) {
      setOk({ ok: false, error: e.message })
    } finally {
      setLoading(false)
    }
  }

  const change = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-white mb-2">Plan je afspraak</h2>
      <p className="text-blue-100 mb-6">Gratis intake en persoonlijk advies. Kies datum en tijd die voor jou past.</p>

      <form onSubmit={submit} className="space-y-4 bg-slate-800/50 border border-blue-500/20 rounded-xl p-5">
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-blue-100 text-sm mb-1">Type</label>
            <select value={form.type} onChange={(e) => change('type', e.target.value)} className="w-full bg-slate-900 text-white border border-white/10 rounded px-3 py-2">
              <option value="intake">Intake</option>
              <option value="behandeling">Behandeling</option>
            </select>
          </div>
          <div>
            <label className="block text-blue-100 text-sm mb-1">Datum</label>
            <input type="date" value={form.date} onChange={(e) => change('date', e.target.value)} className="w-full bg-slate-900 text-white border border-white/10 rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block text-blue-100 text-sm mb-1">Tijd</label>
            <input type="time" value={form.time} onChange={(e) => change('time', e.target.value)} className="w-full bg-slate-900 text-white border border-white/10 rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block text-blue-100 text-sm mb-1">Telefoon</label>
            <input value={form.phone} onChange={(e) => change('phone', e.target.value)} className="w-full bg-slate-900 text-white border border-white/10 rounded px-3 py-2" placeholder="06..." />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-blue-100 text-sm mb-1">Naam</label>
            <input value={form.name} onChange={(e) => change('name', e.target.value)} className="w-full bg-slate-900 text-white border border-white/10 rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block text-blue-100 text-sm mb-1">E-mail</label>
            <input type="email" value={form.email} onChange={(e) => change('email', e.target.value)} className="w-full bg-slate-900 text-white border border-white/10 rounded px-3 py-2" required />
          </div>
        </div>
        <div>
          <label className="block text-blue-100 text-sm mb-1">Notities</label>
          <textarea value={form.notes} onChange={(e) => change('notes', e.target.value)} className="w-full bg-slate-900 text-white border border-white/10 rounded px-3 py-2" rows={4} placeholder="Waar wil je op focussen?" />
        </div>
        <button disabled={loading} className="w-full px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-500 disabled:opacity-60">
          {loading ? 'Bezig met plannen...' : 'Bevestig afspraak'}
        </button>
        {ok && (
          <div className={`p-3 rounded ${ok.ok ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'}`}>
            {ok.ok ? 'Gelukt! We sturen je een bevestiging per e-mail.' : ok.error}
          </div>
        )}
      </form>
    </div>
  )
}
