export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-black/70 backdrop-blur border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-semibold text-white">BitNunChain</div>
        <nav className="space-x-6 text-sm text-zinc-300">
          <a href="/" className="hover:text-white">Home</a>
          <a href="/profile" className="hover:text-white">Profile</a>
          <a href="/contact" className="hover:text-white">Contact</a>
          <a href="/privacy" className="hover:text-white">Privacy</a>
        </nav>
      </div>
    </header>
  )
}
