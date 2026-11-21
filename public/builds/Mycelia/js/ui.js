// js/ui.js

window.addEventListener('mousemove', (e) => {
    const cursor = document.getElementById('spore-cursor');
    if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    }
});

function switchTab(viewId, btnEl) {
    if (gameState.isGameOver) return;
    document.querySelectorAll('.view-content').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

    const targetView = document.getElementById('view-' + viewId);
    if (targetView) targetView.classList.add('active');
    if (btnEl) btnEl.classList.add('active');
}

// ---------------- MICRO GROUND VIEW ----------------
function initWorldField() {
    const stage = document.getElementById('field-stage');
    if (!stage) return;
    stage.innerHTML = '';

    // Spawn Lawn Patches (Requires Click Power 3)
    const clumpPositions = [
        { x: 80, y: 260, scale: 0.9 },
        { x: 520, y: 240, scale: 0.85 },
        { x: 280, y: 320, scale: 1.05 },
        { x: 640, y: 350, scale: 1.1 }
    ];

    clumpPositions.forEach((pos) => {
        const clump = document.createElement('img');
        clump.dataset.folder = 'lawn';
        clump.dataset.prefix = 'lawn';
        clump.dataset.stage = 0;
        clump.dataset.maxStage = 3;
        clump.dataset.indexFormat = '_';
        clump.dataset.clicksPerStage = 8;
        clump.dataset.currentClicks = 0;

        clump.src = 'assets/lawn/lawn_0.png';
        clump.className = 'field-entity field-lawn';
        clump.style.left = `${pos.x}px`;
        clump.style.top = `${pos.y}px`;
        clump.style.width = '140px';
        clump.style.zIndex = Math.floor(pos.y);
        clump.style.transform = `scale(${pos.scale})`;
        clump.draggable = false;
        clump.onclick = (e) => handleFieldEntityClick(e, clump, 2);
        stage.appendChild(clump);
    });

    // Spawn standard Grass
    for (let i = 0; i < 25; i++) {
        const blade = document.createElement('img');
        blade.dataset.folder = 'grass';
        blade.dataset.prefix = 'grass';
        blade.dataset.stage = 0;
        blade.dataset.maxStage = 3;
        blade.dataset.indexFormat = '_';
        blade.dataset.clicksPerStage = 3;
        blade.dataset.currentClicks = 0;

        blade.src = 'assets/grass/grass_0.png';
        blade.className = 'field-entity field-grass';

        const x = 20 + (i * 35) + (Math.random() * 20 - 10);
        const y = 200 + Math.random() * 300;

        blade.style.left = `${x}px`;
        blade.style.top = `${y}px`;
        blade.style.height = '120px';
        blade.style.zIndex = Math.floor(y);

        blade.draggable = false;
        blade.onclick = (e) => handleFieldEntityClick(e, blade, 1);
        stage.appendChild(blade);
    }
}

