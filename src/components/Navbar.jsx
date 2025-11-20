import { Link, NavLink } from 'react-router-dom'

const navLinkClass = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive ? 'text-white bg-blue-600' : 'text-blue-100 hover:text-white hover:bg-blue-600/40'
  }`

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/80 border-b border-blue-500/20">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/flame-icon.svg" alt="Logo" className="w-8 h-8" />
          <span className="text-white font-semibold">Laser Almere</span>
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          <NavLink to="/calculator" className={navLinkClass}>Prijs-calculator</NavLink>
          <NavLink to="/specials" className={navLinkClass}>Specials</NavLink>
          <NavLink to="/tarieven" className={navLinkClass}>Tarieven</NavLink>
          <NavLink to="/faq" className={navLinkClass}>FAQ</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
          <NavLink to="/book" className="ml-2 px-4 py-2 rounded-md text-sm font-semibold bg-blue-600 text-white hover:bg-blue-500">Boek nu</NavLink>
        </nav>
      </div>
    </header>
  )
}
