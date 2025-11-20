import { useEffect, useState } from 'react'

export function Specials() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [packages, setPackages] = useState([])
  useEffect(() => { (async () => setPackages(await fetch(`${baseUrl}/api/packages`).then(r => r.json())))() }, [])
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-white mb-4">Specials & Deals</h2>
      <p className="text-blue-100 mb-6">Actueel: 6 + 2 VIP-traject met duidelijk behandelplan.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {packages.map(p => (
          <div key={p.code} className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-5 text-blue-100">
            <div className="text-white font-semibold text-lg">{p.title}</div>
            <div className="text-sm opacity-80 mt-1">{p.description}</div>
            <div className="mt-4 text-white font-bold text-xl">€{p.price_single.toFixed(0)}</div>
            <div className="text-green-300 text-sm">{p.promo_6_plus_2 ? '6 + 2 deal' : ''}</div>
            <a href="/book" className="mt-4 inline-block px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-500">Claim deze deal</a>
          </div>
        ))}
      </div>
    </section>
  )
}

export function Tarieven() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [services, setServices] = useState([])
  useEffect(() => { (async () => setServices(await fetch(`${baseUrl}/api/services`).then(r => r.json())))() }, [])
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-white mb-4">Tarieven</h2>
      <p className="text-blue-100 mb-6">Losse zones, pakketten en full body combinaties.</p>
      <div className="grid md:grid-cols-2 gap-6">
        {services.map(s => (
          <div key={s.code} className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="text-white font-medium">{s.name}</div>
              <div className="text-blue-200 text-sm">{s.category}</div>
            </div>
            <div className="text-white font-semibold">€{s.price_single.toFixed(0)}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function FAQ() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [faqs, setFaqs] = useState([])
  useEffect(() => { (async () => setFaqs(await fetch(`${baseUrl}/api/faqs`).then(r => r.json())))() }, [])
  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-white mb-4">Veelgestelde vragen</h2>
      <div className="divide-y divide-white/10 bg-slate-800/50 border border-blue-500/20 rounded-xl">
        {faqs.map((f, i) => (
          <details key={i} className="p-4">
            <summary className="cursor-pointer text-white font-medium">{f.question}</summary>
            <p className="text-blue-100 mt-2">{f.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

export function Contact() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [state, setState] = useState({ sending: false, ok: null })
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'Vraag via website', message: '' })

  const submit = async (e) => {
    e.preventDefault()
    setState({ sending: true, ok: null })
    try {
      const res = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form)
      })
      const data = await res.json()
      setState({ sending: false, ok: res.ok ? data : { error: data.detail } })
    } catch (e) {
      setState({ sending: false, ok: { error: e.message } })
    }
  }

  const change = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-white mb-4">Contact</h2>
      <p className="text-blue-100 mb-6">Stel je vraag of plan direct een gratis intake. Je kunt ook appen via de knop rechtsonder.</p>
      <form onSubmit={submit} className="space-y-4 bg-slate-800/50 border border-blue-500/20 rounded-xl p-5">
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
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-blue-100 text-sm mb-1">Telefoon (optioneel)</label>
            <input value={form.phone} onChange={(e) => change('phone', e.target.value)} className="w-full bg-slate-900 text-white border border-white/10 rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-blue-100 text-sm mb-1">Onderwerp</label>
            <input value={form.subject} onChange={(e) => change('subject', e.target.value)} className="w-full bg-slate-900 text-white border border-white/10 rounded px-3 py-2" />
          </div>
        </div>
        <div>
          <label className="block text-blue-100 text-sm mb-1">Bericht</label>
          <textarea value={form.message} onChange={(e) => change('message', e.target.value)} className="w-full bg-slate-900 text-white border border-white/10 rounded px-3 py-2" rows={5} required />
        </div>
        <button disabled={state.sending} className="w-full px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-500 disabled:opacity-60">
          {state.sending ? 'Versturen...' : 'Verstuur bericht'}
        </button>
        {state.ok && (
          <div className={`p-3 rounded ${state.ok.error ? 'bg-red-500/20 text-red-200' : 'bg-green-500/20 text-green-200'}`}>
            {state.ok.error ? state.ok.error : 'Bedankt! We nemen snel contact op.'}
          </div>
        )}
      </form>
    </section>
  )
}