// Added 'isAutoTick' parameter to distinguish manual clicks from the rot timer
function handleFieldEntityClick(e, element, reward, isAutoTick = false) {
    if (gameState.isGameOver || !element || !element.parentElement) return; 
    if (e && e.stopPropagation) e.stopPropagation();

    if (element.classList.contains('locked-entity')) return;
    if (element.dataset.regrowing === "true") return;

    // Block manual Lawn infection if click power is too low
    if (!isAutoTick && element.dataset.folder === 'lawn' && (gameState.clickPower || 1) < 3) {
        const ticker = document.getElementById('news-ticker');
        if (ticker) {
            ticker.style.color = 'var(--alert-red)';
            ticker.innerText = "> WARNING: Strain too weak to penetrate Lawn Patch. Requires Click Power 3+.";
            setTimeout(() => { ticker.style.color = 'white'; }, 3000);
        }
        return;
    }

    // FREEZE WANDERING ANIMALS ON THE VERY FIRST CLICK
    if (element.classList.contains('field-creature') && element.dataset.frozen !== "true") {
        const computedLeft = window.getComputedStyle(element).left;
        element.style.transition = 'none'; // Stop walking
        element.style.left = computedLeft; // Anchor in place
        element.dataset.frozen = "true";
    }

    // Apply the visual infected state PERMANENTLY while rotting
    element.classList.add('infected-glow');

    // Start the timer on the VERY FIRST interaction if it hasn't started yet
    if (element.dataset.autoRotting !== "true") {
        element.dataset.autoRotting = "true";
        const rotInterval = setInterval(() => {
            // Kill the timer if it dies, regrows, or finishes rotting
            if (gameState.isGameOver || !element || !element.parentElement || element.dataset.regrowing === "true" || element.dataset.rotting === "true") {
                clearInterval(rotInterval);
                return;
            }
            // Fire an auto-tick to chip away at durability
            handleFieldEntityClick(null, element, reward, true);
        }, 1500 + Math.random() * 1000); // Decays every 1.5 to 2.5 seconds
    }

    // Give Biomass 
    let currentReward = reward || 1;
    if (gameState.upgrades && gameState.upgrades.hyphal_density) {
        currentReward += ((gameState.upgrades.hyphal_density.level || 0) * 2); 
    }
    
    // Manual clicks use your full Click Power. Auto-ticks slowly wear it down by 1 damage.
    let appliedDamage = isAutoTick ? 1 : (gameState.clickPower || 1);
    gameState.biomass = (gameState.biomass || 0) + (appliedDamage * currentReward);

    // KICKSTART THE GLOBAL SPREAD (Patient Zero)
    if (gameState.continents.na.infected === 0) {
        gameState.continents.na.infected = 50; 
    }

    // --- DURABILITY LOGIC ---
    let currentStage = parseInt(element.dataset.stage || 0);
    let maxStage = parseInt(element.dataset.maxStage || 3);
    
    let currentClicks = parseFloat(element.dataset.currentClicks || 0);
    let clicksNeeded = parseFloat(element.dataset.clicksPerStage || 1);
    
    // Apply the damage to the health pool
    currentClicks += appliedDamage;

    // If accumulated damage breaks the threshold, advance the visual rot!
    if (currentClicks >= clicksNeeded && currentStage < maxStage) {
        currentStage++;
        element.dataset.stage = currentStage;
        element.dataset.currentClicks = 0; // Reset threshold for the next stage
        element.src = `assets/${element.dataset.folder}/${element.dataset.prefix}${element.dataset.indexFormat}${currentStage}.png`;

        // DEATH / REGROWTH LOGIC (Max Stage Reached)
        if (currentStage === maxStage) {
            element.classList.remove('infected-glow'); // Drop the glow when fully dead
            
            if (element.classList.contains('field-creature')) {
                // Animals linger as a corpse, then fade into the soil
                element.dataset.rotting = "true";
                setTimeout(() => {
                    if (element) {
                        element.style.transition = 'opacity 2s ease';
                        element.style.opacity = '0';
                        setTimeout(() => { if (element) element.remove(); }, 2000);
                    }
                }, 3000);
            } else {
                // Grass Regrowth
                element.dataset.regrowing = "true";
                element.dataset.autoRotting = "false";
                setTimeout(() => {
                    if (gameState.isGameOver || !element) return;
                    element.dataset.stage = 0;
                    element.dataset.regrowing = "false";
                    element.src = `assets/${element.dataset.folder}/${element.dataset.prefix}${element.dataset.indexFormat}0.png`;
                    
                    // Passive Auto-Infect upon regrowth
                    if ((gameState.passiveRate || 0) > 0 && Math.random() < 0.20) {
                        setTimeout(() => handleFieldEntityClick(null, element, reward, true), 500);
                    }
                }, 5000 + Math.random() * 3000);
            }
        }
    } else if (currentStage < maxStage) {
        // Not enough damage to advance the image yet, just store the progress
        element.dataset.currentClicks = currentClicks;
    }
    
    updateUI();
}

