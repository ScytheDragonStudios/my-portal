export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-zinc-100 flex flex-col items-center justify-center p-6 font-sans">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-red-900/20 blur-[120px] rounded-full"></div>
      </div>

      <main className="relative z-10 max-w-2xl w-full text-center space-y-12">
        <section>
          <h1 className="text-7xl font-black tracking-tighter text-white uppercase italic">
            Stone <span className="text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.6)]">Akuma</span>
          </h1>
          <p className="mt-4 text-zinc-500 font-mono text-sm tracking-widest uppercase">
            // Cosmic Horror // Developer // Producer
          </p>
        </section>

        {/* The Portal Links */}
        <nav className="grid grid-cols-1 gap-4">
          <a href="https://twitch.tv/stoneakuma" target="_blank" className="group p-4 border border-zinc-800 bg-zinc-900/50 hover:border-red-600 transition-all duration-300">
            <span className="text-xl font-bold group-hover:text-red-500">LIVE ON TWITCH</span>
          </a>

          <a href="https://github.com/yourusername" target="_blank" className="group p-4 border border-zinc-800 bg-zinc-900/50 hover:border-red-600 transition-all duration-300">
            <span className="text-xl font-bold group-hover:text-red-500">SOURCE CODE // GITHUB</span>
          </a>
        </nav>

        <footer className="pt-8 opacity-30">
          <p className="text-[10px] font-mono tracking-tighter">EST. 2026 // CINCINNATI OH</p>
        </footer>
      </main>
    </div>
  )
}