export default function App() {
  return (
    
    <div className="min-h-screen bg-black bg-gradient-to-b from-black via-red-950 to-black text-zinc-100 flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
      
      
      <div className="vhs-overlay animate-vhs opacity-30"></div>

      
      <main className="relative z-10 max-w-2xl w-full text-center space-y-12 animate-tape-break">
        <section>
          {/* Glitch 'Jinn Klaine' header we built last time */}
          <h1 className="text-7xl font-black tracking-tighter text-white uppercase italic relative group cursor-pointer">
            <span className="relative z-10">Stone <span className="text-red-600">Akuma</span></span>
            <span className="absolute inset-0 text-cyan-400 opacity-0 group-hover:opacity-70 group-hover:animate-ping z-0">Jinn Klaine</span>
            <span className="absolute inset-0 text-magenta-500 opacity-0 group-hover:opacity-70 group-hover:animate-pulse z-0 ml-1">Jinn Klaine</span>
          </h1>
          <p className="mt-4 text-zinc-500 font-mono text-sm tracking-widest uppercase">
             Cosmic Horror // Developer // Producer
          </p>
        </section>

        {/* The links - they stay static, but the main container (above) skews them */}
        <nav className="grid grid-cols-1 gap-4">
          <a href="https://twitch.tv/stoneakuma" target="_blank" className="group p-4 border border-zinc-800 bg-zinc-900/50 hover:border-red-600 transition-all duration-300">
            <span className="text-xl font-bold group-hover:text-red-500">LIVE ON TWITCH</span>
          </a>
          
          {/* Placeholder shop link for now */}
          <a href="#" className="group p-4 border border-zinc-800 bg-zinc-900/50 hover:border-red-600 transition-all duration-300">
            <span className="text-xl font-bold group-hover:text-red-500">ANUBIS SUMMONING SHOP</span>
            <p className="text-xs text-zinc-500 mt-1">Limited Edition EDM Apparel</p>
          </a>

          <a href="https://github.com/ScytheDragonStudios/my-portal" target="_blank" className="group p-4 border border-zinc-800 bg-zinc-900/50 hover:border-red-600 transition-all duration-300">
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