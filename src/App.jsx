import { useState } from 'react';

export default function App() {
  const [isBroken, setIsBroken] = useState(false);

  return (
    <div className={`min-h-screen bg-black bg-gradient-to-b from-black via-zinc-950 to-black text-zinc-100 flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden transition-all duration-1000 ${isBroken ? 'reality-broken !via-red-950' : ''}`}>
      
      {/* ERROR EFFECTS LAYER: Only active when reality is broken */}
      {isBroken && (
        <>
          <div className="vhs-overlay animate-vhs opacity-30"></div>
          <div className="vhs-grain"></div>
          <div className="vhs-static-line"></div>
          <div className="vhs-static-line" style={{ animationDelay: '4s' }}></div>
          <div className="vhs-lightning"></div>
          <div className="vhs-lightning" style={{ animationDelay: '2.1s', animationDuration: '3s' }}></div>
          <div className="vhs-screech"></div>
          <div className="vhs-static-line opacity-10"></div>
        </>
      )}

      {/* Main Content */}
      <main className={`relative z-10 max-w-2xl w-full text-center space-y-12 ${isBroken ? 'animate-tape-break' : ''}`}>
        <section>
          {/* Glitch Header: Hover effects only trigger if system is broken */}
          <h1 className="text-7xl font-black tracking-tighter text-white uppercase italic relative group cursor-pointer">
            <span className="relative z-10">Stone <span className={isBroken ? 'text-red-600' : 'text-zinc-400 transition-colors duration-1000'}>Akuma</span></span>
            {isBroken && (
              <>
                <span className="absolute inset-0 text-cyan-400 opacity-0 group-hover:opacity-70 group-hover:animate-ping z-0">Stone Akuma</span>
                <span className="absolute inset-0 text-magenta-500 opacity-0 group-hover:opacity-70 group-hover:animate-pulse z-0 ml-1">Stone Akuma</span>
              </>
            )}
          </h1>
          <p className="mt-4 text-zinc-500 font-mono text-sm tracking-widest uppercase">
             Cosmic Horror // Developer // Producer
          </p>
        </section>

        {/* The links grid */}
        <nav className="grid grid-cols-1 gap-4">
          {/* Horizontal Stream Icons Container */}
          <div className={`p-4 border border-zinc-800 bg-zinc-900/50 flex flex-col items-center justify-center gap-3 transition-all duration-300 ${isBroken ? 'hover:border-red-600' : 'hover:border-zinc-500'}`}>
            <span className="text-xs font-mono tracking-[0.3em] text-zinc-500 uppercase">
              // WATCH LIVE //
            </span>

            <div className="flex items-center justify-center gap-8 py-1">
              <a href="https://twitch.tv/stoneakuma" target="_blank" rel="noreferrer" title="Twitch">
                <svg className={`horror-svg ${isBroken ? '' : '!text-zinc-500 !filter-none hover:!text-white'}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                </svg>
              </a>
              <a href="https://youtube.com/@stoneakuma" target="_blank" rel="noreferrer" title="YouTube">
                <svg className={`horror-svg ${isBroken ? '' : '!text-zinc-500 !filter-none hover:!text-white'}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="https://kick.com/stoneakuma" target="_blank" rel="noreferrer" title="Kick">
                <svg className={`horror-svg ${isBroken ? '' : '!text-zinc-500 !filter-none hover:!text-white'}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.25 0H7.5v4.5h3V0h5.25v4.5h3V0H24v7.5h-5.25v3H24v13.5h-5.25v-4.5h-3v4.5H10.5v-4.5h-3v4.5H0V7.5h2.25v-3H0V0h2.25zm11.25 12v-1.5h-3V12h3zm0 1.5h-3v1.5h3v-1.5z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <a href="#" className={`group p-4 border border-zinc-800 bg-zinc-900/50 transition-all duration-300 ${isBroken ? 'hover:border-red-600' : 'hover:border-zinc-500'}`}>
            <span className={`text-xl font-bold ${isBroken ? 'group-hover:text-red-500' : 'group-hover:text-white'}`}>Threadware</span>
            <p className="text-xs text-zinc-500 mt-1">Limited Edition HellDark Apparel :: under construction</p>
          </a>

          <a href="https://github.com/ScytheDragonStudios/my-portal" target="_blank" rel="noreferrer" className={`group p-4 border border-zinc-800 bg-zinc-900/50 transition-all duration-300 ${isBroken ? 'hover:border-red-600' : 'hover:border-zinc-500'}`}>
            <span className={`text-xl font-bold ${isBroken ? 'group-hover:text-red-500' : 'group-hover:text-white'}`}>SOURCE CODE</span>
          </a>

          <a href="https://open.spotify.com/artist/28aZmlNqJ23ocFum6cy69C?si=k48xAATUSq2fsTZkSP4oTg" target="_blank" rel="noreferrer" className={`group p-4 border border-zinc-800 bg-zinc-900/50 transition-all duration-300 ${isBroken ? 'hover:border-red-600' : 'hover:border-zinc-500'}`}>
            <span className={`text-xl font-bold ${isBroken ? 'group-hover:text-red-500' : 'group-hover:text-white'}`}>MUSIC // Bill from Accounting</span>
          </a>

          <a href="mailto:contact@cipher-and-coil.com?subject=Business%20Inquiry%20-%20Stone%20Akuma" className={`group p-4 border border-zinc-800 bg-zinc-900/50 transition-all duration-300 ${isBroken ? 'hover:border-red-600' : 'hover:border-zinc-500'}`}>
            <span className={`text-xl font-bold ${isBroken ? 'group-hover:text-red-500' : 'group-hover:text-white'}`}>CONTACT // EMAIL</span>
            <p className="text-xs text-zinc-500 mt-1">bfa@cipher-and-coil.com</p>
          </a>
        </nav>

        {/* INDUSTRIAL TOGGLE SWITCH CONTAINER */}
        <section className="pt-6 flex flex-col items-center justify-center gap-2">
          <label className="text-[10px] font-mono tracking-[0.3em] text-zinc-600 uppercase">
            {isBroken ? '[ OVERRIDE ACTIVE ]' : '[ SIGNAL OVERRIDE ]'}
          </label>
          <button 
            onClick={() => setIsBroken(!isBroken)}
            className={`w-14 h-7 rounded-none border p-1 transition-all duration-500 relative ${isBroken ? 'border-red-600 bg-red-950/20' : 'border-zinc-800 bg-zinc-950'}`}
          >
            <div className={`w-4 h-4 transition-all duration-500 ${isBroken ? 'bg-red-600 translate-x-7 shadow-[0_0_10px_rgba(239,68,68,0.7)]' : 'bg-zinc-700 translate-x-0'}`} />
          </button>
        </section>

        {/* Photosensitivity Warning */}
        <section className="pt-4 border-t border-zinc-900/50">
          <p className="text-[9px] uppercase tracking-[0.2em] text-red-600/60 font-bold">
            ⚠ Photosensitivity Warning: Activating override introduces flickering lights and visual distortions.
          </p>
        </section>

        <footer className="pt-8 opacity-30 font-mono text-[10px]">
          <p className="text-[10px] font-mono tracking-tighter">Coded by STONE AKUMA || EST. 2026 // CINCINNATI OH</p>
          {isBroken ? '[ SIGNAL DEGRADATION DETECTED ]' : '[ SYSTEM OPERATIONAL ]'}
        </footer>
      </main>
    </div>
  )
}