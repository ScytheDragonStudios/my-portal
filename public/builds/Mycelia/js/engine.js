// js/engine.js

function triggerQTE() {
    if (gameState.qte.active || gameState.isGameOver) return;
    gameState.qte.active = true;

    const keys = Object.keys(gameState.continents);
    gameState.qte.targetRegion = gameState.continents[keys[Math.floor(Math.random() * keys.length)]];

    const qteEl = document.getElementById('qte-overlay');
    const regEl = document.getElementById('qte-region');
    const barEl = document.getElementById('qte-timer-bar');

    if (qteEl && regEl && barEl) {
        regEl.innerText = gameState.qte.targetRegion.name;
        qteEl.style.display = 'flex';
        gameState.qte.timeLeft = 100;

        gameState.qte.timerRef = setInterval(() => {
            if (gameState.isGameOver) {
                clearInterval(gameState.qte.timerRef);
                qteEl.style.display = 'none';
                return;
            }
            gameState.qte.timeLeft -= 2;
            barEl.style.width = Math.max(0, gameState.qte.timeLeft) + '%';
            if (gameState.qte.timeLeft <= 0) {
                resolveQte(false);
            }
        }, 100);
    }
}

function getUpgradeCost(key) {
    const up = gameState.upgrades[key];
    return Math.floor(up.baseCost * Math.pow(1.5, up.level));
}

function recalculateStats() {
    let clickSum = 1;
    let passiveSum = 0;

    for (const key in gameState.upgrades) {
        const up = gameState.upgrades[key];
        if (up.type === 'general' && up.name === "Hyphal Density") clickSum += up.level * 1;
        if (up.type === 'general' && up.name === "Substrate Digestion") passiveSum += up.level * 2;
        if (up.type === 'specialty' && up.name === "Aerosol Spores" && up.level > 0) passiveSum *= 3.0;
    }

    gameState.clickPower = clickSum;
    gameState.passiveRate = passiveSum;
}

function buyUpgrade(key) {
    if (gameState.isGameOver) return;
    const up = gameState.upgrades[key];
    const cost = getUpgradeCost(key);

    if (gameState.biomass >= cost && up.level < up.maxLevel) {
        gameState.biomass -= cost;
        up.level++;

        // Exclusivity Check
        if (up.exclusiveWith) {
            gameState.upgrades[up.exclusiveWith].level = -1; // Locks the alternative
        }

        // Vector Unlock Logic
        if (key === 'mite_vector') gameState.tiers.find(t => t.id === 'mite').unlocked = true;
        if (key === 'ant_vector') gameState.tiers.find(t => t.id === 'ant').unlocked = true;
        if (key === 'cicada_vector') gameState.tiers.find(t => t.id === 'cicada').unlocked = true;
        if (key === 'mouse_vector') gameState.tiers.find(t => t.id === 'mouse').unlocked = true;

        recalculateStats();
        renderUpgrades();
        updateUI();
    }
}

function triggerWinState() {
    const cursor = document.getElementById('spore-cursor');
    if (cursor) cursor.style.display = 'none';
    if (gameState.isGameOver) return;
    gameState.isGameOver = true; // STRICT STOP

    const app = document.getElementById('app-container');
    const overlay = document.getElementById('cinematic-overlay');
    const earth = document.getElementById('cine-earth-container');
    const textEl = document.getElementById('cine-text');
    const logoEl = document.getElementById('cine-logo');

    if (app) app.style.display = 'none';
    if (overlay) overlay.style.display = 'flex';

    setTimeout(() => {
        if (overlay) overlay.style.opacity = '1';
        if (earth) {
            earth.style.opacity = '1';
            earth.style.transform = 'translate(-50%, -50%) scale(0.6)';
        }
    }, 100);

    const text = "Human beings think they are the top predators. Completely unaware that the most dangerous predators around are small. So small, you could be breathing them in, and you'd never know until it was too late.";

    setTimeout(() => {
        let charIdx = 0;
        let typing = setInterval(() => {
            if (textEl) {
                textEl.style.opacity = '1';
                textEl.innerHTML += text.charAt(charIdx);
            }
            charIdx++;
            if (charIdx >= text.length) {
                clearInterval(typing);
                setTimeout(() => {
                    if (textEl) textEl.style.opacity = '0';
                    if (earth) earth.style.opacity = '0';
                    setTimeout(() => {
                        if (logoEl) {
                            logoEl.style.display = 'flex';
                            setTimeout(() => logoEl.style.opacity = '1', 100);
                        }
                    }, 2500);
                }, 6000);
            }
        }, 50);
    }, 4000);
}

// Master Loop (1 Tick per Second)
let gameSpeed = 1000;
let masterLoopId;

