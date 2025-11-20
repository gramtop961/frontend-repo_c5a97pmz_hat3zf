import { useEffect, useMemo, useState } from 'react'

export default function Calculator() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [services, setServices] = useState([])
  const [packages, setPackages] = useState([])
  const [selected, setSelected] = useState([])
  const [sessions, setSessions] = useState(1)
  const [result, setResult] = useState(null)

  useEffect(() => {
    ;(async () => {
      const s = await fetch(`${baseUrl}/api/services`).then(r => r.json())
      const p = await fetch(`${baseUrl}/api/packages`).then(r => r.json())
      setServices(s)
      setPackages(p)
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      if (selected.length === 0) { setResult(null); return }
      const res = await fetch(`${baseUrl}/api/calc`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selected_codes: selected, sessions })
      }).then(r => r.json())
      setResult(res)
    })()
  }, [selected, sessions])

  const groups = useMemo(() => {
    const byCat = services.reduce((acc, s) => {
      acc[s.category] = acc[s.category] || []
      acc[s.category].push(s)
      return acc
    }, {})
    return byCat
  }, [services])

  const toggle = (code) => {
    setSelected(prev => prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code])
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-white mb-6">Bereken je persoonlijke prijs</h2>
      <p className="text-blue-100 mb-8">Selecteer zones of kies een pakket. Zie direct het totaal en de 6 + 2 voordeelprijs.</p>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {Object.entries(groups).map(([cat, list]) => (
            <div key={cat} className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-4">
              <h3 className="text-white font-semibold mb-3">{cat}</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {list.map(item => (
                  <button key={item.code} onClick={() => toggle(item.code)}
                    className={`text-left p-3 rounded-lg border transition ${selected.includes(item.code) ? 'border-blue-400 bg-blue-500/10 text-white' : 'border-white/10 text-blue-100 hover:border-blue-300/50'}`}>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm opacity-80">€{item.price_single.toFixed(0)}</div>
                  </button>
                ))}
              </div>
            </div>
          ))}

          {packages.length > 0 && (
            <div className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-4">
              <h3 className="text-white font-semibold mb-3">Pakketten</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {packages.map(pkg => (
                  <button key={pkg.code} onClick={() => toggle(pkg.code)}
                    className={`text-left p-3 rounded-lg border transition ${selected.includes(pkg.code) ? 'border-blue-400 bg-blue-500/10 text-white' : 'border-white/10 text-blue-100 hover:border-blue-300/50'}`}>
                    <div className="font-medium">{pkg.title}</div>
                    <div className="text-sm opacity-80">€{pkg.price_single.toFixed(0)} • {pkg.promo_6_plus_2 ? '6 + 2 deal' : ''}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-5 h-fit sticky top-24">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white font-medium">Aantal sessies</span>
            <select value={sessions} onChange={(e) => setSessions(Number(e.target.value))} className="bg-slate-900 text-white border border-white/10 rounded px-2 py-1">
              {[1,6,8].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div className="text-blue-100 text-sm mb-4">Kies 8 sessies voor het 6 + 2 voordeel.</div>
          {result ? (
            <div className="space-y-2">
              <div className="divide-y divide-white/10">
                {result.items.map((it, idx) => (
                  <div key={idx} className="py-2 flex items-center justify-between text-blue-100">
                    <span>{it.name}</span>
                    <span>€{it.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="pt-3 text-blue-100">
                <div className="flex justify-between"><span>Subtotaal</span><span>€{result.subtotal.toFixed(2)}</span></div>
                {result.promo_label && <div className="flex justify-between text-green-400"><span>Promo</span><span>{result.promo_label}</span></div>}
                <div className="flex justify-between text-white font-semibold text-lg"><span>Totaal</span><span>€{result.total.toFixed(2)}</span></div>
              </div>
              <a href="/book" className="block w-full text-center mt-4 px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-500">Plan afspraak</a>
            </div>
          ) : (
            <div className="text-blue-100/80">Selecteer één of meer opties om de prijs te zien.</div>
          )}
        </div>
      </div>
    </div>
  )
}
