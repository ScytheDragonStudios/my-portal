import { useState } from "react";

export default function App() {
  const [isBroken, setIsBroken] = useState(false);

  return (
    <div
      className={`min-h-screen bg-black bg-gradient-to-b from-black via-zinc-950 to-black text-zinc-100 flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden transition-all duration-1000 ${isBroken ? "reality-broken !via-red-950" : ""}`}
    >
      {/* ERROR EFFECTS LAYER: Only active when reality is broken */}
      {isBroken && (
        <>
          <div className="vhs-overlay animate-vhs opacity-30"></div>
          <div className="vhs-grain"></div>
          <div className="vhs-static-line"></div>
          <div
            className="vhs-static-line"
            style={{ animationDelay: "4s" }}
          ></div>
          <div className="vhs-lightning"></div>
          <div
            className="vhs-lightning"
            style={{ animationDelay: "2.1s", animationDuration: "3s" }}
          ></div>
          <div className="vhs-screech"></div>
          <div className="vhs-static-line opacity-10"></div>
        </>
      )}

      {/* Main Content */}
      <main
        className={`relative z-10 max-w-2xl w-full text-center space-y-12 ${isBroken ? "animate-tape-break" : ""}`}
      >
        <section>
          {/* Glitch Header: Hover effects only trigger if system is broken */}
          <h1 className="text-7xl font-black tracking-tighter text-white uppercase italic relative group cursor-pointer">
            <span className="relative z-10">
              Stone{" "}
              <span
                className={
                  isBroken
                    ? "text-red-600"
                    : "text-zinc-400 transition-colors duration-1000"
                }
              >
                Akuma
              </span>
            </span>
            {isBroken && (
              <>
                <span className="absolute inset-0 text-cyan-400 opacity-0 group-hover:opacity-70 group-hover:animate-ping z-0">
                  Stone Akuma
                </span>
                <span className="absolute inset-0 text-magenta-500 opacity-0 group-hover:opacity-70 group-hover:animate-pulse z-0 ml-1">
                  Stone Akuma
                </span>
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
          <div
            className={`p-4 border border-zinc-800 bg-zinc-900/50 flex flex-col items-center justify-center gap-3 transition-all duration-300 ${isBroken ? "hover:border-red-600" : "hover:border-zinc-500"}`}
          >
            <span className="text-xs font-mono tracking-[0.3em] text-zinc-500 uppercase">
              // WATCH LIVE //
            </span>

            <div className="flex items-center justify-center gap-8 py-1">
              <a
                href="https://twitch.tv/stoneakuma"
                target="_blank"
                rel="noreferrer"
                title="Twitch"
              >
                <svg
                  className={`horror-svg ${isBroken ? "" : "!text-zinc-500 !filter-none hover:!text-white"}`}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
                </svg>
              </a>
              <a
                href="https://youtube.com/@stoneakuma"
                target="_blank"
                rel="noreferrer"
                title="YouTube"
              >
                <svg
                  className={`horror-svg ${isBroken ? "" : "!text-zinc-500 !filter-none hover:!text-white"}`}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://kick.com/stoneakuma"
                target="_blank"
                rel="noreferrer"
                title="Kick"
              >
                <svg
                  className={`horror-svg ${isBroken ? "" : "!text-zinc-500 !filter-none hover:!text-white"}`}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2.25 0H7.5v4.5h3V0h5.25v4.5h3V0H24v7.5h-5.25v3H24v13.5h-5.25v-4.5h-3v4.5H10.5v-4.5h-3v4.5H0V7.5h2.25v-3H0V0h2.25zm11.25 12v-1.5h-3V12h3zm0 1.5h-3v1.5h3v-1.5z" />
                </svg>
              </a>
            </div>
          </div>

          <a
            href="#"
            className={`group p-4 border border-zinc-800 bg-zinc-900/50 transition-all duration-300 ${isBroken ? "hover:border-red-600" : "hover:border-zinc-500"}`}
          >
            <span
              className={`text-xl font-bold ${isBroken ? "group-hover:text-red-500" : "group-hover:text-white"}`}
            >
              Threadware
            </span>
            <p className="text-xs text-zinc-500 mt-1">
              Limited Edition HellDark Apparel :: under construction
            </p>
          </a>

          <a
            href="https://github.com/ScytheDragonStudios/my-portal"
            target="_blank"
            rel="noreferrer"
            className={`group p-4 border border-zinc-800 bg-zinc-900/50 transition-all duration-300 ${isBroken ? "hover:border-red-600" : "hover:border-zinc-500"}`}
          >
            <span
              className={`text-xl font-bold ${isBroken ? "group-hover:text-red-500" : "group-hover:text-white"}`}
            >
              SOURCE CODE
            </span>
          </a>

          {/*Music block*/}
          <div
            className={`p-4 border border-zinc-800 bg-zinc-900/50 flex flex-col items-center justify-center gap-3 transition-all duration-300 ${isBroken ? "hover:border-red-600" : "hover:border-zinc-500"}`}
          >
            <span className="text-xs font-mono tracking-[0.3em] text-zinc-500 uppercase">
              // MUSIC //
            </span>

            <div className="flex items-center justify-center gap-8 py-1">
              {/* Spotify SVG */}
              <a
                href="https://open.spotify.com/artist/28aZmlNqJ23ocFum6cy69C?si=k48xAATUSq2fsTZkSP4oTg"
                target="_blank"
                rel="noreferrer"
                title="Spotify"
              >
                <svg
                  className={`horror-svg ${isBroken ? "" : "!text-zinc-500 !filter-none hover:!text-white"}`}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0C5.373 0 0 5.372 0 12s5.373 12 12 12 12-5.372 12-12S18.627 0 12 0zm5.494 17.307c-.217.356-.682.474-1.037.256-2.863-1.748-6.466-2.143-10.71-1.173-.406.092-.813-.16-.906-.565-.093-.405.16-.813.565-.906 4.646-1.062 8.624-.614 11.83 1.342.355.218.472.682.258 1.046zm1.465-3.26c-.274.444-.853.59-1.296.317-3.277-2.013-8.273-2.597-12.147-1.42-.502.152-1.033-.133-1.186-.635-.152-.502.133-1.033.635-1.186 4.432-1.345 9.927-.698 13.68 1.61.442.274.59.852.314 1.314zm.127-3.41c-3.928-2.333-10.414-2.55-14.185-1.405-.603.183-1.242-.153-1.425-.756-.183-.603.153-1.242.756-1.425 4.34-1.318 11.497-1.063 16.002 1.612.542.322.72.1.397.643-.323.542-.102.72-.645.398z" />
                </svg>
              </a>

              {/* SoundCloud SVG */}
              <a
                href="https://soundcloud.com/billfromaccounting"
                target="_blank"
                rel="noreferrer"
                title="SoundCloud"
              >
                <svg
                  className={`horror-svg ${isBroken ? "" : "!text-zinc-500 !filter-none hover:!text-white"}`}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1.714 12.429c.121 0 .214.093.214.214v3.214a.21.21 0 0 1-.214.214h-.428a.21.21 0 0 1-.214-.214v-3.214c0-.121.093-.214.214-.214zm1.286-1.714c.121 0 .214.093.214.214V16.5a.21.21 0 0 1-.214.214h-.428A.21.21 0 0 1 2.5 16.5V10.93c0-.121.093-.214.214-.214zm1.286-1.286c.121 0 .214.093.214.214V16.5a.21.21 0 0 1-.214.214H4a.21.21 0 0 1-.214-.214V9.643c0-.121.093-.214.214-.214zm1.285.857c.121 0 .215.093.215.214V16.5a.21.21 0 0 1-.215.214h-.428a.21.21 0 0 1-.214-.214v-6.001c0-.121.093-.214.214-.214zm1.286-1.714c.121 0 .214.093.214.214V16.5a.21.21 0 0 1-.214.214h-.428a.21.21 0 0 1-.214-.214V8.786c0-.121.093-.214.214-.214zm1.286.857c.121 0 .214.093.214.214V16.5a.21.21 0 0 1-.214.214h-.428a.21.21 0 0 1-.214-.214V9.643c0-.121.093-.214.214-.214zm1.286-2.143c.121 0 .214.093.214.214V16.5a.21.21 0 0 1-.214.214h-.428a.21.21 0 0 1-.214-.214V7.5c0-.121.093-.214.214-.214zm1.285 1.714c.121 0 .215.093.215.214V16.5a.21.21 0 0 1-.215.214h-.428a.21.21 0 0 1-.214-.214V9.214c0-.121.093-.214.214-.214zm1.286-3c.121 0 .214.093.214.215V16.5a.21.21 0 0 1-.214.214h-.428a.21.21 0 0 1-.214-.214V6.214c0-.122.093-.214.214-.214zm1.286 2.572c.121 0 .214.093.214.214V16.5a.21.21 0 0 1-.214.214h-.428a.21.21 0 0 1-.214-.214V8.786c0-.121.093-.214.214-.214zm1.286-1.715c.121 0 .214.093.214.215V16.5a.21.21 0 0 1-.214.214h-.428a.21.21 0 0 1-.214-.214V7.071c0-.121.093-.214.214-.214zM24 12.643c0-2.357-1.802-4.286-4.071-4.286-.226 0-.441.025-.654.062C18.761 6.136 16.711 4.5 14.25 4.5c-.719 0-1.395.143-2.016.4-.117.051-.183.179-.153.304l.154.636a.216.216 0 0 0 .273.155c.53-.195 1.1-.309 1.742-.309 2.052 0 3.738 1.488 4.025 3.447.022.155.155.267.311.267h.343c1.77 0 3.214 1.444 3.214 3.214s-1.444 3.214-3.214 3.214H11.571a.21.21 0 0 1-.214-.214v-.214c0-.122.093-.215.214-.215H19.28c2.131 0 3.864-1.637 4.043-3.719.387-.042.677-.354.677-.738z" />
                </svg>
              </a>

              {/* Apple Music SVG */}
              <a
                href="https://music.apple.com/us/artist/bill-from-accounting/1852546522"
                target="_blank"
                rel="noreferrer"
                title="Apple Music"
              >
                <svg
                  className={`horror-svg ${isBroken ? "" : "!text-zinc-500 !filter-none hover:!text-white"}`}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21.56 1.95c-.32-.15-.69-.13-1 .06L9.44 8.16c-.27.16-.44.45-.44.77v8.52c-.52-.36-1.19-.57-1.92-.57-1.7 0-3.08 1.14-3.08 2.56s1.38 2.56 3.08 2.56c1.64 0 2.97-1.07 3.07-2.42.01-.05.01-.89.01-1.22V10.87l9.23-5.33v5.92c-.52-.36-1.19-.57-1.92-.57-1.7 0-3.08 1.14-3.08 2.56s1.38 2.56 3.08 2.56c1.64 0 2.97-1.07 3.08-2.42.01-.05.01-1.17.01-1.17V2.62c0-.3-.15-.59-.42-.67z" />
                </svg>
              </a>

              {/* Amazon Music SVG */}
              <a
                href="https://music.amazon.com/artists/B0G1VY8XC7/bill-from-accounting"
                target="_blank"
                rel="noreferrer"
                title="Amazon Music"
              >
                <svg
                  className={`horror-svg ${isBroken ? "" : "!text-zinc-500 !filter-none hover:!text-white"}`}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11.66 12.93c.12-.55.15-1.17.15-1.76V6.1c0-.4-.15-.75-.51-.95L9 3.82c-.3-.16-.67.01-.67.36v7.32c0 1.25-.63 2.15-1.78 2.15-1.02 0-1.63-.75-1.63-1.89 0-1.68 1.28-2.5 3.51-2.5h1.22v-.95c0-1.85-1.06-2.73-2.91-2.73-1.4 0-2.6.47-3.41 1.05-.18.13-.19.38-.05.54l.87.97c.1.12.28.14.41.05.52-.37 1.22-.64 1.95-.64.97 0 1.45.41 1.45 1.34v.55H6.55C3.21 9.42 1.5 10.96 1.5 13.3c0 2 1.35 3.32 3.45 3.32 1.83 0 3.12-.9 3.73-2.14l.08.01c.14.49.56.84 1.07.84h1.4c.5 0 .82-.41.73-.9l-.3-1.5zM22.5 13.65c0-1.67-.97-2.61-2.77-2.61-1.39 0-2.6.47-3.41 1.05-.18.13-.19.38-.05.54l.87.97c.1.12.28.14.41.05.52-.37 1.22-.64 1.95-.64.97 0 1.45.41 1.45 1.34v4.54c0 .35.25.59.6.59h.95c.35 0 .6-.24.6-.59v-5.24zM12 21.3c-4.43 1.6-9.15.93-11.72-.44-.22-.12-.44.11-.27.3.31.35 3 .96 5.86.96 2.45 0 5.17-.41 6.36-1.02.2-.1.01-.26-.23-.2zM21.9 20.37c-.15-.17-.38-.2-.55-.07l-.76.59c-.19.15-.22.42-.06.6.35.39.52.79.52 1.2 0 .43-.22.7-.66.83-.53.15-1.48.21-2.58.21-1.81 0-3.69-.17-4.6-.39-.23-.05-.4.15-.24.31.25.26 2.12.61 4.79.61 1.25 0 2.37-.08 3.1-.28 1.03-.29 1.63-.98 1.63-1.84 0-.75-.32-1.46-.59-2.16z" />
                </svg>
              </a>
            </div>
          </div>

          <a
            href="mailto:contact@cipher-and-coil.com?subject=Business%20Inquiry%20-%20Stone%20Akuma"
            className={`group p-4 border border-zinc-800 bg-zinc-900/50 transition-all duration-300 ${isBroken ? "hover:border-red-600" : "hover:border-zinc-500"}`}
          >
            <span
              className={`text-xl font-bold ${isBroken ? "group-hover:text-red-500" : "group-hover:text-white"}`}
            >
              CONTACT // EMAIL
            </span>
            <p className="text-xs text-zinc-500 mt-1">
              bfa@cipher-and-coil.com
            </p>
          </a>
        </nav>

        {/* INDUSTRIAL TOGGLE SWITCH CONTAINER */}
        <section className="pt-6 flex flex-col items-center justify-center gap-2">
          <label className="text-[10px] font-mono tracking-[0.3em] text-zinc-600 uppercase">
            {isBroken ? "[ OVERRIDE ACTIVE ]" : "[ SIGNAL OVERRIDE ]"}
          </label>
          <button
            onClick={() => setIsBroken(!isBroken)}
            className={`w-14 h-7 rounded-none border p-1 transition-all duration-500 relative ${isBroken ? "border-red-600 bg-red-950/20" : "border-zinc-800 bg-zinc-950"}`}
          >
            <div
              className={`w-4 h-4 transition-all duration-500 ${isBroken ? "bg-red-600 translate-x-7 shadow-[0_0_10px_rgba(239,68,68,0.7)]" : "bg-zinc-700 translate-x-0"}`}
            />
          </button>
        </section>

        {/* Photosensitivity Warning */}
        <section className="pt-4 border-t border-zinc-900/50">
          <p className="text-[9px] uppercase tracking-[0.2em] text-red-600/60 font-bold">
            ⚠ Photosensitivity Warning: Activating override introduces
            flickering lights and visual distortions.
          </p>
        </section>

        <footer className="pt-8 opacity-30 font-mono text-[10px]">
          <p className="text-[10px] font-mono tracking-tighter">
            Coded by STONE AKUMA || EST. 2026 // CINCINNATI OH
          </p>
          {isBroken
            ? "[ SIGNAL DEGRADATION DETECTED ]"
            : "[ SYSTEM OPERATIONAL ]"}
        </footer>
      </main>
    </div>
  );
}
