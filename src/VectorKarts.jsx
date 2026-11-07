import React, { useState } from "react";

export default function VectorKarts({ onBack, isBroken }) {
  const [lightboxImg, setLightboxImg] = useState(null);

  const screenshots = [
    { src: "/screenshots/shot1.png", label: "[01] CIRCUIT 01: OVERPASS BRIDGE & RAMP" },
    { src: "/screenshots/shot2.png", label: "[02] LIVE 3D SPECTATOR CAMS" },
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative z-10 max-w-5xl w-full text-left space-y-12 py-6">
      {/* Top Navigation Bar */}
      <nav className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-4 font-mono">
        <button
          onClick={onBack}
          className={`text-sm font-bold tracking-widest uppercase cursor-pointer transition-colors ${
            isBroken ? "text-red-500 hover:text-white" : "text-cyan-400 hover:text-white"
          }`}
        >
          &larr; Return to Streamer Portal
        </button>
        <div className="text-xs tracking-[0.2em] text-zinc-500 uppercase">
          Developed by <span className="text-zinc-200 font-bold">ScytheDragon Studios</span> // Audio by{" "}
          <span className="text-zinc-200 font-bold">Cipher &amp; Coil</span>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="text-center space-y-4 py-6 border border-zinc-800 bg-zinc-900/40 p-8">
        <div className="inline-block font-mono text-[11px] tracking-[0.25em] uppercase px-3 py-1 border border-cyan-500/50 text-cyan-400 bg-cyan-950/20">
          SCYTHEDRAGON STUDIOS // OFFICIAL PROJECT DOSSIER
        </div>
        <h1
          className={`text-5xl md:text-7xl font-black tracking-tighter uppercase italic ${
            isBroken ? "text-red-600" : "text-white"
          }`}
        >
          Vector <span className={isBroken ? "text-white" : "text-cyan-400"}>Karts</span>
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto text-sm md:text-base font-mono">
          A high-speed, low-poly 3D arcade kart racer powered by real-time SVG vector extrusion—featuring independent
          streamers, VTubers, and indie game tribute circuits.
        </p>
        <div className="pt-4 flex flex-wrap justify-center gap-4 font-mono text-xs">
          <button
            onClick={() => scrollToSection("roster")}
            className={`px-6 py-3 font-bold uppercase tracking-widest transition-all cursor-pointer ${
              isBroken
                ? "bg-red-600 text-white hover:bg-red-500"
                : "bg-cyan-400 text-black hover:bg-white shadow-[0_0_20px_rgba(34,211,238,0.35)]"
            }`}
          >
            Confirmed Creator Roster
          </button>
          <button
            onClick={() => scrollToSection("multiplayer")}
            className="px-6 py-3 font-bold uppercase tracking-widest border border-zinc-700 bg-zinc-900/80 text-zinc-200 hover:border-cyan-400 hover:text-cyan-400 transition-all cursor-pointer"
          >
            Multiplayer Teaser
          </button>
        </div>
      </header>

      {/* SUPPORT THE DEV JOURNEY BANNER */}
      <section className="border border-amber-500/40 bg-amber-950/15 p-6 md:p-8 rounded-lg text-center space-y-4 font-mono">
        <span className="text-xs tracking-[0.3em] uppercase text-amber-400 font-bold">
          // BACK THE PROJECT //
        </span>
        <h3 className="text-xl md:text-2xl font-black uppercase tracking-wider text-white">
          Want to help support the game dev journey?
        </h3>
        <p className="text-xs text-zinc-400 max-w-xl mx-auto leading-relaxed">
          Every bit of support helps fund community asset licenses, future track building, and upcoming creator onboarding sessions. Grab the playable demo or back the journey below!
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-4">
          <a
            href="https://ko-fi.com/stoneakuma"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest bg-amber-500 text-black hover:bg-white transition-all no-underline shadow-[0_0_15px_rgba(245,158,11,0.3)]"
          >
            ☕ Support on Ko-fi
          </a>
          <a
            href="https://patreon.com/stoneakuma"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest bg-red-500 text-white hover:bg-red-400 transition-all no-underline shadow-[0_0_15px_rgba(239,68,68,0.3)]"
          >
            Patreon Backer
          </a>
          <a
            href="https://stoneakuma.itch.io"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest border border-emerald-400 text-emerald-300 hover:bg-emerald-500 hover:text-black transition-all no-underline"
          >
            📥 Itch.io Demo Page
          </a>
        </div>
      </section>

      {/* In-Engine Screenshots Section */}
      <section id="screenshots" className="space-y-6 scroll-mt-24">
        <div className="border-l-2 border-cyan-400 pl-4">
          <h2 className="text-2xl font-black tracking-wider uppercase text-white">In-Engine Captures</h2>
          <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
            // Real-Time 3D SVG Extrusion &amp; Procedural Spline Circuits (Click to Enlarge)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {screenshots.map((shot, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxImg(shot.src)}
              className={`group relative aspect-video border border-zinc-800 bg-zinc-900/60 overflow-hidden cursor-pointer flex items-center justify-center transition-all ${
                isBroken ? "hover:border-red-600" : "hover:border-cyan-400"
              }`}
            >
              <img
                src={shot.src}
                alt={shot.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <span className="text-xs font-mono text-zinc-600 absolute pointer-events-none">
                [Drop {shot.src} in public folder]
              </span>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3 font-mono text-[11px] text-cyan-400 tracking-wider">
                {shot.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Confirmed Featured Creators Roster */}
      <section id="roster" className="space-y-6 scroll-mt-24">
        <div className="border-l-2 border-cyan-400 pl-4">
          <h2 className="text-2xl font-black tracking-wider uppercase text-white">Confirmed Featured Creators</h2>
          <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
            // Hand-Crafted Multi-Layer Low-Poly SVG Pilots
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Stone Akuma */}
          <div className="border border-zinc-800 bg-zinc-900/50 p-4 text-center hover:border-red-500 transition-all">
            <div className="w-28 h-32 mx-auto mb-3 bg-zinc-950 border border-zinc-800 p-2 rounded">
              <svg viewBox="0 0 100 120" className="w-full h-full">
                <path fill="#121318" d="M 14 60 L 36 53 L 64 53 L 86 60 L 82 116 L 18 116 Z" />
                <path fill="#f4f6fa" d="M 37 52 L 63 52 L 58 98 L 50 108 L 42 98 Z" />
                <path fill="#1e2029" d="M 28 55 L 40 53 L 45 95 L 33 78 Z M 72 55 L 60 53 L 55 95 L 67 78 Z" />
                <path fill="#d91424" d="M 46 56 L 54 56 L 52 63 L 55 98 L 50 106 L 45 98 L 48 63 Z" />
                <path fill="#525660" d="M 27 28 L 19 14 L 22 3 L 29 12 L 36 22 Z M 73 28 L 81 14 L 78 3 L 71 12 L 64 22 Z" />
                <path fill="#1b1d24" d="M 29 21 L 71 21 L 72 37 L 64 51 L 50 56 L 36 51 L 28 37 Z" />
                <path fill="#ff1122" d="M 33 32 L 45 35 L 43 39 L 34 37 Z M 67 32 L 55 35 L 57 39 L 66 37 Z" />
                <path fill="#ffffff" d="M 38 49 L 41 42 L 44 49 Z M 62 49 L 59 42 L 56 49 Z" />
              </svg>
            </div>
            <h3 className="font-bold text-red-500 tracking-wider text-sm">STONE AKUMA</h3>
            <p className="text-[11px] font-mono text-zinc-500 mt-1">Lead Dev // Eldritch Technomancer</p>
          </div>

          {/* Rime Reaper */}
          <div className="border border-zinc-800 bg-zinc-900/50 p-4 text-center hover:border-blue-500 transition-all">
            <div className="w-28 h-32 mx-auto mb-3 bg-zinc-950 border border-zinc-800 p-2 rounded">
              <svg viewBox="0 0 100 120" className="w-full h-full">
                <path fill="#242730" d="M 32 9 L 50 5 L 68 9 L 76 28 L 74 47 L 88 55 L 92 106 L 83 116 L 76 105 L 68 117 L 60 106 L 50 118 L 40 106 L 32 117 L 24 105 L 17 116 L 8 106 L 12 55 L 26 47 L 24 28 Z" />
                <path fill="#08090c" d="M 33 14 L 50 11 L 67 14 L 69 47 L 31 47 Z" />
                <path fill="#323642" d="M 13 54 L 35 46 L 50 49 L 65 46 L 87 54 L 80 65 L 50 73 L 20 65 Z" />
                <path fill="#ccc5b4" d="M 36 17 L 50 14 L 64 17 L 65 32 L 59 40 L 56 46 L 44 46 L 41 40 L 35 32 Z" />
                <path fill="#07080b" d="M 37 25 L 47 25 L 47 33 L 37 33 Z M 53 25 L 63 25 L 63 33 L 53 33 Z" />
                <path fill="#1d6bff" d="M 39 27 L 45 27 L 45 31 L 39 31 Z M 55 27 L 61 27 L 61 31 L 55 31 Z" />
                <path fill="#ddd6c7" d="M 47 68 L 53 68 L 54 97 L 46 97 Z M 42 73 L 58 73 L 58 76 L 42 76 Z M 41 85 L 59 85 L 59 88 L 41 88 Z" />
              </svg>
            </div>
            <h3 className="font-bold text-blue-400 tracking-wider text-sm">RIME REAPER</h3>
            <p className="text-[11px] font-mono text-zinc-500 mt-1">Featured VTuber // Lich</p>
          </div>

          {/* Lumikki-la-lune */}
          <div className="border border-zinc-800 bg-zinc-900/50 p-4 text-center hover:border-cyan-400 transition-all">
            <div className="w-28 h-32 mx-auto mb-3 bg-zinc-950 border border-zinc-800 p-2 rounded">
              <svg viewBox="0 0 100 120" className="w-full h-full">
                <path fill="#eef6fa" d="M 50 18 L 74 7 L 78 28 L 50 24 L 22 28 L 26 7 Z" />
                <path fill="#1b326b" d="M 28 22 L 16 20 L 10 32 L 12 52 L 6 68 L 12 76 L 20 72 L 18 64 L 22 50 L 20 34 Z M 72 22 L 84 20 L 90 32 L 88 52 L 94 68 L 88 76 L 80 72 L 82 64 L 78 50 L 80 34 Z" />
                <path fill="#ffe0d4" d="M 50 18 L 68 24 L 69 40 L 62 49 L 50 53 L 38 49 L 31 40 L 32 24 Z" />
                <path fill="#38c8f2" d="M 30 23 L 26 7 L 42 18 Z M 70 23 L 74 7 L 58 18 Z" />
                <path fill="#2eb5e0" d="M 43 55 L 57 55 L 66 64 L 76 66 L 78 72 L 68 72 L 66 88 L 34 88 L 32 72 L 22 72 L 24 66 L 34 64 Z" />
                <path fill="#2eb5e0" d="M 50 15 L 70 21 L 73 38 L 70 58 L 65 54 L 67 35 L 60 33 L 56 26 L 52 35 L 44 33 L 40 25 L 35 35 L 33 54 L 30 58 L 27 38 L 30 21 Z" />
                <path fill="#00e5ff" d="M 35 37 L 40 35 L 45 38 L 43 41 L 36 41 Z" />
                <path fill="#b81d38" d="M 65 37 L 60 35 L 55 38 L 57 41 L 64 41 Z" />
              </svg>
            </div>
            <h3 className="font-bold text-cyan-400 tracking-wider text-sm">LUMIKKI-LA-LUNE</h3>
            <p className="text-[11px] font-mono text-zinc-500 mt-1">Featured VTuber // Snow Kitsune</p>
          </div>

          {/* Kiyokami */}
          <div className="border border-zinc-800 bg-zinc-900/50 p-4 text-center hover:border-pink-400 transition-all">
            <div className="w-28 h-32 mx-auto mb-3 bg-zinc-950 border border-zinc-800 p-2 rounded">
              <svg viewBox="0 0 100 120" className="w-full h-full">
                <path fill="#dfe2eb" d="M 30 16 L 70 16 L 84 62 L 78 104 L 68 96 L 32 96 L 22 104 L 16 62 Z" />
                <path fill="#f0f2f7" d="M 28 24 L 22 12 L 28 8 L 40 15 Z M 72 24 L 78 12 L 72 8 L 60 15 Z" />
                <path fill="#f2b8c6" d="M 29 21 L 25 13 L 29 11 L 37 16 Z M 71 21 L 75 13 L 71 11 L 63 16 Z" />
                <path fill="#fff0eb" d="M 50 16 L 68 22 L 69 39 L 62 48 L 50 52 L 38 48 L 31 39 L 32 22 Z" />
                <path fill="#eeb8c8" d="M 34 91 L 66 91 L 76 114 L 24 114 Z" />
                <path fill="#242026" d="M 34 75 L 66 75 L 65 92 L 35 92 Z" />
                <path fill="#f2f4f8" d="M 50 14 L 69 20 L 73 36 L 69 50 L 64 46 L 66 33 L 34 33 L 36 46 L 31 50 L 27 36 L 31 20 Z" />
                <path fill="#2968ff" d="M 35 36 L 44 36 L 43 41 L 36 41 Z M 65 36 L 56 36 L 57 41 L 64 41 Z" />
              </svg>
            </div>
            <h3 className="font-bold text-pink-300 tracking-wider text-sm">Kiyokami</h3>
            <p className="text-[11px] font-mono text-zinc-500 mt-1">Featured Vtuber // Turbo Manul</p>
          </div>
        </div>
      </section>

      {/* Multiplayer & Spectator Mode Roadmap Teaser */}
      <section
        id="multiplayer"
        className={`border p-6 md:p-8 space-y-6 scroll-mt-24 ${
          isBroken ? "border-red-600 bg-red-950/15" : "border-zinc-800 bg-zinc-900/40"
        }`}
      >
        <div className="space-y-2">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-amber-400">
            // PHASE 2 ROADMAP TEASER //
          </span>
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider text-white">
            Online Multiplayer &amp; Live Broadcast Spectating
          </h2>
          <p className="text-sm text-zinc-400 font-mono">
            ScytheDragon Studios is expanding Vector Karts beyond solo EnemyAI Grand Prix races into a zero-cost,
            community-driven party racer built for streamer lobbies and tournament nights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
          <div className="border border-zinc-800 bg-black/60 p-4 space-y-2">
            <h3 className="text-cyan-400 font-bold text-sm">01 // P2P RELAYED LOBBIES</h3>
            <p className="text-xs text-zinc-400">
              Instant room codes over relayed peer-to-peer netcode—protecting streamer IP addresses with zero port
              forwarding required.
            </p>
          </div>
          <div className="border border-zinc-800 bg-black/60 p-4 space-y-2">
            <h3 className="text-cyan-400 font-bold text-sm">02 // LIVE SPECTATOR DRONE CAM</h3>
            <p className="text-xs text-zinc-400">
              Drop into public lobbies using the weighted 360° 3rd-person spectator camera to cast community tournaments
              live on stream.
            </p>
          </div>
          <div className="border border-zinc-800 bg-black/60 p-4 space-y-2">
            <h3 className="text-cyan-400 font-bold text-sm">03 // INDIE TRIBUTE CIRCUITS</h3>
            <p className="text-xs text-zinc-400">
              New tracks paying homage to fellow indie games, paired with original dark electronic soundtracks produced
              by Cipher &amp; Coil.
            </p>
          </div>
        </div>
      </section>

      {/* Human Artistry & No-AI Rider Pledge */}
      <section className="border border-red-900/60 bg-red-950/10 p-6 text-center space-y-4 font-mono">
        <h3 className="text-sm font-bold tracking-[0.2em] text-red-400 uppercase">
          [ SCYTHEDRAGON STUDIOS // HUMAN ARTISTRY &amp; NO-AI RIDER PLEDGE ]
        </h3>
        <p className="text-xs text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Every creator avatar in Vector Karts is built with signed permission under our mutual No-AI Rider. We never
          clone performer voices with AI or scrape reference art into generative models. All 3D SVG meshes are
          hand-plotted in Inkscape 1.4.4 and all character voice packs are 100% authentic human recordings.
        </p>
        <div className="pt-2">
          <a
            href="mailto:bfa@cipher-and-coil.com?subject=ScytheDragon%20Studios%20-%20Vector%20Karts%20Creator%20Collab"
            className="inline-block px-6 py-2.5 text-xs font-bold uppercase tracking-widest border border-red-500 text-red-300 hover:bg-red-600 hover:text-white transition-all"
          >
            Want Your Avatar on the Grid? Inquire Here
          </a>
        </div>
      </section>

      {/* Lightbox Overlay */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
        >
          <img
            src={lightboxImg}
            alt="Enlarged Screenshot"
            className="max-w-full max-h-[88vh] border-2 border-cyan-400 shadow-[0_0_35px_rgba(34,211,238,0.4)]"
          />
        </div>
      )}
    </div>
  );
}