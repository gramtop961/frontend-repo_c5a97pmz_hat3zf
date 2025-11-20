import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Calculator from './components/Calculator'
import Booking from './components/Booking'
import { Specials, Tarieven, FAQ, Contact } from './components/Sections'

function App() {
  const handleBook = () => {
    window.location.href = '/book'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-blue-100">
      <Navbar />
      <Hero onBook={handleBook} />

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Specials />
          </div>
          <div className="md:col-span-1">
            <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-2">Gratis intake & advies</h3>
              <p className="text-sm mb-3">Persoonlijke huid- en haaranalyse, uitleg over behandeltraject en resultaatverwachting.</p>
              <a href="/book" className="block w-full text-center px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-500">Plan gratis intake</a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/60 border-t border-blue-500/20 mt-12">
        <Calculator />
        <Tarieven />
        <FAQ />
        <Contact />
      </div>
    </div>
  )
}

export default App