function gameTick() {
    if (gameState.isGameOver) {
        clearInterval(masterLoopId);
        return;
    }
    if (gameState.qte.active) return;
    if (gameState.currentView === 'mutations') return; // Pause in the lab

    // Slow time to 25% on the World Map so players can watch spread without panicking
    if (gameState.currentView === 'world' && gameState.day % 4 !== 0 && gameSpeed === 1000) {
        gameState.day++;
        return;
    }

    gameState.day++;

    // SAFEGUARD: Force numbers if they somehow became NaN
    if (isNaN(gameState.passiveRate)) recalculateStats();
    gameState.biomass = (gameState.biomass || 0) + (gameState.passiveRate || 0);

    // Continental Spread Math
    let newGlobalInfections = 0;
    const keys = Object.keys(gameState.continents);

    for (let i = 0; i < keys.length; i++) {
        let c = gameState.continents[keys[i]];
        if (c.infected > 0 && c.infected < c.pop) {
            let growthRate = 0.08 * (gameState.baseInfectivity || 1);
            let newInf = Math.max(1, Math.floor(c.infected * growthRate * (1 - (c.infected / c.pop))));

            if (c.infected > c.pop * 0.15 && Math.random() < 0.15) {
                let target = gameState.continents[keys[Math.floor(Math.random() * keys.length)]];
                if (target.infected === 0) target.infected = 1000;
            }
            c.infected += newInf;
            if (c.infected > c.pop) c.infected = c.pop;
            newGlobalInfections += newInf;
        }
    }
    gameState.totalInfected = (gameState.totalInfected || 0) + newGlobalInfections;

    // --- PASSIVE VISUAL ROT ON GROUND VIEW ---
  // The higher your passive rate, the higher the chance to auto-rot a random on-screen entity
  let visualRotChance = Math.min(0.8, (gameState.passiveRate || 0) * 0.05); 
  
  if (gameState.currentView === 'ground' && Math.random() < visualRotChance) {
      // Find completely uninfected flora (stage 0) and unlocked animals
      const entities = Array.from(document.querySelectorAll('.field-grass, .field-lawn, .field-creature:not(.locked-entity)'))
                            .filter(el => el.dataset.regrowing !== "true" && el.dataset.rotting !== "true" && parseInt(el.dataset.stage) === 0);
      
      if (entities.length > 0) {
          const target = entities[Math.floor(Math.random() * entities.length)];
          
          let autoReward = 1;
          if (target.dataset.folder === 'lawn') autoReward = 2;
          if (target.classList.contains('field-creature')) autoReward = 15;

          // Call the UI click handler programmatically
          if (typeof handleFieldEntityClick === 'function') {
              const originalPower = gameState.clickPower;
              // Temporarily boost click power to bypass the Lawn lock if passive rot hits it
              if (target.dataset.folder === 'lawn' && gameState.clickPower < 3) gameState.clickPower = 3;
              
              handleFieldEntityClick({ stopPropagation: () => {} }, target, autoReward);
              
              gameState.clickPower = originalPower; // Restore power
          }
      }
  }

    // Sync wandering spawns to the tick rate (so holding 'Q' speeds up spawns)
    if (gameState.day % 3 === 0 && typeof spawnWanderingCreature === "function") {
        spawnWanderingCreature();
    }

    // Ticker Updates
    if (gameState.day % 12 === 0) {
        const newsHeadlines = [
            "Reports of strange purple hues in rural lawns...",
            "Scientists discover resilient new fungal strain.",
            "Soil mites exhibiting unusual swarming behavior.",
            "Global agriculture on alert due to unexplained crop rot."
        ];
        const ticker = document.getElementById('news-ticker');
        if (ticker) ticker.innerText = "> " + newsHeadlines[Math.floor(Math.random() * newsHeadlines.length)];
    }

    // QTE Trigger Chance
    let qteChance = (gameState.upgrades.subterranean && gameState.upgrades.subterranean.level > 0) ? 0.01 :
        ((gameState.upgrades.aerosol && gameState.upgrades.aerosol.level > 0) ? 0.08 : 0.03);

    if (gameState.totalInfected > 5000000 && Math.random() < qteChance) {
        triggerQTE();
    }

    // Win Check
    const mouseUnlocked = gameState.upgrades.mouse_vector && gameState.upgrades.mouse_vector.level > 0;
    if (gameState.totalInfected >= gameState.globalPop * 0.999 && mouseUnlocked) {
        gameState.totalInfected = gameState.globalPop;
        triggerWinState();
    }

    updateUI();
}

function setGameSpeed(speed) {
    gameSpeed = speed;
    clearInterval(masterLoopId);
    masterLoopId = setInterval(gameTick, speed);
}
// Start the engine
setGameSpeed(1000);

// DEV SHORTCUT: Hold 'Q' for hyper-speed (50ms per tick instead of 1000ms)
window.addEventListener('keydown', (e) => {
    if (e.key === 'q' && gameSpeed === 1000) setGameSpeed(50);
});
window.addEventListener('keyup', (e) => {
    if (e.key === 'q') setGameSpeed(1000);
});