function spawnWanderingCreature() {
    const stage = document.getElementById('field-stage');
    if (!stage || gameState.isGameOver) return;

    const viewGround = document.getElementById('view-ground');
    if (!viewGround || !viewGround.classList.contains('active')) return;
    if (document.querySelectorAll('.field-creature').length >= 5) return;

    const wanderers = [
        { id: 'mite', size: '30px', speed: 12, reward: 10, clicksPerStage: 4 },
        { id: 'ant', size: '45px', speed: 9, reward: 25, clicksPerStage: 12 },
        { id: 'cicada', size: '70px', speed: 14, reward: 60, clicksPerStage: 25 },
        { id: 'mouse', size: '100px', speed: 6, reward: 150, clicksPerStage: 60 }
    ];

    const type = wanderers[Math.floor(Math.random() * wanderers.length)];
    const tierData = gameState.tiers.find(t => t.id === type.id);

    const creature = document.createElement('img');
    
    // Assign durability to the animal
    creature.dataset.clicksPerStage = type.clicksPerStage;
    creature.dataset.currentClicks = 0;
    

    creature.dataset.folder = type.id;
    creature.dataset.prefix = type.id;
    creature.dataset.stage = 0;
    creature.dataset.maxStage = 3;
    creature.dataset.indexFormat = '_';

    creature.src = `assets/${type.id}/${type.id}${creature.dataset.indexFormat}${creature.dataset.stage}.png`;
    creature.className = 'field-entity field-creature';

    if (tierData && !tierData.unlocked) creature.classList.add('locked-entity');

    const startLeft = Math.random() > 0.5;
    const startY = 220 + Math.random() * 250;

    creature.style.left = startLeft ? '-80px' : '900px';
    creature.style.top = `${startY}px`;
    creature.style.height = type.size;
    creature.style.zIndex = Math.floor(startY);
    creature.style.transform = startLeft ? 'scaleX(-1)' : 'scaleX(1)';

    // Animal Walk speed
    creature.style.transition = `left ${type.speed}s linear, opacity 1s ease`;

    creature.onclick = (e) => handleFieldEntityClick(e, creature, type.reward); // Uses type.reward
    stage.appendChild(creature);

    const isPeek = Math.random() > 0.4;

    setTimeout(() => {
        if (!creature) return;
        creature.style.left = startLeft ? '900px' : '-80px';
    }, 50);

    // Auto-infect check based on passive rates
    let autoInfectChance = 0.05 + ((gameState.passiveRate || 0) > 0 ? 0.10 : 0);

    if (tierData && tierData.unlocked && Math.random() < autoInfectChance) {
        setTimeout(() => {
            // SAFEGUARD: Only infect if the creature still exists in the DOM
            if (creature && creature.parentElement && !creature.classList.contains('locked-entity')) {
                handleFieldEntityClick(null, creature, type.reward);
            }
        }, 800 + Math.random() * 1000);
    }

    setTimeout(() => { 
        if (creature && creature.dataset.frozen !== "true") creature.remove(); 
    }, type.speed * 1000);
}

// ---------------- UI UPDATES ----------------
function renderUpgrades() {
    const container = document.getElementById('upgrade-list');
    if (!container) return;

    container.innerHTML = Object.keys(gameState.upgrades).map(key => {
        const up = gameState.upgrades[key];
        const cost = getUpgradeCost(key);

        let btnState = "";
        if (up.level < 0) btnState = "exclusive-lock";
        else if (up.level >= up.maxLevel) btnState = "purchased";
        else if (gameState.biomass < cost) btnState = "locked";

        return `
      <div class="upgrade-card ${btnState}" onclick="buyUpgrade('${key}')">
        <div class="flex justify-between font-bold mb-1 text-white">
          <span>${up.name} (Lvl ${Math.max(0, up.level)})</span>
          <span class="text-[var(--poison-purple)]">${cost} BM</span>
        </div>
        <p class="text-xs text-[var(--text-dim)]">${up.desc}</p>
      </div>
    `;
    }).join('');
}

function updateUI() {
    if (gameState.isGameOver) return;

    const dateEl = document.getElementById('date-display');
    const bioEl = document.getElementById('biomass-display');
    const infEl = document.getElementById('infection-display');

    if (dateEl) dateEl.innerText = `Day ${gameState.day}`;
    if (bioEl) bioEl.innerText = Math.floor(gameState.biomass);

    if (infEl) {
        let infPct = (gameState.totalInfected / gameState.globalPop) * 100;
        infEl.innerText = infPct.toFixed(4) + "%";
    }

    // Update SVG Map Colors
    for (let key in gameState.continents) {
        let c = gameState.continents[key];
        let ratio = c.infected / c.pop;
        let pathEl = document.getElementById('cont-' + c.id);
        if (pathEl && ratio > 0) {
            let r = Math.floor(42 + (154 * ratio));
            let g = Math.floor(89 - (18 * ratio));
            let b = Math.floor(48 + (189 * ratio));
            pathEl.style.fill = `rgb(${r},${g},${b})`;
        }
    }
}

// ---------------- QTE EVENT ----------------
function resolveQte(success) {
    if (gameState.isGameOver) return;
    clearInterval(gameState.qte.timerRef);
    gameState.qte.active = false;

    const qteEl = document.getElementById('qte-overlay');
    if (qteEl) qteEl.style.display = 'none';

    if (success) {
        gameState.biomass += 100;
    } else if (gameState.qte.targetRegion) {
        gameState.totalInfected = Math.max(0, gameState.totalInfected - gameState.qte.targetRegion.infected);
        gameState.qte.targetRegion.infected = 0;
    }
    gameState.qte.targetRegion = null;
    updateUI();
}

window.addEventListener('DOMContentLoaded', () => {
    initWorldField();
    renderUpgrades();
    updateUI();
});