import { useState, useEffect } from "react";

export default function AlphaVault({ onBack }) {
  const [passkey, setPasskey] = useState("");
  const [unlockedKey, setUnlockedKey] = useState("");
  const [decryptedHtml, setDecryptedHtml] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [activeProject, setActiveProject] = useState(0);

  const PROJECTS = [
    {
      id: "graverobber",
      title: "01 // GRAVEROBBER (2.5D Vertical Slice)",
      file: "./builds/graverobber.enc",
      controls: "WASD: Move | E: Interact | Shift: Cloak Lantern | Q: Toss Coin | F: Deep Focus | Tab: Lexicon"
    }
    // Add future encrypted .enc builds here
  ];

  const decryptBuild = async (fileUrl, password) => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const response = await fetch(fileUrl);
      if (!response.ok) throw new Error("Build archive not found.");
      const data = new Uint8Array(await response.arrayBuffer());

      // Extract salt (16 bytes), iv (12 bytes), and encrypted payload
      const salt = data.slice(0, 16);
      const iv = data.slice(16, 28);
      const ciphertext = data.slice(28);

      const enc = new TextEncoder();
      const keyMaterial = await crypto.subtle.importKey(
        "raw", enc.encode(password), "PBKDF2", false, ["deriveKey"]
      );
      const key = await crypto.subtle.deriveKey(
        { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["decrypt"]
      );

      const decryptedBuffer = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv }, key, ciphertext
      );

      setDecryptedHtml(new TextDecoder().decode(decryptedBuffer));
      setUnlockedKey(password);
    } catch {
      setErrorMsg("ACCESS DENIED — INVALID KEY OR CORRUPTED ARCHIVE");
      setDecryptedHtml("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    decryptBuild(PROJECTS[activeProject].file, passkey.trim().toLowerCase());
  };

  useEffect(() => {
    if (unlockedKey) {
      decryptBuild(PROJECTS[activeProject].file, unlockedKey);
    }
  }, [activeProject]);

  const currentProj = PROJECTS[activeProject];

  return (
    <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col min-h-[85vh] font-mono text-zinc-100">
      <nav className="flex items-center justify-between p-4 bg-zinc-900/80 border border-zinc-800 mb-4 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-cyan-400 text-xs border border-cyan-500/30 transition-all cursor-pointer"
          >
            &larr; Return to Portal
          </button>
          <span className="text-xs tracking-[0.2em] text-red-500 uppercase font-bold">
            [ ALPHA VAULT ACTIVE ]
          </span>
        </div>

        {decryptedHtml && (
          <div className="flex gap-2 flex-wrap">
            {PROJECTS.map((proj, idx) => (
              <button
                key={proj.id}
                onClick={() => setActiveProject(idx)}
                className={`px-3 py-1 text-xs border transition-all cursor-pointer ${
                  activeProject === idx
                    ? "bg-cyan-950/40 text-cyan-400 border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                    : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200"
                }`}
              >
                {proj.title}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={() => {
            const stage = document.getElementById("vault-stage");
            if (!document.fullscreenElement && stage) {
              stage.requestFullscreen().catch(() => {});
            } else if (document.fullscreenElement) {
              document.exitFullscreen();
            }
          }}
          className="px-3 py-1 bg-zinc-900 hover:bg-zinc-800 text-amber-400 text-xs border border-amber-500/30 transition-all cursor-pointer"
        >
          Fullscreen [F11]
        </button>
      </nav>

      {!decryptedHtml ? (
        <div className="my-auto mx-auto w-full max-w-md p-8 bg-zinc-950 border border-zinc-800 shadow-2xl text-center">
          <div className="text-[10px] text-cyan-400 tracking-[0.3em] uppercase mb-2">
            // AES-256 Archive Lock //
          </div>
          <h2 className="text-xl font-bold tracking-wider mb-2 text-white">ALPHA VAULT</h2>
          <p className="text-xs text-zinc-500 mb-6 leading-relaxed">
            Enter authorized key to decrypt pre-alpha prototypes in memory.
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="password"
              value={passkey}
              onChange={(e) => setPasskey(e.target.value)}
              placeholder="ENTER PASSKEY"
              className="bg-black border border-zinc-800 text-cyan-400 p-3 text-center tracking-[0.2em] outline-none focus:border-cyan-500 transition-all"
              autoFocus
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-cyan-600 hover:bg-cyan-500 text-black font-bold p-3 text-xs tracking-[0.2em] uppercase transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? "Decrypting..." : "Decrypt Build"}
            </button>
          </form>

          {errorMsg && (
            <p className="text-red-500 text-xs mt-4 tracking-wider">{errorMsg}</p>
          )}
        </div>
      ) : (
        <div id="vault-stage" className="flex-1 flex flex-col bg-black border border-zinc-800 min-h-[600px] relative">
          <iframe
            srcDoc={decryptedHtml}
            title="Alpha Vault Viewport"
            className="w-full flex-1 border-none min-h-[600px]"
            allow="autoplay; fullscreen"
          />
          <div className="bg-zinc-950 p-3 border-t border-zinc-800 flex justify-between items-center text-[11px] text-zinc-400 flex-wrap gap-2">
            <span><strong className="text-zinc-200">Controls:</strong> {currentProj.controls}</span>
            <span className="text-red-500/80 font-bold tracking-widest text-[10px]">
              CONFIDENTIAL — NOT FOR PUBLIC DISTRIBUTION
            </span>
          </div>
        </div>
      )}
    </div>
  );
}