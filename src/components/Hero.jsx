export default function Hero({ onBook }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(59,130,246,0.2),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.2),transparent_40%)]" />
      <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Professionele laserontharing in Almere
          </h1>
          <p className="mt-4 text-blue-100 text-lg">
            Strak, zacht en zorgeloos. Met gratis intake, persoonlijk advies en ons populaire 6 + 2 VIP-traject.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={onBook} className="px-6 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-500">Plan gratis intake</button>
            <a href="/calculator" className="px-6 py-3 rounded-md bg-white/10 text-white font-semibold hover:bg-white/20">Bereken je prijs</a>
          </div>
          <p className="mt-4 text-blue-200 text-sm">Populair: oksels, bikinilijn, benen, gelaat, armen en full body combinaties</p>
        </div>
        <div className="rounded-xl border border-blue-500/20 bg-slate-800/40 p-6 text-blue-100">
          <ul className="grid grid-cols-2 gap-4">
            <li className="bg-white/5 rounded-lg p-4">Oksels</li>
            <li className="bg-white/5 rounded-lg p-4">Bikinilijn</li>
            <li className="bg-white/5 rounded-lg p-4">Benen</li>
            <li className="bg-white/5 rounded-lg p-4">Gezicht</li>
            <li className="bg-white/5 rounded-lg p-4">Armen</li>
            <li className="bg-white/5 rounded-lg p-4 col-span-2">Full body combinaties</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
