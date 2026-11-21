// js/state.js

const gameState = {
  isGameOver: false, // Strict blocker for cinematic
  day: 1,
  biomass: 0,
  globalPop: 8000000000,
  totalInfected: 0,
  baseInfectivity: 1.0,
  clickPower: 1,
  passiveRate: 0,
  
  qte: {
    active: false,
    timerRef: null,
    timeLeft: 100,
    targetRegion: null
  },

  continents: {
    na: { id: 'na', name: "North America", pop: 592000000, infected: 0 },
    sa: { id: 'sa', name: "South America", pop: 430000000, infected: 0 },
    eu: { id: 'eu', name: "Europe", pop: 746000000, infected: 0 },
    af: { id: 'af', name: "Africa", pop: 1300000000, infected: 0 },
    as: { id: 'as', name: "Asia", pop: 4500000000, infected: 0 },
    oc: { id: 'oc', name: "Oceania", pop: 430000000, infected: 0 },
  },

  // Ground View Hosts
  tiers: [
    { id: "grass", name: "Single Blade of Grass", folder: "grass", prefix: "grass", targetSpores: 35, unlocked: true },
    { id: "lawn", name: "Lawn Patch", folder: "lawn", prefix: "lawn", targetSpores: 120, unlocked: false },
    { id: "mite", name: "Soil Mite", folder: "mite", prefix: "mite", targetSpores: 300, unlocked: false },
    { id: "ant", name: "Carpenter Ant", folder: "ant", prefix: "ant", targetSpores: 800, unlocked: false },
    { id: "cicada", name: "Cicada Nymph", folder: "cicada", prefix: "cicada", targetSpores: 2500, unlocked: false },
    { id: "mouse", name: "Field Mouse", folder: "mouse", prefix: "mouse", targetSpores: 7000, unlocked: false }
  ],

  // Combined Upgrade Tree
  upgrades: {
    // Vector Mutations
    mite_vector: { type: 'mutation', name: "Infect Mites", desc: "Allows ground infection of Soil Mites.", level: 0, baseCost: 60, maxLevel: 1 },
    ant_vector: { type: 'mutation', name: "Infect Ants", desc: "Allows ground infection of Carpenter Ants.", level: 0, baseCost: 100, maxLevel: 1 },
    cicada_vector: { type: 'mutation', name: "Infect Cicadas", desc: "Allows ground infection of Cicada Nymphs.", level: 0, baseCost: 250, maxLevel: 1 },
    mouse_vector: { type: 'mutation', name: "Infect Mice", desc: "Apex ground vector. Required for 100% saturation.", level: 0, baseCost: 500, maxLevel: 1 },
    
    // General Stats
    hyphal_density: { type: 'general', name: "Hyphal Density", desc: "+1 Biomass per active click.", level: 0, baseCost: 15, maxLevel: 10 },
    substrate_digestion: { type: 'general', name: "Substrate Digestion", desc: "+2 Passive Biomass/sec.", level: 0, baseCost: 50, maxLevel: 10 },
    
    // Mutually Exclusive Traits
    subterranean: { type: 'specialty', name: "Subterranean Rot", desc: "Reduces Fungicide QTE chance.", level: 0, baseCost: 150, maxLevel: 1, exclusiveWith: 'aerosol' },
    aerosol: { type: 'specialty', name: "Aerosol Spores", desc: "Massive passive spread, but draws CDC attention.", level: 0, baseCost: 150, maxLevel: 1, exclusiveWith: 'subterranean' }
  }
};